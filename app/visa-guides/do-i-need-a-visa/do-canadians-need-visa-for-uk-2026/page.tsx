import { Metadata } from 'next';
import Link from 'next/link';
import { canonicalUrl, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';
import Breadcrumbs from '@/components/Breadcrumbs';
import SummaryBlock from '@/components/visa-guides/SummaryBlock';
import TableOfContents from '@/components/visa-guides/TableOfContents';
import FAQBlock from '@/components/visa-guides/FAQBlock';
import SourcesBlock from '@/components/visa-guides/SourcesBlock';
import LastReviewed from '@/components/visa-guides/LastReviewed';

const SLUG = 'do-canadians-need-visa-for-uk-2026';
const PAGE_URL = canonicalUrl(`/visa-guides/do-i-need-a-visa/${SLUG}`);
const TITLE = 'Do Canadians Need a Visa for the UK in 2026?';
const DESCRIPTION =
  'Complete guide to UK entry requirements for Canadian passport holders in 2026. Canadians do not need a UK visa for short visits but must obtain a UK Electronic Travel Authorisation (ETA) before travelling.';

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
  { id: 'what-is-uk-eta', text: 'What Is the UK Electronic Travel Authorisation (ETA)?', level: 2 },
  { id: 'how-to-apply-eta', text: 'How to Apply for the UK ETA', level: 2 },
  { id: 'when-visa-required', text: 'When Do Canadians Need a Full UK Visa?', level: 2 },
  { id: 'documents-required', text: 'Documents Required at Entry', level: 2 },
  { id: 'overstay-penalties', text: 'Overstay Penalties in the United Kingdom', level: 2 },
  { id: 'faqs', text: 'Frequently Asked Questions', level: 2 },
  { id: 'sources', text: 'Sources', level: 2 },
];

const faqs = [
  {
    question: 'Do Canadians need a visa for the UK in 2026?',
    answer:
      'No. Canadian citizens do not need a traditional UK visa for tourism, business visits, or short stays of up to 6 months. However, since January 8, 2025, Canadians must obtain a UK Electronic Travel Authorisation (ETA) before travelling to the United Kingdom. The ETA is not a visa — it is a mandatory electronic pre-travel check.',
  },
  {
    question: 'What is the UK ETA and is it mandatory for Canadians?',
    answer:
      'The UK Electronic Travel Authorisation (ETA) is a mandatory pre-travel authorisation introduced by the UK Home Office. It is linked electronically to your Canadian passport. All Canadian citizens must obtain an approved ETA before boarding a flight, ferry, or Eurostar train to the United Kingdom. The ETA fee is £10 and is applied for via the official UK ETA app or GOV.UK website.',
  },
  {
    question: 'How long can Canadians stay in the UK?',
    answer:
      'Canadian citizens can stay in the United Kingdom for up to 6 months per visit under the standard visitor leave rules. The exact duration is granted at the discretion of a UK Border Force officer at the port of entry. Most visitors are granted a standard 6-month entry stamp.',
  },
  {
    question: 'How long is the UK ETA valid?',
    answer:
      'The UK ETA is valid for 2 years from the date of approval or until your Canadian passport expires — whichever comes first. It allows multiple trips to the United Kingdom during that period, with each individual stay limited to 6 months. If you renew your Canadian passport, you must apply for a new ETA linked to the new passport.',
  },
  {
    question: 'How much does the UK ETA cost for Canadians?',
    answer:
      'The UK ETA costs £10 (approximately CAD 18) per application. It is paid online at the time of application through the official UK ETA app or GOV.UK. The fee is non-refundable even if the ETA is refused. Be cautious of third-party websites charging higher fees to submit the application on your behalf.',
  },
  {
    question: 'Can Canadians work or study in the UK on an ETA?',
    answer:
      'No. The UK ETA does not grant the right to work, study for extended periods, or access public funds in the United Kingdom. Canadians intending to work, study for more than 11 weeks, or stay longer than 6 months must apply for the appropriate UK visa — such as a Skilled Worker visa, Student visa, or Youth Mobility Scheme visa — before travelling.',
  },
];

