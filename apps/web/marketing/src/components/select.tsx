'use client';

import { type FC, type SelectHTMLAttributes, forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children' | 'size'> & {
  options: SelectOption[];
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      label,
      error,
      helperText,
      icon,
      variant = 'default',
      size = 'md',
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeClasses: Record<typeof size, string> = {
      sm: 'h-9 text-sm',
      md: 'h-11 text-base',
      lg: 'h-13 text-lg',
    };

    const variantClasses: Record<typeof variant, string> = {
      default:
        'bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600 focus-within:border-brand-primary-500 dark:focus-within:border-brand-primary-400 focus-within:ring-2 focus-within:ring-brand-primary-100 dark:focus-within:ring-brand-primary-900',
      filled:
        'bg-neutral-100 dark:bg-neutral-800 border-2 border-transparent hover:bg-neutral-200 dark:hover:bg-neutral-750 focus-within:bg-white dark:focus-within:bg-neutral-800 focus-within:border-brand-primary-500 dark:focus-within:border-brand-primary-400 focus-within:ring-2 focus-within:ring-brand-primary-100 dark:focus-within:ring-brand-primary-900',
      outlined:
        'bg-transparent border-2 border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600 focus-within:border-brand-primary-500 dark:focus-within:border-brand-primary-400',
    };

    return (
      <div className="w-full">
        {label && (
          <label
            className={cn(
              'block mb-2 text-sm font-medium text-neutral-700 dark:text-neutral-300',
              disabled && 'opacity-50'
            )}
          >
            {label}
          </label>
        )}
        <div className="relative group">
          {/* Icon */}
          {icon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 dark:text-neutral-400 z-10">
              {icon}
            </div>
          )}

          {/* Select */}
          <select
            ref={ref}
            disabled={disabled}
            className={cn(
              // Base styles
              'w-full rounded-xl appearance-none cursor-pointer',
              'text-neutral-900 dark:text-white',
              'transition-all duration-200 ease-in-out',
              'font-medium',
              // Remove default select arrow
              'bg-no-repeat',
              // Focus styles
              'focus:outline-none',
              // Disabled styles
              'disabled:cursor-not-allowed disabled:opacity-50',
              // Icon padding - more space to prevent overlap
              icon ? 'pl-11 pr-10' : 'pl-4 pr-10',
              // Size
              sizeClasses[size],
              // Variant
              variantClasses[variant],
              // Error state
              error &&
                'border-red-500 dark:border-red-500 focus-within:ring-red-100 dark:focus-within:ring-red-900',
              className
            )}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Custom chevron icon */}
          <div
            className={cn(
              'absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none',
              'text-neutral-500 dark:text-neutral-400',
              'transition-transform duration-200',
              'group-hover:text-neutral-700 dark:group-hover:text-neutral-300',
              disabled && 'opacity-50'
            )}
          >
            <ChevronDown className="w-5 h-5" strokeWidth={2} />
          </div>
        </div>

        {/* Helper text or error */}
        {(helperText || error) && (
          <p
            className={cn(
              'mt-2 text-sm',
              error ? 'text-red-600 dark:text-red-400' : 'text-neutral-500 dark:text-neutral-400'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

// Convenience export for common patterns
export const FilterSelect: FC<SelectProps> = (props) => (
  <Select variant="filled" size="md" {...props} />
);
