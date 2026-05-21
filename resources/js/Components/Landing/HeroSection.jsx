import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { ArrowRightIcon, BookOpenIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { SparklesIcon } from '@heroicons/react/24/solid';

export default function HeroSection({ journal, stats }) {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-hero" />
            
            {/* Animated grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(201,168,76,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.3) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />
            
            {/* Floating orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-navy-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
            <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gold-400/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div>
                        {/* SINTA Badge */}
                        {stats?.sintaRank > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 mb-8"
                            >
                                <SparklesIcon className="w-4 h-4 text-gold-400" />
                                <span className="text-sm font-medium text-gold-400">SINTA {stats.sintaRank} Accredited</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            </motion.div>
                        )}

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
                        >
                            <span className="text-white">Advancing</span>
                            <br />
                            <span className="text-gradient-gold">Scientific</span>
                            <br />
                            <span className="text-white">Knowledge</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg text-gray-400 leading-relaxed mb-10 max-w-lg"
                        >
                            {journal?.description || 'A peer-reviewed scientific journal committed to publishing high-quality research across multiple disciplines. Indexed in major databases and accredited by SINTA.'}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-wrap items-center gap-4"
                        >
                            <Link href="/register" className="btn-primary text-base">
                                <DocumentTextIcon className="w-5 h-5" />
                                Submit Article
                            </Link>
                            <Link href="/archives" className="btn-secondary text-base">
                                Browse Articles
                                <ArrowRightIcon className="w-4 h-4" />
                            </Link>
                        </motion.div>

                        {/* Quick Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex items-center gap-8 mt-12 pt-8 border-t border-white/10"
                        >
                            {[
                                { value: stats?.totalArticles || '150+', label: 'Articles' },
                                { value: stats?.totalAuthors || '200+', label: 'Authors' },
                                { value: stats?.totalDownloads || '5K+', label: 'Downloads' },
                            ].map((stat, i) => (
                                <div key={i}>
                                    <p className="text-2xl font-bold text-gold-400">{stat.value}</p>
                                    <p className="text-sm text-gray-500">{stat.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right — Journal Mockup */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="hidden lg:flex justify-center"
                    >
                        <div className="relative">
                            {/* Glow behind */}
                            <div className="absolute inset-0 bg-gradient-to-r from-gold-500/20 to-navy-500/20 rounded-3xl blur-3xl scale-110" />
                            
                            {/* Journal Cover Card */}
                            <div className="relative w-80 h-[420px] rounded-2xl bg-gradient-to-br from-navy-800 to-navy-900 border border-white/10 shadow-2xl overflow-hidden">
                                {/* Top Gold Bar */}
                                <div className="h-2 bg-gradient-gold" />
                                
                                <div className="p-8 flex flex-col items-center justify-center h-full text-center">
                                    {/* Journal Icon */}
                                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center mb-6 shadow-glow-gold">
                                        <BookOpenIcon className="w-10 h-10 text-navy-950" />
                                    </div>
                                    
                                    <h3 className="text-xl font-bold text-white mb-2">
                                        {journal?.name || 'Jurnal Ilmiah'}
                                    </h3>
                                    
                                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">
                                        Scientific Journal
                                    </p>
                                    
                                    <div className="w-16 h-px bg-gradient-gold mb-4" />
                                    
                                    <p className="text-sm text-gray-400 mb-6">
                                        Current Issue
                                    </p>
                                    
                                    {journal?.e_issn && (
                                        <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                                            <p className="text-xs text-gray-500">e-ISSN</p>
                                            <p className="text-sm font-mono text-gold-400">{journal.e_issn}</p>
                                        </div>
                                    )}
                                    
                                    {/* SINTA Badge */}
                                    {stats?.sintaRank > 0 && (
                                        <div className="mt-6 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                            <span className="text-xs font-bold text-emerald-400">✓ SINTA {stats.sintaRank} Accredited</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Floating Cards */}
                            <motion.div
                                animate={{ y: [-5, 5, -5] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute -right-12 top-16 px-4 py-3 rounded-xl bg-navy-900/90 backdrop-blur border border-white/10 shadow-xl"
                            >
                                <p className="text-xs text-gray-400">DOI Registered</p>
                                <p className="text-sm font-bold text-gold-400">Crossref ✓</p>
                            </motion.div>

                            <motion.div
                                animate={{ y: [5, -5, 5] }}
                                transition={{ duration: 5, repeat: Infinity }}
                                className="absolute -left-12 bottom-24 px-4 py-3 rounded-xl bg-navy-900/90 backdrop-blur border border-white/10 shadow-xl"
                            >
                                <p className="text-xs text-gray-400">Peer Reviewed</p>
                                <p className="text-sm font-bold text-emerald-400">Double Blind ✓</p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#0A1628"/>
                </svg>
            </div>
        </section>
    );
}
