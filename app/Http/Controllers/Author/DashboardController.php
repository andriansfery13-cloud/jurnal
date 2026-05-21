<?php

namespace App\Http\Controllers\Author;

use App\Http\Controllers\Controller;
use App\Models\Submission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $stats = [
            'total' => Submission::where('user_id', $user->id)->count(),
            'draft' => Submission::where('user_id', $user->id)->status('draft')->count(),
            'submitted' => Submission::where('user_id', $user->id)->status('submitted')->count(),
            'under_review' => Submission::where('user_id', $user->id)->status('under_review')->count(),
            'accepted' => Submission::where('user_id', $user->id)->status('accepted')->count(),
            'published' => Submission::where('user_id', $user->id)->status('published')->count(),
            'rejected' => Submission::where('user_id', $user->id)->status('rejected')->count(),
        ];

        $recentSubmissions = Submission::where('user_id', $user->id)
            ->orderByDesc('updated_at')
            ->limit(5)
            ->get();

        return Inertia::render('Author/Dashboard', [
            'stats' => $stats,
            'recentSubmissions' => $recentSubmissions,
        ]);
    }
}
