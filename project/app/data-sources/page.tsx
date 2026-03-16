import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ExternalLink, Building2, Plane, FileText, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Visa Data Sources | VisaInfoGuide',
  description: 'Official sources used by VisaInfoGuide for visa requirements data including immigration authorities, IATA Travel Centre, embassy publications, and government releases.',
  alternates: {
    canonical: 'https://visainfoguide.com/data-sources',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Visa Data Sources | VisaInfoGuide',
    description: 'Official sources used by VisaInfoGuide for visa requirements data including immigration authorities and embassy publications.',
    type: 'website',
    url: 'https://visainfoguide.com/data-sources',
    images: [
      {
        url: 'https://visainfoguide.com/og/legal-og',
        width: 1200,
        height: 630,
        alt: 'Data Sources - VisaInfoGuide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visa Data Sources | VisaInfoGuide',
    description: 'Official sources used by VisaInfoGuide for visa requirements data including immigration authorities and embassy publications.',
    images: ['https://visainfoguide.com/og/legal-og'],
  },
};

export default function DataSourcesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Visa Data Sources',
            description: 'Official sources for VisaInfoGuide visa requirements database',
            url: 'https://visainfoguide.com/data-sources',
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
                  name: 'Data Sources',
                  item: 'https://visainfoguide.com/data-sources',
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
                { name: 'Data Sources', url: '/data-sources' },
              ]}
            />
            <h1 className="text-4xl font-bold text-gray-900 mt-6">Visa Data Sources</h1>
            <p className="text-lg text-gray-600 mt-4">
              Official sources powering the VisaInfoGuide database
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="prose prose-gray max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Building2 className="w-6 h-6 text-teal-600" />
                Official Immigration Authorities
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We compile visa requirements directly from official government immigration and foreign affairs websites. These represent the most authoritative source of entry requirements.
              </p>

              <div className="bg-gray-50 rounded-lg p-6 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Sources Include:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-1">•</span>
                    <span><strong>European Commission</strong> - Schengen visa policy and member state requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-1">•</span>
                    <span><strong>U.S. Department of State</strong> - U.S. visa policies and passport requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-1">•</span>
                    <span><strong>UK Home Office</strong> - UK visa and immigration rules</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-1">•</span>
                    <span><strong>Immigration, Refugees and Citizenship Canada</strong> - Canadian visa requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-1">•</span>
                    <span><strong>Australian Department of Home Affairs</strong> - Australian visa policies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-1">•</span>
                    <span><strong>Individual country immigration portals</strong> - Country-specific requirements (190+ countries monitored)</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Plane className="w-6 h-6 text-teal-600" />
                IATA Travel Centre
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The IATA (International Air Transport Association) Travel Centre provides comprehensive travel documentation requirements used by airlines worldwide. This database is maintained through direct collaboration with immigration authorities and is updated in near real-time.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                The IATA Travel Centre serves as a critical secondary source for cross-verification, particularly for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Transit visa requirements</li>
                <li>Passport validity rules</li>
                <li>Entry restrictions and special conditions</li>
                <li>Temporary policy changes</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                <a
                  href="https://www.iatatravelcentre.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:text-teal-700 inline-flex items-center gap-1"
                >
                  Visit IATA Travel Centre <ExternalLink className="w-4 h-4" />
                </a>
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <FileText className="w-6 h-6 text-teal-600" />
                Embassy & Consulate Publications
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Embassies and consulates provide destination-specific guidance for travelers. We monitor:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Official embassy websites and visa sections</li>
                <li>Consular information sheets</li>
                <li>Visa application guidelines and forms</li>
                <li>Country-specific travel advisories</li>
                <li>Bilateral visa waiver agreements</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Embassy sources are particularly valuable for understanding nuanced entry requirements, documentation needed, and special categories of travel (diplomatic, official, etc.).
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Government Press Releases & Announcements</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Policy changes are often announced through official government channels before being updated on immigration websites. We monitor:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Ministry of Foreign Affairs announcements</li>
                <li>Immigration department press releases</li>
                <li>Official government news portals</li>
                <li>Parliamentary or legislative updates affecting visa policy</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Bilateral Agreements & Treaties</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Many visa-free arrangements stem from bilateral or multilateral agreements. We reference:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Regional visa waiver agreements (e.g., Schengen Agreement, ASEAN agreements)</li>
                <li>Bilateral visa abolition treaties</li>
                <li>Commonwealth arrangements</li>
                <li>Economic community agreements (e.g., ECOWAS, MERCOSUR)</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Source Verification Process</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our verification process includes:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>Primary source identification</strong> - Locate official government documentation</li>
                <li><strong>Cross-referencing</strong> - Compare information across multiple authoritative sources</li>
                <li><strong>Consistency checking</strong> - Ensure alignment between source and destination country information</li>
                <li><strong>Date stamping</strong> - Record when information was last verified</li>
                <li><strong>Change tracking</strong> - Monitor for policy updates and modifications</li>
              </ol>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-teal-600" />
                Important Disclaimer
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                While we strive to maintain accurate and up-to-date information from these authoritative sources:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>Visa policies can change without advance notice</strong></li>
                <li><strong>Individual circumstances may affect entry requirements</strong></li>
                <li><strong>Border officers have final authority on entry decisions</strong></li>
                <li><strong>Some requirements may vary by port of entry</strong></li>
                <li><strong>Emergency measures may not be immediately reflected in official sources</strong></li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-6 font-semibold text-red-700">
                Always verify current requirements with official sources before travel. VisaInfoGuide is a reference tool and does not replace official government information or professional immigration advice.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Reporting Inaccuracies</h2>
              <p className="text-gray-700 leading-relaxed">
                If you identify information that conflicts with official sources, please contact us at{' '}
                <a href="mailto:contact@visainfoguide.com" className="text-teal-600 hover:text-teal-700 font-medium underline">
                  contact@visainfoguide.com
                </a>{' '}with:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mt-2">
                <li>The specific passport-destination combination</li>
                <li>The correct information</li>
                <li>A link to the official source</li>
                <li>Date the source was checked</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                We investigate all reports and update our database accordingly. Your feedback helps us maintain data accuracy for all travelers.
              </p>
            </section>

            <div className="bg-teal-50 border-l-4 border-teal-400 p-6 rounded-r">
              <p className="text-sm text-teal-900 font-semibold mb-2">Data Transparency</p>
              <p className="text-sm text-teal-800">
                We believe in transparent data sourcing. When you view visa requirements on VisaInfoGuide, we provide links to official sources whenever possible so you can verify information directly. Our goal is to be a trusted starting point for your research, not a replacement for official verification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
