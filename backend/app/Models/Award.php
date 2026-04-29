<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Storage;

class Award extends Model
{
    use HasFactory;

    protected $table = "awards";

    protected $fillable = [
        'award_title',
        'organization',
        'year',
        'award_image',
        'status',
    ];

    protected $hidden = ['created_at', 'updated_at'];

    public function awardImage(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value ? Storage::url($value) : null,
        );
    }

    public function id(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value ? Crypt::encrypt($value) : null,
        );
    }
}
