import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Plane, Shield, Clock, Calculator, TriangleAlert as AlertTriangle, Hotel, BookOpen, ArrowRight, ExternalLink, FileCheck, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Travel Planning Resources – Visa, Airport Hotels, Immigration Guides',
  description:
    'Continue planning your international trip with trusted travel resources including visa rules, airport transit hotels, and immigration visa guides.',
  alternates: {
    canonical: 'https://visainfoguide.com/travel-planning-resources',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Travel Planning Resources – Visa, Airport Hotels, Immigration Guides',
    description:
      'Continue planning your international trip with trusted travel resources including visa rules, airport transit hotels, and immigration visa guides.',
    type: 'website',
    url: 'https://visainfoguide.com/travel-planning-resources',
    images: [
      {
        url: 'https://visainfoguide.com/og/home-og',
        width: 1200,
        height: 630,
        alt: 'Travel Planning Resources',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Travel Planning Resources – Visa, Airport Hotels, Immigration Guides',
    description:
      'Continue planning your international trip with trusted travel resources including visa rules, airport transit hotels, and immigration visa guides.',
    images: ['https://visainfoguide.com/og/home-og'],
  },
};

const PAGE_URL = 'https://visainfoguide.com/travel-planning-resources';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Travel Planning Resources',
  url: PAGE_URL,
  description:
    'Travel resources including visa rules, airport transit hotels, and immigration visa guides.',
  about: ['Travel visas', 'Airport hotels', 'Immigration visas'],
  sameAs: ['https://hotelinairport.com', 'https://immigrationinfoguide.com'],
  breadcrumb: {
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
        name: 'Travel Planning Resources',
        item: PAGE_URL,
      },
    ],
  },
};

const VISA_TOOLS = [
  {
    icon: AlertTriangle,
    title: 'Trip Entry Risk Checker',
    description: 'Assess your overall entry risk for a trip based on visa type, passport validity, and transit requirements.',
    href: '/tools/trip-entry-risk-check',
  },
  {
    icon: Shield,
    title: 'Transit Visa Checker',
    description: 'Check whether you need a transit visa when connecting through a foreign airport.',
    href: '/tools/transit-visa-checker',
  },
  {
    icon: Clock,
    title: 'Passport Validity Checker',
    description: 'Verify your passport meets the minimum validity requirements for your destination.',
    href: '/tools/passport-validity-checker',
  },
  {
    icon: Calculator,
    title: 'Schengen 90/180 Calculator',
    description: 'Calculate your remaining days in the Schengen Area under the 90-in-180-day rule.',
    href: '/tools/schengen-calculator',
  },
];

const RESEARCH_LINKS = [
  {
    title: 'Most Powerful Passports 2026',
    href: '/research/most-powerful-passports-2026',
  },
  {
    title: 'Passport Validity Rules by Country',
    href: '/research/passport-validity-rules-by-country',
  },
  {
    title: 'Onward Ticket Requirements by Country',
    href: '/research/onward-ticket-requirements-by-country',
  },
  {
    title: 'Visa-Free vs eVisa vs Visa on Arrival',
    href: '/research/visa-free-vs-visa-on-arrival-vs-evisa',
  },
];

