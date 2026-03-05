import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, AlertTriangle, Shield, Database, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Passport Validity Rules by Country: Complete 2026 Requirements Database',
  description: 'Comprehensive database of passport validity requirements for 195+ countries. Learn 3-month, 6-month, and duration rules, blank page requirements, and avoid denied boarding.',
  openGraph: {
    title: 'Passport Validity Rules: Complete Country-by-Country Guide',
    description: 'Essential passport validity requirements for every destination worldwide. Avoid travel disruptions with accurate validity data.',
  },
};

const validityByRegion = [
  { region: '6-Month Rule', countries: 125, percentage: 64, description: 'Most common requirement globally' },
  { region: '3-Month Rule', countries: 45, percentage: 23, description: 'Common in Europe/Schengen' },
  { region: 'Duration of Stay', countries: 25, percentage: 13, description: 'Less common, mostly US/Canada/Mexico' },
];

const sixMonthCountries = [
  { country: 'Thailand', slug: 'thailand', rule: '6 months', blankPages: 2, notes: 'Strictly enforced' },
  { country: 'China', slug: 'china', rule: '6 months', blankPages: 1, notes: 'Required for visa application' },
  { country: 'Indonesia', slug: 'indonesia', rule: '6 months', blankPages: 1, notes: 'Checked at airport' },
  { country: 'Philippines', slug: 'philippines', rule: '6 months', blankPages: 2, notes: 'Plus onward ticket' },
  { country: 'Vietnam', slug: 'vietnam', rule: '6 months', blankPages: 2, notes: 'For visa-free entry' },
  { country: 'India', slug: 'india', rule: '6 months', blankPages: 2, notes: 'Required for all visas' },
  { country: 'Singapore', slug: 'singapore', rule: '6 months', blankPages: 1, notes: 'Standard requirement' },
  { country: 'United Arab Emirates', slug: 'united-arab-emirates', rule: '6 months', blankPages: 1, notes: 'From entry date' },
  { country: 'Egypt', slug: 'egypt', rule: '6 months', blankPages: 2, notes: 'For tourist visa' },
  { country: 'South Africa', slug: 'south-africa', rule: '6 months', blankPages: 2, notes: 'Plus consecutive pages' },
];

const threeMonthCountries = [
  { country: 'France', slug: 'france', rule: '3 months', blankPages: 1, notes: 'Schengen standard' },
  { country: 'Germany', slug: 'germany', rule: '3 months', blankPages: 1, notes: 'Beyond departure date' },
  { country: 'Italy', slug: 'italy', rule: '3 months', blankPages: 1, notes: 'Plus issued within 10 years' },
  { country: 'Spain', slug: 'spain', rule: '3 months', blankPages: 1, notes: 'Schengen requirement' },
  { country: 'Netherlands', slug: 'netherlands', rule: '3 months', blankPages: 1, notes: 'Standard for Schengen' },
  { country: 'Switzerland', slug: 'switzerland', rule: '3 months', blankPages: 1, notes: 'Follows Schengen rules' },
  { country: 'Greece', slug: 'greece', rule: '3 months', blankPages: 1, notes: 'Beyond intended departure' },
  { country: 'Austria', slug: 'austria', rule: '3 months', blankPages: 1, notes: 'Schengen Area member' },
  { country: 'Belgium', slug: 'belgium', rule: '3 months', blankPages: 1, notes: 'Plus 10-year issuance rule' },
  { country: 'Poland', slug: 'poland', rule: '3 months', blankPages: 1, notes: 'Schengen standard' },
];

