<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $table = "roles";

    protected $fillable = ['role_name'];

    protected $hidden = ['created_at', 'updated_at'];

    public function users()
    {
        return $this->hasOne(User::class, 'role_id', 'id');
    }
}
