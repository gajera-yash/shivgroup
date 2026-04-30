<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceRule extends Model
{
    protected $table = "service_rules";

    protected $fillable = ['service_id', 'rule'];

    protected $hidden = ['created_at', 'updated_at'];

    public function service()
    {
        return $this->belongsTo(Services::class, 'service_id', 'id');
    }
}
