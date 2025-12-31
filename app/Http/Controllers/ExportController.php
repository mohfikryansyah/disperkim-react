<?php

namespace App\Http\Controllers;

use App\Models\Lamp;
use App\Models\Panel;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Services\InfrastructureService;

class ExportController extends Controller
{
    public function exportAPJPDF(Request $request, InfrastructureService $infrastructureService)
    {
        $filters = [
            'subdistrict' => $request->input('subdistrict', 'all'),
            'village' => $request->input('village', 'all'),
            'street' => $request->input('street', 'all'),
        ];

        $data = $infrastructureService->getFilteredData($filters);
        $lamps = $data['lamps'];

        $pdf = Pdf::loadView('export-apj-pdf', [
            'lamps' => $lamps,
            'filters' => $filters,
        ])->setPaper('a4', 'landscape');

        return $pdf->download('laporan-apj.pdf');
    }

    public function exportPANELPDF()
    {
        $panels = Panel::with(['street.village.subdistrict', 'user'])->get();
        $pdf = PDF::loadView('export-panel-pdf', compact('panels'))->setPaper('a4', 'landscape');
        return $pdf->download('laporan-panel.pdf');
    }
}
