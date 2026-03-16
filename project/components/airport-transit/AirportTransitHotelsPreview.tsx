import Link from 'next/link';
import { airportTransitHotels } from '@/lib/data/airportTransitHotels';
import { ArrowRight, Building2 } from 'lucide-react';
import AirportCountrySearch from './AirportCountrySearch';

const FEATURED_SLUGS = [
  'doha-hamad-international-airport',
  'dubai-international-airport',
  'singapore-changi-airport',
  'paris-charles-de-gaulle-airport',
  'london-heathrow-airport',
  'seoul-incheon-airport',
];

function AirsideBadge({ value }: { value: string }) {
  if (value === 'Airside') {
    return (
      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
        Airside
      </span>
    );
  }
  if (value === 'Landside') {
    return (
      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
        Landside
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
      Both
    </span>
  );
}

export default function AirportTransitHotelsPreview() {
  const featured = FEATURED_SLUGS.map((slug) =>
    airportTransitHotels.find((a) => a.slug === slug)
  ).filter(Boolean);

  return (
    <section aria-label="Airport Transit Hotels" className="mt-12">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-teal-600" />
          <h2 className="text-xl font-bold text-gray-900">Airport Transit Hotels</h2>
        </div>
        <Link
          href="/airport-transit-hotels"
          className="flex items-center gap-1 text-sm font-semibold text-teal-600 hover:text-teal-800 transition-colors"
        >
          View all airports
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      <p className="text-sm text-gray-500 mb-3">
        In-terminal and airside hotel options at major transit hubs, with visa guidance.
      </p>
      <AirportCountrySearch className="mb-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {featured.map((airport) => {
          if (!airport) return null;
          return (
            <Link
              key={airport.slug}
              href={`/airport-transit-hotels/${airport.slug}`}
              className="group flex flex-col bg-white border border-gray-200 rounded-xl p-4 hover:border-teal-300 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">
                  {airport.iataCode}
                </span>
                <AirsideBadge value={airport.airsideOrLandside} />
              </div>
              <p className="text-sm font-semibold text-gray-900 group-hover:text-teal-700 transition-colors leading-snug mb-0.5">
                {airport.airportName}
              </p>
              <p className="text-xs text-gray-500 mb-2">
                {airport.city}, {airport.country}
              </p>
              <p className="text-xs text-gray-500 mt-auto">{airport.hotelName}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
