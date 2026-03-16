import { Metadata } from 'next';
import Link from 'next/link';
import CompareClient from '@/components/compare/CompareClient';
import Breadcrumbs from '@/components/Breadcrumbs';
import { BookOpen, Plane, ListChecks, Route, Globe, CalendarCheck } from 'lucide-react';

const relatedTools = [
  {
    href: '/tools/schengen-calculator',
    icon: BookOpen,
    label: 'Schengen Calculator',
    desc: 'Calculate your remaining days in the Schengen Area under the 90/180 rule',
  },
  {
    href: '/tools/airline-boarding-check',
    icon: Plane,
    label: 'Airline Boarding Check',
    desc: 'Full boarding eligibility check covering visa, passport validity, transit, and onward ticket',
  },
  {
    href: '/tools/trip-entry-risk-check',
    icon: ListChecks,
    label: 'Trip Entry Risk Check',
    desc: 'Evaluate overall entry risk for your trip across all required documents',
  },
  {
    href: '/tools/transit-visa-checker',
    icon: Route,
    label: 'Transit Visa Checker',
    desc: 'Check if your passport requires a transit visa at any connection point',
  },
  {
    href: '/trip',
    icon: Globe,
    label: 'Trip Visa Finder',
    desc: 'Get a full visa summary for every country in your itinerary in one go',
  },
  {
    href: '/guides/passport-validity-rules',
    icon: CalendarCheck,
    label: 'Passport Validity Rules',
    desc: 'Country-by-country guide to passport validity requirements for travelers',
  },
];

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
      <div className="container mx-auto px-4 pb-16 max-w-7xl">
        <section className="border-t border-gray-100 pt-10 mt-4" aria-labelledby="related-tools-heading">
          <h2 id="related-tools-heading" className="text-lg font-bold text-gray-900 mb-5">Related Tools and Guides</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedTools.map(({ href, icon: Icon, label, desc }) => (
              <Link
                key={label}
                href={href}
                className="group bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <div className="text-sm font-semibold text-gray-800 group-hover:text-blue-700">{label}</div>
                </div>
                <div className="text-xs text-gray-500 leading-snug">{desc}</div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
