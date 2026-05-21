<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['admin', 'editor', 'reviewer', 'author'])->default('author')->after('email');
            $table->string('orcid_id')->nullable()->after('role');
            $table->string('affiliation')->nullable()->after('orcid_id');
            $table->string('phone')->nullable()->after('affiliation');
            $table->text('bio')->nullable()->after('phone');
            $table->string('avatar')->nullable()->after('bio');
            $table->boolean('is_active')->default(true)->after('avatar');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'orcid_id', 'affiliation', 'phone', 'bio', 'avatar', 'is_active']);
        });
    }
};
