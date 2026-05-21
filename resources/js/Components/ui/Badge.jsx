import { cn } from '@/lib/utils';

export default function Badge({ className, variant = 'default', children, ...props }) {
    const variants = {
        default: 'badge-gold',
        success: 'badge-success',
        warning: 'badge-warning',
        error: 'badge-error',
        info: 'badge-info',
        // Status variants
        draft: 'status-draft',
        submitted: 'status-submitted',
        under_review: 'status-under_review',
        revision_required: 'status-revision_required',
        revised: 'status-revised',
        accepted: 'status-accepted',
        rejected: 'status-rejected',
        published: 'status-published',
    };

    return (
        <span className={cn(variants[variant] || variants.default, className)} {...props}>
            {children}
        </span>
    );
}
