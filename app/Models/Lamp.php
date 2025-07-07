<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Lamp extends Model
{
    /** @use HasFactory<\Database\Factories\LampFactory> */
    use HasFactory;

    protected $guarded = ['id'];

    public function street(): BelongsTo
    {
        return $this->belongsTo(Street::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    
    public function icon(): BelongsTo
    {
        return $this->belongsTo(IconPin::class, 'icon_id');
    }
}
