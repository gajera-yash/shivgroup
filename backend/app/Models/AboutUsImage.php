<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class AboutUsImage extends Model
{
    use HasFactory;

    protected $table = "about_us_images";

    protected $fillable = [
        'aboutus_id',
        'about_image',
    ];

    protected $hidden = ['created_at', 'updated_at'];

    public function aboutImage(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value ? Storage::url($value) : null,
        );
    }

    public function aboutUs()
    {
        return $this->belongsTo(AboutUs::class, 'aboutus_id');
    }
}
