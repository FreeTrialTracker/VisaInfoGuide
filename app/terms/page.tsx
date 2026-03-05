import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { FileText, AlertTriangle, Scale, Copyright } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Use | VisaInfoGuide',
  description: 'Terms of Use for VisaInfoGuide. Understand limitations of liability, informational purpose, user responsibilities, and intellectual property rights.',
  alternates: {
    canonical: 'https://visainfoguide.com/terms',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Terms of Use | VisaInfoGuide',
    description: 'Terms of Use for VisaInfoGuide. Understand limitations of liability, informational purpose, and user responsibilities.',
    type: 'website',
    url: 'https://visainfoguide.com/terms',
    images: [
      {
        url: 'https://visainfoguide.com/og/legal-og',
        width: 1200,
        height: 630,
        alt: 'Terms of Use - VisaInfoGuide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Use | VisaInfoGuide',
    description: 'Terms of Use for VisaInfoGuide. Understand limitations of liability, informational purpose, and user responsibilities.',
    images: ['/og/legal-og'],
  },
};

export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Terms of Use',
            description: 'VisaInfoGuide Terms of Use',
            url: 'https://visainfoguide.com/terms',
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
                  name: 'Terms',
                  item: 'https://visainfoguide.com/terms',
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
                { name: 'Terms', url: '/terms' },
              ]}
            />
            <h1 className="text-4xl font-bold text-gray-900 mt-6">Terms of Use</h1>
            <p className="text-gray-600 mt-2">Last updated: February 2026</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="prose prose-gray max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <FileText className="w-6 h-6 text-teal-600" />
                Acceptance of Terms
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By accessing and using VisaInfoGuide ("the Site"), you accept and agree to be bound by these Terms of Use. If you do not agree with these terms, please do not use the Site.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-teal-600" />
                Informational Purpose Only
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                VisaInfoGuide provides visa requirement information for general informational and reference purposes only. Use of this Site and its information is entirely at your own risk.
              </p>

              <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r my-6">
                <p className="text-sm text-red-900 font-semibold mb-2">Critical Disclaimer</p>
                <ul className="text-sm text-red-800 space-y-2">
                  <li><strong>• Not Legal Advice:</strong> Information on this Site does not constitute legal, immigration, or professional advice.</li>
                  <li><strong>• Not Government Affiliated:</strong> We are not affiliated with any government, immigration authority, or official body.</li>
                  <li><strong>• No Application Services:</strong> We do not process visa applications or provide visa services.</li>
                  <li><strong>• No Guarantees:</strong> We make no guarantees about entry, visa approval, or travel authorization.</li>
                </ul>
              </div>

              <p className="text-gray-700 leading-relaxed mt-4">
                Border control officers and immigration authorities have sole discretion over entry decisions. Information on this Site should not be relied upon as a substitute for official sources or professional advice.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Accuracy and Updates</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                While we strive to maintain accurate and current information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Visa policies can change without notice</li>
                <li>Information may be incomplete, outdated, or inaccurate</li>
                <li>Errors or omissions may occur despite our best efforts</li>
                <li>We cannot guarantee real-time updates</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4 font-semibold">
                You must verify all information with official government sources, embassies, or consulates before making travel decisions or arrangements.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Scale className="w-6 h-6 text-teal-600" />
                Limitation of Liability
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To the maximum extent permitted by law, VisaInfoGuide and its operators shall not be liable for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Denied entry, visa refusals, or travel disruptions</li>
                <li>Missed flights, canceled reservations, or financial losses</li>
                <li>Errors, inaccuracies, or omissions in information provided</li>
                <li>Reliance on information from this Site</li>
                <li>Any direct, indirect, incidental, consequential, or punitive damages</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Use of this Site and its information is at your sole risk. We disclaim all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">User Responsibilities</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                As a user of VisaInfoGuide, you are responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Verifying all visa requirements with official sources</li>
                <li>Consulting with qualified immigration professionals when needed</li>
                <li>Ensuring your passport and travel documents meet all requirements</li>
                <li>Complying with all applicable laws and regulations</li>
                <li>Understanding that information provided is general and may not apply to your specific circumstances</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">External Links</h2>
              <p className="text-gray-700 leading-relaxed">
                This Site contains links to external websites for reference purposes. We are not responsible for the content, accuracy, or availability of external sites. Links do not imply endorsement, affiliation, or sponsorship.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Copyright className="w-6 h-6 text-teal-600" />
                Intellectual Property
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                All content on VisaInfoGuide, including text, graphics, logos, data compilations, and software, is the property of VisaInfoGuide or its content suppliers and is protected by copyright and intellectual property laws.
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-3">Permitted Use</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                You may:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Access and view content for personal, non-commercial use</li>
                <li>Print or save content for personal reference</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-3">Prohibited Use</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                You may not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Reproduce, distribute, or republish content without permission</li>
                <li>Use automated systems (bots, scrapers) to access the Site</li>
                <li>Modify or create derivative works from Site content</li>
                <li>Use content for commercial purposes without authorization</li>
                <li>Remove copyright or proprietary notices</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptable Use</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                When using VisaInfoGuide, you agree not to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Attempt to gain unauthorized access to systems or networks</li>
                <li>Interfere with or disrupt the Site or servers</li>
                <li>Use the Site for any unlawful purpose</li>
                <li>Submit false, misleading, or inaccurate information</li>
                <li>Impersonate any person or entity</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these Terms of Use at any time. Changes will be posted on this page with an updated "Last updated" date. Your continued use of the Site after changes constitutes acceptance of the revised terms.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to terminate or suspend access to the Site at any time, without notice, for conduct that violates these Terms or is harmful to other users, us, or third parties.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms shall be governed by and construed in accordance with applicable laws. Any disputes shall be resolved in accordance with governing jurisdiction.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
              <p className="text-gray-700 leading-relaxed">
                For questions about these Terms of Use, please contact us at{' '}
                <a href="mailto:contact@visainfoguide.com" className="text-teal-600 hover:text-teal-700 font-medium underline">
                  contact@visainfoguide.com
                </a>.
              </p>
            </section>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r">
              <p className="text-sm text-yellow-900 font-semibold mb-2">Final Reminder</p>
              <p className="text-sm text-yellow-800">
                VisaInfoGuide is a reference tool. Always verify visa requirements with official government sources, embassies, or qualified immigration professionals before travel. We are not responsible for entry denials, travel disruptions, or any consequences of relying on information from this Site.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
