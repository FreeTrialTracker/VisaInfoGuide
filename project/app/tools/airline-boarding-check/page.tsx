import { Metadata } from 'next';
import Link from 'next/link';
import { Plane, ShieldCheck, Clock, Ticket, MapPin, Globe, BookOpen, CalendarCheck, ListChecks, Route } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import BoardingCheckClient from '@/components/tools/BoardingCheckClient';
import FAQAccordion from '@/components/tools/FAQAccordion';
import AirportLayoverNotice from '@/components/AirportLayoverNotice';
import { canonicalUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Airline Boarding Check Tool (2026) | VisaInfoGuide',
  description: 'Check if you can board your flight before you go. Evaluate destination visa, passport validity, transit requirements, and onward ticket rules in one place.',
  alternates: {
    canonical: canonicalUrl('/tools/airline-boarding-check'),
  },
  openGraph: {
    title: 'Airline Boarding Check Tool | VisaInfoGuide',
    description: 'Instantly assess your flight boarding readiness — visa, passport validity, transit, and onward ticket checks.',
    url: canonicalUrl('/tools/airline-boarding-check'),
    type: 'website',
    siteName: 'VisaInfoGuide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Airline Boarding Check Tool | VisaInfoGuide',
    description: 'Check your boarding readiness before you fly — visa, passport validity, transit visa, and onward ticket in one tool.',
  },
  robots: { index: true, follow: true },
};

const faqItems = [
  {
    q: 'What is an airline boarding check and why does it matter?',
    a: `Airlines are required by law to verify that passengers meet the entry requirements for their destination before boarding. If an airline boards a passenger who is subsequently denied entry, the airline is responsible for flying that person back at its own cost. This means gate agents and check-in staff will check your visa status, passport validity, and sometimes whether you have a return or onward ticket. This tool simulates those checks so you can identify potential issues before you get to the airport.`,
  },
  {
    q: 'Why do airlines deny boarding even if entry is visa-free?',
    a: `Airlines verify more than visas. They also check passport validity, transit visa requirements, and sometimes proof of onward travel. Even when a country allows visa-free entry, airlines may deny boarding if your passport does not meet the minimum validity requirement, if you need a transit visa at a connecting airport, or if you cannot show a return or onward ticket for destinations that require one. This tool checks all four conditions together.`,
  },
  {
    q: 'What is a transit visa and when do I need one?',
    a: `A transit visa is a separate authorization required to pass through a country even if you are not entering it — for example, connecting through London Heathrow or Frankfurt Airport. Some countries require what is called an Airside Transit Visa (ATV or DATV) even if you never leave the international terminal. Requirements depend entirely on your passport nationality and the transit country. Indian, Pakistani, Nigerian, and several other passport holders require an Airside Transit Visa to connect through the UK, for example. Always check with the airline and the transit country's immigration authority before booking.`,
  },
  {
    q: 'How much passport validity do I need for my trip?',
    a: `Rules vary by country. Schengen Area countries (France, Germany, Spain, Italy, and others) require your passport to be valid for at least three months beyond your planned departure date from the Schengen Zone. Most Southeast Asian destinations — Thailand, Singapore, Indonesia, Vietnam — require six months of validity beyond your arrival date. The United States, United Kingdom, Australia, and Japan generally require your passport to remain valid for the entire duration of your stay, without the six-month buffer. Airlines check validity before boarding, so even if immigration would let you through, the airline may deny you at the gate.`,
  },
  {
    q: 'Do I need a return or onward ticket to board my flight?',
    a: `Many countries require proof of onward travel as a condition of entry, particularly for tourist or visa-free travelers. This is enforced most strictly for destinations like the United States, United Kingdom, Australia, Canada, Thailand, and the Philippines. Even in countries that do not legally require it, airlines often ask for evidence of a departure plan because they are liable if you are refused entry. As a one-way traveler, you may be questioned or denied boarding. A common solution is to book a refundable ticket on a future date and cancel it after arrival, or use a legitimate onward ticket service.`,
  },
  {
    q: 'Does an eVisa count the same as a visa for boarding?',
    a: `Yes — a valid eVisa, electronic travel authorization (ETA), or pre-approved entry authorization issued by the destination country counts as valid travel permission for boarding purposes. What matters is that you have official authorization to enter before you board. In most cases you should carry a printed copy or have the approval accessible on your phone. The key distinction is that for destinations that only offer traditional in-person visas, you cannot board without holding that visa — an online application confirmation or reference number is not the same as an approved visa.`,
  },
  {
    q: 'Is this tool a guaranteed boarding clearance?',
    a: `No. This tool uses a seeded dataset of known visa rules, passport validity policies, transit requirements, and onward ticket enforcement patterns. It is designed to help you identify likely issues and take action before travel — not to replace official verification. Actual boarding decisions are made by airlines using systems like Timatic, which is updated in real time. Entry rules can change without notice due to diplomatic relations, health policies, or bilateral agreements. Always verify your specific situation with the airline, the destination embassy, and official government immigration portals before you travel.`,
  },
];

