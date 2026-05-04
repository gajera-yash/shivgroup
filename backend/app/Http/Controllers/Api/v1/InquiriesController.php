<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Inquiries;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Storage;

class InquiriesController extends Controller
{
    public function index()
    {
        $inquiries = Inquiries::orderBy("id", "desc")->get();

        return response()->json([
            "status" => "success",
            "message" => "Inquiries retrieved successfully.",
            "data" => $inquiries
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            "name" => "required|string|max:255",
            "mobile" => "required|numeric|digits:10|regex:/^[6-9][0-9]{9}$/",
            "email" => "required|email|max:255",
            "subject" => "required|string|max:255",
            "message" => "required|string|min:10",
            "attachment" => "nullable|file|mimes:jpg,jpeg,png,webp,pdf,doc,docx|max:10240"
        ]);

        $data = [
            "name" => $request->name,
            "mobile" => $request->mobile,
            "email" => $request->email,
            "subject" => $request->subject,
            "message" => $request->message
        ];

        if ($request->hasFile('attachment')) {
            $data['attachment'] = $request->file('attachment')->store('inquiry_attachments', 'public');
        }

        $inquiry = Inquiries::create($data);

        return response()->json([
            "status" => "success",
            "message" => "Inquiry created successfully.",
            "data" => $inquiry
        ], 200);
    }

    public function fetch($fetch)
    {
        try {
            $id = Crypt::decrypt($fetch);
            $inquiry = Inquiries::find($id);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => "Invalid ID.",
                "data" => null
            ], 404);
        }

        return response()->json([
            "status" => "success",
            "message" => "Inquiry retrieved successfully.",
            "data" => $inquiry
        ], 200);
    }

    public function destroy($delete)
    {
        try {
            $id = Crypt::decrypt($delete);
            $inquiry = Inquiries::find($id);

            if (!$inquiry) {
                return response()->json([
                    "status" => "error",
                    "message" => "Inquiry not found.",
                    "data" => null
                ], 404);
            }

            // Delete attachment if exists
            $path = $inquiry->getRawOriginal('attachment');
            if ($path && Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);
            }

            $inquiry->delete();
            return response()->json([
                "status" => "success",
                "message" => "Inquiry deleted successfully.",
                "data" => null
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => $e->getMessage(),
                "data" => null
            ], 500);
        }
    }
}
