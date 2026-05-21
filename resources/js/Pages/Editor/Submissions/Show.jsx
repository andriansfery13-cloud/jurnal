import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { formatDate, statusLabel } from '@/lib/utils';
import Badge from '@/Components/ui/Badge';
import Button from '@/Components/ui/Button';
import Input from '@/Components/ui/Input';
import { DocumentTextIcon, UserPlusIcon, CheckCircleIcon, XCircleIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

export default function EditorSubmissionShow({ submission, reviewers, issues }) {
    // Assign Reviewer Form
    const { data: assignData, setData: setAssignData, post: postAssign, processing: assignProcessing, reset: resetAssign } = useForm({
        reviewer_id: '',
        review_type: 'double_blind',
        deadline: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 28 days from now
    });

    const handleAssign = (e) => {
        e.preventDefault();
        postAssign(`/editor/submissions/${submission.id}/assign-reviewer`, { onSuccess: () => resetAssign() });
    };

    // Update Status Form
    const { data: statusData, setData: setStatusData, post: postStatus, processing: statusProcessing } = useForm({
        status: '',
        editor_notes: '',
        issue_id: '',
    });

    const handleStatusUpdate = (e) => {
        e.preventDefault();
        postStatus(`/editor/submissions/${submission.id}/update-status`);
    };

    // Publish Form
    const { data: publishData, setData: setPublishData, post: postPublish, processing: publishProcessing } = useForm({
        issue_id: submission.issue_id || '',
        page_start: submission.page_start || '',
        page_end: submission.page_end || '',
        doi: submission.doi || '',
    });

    const handlePublish = (e) => {
        e.preventDefault();
        postPublish(`/editor/submissions/${submission.id}/publish`);
    };

    return (
        <AuthenticatedLayout title={`Manage: ${submission.tracking_code}`}>
            <div className="flex flex-col xl:flex-row gap-6">
                {/* Left Column */}
                <div className="flex-1 space-y-6">
                    {/* Article Details */}
                    <div className="glass-card p-6">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-white mb-2">{submission.title}</h2>
                                <p className="text-sm text-gray-400">By {submission.user?.name} on {formatDate(submission.submitted_at)}</p>
                            </div>
                            <Badge variant={submission.status}>{statusLabel(submission.status)}</Badge>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10 mb-6">
                            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-2">Abstract</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">{submission.abstract}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">Files</h3>
                            <div className="space-y-2">
                                {submission.files?.map((file) => (
                                    <div key={file.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                                        <div className="flex items-center gap-3">
                                            <DocumentTextIcon className="w-5 h-5 text-gold-400" />
                                            <div>
                                                <p className="text-sm font-medium text-white">{file.original_name}</p>
                                                <p className="text-xs text-gray-500">{file.type} (v{file.version})</p>
                                            </div>
                                        </div>
                                        <a href={`/storage/${file.file_path}`} target="_blank" rel="noopener noreferrer" className="text-sm text-gold-400 hover:text-gold-300 font-medium">Download</a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Reviewers Section */}
                    <div className="glass-card p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Peer Review</h3>
                        
                        {/* Current Reviewers */}
                        {submission.reviews?.length > 0 ? (
                            <div className="space-y-4 mb-8">
                                {submission.reviews.map((review) => (
                                    <div key={review.id} className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <div className="flex items-center justify-between mb-3">
                                            <div>
                                                <p className="text-sm font-medium text-white">{review.reviewer?.name}</p>
                                                <p className="text-xs text-gray-500">Deadline: {formatDate(review.deadline)}</p>
                                            </div>
                                            <Badge variant={review.status === 'completed' ? 'success' : 'warning'}>{review.status}</Badge>
                                        </div>
                                        {review.status === 'completed' && (
                                            <div className="mt-3 pt-3 border-t border-white/10">
                                                <p className="text-sm font-medium text-white mb-1">Recommendation: <span className="text-gold-400 capitalize">{review.recommendation.replace('_', ' ')}</span></p>
                                                <p className="text-sm text-gray-400"><span className="text-gray-500">Score:</span> {review.overall_score}/10</p>
                                                <div className="mt-2 text-sm text-gray-300">
                                                    <p className="font-medium text-gray-400 text-xs">Comments to Editor:</p>
                                                    <p className="mt-1">{review.comments_to_editor || 'None'}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 mb-6">No reviewers assigned yet.</p>
                        )}

                        {/* Assign Form */}
                        {['submitted', 'under_review', 'revised'].includes(submission.status) && (
                            <div className="p-5 rounded-xl border border-dashed border-gold-500/30">
                                <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2"><UserPlusIcon className="w-4 h-4 text-gold-400" /> Assign New Reviewer</h4>
                                <form onSubmit={handleAssign} className="grid sm:grid-cols-2 gap-4">
                                    <div className="sm:col-span-2">
                                        <label className="block text-xs text-gray-400 mb-1">Select Reviewer</label>
                                        <select value={assignData.reviewer_id} onChange={e => setAssignData('reviewer_id', e.target.value)} className="input-premium" required>
                                            <option value="">-- Choose Reviewer --</option>
                                            {reviewers.map(r => (
                                                <option key={r.id} value={r.id}>{r.name} ({r.email})</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1">Review Type</label>
                                        <select value={assignData.review_type} onChange={e => setAssignData('review_type', e.target.value)} className="input-premium">
                                            <option value="single_blind">Single Blind</option>
                                            <option value="double_blind">Double Blind</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1">Deadline</label>
                                        <input type="date" value={assignData.deadline} onChange={e => setAssignData('deadline', e.target.value)} className="input-premium" required />
                                    </div>
                                    <div className="sm:col-span-2 flex justify-end mt-2">
                                        <Button type="submit" loading={assignProcessing}>Assign Reviewer</Button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Actions */}
                <div className="xl:w-96 space-y-6">
                    {/* Editorial Decision */}
                    <div className="glass-card p-6 border-t-4 border-t-blue-500">
                        <h3 className="text-lg font-semibold text-white mb-4">Editorial Decision</h3>
                        <form onSubmit={handleStatusUpdate} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Change Status To</label>
                                <select value={statusData.status} onChange={e => setStatusData('status', e.target.value)} className="input-premium" required>
                                    <option value="">-- Select Decision --</option>
                                    <option value="revision_required">Require Revision</option>
                                    <option value="accepted">Accept Submission</option>
                                    <option value="rejected">Reject Submission</option>
                                </select>
                            </div>
                            
                            {statusData.status === 'accepted' && (
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Assign to Issue (Optional)</label>
                                    <select value={statusData.issue_id} onChange={e => setStatusData('issue_id', e.target.value)} className="input-premium">
                                        <option value="">-- Select Issue --</option>
                                        {issues.map(i => (
                                            <option key={i.id} value={i.id}>Vol {i.volume.volume_number} No {i.issue_number} ({i.title})</option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Editor Notes (Sent to Author)</label>
                                <textarea value={statusData.editor_notes} onChange={e => setStatusData('editor_notes', e.target.value)} rows="4" className="input-premium" placeholder="Explain the decision..." required></textarea>
                            </div>
                            <Button type="submit" loading={statusProcessing} className="w-full justify-center">Record Decision</Button>
                        </form>
                    </div>

                    {/* Publish Article */}
                    {submission.status === 'accepted' && (
                        <div className="glass-card p-6 border-t-4 border-t-gold-500">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><CheckCircleIcon className="w-5 h-5 text-gold-400" /> Publish Article</h3>
                            <form onSubmit={handlePublish} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Target Issue *</label>
                                    <select value={publishData.issue_id} onChange={e => setPublishData('issue_id', e.target.value)} className="input-premium" required>
                                        <option value="">-- Select Issue --</option>
                                        {issues.map(i => (
                                            <option key={i.id} value={i.id}>Vol {i.volume.volume_number} No {i.issue_number} ({i.title})</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <Input label="Page Start" type="number" value={publishData.page_start} onChange={e => setPublishData('page_start', e.target.value)} />
                                    <Input label="Page End" type="number" value={publishData.page_end} onChange={e => setPublishData('page_end', e.target.value)} />
                                </div>
                                <Input label="DOI (Optional)" value={publishData.doi} onChange={e => setPublishData('doi', e.target.value)} placeholder="10.12345/jist.v1i1.1" />
                                <Button type="submit" loading={publishProcessing} className="w-full justify-center bg-gold-600 hover:bg-gold-500 text-white">Publish Now</Button>
                            </form>
                        </div>
                    )}

                    {/* Quick Actions */}
                    <div className="glass-card p-6">
                        <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">Quick Actions</h3>
                        <div className="space-y-2">
                            <button className="w-full text-left px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-gray-300 transition-colors flex items-center gap-2">
                                <EnvelopeIcon className="w-4 h-4" /> Email Author
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
