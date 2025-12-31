<?php

namespace App\Http\Controllers\Export;

use App\Exports\LampExport;
use Illuminate\Http\Request;
use App\Services\LampExportService;
use App\Http\Controllers\Controller;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf;

class LampExportController extends Controller
{
    public function __construct(private LampExportService $lampExportService) {}

    public function exportAPJPDF(Request $request)
    {
        $lamps = $this->lampExportService->export($request);

        $pdf = Pdf::loadView('export-apj-pdf', compact('lamps'))
            ->setPaper('a4', 'landscape');

        $filename = 'data-lampu-' . now()->format('Ymd_His') . '.pdf';

        return $pdf->download($filename);
    }

    public function exportAPJExcel(Request $request)
    {
        $lamps = $this->lampExportService->export($request);
        return Excel::download(new LampExport($lamps), 'data-lampu-' . now()->format('Ymd_His') . '.xlsx');
    }
}
