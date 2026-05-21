<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Letter of Acceptance</title>
    <style>
        @page {
            margin: 0cm 0cm;
        }
        body { 
            font-family: 'Times New Roman', Times, serif; 
            margin: 2.2cm 2cm 2.2cm 2cm; 
            color: #1a1a1a; 
            line-height: 1.4;
            background-color: #ffffff;
        }
        
        /* Decorative Background */
        .page-border {
            position: fixed;
            top: 1cm;
            bottom: 1cm;
            left: 1cm;
            right: 1cm;
            border: 2px solid #C9A84C;
            border-radius: 4px;
            z-index: -1;
        }
        .inner-border {
            position: fixed;
            top: 1.1cm;
            bottom: 1.1cm;
            left: 1.1cm;
            right: 1.1cm;
            border: 1px solid #C9A84C;
            border-radius: 2px;
            opacity: 0.5;
            z-index: -1;
        }

        /* Letterhead */
        .header { 
            text-align: center; 
            border-bottom: 2px solid #0A1628; 
            padding-bottom: 10px; 
            margin-bottom: 20px; 
            position: relative;
        }
        .header::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 100%;
            height: 1px;
            background-color: #C9A84C;
        }
        .publisher { 
            font-size: 14px; 
            font-weight: bold; 
            color: #0A1628; 
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .journal-name { 
            font-size: 20px; 
            font-weight: bold; 
            color: #C9A84C; 
            margin: 5px 0; 
            text-transform: uppercase;
        }
        .issn { 
            font-size: 12px; 
            color: #4a5568; 
        }

        /* Meta Information */
        .meta-table {
            width: 100%;
            margin-bottom: 20px;
            font-size: 13px;
        }
        .meta-table td {
            vertical-align: top;
            padding: 2px 0;
        }

        /* Content */
        .title-loa {
            text-align: center;
            font-size: 16px;
            font-weight: bold;
            text-decoration: underline;
            margin-bottom: 5px;
            color: #0A1628;
        }
        .ref-number {
            text-align: center;
            font-size: 12px;
            color: #4a5568;
            margin-bottom: 20px;
        }

        .content { 
            text-align: justify; 
            font-size: 14px;
        }
        
        /* Article Details Box */
        .article-details { 
            background: #f8fafc; 
            padding: 15px; 
            border: 1px solid #e2e8f0;
            border-left: 4px solid #C9A84C; 
            margin: 15px 0; 
            border-radius: 4px;
        }
        .detail-row {
            margin-bottom: 10px;
        }
        .detail-row:last-child {
            margin-bottom: 0;
        }
        .detail-label {
            font-weight: bold;
            color: #2d3748;
            font-size: 12px;
            display: block;
            margin-bottom: 2px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .detail-value {
            color: #1a202c;
            font-size: 14px;
        }
        .detail-value.title {
            font-style: italic;
            font-weight: bold;
            font-size: 13px; /* Smaller title to fit long texts */
        }

        /* Footer & Signatures */
        .footer { 
            margin-top: 30px; 
            width: 100%; 
        }
        .footer-table {
            width: 100%;
        }
        .footer-table td {
            vertical-align: bottom;
        }
        .qr-section {
            width: 40%;
            text-align: left;
        }
        .qr-image {
            width: 100px;
            height: 100px;
            border: 1px solid #e2e8f0;
            padding: 5px;
            background: white;
        }
        .qr-text {
            font-size: 10px; 
            color: #718096; 
            margin-top: 5px;
            font-family: sans-serif;
        }
        .signature-section { 
            width: 60%;
            text-align: right; 
            font-size: 14px;
        }
        .signature-image {
            height: 80px;
            margin: 10px 0;
            object-fit: contain;
        }
        .signature-name {
            font-weight: bold;
            text-decoration: underline;
        }
        .signature-title {
            color: #4a5568;
            font-style: italic;
        }
    </style>
</head>
<body>
    <div class="page-border"></div>
    <div class="inner-border"></div>

    <div class="header">
        <div class="publisher">{{ $journal->publisher ?? 'Publisher Name Not Set' }}</div>
        <div class="journal-name">{{ $journal->name ?? 'Journal Name Not Set' }}</div>
        <div class="issn">
            @if($journal->e_issn) e-ISSN: {{ $journal->e_issn }} @endif 
            @if($journal->e_issn && $journal->p_issn) | @endif 
            @if($journal->p_issn) p-ISSN: {{ $journal->p_issn }} @endif
        </div>
    </div>

    <table class="meta-table">
        <tr>
            <td style="width: 15%;"><strong>Date</strong></td>
            <td style="width: 5%;">:</td>
            <td style="width: 80%;">{{ $date }}</td>
        </tr>
        <tr>
            <td><strong>To</strong></td>
            <td>:</td>
            <td><strong>{{ $submission->user->name }}</strong><br>Corresponding Author</td>
        </tr>
    </table>

    <div class="title-loa">LETTER OF ACCEPTANCE</div>
    <div class="ref-number">Ref No: {{ $certificateNumber }}</div>
    
    <div class="content">
        <p>Dear Author(s),</p>
        
        <p>We are pleased to inform you that your manuscript has been accepted for publication in the <strong>{{ $journal->name }}</strong>. Following a rigorous double-blind peer review process, the Editorial Board has concluded that your research meets the high standards of our journal and makes a significant contribution to the field.</p>
        
        <div class="article-details">
            <div class="detail-row">
                <span class="detail-label">Manuscript Title</span>
                <span class="detail-value title">{{ $submission->title }}</span>
            </div>
            <div class="detail-row" style="margin-top: 10px;">
                <span class="detail-label">Author(s)</span>
                <span class="detail-value">{{ $submission->authors->pluck('name')->join(', ') }}</span>
            </div>
            @if($submission->subject)
            <div class="detail-row" style="margin-top: 10px;">
                <span class="detail-label">Subject Area</span>
                <span class="detail-value">{{ $submission->subject->name }}</span>
            </div>
            @endif
        </div>
        
        <p>Your manuscript will be processed for typesetting and formatting. You will receive the galley proof for final verification prior to official publication. Please ensure that no major changes are made to the manuscript content at this stage.</p>
        
        <p>Thank you for choosing our journal as the venue for your scholarly work. We look forward to your continued contributions to our academic community.</p>
    </div>

    <div class="footer">
        <table class="footer-table">
            <tr>
                <td class="qr-section">
                    <img src="data:image/png;base64,{{ $qrCode }}" alt="Verification QR Code" class="qr-image">
                    <div class="qr-text">Scan to verify document authenticity</div>
                </td>
                <td class="signature-section">
                    <div>Sincerely,</div>
                    <div><strong>Editor in Chief</strong></div>
                    
                    @if(isset($signatureBase64))
                        <img src="{{ $signatureBase64 }}" alt="Signature" class="signature-image">
                    @else
                        <br><br><br><br>
                    @endif
                    
                    <div class="signature-name">{{ $editorName }}</div>
                    <div class="signature-title">{{ $journal->name }}</div>
                </td>
            </tr>
        </table>
    </div>
</body>
</html>
