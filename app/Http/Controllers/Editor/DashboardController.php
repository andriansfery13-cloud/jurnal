<?php

namespace App\Http\Controllers\Editor;

use App\Http\Controllers\Controller;
use App\Models\Submission;
use App\Models\ReviewAssignment;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_submissions' => Submission::count(),
            'pending_review' => Submission::status('submitted')->count(),
            'under_review' => Submission::status('under_review')->count(),
            'accepted' => Submission::status('accepted')->count(),
            'published' => Submission::status('published')->count(),
            'rejected' => Submission::status('rejected')->count(),
            'pending_assignments' => ReviewAssignment::where('status', 'pending')->count(),
            'active_reviewers' => User::role('reviewer')->active()->count(),
        ];

        $recentSubmissions = Submission::with(['user', 'reviews.reviewer'])
            ->whereIn('status', ['submitted', 'under_review', 'revised'])
            ->orderByDesc('updated_at')
            ->limit(10)
            ->get();

        return Inertia::render('Editor/Dashboard', [
            'stats' => $stats,
            'recentSubmissions' => $recentSubmissions,
        ]);
    }
}