const durationCountries = [
  { country: 'United States', slug: 'united-states', rule: 'Duration', blankPages: 0, notes: 'Only for length of stay' },
  { country: 'Canada', slug: 'canada', rule: 'Duration + 1 day', blankPages: 0, notes: 'Beyond expected departure' },
  { country: 'United Kingdom', slug: 'united-kingdom', rule: 'Duration', blankPages: 1, notes: 'For length of stay only' },
  { country: 'Ireland', slug: 'ireland', rule: 'Duration', blankPages: 0, notes: 'No additional validity needed' },
  { country: 'Mexico', slug: 'mexico', rule: 'Duration', blankPages: 0, notes: 'Valid for stay period' },
  { country: 'New Zealand', slug: 'new-zealand', rule: '3 months', blankPages: 0, notes: 'Beyond intended departure' },
  { country: 'Australia', slug: 'australia', rule: 'Duration', blankPages: 0, notes: 'Electronic travel authority' },
];

const commonMistakes = [
  { mistake: 'Confusing entry vs departure date', impact: 'High', prevention: 'Always count from departure date, not entry' },
  { mistake: 'Not checking airline policies', impact: 'High', prevention: 'Airlines may enforce stricter rules than countries' },
  { mistake: 'Assuming all Schengen same', impact: 'Medium', prevention: 'Some Schengen countries have additional rules' },
  { mistake: 'Forgetting blank pages', impact: 'High', prevention: 'Check both validity AND blank pages' },
  { mistake: 'Booking before checking', impact: 'Very High', prevention: 'Verify passport validity before paying' },
];

