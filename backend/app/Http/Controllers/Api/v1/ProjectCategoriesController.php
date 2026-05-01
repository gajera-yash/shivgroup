<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\ProjectCategories;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProjectCategoriesController extends Controller
{
    public function index()
    {
        try {
            $categories = ProjectCategories::orderBy('id', 'desc')->get();

            return response()->json([
                'status' => true,
                'message' => 'Project categories retrieved successfully',
                'data' => $categories,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $editId = $request->edit;

        $request->validate([
            'edit' => 'nullable|exists:project_categories,id',
            'category_name' => 'required|string|max:255|unique:project_categories,category_name,' . $editId, 
            'status' => 'required|in:1,0',
        ]);

        DB::beginTransaction();
        try {
            $category = ProjectCategories::updateOrCreate(
                ['id' => $editId],
                [
                    'category_name' => $request->category_name,
                    'status' => $request->status,
                ]
            );

            DB::commit();

            return response()->json([
                'status' => true,
                'message' => $editId ? 'Project category updated successfully' : 'Project category created successfully',
                'data' => $category,
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function fetch($edit)
    {
        try {
            $category = ProjectCategories::find($edit);

            if (!$category) {
                return response()->json([
                    'status' => false,
                    'message' => 'Project category not found',
                    'data' => null,
                ], 404);
            }

            return response()->json([
                'status' => true,
                'message' => 'Project category retrieved successfully',
                'data' => $category,
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
            $category = ProjectCategories::find($delete);

            if (!$category) {
                return response()->json([
                    'status' => false,
                    'message' => 'Project category not found',
                    'data' => null,
                ], 404);
            }

            $category->delete();
            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'Project category deleted successfully',
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
