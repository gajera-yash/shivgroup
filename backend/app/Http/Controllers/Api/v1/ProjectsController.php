<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProjectPoint;
use App\Models\ProjectSection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProjectsController extends Controller
{
    public function index()
    {
        try {
            $projects = Project::with(['points', 'sections', 'project_category'])->orderBy('id', 'desc')->get();

            return response()->json([
                'status' => true,
                'message' => 'Data Fetch Successfully',
                'data' => $projects,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Internal Server Error',
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $editId = $request->edit;

        $request->validate([
            'edit' => 'nullable',
            'project_category_id' => 'required|exists:project_categories,id',
            'title' => 'required|string|max:255',
            'status' => 'required|in:1,0',
            'project_image' => $editId ? 'nullable|image|mimes:jpg,jpeg,png,webp|max:10240' : 'required|image|mimes:jpg,jpeg,png,webp|max:10240',
            'tags' => 'required|string',
            'description' => 'required|string',
            'map_link' => 'required|string',
            'project_points' => 'required|array|min:1',
            'project_points.*.point' => 'required|string',
            'project_sections' => 'required|array|min:1',
            'project_sections.*.section_title' => 'required|string|max:255',
            'project_sections.*.section_content' => 'required|string',
            'project_sections.*.section_image' => $editId ? 'nullable|image|mimes:jpg,jpeg,png,webp|max:10240' : 'required|image|mimes:jpg,jpeg,png,webp|max:10240',
        ], [
            'project_category_id.required' => 'Please select a project category.',
            'project_category_id.exists' => 'The selected category is invalid.',
            'title.required' => 'Project title is required.',
            'status.required' => 'Please select a status.',
            'project_image.required' => 'Project main image is required.',
            'tags.required' => 'At least one project tag is required.',
            'description.required' => 'Project description is required.',
            'map_link.required' => 'Google Maps embed URL is required.',
            'project_points.required' => 'At least one project point is required.',
            'project_points.*.point.required' => 'Each project point description is required.',
            'project_sections.required' => 'At least one project section is required.',
            'project_sections.*.section_title.required' => 'Section title is required.',
            'project_sections.*.section_content.required' => 'Section description is required.',
            'project_sections.*.section_image.required' => 'Section image is required.',
        ]);

        DB::beginTransaction();
        try {
            $projectData = [
                'project_category_id' => $request->project_category_id,
                'title' => $request->title,
                'status' => $request->status,
                'description' => $request->description,
                'map_link' => $request->map_link,
            ];

            if ($request->has('tags')) {
                $tags = json_decode($request->tags, true);
                if(json_last_error() !== JSON_ERROR_NONE) {
                    $tags = array_map('trim', explode(',', $request->tags));
                }
                $projectData['tags'] = $tags;
            }

            if ($request->hasFile('project_image')) {
                if ($editId) {
                    $existingProject = Project::find($editId);
                    if ($existingProject) {
                        $oldPath = $existingProject->getRawOriginal('project_image');
                        if ($oldPath && Storage::disk('public')->exists($oldPath)) {
                            Storage::disk('public')->delete($oldPath);
                        }
                    }
                }
                $projectData['project_image'] = $request->file('project_image')->store('project_image', 'public');
            }

            $project = Project::updateOrCreate(
                ['id' => $editId],
                $projectData
            );

            // Handle Project Points
            if ($request->has('project_points')) {
                $submittedPointIds = collect($request->project_points)->pluck('id')->filter()->toArray();
                ProjectPoint::where('project_id', $project->id)
                    ->whereNotIn('id', $submittedPointIds)
                    ->delete();

                foreach ($request->project_points as $pointData) {
                    ProjectPoint::updateOrCreate(
                        ['id' => $pointData['id'] ?? null, 'project_id' => $project->id],
                        ['point' => $pointData['point']]
                    );
                }
            } else {
                ProjectPoint::where('project_id', $project->id)->delete();
            }

            // Handle Project Sections
            if ($request->has('project_sections')) {
                $submittedSectionIds = collect($request->project_sections)->pluck('id')->filter()->toArray();
                
                $sectionsToDelete = ProjectSection::where('project_id', $project->id)
                    ->whereNotIn('id', $submittedSectionIds)
                    ->get();
                    
                foreach ($sectionsToDelete as $sec) {
                    $path = $sec->getRawOriginal('section_image');
                    if ($path && Storage::disk('public')->exists($path)) {
                        Storage::disk('public')->delete($path);
                    }
                    $sec->delete();
                }

                foreach ($request->project_sections as $index => $sectionData) {
                    $secId = $sectionData['id'] ?? null;
                    $sectionArray = [
                        'project_id' => $project->id,
                        'section_title' => $sectionData['section_title'],
                        'section_content' => $sectionData['section_content'],
                    ];

                    $fileKey = "project_sections.$index.section_image";
                    if ($request->hasFile($fileKey)) {
                        if ($secId) {
                            $existingSec = ProjectSection::find($secId);
                            if ($existingSec) {
                                $oldPath = $existingSec->getRawOriginal('section_image');
                                if ($oldPath && Storage::disk('public')->exists($oldPath)) {
                                    Storage::disk('public')->delete($oldPath);
                                }
                            }
                        }
                        $sectionArray['section_image'] = $request->file($fileKey)->store('project_sections', 'public');
                    }

                    ProjectSection::updateOrCreate(
                        ['id' => $secId, 'project_id' => $project->id],
                        $sectionArray
                    );
                }
            } else {
                $allSections = ProjectSection::where('project_id', $project->id)->get();
                foreach ($allSections as $sec) {
                    $path = $sec->getRawOriginal('section_image');
                    if ($path && Storage::disk('public')->exists($path)) {
                        Storage::disk('public')->delete($path);
                    }
                    $sec->delete();
                }
            }

            DB::commit();

            return response()->json([
                'status' => true,
                'message' => $editId ? 'Project updated successfully.' : 'Project added successfully.',
                'data' => $project->load(['points', 'sections']),
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
            $project = Project::with(['points', 'sections', 'project_category'])->find($edit);

            if (!$project) {
                return response()->json([
                    'status' => false,
                    'message' => 'Project record not found.',
                    'data' => null,
                ], 404);
            }

            return response()->json([
                'status' => true,
                'message' => 'Project retrieved successfully.',
                'data' => $project,
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
            $project = Project::with('sections')->findOrFail($delete);

            // Delete project image
            $path = $project->getRawOriginal('project_image');
            if ($path && Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);
            }

            // Delete section images
            foreach ($project->sections as $sec) {
                $secPath = $sec->getRawOriginal('section_image');
                if ($secPath && Storage::disk('public')->exists($secPath)) {
                    Storage::disk('public')->delete($secPath);
                }
            }

            $project->delete();
            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'Project deleted successfully.',
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
