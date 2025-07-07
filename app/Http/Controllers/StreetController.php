<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Street;
use App\Models\Village;
use App\Models\RequiredItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Contracts\Service\Attribute\Required;

class StreetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('sidebar/data-master/jalan/pages', [
            'streets' => Street::with(['village.subdistrict'])->latest()->get(),
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
            'village_id' => 'required|exists:villages,id',
        ]);

        $street = Street::create($validatedData);

        $data = [
            'street_id' => $street->id,
            'created_by' => Auth::user()->id,
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
        ];

        RequiredItem::create($data);

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Street $street)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Street $street)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Street $street)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'village_id' => 'required|exists:villages,id',
        ]);

        $street->update($validatedData);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Street $street)
    {
        $street->delete();
        return back();
    }
}
