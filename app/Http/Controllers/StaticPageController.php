<?php

namespace App\Http\Controllers;

use App\Models\StaticPage;
use Inertia\Inertia;

class StaticPageController extends Controller
{
    public function show(string $slug)
    {
        $page = StaticPage::where('slug', $slug)->active()->firstOrFail();

        return Inertia::render('Pages/Show', [
            'page' => $page,
        ]);
    }
}
