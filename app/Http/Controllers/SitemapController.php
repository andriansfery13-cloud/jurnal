<?php

namespace App\Http\Controllers;

use App\Models\Submission;
use App\Models\Issue;
use App\Models\StaticPage;
use App\Models\Subject;

class SitemapController extends Controller
{
    public function index()
    {
        $urls = [
            url('/'),
            url('/articles'),
            url('/archives'),
            url('/subjects'),
            url('/authors'),
        ];

        // Add Pages
        $pages = StaticPage::active()->get();
        foreach ($pages as $page) {
            $urls[] = url('/page/' . $page->slug);
        }

        // Add Subjects
        $subjects = Subject::all();
        foreach ($subjects as $subject) {
            $urls[] = url('/subjects/' . $subject->slug);
        }

        // Add Issues
        $issues = Issue::all();
        foreach ($issues as $issue) {
            $urls[] = url('/archives/' . $issue->id);
        }

        // Add Articles (Published Submissions)
        $articles = Submission::where('status', 'published')->get();
        foreach ($articles as $article) {
            $urls[] = url('/articles/' . $article->id);
        }

        $xml = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
        
        foreach ($urls as $url) {
            $xml .= '<url>';
            $xml .= '<loc>' . htmlspecialchars($url) . '</loc>';
            $xml .= '<changefreq>weekly</changefreq>';
            $xml .= '<priority>0.8</priority>';
            $xml .= '</url>';
        }

        $xml .= '</urlset>';

        return response($xml, 200)->header('Content-Type', 'text/xml');
    }
}
