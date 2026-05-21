import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import Badge from '@/Components/ui/Badge';
import Button from '@/Components/ui/Button';
import Input from '@/Components/ui/Input';
import { PlusIcon, FolderOpenIcon } from '@heroicons/react/24/outline';
import { formatDate } from '@/lib/utils';

export default function IssueIndex({ volumes }) {
    // Note: Modal implementations for creating Volume/Issue omitted for brevity in this snapshot.

    return (
        <AuthenticatedLayout title="Volumes & Issues">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">Volumes & Issues</h1>
                    <p className="text-gray-400 mt-1">Manage journal publications</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="secondary"><PlusIcon className="w-4 h-4" /> New Volume</Button>
                    <Button><PlusIcon className="w-4 h-4" /> New Issue</Button>
                </div>
            </div>

            <div className="space-y-6">
                {volumes?.map((volume) => (
                    <div key={volume.id} className="glass-card overflow-hidden">
                        <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                                <FolderOpenIcon className="w-5 h-5 text-gold-400" />
                                Volume {volume.volume_number} ({volume.year})
                            </h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="table-premium border-0">
                                <thead>
                                    <tr>
                                        <th>Issue</th>
                                        <th>Title</th>
                                        <th>Publish Date</th>
                                        <th>Articles</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {volume.issues?.map((issue) => (
                                        <tr key={issue.id}>
                                            <td><span className="text-white font-medium">Issue {issue.issue_number}</span></td>
                                            <td><span className="text-gray-400 text-sm">{issue.title || '-'}</span></td>
                                            <td><span className="text-gray-400 text-sm">{issue.publish_date ? formatDate(issue.publish_date) : '-'}</span></td>
                                            <td><span className="text-gray-400 text-sm">{issue.submissions_count || 0}</span></td>
                                            <td>
                                                <div className="flex gap-2">
                                                    <Badge variant={issue.is_published ? 'success' : 'secondary'}>{issue.is_published ? 'Published' : 'Draft'}</Badge>
                                                    {issue.is_current && <Badge variant="warning">Current</Badge>}
                                                </div>
                                            </td>
                                            <td>
                                                <button className="text-gold-400 hover:text-gold-300 text-sm font-medium">Edit</button>
                                            </td>
                                        </tr>
                                    ))}
                                    {(!volume.issues || volume.issues.length === 0) && (
                                        <tr><td colSpan="6" className="text-center py-6 text-gray-500">No issues in this volume.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
