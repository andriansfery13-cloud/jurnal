import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { formatDate, statusLabel } from '@/lib/utils';
import Badge from '@/Components/ui/Badge';
import Button from '@/Components/ui/Button';
import { DocumentTextIcon, CloudArrowUpIcon, CheckCircleIcon, ClockIcon, DocumentArrowDownIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function AuthorSubmissionShow({ submission }) {
    const { data, setData, post, processing, errors } = useForm({
        manuscript: null,
        revision_notes: '',
    });

    const handleRevisionSubmit = (e) => {
        e.preventDefault();
        post(`/author/submissions/${submission.id}/revise`, { forceFormData: true });
    };

    return (
        <AuthenticatedLayout title={`Submission: ${submission.tracking_code}`}>
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Main Content */}
                <div className="flex-1 space-y-6">
                    <div className="glass-card p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-white">{submission.title}</h2>
                            <Badge variant={submission.status}>{statusLabel(submission.status)}</Badge>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed mb-6">{submission.abstract}</p>
                        
                        <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                            <div>
                                <p className="text-xs text-gray-500 uppercase">Keywords</p>
                                <p className="text-sm text-white mt-1">{submission.keywords}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase">Submitted At</p>
                                <p className="text-sm text-white mt-1">{formatDate(submission.submitted_at)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Files */}
                    <div className="glass-card p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Files</h3>
                        <div className="space-y-3">
                            {submission.files?.map((file) => (
                                <div key={file.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                                    <div className="flex items-center gap-3">
                                        <DocumentTextIcon className="w-5 h-5 text-gold-400" />
                                        <div>
                                            <p className="text-sm font-medium text-white">{file.original_name}</p>
                                            <p className="text-xs text-gray-500">{file.type} (v{file.version}) • {(file.file_size / 1024 / 1024).toFixed(2)} MB</p>
                                        </div>
                                    </div>
                                    <a href={`/storage/${file.file_path}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                                        <DocumentArrowDownIcon className="w-5 h-5" />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Revision Form */}
                    {submission.status === 'revision_required' && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 border-gold-500/30">
                            <h3 className="text-lg font-semibold text-white mb-2">Submit Revision</h3>
                            <p className="text-sm text-gray-400 mb-6">Please upload your revised manuscript and provide notes on the changes made according to reviewer feedback.</p>
                            
                            <form onSubmit={handleRevisionSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Revised Manuscript (PDF/DOCX)</label>
                                    <input type="file" onChange={e => setData('manuscript', e.target.files[0])} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gold-500/10 file:text-gold-400 hover:file:bg-gold-500/20" />
                                    {errors.manuscript && <p className="mt-1 text-sm text-red-400">{errors.manuscript}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Response to Reviewers</label>
                                    <textarea value={data.revision_notes} onChange={e => setData('revision_notes', e.target.value)} rows="4" className="input-premium" placeholder="Detail the changes you've made..."></textarea>
                                    {errors.revision_notes && <p className="mt-1 text-sm text-red-400">{errors.revision_notes}</p>}
                                </div>
                                <div className="flex justify-end pt-2">
                                    <Button type="submit" loading={processing}>Submit Revision</Button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="lg:w-80 space-y-6">
                    {/* Letter of Acceptance */}
                    {submission.loa_certificate && (
                        <div className="glass-card p-6 border border-emerald-500/30">
                            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                                <CheckBadgeIcon className="w-5 h-5 text-emerald-400" /> Letter of Acceptance
                            </h3>
                            <p className="text-sm text-gray-400 mb-4">Your article has been accepted. You can download the official Letter of Acceptance below.</p>
                            <a href={`/storage/${submission.loa_certificate.pdf_path}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors">
                                <DocumentArrowDownIcon className="w-4 h-4" /> Download LOA PDF
                            </a>
                            <div className="mt-3 text-xs text-center text-gray-500">
                                Ref: {submission.loa_certificate.certificate_number}
                            </div>
                        </div>
                    )}

                    {/* Authors */}
                    <div className="glass-card p-6">
                        <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Authors</h3>
                        <div className="space-y-4">
                            {submission.authors?.map((author, i) => (
                                <div key={author.id} className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-sm font-bold text-gray-300">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">{author.name} {author.is_corresponding && <span className="text-[10px] text-gold-400">(Corresp.)</span>}</p>
                                        <p className="text-xs text-gray-500">{author.affiliation}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="glass-card p-6">
                        <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Timeline</h3>
                        <div className="relative pl-4 border-l border-white/10 space-y-6">
                            {submission.revision_histories?.map((history, i) => (
                                <div key={history.id} className="relative">
                                    <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-navy-950 border-2 border-gold-400" />
                                    <p className="text-sm font-medium text-white capitalize">{history.action.replace('_', ' ')}</p>
                                    <p className="text-xs text-gray-500 mt-1">{formatDate(history.created_at)}</p>
                                    {history.notes && <p className="text-sm text-gray-400 mt-2 p-3 bg-white/5 rounded-lg">{history.notes}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
