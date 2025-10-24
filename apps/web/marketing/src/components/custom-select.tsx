'use client';

import { useState, useRef, useEffect, type FC } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type CustomSelectProps = {
  options: SelectOption[];
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
};

export const CustomSelect: FC<CustomSelectProps> = ({
  options,
  label,
  error,
  helperText,
  icon,
  variant = 'default',
  size = 'md',
  value,
  onChange,
  disabled = false,
  className,
  placeholder = 'Select an option',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const sizeClasses: Record<typeof size, string> = {
    sm: 'h-9 text-sm',
    md: 'h-11 text-base',
    lg: 'h-13 text-lg',
  };

  const variantClasses: Record<typeof variant, string> = {
    default:
      'bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600 focus-within:ring-2 focus-within:ring-brand-primary-100 dark:focus-within:ring-brand-primary-900',
    filled:
      'bg-neutral-100 dark:bg-neutral-800 border border-transparent hover:bg-neutral-200 dark:hover:bg-neutral-700 focus-within:bg-white dark:focus-within:bg-neutral-900 focus-within:ring-2 focus-within:ring-brand-primary-100 dark:focus-within:ring-brand-primary-900',
    outlined:
      'bg-transparent border-2 border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600 focus-within:border-brand-primary-500 dark:focus-within:border-brand-primary-400',
  };

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    if (!disabled) {
      onChange?.(optionValue);
      setIsOpen(false);
    }
  };

  return (
    <div className="w-full" ref={containerRef}>
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
      <div className="relative">
        {/* Trigger Button */}
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            // Base styles
            'w-full rounded-xl appearance-none cursor-pointer relative',
            'text-neutral-900 dark:text-white',
            'transition-all duration-200 ease-in-out',
            'font-medium text-left',
            'focus:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
            // Icon padding
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
        >
          {/* Icon */}
          {icon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 dark:text-neutral-400 z-10">
              {icon}
            </div>
          )}

          {/* Selected value or placeholder */}
          <span className={cn(!selectedOption && 'text-neutral-500 dark:text-neutral-400')}>
            {selectedOption?.label || placeholder}
          </span>

          {/* Chevron */}
          <div
            className={cn(
              'absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 dark:text-neutral-400',
              'transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
          >
            <ChevronDown className="w-5 h-5" strokeWidth={2} />
          </div>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            className={cn(
              'absolute z-50 w-full mt-2',
              'bg-white dark:bg-neutral-900',
              'border border-neutral-200 dark:border-neutral-700',
              'rounded-xl shadow-lg',
              'py-2',
              'max-h-64 overflow-y-auto',
              'animate-in fade-in-0 zoom-in-95 duration-100'
            )}
          >
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  disabled={option.disabled}
                  className={cn(
                    'w-full px-3 py-2.5 text-left',
                    'flex items-center justify-between gap-2',
                    'transition-colors duration-150',
                    'text-neutral-900 dark:text-neutral-100',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    !option.disabled &&
                      !isSelected &&
                      'hover:bg-neutral-100 dark:hover:bg-neutral-800',
                    isSelected &&
                      'bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium'
                  )}
                >
                  <span>{option.label}</span>
                  {isSelected && (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        )}
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
};

// Convenience export for filter usage
export const FilterSelect: FC<CustomSelectProps> = (props) => (
  <CustomSelect variant="filled" size="md" {...props} />
);
