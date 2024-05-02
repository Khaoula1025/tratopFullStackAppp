<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class travaux_3d extends Model
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
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }
    public function travaux3dSlam()
    {
        return $this->hasMany(travaux_3d_slam::class, 'id_for3d');
    }
    public function travaux3dDrone()
    {
        return $this->hasMany(travaux_3d_drone::class, 'id_for3d');
    }
    public function travaux3dMms()
    {
        return $this->hasMany(travaux_3d_mms::class, 'id_for3d');
    }
    public function travaux3dGls()
    {
        return $this->hasMany(travaux_3d_gls::class, 'id_for3d');
    }
}
