<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OaiController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// OAI-PMH Endpoint for external indexers
Route::get('/oai', [OaiController::class, 'handle']);
Route::post('/oai', [OaiController::class, 'handle']);
