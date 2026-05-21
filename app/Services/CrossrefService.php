<?php

namespace App\Services;

use App\Models\Submission;
use App\Models\SiteSetting;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class CrossrefService
{
    /**
     * Generate Crossref XML for a submission and submit it.
     */
    public function deposit(Submission $submission)
    {
        $username = SiteSetting::get('crossref_username');
        $password = SiteSetting::get('crossref_password');

        if (empty($username) || empty($password)) {
            Log::warning("Crossref credentials not configured. Skipping DOI deposit for Submission ID: {$submission->id}");
            return false;
        }

        $xml = $this->generateXml($submission);
        $filename = "crossref_{$submission->id}_" . time() . ".xml";

        // POST to Crossref (Test environment by default for safety, switch to production url in real usage)
        $url = 'https://test.crossref.org/servlet/deposit';

        $response = Http::attach('fname', $xml, $filename)
            ->withBasicAuth($username, $password)
            ->post($url);

        if ($response->successful()) {
            Log::info("Successfully deposited DOI for Submission ID: {$submission->id}");
            return true;
        }

        Log::error("Failed to deposit DOI for Submission ID: {$submission->id}. Response: " . $response->body());
        return false;
    }

    /**
     * Generate the Crossref Deposit XML schema.
     */
    protected function generateXml(Submission $submission)
    {
        $journal = \App\Models\Journal::first();
        $issue = $submission->issue;
        $volume = $issue ? $issue->volume : null;
        
        $timestamp = now()->timestamp;
        $batchId = "batch_{$submission->id}_{$timestamp}";

        $xml = new \SimpleXMLElement('<?xml version="1.0" encoding="UTF-8"?><doi_batch xmlns="http://www.crossref.org/schema/4.3.6" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="4.3.6" xsi:schemaLocation="http://www.crossref.org/schema/4.3.6 http://www.crossref.org/schemas/crossref4.3.6.xsd"></doi_batch>');

        // Head
        $head = $xml->addChild('head');
        $head->addChild('doi_batch_id', $batchId);
        $head->addChild('timestamp', $timestamp);
        $depositor = $head->addChild('depositor');
        $depositor->addChild('depositor_name', $journal->publisher ?? 'Jurnal Ilmiah');
        $depositor->addChild('email_address', 'admin@jurnal.ac.id');
        $head->addChild('registrant', $journal->publisher ?? 'Jurnal Ilmiah');

        // Body
        $body = $xml->addChild('body');
        $journalElement = $body->addChild('journal');
        
        // Journal Metadata
        $journalMetadata = $journalElement->addChild('journal_metadata');
        $journalMetadata->addChild('full_title', htmlspecialchars($journal->name));
        if ($journal->abbreviation) {
            $journalMetadata->addChild('abbrev_title', htmlspecialchars($journal->abbreviation));
        }
        if ($journal->e_issn) {
            $issn = $journalMetadata->addChild('issn', $journal->e_issn);
            $issn->addAttribute('media_type', 'electronic');
        }

        // Journal Issue
        if ($issue && $volume) {
            $journalIssue = $journalElement->addChild('journal_issue');
            $pubDate = Carbon::parse($issue->publish_date ?? now());
            $publicationDate = $journalIssue->addChild('publication_date');
            $publicationDate->addAttribute('media_type', 'online');
            $publicationDate->addChild('month', $pubDate->format('m'));
            $publicationDate->addChild('day', $pubDate->format('d'));
            $publicationDate->addChild('year', $pubDate->format('Y'));
            
            $journalVolume = $journalIssue->addChild('journal_volume');
            $journalVolume->addChild('volume', $volume->volume_number);
            $journalIssue->addChild('issue', $issue->issue_number);
        }

        // Journal Article
        $article = $journalElement->addChild('journal_article');
        $article->addAttribute('publication_type', 'full_text');
        
        // Titles
        $titles = $article->addChild('titles');
        $titles->addChild('title', htmlspecialchars($submission->title));

        // Contributors
        if ($submission->authors->count() > 0) {
            $contributors = $article->addChild('contributors');
            foreach ($submission->authors as $index => $author) {
                $personName = $contributors->addChild('person_name');
                $personName->addAttribute('sequence', $index === 0 ? 'first' : 'additional');
                $personName->addAttribute('contributor_role', 'author');
                
                // Simplified name splitting (assuming last word is surname)
                $parts = explode(' ', $author->name);
                $surname = array_pop($parts);
                $givenName = implode(' ', $parts);
                
                if (empty($givenName)) {
                    $personName->addChild('surname', htmlspecialchars($surname));
                } else {
                    $personName->addChild('given_name', htmlspecialchars($givenName));
                    $personName->addChild('surname', htmlspecialchars($surname));
                }
                
                if ($author->affiliation) {
                    $affiliations = $personName->addChild('affiliations');
                    $institution = $affiliations->addChild('institution');
                    $institution->addChild('institution_name', htmlspecialchars($author->affiliation));
                }
                if ($author->orcid_id) {
                    $personName->addChild('ORCID', "https://orcid.org/{$author->orcid_id}");
                }
            }
        }

        // Publication Date
        $pubDate = Carbon::parse($submission->published_at ?? now());
        $publicationDate = $article->addChild('publication_date');
        $publicationDate->addAttribute('media_type', 'online');
        $publicationDate->addChild('month', $pubDate->format('m'));
        $publicationDate->addChild('day', $pubDate->format('d'));
        $publicationDate->addChild('year', $pubDate->format('Y'));

        // Pages
        if ($submission->page_start && $submission->page_end) {
            $pages = $article->addChild('pages');
            $pages->addChild('first_page', $submission->page_start);
            $pages->addChild('last_page', $submission->page_end);
        }

        // DOI Data
        $doiData = $article->addChild('doi_data');
        $doiData->addChild('doi', htmlspecialchars($submission->doi));
        $doiData->addChild('resource', url("/articles/{$submission->id}"));

        return $xml->asXML();
    }
}
