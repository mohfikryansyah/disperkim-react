<?php

namespace Database\Seeders;

use App\Models\Lamp;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use App\Models\Panel;
use Illuminate\Database\Seeder;
use App\Models\DistrictLightingStat;
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

        DistrictLightingStat::factory(5)->create()->each(function ($district) {
            $subdistricts = SubdistrictLightingDetail::factory(rand(2, 4))->create([
                'district_lighting_stat_id' => $district->id,
            ]);
        
            $totalPanelCount = 0;
            $totalLampCount = 0;
            $totalCableLength = 0;
        
            foreach ($subdistricts as $subdistrict) {
                $lampCount = rand(5, 15);
                $cableLength = rand(100, 500); // meter
        
                Lamp::factory($lampCount)->create([
                    'subdistrict_lighting_detail_id' => $subdistrict->id,
                ]);
        
                $panelCount = rand(1, 3); // <- simpan jumlah panel di sini
                Panel::factory($panelCount)->create([
                    'subdistrict_lighting_detail_id' => $subdistrict->id,
                ]);
        
                // Update subdistrict
                $subdistrict->update([
                    'lamp_count' => $lampCount,
                    'cable_length' => $cableLength,
                ]);
        
                $totalPanelCount += $panelCount;
                $totalLampCount += $lampCount;
                $totalCableLength += $cableLength;
            }
        
            $district->update([
                'panel_count' => $totalPanelCount,
                'lamp_count' => $totalLampCount,
                'cable_length' => $totalCableLength,
            ]);
        });
        
    }
}
