<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\HomeBanner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class HomeBannersController extends Controller
{
    public function index()
    {
        try {
            $banners = HomeBanner::orderBy("id", "desc")->get();

            if ($banners->isEmpty()) {
                return response()->json([
                    "status" => "success",
                    "message" => "No banners found.",
                    "data" => null
                ]);
            }

            return response()->json([
                "status" => "success",
                "message" => "Banners retrieved successfully.",
                "data" => $banners
            ]);
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
                $editId = Crypt::decrypt($request->edit);
            } catch (\Exception $e) {
                return response()->json([
                    "status" => "error",
                    "message" => "Invalid ID.",
                    "data" => null
                ], 400);
            }
        }

        $request->validate([
            'edit' => 'nullable|string',
            'title' => 'required|string|unique:home_banners,title,' . $editId . ',id',
            'description' => 'nullable|string',
            'banner_image' => $editId ? 'nullable|image|mimes:jpg,jpeg,png,webp' : 'required|image|mimes:jpg,jpeg,png,webp',
            'status' => 'required|in:1,0',
        ]);

        DB::beginTransaction();
        try {
            $existingBanner = null;
            if ($editId != null) {
                $existingBanner = HomeBanner::findOrFail($editId);
            }

            $banner_image = $existingBanner ? $existingBanner->getRawOriginal('banner_image') : null;

            if ($request->hasFile('banner_image')) {
                if ($existingBanner && !empty($existingBanner->banner_image) && Storage::disk('public')->exists($banner_image)) {
                    Storage::disk('public')->delete($banner_image);
                }

                $banner_image = $request->file('banner_image')->store('banner_image', 'public');
            }

            $home = HomeBanner::updateOrcreate(
                ['id' => $editId],
                [
                    'title' => $request->title,
                    'description' => $request->description,
                    'banner_image' => $banner_image,
                    'status' => $request->status,
                ]
            );

            if (!$home) {
                DB::rollBack();
                return response()->json([
                    "status" => "error",
                    "message" => "Failed to create/update banner.",
                    "data" => null
                ], 422);
            }

            DB::commit();
            return response()->json([
                'status' => 'success',
                'message' => $editId ? 'Banner updated successfully.' : 'Banner created successfully.',
                'data' => $home
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
            $id = Crypt::decrypt($edit);
            $banner = HomeBanner::where("id", $id)->first();

            if (!$banner) {
                return response()->json([
                    "status" => "error",
                    "message" => "Banner not found.",
                    "data" => null
                ], 404);
            }

            return response()->json([
                "status" => "success",
                "message" => "Banners retrieved successfully.",
                "data" => $banner
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
        $id = Crypt::decrypt($delete);
        DB::beginTransaction();
        try {
            $banner = HomeBanner::findOrFail($id);
            $banner_image = $banner ? $banner->getRawOriginal('banner_image') : null;

            if ($banner_image && Storage::disk('public')->exists($banner_image)) {
                Storage::disk('public')->delete($banner_image);
            }

            $banner->delete();
            DB::commit();
            return response()->json([
                'status' => 'success',
                'message' => 'Home Banner deleted successfully.',
                'data' => null
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
