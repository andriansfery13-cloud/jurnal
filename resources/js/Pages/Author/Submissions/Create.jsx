import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Input from '@/Components/ui/Input';
import Button from '@/Components/ui/Button';
import { PlusIcon, TrashIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';

export default function SubmissionCreate({ subjects }) {
    const [step, setStep] = useState(1);
    const { data, setData, post, processing, errors } = useForm({
        title: '', abstract: '', keywords: '', language: 'en', subject_id: '',
        authors: [{ name: '', email: '', affiliation: '', orcid_id: '' }],
        manuscript: null,
    });

    const addAuthor = () => setData('authors', [...data.authors, { name: '', email: '', affiliation: '', orcid_id: '' }]);
    const removeAuthor = (i) => { if (data.authors.length > 1) setData('authors', data.authors.filter((_, idx) => idx !== i)); };

    const updateAuthor = (index, field, value) => {
        const updated = [...data.authors];
        updated[index][field] = value;
        setData('authors', updated);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/author/submissions', { forceFormData: true });
    };

    const steps = [
        { num: 1, label: 'Metadata' },
        { num: 2, label: 'Authors' },
        { num: 3, label: 'Upload' },
        { num: 4, label: 'Review' },
    ];

    return (
        <AuthenticatedLayout title="New Submission">
            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-2 mb-10">
                {steps.map((s, i) => (
                    <div key={s.num} className="flex items-center">
                        <button onClick={() => setStep(s.num)} className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${step >= s.num ? 'bg-gradient-to-br from-gold-400 to-gold-600 text-navy-950' : 'bg-white/5 text-gray-500 border border-white/10'}`}>
                            {s.num}
                        </button>
                        <span className={`ml-2 text-sm font-medium ${step >= s.num ? 'text-gold-400' : 'text-gray-600'}`}>{s.label}</span>
                        {i < steps.length - 1 && <div className={`w-12 h-px mx-3 ${step > s.num ? 'bg-gold-400' : 'bg-white/10'}`} />}
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                {/* Step 1: Metadata */}
                {step === 1 && (
                    <div className="glass-card p-8 space-y-6">
                        <h3 className="text-xl font-semibold text-white mb-6">Article Metadata</h3>
                        <Input label="Title *" value={data.title} onChange={e => setData('title', e.target.value)} error={errors.title} placeholder="Enter the full title of your article" />
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-gray-300">Abstract * <span className="text-gray-500">(min 100 characters)</span></label>
                            <textarea value={data.abstract} onChange={e => setData('abstract', e.target.value)} rows={6} className="input-premium resize-none" placeholder="Enter the abstract of your article" />
                            {errors.abstract && <p className="text-sm text-red-400">{errors.abstract}</p>}
                            <p className="text-xs text-gray-500">{data.abstract.length} characters</p>
                        </div>
                        <Input label="Keywords *" value={data.keywords} onChange={e => setData('keywords', e.target.value)} error={errors.keywords} placeholder="machine learning, data science, AI (comma separated)" />
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-gray-300">Language</label>
                            <select value={data.language} onChange={e => setData('language', e.target.value)} className="input-premium w-full">
                                <option value="en">English</option>
                                <option value="id">Bahasa Indonesia</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-gray-300">Subject Category *</label>
                            <select value={data.subject_id} onChange={e => setData('subject_id', e.target.value)} className="input-premium w-full" required>
                                <option value="" disabled>Select a subject</option>
                                {subjects.map(subject => (
                                    <option key={subject.id} value={subject.id}>{subject.name}</option>
                                ))}
                            </select>
                            {errors.subject_id && <p className="text-sm text-red-400">{errors.subject_id}</p>}
                        </div>
                        <div className="flex justify-end">
                            <Button type="button" onClick={() => setStep(2)}>Next: Authors →</Button>
                        </div>
                    </div>
                )}

                {/* Step 2: Authors */}
                {step === 2 && (
                    <div className="glass-card p-8 space-y-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-semibold text-white">Authors</h3>
                            <Button type="button" variant="secondary" onClick={addAuthor}><PlusIcon className="w-4 h-4" />Add Author</Button>
                        </div>
                        {data.authors.map((author, i) => (
                            <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gold-400">{i === 0 ? 'Corresponding Author' : `Author ${i + 1}`}</span>
                                    {i > 0 && <button type="button" onClick={() => removeAuthor(i)} className="text-red-400 hover:text-red-300"><TrashIcon className="w-4 h-4" /></button>}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input label="Full Name *" value={author.name} onChange={e => updateAuthor(i, 'name', e.target.value)} placeholder="Dr. John Doe" />
                                    <Input label="Email *" type="email" value={author.email} onChange={e => updateAuthor(i, 'email', e.target.value)} placeholder="john@university.ac.id" />
                                    <Input label="Affiliation *" value={author.affiliation} onChange={e => updateAuthor(i, 'affiliation', e.target.value)} placeholder="University of Indonesia" />
                                    <Input label="ORCID ID" value={author.orcid_id} onChange={e => updateAuthor(i, 'orcid_id', e.target.value)} placeholder="0000-0001-2345-6789" />
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-between">
                            <Button type="button" variant="ghost" onClick={() => setStep(1)}>← Back</Button>
                            <Button type="button" onClick={() => setStep(3)}>Next: Upload →</Button>
                        </div>
                    </div>
                )}

                {/* Step 3: File Upload */}
                {step === 3 && (
                    <div className="glass-card p-8 space-y-6">
                        <h3 className="text-xl font-semibold text-white mb-6">Upload Manuscript</h3>
                        <div className="border-2 border-dashed border-white/10 rounded-2xl p-12 text-center hover:border-gold-500/30 transition-all cursor-pointer" onClick={() => document.getElementById('manuscript-upload').click()}>
                            <CloudArrowUpIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                            <p className="text-lg font-medium text-white mb-2">
                                {data.manuscript ? data.manuscript.name : 'Drop your file here or click to browse'}
                            </p>
                            <p className="text-sm text-gray-500">Accepted formats: PDF, DOCX, DOC (max 10MB)</p>
                            <input id="manuscript-upload" type="file" accept=".pdf,.docx,.doc" className="hidden" onChange={e => setData('manuscript', e.target.files[0])} />
                        </div>
                        {errors.manuscript && <p className="text-sm text-red-400">{errors.manuscript}</p>}
                        <div className="flex justify-between">
                            <Button type="button" variant="ghost" onClick={() => setStep(2)}>← Back</Button>
                            <Button type="button" onClick={() => setStep(4)}>Next: Review →</Button>
                        </div>
                    </div>
                )}

                {/* Step 4: Review & Submit */}
                {step === 4 && (
                    <div className="glass-card p-8 space-y-6">
                        <h3 className="text-xl font-semibold text-white mb-6">Review & Submit</h3>
                        <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-white/5">
                                <p className="text-xs text-gray-500 uppercase mb-1">Title</p>
                                <p className="text-white font-medium">{data.title || '-'}</p>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5">
                                <p className="text-xs text-gray-500 uppercase mb-1">Abstract</p>
                                <p className="text-gray-300 text-sm">{data.abstract?.substring(0, 200) || '-'}...</p>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5">
                                <p className="text-xs text-gray-500 uppercase mb-1">Keywords & Subject</p>
                                <p className="text-gray-300 text-sm">Keywords: {data.keywords || '-'}</p>
                                <p className="text-gray-300 text-sm">Subject: {subjects.find(s => s.id == data.subject_id)?.name || '-'}</p>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5">
                                <p className="text-xs text-gray-500 uppercase mb-1">Authors ({data.authors.length})</p>
                                {data.authors.map((a, i) => <p key={i} className="text-gray-300 text-sm">{a.name} - {a.affiliation}</p>)}
                            </div>
                            <div className="p-4 rounded-xl bg-white/5">
                                <p className="text-xs text-gray-500 uppercase mb-1">Manuscript</p>
                                <p className="text-gray-300 text-sm">{data.manuscript?.name || 'No file selected'}</p>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <Button type="button" variant="ghost" onClick={() => setStep(3)}>← Back</Button>
                            <Button type="submit" loading={processing}>Submit Manuscript</Button>
                        </div>
                    </div>
                )}
            </form>
        </AuthenticatedLayout>
    );
}
