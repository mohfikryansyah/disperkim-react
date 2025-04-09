<?php

use App\Models\DistrictLightingStat;
use App\Models\Lamp;
use Inertia\Inertia;
use App\Models\Panel;
use App\Models\SubdistrictLightingDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


Route::get('/lokasi/panel', function () {
    $panel = Panel::with('subdistrict.district', 'subdistrict.lamps')->get();
    return Inertia::render('sidebar/lokasi_panel/index', compact('panel'));
})->name('lokasi.panel');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::prefix('data/apj')->group(function () {
        Route::get('/', function () {
            $lamps = Lamp::with('subdistrict.district')->get();
            return Inertia::render('sidebar/data_apj/APJ/index', compact('lamps'));
        })->name('data.apj');


        Route::get('/konvensional', function () {
            $lamps = Lamp::with('subdistrict.district')->where('type', 'Konvensional')->get();
            return Inertia::render('sidebar/data_apj/konvensional/index', compact('lamps'));
        })->name('data.apj.konvensional');

        Route::get('/led', function () {
            $lamps = Lamp::with('subdistrict.district')->where('type', 'LED')->get();
            return Inertia::render('sidebar/data_apj/LED/index', compact('lamps'));
        })->name('data.apj.led');

        Route::get('/pjuts', function () {
            $lamps = Lamp::with('subdistrict.district')->where('type', 'PJUTS')->get();
            return Inertia::render('sidebar/data_apj/LED/index', compact('lamps'));
        })->name('data.apj.pjuts');

        Route::get('/kecamatan/{query}', function ($query) {
            if ($query) {
                $districts = DistrictLightingStat::with('subdistrict.lamps')->where('id', $query)->first();
                $district = $districts->first()->name;
            } else {
                $districts = DistrictLightingStat::with('subdistrict.lamps')->get();
            }
            return Inertia::render('sidebar/data_apj/_query/query', compact('districts', 'district'));
        })->name('data.apj.all');
    });


    Route::get('dashboard', function () {
        return Inertia::render('sidebar/dashboard/index');
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
