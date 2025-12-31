<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class NetworkCable extends Model
{
    /** @use HasFactory<\Database\Factories\NetworkCableFactory> */
    use HasFactory, HasUuids;

    protected $guarded = ['id'];
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $casts = [
        'polyline' => 'array',
    ];

    public function street(): BelongsTo
    {
        return $this->belongsTo(Street::class);
    }

    public function panel(): BelongsTo
    {
        return $this->belongsTo(Panel::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    
}
