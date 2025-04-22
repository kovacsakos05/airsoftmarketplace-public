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
        Schema::create('fegyverek', function (Blueprint $table) {
            $table->id();
            $table->string('nev');
            $table->string('tipus');
            $table->integer('ar');
            $table->string('leiras');
            $table->string('mechanika');
            $table->integer('fps');
            $table->string('fegyverek_img1')->nullable();
            $table->string('fegyverek_img2')->nullable();
            $table->string('fegyverek_img3')->nullable();
            $table->integer('suly');
            $table->integer('hossza');
            $table->integer('csohossza');
            $table->string('tuzmod');
            $table->foreignId('tulajdonos')->references('id')->on('felhasznalok');
            $table->boolean('eladva')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fegyverek');
    }

    

};
