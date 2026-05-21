import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/ui/Button';
import { Dialog } from '@headlessui/react';
import { TagIcon, PencilSquareIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function SubjectIndex({ subjects }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingSubject, setEditingSubject] = useState(null);

    const createForm = useForm({
        name: '',
        description: '',
    });

    const editForm = useForm({
        name: '',
        description: '',
    });

    const deleteForm = useForm();

    const handleCreate = (e) => {
        e.preventDefault();
        createForm.post(route('admin.subjects.store'), {
            onSuccess: () => {
                setIsCreateModalOpen(false);
                createForm.reset();
            },
        });
    };

    const openEditModal = (subject) => {
        setEditingSubject(subject);
        editForm.setData({
            name: subject.name,
            description: subject.description || '',
        });
        setIsEditModalOpen(true);
    };

    const handleEdit = (e) => {
        e.preventDefault();
        editForm.put(route('admin.subjects.update', editingSubject.id), {
            onSuccess: () => {
                setIsEditModalOpen(false);
                setEditingSubject(null);
            },
        });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this subject?')) {
            deleteForm.delete(route('admin.subjects.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout title="Manage Subjects">
            <div className="max-w-7xl mx-auto space-y-6">
                
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <TagIcon className="w-6 h-6 text-gold-400" />
                            Manage Subjects
                        </h2>
                        <p className="text-sm text-gray-400 mt-1">Organize articles by their scientific disciplines.</p>
                    </div>
                    <Button onClick={() => setIsCreateModalOpen(true)} className="flex items-center gap-2">
                        <PlusIcon className="w-5 h-5" /> Add Subject
                    </Button>
                </div>

                <div className="glass-card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-400 uppercase bg-navy-900/50 border-b border-white/10">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Subject Name</th>
                                    <th className="px-6 py-4 font-medium">Slug</th>
                                    <th className="px-6 py-4 font-medium">Articles</th>
                                    <th className="px-6 py-4 text-right font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {subjects.data.map((subject) => (
                                    <tr key={subject.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4 text-white font-medium">{subject.name}</td>
                                        <td className="px-6 py-4 text-gray-400 font-mono text-xs">{subject.slug}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs">
                                                {subject.submissions_count} Articles
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => openEditModal(subject)} className="p-1.5 text-gray-400 hover:text-gold-400 hover:bg-gold-500/10 rounded-lg transition-colors">
                                                    <PencilSquareIcon className="w-5 h-5" />
                                                </button>
                                                <button onClick={() => handleDelete(subject.id)} className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                                                    <TrashIcon className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {subjects.data.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-8 text-center text-gray-400">
                                            No subjects found. Create your first subject.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Create Modal */}
                <Dialog open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} className="relative z-50">
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel className="w-full max-w-md bg-navy-900 border border-white/10 rounded-2xl p-6 shadow-2xl">
                            <Dialog.Title className="text-xl font-bold text-white mb-6">Create Subject</Dialog.Title>
                            <form onSubmit={handleCreate} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Subject Name *</label>
                                    <input
                                        type="text"
                                        className="input-premium w-full"
                                        value={createForm.data.name}
                                        onChange={e => createForm.setData('name', e.target.value)}
                                        required
                                        placeholder="e.g. Information Technology"
                                    />
                                    {createForm.errors.name && <p className="text-red-400 text-sm mt-1">{createForm.errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                                    <textarea
                                        className="input-premium w-full"
                                        rows="3"
                                        value={createForm.data.description}
                                        onChange={e => createForm.setData('description', e.target.value)}
                                        placeholder="Brief description..."
                                    ></textarea>
                                </div>
                                <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                                    <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
                                    <Button type="submit" loading={createForm.processing}>Save Subject</Button>
                                </div>
                            </form>
                        </Dialog.Panel>
                    </div>
                </Dialog>

                {/* Edit Modal */}
                <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} className="relative z-50">
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel className="w-full max-w-md bg-navy-900 border border-white/10 rounded-2xl p-6 shadow-2xl">
                            <Dialog.Title className="text-xl font-bold text-white mb-6">Edit Subject</Dialog.Title>
                            <form onSubmit={handleEdit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Subject Name *</label>
                                    <input
                                        type="text"
                                        className="input-premium w-full"
                                        value={editForm.data.name}
                                        onChange={e => editForm.setData('name', e.target.value)}
                                        required
                                    />
                                    {editForm.errors.name && <p className="text-red-400 text-sm mt-1">{editForm.errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                                    <textarea
                                        className="input-premium w-full"
                                        rows="3"
                                        value={editForm.data.description}
                                        onChange={e => editForm.setData('description', e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                                    <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
                                    <Button type="submit" loading={editForm.processing}>Update Subject</Button>
                                </div>
                            </form>
                        </Dialog.Panel>
                    </div>
                </Dialog>

            </div>
        </AuthenticatedLayout>
    );
}
