import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion } from 'framer-motion';
import { DocumentTextIcon, UserGroupIcon, ChartBarIcon, EyeIcon, ArrowDownTrayIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

export default function AdminDashboard() {
    const statCards = [
        { label: 'Total Articles', value: '156', icon: DocumentTextIcon, color: 'from-blue-400 to-blue-600' },
        { label: 'Total Users', value: '234', icon: UserGroupIcon, color: 'from-emerald-400 to-emerald-600' },
        { label: 'Total Views', value: '12.8K', icon: EyeIcon, color: 'from-purple-400 to-purple-600' },
        { label: 'Downloads', value: '5.4K', icon: ArrowDownTrayIcon, color: 'from-gold-400 to-gold-600' },
    ];

    return (
        <AuthenticatedLayout title="Admin Dashboard">
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

            <div className="glass-card p-8 text-center">
                <AcademicCapIcon className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Admin Panel</h3>
                <p className="text-gray-400">Full admin management features will be available here.</p>
            </div>
        </AuthenticatedLayout>
    );
}
