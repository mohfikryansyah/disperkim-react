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

    public function street(): BelongsTo
    {
        return $this->belongsTo(Street::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    
}
