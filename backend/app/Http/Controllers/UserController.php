<?php

namespace App\Http\Controllers;

use App\Models\travaux_3d;
use App\Models\travaux_cadastre;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUserHistory()
    {
        $userId = auth()->user()->id;

        // Fetch the records for each type of travaux
        $cadastreHistory = $this->getHistoryByType('travaux_cadastre', $userId);
        $topographiqueHistory = $this->getHistoryByType('travaux_topographique', $userId);
        $ifeHistory = $this->getHistoryByType('travaux_ife', $userId);
        $drone3dHistory = $this->getHistoryByType('travaux_3d_drone', $userId);
        $slam3dHistory = $this->getHistoryByType('travaux_3d_slam', $userId);
        $gls3dHistory = $this->getHistoryByType('travaux_3d_gls', $userId);
        $mms3dHistory = $this->getHistoryByType('travaux_3d_mms', $userId);


        // Combine all the records into a single collection
        $combinedHistory = $cadastreHistory->concat($topographiqueHistory)
            ->concat($ifeHistory)
            ->concat($drone3dHistory)
            ->concat($slam3dHistory)
            ->concat($gls3dHistory)
            ->concat($mms3dHistory);

        // Combine the related records for each type of 3D travaux
        if ($combinedHistory->isEmpty()) {
            return response()->json(['message' => 'No operations found.'], 200);
        }

        return response()->json($combinedHistory);
    }

    private function getHistoryByType($type, $userId)
    {
        $model = "App\\Models\\" . ucfirst($type);
        return $model::where('id_user', $userId)->get()->map(function ($operation) use ($type) {
            $operation->type = $type; // Add a 'type' property to each operation
            return $operation;
        });
    }

    public function index()
    {
        return User::all();
    }

    public function updateRole(Request $request, User $user)
    {
        $user->update(['role' => $request->role]);
        return back()->with('success', 'Role updated successfully');
    }
}
