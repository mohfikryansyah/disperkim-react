<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class IconPin extends Model
{
    /** @use HasFactory<\Database\Factories\IconPinFactory> */
    use HasFactory;

    protected $guarded = ['id'];

    public function requiredItem(): HasMany
    {
        return $this->hasMany(RequiredItem::class);
    }
}
