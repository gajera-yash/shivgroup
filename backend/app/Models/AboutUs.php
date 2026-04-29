<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;

class AboutUs extends Model
{
    use HasFactory;

    protected $table = "about_us";

    protected $fillable = [
        'year',
        'title',
        'description',
        'status',
    ];

    protected $hidden = ['created_at', 'updated_at'];

    public function getKey()
    {
        return $this->attributes[$this->primaryKey] ?? null;
    }

    // public function id(): Attribute
    // {
    //     return Attribute::make(
    //         get: fn($value) => $value ? Crypt::encrypt($value) : null,
    //     );
    // }

    public function aboutUsImages()
    {
        return $this->hasMany(AboutUsImage::class, 'aboutus_id', 'id');
    }
}
