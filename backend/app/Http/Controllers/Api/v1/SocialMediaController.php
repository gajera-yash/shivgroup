<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\SocialMedia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SocialMediaController extends Controller
{
    public function index()
    {
        try {
            $socials = SocialMedia::all();
            return response()->json([
                'status' => true,
                'message' => 'Social media links fetched successfully',
                'data' => $socials,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to fetch social media links',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'socials' => 'required|array',
            'socials.*.platform' => 'required|string',
            'socials.*.url' => 'nullable|url',
        ], [
            'socials.*.url.url' => 'Please enter a valid URL for :attribute.',
        ]);

        DB::beginTransaction();
        try {
            foreach ($request->socials as $item) {
                SocialMedia::updateOrCreate(
                    ['platform' => $item['platform']],
                    ['url' => $item['url']]
                );
            }
            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'Social media links updated successfully',
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => 'Failed to update social media links',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function getSocialMediaLinks()
    {
        try {
            $socials = SocialMedia::all();
            return response()->json([
                'status' => true,
                'message' => 'Social media links fetched successfully',
                'data' => $socials,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to fetch social media links',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
