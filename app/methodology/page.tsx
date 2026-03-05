import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { FileSearch, Database, Calendar, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Data Methodology | How VisaInfoGuide Works',
  description: 'Learn how VisaInfoGuide structures visa requirements data, calculates rolling rules, and maintains accuracy. Understand our data collection and verification process.',
  alternates: {
    canonical: 'https://visainfoguide.com/methodology',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Data Methodology | How VisaInfoGuide Works',
    description: 'Learn how VisaInfoGuide structures visa requirements data, calculates rolling rules, and maintains accuracy.',
    type: 'website',
    url: 'https://visainfoguide.com/methodology',
    images: [
      {
        url: 'https://visainfoguide.com/og/legal-og',
        width: 1200,
        height: 630,
        alt: 'Data Methodology - VisaInfoGuide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Data Methodology | How VisaInfoGuide Works',
    description: 'Learn how VisaInfoGuide structures visa requirements data, calculates rolling rules, and maintains accuracy.',
    images: ['https://visainfoguide.com/og/legal-og'],
  },
};

export default function MethodologyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'VisaInfoGuide Data Methodology',
            description: 'How VisaInfoGuide structures and verifies visa requirements data',
            url: 'https://visainfoguide.com/methodology',
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
                  name: 'Methodology',
                  item: 'https://visainfoguide.com/methodology',
                },
              ],
            },
          }),
        }}
      />

      <div className="min-h-screen bg-white">
        <div className="bg-gradient-to-b from-gray-50 to-white border-b">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Breadcrumbs
              items={[
                { name: 'Methodology', url: '/methodology' },
              ]}
            />
            <h1 className="text-4xl font-bold text-gray-900 mt-6">VisaInfoGuide Data Methodology</h1>
            <p className="text-lg text-gray-600 mt-4">
              How we collect, structure, and verify visa requirements data
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="prose prose-gray max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <FileSearch className="w-6 h-6 text-teal-600" />
                Data Sources
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                VisaInfoGuide compiles visa requirements from authoritative sources including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>Official immigration authority websites</strong> - Government portals providing entry requirements</li>
                <li><strong>IATA Travel Centre</strong> - Industry-standard aviation travel information database</li>
                <li><strong>Embassy and consulate publications</strong> - Official visa policy documents and announcements</li>
                <li><strong>Government press releases</strong> - Policy changes and temporary measures</li>
                <li><strong>Official bilateral agreements</strong> - Visa waiver agreements between countries</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                We prioritize primary sources and cross-reference information across multiple authorities to ensure accuracy. For a detailed list of sources, visit our <a href="/data-sources" className="text-teal-600 hover:text-teal-700 underline">Data Sources page</a>.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Database className="w-6 h-6 text-teal-600" />
                Data Structure
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our database uses a <strong>passport-destination pair model</strong> to capture visa requirements. For each combination, we record:
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Visa Type Classification</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>Visa Free</strong> - No visa required for specified stay duration</li>
                <li><strong>eVisa</strong> - Electronic visa obtained online before travel</li>
                <li><strong>Visa on Arrival</strong> - Visa issued at port of entry</li>
                <li><strong>Visa Required</strong> - Visa must be obtained in advance from embassy/consulate</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Stay Limits & Windows</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                We capture two types of stay limits:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>Max stay days</strong> - Maximum consecutive days allowed per entry</li>
                <li><strong>Stay window days</strong> - Rolling window period for cumulative stay calculations (e.g., Schengen's 180-day window)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Entry Conditions</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Passport validity requirements (months valid beyond entry/exit)</li>
                <li>Blank passport pages required</li>
                <li>Return/onward ticket requirements</li>
                <li>Proof of accommodation requirements</li>
                <li>Minimum funds requirements</li>
                <li>Special restrictions or notes</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Calendar className="w-6 h-6 text-teal-600" />
                Calculating Rolling Rules
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Some destinations use <strong>rolling window rules</strong> for stay limits. The most notable is the Schengen Area's 90/180 rule.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Schengen 90/180 Rule</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                Our calculator implements the official rolling window method:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>For any given date D, look back 180 days (D minus 179 days through D)</li>
                <li>Count all days present in Schengen during that window</li>
                <li>Both entry and exit days count (inclusive counting)</li>
                <li>Maximum 90 days allowed in any rolling 180-day period</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Our algorithm merges overlapping trips, handles adjacent stays, and accounts for partial window coverage. This ensures accurate calculation even for complex multi-trip itineraries.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Update Frequency</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We follow a structured update schedule:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>Monthly reviews</strong> - Systematic review of all destination policies</li>
                <li><strong>Ad-hoc updates</strong> - Immediate updates for announced policy changes</li>
                <li><strong>Quarterly audits</strong> - Comprehensive verification against official sources</li>
                <li><strong>Source monitoring</strong> - Continuous tracking of immigration authority announcements</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                High-traffic passport-destination pairs receive more frequent verification. Popular routes like US-EU, UK-Asia, and major business travel corridors are monitored more closely.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-teal-600" />
                Known Limitations
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We acknowledge the following limitations:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>Policy lag</strong> - Changes may not be immediately reflected in our database</li>
                <li><strong>Temporary measures</strong> - Emergency travel restrictions may not be captured instantly</li>
                <li><strong>Individual circumstances</strong> - Some visa decisions depend on factors we cannot model (e.g., previous visa history, purpose of visit)</li>
                <li><strong>Regional variations</strong> - Some countries have region-specific rules not fully captured in simplified entries</li>
                <li><strong>Embassy discretion</strong> - Visa officers may make case-by-case determinations</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4 font-semibold">
                We always recommend verifying requirements with official sources before travel.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Confidence Model</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We assess confidence in our data based on:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>Source reliability</strong> - Official government sources rank highest</li>
                <li><strong>Recency</strong> - Recently verified data has higher confidence</li>
                <li><strong>Consistency</strong> - Agreement across multiple sources increases confidence</li>
                <li><strong>Clarity</strong> - Unambiguous official statements rank higher than interpreted rules</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Where data confidence is lower or rules are complex, we link to official sources for travelers to verify directly.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Corrections & Feedback</h2>
              <p className="text-gray-700 leading-relaxed">
                If you identify inaccurate information, we encourage you to contact us at{' '}
                <a href="mailto:contact@visainfoguide.com" className="text-teal-600 hover:text-teal-700 font-medium underline">
                  contact@visainfoguide.com
                </a>{' '}with:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mt-2">
                <li>Specific passport-destination pair in question</li>
                <li>Correct information and official source link</li>
                <li>Date of verification</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                We investigate all reported discrepancies and update our database accordingly.
              </p>
            </section>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r">
              <p className="text-sm text-blue-900 font-semibold mb-2">Transparency Commitment</p>
              <p className="text-sm text-blue-800">
                VisaInfoGuide is committed to transparency in our data methodology. We continuously work to improve our processes, expand source coverage, and enhance data accuracy. Our goal is to provide the most reliable visa intelligence platform for international travelers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
