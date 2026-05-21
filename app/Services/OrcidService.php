<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class OrcidService
{
    /**
     * Generic ORCID fetcher to retrieve public profile data.
     * In a production environment, this would handle OAuth 2.0 flow.
     */
    public function getProfileData(string $orcidId)
    {
        // ORCID Public API endpoint
        $url = "https://pub.orcid.org/v3.0/{$orcidId}";

        $response = Http::withHeaders([
            'Accept' => 'application/json'
        ])->get($url);

        if ($response->successful()) {
            $data = $response->json();
            
            // Extract useful info
            $person = $data['person'] ?? [];
            $name = $person['name'] ?? [];
            $givenNames = $name['given-names']['value'] ?? '';
            $familyName = $name['family-name']['value'] ?? '';
            
            // Extract employment (affiliation)
            $employmentSummary = $data['activities-summary']['employments']['affiliation-group'][0]['summaries'][0]['employment-summary'] ?? null;
            $affiliation = $employmentSummary ? $employmentSummary['organization']['name'] : '';

            return [
                'name' => trim("{$givenNames} {$familyName}"),
                'affiliation' => $affiliation,
                'raw_data' => $data
            ];
        }

        return null;
    }
}
