<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Issue extends Model
{
    protected $fillable = [
        'volume_id', 'issue_number', 'title', 'cover_image',
        'publish_date', 'is_current', 'is_published', 'description',
    ];

    protected $casts = ['publish_date' => 'date', 'is_current' => 'boolean', 'is_published' => 'boolean'];

    public function volume() { return $this->belongsTo(Volume::class); }
    public function submissions() { return $this->hasMany(Submission::class)->where('status', 'published'); }

    public function scopeCurrent($query) { return $query->where('is_current', true); }
    public function scopePublished($query) { return $query->where('is_published', true); }
}
