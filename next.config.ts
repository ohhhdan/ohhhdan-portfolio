import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  serverExternalPackages: ['pdfkit'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
