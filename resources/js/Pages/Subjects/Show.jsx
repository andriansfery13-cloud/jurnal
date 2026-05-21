import GuestLayout from '@/Layouts/GuestLayout';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { TagIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import { formatDate, truncate } from '@/lib/utils';

export default function SubjectShow({ subject, submissions }) {
    return (
        <GuestLayout title={`${subject.name} - Subjects`}>
            <div className="pt-28 pb-20 min-h-screen bg-navy-950">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 border-b border-white/10 pb-8 relative">
                        <Link href="/subjects" className="text-sm text-gold-400 hover:text-gold-300 mb-6 inline-flex items-center gap-2">
                            <span>←</span> All Subjects
                        </Link>
                        
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 shadow-glow-gold">
                                <TagIcon className="w-8 h-8" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-2">{subject.name}</h1>
                                <p className="text-gray-400">{subject.description || `Browse articles related to ${subject.name}.`}</p>
                            </div>
                        </div>
                    </motion.div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-white font-semibold">
                            <DocumentTextIcon className="w-5 h-5 text-gold-400" />
                            {submissions.length} Articles Found
                        </div>
                        
                        {submissions.map((article, i) => (
                            <motion.div key={article.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                                <Link href={`/articles/${article.id}`} className="block glass-card p-6 hover:border-gold-500/30 transition-all group">
                                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                                <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-full shadow-lg border border-orange-400/50">
                                                    SINTA 5
                                                </span>
                                                <span className="text-xs font-semibold text-gray-400 bg-white/5 px-2 py-1 rounded border border-white/10">
                                                    Vol. {article.issue?.volume?.volume_number}, No. {article.issue?.issue_number}
                                                </span>
                                                <span className="text-xs text-gray-500">{formatDate(article.published_at)}</span>
                                            </div>

                                            <h3 className="text-xl font-semibold text-white group-hover:text-gold-400 transition-colors mb-3 leading-tight">
                                                {article.title}
                                            </h3>
                                            
                                            <div className="flex items-center gap-2 flex-wrap mb-3">
                                                {article.authors?.map(author => (
                                                    <div key={author.id} className="flex items-center gap-1.5 bg-white/5 rounded-full pr-3 border border-white/10">
                                                        <div className="w-6 h-6 rounded-full bg-navy-900 flex items-center justify-center text-[10px] font-bold text-white">
                                                            {author.name.charAt(0)}
                                                        </div>
                                                        <span className="text-xs font-medium text-gray-300">{author.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            
                                            <p className="text-sm text-gray-500 line-clamp-2 mt-2">{truncate(article.abstract, 200)}</p>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}

                        {submissions.length === 0 && (
                            <div className="text-center py-12 glass-card">
                                <p className="text-gray-400">No published articles found in this subject.</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </GuestLayout>
    );
}

// Add a quick DocumentTextIcon to the file since I used it but forgot to import it
function DocumentTextIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    )
}
