<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Submission;
use App\Services\LoaService;
use Illuminate\Support\Facades\Log;

class GenerateLoaJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $submission;

    public function __construct(Submission $submission)
    {
        $this->submission = $submission;
    }

    public function handle(LoaService $loaService)
    {
        try {
            Log::info("Starting LOA generation job for Submission ID: {$this->submission->id}");
            $loaService->generate($this->submission);
            Log::info("Successfully generated LOA for Submission ID: {$this->submission->id}");
        } catch (\Exception $e) {
            Log::error("Failed to generate LOA for Submission ID: {$this->submission->id}. Error: " . $e->getMessage());
        }
    }
}
