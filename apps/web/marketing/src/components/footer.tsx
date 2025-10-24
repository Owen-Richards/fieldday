import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-primary-500 to-brand-accent-500" />
              <span className="text-xl font-bold text-neutral-900 dark:text-white">FieldDay</span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Play anything, anywhere, with people you trust.
            </p>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-4">
              Solutions
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/solutions/pickup"
                  className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  Pickup Games
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/water-sports"
                  className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  Water Sports
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/youth"
                  className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  Youth Sports
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/facilities"
                  className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  Facilities
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/trust"
                  className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  Trust & Safety
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-neutral-200 dark:border-neutral-800 pt-8">
          <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
            © {currentYear} FieldDay. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
