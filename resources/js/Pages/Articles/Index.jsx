import { useState } from 'react';
import { router } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Link } from '@inertiajs/react';
import { MagnifyingGlassIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { formatDate, truncate } from '@/lib/utils';
import { useDebounce } from '@/hooks/useDebounce';

export default function ArticleIndex({ articles, filters }) {
    const [search, setSearch] = useState(filters?.search || '');

    const handleSearch = (value) => {
        setSearch(value);
        router.get('/articles', { search: value }, { preserveState: true, replace: true });
    };

    return (
        <GuestLayout title="Articles">
            <div className="pt-28 pb-20 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-white mb-4">Published <span className="text-gradient-gold">Articles</span></h1>
                        <p className="text-gray-400 max-w-2xl mx-auto mb-8">Browse our collection of peer-reviewed research articles</p>
                        <div className="max-w-xl mx-auto relative">
                            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input type="text" value={search} onChange={e => handleSearch(e.target.value)} placeholder="Search articles, keywords, authors..." className="input-premium pl-12 text-base" />
                        </div>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {articles?.data?.map((article, i) => (
                            <motion.div key={article.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                                <Link href={`/articles/${article.id}`} className="block glass-card p-6 h-full hover:border-gold-500/30 hover:shadow-glow-gold transition-all duration-500 group">
                                    {article.keywords && (
                                        <div className="flex flex-wrap gap-1.5 mb-3">
                                            {article.keywords.split(',').slice(0, 3).map((kw, j) => (
                                                <span key={j} className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-gray-400">{kw.trim()}</span>
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

                    {articles?.data?.length === 0 && (
                        <div className="text-center py-16">
                            <BookOpenIcon className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                            <p className="text-gray-500">No articles found.</p>
                        </div>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}
