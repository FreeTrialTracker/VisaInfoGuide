import { Metadata } from 'next';
import Link from 'next/link';
import { Plane, AlertCircle, CheckCircle, Database, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Onward Ticket Requirements by Country: Complete 2026 Guide',
  description: 'Comprehensive database of onward ticket requirements for 195+ countries. Learn which destinations require proof of departure, alternatives, and how to avoid entry denial.',
};

const strictCountries = [
  { country: 'Thailand', slug: 'thailand', enforcement: 'High', alternatives: 'Bus/train to neighboring country', notes: 'Airlines check rigorously' },
  { country: 'Philippines', slug: 'philippines', enforcement: 'Very High', alternatives: 'Ferry to other islands accepted', notes: 'Consistently enforced' },
  { country: 'Indonesia', slug: 'indonesia', enforcement: 'High', alternatives: 'Flight to Singapore/Malaysia', notes: 'Required for visa-free entry' },
  { country: 'New Zealand', slug: 'new-zealand', enforcement: 'Very High', alternatives: 'Flight to Australia accepted', notes: 'Strictly enforced' },
  { country: 'United Kingdom', slug: 'united-kingdom', enforcement: 'Medium', alternatives: 'Return ticket or onward to EU', notes: 'Immigration may ask' },
  { country: 'Brazil', slug: 'brazil', enforcement: 'High', alternatives: 'Bus to Argentina/Uruguay', notes: 'Airlines enforce strictly' },
  { country: 'Costa Rica', slug: 'costa-rica', enforcement: 'High', alternatives: 'Bus to Nicaragua/Panama', notes: 'Required at check-in' },
  { country: 'Peru', slug: 'peru', enforcement: 'Medium', alternatives: 'Bus to Bolivia/Chile', notes: 'Occasionally checked' },
  { country: 'Panama', slug: 'panama', enforcement: 'High', alternatives: 'Bus to Costa Rica acceptable', notes: 'Airlines check' },
  { country: 'Mexico', slug: 'mexico', enforcement: 'Low', alternatives: 'Rarely enforced', notes: 'Mostly for long stays' },
];

