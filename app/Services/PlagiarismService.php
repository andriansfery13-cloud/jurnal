<?php

namespace App\Services;

class PlagiarismService
{
    /**
     * Compare submitted text against other articles in the database.
     * This is a basic implementation (cosine similarity) to serve as a placeholder 
     * for a real integration like Turnitin.
     */
    public function checkSimilarity(string $text)
    {
        // 1. Fetch all published abstracts as a corpus (in a real app, you'd index full texts)
        $articles = \App\Models\Submission::where('status', 'published')->get(['id', 'title', 'abstract']);
        
        $highestSimilarity = 0;
        $mostSimilarArticle = null;

        foreach ($articles as $article) {
            $sim = $this->calculateCosineSimilarity($text, $article->abstract);
            if ($sim > $highestSimilarity) {
                $highestSimilarity = $sim;
                $mostSimilarArticle = $article;
            }
        }

        return [
            'similarity_score' => round($highestSimilarity * 100, 2),
            'status' => $highestSimilarity < 0.20 ? 'clean' : ($highestSimilarity < 0.40 ? 'warning' : 'danger'),
            'similar_to' => $mostSimilarArticle ? [
                'id' => $mostSimilarArticle->id,
                'title' => $mostSimilarArticle->title
            ] : null
        ];
    }

    protected function calculateCosineSimilarity($text1, $text2)
    {
        if (empty(trim($text1)) || empty(trim($text2))) return 0;
        
        $tokens1 = array_count_values(str_word_count(strtolower($text1), 1));
        $tokens2 = array_count_values(str_word_count(strtolower($text2), 1));

        $allTokens = array_unique(array_merge(array_keys($tokens1), array_keys($tokens2)));

        $dotProduct = 0;
        $magnitude1 = 0;
        $magnitude2 = 0;

        foreach ($allTokens as $token) {
            $val1 = $tokens1[$token] ?? 0;
            $val2 = $tokens2[$token] ?? 0;

            $dotProduct += ($val1 * $val2);
            $magnitude1 += ($val1 * $val1);
            $magnitude2 += ($val2 * $val2);
        }

        if ($magnitude1 == 0 || $magnitude2 == 0) return 0;

        return $dotProduct / (sqrt($magnitude1) * sqrt($magnitude2));
    }
}
