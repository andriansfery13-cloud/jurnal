import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, router } from '@inertiajs/react';
import Badge from '@/Components/ui/Badge';
import { statusLabel, formatDate } from '@/lib/utils';
import { useState } from 'react';

export default function EditorSubmissionIndex({ submissions, filters }) {
    const [status, setStatus] = useState(filters?.status || '');

    const handleFilter = (e) => {
        setStatus(e.target.value);
        router.get('/editor/submissions', { status: e.target.value }, { preserveState: true });
    };

    return (
        <AuthenticatedLayout title="Manage Submissions">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">Submissions</h1>
                    <p className="text-gray-400 mt-1">Manage and track all article submissions</p>
                </div>
                <div>
                    <select value={status} onChange={handleFilter} className="input-premium py-2">
                        <option value="">All Statuses</option>
                        <option value="submitted">Submitted</option>
                        <option value="under_review">Under Review</option>
                        <option value="revision_required">Revision Required</option>
                        <option value="revised">Revised</option>
                        <option value="accepted">Accepted</option>
                        <option value="published">Published</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
            </div>

            <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table-premium">
                        <thead>
                            <tr>
                                <th>Tracking Code</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Status</th>
                                <th>Submitted</th>
                                <th>Reviews</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submissions?.data?.map((sub) => (
                                <tr key={sub.id}>
                                    <td><span className="font-mono text-gold-400 text-xs">{sub.tracking_code}</span></td>
                                    <td><span className="text-white line-clamp-1 max-w-sm">{sub.title}</span></td>
                                    <td><span className="text-sm text-gray-300">{sub.user?.name}</span></td>
                                    <td><Badge variant={sub.status}>{statusLabel(sub.status)}</Badge></td>
                                    <td className="text-sm">{formatDate(sub.created_at)}</td>
                                    <td className="text-sm">{sub.reviews?.length || 0}</td>
                                    <td><Link href={`/editor/submissions/${sub.id}`} className="text-gold-400 hover:text-gold-300 text-sm font-medium">Manage →</Link></td>
                                </tr>
                            ))}
                            {(!submissions?.data || submissions.data.length === 0) && (
                                <tr><td colSpan="7" className="text-center py-12 text-gray-500">No submissions found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Pagination placeholder if needed */}
            </div>
        </AuthenticatedLayout>
    );
}
