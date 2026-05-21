import { motion } from 'framer-motion';
import { useCountUp } from '@/hooks/useCountUp';
import {
    DocumentTextIcon,
    UserGroupIcon,
    ArrowDownTrayIcon,
    AcademicCapIcon,
    GlobeAltIcon,
    EyeIcon,
} from '@heroicons/react/24/outline';

export default function StatsSection({ stats }) {
    const statItems = [
        {
            icon: DocumentTextIcon,
            value: stats?.totalArticles || 156,
            label: 'Published Articles',
            suffix: '+',
            color: 'from-blue-400 to-blue-600',
        },
        {
            icon: UserGroupIcon,
            value: stats?.totalAuthors || 234,
            label: 'Contributing Authors',
            suffix: '+',
            color: 'from-emerald-400 to-emerald-600',
        },
        {
            icon: ArrowDownTrayIcon,
            value: stats?.totalDownloads || 5420,
            label: 'Total Downloads',
            suffix: '',
            format: true,
            color: 'from-purple-400 to-purple-600',
        },
        {
            icon: EyeIcon,
            value: stats?.totalViews || 12800,
            label: 'Total Views',
            suffix: '',
            format: true,
            color: 'from-gold-400 to-gold-600',
        },
        {
            icon: GlobeAltIcon,
            value: stats?.totalCitations || 89,
            label: 'Citations',
            suffix: '+',
            color: 'from-cyan-400 to-cyan-600',
        },
        {
            icon: AcademicCapIcon,
            value: stats?.sintaRank || 0,
            label: 'SINTA Rank',
            prefix: 'S',
            suffix: '',
            color: 'from-gold-400 to-gold-600',
        },
    ].filter(item => item.label !== 'SINTA Rank' || item.value > 0);

    return (
        <section className="relative py-24 bg-navy-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Journal <span className="text-gradient-gold">Statistics</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Our growing impact in the academic community
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {statItems.map((item, index) => (
                        <StatCard key={index} {...item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function StatCard({ icon: Icon, value, label, suffix = '', prefix = '', format = false, color, index }) {
    const { count, ref } = useCountUp(value, 2000);
    
    const displayValue = format 
        ? count.toLocaleString() 
        : `${prefix}${count}${suffix}`;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 text-center hover:border-gold-500/30 hover:shadow-glow-gold transition-all duration-500 group"
        >
            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-white mb-1">
                {displayValue}
            </p>
            <p className="text-xs text-gray-500 uppercase tracking-wider">
                {label}
            </p>
        </motion.div>
    );
}
