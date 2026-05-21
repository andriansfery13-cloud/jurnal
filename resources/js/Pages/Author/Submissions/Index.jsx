import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import Badge from '@/Components/ui/Badge';
import { statusLabel, formatDate } from '@/lib/utils';
import { DocumentPlusIcon } from '@heroicons/react/24/outline';

export default function SubmissionIndex({ submissions }) {
    return (
        <AuthenticatedLayout title="My Submissions">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">My Submissions</h1>
                    <p className="text-gray-400 mt-1">Track and manage your article submissions</p>
                </div>
                <Link href="/author/submissions/create" className="btn-primary">
                    <DocumentPlusIcon className="w-5 h-5" />
                    New Submission
                </Link>
            </div>

            <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table-premium">
                        <thead>
                            <tr>
                                <th>Tracking Code</th>
                                <th>Title</th>
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
                                    <td><Badge variant={sub.status}>{statusLabel(sub.status)}</Badge></td>
                                    <td className="text-sm">{formatDate(sub.submitted_at)}</td>
                                    <td className="text-sm">{sub.reviews_count || 0}</td>
                                    <td><Link href={`/author/submissions/${sub.id}`} className="text-gold-400 hover:text-gold-300 text-sm font-medium">View →</Link></td>
                                </tr>
                            ))}
                            {(!submissions?.data || submissions.data.length === 0) && (
                                <tr><td colSpan="6" className="text-center py-12 text-gray-500">No submissions found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
