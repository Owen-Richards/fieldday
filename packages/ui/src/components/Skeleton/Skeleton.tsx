import { type FC } from 'react';
import { cn } from '../../foundations/utils';

export type SkeletonProps = {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  lines?: number;
};

export const Skeleton: FC<SkeletonProps> = ({
  className,
  variant = 'text',
  width,
  height,
  lines = 1,
}) => {
  const baseStyles =
    'animate-pulse bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 dark:from-neutral-800 dark:via-neutral-700 dark:to-neutral-800 bg-[length:200%_100%]';

  const variantStyles = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              baseStyles,
              variantStyles[variant],
              index === lines - 1 && 'w-3/4',
              className
            )}
            style={style}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(baseStyles, variantStyles[variant], className)}
      style={style}
      aria-busy="true"
      aria-live="polite"
    />
  );
};

export const SkeletonCard: FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        'rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6 space-y-4',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <Skeleton variant="rectangular" width="60%" height={24} />
          <Skeleton variant="text" width="40%" />
        </div>
        <Skeleton variant="circular" width={48} height={48} />
      </div>
      <Skeleton variant="text" lines={3} />
      <div className="flex gap-2">
        <Skeleton variant="rectangular" width={80} height={32} />
        <Skeleton variant="rectangular" width={100} height={32} />
      </div>
    </div>
  );
};

export const SkeletonGrid: FC<{ count?: number; className?: string }> = ({
  count = 3,
  className,
}) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};
