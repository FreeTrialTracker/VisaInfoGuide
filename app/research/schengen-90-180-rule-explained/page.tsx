import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, AlertTriangle, Clock, MapPin, Calculator, Database } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Schengen 90/180 Rule Explained: Complete Guide to Visa-Free Stay Limits (2026)',
  description: 'Comprehensive guide to the Schengen Area 90/180 day rule. Learn how to calculate your stay, avoid overstays, track days, and understand exceptions for all 29 Schengen countries.',
  openGraph: {
    title: 'Schengen 90/180 Rule: Ultimate Guide to Visa-Free Stay Limits',
    description: 'Master the Schengen 90/180 rule with calculation examples, tracking methods, exceptions, and consequences of overstaying.',
  },
};

const schengenCountries = [
  { name: 'Austria', slug: 'austria', joined: '1997' },
  { name: 'Belgium', slug: 'belgium', joined: '1995' },
  { name: 'Croatia', slug: 'croatia', joined: '2023' },
  { name: 'Czech Republic', slug: 'czech-republic', joined: '2007' },
  { name: 'Denmark', slug: 'denmark', joined: '2001' },
  { name: 'Estonia', slug: 'estonia', joined: '2007' },
  { name: 'Finland', slug: 'finland', joined: '2001' },
  { name: 'France', slug: 'france', joined: '1995' },
  { name: 'Germany', slug: 'germany', joined: '1995' },
  { name: 'Greece', slug: 'greece', joined: '2000' },
  { name: 'Hungary', slug: 'hungary', joined: '2007' },
  { name: 'Iceland', slug: 'iceland', joined: '2001' },
  { name: 'Italy', slug: 'italy', joined: '1997' },
  { name: 'Latvia', slug: 'latvia', joined: '2007' },
  { name: 'Liechtenstein', slug: 'liechtenstein', joined: '2011' },
  { name: 'Lithuania', slug: 'lithuania', joined: '2007' },
  { name: 'Luxembourg', slug: 'luxembourg', joined: '1995' },
  { name: 'Malta', slug: 'malta', joined: '2007' },
  { name: 'Netherlands', slug: 'netherlands', joined: '1995' },
  { name: 'Norway', slug: 'norway', joined: '2001' },
  { name: 'Poland', slug: 'poland', joined: '2007' },
  { name: 'Portugal', slug: 'portugal', joined: '1995' },
  { name: 'Slovakia', slug: 'slovakia', joined: '2007' },
  { name: 'Slovenia', slug: 'slovenia', joined: '2007' },
  { name: 'Spain', slug: 'spain', joined: '1995' },
  { name: 'Sweden', slug: 'sweden', joined: '2001' },
  { name: 'Switzerland', slug: 'switzerland', joined: '2008' },
];

const calculationExamples = [
  {
    scenario: 'Simple Single Visit',
    description: 'Visited Italy March 1-30 (30 days)',
    calculation: '30 days used in any 180-day period',
    remaining: '60 days available',
    status: 'Compliant',
  },
  {
    scenario: 'Multiple Short Visits',
    description: '15 days in France (Jan), 20 days in Spain (Mar), 25 days in Germany (May)',
    calculation: '60 days total in 180-day window',
    remaining: '30 days available',
    status: 'Compliant',
  },
  {
    scenario: 'Maximum Stay Used',
    description: '90 consecutive days in Portugal',
    calculation: '90 days used, must wait 90 days before returning',
    remaining: '0 days until 90 days pass',
    status: 'Must Exit',
  },
  {
    scenario: 'Rolling Window Violation',
    description: '45 days (Feb-Mar), 30 days (May-Jun), 25 days (Aug) = 100 days in 180 days',
    calculation: '100 days exceeds 90-day limit',
    remaining: 'Overstay occurred',
    status: 'Violation',
  },
];

const overstayConsequences = [
  { severity: 'Minor (1-5 days)', consequence: 'Warning, possible fine €50-500', future: 'Usually no long-term impact' },
  { severity: 'Moderate (6-30 days)', consequence: 'Fine €500-1000+, possible ban', future: '1-3 year entry ban possible' },
  { severity: 'Serious (31-90 days)', consequence: 'Heavy fines, deportation, ban', future: '3-5 year entry ban likely' },
  { severity: 'Severe (90+ days)', consequence: 'Deportation, criminal record, ban', future: '5-10 year ban, permanent record' },
];

