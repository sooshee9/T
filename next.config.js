/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disabled static export to enable SSR/ISR and dynamic routes
  images: {
    domains: ['firebasestorage.googleapis.com'], // For Firebase Storage images
  },
  experimental: {
    serverActions: true, // Enable if using Next.js server actions with Firebase
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
