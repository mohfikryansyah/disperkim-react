<?php

namespace App\Services;

use App\Models\Panel;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

class PanelExportService
{
    public function export(Request $request)
    {
        $query = Panel::with(['street.village.subdistrict', 'user']);

        if ($request->filled('subdistrict')) {
            $query->whereHas('street.village.subdistrict', fn($q) =>
                $q->where('id', $request->subdistrict)
            );
        }

        if ($request->filled('village')) {
            $query->whereHas('street.village', fn($q) =>
                $q->where('id', $request->village)
            );
        }

        if ($request->filled('street')) {
            $query->where('street_id', $request->street);
        }

        if ($request->filled('type_panel')) {
            $query->where('type_panel', $request->type_panel);
        }

        if ($request->filled('power')) {
            $query->where('power', $request->power);
        }

        $panels = $query->get();

        return $panels;
    }
}
