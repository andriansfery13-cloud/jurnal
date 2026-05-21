<?php

namespace App\Http\Controllers;

use App\Models\LoaCertificate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LoaController extends Controller
{
    /**
     * Verify LOA Certificate via QR Code.
     */
    public function verify($certificate)
    {
        // Because of the slashes in the certificate number (e.g. LOA/2026/0001), 
        // the route might catch only a part of it if not configured to accept slashes.
        // It's safer to handle the full path or use a query parameter.
        // Assuming the route is defined as Route::get('/verify-loa/{certificate}', ...)->where('certificate', '.*');

        $loa = LoaCertificate::with(['submission.user', 'submission.authors'])
            ->where('certificate_number', $certificate)
            ->first();

        if (!$loa) {
            return Inertia::render('Pages/VerifyLoa', [
                'isValid' => false,
                'message' => 'The requested Letter of Acceptance certificate could not be found or is invalid.'
            ]);
        }

        return Inertia::render('Pages/VerifyLoa', [
            'isValid' => true,
            'loa' => [
                'certificate_number' => $loa->certificate_number,
                'date_issued' => $loa->created_at->format('d F Y'),
                'title' => $loa->submission->title,
                'authors' => $loa->submission->authors->pluck('name')->join(', '),
                'status' => $loa->submission->status,
                'signed_by' => $loa->signed_by,
                'pdf_url' => url("storage/{$loa->pdf_path}")
            ]
        ]);
    }
}
