import GuestLayout from '@/Layouts/GuestLayout';
import { motion } from 'framer-motion';
import { CheckBadgeIcon, XCircleIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { Link } from '@inertiajs/react';

export default function VerifyLoa({ isValid, message, loa }) {
    return (
        <GuestLayout title="Document Verification">
            <div className="pt-32 pb-20 min-h-screen">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-8 text-center">
                        {isValid ? (
                            <>
                                <CheckBadgeIcon className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
                                <h1 className="text-2xl font-bold text-white mb-2">Verified Document</h1>
                                <p className="text-emerald-400 font-medium mb-8">This Letter of Acceptance is authentic.</p>

                                <div className="text-left space-y-4 bg-white/5 rounded-xl p-6 border border-white/10 mb-8">
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider">Certificate Number</p>
                                        <p className="text-white font-mono">{loa.certificate_number}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider">Article Title</p>
                                        <p className="text-white font-medium">{loa.title}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider">Authors</p>
                                        <p className="text-gray-300">{loa.authors}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider">Date Issued</p>
                                            <p className="text-gray-300">{loa.date_issued}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider">Status</p>
                                            <p className="text-gray-300 capitalize">{loa.status}</p>
                                        </div>
                                    </div>
                                </div>

                                <a href={loa.pdf_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-gold-600 hover:bg-gold-500 text-white rounded-lg font-medium transition-colors">
                                    <DocumentArrowDownIcon className="w-5 h-5" /> Download Original PDF
                                </a>
                            </>
                        ) : (
                            <>
                                <XCircleIcon className="w-20 h-20 text-red-500 mx-auto mb-6" />
                                <h1 className="text-2xl font-bold text-white mb-2">Verification Failed</h1>
                                <p className="text-red-400 font-medium mb-8">{message}</p>
                                <Link href="/" className="text-gold-400 hover:text-gold-300 underline">Return to Homepage</Link>
                            </>
                        )}
                    </motion.div>
                </div>
            </div>
        </GuestLayout>
    );
}
