<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubmissionAuthor extends Model
{
    protected $fillable = ['submission_id', 'name', 'email', 'affiliation', 'orcid_id', 'order', 'is_corresponding'];
    protected $casts = ['is_corresponding' => 'boolean'];
    public function submission() { return $this->belongsTo(Submission::class); }
}
