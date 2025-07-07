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
        
        return inertia('sidebar/data-master/kecamatan/pages', [
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
        $subdistrict = Subdistrict::with(['villages', 'villages.streets.requiredItem'])->findOrFail($subdistrict->id);
        $subdistricts = Subdistrict::with(['villages.streets'])->get();

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

        foreach ($subdistrict->villages as $village) {
            foreach ($village->streets as $street) {
                $item = $street->requiredItem;

                if ($item) {
                    $totals = $totals->map(function ($value, $key) use ($item) {
                        return $value + $item->$key;
                    });
                }
            }
        }


        return inertia('sidebar/data-master/kecamatan/show', [
            'subdistrict' => $subdistrict,
            'subdistricts' => $subdistricts,
            'subdistrictName' => $subdistrict->name,
            'totals' => $totals,
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
