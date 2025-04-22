<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use App\Models\rendeles;
use Illuminate\Http\Request;

class RendelesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return rendeles::with('felhasznalo','kiszallitas','fegyver','kiegeszito')->get();
    }
    function store(Request $request){
        $validator = Validator::make($request->all(),[
            'felhasznalok_id'=> 'required',
            'keresztnev'=> 'required',
            'vezeteknev'=> 'required',
            'iranyitoszam'=> 'required',
            'varos'=> 'required',
            'utca_hazszam'=> 'required',
            'telefonszam'=> 'required',
            'kiszallitasok_id' => 'required',
            'fizetendo' => 'required'
        ]);
        if($validator->fails()){
           return response()->json(['üzenet'=>'Fontos adat kimaradt'],404);
        }
        $rendeles = rendeles::create($request->all());
        return response()->json(['keresztnev'=>$rendeles->keresztnev],201);
     }

     public function getById($id)
    {
        $keres=rendeles::find($id);
        if(is_null($keres))
        {
            return response()->json(['Nem létezik'=>'Nem található adott id-jű objektum'],410);
        }
        else{
            return response()->json($keres,201);
        }
    }

     public function destroy($id)
    {
        $pusztit=rendeles::find($id);
        if(is_null($pusztit))
        {
            return response()->json(['valami nem jó'=>'Nincs ilyen id-jű sor az adattáblában'],401);
        }
        $pusztit->delete();

        return response('',205);
    }

    public function update(Request $request,$id)
    {
        $hozzaad=rendeles::find($id);
        if(is_null($hozzaad))
        {
            return response()->json(['valami nem jó'=>'Nincs ilyen id-jű sor az adattáblában'],401);
        }
        $validator = Validator::make($request->all(),[
            'fegyverek_id' => 'required',
            'kiegeszitok_id'=> 'required',
            'felhasznalok_id'=> 'required',
            'keresztnev'=> 'required',
            'vezeteknev'=> 'required',
            'iranyitoszam'=> 'required',
            'varos'=> 'required',
            'utca_hazszam'=> 'required',
            'telefonszam'=> 'required',
            'kiszallitasok_id' => 'required',
            'fizetendo' => 'required'
        ]);
        if($validator->fails()){
           return response()->json(['üzenet'=>'Fontos adat kimaradt'],404);
        }
        $hozzaad->update($request->all());
        return response()->json(['keresztnev'=>$hozzaad->keresztnev],201);

    }

    public function getByFelhasznalo($id)
    {
        $rendelesek = rendeles::with(['fegyver', 'kiegeszito', 'kiszallitas'])
                    ->where('felhasznalok_id', $id)
                    ->get();

    return response()->json($rendelesek);
    }

}
