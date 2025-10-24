import { forwardRef, useState, useEffect, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../foundations/utils';

/**
 * Button variant styles - refined for clarity and usability
 * Following best practices: clear hierarchy, sufficient contrast, and intuitive states
 */
const buttonVariants = cva(
  // Base styles - optimized for readability and touch targets
  [
    'relative inline-flex items-center justify-center',
    'font-semibold tracking-wide transition-all duration-200',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-60',
    'select-none touch-manipulation antialiased', // Smooth rendering
    'active:transition-none', // Instant feedback on press
  ],
  {
    variants: {
      variant: {
        // Primary - High emphasis actions (Join, Create, Pay)
        primary: [
          'bg-gradient-to-b from-brand-primary-500 to-brand-primary-600',
          'text-white shadow-sm',
          'hover:from-brand-primary-400 hover:to-brand-primary-500',
          'hover:shadow-md hover:-translate-y-0.5',
          'active:from-brand-primary-600 active:to-brand-primary-700',
          'active:shadow-inner active:translate-y-0',
          'focus-visible:ring-brand-primary-500/50',
          'border border-brand-primary-600',
        ],
        // Secondary - Alternative primary actions
        secondary: [
          'bg-white text-brand-primary-600',
          'border-2 border-brand-primary-200 shadow-sm',
          'hover:bg-brand-primary-50 hover:border-brand-primary-300',
          'hover:shadow-md hover:-translate-y-0.5',
          'active:bg-brand-primary-100 active:translate-y-0',
          'focus-visible:ring-brand-primary-500/50',
          'dark:bg-neutral-800 dark:text-brand-primary-400',
          'dark:border-brand-primary-800 dark:hover:bg-neutral-700',
        ],
        // Ghost - Low emphasis, inline actions
        ghost: [
          'bg-transparent text-neutral-700',
          'hover:bg-neutral-100/80 hover:text-neutral-900',
          'active:bg-neutral-200/80',
          'focus-visible:ring-neutral-400/50',
          'dark:text-neutral-300 dark:hover:bg-neutral-800/80',
          'dark:hover:text-neutral-100',
        ],
        // Soft - Subtle colored backgrounds
        soft: [
          'bg-brand-primary-100 text-brand-primary-700',
          'hover:bg-brand-primary-200 hover:shadow-sm',
          'active:bg-brand-primary-300',
          'focus-visible:ring-brand-primary-500/50',
          'dark:bg-brand-primary-900/30 dark:text-brand-primary-300',
          'dark:hover:bg-brand-primary-900/50',
        ],
        // Danger - Destructive actions (Delete, Cancel session)
        danger: [
          'bg-gradient-to-b from-red-500 to-red-600',
          'text-white shadow-sm',
          'hover:from-red-400 hover:to-red-500',
          'hover:shadow-md hover:-translate-y-0.5',
          'active:from-red-600 active:to-red-700',
          'active:shadow-inner active:translate-y-0',
          'focus-visible:ring-red-500/50',
          'border border-red-600',
        ],
        // Success - Confirmation actions
        success: [
          'bg-gradient-to-b from-green-500 to-green-600',
          'text-white shadow-sm',
          'hover:from-green-400 hover:to-green-500',
          'hover:shadow-md hover:-translate-y-0.5',
          'active:from-green-600 active:to-green-700',
          'active:shadow-inner active:translate-y-0',
          'focus-visible:ring-green-500/50',
          'border border-green-600',
        ],
      },
      size: {
        // Sizes optimized for touch targets (min 44px on mobile)
        xs: 'h-8 px-3 text-xs rounded-lg gap-1.5 min-w-[64px]',
        sm: 'h-9 px-3.5 text-sm rounded-lg gap-1.5 min-w-[80px]',
        md: 'h-11 px-5 text-base rounded-xl gap-2 min-w-[96px]',
        lg: 'h-12 px-6 text-base rounded-xl gap-2.5 min-w-[112px]',
        xl: 'h-14 px-8 text-lg rounded-2xl gap-3 min-w-[128px]',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
      // New: Icon-only button support
      iconOnly: {
        true: 'aspect-square min-w-0 p-0',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
      iconOnly: false,
    },
  }
);

/**
 * Enhanced loading spinner with smooth animation
 */
const LoadingSpinner = ({ className }: { className?: string }) => (
  <motion.svg
    className={cn('animate-spin', className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.2 }}
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </motion.svg>
);

/**
 * Success checkmark animation
 */
const SuccessCheck = ({ className }: { className?: string }) => (
  <motion.svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
  >
    <motion.path
      d="M5 12l5 5L20 7"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    />
  </motion.svg>
);

/**
 * Ripple effect for tactile feedback
 */
const RippleEffect = ({ x, y }: { x: number; y: number }) => (
  <motion.span
    className="absolute inset-0 overflow-hidden rounded-inherit pointer-events-none"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.span
      className="absolute bg-white/30 rounded-full"
      style={{
        left: x - 50,
        top: y - 50,
        width: 100,
        height: 100,
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 4 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    />
  </motion.span>
);

/**
 * Enhanced Button component props
 */
export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    VariantProps<typeof buttonVariants> {
  /** Left-aligned icon */
  leftIcon?: ReactNode;
  /** Right-aligned icon */
  rightIcon?: ReactNode;
  /** Loading state */
  isLoading?: boolean;
  /** Loading text */
  loadingText?: string;
  /** Success state (shows checkmark) */
  isSuccess?: boolean;
  /** Success duration in ms before resetting */
  successDuration?: number;
  /** Disabled state */
  isDisabled?: boolean;
  /** Enable ripple effect on click */
  enableRipple?: boolean;
  /** Children content */
  children?: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Accessibility label */
  ariaLabel?: string;
  /** Tooltip text on hover */
  tooltip?: string;
}

/**
 * Enhanced Button Component
 *
 * A refined button following UX best practices:
 * - Clear visual hierarchy with gradient effects
 * - Optimal touch targets (min 44px on mobile)
 * - Smooth micro-interactions for feedback
 * - Success state for completed actions
 * - Ripple effect for tactile feedback
 * - Accessible with full keyboard support
 *
 * @example
 * ```tsx
 * // Primary action
 * <Button variant="primary" size="lg" onClick={handleJoin}>
 *   Join Session
 * </Button>
 *
 * // With loading state
 * <Button isLoading loadingText="Joining...">
 *   Join Now
 * </Button>
 *
 * // Icon button
 * <Button variant="ghost" size="sm" iconOnly>
 *   <HeartIcon />
 * </Button>
 *
 * // Success feedback
 * <Button isSuccess successDuration={2000}>
 *   ✓ Joined
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps & HTMLMotionProps<'button'>>(
  (
    {
      variant,
      size,
      fullWidth,
      iconOnly,
      leftIcon,
      rightIcon,
      isLoading = false,
      loadingText,
      isSuccess = false,
      successDuration = 2000,
      isDisabled = false,
      enableRipple = true,
      children,
      className,
      ariaLabel,
      tooltip,
      type = 'button',
      onClick,
      ...props
    },
    ref
  ) => {
    const [showSuccess, setShowSuccess] = useState(isSuccess);
    const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

    // Handle success state duration
    useEffect(() => {
      if (isSuccess) {
        setShowSuccess(true);
        const timer = setTimeout(() => setShowSuccess(false), successDuration);
        return () => clearTimeout(timer);
      }
    }, [isSuccess, successDuration]);

    // Determine disabled state
    const disabled = isDisabled || isLoading;

    // Icon sizing based on button size
    const iconSize = {
      xs: 'w-3.5 h-3.5',
      sm: 'w-4 h-4',
      md: 'w-4.5 h-4.5',
      lg: 'w-5 h-5',
      xl: 'w-6 h-6',
    }[size || 'md'];

    // Handle ripple effect
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (enableRipple && !disabled) {
        const rect = e.currentTarget.getBoundingClientRect();
        const ripple = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          id: Date.now(),
        };
        setRipples((prev) => [...prev, ripple]);
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
        }, 600);
      }
      onClick?.(e);
    };

    // Determine button content
    const buttonContent = () => {
      if (showSuccess) {
        return (
          <>
            <SuccessCheck className={iconSize} />
            <span className="truncate">{children || 'Success!'}</span>
          </>
        );
      }

      if (isLoading) {
        return (
          <>
            <LoadingSpinner className={iconSize} />
            {!iconOnly && <span className="truncate">{loadingText || children}</span>}
          </>
        );
      }

      return (
        <>
          {leftIcon && <span className={cn('flex-shrink-0', iconSize)}>{leftIcon}</span>}
          {!iconOnly && children && <span className="truncate">{children}</span>}
          {rightIcon && <span className={cn('flex-shrink-0', iconSize)}>{rightIcon}</span>}
        </>
      );
    };

    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(
          buttonVariants({ variant, size, fullWidth, iconOnly }),
          showSuccess && 'bg-gradient-to-b from-green-500 to-green-600 text-white',
          className
        )}
        aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
        aria-busy={isLoading}
        aria-disabled={disabled}
        title={tooltip}
        onClick={handleClick}
        whileTap={!disabled ? { scale: 0.98 } : undefined}
        {...props}
      >
        {/* Button content */}
        {buttonContent()}

        {/* Ripple effects */}
        {ripples.map((ripple) => (
          <RippleEffect key={ripple.id} x={ripple.x} y={ripple.y} />
        ))}

        {/* Shine effect for primary buttons */}
        {(variant === 'primary' || variant === 'success' || variant === 'danger') && !disabled && (
          <motion.div
            className="absolute inset-0 rounded-inherit pointer-events-none overflow-hidden"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
          </motion.div>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

/**
 * Button Group Component - For related actions
 */
export const ButtonGroup = ({
  children,
  className,
  orientation = 'horizontal',
}: {
  children: ReactNode;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}) => (
  <div
    className={cn(
      'inline-flex',
      orientation === 'horizontal' ? 'flex-row space-x-2' : 'flex-col space-y-2',
      className
    )}
    role="group"
  >
    {children}
  </div>
);
