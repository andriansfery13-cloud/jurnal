<?php

namespace App\Http\Controllers\Reviewer;

use App\Http\Controllers\Controller;
use App\Models\ReviewAssignment;
use App\Models\RevisionHistory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $stats = [
            'pending' => ReviewAssignment::where('reviewer_id', $user->id)->where('status', 'pending')->count(),
            'accepted' => ReviewAssignment::where('reviewer_id', $user->id)->where('status', 'accepted')->count(),
            'completed' => ReviewAssignment::where('reviewer_id', $user->id)->where('status', 'completed')->count(),
            'declined' => ReviewAssignment::where('reviewer_id', $user->id)->where('status', 'declined')->count(),
        ];

        $assignments = ReviewAssignment::with(['submission'])
            ->where('reviewer_id', $user->id)
            ->orderByDesc('created_at')
            ->limit(10)
            ->get();

        return Inertia::render('Reviewer/Dashboard', [
            'stats' => $stats,
            'assignments' => $assignments,
        ]);
    }
}
