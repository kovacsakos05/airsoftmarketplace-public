<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class kiszallitas extends Model
{
    use HasFactory;
    public $table = 'kiszallitasok';
    public $timestamps = false;
    public $guarded = [];
}
