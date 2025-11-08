import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
      },
    ],
  },
  // No changes needed here, but showing for context.
  // The actual change is in tailwind.config.ts
};

export default nextConfig;
