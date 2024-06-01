<?php

namespace App\Http\Controllers;

use App\Models\travaux_3d_drone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\File;

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
        $validator = Validator::validate($request->all(), [
            'nature' => 'required',
            'Numéro_de_dossier' => 'required',
            'Numéro_de_mission' => 'required',
            'Equipe_de_terrain' => 'required',
            'materiel' => 'required',
            'situation_administrative' => 'required',
            'rattachement' => [
                'required',
                File::types(['jpg', 'png', 'jpeg', 'pdf', 'zip', 'rar']) // 1MB max
            ],
            'gcp' => [
                'required', File::types(['jpg', 'png', 'jpeg', 'pdf', 'zip', 'rar', 'txt', 'docx', 'doc'])
            ],
            'log' => [
                'required', File::types(['pdf', 'zip', 'rar', 'txt', 'docx', 'doc', 'bin'])
            ],
            'photos' => [
                'required', File::types(['jpg', 'png', 'jpeg', 'pdf', 'zip', 'rar'])
            ],
            'statique' => [
                'required', File::types(['pdf', 'zip', 'rar', 'txt', 'docx', 'doc'])
            ],
            // Add validation rules for other fields as necessary
        ]);

        $gcp_url = $request->file('gcp')->store('gcps');
        $rattachement_url = $request->file('rattachement')->store('rattachement');
        $log_url = $request->file('log')->store('log');
        $photos_url = $request->file('photos')->store('photos');
        $statique_url = $request->file('statique')->store('statiques');


        $travaux3Ddrone = new travaux_3d_drone([
            'nature' => $request->get('nature'),
            'Numéro_de_dossier' => $request->get('Numéro_de_dossier'),
            'Numéro_de_mission' => $request->get('Numéro_de_mission'),
            'titre_foncier' => $request->get('titre_foncier'),
            'Equipe_de_terrain' => $request->get('Equipe_de_terrain'),
            'materiel' => $request->get('materiel'),
            'observation' => $request->get('observation'),
            'situation_administrative' => $request->get('situation_administrative'),
            'rattachement' => Storage::url($rattachement_url),
            'gcp' => Storage::url($gcp_url),
            'log' => Storage::url($log_url),
            'photos' => Storage::url($photos_url),
            'statique' => Storage::url($statique_url),

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
        $travaux3dDrone = travaux_3d_drone::findOrFail($id);
        return response()->json($travaux3dDrone);
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
        $travaux3dDrone = travaux_3d_drone::findOrFail($request->id);
        if (!$travaux3dDrone) {
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
            'situation_administrative' => 'sometimes|required',

        ]);

        // \Log validation results
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }


        // Update other fields
        $data = $request->only([
            'nature',
            'Numéro_de_dossier',
            'Numéro_de_mission',
            'titre_foncier',
            'Equipe_de_terrain',
            'materiel',
            'situation_administrative',
            'observation',

        ]);



        $travaux3dDrone->fill($data);

        // Save the updated record
        $travaux3dDrone->save();


        return response()->json(['success' => true, 'message' => 'Record updated successfully']);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $travaux3DDrone = travaux_3d_drone::findOrFail($id);
        $travaux3DDrone->delete();
    }
}
