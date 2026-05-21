import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function Card({ 
    className, 
    children, 
    glass = true, 
    hover = true,
    padding = true,
    animate = false,
    delay = 0,
    ...props 
}) {
    const Component = animate ? motion.div : 'div';
    const animateProps = animate ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5, delay },
    } : {};

    return (
        <Component
            className={cn(
                glass ? 'glass-card' : 'bg-navy-900 border border-white/10 rounded-2xl',
                hover && 'hover:border-gold-500/30 hover:shadow-glow-gold transition-all duration-500',
                padding && 'p-6',
                'group',
                className
            )}
            {...animateProps}
            {...props}
        >
            {children}
        </Component>
    );
}

export function CardHeader({ className, children }) {
    return (
        <div className={cn('mb-4', className)}>
            {children}
        </div>
    );
}

export function CardTitle({ className, children }) {
    return (
        <h3 className={cn('text-lg font-semibold text-white', className)}>
            {children}
        </h3>
    );
}

export function CardDescription({ className, children }) {
    return (
        <p className={cn('text-sm text-gray-400 mt-1', className)}>
            {children}
        </p>
    );
}

export function CardContent({ className, children }) {
    return (
        <div className={cn('', className)}>
            {children}
        </div>
    );
}

export function CardFooter({ className, children }) {
    return (
        <div className={cn('mt-4 pt-4 border-t border-white/10 flex items-center', className)}>
            {children}
        </div>
    );
}
