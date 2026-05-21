<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RevisionHistory extends Model
{
    protected $fillable = ['submission_id', 'user_id', 'action', 'notes', 'metadata'];
    protected $casts = ['metadata' => 'array'];
    public function submission() { return $this->belongsTo(Submission::class); }
    public function user() { return $this->belongsTo(User::class); }
}
