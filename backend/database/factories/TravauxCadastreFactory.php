<?php

namespace Database\Factories;

use App\Http\Controllers\travauxCadastreController;
use App\Models\travaux_cadastre;
use App\Models\TravauxCadastre;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TravauxCadastre>
 */
class TravauxCadastreFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = travaux_cadastre::class;

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
            'rattachement' => $this->faker->text(),
            'id_user' => User::factory(), // Create a new user if necessary
            'croquis_de_levé' => $this->faker->text(),
            'vidage' => $this->faker->text(),
            'image' => $this->faker->imageUrl(),
        ];
    }
}
