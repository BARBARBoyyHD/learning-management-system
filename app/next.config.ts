import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable React Compiler temporarily - compatibility issues with React 19
  // reactCompiler: true,

  // Turbopack configuration (Next.js 16 default)
  // Note: Disabled lucide-react optimization due to React 19 compatibility issues
  experimental: {
    // Optimize server components
    optimizePackageImports: ['@tanstack/react-query'],
  },

  // Configure headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
