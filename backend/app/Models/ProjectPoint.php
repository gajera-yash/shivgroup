<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectPoint extends Model
{

    protected $table = "project_points";

    protected $fillable = [
        'project_id',
        'point',
    ];

    protected $hidden = ['created_at', 'updated_at'];

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id', 'id');
    }
}
