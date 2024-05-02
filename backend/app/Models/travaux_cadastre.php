<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class travaux_cadastre extends Model
{
    use HasFactory;
    protected $fillable = [
        'nature',
        'Numéro_de_dossier',
        'Numéro_de_mission',
        'titre_foncier',
        'Equipe_de_terrain',
        'materiel',
        'observation',
        'situation_administrative',
        'rattachement',
        'id_user',
        'croquis_de_levé',
        'vidage',
        'image'
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }
}
