<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Export\LampExportController;
use App\Http\Controllers\Export\PanelExportController;
use App\Http\Controllers\Export\RingkasanExportController;
use App\Http\Controllers\ExportController;
use App\Models\Lamp;
use Inertia\Inertia;
use App\Models\Panel;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\Subdistrict;
use App\Models\NetworkCable;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LampController;
use App\Http\Controllers\PanelController;
use App\Http\Controllers\StreetController;
use App\Http\Controllers\VillageController;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\SubdistrictController;
use App\Http\Controllers\NetworkCableController;
use App\Http\Controllers\RequiredItemController;
use App\Http\Controllers\InfrastructureController;
use App\Http\Controllers\UserController;

Route::get('/', [LandingPageController::class, 'index'])->name('home');
Route::get('/slide-show', [LandingPageController::class, 'slideShow'])->name('slide.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('apj')->group(function () {
        Route::resource('/', LampController::class)->parameters(['' => 'lamp'])->names('lamp');
    });

    Route::prefix('panel')->group(function () {
        Route::resource('/', PanelController::class)->parameters(['' => 'panel'])->names('panel');
    });

    Route::resource('network-cable', NetworkCableController::class)->parameters(['' => 'networkCable'])->names('network-cable');


    Route::prefix('lokasi')->group(function () {
        Route::get('/persebaran-infrastruktur', [InfrastructureController::class, 'index'])
            ->name('sebaran-lokasi-infrastruktur');
        // Route::get('panel', function () {
        //     $panels = Panel::with(['street.village.subdistrict', 'user', 'icon'])->get();
        //     return Inertia::render('sidebar/lokasi_panel/index', compact('panels'));
        // })->name('lokasi.panel');
        // Route::get('lamp', function () {
        //     $lamps = Lamp::with(['street.village.subdistrict', 'user', 'icon', 'panel'])->get();
        //     return Inertia::render('sidebar/lokasi_lamp/index', compact('lamps'));
        // })->name('lokasi.lamp');

        // Route::get('persebaran-infrastruktur', function () {
        //     $panels = Panel::with(['street.village.subdistrict', 'user', 'icon'])->get();
        //     $lamps = Lamp::with(['street.village.subdistrict', 'user', 'icon', 'panel'])->get();
        //     $networkCables = NetworkCable::with(['street.village.subdistrict', 'user'])->get();
        //     return Inertia::render('sidebar/lokasi/pages', compact('panels', 'lamps', 'networkCables'));
        // })->name('sebaran-lokasi-infrastruktur');
    });

    Route::prefix('data-master')->group(function () {
        Route::resource('subdistricts', SubdistrictController::class);
        Route::resource('villages', VillageController::class);
        Route::resource('streets', StreetController::class);
    });

    Route::resource('monitoring-pju', RequiredItemController::class)->parameters(['monitoring-pju' => 'requiredItem']);

    Route::prefix('export')->group(function () {
        // PDF EXPORT
        Route::get('/apj-pdf', [LampExportController::class, 'exportAPJPDF'])->name('export.apj-pdf');
        Route::get('/panel-pdf', [PanelExportController::class, 'exportPANELPDF'])->name('export.panel-pdf');
        Route::get('/ringkasan-pdf', [RingkasanExportController::class, 'exportRINGKASANPDF'])->name('export.ringkasan-pdf');
        // EXCEL EXPORT
        Route::get('/apj-excel', [LampExportController::class, 'exportAPJExcel'])->name('export.apj-excel');
        Route::get('/panel-excel', [PanelExportController::class, 'exportPANELExcel'])->name('export.panel-excel');
    });

    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('users', UserController::class)->parameters(['users' => 'user']);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
