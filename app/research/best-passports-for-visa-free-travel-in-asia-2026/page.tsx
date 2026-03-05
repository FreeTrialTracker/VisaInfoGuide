import { Metadata } from 'next';
import Link from 'next/link';
import { Globe, TrendingUp, MapPin, Calendar, Database, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { canonicalUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Best Passports for Visa-Free Travel in Asia 2026: Regional Rankings',
  description: 'Which passports offer the most visa-free access across Asia in 2026? Complete regional rankings covering Southeast Asia, East Asia, and South Asia with country-by-country access data.',
  alternates: {
    canonical: canonicalUrl('/research/best-passports-for-visa-free-travel-in-asia-2026'),
  },
  openGraph: {
    title: 'Best Passports for Visa-Free Travel in Asia 2026',
    description: 'Ranked analysis of passport visa-free access across Southeast Asia, East Asia, and South Asia with full country-by-country data.',
    url: canonicalUrl('/research/best-passports-for-visa-free-travel-in-asia-2026'),
  },
};

const southeastAsiaRankings = [
  { passport: 'Singapore', flag: '🇸🇬', visaFree: 10, total: 11, slug: 'singapore', highlights: 'Visa-free to all ASEAN nations plus Japan, South Korea' },
  { passport: 'Japan', flag: '🇯🇵', visaFree: 10, total: 11, slug: 'japan', highlights: 'Strong access across full ASEAN region' },
  { passport: 'South Korea', flag: '🇰🇷', visaFree: 9, total: 11, slug: 'south-korea', highlights: 'Visa-free to most ASEAN, requires visa for Myanmar' },
  { passport: 'Germany', flag: '🇩🇪', visaFree: 9, total: 11, slug: 'germany', highlights: 'Strong EU passport access across ASEAN' },
  { passport: 'United States', flag: '🇺🇸', visaFree: 8, total: 11, slug: 'united-states', highlights: 'Limited access to Vietnam, Cambodia requires eVisa' },
  { passport: 'United Kingdom', flag: '🇬🇧', visaFree: 8, total: 11, slug: 'united-kingdom', highlights: 'Similar to US, strong in most ASEAN nations' },
  { passport: 'Australia', flag: '🇦🇺', visaFree: 7, total: 11, slug: 'australia', highlights: 'Solid regional access with ETA options' },
  { passport: 'India', flag: '🇮🇳', visaFree: 4, total: 11, slug: 'india', highlights: 'Visa-free to Maldives, Nepal, Bhutan, Thailand' },
  { passport: 'China', flag: '🇨🇳', visaFree: 5, total: 11, slug: 'china', highlights: 'Improving access with new bilateral agreements' },
];

const eastAsiaRankings = [
  { passport: 'Singapore', flag: '🇸🇬', visaFree: 5, total: 5, slug: 'singapore', highlights: 'Visa-free to Japan, South Korea, Taiwan, Hong Kong, Macau' },
  { passport: 'Germany', flag: '🇩🇪', visaFree: 5, total: 5, slug: 'germany', highlights: 'Full access including 30-day visa-free China' },
  { passport: 'France', flag: '🇫🇷', visaFree: 5, total: 5, slug: 'france', highlights: 'Full East Asia access including 30-day visa-free China' },
  { passport: 'Japan', flag: '🇯🇵', visaFree: 5, total: 5, slug: 'japan', highlights: 'Full East Asia access including 30-day visa-free China' },
  { passport: 'United Kingdom', flag: '🇬🇧', visaFree: 5, total: 5, slug: 'united-kingdom', highlights: 'Full East Asia access — China visa-free from Feb 17, 2026' },
  { passport: 'United States', flag: '🇺🇸', visaFree: 3, total: 5, slug: 'united-states', highlights: 'Requires China and Taiwan visas' },
  { passport: 'India', flag: '🇮🇳', visaFree: 2, total: 5, slug: 'india', highlights: 'Limited East Asia access overall' },
  { passport: 'Pakistan', flag: '🇵🇰', visaFree: 1, total: 5, slug: 'pakistan', highlights: 'Very limited East Asia visa-free access' },
];

const southAsiaRankings = [
  { passport: 'Singapore', flag: '🇸🇬', visaFree: 7, total: 8, slug: 'singapore', highlights: 'Near-complete South Asia access' },
  { passport: 'United States', flag: '🇺🇸', visaFree: 6, total: 8, slug: 'united-states', highlights: 'Strong South Asia access, requires India eVisa' },
  { passport: 'United Kingdom', flag: '🇬🇧', visaFree: 6, total: 8, slug: 'united-kingdom', highlights: 'Good regional access including India eVisa' },
  { passport: 'Japan', flag: '🇯🇵', visaFree: 5, total: 8, slug: 'japan', highlights: 'Good access but requires visas for key nations' },
  { passport: 'India', flag: '🇮🇳', visaFree: 4, total: 8, slug: 'india', highlights: 'Visa-free to Nepal, Bhutan, Maldives, Mauritius' },
  { passport: 'China', flag: '🇨🇳', visaFree: 3, total: 8, slug: 'china', highlights: 'Improving but still limited South Asia access' },
  { passport: 'Pakistan', flag: '🇵🇰', visaFree: 2, total: 8, slug: 'pakistan', highlights: 'Very restricted South Asia access' },
];

const topOverallForAsia = [
  {
    rank: 1,
    passport: 'Singapore',
    flag: '🇸🇬',
    slug: 'singapore',
    seAsia: 10,
    eAsia: 5,
    sAsia: 7,
    total: 22,
    verdict: 'Best in Class',
    verdictColor: 'text-emerald-700 bg-emerald-50',
  },
  {
    rank: 2,
    passport: 'Japan',
    flag: '🇯🇵',
    slug: 'japan',
    seAsia: 10,
    eAsia: 4,
    sAsia: 5,
    total: 19,
    verdict: 'Excellent',
    verdictColor: 'text-teal-700 bg-teal-50',
  },
  {
    rank: 3,
    passport: 'Germany',
    flag: '🇩🇪',
    slug: 'germany',
    seAsia: 9,
    eAsia: 5,
    sAsia: 6,
    total: 20,
    verdict: 'Excellent',
    verdictColor: 'text-teal-700 bg-teal-50',
  },
  {
    rank: 4,
    passport: 'South Korea',
    flag: '🇰🇷',
    slug: 'south-korea',
    seAsia: 9,
    eAsia: 4,
    sAsia: 5,
    total: 18,
    verdict: 'Very Good',
    verdictColor: 'text-blue-700 bg-blue-50',
  },
  {
    rank: 5,
    passport: 'United States',
    flag: '🇺🇸',
    slug: 'united-states',
    seAsia: 8,
    eAsia: 3,
    sAsia: 6,
    total: 17,
    verdict: 'Good',
    verdictColor: 'text-gray-700 bg-gray-100',
  },
  {
    rank: 6,
    passport: 'United Kingdom',
    flag: '🇬🇧',
    slug: 'united-kingdom',
    seAsia: 8,
    eAsia: 3,
    sAsia: 6,
    total: 17,
    verdict: 'Good',
    verdictColor: 'text-gray-700 bg-gray-100',
  },
  {
    rank: 7,
    passport: 'India',
    flag: '🇮🇳',
    slug: 'india',
    seAsia: 4,
    eAsia: 2,
    sAsia: 4,
    total: 10,
    verdict: 'Limited',
    verdictColor: 'text-amber-700 bg-amber-50',
  },
  {
    rank: 8,
    passport: 'China',
    flag: '🇨🇳',
    slug: 'china',
    seAsia: 5,
    eAsia: 3,
    sAsia: 3,
    total: 11,
    verdict: 'Limited',
    verdictColor: 'text-amber-700 bg-amber-50',
  },
];

const keyDestinations = [
  {
    country: 'Japan',
    flag: '🇯🇵',
    slug: 'japan',
    visaFreePassports: ['Singapore', 'South Korea', 'US', 'UK', 'EU nations'],
    requiresVisa: ['India', 'Pakistan', 'Nigeria', 'most African nations'],
    stayLimit: '15–90 days depending on passport',
  },
  {
    country: 'Thailand',
    flag: '🇹🇭',
    slug: 'thailand',
    visaFreePassports: ['US', 'UK', 'EU', 'Australia', 'Japan', 'South Korea'],
    requiresVisa: ['Pakistan', 'some African and Middle Eastern nations'],
    stayLimit: '30 days (extended to 60 for many Western passports)',
  },
  {
    country: 'South Korea',
    flag: '🇰🇷',
    slug: 'south-korea',
    visaFreePassports: ['Singapore', 'Japan', 'US', 'UK', 'EU', 'Australia'],
    requiresVisa: ['India', 'Pakistan', 'China (limited)'],
    stayLimit: '30–90 days depending on passport',
  },
  {
    country: 'Vietnam',
    flag: '🇻🇳',
    slug: 'vietnam',
    visaFreePassports: ['Japan', 'South Korea', 'Singapore', 'most ASEAN nations'],
    requiresVisa: ['US (eVisa available)', 'UK (eVisa available)', 'EU (eVisa available)'],
    stayLimit: '15–45 days depending on passport/visa type',
  },
  {
    country: 'Singapore',
    flag: '🇸🇬',
    slug: 'singapore',
    visaFreePassports: ['Most developed-nation passports', 'All ASEAN members'],
    requiresVisa: ['Pakistan', 'some South Asian and African passports'],
    stayLimit: '14–90 days depending on passport',
  },
  {
    country: 'China',
    flag: '🇨🇳',
    slug: 'china',
    visaFreePassports: ['France', 'Germany', 'Italy (15 days)', 'Singapore', 'Switzerland'],
    requiresVisa: ['US', 'UK', 'Japan', 'India', 'Australia'],
    stayLimit: '15 days for new visa-free agreements',
  },
];

export default function BestPassportsAsiaPage() {
  const lastUpdated = '2026-02-25';

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <article className="container mx-auto px-4 py-12 max-w-5xl">

        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
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
            Best Passports for Visa-Free Travel in Asia 2026
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            A ranked analysis of which passports unlock the most destinations across Southeast Asia, East Asia, and South Asia without requiring a traditional visa. Data covers 25 countries across three sub-regions as of 2026.
          </p>
        </div>

        <nav className="bg-white border border-gray-200 rounded-xl p-6 mb-12 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Contents</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              { label: 'Overall Asia Rankings', href: '#overall-rankings' },
              { label: 'Southeast Asia Rankings', href: '#southeast-asia' },
              { label: 'East Asia Rankings', href: '#east-asia' },
              { label: 'South Asia Rankings', href: '#south-asia' },
              { label: 'Key Destination Breakdown', href: '#key-destinations' },
              { label: 'Strategic Tips', href: '#strategic-tips' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 text-teal-600 hover:text-teal-800 font-medium text-sm transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 flex-shrink-0" />
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        <div className="prose prose-lg max-w-none">

          <h2 id="overall-rankings" className="text-3xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-8">
            Overall Asia Rankings: Combined Score
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            The table below ranks passports by their combined visa-free access across all three Asian sub-regions — Southeast Asia (11 countries), East Asia (5 countries), and South Asia (8 countries). Singapore holds a clear lead as the only passport to achieve near-complete visa-free coverage across all three regions.
          </p>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm my-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">Rank</th>
                    <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">Passport</th>
                    <th className="px-5 py-4 text-center text-sm font-semibold text-gray-700">SE Asia<br /><span className="text-xs font-normal text-gray-500">/11</span></th>
                    <th className="px-5 py-4 text-center text-sm font-semibold text-gray-700">E Asia<br /><span className="text-xs font-normal text-gray-500">/5</span></th>
                    <th className="px-5 py-4 text-center text-sm font-semibold text-gray-700">S Asia<br /><span className="text-xs font-normal text-gray-500">/8</span></th>
                    <th className="px-5 py-4 text-center text-sm font-semibold text-gray-700">Total<br /><span className="text-xs font-normal text-gray-500">/24</span></th>
                    <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {topOverallForAsia.map((entry) => (
                    <tr key={entry.passport} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 text-sm font-bold text-gray-500">#{entry.rank}</td>
                      <td className="px-5 py-4">
                        <Link
                          href={`/passport/${entry.slug}`}
                          className="flex items-center gap-2 font-semibold text-gray-900 hover:text-teal-700 transition-colors"
                        >
                          <span className="text-xl">{entry.flag}</span>
                          {entry.passport}
                        </Link>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span className={`font-semibold ${entry.seAsia >= 9 ? 'text-emerald-600' : entry.seAsia >= 7 ? 'text-teal-600' : 'text-amber-600'}`}>
                          {entry.seAsia}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span className={`font-semibold ${entry.eAsia >= 4 ? 'text-emerald-600' : entry.eAsia >= 3 ? 'text-teal-600' : 'text-amber-600'}`}>
                          {entry.eAsia}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span className={`font-semibold ${entry.sAsia >= 6 ? 'text-emerald-600' : entry.sAsia >= 4 ? 'text-teal-600' : 'text-amber-600'}`}>
                          {entry.sAsia}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span className="font-bold text-gray-900 text-base">{entry.total}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${entry.verdictColor}`}>
                          {entry.verdict}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
            <div className="flex items-start gap-3">
              <Globe className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mt-0 mb-2">What Counts as Visa-Free Access?</h3>
                <p className="mb-0 text-gray-700">
                  For this analysis, &quot;visa-free access&quot; includes both traditional visa-free entry and eVisa/electronic authorization systems that can be obtained entirely online within 72 hours or less. It excludes traditional embassy visas requiring in-person applications or lead times exceeding one week.
                </p>
              </div>
            </div>
          </div>

          <h2 id="southeast-asia" className="text-3xl font-bold text-gray-900 mt-16 mb-6 scroll-mt-8">
            Southeast Asia: 11 Countries Ranked
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            Southeast Asia is the most visited region in Asia, comprising the 10 ASEAN member states plus Timor-Leste. The region has a wide disparity in visa policies — some nations like Thailand and Singapore have liberal visa-free policies for most developed-nation passports, while others like Myanmar and Vietnam are more restrictive.
          </p>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm my-8">
            <div className="bg-teal-600 px-6 py-4">
              <h3 className="text-white font-semibold text-lg m-0">Southeast Asia Visa-Free Rankings</h3>
              <p className="text-teal-100 text-sm mt-1 mb-0">Out of 11 Southeast Asian countries (ASEAN + Timor-Leste)</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Passport</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Visa-Free</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 hidden md:table-cell">Key Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {southeastAsiaRankings.map((entry) => (
                    <tr key={entry.passport} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <Link
                          href={`/passport/${entry.slug}`}
                          className="flex items-center gap-2 font-medium text-gray-900 hover:text-teal-700 transition-colors"
                        >
                          <span className="text-lg">{entry.flag}</span>
                          {entry.passport}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex items-center justify-center">
                          <div
                            className="h-8 rounded-md flex items-center justify-center font-bold text-white text-sm px-3"
                            style={{
                              backgroundColor: entry.visaFree >= 9 ? '#059669' : entry.visaFree >= 7 ? '#0d9488' : entry.visaFree >= 5 ? '#0284c7' : '#d97706',
                              minWidth: `${(entry.visaFree / entry.total) * 100}%`,
                            }}
                          >
                            {entry.visaFree}/{entry.total}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 hidden md:table-cell">{entry.highlights}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The ASEAN Advantage</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            ASEAN member states generally grant visa-free access to each other's citizens and to citizens of many developed nations. Singapore and Brunei passports, in particular, can travel throughout almost all of Southeast Asia without prior visa arrangements. For Western passports, Thailand and Indonesia are the most accessible, while Vietnam and Myanmar require additional planning.
          </p>

          <h2 id="east-asia" className="text-3xl font-bold text-gray-900 mt-16 mb-6 scroll-mt-8">
            East Asia: Japan, South Korea, China, Taiwan, and Hong Kong
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            East Asia presents some of the starkest contrasts in passport access. Japan and South Korea are relatively open to developed-nation passports with generous 90-day allowances, while China has historically required visas for most nationalities — though new bilateral agreements signed in 2024–2025 now grant 15-day visa-free access to citizens of France, Germany, Italy, Spain, Portugal, the Netherlands, Switzerland, and Australia.
          </p>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm my-8">
            <div className="bg-blue-600 px-6 py-4">
              <h3 className="text-white font-semibold text-lg m-0">East Asia Visa-Free Rankings</h3>
              <p className="text-blue-100 text-sm mt-1 mb-0">Out of 5 East Asian countries (Japan, South Korea, China, Taiwan, Hong Kong)</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Passport</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Visa-Free</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 hidden md:table-cell">Key Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {eastAsiaRankings.map((entry) => (
                    <tr key={entry.passport} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <Link
                          href={`/passport/${entry.slug}`}
                          className="flex items-center gap-2 font-medium text-gray-900 hover:text-teal-700 transition-colors"
                        >
                          <span className="text-lg">{entry.flag}</span>
                          {entry.passport}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex items-center justify-center">
                          <div
                            className="h-8 rounded-md flex items-center justify-center font-bold text-white text-sm px-3"
                            style={{
                              backgroundColor: entry.visaFree >= 4 ? '#059669' : entry.visaFree >= 3 ? '#0d9488' : '#d97706',
                              minWidth: '3rem',
                            }}
                          >
                            {entry.visaFree}/{entry.total}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 hidden md:table-cell">{entry.highlights}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-8 rounded-r-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mt-0 mb-2">China Visa-Free Policy: 50 Countries, Valid Until December 31, 2026</h3>
                <p className="mb-0 text-gray-700">
                  As of February 17, 2026, China has expanded its visa-free programme to 50 countries — including the United Kingdom and Canada as the most recent additions. Eligible passport holders can visit for up to 30 days per visit for tourism, business, or transit, with no advance visa application required. The US remains excluded. The policy is confirmed until December 31, 2026 — extension is possible but not yet announced. Always verify the current status before booking travel to China.
                </p>
              </div>
            </div>
          </div>

          <h2 id="south-asia" className="text-3xl font-bold text-gray-900 mt-16 mb-6 scroll-mt-8">
            South Asia: Access Patterns and Restrictions
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            South Asia includes 8 countries: India, Pakistan, Bangladesh, Sri Lanka, Nepal, Bhutan, Maldives, and Afghanistan. The region varies considerably — the Maldives offers completely visa-free access to all nationalities, while India requires advance eVisa applications from most countries. Nepal and Bhutan have unique arrangements: Nepal offers visa on arrival to most passports, while Bhutan requires advance booking through a licensed tour operator.
          </p>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm my-8">
            <div className="bg-amber-600 px-6 py-4">
              <h3 className="text-white font-semibold text-lg m-0">South Asia Visa-Free Rankings</h3>
              <p className="text-amber-100 text-sm mt-1 mb-0">Out of 8 South Asian countries (India, Pakistan, Bangladesh, Sri Lanka, Nepal, Bhutan, Maldives, Afghanistan)</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Passport</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Visa-Free</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 hidden md:table-cell">Key Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {southAsiaRankings.map((entry) => (
                    <tr key={entry.passport} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <Link
                          href={`/passport/${entry.slug}`}
                          className="flex items-center gap-2 font-medium text-gray-900 hover:text-teal-700 transition-colors"
                        >
                          <span className="text-lg">{entry.flag}</span>
                          {entry.passport}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex items-center justify-center">
                          <div
                            className="h-8 rounded-md flex items-center justify-center font-bold text-white text-sm px-3"
                            style={{
                              backgroundColor: entry.visaFree >= 6 ? '#059669' : entry.visaFree >= 4 ? '#0d9488' : '#d97706',
                              minWidth: '3rem',
                            }}
                          >
                            {entry.visaFree}/{entry.total}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 hidden md:table-cell">{entry.highlights}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <h2 id="key-destinations" className="text-3xl font-bold text-gray-900 mt-16 mb-6 scroll-mt-8">
            Key Destination Breakdown
          </h2>

          <p className="text-gray-700 leading-relaxed mb-8">
            The following section details access policies for Asia&apos;s most visited destinations. For each country, we list which passport nationalities enjoy visa-free entry and which require advance visas.
          </p>

          <div className="grid gap-6 mb-8">
            {keyDestinations.map((dest) => (
              <div key={dest.country} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{dest.flag}</span>
                  <div>
                    <Link
                      href={`/destination/${dest.slug}`}
                      className="text-xl font-bold text-gray-900 hover:text-teal-700 transition-colors"
                    >
                      {dest.country}
                    </Link>
                    <p className="text-sm text-gray-500 mt-0.5">Stay limit: {dest.stayLimit}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm font-semibold text-emerald-700">Visa-Free Access</span>
                    </div>
                    <ul className="space-y-1">
                      {dest.visaFreePassports.map((p) => (
                        <li key={p} className="text-sm text-gray-600 pl-6">{p}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <XCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm font-semibold text-red-600">Visa Required</span>
                    </div>
                    <ul className="space-y-1">
                      {dest.requiresVisa.map((p) => (
                        <li key={p} className="text-sm text-gray-600 pl-6">{p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2 id="strategic-tips" className="text-3xl font-bold text-gray-900 mt-16 mb-6 scroll-mt-8">
            Strategic Tips for Asian Travel by Passport Strength
          </h2>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Tier 1 Passports (Singapore, Japan, South Korea)</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Holders of these passports enjoy near-frictionless travel throughout Asia. Virtually no advance visa arrangements are needed for most regional itineraries. The main exceptions are China (standard visa still required for Japan and South Korea) and specific permits for Bhutan. The practical implication: you can book last-minute trips across Asia without embassy appointments.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Tier 2 Passports (US, UK, EU, Australia)</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Strong access to most of Asia, with a few friction points. China requires a traditional visa (still no easy solution). Vietnam now offers an affordable eVisa online. India&apos;s eVisa system is generally reliable but must be applied for in advance. For Southeast Asian travel specifically, these passports are nearly as strong as Tier 1.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Tier 3 Passports (India, Brazil, South Africa)</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Holders face more advance planning requirements. Japan, South Korea, and China all require visas. Within Southeast Asia, Thailand and Malaysia are typically accessible, while Vietnam and the Philippines require additional documentation. Bhutan and China remain high-friction destinations regardless of passport tier.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Tier 4 Passports (Pakistan, Nigeria, Bangladesh)</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            Most Asian destinations require advance visas. Maldives is a notable exception, offering completely visa-free access to all nationalities. Nepal&apos;s visa on arrival is another accessible option. For most East Asian and advanced Southeast Asian destinations, embassy appointments and supporting documentation will be required.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mt-10">
            <h3 className="text-xl font-semibold text-gray-900 mt-0 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-teal-600" />
              Key Takeaways
            </h3>
            <ul className="space-y-3">
              {[
                'Singapore passport is the strongest for Asia travel, achieving near-complete visa-free coverage across all three sub-regions.',
                'Japan, Germany, and South Korea round out the top tier with excellent regional access across Southeast and East Asia.',
                'China remains the most challenging East Asian destination — most passports still require a traditional visa, despite new bilateral pilot programs for select European nations.',
                'The Maldives is the most accessible South Asian destination, offering visa-free entry to all nationalities on arrival.',
                'For Bhutan, every passport — regardless of strength — must book travel through a registered tour operator and pay a daily Sustainable Development Fee.',
                'Vietnam has significantly liberalized access since 2023, with many Western and Asian passports now eligible for extended visa-free stays or simple eVisas.',
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 p-6 bg-white border border-gray-200 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mt-0 mb-3">Related Research</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: 'Most Powerful Passports 2026', href: '/research/most-powerful-passports-2026' },
                { label: 'Visa-Free vs VoA vs eVisa', href: '/research/visa-free-vs-visa-on-arrival-vs-evisa' },
                { label: 'Passport Validity Rules by Country', href: '/research/passport-validity-rules-by-country' },
                { label: 'Onward Ticket Requirements', href: '/research/onward-ticket-requirements-by-country' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 text-teal-600 hover:text-teal-800 font-medium text-sm transition-colors p-3 rounded-lg hover:bg-teal-50"
                >
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </article>
    </div>
  );
}
