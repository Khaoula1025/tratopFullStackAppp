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
    protected $tables = [
        'travaux_cadastres' => 'App\Models\travaux_cadastre',
        'travaux_topographiques' => 'App\Models\travaux_topographique',
        'travaux_ifes' => 'App\Models\travaux_ife',
        'travaux_3d_drones' => 'App\Models\travaux_3d_drone',
        'travaux_3d_slams' => 'App\Models\travaux_3d_slam',
        'travaux_3d_gls' => 'App\Models\travaux_3d_gls',
        'travaux_3d_mms' => 'App\Models\travaux_3d_mms',
    ];
    // function to get one user history 
    public function getUserHistory($type)
    {
        // Initialize an empty collection to hold all records
        $records = collect();

        if ($type === 'single') {
            list($result, $typeName) = $this->getHistoryByType($type, auth()->user()->id);
            // $typeName = $result['type'];
        } else {
            list($result, $typeName) = $this->getHistoryByType($type, null);

            // $typeName = $result['type'];
        }
        // Combine the related records for each type of 3D travaux
        if ($result->isEmpty()) {
            return response()->json([
                'message' => 'No operations found.',
                'data' => []
            ], 200);
        }
        return response()->json([
            'message' => 'Operations fetched successfully.',
            'data' => $result,
            'type' => $typeName
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
                $tableName = (new $model())->getTable(); // Get the table name from the model
                $modelRecords = $model::select($tableName . '.*', 'users.name as user_name') // Select all records and the user's name
                    ->leftJoin('users', $tableName . '.id_user', '=', 'users.id') // Join the users table
                    ->get(); // Execute the query

                // Add a 'type' property to each record and add them to the $records collection
                $records = $records->concat($modelRecords->map(function ($operation) use ($modelType) {
                    $operation->type = $modelType; // Associate each record with its model type
                    return $operation;
                }));
            }
        } else if ($type === 'single') {
            // Fetch records for a single user across all models
            foreach ($this->models as $modelType => $modelClass) {
                $model = "App\\Models\\" . ucfirst($modelType);
                $tableName = (new $model())->getTable(); // Get the table name from the model
                $userRecords = $model::select($tableName . '.*', 'users.name as user_name') // Select all records and the user's name
                    ->leftJoin('users', $tableName . '.id_user', '=', 'users.id') // Join the users table
                    ->where($tableName . '.id_user', $userId) // Filter by user ID
                    ->get(); // Execute the query

                // Add a 'type' property to each record and add them to the $records collection
                $records = $records->concat($userRecords->map(function ($operation) use ($modelType) {
                    $operation->type = $modelType; // Associate each record with its model type
                    return $operation;
                }));
            }
        } else {
            // If the type is not 'All', fetch records from the specified model
            $model = "App\\Models\\" . ucfirst($type);
            $tableName = (new $model())->getTable(); // Get the table name from the model
            if ($userId === null) {
                $records = $model::select($tableName . '.*', 'users.name as user_name') // Select all records and the user's name
                    ->leftJoin('users', $tableName . '.id_user', '=', 'users.id') // Join the users table
                    ->get(); // Execute the query

                // Add a 'type' property to each record
                $records = $records->map(function ($operation) use ($type) {
                    $operation->type = $type;
                    return $operation;
                });
            }
        }

        // Return both the records and the typeName
        return [$records, $type]; // Assuming $type is the same as $typeName for simplicity
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

    public function deleteUser(string $id)
    {
        // Retrieve the authenticated user
        // Delete related records
        foreach ($this->tables as $tableName => $modelClass) {
            // Use DB::table() with the correct table name
            DB::table($tableName)->where('id_user', $id)->delete();
        }

        // Delete the user record

        $user = User::findorFail($id);
        $user->delete();

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
            if ($records instanceof \Illuminate\Support\Collection) {
                $count = $records->count();
                $recordCounts[$type] = $count;
            } else {
                // Handle if getHistoryByType does not return a collection
                // You can log an error or handle it based on your requirements
                $recordCounts[$type] = 0;
            }
        }

        // Return the user details along with the counts of each record type
        return response()->json([
            'user' => $userDetails,
            'recordCounts' => $recordCounts,
        ]);
    }
}
