<?php

namespace App\Http\Controllers;

use App\Models\Volume;
use App\Models\Issue;
use App\Models\Submission;
use Inertia\Inertia;

class ArchiveController extends Controller
{
    public function index()
    {
        $volumes = Volume::with(['issues' => function ($q) {
            $q->published()->orderByDesc('issue_number');
        }])->orderByDesc('year')->get();

        return Inertia::render('Archives/Index', [
            'volumes' => $volumes,
        ]);
    }

    public function show(Issue $issue)
    {
        $issue->load('volume');

        $articles = Submission::with(['authors', 'user'])
            ->where('issue_id', $issue->id)
            ->published()
            ->orderBy('page_start')
            ->get();

        return Inertia::render('Archives/Show', [
            'issue' => $issue,
            'articles' => $articles,
        ]);
    }
}
