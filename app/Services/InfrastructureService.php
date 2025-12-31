<?php

namespace App\Services;

use App\Models\Lamp;
use App\Models\Panel;
use App\Models\Street;
use App\Models\Subdistrict;
use App\Models\NetworkCable;
use Illuminate\Support\Facades\DB;

class InfrastructureService
{
    public function getFilteredData(array $filters): array
    {
        $shouldLoadData = $filters['subdistrict'] !== 'all';

        $lamps = collect();
        $panels = collect();
        $networkCables = collect();

        if ($shouldLoadData) {
            $lampsQuery = Lamp::with(['street.village.subdistrict', 'user:id,name', 'panel:id,name']);
            $this->applyLocationFilters($lampsQuery, $filters);
            $lamps = $lampsQuery->get();

            $panelsQuery = Panel::with(['street.village.subdistrict', 'user:id,name']);
            $this->applyLocationFilters($panelsQuery, $filters);
            $panels = $panelsQuery->get();

            $cablesQuery = NetworkCable::with(['street.village.subdistrict']);
            $this->applyLocationFilters($cablesQuery, $filters);
            $networkCables = $cablesQuery->get();
        }

        $subdistricts = $this->getSubdistricts();
        $villages = $this->getVillages($filters['subdistrict']);
        $streets = $this->getStreets($filters['village']);

        return [
            'lamps' => $lamps,
            'panels' => $panels,
            'networkCables' => $networkCables,
            'subdistricts' => $subdistricts,
            'villages' => $villages,
            'streets' => $streets,
        ];
    }

    protected function applyLocationFilters($query, array $filters): void
    {
        if ($filters['subdistrict'] !== 'all') {
            $query->whereHas(
                'street.village.subdistrict',
                fn($q) =>
                $q->where('name', $filters['subdistrict'])
            );
        }

        if ($filters['village'] !== 'all') {
            $query->whereHas(
                'street.village',
                fn($q) =>
                $q->where('name', $filters['village'])
            );
        }

        if ($filters['street'] !== 'all') {
            $query->whereHas(
                'street',
                fn($q) =>
                $q->where('name', $filters['street'])
            );
        }
    }

    public function getSubdistricts(): array
    {
        $subdistrictIds = collect();

        $lampSubdistricts = DB::table('lamps')
            ->join('streets', 'lamps.street_id', '=', 'streets.id')
            ->join('villages', 'streets.village_id', '=', 'villages.id')
            ->join('subdistricts', 'villages.subdistrict_id', '=', 'subdistricts.id')
            ->select('subdistricts.id')
            ->distinct()
            ->pluck('id');

        $subdistrictIds = $subdistrictIds->merge($lampSubdistricts);

        $panelSubdistricts = DB::table('panels')
            ->join('streets', 'panels.street_id', '=', 'streets.id')
            ->join('villages', 'streets.village_id', '=', 'villages.id')
            ->join('subdistricts', 'villages.subdistrict_id', '=', 'subdistricts.id')
            ->select('subdistricts.id')
            ->distinct()
            ->pluck('id');

        $subdistrictIds = $subdistrictIds->merge($panelSubdistricts);

        $cableSubdistricts = DB::table('network_cables')
            ->join('streets', 'network_cables.street_id', '=', 'streets.id')
            ->join('villages', 'streets.village_id', '=', 'villages.id')
            ->join('subdistricts', 'villages.subdistrict_id', '=', 'subdistricts.id')
            ->select('subdistricts.id')
            ->distinct()
            ->pluck('id');

        $subdistrictIds = $subdistrictIds->merge($cableSubdistricts);

        $uniqueIds = $subdistrictIds->unique()->values();

        if ($uniqueIds->isEmpty()) {
            return [];
        }

        return Subdistrict::whereIn('id', $uniqueIds)
            ->orderBy('name')
            ->get()
            ->toArray();
    }

    public function getVillages(string $subdistrictName): array
    {
        if ($subdistrictName === 'all') {
            return [];
        }

        $villageIds = collect();

        $lampVillages = DB::table('lamps')
            ->join('streets', 'lamps.street_id', '=', 'streets.id')
            ->join('villages', 'streets.village_id', '=', 'villages.id')
            ->join('subdistricts', 'villages.subdistrict_id', '=', 'subdistricts.id')
            ->where('subdistricts.name', $subdistrictName)
            ->select('villages.id')
            ->distinct()
            ->pluck('id');

        $villageIds = $villageIds->merge($lampVillages);

        $panelVillages = DB::table('panels')
            ->join('streets', 'panels.street_id', '=', 'streets.id')
            ->join('villages', 'streets.village_id', '=', 'villages.id')
            ->join('subdistricts', 'villages.subdistrict_id', '=', 'subdistricts.id')
            ->where('subdistricts.name', $subdistrictName)
            ->select('villages.id')
            ->distinct()
            ->pluck('id');

        $villageIds = $villageIds->merge($panelVillages);

        $cableVillages = DB::table('network_cables')
            ->join('streets', 'network_cables.street_id', '=', 'streets.id')
            ->join('villages', 'streets.village_id', '=', 'villages.id')
            ->join('subdistricts', 'villages.subdistrict_id', '=', 'subdistricts.id')
            ->where('subdistricts.name', $subdistrictName)
            ->select('villages.id')
            ->distinct()
            ->pluck('id');

        $villageIds = $villageIds->merge($cableVillages);

        $uniqueIds = $villageIds->unique()->values();

        if ($uniqueIds->isEmpty()) {
            return [];
        }

        return \App\Models\Village::whereIn('id', $uniqueIds)
            ->orderBy('name')
            ->get()
            ->toArray();
    }

    public function getStreets(string $villageName): array
    {
        if ($villageName === 'all') {
            return [];
        }

        $streetIds = collect();

        $lampStreets = DB::table('lamps')
            ->join('streets', 'lamps.street_id', '=', 'streets.id')
            ->join('villages', 'streets.village_id', '=', 'villages.id')
            ->where('villages.name', $villageName)
            ->select('streets.id')
            ->distinct()
            ->pluck('id');

        $streetIds = $streetIds->merge($lampStreets);

        $panelStreets = DB::table('panels')
            ->join('streets', 'panels.street_id', '=', 'streets.id')
            ->join('villages', 'streets.village_id', '=', 'villages.id')
            ->where('villages.name', $villageName)
            ->select('streets.id')
            ->distinct()
            ->pluck('id');

        $streetIds = $streetIds->merge($panelStreets);

        $cableStreets = DB::table('network_cables')
            ->join('streets', 'network_cables.street_id', '=', 'streets.id')
            ->join('villages', 'streets.village_id', '=', 'villages.id')
            ->where('villages.name', $villageName)
            ->select('streets.id')
            ->distinct()
            ->pluck('id');

        $streetIds = $streetIds->merge($cableStreets);

        $uniqueIds = $streetIds->unique()->values();

        if ($uniqueIds->isEmpty()) {
            return [];
        }

        return Street::whereIn('id', $uniqueIds)
            ->orderBy('name')
            ->get()
            ->toArray();
    }
}
