<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\travaux_3d_gls>
 */
class travaux_3d_glsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nature' => $this->faker->word(),
            'Numéro_de_dossier' => $this->faker->unique()->numerify('Dossier-#####'),
            'Numéro_de_mission' => $this->faker->unique()->numerify('Mission-#####'),
            'titre_foncier' => $this->faker->word(),
            'Equipe_de_terrain' => $this->faker->name(),
            'materiel' => $this->faker->word(),
            'observation' => $this->faker->text(),
            'situation_administrative' => $this->faker->text(),
            'vidage' => $this->faker->text(),
            'rattachement' => $this->faker->text(),
            'id_user' => rand(1, 6),
        ];
    }
}
