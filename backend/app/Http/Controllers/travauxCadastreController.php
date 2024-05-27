<?php

namespace App\Http\Controllers;

use App\Models\travaux_cadastre;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\File;


class travauxCadastreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $travauxCadastre = travaux_cadastre::all();
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
            'rattachement' => [
                'required',
                File::types(['jpg', 'png', 'jpeg', 'pdf', 'zip', 'rar'])
            ],
            'croquis_de_levé' => [
                'required', File::types(['jpg', 'png', 'jpeg', 'pdf', 'zip', 'rar'])
            ],
            'vidage' => [
                'required', File::types(['pdf', 'zip', 'rar', 'txt', 'docx', 'doc'])
            ],
            'image' => [
                'required', File::types(['jpg', 'png', 'jpeg', 'pdf', 'zip', 'rar'])
            ],
        ]);
        // Validate the request data

        // Check if validation fails

        $image_url = $request->file('image')->store('images');
        $rattachement_url = $request->file('rattachement')->store('rattachement');
        $croquis_de_levé_url = $request->file('croquis_de_levé')->store('croquis_de_levé');
        $vidage_url = $request->file('vidage')->store('vidage');

        $travauxCadastre = new travaux_cadastre([
            'nature' => $request->get('nature'),
            'Numéro_de_dossier' => $request->get('Numéro_de_dossier'),
            'Numéro_de_mission' => $request->get('Numéro_de_mission'),
            'titre_foncier' => $request->get('titre_foncier'),
            'Equipe_de_terrain' => $request->get('Equipe_de_terrain'),
            'materiel' => $request->get('materiel'),
            'observation' => $request->get('observation'),
            'situation_administrative' => $request->get('situation_administrative'),
            'rattachement' => Storage::url($rattachement_url),
            'croquis_de_levé' => Storage::url($croquis_de_levé_url),
            'vidage' => Storage::url($vidage_url),
            'image' => Storage::url($image_url),
            'id_user' => auth()->user()->id, // Assuming you want to associate the current user
        ]);

        $travauxCadastre->save();

        // Return a JSON response indicating success
        return response()->json(['success' => true, 'message' => 'Data saved successfully']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $travauxCadastre = travaux_cadastre::findOrFail($id);
        $travauxCadastre->delete();
    }
}
