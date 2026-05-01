<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Brochures;
use App\Models\ServiceContent;
use App\Models\ServiceRule;
use App\Models\Services;
use App\Models\Subservices;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ServicesController extends Controller
{
    public function index()
    {
        try {
            $services = Services::with(['subservices', 'service_rules', 'brochures', 'service_contents'])->orderBy("id", "desc")->get();

            if ($services->isEmpty()) {
                return response()->json([
                    "status" => "success",
                    "message" => "No services found.",
                    "data" => null
                ]);
            }

            return response()->json([
                "status" => "success",
                "message" => "Services retrieved successfully.",
                "data" => $services
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $editId = null;

        if ($request->filled('edit')) {
            try {
                $editId = $request->edit;
            } catch (\Exception $e) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Invalid ID.',
                    'data' => null,
                ], 400);
            }
        }

        $request->validate([
            'edit' => 'nullable|string',
            'title' => 'required|string|max:255',
            'short_description' => 'required|string',
            'full_description' => 'required|string',
            'service_image' => $editId ? 'nullable|image|mimes:jpg,jpeg,png,webp' : 'required|image|mimes:jpg,jpeg,png,webp',
            'status' => 'required|in:1,0',
            
            'subservice' => 'required|array|min:1',
            'subservice.*.description' => 'required|string',
            
            'service_rules' => 'required|array|min:1',
            'service_rules.*.rule' => 'required|string',
            
            'brochures' => 'required|array|min:1',
            'brochures.*.brochure_file' => $editId ? 'nullable|file|mimes:pdf,doc,docx|max:10240' : 'required|file|mimes:pdf,doc,docx|max:10240',
            
            'service_contents' => 'required|array|min:1',
            'service_contents.*.title' => 'required|string',
            'service_contents.*.description' => 'required|string',
            'service_contents.*.content_image' => $editId ? 'nullable|image|mimes:jpg,jpeg,png,webp|max:10240' : 'required|image|mimes:jpg,jpeg,png,webp|max:10240',
        ], [
            'subservice.required' => 'At least one "What\'s Included" item is required.',
            'service_rules.required' => 'At least one "Rule We Build By" is required.',
            'brochures.required' => 'At least one Brochure is required.',
            'service_contents.required' => 'At least one Working Process step is required.',
        ]);

        DB::beginTransaction();
        try {
            $existing = null;
            if ($editId != null) {
                $existing = Services::findOrFail($editId);
            }

            $service_image = $existing ? $existing->getRawOriginal('service_image') : null;

            if ($request->hasFile('service_image')) {
                if ($existing && $service_image && Storage::disk('public')->exists($service_image)) {
                    Storage::disk('public')->delete($service_image);
                }
                $service_image = $request->file('service_image')->store('service_image', 'public');
            }

            $service = Services::updateOrCreate(
                ['id' => $editId],
                [
                    'title' => $request->title,
                    'short_description' => $request->short_description,
                    'full_description' => $request->full_description,
                    'service_image' => $service_image,
                    'status' => $request->status,
                ]
            );

            $serviceId = $service->id;

            // Subservices
            $existingSubIds = $service->subservices->pluck('id')->toArray();
            $newSubIds = [];
            foreach ($request->subservice as $sub) {
                $s = Subservices::updateOrCreate(
                    ['id' => $sub['id'] ?? null],
                    ['service_id' => $serviceId, 'description' => $sub['description']]
                );
                $newSubIds[] = $s->id;
            }
            Subservices::where('service_id', $serviceId)->whereNotIn('id', $newSubIds)->delete();

            // Rules
            $newRuleIds = [];
            foreach ($request->service_rules as $rule) {
                $r = ServiceRule::updateOrCreate(
                    ['id' => $rule['id'] ?? null],
                    ['service_id' => $serviceId, 'rule' => $rule['rule']]
                );
                $newRuleIds[] = $r->id;
            }
            ServiceRule::where('service_id', $serviceId)->whereNotIn('id', $newRuleIds)->delete();

            // Brochures
            $newBroIds = [];
            foreach ($request->brochures as $idx => $bro) {
                $brochure_file = null;
                $existingBro = null;

                if (isset($bro['id'])) {
                    $existingBro = Brochures::find($bro['id']);
                    $brochure_file = $existingBro ? $existingBro->getRawOriginal('brochure_file') : null;
                }

                if ($request->hasFile("brochures.$idx.brochure_file")) {
                    if ($existingBro && $brochure_file && Storage::disk('public')->exists($brochure_file)) {
                        Storage::disk('public')->delete($brochure_file);
                    }
                    $brochure_file = $request->file("brochures.$idx.brochure_file")->store('brochures', 'public');
                }

                $b = Brochures::updateOrCreate(
                    ['id' => $bro['id'] ?? null],
                    ['service_id' => $serviceId, 'brochure_file' => $brochure_file]
                );
                $newBroIds[] = $b->id;
            }
            Brochures::where('service_id', $serviceId)->whereNotIn('id', $newBroIds)->delete();

            // Service Content (Working Process)
            $newContentIds = [];
            foreach ($request->service_contents as $idx => $cont) {
                $content_image = null;
                $existingCont = null;

                if (isset($cont['id'])) {
                    $existingCont = ServiceContent::find($cont['id']);
                    $content_image = $existingCont ? $existingCont->getRawOriginal('content_image') : null;
                }

                if ($request->hasFile("service_contents.$idx.content_image")) {
                    if ($existingCont && $content_image && Storage::disk('public')->exists($content_image)) {
                        Storage::disk('public')->delete($content_image);
                    }
                    $content_image = $request->file("service_contents.$idx.content_image")->store('service_content', 'public');
                }

                $c = ServiceContent::updateOrCreate(
                    ['id' => $cont['id'] ?? null],
                    [
                        'service_id' => $serviceId,
                        'title' => $cont['title'],
                        'description' => $cont['description'],
                        'content_image' => $content_image
                    ]
                );
                $newContentIds[] = $c->id;
            }
            ServiceContent::where('service_id', $serviceId)->whereNotIn('id', $newContentIds)->delete();

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => $editId ? 'Service updated successfully.' : 'Service created successfully.',
                'data' => $service->load(['subservices', 'service_rules', 'brochures', 'service_contents']),
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function fetch($edit)
    {
        try {
            $service = Services::with(['subservices', 'service_rules', 'brochures', 'service_contents'])->find($edit);

            if (!$service) {
                return response()->json([
                    "status" => "error",
                    "message" => "Service not found.",
                    "data" => null
                ], 404);
            }

            return response()->json([
                "status" => "success",
                "message" => "Service retrieved successfully.",
                "data" => $service
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($delete)
    {
        DB::beginTransaction();
        try {
            $service = Services::findOrFail($delete);

            // Delete main image
            $service_image = $service->getRawOriginal('service_image');
            if ($service_image && Storage::disk('public')->exists($service_image)) {
                Storage::disk('public')->delete($service_image);
            }

            // Delete brochures
            foreach ($service->brochures as $bro) {
                $path = $bro->getRawOriginal('brochure_file');
                if ($path && Storage::disk('public')->exists($path)) {
                    Storage::disk('public')->delete($path);
                }
            }

            // Delete process images
            foreach ($service->service_contents as $cont) {
                $path = $cont->getRawOriginal('content_image');
                if ($path && Storage::disk('public')->exists($path)) {
                    Storage::disk('public')->delete($path);
                }
            }

            $service->delete();
            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Service deleted successfully.',
                'data' => null
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function latestService()
    {
        try {
            $service = Services::with('subservices')->orderBy('id', 'desc')->where('status', 1)->first();
            if (!$service) {
                return response()->json([
                    "status" => true,
                    "message" => "No service found.",
                    "data" => null
                ], 200);
            }

            return response()->json([
                'status' => true,
                'message' => 'Latest service retrieved successfully.',
                'data' => $service,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
