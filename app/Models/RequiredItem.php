<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RequiredItem extends Model
{
    /** @use HasFactory<\Database\Factories\RequiredItemFactory> */
    use HasFactory, HasUuids;

    protected $guarded = ['id'];
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;

    public function street(): BelongsTo
    {
        return $this->belongsTo(Street::class);
    }

    public function iconPin(): BelongsTo
    {
        return $this->belongsTo(IconPin::class);
    }

}