const checkFeatures = [
  { icon: Plane, label: 'Destination Visa', desc: 'Visa-free, eVisa, visa required, or visa on arrival' },
  { icon: Clock, label: 'Passport Validity', desc: '3-month and 6-month rules checked against your expiry' },
  { icon: ShieldCheck, label: 'Transit Visa', desc: 'Airside and full transit visa requirements at each stop' },
  { icon: Ticket, label: 'Onward Ticket', desc: 'Enforcement level and whether your trip plan satisfies it' },
];

const relatedTools = [
  {
    href: '/tools/schengen-calculator',
    icon: BookOpen,
    label: 'Schengen Calculator',
    desc: 'Calculate your remaining days in the Schengen Area under the 90/180 rule',
    live: true,
  },
  {
    href: '/trip',
    icon: Plane,
    label: 'Trip Visa Finder',
    desc: 'Get a full visa summary for every country in your itinerary in one go',
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
    desc: 'Country-by-country guide to passport validity requirements for travelers',
    live: true,
  },
  {
    href: '/tools/trip-entry-risk-check',
    icon: ListChecks,
    label: 'Trip Entry Risk Check',
    desc: 'Evaluate overall entry risk for your trip across all required documents',
    live: true,
  },
  {
    href: '/tools/transit-visa-checker',
    icon: Route,
    label: 'Transit Visa Checker',
    desc: 'Check if your passport requires a transit visa at any connection point',
    live: true,
  },
];

