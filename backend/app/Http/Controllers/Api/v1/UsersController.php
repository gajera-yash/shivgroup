<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            "email" => "required|email",
            "password" => "required",
        ]);

        try {

            $admin = User::where('email', $request->email)->where('role_id', 1)->first();

            if (!$admin) {
                return response()->json([
                    'status' => false,
                    'message' => 'User not found',
                ], 404);
            }

            if (!Hash::check($request->password, $admin->password)) {
                return response()->json([
                    'status' => false,
                    'message' => 'Invalid password',
                ], 401);
            }

            $token = $admin->createToken('auth_token')->plainTextToken;

            return response()->json([
                'status' => true,
                'message' => 'Admin logged in successfully',
                'data' => [
                    'user' => $admin,
                    'token' => $token,
                ]
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        try {

            $admin = $request->user();

            $admin->currentAccessToken()->delete();

            return response()->json([
                'status' => true,
                'message' => 'Admin logged out successfully',
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }
}
