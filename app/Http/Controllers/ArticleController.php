<?php

namespace App\Http\Controllers;

use App\Models\Submission;
use App\Models\ArticleStatistic;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index(Request $request)
    {
        $query = Submission::with(['authors', 'user', 'issue.volume'])
            ->published()
            ->orderByDesc('published_at');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('abstract', 'like', "%{$search}%")
                  ->orWhere('keywords', 'like', "%{$search}%");
            });
        }

        if ($request->filled('keyword')) {
            $query->where('keywords', 'like', "%{$request->keyword}%");
        }

        return Inertia::render('Articles/Index', [
            'articles' => $query->paginate(12),
            'filters' => $request->only(['search', 'keyword']),
        ]);
    }

    public function show(Submission $submission)
    {
        if ($submission->status !== 'published') {
            abort(404);
        }

        $submission->load(['authors', 'user', 'issue.volume', 'files']);

        // Record view
        ArticleStatistic::create([
            'submission_id' => $submission->id,
            'ip_address' => request()->ip(),
            'type' => 'view',
            'stat_date' => now()->toDateString(),
        ]);

        $relatedArticles = Submission::published()
            ->where('id', '!=', $submission->id)
            ->where(function ($q) use ($submission) {
                foreach ($submission->keywords_array as $keyword) {
                    $q->orWhere('keywords', 'like', "%{$keyword}%");
                }
            })
            ->limit(4)
            ->get();

        return Inertia::render('Articles/Show', [
            'article' => $submission,
            'relatedArticles' => $relatedArticles,
            'stats' => [
                'views' => $submission->statistics()->where('type', 'view')->count(),
                'downloads' => $submission->statistics()->where('type', 'download')->count(),
            ],
        ]);
    }
}
