<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReviewComment extends Model
{
    protected $fillable = ['review_assignment_id', 'user_id', 'comment', 'type'];
    public function reviewAssignment() { return $this->belongsTo(ReviewAssignment::class); }
    public function user() { return $this->belongsTo(User::class); }
}
