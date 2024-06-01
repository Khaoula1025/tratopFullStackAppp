<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\travaux3DController;
use App\Http\Controllers\travaux3DdroneController;
use App\Http\Controllers\travaux3DglsController;
use App\Http\Controllers\travaux3DmmsController;
use App\Http\Controllers\travaux3DslamController;
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
    //route create
    Route::post('/travaux_ife', [travauxIfeController::class, 'store']);
    Route::post('/travaux_cadastre', [travauxCadastreController::class, 'store']);
    Route::post('/travaux_topographique', [travauxTopographiqueController::class, 'store']);
    Route::post('/for3D', [travaux3DController::class, 'handleRequest']);

    Route::get('/files/{filePath}', [FileController::class, 'show']);
    //show tables for update
    Route::get('/travaux_ife/{id}', [travauxIfeController::class, 'show']);
    Route::get('/travaux_cadastre/{id}', [travauxCadastreController::class, 'show']);
    Route::get('/travaux_topographique/{id}', [travauxTopographiqueController::class, 'show']);
    Route::get('/travaux_3d_drone/{id}', [travaux3DdroneController::class, 'show']);
    Route::get('/travaux_3d_slam/{id}', [travaux3DslamController::class, 'show']);
    Route::get('/travaux_3d_gls/{id}', [travaux3DglsController::class, 'show']);
    Route::get('/travaux_3d_mms/{id}', [travaux3DmmsController::class, 'show']);
    //show users 
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/history/{type}', [UserController::class, 'getUserHistory']);
    Route::get('/user-details', [UserController::class, 'getUserDetails']);
    //route update
    Route::post('/travaux_ife/{id}', [travauxIfeController::class, 'update']);
    Route::post('/travaux_cadastre/{id}', [travauxCadastreController::class, 'update']);
    Route::post('/travaux_topographique/{id}', [travauxTopographiqueController::class, 'update']);
    Route::post('/travaux_3d_drone/{id}', [travaux3DdroneController::class, 'update']);
    Route::get('/travaux_3d_slam/{id}', [travaux3DslamController::class, 'show']);
    Route::get('/travaux_3d_gls/{id}', [travaux3DglsController::class, 'show']);
    Route::get('/travaux_3d_mms/{id}', [travaux3DmmsController::class, 'show']);
    //route delete
    Route::delete('/travaux_cadastre/{id}', [travaux_cadastre::class, 'destroy']);
    Route::delete('/travaux_ife/{id}', [travauxIfeController::class, 'destroy']);
    Route::delete('/travaux_topographique/{id}', [travauxTopographiqueController::class, 'destroy']);
    Route::delete('/travaux_3d_slam/{id}', [travaux3DslamController::class, 'destroy']);
    Route::delete('/travaux_3d_mms/{id}', [travaux3DmmsController::class, 'destroy']);
    Route::delete('/travaux_3d_drone/{id}', [travaux3DdroneController::class, 'destroy']);
    Route::delete('/travaux_3d_gls/{id}', [travaux3DglsController::class, 'destroy']);
    //delete users
    Route::delete('/user/{userId}', [UserController::class, 'deleteUser']);
    Route::post('/user/{user}/updateRole', [UserController::class, 'updateRole']);


    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

//Route::resource('travaux_cadastre', travauxCadastreController::class);
