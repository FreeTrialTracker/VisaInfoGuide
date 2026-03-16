import { Metadata } from 'next';
import Link from 'next/link';
import { canonicalUrl, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';
import Breadcrumbs from '@/components/Breadcrumbs';
import SummaryBlock from '@/components/visa-guides/SummaryBlock';
import TableOfContents from '@/components/visa-guides/TableOfContents';
import FAQBlock from '@/components/visa-guides/FAQBlock';
import SourcesBlock from '@/components/visa-guides/SourcesBlock';
import LastReviewed from '@/components/visa-guides/LastReviewed';

const SLUG = 'do-australians-need-visa-for-usa-2026';
const PAGE_URL = canonicalUrl(`/visa-guides/do-i-need-a-visa/${SLUG}`);
const TITLE = 'Do Australians Need a Visa for the USA in 2026?';
const DESCRIPTION =
  'Complete guide to US visa requirements for Australian passport holders in 2026. Australians can visit the United States visa-free under the Visa Waiver Program but must obtain ESTA approval before departure.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'article',
    url: PAGE_URL,
    images: [{ url: canonicalUrl('/og/legal-og'), width: 1200, height: 630, alt: TITLE }],
    siteName: 'VisaInfoGuide',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [canonicalUrl('/og/legal-og')],
  },
  robots: { index: true, follow: true },
};

const tocItems = [
  { id: 'visa-requirement-summary', text: 'Visa Requirement Summary', level: 2 },
  { id: 'what-is-vwp', text: 'What Is the US Visa Waiver Program (VWP)?', level: 2 },
  { id: 'what-is-esta', text: 'What Is ESTA and How to Apply', level: 2 },
  { id: 'when-visa-required', text: 'When Do Australians Need a US Visa?', level: 2 },
  { id: 'documents-required', text: 'Documents Required at Entry', level: 2 },
  { id: 'overstay-penalties', text: 'Overstay Penalties in the United States', level: 2 },
  { id: 'faqs', text: 'Frequently Asked Questions', level: 2 },
  { id: 'sources', text: 'Sources', level: 2 },
];

const faqs = [
  {
    question: 'Do Australians need a visa for the USA in 2026?',
    answer:
      'No. Australian citizens do not need a traditional US visa for short tourism or business visits of up to 90 days under the Visa Waiver Program (VWP). However, ESTA (Electronic System for Travel Authorization) approval is mandatory before boarding any flight or vessel to the United States.',
  },
  {
    question: 'Is ESTA mandatory for Australian passport holders?',
    answer:
      'Yes. ESTA is required for all Australian citizens travelling to the United States under the Visa Waiver Program. You must apply online and receive approval before you travel — ESTA cannot be obtained on arrival. Most applications are approved within minutes, but it is recommended to apply at least 72 hours before departure.',
  },
  {
    question: 'How long can Australians stay in the USA?',
    answer:
      'Australian citizens travelling under the Visa Waiver Program may stay in the United States for a maximum of 90 days per visit. This applies to tourism, business meetings, and transit. The actual period is determined by the CBP officer at the port of entry and recorded on your I-94 record.',
  },
  {
    question: 'Can I extend my stay beyond 90 days under ESTA?',
    answer:
      'Extensions of stay under the Visa Waiver Program are generally not permitted. Unlike B1/B2 visa holders, VWP visitors cannot apply for a stay extension with USCIS. If you need to stay longer than 90 days you must apply for a B1/B2 tourist or business visa at a US embassy or consulate before you travel.',
  },
  {
    question: 'How much does ESTA cost for Australians?',
    answer:
      'The current ESTA application fee is USD 21. This is payable online at the time of application via the official US Department of Homeland Security ESTA portal. Be cautious of third-party sites that charge significantly higher fees — always use the official government website.',
  },
  {
    question: 'What happens if I overstay the 90-day limit in the US?',
    answer:
      'Overstaying your authorised period of admission in the United States has serious consequences. Any overstay permanently voids your ESTA eligibility. Overstays of 180 days or more trigger a 3-year re-entry bar; overstays of one year or more trigger a 10-year bar. These bars apply even after you voluntarily depart.',
  },
];

const sources = [
  {
    name: 'US Department of State — Visa Waiver Program',
    url: 'https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visa-waiver-program.html',
  },
  {
    name: 'US Customs and Border Protection — VWP',
    url: 'https://www.cbp.gov/travel/international-visitors/visa-waiver-program',
  },
  {
    name: 'Official ESTA Application — US Department of Homeland Security',
    url: 'https://esta.cbp.dhs.gov/',
  },
];

