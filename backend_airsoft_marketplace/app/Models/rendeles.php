<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class rendeles extends Model
{
    use HasFactory;
    public $table = 'rendelesek';
    public $timestamps = false;
    public $guarded = [];

    public function fegyver()
    {
        return $this->belongsTo(fegyver::class, 'fegyverek_id')->withDefault();
    }

    public function kiegeszito()
    {
        return $this->belongsTo(kiegeszito::class, 'kiegeszitok_id')->withDefault();
    }

    public function kiszallitas()
    {
        return $this->belongsTo(kiszallitas::class, 'kiszallitasok_id')->withDefault();
    }

    public function felhasznalo()
    {
        return $this->belongsTo(felhasznalo::class, 'felhasznalok_id')->withDefault();
    }
}
