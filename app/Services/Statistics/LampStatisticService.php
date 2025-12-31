<?php

namespace App\Services\Statistics;

use App\Models\Lamp;
use App\Models\RequiredItem;
use Illuminate\Support\Facades\DB;

class LampStatisticService
{
    public static function getLampCountPerVillage(?string $subdistrictId = null)
    {
        $query = Lamp::query()
            ->select([
                'villages.name as village_name',
                DB::raw('COUNT(lamps.id) as lamp_count'),
            ])
            ->join('streets', 'lamps.street_id', '=', 'streets.id')
            ->join('villages', 'streets.village_id', '=', 'villages.id')
            ->join('subdistricts', 'villages.subdistrict_id', '=', 'subdistricts.id')
            ->groupBy('villages.name')
            ->orderByDesc('lamp_count');

        if ($subdistrictId) {
            $query->where('villages.subdistrict_id', $subdistrictId);
        }

        return $query->get();
    }

    public static function getLampRequirementPerVillage(?string $subdistrictId = null)
    {
        $query = RequiredItem::query()
            ->select([
                'villages.name as village_name',

                DB::raw('
                SUM(
                    installed_lamps_via_app 
                    + installed_lamps_non_app 
                    + installed_lamps_mandiri
                ) as lampu_terpasang
            '),

                DB::raw('SUM(required_items.required_lamps) as lampu_dibutuhkan'),

                DB::raw('
                    SUM(
                        installed_lamps_via_app 
                        + installed_lamps_non_app 
                        + installed_lamps_mandiri
                    )
                    -
                    SUM(required_items.required_lamps)
                    as lampu_belum_terpasang
                ')
            ])
            ->join('streets', 'required_items.street_id', '=', 'streets.id')
            ->join('villages', 'streets.village_id', '=', 'villages.id')
            ->join('subdistricts', 'villages.subdistrict_id', '=', 'subdistricts.id')
            ->groupBy('villages.name')
            ->orderBy('villages.name', 'asc');

        if ($subdistrictId) {
            $query->where('villages.subdistrict_id', $subdistrictId);
        }

        return $query->get();
    }

    public static function getLampRequirementPerSubdistrict(?string $subdistrictId = null)
    {
        $query = RequiredItem::query()
            ->select([
                'subdistricts.name as subdistrict_name',

                DB::raw('
                SUM(
                    installed_lamps_via_app 
                    + installed_lamps_non_app 
                    + installed_lamps_mandiri
                ) as lampu_terpasang
            '),

                DB::raw('SUM(required_items.required_lamps) as lampu_dibutuhkan'),

                DB::raw('
                SUM(
                    installed_lamps_via_app 
                    + installed_lamps_non_app 
                    + installed_lamps_mandiri
                )
                -
                SUM(required_items.required_lamps)
                as lampu_belum_terpasang
            ')
            ])
            ->join('streets', 'required_items.street_id', '=', 'streets.id')
            ->join('villages', 'streets.village_id', '=', 'villages.id')
            ->join('subdistricts', 'villages.subdistrict_id', '=', 'subdistricts.id')
            ->groupBy('subdistricts.name')
            ->orderBy('subdistricts.name', 'asc');

        if ($subdistrictId) {
            $query->where('subdistricts.id', $subdistrictId);
        }

        return $query->get();
    }

    public function countStreetLength($subdistrict)
    {
        return $subdistrict->villages->sum(
            fn($v) =>
            $v->streets->sum(fn($s) => $s->requiredItem->street_length ?? 0)
        );
    }

    public function countRequiredLamps($subdistrict)
    {
        return $subdistrict->villages->sum(
            fn($v) =>
            $v->streets->sum(fn($s) => $s->requiredItem->required_lamps ?? 0)
        );
    }

    public function countInstalledLamps($subdistrict)
    {
        return $subdistrict->villages->sum(
            fn($v) =>
            $v->streets->sum(
                fn($s) => ($s->requiredItem->installed_lamps_via_app ?? 0) +
                    ($s->requiredItem->installed_lamps_non_app ?? 0) +
                    ($s->requiredItem->installed_lamps_mandiri ?? 0)
            )
        );
    }

    public function countRequiredPanels($subdistrict)
    {
        return $subdistrict->villages->sum(
            fn($v) =>
            $v->streets->sum(fn($s) => $s->requiredItem->required_panels ?? 0)
        );
    }

    public function countInstalledPanels($subdistrict)
    {
        return $subdistrict->villages->sum(
            fn($v) =>
            $v->streets->sum(
                fn($s) => ($s->requiredItem->installed_panels_prabayar ?? 0) +
                    ($s->requiredItem->installed_panels_pascabayar ?? 0)
            )
        );
    }

    public function countRequiredNetworkCable($subdistrict)
    {
        return $subdistrict->villages->sum(
            fn($v) =>
            $v->streets->sum(fn($s) => $s->requiredItem->required_cable_length ?? 0)
        );
    }

    public function countInstalledNetworkCable($subdistrict)
    {
        return $subdistrict->villages->sum(
            fn($v) =>
            $v->streets->sum(fn($s) => $s->requiredItem->installed_cable_length ?? 0)
        );
    }
}