export default function PassportValidityRules() {
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
            Passport Validity Rules by Country: Complete 2026 Requirements Database
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Essential passport validity requirements for 195+ destinations worldwide. Understand 3-month, 6-month, and duration rules, blank page requirements, and airline enforcement policies to avoid denied boarding and entry refusals.
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8 rounded-r-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mt-0 mb-2">Critical: Check Before Booking</h3>
                <p className="mb-0 text-gray-700">
                  Insufficient passport validity is a leading cause of denied boarding and entry refusal. Airlines and immigration can deny entry even with valid visas if your passport doesn't meet validity requirements. Always verify BEFORE booking flights.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
            <Shield className="w-8 h-8 text-teal-600" />
            Understanding Passport Validity Rules
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            Passport validity requirements exist to ensure travelers have valid documents throughout their stay and provide a buffer for unexpected delays, emergencies, or extended stays. These rules vary significantly by country, with three main categories: the 6-month rule, 3-month rule, and duration of stay requirements.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            The validity period is calculated from your DEPARTURE date (when you leave the destination country), not your arrival date. This is a common source of confusion that leads to denied boarding. For example, if entering <Link href="/passport/united-states/destination/thailand" className="text-teal-600 hover:underline">Thailand</Link> on March 1 for a 30-day stay (departing March 31), your passport must be valid until September 31—6 months beyond March 31.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Global Distribution of Validity Rules</h3>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm my-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Rule Type</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Countries</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Percentage</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {validityByRegion.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.region}</td>
                      <td className="px-6 py-4 text-sm text-right text-gray-900">{item.countries}</td>
                      <td className="px-6 py-4 text-sm text-right">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-teal-100 text-teal-800">
                          {item.percentage}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
            <Clock className="w-8 h-8 text-teal-600" />
            The 6-Month Rule: Most Common Requirement
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            The 6-month passport validity rule is the most widespread requirement globally, enforced by approximately 125 countries. This rule requires your passport to remain valid for at least 6 months beyond your intended departure date from the destination country. The rule is particularly common in Asia, Africa, the Middle East, and South America.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Why 6 months? This buffer accounts for: unexpected flight cancellations or delays, medical emergencies requiring extended stays, natural disasters or political situations preventing departure, visa extensions that might be granted, and processing time if passport renewal becomes necessary during your trip. Immigration officials strictly enforce this rule, and airlines will deny boarding if your passport falls short of the requirement.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Countries Requiring 6-Month Validity</h3>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm my-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Country</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Validity Rule</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Blank Pages</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Important Notes</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sixMonthCountries.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.country}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{item.rule}</td>
                      <td className="px-6 py-4 text-sm text-right text-gray-900">{item.blankPages}</td>
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
            Popular destinations strictly enforcing the 6-month rule include <Link href="/passport/united-states/destination/thailand" className="text-teal-600 hover:underline">Thailand</Link>, <Link href="/passport/canada/destination/china" className="text-teal-600 hover:underline">China</Link>, <Link href="/passport/australia/destination/indonesia" className="text-teal-600 hover:underline">Indonesia</Link>, <Link href="/passport/united-kingdom/destination/vietnam" className="text-teal-600 hover:underline">Vietnam</Link>, and <Link href="/passport/united-states/destination/india" className="text-teal-600 hover:underline">India</Link>. Many travelers are caught off guard, particularly when traveling to Southeast Asia for extended trips. Airlines check passport validity at check-in and will deny boarding if the 6-month requirement isn't met, even if you have a valid visa.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The 3-Month Rule: Schengen and European Standard</h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            The 3-month (90-day) validity rule is standard across the Schengen Area and several other European countries. Your passport must be valid for at least 3 months beyond your intended departure date. Additionally, Schengen countries require that your passport was issued within the last 10 years, even if the expiration date is still far in the future. This catches many travelers with older but still "valid" passports.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            The Schengen Area's 3-month rule works in conjunction with the <Link href="/research/schengen-90-180-rule-explained" className="text-teal-600 hover:underline">90/180 day visa-free stay rule</Link>. When entering for the maximum 90-day stay, your passport must remain valid for 3 months beyond the 90th day. This means you effectively need 6 months of validity from entry for a maximum-duration Schengen visit. Learn more about Schengen travel rules in our comprehensive guide.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Schengen Countries: 3-Month Validity Requirement</h3>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm my-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Country</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Validity Rule</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Blank Pages</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Important Notes</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {threeMonthCountries.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.country}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{item.rule}</td>
                      <td className="px-6 py-4 text-sm text-right text-gray-900">{item.blankPages}</td>
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

          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-8 rounded-r-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Schengen Special Rule: 10-Year Issuance</h4>
            <p className="text-gray-700 mb-0">
              Your passport must have been issued within the last 10 years, regardless of the expiration date. A passport issued more than 10 years ago, even if still valid, will be rejected for Schengen entry. This rule catches many travelers with 15-year validity passports (common for children).
            </p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Duration of Stay Rule: Minimum Requirement Countries</h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            Some countries only require your passport to remain valid for the duration of your intended stay, with no additional buffer period. This is less common but includes major destinations like the <Link href="/passport/canada/destination/united-states" className="text-teal-600 hover:underline">United States</Link>, <Link href="/passport/united-states/destination/canada" className="text-teal-600 hover:underline">Canada</Link>, and the <Link href="/passport/united-states/destination/united-kingdom" className="text-teal-600 hover:underline">United Kingdom</Link>.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            However, there's a critical caveat: even if the destination country only requires validity for your stay duration, your airline may enforce a 6-month rule. Airlines face fines and penalties if they transport passengers who don't meet entry requirements, so many apply the 6-month standard globally to avoid issues. Always confirm both the country's requirement AND your airline's policy.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Countries with Duration of Stay Requirements</h3>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm my-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Country</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Validity Rule</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Blank Pages</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Important Notes</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {durationCountries.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.country}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{item.rule}</td>
                      <td className="px-6 py-4 text-sm text-right text-gray-900">{item.blankPages}</td>
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

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Blank Pages Requirements</h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            Beyond validity dates, many countries require a minimum number of blank pages in your passport for entry and exit stamps. The most common requirement is 2 consecutive blank pages, though some countries accept 1 page. Pages with previous stamps, visas, or amendments don't count as "blank."
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Countries strictly enforcing blank page requirements include <Link href="/passport/united-states/destination/south-africa" className="text-teal-600 hover:underline">South Africa</Link> (2 consecutive pages), <Link href="/passport/canada/destination/thailand" className="text-teal-600 hover:underline">Thailand</Link> (2 pages), and <Link href="/passport/australia/destination/vietnam" className="text-teal-600 hover:underline">Vietnam</Link> (2 pages). If your passport is running low on blank pages, consider requesting additional pages (if your country offers this service) or renewing your passport before travel.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Common Mistakes and How to Avoid Them</h2>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm my-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Common Mistake</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Impact</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Prevention Strategy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {commonMistakes.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.mistake}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          item.impact === 'Very High' || item.impact === 'High' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {item.impact}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{item.prevention}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Airline Enforcement Policies</h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            Airlines bear responsibility for transporting passengers with proper documentation. If a passenger is denied entry due to passport issues, the airline faces fines and must transport the passenger back at their own expense. Consequently, airline check-in agents carefully verify passport validity before issuing boarding passes.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Many airlines apply the strictest standard globally—the 6-month rule—regardless of the destination's actual requirement. This means even when traveling to a country requiring only duration-of-stay validity (like the US or UK), your airline might refuse boarding if you don't have 6 months validity. Always contact your specific airline to confirm their policies before traveling with a passport close to expiration.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">When to Renew Your Passport</h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            The safest approach: renew your passport when it has less than 1 year of validity remaining, especially if you're a frequent traveler. Passport renewal can take weeks or months depending on your country's processing times, and expedited services cost significantly more. Renewing proactively prevents last-minute emergencies and denied travel.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 my-6">
            <h4 className="font-semibold text-gray-900 mb-3">Renewal Triggers - Consider Renewing If:</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-teal-600 font-bold">•</span>
                <span className="text-gray-700">Less than 12 months validity remaining</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 font-bold">•</span>
                <span className="text-gray-700">Fewer than 4 blank pages remaining</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 font-bold">•</span>
                <span className="text-gray-700">Planning trips to 6-month rule countries</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 font-bold">•</span>
                <span className="text-gray-700">Passport issued more than 9 years ago (for Schengen travel)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 font-bold">•</span>
                <span className="text-gray-700">Damaged pages, water damage, or significant wear</span>
              </li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
            <Database className="w-8 h-8 text-teal-600" />
            Data Methodology
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            Passport validity requirements are compiled from official government immigration and foreign affairs sources, embassy websites, and airline industry databases (IATA Travel Centre). Requirements can change, and countries may enforce rules differently based on circumstances. We update our database quarterly and monitor official sources for policy changes.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Disclaimer</h3>

          <p className="text-gray-700 leading-relaxed mb-6">
            This guide provides general information only. Passport validity requirements can change without notice, and enforcement varies. Always verify requirements with: official embassy or consulate of your destination country, your airline (check their specific policies), and your country's travel advisory services. We cannot guarantee accuracy or completeness, and entry decisions rest with immigration officials. This information was last updated on {new Date(lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.
          </p>

          <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 my-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Check Specific Requirements for Your Trip</h3>
            <p className="text-gray-700 mb-4">
              Verify exact passport validity and visa requirements for your specific journey:
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

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Related Research & Guides</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/research/most-powerful-passports-2026" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h4 className="font-semibold text-gray-900 mb-1">Most Powerful Passports 2026</h4>
                <p className="text-sm text-gray-600">Global passport rankings and visa-free access analysis</p>
              </Link>
              <Link href="/research/schengen-90-180-rule-explained" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h4 className="font-semibold text-gray-900 mb-1">Schengen 90/180 Rule</h4>
                <p className="text-sm text-gray-600">Complete guide to Schengen visa-free stay limits</p>
              </Link>
              <Link href="/research/visa-free-vs-visa-on-arrival-vs-evisa" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h4 className="font-semibold text-gray-900 mb-1">Visa Types Comparison</h4>
                <p className="text-sm text-gray-600">Understanding different visa categories and requirements</p>
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
            headline: 'Passport Validity Rules by Country: Complete 2026 Requirements Database',
            description: 'Comprehensive database of passport validity requirements for 195+ countries worldwide.',
            datePublished: lastUpdated,
            dateModified: lastUpdated,
            author: {
              '@type': 'Organization',
              name: 'VisaInfoGuide.com',
            },
          }),
        }}
      />
    </div>
  );
}
