import { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  Clock,
  FileCheck,
  TriangleAlert as AlertTriangle,
  Plane,
  Route,
  Calculator,
  Globe,
  MapPin,
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import PassportValidityClient from '@/components/tools/PassportValidityClient';
import FAQAccordion from '@/components/tools/FAQAccordion';
import { canonicalUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Passport Validity Checker (2026) | VisaInfoGuide',
  description: 'Check if your passport is valid long enough for your destination and travel dates. Covers the 6-month rule, 3-month Schengen rule, and duration-of-stay requirements for 195+ countries.',
  alternates: {
    canonical: canonicalUrl('/tools/passport-validity-checker'),
  },
  openGraph: {
    title: 'Passport Validity Checker | VisaInfoGuide',
    description: 'Find out if your passport meets the validity requirement for your destination. Instant results for 195+ countries.',
    url: canonicalUrl('/tools/passport-validity-checker'),
    type: 'website',
    siteName: 'VisaInfoGuide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Passport Validity Checker | VisaInfoGuide',
    description: 'Check if your passport is valid long enough for your destination — 6-month rule, Schengen 3-month rule, and more.',
  },
  robots: { index: true, follow: true },
};

const faqItems = [
  {
    q: 'What is the 6-month passport rule?',
    a: `The 6-month rule requires that your passport be valid for at least 6 months beyond your planned departure date from the destination country. This is one of the most common validity requirements globally, applied by Southeast Asian countries like Thailand, Singapore, Indonesia, Vietnam, and Malaysia, as well as the UAE, China, and many others. The rule exists because immigration authorities and airlines want to ensure that your document does not expire while you are in the country or before you can exit it. Even if your actual trip is only 1–2 weeks, your passport must clear the 6-month threshold.`,
  },
  {
    q: 'Do all countries require 6 months passport validity?',
    a: `No. Passport validity requirements vary by country. The 6-month rule applies to many countries in Southeast Asia, the Middle East, and Africa. The Schengen Area (including France, Germany, Spain, Italy, and others) applies a 3-month rule — your passport must be valid for at least 3 months beyond your planned departure from the Schengen Zone. Countries like the United States, United Kingdom, Australia, Canada, and Japan only require your passport to be valid for the duration of your stay — no extra buffer is needed. Always check the specific rule for your destination.`,
  },
  {
    q: 'What does "3 months beyond departure" mean for Schengen?',
    a: `For Schengen Area countries, your passport must be valid for at least 3 months after your planned departure date from the Schengen Zone — not from the arrival date. For example, if you plan to leave France on June 15, your passport must not expire before September 15. This is sometimes misunderstood as 3 months from arrival, which is incorrect. Additionally, your passport must have been issued within the last 10 years and must have at least 2 blank pages.`,
  },
  {
    q: 'Can airlines deny boarding because my passport expires soon?',
    a: `Yes. Airlines are responsible for verifying that passengers meet entry requirements before boarding. If you are refused entry at your destination and sent back, the airline that transported you is financially and legally responsible for the return journey. Because of this, airlines routinely check passport validity at check-in against IATA Timatic data. Even if your passport technically meets the minimum requirement for the destination, some airlines apply stricter checks and may flag passports that barely meet the threshold. This tool's caution zone is designed to reflect this real-world risk.`,
  },
  {
    q: 'Is visa-free travel affected by passport validity?',
    a: `Yes. Passport validity rules apply regardless of whether you need a visa or not. Just because a country grants you visa-free access does not mean your passport validity is exempt from scrutiny. Most visa-free access agreements are contingent on the traveler holding a passport that meets the destination's validity standard. For example, a US passport holder traveling visa-free to Thailand must still have 6 months of passport validity beyond their planned departure from Thailand.`,
  },
  {
    q: 'What if I do not know my return date yet?',
    a: `Use the "One-way trip or departure date unknown" toggle. When no departure date is provided, the tool applies the validity rule relative to your arrival date. For rules requiring validity beyond departure (such as the Schengen 3-month rule), the tool will note that it cannot calculate the precise required expiry and will return a Caution result if the situation is ambiguous. As a best practice, ensure at least 6 months of passport validity from your arrival date if you are uncertain of your return.`,
  },
  {
    q: 'Does passport validity depend on my nationality or the destination?',
    a: `The validity rule is set by the destination country — it applies to all visitors regardless of nationality. However, different passport holders may face different visa requirements for the same destination. The validity rule itself is destination-driven. For example, Singapore requires 6 months validity for all visitors regardless of where their passport was issued.`,
  },
  {
    q: 'Can airlines deny boarding if my passport expires soon?',
    a: `Yes. Airlines check passport validity before boarding because they are responsible for returning passengers who are denied entry. If a passenger is refused entry at the destination, the airline that carried them must fund the return journey at their own cost. Because of this legal and financial liability, airlines verify passport validity at check-in using IATA Timatic data. If a passport does not clearly meet the destination's validity rule, airlines may refuse boarding even if the expiry date appears close to the threshold. This is why this tool applies a 30-day caution buffer — to flag borderline cases that could trigger an airline flag at check-in.`,
  },
  {
    q: 'How many blank pages do I need in my passport?',
    a: `Most countries require at least 1–2 blank pages in your passport for entry stamps. South Africa notably requires 2 full blank, adjacent pages. The United States, United Kingdom, and most Schengen countries require at least 1 blank page. Countries that issue visas as stickers typically require at least 2 blank pages. This tool shows the known blank page requirement where available. If your passport has fewer than 4 blank pages remaining, renewing before a trip is generally recommended.`,
  },
];

const relatedTools = [
  {
    title: 'Airline Boarding Check',
    description: 'Full pre-flight readiness check — visa, passport, transit, and onward ticket.',
    href: '/tools/airline-boarding-check',
    icon: Plane,
  },
  {
    title: 'Transit Visa Checker',
    description: 'Check if your passport requires a transit visa for your layover.',
    href: '/tools/transit-visa-checker',
    icon: Route,
  },
  {
    title: 'Schengen Calculator',
    description: 'Calculate your 90/180-day Schengen allowance remaining.',
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

const conceptCards = [
  {
    icon: ShieldCheck,
    title: '6-Month Rule',
    description: 'Passport must be valid 6 months beyond your departure date. Applied by Thailand, Singapore, UAE, China, and many others.',
  },
  {
    icon: Clock,
    title: '3-Month Rule (Schengen)',
    description: 'Schengen Area requires 3 months validity beyond your departure. Also requires passport issued within 10 years.',
  },
  {
    icon: FileCheck,
    title: 'Duration of Stay',
    description: 'US, UK, Australia, Canada, Japan, and South Korea require only that your passport covers your trip dates.',
  },
  {
    icon: AlertTriangle,
    title: 'Passport Expiry Risk',
    description: 'Even if you technically meet the threshold, airlines may flag passports close to the minimum. A buffer is always safer.',
  },
];

export default function PassportValidityCheckerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Passport Validity Checker',
            description: 'Check whether your passport is valid long enough for your destination and travel dates.',
            url: canonicalUrl('/tools/passport-validity-checker'),
            applicationCategory: 'TravelApplication',
            operatingSystem: 'Web',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            author: { '@type': 'Organization', name: 'VisaInfoGuide', url: 'https://visainfoguide.com' },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://visainfoguide.com' },
                { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://visainfoguide.com/tools' },
                { '@type': 'ListItem', position: 3, name: 'Passport Validity Checker', item: canonicalUrl('/tools/passport-validity-checker') },
              ],
            },
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Breadcrumbs
            items={[
              { name: 'Tools', url: '/tools' },
              { name: 'Passport Validity Checker', url: '/tools/passport-validity-checker' },
            ]}
          />

          {/* Header */}
          <div className="mt-6 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-teal-100 rounded-xl">
                <ShieldCheck className="w-7 h-7 text-teal-700" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">Passport Validity Checker</h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl">
              Check whether your passport is valid long enough for your destination and travel dates.
            </p>
            <p className="text-sm text-gray-400 mt-1.5">
              Based on destination passport validity rules used by airlines and immigration authorities.
            </p>
          </div>

          {/* Concept Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {conceptCards.map((card) => {
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

          {/* Main Tool */}
          <PassportValidityClient />

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
            <p className="text-gray-600 mb-6">Common questions about passport validity requirements for international travel.</p>
            <FAQAccordion items={faqItems} />
          </div>

          {/* Related Tools */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Related Travel Tools</h2>
            <p className="text-gray-600 mb-5">Passport validity is one piece of the puzzle. Use these tools to complete your pre-trip check.</p>
            <div className="grid gap-4 md:grid-cols-2">
              {relatedTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group flex items-start gap-4 p-4 bg-white border border-gray-200 hover:border-teal-300 hover:shadow-sm rounded-xl transition-all"
                  >
                    <div className="p-2 bg-teal-50 group-hover:bg-teal-100 rounded-lg transition-colors flex-shrink-0">
                      <Icon className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm group-hover:text-teal-700 transition-colors">{tool.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{tool.description}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* SEO Content */}
          <div className="mt-16 space-y-10 border-t border-gray-100 pt-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How Passport Validity Checks Work</h2>
              <p className="text-gray-600 leading-relaxed">
                When you check in for a flight, your airline runs your travel documents against the IATA Timatic database — a real-time system containing entry requirements for every country in the world. One of the key checks is passport validity: does your passport expire soon enough that the destination country would refuse entry? If so, boarding is denied. This tool replicates that logic so you can identify issues before you get to the airport.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">What is the 6-month passport rule?</h3>
              <p className="text-gray-600 leading-relaxed">
                The 6-month rule is a requirement imposed by many countries that your passport remain valid for at least 6 months beyond your planned departure date from that country. This is not a universal rule — it is specific to each destination. Countries that apply it include Thailand, Singapore, Indonesia, Vietnam, Malaysia, the UAE, Egypt, Saudi Arabia, Turkey, and China, among others. The rule was originally intended to ensure travelers had enough time to resolve any immigration complications without their document expiring mid-process.
              </p>
              <p className="text-gray-600 leading-relaxed mt-3">
                It is important to understand that the 6-month clock runs from your departure date — not your arrival date. If you are traveling to Thailand for two weeks, arriving on June 1 and leaving on June 15, your passport must be valid until at least December 15.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">What does "3 months after departure" mean for Schengen?</h3>
              <p className="text-gray-600 leading-relaxed">
                The Schengen Area — covering 27 European countries including France, Germany, Spain, Italy, the Netherlands, and Switzerland — requires your passport to be valid for at least 3 months beyond your planned departure from the Schengen Zone. This is standardized under the Schengen Borders Code. An important nuance: your passport must also have been issued within the last 10 years, even if it has not yet expired.
              </p>
              <p className="text-gray-600 leading-relaxed mt-3">
                For a traveler leaving the Schengen Area on September 1, the passport must not expire before December 1. Passports that expired after 10 years of issuance are not accepted even if the expiry date on the document is still in the future.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Why airlines care about passport validity</h3>
              <p className="text-gray-600 leading-relaxed">
                Airlines are legally and financially responsible for passengers who are denied entry at the destination. If you are refused entry and deported, the airline that carried you must fund the return journey. This gives airlines strong incentive to verify entry requirements — including passport validity — before they allow boarding. Passport validity is one of the easiest automated checks, and airlines are required to check it under IATA agreements.
              </p>
              <p className="text-gray-600 leading-relaxed mt-3">
                Beyond the formal legal obligation, airlines also check because denied entry incidents damage their operational reliability scores with immigration authorities. Repeated violations can result in fines and loss of route permissions.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Why being close to expiry can still be risky</h3>
              <p className="text-gray-600 leading-relaxed">
                Even if your passport technically meets the minimum validity threshold by a few days or weeks, this can still create problems. Some airlines apply a more conservative interpretation of the rule and may flag passports that are only barely compliant. Immigration officers have discretion and may question travelers with passports close to expiry. Additionally, if your travel plans change and your trip extends even slightly, you could fall into non-compliance. This is why this tool applies a caution buffer — typically 30 days beyond the formal minimum — to flag borderline cases as caution rather than green.
              </p>
              <p className="text-gray-600 leading-relaxed mt-3">
                The safest approach is to renew your passport before it falls below 12 months of validity remaining. Most passport renewal services can process applications in 4–6 weeks, and expedited options are available in most countries for urgent travel.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">About this tool's dataset and limitations</h3>
              <p className="text-gray-600 leading-relaxed">
                This tool covers passport validity rules for major travel destinations based on publicly available immigration authority guidance as of January 2026. Where data confidence is lower — typically for less-traveled destinations or countries with frequently changing policies — the tool returns a Caution result with a Limited confidence rating. This is intentional: we do not guess at rules. If a destination is not in our dataset, we tell you, and we recommend verifying the requirement directly.
              </p>
              <p className="text-gray-600 leading-relaxed mt-3">
                Immigration rules can change without notice. Always verify current requirements with your airline, the destination embassy or consulate, or the official government immigration website before travel.
              </p>
            </div>
          </div>

          {/* Destination Links */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Explore destination entry requirements</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Passport validity is one requirement among several. Explore full entry requirements for popular destinations:
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { name: 'Thailand', slug: 'thailand' },
                { name: 'United Kingdom', slug: 'united-kingdom' },
                { name: 'France', slug: 'france' },
                { name: 'Germany', slug: 'germany' },
                { name: 'Japan', slug: 'japan' },
                { name: 'Singapore', slug: 'singapore' },
                { name: 'UAE', slug: 'united-arab-emirates' },
                { name: 'Australia', slug: 'australia' },
                { name: 'Canada', slug: 'canada' },
                { name: 'United States', slug: 'united-states' },
              ].map(dest => (
                <Link
                  key={dest.slug}
                  href={`/destination/${dest.slug}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 hover:border-teal-300 hover:text-teal-700 rounded-lg text-sm text-gray-700 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  {dest.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
