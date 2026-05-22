<?php

namespace App\Http\Middleware;

use App\Models\Journal;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $journal = Journal::first();

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ? array_merge(
                    $request->user()->toArray(),
                    ['avatar_url' => $request->user()->avatar_url]
                ) : null,
            ],
            'journal' => $journal ? [
                'id' => $journal->id,
                'name' => $journal->name,
                'abbreviation' => $journal->abbreviation,
                'e_issn' => $journal->e_issn,
                'p_issn' => $journal->p_issn,
                'publisher' => $journal->publisher,
                'description' => $journal->description,
            ] : null,
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
                'status' => fn () => $request->session()->get('status'),
            ],
        ];
    }
}
