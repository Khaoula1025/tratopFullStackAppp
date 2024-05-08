<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    // Define the models for each type of operation
    protected $models = [
        'travaux_cadastre' => 'App\Models\travaux_cadastre',
        'travaux_topographique' => 'App\Models\travaux_topographique',
        'travaux_ife' => 'App\Models\travaux_ife',
        'travaux_3d_drone' => 'App\Models\travaux_3d_drone',
        'travaux_3d_slam' => 'App\Models\travaux_3d_slam',
        'travaux_3d_gls' => 'App\Models\travaux_3d_gls',
        'travaux_3d_mms' => 'App\Models\travaux_3d_mms',
    ];
    // function to get one user history 
    public function getUserHistory($type)
    {
        // Initialize an empty collection to hold all records
        $records = collect();

        if ($type === 'single') {
            $records = $records->concat($this->getHistoryByType($type, auth()->user()->id));
        } else {
            $records = $records->concat($this->getHistoryByType($type, null));
        }

        // Combine the related records for each type of 3D travaux
        if ($records->isEmpty()) {
            return response()->json([
                'message' => 'No operations found.',
                'data' => []
            ], 200);
        }

        return response()->json([
            'message' => 'Operations fetched successfully.',
            'data' => $records
        ]);
    }



    // function to get the records with type
    private function getHistoryByType($type, $userId)
    {
        // Initialize an empty collection to hold all records
        $records = collect();

        // Check if the type is 'All' and fetch records from all models
        if ($type === 'All') {
            // Loop through each model and fetch records
            foreach ($this->models as $modelType => $modelClass) {
                $model = "App\\Models\\" . ucfirst($modelType);
                $records = $records->concat($model::all());
            }
        } else if ($type === 'single') {
            // Fetch records for a single user across all models
            foreach ($this->models as $modelType => $modelClass) {
                $model = "App\\Models\\" . ucfirst($modelType);
                $userRecords = $model::where('id_user', $userId)->get();
                // Add a 'type' property to each record and add them to the $records collection
                $records = $records->concat($userRecords->map(function ($operation) use ($type) {
                    $operation->type = $type;
                    return $operation;
                }));
            }
        } else {
            // If the type is not 'All', fetch records from the specified model
            $model = "App\\Models\\" . ucfirst($type);
            if ($userId === null) {
                $records = $model::all();
            }
        }

        return $records;
    }

    public function getAllHistory(Request $request)
    {
        $allUsers = User::all();
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

    public function deleteUser(Request $request, User $user)
    {
        // Retrieve the authenticated user
        $authenticatedUser = Auth::user();

        // Check if the authenticated user has the 'admin' role
        if ($authenticatedUser->role !== 'admin') {
            // If not, return an error response
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // If the authenticated user is an admin, proceed with deletion
        // Delete related records
        // $user->travauxTopographiques()->forceDelete();
        // $user->travauxCadastres()->forceDelete();
        // $user->travauxifes()->forceDelete();
        // $user->travaux3dDrone()->forceDelete();
        // $user->travaux3dSlam()->forceDelete();
        // $user->travaux3dmms()->forceDelete();
        // $user->travaux3dgls()->forceDelete();

        // Perform any other necessary deletions for related models

        // If using soft deletes, you might need to force delete
        DB::statement('DELETE FROM users WHERE id =?', [$user]);
        // Return a success response

        foreach ($this->models  as $key => $value) {
            echo "Key: $key; Value: $value\n";
            // Use DB::delete or a query builder instance for a more Laravel-idiomatic approach
            DB::table($key) // Replace 'your_table_name' with the actual table name
                ->where('id', $user)
                ->delete();
        }
        return response()->json(['message' => 'User deleted successfully'], 200);
    }

    public function getUserDetails()
    {
        // Check if the user is authenticated
        if (!Auth::check()) {
            // If not authenticated, return an error
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Fetch the user's details
        $user = Auth::user();

        // Prepare the user details to be returned
        $userDetails = [
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
        ];

        // Initialize an empty array to hold the counts
        $recordCounts = [];

        // Loop through each model and fetch records, then count them
        foreach ($this->models as $type => $model) {
            $records = $this->getHistoryByType($type, $user->id);
            $count = $records->count();
            $count = $records->count();
            $recordCounts[$type] = $count;
        }

        // Return the user details along with the counts of each record type
        return response()->json([
            'user' => $userDetails,
            'recordCounts' => $recordCounts,
        ]);
    }
}
