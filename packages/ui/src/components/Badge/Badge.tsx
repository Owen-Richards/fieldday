import { type FC, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../foundations/utils';

const badgeVariants = cva(
  ['inline-flex items-center justify-center font-medium transition-colors'],
  {
    variants: {
      variant: {
        default: [
          'bg-neutral-100 text-neutral-700 border border-neutral-200',
          'dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700',
        ],
        primary: [
          'bg-brand-primary-100 text-brand-primary-700 border border-brand-primary-200',
          'dark:bg-brand-primary-900/30 dark:text-brand-primary-300 dark:border-brand-primary-800',
        ],
        accent: [
          'bg-brand-accent-100 text-brand-accent-700 border border-brand-accent-200',
          'dark:bg-brand-accent-900/30 dark:text-brand-accent-300 dark:border-brand-accent-800',
        ],
        success: [
          'bg-green-100 text-green-700 border border-green-200',
          'dark:bg-green-900/30 dark:text-green-300 dark:border-green-800',
        ],
        warning: [
          'bg-yellow-100 text-yellow-700 border border-yellow-200',
          'dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800',
        ],
        danger: [
          'bg-red-100 text-red-700 border border-red-200',
          'dark:bg-red-900/30 dark:text-red-300 dark:border-red-800',
        ],
        info: [
          'bg-blue-100 text-blue-700 border border-blue-200',
          'dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
        ],
        soft: [
          'bg-neutral-100/50 text-neutral-600 border border-neutral-200/50',
          'dark:bg-neutral-800/50 dark:text-neutral-400 dark:border-neutral-700/50',
        ],
      },
      size: {
        sm: 'px-2 py-0.5 text-xs rounded-md',
        md: 'px-2.5 py-1 text-sm rounded-lg',
        lg: 'px-3 py-1.5 text-base rounded-lg',
      },
      pulse: {
        true: 'animate-pulse-slow',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      pulse: false,
    },
  }
);

export type BadgeProps = VariantProps<typeof badgeVariants> & {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
};

export const Badge: FC<BadgeProps> = ({ children, className, variant, size, pulse, icon }) => {
  return (
    <span className={cn(badgeVariants({ variant, size, pulse }), className)}>
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </span>
  );
};
