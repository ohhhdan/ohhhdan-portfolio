import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Docker/NAS self-hosting needs standalone; Vercel uses its own output.
  ...(process.env.VERCEL ? {} : { output: 'standalone' as const }),
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
