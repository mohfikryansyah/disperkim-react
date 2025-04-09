<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Panel extends Model
{
    /** @use HasFactory<\Database\Factories\PanelFactory> */
    use HasFactory;

    protected $gurded = ['id'];

    public function subdistrict(): BelongsTo
    {
        return $this->belongsTo(SubdistrictLightingDetail::class, 'subdistrict_lighting_detail_id');
    }
}
