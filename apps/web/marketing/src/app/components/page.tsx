'use client';

import { useState } from 'react';
import { Select, FilterSelect } from '@/components/select';
import { MapPin, Calendar, Dumbbell, Users, DollarSign, Clock } from 'lucide-react';

export default function ComponentsPage() {
  const [value1, setValue1] = useState('option1');
  const [value2, setValue2] = useState('medium');
  const [value3, setValue3] = useState('react');

  const basicOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
  ];

  const sizeOptions = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ];

  const techOptions = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Select Components
          </h1>
          <p className="mt-2 text-lg text-neutral-600 dark:text-neutral-400">
            Showcase of all dropdown variants and customizations
          </p>
        </div>

        {/* Variants Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-white">Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Default */}
            <div>
              <Select
                label="Default Variant"
                variant="default"
                options={basicOptions}
                value={value1}
                onChange={(e) => setValue1(e.target.value)}
              />
            </div>

            {/* Filled */}
            <div>
              <Select
                label="Filled Variant"
                variant="filled"
                options={basicOptions}
                value={value1}
                onChange={(e) => setValue1(e.target.value)}
              />
            </div>

            {/* Outlined */}
            <div>
              <Select
                label="Outlined Variant"
                variant="outlined"
                options={basicOptions}
                value={value1}
                onChange={(e) => setValue1(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Sizes Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-white">Sizes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Small */}
            <div>
              <Select
                label="Small Size"
                size="sm"
                variant="filled"
                options={sizeOptions}
                value={value2}
                onChange={(e) => setValue2(e.target.value)}
              />
            </div>

            {/* Medium */}
            <div>
              <Select
                label="Medium Size (Default)"
                size="md"
                variant="filled"
                options={sizeOptions}
                value={value2}
                onChange={(e) => setValue2(e.target.value)}
              />
            </div>

            {/* Large */}
            <div>
              <Select
                label="Large Size"
                size="lg"
                variant="filled"
                options={sizeOptions}
                value={value2}
                onChange={(e) => setValue2(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* With Icons Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-white">With Icons</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Select
                label="Location"
                variant="filled"
                icon={<MapPin className="w-5 h-5" strokeWidth={2} />}
                options={[
                  { value: 'sf', label: 'San Francisco' },
                  { value: 'ny', label: 'New York' },
                  { value: 'la', label: 'Los Angeles' },
                ]}
              />
            </div>

            <div>
              <Select
                label="Sport"
                variant="filled"
                icon={<Dumbbell className="w-5 h-5" strokeWidth={2} />}
                options={[
                  { value: 'soccer', label: 'Soccer' },
                  { value: 'basketball', label: 'Basketball' },
                  { value: 'tennis', label: 'Tennis' },
                ]}
              />
            </div>

            <div>
              <Select
                label="Time"
                variant="filled"
                icon={<Calendar className="w-5 h-5" strokeWidth={2} />}
                options={[
                  { value: 'today', label: 'Today' },
                  { value: 'tomorrow', label: 'Tomorrow' },
                  { value: 'week', label: 'This Week' },
                ]}
              />
            </div>
          </div>
        </section>

        {/* States Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-white">States</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Normal */}
            <div>
              <Select
                label="Normal State"
                variant="filled"
                options={techOptions}
                value={value3}
                onChange={(e) => setValue3(e.target.value)}
                helperText="This is a helper text"
              />
            </div>

            {/* Disabled */}
            <div>
              <Select
                label="Disabled State"
                variant="filled"
                options={techOptions}
                value={value3}
                disabled
                helperText="This select is disabled"
              />
            </div>

            {/* Error */}
            <div>
              <Select
                label="Error State"
                variant="filled"
                options={techOptions}
                value={value3}
                onChange={(e) => setValue3(e.target.value)}
                error="Please select a valid option"
              />
            </div>
          </div>
        </section>

        {/* Filter Select Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-white">
            Filter Select (Convenience Component)
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Pre-configured select component optimized for filter bars with filled variant
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <FilterSelect
                icon={<Dumbbell className="w-5 h-5" strokeWidth={2} />}
                options={[
                  { value: 'all', label: 'All Sports' },
                  { value: 'soccer', label: 'Soccer' },
                  { value: 'basketball', label: 'Basketball' },
                  { value: 'tennis', label: 'Tennis' },
                ]}
              />
            </div>

            <div className="flex-1 min-w-[200px]">
              <FilterSelect
                icon={<MapPin className="w-5 h-5" strokeWidth={2} />}
                options={[
                  { value: '5', label: 'Within 5 miles' },
                  { value: '10', label: 'Within 10 miles' },
                  { value: '25', label: 'Within 25 miles' },
                ]}
              />
            </div>

            <div className="flex-1 min-w-[200px]">
              <FilterSelect
                icon={<Calendar className="w-5 h-5" strokeWidth={2} />}
                options={[
                  { value: 'anytime', label: 'Anytime' },
                  { value: 'today', label: 'Today' },
                  { value: 'tomorrow', label: 'Tomorrow' },
                ]}
              />
            </div>
          </div>
        </section>

        {/* Real-World Example */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-white">
            Real-World Example: Session Filters
          </h2>
          <div className="p-8 rounded-2xl bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-200 dark:border-neutral-700">
            <h3 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-white">
              Find Your Perfect Session
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Select
                label="Sport"
                variant="filled"
                icon={<Dumbbell className="w-5 h-5" strokeWidth={2} />}
                options={[
                  { value: 'all', label: 'All Sports' },
                  { value: 'soccer', label: '⚽ Soccer' },
                  { value: 'basketball', label: '🏀 Basketball' },
                  { value: 'tennis', label: '🎾 Tennis' },
                  { value: 'volleyball', label: '🏐 Volleyball' },
                  { value: 'yoga', label: '🧘 Yoga' },
                ]}
              />

              <Select
                label="Distance"
                variant="filled"
                icon={<MapPin className="w-5 h-5" strokeWidth={2} />}
                options={[
                  { value: '5', label: 'Within 5 miles' },
                  { value: '10', label: 'Within 10 miles' },
                  { value: '25', label: 'Within 25 miles' },
                  { value: '50', label: 'Within 50 miles' },
                ]}
              />

              <Select
                label="When"
                variant="filled"
                icon={<Calendar className="w-5 h-5" strokeWidth={2} />}
                options={[
                  { value: 'anytime', label: 'Anytime' },
                  { value: 'today', label: 'Today' },
                  { value: 'tomorrow', label: 'Tomorrow' },
                  { value: 'week', label: 'This Week' },
                  { value: 'weekend', label: 'This Weekend' },
                ]}
              />

              <Select
                label="Skill Level"
                variant="filled"
                icon={<Users className="w-5 h-5" strokeWidth={2} />}
                options={[
                  { value: 'all', label: 'All Levels' },
                  { value: '1-3', label: 'Beginner (1-3)' },
                  { value: '4-6', label: 'Intermediate (4-6)' },
                  { value: '7-9', label: 'Advanced (7-9)' },
                ]}
              />

              <Select
                label="Price Range"
                variant="filled"
                icon={<DollarSign className="w-5 h-5" strokeWidth={2} />}
                options={[
                  { value: 'any', label: 'Any Price' },
                  { value: '0-10', label: '$0 - $10' },
                  { value: '10-25', label: '$10 - $25' },
                  { value: '25+', label: '$25+' },
                ]}
              />

              <Select
                label="Duration"
                variant="filled"
                icon={<Clock className="w-5 h-5" strokeWidth={2} />}
                options={[
                  { value: 'any', label: 'Any Duration' },
                  { value: '30', label: '30 minutes' },
                  { value: '60', label: '1 hour' },
                  { value: '90', label: '1.5 hours' },
                  { value: '120', label: '2+ hours' },
                ]}
              />
            </div>

            <button className="mt-6 w-full px-6 py-3 rounded-xl bg-brand-primary-500 hover:bg-brand-primary-600 text-white font-semibold transition-colors duration-200 shadow-lg shadow-brand-primary-500/30">
              Search Sessions
            </button>
          </div>
        </section>

        {/* Code Example */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-white">
            Usage Example
          </h2>
          <div className="p-6 rounded-xl bg-neutral-900 dark:bg-neutral-950 border border-neutral-800">
            <pre className="text-sm text-neutral-100 overflow-x-auto">
              <code>{`import { Select, FilterSelect } from '@/components/select';
import { MapPin } from 'lucide-react';

// Basic usage
<Select
  label="Choose an option"
  variant="filled"
  size="md"
  options={[
    { value: 'opt1', label: 'Option 1' },
    { value: 'opt2', label: 'Option 2' },
  ]}
/>

// With icon
<Select
  variant="filled"
  icon={<MapPin className="w-5 h-5" strokeWidth={2} />}
  options={options}
/>

// Filter select (convenience)
<FilterSelect
  icon={<MapPin className="w-5 h-5" strokeWidth={2} />}
  options={options}
/>`}</code>
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
}
