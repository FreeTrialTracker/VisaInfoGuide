import { Metadata } from 'next';
import TripVisaFinder from '@/components/TripVisaFinder';
import LatestVisaNews from '@/components/news/LatestVisaNews';
import LatestBlogPosts from '@/components/blog/LatestBlogPosts';
import HomeNavCards from '@/components/HomeNavCards';

export const metadata: Metadata = {
  title: 'Visa Requirements by Passport (2026) | VisaInfoGuide',
  description: 'Check visa requirements, visa-free access, and entry rules by passport. Compare stay limits and Schengen 90/180 rules. Updated 2026.',
  alternates: {
    canonical: 'https://visainfoguide.com/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Visa Requirements by Passport (2026) | VisaInfoGuide',
    description: 'Check visa requirements, visa-free access, and entry rules by passport. Compare stay limits and Schengen 90/180 rules. Updated 2026.',
    type: 'website',
    url: 'https://visainfoguide.com/',
    images: [
      {
        url: 'https://visainfoguide.com/og/home-og',
        width: 1200,
        height: 630,
        alt: 'VisaInfoGuide - Visa Requirements by Passport',
      },
    ],
    siteName: 'VisaInfoGuide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visa Requirements by Passport (2026) | VisaInfoGuide',
    description: 'Check visa requirements, visa-free access, and entry rules by passport. Compare stay limits and Schengen 90/180 rules. Updated 2026.',
    images: ['/og/home-og'],
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight leading-tight" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              Visa<span className="text-teal-500">Info</span>Guide.com
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium">
              Plan your multi-destination trip and check visa requirements
            </p>
          </div>

          <TripVisaFinder />

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              Planning a trip? Check visa requirements for multiple destinations in your itinerary.
            </p>
          </div>

          <HomeNavCards />

          <LatestVisaNews />

          <LatestBlogPosts />
        </div>
      </div>
    </div>
  );
}
