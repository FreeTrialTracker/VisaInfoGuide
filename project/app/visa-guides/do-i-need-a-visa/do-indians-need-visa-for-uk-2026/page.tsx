import { Metadata } from 'next';
import Link from 'next/link';
import { canonicalUrl, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';
import Breadcrumbs from '@/components/Breadcrumbs';
import SummaryBlock from '@/components/visa-guides/SummaryBlock';
import TableOfContents from '@/components/visa-guides/TableOfContents';
import FAQBlock from '@/components/visa-guides/FAQBlock';
import SourcesBlock from '@/components/visa-guides/SourcesBlock';
import LastReviewed from '@/components/visa-guides/LastReviewed';

const SLUG = 'do-indians-need-visa-for-uk-2026';
const PAGE_URL = canonicalUrl(`/visa-guides/do-i-need-a-visa/${SLUG}`);
const TITLE = 'Do Indians Need a Visa for the UK in 2026?';
const DESCRIPTION =
  'Complete guide to UK visa requirements for Indian passport holders in 2026. Indian citizens require a Standard Visitor Visa to enter the United Kingdom. Learn about the application process, required documents, and stay limits.';

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
  { id: 'standard-visitor-visa', text: 'What Is the UK Standard Visitor Visa?', level: 2 },
  { id: 'how-to-apply', text: 'How to Apply for a UK Visitor Visa', level: 2 },
  { id: 'documents-required', text: 'Documents Required for the Application', level: 2 },
  { id: 'processing-times', text: 'Processing Times and Fees', level: 2 },
  { id: 'overstay-penalties', text: 'Overstay Penalties in the United Kingdom', level: 2 },
  { id: 'faqs', text: 'Frequently Asked Questions', level: 2 },
  { id: 'sources', text: 'Sources', level: 2 },
];

const faqs = [
  {
    question: 'Do Indians need a visa to visit the UK in 2026?',
    answer:
      'Yes. Indian citizens require a UK Standard Visitor Visa to enter the United Kingdom. India is not part of any UK visa-free arrangement, and no visa on arrival is available. The visa must be obtained from the UK Visas and Immigration (UKVI) authority before departure.',
  },
  {
    question: 'How long does it take to get a UK visa for Indian nationals?',
    answer:
      'The standard processing time for a UK Standard Visitor Visa is approximately 3 weeks (15 working days). Priority processing is available for an additional fee and typically takes 5 working days. Super Priority service (next working day decision) is available at select visa application centres in India.',
  },
  {
    question: 'How much does a UK visa cost for Indian citizens?',
    answer:
      'The standard fee for a UK Standard Visitor Visa is £115 for a single or multiple-entry visa valid up to 6 months. Longer-validity visas (2-year, 5-year, 10-year) are available at higher cost: £400 for 2 years, £771 for 5 years, and £963 for 10 years. Priority and Super Priority processing carry additional fees.',
  },
  {
    question: 'How long can Indians stay in the UK on a Standard Visitor Visa?',
    answer:
      'Indian citizens holding a UK Standard Visitor Visa may stay in the United Kingdom for a maximum of 6 months per visit. The visa itself may be valid for multiple years with multiple entries, but each individual visit cannot exceed 6 months. The border officer determines the exact permitted stay on arrival.',
  },
  {
    question: 'Can Indians work in the UK on a Standard Visitor Visa?',
    answer:
      'No. The UK Standard Visitor Visa does not permit paid employment or work. Indian nationals who wish to work in the UK must obtain an appropriate work visa such as a Skilled Worker Visa. Certain business activities (such as attending meetings or conferences) are permitted under the visitor visa, but these must not constitute employment by a UK employer.',
  },
  {
    question: 'Does India have access to the UK Electronic Travel Authorisation (ETA)?',
    answer:
      'No. The UK ETA is available to nationals of certain visa-exempt countries (such as the USA, Canada, and EU member states). Indian citizens are not eligible for the UK ETA and must apply for a full Standard Visitor Visa before travelling to the United Kingdom.',
  },
];

