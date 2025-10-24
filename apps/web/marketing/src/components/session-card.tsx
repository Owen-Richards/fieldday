'use client';

import { type FC } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Clock, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Inline Badge component
const Badge: FC<{
  children: React.ReactNode;
  variant?: 'default' | 'warning' | 'soft';
  size?: 'sm' | 'md';
  className?: string;
}> = ({ children, variant = 'default', size = 'md', className }) => {
  const variantStyles = {
    default:
      'bg-neutral-100 text-neutral-700 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-300',
    warning:
      'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300',
    soft: 'bg-neutral-100/50 text-neutral-600 border-neutral-200/50 dark:bg-neutral-800/50 dark:text-neutral-400',
  };
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-lg border',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
};

export type Session = {
  id: string;
  title: string;
  sport: string;
  venue: {
    name: string;
    distance?: number;
  };
  startTime: string;
  capacity: number;
  registered: number;
  price: number;
  skillLevel?: string;
  organizerReliability: number;
  imageUrl?: string;
};

type SessionCardProps = {
  session: Session;
  onJoin?: (sessionId: string) => void;
  onViewDetails?: (sessionId: string) => void;
  isLoading?: boolean;
  className?: string;
};

const getSportEmoji = (sport: string): string => {
  const emojis: Record<string, string> = {
    Soccer: '⚽',
    Basketball: '🏀',
    Tennis: '🎾',
    Volleyball: '🏐',
    Baseball: '⚾',
    Surfing: '🏄',
    Swimming: '🏊',
    Running: '🏃',
    Cycling: '🚴',
    Yoga: '🧘',
  };
  return emojis[sport] || '🏃';
};

const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const isTomorrow = new Date(now.getTime() + 86400000).toDateString() === date.toDateString();

  const time = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  if (isToday) return `Today at ${time}`;
  if (isTomorrow) return `Tomorrow at ${time}`;

  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};

export const SessionCard: FC<SessionCardProps> = ({
  session,
  onJoin,
  onViewDetails,
  isLoading = false,
  className,
}) => {
  const spotsLeft = session.capacity - session.registered;
  const isFull = spotsLeft <= 0;
  const isUrgent = spotsLeft <= 3 && spotsLeft > 0;

  return (
    <motion.article
      className={cn(
        'group relative bg-white dark:bg-neutral-800',
        'rounded-2xl shadow-sm hover:shadow-xl',
        'border border-neutral-200 dark:border-neutral-700',
        'transition-all duration-300',
        'overflow-hidden',
        className
      )}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Gradient accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-primary-500 to-brand-accent-500" />

      {/* Image/Map preview */}
      <div className="relative h-32 bg-gradient-to-br from-brand-primary-100 to-brand-accent-100 dark:from-brand-primary-900 dark:to-brand-accent-900">
        {session.imageUrl ? (
          <img
            src={session.imageUrl}
            alt={session.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-6xl">{getSportEmoji(session.sport)}</span>
          </div>
        )}

        {/* Reliability badge overlay */}
        <div className="absolute top-2 right-2">
          <ReliabilityBadge score={session.organizerReliability} size="sm" />
        </div>

        {/* Urgency badge */}
        {isUrgent && (
          <div className="absolute top-2 left-2">
            <Badge variant="warning" size="sm" className="animate-pulse-slow">
              {spotsLeft} spots left!
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title and sport */}
        <div>
          <h3 className="font-bold text-lg text-neutral-900 dark:text-white line-clamp-1">
            {session.title}
          </h3>
          <Badge variant="soft" size="sm" className="mt-1">
            {session.sport}
          </Badge>
        </div>

        {/* Key details with icons */}
        <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-neutral-400" />
            <span>{formatTime(session.startTime)}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-neutral-400" />
            <span className="line-clamp-1">
              {session.venue.name}
              {session.venue.distance && ` • ${session.venue.distance.toFixed(1)}mi`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-neutral-400" />
            <span>
              {session.registered}/{session.capacity} players
              {session.skillLevel && ` • Level ${session.skillLevel}`}
            </span>
          </div>
        </div>

        {/* Price and action */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-700">
          <div>
            <span className="text-2xl font-bold text-neutral-900 dark:text-white">
              ${session.price}
            </span>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">/player</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onViewDetails?.(session.id)}
              className="px-3 py-1.5 text-sm font-medium text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white transition-colors"
            >
              Details
            </button>
            <button
              onClick={() => onJoin?.(session.id)}
              disabled={isFull || isLoading}
              className={cn(
                'px-4 py-1.5 text-sm font-semibold rounded-lg transition-all duration-200',
                isFull
                  ? 'bg-neutral-200 text-neutral-500 cursor-not-allowed dark:bg-neutral-700 dark:text-neutral-400'
                  : 'bg-gradient-to-r from-brand-primary-500 to-brand-primary-600 text-white hover:from-brand-primary-400 hover:to-brand-primary-500 hover:shadow-md'
              )}
            >
              {isLoading ? 'Joining...' : isFull ? 'Join Waitlist' : 'Join Now'}
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

type ReliabilityBadgeProps = {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
};

export const ReliabilityBadge: FC<ReliabilityBadgeProps> = ({
  score,
  size = 'md',
  showLabel = false,
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 90)
      return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800';
    if (score >= 70)
      return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800';
    if (score >= 50)
      return 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800';
    return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Fair';
    return 'Needs Improvement';
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  return (
    <motion.div
      className={cn(
        'inline-flex items-center gap-1 rounded-full border font-medium',
        getScoreColor(score),
        sizeClasses[size]
      )}
      whileHover={{ scale: 1.05 }}
      title={`Reliability Score: ${score}/100`}
    >
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
      <span className="font-bold">{score}</span>
      {showLabel && <span className="ml-1">{getScoreLabel(score)}</span>}
    </motion.div>
  );
};
