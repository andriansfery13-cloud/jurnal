import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { ArrowRightIcon, ClockIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export default function CallForPapers() {
    return (
        <section className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900" />
            <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `radial-gradient(circle, rgba(201,168,76,0.5) 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
            <div className="absolute right-0 top-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="glass-card p-8 md:p-12 lg:p-16 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-gold" />
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 mb-6">
                                <DocumentTextIcon className="w-4 h-4 text-gold-400" />
                                <span className="text-xs font-medium text-gold-400">Call for Papers</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                Submit Your <span className="text-gradient-gold">Research</span>
                            </h2>
                            <p className="text-gray-400 leading-relaxed mb-8">
                                We invite researchers, academics, and scholars to submit their original research manuscripts. Our rigorous peer-review process ensures the highest quality of published work.
                            </p>
                            <div className="space-y-4 mb-8">
                                {[
                                    { label: 'Online Submission System', desc: 'Easy manuscript upload & tracking' },
                                    { label: 'Peer Review Process', desc: 'Double-blind expert evaluation' },
                                    { label: 'DOI Registration', desc: 'Crossref DOI for every article' },
                                    { label: 'Fast Publication', desc: 'Rapid review & publication cycle' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-gold-400 text-xs">✓</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">{item.label}</p>
                                            <p className="text-xs text-gray-500">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/register" className="btn-primary">
                                    Submit Manuscript <ArrowRightIcon className="w-4 h-4" />
                                </Link>
                                <Link href="/page/author-guidelines" className="btn-secondary">
                                    Author Guidelines
                                </Link>
                            </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="hidden lg:block">
                            <div className="space-y-4">
                                {[
                                    { step: '01', title: 'Register & Login', desc: 'Create your author account' },
                                    { step: '02', title: 'Submit Manuscript', desc: 'Upload your paper with metadata' },
                                    { step: '03', title: 'Peer Review', desc: 'Expert evaluation process' },
                                    { step: '04', title: 'Revision', desc: 'Revise based on reviewer feedback' },
                                    { step: '05', title: 'Publication', desc: 'Article published with DOI' },
                                ].map((item, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-gold-500/20 transition-all group">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-500/20 to-gold-500/5 flex items-center justify-center text-gold-400 font-bold text-sm flex-shrink-0 group-hover:from-gold-500/30 transition-all">
                                            {item.step}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-white">{item.title}</p>
                                            <p className="text-xs text-gray-500">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
