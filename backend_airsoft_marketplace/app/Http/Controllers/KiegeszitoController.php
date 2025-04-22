<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use App\Models\kiegeszito;
use Illuminate\Http\Request;

class KiegeszitoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    $keres = kiegeszito::where('eladva', false)->with('tulajdonos')->get();

    foreach ($keres as $kiegeszito) {
        if ($kiegeszito->kiegeszitok_img1) {
            $kiegeszito->kiegeszitok_img1 = asset('storage/' . $kiegeszito->kiegeszitok_img1);
        }
        if ($kiegeszito->kiegeszitok_img2) {
            $kiegeszito->kiegeszitok_img2 = asset('storage/' . $kiegeszito->kiegeszitok_img2);
        }
        if ($kiegeszito->kiegeszitok_img3) {
            $kiegeszito->kiegeszitok_img3 = asset('storage/' . $kiegeszito->kiegeszitok_img3);
        }
    }

    return $keres;
}

    public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'nev' => 'required',
        'tipus'=> 'required',
        'ar'=> 'required',
        'leiras'=> 'required',
        'kiegeszitok_img1'=> 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        'kiegeszitok_img2'=> 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        'kiegeszitok_img3'=> 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        'tulajdonos' => 'required|exists:felhasznalok,id'
    ]);

    if ($validator->fails()) {
        return response()->json(['üzenet' => 'Fontos adat kimaradt vagy hibás formátum'], 400);
    }

    $adatok = $request->all();

    foreach ([1, 2, 3] as $i) {
        $kulcs = "kiegeszitok_img$i";
        if ($request->hasFile($kulcs)) {
            $fajl = $request->file($kulcs);
            $utvonal = $fajl->store("kiegeszitok", 'public');
            $adatok[$kulcs] = $utvonal;
        }
    }

    $kiegeszito = kiegeszito::create($adatok);
    return response()->json(['nev' => $kiegeszito->nev], 201);
}

    
    public function getById($id)
    {
        $keres=kiegeszito::find($id);
        if(is_null($keres))
        {
            return response()->json(['Nem létezik'=>'Nem található adott id-jű objektum'],410);
        }
        $keres->load('tulajdonos');
        if ($keres->kiegeszitok_img1) {
            $keres->kiegeszitok_img1 = asset('storage/' . $keres->kiegeszitok_img1);
        }
        if ($keres->kiegeszitok_img2) {
            $keres->kiegeszitok_img2 = asset('storage/' . $keres->kiegeszitok_img2);
        }
        if ($keres->kiegeszitok_img3) {
            $keres->kiegeszitok_img3 = asset('storage/' . $keres->kiegeszitok_img3);
        }
        if (optional($keres->tulajdonos)->profilkep) {
            $keres->tulajdonos->profilkep = asset('storage/' . $keres->tulajdonos->profilkep);
        }
        return response()->json($keres,200);
    }

    public function getDragabb($price)
    {
        $kieg=kiegeszito::where('ar','>',$price);
        if($kieg->exists())
        {
            return $kieg->get();
        }
        else{
            return response()->json(['Nem létezik'=>'Nem található az adott értéknél kisebb / nagyobb attribútumú objektum'],417);
        }
    }

    public function getOlcsobb($price)
    {
        $kieg=kiegeszito::where('ar','<',$price);
        if($kieg->exists())
        {
            return $kieg->get();
        }
        else{
            return response()->json(['Nem létezik'=>'Nem található az adott értéknél kisebb / nagyobb attribútumú objektum'],417);
        }
    }

    public function FilterByTipus($tipus)
    {
        $kieg=kiegeszito::where('tipus','=',$tipus);
        if($kieg->exists())
        {
            return $kieg->get();
        }
        else{
            return response()->json(['Nem létezik'=>'Nem ilyen attribútumú kiegészítő'],407);
        }
    }

    public function destroy($id)
{
    $pusztit = kiegeszito::find($id);

    if (is_null($pusztit)) {
        return response()->json(['valami nem jó' => 'Nincs ilyen id-jű sor az adattáblában'], 401);
    }

    foreach ([1, 2, 3] as $i) {
        $kulcs = "kiegeszitok_img$i";
        if (!empty($pusztit->$kulcs)) {
            if (\Storage::disk('public')->exists($pusztit->$kulcs)) {
                \Storage::disk('public')->delete($pusztit->$kulcs);
            }
        }
    }

    $pusztit->delete();

    return response('', 205);
}

public function update(Request $request, $id)
{
    $kiegeszito = kiegeszito::find($id);

    if (is_null($kiegeszito)) {
        return response()->json(['üzenet' => 'Nem található a kiegészítő'], 404);
    }

    $kiegeszito->update($request->all());

    return response()->json($kiegeszito, 200);
}


}
