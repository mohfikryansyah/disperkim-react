<?php

namespace App\Http\Controllers;

use App\Models\Subdistrict;
use Illuminate\Http\Request;

class SubdistrictController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subdistricts = Subdistrict::with(['villages', 'villages.streets.requiredItem'])->latest()->get();
        
        $totals = (new Subdistrict())->calculateTotalRequiredItems();

        return inertia('sidebar/data_master/kecamatan/pages', [
            'subdistricts' => $subdistricts,
            'totals' => $totals,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //  
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:100',
        ]);

        Subdistrict::create($validatedData);

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Subdistrict $subdistrict)
    {
        // Ambil query parameter
        $villageId = request()->query('village_id');
        $streetId = request()->query('street_id');

        // Base query dengan eager load ringan
        $query = Subdistrict::with([
            'villages' => function ($q) use ($villageId, $streetId) {
                if ($villageId) {
                    $q->where('id', $villageId);
                }

                $q->with(['streets' => function ($s) use ($streetId) {
                    if ($streetId) {
                        $s->where('id', $streetId);
                    }
                    $s->with('requiredItem');
                }]);
            },
        ])->findOrFail($subdistrict->id);

        // Ambil list kelurahan dan jalan untuk popover
        $allVillages = $subdistrict->loadMissing('villages.streets')->villages;

        $villages = $query->villages;
        $streets = collect();
        if ($villageId) {
            $streets = $villages->firstWhere('id', $villageId)?->streets ?? collect();
        }

        // Hitung total berdasarkan hasil filter
        $totals = collect([
            'street_length' => 0,
            'installed_panels_prabayar' => 0,
            'installed_panels_pascabayar' => 0,
            'required_panels' => 0,
            'installed_cable_length' => 0,
            'required_cable_length' => 0,
            'required_lamps' => 0,
            'installed_lamps_via_app' => 0,
            'installed_lamps_non_app' => 0,
            'installed_lamps_mandiri' => 0,
        ]);

        foreach ($query->villages as $village) {
            foreach ($village->streets as $street) {
                $item = $street->requiredItem;
                if ($item) {
                    $totals = $totals->map(fn($val, $key) => $val + ($item->$key ?? 0));
                }
            }
        }

        return inertia('sidebar/data_master/kecamatan/show', [
            'allVillages' => $allVillages,
            'subdistrict' => $query,
            'villages' => $villages,
            'streets' => $streets,
            'totals' => $totals,
            'filters' => [
                'village_id' => $villageId,
                'street_id' => $streetId,
            ],
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Subdistrict $subdistrict)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Subdistrict $subdistrict)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:100',
        ]);

        $subdistrict->update($validatedData);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subdistrict $subdistrict)
    {
        $subdistrict->delete();
        return redirect()->route('subdistricts.index');
    }
}
