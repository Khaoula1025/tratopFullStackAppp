<?php

namespace App\Http\Controllers;

use App\Models\travaux_3d_drone;
use Illuminate\Http\Request;

class travaux3DdroneController extends Controller
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
        $request->validate([
            'nature' => 'required',
            'Numéro_de_dossier' => 'required',
            'Numéro_de_mission' => 'required',
            'Equipe_de_terrain' => 'required',
            'materiel' => 'required',
            'situation_administrative' => 'required',
            'rattachement' => 'required|mimes:jpg,png,jpeg',
            'gcp' => 'required|mimes:jpg,png,jpeg',
            'log' => 'required|mimes:bin,zip,rar',
            'photos' => 'required|mimes:zip,rar',
            'statique' => 'required|mimes:txt,zip,rar,doc,docx',
            // Add validation rules for other fields as necessary
        ]);

        $travaux3Ddrone = new travaux_3d_drone([
            'nature' => $request->get('nature'),
            'Numéro_de_dossier' => $request->get('Numéro_de_dossier'),
            'Numéro_de_mission' => $request->get('Numéro_de_mission'),
            'titre_foncier' => $request->get('titre_foncier'),
            'Equipe_de_terrain' => $request->get('Equipe_de_terrain'),
            'materiel' => $request->get('materiel'),
            'observation' => $request->get('observation'),
            'situation_administrative' => $request->get('situation_administrative'),
            'rattachement' => $request->file('rattachement')->store('rattachements'),
            'gcp' => $request->file('gcp')->store('gcps'),
            'log' => $request->file('log')->store('log'),
            'photos' => $request->file('photos')->store('photos'),
            'statique' => $request->file('statique')->store('statiques'),

            // Assign other fields as necessary
            'id_user' => auth()->user()->id, // Assuming you want to associate the current user
        ]);

        $travaux3Ddrone->save();
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
        //
    }
}