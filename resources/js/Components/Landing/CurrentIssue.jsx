import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { CalendarIcon, ArrowRightIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { formatDate, truncate } from '@/lib/utils';

export default function CurrentIssue({ issue, articles = [] }) {
    if (!issue) return null;
    return (
        <section className="relative py-24 bg-navy-950">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-end justify-between mb-12">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 mb-4">
                            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
                            <span className="text-xs font-medium text-gold-400">Current Issue</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                            Vol. {issue.volume?.volume_number || '1'}, No. {issue.issue_number || '1'}
                        </h2>
                        <p className="text-gray-400 mt-2 flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4" />
                            {formatDate(issue.publish_date) || 'January 2026'}
                        </p>
                    </div>
                    <Link href={`/archives/${issue.id}`} className="btn-secondary hidden md:inline-flex">
                        View Full Issue <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                </motion.div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.slice(0, 6).map((article, index) => (
                        <motion.div key={article.id || index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                            <Link href={`/articles/${article.id}`} className="block glass-card p-6 h-full hover:border-gold-500/30 hover:shadow-glow-gold transition-all duration-500 group">
                                {article.keywords && (
                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {article.keywords.split(',').slice(0, 3).map((kw, i) => (
                                            <span key={i} className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-gray-400 font-medium">{kw.trim()}</span>
                                        ))}
                                    </div>
                                )}
                                <h3 className="text-base font-semibold text-white group-hover:text-gold-400 transition-colors line-clamp-2 mb-3">{article.title}</h3>
                                <p className="text-sm text-gray-500 line-clamp-3 mb-4">{truncate(article.abstract, 120)}</p>
                                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                                    {article.doi && <span className="text-[10px] font-mono text-gold-500/60">DOI: {article.doi}</span>}
                                    <span className="text-xs text-gray-600">{formatDate(article.published_at)}</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
                {articles.length === 0 && (
                    <div className="text-center py-16">
                        <BookOpenIcon className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                        <p className="text-gray-500">No articles published yet.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
