<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DistrictLightingStat>
 */
class DistrictLightingStatFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'district_name' => fake()->unique()->city(),
            'panel_count' => 0,
            'lamp_count' => 0,
            'cable_length' => 0,
        ];
    }
}
