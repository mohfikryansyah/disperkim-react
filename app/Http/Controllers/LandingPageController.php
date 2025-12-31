<?php

namespace App\Http\Controllers;

use App\Models\Lamp;
use Inertia\Inertia;
use App\Models\Panel;
use App\Models\Subdistrict;
use App\Models\NetworkCable;
use App\Models\Street;
use Illuminate\Http\Request;
use App\Services\InfrastructureService;
use App\Services\Statistics\LampStatisticService;
use App\Services\Statistics\NetworkCableService;

class LandingPageController extends Controller
{
    protected InfrastructureService $InfrastrukturService;
    protected LampStatisticService $LampStatService;

    public function __construct(InfrastructureService $InfrastrukturService, LampStatisticService $LampStatService)
    {
        $this->InfrastrukturService = $InfrastrukturService;
        $this->LampStatService = $LampStatService;
    }

    public function index(Request $request)
    {
        $filters = [
            'subdistrict' => $request->input('subdistrict', 'all'),
            'village' => $request->input('village', 'all'),
            'street' => $request->input('street', 'all'),
        ];

        $data = $this->InfrastrukturService->getFilteredData($filters);

        $totalsPerKecamatans = (new Subdistrict())->calculateRequiredLampsPerSubdistrict();
        $lampsStatisticForRequiredItem = LampStatisticService::getLampRequirementPerSubdistrict();
        
        return Inertia::render('Landing/pages', $data + [
            'filters' => $filters, 
            'totalsPerKecamatans' => $totalsPerKecamatans,
            'lampsStatisticForRequiredItem' => $lampsStatisticForRequiredItem,
        ]);
    }

    public function slideShow(Request $request)
    {
        $subdistrictID = $request->query('subdistrict_id');

        $lampsStatistic = $this->LampStatService->getLampCountPerVillage($subdistrictID);
        $lampsStatisticForRequiredItem = $this->LampStatService->getLampRequirementPerSubdistrict($subdistrictID);

        $totals = (new Subdistrict())->calculateTotalRequiredItems();
        $totalsPerKecamatans = (new Subdistrict())->calculateRequiredLampsPerSubdistrict();
        $subdistricts = Subdistrict::with(['villages.streets.requiredItem'])->get();

        $getCableLength = NetworkCableService::getCableLength();

        
        return Inertia::render('Landing/parts/slide-show', [
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
