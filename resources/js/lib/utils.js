import { clsx } from 'clsx';

export function cn(...inputs) {
    return clsx(inputs);
}

export function formatDate(date, locale = 'en-US') {
    if (!date) return '';
    return new Date(date).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export function formatDateShort(date) {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

export function truncate(str, length = 150) {
    if (!str) return '';
    if (str.length <= length) return str;
    return str.substring(0, length) + '...';
}

export function slugify(str) {
    return str
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-')
        .trim();
}

export function statusLabel(status) {
    const labels = {
        draft: 'Draft',
        submitted: 'Submitted',
        under_review: 'Under Review',
        revision_required: 'Revision Required',
        revised: 'Revised',
        accepted: 'Accepted',
        rejected: 'Rejected',
        published: 'Published',
    };
    return labels[status] || status;
}

export function statusColor(status) {
    const colors = {
        draft: 'gray',
        submitted: 'blue',
        under_review: 'purple',
        revision_required: 'amber',
        revised: 'cyan',
        accepted: 'emerald',
        rejected: 'red',
        published: 'gold',
    };
    return colors[status] || 'gray';
}

export function roleLabel(role) {
    const labels = {
        admin: 'Administrator',
        editor: 'Editor',
        reviewer: 'Reviewer',
        author: 'Author',
    };
    return labels[role] || role;
}

export function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function generateTrackingCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'JRN-';
    for (let i = 0; i < 8; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

export function getInitials(name) {
    if (!name) return '??';
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
}
