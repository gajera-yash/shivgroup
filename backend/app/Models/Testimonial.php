<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Storage;

class Testimonial extends Model
{
    protected $table = "testimonials";

    protected $fillable = [
        'name',
        'position',
        'quote',
        'testimonial_image',
        'status',
    ];

    protected $hidden = ['created_at', 'updated_at'];

    public function testimonialImage(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value ? Storage::url($value) : asset('images/default-avatar.png'),
        );
    }

    public function id(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value ? Crypt::encrypt($value) : null,
        );
    }
}