const sources = [
  {
    name: 'UK Visas and Immigration — Standard Visitor Visa',
    url: 'https://www.gov.uk/standard-visitor-visa',
  },
  {
    name: 'UK Government — Apply for a UK Visa',
    url: 'https://www.gov.uk/apply-uk-visa',
  },
  {
    name: 'UK Home Office — Visitor Visa Guidance',
    url: 'https://www.gov.uk/guidance/immigration-rules/immigration-rules-appendix-v-visitor',
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

export default function IndiansToUKArticlePage() {
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
              { name: 'Indians to UK 2026', url: `/visa-guides/do-i-need-a-visa/${SLUG}` },
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
                Yes — Indian citizens require a <strong>UK Standard Visitor Visa</strong> to
                enter the United Kingdom. India is not part of any UK visa-free arrangement, and
                no visa on arrival is available. The visa must be applied for in advance through
                UK Visas and Immigration (UKVI). A standard visitor visa permits stays of up to{' '}
                <strong>6 months</strong> and may be issued as a multiple-entry visa valid for up
                to 10 years. For a personalised check, use the{' '}
                <Link href="/trip" className="text-teal-600 hover:text-teal-700 font-medium underline">
                  Trip Visa Finder
                </Link>{' '}
                or see{' '}
                <Link
                  href="/visa-guides/country-entry-requirements/united-kingdom-2026"
                  className="text-teal-600 hover:text-teal-700 font-medium underline"
                >
                  UK Entry Requirements 2026
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
                        <td className="px-6 py-4 text-sm text-gray-700">Yes — Standard Visitor Visa</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Visa on Arrival</td>
                        <td className="px-6 py-4 text-sm text-gray-700">No</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">UK ETA Available</td>
                        <td className="px-6 py-4 text-sm text-gray-700">No (Indians are not eligible)</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Maximum Stay Per Visit</td>
                        <td className="px-6 py-4 text-sm text-gray-700">6 months</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Visa Fee (Standard 6-month)</td>
                        <td className="px-6 py-4 text-sm text-gray-700">£115</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Processing Time (Standard)</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Approximately 3 weeks</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Multiple Entry</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Yes (available for up to 10 years)</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Passport Validity Required</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Valid for duration of stay</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Biometrics</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Required at visa application centre</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="standard-visitor-visa" className="mb-10 scroll-mt-24">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  What Is the UK Standard Visitor Visa?
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The UK Standard Visitor Visa is the primary visa for Indian nationals who wish to
                  visit the United Kingdom for tourism, family visits, business meetings, or short
                  courses of study. It is issued by UK Visas and Immigration (UKVI), part of the
                  Home Office.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The Standard Visitor Visa permits a range of activities including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
                  <li>Tourism, holidays, and leisure travel</li>
                  <li>Visiting family and friends</li>
                  <li>Attending business meetings, conferences, and training</li>
                  <li>
                    Short courses and study of up to 6 months (academic courses up to 11 months for
                    some applicants)
                  </li>
                  <li>Receiving private medical treatment</li>
                  <li>
                    Certain permitted paid engagements (e.g., specific artistic or academic
                    performances under a Permitted Paid Engagements visa)
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  The Standard Visitor Visa does <strong>not</strong> permit employment, working
                  for a UK employer, or claiming public benefits. Learn more about the types of
                  visas available in our{' '}
                  <Link
                    href="/visa-guides/travel-visa-rules"
                    className="text-teal-600 hover:text-teal-700 font-medium underline"
                  >
                    Travel Visa Rules guide
                  </Link>
                  .
                </p>
              </section>

              <section id="how-to-apply" className="mb-10 scroll-mt-24">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  How to Apply for a UK Visitor Visa
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Indian nationals must apply for a UK visa online and then submit biometrics and
                  supporting documents at a UKVI Visa Application Centre (VAC) in India. The
                  process involves these steps:
                </p>
                <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6 ml-4">
                  <li>
                    <strong>Apply online</strong> at the official UK government website
                    (gov.uk/apply-uk-visa) and complete the Standard Visitor Visa application form
                  </li>
                  <li>
                    <strong>Pay the visa fee</strong> online at the time of application (£115 for
                    a standard 6-month visa)
                  </li>
                  <li>
                    <strong>Book a biometrics appointment</strong> at a Visa Application Centre
                    in India. UKVI VACs are operated by TLScontact and VFS Global in cities
                    including Delhi, Mumbai, Chennai, Bengaluru, Hyderabad, Kolkata, and others
                  </li>
                  <li>
                    <strong>Attend the VAC appointment</strong> to submit your biometrics
                    (fingerprints and photograph) and your supporting documents
                  </li>
                  <li>
                    <strong>Await the decision</strong>. Standard processing takes approximately
                    3 weeks. Priority and Super Priority services are available for faster
                    processing at additional cost
                  </li>
                </ol>
                <p className="text-gray-700 leading-relaxed">
                  Applications should be submitted no earlier than 3 months before your planned
                  travel date. UKVI recommends applying as early as possible to allow sufficient
                  processing time.
                </p>
              </section>

              <section id="documents-required" className="mb-10 scroll-mt-24">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Documents Required for the Application
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Supporting documents are a critical part of a successful UK visa application for
                  Indian nationals. The exact requirements vary depending on your circumstances,
                  but the following are generally required:
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Mandatory Documents</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[220px]">Valid Indian Passport:</span>
                      <span>
                        Must be valid for the duration of your intended stay. You should also
                        include any previous passports showing your travel history. See our{' '}
                        <Link
                          href="/guides/passport-validity-rules"
                          className="text-teal-600 hover:text-teal-700 font-medium underline"
                        >
                          passport validity rules guide
                        </Link>
                        .
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[220px]">Biometrics:</span>
                      <span>
                        Fingerprints and photograph submitted at a Visa Application Centre. Required
                        for all adult applicants.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[220px]">Bank Statements:</span>
                      <span>
                        Last 3–6 months of bank statements showing sufficient funds to cover your
                        trip. UKVI assesses whether you can financially support yourself without
                        recourse to public funds.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[220px]">Proof of Employment:</span>
                      <span>
                        Letter from your employer confirming employment, leave approval, and salary.
                        If self-employed, provide business registration documents and recent accounts.
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Strongly Recommended</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[220px]">Travel Itinerary:</span>
                      <span>
                        Planned dates of travel, accommodation bookings, and a clear explanation of
                        the purpose of your visit.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[220px]">Accommodation Evidence:</span>
                      <span>
                        Hotel booking confirmation or an invitation letter from a UK host with their
                        address and proof of their right to reside in the UK.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[220px]">Previous UK/Schengen Visas:</span>
                      <span>
                        Copies of any previous UK, US, Schengen, or other major country visas
                        demonstrating a travel history and your compliance with visa conditions.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[220px]">Property or Family Ties:</span>
                      <span>
                        Evidence of strong ties to India — such as property ownership, family
                        responsibilities, or business interests — to demonstrate your intent to
                        return home.
                      </span>
                    </li>
                  </ul>
                </div>
              </section>

              <section id="processing-times" className="mb-10 scroll-mt-24">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Processing Times and Fees
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  UKVI offers multiple processing tiers for Indian applicants. Fees and times
                  are subject to change and you should always verify current prices on the
                  official UK government website before applying.
                </p>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Visa Type / Service</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Fee</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Processing Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="bg-white">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Standard Visitor (6 months)</td>
                        <td className="px-6 py-4 text-sm text-gray-700">£115</td>
                        <td className="px-6 py-4 text-sm text-gray-700">~3 weeks (15 working days)</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Long-Stay Visitor (2 years)</td>
                        <td className="px-6 py-4 text-sm text-gray-700">£400</td>
                        <td className="px-6 py-4 text-sm text-gray-700">~3 weeks</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Long-Stay Visitor (5 years)</td>
                        <td className="px-6 py-4 text-sm text-gray-700">£771</td>
                        <td className="px-6 py-4 text-sm text-gray-700">~3 weeks</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Long-Stay Visitor (10 years)</td>
                        <td className="px-6 py-4 text-sm text-gray-700">£963</td>
                        <td className="px-6 py-4 text-sm text-gray-700">~3 weeks</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Priority Service</td>
                        <td className="px-6 py-4 text-sm text-gray-700">+£250 (on top of visa fee)</td>
                        <td className="px-6 py-4 text-sm text-gray-700">~5 working days</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Super Priority Service</td>
                        <td className="px-6 py-4 text-sm text-gray-700">+£800 (on top of visa fee)</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Next working day</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Long-validity multiple-entry visas represent better value for Indian travellers
                  who visit the UK frequently. Each visit under a long-validity visa is still
                  limited to 6 months.
                </p>
              </section>

              <section id="overstay-penalties" className="mb-10 scroll-mt-24">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Overstay Penalties in the United Kingdom
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Overstaying your permitted leave (the period stamped in your passport or
                  confirmed on your visa vignette) in the United Kingdom is a serious immigration
                  offence under the Immigration Act.
                </p>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Consequences of Overstaying</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[220px]">Removal from the UK:</span>
                      <span>
                        Overstayers may be removed (deported) from the United Kingdom at any point
                        after their permitted leave expires.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[220px]">Re-Entry Ban:</span>
                      <span>
                        Overstaying can result in a ban on re-entering the United Kingdom for up to
                        10 years depending on the duration of overstay and circumstances.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[220px]">Future Visa Refusals:</span>
                      <span>
                        An overstay record significantly reduces the likelihood of being granted
                        future UK visas or visas to other countries that conduct checks on
                        immigration compliance history.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[220px]">Criminal Record:</span>
                      <span>
                        In cases of substantial overstay or if the overstay is combined with other
                        offences, a criminal record can result.
                      </span>
                    </li>
                  </ul>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Always ensure you depart the United Kingdom on or before the date shown as your
                  permitted leave to remain. If your circumstances change and you need to extend
                  your stay, you must apply to extend your leave through UKVI before your current
                  leave expires.
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
                  href="/passport/india"
                  className="group block p-5 bg-white border border-gray-200 rounded-lg hover:border-teal-300 hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors mb-1">
                    Indian Passport Guide
                  </h3>
                  <p className="text-sm text-gray-600">
                    Full visa-free and visa-on-arrival access for Indian passport holders worldwide.
                  </p>
                </Link>

                <Link
                  href="/visa-guides/do-i-need-a-visa/do-indians-need-visa-for-japan-2026"
                  className="group block p-5 bg-white border border-gray-200 rounded-lg hover:border-teal-300 hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors mb-1">
                    Do Indians Need a Visa for Japan?
                  </h3>
                  <p className="text-sm text-gray-600">
                    Japan visa requirements and application process for Indian passport holders.
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
