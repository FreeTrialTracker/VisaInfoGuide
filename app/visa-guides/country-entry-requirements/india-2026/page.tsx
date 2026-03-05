import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, FileText, ArrowRight, Clock, AlertTriangle, Shield, Wallet, Plane, Laptop, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQBlock from '@/components/visa-guides/FAQBlock';
import { canonicalUrl, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';
import { articleJsonLd } from '@/lib/seo-links';

const LAST_UPDATED = '2026-02-21';

export const metadata: Metadata = {
  title: 'India Entry Requirements in 2026 (Tourist Visa Guide) | VisaInfoGuide',
  description: 'Complete India entry requirements for 2026. eVisa system, tourist visa categories, required documents, stay duration, overstay penalties, and who qualifies for visa-free entry.',
  alternates: {
    canonical: canonicalUrl('/visa-guides/country-entry-requirements/india-2026'),
  },
  openGraph: {
    title: 'India Entry Requirements in 2026 (Tourist Visa Guide)',
    description: 'Complete India entry requirements for 2026. eVisa categories, required documents, stay rules, and overstay penalties explained.',
    type: 'article',
    url: canonicalUrl('/visa-guides/country-entry-requirements/india-2026'),
    images: [{
      url: canonicalUrl('/og/legal-og'),
      width: 1200,
      height: 630,
      alt: 'India Entry Requirements 2026',
    }],
    siteName: 'VisaInfoGuide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'India Entry Requirements in 2026 (Tourist Visa Guide)',
    description: 'India eVisa, tourist visa rules, required documents, stay limits, and overstay penalties for 2026.',
    images: [canonicalUrl('/og/legal-og')],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqs = [
  {
    question: 'Do US citizens need a visa for India?',
    answer: 'Yes, US citizens require a visa to enter India. However, American passport holders are eligible to apply for an Indian Tourist eVisa online at indianvisaonline.gov.in before travel. The 1-year or 5-year Tourist eVisa is the most practical option for most US travelers, allowing multiple entries with up to 90 consecutive days per stay. Applications typically take 72 hours to process and cost between USD 25 and USD 80 depending on the visa type. There is no visa on arrival available for US citizens.',
  },
  {
    question: 'Can I apply for an Indian eVisa online?',
    answer: 'Yes. Citizens of over 160 eligible countries can apply for an Indian Tourist eVisa online through the official portal at indianvisaonline.gov.in. The application requires a passport scan, a recent passport-size photo, and payment by credit or debit card. Processing takes approximately 72 hours, and the approved eVisa is emailed to you — no physical stamp or sticker is required before travel. You must print the eVisa approval and present it at immigration on arrival. eVisa holders must arrive through one of approximately 30 designated international airports or seaports.',
  },
  {
    question: 'How long can I stay in India on a tourist visa?',
    answer: 'It depends on the visa type. The 30-day Tourist eVisa permits a single stay of up to 30 days from your first arrival date. The 1-year Tourist eVisa (multiple entry) and 5-year Tourist eVisa (multiple entry) each allow up to 90 consecutive days per stay. Total stays under the 1-year or 5-year eVisa must not exceed 180 days in a calendar year in most cases. Regular sticker tourist visas obtained through Indian embassies or consulates can be issued with longer permitted stays — typically up to 180 days per entry.',
  },
  {
    question: 'Is the India eVisa multiple entry?',
    answer: 'It depends on the eVisa type. The 30-day Tourist eVisa is double entry — you can enter India up to twice during the 30-day validity period. The 1-year Tourist eVisa and the 5-year Tourist eVisa are both multiple entry, allowing you to enter and exit India as many times as you like during the validity period, subject to the 90 consecutive days per stay limit. The eVisa validity period begins from the date of issue, not the date of first arrival, so the clock starts immediately upon approval.',
  },
  {
    question: 'Can I extend my Indian tourist visa?',
    answer: 'In general, Tourist eVisas cannot be extended once in India. If you wish to stay longer than permitted, you must exit India and apply for a new eVisa. In exceptional circumstances — such as a medical emergency — you can apply to the Foreigners Regional Registration Office (FRRO) for an extension, but these are granted at discretion and only for documented emergencies. Regular sticker tourist visas may also be extendable through the FRRO in limited circumstances. Planning your stay carefully before arrival is strongly recommended.',
  },
  {
    question: 'What happens if I overstay in India?',
    answer: 'Overstaying in India is a serious immigration offence. Before you can leave the country, you must obtain an Exit Permit from the Foreigners Regional Registration Office (FRRO) or a local police superintendent. This process can take several days and incurs administrative fees. Financial fines are applied per day of overstay. Extended overstays can result in deportation, detention, and multi-year or permanent entry bans. Criminal charges may be filed under the Foreigners Act 1946 for significant violations. If your circumstances change while in India, contact the FRRO immediately before your visa expires.',
  },
];

export default function IndiaEntryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Visa Guides', url: '/visa-guides' },
            { name: 'Country Entry Requirements', url: '/visa-guides/country-entry-requirements' },
            { name: 'India', url: '/visa-guides/country-entry-requirements/india-2026' },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd(faqs)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd({
            headline: 'India Entry Requirements in 2026 (Tourist Visa Guide)',
            description: 'Complete India entry requirements guide including eVisa categories, required documents, stay duration, and overstay penalties.',
            datePublished: LAST_UPDATED,
            dateModified: LAST_UPDATED,
            url: 'https://visainfoguide.com/visa-guides/country-entry-requirements/india-2026',
          })),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <Breadcrumbs
            items={[
              { name: 'Visa Guides', url: '/visa-guides' },
              { name: 'Country Entry Requirements', url: '/visa-guides/country-entry-requirements' },
              { name: 'India', url: '/visa-guides/country-entry-requirements/india-2026' },
            ]}
          />

          <header className="mt-8 mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">🇮🇳</span>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  India Entry Requirements in 2026
                </h1>
                <p className="text-xl text-gray-600 mt-2">Tourist Visa Guide</p>
              </div>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg mb-8">
              <p className="text-lg text-gray-800 leading-relaxed">
                Most travelers require a visa to enter India, but citizens of over 160 eligible countries can apply conveniently through the <strong>official Indian eVisa system</strong> before departure. Visa-free entry is limited to a small number of specific bilateral agreements. Use the <Link href="/visa-guides/do-i-need-a-visa" className="text-orange-700 hover:text-orange-800 font-medium underline">Do I Need a Visa</Link> checker or the <Link href="/" className="text-orange-700 hover:text-orange-800 font-medium underline">Trip Visa Finder</Link> to confirm your exact requirements before booking travel to India.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <Globe className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">160+</div>
                  <div className="text-sm text-gray-600">eVisa Nations</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Laptop className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">Online</div>
                  <div className="text-sm text-gray-600">eVisa Application</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">30–90</div>
                  <div className="text-sm text-gray-600">Days Per Stay</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Shield className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">6 mo.</div>
                  <div className="text-sm text-gray-600">Passport Validity</div>
                </CardContent>
              </Card>
            </div>
          </header>

          <article className="prose prose-lg max-w-none">

            <section id="visa-free" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Who Can Enter India Visa-Free?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                <Link href="/visa-guides/travel-visa-rules#visa-free" className="text-orange-600 hover:text-orange-700 font-medium underline">Visa-free entry</Link> to India is very limited. Only citizens of Nepal and Bhutan are exempt from India's standard visa requirement, based on longstanding bilateral treaty arrangements. These travelers may enter India without a visa and stay without a defined upper time limit, though certain administrative regulations apply.
              </p>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Visa-Free Countries</h3>
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
                    <span className="text-gray-800">Nepal — Treaty arrangement, no visa required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
                    <span className="text-gray-800">Bhutan — Treaty arrangement, no visa required</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                All other nationalities — including citizens of the United States, United Kingdom, EU countries, Australia, Canada, China, and virtually all other nations — must obtain a visa before entering India, either through the eVisa system online or through an Indian embassy or consulate.
              </p>
            </section>

            <section id="evisa" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What Is India's eVisa System?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                India's <Link href="/visa-guides/travel-visa-rules#evisa" className="text-orange-600 hover:text-orange-700 font-medium underline">eVisa</Link> system allows eligible nationals to apply for a Tourist visa entirely online before travel — no embassy visit required. The application is submitted at <strong>indianvisaonline.gov.in</strong>, and the approved visa is emailed to you. Citizens of over 160 countries are eligible for the Tourist eVisa.
              </p>

              <div className="grid gap-6 mb-6">
                <Card className="border-l-4 border-orange-500">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-orange-100 text-orange-700 font-bold text-sm px-3 py-1 rounded-full flex-shrink-0 mt-0.5">30-Day</div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Tourist eVisa — 30 Days</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">Valid for 30 days from the date of first arrival. Double entry permitted. Best suited for short trips. Cannot be extended or converted once in India.</p>
                        <div className="mt-2 text-xs text-gray-500">Entry type: Double entry &bull; Max stay: 30 days</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-100 text-blue-700 font-bold text-sm px-3 py-1 rounded-full flex-shrink-0 mt-0.5">1-Year</div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Tourist eVisa — 1 Year</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">Valid for 1 year from the date of issue (not first arrival). Multiple entry. Each stay may not exceed 90 consecutive days. Suitable for frequent visitors or travelers planning multiple India trips.</p>
                        <div className="mt-2 text-xs text-gray-500">Entry type: Multiple entry &bull; Max stay per visit: 90 days &bull; Validity: 1 year from issue date</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-green-500">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-green-100 text-green-700 font-bold text-sm px-3 py-1 rounded-full flex-shrink-0 mt-0.5">5-Year</div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Tourist eVisa — 5 Years</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">Valid for 5 years from the date of issue. Multiple entry. Each stay may not exceed 90 consecutive days. Best value for regular visitors to India.</p>
                        <div className="mt-2 text-xs text-gray-500">Entry type: Multiple entry &bull; Max stay per visit: 90 days &bull; Validity: 5 years from issue date</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                <h3 className="font-semibold text-gray-900 mb-2">How to Apply for an Indian eVisa</h3>
                <ol className="text-sm text-gray-700 space-y-1 list-decimal ml-5">
                  <li>Visit the official portal: <strong>indianvisaonline.gov.in</strong></li>
                  <li>Select "Apply Visa" and choose Tourist eVisa</li>
                  <li>Complete the online application form</li>
                  <li>Upload a passport scan and a passport-size photograph</li>
                  <li>Pay the applicable fee by credit or debit card</li>
                  <li>Receive approval by email within approximately 72 hours</li>
                  <li>Print the eVisa approval to present at immigration on arrival</li>
                </ol>
                <p className="text-xs text-gray-500 mt-3">eVisa holders must arrive through a designated eVisa-enabled port of entry. Confirm your arrival airport is listed on the official portal before booking.</p>
              </div>
            </section>

            <section id="regular-visa" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Who Needs a Regular Visa for India?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                While the eVisa system covers most tourist travel, a regular sticker visa obtained from an Indian embassy or consulate is required in several situations. Check whether your specific circumstances require a regular visa using our <Link href="/visa-guides/do-i-need-a-visa" className="text-orange-600 hover:text-orange-700 font-medium underline">Do I Need a Visa</Link> tool.
              </p>
              <div className="grid md:grid-cols-2 gap-5">
                {[
                  {
                    title: 'Longer Stays',
                    desc: 'Travelers requiring stays exceeding 90 days per visit need a regular tourist or other long-stay visa issued by an Indian mission abroad.',
                  },
                  {
                    title: 'Employment',
                    desc: 'Working in India for any period requires an Employment Visa, which must be obtained from an Indian embassy or consulate before travel.',
                  },
                  {
                    title: 'Journalism',
                    desc: 'Journalists and media personnel must apply for a specific Journalist Visa. Entering India on a Tourist visa for journalism purposes is not permitted.',
                  },
                  {
                    title: 'Research and Study',
                    desc: 'Student and Research visas are required for enrollment in Indian educational institutions or conducting formal research activities.',
                  },
                  {
                    title: 'Nationals of Pakistan, China, Afghanistan',
                    desc: 'Citizens of Pakistan, China, Afghanistan, Bangladesh, Sri Lanka, and some other countries may face additional restrictions and are typically required to use the regular visa process.',
                  },
                  {
                    title: 'Overland Entry',
                    desc: 'eVisa holders may only enter by air or sea at designated ports. Overland border crossings require a regular sticker visa.',
                  },
                ].map(({ title, desc }) => (
                  <Card key={title}>
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                      <p className="text-sm text-gray-700">{desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section id="required-documents" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Required Documents at Entry</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                All travelers entering India must present the following at immigration. Indian immigration officers have the authority to deny entry to any traveler not meeting these requirements.
              </p>

              <div className="grid gap-6">
                <Card className="border-l-4 border-orange-500">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Shield className="w-8 h-8 text-orange-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Passport Validity</h3>
                        <p className="text-gray-700 leading-relaxed">
                          Your passport must be valid for at least <strong>6 months beyond your intended departure date</strong>, and must have at least <strong>2 blank pages</strong> for immigration stamps. Airlines enforce this at check-in. See our <Link href="/visa-guides/travel-visa-rules#passport-validity" className="text-orange-600 hover:text-orange-700 font-medium underline">passport validity rules guide</Link>.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <FileText className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Printed eVisa Approval</h3>
                        <p className="text-gray-700 leading-relaxed">
                          If traveling on an eVisa, you <strong>must carry a printed copy</strong> of your eVisa approval letter. Immigration officers will check this document alongside your passport. Showing the approval on a phone screen alone may not be accepted.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-green-500">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Plane className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Return or Onward Ticket</h3>
                        <p className="text-gray-700 leading-relaxed">
                          A confirmed <Link href="/visa-guides/travel-visa-rules#onward-travel" className="text-orange-600 hover:text-orange-700 font-medium underline">return or onward ticket</Link> is required, demonstrating that you intend to depart India before your permitted stay expires. This is checked by airlines at boarding and by immigration on arrival.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-gray-400">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Wallet className="w-8 h-8 text-gray-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Proof of Sufficient Funds</h3>
                        <p className="text-gray-700 leading-relaxed">
                          You must be able to demonstrate <Link href="/visa-guides/travel-visa-rules#proof-of-funds" className="text-orange-600 hover:text-orange-700 font-medium underline">sufficient funds</Link> for the duration of your stay. Indian immigration may request bank statements or proof of credit. There is no published minimum, but officers have discretion to deny entry if funds appear insufficient.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="stay-duration" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Length of Stay Rules</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                An important distinction in India's visa system is that <strong>eVisa validity does not equal permitted stay duration</strong>. A 1-year eVisa means the visa remains valid for 1 year from the date of issue — it does not allow a continuous 1-year stay. Each visit on the 1-year or 5-year eVisa is limited to 90 consecutive days.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-t-4 border-orange-500">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">30-Day eVisa</h3>
                    <div className="text-3xl font-bold text-orange-600 mb-2">30 days</div>
                    <p className="text-sm text-gray-600">From date of first arrival. Double entry. Cannot be extended. Valid only at designated eVisa ports.</p>
                  </CardContent>
                </Card>
                <Card className="border-t-4 border-blue-500">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">1-Year / 5-Year eVisa</h3>
                    <div className="text-3xl font-bold text-blue-600 mb-2">90 days</div>
                    <p className="text-sm text-gray-600">Per consecutive stay. Multiple entry during visa validity. 180-day annual cap may apply. Visa clock starts from issue date.</p>
                  </CardContent>
                </Card>
                <Card className="border-t-4 border-green-500">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Regular Tourist Visa</h3>
                    <div className="text-3xl font-bold text-green-600 mb-2">180 days</div>
                    <p className="text-sm text-gray-600">Typically 180 days per entry. Issued by Indian embassies. Validity ranges from 6 months to 10 years. Multiple or single entry depending on type.</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="overstay" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Overstay Penalties in India</h2>
              <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-red-900 mb-4">Exit Permit, Fines, Entry Bans &amp; Legal Risk</h3>
                    <div className="space-y-3 text-gray-800">
                      <div>
                        <p className="font-semibold mb-1">Exit Permit Required</p>
                        <p className="leading-relaxed text-sm">You <strong>cannot leave India</strong> if you have overstayed your visa without first obtaining an Exit Permit from the Foreigners Regional Registration Office (FRRO) or a Superintendent of Police. This process can take several days and requires documentation explaining the reason for overstay. Airlines will not allow boarding without a valid exit endorsement.</p>
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Financial Fines</p>
                        <p className="leading-relaxed text-sm">Fines are assessed per day of overstay. Amounts vary based on nationality and duration of overstay, and are set at the discretion of immigration authorities. All fines must be paid before an Exit Permit is granted.</p>
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Entry Bans</p>
                        <p className="leading-relaxed text-sm">Overstays result in being <strong>blacklisted from future India entry</strong>. Bans can range from several months to permanent, depending on the severity of the overstay. Being blacklisted affects all future visa applications to India.</p>
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Legal Consequences</p>
                        <p className="leading-relaxed text-sm">Prolonged or intentional overstays are a criminal offence under the <strong>Foreigners Act 1946</strong> and the Registration of Foreigners Act. Detention and prosecution are possible for serious cases. Contact the nearest FRRO immediately if you realize you are approaching or have exceeded your permitted stay.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <FAQBlock faqs={faqs} />

            <section id="sources" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Sources and Official Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                This guide draws from official Indian Government immigration sources. Entry requirements and eVisa eligibility can change — always verify current policy at the official portal before booking.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                For details about our research process, see our <Link href="/methodology" className="text-orange-600 hover:text-orange-700 font-medium underline">methodology page</Link>.
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Last Reviewed:</strong> {new Date(LAST_UPDATED).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <strong>Official Sources:</strong>
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Government of India Bureau of Immigration — boi.gov.in</li>
                  <li>• Indian eVisa Official Portal — indianvisaonline.gov.in</li>
                  <li>• Ministry of Home Affairs, Government of India — mha.gov.in</li>
                  <li>• Foreigners Regional Registration Office (FRRO) — frro.gov.in</li>
                  <li>• International Air Transport Association (IATA) Timatic Database</li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">
                  <strong>Important:</strong> Entry requirements and eVisa eligibility can change without notice. Always verify current requirements with the official Indian Government eVisa portal or the nearest Indian embassy before booking international travel to India.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Visa Guides</h2>
              <div className="grid gap-4">
                {[
                  {
                    href: '/visa-guides/do-i-need-a-visa',
                    title: 'Do I Need a Visa?',
                    desc: 'Check visa requirements for your specific passport and destination',
                  },
                  {
                    href: '/visa-guides/visa-free-countries',
                    title: 'Visa-Free Countries by Passport',
                    desc: 'Explore all visa-free destinations available with your passport',
                  },
                  {
                    href: '/visa-guides/travel-visa-rules',
                    title: 'Travel Visa Rules Explained',
                    desc: 'Understand visa types, entry requirements, and travel documentation',
                  },
                  {
                    href: '/visa-guides/country-entry-requirements/united-arab-emirates-2026',
                    title: 'United Arab Emirates Entry Requirements 2026',
                    desc: 'Visa-free access, visa on arrival, and tourist visa rules for the UAE',
                  },
                  {
                    href: '/visa-guides/country-entry-requirements/singapore-2026',
                    title: 'Singapore Entry Requirements 2026',
                    desc: 'SG Arrival Card, visa-free access rules, and entry conditions for Singapore',
                  },
                  {
                    href: '/trip',
                    title: 'Trip Visa Finder',
                    desc: 'Plan multi-country trips and check requirements for your full itinerary',
                  },
                ].map(({ href, title, desc }) => (
                  <Link key={href} href={href} className="group">
                    <Card className="transition-all duration-200 hover:shadow-lg hover:border-orange-200">
                      <CardContent className="flex items-center justify-between p-6">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-orange-700 transition-colors">
                            {title}
                          </h3>
                          <p className="text-sm text-gray-600">{desc}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all flex-shrink-0 ml-4" />
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          </article>
        </div>
      </div>
    </>
  );
}
