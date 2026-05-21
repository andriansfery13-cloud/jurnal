<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Subject;

class SubjectSeeder extends Seeder
{
    public function run(): void
    {
        $subjects = [
            ['name' => 'Manajemen', 'description' => 'Artikel terkait ilmu manajemen, bisnis, dan tata kelola perusahaan.'],
            ['name' => 'Ilmu Pemerintahan', 'description' => 'Artikel terkait kebijakan publik, politik, dan administrasi negara.'],
            ['name' => 'Sains & Teknologi', 'description' => 'Artikel terkait rekayasa, ilmu komputer, dan inovasi teknologi.'],
            ['name' => 'Kesehatan', 'description' => 'Artikel terkait medis, keperawatan, dan kesehatan masyarakat.'],
            ['name' => 'Pendidikan', 'description' => 'Artikel terkait pedagogi, kurikulum, dan manajemen pendidikan.']
        ];

        foreach ($subjects as $subject) {
            Subject::create([
                'name' => $subject['name'],
                'slug' => Str::slug($subject['name']),
                'description' => $subject['description'],
            ]);
        }
    }
}
