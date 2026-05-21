import { Link } from '@inertiajs/react';
import { BookOpenIcon } from '@heroicons/react/24/solid';
import { 
    EnvelopeIcon, 
    PhoneIcon, 
    MapPinIcon 
} from '@heroicons/react/24/outline';

export default function Footer({ journal }) {
    const journalName = journal?.name || 'Jurnal Ilmiah';
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'Home', href: '/' },
        { name: 'Current Issue', href: '/archives' },
        { name: 'Archives', href: '/archives' },
        { name: 'Submit Article', href: '/submissions' },
        { name: 'Contact Us', href: '/page/contact' },
    ];

    const journalLinks = [
        { name: 'Focus & Scope', href: '/page/focus-scope' },
        { name: 'Author Guidelines', href: '/page/author-guidelines' },
        { name: 'Publication Ethics', href: '/page/publication-ethics' },
        { name: 'Peer Review Process', href: '/page/peer-review-process' },
        { name: 'Copyright Notice', href: '/page/copyright-notice' },
        { name: 'Privacy Statement', href: '/page/privacy-statement' },
    ];

    const indexingLogos = [
        { name: 'SINTA', label: 'S5' },
        { name: 'Google Scholar', label: 'GS' },
        { name: 'Crossref', label: 'CR' },
        { name: 'DOAJ', label: 'DJ' },
        { name: 'Garuda', label: 'GR' },
    ];

    return (
        <footer className="relative bg-navy-950 border-t border-white/10">
            {/* Glow Effect Top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Journal Info */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                                <BookOpenIcon className="w-6 h-6 text-navy-950" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">{journalName}</h3>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Scientific Journal</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed mb-6">
                            {journal?.description || 'A peer-reviewed scientific journal committed to advancing knowledge through rigorous academic research and scholarly publication.'}
                        </p>
                        {journal?.e_issn && (
                            <div className="space-y-2 text-sm">
                                <p className="text-gray-400">
                                    <span className="text-gold-400 font-medium">e-ISSN:</span> {journal.e_issn}
                                </p>
                                {journal?.p_issn && (
                                    <p className="text-gray-400">
                                        <span className="text-gold-400 font-medium">p-ISSN:</span> {journal.p_issn}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-400 hover:text-gold-400 transition-colors duration-300"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Journal Policies */}
                    <div>
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
                            Journal Policies
                        </h4>
                        <ul className="space-y-3">
                            {journalLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-400 hover:text-gold-400 transition-colors duration-300"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Indexing & Contact */}
                    <div>
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
                            Indexed By
                        </h4>
                        <div className="flex flex-wrap gap-2 mb-8">
                            {indexingLogos.map((idx) => (
                                <div
                                    key={idx.name}
                                    className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-gold-400 hover:border-gold-500/30 hover:bg-gold-500/10 transition-all cursor-default"
                                    title={idx.name}
                                >
                                    {idx.label}
                                </div>
                            ))}
                        </div>

                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Contact
                        </h4>
                        <div className="space-y-3 text-sm text-gray-400">
                            <a href="mailto:journal@example.com" className="flex items-center gap-2 hover:text-gold-400 transition-colors">
                                <EnvelopeIcon className="w-4 h-4 text-gold-500" />
                                journal@example.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-gray-500">
                            © {currentYear} {journalName}. All rights reserved.
                        </p>
                        <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-600">Powered by</span>
                            <span className="text-xs font-semibold text-gradient-gold">Jurnal Engine</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
