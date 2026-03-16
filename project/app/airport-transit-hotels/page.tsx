import { Metadata } from 'next';
import Link from 'next/link';
import { canonicalUrl } from '@/lib/seo';
import { airportTransitHotels } from '@/lib/data/airportTransitHotels';
import { Building2, MapPin, Shield, Clock, Info, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Breadcrumbs from '@/components/Breadcrumbs';
import AirportCountrySearch from '@/components/airport-transit/AirportCountrySearch';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Airport Transit Hotels Directory – VisaInfoGuide',
  description:
    'Find airport transit hotels, in-terminal hotels, and terminal-connected layover accommodation around the world with practical transit and visa guidance.',
  alternates: {
    canonical: canonicalUrl('/airport-transit-hotels'),
  },
  openGraph: {
    title: 'Airport Transit Hotels Directory – VisaInfoGuide',
    description:
      'Find airport transit hotels, in-terminal hotels, and terminal-connected layover accommodation around the world with practical transit and visa guidance.',
    type: 'website',
    url: canonicalUrl('/airport-transit-hotels'),
    siteName: 'VisaInfoGuide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Airport Transit Hotels Directory – VisaInfoGuide',
    description:
      'Find airport transit hotels, in-terminal hotels, and terminal-connected layover accommodation around the world with practical transit and visa guidance.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const hubJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Airport Transit Hotels Directory',
  description:
    'A directory of airport transit hotels, in-terminal hotels, and terminal-connected layover accommodation around the world with transit and visa guidance.',
  url: canonicalUrl('/airport-transit-hotels'),
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
  ],
};

const faqs = [
  {
    question: 'What is an airport transit hotel?',
    answer:
      'An airport transit hotel is accommodation located inside or directly adjacent to an airport terminal, designed for travelers with layovers. Some are airside — inside the secure zone — while others are landside and require passing through immigration.',
  },
  {
    question: 'What is the difference between airside and landside airport hotels?',
    answer:
      'Airside hotels are located within the secure departure zone of an airport, meaning you can access them after passing security without clearing immigration or customs. Landside hotels are beyond the secure zone and typically require you to clear immigration and customs to reach them.',
  },
  {
    question: 'Can I stay in an airport hotel without clearing immigration?',
    answer:
      'Only if the hotel is airside. Airside hotels — such as the Oryx at Doha, YOTELAIR at Paris CDG, or the Dubai International Hotel — are accessible without immigration entry. Landside hotels always require immigration clearance.',
  },
  {
    question: 'Do I need a visa to use an airport hotel?',
    answer:
      'For airside hotels, most transit passengers do not need a visa, though some nationalities may still require an airport transit visa even for airside stays. For landside hotels, visa requirements of the host country apply. Always verify your specific requirements before booking.',
  },
  {
    question: 'Are airport hotels only for long layovers?',
    answer:
      'No. Many airport hotels offer hourly or day-use rates designed for short layovers of 3 to 6 hours. Some, like YOTELAIR, sell rooms by the hour. Even for a 4-hour layover, access to a shower and a private rest space can significantly improve your journey.',
  },
  {
    question: 'Are terminal-connected hotels the same as transit hotels?',
    answer:
      'Not exactly. A terminal-connected hotel is physically attached to the terminal building but may be landside. A transit hotel typically refers specifically to an airside facility accessible without immigration entry. The terms are sometimes used loosely — always check whether the specific hotel is airside or landside.',
  },
  {
    question: 'What happens if I book a landside airport hotel but I need a transit visa?',
    answer:
      'You may be denied entry at immigration. Always verify the transit visa requirements for your passport and the destination country before making any non-refundable hotel booking at a landside airport property.',
  },
  {
    question: 'How do I find out if I need a transit visa?',
    answer:
      'Transit visa requirements depend on your passport nationality, the airport, the country, and whether you are staying airside or entering the country. Check the official immigration website of the transit country or contact your airline before traveling.',
  },
  {
    question: 'Can I leave an airport and come back for my flight if I have a long layover?',
    answer:
      'In many countries, yes — provided you hold the appropriate visa or are visa-exempt. However, re-entry to the airside secure zone requires going through security screening again. Plan to arrive at the airport well before departure, accounting for queues.',
  },
  {
    question: 'Do all major hub airports have airside hotels?',
    answer:
      'No. Airside hotels are a relatively rare feature. Notable exceptions include Doha Hamad, Dubai Terminal 3, Paris CDG Terminal 2E, and Singapore Changi Terminal 1. Most airport hotels worldwide are landside.',
  },
];

