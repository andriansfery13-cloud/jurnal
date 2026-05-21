<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReviewAssignment extends Model
{
    protected $fillable = [
        'submission_id', 'reviewer_id', 'assigned_by', 'status', 'review_type',
        'recommendation', 'comments_to_author', 'comments_to_editor',
        'score_originality', 'score_methodology', 'score_significance',
        'score_clarity', 'score_references', 'overall_score', 'deadline', 'completed_at',
    ];

    protected $casts = ['deadline' => 'date', 'completed_at' => 'datetime'];

    public function submission() { return $this->belongsTo(Submission::class); }
    public function reviewer() { return $this->belongsTo(User::class, 'reviewer_id'); }
    public function assignedBy() { return $this->belongsTo(User::class, 'assigned_by'); }
    public function comments() { return $this->hasMany(ReviewComment::class); }

    public function calculateOverallScore(): int
    {
        $scores = array_filter([
            $this->score_originality, $this->score_methodology,
            $this->score_significance, $this->score_clarity, $this->score_references,
        ]);
        return count($scores) > 0 ? (int) round(array_sum($scores) / count($scores)) : 0;
    }
}
