'use client';

import { type FC } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Users } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

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
  organizerName?: string;
  organizerPhoto?: string;
  organizerReliability: number;
  imageUrl: string; // Now required - photography-first
  vibe?: string; // "Competitive", "Casual", "Social", etc.
};

type SessionCardProps = {
  session: Session;
  onJoin?: (sessionId: string) => void;
  onViewDetails?: (sessionId: string) => void;
  isLoading?: boolean;
  className?: string;
};

const formatTime = (dateString: string): { day: string; time: string } => {
  const date = new Date(dateString);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const isTomorrow = new Date(now.getTime() + 86400000).toDateString() === date.toDateString();

  const time = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  let day: string;
  if (isToday) {
    day = 'TODAY';
  } else if (isTomorrow) {
    day = 'TOMORROW';
  } else {
    day = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  }

  return { day, time };
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
  const isAlmostFull = spotsLeft <= 2 && spotsLeft > 0;
  const fillPercentage = (session.registered / session.capacity) * 100;
  const { day, time } = formatTime(session.startTime);

  return (
    <motion.article
      className={cn(
        'group bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden',
        'shadow-md hover:shadow-2xl transition-all duration-300',
        'cursor-pointer',
        className
      )}
      whileHover={{ y: -4 }}
      onClick={() => onViewDetails?.(session.id)}
    >
      {/* Hero Image - Large and immersive */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={session.imageUrl}
          alt={session.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Sport badge - top left */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-sm font-bold text-neutral-900 shadow-md">
            {session.sport}
          </span>
        </div>

        {/* Time indicator - bottom left, large and prominent */}
        <div className="absolute bottom-4 left-4 text-white">
          <p className="text-sm font-semibold opacity-90 tracking-wide">{day}</p>
          <p className="text-2xl font-bold leading-tight">{time}</p>
        </div>

        {/* Vibe badge - bottom right */}
        {session.vibe && (
          <div className="absolute bottom-4 right-4">
            <span className="px-3 py-1.5 bg-brand-primary-500/95 backdrop-blur-sm rounded-full text-sm font-semibold text-white shadow-md">
              {session.vibe}
            </span>
          </div>
        )}

        {/* Urgency indicator */}
        {isAlmostFull && !isFull && (
          <div className="absolute top-4 right-4">
            <motion.span
              className="px-3 py-1.5 bg-brand-primary-500 rounded-full text-sm font-bold text-white shadow-lg"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🔥 {spotsLeft} spot{spotsLeft === 1 ? '' : 's'} left!
            </motion.span>
          </div>
        )}
      </div>

      {/* Content section */}
      <div className="p-6 space-y-4">
        {/* Title and location */}
        <div>
          <h3 className="font-bold text-xl text-neutral-900 dark:text-white line-clamp-1 mb-1">
            {session.title}
          </h3>
          <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm line-clamp-1">{session.venue.name}</span>
            {session.venue.distance && (
              <span className="text-sm">• {session.venue.distance.toFixed(1)} mi</span>
            )}
          </div>
        </div>

        {/* Organizer with trust score - Prominent trust indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {session.organizerPhoto ? (
              <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-brand-accent-500/20">
                <Image
                  src={session.organizerPhoto}
                  alt={session.organizerName || 'Organizer'}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-primary-400 to-brand-accent-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {session.organizerName?.[0] || 'O'}
                </span>
              </div>
            )}
            <div>
              <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                {session.organizerName || 'Organizer'}
              </p>
              <div className="flex items-center gap-1">
                <svg
                  className="w-3.5 h-3.5 text-brand-accent-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xs font-medium text-brand-accent-600 dark:text-brand-accent-400">
                  {session.organizerReliability}% reliable
                </span>
              </div>
            </div>
          </div>

          {/* Skill level badge */}
          {session.skillLevel && (
            <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full">
              Level {session.skillLevel}
            </span>
          )}
        </div>

        {/* Capacity visualization - Progress bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-neutral-900 dark:text-white">
              {isFull ? (
                <span className="text-neutral-500 dark:text-neutral-400">Session Full</span>
              ) : isAlmostFull ? (
                <span className="text-brand-primary-500">Almost full!</span>
              ) : (
                <span>
                  {spotsLeft} spot{spotsLeft === 1 ? '' : 's'} available
                </span>
              )}
            </span>
            <span className="text-sm text-neutral-600 dark:text-neutral-400 flex items-center gap-1">
              <Users className="w-4 h-4" />
              {session.registered}/{session.capacity}
            </span>
          </div>

          {/* Visual progress bar with animation */}
          <div className="h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
            <motion.div
              className={cn(
                'h-full rounded-full',
                isFull
                  ? 'bg-neutral-400 dark:bg-neutral-600'
                  : isAlmostFull
                    ? 'bg-brand-primary-500'
                    : 'bg-brand-accent-500'
              )}
              initial={{ width: 0 }}
              animate={{ width: `${fillPercentage}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800">
          <div>
            <span className="text-3xl font-bold text-neutral-900 dark:text-white">
              ${session.price}
            </span>
            <span className="text-sm text-neutral-500 dark:text-neutral-400 ml-1">/player</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onJoin?.(session.id);
            }}
            disabled={isFull || isLoading}
            className={cn(
              'px-6 py-3 rounded-full font-bold transition-all duration-200 shadow-md',
              'hover:shadow-lg transform hover:scale-105',
              isFull
                ? 'bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 cursor-not-allowed hover:scale-100'
                : 'bg-brand-primary-500 hover:bg-brand-primary-600 text-white'
            )}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
                Joining...
              </span>
            ) : isFull ? (
              'Join Waitlist'
            ) : (
              'Join Game'
            )}
          </button>
        </div>
      </div>
    </motion.article>
  );
};

// Reliability Badge Component - Standalone for reuse
type ReliabilityBadgeProps = {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
};

export const ReliabilityBadge: FC<ReliabilityBadgeProps> = ({
  score,
  size = 'md',
  showLabel = false,
  className,
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 90)
      return {
        bg: 'bg-brand-accent-100 dark:bg-brand-accent-900/30',
        text: 'text-brand-accent-700 dark:text-brand-accent-300',
        border: 'border-brand-accent-300 dark:border-brand-accent-700',
      };
    if (score >= 70)
      return {
        bg: 'bg-brand-sky-100 dark:bg-brand-sky-900/30',
        text: 'text-brand-sky-700 dark:text-brand-sky-300',
        border: 'border-brand-sky-300 dark:border-brand-sky-700',
      };
    if (score >= 50)
      return {
        bg: 'bg-brand-primary-100 dark:bg-brand-primary-900/30',
        text: 'text-brand-primary-700 dark:text-brand-primary-300',
        border: 'border-brand-primary-300 dark:border-brand-primary-700',
      };
    return {
      bg: 'bg-neutral-100 dark:bg-neutral-800',
      text: 'text-neutral-700 dark:text-neutral-300',
      border: 'border-neutral-300 dark:border-neutral-600',
    };
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 70) return 'Reliable';
    if (score >= 50) return 'Fair';
    return 'Building Trust';
  };

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  };

  const { bg, text, border } = getScoreColor(score);

  return (
    <motion.div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border-2 font-bold',
        bg,
        text,
        border,
        sizeClasses[size],
        className
      )}
      whileHover={{ scale: 1.05 }}
      title={`Reliability Score: ${score}/100 - ${getScoreLabel(score)}`}
    >
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
      <span className="font-bold">{score}</span>
      {showLabel && <span className="ml-0.5 font-medium">{getScoreLabel(score)}</span>}
    </motion.div>
  );
};
