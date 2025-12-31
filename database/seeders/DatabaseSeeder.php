<?php

namespace Database\Seeders;

use App\Models\Lamp;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use App\Models\Panel;
use App\Models\Street;
use App\Models\IconPin;
use App\Models\Village;
use App\Models\Subdistrict;
use App\Models\RequiredItem;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
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

        // User::factory()->create([
        //     'name' => 'Mohamad Fiqriansyah Panu',
        //     'email' => 'moh.fikryansyah@gmail.com',
        // ]);

        // Subdistrict::factory()->count(9)->create();

        // IconPin::factory()->create([
        //     'name' => 'Contoh Gambar 1',
        //     'path_icon' => 'pin/pin.png',
        // ]);
        // IconPin::factory()->create([
        //     'name' => 'Contoh Gambar 2',
        //     'path_icon' => 'pin/pin2.png',
        // ]);
        // IconPin::factory()->create([
        //     'name' => 'Contoh Gambar 3',
        //     'path_icon' => 'pin/pin3.png',
        // ]);
        // IconPin::factory()->create([
        //     'name' => 'Contoh Gambar 4',
        //     'path_icon' => 'pin/pin4.png',
        // ]);
        // IconPin::factory()->create([
        //     'name' => 'Contoh Gambar 5',
        //     'path_icon' => 'pin/pin5.png',
        // ]);

        // $villagesKotaBarat = ['Lekobalo', 'Dembe', 'Buliide', 'Buladu'];
        // $villagesDungigi = ['Huangobotu', 'Tuladenggi', 'Tomulobutao', 'Tomulobutao Selatan'];

        // foreach ($villagesKotaBarat as $name) {
        //     Village::factory()
        //         ->kotaBarat()
        //         ->state(['name' => $name])
        //         ->create();
        // }

        // foreach ($villagesDungigi as $name) {
        //     Village::factory()
        //         ->dungingi()
        //         ->state(['name' => $name])
        //         ->create();
        // }

        // $streetsDiLekobalo = ['Jl. Usman Isa', 'Jalur Gaza', 'Jl. Pemukiman Warga'];
        // $streetsDiTuladenggi = ['Jl. Beringin', 'Jl. Sawit', 'Jl. Sawit 2', 'Jl. Pemukiman Warga'];

        // foreach ($streetsDiLekobalo as $street) {
        //     $streetLekobalo = Street::factory()
        //         ->lekobalo()
        //         ->state(['name' => $street])
        //         ->create();

        //     $dataLekobalo = [
        //         'street_id' => $streetLekobalo->id,
        //         'created_by' => 1,
        //         'street_length' => 0,
        //         'installed_panels_prabayar' => 0,
        //         'installed_panels_pascabayar' => 0,
        //         'required_panels' => 0,
        //         'installed_cable_length' => 0,
        //         'required_cable_length' => 0,
        //         'required_lamps' => 0,
        //         'installed_lamps_via_app' => 0,
        //         'installed_lamps_non_app' => 0,
        //         'installed_lamps_mandiri' => 0,
        //     ];


        //     RequiredItem::create($dataLekobalo);
        // }


        // foreach ($streetsDiTuladenggi as $street) {
        //     $streetTuladenggi = Street::factory()
        //         ->tuladenggi()
        //         ->state(['name' => $street])
        //         ->create();

        //     $dataTuladenggi = [
        //         'street_id' => $streetTuladenggi->id,
        //         'created_by' => 1,
        //         'street_length' => 0,
        //         'installed_panels_prabayar' => 0,
        //         'installed_panels_pascabayar' => 0,
        //         'required_panels' => 0,
        //         'installed_cable_length' => 0,
        //         'required_cable_length' => 0,
        //         'required_lamps' => 0,
        //         'installed_lamps_via_app' => 0,
        //         'installed_lamps_non_app' => 0,
        //         'installed_lamps_mandiri' => 0,
        //     ];

        //     RequiredItem::create($dataTuladenggi);
        // }

        // Role::create(['name' => 'admin']);
        Role::create(['name' => 'pegawai']);
    }
}
