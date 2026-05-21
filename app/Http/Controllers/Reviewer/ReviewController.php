<?php

namespace App\Http\Controllers\Reviewer;

use App\Http\Controllers\Controller;
use App\Models\ReviewAssignment;
use App\Models\RevisionHistory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReviewController extends Controller
{
    public function show(ReviewAssignment $review, Request $request)
    {
        if ($review->reviewer_id !== $request->user()->id) {
            abort(403);
        }

        $review->load(['submission.authors', 'submission.files', 'comments']);

        return Inertia::render('Reviewer/Reviews/Show', [
            'review' => $review,
        ]);
    }

    public function respond(ReviewAssignment $review, Request $request)
    {
        if ($review->reviewer_id !== $request->user()->id) abort(403);

        $request->validate(['response' => 'required|in:accepted,declined']);
        $review->update(['status' => $request->response]);

        return back()->with('success', 'Response submitted.');
    }

    public function submit(ReviewAssignment $review, Request $request)
    {
        if ($review->reviewer_id !== $request->user()->id) abort(403);

        $request->validate([
            'recommendation' => 'required|in:accept,minor_revision,major_revision,reject',
            'comments_to_author' => 'required|string|min:50',
            'comments_to_editor' => 'nullable|string',
            'score_originality' => 'required|integer|between:1,10',
            'score_methodology' => 'required|integer|between:1,10',
            'score_significance' => 'required|integer|between:1,10',
            'score_clarity' => 'required|integer|between:1,10',
            'score_references' => 'required|integer|between:1,10',
        ]);

        $overallScore = round(($request->score_originality + $request->score_methodology + $request->score_significance + $request->score_clarity + $request->score_references) / 5);

        $review->update([
            'recommendation' => $request->recommendation,
            'comments_to_author' => $request->comments_to_author,
            'comments_to_editor' => $request->comments_to_editor,
            'score_originality' => $request->score_originality,
            'score_methodology' => $request->score_methodology,
            'score_significance' => $request->score_significance,
            'score_clarity' => $request->score_clarity,
            'score_references' => $request->score_references,
            'overall_score' => $overallScore,
            'status' => 'completed',
            'completed_at' => now(),
        ]);

        RevisionHistory::create([
            'submission_id' => $review->submission_id,
            'user_id' => $request->user()->id,
            'action' => 'review_completed',
            'notes' => "Review completed. Recommendation: {$request->recommendation}",
        ]);

        return redirect()->route('reviewer.dashboard')->with('success', 'Review submitted!');
    }
}
