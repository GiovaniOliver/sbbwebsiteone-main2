/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
      'platform-lookaside.fbsbx.com',
      'xsgames.co',
      'supabase.co',
      'supabase.com',
      'rnfvzaelmwbbvfbsppir.supabase.co',
      'localhost',
      'i.pravatar.cc'
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000"]
    },
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        punycode: false,
      };
    }
    return config;
  },
}

module.exports = nextConfig