<?php

namespace Database\Seeders;

use App\Models\travaux_3d_drone;
use App\Models\travaux_3d_gls;
use App\Models\travaux_3d_mms;
use App\Models\travaux_3d_slam;
use App\Models\travaux_cadastre;
use App\Models\travaux_ife;
use App\Models\travaux_topographique;
use App\Models\User;
use Database\Factories\travaux_3d_droneFactory;
use Database\Factories\TravauxCadastreFactory;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(20)->create();
        travaux_cadastre::factory(10)->create();
        travaux_topographique::factory(10)->create();
        travaux_3d_mms::factory(10)->create();
        travaux_ife::factory(10)->create();
        travaux_3d_gls::factory(10)->create();
        travaux_3d_slam::factory(10)->create();
        travaux_3d_drone::factory(10)->create();


        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        //]);
    }
}
