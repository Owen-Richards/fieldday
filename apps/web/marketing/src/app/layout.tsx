import type { Metadata } from 'next';
import { Inter, Lora } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

// Editorial storytelling font
const lora = Lora({
  subsets: ['latin'],
  variable: '--font-editorial',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'FieldDay - Play Anything, Anywhere, With People You Trust',
  description:
    'Sports OS unifying adult pickup, partner-finding, youth logistics, and facility inventory through a trust-first platform.',
  keywords:
    'sports, pickup games, youth sports, water sports, facility management, trusted players',
  openGraph: {
    title: 'FieldDay - Your Sports OS',
    description: 'Play anything, anywhere, with people you trust',
    images: ['/og-image.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FieldDay - Your Sports OS',
    description: 'Play anything, anywhere, with people you trust',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${lora.variable} ${inter.className}`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
