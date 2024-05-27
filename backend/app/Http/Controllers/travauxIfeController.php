<?php

namespace App\Http\Controllers;

use App\Models\travaux_ife;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\File;
use Illuminate\Support\Facades\Storage;

class travauxIfeController extends Controller
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
            'Equipe_de_terrain' => 'required',
            'materiel' => 'required',
            'situation_administrative' => 'required',
            'rattachement' =>  [
                'required',
                File::types(['jpg', 'png', 'jpeg', 'pdf', 'zip', 'rar'])
            ],
            'croquis' =>  [
                'required',
                File::types(['jpg', 'png', 'jpeg', 'pdf', 'zip', 'rar'])
            ],
            'vidage' =>  [
                'required', File::types(['pdf', 'zip', 'rar', 'txt', 'docx', 'doc'])
            ],
            'image' => [
                'required',
                File::types(['jpg', 'png', 'jpeg', 'pdf', 'zip', 'rar'])
            ],
            'cin' => [
                'required',
                File::types(['jpg', 'png', 'jpeg', 'pdf', 'zip', 'rar'])
            ],
            'riverain' => 'required',
            'Centroïde' => 'required',
        ]);
        $rattachement_url = $request->file('rattachement')->store('rattachement');
        $croquis_url = $request->file('croquis')->store('croquis');
        $vidage_url = $request->file('vidage')->store('vidage');
        $image_url = $request->file('image')->store('image');
        $cin_url = $request->file('cin')->store('cin');


        $travauxIfe = new travaux_ife([
            'nature' => $request->get('nature'),
            'Numéro_de_dossier' => $request->get('Numéro_de_dossier'),
            'Numéro_de_mission' => $request->get('Numéro_de_mission'),
            'titre_foncier' => $request->get('titre_foncier'),
            'Equipe_de_terrain' => $request->get('Equipe_de_terrain'),
            'materiel' => $request->get('materiel'),
            'observation' => $request->get('observation'),
            'situation_administrative' => $request->get('situation_administrative'),
            'rattachement' => Storage::url($rattachement_url),
            'croquis' => Storage::url($croquis_url),
            'vidage' => Storage::url($vidage_url),
            'image' => Storage::url($image_url),
            'cin' => Storage::url($cin_url),
            'riverain' => $request->get('riverain'),
            'Centroïde' => $request->get('Centroïde'),

            // Assign other fields as necessary
            'id_user' => auth()->user()->id, // Assuming you want to associate the current user
        ]);

        $travauxIfe->save();
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


    public function update(Request $request)
    {
        dd($request);
        // \Log the incoming request
        // Retrieve the existing record
        $travauxIfe = travaux_ife::findOrFail($request->id);
        if (!$travauxIfe) {
            return response()->json(['error' => true, 'message' => 'no id found ']);
        }

        // Validate the request data
        $validator = Validator::make($request->all(), [
            'nature' => 'sometimes|required',
            'Numéro_de_dossier' => 'sometimes|required',
            'Numéro_de_mission' => 'sometimes|required',
            'Equipe_de_terrain' => 'sometimes|required',
            'materiel' => 'sometimes|required',
            'situation_administrative' => 'sometimes|required',
            'rattachement' => 'sometimes|nullable|file|mimes:jpg,png,jpeg,pdf,zip,rar',
            'croquis' => 'sometimes|nullable|file|mimes:jpg,png,jpeg,pdf,zip,rar',
            'vidage' => 'sometimes|nullable|file|mimes:pdf,zip,rar,txt,docx,doc',
            'image' => 'sometimes|nullable|file|mimes:jpg,png,jpeg,pdf,zip,rar',
            'cin' => 'sometimes|nullable|file|mimes:jpg,png,jpeg,pdf,zip,rar',
            'riverain' => 'sometimes|required',
            'Centroïde' => 'sometimes|required|json',
        ]);

        // \Log validation results
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Handle file uploads
        if ($request->hasFile('rattachement')) {
            $rattachement_url = $request->file('rattachement')->store('rattachement');
            $travauxIfe->rattachement = Storage::url($rattachement_url);
        }

        if ($request->hasFile('croquis')) {
            $croquis_url = $request->file('croquis')->store('croquis');
            $travauxIfe->croquis = Storage::url($croquis_url);
        }

        if ($request->hasFile('vidage')) {
            $vidage_url = $request->file('vidage')->store('vidage');
            $travauxIfe->vidage = Storage::url($vidage_url);
        }

        if ($request->hasFile('image')) {
            $image_url = $request->file('image')->store('image');
            $travauxIfe->image = Storage::url($image_url);
        }

        if ($request->hasFile('cin')) {
            $cin_url = $request->file('cin')->store('cin');
            $travauxIfe->cin = Storage::url($cin_url);
        }

        // Update other fields
        $data = $request->only([
            'nature',
            'Numéro_de_dossier',
            'Numéro_de_mission',
            'Equipe_de_terrain',
            'materiel',
            'situation_administrative',
            'riverain',
            'Centroïde'
        ]);


        if (isset($data['Centroïde'])) {
            $data['Centroïde'] = json_decode($data['Centroïde'], true);
        }

        $travauxIfe->fill($data);

        // Save the updated record
        $travauxIfe->save();


        return response()->json(['success' => true, 'message' => 'Record updated successfully']);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $travauxIfe = travaux_ife::findOrFail($id);
        $travauxIfe->delete();
    }
}
