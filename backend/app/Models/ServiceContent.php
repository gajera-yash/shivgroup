<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class ServiceContent extends Model
{
    protected $table = "service_contents";

    protected $fillable = [
        'service_id',
        'title',
        'description',
        'content_image',
    ];

    protected $hidden = ['created_at', 'updated_at'];

    protected function contentImage(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value ? Storage::url($value) : null,
        );
    }

    public function service()
    {
        return $this->belongsTo(Services::class, 'service_id', 'id');
    }
}
