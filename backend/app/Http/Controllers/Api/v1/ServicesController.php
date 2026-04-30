<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Services;
use App\Models\Subservices;
use App\Models\ServiceRule;
use App\Models\Brochures;
use App\Models\ServiceContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ServicesController extends Controller
{
    public function index()
    {
        try {
            $services = Services::with(['subservices', 'brochures', 'service_contents', 'service_rules'])->orderBy('id', 'desc')->get();

            return response()->json([
                'status' => true,
                'message' => 'Services retrieved successfully.',
                'data' => $services,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $editId = null;

        if ($request->filled('edit')) {
            try {
                // $editId = Crypt::decrypt($request->edit);
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
            'service_image' => 'nullable|image|mimes:jpg,jpeg,png,webp',
            'status' => 'required|in:1,0',
            'subservice' => 'nullable|array',
            'service_rules' => 'nullable|array',
            'brochures' => 'nullable|array',
            'brochures.*.brochure_file' => 'nullable|file|mimes:pdf,doc,docx|max:10240',
            'service_contents' => 'nullable|array',
            'service_contents.*.content_image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:10240',
        ]);

        DB::beginTransaction();
        try {
            $existing = null;
            if ($editId !== null) {
                $existing = Services::findOrFail($editId);
            }

            $serviceImage = $existing ? $existing->getRawOriginal('service_image') : null;

            if ($request->hasFile('service_image')) {
                if ($existing && !empty($serviceImage) && Storage::disk('public')->exists($serviceImage)) {
                    Storage::disk('public')->delete($serviceImage);
                }

                $serviceImage = $request->file('service_image')->store('service_image', 'public');
            }

            $service = Services::updateOrCreate(
                ['id' => $editId],
                [
                    'title' => $request->title,
                    'short_description' => $request->short_description,
                    'full_description' => $request->full_description,
                    'service_image' => $serviceImage,
                    'status' => $request->status,
                ]
            );

            if ($request->has('subservice') && is_array($request->subservice)) {
                $existingSubIds = [];
                foreach ($request->subservice as $sub) {
                    $desc = is_array($sub) ? ($sub['description'] ?? null) : $sub;
                    $subId = is_array($sub) ? ($sub['id'] ?? null) : null;

                    if (!empty($desc)) {
                        $subModel = Subservices::updateOrCreate(
                            ['id' => $subId, 'service_id' => $service->id],
                            ['description' => $desc, 'service_id' => $service->id]
                        );
                        $existingSubIds[] = $subModel->id;
                    }
                }

                // Remove subservices that are not in the current request
                if ($editId !== null) {
                    Subservices::where('service_id', $service->id)
                        ->whereNotIn('id', $existingSubIds)
                        ->delete();
                }
            }

            if ($request->has('service_rules') && is_array($request->service_rules)) {
                $existingRuleIds = [];
                foreach ($request->service_rules as $ruleData) {
                    $ruleText = is_array($ruleData) ? ($ruleData['rule'] ?? null) : $ruleData;
                    $ruleId = is_array($ruleData) ? ($ruleData['id'] ?? null) : null;

                    if (!empty($ruleText)) {
                        $ruleModel = ServiceRule::updateOrCreate(
                            ['id' => $ruleId, 'service_id' => $service->id],
                            ['rule' => $ruleText, 'service_id' => $service->id]
                        );
                        $existingRuleIds[] = $ruleModel->id;
                    }
                }

                if ($editId !== null) {
                    ServiceRule::where('service_id', $service->id)
                        ->whereNotIn('id', $existingRuleIds)
                        ->delete();
                }
            }

            if ($request->has('brochures') && is_array($request->brochures)) {
                $existingBrochureIds = [];
                foreach ($request->brochures as $index => $brochureData) {
                    $brochureId = is_array($brochureData) ? ($brochureData['id'] ?? null) : null;
                    
                    $existingBrochure = null;
                    if ($brochureId) {
                        $existingBrochure = Brochures::find($brochureId);
                    }
                    
                    $brochurePath = $existingBrochure ? $existingBrochure->getRawOriginal('brochure_file') : null;
                    
                    if ($request->hasFile("brochures.{$index}.brochure_file")) {
                        if ($existingBrochure && !empty($brochurePath) && Storage::disk('public')->exists($brochurePath)) {
                            Storage::disk('public')->delete($brochurePath);
                        }
                        $brochurePath = $request->file("brochures.{$index}.brochure_file")->store('brochures', 'public');
                    }
                    
                    if ($brochurePath) {
                        $brochureModel = Brochures::updateOrCreate(
                            ['id' => $brochureId, 'service_id' => $service->id],
                            ['brochure_file' => $brochurePath, 'service_id' => $service->id]
                        );
                        $existingBrochureIds[] = $brochureModel->id;
                    } elseif ($brochureId && $existingBrochure) {
                        $existingBrochureIds[] = $existingBrochure->id;
                    }
                }

                if ($editId !== null) {
                    $brochuresToDelete = Brochures::where('service_id', $service->id)
                        ->whereNotIn('id', $existingBrochureIds)->get();
                    foreach($brochuresToDelete as $b) {
                        $path = $b->getRawOriginal('brochure_file');
                        if ($path && Storage::disk('public')->exists($path)) {
                            Storage::disk('public')->delete($path);
                        }
                        $b->delete();
                    }
                }
            }

            if ($request->has('service_contents') && is_array($request->service_contents)) {
                $existingContentIds = [];
                foreach ($request->service_contents as $index => $contentData) {
                    $contentId = is_array($contentData) ? ($contentData['id'] ?? null) : null;
                    $title = is_array($contentData) ? ($contentData['title'] ?? null) : null;
                    $description = is_array($contentData) ? ($contentData['description'] ?? null) : null;
                    
                    if (!empty($title)) {
                        $existingContent = null;
                        if ($contentId) {
                            $existingContent = ServiceContent::find($contentId);
                        }
                        
                        $imagePath = $existingContent ? $existingContent->getRawOriginal('content_image') : null;
                        
                        if ($request->hasFile("service_contents.{$index}.content_image")) {
                            if ($existingContent && !empty($imagePath) && Storage::disk('public')->exists($imagePath)) {
                                Storage::disk('public')->delete($imagePath);
                            }
                            $imagePath = $request->file("service_contents.{$index}.content_image")->store('service_contents', 'public');
                        }
                        
                        $contentModel = ServiceContent::updateOrCreate(
                            ['id' => $contentId, 'service_id' => $service->id],
                            [
                                'title' => $title, 
                                'description' => $description, 
                                'content_image' => $imagePath, 
                                'service_id' => $service->id
                            ]
                        );
                        $existingContentIds[] = $contentModel->id;
                    }
                }

                if ($editId !== null) {
                    $contentsToDelete = ServiceContent::where('service_id', $service->id)
                        ->whereNotIn('id', $existingContentIds)->get();
                    foreach($contentsToDelete as $c) {
                        $path = $c->getRawOriginal('content_image');
                        if ($path && Storage::disk('public')->exists($path)) {
                            Storage::disk('public')->delete($path);
                        }
                        $c->delete();
                    }
                }
            }

            DB::commit();
            return response()->json([
                'status' => 'success',
                'message' => $editId ? 'Service updated successfully.' : 'Service created successfully.',
                'data' => $service,
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function fetch($edit)
    {
        try {
            // $id = Crypt::decrypt($edit);
            $service = Services::with(['subservices', 'service_rules', 'brochures', 'service_contents'])->find($edit);

            if (!$service) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Service not found.',
                    'data' => null,
                ], 404);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Service retrieved successfully.',
                'data' => $service,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($delete)
    {
        DB::beginTransaction();
        try {
            // $id = Crypt::decrypt($delete);
            $service = Services::findOrFail($delete);
            $serviceImage = $service->getRawOriginal('service_image');

            if ($serviceImage && Storage::disk('public')->exists($serviceImage)) {
                Storage::disk('public')->delete($serviceImage);
            }

            // Cleanup related files manually since cascade delete on DB won't remove files from storage
            $brochures = Brochures::where('service_id', $service->id)->get();
            foreach($brochures as $b) {
                $path = $b->getRawOriginal('brochure_file');
                if ($path && Storage::disk('public')->exists($path)) {
                    Storage::disk('public')->delete($path);
                }
            }

            $contents = ServiceContent::where('service_id', $service->id)->get();
            foreach($contents as $c) {
                $path = $c->getRawOriginal('content_image');
                if ($path && Storage::disk('public')->exists($path)) {
                    Storage::disk('public')->delete($path);
                }
            }

            $service->delete();
            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Service deleted successfully.',
                'data' => null,
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
