import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const Input = forwardRef(({ className, label, error, icon: Icon, dark = true, ...props }, ref) => {
    return (
        <div className="space-y-1.5">
            {label && (
                <label className={cn(
                    "block text-sm font-medium",
                    dark ? "text-gray-300" : "text-gray-700"
                )}>
                    {label}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon className={cn("w-5 h-5", dark ? "text-gray-500" : "text-gray-400")} />
                    </div>
                )}
                <input
                    ref={ref}
                    className={cn(
                        dark ? 'input-premium' : 'input-premium-light',
                        Icon && 'pl-10',
                        error && 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20',
                        className
                    )}
                    {...props}
                />
            </div>
            {error && (
                <p className="text-sm text-red-400">{error}</p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
