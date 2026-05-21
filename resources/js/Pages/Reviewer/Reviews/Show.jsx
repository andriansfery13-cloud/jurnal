import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { formatDate } from '@/lib/utils';
import Badge from '@/Components/ui/Badge';
import Button from '@/Components/ui/Button';
import { DocumentTextIcon, CheckCircleIcon, XCircleIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';

export default function ReviewShow({ review }) {
    const { submission } = review;
    const isPending = review.status === 'pending';
    const isCompleted = review.status === 'completed';

    // Respond Form
    const { post: postRespond, processing: respondProcessing } = useForm({ response: '' });
    const handleRespond = (response) => {
        postRespond(`/reviewer/reviews/${review.id}/respond`, { data: { response } });
    };

    // Review Form
    const { data, setData, post: postReview, processing: reviewProcessing, errors } = useForm({
        recommendation: '',
        comments_to_author: '',
        comments_to_editor: '',
        score_originality: 5,
        score_methodology: 5,
        score_significance: 5,
        score_clarity: 5,
        score_references: 5,
    });

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        postReview(`/reviewer/reviews/${review.id}/submit`);
    };

    const ScoreInput = ({ label, field }) => (
        <div>
            <div className="flex justify-between items-end mb-2">
                <label className="text-sm text-gray-300">{label}</label>
                <span className="text-gold-400 font-bold">{data[field]}/10</span>
            </div>
            <input type="range" min="1" max="10" value={data[field]} onChange={e => setData(field, e.target.value)} className="w-full accent-gold-500" disabled={isCompleted} />
        </div>
    );

    return (
        <AuthenticatedLayout title="Review Assignment">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Article Info */}
                <div className="flex-1 space-y-6">
                    {isPending && (
                        <div className="glass-card p-6 border-l-4 border-l-amber-500 bg-amber-500/5">
                            <h3 className="text-lg font-semibold text-white mb-2">Review Invitation</h3>
                            <p className="text-gray-300 text-sm mb-4">You have been invited to review this manuscript. Please accept or decline by {formatDate(review.deadline)}.</p>
                            <div className="flex gap-3">
                                <Button onClick={() => handleRespond('accepted')} loading={respondProcessing} className="bg-emerald-600 hover:bg-emerald-500"><CheckCircleIcon className="w-4 h-4 mr-2" /> Accept</Button>
                                <Button onClick={() => handleRespond('declined')} loading={respondProcessing} variant="secondary" className="text-red-400 hover:text-red-300 border-red-500/30"><XCircleIcon className="w-4 h-4 mr-2" /> Decline</Button>
                            </div>
                        </div>
                    )}

                    <div className="glass-card p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-white">{submission.title}</h2>
                            <Badge variant="info">{review.review_type.replace('_', ' ')}</Badge>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed mb-6">{submission.abstract}</p>
                        
                        <h3 className="text-sm font-semibold text-white mb-3">Manuscript Files</h3>
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
                                    <a href={`/storage/${file.file_path}`} target="_blank" rel="noopener noreferrer" className="text-sm text-gold-400 hover:text-gold-300 font-medium flex items-center gap-1"><DocumentArrowDownIcon className="w-4 h-4"/> Download</a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Review Form Sidebar */}
                {review.status === 'accepted' && (
                    <div className="lg:w-[450px]">
                        <form onSubmit={handleReviewSubmit} className="glass-card p-6 sticky top-24">
                            <h3 className="text-xl font-bold text-white mb-6">Evaluation Form</h3>
                            
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-semibold text-gold-400 mb-4 border-b border-white/10 pb-2">Quantitative Scoring</h4>
                                    <div className="space-y-4">
                                        <ScoreInput label="Originality & Innovation" field="score_originality" />
                                        <ScoreInput label="Methodology" field="score_methodology" />
                                        <ScoreInput label="Significance & Impact" field="score_significance" />
                                        <ScoreInput label="Clarity & Presentation" field="score_clarity" />
                                        <ScoreInput label="References & Context" field="score_references" />
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-gold-400 mb-4 border-b border-white/10 pb-2">Qualitative Feedback</h4>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm text-gray-300 mb-1">Comments to Author *</label>
                                            <textarea value={data.comments_to_author} onChange={e => setData('comments_to_author', e.target.value)} rows="5" className="input-premium" required placeholder="Constructive feedback for the author..."></textarea>
                                            {errors.comments_to_author && <p className="text-red-400 text-xs mt-1">{errors.comments_to_author}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-300 mb-1">Comments to Editor (Confidential)</label>
                                            <textarea value={data.comments_to_editor} onChange={e => setData('comments_to_editor', e.target.value)} rows="3" className="input-premium" placeholder="Private notes for the editorial team..."></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-gold-400 mb-4 border-b border-white/10 pb-2">Final Recommendation</h4>
                                    <select value={data.recommendation} onChange={e => setData('recommendation', e.target.value)} className="input-premium" required>
                                        <option value="">-- Select Recommendation --</option>
                                        <option value="accept">Accept Submission</option>
                                        <option value="minor_revision">Minor Revision Required</option>
                                        <option value="major_revision">Major Revision Required</option>
                                        <option value="reject">Reject Submission</option>
                                    </select>
                                    {errors.recommendation && <p className="text-red-400 text-xs mt-1">{errors.recommendation}</p>}
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/10">
                                <Button type="submit" loading={reviewProcessing} className="w-full justify-center">Submit Review</Button>
                                <p className="text-xs text-center text-gray-500 mt-3">Once submitted, this review cannot be changed.</p>
                            </div>
                        </form>
                    </div>
                )}

                {isCompleted && (
                    <div className="lg:w-[450px]">
                        <div className="glass-card p-6 border-t-4 border-t-emerald-500">
                            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2"><CheckCircleIcon className="w-5 h-5 text-emerald-500"/> Review Completed</h3>
                            <p className="text-sm text-gray-400 mb-4">Submitted on {formatDate(review.completed_at)}</p>
                            
                            <div className="space-y-3">
                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                    <span className="text-sm text-gray-400">Recommendation</span>
                                    <span className="text-sm font-bold text-white capitalize">{review.recommendation.replace('_', ' ')}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                    <span className="text-sm text-gray-400">Overall Score</span>
                                    <span className="text-sm font-bold text-gold-400">{review.overall_score}/10</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
