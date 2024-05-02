<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class travaux3DController extends Controller
{
    private function determineMaterialType(Request $request)
    {
        // Assuming the material type is sent as a query parameter named 'materialType'
        $materialType = $request->get('materiel');

        // Validate the material type to ensure it matches one of your expected values
        if (!in_array($materialType, ['Drone', 'MMS', 'SLAM', 'GLS'])) {
            // Handle invalid material type, e.g., return an error response
            return response()->json(['error' => 'Invalid material type'], 400);
        }

        return $materialType;
    }
    private function forwardToMaterialController(Request $request, $materialType)
    {
        // Map the material type to the corresponding controller
        $controllerMap = [
            'MMS' => 'App\Http\Controllers\travaux3DmmsController',
            'Drone' => 'App\Http\Controllers\travaux3DdroneController',
            'SLAM' => 'App\Http\Controllers\travaux3DslamController',
            'GLS' => 'App\Http\Controllers\travaux3DglsController',
            // Add other material types and their corresponding controllers here
        ];

        // Check if the material type is valid and has a corresponding controller
        if (array_key_exists($materialType, $controllerMap)) {
            // Instantiate the material-specific controller
            $controller = new $controllerMap[$materialType];

            // Call the store method of the material-specific controller
            // Note: This assumes that the store method does not require any parameters other than Request
            return $controller->store($request);
        } else {
            // Handle invalid material type, e.g., return an error response
            return response()->json(['error' => 'Material type not supported'], 400);
        }
    }
    public function handleRequest(Request $request)
    {
        // Determine the material type based on the request data
        $materialType = $this->determineMaterialType($request);

        // Forward the request to the appropriate material-specific controller
        return $this->forwardToMaterialController($request, $materialType);
    }
}
