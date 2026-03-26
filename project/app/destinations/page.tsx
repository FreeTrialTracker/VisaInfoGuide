import { Metadata } from 'next';
import Link from 'next/link';
import { Globe, ArrowRight } from 'lucide-react';
import { canonicalUrl } from '@/lib/seo';
import { REGIONS, getDestinationsForRegion } from '@/lib/countries';

export const metadata: Metadata = {
  title: 'Visa Requirements by Destination & Region 2026 | VisaInfoGuide',
  description: 'Explore visa requirements and entry rules by geographic region. Browse destinations across Europe, Asia, the Americas, Africa, the Middle East, and Oceania — with stay limits, passport validity rules, and eVisa options.',
  alternates: { canonical: canonicalUrl('/destinations') },
  openGraph: {
    title: 'Browse Destinations by Region | VisaInfoGuide',
    description: 'Explore visa requirements for destinations across Europe, Asia, Americas, Africa, Middle East, and Oceania.',
    url: canonicalUrl('/destinations'),
    type: 'website',
    siteName: 'VisaInfoGuide',
  },
  robots: { index: true, follow: true },
};

export default function DestinationsIndexPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://visainfoguide.com' },
      { '@type': 'ListItem', position: 2, name: 'Destinations', item: 'https://visainfoguide.com/destinations' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="bg-gradient-to-b from-teal-50 to-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-10 max-w-6xl">
            <nav className="text-sm text-gray-500 mb-4">
              <Link href="/" className="hover:text-teal-600 transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">Destinations</span>
            </nav>
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-8 h-8 text-teal-600" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Browse Destinations</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl">
              Explore visa requirements and entry rules for destinations worldwide. Select a region to browse all available destinations and their specific entry requirements by passport.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-10 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {REGIONS.map((region) => {
              const destinations = getDestinationsForRegion(region.slug);
              return (
                <Link
                  key={region.slug}
                  href={`/destinations/${region.slug}`}
                  className="block bg-white border border-gray-200 rounded-xl p-6 hover:border-teal-400 hover:shadow-md transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h2 className="text-xl font-bold text-gray-900">{region.name}</h2>
                    <ArrowRight className="w-5 h-5 text-teal-500 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{region.description}</p>
                  <div className="text-sm font-medium text-teal-600">
                    {destinations.length} destinations
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Check Your Visa Requirements</h2>
            <p className="text-gray-700 mb-4">
              Use the Trip Visa Finder to check exact requirements for any destination based on your specific passport.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors">
                Trip Visa Finder
              </Link>
              <Link href="/resources" className="inline-flex items-center gap-2 px-4 py-2 bg-white text-teal-600 font-medium rounded-lg border-2 border-teal-600 hover:bg-teal-50 transition-colors">
                Browse by Passport
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
