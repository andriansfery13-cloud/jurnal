<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'affiliation',
        'department',
        'orcid_id',
        'sinta_id',
        'sinta_score_3yr',
        'sinta_score_overall',
        'scopus_h_index',
        'scholar_h_index',
        'subjects',
        'status',
        'academic_id',
        'citizenship',
        'academic_grade',
        'id_card_number',
        'google_scholar_url',
        'scopus_id',
        'is_active',
        'avatar',
    ];

    protected $hidden = ['password', 'remember_token'];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_active' => 'boolean',
            'sinta_score_3yr' => 'decimal:3',
            'sinta_score_overall' => 'decimal:3',
            'scopus_h_index' => 'integer',
            'scholar_h_index' => 'integer',
            'subjects' => 'array',
        ];
    }

    protected $appends = ['avatar_url'];

    public function getAvatarUrlAttribute()
    {
        if ($this->avatar) {
            return url("storage/{$this->avatar}");
        }
        
        return "https://ui-avatars.com/api/?name=" . urlencode($this->name) . "&background=0A1628&color=C9A84C&rounded=true&size=128&bold=true";
    }

    // Role helpers
    public function isAdmin(): bool { return $this->role === 'admin'; }
    public function isEditor(): bool { return $this->role === 'editor'; }
    public function isReviewer(): bool { return $this->role === 'reviewer'; }
    public function isAuthor(): bool { return $this->role === 'author'; }

    // Relationships
    public function submissions() { return $this->hasMany(Submission::class); }
    public function reviewAssignments() { return $this->hasMany(ReviewAssignment::class, 'reviewer_id'); }
    public function editorialBoardMemberships() { return $this->hasMany(EditorialBoardMember::class); }

    // Scopes
    public function scopeRole($query, string $role) { return $query->where('role', $role); }
    public function scopeActive($query) { return $query->where('is_active', true); }
}
