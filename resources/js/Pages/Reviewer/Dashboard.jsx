import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Badge from '@/Components/ui/Badge';
import { statusLabel, formatDate } from '@/lib/utils';
import { ClockIcon, CheckCircleIcon, XCircleIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';

export default function ReviewerDashboard({ stats, assignments }) {
    const statCards = [
        { label: 'Pending', value: stats.pending, icon: ClockIcon, color: 'from-amber-400 to-amber-600' },
        { label: 'In Progress', value: stats.accepted, icon: ClipboardDocumentCheckIcon, color: 'from-blue-400 to-blue-600' },
        { label: 'Completed', value: stats.completed, icon: CheckCircleIcon, color: 'from-emerald-400 to-emerald-600' },
        { label: 'Declined', value: stats.declined, icon: XCircleIcon, color: 'from-red-400 to-red-600' },
    ];

    return (
        <AuthenticatedLayout title="Reviewer Dashboard">
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

            <div className="glass-card overflow-hidden">
                <div className="p-6 border-b border-white/10">
                    <h3 className="text-lg font-semibold text-white">Review Assignments</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="table-premium">
                        <thead><tr><th>Article</th><th>Type</th><th>Status</th><th>Deadline</th><th></th></tr></thead>
                        <tbody>
                            {assignments?.map((a) => (
                                <tr key={a.id}>
                                    <td><span className="text-white line-clamp-1 max-w-sm">{a.submission?.title}</span></td>
                                    <td><Badge variant="info">{a.review_type?.replace('_', ' ')}</Badge></td>
                                    <td><Badge variant={a.status === 'completed' ? 'success' : a.status === 'pending' ? 'warning' : 'info'}>{a.status}</Badge></td>
                                    <td className="text-sm">{formatDate(a.deadline)}</td>
                                    <td><Link href={`/reviewer/reviews/${a.id}`} className="text-gold-400 hover:text-gold-300 text-sm">{a.status === 'pending' ? 'Respond' : 'View'} →</Link></td>
                                </tr>
                            ))}
                            {(!assignments || assignments.length === 0) && (
                                <tr><td colSpan="5" className="text-center py-8 text-gray-500">No review assignments.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
