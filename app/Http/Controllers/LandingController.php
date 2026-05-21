<?php

namespace App\Http\Controllers;

use App\Models\Journal;
use App\Models\Issue;
use App\Models\Submission;
use App\Models\EditorialBoardMember;
use App\Models\ArticleStatistic;
use Inertia\Inertia;

class LandingController extends Controller
{
    public function index()
    {
        $journal = Journal::first();
        $currentIssue = Issue::with('volume')->current()->first();

        $latestArticles = $currentIssue
            ? Submission::with(['authors', 'user'])
                ->where('issue_id', $currentIssue->id)
                ->published()
                ->orderByDesc('published_at')
                ->limit(6)
                ->get()
            : Submission::with(['authors', 'user'])
                ->published()
                ->orderByDesc('published_at')
                ->limit(6)
                ->get();

        $editorialBoard = $journal
            ? EditorialBoardMember::where('journal_id', $journal->id)
                ->active()
                ->orderBy('order')
                ->get()
            : collect();

        $stats = [
            'totalArticles' => Submission::published()->count(),
            'totalAuthors' => Submission::published()->distinct('user_id')->count('user_id'),
            'totalDownloads' => ArticleStatistic::where('type', 'download')->count(),
            'totalViews' => ArticleStatistic::where('type', 'view')->count(),
            'totalCitations' => ArticleStatistic::where('type', 'citation')->count(),
            'sintaRank' => $journal->settings['sinta_rank'] ?? 0,
        ];

        return Inertia::render('Landing', [
            'journal' => $journal,
            'currentIssue' => $currentIssue,
            'latestArticles' => $latestArticles,
            'editorialBoard' => $editorialBoard,
            'stats' => $stats,
        ]);
    }
}
