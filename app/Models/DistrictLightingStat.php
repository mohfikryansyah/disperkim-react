<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DistrictLightingStat extends Model
{
    /** @use HasFactory<\Database\Factories\DistrictLightingStatFactory> */
    use HasFactory;

    protected $guarded = ['id'];

    public function subdistrict(): HasMany
    {
        return $this->hasMany(SubdistrictLightingDetail::class);
    }
}
