<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Storage;

class ProjectSection extends Model
{
    protected $table = "project_sections";

    protected $fillable = [
        'project_id',
        'section_title',
        'section_content',
        'section_image',
    ];

    protected $hidden = ['created_at', 'updated_at'];

    protected function sectionImage(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value ? Storage::url($value) : null,
        );
    }

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id', 'id');
    }
}
