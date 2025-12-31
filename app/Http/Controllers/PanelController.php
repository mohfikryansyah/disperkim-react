<?php

namespace App\Http\Controllers;

use App\Models\Lamp;
use Inertia\Inertia;
use App\Models\Panel;
use App\Models\Street;
use App\Models\IconPin;
use App\Models\Subdistrict;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class PanelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('sidebar/data_panel/panel/pages', [
            'panels' => Panel::with(['street.village.subdistrict', 'user:id,name,avatar'])->latest()->get(),
            'iconPin' => IconPin::get(),
            'streets' => Street::with(['village.subdistrict'])->get(),
            'lamps' => Lamp::with(['street.village.subdistrict', 'user:id,name,avatar', 'panel'])->latest()->get(),
            'subdistricts' => Subdistrict::with(['villages.streets'])->get(),
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
            'street_id' => 'required',
            'name' => 'required|string|max:100',
            'power' => 'required|integer|min:0',
            'type_panel' => 'required|string|in:Prabayar,Pasca Bayar,Non APP',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'customer_id' => 'required|numeric',
            'customer_name' => 'required|string|max:100',
        ]);

        $validatedData['user_id'] = Auth::user()->id;

        $panel = Panel::create($validatedData);
        $panel->load(['street.village.subdistrict', 'user']);
        if ($panel->type_panel === 'Prabayar') {
            $panel->street->requiredItem->increment('installed_panels_prabayar');
            return back();
        }
        if ($panel->type_panel === 'Pasca Bayar') {
            $panel->street->requiredItem->increment('installed_panels_pascabayar');
            return back();
        }

        return to_route('panel.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Panel $panel)
    {
        return Inertia::render('sidebar/data_panel/panel/show', [
            'panel' => $panel,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Panel $panel)
    {
        return Inertia::render('sidebar/data_panel/panel/edit', [
            'panel' => $panel,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Panel $panel)
    {
        $validatedData = $request->validate([
            'street_id' => 'required',
            'name' => 'required|string|max:100',
            'power' => 'required|integer|min:0',
            'type_panel' => 'required|string|in:Prabayar,Pasca Bayar,Non APP',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'customer_id' => 'required|numeric',
            'customer_name' => 'required|string|max:100',
        ]);

        $validatedData['user_id'] = Auth::user()->id;

        $oldStreet = $panel->street;
        $oldType = $panel->type_panel;
        $oldStreetId = $panel->street_id;

        $panel->update($validatedData);
        $panel->refresh();
        $panel->load(['street.requiredItem']);

        if ($oldType !== $panel->type_panel || $oldStreetId !== $panel->street_id) {
            if ($oldType === 'Prabayar' && $oldStreet?->requiredItem) {
                $oldStreet->requiredItem->decrement('installed_panels_prabayar');
            } elseif ($oldType === 'Pasca Bayar' && $oldStreet?->requiredItem) {
                $oldStreet->requiredItem->decrement('installed_panels_pascabayar');
            }

            if ($panel->type_panel === 'Prabayar' && $panel->street?->requiredItem) {
                $panel->street->requiredItem->increment('installed_panels_prabayar');
            } elseif ($panel->type_panel === 'Pasca Bayar' && $panel->street?->requiredItem) {
                $panel->street->requiredItem->increment('installed_panels_pascabayar');
            }
        }

        return to_route('panel.index')->with('success', 'Data panel berhasil diperbarui.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Panel $panel)
    {
        DB::beginTransaction();

        try {
            $panel->load(['street.village.subdistrict', 'user', 'icon']);

            if ($panel->type_panel === 'Prabayar') {
                $panel->street->requiredItem->decrement('installed_panels_prabayar');
            }

            if ($panel->type_panel === 'Pasca Bayar') {
                $panel->street->requiredItem->decrement('installed_panels_pascabayar');
            }

            $panel->delete();

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error("Failed decrement lamp counter", [
                'panel_id' => $panel->id,
                'error'   => $e->getMessage(),
            ]);
        }

        return back();
    }
}
