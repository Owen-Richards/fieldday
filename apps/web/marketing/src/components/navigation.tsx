'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = {
  solutions: [
    {
      name: 'Pickup Games',
      href: '/solutions/pickup',
      description: 'Find your next game in seconds',
      emoji: '⚽',
    },
    {
      name: 'Water Sports',
      href: '/solutions/water-sports',
      description: 'Connect with trusted partners',
      emoji: '🏄',
    },
    {
      name: 'Youth Sports',
      href: '/solutions/youth',
      description: 'Family logistics made simple',
      emoji: '👨‍👩‍👧‍👦',
    },
    {
      name: 'Facilities',
      href: '/solutions/facilities',
      description: 'Optimize your venue',
      emoji: '🏟️',
    },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Trust & Safety', href: '/trust' },
    { name: 'Stories', href: '/stories' },
    { name: 'Join Us', href: '/careers' },
  ],
};

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-lg border-b border-brand-sand-200 dark:bg-neutral-900/95 dark:border-neutral-800 shadow-sm'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo - Warmer, more approachable */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-brand-primary-500 to-brand-accent-500 shadow-md group-hover:shadow-lg transition-shadow duration-200" />
              <span className="text-xl font-bold bg-gradient-to-r from-brand-primary-600 to-brand-accent-600 bg-clip-text text-transparent dark:from-brand-primary-400 dark:to-brand-accent-400">
                FieldDay
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Cleaner, warmer tones */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {/* Solutions Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-sm font-semibold text-neutral-700 hover:text-brand-primary-600 dark:text-neutral-300 dark:hover:text-brand-primary-400 transition-colors">
                <span>Solutions</span>
                <ChevronDown className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
              </button>

              {/* Enhanced Dropdown with warm styling */}
              <div className="absolute left-0 mt-3 w-80 origin-top-left opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                <div className="rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-brand-sand-200 dark:bg-neutral-800 dark:ring-neutral-700">
                  {navigation.solutions.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="group/item flex items-start gap-3 rounded-xl px-4 py-3 hover:bg-brand-sand-50 dark:hover:bg-neutral-700 transition-all duration-200"
                    >
                      <span className="text-2xl mt-0.5">{item.emoji}</span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-neutral-900 dark:text-white group-hover/item:text-brand-primary-600 dark:group-hover/item:text-brand-primary-400 transition-colors">
                          {item.name}
                        </p>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  ))}

                  {/* CTA in dropdown */}
                  <div className="mt-2 pt-2 border-t border-brand-sand-200 dark:border-neutral-700">
                    <Link
                      href="/discover"
                      className="flex items-center justify-between rounded-xl px-4 py-3 bg-gradient-to-r from-brand-primary-500 to-brand-accent-500 hover:from-brand-primary-400 hover:to-brand-accent-400 transition-all duration-200 group/cta"
                    >
                      <span className="text-sm font-bold text-white">Find Games Now</span>
                      <svg
                        className="w-4 h-4 text-white group-hover/cta:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Links - More human labels */}
            {navigation.company.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold text-neutral-700 hover:text-brand-primary-600 dark:text-neutral-300 dark:hover:text-brand-primary-400 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side buttons - Warmer styling */}
          <div className="flex items-center space-x-3">
            {/* Theme toggle - Softer styling */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2.5 rounded-xl hover:bg-brand-sand-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            )}

            {/* Desktop CTA - Warm, inviting buttons */}
            <div className="hidden md:flex md:items-center md:space-x-3">
              <Link
                href="/login"
                className="text-sm font-semibold text-neutral-700 hover:text-brand-primary-600 dark:text-neutral-300 dark:hover:text-brand-primary-400 transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full bg-brand-primary-500 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-brand-primary-600 hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu button - Warmer styling */}
            <button
              type="button"
              className="md:hidden p-2.5 rounded-xl hover:bg-brand-sand-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu - Enhanced with warm styling */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-brand-sand-200 dark:border-neutral-800 mt-2"
            >
              <div className="space-y-1 pb-4 pt-2">
                {/* Solutions with emojis */}
                <div className="px-3 py-2 text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
                  Solutions
                </div>
                {navigation.solutions.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-base font-semibold text-neutral-700 hover:bg-brand-sand-50 hover:text-brand-primary-600 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-brand-primary-400 transition-all"
                  >
                    <span className="text-xl">{item.emoji}</span>
                    <div>
                      <div>{item.name}</div>
                      <div className="text-xs font-normal text-neutral-500 dark:text-neutral-400">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                ))}

                <div className="my-3 border-t border-brand-sand-200 dark:border-neutral-800" />

                {/* Company links */}
                <div className="px-3 py-2 text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
                  Company
                </div>
                {navigation.company.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block rounded-xl px-3 py-3 text-base font-semibold text-neutral-700 hover:bg-brand-sand-50 hover:text-brand-primary-600 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-brand-primary-400 transition-all"
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Mobile CTAs - Warm styling */}
                <div className="mt-4 space-y-2 px-3">
                  <Link
                    href="/login"
                    className="block w-full rounded-full border-2 border-brand-sand-300 bg-white px-4 py-3 text-center text-base font-bold text-neutral-700 hover:bg-brand-sand-50 hover:border-brand-primary-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700 transition-all"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup"
                    className="block w-full rounded-full bg-gradient-to-r from-brand-primary-500 to-brand-accent-500 px-4 py-3 text-center text-base font-bold text-white shadow-lg hover:from-brand-primary-400 hover:to-brand-accent-400 hover:shadow-xl transition-all"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
