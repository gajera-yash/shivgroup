<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Award;
use App\Models\Inquiries;
use App\Models\Partner;
use App\Models\Project;
use App\Models\Services;
use App\Models\Testimonial;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        try {
            $stats = [
                'total_projects' => Project::count(),
                'total_inquiries' => Inquiries::count(),
                'total_services' => Services::count(),
                'total_testimonials' => Testimonial::count(),
                'total_partners' => Partner::count(),
                'total_awards' => Award::count(),
                'total_admins' => User::count(),
            ];

            $recent_inquiries = Inquiries::orderBy('created_at', 'desc')->take(5)->get();

            return response()->json([
                'status' => 'success',
                'message' => 'Dashboard statistics retrieved successfully.',
                'data' => [
                    'stats' => $stats,
                    'recent_inquiries' => $recent_inquiries
                ]
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to retrieve dashboard statistics.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