const sources = [
  {
    name: 'UK Home Office — Electronic Travel Authorisation',
    url: 'https://www.gov.uk/guidance/apply-for-an-electronic-travel-authorisation-eta',
  },
  {
    name: 'UK Visas and Immigration — Visit the UK',
    url: 'https://www.gov.uk/visit-uk',
  },
  {
    name: 'GOV.UK — UK ETA App',
    url: 'https://www.gov.uk/guidance/apply-for-an-electronic-travel-authorisation-eta',
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
  datePublished: '2026-02-27',
  dateModified: '2026-02-27',
  author: { '@type': 'Organization', name: 'VisaInfoGuide' },
  publisher: {
    '@type': 'Organization',
    name: 'VisaInfoGuide',
    logo: { '@type': 'ImageObject', url: canonicalUrl('/visa.png') },
  },
};

export default function CanadiansToUKArticlePage() {
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
              { name: 'Canadians to UK 2026', url: `/visa-guides/do-i-need-a-visa/${SLUG}` },
            ]}
          />

          <article className="mt-8">
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {TITLE}
              </h1>
              <LastReviewed date="February 27, 2026" />
            </header>

            <SummaryBlock>
              <p className="text-base leading-relaxed">
                Canadian citizens do not need a traditional visa to visit the United Kingdom for short stays of up to{' '}
                <strong>6 months</strong>. However, since <strong>January 8, 2025</strong>, all Canadians must
                obtain a <strong>UK Electronic Travel Authorisation (ETA)</strong> before travelling to the UK.
                The ETA is not a visa — it is a mandatory electronic pre-clearance costing <strong>£10</strong>,
                valid for 2 years with multiple entries. For longer stays, work, or study, a full UK visa must be
                obtained before departure. You can check full entry requirements using the{' '}
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
                        <td className="px-6 py-4 text-sm text-gray-700">No (for tourism/business under 6 months)</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">UK ETA Required</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Yes — mandatory before boarding (since Jan 8, 2025)</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">ETA Fee</td>
                        <td className="px-6 py-4 text-sm text-gray-700">£10 per application</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">ETA Validity</td>
                        <td className="px-6 py-4 text-sm text-gray-700">2 years or until passport expires</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Maximum Stay per Visit</td>
                        <td className="px-6 py-4 text-sm text-gray-700">6 months</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Multiple Entries</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Yes, during ETA validity period</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Passport Validity Required</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Valid for duration of stay</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Work Rights</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Not permitted under ETA / standard visitor leave</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Study Rights</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Short courses up to 11 weeks permitted</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  The ETA requirement applies regardless of how you travel to the UK — by air, sea, or
                  rail (including Eurostar from mainland Europe). Canadians travelling through Ireland who
                  plan to cross the land border into Northern Ireland also require an ETA.
                </p>
              </section>

              <section id="what-is-uk-eta" className="mb-10 scroll-mt-24">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  What Is the UK Electronic Travel Authorisation (ETA)?
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The UK ETA is a digital pre-travel permission introduced by the UK Home Office as part of
                  its new border entry system. It is linked electronically to your Canadian passport and
                  is checked automatically by carriers before you board. An ETA is not stamped into your
                  passport — it exists only as a digital record.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The ETA scheme covers nationals of countries who previously enjoyed visa-free access to
                  the United Kingdom, including Canada, Australia, the United States, and many others.
                  It is modelled on similar systems such as the US ESTA and Australia&apos;s ETA.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Key facts about the UK ETA for Canadian citizens:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
                  <li>Mandatory for all Canadian passport holders before travel to the UK</li>
                  <li>Valid for <strong>2 years</strong> or until your passport expires, whichever is sooner</li>
                  <li>Permits <strong>multiple trips</strong> to the UK during the validity period</li>
                  <li>Each visit is limited to a maximum of <strong>6 months</strong></li>
                  <li>The fee is <strong>£10</strong> per application, paid at the time of applying</li>
                  <li>Processing is typically completed within 3 working days; most are approved instantly</li>
                  <li>If you renew your Canadian passport, you must apply for a new ETA</li>
                </ul>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
                  <p className="text-sm text-gray-700">
                    <strong>Important:</strong> The UK ETA does not guarantee entry to the United Kingdom.
                    UK Border Force officers retain full discretion to grant or refuse entry at the border.
                    Always carry supporting documents such as your return ticket and proof of accommodation.
                  </p>
                </div>
              </section>

              <section id="how-to-apply-eta" className="mb-10 scroll-mt-24">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  How to Apply for the UK ETA
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Canadians can apply for the UK ETA using the official <strong>UK ETA app</strong>
                  (available on iOS and Android) or through the GOV.UK website. The process is straightforward:
                </p>
                <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6 ml-4">
                  <li>
                    <strong>Download the UK ETA app</strong> or visit the official GOV.UK ETA application page
                  </li>
                  <li>
                    <strong>Scan your Canadian biometric passport</strong> using your phone&apos;s NFC reader
                    (or enter details manually on the website)
                  </li>
                  <li>
                    <strong>Take a selfie</strong> for identity verification
                  </li>
                  <li>
                    <strong>Answer eligibility questions</strong> about criminal history, immigration
                    violations, and travel history
                  </li>
                  <li>
                    <strong>Pay the £10 fee</strong> by debit or credit card
                  </li>
                  <li>
                    <strong>Wait for a decision</strong> — most applications are processed within minutes,
                    though it can take up to 3 working days
                  </li>
                </ol>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-6">
                  <p className="text-sm text-gray-700">
                    <strong>Warning:</strong> Apply only through the official UK ETA app or GOV.UK.
                    Third-party websites and travel agents may charge significantly more than the official
                    £10 fee. The ETA is non-transferable and tied to your specific passport.
                  </p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  For more information on different types of travel authorisations, see our guide on{' '}
                  <Link
                    href="/guides/visa-on-arrival-vs-evisa"
                    className="text-teal-600 hover:text-teal-700 font-medium underline"
                  >
                    Visa on Arrival vs eVisa vs ETA
                  </Link>
                  .
                </p>
              </section>

              <section id="when-visa-required" className="mb-10 scroll-mt-24">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  When Do Canadians Need a Full UK Visa?
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  While most Canadians can visit the UK using only an ETA, there are situations where
                  a full UK visa is required. You must apply for a UK visa if you intend to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
                  <li>
                    <strong>Stay longer than 6 months</strong> — a Long Stay visa or other appropriate
                    visa category must be obtained before departure
                  </li>
                  <li>
                    <strong>Work in the UK</strong> — a Skilled Worker visa, Intra-Company Transfer visa,
                    or other work route is required. Canadians aged 18–30 may be eligible for the{' '}
                    <strong>Youth Mobility Scheme (Tier 5)</strong> visa, which permits 2 years of work
                    in the United Kingdom
                  </li>
                  <li>
                    <strong>Study for more than 11 weeks</strong> — a Student visa is required for any
                    course or programme lasting longer than 11 weeks
                  </li>
                  <li>
                    <strong>Settle in the UK or apply for indefinite leave to remain</strong> — an
                    appropriate settlement visa is required
                  </li>
                  <li>
                    <strong>Join a UK-settled family member long-term</strong> — a Family visa may be
                    required
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  To check whether a specific trip requires only an ETA or a full visa, use the{' '}
                  <Link
                    href="/trip"
                    className="text-teal-600 hover:text-teal-700 font-medium underline"
                  >
                    Trip Visa Finder
                  </Link>
                  .
                </p>
              </section>

              <section id="documents-required" className="mb-10 scroll-mt-24">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Documents Required at Entry
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  When entering the United Kingdom, Canadian citizens should present the following at
                  the UK border:
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Mandatory Documents</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[220px]">Valid Canadian Passport:</span>
                      <span>
                        Must be valid for the duration of your intended stay. Read more about{' '}
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
                      <span className="font-semibold min-w-[220px]">Approved UK ETA:</span>
                      <span>
                        Your ETA is linked electronically to your passport. You do not need to print
                        a physical copy, but keep your confirmation email accessible.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[220px]">Return or Onward Ticket:</span>
                      <span>
                        Evidence of your intention to depart the UK before your leave expires. See
                        our{' '}
                        <Link
                          href="/visa-guides/travel-visa-rules"
                          className="text-teal-600 hover:text-teal-700 font-medium underline"
                        >
                          travel visa rules guide
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
                      <span className="font-semibold min-w-[220px]">Proof of Accommodation:</span>
                      <span>
                        Hotel booking confirmation, rental agreement, or the address of where you
                        will be staying in the United Kingdom.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[220px]">Proof of Funds:</span>
                      <span>
                        Bank statements or credit cards demonstrating you can support yourself
                        financially during your stay without working.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[220px]">Purpose of Visit:</span>
                      <span>
                        A clear explanation of your reason for visiting — tourism, visiting family,
                        attending a conference, etc. Business visitors may be asked for meeting
                        details or invitation letters.
                      </span>
                    </li>
                  </ul>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  UK Border Force officers have full authority to grant or refuse entry even with a
                  valid ETA. Carrying comprehensive supporting documents reduces the risk of delays
                  or refusal, especially if you visit frequently or for extended periods.
                </p>
              </section>

              <section id="overstay-penalties" className="mb-10 scroll-mt-24">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Overstay Penalties in the United Kingdom
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Remaining in the United Kingdom beyond your granted leave to enter is a serious
                  immigration offence with significant consequences for future travel.
                </p>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Consequences of Overstaying</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[220px]">ETA Cancelled:</span>
                      <span>
                        An overstay will result in your existing ETA being cancelled. Any future
                        travel to the UK will require a formal visa application.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[220px]">Re-entry Ban:</span>
                      <span>
                        Overstaying by more than 30 days can result in a re-entry ban of up to
                        10 years, depending on the length of the overstay and circumstances.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[220px]">Deportation:</span>
                      <span>
                        If you are found to be an overstayer in the UK, you may be detained and
                        removed from the country at your own expense.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold min-w-[220px]">Future Visa Refusals:</span>
                      <span>
                        A record of overstay is considered by UK Visas and Immigration when assessing
                        any future UK visa applications and may affect your ability to obtain visas
                        for other countries.
                      </span>
                    </li>
                  </ul>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Always check the date stamped in your passport or on your entry vignette at arrival.
                  If you are unsure how long you have been granted, you can check your visa status
                  through the UK Visas and Immigration online service.
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
                  href="/passport/canada"
                  className="group block p-5 bg-white border border-gray-200 rounded-lg hover:border-teal-300 hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors mb-1">
                    Canadian Passport Guide
                  </h3>
                  <p className="text-sm text-gray-600">
                    Full visa-free and visa-on-arrival access for Canadian passport holders worldwide.
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
