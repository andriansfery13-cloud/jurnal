<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicAuthorController extends Controller
{
    /**
     * Display a listing of authors who have published articles.
     */
    public function index()
    {
        // Only show authors who have at least one published submission
        $authors = User::whereHas('submissions', function($q) {
            $q->where('status', 'published');
        })
        ->withCount(['submissions' => function($q) {
            $q->where('status', 'published');
        }])
        ->orderByDesc('submissions_count')
        ->paginate(12);

        return Inertia::render('Authors/Index', [
            'authors' => $authors
        ]);
    }

    /**
     * Display the specified author profile.
     */
    public function show(User $author)
    {
        // Ensure the user actually has published something, or is explicitly an author
        $submissions = $author->submissions()
            ->where('status', 'published')
            ->with(['issue.volume', 'authors'])
            ->orderByDesc('published_at')
            ->get();

        return Inertia::render('Authors/Show', [
            'author' => [
                'id' => $author->id,
                'name' => $author->name,
                'affiliation' => $author->affiliation,
                'orcid_id' => $author->orcid_id,
                'avatar_url' => $author->avatar_url,
                'bio' => $author->bio ?? 'No biography provided.',
            ],
            'submissions' => $submissions
        ]);
    }
}
