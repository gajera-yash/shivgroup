<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Services extends Model
{
    protected $table = "services";

    protected $fillable = [
        'title',
        'short_description',
        'full_description',
        'service_image',
        'status',
    ];

    protected $hidden = ['created_at', 'updated_at'];

    public function serviceImage(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value ? Storage::url($value) : null,
        );
    }

    public function subservices()
    {
        return $this->hasMany(Subservices::class, 'service_id', 'id');
    }
}
