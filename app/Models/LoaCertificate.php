<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LoaCertificate extends Model
{
    protected $fillable = ['submission_id', 'certificate_number', 'qr_code', 'pdf_path', 'signed_by'];
    public function submission() { return $this->belongsTo(Submission::class); }
}
