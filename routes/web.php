<?php

use Inertia\Inertia;
use App\Models\Panel;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LampController;
use App\Http\Controllers\StreetController;
use App\Http\Controllers\VillageController;
use App\Http\Controllers\SubdistrictController;
use App\Http\Controllers\RequiredItemController;
use App\Models\Lamp;
use App\Models\Subdistrict;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


Route::get('/lokasi/panel', function () {
    $panel = Panel::get();
    return Inertia::render('sidebar/lokasi_panel/index', compact('panel'));
})->name('lokasi.panel');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('apj')->group(function () {
        Route::resource('/', LampController::class)->parameters(['' => 'lamp'])->names('lamp');
    });

    Route::prefix('lokasi')->group(function () {
        Route::get('panel', function () {
            $panels = Panel::get();
            return Inertia::render('sidebar/lokasi_panel/index', compact('panels'));
        })->name('lokasi.panel');
        Route::get('lamp', function () {
            $lamps = Lamp::with(['street.village.subdistrict', 'user', 'icon'])->get();
            return Inertia::render('sidebar/lokasi_lamp/index', compact('lamps'));
        })->name('lokasi.lamp');
    });

    Route::prefix('data-master')->group(function () {   
        Route::resource('subdistricts', SubdistrictController::class);
        Route::resource('villages', VillageController::class);
        Route::resource('streets', StreetController::class);
    });
    Route::resource('monitoring-pju', RequiredItemController::class)->parameters(['monitoring-pju' => 'requiredItem']);

    Route::get('dashboard', function () {
        $totals = (new Subdistrict())->calculateTotalRequiredItems();
        $totalsPerKecamatans = (new Subdistrict())->calculateRequiredLampsPerSubdistrict();
        return Inertia::render('sidebar/dashboard/index', compact('totals', 'totalsPerKecamatans'));
    })->name('dashboard');
});



// 

Route::get('/api/proxy/districts/{regencyId}', function ($regencyId) {
    $response = Http::get("https://emsifa.github.io/api-wilayah-indonesia/api/districts/{$regencyId}.json");
    return response()->json($response->json());
});

Route::get('/api/proxy/villages/{subdistrict_id}', function ($subdistrict_id) {
    $response = Http::get("https://emsifa.github.io/api-wilayah-indonesia/api/villages/{$subdistrict_id}.json");
    return response()->json($response->json());
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
