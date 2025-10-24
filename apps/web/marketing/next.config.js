/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@fieldday/ui', '@fieldday/shared'],
  images: {
    domains: ['images.unsplash.com', 'cdn.fieldday.app'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  env: {
    API_URL: process.env.API_URL,
  },
};

module.exports = nextConfig;
