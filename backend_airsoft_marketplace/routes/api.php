<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FegyverController;
use App\Http\Controllers\FelhasznaloController;
use App\Http\Controllers\KiegeszitoController;
use App\Http\Controllers\KiszallitasController;
use App\Http\Controllers\RendelesController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::get('/fegyverek',[FegyverController::class,'index']);
Route::get('/felhasznalok',[FelhasznaloController::class,'index']);
Route::get('/kiegeszitok',[KiegeszitoController::class,'index']);
Route::get('/kiszallitasok',[KiszallitasController::class,'index']);
Route::get('/rendelesek',[RendelesController::class,'index']);

Route::post('/fegyverek',[FegyverController::class,'store']);
Route::post('/felhasznalok',[FelhasznaloController::class,'store']);
Route::post('/kiegeszitok',[KiegeszitoController::class,'store']);
Route::post('/kiszallitasok',[KiszallitasController::class,'store']);
Route::post('/rendelesek',[RendelesController::class,'store']);

Route::get('/fegyverek/{id}',[FegyverController::class,'getById']);
Route::get('/fegyverek/fps/{fps}',[FegyverController::class,'FilterByFPS']);
Route::get('/fegyverek/dragabb/{price}',[FegyverController::class,'getDragabb']);
Route::get('/fegyverek/olcsobb/{price}',[FegyverController::class,'getOlcsobb']);
Route::put('/fegyverek/{id}',[FegyverController::class,'update']);
Route::delete('/fegyverek/{id}',[FegyverController::class,'destroy']);

Route::get('/felhasznalok/{id}',[FelhasznaloController::class,'getById']);
Route::put('/felhasznalok/{id}',[FelhasznaloController::class,'update']);
Route::delete('/felhasznalok/{id}',[FelhasznaloController::class,'destroy']);
Route::post('/felhasznalok/{id}/profilkep', [FelhasznaloController::class, 'uploadProfilePicture']);



Route::get('/kiegeszitok/{id}',[KiegeszitoController::class,'getById']);
Route::get('/kiegeszitok/tipus/{tipus}',[KiegeszitoController::class,'FilterByTipus']);
Route::get('/kiegeszitok/dragabb/{price}',[KiegeszitoController::class,'getDragabb']);
Route::get('/kiegeszitok/olcsobb/{price}',[KiegeszitoController::class,'getOlcsobb']);
Route::put('/kiegeszitok/{id}',[KiegeszitoController::class,'update']);
Route::delete('/kiegeszitok/{id}',[KiegeszitoController::class,'destroy']);

Route::get('/kiszallitasok/{id}',[KiszallitasController::class,'getById']);
Route::put('/kiszallitasok/{id}',[KiszallitasController::class,'update']);
Route::delete('/kiszallitasok/{id}',[KiszallitasController::class,'destroy']);

Route::get('/rendelesek/{id}',[RendelesController::class,'getById']);
Route::put('/rendelesek/{id}',[RendelesController::class,'update']);
Route::delete('/rendelesek/{id}',[RendelesController::class,'destroy']);
Route::get('/rendelesek/felhasznalo/{id}', [RendelesController::class, 'getByFelhasznalo']);

