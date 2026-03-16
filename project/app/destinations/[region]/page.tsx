import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Globe, ArrowRight } from 'lucide-react';
import { canonicalUrl } from '@/lib/seo';
import {
  getRegionBySlug,
  getDestinationsForRegion,
  getAllRegionSlugs,
  REGIONS,
  type DestinationRegion,
} from '@/lib/countries';
import { getAllDestinationSlugs as getEntryDestinationSlugs } from '@/lib/destination-entry-data';

interface Props {
  params: { region: string };
}

export async function generateStaticParams() {
  return getAllRegionSlugs().map((region) => ({ region }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const region = getRegionBySlug(params.region);
  if (!region) return { title: 'Not Found', robots: { index: false, follow: false } };

  return {
    title: `${region.name} Visa Requirements & Entry Rules (2026) | VisaInfoGuide`,
    description: region.description,
    alternates: { canonical: canonicalUrl(`/destinations/${region.slug}`) },
    openGraph: {
      title: `${region.name} Destinations — Visa Requirements 2026`,
      description: region.description,
      url: canonicalUrl(`/destinations/${region.slug}`),
      type: 'website',
      siteName: 'VisaInfoGuide',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${region.name} Visa Requirements 2026 | VisaInfoGuide`,
      description: region.description,
    },
    robots: { index: true, follow: true },
  };
}

export default function RegionHubPage({ params }: Props) {
  const region = getRegionBySlug(params.region as DestinationRegion);
  if (!region) notFound();

  const destinations = getDestinationsForRegion(region.slug);
  const entryDestinationSlugs = new Set(getEntryDestinationSlugs());

  const otherRegions = REGIONS.filter((r) => r.slug !== region.slug);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://visainfoguide.com' },
      { '@type': 'ListItem', position: 2, name: 'Destinations', item: 'https://visainfoguide.com/resources' },
      { '@type': 'ListItem', position: 3, name: region.name, item: canonicalUrl(`/destinations/${region.slug}`) },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${region.name} Visa Requirements 2026`,
    description: region.description,
    url: canonicalUrl(`/destinations/${region.slug}`),
    publisher: {
      '@type': 'Organization',
      name: 'VisaInfoGuide.com',
      url: 'https://visainfoguide.com',
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="bg-gradient-to-b from-teal-50 to-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-10 max-w-6xl">
            <nav className="text-sm text-gray-500 mb-4">
              <Link href="/" className="hover:text-teal-600 transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/resources" className="hover:text-teal-600 transition-colors">Destinations</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">{region.name}</span>
            </nav>
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-8 h-8 text-teal-600" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                {region.name} Visa Requirements
              </h1>
            </div>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">{region.intro}</p>
            <div className="mt-4 text-sm text-gray-500">
              {destinations.length} destinations in this region
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-10 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {destinations.map((dest) => {
              const hasEntryGuide = entryDestinationSlugs.has(dest.slug);
              return (
                <div key={dest.slug} className="bg-white border border-gray-200 rounded-lg p-5 hover:border-teal-400 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <h2 className="text-lg font-semibold text-gray-900">{dest.name}</h2>
                    <MapPin className="w-4 h-4 text-teal-500 mt-1 flex-shrink-0" />
                  </div>
                  <div className="space-y-2">
                    <Link
                      href={`/destination/${dest.slug}`}
                      className="flex items-center gap-2 text-sm text-teal-600 hover:text-teal-700 font-medium group"
                    >
                      Visa requirements by passport
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                    {hasEntryGuide && (
                      <Link
                        href={`/visa-guides/country-entry-requirements/${dest.slug}-2026`}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-teal-600 group"
                      >
                        Entry requirements guide
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Check Your Specific Requirements</h2>
            <p className="text-gray-700 mb-4">
              Use the Trip Visa Finder to check your exact visa requirements for any destination in {region.name} based on your passport.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors">
                Trip Visa Finder
              </Link>
              <Link href="/compare" className="inline-flex items-center gap-2 px-4 py-2 bg-white text-teal-600 font-medium rounded-lg border-2 border-teal-600 hover:bg-teal-50 transition-colors">
                Compare Passports
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-5">Explore Other Regions</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {otherRegions.map((r) => (
                <Link
                  key={r.slug}
                  href={`/destinations/${r.slug}`}
                  className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-teal-400 hover:shadow-sm transition-all"
                >
                  <div className="font-semibold text-gray-900 mb-1">{r.name}</div>
                  <div className="text-sm text-gray-500 line-clamp-2">{r.description}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
