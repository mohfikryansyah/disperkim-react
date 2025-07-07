<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Subdistrict extends Model
{
    /** @use HasFactory<\Database\Factories\SubdistrictFactory> */
    use HasFactory, HasUuids;

    protected $guarded = ['id'];
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;

    public function villages(): HasMany
    {
        return $this->hasMany(Village::class);
    }

    public function calculateTotalRequiredItems()
    {
        $subdistricts = Subdistrict::with(['villages', 'villages.streets.requiredItem'])->latest()->get();

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

        foreach ($subdistricts as $subdistrict) {
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
        }

        return $totals;
    }

    public function calculateRequiredLampsPerSubdistrict()
    {
        $subdistricts = Subdistrict::with(['villages', 'villages.streets.requiredItem'])->latest()->get();

        $results = collect();

        foreach ($subdistricts as $subdistrict) {
            $lampTotals = collect([
                'installed_lamps_mandiri' => 0,
                'installed_lamps_via_app' => 0,
                'installed_lamps_non_app' => 0,
            ]);

            foreach ($subdistrict->villages as $village) {
                foreach ($village->streets as $street) {
                    $item = $street->requiredItem;

                    if ($item) {
                        $lampTotals = $lampTotals->map(function ($value, $key) use ($item) {
                            return $value + $item->$key;
                        });
                    }
                }
            }

            $results->put($subdistrict->name, $lampTotals);
        }

        return $results;
    }
}
