<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SocialMedia extends Model
{
    protected $table = "social_media";
    protected $fillable = [
        'platform',
        'url',
    ];
    protected $hidden = ['created_at', 'updated_at'];
}
