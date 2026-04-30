<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subservices extends Model
{
    protected $table = "subservices";

    protected $fillable = [
        'service_id',
        'description',
    ];

    protected $hidden = ['created_at', 'updated_at'];

    public function service()
    {
        return $this->belongsTo(Services::class, 'id', 'service_id');
    }
}
