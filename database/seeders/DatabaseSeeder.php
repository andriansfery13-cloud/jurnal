<?php

namespace Database\Seeders;

use App\Models\Journal;
use App\Models\Volume;
use App\Models\Issue;
use App\Models\EditorialBoardMember;
use App\Models\Submission;
use App\Models\SubmissionAuthor;
use App\Models\User;
use App\Models\StaticPage;
use App\Models\EmailTemplate;
use App\Models\SiteSetting;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create Admin
        $admin = User::create([
            'name' => 'Administrator',
            'email' => 'admin@jurnal.ac.id',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'affiliation' => 'Universitas Indonesia',
            'is_active' => true,
        ]);

        // Create Editor
        $editor = User::create([
            'name' => 'Prof. Dr. Ahmad Rifai, M.Sc.',
            'email' => 'editor@jurnal.ac.id',
            'password' => Hash::make('password'),
            'role' => 'editor',
            'affiliation' => 'Universitas Indonesia',
            'orcid_id' => '0000-0001-2345-6789',
        ]);

        // Create Reviewers
        $reviewer1 = User::create([
            'name' => 'Dr. Siti Nurhaliza, M.T.',
            'email' => 'reviewer1@jurnal.ac.id',
            'password' => Hash::make('password'),
            'role' => 'reviewer',
            'affiliation' => 'Institut Teknologi Bandung',
            'orcid_id' => '0000-0002-3456-7890',
        ]);

        $reviewer2 = User::create([
            'name' => 'Dr. Budi Santoso, M.Kom.',
            'email' => 'reviewer2@jurnal.ac.id',
            'password' => Hash::make('password'),
            'role' => 'reviewer',
            'affiliation' => 'Universitas Gadjah Mada',
        ]);

        // Create Author
        $author = User::create([
            'name' => 'Dr. Maya Indrawati',
            'email' => 'author@jurnal.ac.id',
            'password' => Hash::make('password'),
            'role' => 'author',
            'affiliation' => 'Universitas Airlangga',
            'orcid_id' => '0000-0004-5678-9012',
        ]);

        // Create Journal
        $journal = Journal::create([
            'name' => 'Jurnal Ilmiah Sains dan Teknologi',
            'abbreviation' => 'JIST',
            'e_issn' => '2798-1234',
            'p_issn' => '2798-5678',
            'publisher' => 'Universitas Indonesia Press',
            'description' => 'Jurnal Ilmiah Sains dan Teknologi (JIST) is a peer-reviewed scientific journal publishing original research in science and technology. Accredited SINTA 5 by the Ministry of Education and Culture, Republic of Indonesia.',
            'doi_prefix' => '10.12345/jist',
        ]);

        // Editorial Board
        EditorialBoardMember::create(['journal_id' => $journal->id, 'user_id' => $editor->id, 'role' => 'editor_in_chief', 'name' => $editor->name, 'affiliation' => 'Universitas Indonesia', 'orcid_id' => $editor->orcid_id, 'order' => 1]);
        EditorialBoardMember::create(['journal_id' => $journal->id, 'user_id' => $reviewer1->id, 'role' => 'section_editor', 'name' => $reviewer1->name, 'affiliation' => 'Institut Teknologi Bandung', 'orcid_id' => $reviewer1->orcid_id, 'order' => 2]);
        EditorialBoardMember::create(['journal_id' => $journal->id, 'user_id' => $reviewer2->id, 'role' => 'editorial_board', 'name' => $reviewer2->name, 'affiliation' => 'Universitas Gadjah Mada', 'order' => 3]);
        EditorialBoardMember::create(['journal_id' => $journal->id, 'role' => 'editorial_board', 'name' => 'Prof. Dr. Dewi Lestari, M.Si.', 'affiliation' => 'Universitas Brawijaya', 'orcid_id' => '0000-0005-6789-0123', 'order' => 4]);

        // Volume & Issue
        $volume = Volume::create(['journal_id' => $journal->id, 'volume_number' => 1, 'year' => 2026]);
        $issue = Issue::create(['volume_id' => $volume->id, 'issue_number' => 1, 'title' => 'January 2026', 'publish_date' => '2026-01-15', 'is_current' => true, 'is_published' => true]);

        // Sample Published Articles
        $sampleArticles = [
            ['title' => 'Machine Learning Approach for Predicting Air Quality Index in Urban Areas', 'abstract' => 'This study proposes a machine learning-based approach for predicting the Air Quality Index (AQI) in urban areas. Using historical data from multiple monitoring stations, we developed and compared several models including Random Forest, XGBoost, and LSTM neural networks. Results show that the hybrid ensemble model achieves 94.2% accuracy in 24-hour AQI prediction.', 'keywords' => 'machine learning, air quality, urban environment, prediction model'],
            ['title' => 'IoT-Based Smart Agriculture Monitoring System Using LoRaWAN', 'abstract' => 'This paper presents the design and implementation of an IoT-based smart agriculture monitoring system utilizing LoRaWAN technology. The system monitors soil moisture, temperature, humidity, and light intensity in real-time, enabling farmers to make data-driven decisions for crop management.', 'keywords' => 'IoT, smart agriculture, LoRaWAN, monitoring system'],
            ['title' => 'Blockchain Technology for Secure Electronic Health Records Management', 'abstract' => 'This research explores the application of blockchain technology for managing electronic health records (EHR). We propose a decentralized framework that ensures data integrity, patient privacy, and interoperability across healthcare institutions.', 'keywords' => 'blockchain, electronic health records, data security, healthcare'],
            ['title' => 'Deep Learning for Indonesian Language Sentiment Analysis on Social Media', 'abstract' => 'This study investigates the application of deep learning techniques for sentiment analysis of Indonesian language text on social media platforms. Using a dataset of 50,000 labeled tweets, we evaluate BERT-based models fine-tuned for Indonesian language processing.', 'keywords' => 'deep learning, sentiment analysis, Indonesian language, NLP'],
            ['title' => 'Renewable Energy Optimization Using Genetic Algorithm for Microgrid Systems', 'abstract' => 'This paper presents an optimization framework for renewable energy resource allocation in microgrid systems using genetic algorithms. The proposed method considers solar, wind, and battery storage to minimize operational costs while maintaining system reliability.', 'keywords' => 'renewable energy, genetic algorithm, microgrid, optimization'],
        ];

        foreach ($sampleArticles as $i => $data) {
            $sub = Submission::create([
                'user_id' => $author->id,
                'issue_id' => $issue->id,
                'title' => $data['title'],
                'abstract' => $data['abstract'],
                'keywords' => $data['keywords'],
                'status' => 'published',
                'doi' => "10.12345/jist.v1i1." . ($i + 1),
                'page_start' => ($i * 12) + 1,
                'page_end' => ($i * 12) + 12,
                'published_at' => '2026-01-15',
                'submitted_at' => '2025-10-01',
                'accepted_at' => '2025-12-15',
            ]);

            SubmissionAuthor::create(['submission_id' => $sub->id, 'name' => $author->name, 'email' => $author->email, 'affiliation' => $author->affiliation, 'orcid_id' => $author->orcid_id, 'order' => 1, 'is_corresponding' => true]);
            SubmissionAuthor::create(['submission_id' => $sub->id, 'name' => 'Dr. Eko Prasetyo', 'email' => 'eko@university.ac.id', 'affiliation' => 'Universitas Diponegoro', 'order' => 2]);
        }

        // Static Pages (SINTA Required)
        $pages = [
            ['slug' => 'focus-scope', 'title' => 'Focus & Scope', 'content' => '<h2>Focus & Scope</h2><p>Jurnal Ilmiah Sains dan Teknologi (JIST) publishes original research articles in the broad fields of science and technology, including but not limited to: Computer Science, Information Technology, Electrical Engineering, Environmental Science, Data Science, and Applied Mathematics.</p><p>The journal accepts theoretical and applied research that contributes to the advancement of knowledge in these areas.</p>', 'order' => 1],
            ['slug' => 'author-guidelines', 'title' => 'Author Guidelines', 'content' => '<h2>Author Guidelines</h2><h3>Manuscript Preparation</h3><p>Manuscripts should be written in English or Bahasa Indonesia and prepared in Microsoft Word format (.docx). The manuscript should include: Title, Abstract (150-250 words), Keywords (3-5 words), Introduction, Methods, Results, Discussion, Conclusion, and References.</p><h3>Formatting</h3><ul><li>Paper size: A4</li><li>Font: Times New Roman, 12pt</li><li>Line spacing: 1.5</li><li>Margins: 2.5 cm on all sides</li><li>References: APA 7th Edition</li></ul>', 'order' => 2],
            ['slug' => 'publication-ethics', 'title' => 'Publication Ethics', 'content' => '<h2>Publication Ethics</h2><p>This journal follows the guidelines of the Committee on Publication Ethics (COPE). All parties involved in the publication process—authors, editors, reviewers, and publishers—are expected to adhere to the highest ethical standards.</p><h3>For Authors</h3><p>Authors must ensure that their work is original, properly cited, and not submitted simultaneously to another journal. Any form of plagiarism is strictly prohibited.</p><h3>For Reviewers</h3><p>Reviewers must maintain confidentiality and provide objective, constructive feedback.</p><h3>For Editors</h3><p>Editors must ensure fair and unbiased review processes and maintain editorial independence.</p>', 'order' => 3],
            ['slug' => 'peer-review-process', 'title' => 'Peer Review Process', 'content' => '<h2>Peer Review Process</h2><p>All submitted manuscripts undergo a rigorous double-blind peer review process. The process includes:</p><ol><li><strong>Initial Screening:</strong> The editorial team reviews the manuscript for scope, format, and quality.</li><li><strong>Reviewer Assignment:</strong> Two expert reviewers are assigned for each manuscript.</li><li><strong>Review Period:</strong> Reviewers have 4 weeks to complete their evaluation.</li><li><strong>Decision:</strong> Based on reviewer recommendations, the editor makes a decision: Accept, Minor Revision, Major Revision, or Reject.</li><li><strong>Revision:</strong> Authors are given 2-4 weeks to revise their manuscript.</li><li><strong>Publication:</strong> Accepted manuscripts are published in the next available issue.</li></ol>', 'order' => 4],
            ['slug' => 'copyright-notice', 'title' => 'Copyright Notice', 'content' => '<h2>Copyright Notice</h2><p>Authors who publish in this journal agree to the following terms:</p><ul><li>Authors retain copyright and grant the journal right of first publication.</li><li>Articles are published under a Creative Commons Attribution 4.0 International License (CC BY 4.0).</li><li>Authors are permitted to distribute their work after publication, provided proper credit is given.</li></ul>', 'order' => 5],
            ['slug' => 'privacy-statement', 'title' => 'Privacy Statement', 'content' => '<h2>Privacy Statement</h2><p>The names and email addresses entered in this journal site will be used exclusively for the stated purposes of this journal and will not be made available for any other purpose or to any other party.</p>', 'order' => 6],
            ['slug' => 'editorial-board', 'title' => 'Editorial Board', 'content' => '<h2>Editorial Board</h2><p>Our editorial board consists of distinguished scholars from various institutions.</p>', 'order' => 7],
            ['slug' => 'contact', 'title' => 'Contact', 'content' => '<h2>Contact Us</h2><p><strong>Editorial Office</strong></p><p>Jurnal Ilmiah Sains dan Teknologi (JIST)</p><p>Email: journal@jurnal.ac.id</p><p>Website: https://jurnal.ac.id</p>', 'order' => 8],
        ];

        foreach ($pages as $page) {
            StaticPage::create($page);
        }

        // Email Templates
        $templates = [
            ['slug' => 'submission_received', 'subject' => 'Submission Received - {tracking_code}', 'body' => 'Dear {author_name},\n\nYour manuscript titled "{title}" has been successfully submitted. Your tracking code is {tracking_code}.\n\nBest regards,\nEditorial Team'],
            ['slug' => 'reviewer_assigned', 'subject' => 'Review Invitation - {journal_name}', 'body' => 'Dear {reviewer_name},\n\nYou have been invited to review a manuscript. Please accept or decline by {deadline}.\n\nBest regards,\nEditorial Team'],
            ['slug' => 'article_accepted', 'subject' => 'Article Accepted - {tracking_code}', 'body' => 'Dear {author_name},\n\nCongratulations! Your manuscript "{title}" has been accepted for publication.\n\nBest regards,\nEditorial Team'],
            ['slug' => 'article_rejected', 'subject' => 'Article Decision - {tracking_code}', 'body' => 'Dear {author_name},\n\nAfter careful review, we regret to inform you that your manuscript "{title}" has not been accepted.\n\nBest regards,\nEditorial Team'],
            ['slug' => 'revision_requested', 'subject' => 'Revision Required - {tracking_code}', 'body' => 'Dear {author_name},\n\nYour manuscript "{title}" requires revision. Please submit your revised manuscript within {deadline} days.\n\nBest regards,\nEditorial Team'],
        ];

        foreach ($templates as $template) {
            EmailTemplate::create($template);
        }

        // Site Settings
        $settings = [
            ['key' => 'site_name', 'value' => 'Jurnal Ilmiah Sains dan Teknologi', 'group' => 'general'],
            ['key' => 'site_description', 'value' => 'Peer-reviewed scientific journal', 'group' => 'general'],
            ['key' => 'crossref_username', 'value' => '', 'group' => 'doi'],
            ['key' => 'crossref_password', 'value' => '', 'group' => 'doi'],
            ['key' => 'doi_prefix', 'value' => '10.12345/jist', 'group' => 'doi'],
            ['key' => 'orcid_client_id', 'value' => '', 'group' => 'orcid'],
            ['key' => 'orcid_client_secret', 'value' => '', 'group' => 'orcid'],
            ['key' => 'review_deadline_days', 'value' => '28', 'group' => 'review'],
            ['key' => 'revision_deadline_days', 'value' => '14', 'group' => 'review'],
        ];

        foreach ($settings as $setting) {
            SiteSetting::create($setting);
        }
    }
}
