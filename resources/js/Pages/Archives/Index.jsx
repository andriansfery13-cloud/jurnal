import GuestLayout from '@/Layouts/GuestLayout';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { FolderOpenIcon, CalendarIcon } from '@heroicons/react/24/outline';

export default function ArchiveIndex({ volumes }) {
    return (
        <GuestLayout title="Archives">
            <div className="pt-28 pb-20 min-h-screen">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-white mb-4">Journal <span className="text-gradient-gold">Archives</span></h1>
                        <p className="text-gray-400">Browse past volumes and issues</p>
                    </motion.div>
                    <div className="space-y-6">
                        {volumes?.map((volume, i) => (
                            <motion.div key={volume.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-6">
                                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                    <FolderOpenIcon className="w-6 h-6 text-gold-400" />
                                    Volume {volume.volume_number} ({volume.year})
                                </h2>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {volume.issues?.map((issue) => (
                                        <Link key={issue.id} href={`/archives/${issue.id}`} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-gold-500/30 hover:bg-gold-500/5 transition-all group">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-medium text-white group-hover:text-gold-400 transition-colors">
                                                        No. {issue.issue_number}
                                                    </p>
                                                    {issue.title && <p className="text-xs text-gray-500">{issue.title}</p>}
                                                </div>
                                                {issue.is_current && <span className="px-2 py-0.5 rounded-full bg-gold-500/20 text-[10px] text-gold-400 font-semibold">Current</span>}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                        {(!volumes || volumes.length === 0) && (
                            <div className="text-center py-16">
                                <FolderOpenIcon className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                                <p className="text-gray-500">No archives available yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
