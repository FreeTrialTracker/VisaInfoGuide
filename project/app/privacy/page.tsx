import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Shield, Cookie, Eye, Database } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | VisaInfoGuide',
  description: 'VisaInfoGuide privacy policy covering data collection, cookies, analytics, and user information. We do not collect or store visa application data.',
  alternates: {
    canonical: 'https://visainfoguide.com/privacy',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Privacy Policy | VisaInfoGuide',
    description: 'VisaInfoGuide privacy policy covering data collection, cookies, analytics, and user information.',
    type: 'website',
    url: 'https://visainfoguide.com/privacy',
    images: [
      {
        url: 'https://visainfoguide.com/og/legal-og',
        width: 1200,
        height: 630,
        alt: 'Privacy Policy - VisaInfoGuide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | VisaInfoGuide',
    description: 'VisaInfoGuide privacy policy covering data collection, cookies, analytics, and user information.',
    images: ['/og/legal-og'],
  },
};

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Privacy Policy',
            description: 'VisaInfoGuide privacy policy',
            url: 'https://visainfoguide.com/privacy',
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
                  name: 'Privacy',
                  item: 'https://visainfoguide.com/privacy',
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
                { name: 'Privacy', url: '/privacy' },
              ]}
            />
            <h1 className="text-4xl font-bold text-gray-900 mt-6">Privacy Policy</h1>
            <p className="text-gray-600 mt-2">Last updated: February 2026</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="prose prose-gray max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Shield className="w-6 h-6 text-teal-600" />
                Overview
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                VisaInfoGuide ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard information when you visit visainfoguide.com (the "Site").
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Important:</strong> VisaInfoGuide is an information service only. We do not process visa applications, collect passport information, or store any personal travel documents.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Database className="w-6 h-6 text-teal-600" />
                Information We Collect
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Information You Provide</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                When you use our site, you may provide:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Search queries (countries, passports, destinations)</li>
                <li>Trip planning information (destinations and duration)</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                This information is used solely to provide visa requirement results and is not stored on our servers.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Automatically Collected Information</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                We automatically collect:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>IP address (anonymized)</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referral source</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Cookie className="w-6 h-6 text-teal-600" />
                Cookies & Local Storage
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use cookies and browser local storage to enhance your experience:
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-3">Essential Cookies</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Session management</li>
                <li>Site functionality</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-3">Local Storage</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                Our Schengen calculator uses browser local storage to save your trip data locally on your device. This data:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Remains only on your device</li>
                <li>Is never transmitted to our servers</li>
                <li>Can be cleared at any time through your browser settings</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Eye className="w-6 h-6 text-teal-600" />
                Analytics
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use analytics services to understand how visitors use our site. These services may collect:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Pages visited</li>
                <li>Time spent on site</li>
                <li>Browser and device type</li>
                <li>General geographic location (country/city level)</li>
                <li>Referral sources</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Analytics data is aggregated and anonymized. We do not track individual users or create user profiles.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Information</h2>
              <p className="text-gray-700 leading-relaxed mb-2">
                We use collected information to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Provide visa requirement information</li>
                <li>Improve site functionality and user experience</li>
                <li>Analyze usage patterns to enhance content</li>
                <li>Detect and prevent technical issues</li>
                <li>Understand which countries and routes are most searched</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not sell, rent, or trade your information. We may share anonymized, aggregated data with:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Analytics service providers</li>
                <li>Hosting and infrastructure providers</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                We may disclose information if required by law or to protect our rights and safety.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate technical and organizational measures to protect information. However, no internet transmission is completely secure. Use of this site is at your own risk.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-2">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Access information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt out of analytics tracking</li>
                <li>Clear local storage and cookies through your browser</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our site is not directed to children under 13. We do not knowingly collect information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy periodically. Changes will be posted on this page with an updated "Last updated" date. Continued use of the site after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                For questions about this Privacy Policy or to exercise your rights, please contact us at{' '}
                <a href="mailto:contact@visainfoguide.com" className="text-teal-600 hover:text-teal-700 font-medium underline">
                  contact@visainfoguide.com
                </a>.
              </p>
            </section>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r">
              <p className="text-sm text-blue-900 font-semibold mb-2">No Visa Application Data</p>
              <p className="text-sm text-blue-800">
                VisaInfoGuide does not collect, process, or store visa application data, passport numbers, personal identification documents, or travel itinerary details. We are a reference information service only.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
