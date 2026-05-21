<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('department')->nullable();
            $table->string('sinta_id')->nullable();
            $table->decimal('sinta_score_3yr', 10, 3)->nullable();
            $table->decimal('sinta_score_overall', 10, 3)->nullable();
            $table->integer('scopus_h_index')->nullable();
            $table->integer('scholar_h_index')->nullable();
            $table->json('subjects')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'department',
                'sinta_id',
                'sinta_score_3yr',
                'sinta_score_overall',
                'scopus_h_index',
                'scholar_h_index',
                'subjects'
            ]);
        });
    }
};
