<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subdistrict>
 */
class SubdistrictFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $names = [
            'Kota Barat',
            'Kota Selatan',
            'Kota Tengah',
            'Kota Timur',
            'Dumbo Raya',
            'Hulonthalangi',
            'Kota Utara',
            'Dungingi',
            'Sipatana'
        ];

        static $index = 0;

        return [
            'name' => $names[$index++ % count($names)],
        ];
    }
}
