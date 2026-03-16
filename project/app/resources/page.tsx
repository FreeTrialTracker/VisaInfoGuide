import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import CountryFilter from '@/components/CountryFilter';
import ResourcesTabs from '@/components/ResourcesTabs';
import { PASSPORTS, DESTINATIONS, TOP_PAIRS_300, getPassportBySlug, getDestinationBySlug, REGIONS } from '@/lib/countries';
import { buildTitle, buildDescription, canonicalUrl, webpageJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: buildTitle({ type: 'resources' }),
  description: buildDescription({ type: 'resources' }),
  alternates: {
    canonical: canonicalUrl('/resources'),
  },
  openGraph: {
    title: buildTitle({ type: 'resources' }),
    description: buildDescription({ type: 'resources' }),
    url: canonicalUrl('/resources'),
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ResourcesPage() {
  const popularPairs = TOP_PAIRS_300.slice(0, 12);

  const jsonLd = webpageJsonLd({
    name: 'Visa Requirements & Entry Rules by Country',
    description: buildDescription({ type: 'resources' }),
    url: canonicalUrl('/resources'),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ name: 'Resources', url: '/resources' }]} />

          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Visa Requirements & Entry Rules by Country
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Find visa requirements for any country combination. Entry rules vary significantly by nationality
              and destination, and regulations can change. Use this comprehensive directory to check whether you
              need a visa, can travel visa-free, or qualify for eVisa or visa on arrival. Always verify current
              requirements with official sources before booking travel.
            </p>
          </header>

          <section className="mb-12">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200">
                <ResourcesTabs />
              </div>
              <div id="browse-by-passport" className="p-6 scroll-mt-4">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Browse by Passport</h2>
                <p className="text-gray-600 mb-6">
                  Select your passport to see where you can travel, visa requirements, and entry conditions.
                </p>
                <CountryFilter countries={PASSPORTS} type="passport" />
              </div>
            </div>
          </section>

          <section id="browse-by-destination" className="mb-12 scroll-mt-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Browse by Destination</h2>
              <p className="text-gray-600 mb-6">
                Select a destination country to see entry requirements by nationality.
              </p>
              <CountryFilter countries={DESTINATIONS} type="destination" />
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Browse Destinations by Region</h2>
            <p className="text-gray-600 mb-6">
              Explore visa requirements and entry rules for destinations across all major regions.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {REGIONS.map(region => (
                <Link
                  key={region.slug}
                  href={`/destinations/${region.slug}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-teal-500 hover:shadow-md transition-all bg-white"
                >
                  <div className="font-medium text-gray-900 mb-1">{region.name}</div>
                  <div className="text-xs text-gray-500 line-clamp-2">{region.description}</div>
                </Link>
              ))}
            </div>
            <Link href="/destinations" className="text-sm text-teal-600 hover:text-teal-700 font-medium">
              View all destination regions →
            </Link>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Popular Right Now</h2>
            <p className="text-gray-600 mb-6">
              Frequently searched visa requirements and travel routes.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularPairs.map(pair => {
                const passport = getPassportBySlug(pair.passport);
                const destination = getDestinationBySlug(pair.destination);
                if (!passport || !destination) return null;

                return (
                  <Link
                    key={`${pair.passport}-${pair.destination}`}
                    href={`/passport/${pair.passport}/destination/${pair.destination}`}
                    className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all duration-200 bg-white"
                  >
                    <div className="font-medium text-gray-900 mb-1">
                      {passport.name} → {destination.name}
                    </div>
                    <div className="text-sm text-gray-500">Visa requirements</div>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">In-Depth Research & Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Link
                href="/research/most-powerful-passports-2026"
                className="block p-6 border-2 border-gray-200 rounded-lg hover:border-teal-500 hover:shadow-lg transition-all duration-200 bg-white"
              >
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">Most Powerful Passports 2026</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Complete rankings, visa-free access data, and global mobility analysis for 195+ countries
                </p>
                <span className="text-xs text-teal-600 font-medium">2000+ words • Data tables • Research article</span>
              </Link>
              <Link
                href="/research/schengen-90-180-rule-explained"
                className="block p-6 border-2 border-gray-200 rounded-lg hover:border-teal-500 hover:shadow-lg transition-all duration-200 bg-white"
              >
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">Schengen 90/180 Rule Explained</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Master the rolling 90/180 day calculation with examples, tracking methods, and overstay consequences
                </p>
                <span className="text-xs text-teal-600 font-medium">2500+ words • Calculation examples • Research article</span>
              </Link>
              <Link
                href="/research/passport-validity-rules-by-country"
                className="block p-6 border-2 border-gray-200 rounded-lg hover:border-teal-500 hover:shadow-lg transition-all duration-200 bg-white"
              >
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">Passport Validity Rules by Country</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Comprehensive database of 3-month, 6-month, and duration rules for every destination worldwide
                </p>
                <span className="text-xs text-teal-600 font-medium">2000+ words • Country database • Research article</span>
              </Link>
              <Link
                href="/research/visa-free-vs-visa-on-arrival-vs-evisa"
                className="block p-6 border-2 border-gray-200 rounded-lg hover:border-teal-500 hover:shadow-lg transition-all duration-200 bg-white"
              >
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">Visa-Free vs VoA vs eVisa</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Complete comparison of visa types, costs, processing times, and strategic considerations
                </p>
                <span className="text-xs text-teal-600 font-medium">2000+ words • Comparison guide • Research article</span>
              </Link>
              <Link
                href="/research/onward-ticket-requirements-by-country"
                className="block p-6 border-2 border-gray-200 rounded-lg hover:border-teal-500 hover:shadow-lg transition-all duration-200 bg-white"
              >
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">Onward Ticket Requirements</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Which countries require proof of departure, enforcement levels, and solutions for flexible travelers
                </p>
                <span className="text-xs text-teal-600 font-medium">2000+ words • Country requirements • Research article</span>
              </Link>
              <Link
                href="/research/best-passports-for-visa-free-travel-in-asia-2026"
                className="block p-6 border-2 border-gray-200 rounded-lg hover:border-teal-500 hover:shadow-lg transition-all duration-200 bg-white"
              >
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">Best Passports for Visa-Free Travel in Asia 2026</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Which passports unlock the most Asian destinations without a visa — ranked by regional access across Southeast, East, and South Asia
                </p>
                <span className="text-xs text-teal-600 font-medium">1800+ words • Regional rankings • Research article</span>
              </Link>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Featured Passport Destinations</h2>
            <p className="text-gray-600 mb-6">
              Complete visa requirement guides and travel destination analysis for major global passports.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-lg transition-all duration-200">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">🇺🇸 United States Passport</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Comprehensive visa requirements for US passport holders traveling worldwide
                </p>
                <div className="space-y-2">
                  <Link
                    href="/passport/united-states"
                    className="block text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                  >
                    → US Passport Hub
                  </Link>
                  <Link
                    href="/passport/united-states/visa-free-countries"
                    className="block text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                  >
                    → Visa-Free Countries
                  </Link>
                  <Link
                    href="/passport/united-states/travel-without-visa"
                    className="block text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                  >
                    → Travel Without Visa
                  </Link>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-lg transition-all duration-200">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">🇬🇧 United Kingdom Passport</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Complete entry requirements and visa policies for British passport holders
                </p>
                <div className="space-y-2">
                  <Link
                    href="/passport/united-kingdom"
                    className="block text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                  >
                    → UK Passport Hub
                  </Link>
                  <Link
                    href="/passport/united-kingdom/visa-free-countries"
                    className="block text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                  >
                    → Visa-Free Countries
                  </Link>
                  <Link
                    href="/passport/united-kingdom/travel-without-visa"
                    className="block text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                  >
                    → Travel Without Visa
                  </Link>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-lg transition-all duration-200">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">🇮🇳 India Passport</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Detailed visa requirements and entry conditions for Indian passport holders
                </p>
                <div className="space-y-2">
                  <Link
                    href="/passport/india"
                    className="block text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                  >
                    → India Passport Hub
                  </Link>
                  <Link
                    href="/passport/india/visa-free-countries"
                    className="block text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                  >
                    → Visa-Free Countries
                  </Link>
                  <Link
                    href="/passport/india/travel-without-visa"
                    className="block text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                  >
                    → Travel Without Visa
                  </Link>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-lg transition-all duration-200">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">🇨🇳 China Passport</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Complete travel documentation requirements for Chinese passport holders
                </p>
                <div className="space-y-2">
                  <Link
                    href="/passport/china"
                    className="block text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                  >
                    → China Passport Hub
                  </Link>
                  <Link
                    href="/passport/china/visa-free-countries"
                    className="block text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                  >
                    → Visa-Free Countries
                  </Link>
                  <Link
                    href="/passport/china/travel-without-visa"
                    className="block text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                  >
                    → Travel Without Visa
                  </Link>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-lg transition-all duration-200">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">🇨🇦 Canada Passport</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Comprehensive visa information and entry rules for Canadian passport holders
                </p>
                <div className="space-y-2">
                  <Link
                    href="/passport/canada"
                    className="block text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                  >
                    → Canada Passport Hub
                  </Link>
                  <Link
                    href="/passport/canada/visa-free-countries"
                    className="block text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                  >
                    → Visa-Free Countries
                  </Link>
                  <Link
                    href="/passport/canada/travel-without-visa"
                    className="block text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                  >
                    → Travel Without Visa
                  </Link>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-lg transition-all duration-200">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">🇩🇪 Germany Passport</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Full visa-free access and Schengen travel rights for German passport holders
                </p>
                <div className="space-y-2">
                  <Link
                    href="/passport/germany"
                    className="block text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                  >
                    → Germany Passport Hub
                  </Link>
                  <Link
                    href="/passport/germany/visa-free-countries"
                    className="block text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                  >
                    → Visa-Free Countries
                  </Link>
                  <Link
                    href="/passport/germany/travel-without-visa"
                    className="block text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                  >
                    → Travel Without Visa
                  </Link>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-lg transition-all duration-200">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">🇦🇺 Australia Passport</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Entry conditions and visa-free destinations for Australian passport holders
                </p>
                <div className="space-y-2">
                  <Link
                    href="/passport/australia"
                    className="block text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                  >
                    → Australia Passport Hub
                  </Link>
                  <Link
                    href="/passport/australia/visa-free-countries"
                    className="block text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                  >
                    → Visa-Free Countries
                  </Link>
                  <Link
                    href="/passport/australia/travel-without-visa"
                    className="block text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                  >
                    → Travel Without Visa
                  </Link>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-lg transition-all duration-200">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">🇧🇷 Brazil Passport</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Visa requirements and travel access information for Brazilian passport holders
                </p>
                <div className="space-y-2">
                  <Link
                    href="/passport/brazil"
                    className="block text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                  >
                    → Brazil Passport Hub
                  </Link>
                  <Link
                    href="/passport/brazil/visa-free-countries"
                    className="block text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                  >
                    → Visa-Free Countries
                  </Link>
                  <Link
                    href="/passport/brazil/travel-without-visa"
                    className="block text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                  >
                    → Travel Without Visa
                  </Link>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-lg transition-all duration-200">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">🇫🇷 France Passport</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Schengen zone access and global visa-free travel for French passport holders
                </p>
                <div className="space-y-2">
                  <Link
                    href="/passport/france"
                    className="block text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                  >
                    → France Passport Hub
                  </Link>
                  <Link
                    href="/passport/france/visa-free-countries"
                    className="block text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                  >
                    → Visa-Free Countries
                  </Link>
                  <Link
                    href="/passport/france/travel-without-visa"
                    className="block text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                  >
                    → Travel Without Visa
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-blue-50 rounded-lg p-6 border border-blue-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Official Sources</h2>
            <p className="text-gray-700 mb-4">
              Always verify visa requirements with official sources before travel:
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.iatatravelcentre.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  IATA Travel Centre
                </a>
                {' '}- Comprehensive travel document requirements database
              </li>
              <li className="text-gray-700">
                Your destination country&apos;s official immigration or foreign affairs website
              </li>
              <li className="text-gray-700">
                Your nearest embassy or consulate of the destination country
              </li>
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
