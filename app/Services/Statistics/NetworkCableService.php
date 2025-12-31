<?php

namespace App\Services\Statistics;

use App\Models\Lamp;
use App\Models\NetworkCable;
use Illuminate\Support\Facades\DB;

class NetworkCableService
{
    public static function getCableLength(): string
    {
        $totalLength = NetworkCable::sum('length');

        if($totalLength >= 10000) {
            $km = $totalLength / 1000;
            return number_format($km, 2) . ' km';
        }

        return $totalLength . ' m';
    }
}
