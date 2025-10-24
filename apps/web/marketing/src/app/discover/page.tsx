'use client';

import { useState } from 'react';
import { MapPin, Calendar, Dumbbell } from 'lucide-react';
import { SessionCard, type Session } from '@/components/session-card';
import { FilterSelect } from '@/components/custom-select';

// Mock data for demonstration - Photography-first design
const mockSessions: Session[] = [
  {
    id: '1',
    title: 'Pickup Soccer at Marina Green',
    sport: 'Soccer',
    venue: {
      name: 'Marina Green Fields',
      distance: 1.2,
    },
    startTime: new Date(Date.now() + 7200000).toISOString(), // 2 hours from now
    capacity: 20,
    registered: 17,
    price: 15,
    skillLevel: '5-7',
    organizerName: 'Marcus Chen',
    organizerPhoto:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    organizerReliability: 95,
    imageUrl:
      'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&h=600&fit=crop&q=80',
    vibe: 'Competitive',
  },
  {
    id: '2',
    title: 'Early Morning Basketball Run',
    sport: 'Basketball',
    venue: {
      name: 'Mission Rec Center',
      distance: 0.8,
    },
    startTime: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    capacity: 10,
    registered: 8,
    price: 10,
    skillLevel: '6-8',
    organizerName: 'Jamal Thompson',
    organizerPhoto:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    organizerReliability: 88,
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop&q=80',
    vibe: 'Casual',
  },
  {
    id: '3',
    title: 'Beginner Volleyball Clinic',
    sport: 'Volleyball',
    venue: {
      name: 'Ocean Beach Courts',
      distance: 3.5,
    },
    startTime: new Date(Date.now() + 172800000).toISOString(), // 2 days from now
    capacity: 12,
    registered: 5,
    price: 20,
    skillLevel: '1-3',
    organizerName: 'Sarah Kim',
    organizerPhoto:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    organizerReliability: 92,
    imageUrl:
      'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&h=600&fit=crop&q=80',
    vibe: 'Social',
  },
  {
    id: '4',
    title: 'Tennis Doubles Mixer',
    sport: 'Tennis',
    venue: {
      name: 'Golden Gate Park Courts',
      distance: 2.1,
    },
    startTime: new Date(Date.now() + 10800000).toISOString(), // 3 hours from now
    capacity: 8,
    registered: 8,
    price: 25,
    skillLevel: '4-6',
    organizerName: 'David Martinez',
    organizerReliability: 78,
    imageUrl: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=600&fit=crop&q=80',
    vibe: 'Social',
  },
  {
    id: '5',
    title: 'Sunday Morning Yoga',
    sport: 'Yoga',
    venue: {
      name: 'Dolores Park',
      distance: 1.5,
    },
    startTime: new Date(Date.now() + 259200000).toISOString(), // 3 days from now
    capacity: 15,
    registered: 10,
    price: 12,
    organizerName: 'Emma Rodriguez',
    organizerPhoto:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    organizerReliability: 97,
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop&q=80',
    vibe: 'Relaxed',
  },
  {
    id: '6',
    title: 'Competitive Pickup Basketball',
    sport: 'Basketball',
    venue: {
      name: 'Presidio YMCA',
      distance: 2.8,
    },
    startTime: new Date(Date.now() + 14400000).toISOString(), // 4 hours from now
    capacity: 10,
    registered: 9,
    price: 18,
    skillLevel: '7-9',
    organizerName: 'Alex Johnson',
    organizerPhoto:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop',
    organizerReliability: 91,
    imageUrl:
      'https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?w=800&h=600&fit=crop&q=80',
    vibe: 'Competitive',
  },
];

export default function DiscoverPage() {
  const [sport, setSport] = useState('all');
  const [distance, setDistance] = useState('5');
  const [timeFilter, setTimeFilter] = useState('anytime');

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Discover Sessions
          </h1>
          <p className="mt-2 text-lg text-neutral-600 dark:text-neutral-400">
            Find and join trusted sports sessions near you
          </p>
        </div>

        {/* Filter bar with clean dropdowns */}
        <div className="mb-8 flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <FilterSelect
              value={sport}
              onChange={(value) => setSport(value)}
              icon={<Dumbbell className="w-5 h-5" strokeWidth={2} />}
              options={[
                { value: 'all', label: 'All Sports' },
                { value: 'soccer', label: 'Soccer' },
                { value: 'basketball', label: 'Basketball' },
                { value: 'tennis', label: 'Tennis' },
                { value: 'volleyball', label: 'Volleyball' },
                { value: 'yoga', label: 'Yoga' },
              ]}
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <FilterSelect
              value={distance}
              onChange={(value) => setDistance(value)}
              icon={<MapPin className="w-5 h-5" strokeWidth={2} />}
              options={[
                { value: '5', label: 'Within 5 miles' },
                { value: '10', label: 'Within 10 miles' },
                { value: '25', label: 'Within 25 miles' },
                { value: '50', label: 'Within 50 miles' },
              ]}
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <FilterSelect
              value={timeFilter}
              onChange={(value) => setTimeFilter(value)}
              icon={<Calendar className="w-5 h-5" strokeWidth={2} />}
              options={[
                { value: 'anytime', label: 'Anytime' },
                { value: 'today', label: 'Today' },
                { value: 'tomorrow', label: 'Tomorrow' },
                { value: 'this-week', label: 'This Week' },
                { value: 'this-weekend', label: 'This Weekend' },
              ]}
            />
          </div>

          <div className="ml-auto flex items-center gap-2 px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
            <span className="text-sm font-semibold text-brand-primary-600 dark:text-brand-primary-400">
              {mockSessions.length}
            </span>
            <span className="text-sm text-neutral-600 dark:text-neutral-400">sessions found</span>
          </div>
        </div>

        {/* Sessions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockSessions.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              onJoin={(id) => console.log('Join session:', id)}
              onViewDetails={(id) => console.log('View details:', id)}
            />
          ))}
        </div>

        {/* Load more */}
        <div className="mt-12 text-center">
          <button className="px-6 py-3 rounded-xl border-2 border-brand-primary-200 bg-white text-brand-primary-600 font-semibold hover:bg-brand-primary-50 hover:border-brand-primary-300 transition-all duration-200 dark:bg-neutral-800 dark:text-brand-primary-400 dark:border-brand-primary-800 dark:hover:bg-neutral-700">
            Load More Sessions
          </button>
        </div>
      </div>
    </div>
  );
}
