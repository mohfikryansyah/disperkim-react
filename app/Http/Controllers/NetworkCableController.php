<?php

namespace App\Http\Controllers;

use App\Models\Lamp;
use Inertia\Inertia;
use App\Models\Panel;
use App\Models\Street;
use App\Models\NetworkCable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Services\InfrastructureService;

class NetworkCableController extends Controller
{
    protected InfrastructureService $service;

    public function __construct(InfrastructureService $service)
    {
        $this->service = $service;
    }
    
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $networkCables = NetworkCable::with(['street.village.subdistrict', 'user'])->latest()->get();

        return Inertia::render('sidebar/network_cable/pages', compact('networkCables'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $filters = [
            'subdistrict' => $request->input('subdistrict', 'all'),
            'village' => $request->input('village', 'all'),
            'street' => $request->input('street', 'all'),
        ];
        $data = $this->service->getFilteredData($filters);
        $streets = Street::with(['village.subdistrict', 'panels.street.village.subdistrict'])->latest()->get();
        $networkCables = NetworkCable::with(['street.village.subdistrict', 'user'])->latest()->get();

        return Inertia::render('sidebar/network_cable/create-network-cable', $data + [
            'networkCables' => $networkCables,
            'filters' => $filters,
            'streetsForCreate' => $streets,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();

        if (is_string($data['polyline'])) {
            $data['polyline'] = json_decode($data['polyline'], true);
        }

        $validated = validator($data, [
            'street_id' => 'required|uuid|exists:streets,id',
            'name' => 'required|string|max:255',
            'polyline' => 'required|array|min:2',
            'polyline.*.lat' => 'required|numeric|between:-90,90',
            'polyline.*.lng' => 'required|numeric|between:-180,180',
            'type_cable' => 'required|in:Kabel Jaringan TC-2x10mm,Kabel Jaringan TC-4x10mm,Kabel Jaringan TC-4x25mm,Kabel Jaringan NYY-3x4mm',
        ])->validate();

        $totalLength = 0;
        for ($i = 0; $i < count($validated['polyline']) - 1; $i++) {
            $point1 = $validated['polyline'][$i];
            $point2 = $validated['polyline'][$i + 1];

            $totalLength += $this->haversine(
                $point1['lat'],
                $point1['lng'],
                $point2['lat'],
                $point2['lng']
            );
        }

        $bulatkanTotalLength = round((float) $totalLength);

        $networkCable = NetworkCable::create([
            'user_id' => Auth::id(),
            'street_id' => $validated['street_id'],
            'name' => $validated['name'] ?? null,
            'polyline' => $validated['polyline'],
            'length' => (int) $bulatkanTotalLength,
            'type_cable' => $validated['type_cable'],
        ]);

        $networkCable->load(['street.requiredItem']);

        $networkCable->street->requiredItem->increment('installed_cable_length', (int) $bulatkanTotalLength);

        return to_route('network-cable.index');
    }


    /**
     * Display the specified resource.
     */
    public function show(NetworkCable $networkCable)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(NetworkCable $networkCable)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, NetworkCable $networkCable)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(NetworkCable $networkCable)
    {
        DB::beginTransaction();

        try {
            $networkCable->load(['street.requiredItem']);

            $networkCable->street->requiredItem->decrement('installed_cable_length', $networkCable->length);

            $networkCable->delete();

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
        }

        return back();
    }

    private function haversine($lat1, $lon1, $lat2, $lon2)
    {
        $earthRadius = 6371000; // meter
        $dLat = deg2rad($lat2 - $lat1);
        $dLon = deg2rad($lon2 - $lon1);

        $lat1 = deg2rad($lat1);
        $lat2 = deg2rad($lat2);

        $a = sin($dLat / 2) * sin($dLat / 2) +
            sin($dLon / 2) * sin($dLon / 2) * cos($lat1) * cos($lat2);
        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

        return $earthRadius * $c;
    }
}
