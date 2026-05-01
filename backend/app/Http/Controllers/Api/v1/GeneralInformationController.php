<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\GeneralInformation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class GeneralInformationController extends Controller
{
    public function index()
    {
        try {
            $generalInformation = GeneralInformation::first();
            
            return response()->json([
                'status' => true,
                'message' => 'General information fetched successfully',
                'data' => $generalInformation,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to fetch general information',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'company_name' => 'required|string|max:255',
            'tagline' => 'required|string',
            'mobile' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'address' => 'required|string',
            'company_logo' => GeneralInformation::first() ? 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120' : 'required|image|mimes:jpg,jpeg,png,webp|max:5120',
        ], [
            'company_name.required' => 'Company Name is required.',
            'tagline.required' => 'Tagline is required.',
            'mobile.required' => 'Phone Number is required.',
            'email.required' => 'Email Address is required.',
            'email.email' => 'Please enter a valid email address.',
            'address.required' => 'Office Address is required.',
            'company_logo.required' => 'Website Logo is required.',
        ]);

        DB::beginTransaction();
        try {
            $generalInformation = GeneralInformation::first();
            
            $data = [
                'company_name' => $request->company_name,
                'tagline' => $request->tagline,
                'mobile' => $request->mobile,
                'email' => $request->email,
                'address' => $request->address,
            ];

            if ($request->hasFile('company_logo')) {
                if ($generalInformation) {
                    $oldPath = $generalInformation->getRawOriginal('company_logo');
                    if ($oldPath && Storage::disk('public')->exists($oldPath)) {
                        Storage::disk('public')->delete($oldPath);
                    }
                }
                $data['company_logo'] = $request->file('company_logo')->store('company_logo', 'public');
            }

            $info = GeneralInformation::updateOrCreate(
                ['id' => $generalInformation->id ?? null],
                $data
            );

            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'General information saved successfully',
                'data' => $info,
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => 'Failed to save general information',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
