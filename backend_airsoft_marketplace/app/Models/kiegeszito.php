<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class kiegeszito extends Model
{
    use HasFactory;
    public $table = 'kiegeszitok';
    public $timestamps = false;
    public $guarded = [];
    protected $fillable = ['nev', 'tipus', 'ar', 'leiras', 'kiegeszitok_img1','kiegeszitok_img2','kiegeszitok_img3','tulajdonos','eladva'];

    public function tulajdonos()
    {
        return $this->belongsTo(felhasznalo::class,'tulajdonos');
    }
}
