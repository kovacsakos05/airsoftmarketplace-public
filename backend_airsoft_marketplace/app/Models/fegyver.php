<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class fegyver extends Model
{
    use HasFactory;
    public $table = 'fegyverek';
    public $timestamps = false;
    public $guarded = [];
    protected $fillable = ['nev', 'tipus', 'ar', 'leiras', 'mechanika', 'fps', 'suly', 'hossza', 'csohossza', 'tuzmod', 'fegyverek_img1', 'fegyverek_img2', 'fegyverek_img3','tulajdonos','eladva'];

    public function tulajdonos()
    {
        return $this->belongsTo(felhasznalo::class,'tulajdonos');
    }
}
