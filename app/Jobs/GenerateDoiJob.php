<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Submission;
use App\Services\CrossrefService;
use Illuminate\Support\Facades\Log;

class GenerateDoiJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $submission;

    public function __construct(Submission $submission)
    {
        $this->submission = $submission;
    }

    public function handle(CrossrefService $crossrefService)
    {
        Log::info("Starting DOI generation job for Submission ID: {$this->submission->id}");
        $crossrefService->deposit($this->submission);
    }
}
