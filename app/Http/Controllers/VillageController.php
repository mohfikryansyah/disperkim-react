<?php

namespace App\Http\Controllers;

use App\Models\Subdistrict;
use App\Models\Village;
use Illuminate\Http\Request;

class VillageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $villages = Village::with(['subdistrict', 'streets.requiredItem'])->latest()->get();

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

        foreach ($villages as $village) {
            foreach ($village->streets as $street) {
                $item = $street->requiredItem;

                if ($item) {
                    $totals = $totals->map(function ($value, $key) use ($item) {
                        return $value + $item->$key;
                    });
                }
            }
        }

        return inertia('sidebar/data-master/kelurahan/pages', [
            'villages' => $villages,
            'subdistricts' => Subdistrict::get(),
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
            'name' => 'required|string|max:255',
            'subdistrict_id' => 'required|exists:subdistricts,id',
        ]);

        Village::create($validatedData);

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Village $village)
    {
        $village = Village::with(['streets.requiredItem'])->findOrFail($village->id);
        $villages = Village::with(['streets', 'subdistrict'])->get();

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

        foreach ($village->streets as $street) {
            $item = $street->requiredItem;

            if ($item) {
                $totals = $totals->map(function ($value, $key) use ($item) {
                    return $value + $item->$key;
                });
            }
        }


        return inertia('sidebar/data-master/kelurahan/show', [
            'villages' => $villages,
            'villageName' => $village->name,
            'totals' => $totals,
            'subdistricts' => Subdistrict::get(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Village $village)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Village $village)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'subdistrict_id' => 'required|exists:subdistricts,id',
        ]);

        $village->update($validatedData);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Village $village)
    {
        $village->delete();

        return back();
    }
}
