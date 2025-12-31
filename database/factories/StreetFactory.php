<?php

namespace Database\Factories;

use App\Models\Village;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Street>
 */
class StreetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => Str::uuid(),
            'village_id' => Village::factory(),
            'name' => $this->faker->streetName(),
        ];
    }

    public function lekobalo(): static
    {
        return $this->state(function () {
            return [
                'village_id' => Village::where('name', 'Lekobalo')->first()->id
                    ?? Village::factory()->state(['name' => 'Lekobalo']),
            ];
        });
    }

    public function tuladenggi(): static
    {
        return $this->state(function () {
            return [
                'village_id' => Village::where('name', 'Tuladenggi')->first()->id
                    ?? Village::factory()->state(['name' => 'Tuladenggi']),
            ];
        });
    }
}