const breadcrumb = breadcrumbJsonLd([
  { name: 'Home', url: '/' },
  { name: 'Visa Guides', url: '/visa-guides' },
  { name: 'Do I Need a Visa?', url: '/visa-guides/do-i-need-a-visa' },
  { name: TITLE, url: PAGE_URL },
]);

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE,
  description: DESCRIPTION,
  datePublished: '2026-02-26',
  dateModified: '2026-02-26',
  author: { '@type': 'Organization', name: 'VisaInfoGuide' },
  publisher: {
    '@type': 'Organization',
    name: 'VisaInfoGuide',
    logo: { '@type': 'ImageObject', url: canonicalUrl('/visa.png') },
  },
};

export default function AustraliansToUSAArticlePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Breadcrumbs
            items={[
              { name: 'Visa Guides', url: '/visa-guides' },
              { name: 'Do I Need a Visa?', url: '/visa-guides/do-i-need-a-visa' },
              { name: 'Australians to USA 2026', url: `/visa-guides/do-i-need-a-visa/${SLUG}` },
            ]}
          />

          <article className="mt-8">
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {TITLE}
              </h1>
              <LastReviewed date="February 26, 2026" />
            </header>

            <SummaryBlock>
              <p className="text-base leading-relaxed">
                Australian citizens generally do not need a traditional visa to visit the United
                States. Australia is a member of the{' '}
                <strong>Visa Waiver Program (VWP)</strong>, which permits stays of up to{' '}
                <strong>90 days</strong> for tourism or business without a visa. However, all VWP
                travellers must obtain prior approval through{' '}
                <strong>ESTA (Electronic System for Travel Authorization)</strong> before boarding.
                ESTA is not a visa — it is a mandatory pre-travel authorisation that is linked
                electronically to your passport. For stays beyond 90 days, or for purposes such
                as work, study, or immigration, a US visa must be obtained from a US embassy or
                consulate. You can check entry requirements using the{' '}
                <Link href="/trip" className="text-teal-600 hover:text-teal-700 font-medium underline">
                  Trip Visa Finder
                </Link>
                .
              </p>
            </SummaryBlock>

            <TableOfContents items={tocItems} />

            <div className="prose prose-lg max-w-none">

              <section id="visa-requirement-summary" className="mb-10 scroll-mt-24">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Visa Requirement Summary</h2>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Requirement</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="bg-white">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Visa Required</td>
                        <td className="px-6 py-4 text-sm text-gray-700">No (for tourism/business under 90 days)</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Maximum Stay (Visa Waiver Program)</td>
                        <td className="px-6 py-4 text-sm text-gray-700">90 days per visit</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">ESTA Required</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Yes — mandatory before boarding</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">ESTA Fee</td>
                        <td className="px-6 py-4 text-sm text-gray-700">USD 21</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">ESTA Validity</td>
                        <td className="px-6 py-4 text-sm text-gray-700">2 years or until passport expires</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Visa on Arrival</td>
                        <td className="px-6 py-4 text-sm text-gray-700">No</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Passport Validity Required</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Valid for duration of stay</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Proof of Onward Travel</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Required</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Biometrics at Entry</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Taken at port of entry (fingerprints and photograph)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Australian citizens must hold a valid biometric ePassport (indicated by the chip
                  symbol on the cover) to travel under the VWP. Non-biometric passports are not
                  accepted under the Visa Waiver Program regardless of nationality.
                </p>
              </section>

              <section id="what-is-vwp" className="mb-10 scroll-mt-24">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  What Is the US Visa Waiver Program (VWP)?
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The Visa Waiver Program allows citizens of 42 designated countries — including
                  Australia — to travel to the United States for tourism, business, or transit for
                  up to 90 days without obtaining a visa. The programme is administered jointly by
                  the US Department of State and US Customs and Border Protection (CBP).
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Australia has been a VWP member country since 1996. To qualify, travellers must:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
                  <li>Hold a valid Australian biometric ePassport</li>
                  <li>Obtain ESTA approval before departure</li>
                  <li>Not have a criminal record that would make them inadmissible</li>
                  <li>
                    Not have previously been denied a US visa (unless a waiver was granted) or
                    denied entry to the US
                  </li>
                  <li>
                    Not have travelled to Cuba, Iran, Iraq, Libya, North Korea, Somalia, Sudan,
                    Syria, or Yemen on or after specific dates under the VWP Improvement and
                    Terrorist Travel Prevention Act
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  For a broader overview of how the Visa Waiver Program works, see our{' '}
                  <Link
                    href="/visa-guides/travel-visa-rules"
                    className="text-teal-600 hover:text-teal-700 font-medium underline"
                  >
                    Travel Visa Rules guide
                  </Link>
                  .
                </p>
              </section>

              <section id="what-is-esta" className="mb-10 scroll-mt-24">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  What Is ESTA and How to Apply
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  ESTA (Electronic System for Travel Authorization) is a mandatory pre-travel
                  requirement for all VWP travellers, including Australians. It is not a visa —
                  it is an electronic authorisation that determines your eligibility to travel to
                  the United States under the VWP before you board.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Key facts about ESTA for Australian travellers:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
                  <li>
                    Apply online at the official US DHS ESTA portal at{' '}
                    <strong>esta.cbp.dhs.gov</strong>
                  </li>
                  <li>
                    Most applications are approved within minutes; allow at least 72 hours before
                    travel as a precaution
                  </li>
                  <li>
                    ESTA is valid for <strong>2 years</strong> from approval or until your
                    passport expires — whichever comes first
                  </li>
                  <li>
                    Allows <strong>multiple entries</strong> to the United States during the
                    2-year validity period
                  </li>
                  <li>
                    Each individual visit is still limited to <strong>90 days</strong>
                  </li>
                  <li>
                    The application fee is <strong>USD 21</strong>, payable by card at the time
                    of application
                  </li>
                  <li>
                    If you renew your Australian passport, you must apply for a new ESTA linked
                    to the new passport
                  </li>
                </ul>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
                  <p className="text-sm text-gray-700">
                    <strong>Important:</strong> Only apply through the official US government
                    portal at <strong>esta.cbp.dhs.gov</strong>. Numerous third-party websites
                    charge inflated fees (often USD 80–100+) to submit the same application on
                    your behalf. The government fee is USD 21.
                  </p>
                </div>
              </section>

              <section id="when-visa-required" className="mb-10 scroll-mt-24">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  When Do Australians Need a US Visa?
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Despite Australia&apos;s VWP membership, there are several situations where an
                  Australian citizen must apply for a US visa at an embassy or consulate. You
                  need a visa if you intend to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
                  <li>
                    <strong>Stay longer than 90 days</strong> — a B-1/B-2 tourist or business
                    visa is required for extended stays
                  </li>
                  <li>
                    <strong>Study</strong> — an F-1 or M-1 student visa is required for any
                    enrolled course of academic or vocational study
                  </li>
                  <li>
                    <strong>Work or be employed by a US employer</strong> — an appropriate work
                    visa (H-1B, L-1, O-1, E-3, etc.) is required. Note that Australians have
                    access to the <strong>E-3 visa</strong>, a specialist work visa available
                    only to Australian nationals
                  </li>
                  <li>
                    <strong>Conduct journalism or media work</strong> — the I visa category
                    applies to representatives of foreign media
                  </li>
                  <li>
                    <strong>Immigrate or seek permanent residence</strong> — an immigrant visa
                    is required; VWP expressly prohibits travel with intent to immigrate
                  </li>
                  <li>
                    <strong>You have previously been denied ESTA or US entry</strong> — you must
                    apply for a B-1/B-2 visa at a US consulate
                  </li>
                  <li>
                    <strong>You have travelled to restricted countries</strong> since 2011 or
                    after designated dates — ESTA ineligibility may apply
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  For a full overview of when a visa is needed, visit our{' '}
                  <Link
                    href="/visa-guides/do-i-need-a-visa"
                    className="text-teal-600 hover:text-teal-700 font-medium underline"
                  >
                    Do I Need a Visa? hub
                  </Link>
                  .
                </p>
              </section>

              <section id="documents-required" className="mb-10 scroll-mt-24">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Documents Required at Entry
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  When travelling to the United States under the Visa Waiver Program, Australian
                  citizens should present the following at the US port of entry:
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Mandatory Documents</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[200px]">Valid Australian ePassport:</span>
                      <span>
                        Must be a biometric ePassport (denoted by the chip symbol on the cover)
                        and valid for at least the duration of your intended stay. Learn more about{' '}
                        <Link
                          href="/guides/passport-validity-rules"
                          className="text-teal-600 hover:text-teal-700 font-medium underline"
                        >
                          passport validity rules
                        </Link>
                        .
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[200px]">Approved ESTA:</span>
                      <span>
                        Your ESTA approval is linked to your passport electronically. You do not
                        need to print a copy, but you should keep your confirmation number accessible
                        during travel.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[200px]">Return or Onward Ticket:</span>
                      <span>
                        Proof of departure from the United States within 90 days is required.
                        See our{' '}
                        <Link
                          href="/visa-guides/travel-visa-rules"
                          className="text-teal-600 hover:text-teal-700 font-medium underline"
                        >
                          travel visa rules guide
                        </Link>{' '}
                        for details on onward travel requirements.
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">May Be Requested</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[200px]">Proof of Accommodation:</span>
                      <span>
                        Hotel booking confirmation, rental agreement, or the address of where you
                        will be staying in the United States.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[200px]">Proof of Funds:</span>
                      <span>
                        Bank statements or credit card details showing you can financially support
                        yourself during your stay without working unlawfully.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[200px]">Travel Itinerary:</span>
                      <span>
                        Details of your planned activities, accommodation bookings, and departure
                        date from the United States.
                      </span>
                    </li>
                  </ul>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  CBP officers have full discretion to deny entry even with valid ESTA approval.
                  Carrying supporting documents reduces the likelihood of complications at the
                  border, particularly if you are making frequent or extended trips to the United
                  States.
                </p>
              </section>

              <section id="overstay-penalties" className="mb-10 scroll-mt-24">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Overstay Penalties in the United States
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Overstaying your authorised period of admission in the United States is a
                  serious immigration violation with significant and long-lasting consequences,
                  especially for VWP travellers.
                </p>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Consequences of Overstaying</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[200px]">ESTA Permanently Voided:</span>
                      <span>
                        Any overstay — even by a single day — permanently voids your ESTA eligibility.
                        You can never again use the Visa Waiver Program.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[200px]">3-Year Entry Bar:</span>
                      <span>
                        Overstays of 180 days or more but less than 1 year trigger a 3-year bar on
                        re-entry to the United States after departure.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[200px]">10-Year Entry Bar:</span>
                      <span>
                        Overstays of 1 year or more trigger a 10-year bar on re-entry after
                        departure.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[200px]">Visa Applications Affected:</span>
                      <span>
                        A record of overstay is permanently held in CBP systems and is reviewed
                        for all future US visa applications or entries, significantly reducing
                        approval chances.
                      </span>
                    </li>
                  </ul>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Always track your I-94 arrival/departure record (available at{' '}
                  <strong>i94.cbp.dhs.gov</strong>) and ensure you depart before the date shown as
                  your authorised period of admission.
                </p>
              </section>

            </div>

            <FAQBlock faqs={faqs} />

            <SourcesBlock sources={sources} />

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Visa Checks</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/visa-guides/do-i-need-a-visa"
                  className="group block p-5 bg-white border border-gray-200 rounded-lg hover:border-teal-300 hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors mb-1">
                    Do I Need a Visa? Hub
                  </h3>
                  <p className="text-sm text-gray-600">
                    Check visa requirements for any passport and destination combination.
                  </p>
                </Link>

                <Link
                  href="/passport/australia"
                  className="group block p-5 bg-white border border-gray-200 rounded-lg hover:border-teal-300 hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors mb-1">
                    Australian Passport Guide
                  </h3>
                  <p className="text-sm text-gray-600">
                    Full visa-free and visa-on-arrival access for Australian passport holders worldwide.
                  </p>
                </Link>

                <Link
                  href="/visa-guides/do-i-need-a-visa/do-australians-need-visa-for-uk-2026"
                  className="group block p-5 bg-white border border-gray-200 rounded-lg hover:border-teal-300 hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors mb-1">
                    Do Australians Need a Visa for the UK in 2026?
                  </h3>
                  <p className="text-sm text-gray-600">
                    UK ETA requirements and entry rules for Australian passport holders.
                  </p>
                </Link>

                <Link
                  href="/trip"
                  className="group block p-5 bg-teal-50 border border-teal-200 rounded-lg hover:border-teal-400 hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-teal-800 group-hover:text-teal-900 transition-colors mb-1">
                    Trip Visa Finder Tool
                  </h3>
                  <p className="text-sm text-teal-700">
                    Plan a multi-destination trip and check visa requirements for your entire
                    itinerary at once.
                  </p>
                </Link>
              </div>
            </section>
          </article>
        </div>
      </div>
    </>
  );
}
