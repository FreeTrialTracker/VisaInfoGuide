import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { buildTitle, buildDescription, canonicalUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: buildTitle({ type: 'guide', guideName: 'Schengen 90/180 Rule' }),
  description: buildDescription({
    type: 'guide',
    guideDescription: 'Understanding the Schengen Area 90/180-day rule for visa-free travel. Learn how to calculate your allowed stay across Schengen countries.'
  }),
  alternates: {
    canonical: canonicalUrl('/guides/schengen-90-180-rule'),
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SchengenRulePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { name: 'Resources', url: '/resources' },
            { name: 'Guides', url: '/resources' },
            { name: 'Schengen 90/180 Rule', url: '/guides/schengen-90-180-rule' },
          ]}
        />

        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Understanding the Schengen 90/180 Rule
          </h1>
          <p className="text-lg text-gray-600">
            The Schengen Area allows visa-free travelers to stay for up to 90 days within any 180-day period.
            Learn how this rolling calculation works and how to track your allowed stay.
          </p>
        </header>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">What is the 90/180 rule?</h2>
          <p className="text-gray-700 mb-4">
            Citizens of countries that have visa-free access to the Schengen Area can stay for up to 90 days
            within any 180-day period. This is a rolling count, not a fixed calendar period.
          </p>
          <p className="text-gray-700">
            The Schengen Area includes 29 European countries that have abolished passport control at their
            mutual borders.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">How the calculation works</h2>
          <p className="text-gray-700 mb-4">
            For any given day, look back 180 days. Count the number of days you have already spent in the
            Schengen Area during that period. If you have spent fewer than 90 days, you may enter or remain.
          </p>
          <p className="text-gray-700">
            This means the calculation changes every day, creating a rolling window.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Important notes</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• The 180-day period keeps rolling; it is not fixed to a calendar year</li>
            <li>• Both entry and exit days count as days spent in the Schengen Area</li>
            <li>• The rule applies to all Schengen countries combined, not per country</li>
            <li>• Overstaying can result in fines, deportation, and future entry bans</li>
          </ul>
        </div>

        <nav className="border-t border-gray-200 pt-6">
          <Link
            href="/resources"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to resources
          </Link>
        </nav>
      </div>
    </main>
  );
}
