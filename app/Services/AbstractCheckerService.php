<?php

namespace App\Services;

class AbstractCheckerService
{
    /**
     * Analyze an abstract for basic academic structure and quality.
     */
    public function analyze(string $abstract)
    {
        $wordCount = str_word_count($abstract);
        
        // Basic heuristics
        $issues = [];
        $suggestions = [];
        
        if ($wordCount < 100) {
            $issues[] = "Abstract is too short ({$wordCount} words). Minimum recommended is 150 words.";
        } elseif ($wordCount > 300) {
            $issues[] = "Abstract is too long ({$wordCount} words). Maximum recommended is 250 words.";
        }

        $lowerAbstract = strtolower($abstract);

        // Check for common structural keywords
        $hasBackground = str_contains($lowerAbstract, 'background') || str_contains($lowerAbstract, 'introduction');
        $hasMethod = str_contains($lowerAbstract, 'method') || str_contains($lowerAbstract, 'approach') || str_contains($lowerAbstract, 'experiment');
        $hasResult = str_contains($lowerAbstract, 'result') || str_contains($lowerAbstract, 'showed') || str_contains($lowerAbstract, 'found');
        $hasConclusion = str_contains($lowerAbstract, 'conclu') || str_contains($lowerAbstract, 'summary');

        if (!$hasMethod) {
            $suggestions[] = "Consider explicitly stating the methodology used.";
        }
        if (!$hasResult) {
            $suggestions[] = "Ensure the main results or findings are clearly presented.";
        }
        if (!$hasConclusion) {
            $suggestions[] = "Include a concluding statement summarizing the impact.";
        }

        return [
            'word_count' => $wordCount,
            'issues' => $issues,
            'suggestions' => $suggestions,
            'score' => 100 - (count($issues) * 20) - (count($suggestions) * 10)
        ];
    }
}
