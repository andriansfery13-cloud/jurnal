<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Volume;
use App\Models\Issue;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IssueController extends Controller
{
    public function index()
    {
        $volumes = Volume::with(['issues' => function($q) {
            $q->withCount('submissions');
        }])->orderByDesc('year')->get();

        return Inertia::render('Admin/Issues/Index', [
            'volumes' => $volumes,
        ]);
    }

    public function storeVolume(Request $request)
    {
        $request->validate([
            'volume_number' => 'required|integer',
            'year' => 'required|integer|min:2000|max:2100',
        ]);

        Volume::create([
            'journal_id' => 1, // Assume single journal
            'volume_number' => $request->volume_number,
            'year' => $request->year,
        ]);

        return back()->with('success', 'Volume created successfully.');
    }

    public function storeIssue(Request $request)
    {
        $request->validate([
            'volume_id' => 'required|exists:volumes,id',
            'issue_number' => 'required|integer',
            'title' => 'nullable|string',
            'publish_date' => 'nullable|date',
        ]);

        Issue::create([
            'volume_id' => $request->volume_id,
            'issue_number' => $request->issue_number,
            'title' => $request->title,
            'publish_date' => $request->publish_date,
            'is_current' => false,
            'is_published' => false,
        ]);

        return back()->with('success', 'Issue created successfully.');
    }

    public function updateIssue(Request $request, Issue $issue)
    {
        $request->validate([
            'issue_number' => 'required|integer',
            'title' => 'nullable|string',
            'publish_date' => 'nullable|date',
            'is_current' => 'boolean',
            'is_published' => 'boolean',
        ]);

        if ($request->is_current) {
            Issue::where('id', '!=', $issue->id)->update(['is_current' => false]);
        }

        $issue->update($request->only(['issue_number', 'title', 'publish_date', 'is_current', 'is_published', 'description']));

        return back()->with('success', 'Issue updated successfully.');
    }
}
