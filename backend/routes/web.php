<?php

use Illuminate\Support\Facades\Route;


// Protected routes
Route::get('/', function () {
    return view('welcome');
});
