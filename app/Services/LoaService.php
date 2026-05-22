<?php

namespace App\Services;

use App\Models\Submission;
use App\Models\LoaCertificate;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class LoaService
{
    /**
     * Generate LOA PDF for a submission.
     */
    public function generate(Submission $submission)
    {
        if ($submission->status !== 'accepted' && $submission->status !== 'published') {
            throw new \Exception('Submission must be accepted to generate LOA.');
        }

        $certificateNumber = 'LOA/' . now()->year . '/' . str_pad($submission->id, 4, '0', STR_PAD_LEFT);
        
        // Generate QR Code for verification
        $verificationUrl = url("/verify-loa/{$certificateNumber}");
        $qrCodeSvg = (string) QrCode::format('svg')->size(100)->generate($verificationUrl);
        $qrCodeBase64 = base64_encode($qrCodeSvg);

        // Load View and pass data
        $journal = \App\Models\Journal::first() ?? new \App\Models\Journal();
        
        $editorName = $journal->settings['editor_in_chief_name'] ?? 'Editor in Chief';
        $signaturePath = isset($journal->settings['editor_signature_path']) 
            ? storage_path('app/public/' . $journal->settings['editor_signature_path'])
            : null;

        $signatureBase64 = null;
        if ($signaturePath && file_exists($signaturePath)) {
            $type = pathinfo($signaturePath, PATHINFO_EXTENSION);
            $data = file_get_contents($signaturePath);
            $signatureBase64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
        }

        $pdf = Pdf::loadView('pdf.loa', [
            'submission' => $submission,
            'certificateNumber' => $certificateNumber,
            'qrCode' => $qrCodeBase64,
            'journal' => $journal,
            'editorName' => $editorName,
            'signatureBase64' => $signatureBase64,
            'date' => now()->format('d F Y')
        ]);

        // Save PDF to storage
        $filename = "loas/{$submission->id}_loa_" . Str::slug($submission->title) . ".pdf";
        Storage::disk('public')->put($filename, $pdf->output());

        // Update or Create LoaCertificate record
        LoaCertificate::updateOrCreate(
            ['submission_id' => $submission->id],
            [
                'certificate_number' => $certificateNumber,
                'qr_code' => 'svg_rendered_in_pdf',
                'pdf_path' => $filename,
                'signed_by' => $editorName
            ]
        );

        return $filename;
    }
}
