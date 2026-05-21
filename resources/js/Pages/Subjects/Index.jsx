import GuestLayout from '@/Layouts/GuestLayout';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { TagIcon, DocumentTextIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function SubjectIndex({ subjects }) {
    return (
        <GuestLayout title="Browse by Subject">
            <div className="pt-28 pb-20 min-h-screen bg-navy-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold-500/20 rounded-full blur-[100px] -z-10" />
                        <h1 className="text-4xl font-bold text-white mb-4">Browse by Subject</h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Explore our journal's publications organized by specific academic disciplines and research areas.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {subjects.map((subject, i) => (
                            <motion.div key={subject.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                                <Link 
                                    href={`/subjects/${subject.slug}`} 
                                    className="block glass-card p-8 h-full hover:border-gold-500/50 hover:bg-white/[0.03] transition-all group relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 -mr-4 -mt-4 text-white/5 group-hover:text-gold-500/10 transition-colors">
                                        <TagIcon className="w-32 h-32" />
                                    </div>
                                    
                                    <div className="relative z-10">
                                        <h3 className="text-2xl font-bold text-white group-hover:text-gold-400 transition-colors mb-3 flex items-center gap-2">
                                            {subject.name}
                                        </h3>
                                        
                                        <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                                            {subject.description || `Browse articles related to ${subject.name}.`}
                                        </p>
                                        
                                        <div className="flex items-center justify-between mt-auto">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-300">
                                                <DocumentTextIcon className="w-4 h-4 text-gold-400" />
                                                {subject.submissions_count} Published Articles
                                            </span>
                                            
                                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold-500/20 group-hover:text-gold-400 transition-colors">
                                                <ChevronRightIcon className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {subjects.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-gray-400">No subjects currently available.</p>
                        </div>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}