export default function AirlineBoardingCheckPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqItems.map(item => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a },
            })),
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Breadcrumbs
            items={[
              { name: 'Tools', url: '/tools' },
              { name: 'Airline Boarding Check', url: '/tools/airline-boarding-check' },
            ]}
          />

          <header className="mt-6 mb-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-blue-100 rounded-xl flex-shrink-0">
                <Plane className="w-7 h-7 text-blue-700" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Airline Boarding Check
              </h1>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
              Check whether airlines are likely to allow you to board based on visa rules, passport validity, transit requirements, and onward ticket policies.
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Based on global visa rules, passport validity policies, and airline boarding requirements.
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

          <BoardingCheckClient />

          <section className="mt-14 border-t border-gray-100 pt-10" aria-labelledby="related-tools-heading">
            <h2 id="related-tools-heading" className="text-lg font-bold text-gray-900 mb-5">Related Tools and Guides</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedTools.map(({ href, icon: Icon, label, desc, live }) => {
                const isDisabled = !live && href === '#';
                const inner = (
                  <>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      <div className={`text-sm font-semibold ${isDisabled ? 'text-gray-500' : 'text-gray-800 group-hover:text-blue-700'}`}>{label}</div>
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

          <AirportLayoverNotice variant="airport transit hotels" />

          <section className="mt-16 border-t border-gray-100 pt-12" aria-labelledby="how-it-works-heading">
            <h2 id="how-it-works-heading" className="text-2xl font-bold text-gray-900 mb-8">
              How Airline Boarding Checks Work
            </h2>
            <div className="space-y-10">
              <div className="flex gap-5">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">What airlines check before boarding</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Airlines are legally responsible for passengers they transport. If you arrive at a destination without the right to enter, the airline that carried you must fly you back at its own expense and may face a fine. To avoid this, airlines use systems like IATA Timatic — a real-time database of entry requirements — to verify your passport, visa, and travel documents at check-in and again at the gate. The four checks this tool simulates are the most frequently flagged: destination visa authorization, passport validity, transit visas, and onward ticket proof.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-amber-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">Why transit visas matter more than most travelers expect</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Connecting through a country does not mean you bypass its immigration rules. Many transit hubs — including the United Kingdom, Schengen Area airports, and Canada — require certain passport holders to hold a transit visa even if they never plan to leave the sterile airside area. These are called Airside Transit Visas (ATV) or Direct Airside Transit Visas (DATV). Failure to hold one can result in denied boarding at the departure airport before you even start your journey. Indian, Pakistani, Bangladeshi, and many African passport holders are commonly affected by transit visa requirements in Europe and North America.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <CalendarCheck className="w-5 h-5 text-emerald-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">How passport validity affects boarding</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Most countries do not simply require your passport to be valid on arrival — they require it to remain valid for a defined period beyond your stay. The two most common rules are: six months of validity beyond your arrival date (enforced by most of Southeast Asia, the Middle East, and parts of Africa) and three months beyond your planned departure date from the Schengen Zone (enforced by all 29 Schengen member states). Even if immigration allows you through on a technicality, airline check-in systems flag passports that fail these rules and agents are trained to deny boarding. A passport expiring in four months may get you into the US but will be flagged by your airline flying to Thailand.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                    <Ticket className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">Why onward tickets can matter even when entry is visa-free</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Visa-free entry does not mean unconditional entry. Countries like the United States, United Kingdom, Thailand, and the Philippines use onward ticket requirements as a secondary check — you must show that you have a plan to leave the country within your authorized stay. This is enforced both by immigration officers and by airlines before boarding. The United States CBP, for instance, can turn away travelers who cannot demonstrate onward intent, even holders of passports that normally enjoy visa-free access under the Visa Waiver Program. One-way travelers heading to countries that strongly enforce this rule should have a documented outbound plan or a confirmed flexible booking before arriving at the airport.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-14 border-t border-gray-100 pt-10">
            <h2 className="text-lg font-bold text-gray-900 mb-4">About this tool</h2>
            <p className="text-gray-600 leading-relaxed mb-4 text-sm">
              The Airline Boarding Check tool evaluates four rule layers that determine whether a traveler is likely to be permitted to board their flight: the destination visa requirement for their passport nationality, passport validity against the destination country&apos;s minimum rule, any transit visa requirements at connection points, and the onward or return ticket enforcement level at the destination.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4 text-sm">
              Results are classified as <strong>Likely OK</strong>, <strong>Caution</strong>, or <strong>Likely Issue</strong>. Caution results indicate that a condition requires your attention but may not be a hard blocker — for example, an eVisa that needs to be applied for, or an onward ticket that is commonly but not always checked. Likely Issue results indicate a likely boarding denial based on known rules.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm">
              This tool was designed to give travelers an honest pre-flight assessment, not marketing copy. Where data is missing, the tool says so rather than making up an answer. We update rule coverage on an ongoing basis. For full visa requirement details, visit our{' '}
              <Link href="/visa-guides" className="text-blue-600 hover:underline">visa guides</Link> or individual{' '}
              <Link href="/visa-free-countries" className="text-blue-600 hover:underline">passport pages</Link>.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
