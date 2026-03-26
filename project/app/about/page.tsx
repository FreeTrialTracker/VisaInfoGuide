import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Shield, Database, RefreshCw, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About VisaInfoGuide | Independent Visa Requirements Database',
  description: 'Learn about VisaInfoGuide, an independent visa intelligence platform providing structured visa requirements data for international travelers. Updated monthly from official sources.',
  alternates: {
    canonical: 'https://visainfoguide.com/about',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'About VisaInfoGuide | Independent Visa Requirements Database',
    description: 'Learn about VisaInfoGuide, an independent visa intelligence platform providing structured visa requirements data for international travelers.',
    type: 'website',
    url: 'https://visainfoguide.com/about',
    images: [
      {
        url: 'https://visainfoguide.com/og/legal-og',
        width: 1200,
        height: 630,
        alt: 'About VisaInfoGuide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About VisaInfoGuide | Independent Visa Requirements Database',
    description: 'Learn about VisaInfoGuide, an independent visa intelligence platform providing structured visa requirements data for international travelers.',
    images: ['https://visainfoguide.com/og/legal-og'],
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'About VisaInfoGuide',
            description: 'Information about VisaInfoGuide visa requirements database',
            url: 'https://visainfoguide.com/about',
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
                  name: 'About',
                  item: 'https://visainfoguide.com/about',
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
                { name: 'About', url: '/about' },
              ]}
            />
            <h1 className="text-4xl font-bold text-gray-900 mt-6">About VisaInfoGuide</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="prose prose-gray max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Globe className="w-6 h-6 text-teal-600" />
                Who We Are
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                VisaInfoGuide is an independent visa intelligence platform dedicated to providing accurate, structured visa requirement information for international travelers. We serve as a comprehensive resource for understanding entry requirements, visa types, and travel documentation rules across destinations worldwide.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our mission is to simplify international travel planning by making visa information accessible, accurate, and easy to understand. We believe travelers should have clear, reliable information to make informed decisions about their journeys.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Database className="w-6 h-6 text-teal-600" />
                What We Do
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We compile and structure visa requirement data from official government sources, international aviation authorities, and embassy publications. Our database covers:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Visa types (visa-free, eVisa, visa on arrival, visa required)</li>
                <li>Maximum stay durations and rolling window rules</li>
                <li>Passport validity requirements</li>
                <li>Entry conditions and restrictions</li>
                <li>Official source links for verification</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <RefreshCw className="w-6 h-6 text-teal-600" />
                Data Accuracy & Updates
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our data is reviewed and updated monthly to reflect the latest visa policy changes. We prioritize accuracy by:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Cross-referencing multiple official sources</li>
                <li>Tracking immigration policy announcements</li>
                <li>Verifying changes through embassy publications</li>
                <li>Maintaining update logs for transparency</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                While we strive for complete accuracy, visa rules can change without notice. We always recommend verifying current requirements with official government sources or embassies before making travel arrangements.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Shield className="w-6 h-6 text-teal-600" />
                Independence Statement
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                VisaInfoGuide operates as an independent information service. We are not affiliated with, endorsed by, or connected to any government agency, immigration authority, visa processing service, or official body.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Process visa applications</li>
                <li>Provide legal immigration advice</li>
                <li>Make entry decisions or determinations</li>
                <li>Represent any government or official entity</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Our role is purely informational. All entry decisions are made by border control officers and immigration authorities at ports of entry.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Structure & Methodology</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We structure visa information using a passport-destination pair model. For each combination, we identify:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Primary visa requirement (most common entry method)</li>
                <li>Alternative entry methods where applicable</li>
                <li>Special conditions or restrictions</li>
                <li>Passport validity rules specific to that destination</li>
                <li>Source documentation for verification</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                For detailed information about our data methodology, see our <a href="/methodology" className="text-teal-600 hover:text-teal-700 underline">Methodology page</a>.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
              <p className="text-gray-700 leading-relaxed">
                For questions about our data, corrections, or general inquiries, please reach us at{' '}
                <a href="mailto:contact@visainfoguide.com" className="text-teal-600 hover:text-teal-700 font-medium underline">
                  contact@visainfoguide.com
                </a>. We welcome feedback that helps us improve our service and data accuracy.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Travel Resource Network</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                VisaInfoGuide is part of a family of independent travel information resources. Our sister sites cover specialist areas beyond short-stay visa requirements.
              </p>
              <div className="grid sm:grid-cols-2 gap-5">
                <a
                  href="https://www.immigrationinfoguide.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 p-5 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 hover:border-blue-300 transition-colors"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 group-hover:bg-blue-200 rounded-lg flex items-center justify-center mt-0.5 transition-colors">
                    <svg className="w-5 h-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-900 group-hover:text-blue-700 transition-colors mb-1">ImmigrationInfoGuide.com</p>
                    <p className="text-sm text-blue-800 leading-relaxed">Long-term immigration guides covering work visas, permanent residency, family reunification, and citizenship pathways for 100+ countries.</p>
                  </div>
                </a>
                <a
                  href="https://www.restinairport.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 p-5 rounded-xl border border-teal-200 bg-teal-50 hover:bg-teal-100 hover:border-teal-300 transition-colors"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-teal-100 group-hover:bg-teal-200 rounded-lg flex items-center justify-center mt-0.5 transition-colors">
                    <svg className="w-5 h-5 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-teal-900 group-hover:text-teal-700 transition-colors mb-1">RestInAirport.com</p>
                    <p className="text-sm text-teal-800 leading-relaxed">Airport transit hotel guides, airside rest options, and layover accommodation information for 200+ international airports worldwide.</p>
                  </div>
                </a>
              </div>
            </section>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r">
              <p className="text-sm text-yellow-900 font-semibold mb-2">Important Notice</p>
              <p className="text-sm text-yellow-800">
                The information provided on VisaInfoGuide is for general guidance only. Visa policies can change without notice. Always verify current requirements with official government sources, embassies, or consulates before making travel plans or decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
