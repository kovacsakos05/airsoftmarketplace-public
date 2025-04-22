<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use App\Models\felhasznalo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FelhasznaloController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return felhasznalo::all();
    }
    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'nev' => 'required',
            'email' => 'required|email|unique:felhasznalok,email',
            'jelszo' => 'required',
            'telefonszam' => 'required'
        ]);
    
        if($validator->fails()){
            return response()->json(['üzenet' => 'Fontos adat kimaradt vagy hibás formátum'], 400);
        }
    
        $adatok = $request->all();
        $felhasznalo = Felhasznalo::create($adatok);
    
        return response()->json(['nev' => $felhasznalo->nev], 201);
    }

     public function getById($id)
    {
        $keres=felhasznalo::find($id);
        if(is_null($keres))
        {
            return response()->json(['Nem létezik'=>'Nem található adott id-jű objektum'],410);
        }
        if ($keres->profilkep) {
            $keres->profilkep = asset('storage/' . $keres->profilkep);
        }
        return response()->json($keres,200);
    }
    
     public function destroy($id)
     {
         $pusztit=felhasznalo::find($id);
         if(is_null($pusztit))
         {
             return response()->json(['valami nem jó'=>'Nincs ilyen id-jű sor az adattáblában'],401);
         }
         $pusztit->delete();
 
         return response('',205);
     }
 
     public function update(Request $request, $id)
{
    $hozzaad = Felhasznalo::find($id);
    if (is_null($hozzaad)) {
        return response()->json(['hiba' => 'Nincs ilyen id-jű felhasználó'], 404);
    }

    $validator = Validator::make($request->all(), [
        'nev' => 'required',
        'email' => 'required|email',
        'jelszo' => 'required',
        'telefonszam' => 'required'
    ]);

    if ($validator->fails()) {
        return response()->json(['üzenet' => 'Fontos adat kimaradt vagy hibás formátum'], 400);
    }

    $adatok = $request->all();
    $hozzaad->update($adatok);

    return response()->json(['nev' => $hozzaad->nev], 200);
}

public function uploadProfilePicture(Request $request, $id)
{
    $felhasznalo = Felhasznalo::find($id);

    if (!$felhasznalo) {
        return response()->json(['üzenet' => 'Felhasználó nem található'], 404);
    }

    $validator = Validator::make($request->all(), [
        'profilkep' => 'required|image|mimes:jpg,jpeg,png,svg|max:2048'
    ]);

    if ($validator->fails()) {
        return response()->json(['üzenet' => 'Nem megfelelő képformátum vagy méret'], 422);
    }

    if ($request->hasFile('profilkep')) {
        
        if ($felhasznalo->profilkep && Storage::disk('public')->exists($felhasznalo->profilkep)) {
            Storage::disk('public')->delete($felhasznalo->profilkep);
        }

        $path = $request->file('profilkep')->store('profilkepek', 'public');

        $felhasznalo->profilkep = $path;
        $felhasznalo->save();

        return response()->json([
            'profilkep' => asset('storage/' . $path),
            'üzenet' => 'Profilkép sikeresen frissítve'
        ], 200);
    }

    return response()->json(['üzenet' => 'Nincs feltöltött fájl'], 400);
}
 
     

}
