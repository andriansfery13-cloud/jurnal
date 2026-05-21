<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('journals', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('abbreviation')->nullable();
            $table->string('e_issn')->nullable();
            $table->string('p_issn')->nullable();
            $table->string('publisher')->nullable();
            $table->text('description')->nullable();
            $table->text('focus_scope')->nullable();
            $table->text('author_guidelines')->nullable();
            $table->text('publication_ethics')->nullable();
            $table->text('peer_review_process')->nullable();
            $table->text('copyright_notice')->nullable();
            $table->text('privacy_statement')->nullable();
            $table->string('cover_image')->nullable();
            $table->string('doi_prefix')->nullable();
            $table->json('settings')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('journals');
    }
};
