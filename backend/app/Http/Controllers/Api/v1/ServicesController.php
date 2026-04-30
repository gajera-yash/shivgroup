<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Services;
use App\Models\Subservices;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ServicesController extends Controller
{
    public function index(Request $request)
    {
        try {
            $services = Services::with('subservices')->orderBy('id', 'desc')->get();

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
            $service = Services::with('subservices')->find($edit);

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
