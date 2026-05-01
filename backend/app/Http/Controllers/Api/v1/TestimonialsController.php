<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class TestimonialsController extends Controller
{
    public function index()
    {
        try {
            $testimonials = Testimonial::orderBy('id', 'desc')->get();

            return response()->json([
                'status' => 'success',
                'message' => 'Testimonials retrieved successfully.',
                'data' => $testimonials,
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
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'quote' => 'required|string',
            'testimonial_image' => $editId ? 'nullable|image|mimes:jpg,jpeg,png,webp' : 'required|image|mimes:jpg,jpeg,png,webp',
            'status' => 'required|in:1,0',
        ]);

        DB::beginTransaction();
        try {
            $existing = null;
            if ($editId !== null) {
                $existing = Testimonial::findOrFail($editId);
            }

            $image = $existing ? $existing->getRawOriginal('testimonial_image') : null;

            if ($request->hasFile('testimonial_image')) {
                if ($existing && !empty($image) && Storage::disk('public')->exists($image)) {
                    Storage::disk('public')->delete($image);
                }
                $image = $request->file('testimonial_image')->store('testimonial_image', 'public');
            }

            $testimonial = Testimonial::updateOrCreate(
                ['id' => $editId],
                [
                    'name' => $request->name,
                    'position' => $request->position,
                    'quote' => $request->quote,
                    'testimonial_image' => $image,
                    'status' => $request->status,
                ]
            );

            DB::commit();
            return response()->json([
                'status' => 'success',
                'message' => $editId ? 'Testimonial updated successfully.' : 'Testimonial created successfully.',
                'data' => $testimonial,
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
            $testimonial = Testimonial::find($id);

            if (!$testimonial) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Testimonial not found.',
                    'data' => null,
                ], 404);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Testimonial retrieved successfully.',
                'data' => $testimonial,
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
            $testimonial = Testimonial::findOrFail($id);
            $image = $testimonial->getRawOriginal('testimonial_image');

            if ($testimonial->testimonial_image && Storage::disk('public')->exists($image)) {
                Storage::disk('public')->delete($image);
            }

            $testimonial->delete();
            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Testimonial deleted successfully.',
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

    public function testimonials()
    {
        try {
            $testimonial = Testimonial::where("status", 1)->orderBy("id", "desc")->get();

            return response()->json([
                'status' => true,
                'message' => 'Testimonials retrieved successfully.',
                'data' => $testimonial,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
