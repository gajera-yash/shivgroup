<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Partner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class PartnersController extends Controller
{
    public function index()
    {
        try {
            $partners = Partner::orderBy('id', 'desc')->get();

            return response()->json([
                'status' => true,
                'message' => 'Partners retrieved successfully.',
                'data' => $partners,
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
            'partner_name' => 'required|string|max:255',
            'partner_image' => $editId ? 'nullable|image|mimes:jpg,jpeg,png,webp' : 'required|image|mimes:jpg,jpeg,png,webp',
            'status' => 'required|in:1,0',
        ]);

        DB::beginTransaction();
        try {
            $existing = null;
            if ($editId !== null) {
                $existing = Partner::findOrFail($editId);
            }

            $partnerImage = $existing ? $existing->getRawOriginal('partner_image') : null;

            if ($request->hasFile('partner_image')) {
                if ($existing && !empty($partnerImage) && Storage::disk('public')->exists($partnerImage)) {
                    Storage::disk('public')->delete($partnerImage);
                }

                $partnerImage = $request->file('partner_image')->store('partner_image', 'public');
            }

            $partner = Partner::updateOrCreate(
                ['id' => $editId],
                [
                    'partner_name' => $request->partner_name,
                    'partner_image' => $partnerImage,
                    'status' => $request->status,
                ]
            );

            DB::commit();
            return response()->json([
                'status' => 'success',
                'message' => $editId ? 'Partner updated successfully.' : 'Partner created successfully.',
                'data' => $partner,
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
            $partner = Partner::find($id);

            if (!$partner) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Partner not found.',
                    'data' => null,
                ], 404);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Partner retrieved successfully.',
                'data' => $partner,
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
            $partner = Partner::findOrFail($id);
            $partnerImage = $partner->getRawOriginal('partner_image');

            if ($partnerImage && Storage::disk('public')->exists($partnerImage)) {
                Storage::disk('public')->delete($partnerImage);
            }

            $partner->delete();
            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Partner deleted successfully.',
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

    public function getPartners()
    {
        try {
            $partners = Partner::where("status", 1)->orderBy("id", "desc")->get();

            return response()->json([
                'status' => true,
                'message' => 'Partners retrieved successfully.',
                'data' => $partners,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
