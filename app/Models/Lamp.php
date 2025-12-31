<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Lamp extends Model
{
    /** @use HasFactory<\Database\Factories\LampFactory> */
    use HasFactory, HasUuids;

    protected $guarded = ['id'];
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;
    protected $appends = ['tanggal_formatted'];
    

    protected function tanggalFormatted(): Attribute
    {
        return Attribute::get(fn () => Carbon::parse($this->tanggal)->translatedFormat('d F Y'));
    }

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
    
    public function icon(): BelongsTo
    {
        return $this->belongsTo(IconPin::class, 'icon_id');
    }
}
