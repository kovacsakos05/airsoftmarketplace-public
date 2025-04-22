<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class felhasznalo extends Model
{
    use HasFactory;
    public $table = 'felhasznalok';
    public $timestamps = false;
    protected $fillable = ['nev', 'email', 'jelszo', 'telefonszam', 'profilkep', 'szulDatum', 'regisztracio_datuma'];
    public $guarded = [];
}
