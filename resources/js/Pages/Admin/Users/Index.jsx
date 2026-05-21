import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import Badge from '@/Components/ui/Badge';
import Button from '@/Components/ui/Button';
import Input from '@/Components/ui/Input';
import { PlusIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function UserIndex({ users, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [roleFilter, setRoleFilter] = useState(filters?.role || '');

    // Note: To make this fully functional, we would need a Modal component to show the create/edit forms.
    // For now, this represents the index view of the Admin Users page.

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/users', { search, role: roleFilter }, { preserveState: true });
    };

    return (
        <AuthenticatedLayout title="User Management">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">Users</h1>
                    <p className="text-gray-400 mt-1">Manage system users and their roles</p>
                </div>
                <Button><PlusIcon className="w-5 h-5" /> Add User</Button>
            </div>

            <div className="glass-card overflow-hidden">
                <div className="p-4 border-b border-white/10 flex flex-col sm:flex-row gap-4">
                    <form onSubmit={handleSearch} className="flex-1 flex gap-2">
                        <div className="relative flex-1 max-w-sm">
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name or email..." className="input-premium pl-9 py-2" />
                        </div>
                        <select value={roleFilter} onChange={e => { setRoleFilter(e.target.value); handleSearch(e); }} className="input-premium py-2 w-40">
                            <option value="">All Roles</option>
                            <option value="admin">Admin</option>
                            <option value="editor">Editor</option>
                            <option value="reviewer">Reviewer</option>
                            <option value="author">Author</option>
                        </select>
                    </form>
                </div>
                <div className="overflow-x-auto">
                    <table className="table-premium">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Affiliation</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.data?.map((user) => (
                                <tr key={user.id}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-navy-950 font-bold text-xs">
                                                {user.name.charAt(0)}
                                            </div>
                                            <span className="text-white font-medium">{user.name}</span>
                                        </div>
                                    </td>
                                    <td><span className="text-gray-400 text-sm">{user.email}</span></td>
                                    <td><Badge variant={user.role === 'admin' ? 'danger' : user.role === 'editor' ? 'warning' : user.role === 'reviewer' ? 'success' : 'info'}>{user.role}</Badge></td>
                                    <td><span className="text-gray-400 text-sm">{user.affiliation || '-'}</span></td>
                                    <td><Badge variant={user.is_active ? 'success' : 'secondary'}>{user.is_active ? 'Active' : 'Inactive'}</Badge></td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <button className="p-1.5 rounded-lg text-blue-400 hover:bg-blue-400/10 transition-colors"><PencilIcon className="w-4 h-4" /></button>
                                            <button className="p-1.5 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors"><TrashIcon className="w-4 h-4" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
