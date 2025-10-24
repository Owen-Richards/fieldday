import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-sand-200 dark:border-neutral-800 bg-brand-sand-50 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand - Larger, more prominent */}
          <div className="lg:col-span-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-primary-500 to-brand-accent-500 shadow-md" />
              <span className="text-2xl font-bold bg-gradient-to-r from-brand-primary-600 to-brand-accent-600 bg-clip-text text-transparent dark:from-brand-primary-400 dark:to-brand-accent-400">
                FieldDay
              </span>
            </div>
            <p className="text-base text-neutral-700 dark:text-neutral-300 mb-6 font-medium">
              Play anything, anywhere, with people you trust.
            </p>
            
            {/* Social Links - Community-focused */}
            <div className="flex items-center space-x-3">
              <a
                href="https://instagram.com/fieldday"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-neutral-800 border-2 border-brand-sand-300 dark:border-neutral-700 hover:border-brand-primary-400 dark:hover:border-brand-primary-500 transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 text-neutral-700 dark:text-neutral-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com/fieldday"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-neutral-800 border-2 border-brand-sand-300 dark:border-neutral-700 hover:border-brand-primary-400 dark:hover:border-brand-primary-500 transition-all hover:scale-110"
                aria-label="Twitter/X"
              >
                <svg className="w-5 h-5 text-neutral-700 dark:text-neutral-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com/fieldday"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-neutral-800 border-2 border-brand-sand-300 dark:border-neutral-700 hover:border-brand-primary-400 dark:hover:border-brand-primary-500 transition-all hover:scale-110"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 text-neutral-700 dark:text-neutral-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links Grid - More compact, human labels */}
          <div className="lg:col-span-8 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {/* Play */}
            <div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-4 uppercase tracking-wide">
                Play
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/discover"
                    className="text-sm text-neutral-700 hover:text-brand-primary-600 dark:text-neutral-400 dark:hover:text-brand-primary-400 transition-colors font-medium"
                  >
                    Find Games
                  </Link>
                </li>
                <li>
                  <Link
                    href="/solutions/pickup"
                    className="text-sm text-neutral-700 hover:text-brand-primary-600 dark:text-neutral-400 dark:hover:text-brand-primary-400 transition-colors font-medium"
                  >
                    Pickup Sports
                  </Link>
                </li>
                <li>
                  <Link
                    href="/solutions/water-sports"
                    className="text-sm text-neutral-700 hover:text-brand-primary-600 dark:text-neutral-400 dark:hover:text-brand-primary-400 transition-colors font-medium"
                  >
                    Water Sports
                  </Link>
                </li>
                <li>
                  <Link
                    href="/solutions/youth"
                    className="text-sm text-neutral-700 hover:text-brand-primary-600 dark:text-neutral-400 dark:hover:text-brand-primary-400 transition-colors font-medium"
                  >
                    Youth & Family
                  </Link>
                </li>
              </ul>
            </div>

            {/* Organize */}
            <div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-4 uppercase tracking-wide">
                Organize
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/host"
                    className="text-sm text-neutral-700 hover:text-brand-primary-600 dark:text-neutral-400 dark:hover:text-brand-primary-400 transition-colors font-medium"
                  >
                    Host Games
                  </Link>
                </li>
                <li>
                  <Link
                    href="/solutions/facilities"
                    className="text-sm text-neutral-700 hover:text-brand-primary-600 dark:text-neutral-400 dark:hover:text-brand-primary-400 transition-colors font-medium"
                  >
                    For Facilities
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-sm text-neutral-700 hover:text-brand-primary-600 dark:text-neutral-400 dark:hover:text-brand-primary-400 transition-colors font-medium"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-4 uppercase tracking-wide">
                Community
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/stories"
                    className="text-sm text-neutral-700 hover:text-brand-primary-600 dark:text-neutral-400 dark:hover:text-brand-primary-400 transition-colors font-medium"
                  >
                    Player Stories
                  </Link>
                </li>
                <li>
                  <Link
                    href="/trust"
                    className="text-sm text-neutral-700 hover:text-brand-primary-600 dark:text-neutral-400 dark:hover:text-brand-primary-400 transition-colors font-medium"
                  >
                    Trust & Safety
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-neutral-700 hover:text-brand-primary-600 dark:text-neutral-400 dark:hover:text-brand-primary-400 transition-colors font-medium"
                  >
                    Our Mission
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-sm text-neutral-700 hover:text-brand-primary-600 dark:text-neutral-400 dark:hover:text-brand-primary-400 transition-colors font-medium"
                  >
                    Join the Team
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-4 uppercase tracking-wide">
                Support
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/help"
                    className="text-sm text-neutral-700 hover:text-brand-primary-600 dark:text-neutral-400 dark:hover:text-brand-primary-400 transition-colors font-medium"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-neutral-700 hover:text-brand-primary-600 dark:text-neutral-400 dark:hover:text-brand-primary-400 transition-colors font-medium"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-neutral-700 hover:text-brand-primary-600 dark:text-neutral-400 dark:hover:text-brand-primary-400 transition-colors font-medium"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-neutral-700 hover:text-brand-primary-600 dark:text-neutral-400 dark:hover:text-brand-primary-400 transition-colors font-medium"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Warmer, more human */}
        <div className="mt-12 pt-8 border-t border-brand-sand-300 dark:border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              © {currentYear} FieldDay. Made with ❤️ for athletes everywhere.
            </p>
            
            {/* Trust Badge */}
            <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
              <svg className="w-5 h-5 text-brand-accent-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Trust-First Platform</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
