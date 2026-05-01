<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\AboutUs;
use App\Models\AboutUsImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class AboutUsController extends Controller
{
    public function index()
    {
        try {
            $about_us = AboutUs::with('aboutUsImages')->get();

            return response()->json([
                "status" => true,
                "message" => "Data Fetch Successfully",
                "data" => $about_us,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                "status" => false,
                "message" => "Internal Server Error",
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $editId = $request->edit;

        $request->validate([
            'edit' => 'nullable',
            'year' => 'required|string|max:20',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'status' => 'required|in:1,0',
            'about_image_0' => $request->edit ? 'nullable|image|mimes:jpg,jpeg,png,webp' : 'required|image|mimes:jpg,jpeg,png,webp',
            'about_image_1' => $request->edit ? 'nullable|image|mimes:jpg,jpeg,png,webp' : 'required|image|mimes:jpg,jpeg,png,webp',
            'about_image_2' => $request->edit ? 'nullable|image|mimes:jpg,jpeg,png,webp' : 'required|image|mimes:jpg,jpeg,png,webp',
        ]);

        DB::beginTransaction();
        try {
            $aboutUs = AboutUs::updateOrCreate(
                ['id' => $editId],
                [
                    'year' => $request->year,
                    'title' => $request->title,
                    'description' => $request->description,
                    'status' => $request->status,
                ]
            );

            $aboutUsId = $aboutUs->id;

            // જો ઈમેજીસ મોકલી હોય (એરે સ્વરૂપે)
            for ($i = 0; $i < 3; $i++) {
                $key = "about_image_$i"; // React માંથી આવતી કી

                if ($request->hasFile($key)) {
                    $file = $request->file($key);

                    // ડેટાબેઝમાંથી તે ઈન્ડેક્સનો રેકોર્ડ મેળવો
                    // નોંધ: આ માટે 'id' ના બદલે ક્રમ મુજબ લેવા values()->get($i) વાપરી શકાય
                    $existingImages = AboutUsImage::where('aboutus_id', $aboutUsId)->orderBy('id', 'asc')->get();
                    $existingImage = $existingImages->get($i);

                    $newPath = $file->store('about_image', 'public');

                    if ($existingImage) {
                        // જૂની ફાઈલ ડીલીટ કરો
                        $oldPath = $existingImage->getRawOriginal('about_image');
                        if ($oldPath && Storage::disk('public')->exists($oldPath)) {
                            Storage::disk('public')->delete($oldPath);
                        }
                        // અપડેટ કરો
                        $existingImage->update(['about_image' => $newPath]);
                    } else {
                        // નવો રેકોર્ડ બનાવો
                        AboutUsImage::create([
                            'aboutus_id' => $aboutUsId,
                            'about_image' => $newPath,
                        ]);
                    }
                }
            }

            DB::commit();
            $aboutUs->load('aboutUsImages');

            return response()->json([
                'status' => true,
                'message' => $editId ? 'Updated successfully.' : 'Created successfully.',
                'data' => $aboutUs,
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['status' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function fetch($edit)
    {
        try {
            // $id = Crypt::decrypt($edit);
            $aboutUs = AboutUs::with('aboutUsImages')->find($edit);

            if (!$aboutUs) {
                return response()->json([
                    'status' => false,
                    'message' => 'About Us record not found.',
                    'data' => null,
                ], 404);
            }

            return response()->json([
                'status' => true,
                'message' => 'About Us retrieved successfully.',
                'data' => $aboutUs,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($delete)
    {
        DB::beginTransaction();
        try {
            // $id = Crypt::decrypt($delete);
            $aboutUs = AboutUs::with('aboutUsImages')->findOrFail($delete);

            foreach ($aboutUs->aboutUsImages as $image) {
                $path = $image->getRawOriginal('about_image');
                if ($path && Storage::disk('public')->exists($path)) {
                    Storage::disk('public')->delete($path);
                }
            }

            $aboutUs->delete();
            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'About Us deleted successfully.',
                'data' => null,
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
