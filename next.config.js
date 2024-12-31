/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'img.clerk.com',
      'maximum-gelding-62.clerk.accounts.dev',
    ],
  },
  // Ensure public directory is accessible
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
      bodySizeLimit: '2mb'
    },
    typedRoutes: true,
  },
};

module.exports = nextConfig;