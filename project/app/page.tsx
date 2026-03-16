export const revalidate = 3600;

import { Metadata } from 'next';
import TripVisaFinder from '@/components/TripVisaFinder';
import LatestVisaNews from '@/components/news/LatestVisaNews';
import LatestBlogPosts from '@/components/blog/LatestBlogPosts';
import HomeNavCards from '@/components/HomeNavCards';
import WebAppSuite from '@/components/WebAppSuite';
import HomeFAQ from '@/components/HomeFAQ';
import { homeFaqSchema } from '@/lib/faq-data';
import { getFinderData } from '@/lib/homepage-data';

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

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Check Visa Requirements by Passport',
  description: 'Use VisaInfoGuide to look up visa requirements, entry rules, and stay limits for any passport and destination combination.',
  url: 'https://visainfoguide.com/',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Select your passport',
      text: 'Choose your passport nationality from the search box on the home page.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Choose your destination',
      text: 'Enter the country or countries you plan to visit.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Review visa requirements',
      text: 'View the visa type (visa-free, eVisa, visa on arrival, or visa required), maximum stay duration, and passport validity requirements for each destination.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Confirm before travel',
      text: 'Always verify the latest requirements with the official immigration authority of your destination country before booking travel.',
    },
  ],
  tool: [
    {
      '@type': 'HowToTool',
      name: 'VisaInfoGuide Visa Checker',
    },
  ],
};

export default async function Home() {
  const { passports, destinations } = await getFinderData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }}
      />
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight leading-tight" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              Check Visa Requirements by Passport and Destination
            </h1>
          </div>

          <TripVisaFinder passports={passports} destinations={destinations} />

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              Planning a trip? Check visa requirements for multiple destinations in your itinerary.
            </p>
          </div>

          <HomeNavCards />

          <LatestVisaNews />

          <LatestBlogPosts />

          <div className="mt-16 pt-10 border-t border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Visa Requirements, Entry Rules & Travel Planning — 2026
            </h2>
            <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
              <p>
                VisaInfoGuide is a free reference tool for travelers who need accurate, up-to-date visa requirement
                information before they book. Whether you hold a US, UK, EU, or any other passport, this site lets
                you check visa-free access, visa-on-arrival eligibility, and e-visa availability for over 190
                destinations — sorted by your passport nationality.
              </p>
              <p>
                For multi-destination trips, the trip planner lets you enter a full itinerary and review entry
                requirements across every stop at once, reducing the risk of missing a visa requirement that could
                disrupt your journey. You can also use the{' '}
                <a href="/tools/schengen-calculator" className="text-teal-600 hover:underline">Schengen 90/180-day calculator</a>{' '}
                to track your remaining days in the Schengen Area and plan stays across France, Germany, Spain,
                Italy, and all other Schengen member states without overstaying.
              </p>
              <p>
                The{' '}
                <a href="/compare" className="text-teal-600 hover:underline">passport comparison tool</a>{' '}
                covers visa-free access counts, stay limits, and entry conditions side-by-side for any two passports.
                Country destination pages — including{' '}
                <a href="/destination/japan" className="text-teal-600 hover:underline">Japan</a>,{' '}
                <a href="/destination/united-states" className="text-teal-600 hover:underline">United States</a>,{' '}
                <a href="/destination/united-kingdom" className="text-teal-600 hover:underline">United Kingdom</a>, and{' '}
                <a href="/destination/schengen-area" className="text-teal-600 hover:underline">Schengen Area</a>{' '}
                — list entry requirements for every passport nationality with stay duration, visa type, and passport
                validity rules.
              </p>
              <p>
                All data on this site is reviewed regularly. Visa rules change frequently; always confirm requirements
                with the official immigration authority of your destination before travel.
              </p>
            </div>
          </div>

          <HomeFAQ />

          <WebAppSuite />
        </div>
      </div>
    </div>
    </>
  );
}
