<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use Inertia\Inertia;

class PublicSubjectController extends Controller
{
    public function index()
    {
        $subjects = Subject::withCount(['submissions' => function($q) {
            $q->where('status', 'published');
        }])->orderByDesc('submissions_count')->get();

        return Inertia::render('Subjects/Index', [
            'subjects' => $subjects
        ]);
    }

    public function show(Subject $subject)
    {
        $submissions = $subject->submissions()
            ->where('status', 'published')
            ->with(['issue.volume', 'authors'])
            ->orderByDesc('published_at')
            ->get();

        return Inertia::render('Subjects/Show', [
            'subject' => $subject,
            'submissions' => $submissions
        ]);
    }
}
