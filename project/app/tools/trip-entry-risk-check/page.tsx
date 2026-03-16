import type { Metadata } from 'next';
import {
  ShieldCheck, ShieldAlert, Globe, Plane,
  Route, Calculator, Ticket, ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import TripEntryRiskClient from '@/components/tools/TripEntryRiskClient';
import FAQAccordion from '@/components/tools/FAQAccordion';
import Breadcrumbs from '@/components/Breadcrumbs';
import { canonicalUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Trip Entry Risk Check — Is My Trip Safe to Board and Enter? | VisaInfoGuide',
  description: 'Check whether your trip may face visa, passport validity, transit, onward-ticket, or Schengen stay-limit issues before you travel. Combined structured check across all major entry rules.',
  alternates: {
    canonical: canonicalUrl('/tools/trip-entry-risk-check'),
  },
  openGraph: {
    title: 'Trip Entry Risk Check | VisaInfoGuide',
    description: 'A combined decision tool that evaluates whether your trip looks safe from a visa, passport, transit, and boarding compliance perspective.',
    url: canonicalUrl('/tools/trip-entry-risk-check'),
    type: 'website',
  },
};

const faqItems = [
  {
    q: 'What is a trip entry risk check?',
    a: `A trip entry risk check combines multiple travel document and rule checks into a single assessment. It evaluates your destination visa requirement, passport validity, transit stops, onward ticket risk, and Schengen stay limits — and produces a structured result indicating whether your trip appears safe to board and enter based on known rules.`,
  },
  {
    q: 'Can airlines deny boarding even if a country is visa-free for my passport?',
    a: `Yes. Visa-free access does not eliminate all boarding risk. Airlines also check passport validity, whether your passport meets the destination's minimum validity threshold, whether you have an onward or return ticket, and in some cases whether you have sufficient funds. A traveler may be visa-free for a destination and still be denied boarding if the passport expires too soon or if no return booking exists.`,
  },
  {
    q: 'Why does passport validity matter even for short trips?',
    a: `Most countries require a passport to remain valid for a period beyond your planned departure — commonly 3 months (Schengen Area) or 6 months (Thailand, Singapore, UAE, and many others). Airlines are legally responsible for returning denied passengers at their own cost, so they enforce these rules at check-in. A passport that technically meets the threshold by a narrow margin may still be flagged.`,
  },
  {
    q: 'Do transit stops create visa problems?',
    a: `Yes. Some countries require an airside transit visa (DATV) even if you remain in the international zone and never go through immigration. The United Kingdom, for example, requires a Direct Airside Transit Visa (DATV) for passengers from certain countries. If this visa is missing, the originating airline will not allow you to board. This tool checks for known transit visa requirements where data is available.`,
  },
  {
    q: 'Why can a one-way ticket increase travel risk?',
    a: `Many countries — including the United States, United Kingdom, Australia, Canada, and Thailand — require travelers to show proof of onward or return travel at check-in or at immigration. Without a confirmed return or onward booking, immigration officers may question your intent and deny entry. Airlines at these destinations commonly enforce the rule at check-in before boarding. A one-way trip elevates risk unless this requirement is specifically not enforced at the destination.`,
  },
  {
    q: 'How does the Schengen 90/180 rule affect my trip?',
    a: `The Schengen Area operates a rolling 180-day window within which non-EU/non-Schengen visitors may not spend more than 90 days in total. The 180-day window is not a fixed calendar period — it rolls backward from any given date. If your planned trip would push your cumulative Schengen days above 90 in the current window, you may be denied entry at the border. This tool can calculate your Schengen exposure if you enter your prior trip history.`,
  },
  {
    q: 'Does this tool replace official embassy or airline advice?',
    a: `No. This tool provides a structured, rules-based assessment based on known visa, passport, transit, and entry policies. It does not replace verification with official government sources, the destination embassy or consulate, or your airline. Rules can change at short notice. The tool is designed to help you identify potential issues before travel so you can verify them — not to serve as authoritative advice.`,
  },
  {
    q: 'What if my trip includes multiple countries?',
    a: `This tool checks one primary destination at a time, plus up to two transit stops. If your trip includes multiple destination countries, run a separate check for each destination. Pay particular attention to Schengen countries — cumulative Schengen days across multiple Schengen destinations count toward the same 90-day allowance. Use the Schengen history feature to track days across a multi-country Schengen itinerary.`,
  },
];

const infoCards = [
  {
    icon: Globe,
    title: 'Visa Rules',
    description: 'Checks whether your passport requires a visa, eVisa, eTA, or visa on arrival for the destination.',
  },
  {
    icon: ShieldCheck,
    title: 'Passport Validity',
    description: 'Verifies that your passport meets the destination\'s minimum validity rule beyond your departure date.',
  },
  {
    icon: Route,
    title: 'Transit Risk',
    description: 'Checks whether your transit stops require a separate transit visa or airside transit authorization.',
  },
  {
    icon: Ticket,
    title: 'Boarding / Entry Risk',
    description: 'Evaluates onward ticket requirements and combines all checks into a single entry risk assessment.',
  },
];

const relatedTools = [
  {
    title: 'Airline Boarding Check',
    description: 'Full pre-flight readiness check across visa, passport, transit, and onward ticket.',
    href: '/tools/airline-boarding-check',
    icon: Plane,
  },
  {
    title: 'Transit Visa Checker',
    description: 'Detailed transit visa check for specific passport and airport combinations.',
    href: '/tools/transit-visa-checker',
    icon: Route,
  },
  {
    title: 'Passport Validity Checker',
    description: 'Check whether your passport meets the minimum validity rule for your destination.',
    href: '/tools/passport-validity-checker',
    icon: ShieldCheck,
  },
  {
    title: 'Schengen Calculator',
    description: 'Calculate your remaining Schengen days using the 90/180-day rolling window rule.',
    href: '/tools/schengen-calculator',
    icon: Calculator,
  },
  {
    title: 'Trip Visa Finder',
    description: 'Get a full visa requirement summary for your entire itinerary.',
    href: '/trip',
    icon: Globe,
  },
];

export default function TripEntryRiskCheckPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Trip Entry Risk Check',
            description: 'Combined travel entry risk assessment covering visa, passport validity, transit, onward ticket, and Schengen stay limits.',
            url: canonicalUrl('/tools/trip-entry-risk-check'),
            applicationCategory: 'TravelApplication',
            operatingSystem: 'Web',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            author: { '@type': 'Organization', name: 'VisaInfoGuide', url: 'https://visainfoguide.com' },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://visainfoguide.com' },
                { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://visainfoguide.com/tools' },
                { '@type': 'ListItem', position: 3, name: 'Trip Entry Risk Check', item: canonicalUrl('/tools/trip-entry-risk-check') },
              ],
            },
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Breadcrumbs
            items={[
              { name: 'Tools', url: '/tools' },
              { name: 'Trip Entry Risk Check', url: '/tools/trip-entry-risk-check' },
            ]}
          />

          {/* Header */}
          <div className="mt-6 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-teal-100 rounded-xl">
                <ShieldAlert className="w-7 h-7 text-teal-700" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">Trip Entry Risk Check</h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl">
              Check whether your trip may face visa, passport validity, transit, onward-ticket, or Schengen stay-limit issues before you travel.
            </p>
            <p className="text-sm text-gray-400 mt-1.5">
              Combines structured travel-rule checks across visa, passport, transit, onward-ticket, and Schengen stay-limit logic.
            </p>
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {infoCards.map(card => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-4 h-4 text-teal-600 flex-shrink-0" />
                    <span className="text-xs font-semibold text-gray-800">{card.title}</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{card.description}</p>
                </div>
              );
            })}
          </div>

          {/* Main tool */}
          <TripEntryRiskClient />

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
            <p className="text-gray-600 mb-6">Common questions about travel entry risk, visa rules, and boarding compliance.</p>
            <FAQAccordion items={faqItems} />
          </div>

          {/* Related Tools */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Related Travel Tools</h2>
            <p className="text-gray-600 mb-5">Run more detailed individual checks for specific parts of your trip.</p>
            <div className="grid gap-4 md:grid-cols-2">
              {relatedTools.map(tool => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.title}
                    href={tool.href}
                    className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-teal-300 hover:shadow-sm transition-all group"
                  >
                    <div className="p-2.5 bg-teal-50 rounded-lg flex-shrink-0 group-hover:bg-teal-100 transition-colors">
                      <Icon className="w-5 h-5 text-teal-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm group-hover:text-teal-700 transition-colors">{tool.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{tool.description}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-teal-500 transition-colors flex-shrink-0 mt-1" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* SEO Educational Content */}
          <div className="mt-16 prose prose-gray max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 not-prose">How Trip Entry Risk Checks Work</h2>

            <div className="space-y-8 not-prose">
              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Why visa-free travel can still carry risk</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Visa-free access means you can enter a country without applying for a visa in advance. It does not mean entry is guaranteed. Immigration officers retain the right to refuse entry to any traveler who cannot demonstrate sufficient funds, a clear purpose of visit, a valid onward booking, or adequate passport validity. Airlines, who are liable for return costs if passengers are denied entry, apply their own pre-boarding checks before you ever reach immigration.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How airlines evaluate travel documents</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Airlines use IATA Timatic — an industry database of entry requirements — to verify passengers at check-in. Airline ground staff check passport validity, visa requirements, transit visa needs, and in some cases onward ticket status before issuing a boarding pass. If a passenger is admitted onto a flight and subsequently denied entry, the airline bears the cost of the return journey. This creates a strong financial incentive for airlines to apply entry rules strictly, sometimes more strictly than the rules technically require.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Why passport validity and onward tickets matter</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Passport validity rules exist because immigration systems need to ensure documents remain valid for the duration of a person's stay and for any subsequent administrative process. The "6-month rule" common in Southeast Asia and the Middle East is a buffer against travelers overstaying or encountering document issues. Onward ticket requirements exist to demonstrate that travelers have the means and intention to leave — reducing the burden on immigration systems. Both rules can be enforced at the departure airport before a flight even lands.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Why transit stops can change your risk</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Every country a traveler transits through has its own rules governing transit. Some countries require an Airside Transit Visa (DATV) for certain passport holders — even if the traveler remains in the international departure zone and never clears immigration. The UK, some Schengen countries, and Canada maintain lists of passport nationalities that require transit authorization. Critically, the originating airline checks transit visa requirements before issuing a boarding pass, so a missing transit authorization will prevent boarding at the departure city, not just at the connection point.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How Schengen stay limits affect repeat travelers</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  The Schengen Area applies a rolling 90/180-day rule: visitors without a long-stay visa may not spend more than 90 days in the Schengen Area within any 180-day window. The window is not a fixed calendar period — it moves backward from any specific date. Travelers who visit Schengen countries frequently can exceed the limit without realizing it. The EU's Entry/Exit System (EES), being rolled out progressively, will automate tracking of days spent in the Schengen Area by stamping electronic records rather than passport pages. Travelers who exceed the limit may be denied entry at the border and potentially flagged in future immigration checks.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
