<?php

namespace App\Http\Controllers\Export;

use App\Exports\PanelExport;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Http\Controllers\Controller;
use App\Services\PanelExportService;
use Maatwebsite\Excel\Facades\Excel;

class PanelExportController extends Controller
{
    public function __construct(private PanelExportService $panelExportService) {}

    public function exportPANELPDF(Request $request)
    {
        $panels = $this->panelExportService->export($request);

        $pdf = Pdf::loadView('export-panel-pdf', compact('panels'))
            ->setPaper('a4', 'landscape');

        $filename = 'data-panel-' . now()->format('Ymd_His') . '.pdf';

        return $pdf->download($filename);
    }

    public function exportPANELExcel(Request $request)
    {
        $lamps = $this->panelExportService->export($request);
        return Excel::download(new PanelExport($lamps), 'data-panel-' . now()->format('Ymd_His') . '.xlsx');
    }
}
