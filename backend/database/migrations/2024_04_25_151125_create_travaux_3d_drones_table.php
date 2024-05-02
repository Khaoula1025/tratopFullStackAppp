<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('travaux_3d_drones', function (Blueprint $table) {
            $table->id();
            $table->string('nature');
            $table->string('Numéro_de_dossier');
            $table->string('Numéro_de_mission');
            $table->string('titre_foncier');
            $table->string('Equipe_de_terrain');
            $table->string('materiel');
            $table->text('observation'); // This column can store the content of a <textarea>
            $table->text('situation_administrative'); // This column can store the content of a <textarea>
            $table->text('rattachement');
            $table->text('gcp');
            $table->text('log');
            $table->text('photos');
            $table->text('statique');
            $table->unsignedBigInteger('id_user');
            $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('travaux_3d_drones');
    }
};