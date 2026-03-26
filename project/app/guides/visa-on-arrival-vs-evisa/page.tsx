import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { buildTitle, buildDescription, canonicalUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: buildTitle({ type: 'guide', guideName: 'Visa on Arrival vs eVisa' }),
  description: buildDescription({
    type: 'guide',
    guideDescription: 'Key differences between visa on arrival and eVisa. Learn which option is right for your travel plans and how to apply for each type.'
  }),
  alternates: {
    canonical: canonicalUrl('/guides/visa-on-arrival-vs-evisa'),
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function VisaComparisonPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { name: 'Resources', url: '/resources' },
            { name: 'Guides', url: '/resources' },
            { name: 'Visa on Arrival vs eVisa', url: '/guides/visa-on-arrival-vs-evisa' },
          ]}
        />

        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Visa on Arrival vs eVisa
          </h1>
          <p className="text-lg text-gray-600">
            Understanding the differences between visa on arrival and eVisa options to choose the best
            authorization method for your travel.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Visa on Arrival</h2>
            <p className="text-gray-700 mb-4">
              Obtained at the port of entry when you arrive in the destination country.
            </p>
            <h3 className="font-semibold text-gray-900 mb-2">Advantages:</h3>
            <ul className="space-y-1 text-gray-700 text-sm mb-4">
              <li>• No advance application needed</li>
              <li>• Flexible travel planning</li>
              <li>• Immediate processing</li>
            </ul>
            <h3 className="font-semibold text-gray-900 mb-2">Disadvantages:</h3>
            <ul className="space-y-1 text-gray-700 text-sm">
              <li>• Potential queues at immigration</li>
              <li>• Risk of denial at entry</li>
              <li>• Cash payment may be required</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">eVisa</h2>
            <p className="text-gray-700 mb-4">
              Applied for online before travel with electronic approval linked to your passport.
            </p>
            <h3 className="font-semibold text-gray-900 mb-2">Advantages:</h3>
            <ul className="space-y-1 text-gray-700 text-sm mb-4">
              <li>• Pre-approved before travel</li>
              <li>• Faster immigration clearance</li>
              <li>• Online payment options</li>
            </ul>
            <h3 className="font-semibold text-gray-900 mb-2">Disadvantages:</h3>
            <ul className="space-y-1 text-gray-700 text-sm">
              <li>• Requires advance planning</li>
              <li>• Processing time varies</li>
              <li>• Application fees non-refundable</li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Which should you choose?</h2>
          <p className="text-gray-700 mb-4">
            If both options are available for your destination, eVisa is generally recommended for:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>• Peace of mind with pre-approved status</li>
            <li>• Faster clearance at crowded entry points</li>
            <li>• Better documentation for travel insurance and bookings</li>
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
