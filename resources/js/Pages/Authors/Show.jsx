import GuestLayout from '@/Layouts/GuestLayout';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { formatDate, truncate } from '@/lib/utils';
import { AcademicCapIcon, BuildingOfficeIcon, IdentificationIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';

export default function AuthorShow({ author, submissions }) {
    return (
        <GuestLayout title={`${author.name} - Author Profile`}>
            <div className="pt-28 pb-20 min-h-screen">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Author Profile Header */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                        <Link href="/authors" className="text-sm text-gold-400 hover:text-gold-300 mb-6 inline-flex items-center gap-2">
                            <span>←</span> Back to Directory
                        </Link>
                        
                        <div className="glass-card p-8 sm:p-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-[80px] -z-10" />
                            
                            <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
                                <div className="w-32 h-32 flex-shrink-0 rounded-full overflow-hidden border-4 border-gold-500/20 shadow-xl">
                                    <img src={author.avatar_url} alt={author.name} className="w-full h-full object-cover" />
                                </div>
                                
                                <div className="flex-1">
                                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{author.name}</h1>
                                    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 text-sm text-gray-400 mt-4">
                                        {author.affiliation && (
                                            <div className="flex items-center gap-2">
                                                <BuildingOfficeIcon className="w-5 h-5 text-gold-400" />
                                                {author.affiliation}
                                            </div>
                                        )}
                                        {author.orcid_id && (
                                            <div className="flex items-center gap-2">
                                                <IdentificationIcon className="w-5 h-5 text-green-400" />
                                                <a href={`https://orcid.org/${author.orcid_id}`} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
                                                    {author.orcid_id}
                                                </a>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2">
                                            <AcademicCapIcon className="w-5 h-5 text-blue-400" />
                                            {submissions.length} Published Articles
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Author's Published Articles */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <CheckBadgeIcon className="w-8 h-8 text-gold-400" />
                            Published Submissions
                        </h2>

                        <div className="space-y-4">
                            {submissions.map((article, i) => (
                                <motion.div key={article.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + (i * 0.05) }}>
                                    <Link href={`/articles/${article.id}`} className="block glass-card p-6 hover:border-gold-500/30 transition-all group">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                                    <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-full shadow-lg border border-orange-400/50">
                                                        SINTA 5
                                                    </span>
                                                    <span className="text-xs font-semibold text-gray-400 bg-white/5 px-2 py-1 rounded border border-white/10">
                                                        Vol. {article.issue?.volume?.volume_number}, No. {article.issue?.issue_number}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        {formatDate(article.published_at)}
                                                    </span>
                                                </div>

                                                <h3 className="text-xl font-semibold text-white group-hover:text-gold-400 transition-colors mb-3 leading-tight">{article.title}</h3>
                                                
                                                <div className="flex items-center gap-2 mb-3 flex-wrap">
                                                    {article.authors?.map(a => (
                                                        <div key={a.id} className={`flex items-center gap-1.5 rounded-full pr-3 border ${a.name === author.name ? 'bg-gold-500/10 border-gold-500/30' : 'bg-white/5 border-white/10'}`}>
                                                            <div className="w-6 h-6 rounded-full bg-navy-900 flex items-center justify-center text-[10px] font-bold text-white overflow-hidden">
                                                                {a.name.charAt(0)}
                                                            </div>
                                                            <span className={`text-xs font-medium ${a.name === author.name ? 'text-gold-400' : 'text-gray-300'}`}>
                                                                {a.name}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <p className="text-sm text-gray-500 line-clamp-2 mt-2">{truncate(article.abstract, 200)}</p>
                                            </div>
                                            <div className="text-right text-xs text-gray-500 flex-shrink-0">
                                                {article.doi && <p className="font-mono text-gold-500/60 mt-1">{article.doi}</p>}
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}

                            {submissions.length === 0 && (
                                <div className="text-center py-12 glass-card">
                                    <p className="text-gray-400">No published articles found for this author.</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </GuestLayout>
    );
}
