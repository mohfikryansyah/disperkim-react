<?php

namespace Database\Factories;

use App\Models\DistrictLightingStat;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SubdistrictLightingDetail>
 */
class SubdistrictLightingDetailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'district_lighting_stat_id' => DistrictLightingStat::factory(),
            'subdistrict_name' => fake()->streetName(),
            'lamp_count' => 0,
            'cable_length' => 0,
        ];
    }
}
