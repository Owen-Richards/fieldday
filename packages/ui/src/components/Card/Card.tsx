/**
 * Card Component
 *
 * Container component for content grouping with elevation and borders
 * Used for session cards, user profiles, and content containers
 */

import React, { forwardRef } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../foundations/utils';

export interface CardProps extends HTMLMotionProps<'div'> {
  /** Card variant */
  variant?: 'default' | 'elevated' | 'outlined' | 'flat';
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Make card hoverable with elevation change */
  hoverable?: boolean;
  /** Make card clickable */
  onClick?: () => void;
  /** Children */
  children: React.ReactNode;
}

const variantStyles = {
  default:
    'bg-white dark:bg-neutral-800 shadow-sm border border-neutral-200 dark:border-neutral-700',
  elevated: 'bg-white dark:bg-neutral-800 shadow-md',
  outlined: 'bg-white dark:bg-neutral-800 border-2 border-neutral-300 dark:border-neutral-600',
  flat: 'bg-neutral-50 dark:bg-neutral-900',
};

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      hoverable = false,
      onClick,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isInteractive = hoverable || onClick;

    return (
      <motion.div
        ref={ref}
        onClick={onClick}
        whileHover={
          isInteractive ? { y: -4, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' } : undefined
        }
        transition={{ duration: 0.2 }}
        className={cn(
          'rounded-lg',
          'transition-all duration-200',
          variantStyles[variant],
          paddingStyles[padding],
          isInteractive && 'cursor-pointer',
          className
        )}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={
          onClick
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick();
                }
              }
            : undefined
        }
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

/** Card Header */
export const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 pb-4', className)} {...props}>
      {children}
    </div>
  )
);

CardHeader.displayName = 'CardHeader';

/** Card Title */
export const CardTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-xl font-semibold leading-none tracking-tight', className)}
      {...props}
    >
      {children}
    </h3>
  )
);

CardTitle.displayName = 'CardTitle';

/** Card Description */
export const CardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-neutral-600 dark:text-neutral-400', className)}
    {...props}
  >
    {children}
  </p>
));

CardDescription.displayName = 'CardDescription';

/** Card Content */
export const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('pt-0', className)} {...props}>
      {children}
    </div>
  )
);

CardContent.displayName = 'CardContent';

/** Card Footer */
export const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center pt-4 border-t border-neutral-200 dark:border-neutral-700',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

CardFooter.displayName = 'CardFooter';
