<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('felhasznalok', function (Blueprint $table) {
            $table->id();
            $table->string('nev');
            $table->string('email');
            $table->string('jelszo');
            $table->string('telefonszam');
            $table->string('profilkep')->nullable();
            $table->date('szulDatum')->nullable();
            $table->date('regisztracio_datuma')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('felhasznalok');
    }

    

};
