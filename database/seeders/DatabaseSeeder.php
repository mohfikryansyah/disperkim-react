<?php

namespace Database\Seeders;

use App\Models\Lamp;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use App\Models\Panel;
use App\Models\Subdistrict;
use Illuminate\Database\Seeder;
use App\Models\DistrictLightingStat;
use App\Models\IconPin;
use App\Models\SubdistrictLightingDetail;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Mohamad Fiqriansyah Panu',
            'email' => 'moh.fikryansyah@gmail.com',
        ]);

        Subdistrict::factory()->count(9)->create();

        IconPin::factory()->create([
            'name' => 'Contoh Gambar 1',
            'path_icon' => 'pin/pin.png',
        ]);
        IconPin::factory()->create([
            'name' => 'Contoh Gambar 2',
            'path_icon' => 'pin/pin2.png',
        ]);
        IconPin::factory()->create([
            'name' => 'Contoh Gambar 3',
            'path_icon' => 'pin/pin3.png',
        ]);
        IconPin::factory()->create([
            'name' => 'Contoh Gambar 4',
            'path_icon' => 'pin/pin4.png',
        ]);
        IconPin::factory()->create([
            'name' => 'Contoh Gambar 5',
            'path_icon' => 'pin/pin5.png',
        ]);

        
    }
}
