<?php

namespace Database\Factories;

use App\Models\Subdistrict;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Village>
 */
class VillageFactory extends Factory
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
            'subdistrict_id' => Subdistrict::factory(),
            'name' => $this->faker->unique()->citySuffix(),
        ];
    }

    public function kotaBarat(): static
    {
        return $this->state(function () {
            return [
                'subdistrict_id' => Subdistrict::where('name', 'Kota Barat')->first()->id
                    ?? Subdistrict::factory()->state(['name' => 'Kota Barat']),
            ];
        });
    }

    public function dungingi(): static
    {
        return $this->state(function () {
            return [
                'subdistrict_id' => Subdistrict::where('name', 'Dungingi')->first()->id
                    ?? Subdistrict::factory()->state(['name' => 'Dungingi']),
            ];
        });
    }
}
