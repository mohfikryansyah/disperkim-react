<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Street;
use App\Models\Village;
use App\Models\Subdistrict;
use App\Models\RequiredItem;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Symfony\Contracts\Service\Attribute\Required;
use Illuminate\Contracts\Validation\ValidationRule;

class StreetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $totals = (new Subdistrict())->calculateTotalRequiredItems();

        return Inertia::render('sidebar/data_master/jalan/pages', [
            'streets' => Street::with(['village.subdistrict', 'requiredItem'])->latest()->get(),
            'villages' => Village::with(['subdistrict', 'streets.lamps', 'streets.panels', 'streets.requiredItem'])->get(),
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
        DB::beginTransaction();

        try {
            $validatedData = $request->validate([
                'name' => [
                    'required',
                    'string',
                    'max:255',
                    Rule::unique('streets')->where(function ($query) use ($request) {
                        return $query->where('village_id', $request->village_id);
                    }),
                ],
                'village_id' => 'required|exists:villages,id',
                'required_lamps' => 'required|numeric|min:0|max:1000000',
                'required_panels' => 'required|numeric|min:0|max:1000000',
                'required_cable_length' => 'required|numeric|min:0|max:1000000',
                'street_length' => 'required|numeric|min:0|max:1000000',
            ]);

            $street = Street::create([
                'name' => $validatedData['name'],
                'village_id' => $validatedData['village_id'],
            ]);

            $data = [
                'street_id' => $street->id,
                'created_by' => Auth::user()->id,
                'street_length' => $validatedData['street_length'],
                'installed_panels_prabayar' => 0,
                'installed_panels_pascabayar' => 0,
                'required_panels' => $validatedData['required_panels'],
                'installed_cable_length' => 0,
                'required_cable_length' => $validatedData['required_cable_length'],
                'required_lamps' => $validatedData['required_lamps'],
                'installed_lamps_via_app' => 0,
                'installed_lamps_non_app' => 0,
                'installed_lamps_mandiri' => 0,
            ];

            RequiredItem::create($data);

            DB::commit();

            return back();
        } catch (\Throwable $e) {
            DB::rollBack();

            throw $e;
        }

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
            'required_lamps' => 'required|numeric|min:0|max:1000000',
            'required_panels' => 'required|numeric|min:0|max:1000000',
            'required_cable_length' => 'required|numeric|min:0|max:1000000',
            'street_length' => 'required|numeric|min:0|max:1000000',
        ]);

        $street->update([
            'name' => $validatedData['name'],
            'village_id' => $validatedData['village_id'],
        ]);

        $street->requiredItem->update([
            'street_length' => $validatedData['street_length'],
            'required_panels' => $validatedData['required_panels'],
            'required_cable_length' => $validatedData['required_cable_length'],
            'required_lamps' => $validatedData['required_lamps'],
        ]);

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
