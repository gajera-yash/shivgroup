<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class ProjectCategories extends Model
{
    protected $table = "project_categories";

    protected $fillable = [
        'category_name',
        'status',
    ];

    protected $hidden = ['created_at', 'updated_at'];

    public function projects()
    {
        return $this->hasMany(Project::class, 'project_category_id', 'id');
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function (ProjectCategories $projectCategories) {

            Project::where('project_category_id', $projectCategories->id)
                ->each(function (Project $project) {
                    $projectImage = $project->getRawOriginal('project_image');
                    if ($projectImage && Storage::disk('public')->exists($projectImage)) {
                        Storage::disk('public')->delete($projectImage);
                    }

                    ProjectSection::where('project_id', $project->id)
                        ->each(function (ProjectSection $projectSection) {
                            $sectionImage = $projectSection->getRawOriginal('section_image');
                            if ($sectionImage && Storage::disk('public')->exists($sectionImage)) {
                                Storage::disk('public')->delete($sectionImage);
                            }
                            $projectSection->forceDelete();
                        });

                    $project->forceDelete();
                });

        });
    }
}
