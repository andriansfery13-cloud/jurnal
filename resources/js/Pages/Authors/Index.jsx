import GuestLayout from '@/Layouts/GuestLayout';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    CheckCircleIcon, MapPinIcon, UserIcon, TagIcon,
    MagnifyingGlassIcon, ChartBarIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolid } from '@heroicons/react/24/solid';

export default function AuthorIndex({ authors }) {
    return (
        <GuestLayout title="Author Directory">
            <div className="pt-28 pb-20 min-h-screen bg-navy-950">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Header & Controls */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                        <h1 className="text-3xl font-bold text-white mb-6">Authors</h1>
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <span className="text-sm text-gray-400">Sort by</span>
                                <select className="bg-navy-900 border border-white/10 text-white text-sm rounded-lg focus:ring-gold-500 focus:border-gold-500 block p-2.5 min-w-[200px]">
                                    <option>Sinta Score 3Yr</option>
                                    <option>Sinta Score Overall</option>
                                    <option>Scopus H-index</option>
                                </select>
                            </div>
                            <div className="relative w-full md:w-96">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
                                </div>
                                <input type="text" className="bg-navy-900 border border-white/10 text-white text-sm rounded-lg focus:ring-gold-500 focus:border-gold-500 block w-full pl-10 p-2.5 placeholder-gray-500" placeholder="Search Authors..." />
                            </div>
                        </div>
                    </motion.div>

                    {/* Author List */}
                    <div className="space-y-6">
                        {authors.data.map((author, i) => (
                            <motion.div 
                                key={author.id} 
                                initial={{ opacity: 0, y: 20 }} 
                                animate={{ opacity: 1, y: 0 }} 
                                transition={{ delay: i * 0.05 }}
                                className="glass-card overflow-hidden hover:border-gold-500/30 transition-all group"
                            >
                                <div className="flex flex-col md:flex-row">
                                    {/* Left Section (Profile & Scores) */}
                                    <div className="md:w-[45%] lg:w-[40%] p-6 bg-navy-900/50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/5">
                                        <div className="flex gap-4 items-start">
                                            <div className="w-24 h-28 flex-shrink-0 rounded-lg overflow-hidden border border-white/10">
                                                <img src={author.avatar_url} alt={author.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <Link href={`/authors/${author.id}`} className="text-lg font-bold text-teal-400 hover:text-teal-300 uppercase flex items-center gap-2 mb-2 transition-colors">
                                                    {author.name}
                                                    <CheckCircleSolid className="w-5 h-5 text-emerald-500" />
                                                </Link>
                                                
                                                <div className="space-y-1.5 text-sm text-gray-400">
                                                    <div className="flex items-center gap-2">
                                                        <MapPinIcon className="w-4 h-4 text-gray-500" />
                                                        <span className="text-blue-400/80 hover:text-blue-400 cursor-pointer">{author.affiliation || 'Unknown Affiliation'}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <UserIcon className="w-4 h-4 text-gray-500" />
                                                        <span>{author.department || 'General Department'}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs">
                                                        <UserIcon className="w-4 h-4 text-gray-500" />
                                                        <span>SINTA ID : {author.sinta_id || 'N/A'}</span>
                                                        <div className="w-4 h-3 bg-red-600 rounded-sm overflow-hidden flex flex-col ml-1">
                                                            <div className="h-1/2 w-full bg-red-600"></div>
                                                            <div className="h-1/2 w-full bg-white"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center mt-6 pt-6 border-t border-white/5 px-2">
                                            <div className="text-center">
                                                <p className="text-2xl font-bold text-white">{author.sinta_score_3yr || '0.00'}</p>
                                                <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">SINTA Score 3Yr</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-2xl font-bold text-white">{author.sinta_score_overall || '0.00'}</p>
                                                <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">SINTA Score Overall</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Section (Subjects & Metrics) */}
                                    <div className="flex-1 p-6 md:p-8 bg-navy-900/30">
                                        <div className="mb-6">
                                            <div className="flex items-center gap-2 mb-3 text-gray-300 font-medium">
                                                <TagIcon className="w-5 h-5" />
                                                <span>Subjects :</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {author.subjects ? author.subjects.map((sub, idx) => (
                                                    <span key={idx} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">
                                                        {sub}
                                                    </span>
                                                )) : (
                                                    <span className="text-sm text-gray-500 italic">No subjects available</span>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-2 mb-4 text-gray-300 font-medium">
                                                <ChartBarIcon className="w-5 h-5" />
                                                <span>Metrics</span>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex items-center text-sm">
                                                    <span className="w-40 text-gray-400">Scopus H-index</span>
                                                    <span className="text-gray-500 mr-4">:</span>
                                                    <span className="text-white font-medium">{author.scopus_h_index || 0}</span>
                                                </div>
                                                <div className="flex items-center text-sm">
                                                    <span className="w-40 text-gray-400">Google Scholar H-index</span>
                                                    <span className="text-gray-500 mr-4">:</span>
                                                    <span className="text-white font-medium">{author.scholar_h_index || 0}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {authors.data.length === 0 && (
                            <div className="text-center py-12 glass-card">
                                <p className="text-gray-400">No authors found.</p>
                            </div>
                        )}
                    </div>
                    
                </div>
            </div>
        </GuestLayout>
    );
}
