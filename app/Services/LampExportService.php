<?php

namespace App\Services;

use App\Models\Lamp;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

class LampExportService
{
    public function export(Request $request)
    {
        $query = Lamp::with(['street.village.subdistrict', 'panel', 'user']);

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

        if ($request->filled('panel')) {
            $query->where('panel_id', $request->panel);
        }

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        if ($request->filled('listrik_pln')) {
            $query->where('listrik_pln', $request->listrik_pln);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $lamps = $query->get();

        return $lamps;
    }
}
