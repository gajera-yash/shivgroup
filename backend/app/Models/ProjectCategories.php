<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectCategories extends Model
{
    protected $table = "project_categories";

    protected $fillable = [
        'category_name',
        'status',
    ];

    protected $hidden = ['created_at','updated_at'];

    public function projects()
    {
        return $this->hasMany(Project::class,'project_category_id','id');
    }
}
