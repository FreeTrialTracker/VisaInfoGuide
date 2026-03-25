import { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Breadcrumbs from '@/components/Breadcrumbs';
import { TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Calendar, Info, Plane, ArrowLeftRight, ListChecks, Route, BookOpen } from 'lucide-react';

const SchengenCalculator = dynamic(() => import('@/components/tools/SchengenCalculator'), { ssr: false });

const relatedTools = [
  {
    href: '/compare',
    icon: ArrowLeftRight,
    label: 'Compare Passports',
    desc: 'Side-by-side visa access comparison between two passports',
  },
  {
    href: '/tools/airline-boarding-check',
    icon: Plane,
    label: 'Airline Boarding Check',
    desc: 'Full boarding eligibility check covering visa, passport validity, transit, and onward ticket',
  },
  {
    href: '/tools/trip-entry-risk-check',
    icon: ListChecks,
    label: 'Trip Entry Risk Check',
    desc: 'Evaluate overall entry risk for your trip across all required documents',
  },
  {
    href: '/tools/transit-visa-checker',
    icon: Route,
    label: 'Transit Visa Checker',
    desc: 'Check if your passport requires a transit visa at any connection point',
  },
  {
    href: '/research/schengen-90-180-rule-explained',
    icon: BookOpen,
    label: 'Schengen Rule Explained',
    desc: 'Complete guide to understanding the Schengen 90/180 rolling window rule',
  },
  {
    href: '/trip',
    icon: Plane,
    label: 'Trip Visa Finder',
    desc: 'Get a full visa summary for every country in your itinerary in one go',
  },
];

export const metadata: Metadata = {
  title: 'Schengen 90/180 Rule Calculator (2026) | VisaInfoGuide',
  description: 'Calculate Schengen days used in the last 180 days and see days remaining. Free rolling-window calculator with trip planner for accurate Schengen Area stays.',
  alternates: {
    canonical: 'https://visainfoguide.com/tools/schengen-calculator',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Schengen 90/180 Rule Calculator (2026) | VisaInfoGuide',
    description: 'Calculate Schengen days used in the last 180 days and see days remaining. Free rolling-window calculator for accurate Schengen Area stays.',
    url: 'https://visainfoguide.com/tools/schengen-calculator',
    type: 'website',
    images: [
      {
        url: 'https://visainfoguide.com/og/tools-og',
        width: 1200,
        height: 630,
        alt: 'Schengen Calculator - VisaInfoGuide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Schengen 90/180 Rule Calculator (2026) | VisaInfoGuide',
    description: 'Calculate Schengen days used in the last 180 days and see days remaining. Free rolling-window calculator for accurate Schengen Area stays.',
    images: ['https://visainfoguide.com/og/tools-og'],
  },
};

const faqs = [
  {
    question: 'What is the Schengen 90/180 rule?',
    answer: 'The Schengen 90/180 rule allows non-EU visitors to stay in the Schengen Area for up to 90 days within any 180-day period. This is a rolling window that moves forward each day.',
  },
  {
    question: 'Do both entry and exit days count?',
    answer: 'Yes, both your entry day and exit day count as days spent in the Schengen Area. If you enter and exit on the same day, that counts as 1 day.',
  },
  {
    question: 'What happens if I overstay?',
    answer: 'Overstaying can result in fines, deportation, entry bans ranging from 1-5 years, and difficulties obtaining future Schengen visas. Always ensure you comply with the 90/180 rule.',
  },
  {
    question: 'Can I reset the counter by leaving briefly?',
    answer: 'No, the 180-day window is rolling. Leaving for a few days does not reset the counter. You must wait until older days fall outside the 180-day window.',
  },
  {
    question: 'Which countries are in the Schengen Area?',
    answer: '27 European countries: Austria, Belgium, Croatia, Czech Republic, Denmark, Estonia, Finland, France, Germany, Greece, Hungary, Iceland, Italy, Latvia, Liechtenstein, Lithuania, Luxembourg, Malta, Netherlands, Norway, Poland, Portugal, Slovakia, Slovenia, Spain, Sweden, and Switzerland.',
  },
  {
    question: 'Does time in non-Schengen Europe count?',
    answer: 'No, time spent in non-Schengen countries like the UK, Ireland, Cyprus, Romania, and Bulgaria does not count toward your 90 days.',
  },
  {
    question: 'How accurate is this calculator?',
    answer: 'This calculator uses the official rolling 180-day window method and counts days inclusively (both entry and exit days). However, always verify with official sources and border control officers have final authority.',
  },
  {
    question: 'Can I stay more than 90 days total if I wait between trips?',
    answer: 'Yes, as long as you never exceed 90 days within any 180-day rolling window. You can make multiple trips, but you must track the cumulative days carefully.',
  },
];

export default function SchengenCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Schengen 90/180 Rule Calculator',
            description: 'Calculate Schengen days used and remaining in the rolling 180-day window',
            url: 'https://visainfoguide.com/tools/schengen-calculator',
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
                  name: 'Tools',
                  item: 'https://visainfoguide.com/tools',
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: 'Schengen Calculator',
                  item: 'https://visainfoguide.com/tools/schengen-calculator',
                },
              ],
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
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      <div className="min-h-screen bg-white">
        <div className="bg-gradient-to-b from-blue-50 to-white border-b">
          <div className="container mx-auto px-4 py-8 max-w-5xl">
            <Breadcrumbs
              items={[
                { name: 'Tools', url: '/tools' },
                { name: 'Schengen Calculator', url: '/tools/schengen-calculator' },
              ]}
            />

            <div className="mt-6">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Schengen 90/180 Rule Calculator
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                Calculate how many days you've spent in the Schengen Area and how many you have remaining.
                The Schengen 90/180 rule uses a rolling 180-day window, meaning for any given day, you can
                look back 180 days and must not have spent more than 90 days in the Schengen Area during that period.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-5xl">
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculate your Schengen days</h2>
            <SchengenCalculator />
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How the 90/180 rule works</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                The Schengen 90/180 rule states that non-EU visitors can stay in the Schengen Area for a maximum
                of 90 days within any 180-day period. This is <strong>not</strong> a simple "90 days then leave for 90 days"
                rule. Instead, it uses a rolling window that moves forward each day.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-6">
                <div className="flex gap-3">
                  <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-blue-900 mb-2">Example:</p>
                    <p className="text-blue-800 text-sm">
                      If you're checking on March 1, 2026, the system looks back to September 3, 2025 (180 days ago)
                      and counts all days you were present in Schengen during that period. Both entry and exit days count.
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                This rolling calculation means that days gradually "expire" from your count as they fall outside
                the 180-day window. You don't need to leave for a full 90 days to reset—you just need to wait
                for enough old days to drop off the rolling window so you're back under 90 cumulative days.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common mistakes</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border border-red-200 bg-red-50 rounded-lg p-5">
                <div className="flex gap-3 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                  <h3 className="font-semibold text-red-900">Counting months instead of days</h3>
                </div>
                <p className="text-sm text-red-800 ml-8">
                  The rule is 90 calendar days, not 3 months. Months have different lengths, so always count actual days.
                </p>
              </div>

              <div className="border border-red-200 bg-red-50 rounded-lg p-5">
                <div className="flex gap-3 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                  <h3 className="font-semibold text-red-900">Forgetting exit day counts</h3>
                </div>
                <p className="text-sm text-red-800 ml-8">
                  Both entry and exit days count toward your 90 days. Even a same-day visit counts as 1 day.
                </p>
              </div>

              <div className="border border-red-200 bg-red-50 rounded-lg p-5">
                <div className="flex gap-3 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                  <h3 className="font-semibold text-red-900">Not tracking overlapping trips</h3>
                </div>
                <p className="text-sm text-red-800 ml-8">
                  Multiple trips add up. Track all entries and exits carefully to avoid accidentally exceeding 90 days.
                </p>
              </div>

              <div className="border border-red-200 bg-red-50 rounded-lg p-5">
                <div className="flex gap-3 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                  <h3 className="font-semibold text-red-900">Mixing Schengen vs non-Schengen Europe</h3>
                </div>
                <p className="text-sm text-red-800 ml-8">
                  UK, Ireland, Cyprus, Romania, and Bulgaria are NOT in Schengen. Time there doesn't count.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Examples</h2>
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-teal-600" />
                  Example 1: Single long trip
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700">
                    <strong>Trip:</strong> January 1, 2026 to March 10, 2026 (69 days)
                  </p>
                  <p className="text-gray-700">
                    <strong>Evaluation date:</strong> March 15, 2026
                  </p>
                  <p className="text-gray-700">
                    <strong>Result:</strong> 69 days used, 21 days remaining
                  </p>
                  <p className="text-gray-600 text-xs mt-3">
                    You can return for another 21 days anytime, but those 69 days will only start dropping off
                    after 180 days from each respective day passes.
                  </p>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-teal-600" />
                  Example 2: Multiple short trips
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700">
                    <strong>Trip 1:</strong> January 10-25, 2026 (16 days)<br />
                    <strong>Trip 2:</strong> February 15 - March 5, 2026 (20 days)<br />
                    <strong>Trip 3:</strong> March 20 - April 10, 2026 (22 days)
                  </p>
                  <p className="text-gray-700">
                    <strong>Evaluation date:</strong> April 15, 2026
                  </p>
                  <p className="text-gray-700">
                    <strong>Result:</strong> 58 days used (16 + 20 + 22), 32 days remaining
                  </p>
                  <p className="text-gray-600 text-xs mt-3">
                    All three trips fall within the 180-day window as of April 15, so all days count toward your total.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently asked questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group border border-gray-200 rounded-lg overflow-hidden"
                >
                  <summary className="flex justify-between items-center cursor-pointer p-5 hover:bg-gray-50 transition-colors">
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                    <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-5 pb-5 pt-2 text-gray-700 leading-relaxed border-t border-gray-100">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Verify before travel</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-900 space-y-2">
                  <p className="font-semibold">Important disclaimer:</p>
                  <p>
                    This calculator is an informational tool based on the standard Schengen 90/180 rule interpretation.
                    Immigration rules can change, and individual circumstances may vary. Border control officers have
                    final authority on entry decisions.
                  </p>
                  <p>
                    Always verify your specific situation with official sources such as the{' '}
                    <a
                      href="https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy_en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-700 underline font-medium hover:text-yellow-800"
                    >
                      European Commission
                    </a>{' '}
                    or the embassy of your destination country before making travel plans.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="border-t border-gray-100 pt-10" aria-labelledby="related-tools-heading">
            <h2 id="related-tools-heading" className="text-lg font-bold text-gray-900 mb-5">Related Tools and Guides</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedTools.map(({ href, icon: Icon, label, desc }) => (
                <Link
                  key={label}
                  href={href}
                  className="group bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Icon className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <div className="text-sm font-semibold text-gray-800 group-hover:text-blue-700">{label}</div>
                  </div>
                  <div className="text-xs text-gray-500 leading-snug">{desc}</div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
