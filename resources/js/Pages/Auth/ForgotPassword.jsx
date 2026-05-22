import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import Button from '@/Components/ui/Button';
import { motion } from 'framer-motion';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout title="Forgot Password">
            <div className="min-h-screen pt-28 pb-20 flex flex-col items-center justify-center relative z-10 px-4 sm:px-6 lg:px-8">
                
                {/* Background Decor */}
                <div className="absolute top-1/4 -left-64 w-96 h-96 bg-gold-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
                <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Forgot Password</h1>
                        <p className="text-gray-400">
                            Forgot your password? No problem. Just let us know your email address and we will email you a password reset link.
                        </p>
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

                            <Button type="submit" className="w-full justify-center py-3 text-base" loading={processing}>
                                Email Password Reset Link
                            </Button>

                            <p className="text-center text-sm text-gray-400 mt-6">
                                Remember your password? <Link href={route('login')} className="text-gold-400 hover:text-gold-300 font-medium transition-colors">Sign in</Link>
                            </p>
                        </form>
                    </div>
                </motion.div>
            </div>
        </GuestLayout>
    );
}