export default function TravelPlanningResourcesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-white">
        <div className="bg-gradient-to-b from-gray-50 to-white border-b">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Breadcrumbs
              items={[{ name: 'Travel Planning Resources', url: '/travel-planning-resources' }]}
            />
            <h1 className="text-4xl font-bold text-gray-900 mt-6">Travel Planning Resources</h1>
            <p className="text-lg text-gray-600 mt-4 leading-relaxed max-w-3xl">
              International travel planning involves several steps beyond booking flights. Before you
              depart, you need to check visa requirements for every country you will enter or transit
              through, confirm your passport meets the minimum validity rules, arrange accommodation
              for long layovers inside airport terminals, and explore immigration options if you are
              planning a longer stay or considering relocating abroad.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-4xl space-y-16">

          {/* Section 1 — Visa Requirements */}
          <section>
            <div className="flex items-center gap-3 mb-3">
              <FileCheck className="w-6 h-6 text-teal-600 flex-shrink-0" />
              <h2 className="text-2xl font-bold text-gray-900">
                Check Visa Requirements by Passport
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-8">
              Travelers should always verify visa requirements before departure. Requirements change
              regularly, and being turned away at the gate or border can be costly and disruptive.
              Use the tools below to check visa rules, passport validity, transit requirements, and
              Schengen day limits for your specific passport and route.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {VISA_TOOLS.map(({ icon: Icon, title, description, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex items-start gap-4 p-5 bg-white border border-gray-200 rounded-xl hover:border-teal-300 hover:shadow-sm transition-all"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                    <Icon className="w-5 h-5 text-teal-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900 group-hover:text-teal-700 transition-colors">
                        {title}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-teal-500 transition-colors flex-shrink-0" />
                    </div>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Section 2 — Airport Transit Hotels */}
          <section>
            <div className="flex items-center gap-3 mb-3">
              <Hotel className="w-6 h-6 text-teal-600 flex-shrink-0" />
              <h2 className="text-2xl font-bold text-gray-900">
                Airport Transit Hotels and Layover Stays
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Long layovers often require accommodation inside or near the airport terminal.
              Whether you have a 6-hour overnight connection or a 24-hour stopover between
              long-haul flights, finding the right place to rest can make a significant difference
              to your journey.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
              <p className="text-gray-700 leading-relaxed mb-3">
                Find{' '}
                <a
                  href="https://hotelinairport.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:text-teal-700 font-medium underline underline-offset-2"
                >
                  airport transit hotels
                </a>{' '}
                and terminal hotels worldwide at{' '}
                <a
                  href="https://hotelinairport.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:text-teal-700 font-medium underline underline-offset-2 inline-flex items-center gap-1"
                >
                  HotelInAirport.com
                  <ExternalLink className="w-3 h-3" />
                </a>
                . The directory covers{' '}
                <a
                  href="https://hotelinairport.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:text-teal-700 font-medium underline underline-offset-2"
                >
                  hotels inside airports
                </a>{' '}
                across major hubs in Asia, the Middle East, Europe, and North America, as well as{' '}
                <a
                  href="https://hotelinairport.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:text-teal-700 font-medium underline underline-offset-2"
                >
                  airport layover hotels
                </a>{' '}
                located just outside the terminal.
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-400 p-5 rounded-r-xl">
              <p className="text-sm font-semibold text-amber-900 mb-1">Airside Hotels</p>
              <p className="text-sm text-amber-800 leading-relaxed">
                Some airports have airside hotels located inside the secure transit zone. Passengers
                can use these without passing through immigration or re-clearing security, making them
                ideal for travelers who cannot or do not wish to enter the country during their
                layover. Notable examples include Changi Airport in Singapore, Dubai International,
                and Heathrow in London.
              </p>
            </div>
          </section>

          {/* Section 3 — Immigration and Long-Stay Visas */}
          <section>
            <div className="flex items-center gap-3 mb-3">
              <Globe className="w-6 h-6 text-teal-600 flex-shrink-0" />
              <h2 className="text-2xl font-bold text-gray-900">
                Immigration and Long-Term Visa Guides
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Travelers planning to stay longer than a short-term tourist visa permits should explore
              immigration and residency options before they depart. Long-stay visas, work permits,
              digital nomad visas, and residency programs vary significantly between countries, and
              many require advance applications.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <p className="text-gray-700 leading-relaxed">
                Explore{' '}
                <a
                  href="https://immigrationinfoguide.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:text-teal-700 font-medium underline underline-offset-2"
                >
                  immigration visa guides
                </a>{' '}
                and{' '}
                <a
                  href="https://immigrationinfoguide.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:text-teal-700 font-medium underline underline-offset-2"
                >
                  long stay visa options
                </a>{' '}
                at{' '}
                <a
                  href="https://immigrationinfoguide.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:text-teal-700 font-medium underline underline-offset-2 inline-flex items-center gap-1"
                >
                  ImmigrationInfoGuide.com
                  <ExternalLink className="w-3 h-3" />
                </a>
                . The site covers{' '}
                <a
                  href="https://immigrationinfoguide.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:text-teal-700 font-medium underline underline-offset-2"
                >
                  moving abroad guides
                </a>
                , work visa requirements,{' '}
                <a
                  href="https://immigrationinfoguide.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:text-teal-700 font-medium underline underline-offset-2"
                >
                  residency permit information
                </a>
                , and pathways to permanent residence in countries around the world.
              </p>
            </div>
          </section>

          {/* Section 4 — Continue Planning Cards */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Continue Planning Your Trip</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-teal-600 px-5 py-4">
                  <FileCheck className="w-7 h-7 text-white mb-2" />
                  <h3 className="text-white font-bold text-base">Visa Requirements</h3>
                </div>
                <div className="flex flex-col flex-1 px-5 py-4">
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">
                    Check visa rules, visa-free travel, transit visa requirements, and entry
                    regulations by passport and destination.
                  </p>
                  <Link
                    href="/"
                    className="mt-4 inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
                  >
                    Check Visa Rules
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-blue-600 px-5 py-4">
                  <Hotel className="w-7 h-7 text-white mb-2" />
                  <h3 className="text-white font-bold text-base">Airport Transit Hotels</h3>
                </div>
                <div className="flex flex-col flex-1 px-5 py-4">
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">
                    Find hotels located inside airports and near airport terminals for overnight
                    layovers and long connections.
                  </p>
                  <a
                    href="https://hotelinairport.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
                  >
                    Find Airport Hotels
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-700 px-5 py-4">
                  <BookOpen className="w-7 h-7 text-white mb-2" />
                  <h3 className="text-white font-bold text-base">Immigration and Residency</h3>
                </div>
                <div className="flex flex-col flex-1 px-5 py-4">
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">
                    Learn about work visas, residency permits, and long-term immigration options
                    in different countries.
                  </p>
                  <a
                    href="https://immigrationinfoguide.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-800 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
                  >
                    Explore Immigration Guides
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Popular Visa Guides */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Plane className="w-5 h-5 text-teal-600" />
              <h2 className="text-xl font-bold text-gray-900">Popular Visa Guides</h2>
            </div>
            <ul className="space-y-2">
              {RESEARCH_LINKS.map(({ title, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium text-sm underline underline-offset-2 hover:underline transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Disclaimer */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-r-xl">
            <p className="text-sm font-semibold text-yellow-900 mb-1">Important Notice</p>
            <p className="text-sm text-yellow-800 leading-relaxed">
              Visa and immigration rules change frequently. All information on this page is for
              general guidance only. Always verify current requirements with official government
              sources, embassies, or consulates before making travel arrangements.
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
