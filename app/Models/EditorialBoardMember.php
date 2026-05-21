<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EditorialBoardMember extends Model
{
    protected $fillable = ['journal_id', 'user_id', 'role', 'name', 'affiliation', 'email', 'orcid_id', 'photo', 'order', 'is_active'];
    protected $casts = ['is_active' => 'boolean'];
    public function journal() { return $this->belongsTo(Journal::class); }
    public function user() { return $this->belongsTo(User::class); }
    public function scopeActive($query) { return $query->where('is_active', true); }
}
