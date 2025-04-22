<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use App\Models\kiszallitas;
use Illuminate\Http\Request;

class KiszallitasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return kiszallitas::all();
    }
    function store(Request $request){
        $validator = Validator::make($request->all(),[
            'kiszallitas_fajta' => 'required',
            'kiszallitas_ara' => 'required'
        ]);
        if($validator->fails()){
           return response()->json(['üzenet'=>'Fontos adat kimaradt'],404);
        }
        $kiszallitas = kiszallitas::create($request->all());
        return response()->json(['kiszallitas_fajta'=>$kiszallitas->kiszallitas_fajta],201);
     }

     public function getById($id)
    {
        $keres=kiszallitas::find($id);
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
        $pusztit=kiszallitas::find($id);
        if(is_null($pusztit))
        {
            return response()->json(['valami nem jó'=>'Nincs ilyen id-jű sor az adattáblában'],401);
        }
        $pusztit->delete();

        return response('',205);
    }

    public function update(Request $request,$id)
    {
        $hozzaad=kiszallitas::find($id);
        if(is_null($hozzaad))
        {
            return response()->json(['valami nem jó'=>'Nincs ilyen id-jű sor az adattáblában'],401);
        }
        $validator = Validator::make($request->all(),[
            'kiszallitas_fajta' => 'required',
            'kiszallitas_ara' => 'required'
        ]);

        if($validator->fails()){
           return response()->json(['üzenet'=>'Fontos adat kimaradt'],404);
        }
        $hozzaad->update($request->all());
        return response()->json(['kiszallitas_fajta'=>$hozzaad->kiszallitas_fajta],201);

    }

}
