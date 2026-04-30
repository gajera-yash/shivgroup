<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Storage;

class Inquiries extends Model
{
    protected $table = "inquiries";

    protected $fillable = [
        "name",
        "mobile",
        "email",
        "subject",
        "message",
        "attachment"
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    protected function id(): Attribute
    {
        return Attribute::make(
            get: fn($id) => $id ? Crypt::encrypt($id) : null,
        );
    }

    protected function attachment(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value ? Storage::url($value) : null,
        );
    }
}
