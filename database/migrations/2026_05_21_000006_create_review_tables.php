<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('review_assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('submission_id')->constrained()->cascadeOnDelete();
            $table->foreignId('reviewer_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('assigned_by')->constrained('users')->cascadeOnDelete();
            $table->enum('status', ['pending', 'accepted', 'declined', 'completed'])->default('pending');
            $table->enum('review_type', ['single_blind', 'double_blind'])->default('double_blind');
            $table->enum('recommendation', ['accept', 'minor_revision', 'major_revision', 'reject'])->nullable();
            $table->text('comments_to_author')->nullable();
            $table->text('comments_to_editor')->nullable();
            $table->integer('score_originality')->nullable();
            $table->integer('score_methodology')->nullable();
            $table->integer('score_significance')->nullable();
            $table->integer('score_clarity')->nullable();
            $table->integer('score_references')->nullable();
            $table->integer('overall_score')->nullable();
            $table->date('deadline')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
        });

        Schema::create('review_comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('review_assignment_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->text('comment');
            $table->enum('type', ['to_author', 'to_editor', 'internal'])->default('to_author');
            $table->timestamps();
        });

        Schema::create('revision_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('submission_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->enum('action', ['submitted', 'review_assigned', 'review_completed', 'revision_requested', 'revised', 'accepted', 'rejected', 'published']);
            $table->text('notes')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('revision_histories');
        Schema::dropIfExists('review_comments');
        Schema::dropIfExists('review_assignments');
    }
};
