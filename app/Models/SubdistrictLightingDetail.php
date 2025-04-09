<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SubdistrictLightingDetail extends Model
{
    /** @use HasFactory<\Database\Factories\SubdistrictLightingDetailFactory> */
    use HasFactory;

    protected $gurded = ['id'];

    public function district(): BelongsTo
    {
        return $this->belongsTo(DistrictLightingStat::class, 'district_lighting_stat_id');
    }

    public function panels(): HasMany
    {
        return $this->hasMany(Panel::class);
    }

    public function lamps(): HasMany
    {
        return $this->hasMany(Lamp::class);
    }
}
