<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    protected $fillable = ['title', 'content', 'type', 'start_date', 'end_date', 'is_active'];
    protected $casts = ['start_date' => 'date', 'end_date' => 'date', 'is_active' => 'boolean'];
    public function scopeActive($query) { return $query->where('is_active', true)->where(fn($q) => $q->whereNull('end_date')->orWhere('end_date', '>=', now())); }
}
