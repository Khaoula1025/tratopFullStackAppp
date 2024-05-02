<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function show($filePath)
    {
        // Assuming the file is stored in the 'public' disk
        $disk = Storage::disk('public');

        // Check if the file exists
        if (!$disk->exists($filePath)) {
            // Optionally, you can return a 404 response here
            abort(404, 'File not found.');
        }

        // Retrieve the file
        $file = $disk->get($filePath);
        Log::info("Received file path: {$filePath}");

        // Manually set the Content-Type header based on the file extension
        $extension = pathinfo($filePath, PATHINFO_EXTENSION);
        $mimeType = $this->getMimeTypeFromExtension($extension);

        // Return the file with the appropriate Content-Type header
        return response($file, 200)->header('Content-Type', $mimeType);
    }

    private function getMimeTypeFromExtension($extension)
    {
        $mimeTypes = [
            'jpg' => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'png' => 'image/png',
            'gif' => 'image/gif',
            'txt' => 'text/plain',
            // Add more MIME types as needed
        ];

        return $mimeTypes[$extension] ?? 'application/octet-stream';
    }
}
