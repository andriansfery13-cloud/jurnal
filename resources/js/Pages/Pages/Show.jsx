import GuestLayout from '@/Layouts/GuestLayout';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';

export default function StaticPageShow({ page }) {
    return (
        <GuestLayout title={page.title}>
            <div className="pt-28 pb-20 min-h-screen">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                            <Link href="/" className="hover:text-gold-400">Home</Link>
                            <span>/</span>
                            <span className="text-gray-400">{page.title}</span>
                        </div>
                        <div className="glass-card p-8 md:p-12">
                            <div className="prose prose-invert prose-gold max-w-none" dangerouslySetInnerHTML={{ __html: page.content }} />
                        </div>
                    </motion.div>
                </div>
            </div>

            <style>{`
                .prose-gold h2 { color: #E8C547; border-bottom: 1px solid rgba(201,168,76,0.2); padding-bottom: 0.5rem; margin-top: 2rem; }
                .prose-gold h3 { color: #C9A84C; }
                .prose-gold a { color: #E8C547; }
                .prose-gold strong { color: #fff; }
                .prose-gold ul, .prose-gold ol { color: #9CA3AF; }
                .prose-gold p { color: #9CA3AF; line-height: 1.8; }
                .prose-gold li { margin-bottom: 0.5rem; }
            `}</style>
        </GuestLayout>
    );
}
