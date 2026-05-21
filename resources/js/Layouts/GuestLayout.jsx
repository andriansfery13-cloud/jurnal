import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Landing/Navbar';
import Footer from '@/Components/Landing/Footer';

export default function GuestLayout({ children, title, journal, meta = {} }) {
    const journalName = journal?.name || 'Jurnal Ilmiah';

    return (
        <div className="min-h-screen bg-navy-950 text-white">
            <Head>
                <title>{title ? `${title} - ${journalName}` : journalName}</title>
                {meta.description && <meta name="description" content={meta.description} />}
                {meta.keywords && <meta name="keywords" content={meta.keywords} />}
                
                {/* Open Graph */}
                <meta property="og:title" content={title || journalName} />
                {meta.description && <meta property="og:description" content={meta.description} />}
                <meta property="og:type" content="website" />
                
                {/* Google Scholar Meta */}
                {meta.citation_title && <meta name="citation_title" content={meta.citation_title} />}
                {meta.citation_author && <meta name="citation_author" content={meta.citation_author} />}
                {meta.citation_publication_date && <meta name="citation_publication_date" content={meta.citation_publication_date} />}
                {meta.citation_journal_title && <meta name="citation_journal_title" content={meta.citation_journal_title} />}
                {meta.citation_issn && <meta name="citation_issn" content={meta.citation_issn} />}
                {meta.citation_doi && <meta name="citation_doi" content={meta.citation_doi} />}
                {meta.citation_pdf_url && <meta name="citation_pdf_url" content={meta.citation_pdf_url} />}

                {/* Fonts */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </Head>

            <Navbar />

            <main>
                {children}
            </main>

            <Footer journal={journal} />
        </div>
    );
}
