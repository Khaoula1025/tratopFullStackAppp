<?php

namespace App\Http\Controllers;

use App\Models\travaux_topographique;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\File;
use Illuminate\Support\Facades\Storage;

class travauxTopographiqueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::validate($request->all(), [
            'nature' => 'required',
            'Numéro_de_dossier' => 'required',
            'Numéro_de_mission' => 'required',
            'titre_foncier' => 'required',
            'Equipe_de_terrain' => 'required',
            'materiel' => 'required',
            'situation_administrative' => 'required',
            'rattachement' =>  [
                'required',
                File::types(['jpg', 'png', 'jpeg', 'pdf', 'zip', 'rar'])
            ],
            'croquis_de_terrain' =>  [
                'required', File::types(['jpg', 'png', 'jpeg', 'pdf', 'zip', 'rar'])
            ],
            'vidage' => [
                'required', File::types(['pdf', 'zip', 'rar', 'txt', 'docx', 'doc'])
            ],
            'image' => [
                'required', File::types(['jpg', 'png', 'jpeg', 'pdf', 'zip', 'rar'])
            ],
        ]);
        $image_url = $request->file('image')->store('images');
        $rattachement_url = $request->file('rattachement')->store('rattachement');
        $croquis_de_terrain_url = $request->file('croquis_de_terrain')->store('croquis_de_terrain');
        $vidage_url = $request->file('vidage')->store('vidage');


        $travauxTopographique = new travaux_topographique([
            'nature' => $request->get('nature'),
            'Numéro_de_dossier' => $request->get('Numéro_de_dossier'),
            'Numéro_de_mission' => $request->get('Numéro_de_mission'),
            'titre_foncier' => $request->get('titre_foncier'),
            'Equipe_de_terrain' => $request->get('Equipe_de_terrain'),
            'materiel' => $request->get('materiel'),
            'observation' => $request->get('observation'),
            'situation_administrative' => $request->get('situation_administrative'),
            'rattachement' =>  Storage::url($rattachement_url),
            'croquis_de_terrain' => Storage::url($croquis_de_terrain_url),
            'vidage' =>  Storage::url($vidage_url),
            'image' =>  Storage::url($image_url),
            // Assign other fields as necessary
            'id_user' => auth()->user()->id, // Assuming you want to associate the current user
        ]);

        $travauxTopographique->save();
        return response()->json(['success' => true, 'message' => 'Data saved successfully']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $travauxTopographique = travaux_topographique::findOrFail($id);
        return response()->json($travauxTopographique);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        // \Log the incoming request
        // Retrieve the existing record
        $travauxTopographique = travaux_topographique::findOrFail($request->id);
        if (!$travauxTopographique) {
            return response()->json(['error' => true, 'message' => 'no id found ']);
        }

        // Validate the request data
        $validator = Validator::make($request->all(), [
            'nature' => 'sometimes|required',
            'Numéro_de_dossier' => 'sometimes|required',
            'Numéro_de_mission' => 'sometimes|required',
            'titre_foncier' => 'sometimes|required',
            'Equipe_de_terrain' => 'sometimes|required',
            'materiel' => 'sometimes|required',
            'situation_administrative' => 'sometimes|required'
        ]);

        // \Log validation results
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }


        // Update other fields
        $data = $request->only([
            'nature',
            'Numéro_de_dossier',
            'titre_foncier',
            'Numéro_de_mission',
            'Equipe_de_terrain',
            'materiel',
            'situation_administrative',
            'observation',

        ]);



        $travauxTopographique->fill($data);

        // Save the updated record
        $travauxTopographique->save();


        return response()->json(['success' => true, 'message' => 'Record updated successfully']);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $travauxTopographique = travaux_topographique::findOrFail($id);
        $travauxTopographique->delete();
    }
}
