<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Journal extends Model
{
    protected $fillable = [
        'name', 'abbreviation', 'e_issn', 'p_issn', 'publisher',
        'description', 'focus_scope', 'author_guidelines', 'publication_ethics',
        'peer_review_process', 'copyright_notice', 'privacy_statement',
        'cover_image', 'doi_prefix', 'settings',
    ];

    protected $casts = ['settings' => 'array'];

    public function volumes() { return $this->hasMany(Volume::class); }
    public function editorialBoard() { return $this->hasMany(EditorialBoardMember::class)->orderBy('order'); }
}
