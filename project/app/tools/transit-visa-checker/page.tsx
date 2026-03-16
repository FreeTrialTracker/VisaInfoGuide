import { Metadata } from 'next';
import Link from 'next/link';
import {
  Route,
  Shield,
  ArrowRightLeft,
  Building2,
  BadgeCheck,
  Plane,
  BookOpen,
  Globe,
  CalendarCheck,
  ListChecks,
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import TransitCheckerClient from '@/components/tools/TransitCheckerClient';
import FAQAccordion from '@/components/tools/FAQAccordion';
import AirportLayoverNotice from '@/components/AirportLayoverNotice';
import { canonicalUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Transit Visa Checker — Airport Layover Requirements (2026) | VisaInfoGuide',
  description:
    'Check whether your passport requires a transit visa for an airport layover or connection. Covers airside transit, self-transfer, terminal changes, and exemptions for major global hubs.',
  alternates: {
    canonical: canonicalUrl('/tools/transit-visa-checker'),
  },
  openGraph: {
    title: 'Transit Visa Checker | VisaInfoGuide',
    description:
      'Does your passport need a transit visa at your layover airport? Check airside requirements, self-transfer rules, and exemptions in one tool.',
    url: canonicalUrl('/tools/transit-visa-checker'),
    type: 'website',
    siteName: 'VisaInfoGuide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Transit Visa Checker | VisaInfoGuide',
    description:
      'Check transit visa requirements for your layover — airside, self-transfer, terminal changes, and exemptions.',
  },
  robots: { index: true, follow: true },
};

const checkFeatures = [
  {
    icon: Shield,
    label: 'Airside Transit',
    desc: 'Whether your passport requires an ATV/DATV to connect in the sterile zone',
  },
  {
    icon: ArrowRightLeft,
    label: 'Self-Transfer Risk',
    desc: 'How self-transfer on separate tickets changes immigration requirements',
  },
  {
    icon: Building2,
    label: 'Terminal Change',
    desc: 'Whether switching terminals requires passing through immigration',
  },
  {
    icon: BadgeCheck,
    label: 'Exemptions',
    desc: 'Qualifying visas and permits that may waive transit visa requirements',
  },
];

const faqItems = [
  {
    q: 'What is a transit visa?',
    a: 'A transit visa is a short-stay authorization required by some countries to allow travelers to pass through their territory — even without formally entering — while connecting to another flight. It is distinct from a tourist or visitor visa. The most common type is an Airside Transit Visa (ATV or DATV), which is required simply to remain in the international departure area of certain airports without ever reaching immigration.',
  },
  {
    q: 'Do I need a transit visa if I stay inside the airport?',
    a: 'It depends entirely on your passport nationality and the transit country. Some countries — including the United Kingdom and several Schengen member states — require certain passport holders to obtain a Direct Airside Transit Visa (DATV) even if they never leave the international sterile zone. This means you could be denied boarding at your origin airport if you do not hold the required DATV. Other countries, like the UAE, Qatar, Turkey, and Singapore, do not require any transit visa for airside connections regardless of passport.',
  },
  {
    q: 'Does self-transfer change transit visa rules?',
    a: 'Yes — significantly. When you are on separate tickets (self-transfer), you are typically required to collect your checked bags and re-check them through security yourself. This almost always means clearing immigration at the transit airport. If your passport requires a visa to enter that country, you will need one to self-transfer there, regardless of whether airside transit would have been permitted. Self-transfer is one of the most common reasons travelers are denied boarding unexpectedly.',
  },
  {
    q: 'Do terminal changes require immigration clearance?',
    a: 'Sometimes. At many large airports, terminals are connected by an airside transit corridor and you can move between them without clearing immigration. However, at some airports — including certain terminals at London Heathrow, Frankfurt, and others — different terminals are not connected airside. Moving between them may require exiting the sterile zone, clearing immigration, and re-entering security. Whether this applies to your specific connection depends on the airport layout and which airlines you are flying. Always check with the operating airline.',
  },
  {
    q: 'Can a valid US, UK, Schengen, or residence permit exempt me from a transit visa?',
    a: 'In many cases, yes. Holding a valid US B-1/B-2 visa, a valid UK visa, a valid Schengen visa, or certain residence permits (such as a US Green Card or EU/EEA residence permit) can exempt you from the transit visa requirement at airports that would otherwise require one. For example, Indian and Pakistani passport holders who hold a valid US visa are exempt from the UK Airside Transit Visa (DATV) requirement. Similarly, Canada exempts holders of a valid US visa from its Transit Visa (C1) requirement. These exemptions are country-specific and may change — always verify with the transit country before travel.',
  },
  {
    q: 'Why can airlines deny boarding during a transit connection?',
    a: 'Airlines are responsible under international law for verifying that passengers they carry meet all entry and transit requirements before boarding. If you are denied entry at a transit country and require a return flight, the airline that carried you there is liable for that cost and may face fines. For this reason, check-in agents use systems like IATA Timatic to verify transit visa requirements at every step in your journey — not just at the final destination. You can be denied boarding at your origin city if the airline determines you lack a required transit document.',
  },
  {
    q: 'What is the difference between airside and landside transit?',
    a: 'Airside transit means you remain inside the international departure zone of the airport — the sterile area past passport control — throughout your connection. You never formally enter the country. Landside transit means you pass through immigration, enter the country, and re-depart. Landside transit is required when you are self-transferring with separate tickets, changing to a terminal that is not connected airside, or leaving the airport. The visa requirements for landside transit are always higher because you are actually entering the country, even briefly.',
  },
  {
    q: 'Do I need a transit visa if I change airports in the same city?',
    a: 'Usually yes. Changing airports — for example, flying into London Heathrow and departing from London Gatwick, or into Paris CDG and departing from Paris Orly — requires leaving the airport, entering the country through immigration, and traveling overland to the second airport. This is always a landside transit, which means you are formally entering the country. Unless your passport nationality is visa-exempt for that country, or you qualify for a transit exemption, you will need a valid entry visa or transit visa to make this connection. The standard airport transit visa (DATV) is not sufficient for an inter-airport transfer because it only covers airside connections within the same airport.',
  },
  {
    q: 'Do I need a transit visa if my connection is overnight?',
    a: 'Sometimes. Overnight connections may require leaving the secure transit area or clearing immigration, which can require a visa depending on your passport and the airport\'s transit rules. Whether this applies depends on the airport, your passport nationality, and your ticket arrangement. At some airports, airside overnight facilities exist so you can remain in the sterile zone. At others — or if you are on separate tickets — you will be required to exit the secure area and clear immigration. If your passport nationality requires a visa to enter that country, an overnight connection can trigger that requirement. Always check the specific airport\'s transit policies before booking.',
  },
];

const relatedTools = [
  {
    href: '/tools/airline-boarding-check',
    icon: Plane,
    label: 'Airline Boarding Check',
    desc: 'Full boarding eligibility check covering visa, passport validity, transit, and onward ticket',
    live: true,
  },
  {
    href: '/tools/schengen-calculator',
    icon: BookOpen,
    label: 'Schengen Calculator',
    desc: 'Calculate your remaining days in the Schengen Area under the 90/180 rule',
    live: true,
  },
  {
    href: '/trip',
    icon: Globe,
    label: 'Trip Visa Finder',
    desc: 'Get a full visa summary for every country in your itinerary',
    live: true,
  },
  {
    href: '/compare',
    icon: Globe,
    label: 'Compare Passports',
    desc: 'Side-by-side visa access comparison between two passports',
    live: true,
  },
  {
    href: '/guides/passport-validity-rules',
    icon: CalendarCheck,
    label: 'Passport Validity Rules',
    desc: 'Country-by-country guide to passport validity requirements',
    live: true,
  },
  {
    href: '/tools/trip-entry-risk-check',
    icon: ListChecks,
    label: 'Trip Entry Risk Check',
    desc: 'Evaluate overall entry risk for your trip across all required documents',
    live: true,
  },
];

export default function TransitVisaCheckerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Transit Visa Checker',
            description:
              'Check transit visa requirements for airport layovers — airside, self-transfer, terminal changes, and exemptions.',
            url: canonicalUrl('/tools/transit-visa-checker'),
            applicationCategory: 'TravelApplication',
            operatingSystem: 'Web',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            author: { '@type': 'Organization', name: 'VisaInfoGuide', url: 'https://visainfoguide.com' },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: canonicalUrl('/') },
                { '@type': 'ListItem', position: 2, name: 'Tools', item: canonicalUrl('/tools') },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: 'Transit Visa Checker',
                  item: canonicalUrl('/tools/transit-visa-checker'),
                },
              ],
            },
            mainEntity: {
              '@type': 'FAQPage',
              mainEntity: faqItems.map(item => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: { '@type': 'Answer', text: item.a },
              })),
            },
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Breadcrumbs
            items={[
              { name: 'Tools', url: '/tools' },
              { name: 'Transit Visa Checker', url: '/tools/transit-visa-checker' },
            ]}
          />

          <header className="mt-6 mb-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-blue-100 rounded-xl flex-shrink-0">
                <Route className="w-7 h-7 text-blue-700" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Transit Visa Checker
              </h1>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
              Check whether you need a transit visa for an airport connection based on your passport, transit airport, and connection type.
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Based on immigration rules for major global transit hubs and airport connection policies.
            </p>
          </header>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-7">
            {checkFeatures.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                <div className="flex justify-center mb-2">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-sm font-semibold text-gray-800 mb-1">{label}</div>
                <div className="text-xs text-gray-500 leading-snug">{desc}</div>
              </div>
            ))}
          </div>

          <TransitCheckerClient />

          <section className="mt-14 border-t border-gray-100 pt-10" aria-labelledby="related-tools-heading">
            <h2 id="related-tools-heading" className="text-lg font-bold text-gray-900 mb-5">
              Related Tools and Guides
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedTools.map(({ href, icon: Icon, label, desc, live }) => {
                const isDisabled = !live;
                const inner = (
                  <>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      <div
                        className={`text-sm font-semibold ${
                          isDisabled ? 'text-gray-500' : 'text-gray-800 group-hover:text-blue-700'
                        }`}
                      >
                        {label}
                      </div>
                      {!live && (
                        <span className="ml-auto text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full flex-shrink-0">
                          Soon
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 leading-snug">{desc}</div>
                  </>
                );

                if (isDisabled) {
                  return (
                    <div
                      key={label}
                      className="bg-white border border-gray-200 rounded-xl p-4 opacity-60 cursor-default"
                    >
                      {inner}
                    </div>
                  );
                }

                return (
                  <Link
                    key={label}
                    href={href}
                    className="group bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all"
                  >
                    {inner}
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="mt-14" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <FAQAccordion items={faqItems} />
          </section>

          <AirportLayoverNotice variant="hotels inside airports" />

          <section className="mt-16 border-t border-gray-100 pt-12" aria-labelledby="how-transit-works-heading">
            <h2 id="how-transit-works-heading" className="text-2xl font-bold text-gray-900 mb-8">
              How Transit Visa Checks Work
            </h2>
            <div className="space-y-10">
              <div className="flex gap-5">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">
                    What is an airport transit visa?
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    An airport transit visa (ATV) or Direct Airside Transit Visa (DATV) is a document
                    that certain passport holders must obtain before they are permitted to connect
                    between flights at airports in countries that require one — even if they never
                    leave the international sterile zone and never formally enter the country. The UK,
                    Canada, and most Schengen member states maintain a list of nationalities that
                    require a DATV for airside transit. Airlines enforce this requirement at the
                    departure airport: if you lack a required transit document, you will be denied
                    boarding before your journey even begins.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                    <ArrowRightLeft className="w-5 h-5 text-amber-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">
                    When self-transfer creates a visa problem
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Self-transfer means you have booked two separate tickets and must collect your
                    checked bags, clear customs, and re-check in on the second ticket yourself. Unlike
                    a protected connection on a single booking — where the airline transfers your bags
                    and you remain airside — self-transfer almost always requires passing through
                    immigration at the transit airport. If your passport requires a visa to enter that
                    country (even for a short stay), you need to hold it. Travelers from India,
                    Pakistan, Nigeria, and many other passport nationalities face this barrier
                    particularly at UK, Schengen, and Canadian airports. The savings from booking
                    separate tickets can be immediately lost if you need to obtain an expensive
                    transit visa.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-emerald-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">
                    Why terminal changes can matter
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Large airports often have multiple terminals. At airports where terminals are
                    connected by an airside corridor — like Dubai (DXB), Singapore (SIN), or Tokyo
                    Narita (NRT) — you can move between them without clearing immigration. But at
                    airports where terminals are not connected airside — including some terminal pairs
                    at London Heathrow, Frankfurt, and Paris CDG — you must exit the sterile zone,
                    take a bus or train, and re-enter through security. For passport holders who
                    require a transit visa or entry visa for that country, this terminal change
                    creates a mandatory immigration requirement. Always confirm with your airline
                    whether your specific terminal-to-terminal connection is fully airside.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                    <BadgeCheck className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">
                    Why airside and landside transit are different
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Airside transit means you remain entirely within the international departure
                    area of the airport. You pass security once at your origin, and the next
                    interaction with immigration is at your final destination. Landside transit
                    means exiting through immigration at the transit airport, entering the country
                    (even briefly), and then re-joining departures. This distinction is the key
                    variable in transit visa logic. Many passport holders are permitted airside
                    transit without any visa but cannot transit landside without a full entry visa.
                    The UAE, Qatar, Turkey, and Singapore are considered among the most open transit
                    hubs because they allow landside transit for most nationalities without a visa
                    (or with a free or inexpensive visa on arrival), whereas the UK, Schengen
                    airports, and Canada maintain restrictive DATV and transit visa requirements.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-14 border-t border-gray-100 pt-10">
            <h2 className="text-lg font-bold text-gray-900 mb-4">About this tool</h2>
            <p className="text-gray-600 leading-relaxed mb-4 text-sm">
              The Transit Visa Checker evaluates four risk factors for your airport connection: whether
              your passport requires an Airside Transit Visa (ATV/DATV), whether your trip details
              (self-transfer, terminal change, or leaving the airport) trigger an immigration requirement,
              whether a full transit visa is needed, and whether exemptions from qualifying visas or
              permits may apply.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4 text-sm">
              Results are marked as <strong>No transit visa needed</strong>, <strong>Transit visa may
              be needed</strong>, or <strong>Transit visa likely required</strong>. The tool also
              provides a confidence rating — <strong>High</strong>, <strong>Medium</strong>, or{' '}
              <strong>Limited</strong> — based on the quality and completeness of our MVP dataset for
              that specific combination.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm">
              Current MVP coverage includes: United Kingdom, Germany, France, Netherlands, UAE, Singapore,
              Japan, South Korea, Qatar, Turkey, Saudi Arabia, China, and Canada. Passport coverage varies
              by transit country. For broader visa coverage, visit our{' '}
              <Link href="/visa-guides" className="text-blue-600 hover:underline">
                visa guides
              </Link>{' '}
              or the{' '}
              <Link href="/tools/airline-boarding-check" className="text-blue-600 hover:underline">
                Airline Boarding Check
              </Link>{' '}
              for a full pre-flight assessment.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
