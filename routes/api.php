<?php

use App\Http\Controllers\Urls\ShortURLGetController;
use App\Http\Controllers\Urls\ShortURLIndexController;
use App\Http\Controllers\Urls\UrlCsvUploadController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('guest')->group(function () {
    Route::post('/upload-urls-csv', UrlCsvUploadController::class)
        ->name('api.upload-urls-csv');

    Route::get('/short-urls', ShortURLIndexController::class)
        ->name('api.index-short-urls');

    Route::get('/short-url/{id}', ShortURLGetController::class)
        ->name('api.get-short-url');
});
