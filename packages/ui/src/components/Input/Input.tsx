import { forwardRef, type InputHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../foundations/utils';

const inputVariants = cva(
  [
    'w-full rounded-lg border transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-1',
    'disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-neutral-50',
    'placeholder:text-neutral-400',
    'dark:bg-neutral-800 dark:border-neutral-700 dark:text-white',
    'dark:placeholder:text-neutral-500 dark:disabled:bg-neutral-900',
  ],
  {
    variants: {
      variant: {
        default: [
          'border-neutral-300 bg-white',
          'hover:border-neutral-400',
          'focus:border-brand-primary-500 focus:ring-brand-primary-500/20',
        ],
        error: [
          'border-red-300 bg-red-50',
          'focus:border-red-500 focus:ring-red-500/20',
          'dark:bg-red-950/20 dark:border-red-800',
        ],
        success: [
          'border-green-300 bg-green-50',
          'focus:border-green-500 focus:ring-green-500/20',
          'dark:bg-green-950/20 dark:border-green-800',
        ],
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-5 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants> & {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
  };

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, variant, size, label, error, helperText, leftIcon, rightIcon, id, ...props },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;
    const finalVariant = hasError ? 'error' : variant;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            {label}
            {props.required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              inputVariants({ variant: finalVariant, size }),
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            aria-invalid={hasError}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            {...props}
          />

          {rightIcon && (
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}

        {helperText && !error && (
          <p
            id={`${inputId}-helper`}
            className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
