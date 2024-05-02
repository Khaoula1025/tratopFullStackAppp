<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function travauxTopographiques()
    {
        return $this->hasMany(travaux_topographique::class, 'id_user');
    }
    public function travauxCadastres()
    {
        return $this->hasMany(travaux_cadastre::class, 'id_user');
    }
    public function travauxifes()
    {
        return $this->hasMany(travaux_ife::class, 'id_user');
    }
    public function travaux3dgls()
    {
        return $this->hasMany(travaux_3d_gls::class, 'id_user');
    }
    public function travaux3dDrone()
    {
        return $this->hasMany(travaux_3d_drone::class, 'id_user');
    }
    public function travaux3dmms()
    {
        return $this->hasMany(travaux_3d_mms::class, 'id_user');
    }
    public function travaux3dSlam()
    {
        return $this->hasMany(travaux_3d_slam::class, 'id_user');
    }
}
