import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  airportTransitHotels,
  getAirportBySlug,
  getRelatedAirports,
} from '@/lib/data/airportTransitHotels';
import { canonicalUrl } from '@/lib/seo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Breadcrumbs from '@/components/Breadcrumbs';
import { MapPin, Shield, Clock, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Building2, ChevronRight } from 'lucide-react';

export const revalidate = 86400;

export async function generateStaticParams() {
  return airportTransitHotels.map((airport) => ({ slug: airport.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const airport = getAirportBySlug(params.slug);
  if (!airport) return { title: 'Not Found' };

  const title = `${airport.airportName} Transit Hotels – VisaInfoGuide`;
  const description = `${airport.hotelName} at ${airport.airportName} (${airport.iataCode}) in ${airport.city}, ${airport.country}. ${airport.airsideOrLandside} hotel. Transit visa guidance and layover planning advice.`;
  const pageUrl = canonicalUrl(`/airport-transit-hotels/${params.slug}`);

  return {
    title,
    description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title,
      description,
      type: 'website',
      url: pageUrl,
      siteName: 'VisaInfoGuide',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

function AirsideBadge({ value }: { value: string }) {
  if (value === 'Airside') {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-sm font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
        Airside
      </span>
    );
  }
  if (value === 'Landside') {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-sm font-semibold bg-amber-50 text-amber-700 border border-amber-200">
        Landside
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-sm font-semibold bg-blue-50 text-blue-700 border border-blue-200">
      Both (Airside &amp; Landside)
    </span>
  );
}

export default function AirportTransitHotelDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const airport = getAirportBySlug(params.slug);
  if (!airport) notFound();

  const relatedAirports = getRelatedAirports(airport.relatedAirports);

  const webpageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${airport.airportName} Transit Hotels`,
    description: `${airport.hotelName} at ${airport.airportName} in ${airport.city}. ${airport.airsideOrLandside} hotel with transit visa and layover guidance.`,
    url: canonicalUrl(`/airport-transit-hotels/${params.slug}`),
    publisher: {
      '@type': 'Organization',
      name: 'VisaInfoGuide',
      url: 'https://visainfoguide.com',
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://visainfoguide.com' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Airport Transit Hotels',
        item: canonicalUrl('/airport-transit-hotels'),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: airport.airportName,
        item: canonicalUrl(`/airport-transit-hotels/${params.slug}`),
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: airport.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Breadcrumbs
            items={[
              { name: 'Airport Transit Hotels', url: '/airport-transit-hotels' },
              { name: airport.airportName, url: `/airport-transit-hotels/${params.slug}` },
            ]}
          />

          <div className="mt-6 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm font-bold text-gray-400 tracking-widest uppercase bg-gray-100 px-2.5 py-1 rounded-md">
                {airport.iataCode}
              </span>
              <span className="text-sm text-gray-500">{airport.city}, {airport.country}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {airport.airportName} Transit Hotels
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
              {airport.summary}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
            <h2 className="text-base font-semibold text-gray-700 mb-4 uppercase tracking-wide text-xs">
              Quick Reference
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
              <div>
                <dt className="text-gray-400 text-xs uppercase tracking-wide mb-1">Hotel</dt>
                <dd className="font-semibold text-gray-900">{airport.hotelName}</dd>
              </div>
              <div>
                <dt className="text-gray-400 text-xs uppercase tracking-wide mb-1">Hotel Type</dt>
                <dd className="text-gray-700">{airport.hotelType}</dd>
              </div>
              <div>
                <dt className="text-gray-400 text-xs uppercase tracking-wide mb-1">Access</dt>
                <dd>
                  <AirsideBadge value={airport.airsideOrLandside} />
                </dd>
              </div>
              <div>
                <dt className="text-gray-400 text-xs uppercase tracking-wide mb-1">Terminal Connection</dt>
                <dd className="flex items-center gap-1.5 text-gray-700">
                  {airport.connectedToTerminal ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span>Directly connected</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-amber-500" />
                      <span>Separate building</span>
                    </>
                  )}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-gray-400 text-xs uppercase tracking-wide mb-1">Terminal Location</dt>
                <dd className="text-gray-700">{airport.terminalLocation}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-gray-400 text-xs uppercase tracking-wide mb-1">Transit Visa Note</dt>
                <dd className="text-gray-700 leading-relaxed">{airport.transitVisaNote}</dd>
              </div>
            </dl>
          </div>

          <div className="space-y-6 mb-10">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Hotel Location Inside the Airport</h2>
              <div className="bg-white border border-gray-200 rounded-xl p-5 text-gray-600 leading-relaxed text-sm">
                <p>
                  <strong>{airport.hotelName}</strong> is located at {airport.terminalLocation}.{' '}
                  {airport.connectedToTerminal
                    ? 'The hotel is directly connected to the terminal, allowing guests to move between the hotel and departure areas without going outdoors.'
                    : 'The hotel requires a transfer from the main terminal building.'}
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Airside or Landside Access</h2>
              <div className="bg-white border border-gray-200 rounded-xl p-5 text-sm">
                <div className="flex items-start gap-3">
                  {airport.airsideOrLandside === 'Airside' ? (
                    <Shield className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  ) : airport.airsideOrLandside === 'Landside' ? (
                    <MapPin className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Building2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="text-gray-600 leading-relaxed space-y-2">
                    {airport.airsideOrLandside === 'Airside' && (
                      <>
                        <p>
                          <strong className="text-emerald-700">{airport.hotelName}</strong> is an airside
                          property. It is located within the secure departure zone and is accessible after
                          passing through security screening. Guests do not need to clear immigration or
                          customs to reach the hotel.
                        </p>
                        <p>
                          This makes it accessible to most transit passengers without requiring entry to{' '}
                          {airport.country}. However, transit visa requirements may still apply for certain
                          nationalities — see the transit visa note above.
                        </p>
                      </>
                    )}
                    {airport.airsideOrLandside === 'Landside' && (
                      <>
                        <p>
                          <strong className="text-amber-700">{airport.hotelName}</strong> is a landside
                          property. Reaching it requires clearing {airport.country} immigration and customs.
                          Guests are considered to have entered {airport.country} for the duration of their
                          hotel stay.
                        </p>
                        <p>
                          Transit visa requirements, visa-on-arrival policies, and visa-free arrangements for{' '}
                          {airport.country} all apply. Check your eligibility before booking. After checkout,
                          you will need to pass through security screening again before your departure gate.
                        </p>
                        <p className="font-medium text-amber-800">
                          Check official {airport.country} immigration guidance before booking a landside
                          stay.
                        </p>
                      </>
                    )}
                    {airport.airsideOrLandside === 'Both' && (
                      <p>
                        This property has both airside and landside access points depending on the terminal
                        zone. Check with the hotel directly for guidance on which access route applies to your
                        connection.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Who This Hotel Is Best For</h2>
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <ul className="space-y-2">
                  {airport.bestFor.map((item, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Transit Visa Considerations</h2>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-900 leading-relaxed space-y-2">
                    <p>{airport.transitVisaNote}</p>
                    <p>
                      Transit visa requirements depend on your passport, itinerary, and whether you leave the
                      secure transit zone. This note is general guidance only. Always verify requirements with
                      official government sources before booking.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Layover Planning Tips</h2>
              <div className="bg-white border border-gray-200 rounded-xl p-5 text-sm text-gray-600 leading-relaxed">
                <p>{airport.layoverAdvice}</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Booking Advice</h2>
              <div className="bg-white border border-gray-200 rounded-xl p-5 text-sm text-gray-600 leading-relaxed">
                <p>{airport.bookingAdvice}</p>
              </div>
            </section>
          </div>

          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-5">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {airport.faq.map((item, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-5">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">{item.question}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {relatedAirports.length > 0 && (
            <div className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Related Airport Hotels</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedAirports.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/airport-transit-hotels/${related.slug}`}
                    className="group flex items-center justify-between gap-3 bg-white border border-gray-200 rounded-xl p-4 hover:border-teal-300 hover:shadow-sm transition-all"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">
                          {related.iataCode}
                        </span>
                        {related.airsideOrLandside === 'Airside' ? (
                          <span className="text-xs text-emerald-600 font-medium">Airside</span>
                        ) : related.airsideOrLandside === 'Both' ? (
                          <span className="text-xs text-blue-600 font-medium">Both</span>
                        ) : (
                          <span className="text-xs text-amber-600 font-medium">Landside</span>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-teal-700 transition-colors truncate">
                        {related.airportName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {related.city}, {related.country}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-teal-500 transition-colors flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related Travel Planning</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="grid sm:grid-cols-2 gap-2">
                <Link
                  href="/airport-transit-hotels"
                  className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-teal-50 transition-colors group text-sm"
                >
                  <Building2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  <span className="text-gray-700 group-hover:text-teal-700">
                    Airport Transit Hotels Directory
                  </span>
                </Link>
                <Link
                  href="/visa-guides"
                  className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-teal-50 transition-colors group text-sm"
                >
                  <Shield className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  <span className="text-gray-700 group-hover:text-teal-700">
                    Visa Guides &amp; Entry Requirements
                  </span>
                </Link>
                <Link
                  href="/visa-guides/country-entry-requirements"
                  className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-teal-50 transition-colors group text-sm"
                >
                  <MapPin className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  <span className="text-gray-700 group-hover:text-teal-700">
                    Country Entry Requirements
                  </span>
                </Link>
                <Link
                  href="/tools/schengen-calculator"
                  className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-teal-50 transition-colors group text-sm"
                >
                  <Clock className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  <span className="text-gray-700 group-hover:text-teal-700">
                    Schengen 90/180 Day Calculator
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="mb-8 bg-blue-50 border border-blue-200 rounded-xl p-5">
            <p className="text-sm text-gray-700">
              <strong>Disclaimer:</strong> Hotel access rules, transit visa requirements, and airport
              facilities change frequently. The information on this page is general guidance only. Always
              verify current requirements with official immigration authorities, your airline, and the hotel
              directly before booking.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
