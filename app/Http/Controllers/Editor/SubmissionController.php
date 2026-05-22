<?php

namespace App\Http\Controllers\Editor;

use App\Http\Controllers\Controller;
use App\Models\Submission;
use App\Models\ReviewAssignment;
use App\Models\RevisionHistory;
use App\Models\User;
use App\Models\Issue;
use App\Jobs\GenerateLoaJob;
use App\Jobs\GenerateDoiJob;
use App\Notifications\ArticlePublishedNotification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubmissionController extends Controller
{
    public function index(Request $request)
    {
        $query = Submission::with(['user', 'reviews.reviewer'])->orderByDesc('created_at');

        if ($request->filled('status')) {
            $query->status($request->status);
        }

        return Inertia::render('Editor/Submissions/Index', [
            'submissions' => $query->paginate(15),
            'filters' => $request->only(['status']),
        ]);
    }

    public function show(Submission $submission)
    {
        $submission->load(['user', 'authors', 'files', 'reviews.reviewer', 'revisionHistories.user', 'issue.volume']);

        $reviewers = User::role('reviewer')->active()->get();
        $issues = Issue::with('volume')->orderByDesc('created_at')->get();

        return Inertia::render('Editor/Submissions/Show', [
            'submission' => $submission,
            'reviewers' => $reviewers,
            'issues' => $issues,
        ]);
    }

    public function assignReviewer(Submission $submission, Request $request)
    {
        $request->validate([
            'reviewer_id' => 'required|exists:users,id',
            'review_type' => 'required|in:single_blind,double_blind',
            'deadline' => 'required|date|after:today',
        ]);

        ReviewAssignment::create([
            'submission_id' => $submission->id,
            'reviewer_id' => $request->reviewer_id,
            'assigned_by' => $request->user()->id,
            'review_type' => $request->review_type,
            'deadline' => $request->deadline,
        ]);

        if ($submission->status === 'submitted') {
            $submission->update(['status' => 'under_review']);
        }

        RevisionHistory::create([
            'submission_id' => $submission->id,
            'user_id' => $request->user()->id,
            'action' => 'review_assigned',
            'notes' => 'Reviewer assigned: ' . User::find($request->reviewer_id)->name,
        ]);

        return back()->with('success', 'Reviewer assigned successfully!');
    }

    public function updateStatus(Submission $submission, Request $request)
    {
        $request->validate([
            'status' => 'required|in:accepted,rejected,revision_required',
            'editor_notes' => 'nullable|string',
            'issue_id' => 'nullable|exists:issues,id',
        ]);

        $data = ['status' => $request->status, 'editor_notes' => $request->editor_notes];

        if ($request->status === 'accepted') {
            $data['accepted_at'] = now();
            if ($request->issue_id) {
                $data['issue_id'] = $request->issue_id;
            }
        }

        $submission->update($data);

        // Generate LOA asynchronously if accepted
        if ($request->status === 'accepted') {
            GenerateLoaJob::dispatch($submission);
        }

        RevisionHistory::create([
            'submission_id' => $submission->id,
            'user_id' => $request->user()->id,
            'action' => $request->status === 'revision_required' ? 'revision_requested' : $request->status,
            'notes' => $request->editor_notes,
        ]);

        return back()->with('success', 'Submission status updated!');
    }

    public function publish(Submission $submission, Request $request)
    {
        $request->validate([
            'issue_id' => 'required|exists:issues,id',
            'page_start' => 'nullable|integer',
            'page_end' => 'nullable|integer',
            'doi' => 'nullable|string',
        ]);

        $submission->update([
            'status' => 'published',
            'issue_id' => $request->issue_id,
            'page_start' => $request->page_start,
            'page_end' => $request->page_end,
            'doi' => $request->doi,
            'published_at' => now(),
        ]);

        // Dispatch DOI registration to Crossref if a DOI is provided
        if ($request->doi) {
            GenerateDoiJob::dispatch($submission);
        }

        // Send Email Notification to the Author
        try {
            $submission->user->notify(new ArticlePublishedNotification($submission));
        } catch (\Exception $e) {
            // Log or ignore if email fails (e.g. SMTP not configured)
        }

        RevisionHistory::create([
            'submission_id' => $submission->id,
            'user_id' => $request->user()->id,
            'action' => 'published',
            'notes' => 'Article published.',
        ]);

        return back()->with('success', 'Article published!');
    }
}
