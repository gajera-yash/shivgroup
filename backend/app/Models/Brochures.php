<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Brochures extends Model
{
    protected $table = "brochures";

    protected $fillable = [
        'service_id',
        'brochure_file',
    ];

    protected $hidden = ['created_at', 'updated_at'];

    public function brochureFile(): Attribute
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
