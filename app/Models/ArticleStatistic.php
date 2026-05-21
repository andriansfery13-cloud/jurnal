<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ArticleStatistic extends Model
{
    protected $fillable = ['submission_id', 'ip_address', 'type', 'stat_date'];
    protected $casts = ['stat_date' => 'date'];
    public function submission() { return $this->belongsTo(Submission::class); }
}
