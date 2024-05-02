<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class travaux_ife extends Model
{
    use HasFactory;
    /**
     * The table associated with the model.
     *
     * @var string
     */
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
        'croquis',
        'vidage',
        'image',
        'cin',
        'riverain',
        'Centroïde'
    ];
    protected $table = 'travaux_ifes';
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }
}
