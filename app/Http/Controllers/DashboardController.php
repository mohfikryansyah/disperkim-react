<?php

namespace App\Http\Controllers;

use App\Models\Lamp;
use Inertia\Inertia;
use App\Models\Panel;
use App\Models\Street;
use App\Models\Subdistrict;
use Illuminate\Http\Request;
use App\Services\Statistics\NetworkCableService;
use App\Services\Statistics\LampStatisticService;

class DashboardController extends Controller
{
    protected LampStatisticService $service;

    public function __construct(LampStatisticService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request) 
    {
        $subdistrictID = $request->query('subdistrict_id');

        $lampsStatistic = $this->service->getLampCountPerVillage($subdistrictID);
        $lampsStatisticForRequiredItem = $this->service->getLampRequirementPerSubdistrict($subdistrictID);

        $totals = (new Subdistrict())->calculateTotalRequiredItems();
        $totalsPerKecamatans = (new Subdistrict())->calculateRequiredLampsPerSubdistrict();
        $subdistricts = Subdistrict::with(['villages.streets.requiredItem'])->get();

        $getCableLength = NetworkCableService::getCableLength();

        return Inertia::render('sidebar/dashboard/index', [
            'totals' => $totals,
            'totalsPerKecamatans' => $totalsPerKecamatans,
            'subdistricts' => $subdistricts,
            'lampsStatistic' => $lampsStatistic,
            'lampsStatisticForRequiredItem' => $lampsStatisticForRequiredItem,
            'cableLength' => $getCableLength,
            'lamps' => Lamp::with(['street.village.subdistrict', 'user:id,name,avatar', 'panel'])->take(5)->latest()->get(),
            'streets' => Street::with(['village.subdistrict', 'panels.street.village.subdistrict'])->latest()->get(),
            'panels' => Panel::with(['street.village.subdistrict', 'user:id,name,avatar'])->take(5)->latest()->get(),
        ]);
    }
}
