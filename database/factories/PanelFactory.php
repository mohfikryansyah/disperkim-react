<?php

namespace Database\Factories;

use App\Models\SubdistrictLightingDetail;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Panel>
 */
class PanelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'subdistrict_lighting_detail_id' => SubdistrictLightingDetail::factory(),
            'name' => 'Panel ' . fake()->word(),
            'latitude' => fake()->latitude(-1.0, 1.0),
            'longitude' => fake()->longitude(122.0, 123.0),
            'status' => fake()->randomElement(['Baik', 'Rusak']),
        ];
    }
}
