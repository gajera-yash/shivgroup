<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Storage;

class Project extends Model
{
    protected $table = "projects";

    protected $fillable = [
        'project_category_id',
        'title',
        'status',
        'project_image',
        'tags',
        'description',
        'map_link',
    ];

    protected $casts = [
        'tags' => 'array',
    ];

    protected $hidden = ['created_at', 'updated_at'];

    protected function projectImage(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value ? Storage::url($value) : null,
        );
    }

    public function project_category()
    {
        return $this->belongsTo(ProjectCategories::class, 'project_category_id', 'id');
    }

    public function points()
    {
        return $this->hasMany(ProjectPoint::class, 'project_id', 'id');
    }

    public function sections()
    {
        return $this->hasMany(ProjectSection::class, 'project_id', 'id');
    }

}
