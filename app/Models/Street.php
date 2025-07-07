<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Street extends Model
{
    /** @use HasFactory<\Database\Factories\StreetFactory> */
    use HasFactory, HasUuids;

    protected $guarded = ['id'];
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;

    public function panels(): HasMany
    {
        return $this->hasMany(Panel::class);
    }

    public function lamps(): HasMany
    {
        return $this->hasMany(Lamp::class);
    }

    public function requiredItem(): HasOne
    {
        return $this->hasOne(RequiredItem::class);
    }

    public function village(): BelongsTo
    {
        return $this->belongsTo(Village::class);
    }
}
