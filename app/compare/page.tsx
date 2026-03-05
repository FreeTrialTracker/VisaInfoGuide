import { Metadata } from 'next';
import CompareClient from '@/components/compare/CompareClient';
import Breadcrumbs from '@/components/Breadcrumbs';

export const dynamic = 'force-static';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Compare Passports: Visa-Free Access (2026) | VisaInfoGuide',
    description: 'Compare two passports by visa-free access, visa-on-arrival, eVisa options, and travel requirements. Updated for 2026.',
    alternates: {
      canonical: 'https://visainfoguide.com/compare',
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Compare Passports: Visa-Free Access (2026) | VisaInfoGuide',
      description: 'Compare two passports by visa-free access, visa-on-arrival, eVisa options, and travel requirements. Updated for 2026.',
      url: 'https://visainfoguide.com/compare',
      type: 'website',
      images: [
        {
          url: 'https://visainfoguide.com/og/compare-og',
          width: 1200,
          height: 630,
          alt: 'Compare Passports - VisaInfoGuide',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Compare Passports: Visa-Free Access (2026) | VisaInfoGuide',
      description: 'Compare two passports by visa-free access, visa-on-arrival, eVisa options, and travel requirements. Updated for 2026.',
      images: ['https://visainfoguide.com/og/compare-og'],
    },
  };
}

export default function ComparePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://visainfoguide.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Compare',
                item: 'https://visainfoguide.com/compare',
              },
            ],
          }),
        }}
      />
      <div className="container mx-auto px-4 pt-6 max-w-7xl">
        <Breadcrumbs items={[{ name: 'Compare Passports', url: '/compare' }]} />
      </div>
      <CompareClient />
    </>
  );
}
