import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { buildTitle, buildDescription, canonicalUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: buildTitle({ type: 'guide', guideName: 'Passport Validity Rules' }),
  description: buildDescription({
    type: 'guide',
    guideDescription: 'How much passport validity you need for international travel. Learn about the 6-month and 3-month rules and country-specific requirements.'
  }),
  alternates: {
    canonical: canonicalUrl('/guides/passport-validity-rules'),
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function PassportValidityPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { name: 'Resources', url: '/resources' },
            { name: 'Guides', url: '/resources' },
            { name: 'Passport Validity Rules', url: '/guides/passport-validity-rules' },
          ]}
        />

        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Passport Validity Requirements for International Travel
          </h1>
          <p className="text-lg text-gray-600">
            Most countries require your passport to remain valid for a minimum period beyond your travel dates.
            Understand the rules to avoid being denied boarding or entry.
          </p>
        </header>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">The 6-month rule</h2>
          <p className="text-gray-700 mb-4">
            The majority of countries require your passport to be valid for at least 6 months beyond your
            intended departure date from that country.
          </p>
          <p className="text-gray-700">
            This rule exists to account for unexpected delays, extended stays, or emergency situations that
            might prolong your visit.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">The 3-month rule</h2>
          <p className="text-gray-700 mb-4">
            Some countries, particularly within the Schengen Area, require passport validity of at least 3 months
            beyond your intended departure date.
          </p>
          <p className="text-gray-700">
            Schengen countries also require that your passport was issued within the last 10 years.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Duration of stay rule</h2>
          <p className="text-gray-700">
            A few countries only require that your passport remains valid for the duration of your intended stay.
            However, airlines may refuse boarding if you do not meet the 6-month standard, even if the destination
            country accepts less.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Blank pages requirement</h2>
          <p className="text-gray-700 mb-4">
            Many countries also require at least one or two blank pages in your passport for entry and exit stamps.
          </p>
          <p className="text-gray-700">
            Visa pages and amendment pages typically do not count as blank pages.
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Important reminder</h2>
          <p className="text-gray-700">
            Always check the specific passport validity requirement for your destination country before booking
            travel. Renew your passport well in advance if needed, as processing times can vary.
          </p>
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
