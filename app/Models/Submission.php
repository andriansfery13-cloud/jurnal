<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Submission extends Model
{
    protected $fillable = [
        'user_id', 'issue_id', 'subject_id', 'tracking_code', 'title', 'abstract', 'keywords',
        'language', 'status', 'doi', 'page_start', 'page_end', 'editor_notes',
        'metadata', 'submitted_at', 'accepted_at', 'published_at',
    ];

    protected $casts = [
        'metadata' => 'array',
        'submitted_at' => 'datetime',
        'accepted_at' => 'datetime',
        'published_at' => 'datetime',
    ];

    protected static function booted()
    {
        static::creating(function ($submission) {
            if (empty($submission->tracking_code)) {
                $submission->tracking_code = 'JRN-' . strtoupper(Str::random(8));
            }
        });
    }

    public function user() { return $this->belongsTo(User::class); }
    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function issue() { return $this->belongsTo(Issue::class); }
    public function authors() { return $this->hasMany(SubmissionAuthor::class)->orderBy('order'); }
    public function files() { return $this->hasMany(SubmissionFile::class); }
    public function reviews() { return $this->hasMany(ReviewAssignment::class); }
    public function revisionHistories() { return $this->hasMany(RevisionHistory::class)->orderByDesc('created_at'); }
    public function statistics() { return $this->hasMany(ArticleStatistic::class); }
    public function loaCertificate() { return $this->hasOne(LoaCertificate::class); }

    public function scopePublished($query) { return $query->where('status', 'published'); }
    public function scopeStatus($query, $status) { return $query->where('status', $status); }

    public function getKeywordsArrayAttribute()
    {
        return $this->keywords ? array_map('trim', explode(',', $this->keywords)) : [];
    }

    public function getViewsCountAttribute() { return $this->statistics()->where('type', 'view')->count(); }
    public function getDownloadsCountAttribute() { return $this->statistics()->where('type', 'download')->count(); }
}
