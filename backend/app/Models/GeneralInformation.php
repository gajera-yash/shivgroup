<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class GeneralInformation extends Model
{
    protected $table = "general_information";
    protected $fillable = [
        'company_name',
        'tagline',
        'mobile',
        'email',
        'address',
        'company_logo',
    ];

    protected $hidden = ['created_at', 'updated_at'];

    protected function companyLogo(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value ? Storage::url($value) : null,
        );
    }
}
