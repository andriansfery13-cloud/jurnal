import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { DocumentTextIcon, DocumentPlusIcon, ClockIcon, CheckCircleIcon, XCircleIcon, EyeIcon } from '@heroicons/react/24/outline';
import Badge from '@/Components/ui/Badge';
import { statusLabel, formatDate } from '@/lib/utils';

export default function AuthorDashboard({ stats, recentSubmissions }) {
    const statCards = [
        { label: 'Total Submissions', value: stats.total, icon: DocumentTextIcon, color: 'from-blue-400 to-blue-600' },
        { label: 'Under Review', value: stats.under_review, icon: ClockIcon, color: 'from-purple-400 to-purple-600' },
        { label: 'Accepted', value: stats.accepted, icon: CheckCircleIcon, color: 'from-emerald-400 to-emerald-600' },
        { label: 'Published', value: stats.published, icon: EyeIcon, color: 'from-gold-400 to-gold-600' },
    ];

    return (
        <AuthenticatedLayout title="Author Dashboard">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((card, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-6 hover:border-gold-500/30 transition-all duration-500">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color}`}>
                                <card.icon className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-3xl font-bold text-white">{card.value}</span>
                        </div>
                        <p className="text-sm text-gray-400">{card.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
                <Link href="/author/submissions/create" className="btn-primary">
                    <DocumentPlusIcon className="w-5 h-5" />
                    New Submission
                </Link>
            </div>

            {/* Recent Submissions Table */}
            <div className="glass-card overflow-hidden">
                <div className="p-6 border-b border-white/10">
                    <h3 className="text-lg font-semibold text-white">Recent Submissions</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="table-premium">
                        <thead>
                            <tr>
                                <th>Tracking Code</th>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Submitted</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentSubmissions?.map((sub) => (
                                <tr key={sub.id}>
                                    <td><span className="font-mono text-gold-400 text-xs">{sub.tracking_code}</span></td>
                                    <td><span className="text-white line-clamp-1 max-w-xs">{sub.title}</span></td>
                                    <td><Badge variant={sub.status}>{statusLabel(sub.status)}</Badge></td>
                                    <td>{formatDate(sub.submitted_at)}</td>
                                    <td><Link href={`/author/submissions/${sub.id}`} className="text-gold-400 hover:text-gold-300 text-sm">View →</Link></td>
                                </tr>
                            ))}
                            {(!recentSubmissions || recentSubmissions.length === 0) && (
                                <tr><td colSpan="5" className="text-center py-8 text-gray-500">No submissions yet. Start by creating a new one!</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
