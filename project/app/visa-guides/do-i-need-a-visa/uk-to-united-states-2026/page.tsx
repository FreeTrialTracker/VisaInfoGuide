import { Metadata } from 'next';
import Link from 'next/link';
import { canonicalUrl, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';
import Breadcrumbs from '@/components/Breadcrumbs';
import SummaryBlock from '@/components/visa-guides/SummaryBlock';
import TableOfContents from '@/components/visa-guides/TableOfContents';
import FAQBlock from '@/components/visa-guides/FAQBlock';
import SourcesBlock from '@/components/visa-guides/SourcesBlock';
import LastReviewed from '@/components/visa-guides/LastReviewed';

const SLUG = 'uk-to-united-states-2026';
const PAGE_URL = canonicalUrl(`/visa-guides/do-i-need-a-visa/${SLUG}`);
const TITLE = 'Do UK Citizens Need a Visa for the United States in 2026?';
const DESCRIPTION =
  'Complete guide to US visa requirements for UK passport holders in 2026. UK citizens do not need a traditional visa for short stays under the Visa Waiver Program but must obtain ESTA approval before travel.';

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
  { id: 'when-visa-required', text: 'When Do UK Citizens Need a US Visa?', level: 2 },
  { id: 'documents-required', text: 'Documents Required at Entry', level: 2 },
  { id: 'overstay-penalties', text: 'Overstay Penalties in the United States', level: 2 },
  { id: 'faqs', text: 'Frequently Asked Questions', level: 2 },
  { id: 'sources', text: 'Sources', level: 2 },
];

const faqs = [
  {
    question: 'Do UK citizens need a visa for the USA in 2026?',
    answer:
      'No. UK citizens do not need a traditional US visa for short tourism or business visits of up to 90 days under the Visa Waiver Program. However, ESTA (Electronic System for Travel Authorization) approval is mandatory before boarding and must be obtained online.',
  },
  {
    question: 'Is ESTA mandatory for UK passport holders?',
    answer:
      'Yes. ESTA is required for all UK citizens travelling to the United States under the Visa Waiver Program. You must apply and receive approval before you travel — ESTA cannot be obtained on arrival. Most applications are approved within minutes, but it is recommended to apply at least 72 hours before departure.',
  },
  {
    question: 'How long can British citizens stay in the US?',
    answer:
      'British citizens travelling under the Visa Waiver Program may stay in the United States for a maximum of 90 days per visit. This limit applies to tourism, business meetings, and transit. Days are counted from the date of entry stamped in your passport by a CBP officer.',
  },
  {
    question: 'Can I extend my 90-day stay in the US?',
    answer:
      'Extensions of stay under the Visa Waiver Program are generally not permitted. Unlike B1/B2 visa holders, VWP visitors cannot apply for an extension with USCIS. If you need to stay longer than 90 days you must apply for a B1/B2 tourist or business visa at a US embassy or consulate before you travel.',
  },
  {
    question: 'Can I work remotely in the US under ESTA?',
    answer:
      'This is a grey area. Performing work for a US employer or client is not permitted under the VWP. Remote work for a non-US employer, where you are simply travelling with your laptop, is generally tolerated but is not explicitly authorised. If in doubt, consult an immigration lawyer before travelling for extended remote-work stays.',
  },
  {
    question: 'What happens if I overstay in the US?',
    answer:
      'Overstaying your authorised period of admission in the United States has serious consequences. Your ESTA is permanently voided and you will be ineligible for the VWP in the future. Overstays of 180 days result in a 3-year bar on re-entry; overstays of one year or more result in a 10-year bar. Voluntary departure before any bar period begins limits some penalties, but the ESTA ineligibility remains permanent.',
  },
];

