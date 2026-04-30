<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Award;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class AwardsController extends Controller
{
    public function index()
    {
        try {
            $awards = Award::orderBy('id', 'desc')->get();

            return response()->json([
                'status' => true,
                'message' => 'Awards retrieved successfully.',
                'data' => $awards,
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
                $editId = Crypt::decrypt($request->edit);
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
            'award_title' => 'required|string|max:255',
            'organization' => 'required|string|max:255',
            'year' => 'required|string|max:10',
            'award_image' => 'nullable|image|mimes:jpg,jpeg,png,webp',
            'status' => 'required|in:1,0',
        ]);

        DB::beginTransaction();
        try {
            $existing = null;
            if ($editId !== null) {
                $existing = Award::findOrFail($editId);
            }

            $awardImage = $existing ? $existing->getRawOriginal('award_image') : null;

            if ($request->hasFile('award_image')) {
                if ($existing && !empty($awardImage) && Storage::disk('public')->exists($awardImage)) {
                    Storage::disk('public')->delete($awardImage);
                }

                $awardImage = $request->file('award_image')->store('award_image', 'public');
            }

            $award = Award::updateOrCreate(
                ['id' => $editId],
                [
                    'award_title' => $request->award_title,
                    'organization' => $request->organization,
                    'year' => $request->year,
                    'award_image' => $awardImage,
                    'status' => $request->status,
                ]
            );

            DB::commit();
            return response()->json([
                'status' => 'success',
                'message' => $editId ? 'Award updated successfully.' : 'Award created successfully.',
                'data' => $award,
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
            $award = Award::find($id);

            if (!$award) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Award not found.',
                    'data' => null,
                ], 404);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Award retrieved successfully.',
                'data' => $award,
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
            $id = Crypt::decrypt($delete);
            $award = Award::findOrFail($id);
            $awardImage = $award->getRawOriginal('award_image');

            if ($awardImage && Storage::disk('public')->exists($awardImage)) {
                Storage::disk('public')->delete($awardImage);
            }

            $award->delete();
            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Award deleted successfully.',
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