const trackingMethods = [
  { method: 'EU Short-Stay Calculator', description: 'Official online calculator from eu.europa.eu', accuracy: 'High', cost: 'Free' },
  { method: 'Passport Stamps', description: 'Manual tracking via entry/exit stamps', accuracy: 'Medium', cost: 'Free' },
  { method: 'Spreadsheet Tracking', description: 'Self-maintained Excel/Google Sheets', accuracy: 'Medium-High', cost: 'Free' },
  { method: 'Mobile Apps', description: 'Third-party apps like SchengenCalculator', accuracy: 'High', cost: 'Free-$10' },
  { method: 'Professional Service', description: 'Immigration consultant tracking', accuracy: 'Very High', cost: '$50-200/month' },
];

export default function Schengen90180Rule() {
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
            Schengen 90/180 Rule Explained: Complete Guide to Visa-Free Stay Limits
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Master the Schengen Area's 90/180 day rule with detailed calculations, tracking methods, exceptions, and strategies to maximize your visa-free travel across 27 European countries.
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-8 rounded-r-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mt-0 mb-2">Critical Rule Summary</h3>
                <p className="mb-0 text-gray-700">
                  Non-EU/EEA nationals can stay maximum <strong>90 days within any 180-day period</strong> in the Schengen Area without a visa. This is a rolling calculation, not a calendar period. Overstays result in fines, bans, and deportation.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
            <MapPin className="w-8 h-8 text-teal-600" />
            What is the Schengen Area?
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            The Schengen Area is a zone comprising 27 European countries that have abolished internal border controls, allowing free movement between member states. Created by the Schengen Agreement signed in 1985, this area functions as a single jurisdiction for international travel purposes, with common visa policies and external border controls.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            For travelers, this means once you enter one Schengen country, you can move freely between all member states without passport checks at internal borders. However, this freedom comes with the 90/180 rule that limits how long non-EU/EEA nationals can stay within the entire area.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Schengen Member Countries (27 Total)</h3>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm my-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Country</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Joined Schengen</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Visa Requirements</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {schengenCountries.map((country, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{country.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{country.joined}</td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/destination/${country.slug}`}
                          className="text-sm text-teal-600 hover:text-teal-700 font-medium hover:underline"
                        >
                          View Details →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Important: Not All EU Countries are in Schengen</h3>

          <p className="text-gray-700 leading-relaxed mb-6">
            Ireland and Cyprus are EU members but NOT part of the Schengen Area. They maintain their own border controls and visa policies. Time spent in Ireland or Cyprus does NOT count toward your 90/180 Schengen limit. However, Bulgaria and Romania, while EU members, are in the process of joining Schengen and currently have separate rules.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Conversely, Norway, Iceland, Switzerland, and Liechtenstein are NOT EU members but ARE part of the Schengen Area. Time spent in these countries DOES count toward your 90/180 limit. This distinction is crucial for planning extended European trips.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
            <Calculator className="w-8 h-8 text-teal-600" />
            Understanding the 90/180 Rule: How It Actually Works
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            The 90/180 rule is often misunderstood. It's NOT "90 days, then leave for 90 days, then return for another 90 days." Instead, it's a rolling calculation that checks whether you've spent more than 90 days in the Schengen Area during any 180-day period looking backwards from your current date.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Rolling Window Concept</h3>

          <p className="text-gray-700 leading-relaxed mb-6">
            Every single day you're in the Schengen Area (or trying to enter), immigration officials can look back 180 days and count how many days you've already spent there. If that count reaches 90 days, you cannot enter or must leave immediately. This means:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li>The 180-day period is constantly moving - it's always "the last 180 days"</li>
            <li>Days spent in the Schengen Area eventually "drop off" after 180 days</li>
            <li>You can't simply wait 90 days outside then get another 90 days - it depends on your previous stays</li>
            <li>Even a single day counts as a full day (arrival and departure days both count)</li>
            <li>The rule applies to the entire Schengen Area collectively, not per country</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Calculation Method: Step-by-Step</h3>

          <div className="bg-gray-50 rounded-lg p-6 my-6">
            <h4 className="font-semibold text-gray-900 mb-3">How to Calculate Your Remaining Days</h4>
            <ol className="space-y-3 list-decimal pl-5 text-gray-700">
              <li>Take today's date (or your planned entry date)</li>
              <li>Count back 180 days</li>
              <li>Add up all days you spent in the Schengen Area during those 180 days</li>
              <li>Subtract that number from 90</li>
              <li>The result is how many days you can still spend in the Schengen Area</li>
            </ol>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            For example, if today is June 1, 2026, you look back to December 3, 2025. If you spent 40 days in the Schengen Area between December 3, 2025 and June 1, 2026, you can spend 50 more days (90 - 40 = 50) before needing to leave.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Real-World Calculation Examples</h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            Understanding theory is one thing, but seeing real examples helps clarify how the 90/180 rule works in practice. Here are common scenarios travelers encounter:
          </p>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm my-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Scenario</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Description</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Calculation</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {calculationExamples.map((example, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{example.scenario}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{example.description}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        <div className="mb-1">{example.calculation}</div>
                        <div className="text-xs text-gray-500">{example.remaining}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          example.status === 'Compliant' ? 'bg-green-100 text-green-800' :
                          example.status === 'Must Exit' ? 'bg-amber-100 text-amber-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {example.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Example 1: Maximum Continuous Stay</h3>

          <p className="text-gray-700 leading-relaxed mb-6">
            Sarah, a <Link href="/passport/united-states" className="text-teal-600 hover:underline">US passport holder</Link>, enters <Link href="/passport/united-states/destination/france" className="text-teal-600 hover:underline">France</Link> on January 1, 2026 for a 90-day trip across Europe. She travels through <Link href="/passport/united-states/destination/italy" className="text-teal-600 hover:underline">Italy</Link>, <Link href="/passport/united-states/destination/germany" className="text-teal-600 hover:underline">Germany</Link>, and <Link href="/passport/united-states/destination/spain" className="text-teal-600 hover:underline">Spain</Link>, staying continuously until March 31, 2026 (90 days).
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            She must now leave the Schengen Area. When can she return? The earliest she can return for another full 90-day stay is July 1, 2026. Why? On July 1, when she looks back 180 days (to January 1), those previous 90 days will have "dropped off" the rolling window, giving her a fresh 90 days.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            However, she could return earlier for a shorter stay. For example, on May 1 (31 days after leaving), looking back 180 days includes 59 days from her previous stay, so she could spend 31 more days (90 - 59 = 31).
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Example 2: Multiple Short Trips</h3>

          <p className="text-gray-700 leading-relaxed mb-6">
            James, a <Link href="/passport/canada" className="text-teal-600 hover:underline">Canadian passport holder</Link>, makes several business trips: 15 days in <Link href="/passport/canada/destination/germany" className="text-teal-600 hover:underline">Germany</Link> (January), 20 days in <Link href="/passport/canada/destination/netherlands" className="text-teal-600 hover:underline">Netherlands</Link> (March), 25 days in <Link href="/passport/canada/destination/belgium" className="text-teal-600 hover:underline">Belgium</Link> (May), and wants to spend 30 days in <Link href="/passport/canada/destination/portugal" className="text-teal-600 hover:underline">Portugal</Link> in July.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            By July, his January trip (15 days) is still within the 180-day window. Total days in the past 180 days: 15 + 20 + 25 = 60 days. He can spend 30 days in Portugal (90 - 60 = 30) and remain compliant. After this trip, he's used all 90 days and must carefully plan future visits.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Example 3: The Overstay Mistake</h3>

          <p className="text-gray-700 leading-relaxed mb-6">
            Maria didn't track her days carefully. She spent: 45 days (February-March), 30 days (May-June), and then planned 25 days in August. In August, looking back 180 days from her entry date, she's already spent 75 days (her February-March trip is still in the window). She should only stay 15 days (90 - 75 = 15), not 25. If she stays 25 days, she'll have 100 days in a 180-day period—a 10-day overstay.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
            <Clock className="w-8 h-8 text-teal-600" />
            How to Track Your Schengen Days
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            Accurately tracking your Schengen days is essential to avoid overstays. Relying on memory or rough estimates is dangerous—use one of these proven methods:
          </p>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm my-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Method</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Description</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Accuracy</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {trackingMethods.map((method, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{method.method}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{method.description}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{method.accuracy}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{method.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Official EU Short-Stay Calculator (Recommended)</h3>

          <p className="text-gray-700 leading-relaxed mb-6">
            The European Commission provides a free online calculator at <strong>ec.europa.eu/home-affairs/content/schengen-calculator</strong>. This is the most authoritative tool and uses the exact algorithm that border officials use. Input your previous stays, and it calculates your remaining days precisely.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            The calculator requires: dates of previous entries and exits, and your planned entry date. It instantly shows whether your planned stay is compliant. Use this before booking any Schengen travel to avoid costly mistakes.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Passport Stamps: The Physical Record</h3>

          <p className="text-gray-700 leading-relaxed mb-6">
            Your passport stamps are the official proof of your entries and exits. Border officials check these stamps when determining compliance. Always ensure you receive entry and exit stamps—if traveling between Schengen countries with no border checks, your last entry stamp serves as evidence.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Important: With the upcoming Entry/Exit System (EES), the EU is moving toward electronic recording. Once implemented, the system will automatically track all entries and exits, making manual stamp counting obsolete but also making overstays immediately detectable.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Spreadsheet and App Tracking</h3>

          <p className="text-gray-700 leading-relaxed mb-6">
            Many travelers maintain a simple spreadsheet with columns for entry date, exit date, country, and cumulative days. This helps visualize your stays and plan future trips. Several mobile apps also automate this tracking, sending alerts when you're approaching your 90-day limit.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Consequences of Overstaying</h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            Overstaying your Schengen allowance is a serious violation with immediate and long-term consequences. The severity depends on the overstay duration and whether it appears intentional:
          </p>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm my-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Overstay Length</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Immediate Consequence</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Future Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {overstayConsequences.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.severity}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{item.consequence}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{item.future}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Detection and Enforcement</h3>

          <p className="text-gray-700 leading-relaxed mb-6">
            Overstays are typically detected at exit when border officials check your entry stamp and calculate your stay. However, with the upcoming EES electronic system, overstays will be automatically flagged, making detection immediate and certain. Some countries also conduct internal checks during police checks or hotel registrations.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Entry Bans and Schengen Information System (SIS)</h3>

          <p className="text-gray-700 leading-relaxed mb-6">
            Serious overstays can result in an entry ban recorded in the Schengen Information System (SIS), a database shared by all member states. This ban prevents entry to any Schengen country for the specified period. Bans can range from 1-10 years and sometimes longer for repeat offenders. Fighting a ban is difficult, expensive, and often unsuccessful.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Impact on Future Visa Applications</h3>

          <p className="text-gray-700 leading-relaxed mb-6">
            Even minor overstays can affect future Schengen visa applications. If you later need a long-stay visa for work, study, or family reasons, consular officials will see your overstay history. This can lead to visa denials or increased scrutiny. An overstay creates a permanent mark on your immigration record.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Exceptions and Extended Stay Options</h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            While the 90/180 rule is strict, several legal options exist for extending your stay or spending more time in Europe:
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">National Long-Stay Visas (Type D)</h3>

          <p className="text-gray-700 leading-relaxed mb-6">
            Each Schengen country issues its own long-stay visas (Type D) for stays exceeding 90 days. These are typically for work, study, family reunification, or retirement. A Type D visa for one country (e.g., <Link href="/passport/united-states/destination/france" className="text-teal-600 hover:underline">French long-stay visa</Link>) allows you to stay in that country beyond 90 days, plus grants 90 days in the rest of the Schengen Area.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Residence Permits</h3>

          <p className="text-gray-700 leading-relaxed mb-6">
            Residence permits from any Schengen country exempt you from the 90/180 rule in that country. You can live in your residence country indefinitely and still have 90 days in other Schengen countries per 180 days. This is popular among digital nomads and retirees who establish legal residence in one country.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Non-Schengen European Countries</h3>

          <p className="text-gray-700 leading-relaxed mb-6">
            Time spent in Ireland, United Kingdom, Cyprus, Romania, and Bulgaria does NOT count toward your Schengen 90/180 limit. Many travelers use these countries as "reset destinations" to spend time in Europe while their Schengen days replenish. However, each has its own visa rules:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li><Link href="/destination/united-kingdom" className="text-teal-600 hover:underline">UK</Link>: Up to 180 days visa-free for many nationalities</li>
            <li><Link href="/destination/ireland" className="text-teal-600 hover:underline">Ireland</Link>: 90 days visa-free (separate from Schengen)</li>
            <li>Romania & Bulgaria: Currently separate rules, joining Schengen soon</li>
            <li>Cyprus: Separate visa policy as EU member outside Schengen</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Balkans and Eastern Europe</h3>

          <p className="text-gray-700 leading-relaxed mb-6">
            Countries like Albania, Serbia, Montenegro, North Macedonia, Bosnia, and Ukraine offer visa-free or visa-on-arrival access for many nationalities with their own separate day counts. Spending time in these countries doesn't use your Schengen allowance, making them popular for travelers wanting extended European stays.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Special Cases and Common Questions</h2>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Do Transit Flights Count?</h3>

          <p className="text-gray-700 leading-relaxed mb-6">
            If you transit through a Schengen airport without entering the Schengen Area (staying in the international transit area), this does NOT count toward your 90 days. However, if you pass through immigration to collect and recheck luggage, or to spend time in the city during a layover, these days DO count. Keep proof of your transit-only status (boarding passes, not entering through passport control).
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What About Cruise Ships?</h3>

          <p className="text-gray-700 leading-relaxed mb-6">
            Days spent on cruise ships in international waters don't count toward your 90/180 limit. However, each port day where you disembark in a Schengen country does count as a day. Some cruise lines structure itineraries to minimize Schengen days by including non-Schengen ports.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Can I Reset by Leaving for a Day?</h3>

          <p className="text-gray-700 leading-relaxed mb-6">
            No. Leaving for a single day (e.g., quick trip to UK or Morocco) doesn't "reset" your counter. The 90/180 rule is cumulative and rolling. Those days spent in Schengen only drop off 180 days after they occurred, regardless of how many times you exit and re-enter. Border officials are aware of this tactic and view it negatively.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What If I Have Dual Citizenship?</h3>

          <p className="text-gray-700 leading-relaxed mb-6">
            If one of your citizenships is from an EU/EEA country, you can use that passport for unlimited stay in the Schengen Area. If both passports are non-EU, use the stronger passport (more visa-free access) consistently. Don't switch between passports to hide previous stays—immigration systems share data and this can be considered fraud.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Emergency Situations and Extensions</h3>

          <p className="text-gray-700 leading-relaxed mb-6">
            In genuine emergencies (serious illness, accident, force majeure), you may be able to extend your stay beyond 90 days. Contact the local immigration office or police immediately when the emergency occurs. Provide documentation (medical certificates, police reports) and request an emergency extension. These are granted case-by-case and don't excuse overstays that occurred before seeking help.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Strategies for Long-Term European Travel</h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            Many travelers want to spend more than 90 days in Europe. Here are legitimate strategies that comply with regulations:
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The 90/90 Strategy</h3>

          <p className="text-gray-700 leading-relaxed mb-6">
            Spend 90 days in the Schengen Area, then 90 days in non-Schengen European countries (UK, Ireland, Balkans, Eastern Europe). After 90 days outside Schengen, your first Schengen days start dropping off, giving you fresh days. This allows roughly 6 months in Europe per year while remaining compliant.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Obtain a Residence Permit</h3>

          <p className="text-gray-700 leading-relaxed mb-6">
            Several countries offer residence permits for remote workers, retirees, or investors. <Link href="/destination/portugal" className="text-teal-600 hover:underline">Portugal's D7 visa</Link>, <Link href="/destination/spain" className="text-teal-600 hover:underline">Spain's digital nomad visa</Link>, and similar programs in Greece, Italy, and other countries allow legal long-term residence. With residence, you can live in that country unlimited and still travel 90 days per 180 in other Schengen countries.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Study or Work Visas</h3>

          <p className="text-gray-700 leading-relaxed mb-6">
            Enrolling in a language course, university program, or securing employment in a Schengen country exempts you from the 90/180 rule through a Type D long-stay visa or residence permit. Even part-time language courses can qualify for student visas in countries like <Link href="/destination/france" className="text-teal-600 hover:underline">France</Link> and <Link href="/destination/germany" className="text-teal-600 hover:underline">Germany</Link>.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Strategic Country Selection</h3>

          <p className="text-gray-700 leading-relaxed mb-6">
            Base yourself in the UK or Ireland (not in Schengen) and take trips to Schengen countries. This way, most of your time doesn't count toward the 90/180 limit. Digital nomads often use London or Dublin as a base with regular weekend trips to mainland Europe.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Future: Entry/Exit System (EES)</h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            The EU is implementing the Entry/Exit System (EES), an electronic border control system that will replace passport stamps. Expected to be fully operational by late 2024-2025, EES will automatically record all entries and exits with biometric data (fingerprints and facial images).
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What EES Means for Travelers</h3>

          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li><strong>Automatic tracking</strong>: No more stamp counting—the system knows exactly how many days you've used</li>
            <li><strong>Real-time compliance</strong>: At entry, the system instantly calculates if you're allowed to enter</li>
            <li><strong>Overstay detection</strong>: Any overstay is immediately flagged in the database</li>
            <li><strong>Faster processing</strong>: Once registered, border crossings become faster with biometric verification</li>
            <li><strong>No hiding</strong>: Impossible to "forget" to disclose previous stays or use different entry points to avoid detection</li>
          </ul>

          <p className="text-gray-700 leading-relaxed mb-6">
            EES will make the 90/180 rule easier to track but also more strictly enforced. The days of unclear stamping or border officers not calculating precisely will end. Compliance becomes mandatory and automatic.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
            <Database className="w-8 h-8 text-teal-600" />
            Data Methodology
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            This guide is based on official Schengen Area regulations, particularly the Schengen Borders Code (Regulation (EU) 2016/399) and visa regulations (Regulation (EC) No 810/2009). We monitor official EU sources, national immigration authorities, and European Commission publications for updates.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Legal Framework</h3>

          <p className="text-gray-700 leading-relaxed mb-6">
            The 90/180 rule is codified in Article 6 of the Schengen Borders Code. It applies to all non-EU/EEA/Swiss nationals entering without a visa for short stays (tourism, business, visiting family). Each Schengen country implements this uniformly, though penalties for overstaying may vary slightly by country.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Update Frequency</h3>

          <p className="text-gray-700 leading-relaxed mb-6">
            Schengen Area membership and rules are stable but do change. Croatia joined in 2023, and Bulgaria/Romania are in the accession process. We monitor official EU and national government sources weekly for changes. This page was last updated on {new Date(lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Disclaimer</h3>

          <p className="text-gray-700 leading-relaxed mb-6">
            This guide provides general information only and is not legal advice. Immigration rules can change, and individual circumstances vary. Always verify your specific situation with official sources or immigration lawyers. While we strive for accuracy, we cannot guarantee the information is complete, current, or applicable to your case. Entry decisions rest solely with border officials.
          </p>

          <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 my-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Check Your Visa Requirements</h3>
            <p className="text-gray-700 mb-4">
              Plan your European trip with confidence. Use our tools to check visa requirements for any Schengen country:
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors">
                Trip Visa Finder
              </Link>
              <Link href="/compare" className="inline-flex items-center gap-2 px-4 py-2 bg-white text-teal-600 font-medium rounded-lg border-2 border-teal-600 hover:bg-teal-50 transition-colors">
                Compare Passports
              </Link>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I stay 90 days, leave for 90 days, then return for another 90 days?</h3>
              <p className="text-gray-700">
                Not exactly. It depends on the rolling 180-day window. If you stay 90 days and leave immediately, you must wait until those days "drop off" the 180-day window. The safest approach after a full 90-day stay is to wait 90 days before returning for another full stay. Use the official EU calculator to check specific dates.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do I need to track days if I'm only visiting for 2 weeks?</h3>
              <p className="text-gray-700">
                For a single short trip, tracking is simple—just count the days. However, if you plan multiple trips throughout the year, start tracking from your first visit. Many travelers underestimate how quickly days accumulate with multiple short trips and accidentally overstay.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What happens if I accidentally overstay by one day?</h3>
              <p className="text-gray-700">
                Even one-day overstays are violations, though consequences depend on circumstances. If unintentional (miscalculation, flight cancellation), explain immediately at exit. You'll likely receive a warning and small fine. Repeated minor overstays or appearing intentional leads to harsher penalties including entry bans.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Does the UK count toward my Schengen 90 days?</h3>
              <p className="text-gray-700">
                No. The UK left the EU and is not part of Schengen. Time in the UK doesn't count toward your 90/180 Schengen limit. The UK has its own visa rules—check <Link href="/destination/united-kingdom" className="text-teal-600 hover:underline">UK visa requirements</Link> separately. Learn more about <Link href="/research/passport-validity-rules-by-country" className="text-teal-600 hover:underline">passport validity rules</Link> for UK travel.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How can I spend more than 90 days in Europe legally?</h3>
              <p className="text-gray-700">
                Options include: obtaining a long-stay visa (Type D) for work, study, or family reasons; getting a residence permit through investment or digital nomad programs; spending time in non-Schengen countries (UK, Ireland, Balkans); or timing your visits to maximize the rolling window without exceeding 90 days per 180 days.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Will Schengen countries know about my previous visits?</h3>
              <p className="text-gray-700">
                Yes. Border officials check your passport stamps and increasingly share data electronically. With the Entry/Exit System (EES) being implemented, all Schengen entries and exits are automatically recorded and accessible to all member states. Assuming officials won't notice previous visits is dangerous and often results in denied entry or overstay penalties.
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Related Research & Guides</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/research/most-powerful-passports-2026" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h4 className="font-semibold text-gray-900 mb-1">Most Powerful Passports 2026</h4>
                <p className="text-sm text-gray-600">Compare visa-free access and global mobility for passports worldwide</p>
              </Link>
              <Link href="/research/passport-validity-rules-by-country" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h4 className="font-semibold text-gray-900 mb-1">Passport Validity Rules</h4>
                <p className="text-sm text-gray-600">Essential validity requirements for Schengen and worldwide travel</p>
              </Link>
              <Link href="/research/visa-free-vs-visa-on-arrival-vs-evisa" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h4 className="font-semibold text-gray-900 mb-1">Visa Types Explained</h4>
                <p className="text-sm text-gray-600">Understanding visa-free, visa-on-arrival, and eVisa differences</p>
              </Link>
              <Link href="/research/onward-ticket-requirements-by-country" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h4 className="font-semibold text-gray-900 mb-1">Onward Ticket Requirements</h4>
                <p className="text-sm text-gray-600">Which countries require proof of onward travel</p>
              </Link>
            </div>
          </div>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Schengen 90/180 Rule Explained: Complete Guide to Visa-Free Stay Limits',
            description: 'Comprehensive guide to the Schengen Area 90/180 day rule. Learn how to calculate your stay, avoid overstays, track days, and understand exceptions.',
            datePublished: lastUpdated,
            dateModified: lastUpdated,
            author: {
              '@type': 'Organization',
              name: 'VisaInfoGuide.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'VisaInfoGuide.com',
              logo: {
                '@type': 'ImageObject',
                url: 'https://visainfoguide.com/visa.png',
              },
            },
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Can I stay 90 days, leave for 90 days, then return for another 90 days?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Not exactly. It depends on the rolling 180-day window. If you stay 90 days and leave immediately, you must wait until those days "drop off" the 180-day window. The safest approach after a full 90-day stay is to wait 90 days before returning for another full stay.',
                },
              },
              {
                '@type': 'Question',
                name: 'What happens if I accidentally overstay by one day?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Even one-day overstays are violations, though consequences depend on circumstances. If unintentional, explain immediately at exit. You\'ll likely receive a warning and small fine. Repeated minor overstays or appearing intentional leads to harsher penalties including entry bans.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does the UK count toward my Schengen 90 days?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. The UK left the EU and is not part of Schengen. Time in the UK doesn\'t count toward your 90/180 Schengen limit. The UK has its own visa rules.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
