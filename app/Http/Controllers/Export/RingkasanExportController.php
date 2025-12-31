<?php

namespace App\Http\Controllers\Export;

use App\Http\Controllers\Controller;
use App\Models\Subdistrict;
use App\Services\Statistics\LampStatisticService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class RingkasanExportController extends Controller
{
    protected LampStatisticService $counter;

    public function __construct(LampStatisticService $counter)
    {
        $this->counter = $counter;
    }

    public function exportRINGKASANPDF(Request $request)
    {
        $subdistricts = Subdistrict::with([
            'villages.streets.requiredItem'
        ])->get();

        $rows = [];
        $totals = [
        'streetLength' => 0,
        'requiredLamps' => 0,
        'installedLamps' => 0,
        'requiredCables' => 0,
        'installedCables' => 0,
        'requiredPanels' => 0,
        'installedPanels' => 0,
    ];

        foreach ($subdistricts as $s) {
            $row = [
                'name' => $s->name,
                'streetLength' => $this->counter->countStreetLength($s),
                'requiredLamps' => $this->counter->countRequiredLamps($s),
                'installedLamps' => $this->counter->countInstalledLamps($s),
                'requiredCables' => $this->counter->countRequiredNetworkCable($s),
                'installedCables' => $this->counter->countInstalledNetworkCable($s),
                'requiredPanels' => $this->counter->countRequiredPanels($s),
                'installedPanels' => $this->counter->countInstalledPanels($s),
            ];

            $row['diffLamps'] = $row['installedLamps'] - $row['requiredLamps'];
            $row['diffCables'] = $row['installedCables'] - $row['requiredCables'];
            $row['diffPanels'] = $row['installedPanels'] - $row['requiredPanels'];

            $rows[] = $row;

            $totals['streetLength'] += $row['streetLength'];
            $totals['requiredLamps'] += $row['requiredLamps'];
            $totals['installedLamps'] += $row['installedLamps'];
            $totals['requiredCables'] += $row['requiredCables'];
            $totals['installedCables'] += $row['installedCables'];
            $totals['requiredPanels'] += $row['requiredPanels'];
            $totals['installedPanels'] += $row['installedPanels'];
        }

        $pdf = Pdf::loadView('export-ringkasan-pdf', compact('totals', 'rows'))
            ->setPaper('a4', 'landscape');

        $filename = 'data-ringkasan-' . now()->format('Ymd_His') . '.pdf';

        return $pdf->download($filename);
    }
}
