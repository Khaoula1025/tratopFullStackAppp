<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class travaux_3d_slam extends Model
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
        'cibles',
        'lien',
        'id_user'
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }
};
