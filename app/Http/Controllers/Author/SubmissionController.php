<?php

namespace App\Http\Controllers\Author;

use App\Http\Controllers\Controller;
use App\Models\Submission;
use App\Models\SubmissionAuthor;
use App\Models\SubmissionFile;
use App\Models\RevisionHistory;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class SubmissionController extends Controller
{
    public function index(Request $request)
    {
        $submissions = Submission::where('user_id', $request->user()->id)
            ->withCount('reviews')
            ->orderByDesc('created_at')
            ->paginate(10);

        return Inertia::render('Author/Submissions/Index', [
            'submissions' => $submissions,
        ]);
    }

    public function create()
    {
        return Inertia::render('Author/Submissions/Create', [
            'subjects' => Subject::all()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:500',
            'abstract' => 'required|string|min:100',
            'keywords' => 'required|string',
            'language' => 'required|in:en,id',
            'subject_id' => 'required|exists:subjects,id',
            'authors' => 'required|array|min:1',
            'authors.*.name' => 'required|string',
            'authors.*.email' => 'required|email',
            'authors.*.affiliation' => 'required|string',
            'manuscript' => 'required|file|mimes:pdf,docx,doc|max:10240',
        ]);

        $submission = Submission::create([
            'user_id' => $request->user()->id,
            'title' => $request->title,
            'abstract' => $request->abstract,
            'keywords' => $request->keywords,
            'language' => $request->language,
            'subject_id' => $request->subject_id,
            'status' => 'submitted',
            'submitted_at' => now(),
        ]);

        // Authors
        foreach ($request->authors as $i => $authorData) {
            SubmissionAuthor::create([
                'submission_id' => $submission->id,
                'name' => $authorData['name'],
                'email' => $authorData['email'],
                'affiliation' => $authorData['affiliation'],
                'orcid_id' => $authorData['orcid_id'] ?? null,
                'order' => $i + 1,
                'is_corresponding' => $i === 0,
            ]);
        }

        // File
        if ($request->hasFile('manuscript')) {
            $file = $request->file('manuscript');
            $path = $file->store('submissions/' . $submission->id, 'public');
            SubmissionFile::create([
                'submission_id' => $submission->id,
                'type' => 'manuscript',
                'file_path' => $path,
                'original_name' => $file->getClientOriginalName(),
                'mime_type' => $file->getMimeType(),
                'file_size' => $file->getSize(),
                'version' => 1,
            ]);
        }

        // History
        RevisionHistory::create([
            'submission_id' => $submission->id,
            'user_id' => $request->user()->id,
            'action' => 'submitted',
            'notes' => 'Manuscript submitted for review.',
        ]);

        return redirect()->route('author.submissions.show', $submission)
            ->with('success', 'Manuscript submitted successfully! Tracking code: ' . $submission->tracking_code);
    }

    public function show(Submission $submission, Request $request)
    {
        if ($submission->user_id !== $request->user()->id) {
            abort(403);
        }

        $submission->load(['authors', 'files', 'reviews.reviewer', 'revisionHistories.user', 'loaCertificate']);

        return Inertia::render('Author/Submissions/Show', [
            'submission' => $submission,
        ]);
    }

    public function saveDraft(Request $request)
    {
        $request->validate([
            'title' => 'nullable|string|max:500',
            'abstract' => 'nullable|string',
            'keywords' => 'nullable|string',
        ]);

        $submission = Submission::updateOrCreate(
            ['user_id' => $request->user()->id, 'status' => 'draft', 'id' => $request->draft_id],
            [
                'title' => $request->title ?? 'Untitled Draft',
                'abstract' => $request->abstract,
                'keywords' => $request->keywords,
                'language' => $request->language ?? 'en',
                'subject_id' => $request->subject_id,
                'status' => 'draft',
            ]
        );

        return response()->json(['draft_id' => $submission->id, 'tracking_code' => $submission->tracking_code]);
    }

    public function revise(Submission $submission, Request $request)
    {
        if ($submission->user_id !== $request->user()->id || $submission->status !== 'revision_required') {
            abort(403);
        }

        $request->validate([
            'manuscript' => 'required|file|mimes:pdf,docx,doc|max:10240',
            'revision_notes' => 'nullable|string',
        ]);

        $currentVersion = $submission->files()->where('type', 'revision')->max('version') ?? 0;

        if ($request->hasFile('manuscript')) {
            $file = $request->file('manuscript');
            $path = $file->store('submissions/' . $submission->id . '/revisions', 'public');
            SubmissionFile::create([
                'submission_id' => $submission->id,
                'type' => 'revision',
                'file_path' => $path,
                'original_name' => $file->getClientOriginalName(),
                'mime_type' => $file->getMimeType(),
                'file_size' => $file->getSize(),
                'version' => $currentVersion + 1,
            ]);
        }

        $submission->update(['status' => 'revised']);

        RevisionHistory::create([
            'submission_id' => $submission->id,
            'user_id' => $request->user()->id,
            'action' => 'revised',
            'notes' => $request->revision_notes ?? 'Revised manuscript submitted.',
        ]);

        return redirect()->route('author.submissions.show', $submission)
            ->with('success', 'Revision submitted successfully!');
    }
}
