<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use App\Models\fegyver;
use Illuminate\Http\Request;

class FegyverController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    $keres = fegyver::where('eladva', false)->with('tulajdonos')->get();

    foreach ($keres as $fegyver) {
        if ($fegyver->fegyverek_img1) {
            $fegyver->fegyverek_img1 = asset('storage/' . $fegyver->fegyverek_img1);
        }
        if ($fegyver->fegyverek_img2) {
            $fegyver->fegyverek_img2 = asset('storage/' . $fegyver->fegyverek_img2);
        }
        if ($fegyver->fegyverek_img3) {
            $fegyver->fegyverek_img3 = asset('storage/' . $fegyver->fegyverek_img3);
        }
    }

    return $keres;
}
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nev' => 'required',
            'tipus' => 'required',
            'ar' => 'required',
            'leiras'=> 'required',
            'mechanika'=> 'required',
            'fps'=> 'required',
            'suly'=> 'required',
            'csohossza'=> 'required',
            'hossza'=> 'required',
            'tuzmod'=> 'required',
            'fegyverek_img1' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'fegyverek_img2' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'fegyverek_img3' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'tulajdonos' => 'required|exists:felhasznalok,id'
        ]);
    
        if ($validator->fails()) {
            return response()->json(['üzenet' => 'Fontos adat kimaradt vagy hibás formátum'], 400);
        }
    
        $adatok = $request->all();
    
        foreach ([1, 2, 3] as $i) {
            $kulcs = "fegyverek_img$i";
            if ($request->hasFile($kulcs)) {
                $fajl = $request->file($kulcs);
                $utvonal = $fajl->store("fegyverek", 'public');
                $adatok[$kulcs] = $utvonal;
            }
        }
    
        $fegyver = fegyver::create($adatok);
        return response()->json(['nev' => $fegyver->nev], 201);
    }

    public function getById($id)
    {
        $keres = fegyver::find($id);
        if (is_null($keres)) {
            return response()->json(['Nem létezik' => 'Nem található adott id-jű objektum'], 410);
        }
        $keres->load('tulajdonos');
        if ($keres->fegyverek_img1) {
            $keres->fegyverek_img1 = asset('storage/' . $keres->fegyverek_img1);
        }
        if ($keres->fegyverek_img2) {
            $keres->fegyverek_img2 = asset('storage/' . $keres->fegyverek_img2);
        }
        if ($keres->fegyverek_img3) {
            $keres->fegyverek_img3 = asset('storage/' . $keres->fegyverek_img3);
        }
        if (optional($keres->tulajdonos)->profilkep) {
            $keres->tulajdonos->profilkep = asset('storage/' . $keres->tulajdonos->profilkep);
        }
        return response()->json($keres, 200);
    }

    public function getDragabb($price)
    {
        $fegyo = fegyver::where('ar', '>', $price);
        if ($fegyo->exists()) {
            return $fegyo->get();
        } else {
            return response()->json(['Nem létezik' => 'Nincs ilyen attribútumú objektum'], 417);
        }
    }

    public function getOlcsobb($price)
    {
        $fegyo = fegyver::where('ar', '<', $price);
        if ($fegyo->exists()) {
            return $fegyo->get();
        } else {
            return response()->json(['Nem létezik' => 'Nincs ilyen attribútumú objektum'], 417);
        }
    }

    public function FilterByFPS($fps)
    {
        $erosseg = fegyver::where('fps', '=', $fps);
        if ($erosseg->exists()) {
            return $erosseg->get();
        } else {
            return response()->json(['Nem létezik' => 'Nincs ilyen FPS értékű fegyver'], 407);
        }
    }

    public function destroy($id)
    {
        $pusztit = fegyver::find($id);
        if (is_null($pusztit)) {
            return response()->json(['valami nem jó' => 'Nincs ilyen id-jű sor az adattáblában'], 401);
        }
        foreach ([1, 2, 3] as $i) {
            $kulcs = "fegyverek_img$i";
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
    $fegyver = fegyver::find($id);

    if (is_null($fegyver)) {
        return response()->json(['üzenet' => 'Nem található a fegyver'], 404);
    }

    $fegyver->update($request->all());

    return response()->json($fegyver, 200);
}

}
