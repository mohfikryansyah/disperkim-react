<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\RequiredItem;
use App\Models\Street;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RequiredItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('sidebar/monitoring_pju/pages', [
            'required_items' => RequiredItem::with(['street.village.subdistrict'])->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('sidebar/monitoring_pju/form-required-items', [
            'streets' => Street::with(['village.subdistrict'])->doesntHave('requiredItem')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'street_id' => 'required|exists:streets,id|unique:required_items,street_id',
            'created_by' => 'required',
            'street_length' => 'required|numeric|min:0',
            'installed_panels_prabayar' => 'required|numeric|min:0',
            'installed_panels_pascabayar' => 'required|numeric|min:0',
            'required_panels' => 'required|numeric|min:0',
            'installed_cable_length' => 'required|numeric|min:0',
            'required_cable_length' => 'required|numeric|min:0',
            'required_lamps' => 'required|numeric|min:0',
            'installed_lamps_via_app' => 'required|numeric|min:0',
            'installed_lamps_non_app' => 'required|numeric|min:0',
            'installed_lamps_mandiri' => 'required|numeric|min:0',
        ]);
        
        RequiredItem::create($validated, [
            'created_by' => Auth::user()->id,
        ]);

        return to_route('monitoring-pju.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(RequiredItem $requiredItem)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RequiredItem $requiredItem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RequiredItem $requiredItem)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RequiredItem $requiredItem)
    {
        //
    }
}
