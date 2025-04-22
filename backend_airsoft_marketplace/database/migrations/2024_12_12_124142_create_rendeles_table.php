<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rendelesek', function (Blueprint $table) {
            $table->id();
            $table->integer('fegyverek_id')->references('id')->on('fegyverek')->nullable();
            $table->integer('kiegeszitok_id')->references('id')->on('kiegeszitok')->nullable();
            $table->integer('felhasznalok_id')->references('id')->on('felhasznalok');
            $table->string('keresztnev');
            $table->string('vezeteknev');
            $table->integer('iranyitoszam');
            $table->string('varos');
            $table->string('utca_hazszam');
            $table->string('telefonszam');
            $table->integer('kiszallitasok_id')->references('id')->on('kiszallitasok');
            $table->integer('fizetendo');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rendelesek');
    }
};
