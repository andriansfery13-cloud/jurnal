import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import Button from '@/Components/ui/Button';
import { motion } from 'framer-motion';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout title="Log in">
            <div className="min-h-screen pt-28 pb-20 flex flex-col items-center justify-center relative z-10 px-4 sm:px-6 lg:px-8">
                
                {/* Background Decor */}
                <div className="absolute top-1/4 -left-64 w-96 h-96 bg-gold-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
                <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                        <p className="text-gray-400">Sign in to manage your submissions and reviews.</p>
                    </div>

                    <div className="glass-card p-8 md:p-10">
                        {status && <div className="mb-6 p-4 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20">{status}</div>}

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="input-premium w-full"
                                    autoComplete="username"
                                    autoFocus
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="Enter your email"
                                />
                                {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email}</p>}
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm font-medium text-gray-300">Password</label>
                                    {canResetPassword && (
                                        <Link href={route('password.request')} className="text-xs text-gold-400 hover:text-gold-300 transition-colors">
                                            Forgot password?
                                        </Link>
                                    )}
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="input-premium w-full"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Enter your password"
                                />
                                {errors.password && <p className="mt-2 text-sm text-red-400">{errors.password}</p>}
                            </div>

                            <div className="flex items-center">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative flex items-center justify-center">
                                        <input
                                            type="checkbox"
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                            className="peer sr-only"
                                        />
                                        <div className="w-5 h-5 rounded border border-white/20 bg-white/5 peer-checked:bg-gold-500 peer-checked:border-gold-500 transition-all flex items-center justify-center">
                                            <svg className="w-3 h-3 text-navy-950 opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Remember me</span>
                                </label>
                            </div>

                            <Button type="submit" className="w-full justify-center py-3 text-base" loading={processing}>
                                Sign In
                            </Button>

                            <p className="text-center text-sm text-gray-400 mt-6">
                                Don't have an account? <Link href={route('register')} className="text-gold-400 hover:text-gold-300 font-medium transition-colors">Register as Author</Link>
                            </p>
                        </form>
                    </div>
                </motion.div>
            </div>
        </GuestLayout>
    );
}
