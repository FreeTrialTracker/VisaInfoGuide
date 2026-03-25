import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/_next/', '/_next/static/', '/_next/image/', '/images/', '/assets/'],
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://visainfoguide.com/sitemap.xml',
  };
}
