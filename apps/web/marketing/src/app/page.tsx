import Link from 'next/link';
import { ArrowRight, Zap, Shield, Users, Calendar, Star, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-primary-50 via-white to-white dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32 relative">
          <div className="text-center">
            {/* Trust badge */}
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium">
              <Star className="w-4 h-4 fill-current" />
              <span>Trusted by 50,000+ players nationwide</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-6xl lg:text-7xl">
              Play Anything, Anywhere,
              <br />
              <span className="bg-gradient-to-r from-brand-primary-500 to-brand-accent-500 bg-clip-text text-transparent">
                With People You Trust
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Sports OS unifying adult pickup, partner-finding, youth logistics, and facility
              inventory through a trust-first platform. Find games in &lt;20s.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
              <Link
                href="/discover"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-brand-primary-500 to-brand-primary-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:from-brand-primary-400 hover:to-brand-primary-500 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              >
                Discover Sessions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center rounded-xl border-2 border-brand-primary-200 bg-white px-8 py-4 text-lg font-semibold text-brand-primary-600 hover:bg-brand-primary-50 hover:border-brand-primary-300 transition-all duration-200 dark:bg-neutral-800 dark:text-brand-primary-400 dark:border-brand-primary-800 dark:hover:bg-neutral-700"
              >
                Watch Demo
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-neutral-900 dark:text-white">50K+</div>
                <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  Active Players
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-neutral-900 dark:text-white">&lt;200ms</div>
                <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  Discovery Time
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-neutral-900 dark:text-white">95%</div>
                <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  Show-up Rate
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-neutral-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
              Everything you need to play sports
            </h2>
            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
              Built for players, organizers, parents, and facilities
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Feature 1 */}
            <div className="group relative bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-brand-primary-500 to-brand-primary-600 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                Instant Discovery
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Find and join games in under 20 seconds with our sub-200ms discovery engine
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group relative bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                Trust-First
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Reliability scores (0-100) track attendance, punctuality, and safety
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group relative bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-brand-accent-500 to-brand-accent-600 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                Family OS
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Multi-child logistics with carpool coordination and volunteer scheduling
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group relative bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                Smart Scheduling
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                AI-powered scheduling with weather conditions and auto-calendar sync
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-brand-primary-500 to-brand-accent-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to start playing?
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Join thousands of players finding trusted games every day
            </p>
            <div className="mt-10">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-semibold text-brand-primary-600 shadow-lg hover:bg-neutral-50 transition-all duration-200"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
