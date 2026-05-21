import GuestLayout from '@/Layouts/GuestLayout';
import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { formatDate } from '@/lib/utils';
import Badge from '@/Components/ui/Badge';
import { ArrowDownTrayIcon, EyeIcon, DocumentDuplicateIcon, LinkIcon, QrCodeIcon } from '@heroicons/react/24/outline';

export default function ArticleShow({ article, relatedArticles, stats }) {
    const { journal } = usePage().props;

    const citationAPA = `${article.authors?.map(a => a.name).join(', ')} (${new Date(article.published_at).getFullYear()}). ${article.title}. ${journal?.name || 'Journal'}, ${article.issue?.volume?.volume_number || 1}(${article.issue?.issue_number || 1}), ${article.page_start || ''}-${article.page_end || ''}. https://doi.org/${article.doi}`;

    const meta = {
        citation_title: article.title,
        citation_author: article.authors?.map(a => a.name).join('; '),
        citation_publication_date: article.published_at?.split('T')[0],
        citation_journal_title: journal?.name,
        citation_issn: journal?.e_issn,
        citation_doi: article.doi,
        description: article.abstract?.substring(0, 160),
    };

    // Find the latest manuscript or revision file
    const manuscriptFile = article.files?.slice().reverse().find(f => f.type === 'revision' || f.type === 'manuscript');
    const pdfUrl = manuscriptFile ? `/storage/${manuscriptFile.file_path}` : null;

    return (
        <GuestLayout title={article.title} meta={meta}>
            <div className="pt-28 pb-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} itemScope itemType="https://schema.org/ScholarlyArticle">
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                            <Link href="/" className="hover:text-gold-400">Home</Link>
                            <span>/</span>
                            <Link href="/articles" className="hover:text-gold-400">Articles</Link>
                            <span>/</span>
                            <span className="text-gray-400 truncate max-w-xs">{article.title}</span>
                        </div>

                        {/* Article Header */}
                        <div className="glass-card p-8 mb-8">
                            {/* Keywords */}
                            {article.keywords && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {article.keywords.split(',').map((kw, i) => (
                                        <Badge key={i} variant="default">{kw.trim()}</Badge>
                                    ))}
                                </div>
                            )}

                            <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight" itemProp="headline">{article.title}</h1>

                            {/* Authors */}
                            <div className="mb-6">
                                {article.authors?.map((author, i) => (
                                    <span key={i} className="text-gray-300" itemProp="author">
                                        <span className="font-medium">{author.name}</span>
                                        {author.affiliation && <span className="text-gray-500"> ({author.affiliation})</span>}
                                        {author.orcid_id && (
                                            <a href={`https://orcid.org/${author.orcid_id}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center ml-1 text-emerald-400 text-xs">
                                                ORCID
                                            </a>
                                        )}
                                        {i < article.authors.length - 1 && <span className="text-gray-600"> · </span>}
                                    </span>
                                ))}
                            </div>

                            {/* Meta Info */}
                            <div className="flex flex-wrap gap-4 text-sm text-gray-400 pb-6 border-b border-white/10">
                                {article.doi && (
                                    <span className="flex items-center gap-1">
                                        <LinkIcon className="w-4 h-4 text-gold-500" />
                                        DOI: <a href={`https://doi.org/${article.doi}`} target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-gold-300">{article.doi}</a>
                                    </span>
                                )}
                                <span>Published: {formatDate(article.published_at)}</span>
                                {article.page_start && <span>Pages: {article.page_start}-{article.page_end}</span>}
                            </div>

                            {/* Stats */}
                            <div className="flex items-center gap-6 pt-4">
                                <span className="flex items-center gap-1.5 text-sm text-gray-400"><EyeIcon className="w-4 h-4" /> {stats?.views || 0} views</span>
                                <span className="flex items-center gap-1.5 text-sm text-gray-400"><ArrowDownTrayIcon className="w-4 h-4" /> {stats?.downloads || 0} downloads</span>
                                {pdfUrl && (
                                    <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-medium text-emerald-400 hover:text-emerald-300 ml-auto">
                                        <ArrowDownTrayIcon className="w-4 h-4" /> Download PDF
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Abstract */}
                        <div className="glass-card p-8 mb-8">
                            <h2 className="text-lg font-semibold text-white mb-4">Abstract</h2>
                            <p className="text-gray-300 leading-relaxed" itemProp="abstract">{article.abstract}</p>
                        </div>

                        {/* Full Text PDF Viewer */}
                        {pdfUrl && (
                            <div className="glass-card p-4 md:p-8 mb-8">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-white">Full Text PDF</h2>
                                    <a href={pdfUrl} download className="btn-secondary py-1.5 px-3 text-xs flex items-center gap-2">
                                        <ArrowDownTrayIcon className="w-4 h-4" />
                                        Download File
                                    </a>
                                </div>
                                <div className="w-full h-[600px] md:h-[800px] rounded-xl overflow-hidden border border-white/10 bg-white">
                                    <object data={pdfUrl} type="application/pdf" className="w-full h-full">
                                        <div className="flex flex-col items-center justify-center h-full bg-navy-900 text-center p-6">
                                            <DocumentDuplicateIcon className="w-12 h-12 text-gray-500 mb-3" />
                                            <p className="text-gray-300 mb-2">Your browser doesn't support embedded PDFs.</p>
                                            <a href={pdfUrl} className="text-gold-400 hover:underline">Click here to download the PDF file</a>
                                        </div>
                                    </object>
                                </div>
                            </div>
                        )}

                        {/* Citation */}
                        <div className="glass-card p-8 mb-8">
                            <h2 className="text-lg font-semibold text-white mb-4">Citation (APA)</h2>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                <p className="text-sm text-gray-300 italic">{citationAPA}</p>
                            </div>
                            <button onClick={() => navigator.clipboard.writeText(citationAPA)} className="mt-3 flex items-center gap-2 text-sm text-gold-400 hover:text-gold-300">
                                <DocumentDuplicateIcon className="w-4 h-4" />
                                Copy Citation
                            </button>
                        </div>

                        {/* Related Articles */}
                        {relatedArticles?.length > 0 && (
                            <div>
                                <h2 className="text-xl font-semibold text-white mb-6">Related Articles</h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {relatedArticles.map((rel) => (
                                        <Link key={rel.id} href={`/articles/${rel.id}`} className="glass-card p-5 hover:border-gold-500/30 transition-all group">
                                            <h3 className="text-sm font-semibold text-white group-hover:text-gold-400 transition-colors line-clamp-2">{rel.title}</h3>
                                            <p className="text-xs text-gray-500 mt-2">{formatDate(rel.published_at)}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.article>
                </div>
            </div>
        </GuestLayout>
    );
}
