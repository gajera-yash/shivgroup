<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Storage;

class HomeBanner extends Model
{
    protected $table = "home_banners";

    protected $fillable = [
        'title',
        'description',
        'banner_image',
        'status',
    ];

    protected $hidden = ['created_at', 'updated_at'];

    public function bannerImage(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value ? Storage::url($value) : asset('images/hero-section.webp'),
        );
    }

    public function id(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value ? Crypt::encrypt($value) : null,
        );
    }
}
