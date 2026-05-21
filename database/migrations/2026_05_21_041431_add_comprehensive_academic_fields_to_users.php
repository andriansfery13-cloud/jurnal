<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('status')->nullable();
            $table->string('academic_id')->nullable();
            $table->string('citizenship')->nullable();
            $table->string('academic_grade')->nullable();
            $table->string('id_card_number')->unique()->nullable();
            $table->string('google_scholar_url')->nullable();
            // Note: scopus_h_index was added previously, but not scopus_id
            // the schema builder will add it if it doesn't exist yet, but wait, 'scopus_id' doesn't exist, we add it.
            // Oh actually, we're just adding 'scopus_id' specifically.
            if (!Schema::hasColumn('users', 'scopus_id')) {
                $table->string('scopus_id')->nullable();
            }
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'status',
                'academic_id',
                'citizenship',
                'academic_grade',
                'id_card_number',
                'google_scholar_url',
                'scopus_id'
            ]);
        });
    }
};
