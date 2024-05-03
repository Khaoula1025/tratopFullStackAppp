<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\travaux3DController;
use App\Http\Controllers\travauxCadastreController;
use App\Http\Controllers\travauxIfeController;
use App\Http\Controllers\travauxTopographiqueController;
use App\Http\Controllers\UserController;
use App\Models\travaux_cadastre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/forCada', [travauxCadastreController::class, 'store']);
    Route::post('/forTopo', [travauxTopographiqueController::class, 'store']);
    Route::post('/forIFE', [travauxIfeController::class, 'store']);
    Route::post('/for3D', [travaux3DController::class, 'handleRequest']);
    Route::get('/history', [UserController::class, 'getUserHistory']);
    Route::get('/history/all', [UserController::class, 'getAllUsersHistory']);
    Route::get('/files/{filePath}', [FileController::class, 'show']);
    Route::get('/users', [UserController::class, 'index']);
    Route::delete('/user/{userId}', [UserController::class, 'deleteUser']);
    Route::get('/user-details', [UserController::class, 'getUserDetails']);
    Route::put('/user/{user}/updateRole', [UserController::class, 'updateRole']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

//Route::resource('travaux_cadastre', travauxCadastreController::class);