const sources = [
  {
    name: 'US Department of State — Visa Waiver Program',
    url: 'https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visa-waiver-program.html',
  },
  {
    name: 'US Customs and Border Protection (CBP) — VWP',
    url: 'https://www.cbp.gov/travel/international-visitors/visa-waiver-program',
  },
  {
    name: 'Official ESTA Application Website — US Department of Homeland Security',
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
  datePublished: '2026-02-22',
  dateModified: '2026-02-22',
  author: { '@type': 'Organization', name: 'VisaInfoGuide' },
  publisher: {
    '@type': 'Organization',
    name: 'VisaInfoGuide',
    logo: { '@type': 'ImageObject', url: canonicalUrl('/visa.png') },
  },
};

export default function UKToUSArticlePage() {
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
              { name: 'UK to United States 2026', url: `/visa-guides/do-i-need-a-visa/${SLUG}` },
            ]}
          />

          <article className="mt-8">
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {TITLE}
              </h1>
              <LastReviewed date="February 22, 2026" />
            </header>

            <SummaryBlock>
              <p className="text-base leading-relaxed">
                UK citizens generally do not need a traditional visa for short tourism or business
                visits to the United States. The UK is a member of the{' '}
                <strong>Visa Waiver Program (VWP)</strong>, which allows stays of up to{' '}
                <strong>90 days</strong> without a visa. However, all VWP travellers must obtain
                approval through the{' '}
                <strong>Electronic System for Travel Authorization (ESTA)</strong> before boarding.
                ESTA is not a visa — it is a mandatory pre-travel authorisation linked to your
                passport. For longer stays or purposes such as work, study, or immigration, a US
                visa is required. You can check specific entry requirements at{' '}
                <Link
                  href="/visa-guides/country-entry-requirements/united-states-2026"
                  className="text-teal-600 hover:text-teal-700 font-medium underline"
                >
                  US Entry Requirements 2026
                </Link>{' '}
                or use the{' '}
                <Link href="/trip" className="text-teal-600 hover:text-teal-700 font-medium underline">
                  Trip Visa Finder
                </Link>{' '}
                for a full itinerary check.
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
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Proof of Funds</td>
                        <td className="px-6 py-4 text-sm text-gray-700">May be requested</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Biometrics</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Taken at entry (fingerprints and photograph)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  UK citizens entering the US must hold a valid biometric (ePassport) to travel under
                  the VWP. Older non-biometric passports require a B1/B2 visa regardless of
                  nationality.
                </p>
              </section>

              <section id="what-is-vwp" className="mb-10 scroll-mt-24">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  What Is the US Visa Waiver Program (VWP)?
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The Visa Waiver Program allows citizens of 42 designated countries — including the
                  United Kingdom — to travel to the United States for tourism, business, or transit
                  for up to 90 days without obtaining a visa. The programme is administered jointly
                  by the US Department of State and US Customs and Border Protection.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  To travel under the VWP, UK citizens must apply for and receive approval through{' '}
                  <strong>ESTA (Electronic System for Travel Authorization)</strong> before departure.
                  Key facts about ESTA:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
                  <li>Apply online at the official US DHS ESTA portal</li>
                  <li>
                    Most applications are approved within minutes; allow at least 72 hours before
                    travel as a precaution
                  </li>
                  <li>
                    ESTA is typically valid for <strong>2 years</strong> from the date of approval,
                    or until your passport expires — whichever comes first
                  </li>
                  <li>
                    Allows <strong>multiple entries</strong> to the United States during the 2-year
                    validity period
                  </li>
                  <li>
                    Each visit is still limited to <strong>90 days</strong> — the 2-year validity
                    does not mean 2 years of continuous stay
                  </li>
                  <li>The current ESTA application fee is USD 21</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  Learn more about electronic travel authorisations at{' '}
                  <Link
                    href="/visa-guides/travel-visa-rules#eta"
                    className="text-teal-600 hover:text-teal-700 font-medium underline"
                  >
                    Travel Visa Rules: eTA
                  </Link>
                  .
                </p>
              </section>

              <section id="when-visa-required" className="mb-10 scroll-mt-24">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  When Do UK Citizens Need a US Visa?
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Even though the UK is a VWP country, there are several situations where a UK
                  citizen must apply for a US visa at an embassy or consulate rather than using ESTA.
                  You need a B1/B2 or other appropriate visa if you intend to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
                  <li>
                    <strong>Stay longer than 90 days</strong> — you will need a B1/B2 tourist or
                    business visa
                  </li>
                  <li>
                    <strong>Study</strong> — an F-1 or M-1 student visa is required for any course
                    of study
                  </li>
                  <li>
                    <strong>Work</strong> — an appropriate work visa (H-1B, L-1, O-1, etc.) is
                    required before you can be employed by a US employer
                  </li>
                  <li>
                    <strong>Journalism or media work</strong> — the I visa category applies to
                    representatives of foreign media
                  </li>
                  <li>
                    <strong>Immigrate or seek permanent residence</strong> — an immigrant visa is
                    required; VWP expressly prohibits travel with intent to immigrate
                  </li>
                  <li>
                    <strong>You have previously been denied a US visa or entry</strong> — ESTA
                    ineligibility applies, and you must apply at a consulate
                  </li>
                  <li>
                    <strong>You have visited Cuba, Iran, Iraq, Libya, North Korea, Somalia,
                    Sudan, Syria, or Yemen on or after certain dates</strong> — ESTA ineligibility
                    applies under the Visa Waiver Program Improvement and Terrorist Travel Prevention
                    Act
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
                  When travelling to the United States under the Visa Waiver Program, UK citizens
                  should present the following at the US port of entry:
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Mandatory Documents</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[180px]">Valid UK Passport:</span>
                      <span>
                        Must be a biometric ePassport (denoted by the chip symbol on the cover) and
                        valid for at least the duration of your intended stay. Read more about{' '}
                        <Link
                          href="/visa-guides/travel-visa-rules#passport-validity"
                          className="text-teal-600 hover:text-teal-700 font-medium underline"
                        >
                          passport validity rules
                        </Link>
                        .
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[180px]">Approved ESTA:</span>
                      <span>
                        Your ESTA approval is linked to your passport electronically; you do not need
                        to print a copy, but you should keep your confirmation number accessible.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[180px]">Return or Onward Ticket:</span>
                      <span>
                        Proof of departure from the United States within 90 days is required. See our{' '}
                        <Link
                          href="/visa-guides/travel-visa-rules#onward-travel"
                          className="text-teal-600 hover:text-teal-700 font-medium underline"
                        >
                          onward travel guide
                        </Link>{' '}
                        for details.
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">May Be Requested</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[180px]">Proof of Accommodation:</span>
                      <span>
                        Hotel booking confirmation, rental agreement, or address of where you will
                        be staying.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[180px]">Proof of Funds:</span>
                      <span>
                        Bank statements or credit card details showing you can support yourself
                        during your stay. Read more about{' '}
                        <Link
                          href="/visa-guides/travel-visa-rules#proof-of-funds"
                          className="text-teal-600 hover:text-teal-700 font-medium underline"
                        >
                          proof of funds requirements
                        </Link>
                        .
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
                  Overstaying your authorised period of admission in the United States is a serious
                  immigration violation with long-lasting consequences, particularly for VWP
                  travellers.
                </p>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Consequences of Overstaying</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[200px]">ESTA Permanently Voided:</span>
                      <span>
                        Any overstay — even by a single day — permanently voids your ESTA eligibility.
                        You cannot use the Visa Waiver Program again.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[200px]">3-Year Entry Bar:</span>
                      <span>
                        Overstays of 180 days or more (but less than 1 year) trigger a 3-year bar on
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
                      <span className="font-semibold min-w-[200px]">Visa Revocation:</span>
                      <span>
                        Any existing US visas may be revoked, requiring you to reapply at a consulate
                        once any bar period has expired.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[200px]">Future Immigration Scrutiny:</span>
                      <span>
                        A record of overstay is held permanently in CBP systems and will be reviewed
                        for all future US visa applications or entries, potentially affecting approval.
                      </span>
                    </li>
                  </ul>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Always track your I-94 arrival/departure record (available at{' '}
                  <strong>i94.cbp.dhs.gov</strong>) and ensure you depart before or on the date
                  shown as your authorised period of admission — typically "D/S" (duration of status)
                  for VWP travellers, capped at 90 days.
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
                  href="/visa-guides/country-entry-requirements/united-states-2026"
                  className="group block p-5 bg-white border border-gray-200 rounded-lg hover:border-teal-300 hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors mb-1">
                    United States Entry Requirements 2026
                  </h3>
                  <p className="text-sm text-gray-600">
                    Full entry requirements for all nationalities travelling to the United States.
                  </p>
                </Link>

                <Link
                  href="/visa-guides/country-entry-requirements/canada-2026"
                  className="group block p-5 bg-white border border-gray-200 rounded-lg hover:border-teal-300 hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors mb-1">
                    Canada Entry Requirements 2026
                  </h3>
                  <p className="text-sm text-gray-600">
                    Check visa requirements for travel to Canada, including eTA information for UK
                    citizens.
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
