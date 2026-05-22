import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { useTheme } from '@/hooks/useTheme';
import {
    HomeIcon, DocumentTextIcon, ClipboardDocumentCheckIcon, UserGroupIcon,
    Cog6ToothIcon, ArrowRightOnRectangleIcon, Bars3Icon, XMarkIcon,
    SunIcon, MoonIcon, BellIcon, BookOpenIcon, ChartBarIcon,
    DocumentPlusIcon, MagnifyingGlassIcon, FolderOpenIcon,
} from '@heroicons/react/24/outline';
import { BookOpenIcon as BookOpenSolid } from '@heroicons/react/24/solid';

export default function AuthenticatedLayout({ children, title }) {
    const { auth, journal } = usePage().props;
    const { isDark, toggle } = useTheme();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const user = auth?.user;

    const getNavItems = () => {
        const role = user?.role || 'author';
        const items = {
            author: [
                { name: 'Dashboard', href: '/author/dashboard', icon: HomeIcon, routeCheck: 'author.dashboard' },
                { name: 'My Submissions', href: '/author/submissions', icon: DocumentTextIcon, routeCheck: 'author.submissions' },
                { name: 'New Submission', href: '/author/submissions/create', icon: DocumentPlusIcon, routeCheck: 'author.submissions.create' },
            ],
            reviewer: [
                { name: 'Dashboard', href: '/reviewer/dashboard', icon: HomeIcon, routeCheck: 'reviewer.dashboard' },
                { name: 'My Reviews', href: '/reviewer/dashboard', icon: ClipboardDocumentCheckIcon, routeCheck: 'reviewer.reviews' },
            ],
            editor: [
                { name: 'Dashboard', href: '/editor/dashboard', icon: HomeIcon, routeCheck: 'editor.dashboard' },
                { name: 'Submissions', href: '/editor/submissions', icon: DocumentTextIcon, routeCheck: 'editor.submissions' },
                { name: 'My Submissions', href: '/author/submissions', icon: FolderOpenIcon, routeCheck: 'author.submissions' },
            ],
            admin: [
                { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon, routeCheck: 'admin.dashboard' },
                { name: 'Submissions', href: '/editor/submissions', icon: DocumentTextIcon, routeCheck: 'editor.submissions' },
                { name: 'Subjects', href: '/admin/subjects', icon: FolderOpenIcon, routeCheck: 'admin.subjects' },
                { name: 'Users', href: '/admin/dashboard', icon: UserGroupIcon, routeCheck: 'admin.users' },
                { name: 'Settings', href: '/admin/settings', icon: Cog6ToothIcon, routeCheck: 'admin.settings' },
            ],
        };
        return items[role] || items.author;
    };

    const navItems = getNavItems();

    return (
        <div className="min-h-screen bg-navy-950">
            <Head title={title} />

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 bottom-0 w-72 bg-navy-900/95 backdrop-blur-xl border-r border-white/10 z-50 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b border-white/10">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-glow-gold">
                                <BookOpenSolid className="w-6 h-6 text-navy-950" />
                            </div>
                            <div>
                                <h1 className="text-base font-bold text-white">{journal?.name || 'Jurnal Ilmiah'}</h1>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Dashboard</p>
                            </div>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                        <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Menu</p>
                        {navItems.map((item) => {
                            const isActive = window.location.pathname.startsWith(item.href);
                            return (
                                <Link key={item.name} href={item.href} className={`sidebar-link ${isActive ? 'active' : ''}`}>
                                    <item.icon className="w-5 h-5" />
                                    <span className="text-sm font-medium">{item.name}</span>
                                </Link>
                            );
                        })}

                        <div className="pt-4 mt-4 border-t border-white/10">
                            <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Quick Links</p>
                            <Link href="/" className="sidebar-link">
                                <BookOpenIcon className="w-5 h-5" />
                                <span className="text-sm font-medium">View Journal</span>
                            </Link>
                            <Link href="/profile" className="sidebar-link">
                                <Cog6ToothIcon className="w-5 h-5" />
                                <span className="text-sm font-medium">Profile Settings</span>
                            </Link>
                        </div>
                    </nav>

                    {/* User Info */}
                    <div className="p-4 border-t border-white/10">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-navy-950 font-bold text-sm">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                            </div>
                        </div>
                        <Link href="/logout" method="post" as="button" className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                            <ArrowRightOnRectangleIcon className="w-4 h-4" />
                            Logout
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:pl-72">
                {/* Top Bar */}
                <header className="sticky top-0 z-30 bg-navy-950/90 backdrop-blur-xl border-b border-white/10">
                    <div className="flex items-center justify-between px-6 h-16">
                        <div className="flex items-center gap-4">
                            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg">
                                <Bars3Icon className="w-6 h-6" />
                            </button>
                            <h2 className="text-lg font-semibold text-white">{title}</h2>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={toggle} className="p-2.5 rounded-xl text-gray-400 hover:text-gold-400 hover:bg-white/5 transition-all">
                                {isDark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
                            </button>
                            <button className="p-2.5 rounded-xl text-gray-400 hover:text-gold-400 hover:bg-white/5 transition-all relative">
                                <BellIcon className="w-5 h-5" />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-gold-400" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
