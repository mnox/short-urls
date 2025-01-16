<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::middleware(['guest'])->group(function () {
    /**
     * Intercept short URL requests
     */
    Route::get('/short/{shortURLKey}', resolve('short-url.controller'));

    /**
     * Handle default route
     */
    Route::get('/', function () {
        return Inertia::render('', []);
    });

    /**
     * Frontend view route
     */
    Route::get('/short-url/{shortUrlId}', function () {
        return Inertia::render('short-url', []);
    });
});

require __DIR__.'/auth.php';
