import { useRef, useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import Button from '@/Components/ui/Button';
import { Transition } from '@headlessui/react';
import { CameraIcon } from '@heroicons/react/24/outline';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;
    const fileInput = useRef();
    const [photoPreview, setPhotoPreview] = useState(null);

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: user.name || '',
        email: user.email || '',
        avatar: null,
        status: user.status || '',
        academic_id: user.academic_id || '',
        citizenship: user.citizenship || '',
        academic_grade: user.academic_grade || '',
        id_card_number: user.id_card_number || '',
        google_scholar_url: user.google_scholar_url || '',
        scopus_id: user.scopus_id || '',
        affiliation: user.affiliation || '',
        _method: 'patch',
    });

    const updatePhotoPreview = (e) => {
        const file = e.target.files[0];
        setData('avatar', file);

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPhotoPreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('profile.update'), {
            preserveScroll: true,
        });
    };

    return (
        <section className={className}>
            <header className="mb-6">
                <h2 className="text-xl font-semibold text-white">Profile Information</h2>
                <p className="mt-1 text-sm text-gray-400">
                    Update your account's profile information, academic credentials, and email address.
                </p>
            </header>

            <form onSubmit={submit} className="space-y-8">
                {/* Profile Photo */}
                <div className="flex items-center gap-6 pb-6 border-b border-white/10">
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 bg-navy-900 flex items-center justify-center">
                            {photoPreview ? (
                                <img src={photoPreview} className="w-full h-full object-cover" alt="Preview" />
                            ) : (
                                <img src={user.avatar_url} className="w-full h-full object-cover" alt={user.name} />
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={() => fileInput.current.click()}
                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center cursor-pointer"
                        >
                            <CameraIcon className="w-8 h-8 text-white" />
                        </button>
                    </div>
                    <div>
                        <input
                            type="file"
                            ref={fileInput}
                            className="hidden"
                            onChange={updatePhotoPreview}
                            accept="image/*"
                        />
                        <Button type="button" variant="outline" onClick={() => fileInput.current.click()}>
                            Select New Photo
                        </Button>
                        {errors.avatar && <p className="mt-2 text-sm text-red-400">{errors.avatar}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Fullname */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Fullname * <span className="text-gray-500 text-xs">(Without Title)</span></label>
                        <input type="text" className="input-premium w-full" value={data.name} onChange={e => setData('name', e.target.value)} required />
                        {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                        <input type="email" className="input-premium w-full" value={data.email} onChange={e => setData('email', e.target.value)} required />
                        {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email}</p>}
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Status *</label>
                        <select className="input-premium w-full" value={data.status} onChange={e => setData('status', e.target.value)} required>
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
                        <label className="block text-sm font-medium text-gray-300 mb-2">ID Card Number * <span className="text-gray-500 text-xs">(KTP)</span></label>
                        <input type="text" className="input-premium w-full" value={data.id_card_number} onChange={e => setData('id_card_number', e.target.value)} required />
                        {errors.id_card_number && <p className="mt-2 text-sm text-red-400">{errors.id_card_number}</p>}
                    </div>

                    {/* Citizenship */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Citizenship *</label>
                        <select className="input-premium w-full" value={data.citizenship} onChange={e => setData('citizenship', e.target.value)} required>
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
                        <input type="text" list="universities" className="input-premium w-full" value={data.affiliation} onChange={e => setData('affiliation', e.target.value)} required />
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
                        <select className="input-premium w-full" value={data.academic_grade} onChange={e => setData('academic_grade', e.target.value)} required>
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
                        <input type="text" className="input-premium w-full" value={data.academic_id} onChange={e => setData('academic_id', e.target.value)} />
                        {errors.academic_id && <p className="mt-2 text-sm text-red-400">{errors.academic_id}</p>}
                    </div>

                    {/* Google Scholar URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Google Scholar URL *</label>
                        <input type="url" className="input-premium w-full" value={data.google_scholar_url} onChange={e => setData('google_scholar_url', e.target.value)} required placeholder="https://scholar.google.com/citations?user=..." />
                        {errors.google_scholar_url && <p className="mt-2 text-sm text-red-400">{errors.google_scholar_url}</p>}
                    </div>

                    {/* Scopus ID */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Scopus ID</label>
                        <input type="text" className="input-premium w-full" value={data.scopus_id} onChange={e => setData('scopus_id', e.target.value)} />
                        {errors.scopus_id && <p className="mt-2 text-sm text-red-400">{errors.scopus_id}</p>}
                    </div>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                    <Button type="submit" loading={processing}>Save Profile Changes</Button>
                    <Transition show={recentlySuccessful} enter="transition ease-in-out" enterFrom="opacity-0" leave="transition ease-in-out" leaveTo="opacity-0">
                        <p className="text-sm text-emerald-400 font-medium">Saved successfully.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
