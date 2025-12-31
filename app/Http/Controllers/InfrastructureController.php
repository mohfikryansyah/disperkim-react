<?php

namespace App\Http\Controllers;

use App\Models\Lamp;
use Inertia\Inertia;
use App\Models\Panel;
use App\Models\NetworkCable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Services\InfrastructureService;

class InfrastructureController extends Controller
{
    protected InfrastructureService $service;

    public function __construct(InfrastructureService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request)
    {
        $filters = [
            'subdistrict' => $request->input('subdistrict', 'all'),
            'village' => $request->input('village', 'all'),
            'street' => $request->input('street', 'all'),
        ];

        $data = $this->service->getFilteredData($filters);

        return Inertia::render('sidebar/lokasi/pages', $data + ['filters' => $filters]);
    }
}
