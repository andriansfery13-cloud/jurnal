import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Badge from '@/Components/ui/Badge';
import { statusLabel, formatDate } from '@/lib/utils';
import { DocumentTextIcon, UserGroupIcon, ClockIcon, CheckCircleIcon, ChartBarIcon, EyeIcon } from '@heroicons/react/24/outline';

export default function EditorDashboard({ stats, recentSubmissions }) {
    const statCards = [
        { label: 'Total Submissions', value: stats.total_submissions, icon: DocumentTextIcon, color: 'from-blue-400 to-blue-600' },
        { label: 'Pending Review', value: stats.pending_review, icon: ClockIcon, color: 'from-amber-400 to-amber-600' },
        { label: 'Under Review', value: stats.under_review, icon: EyeIcon, color: 'from-purple-400 to-purple-600' },
        { label: 'Accepted', value: stats.accepted, icon: CheckCircleIcon, color: 'from-emerald-400 to-emerald-600' },
        { label: 'Published', value: stats.published, icon: ChartBarIcon, color: 'from-gold-400 to-gold-600' },
        { label: 'Active Reviewers', value: stats.active_reviewers, icon: UserGroupIcon, color: 'from-cyan-400 to-cyan-600' },
    ];

    return (
        <AuthenticatedLayout title="Editor Dashboard">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
                {statCards.map((card, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card p-5 hover:border-gold-500/30 transition-all duration-500">
                        <div className={`p-2.5 rounded-lg bg-gradient-to-br ${card.color} w-fit mb-3`}>
                            <card.icon className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-2xl font-bold text-white">{card.value}</p>
                        <p className="text-xs text-gray-500 mt-1">{card.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Pending Submissions */}
            <div className="glass-card overflow-hidden">
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">Pending Submissions</h3>
                    <Link href="/editor/submissions" className="text-sm text-gold-400 hover:text-gold-300">View All →</Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="table-premium">
                        <thead>
                            <tr><th>Code</th><th>Title</th><th>Author</th><th>Status</th><th>Reviewers</th><th>Date</th><th></th></tr>
                        </thead>
                        <tbody>
                            {recentSubmissions?.map((sub) => (
                                <tr key={sub.id}>
                                    <td><span className="font-mono text-gold-400 text-xs">{sub.tracking_code}</span></td>
                                    <td><span className="text-white line-clamp-1 max-w-xs">{sub.title}</span></td>
                                    <td className="text-sm">{sub.user?.name}</td>
                                    <td><Badge variant={sub.status}>{statusLabel(sub.status)}</Badge></td>
                                    <td className="text-sm">{sub.reviews?.length || 0}</td>
                                    <td className="text-sm">{formatDate(sub.submitted_at || sub.created_at)}</td>
                                    <td><Link href={`/editor/submissions/${sub.id}`} className="text-gold-400 hover:text-gold-300 text-sm">Manage →</Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
