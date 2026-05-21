import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import Button from '@/Components/ui/Button';
import { motion } from 'framer-motion';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        status: '',
        academic_id: '',
        citizenship: '',
        academic_grade: '',
        id_card_number: '',
        google_scholar_url: '',
        scopus_id: '',
        affiliation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout title="Register Author">
            <div className="min-h-screen pt-28 pb-20 flex flex-col items-center justify-center relative z-10 px-4 sm:px-6 lg:px-8">
                
                {/* Background Decor */}
                <div className="absolute top-1/4 -right-64 w-96 h-96 bg-gold-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
                <div className="absolute bottom-1/4 -left-64 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-4xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Create Author Account</h1>
                        <p className="text-gray-400">Join our academic community to submit and review scientific articles.</p>
                    </div>

                    <div className="glass-card p-8 md:p-10">
                        <form onSubmit={submit} className="space-y-8">
                            
                            {/* Grid Layout for Forms */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                
                                {/* Fullname */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Fullname * <span className="text-gray-500 text-xs">(Without Title)</span></label>
                                    <input
                                        type="text"
                                        className="input-premium w-full"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        placeholder="John Doe"
                                    />
                                    {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name}</p>}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                                    <input
                                        type="email"
                                        className="input-premium w-full"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                        placeholder="john@example.com"
                                    />
                                    {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email}</p>}
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Status *</label>
                                    <select
                                        className="input-premium w-full"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>Select Status</option>
                                        <option value="Peneliti">Peneliti</option>
                                        <option value="Dosen">Dosen</option>
                                        <option value="Profesor">Profesor</option>
                                        <option value="Mahasiswa">Mahasiswa</option>
                                    </select>
                                    {errors.status && <p className="mt-2 text-sm text-red-400">{errors.status}</p>}
                                </div>

                                {/* ID Card (KTP) */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">ID Card Number * <span className="text-gray-500 text-xs">(KTP Only - used once)</span></label>
                                    <input
                                        type="text"
                                        className="input-premium w-full"
                                        value={data.id_card_number}
                                        onChange={(e) => setData('id_card_number', e.target.value)}
                                        required
                                        placeholder="16-digit KTP Number"
                                    />
                                    {errors.id_card_number && <p className="mt-2 text-sm text-red-400">{errors.id_card_number}</p>}
                                </div>

                                {/* Citizenship */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Citizenship *</label>
                                    <select
                                        className="input-premium w-full"
                                        value={data.citizenship}
                                        onChange={(e) => setData('citizenship', e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>Select Country</option>
                                        <option value="Indonesia">🇮🇩 Indonesia</option>
                                        <option value="Malaysia">🇲🇾 Malaysia</option>
                                        <option value="Singapore">🇸🇬 Singapore</option>
                                        <option value="Thailand">🇹🇭 Thailand</option>
                                        <option value="Philippines">🇵🇭 Philippines</option>
                                        <option value="Vietnam">🇻🇳 Vietnam</option>
                                        <option value="Australia">🇦🇺 Australia</option>
                                        <option value="United States">🇺🇸 United States</option>
                                        <option value="United Kingdom">🇬🇧 United Kingdom</option>
                                        <option value="Other">🌍 Other</option>
                                    </select>
                                    {errors.citizenship && <p className="mt-2 text-sm text-red-400">{errors.citizenship}</p>}
                                </div>

                                {/* Affiliation */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Affiliation / Institution *</label>
                                    <input
                                        type="text"
                                        list="universities"
                                        className="input-premium w-full"
                                        value={data.affiliation}
                                        onChange={(e) => setData('affiliation', e.target.value)}
                                        required
                                        placeholder="e.g. Universitas Indonesia"
                                    />
                                    <datalist id="universities">
                                        <option value="Universitas Indonesia" />
                                        <option value="Institut Teknologi Bandung" />
                                        <option value="Universitas Gadjah Mada" />
                                        <option value="Institut Pertanian Bogor" />
                                        <option value="Universitas Airlangga" />
                                        <option value="Universitas Padjadjaran" />
                                        <option value="Universitas Diponegoro" />
                                        <option value="Universitas Brawijaya" />
                                        <option value="Institut Teknologi Sepuluh Nopember" />
                                        <option value="Universitas Hasanuddin" />
                                    </datalist>
                                    {errors.affiliation && <p className="mt-2 text-sm text-red-400">{errors.affiliation}</p>}
                                </div>

                                {/* Academic Grade */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Academic Grade *</label>
                                    <select
                                        className="input-premium w-full"
                                        value={data.academic_grade}
                                        onChange={(e) => setData('academic_grade', e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>Select Grade</option>
                                        <option value="Asisten Ahli">Asisten Ahli</option>
                                        <option value="Lektor">Lektor</option>
                                        <option value="Lektor Kepala">Lektor Kepala</option>
                                        <option value="Guru Besar">Guru Besar</option>
                                        <option value="Peneliti Pertama">Peneliti Pertama</option>
                                        <option value="Peneliti Muda">Peneliti Muda</option>
                                        <option value="Peneliti Madya">Peneliti Madya</option>
                                        <option value="Peneliti Utama">Peneliti Utama</option>
                                        <option value="None">None / Student</option>
                                    </select>
                                    {errors.academic_grade && <p className="mt-2 text-sm text-red-400">{errors.academic_grade}</p>}
                                </div>

                                {/* Academic ID */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">NUPTK / NIDN / NIP / NPM</label>
                                    <input
                                        type="text"
                                        className="input-premium w-full"
                                        value={data.academic_id}
                                        onChange={(e) => setData('academic_id', e.target.value)}
                                        placeholder="Optional Identification Number"
                                    />
                                    {errors.academic_id && <p className="mt-2 text-sm text-red-400">{errors.academic_id}</p>}
                                </div>

                                {/* Google Scholar URL */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Google Scholar URL *</label>
                                    <input
                                        type="url"
                                        className="input-premium w-full"
                                        value={data.google_scholar_url}
                                        onChange={(e) => setData('google_scholar_url', e.target.value)}
                                        required
                                        placeholder="https://scholar.google.com/citations?user=..."
                                    />
                                    {errors.google_scholar_url && <p className="mt-2 text-sm text-red-400">{errors.google_scholar_url}</p>}
                                </div>

                                {/* Scopus ID */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Scopus ID</label>
                                    <input
                                        type="text"
                                        className="input-premium w-full"
                                        value={data.scopus_id}
                                        onChange={(e) => setData('scopus_id', e.target.value)}
                                        placeholder="Optional Scopus ID"
                                    />
                                    {errors.scopus_id && <p className="mt-2 text-sm text-red-400">{errors.scopus_id}</p>}
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Password *</label>
                                    <input
                                        type="password"
                                        className="input-premium w-full"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                        autoComplete="new-password"
                                        placeholder="••••••••"
                                    />
                                    {errors.password && <p className="mt-2 text-sm text-red-400">{errors.password}</p>}
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password *</label>
                                    <input
                                        type="password"
                                        className="input-premium w-full"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required
                                        autoComplete="new-password"
                                        placeholder="••••••••"
                                    />
                                </div>

                            </div>

                            {/* Submit & Links */}
                            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <p className="text-sm text-gray-400">
                                    Already registered? <Link href={route('login')} className="text-gold-400 hover:text-gold-300 font-medium transition-colors">Sign In</Link>
                                </p>
                                <Button type="submit" className="w-full sm:w-auto px-8" loading={processing}>
                                    Create Account
                                </Button>
                            </div>

                        </form>
                    </div>
                </motion.div>
            </div>
        </GuestLayout>
    );
}
