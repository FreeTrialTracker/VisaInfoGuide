/** @type {import('next').NextConfig} */

const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).host
  : '*.supabase.co';

const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  `connect-src 'self' https://${supabaseHost} https://www.google-analytics.com https://analytics.google.com`,
  "img-src 'self' data: blob: https://images.pexels.com https://www.google-analytics.com https://www.googletagmanager.com https://www.brandpush.co",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join('; ');

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Content-Security-Policy", value: csp },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
        ],
      },
      {
        source: "/:all*(png|jpg|jpeg|svg|gif|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/visa-requirements/us-citizens/china',
        destination: '/passport/united-states/destination/china',
        permanent: true,
      },
      {
        source: '/visa-requirements/us-citizens',
        destination: '/passport/united-states',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/sitemap_index.xml',
        destination: '/sitemap-index.xml',
      },
      {
        source: '/category-sitemap.xml',
        destination: '/sitemap-hubs.xml',
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/photos/**',
      },
    ],
  },
};

module.exports = nextConfig;
