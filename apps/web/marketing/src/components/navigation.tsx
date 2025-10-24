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
      name: 'Adult Pickup Games',
      href: '/solutions/pickup',
      description: 'Find and join games instantly',
    },
    {
      name: 'Water Sports Partners',
      href: '/solutions/water-sports',
      description: 'Match with trusted partners',
    },
    {
      name: 'Youth Sports',
      href: '/solutions/youth',
      description: 'Family logistics made simple',
    },
    {
      name: 'Facility Management',
      href: '/solutions/facilities',
      description: 'Optimize your venue',
    },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Trust & Safety', href: '/trust' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
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
          ? 'bg-white/80 backdrop-blur-md border-b border-neutral-200 dark:bg-neutral-900/80 dark:border-neutral-800'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-primary-500 to-brand-accent-500" />
              <span className="text-xl font-bold text-neutral-900 dark:text-white">FieldDay</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <div className="relative group">
              <button className="flex items-center space-x-1 text-sm font-medium text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white">
                <span>Solutions</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {/* Dropdown */}
              <div className="absolute left-0 mt-2 w-72 origin-top-left opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="rounded-2xl bg-white p-4 shadow-xl ring-1 ring-black ring-opacity-5 dark:bg-neutral-800">
                  {navigation.solutions.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block rounded-lg px-3 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                    >
                      <p className="text-sm font-medium text-neutral-900 dark:text-white">
                        {item.name}
                      </p>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        {item.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {navigation.company.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            )}

            {/* Desktop CTA */}
            <div className="hidden md:flex md:items-center md:space-x-3">
              <Link
                href="/login"
                className="text-sm font-medium text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-brand-primary-500 to-brand-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-brand-primary-400 hover:to-brand-primary-500 hover:shadow-md transition-all duration-200"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-neutral-200 dark:border-neutral-800 mt-2"
            >
              <div className="space-y-1 pb-4 pt-2">
                {navigation.solutions.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-base font-medium text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="my-2 border-t border-neutral-200 dark:border-neutral-800" />
                {navigation.company.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-base font-medium text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="mt-4 space-y-2 px-3">
                  <Link
                    href="/login"
                    className="block w-full rounded-xl border border-neutral-300 bg-white px-4 py-2 text-center text-base font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup"
                    className="block w-full rounded-xl bg-gradient-to-r from-brand-primary-500 to-brand-primary-600 px-4 py-2 text-center text-base font-medium text-white shadow-sm hover:from-brand-primary-400 hover:to-brand-primary-500"
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
