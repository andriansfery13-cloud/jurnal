import GuestLayout from '@/Layouts/GuestLayout';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { formatDate, truncate } from '@/lib/utils';

export default function ArchiveShow({ issue, articles }) {
    return (
        <GuestLayout title={`Vol. ${issue.volume?.volume_number}, No. ${issue.issue_number}`}>
            <div className="pt-28 pb-20 min-h-screen">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                        <Link href="/archives" className="text-sm text-gold-400 hover:text-gold-300 mb-6 inline-flex items-center gap-2">
                            <span>←</span> Back to Archives
                        </Link>
                        
                        <div className="flex flex-col md:flex-row gap-8 items-start glass-card p-8 border-gold-500/30">
                            {/* Journal/Issue Thumbnail */}
                            <div className="w-40 h-56 flex-shrink-0 bg-navy-900 rounded-lg shadow-xl border border-white/10 overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/20 to-transparent z-10 mix-blend-overlay"></div>
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-20">
                                    <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center mb-3">
                                        <svg className="w-6 h-6 text-navy-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xs font-bold text-white uppercase tracking-widest">{issue.journal?.abbreviation || 'JIST'}</h3>
                                    <p className="text-[10px] text-gray-400 mt-1">Vol. {issue.volume?.volume_number}, No. {issue.issue_number}</p>
                                </div>
                            </div>

                            {/* Issue Metadata */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-full shadow-lg border border-orange-400/50">
                                        SINTA 5
                                    </span>
                                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded-full border border-blue-500/30">
                                        Open Access
                                    </span>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                    Vol. {issue.volume?.volume_number}, No. {issue.issue_number}
                                </h1>
                                {issue.title && <p className="text-xl text-gold-400 mb-4">{issue.title}</p>}
                                <div className="flex items-center gap-4 text-sm text-gray-400 mt-4">
                                    <div className="flex items-center gap-1.5">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Published: {formatDate(issue.publish_date)}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        {articles?.length || 0} Articles
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    <div className="space-y-4">
                        {articles?.map((article, i) => (
                            <motion.div key={article.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                                <Link href={`/articles/${article.id}`} className="block glass-card p-6 hover:border-gold-500/30 transition-all group">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-white group-hover:text-gold-400 transition-colors mb-3 leading-tight">{article.title}</h3>
                                            
                                            {/* Author Avatars */}
                                            <div className="flex items-center gap-2 mb-3 flex-wrap">
                                                {article.authors?.map(a => (
                                                    <div key={a.id} className="flex items-center gap-1.5 bg-white/5 rounded-full pr-3 border border-white/10">
                                                        <img 
                                                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(a.name)}&background=0A1628&color=C9A84C&rounded=true&size=32&bold=true`} 
                                                            alt={a.name}
                                                            className="w-6 h-6 rounded-full shadow-sm" 
                                                        />
                                                        <span className="text-xs text-gray-300 font-medium">{a.name}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <p className="text-sm text-gray-500 line-clamp-2 mt-2">{truncate(article.abstract, 200)}</p>
                                        </div>
                                        <div className="text-right text-xs text-gray-500 flex-shrink-0">
                                            {article.page_start && <p>pp. {article.page_start}-{article.page_end}</p>}
                                            {article.doi && <p className="font-mono text-gold-500/60 mt-1">{article.doi}</p>}
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
