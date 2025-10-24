import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Clock, Users, ChevronRight, Play, Star } from 'lucide-react';

export default function Home() {
  return (
    <>
      {/* Hero Section - Full viewport, immersive */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Hero background image - real people playing */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1920&h=1080&fit=crop"
            alt="Group playing basketball at sunset"
            fill
            className="object-cover"
            priority
            quality={85}
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </div>

        {/* Hero content */}
        <div className="relative h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Small intro text */}
            <p className="text-brand-sand-200 text-lg font-medium tracking-wide uppercase mb-4 animate-fade-in">
              Your neighborhood sports community
            </p>

            {/* Main headline - human, inviting */}
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl text-white leading-none mb-6 animate-fade-up">
              STOP WATCHING.
              <br />
              <span className="text-brand-primary-400">START PLAYING.</span>
            </h1>

            {/* Supporting text - conversational */}
            <p className="text-xl sm:text-2xl text-white/90 max-w-2xl mx-auto mb-8 font-light">
              Real games. Real people. Right in your neighborhood. No more scrolling through dead
              group chats.
            </p>

            {/* CTA group */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/discover"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-brand-primary-500 hover:bg-brand-primary-600 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl group btn-shine"
              >
                Find Your Game
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full transition-all duration-200 border border-white/30">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </button>
            </div>

            {/* Trust indicator - no fake numbers */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white/20 bg-gradient-to-br from-brand-primary-400 to-brand-accent-500 animate-pulse-slow"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
              <p className="text-sm">Join early players from Google, Stanford, Nike</p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/60 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* The Problem - Editorial Style */}
      <section className="py-24 bg-brand-sand-50 dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Story */}
            <div className="space-y-6">
              <h2 className="font-editorial text-4xl lg:text-5xl text-neutral-900 dark:text-white leading-tight">
                Remember when finding a game was
                <span className="text-brand-primary-500"> actually easy?</span>
              </h2>

              <div className="space-y-4 text-lg text-neutral-700 dark:text-neutral-300 font-light">
                <p>
                  You used to just show up at the park. The same crew was always there. Tuesday
                  nights, Saturday mornings – everyone just knew.
                </p>
                <p>
                  But life got complicated. People moved. Schedules changed. Now it's 47 messages in
                  a group chat just to figure out who's actually coming.
                </p>
                <p className="font-medium text-neutral-900 dark:text-white text-xl">
                  We're bringing back the simplicity. With people who actually show up.
                </p>
              </div>

              {/* Mini testimonial */}
              <blockquote className="mt-8 pl-6 border-l-4 border-brand-primary-400 bg-white dark:bg-neutral-800 p-6 rounded-r-xl shadow-sm">
                <p className="text-lg italic text-neutral-800 dark:text-neutral-200 mb-2">
                  "First time in 5 years I'm playing twice a week consistently. It's changed
                  everything."
                </p>
                <footer className="flex items-center gap-3 mt-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary-400 to-brand-accent-500" />
                  <div>
                    <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                      Marcus Chen
                    </p>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">
                      Software Engineer, SF
                    </p>
                  </div>
                </footer>
              </blockquote>
            </div>

            {/* Right: Collage of real moments */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-96 rounded-2xl overflow-hidden card-lift">
                  <Image
                    src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=600&h=800&fit=crop"
                    alt="Players high-fiving after game"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <div className="relative h-44 rounded-2xl overflow-hidden card-lift">
                    <Image
                      src="https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=600&h=400&fit=crop"
                      alt="Sunrise workout session in park"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-48 rounded-2xl overflow-hidden card-lift">
                    <Image
                      src="https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=600&h=400&fit=crop"
                      alt="Soccer team celebrating"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Floating stat card */}
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-6 animate-float">
                <div className="text-3xl font-bold text-brand-primary-500">{'<'} 2min</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  to find & join a game
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Visual Timeline */}
      <section className="py-24 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl text-neutral-900 dark:text-white mb-4">
              THREE TAPS TO THE COURT
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              No endless browsing. No flaky people. Just games that actually happen.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative group">
              <div className="aspect-[4/5] relative rounded-2xl overflow-hidden mb-6 card-lift">
                <Image
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=600&h=750&fit=crop"
                  alt="App showing nearby games"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 left-4 w-12 h-12 bg-brand-primary-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  1
                </div>
              </div>
              <h3 className="font-display text-2xl text-neutral-900 dark:text-white mb-2">
                OPEN THE APP
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Games near you, right now. See who's playing, skill level, and reliability scores.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="aspect-[4/5] relative rounded-2xl overflow-hidden mb-6 card-lift">
                <Image
                  src="https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?q=80&w=600&h=750&fit=crop"
                  alt="Joining a game"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 left-4 w-12 h-12 bg-brand-primary-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  2
                </div>
              </div>
              <h3 className="font-display text-2xl text-neutral-900 dark:text-white mb-2">
                TAP TO JOIN
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                One tap reserves your spot. Payment handled. Calendar updated. Group chat created.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative group">
              <div className="aspect-[4/5] relative rounded-2xl overflow-hidden mb-6 card-lift">
                <Image
                  src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=600&h=750&fit=crop"
                  alt="People playing basketball"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 left-4 w-12 h-12 bg-brand-primary-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  3
                </div>
              </div>
              <h3 className="font-display text-2xl text-neutral-900 dark:text-white mb-2">
                SHOW UP & PLAY
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Everyone's there because our trust system works. Real games with committed players.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Emotional, Action-Oriented */}
      <section className="relative py-32 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1920&h=1080&fit=crop"
            alt="Basketball game at sunset"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        </div>

        {/* Content */}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-5xl lg:text-7xl text-white mb-6">
            YOUR GAME IS WAITING
          </h2>
          <p className="text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
            Stop scrolling. Start playing. Join the community that shows up.
          </p>

          {/* Email capture for early access */}
          <div className="max-w-md mx-auto">
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 focus:outline-none focus:bg-white/20 focus:border-white/50 transition-all"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-brand-primary-500 hover:bg-brand-primary-600 text-white font-bold rounded-full transition-colors shadow-lg hover:shadow-xl btn-shine"
              >
                Get Early Access
              </button>
            </form>
            <p className="mt-4 text-sm text-white/60">
              Be first when we launch in your city. No spam, ever.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