export default function OnwardTicketRequirements() {
  const lastUpdated = '2026-02-19';

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <article className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-8">
          <div className="flex items-center gap-4 text-sm mb-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Last updated: {new Date(lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2 text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
              <Database className="w-4 h-4" />
              <span className="font-medium">Reviewed and updated monthly</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Onward Ticket Requirements by Country: Complete 2026 Guide
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Comprehensive database of onward ticket requirements for international travel. Learn which countries require proof of departure, enforcement levels, acceptable alternatives, and strategies to avoid denied boarding.
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-8 rounded-r-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mt-0 mb-2">Critical: Airlines Enforce Before Immigration</h3>
                <p className="mb-0 text-gray-700">
                  Onward ticket requirements are primarily enforced by airlines at check-in, not immigration. You can be denied boarding even if the destination country might not check. Always have proof ready when checking in for your flight.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">What is an Onward Ticket Requirement?</h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            An onward ticket is proof that you plan to leave the destination country within the allowed period of your visa-free or visa stay. This can be a return flight to your home country, a flight to another destination, or sometimes ground/sea transportation to a neighboring country.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Countries require onward tickets to prevent illegal immigration and overstaying. Without proof you'll leave, immigration officials assume you might stay beyond your permitted time. Airlines enforce this strictly because they face fines and must transport you back if you're denied entry.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Countries Strictly Enforcing Onward Tickets</h2>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm my-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Country</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Enforcement</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Alternatives Accepted</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Notes</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {strictCountries.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.country}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          item.enforcement === 'Very High' ? 'bg-red-100 text-red-800' :
                          item.enforcement === 'High' ? 'bg-orange-100 text-orange-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.enforcement}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{item.alternatives}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.notes}</td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/destination/${item.slug}`}
                          className="text-sm text-teal-600 hover:text-teal-700 font-medium hover:underline"
                        >
                          View Requirements →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            <Link href="/passport/united-states/destination/thailand" className="text-teal-600 hover:underline">Thailand</Link>, <Link href="/passport/canada/destination/philippines" className="text-teal-600 hover:underline">Philippines</Link>, <Link href="/passport/australia/destination/indonesia" className="text-teal-600 hover:underline">Indonesia</Link>, and <Link href="/passport/united-kingdom/destination/new-zealand" className="text-teal-600 hover:underline">New Zealand</Link> are among the strictest enforcers. Airlines serving these destinations routinely deny boarding without proof of onward travel. Digital nomads and long-term travelers frequently encounter this issue.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Acceptable Forms of Proof</h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            Most countries and airlines accept various forms of onward travel proof:
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-bold text-gray-900 m-0">Widely Accepted</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700 m-0">
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span>Confirmed flight booking (print or email confirmation)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span>Return ticket to country of origin</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span>Onward flight to third country</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span>Flexible/refundable ticket</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-6 h-6 text-amber-600" />
                <h3 className="text-lg font-bold text-gray-900 m-0">Sometimes Accepted</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700 m-0">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Bus/train tickets to neighboring countries</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Ferry/boat tickets</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Temporary onward ticket services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Hotel reservation with stated departure date</span>
                </li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Solutions for Flexible Travelers</h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            Many travelers prefer flexible itineraries without fixed departure dates. Several solutions exist for these situations:
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Fully Refundable Tickets</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            Book a fully refundable flight for check-in purposes, then cancel immediately after clearing immigration. Major airlines offer refundable fares (expensive but refunded completely). This is the most legitimate approach though costly upfront.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Temporary Onward Ticket Services</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            Companies provide valid flight reservations for 48 hours for $10-15. These are real bookings that airlines and immigration can verify, but they expire quickly. Popular services include Best Onward Ticket and Onward Ticket. While widely used, there's slight risk if immigration checks after expiration.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Cheap Onwards to Neighboring Countries</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            Book an inexpensive flight to a nearby destination. For <Link href="/passport/united-states/destination/thailand" className="text-teal-600 hover:underline">Thailand</Link>, get a $30 flight to Malaysia or Cambodia. For <Link href="/passport/canada/destination/philippines" className="text-teal-600 hover:underline">Philippines</Link>, book to Hong Kong or Singapore. You can later decide whether to use the ticket or forfeit the cost.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Changeable Tickets</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            Some airlines offer free or low-cost date changes. Book a cheap onward flight with flexible change policies, then modify the date once your plans solidify. Budget carriers sometimes offer this for small fees ($20-50).
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
            <Database className="w-8 h-8 text-teal-600" />
            Data Methodology
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            Onward ticket requirements compiled from official immigration policies, airline enforcement reports, and traveler experiences. Requirements and enforcement vary—always check official sources. Last updated {new Date(lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.
          </p>

          <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 my-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Check Specific Requirements</h3>
            <p className="text-gray-700 mb-4">Verify visa and entry requirements for your travel:</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors">
                Trip Visa Finder
              </Link>
              <Link href="/compare" className="inline-flex items-center gap-2 px-4 py-2 bg-white text-teal-600 font-medium rounded-lg border-2 border-teal-600 hover:bg-teal-50 transition-colors">
                Compare Passports
              </Link>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Related Research</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/research/visa-free-vs-visa-on-arrival-vs-evisa" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h4 className="font-semibold text-gray-900 mb-1">Visa Types Comparison</h4>
                <p className="text-sm text-gray-600">Understanding visa-free, VoA, and eVisa systems</p>
              </Link>
              <Link href="/research/passport-validity-rules-by-country" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h4 className="font-semibold text-gray-900 mb-1">Passport Validity Rules</h4>
                <p className="text-sm text-gray-600">Essential validity requirements worldwide</p>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
