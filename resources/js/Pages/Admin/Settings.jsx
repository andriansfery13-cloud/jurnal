import { useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/ui/Button';
import Input from '@/Components/ui/Input';
import { Transition } from '@headlessui/react';
import { Cog6ToothIcon, DocumentCheckIcon, CloudArrowUpIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

export default function Settings({ journal }) {
    const fileInput = useRef();
    const [signaturePreview, setSignaturePreview] = useState(
        journal.settings?.editor_signature_path 
            ? `/storage/${journal.settings.editor_signature_path}` 
            : null
    );

    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        name: journal.name || '',
        publisher: journal.publisher || '',
        editor_in_chief_name: journal.settings?.editor_in_chief_name || '',
        sinta_rank: journal.settings?.sinta_rank || 0,
        smtp_host: journal.settings?.smtp_host || '',
        smtp_port: journal.settings?.smtp_port || '',
        smtp_encryption: journal.settings?.smtp_encryption || 'null',
        smtp_username: journal.settings?.smtp_username || '',
        smtp_password: journal.settings?.smtp_password || '',
        smtp_from_address: journal.settings?.smtp_from_address || '',
        smtp_from_name: journal.settings?.smtp_from_name || '',
        editor_signature: null,
    });

    const updateSignaturePreview = (e) => {
        const file = e.target.files[0];
        setData('editor_signature', file);

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSignaturePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout title="Journal Settings">
            <div className="max-w-4xl mx-auto space-y-6">
                
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Cog6ToothIcon className="w-6 h-6 text-gold-400" />
                        Journal & LOA Settings
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">
                        Configure global journal information and Editor in Chief details used for Letter of Acceptance (LOA) generation.
                    </p>
                </div>

                <div className="glass-card p-8">
                    <form onSubmit={submit} className="space-y-8">
                        
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">Basic Journal Info</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input 
                                    label="Journal Name *" 
                                    value={data.name} 
                                    onChange={e => setData('name', e.target.value)} 
                                    error={errors.name}
                                    placeholder="e.g. Jurnal Ilmiah Sains dan Teknologi"
                                    required
                                />
                                
                                <Input 
                                    label="Publisher / University Name *" 
                                    value={data.publisher} 
                                    onChange={e => setData('publisher', e.target.value)} 
                                    error={errors.publisher}
                                    placeholder="e.g. Universitas Indonesia Press"
                                    required
                                />

                                <div className="space-y-1.5">
                                    <label className="block text-sm font-medium text-gray-300">SINTA Accreditation Level</label>
                                    <select 
                                        value={data.sinta_rank} 
                                        onChange={e => setData('sinta_rank', e.target.value)} 
                                        className="input-premium w-full"
                                    >
                                        <option value={0}>Not Accredited (None)</option>
                                        <option value={1}>SINTA 1</option>
                                        <option value={2}>SINTA 2</option>
                                        <option value={3}>SINTA 3</option>
                                        <option value={4}>SINTA 4</option>
                                        <option value={5}>SINTA 5</option>
                                        <option value={6}>SINTA 6</option>
                                    </select>
                                    <p className="text-xs text-gray-400 mt-1">Select the SINTA rank to display the badge on the landing page.</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 pt-6">
                            <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2 flex items-center gap-2">
                                <DocumentCheckIcon className="w-5 h-5 text-gold-400" />
                                Letter of Acceptance (LOA) Settings
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <Input 
                                        label="Editor in Chief Name *" 
                                        value={data.editor_in_chief_name} 
                                        onChange={e => setData('editor_in_chief_name', e.target.value)} 
                                        error={errors.editor_in_chief_name}
                                        placeholder="e.g. Prof. Dr. Budi Santoso, M.Kom."
                                        required
                                    />
                                    <p className="text-xs text-gray-400 mt-2">
                                        This name will automatically be printed below the signature on all generated LOAs.
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Editor's Signature Image</label>
                                    <div 
                                        onClick={() => fileInput.current.click()}
                                        className="relative w-full h-32 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center hover:border-gold-500/30 transition-all cursor-pointer bg-black/20 overflow-hidden group"
                                    >
                                        {signaturePreview ? (
                                            <img src={signaturePreview} alt="Signature Preview" className="h-full object-contain p-2" />
                                        ) : (
                                            <div className="text-center">
                                                <CloudArrowUpIcon className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                                                <span className="text-sm text-gray-400">Click to upload signature</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="text-sm font-medium text-white">Change Signature</span>
                                        </div>
                                    </div>
                                    <input
                                        type="file"
                                        ref={fileInput}
                                        className="hidden"
                                        onChange={updateSignaturePreview}
                                        accept="image/jpeg,image/png,image/webp"
                                    />
                                    {errors.editor_signature && <p className="mt-2 text-sm text-red-400">{errors.editor_signature}</p>}
                                    <p className="text-xs text-gray-500 mt-2">Recommended: PNG image with transparent background.</p>
                                </div>
                            </div>
                        </div>

                        {/* SMTP Email Settings */}
                        <div className="space-y-6 pt-6 border-t border-white/10">
                            <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2 flex items-center gap-2">
                                <EnvelopeIcon className="w-5 h-5 text-gold-400" />
                                SMTP & Email Settings
                            </h3>
                            <p className="text-sm text-gray-400">
                                Configure the SMTP server details to enable email notifications (Publishing, Verification, Password Reset). Leave blank to disable emails.
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input 
                                    label="SMTP Host" 
                                    value={data.smtp_host} 
                                    onChange={e => setData('smtp_host', e.target.value)} 
                                    error={errors.smtp_host}
                                    placeholder="e.g. smtp.gmail.com"
                                />
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <Input 
                                        label="SMTP Port" 
                                        value={data.smtp_port} 
                                        onChange={e => setData('smtp_port', e.target.value)} 
                                        error={errors.smtp_port}
                                        placeholder="e.g. 465 or 587"
                                    />
                                    <div className="space-y-1.5">
                                        <label className="block text-sm font-medium text-gray-300">Encryption</label>
                                        <select 
                                            value={data.smtp_encryption} 
                                            onChange={e => setData('smtp_encryption', e.target.value)} 
                                            className="input-premium w-full"
                                        >
                                            <option value="null">None</option>
                                            <option value="tls">TLS</option>
                                            <option value="ssl">SSL</option>
                                        </select>
                                    </div>
                                </div>

                                <Input 
                                    label="SMTP Username" 
                                    value={data.smtp_username} 
                                    onChange={e => setData('smtp_username', e.target.value)} 
                                    error={errors.smtp_username}
                                    placeholder="Your email address"
                                />

                                <Input 
                                    label="SMTP Password / App Password" 
                                    type="password"
                                    value={data.smtp_password} 
                                    onChange={e => setData('smtp_password', e.target.value)} 
                                    error={errors.smtp_password}
                                    placeholder="••••••••••••"
                                />

                                <Input 
                                    label="From Email Address" 
                                    value={data.smtp_from_address} 
                                    onChange={e => setData('smtp_from_address', e.target.value)} 
                                    error={errors.smtp_from_address}
                                    placeholder="e.g. no-reply@journal.com"
                                />

                                <Input 
                                    label="From Name" 
                                    value={data.smtp_from_name} 
                                    onChange={e => setData('smtp_from_name', e.target.value)} 
                                    error={errors.smtp_from_name}
                                    placeholder="e.g. Jurnal Ilmiah System"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-4 pt-6 border-t border-white/10">
                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-emerald-400 font-medium">Settings saved successfully.</p>
                            </Transition>
                            
                            <Button type="submit" loading={processing}>
                                Save Settings
                            </Button>
                        </div>
                    </form>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
