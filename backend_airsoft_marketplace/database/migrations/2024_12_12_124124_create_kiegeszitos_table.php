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
        Schema::create('kiegeszitok', function (Blueprint $table) {
            $table->id();
            $table->string('nev');
            $table->string('tipus');
            $table->integer('ar');
            $table->string('leiras');
            $table->string('kiegeszitok_img1')->nullable();
            $table->string('kiegeszitok_img2')->nullable();
            $table->string('kiegeszitok_img3')->nullable();
            $table->foreignId('tulajdonos')->references('id')->on('felhasznalok');
            $table->boolean('eladva')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kiegeszitok');
    }


    

};