function AirsideBadge({ value }: { value: string }) {
  if (value === 'Airside') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
        Airside
      </span>
    );
  }
  if (value === 'Landside') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
        Landside
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
      Both
    </span>
  );
}

export default function AirportTransitHotelsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hubJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <Breadcrumbs items={[{ name: 'Airport Transit Hotels', url: '/airport-transit-hotels' }]} />

          <div className="mt-6 mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Airport Transit Hotels Directory
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
              A practical reference guide to in-terminal, airside, and terminal-connected hotels at major
              airports worldwide. Includes transit visa notes and layover planning advice.
            </p>
          </div>

          <div className="prose prose-gray max-w-none mb-12">
            <div className="bg-white border border-gray-200 rounded-xl p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  What Are Airport Transit Hotels?
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Airport transit hotels are hotels located inside or immediately adjacent to airport terminal
                  buildings, purpose-built or adapted to serve travelers during layovers, connection waits, and
                  overnight stays between flights. Unlike hotels a taxi or bus ride away from the airport, a
                  transit hotel keeps you within or directly connected to the terminal, eliminating the need to
                  navigate unfamiliar cities, arrange ground transport, or factor in time for re-check-in.
                </p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  These hotels range from bare-essentials sleep pod facilities to full-service five-star hotels
                  with restaurants, fitness centers, and swimming pools. What they share is a single defining
                  advantage: proximity to your departure gate.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Airside vs Landside Airport Hotels
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  The most important distinction when choosing an airport transit hotel is whether it is{' '}
                  <strong>airside</strong> or <strong>landside</strong>.
                </p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  <strong>Airside hotels</strong> are located within the secure departure zone of the airport —
                  the area you enter after passing through security screening. To reach an airside hotel, you
                  check in, pass through security, and the hotel is directly accessible within the gate area.
                  Crucially, accessing an airside hotel does not require clearing immigration or customs. This
                  means you do not enter the host country and typically do not need a visa to the destination
                  country just to rest at the hotel. Airside hotels are the ideal choice for travelers who are
                  in transit between two international destinations and want to avoid immigration procedures
                  entirely.
                </p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  Examples of true airside transit hotels include the{' '}
                  <strong>Oryx Airport Hotel at Doha Hamad International</strong>,{' '}
                  <strong>YOTELAIR at Paris Charles de Gaulle Terminal 2E</strong>,{' '}
                  <strong>YOTELAIR at Singapore Changi Terminal 1</strong>, and the{' '}
                  <strong>Dubai International Hotel at Terminal 3</strong>. These are a relatively rare feature
                  in global aviation. Most major airports do not have airside hotel accommodation.
                </p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  <strong>Landside hotels</strong>, by contrast, are located beyond the customs and immigration
                  barrier. Reaching them requires clearing the immigration and customs procedures of the host
                  country. You exit the international arrivals zone, obtain your entry stamp (or have your
                  travel documents checked), and then access the hotel. Landside terminal-connected hotels
                  include the{' '}
                  <strong>Sofitel at London Heathrow Terminal 5</strong>, the{' '}
                  <strong>Fairmont at Vancouver International Airport</strong>, and the{' '}
                  <strong>PARKROYAL at Melbourne Airport</strong>.
                </p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  The practical consequence of this distinction is significant. If you use a landside hotel,
                  you are effectively entering the country — which means the country&apos;s visa rules apply to
                  you. If you do not hold the right visa or are not eligible for visa-free entry, you cannot
                  legally access a landside hotel even if it is physically attached to the terminal.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Who Should Use an Airport Transit Hotel?
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Airport transit hotels are not just for ultra-long layovers. Consider using one in any of the
                  following situations:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-600">
                  <li>
                    Your connection involves an overnight wait and you want a proper bed rather than sleeping
                    in an airport chair.
                  </li>
                  <li>
                    Your layover is 5 to 8 hours and you want a private space to sleep, shower, and arrive at
                    your gate refreshed.
                  </li>
                  <li>
                    You are traveling on a tightly planned itinerary and cannot afford the time or risk of
                    leaving the airport and navigating an unfamiliar city.
                  </li>
                  <li>
                    You are a frequent business traveler who values productivity and rest over sightseeing
                    between connections.
                  </li>
                  <li>
                    You are traveling with young children and want a private, quiet space rather than airport
                    terminal seating.
                  </li>
                  <li>
                    Your passport situation means that leaving the airport requires a visa you do not hold,
                    making an airside hotel the only viable rest option.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Why Transit Visa Rules Matter for Airport Hotels
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  For many travelers, the choice of airside versus landside hotel is not simply a matter of
                  convenience — it is determined by whether their passport allows entry to the transit country
                  at all.
                </p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  Transit visa requirements vary considerably. Some countries impose an{' '}
                  <strong>Airport Transit Visa (ATV)</strong> requirement on certain nationalities, meaning that
                  even passing through the airport airside requires a valid visa. France, for example, requires
                  an ATV for travelers from a defined list of countries even if they never leave the secure
                  zone. The United Kingdom requires a Direct Airside Transit Visa (DATV) from nationals of a
                  number of countries.
                </p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  At the other end of the spectrum, some countries like Qatar and Singapore have policies that
                  allow broad airside transit access without a visa for most nationalities, while a smaller set
                  of nationalities still requires documentation.
                </p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  The United States and Australia have no transit without visa arrangement at all — all
                  arriving international passengers must clear immigration regardless of whether they are
                  continuing to a connecting flight. This means all hotel options at US and Australian airports
                  are de facto landside, and all require a valid US visa/ESTA or Australian visa/ETA
                  respectively.
                </p>
                <p className="text-gray-600 leading-relaxed mt-3 font-medium text-gray-700">
                  The entries in this directory include a transit visa note for each airport. These notes are
                  general guidance only. Transit visa requirements depend on your specific passport, route, and
                  the applicable immigration rules at the time of travel. Always verify requirements with the
                  official immigration authority of the transit country before booking.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  How to Choose the Right Layover Hotel
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  When selecting an airport transit hotel, consider the following:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-600">
                  <li>
                    <strong>Layover duration:</strong> For layovers under 3 hours, lounge access or airport
                    rest areas are often more practical. For 5 to 8+ hour layovers, a hotel room provides
                    significantly better rest.
                  </li>
                  <li>
                    <strong>Visa eligibility:</strong> Confirm whether you need any visa or authorization to
                    access the hotel you are considering, especially for landside options.
                  </li>
                  <li>
                    <strong>Terminal alignment:</strong> Make sure the hotel is in or connected to the same
                    terminal as your connecting flight, or that internal transfers are available.
                  </li>
                  <li>
                    <strong>Booking flexibility:</strong> Look for hotels offering hourly or day-use rates if
                    you do not need a full night stay.
                  </li>
                  <li>
                    <strong>Departure time:</strong> Account for re-entry to the secure zone. You will need to
                    pass through security again after leaving the hotel for landside properties, and you need to
                    build this time into your schedule.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Airport Transit Hotels Directory</h2>
            <p className="text-gray-500 text-sm mb-4">
              {airportTransitHotels.length} airports listed &middot; Select an airport for full details
            </p>
            <AirportCountrySearch className="mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {airportTransitHotels.map((airport) => (
                <Link
                  key={airport.slug}
                  href={`/airport-transit-hotels/${airport.slug}`}
                  className="group block"
                >
                  <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-teal-300 hover:shadow-md transition-all duration-200 h-full">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">
                            {airport.iataCode}
                          </span>
                          <AirsideBadge value={airport.airsideOrLandside} />
                          {airport.connectedToTerminal && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                              Terminal-connected
                            </span>
                          )}
                        </div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors text-base leading-snug">
                          {airport.airportName}
                        </h3>
                        <p className="text-sm text-gray-500 mt-0.5">
                          {airport.city}, {airport.country}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-teal-500 transition-colors flex-shrink-0 mt-1" />
                    </div>
                    <div className="border-t border-gray-100 pt-3 mt-3">
                      <p className="text-xs text-gray-500 font-medium mb-0.5">{airport.hotelType}</p>
                      <p className="text-sm text-gray-700 font-medium">{airport.hotelName}</p>
                      <p className="text-xs text-gray-500 mt-1 truncate">{airport.terminalLocation}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mb-12 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Airside vs Landside Airport Hotels
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-emerald-200 bg-emerald-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-emerald-800 text-lg flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Airside Hotels
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-emerald-900 space-y-2">
                    <p>Located inside the secure departure zone. No immigration required for most transit passengers.</p>
                    <ul className="space-y-1 pl-4 list-disc">
                      <li>Access after security screening only</li>
                      <li>No customs or border control for most</li>
                      <li>Ideal for pure transit between international flights</li>
                      <li>Some nationalities may still need a transit visa</li>
                      <li>Examples: Doha Oryx, Dubai DXB Terminal 3, Paris CDG YOTELAIR</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-amber-200 bg-amber-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-amber-800 text-lg flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Landside Hotels
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-amber-900 space-y-2">
                    <p>Beyond the immigration and customs barrier. Entry to the country is required.</p>
                    <ul className="space-y-1 pl-4 list-disc">
                      <li>Must clear immigration and customs</li>
                      <li>Host country visa rules apply</li>
                      <li>Usually more hotel options and amenities</li>
                      <li>Must re-enter security before departure</li>
                      <li>Examples: Heathrow Sofitel, Fairmont Vancouver, PARKROYAL Melbourne</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Do You Need a Transit Visa for an Airport Hotel?
              </h2>
              <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-3 text-gray-600 leading-relaxed">
                <p>
                  Transit visa requirements are one of the most misunderstood aspects of international travel.
                  The answer depends on multiple factors: your passport, the country you are transiting through,
                  whether the hotel is airside or landside, and whether the country has any transit without
                  visa arrangement.
                </p>
                <p>
                  For airside hotels, most nationalities can access them without a visa. However, some
                  countries — including France (Airport Transit Visa) and the United Kingdom (Direct Airside
                  Transit Visa) — require certain nationalities to obtain a transit visa even for airside
                  stays. Verify this carefully before assuming an airside hotel is visa-free for your passport.
                </p>
                <p>
                  For landside hotels, the entry visa requirements of the host country apply in full. Some
                  countries like Egypt, Thailand, and Turkey offer broad visa-on-arrival access for many
                  nationalities, making landside hotels more accessible. Others, like the United States and
                  Australia, require all arriving passengers to clear immigration without exception.
                </p>
                <p className="font-medium text-gray-700">
                  Always verify your specific requirements with the official immigration authority of the
                  transit country. Do not rely solely on this guide for visa decisions.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                When an Airport Hotel Makes Sense
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2 text-gray-800">
                      <Clock className="w-4 h-4 text-teal-600" />
                      Long Layovers
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-600">
                    Any layover over 5 hours, especially overnight, is a strong case for booking a transit
                    hotel. Proper sleep improves alertness for your onward journey.
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2 text-gray-800">
                      <Shield className="w-4 h-4 text-teal-600" />
                      Visa Constraints
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-600">
                    If your passport limits your options for leaving the airport, an airside hotel may be your
                    only viable rest option beyond terminal seating.
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2 text-gray-800">
                      <Info className="w-4 h-4 text-teal-600" />
                      Early Departures
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-600">
                    Flights departing before 6am are easier to manage from an in-terminal or terminal-connected
                    hotel than from a city-centre property requiring early transport.
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-5">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Travel Planning</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-gray-600 text-sm mb-4">
                Plan the full picture of your international trip with these related tools and guides.
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <Link
                  href="/visa-guides"
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-teal-200 hover:bg-teal-50 transition-all group"
                >
                  <Building2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700 group-hover:text-teal-700">
                    Visa Guides &amp; Entry Requirements
                  </span>
                </Link>
                <Link
                  href="/visa-guides/country-entry-requirements"
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-teal-200 hover:bg-teal-50 transition-all group"
                >
                  <MapPin className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700 group-hover:text-teal-700">
                    Country Entry Requirements
                  </span>
                </Link>
                <Link
                  href="/tools/schengen-calculator"
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-teal-200 hover:bg-teal-50 transition-all group"
                >
                  <Clock className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700 group-hover:text-teal-700">
                    Schengen 90/180 Day Calculator
                  </span>
                </Link>
                <Link
                  href="/compare"
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-teal-200 hover:bg-teal-50 transition-all group"
                >
                  <Shield className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700 group-hover:text-teal-700">
                    Compare Passport Strengths
                  </span>
                </Link>
                <Link
                  href="/research/schengen-90-180-rule-explained"
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-teal-200 hover:bg-teal-50 transition-all group"
                >
                  <Info className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700 group-hover:text-teal-700">
                    Schengen 90/180 Rule Explained
                  </span>
                </Link>
                <Link
                  href="/guides/passport-validity-rules"
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-teal-200 hover:bg-teal-50 transition-all group"
                >
                  <Building2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700 group-hover:text-teal-700">
                    Passport Validity Rules by Country
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="mb-8 bg-blue-50 border border-blue-200 rounded-xl p-5">
            <p className="text-sm text-gray-700">
              <strong>Disclaimer:</strong> Transit visa requirements, hotel access rules, and airport
              facilities change frequently. The information in this directory is provided for general guidance
              only. Always verify current requirements with official immigration authorities and airline
              policies before making travel or booking decisions.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
