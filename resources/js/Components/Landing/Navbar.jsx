import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import {
    MagnifyingGlassIcon,
    Bars3Icon,
    XMarkIcon,
    SunIcon,
    MoonIcon,
    UserCircleIcon,
    ArrowRightOnRectangleIcon,
    ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { BookOpenIcon } from '@heroicons/react/24/solid';

export default function Navbar() {
    const { auth, journal } = usePage().props;
    const { isDark, toggle } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Browse', children: [
            { name: 'Archives (Issues)', href: '/archives' },
            { name: 'By Subject', href: '/subjects' },
            { name: 'Author Directory', href: '/authors' },
        ]},
        { name: 'About', children: [
            { name: 'Focus & Scope', href: '/page/focus-scope' },
            { name: 'Editorial Board', href: '/page/editorial-board' },
            { name: 'Author Guidelines', href: '/page/author-guidelines' },
            { name: 'Publication Ethics', href: '/page/publication-ethics' },
            { name: 'Peer Review Process', href: '/page/peer-review-process' },
        ]},
        { name: 'Submissions', href: '/author/submissions/create' },
        { name: 'Contact', href: '/page/contact' },
    ];

    const journalName = journal?.name || 'Indonesia Public Administration Journal';

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled 
                    ? 'bg-navy-950/90 backdrop-blur-xl border-b border-white/10 shadow-lg' 
                    : 'bg-transparent'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-glow-gold group-hover:scale-110 transition-transform duration-300">
                                <BookOpenIcon className="w-6 h-6 text-navy-950" />
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="text-lg font-bold text-white group-hover:text-gold-400 transition-colors">
                                    {journalName}
                                </h1>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                                    Scientific Journal
                                </p>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => (
                                link.children ? (
                                    <NavDropdown key={link.name} label={link.name} items={link.children} />
                                ) : (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-gold-400 rounded-lg hover:bg-white/5 transition-all duration-300"
                                    >
                                        {link.name}
                                    </Link>
                                )
                            ))}
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-2">
                            {/* Search Button */}
                            <button
                                onClick={() => setSearchOpen(true)}
                                className="p-2.5 rounded-xl text-gray-400 hover:text-gold-400 hover:bg-white/5 transition-all"
                            >
                                <MagnifyingGlassIcon className="w-5 h-5" />
                            </button>

                            {/* Theme Toggle */}
                            <button
                                onClick={toggle}
                                className="p-2.5 rounded-xl text-gray-400 hover:text-gold-400 hover:bg-white/5 transition-all"
                            >
                                {isDark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
                            </button>

                            {/* Auth */}
                            {auth?.user ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-gray-300 hover:text-gold-400 hover:bg-white/5 transition-all"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-navy-950 text-sm font-bold">
                                            {auth.user.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="hidden md:block text-sm font-medium">{auth.user.name}</span>
                                        <ChevronDownIcon className="w-4 h-4" />
                                    </button>

                                    <AnimatePresence>
                                        {userMenuOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="absolute right-0 mt-2 w-56 rounded-xl bg-navy-900 border border-white/10 shadow-xl overflow-hidden"
                                            >
                                                <div className="p-3 border-b border-white/10">
                                                    <p className="text-sm font-medium text-white">{auth.user.name}</p>
                                                    <p className="text-xs text-gray-500">{auth.user.email}</p>
                                                </div>
                                                <div className="p-1">
                                                    <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-gold-400 hover:bg-white/5 rounded-lg transition-all">
                                                        Dashboard
                                                    </Link>
                                                    <Link href="/profile" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-gold-400 hover:bg-white/5 rounded-lg transition-all">
                                                        Profile
                                                    </Link>
                                                    <Link
                                                        href="/logout"
                                                        method="post"
                                                        as="button"
                                                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                                    >
                                                        <ArrowRightOnRectangleIcon className="w-4 h-4" />
                                                        Logout
                                                    </Link>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <div className="hidden sm:flex items-center gap-2">
                                    <Link href="/login" className="btn-ghost text-sm">
                                        Sign In
                                    </Link>
                                    <Link href="/register" className="btn-primary text-sm !px-4 !py-2">
                                        Register
                                    </Link>
                                </div>
                            )}

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setMobileOpen(!mobileOpen)}
                                className="lg:hidden p-2.5 rounded-xl text-gray-400 hover:text-gold-400 hover:bg-white/5 transition-all"
                            >
                                {mobileOpen ? <XMarkIcon className="w-5 h-5" /> : <Bars3Icon className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="lg:hidden bg-navy-950/95 backdrop-blur-xl border-t border-white/10"
                        >
                            <div className="px-4 py-4 space-y-1">
                                {navLinks.map((link) => (
                                    link.children ? (
                                        <div key={link.name}>
                                            <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                {link.name}
                                            </p>
                                            {link.children.map((child) => (
                                                <Link
                                                    key={child.name}
                                                    href={child.href}
                                                    className="block px-3 py-2 pl-6 text-sm text-gray-300 hover:text-gold-400 rounded-lg hover:bg-white/5"
                                                    onClick={() => setMobileOpen(false)}
                                                >
                                                    {child.name}
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            className="block px-3 py-2 text-sm text-gray-300 hover:text-gold-400 rounded-lg hover:bg-white/5"
                                            onClick={() => setMobileOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    )
                                ))}
                                {!auth?.user && (
                                    <div className="pt-3 border-t border-white/10 space-y-2">
                                        <Link href="/login" className="block w-full text-center btn-ghost text-sm">Sign In</Link>
                                        <Link href="/register" className="block w-full text-center btn-primary text-sm">Register</Link>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Search Overlay */}
            <AnimatePresence>
                {searchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-navy-950/90 backdrop-blur-xl flex items-start justify-center pt-[20vh]"
                        onClick={() => setSearchOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            className="w-full max-w-2xl mx-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative">
                                <MagnifyingGlassIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search articles, authors, keywords..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                                    className="w-full pl-14 pr-14 py-5 bg-navy-900 border border-white/10 rounded-2xl text-white text-lg placeholder-gray-500 focus:outline-none focus:border-gold-500/50 focus:ring-2 focus:ring-gold-500/20"
                                />
                                <button
                                    onClick={() => setSearchOpen(false)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10"
                                >
                                    <XMarkIcon className="w-5 h-5" />
                                </button>
                            </div>
                            <p className="text-center text-sm text-gray-500 mt-4">
                                Press <kbd className="px-2 py-1 rounded bg-white/10 text-gray-400 text-xs">ESC</kbd> to close
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

function NavDropdown({ label, items }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-300 hover:text-gold-400 rounded-lg hover:bg-white/5 transition-all duration-300">
                {label}
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="absolute left-0 mt-1 w-56 rounded-xl bg-navy-900 border border-white/10 shadow-xl overflow-hidden p-1"
                    >
                        {items.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block px-3 py-2.5 text-sm text-gray-300 hover:text-gold-400 hover:bg-white/5 rounded-lg transition-all"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
