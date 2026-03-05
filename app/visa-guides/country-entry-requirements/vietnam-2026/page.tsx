import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, XCircle, FileText, ArrowRight, Clock, AlertTriangle, Shield, Wallet, Plane, Info, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQBlock from '@/components/visa-guides/FAQBlock';
import { canonicalUrl, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';
import { articleJsonLd } from '@/lib/seo-links';

const LAST_UPDATED = '2026-02-21';

export const metadata: Metadata = {
  title: 'Vietnam Entry Requirements in 2026 (Tourist Visa Guide) | VisaInfoGuide',
  description: 'Complete Vietnam entry requirements for 2026. Visa-free access rules, official eVisa system, required documents, stay duration limits, overstay penalties, and FAQs for all nationalities.',
  alternates: {
    canonical: canonicalUrl('/visa-guides/country-entry-requirements/vietnam-2026'),
  },
  openGraph: {
    title: 'Vietnam Entry Requirements in 2026 (Tourist Visa Guide)',
    description: 'Complete Vietnam entry requirements for 2026. Visa-free access, official eVisa system, required documents, stay limits, and overstay penalties for all nationalities.',
    type: 'article',
    url: canonicalUrl('/visa-guides/country-entry-requirements/vietnam-2026'),
    images: [{
      url: canonicalUrl('/og/legal-og'),
      width: 1200,
      height: 630,
      alt: 'Vietnam Entry Requirements 2026',
    }],
    siteName: 'VisaInfoGuide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vietnam Entry Requirements in 2026 (Tourist Visa Guide)',
    description: 'Vietnam visa-free access, eVisa system, required documents, stay limits, and overstay penalties for 2026.',
    images: [canonicalUrl('/og/legal-og')],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqs = [
  {
    question: 'Do US citizens need a visa for Vietnam?',
    answer: 'As of 2023, US citizens enjoy visa-free entry to Vietnam for up to 45 days per visit, extended from the previous 15-day allowance. This applies to all US passport holders regardless of purpose of visit (tourism, transit, visiting family). For stays exceeding 45 days, US nationals must apply for a Vietnam eVisa (valid for up to 90 days) or obtain a traditional visa through a Vietnamese embassy or consulate.',
  },
  {
    question: 'How long can I stay in Vietnam without a visa?',
    answer: 'The duration of visa-free stay depends on your nationality. Citizens from many Western countries including the US, UK, EU member states, Canada, Australia, Japan, and South Korea are granted visa-free stays of 45 days. Some other nationalities receive 14 or 30 days visa-free. Citizens from ASEAN member states can typically stay 14 to 30 days without a visa. Always check the specific allowance for your passport nationality before traveling.',
  },
  {
    question: 'Can I extend my Vietnam eVisa?',
    answer: 'Vietnam eVisas cannot currently be extended online. If you need to stay longer than your eVisa allows, you must either apply for a new eVisa (which requires leaving the country or applying through the Immigration Department), apply for a different visa category, or depart Vietnam and re-enter on a fresh visa. Visa runs — brief exits to neighboring countries — are a common practice but are not officially endorsed and immigration officers can exercise discretion about re-entry.',
  },
  {
    question: 'Is Vietnam eVisa multiple entry?',
    answer: 'Yes. Vietnam offers both single-entry and multiple-entry eVisas. The multiple-entry eVisa allows you to enter and exit Vietnam as many times as you like within the 90-day validity window, making it ideal for travelers who plan regional trips to neighboring countries such as Cambodia, Laos, or Thailand during their Vietnam stay. Both single and multiple-entry eVisas are valid for 90 days from the date of issue.',
  },
  {
    question: 'What happens if I overstay in Vietnam?',
    answer: 'Overstaying in Vietnam is taken seriously by immigration authorities. Penalties include daily fines, administrative detention, and deportation at your own expense. Repeated or prolonged overstays can result in multi-year entry bans. Fines are typically assessed at the airport or border crossing when you attempt to depart. If you realize you have overstayed, contact the nearest Department of Immigration office as soon as possible to regularize your status before attempting to leave.',
  },
  {
    question: 'Can I work remotely in Vietnam on a tourist visa?',
    answer: 'Vietnam\'s tourist visa and visa-free entry are issued for tourism, transit, and visiting purposes only — not for any form of employment, including remote work for a foreign employer. While enforcement of remote work restrictions for short-term visitors has historically been inconsistent, the legal position is clear: working in Vietnam without a work permit and appropriate visa (such as a business or LD visa) is a violation of Vietnamese immigration law. Those caught working without authorization can face fines, deportation, and entry bans.',
  },
];

export default function VietnamEntryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Visa Guides', url: '/visa-guides' },
            { name: 'Country Entry Requirements', url: '/visa-guides/country-entry-requirements' },
            { name: 'Vietnam', url: '/visa-guides/country-entry-requirements/vietnam-2026' },
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
            headline: 'Vietnam Entry Requirements in 2026 (Tourist Visa Guide)',
            description: 'Complete Vietnam entry requirements guide including visa-free access, official eVisa system, required documents, stay duration, and overstay penalties.',
            datePublished: LAST_UPDATED,
            dateModified: LAST_UPDATED,
            url: 'https://visainfoguide.com/visa-guides/country-entry-requirements/vietnam-2026',
          })),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <Breadcrumbs
            items={[
              { name: 'Visa Guides', url: '/visa-guides' },
              { name: 'Country Entry Requirements', url: '/visa-guides/country-entry-requirements' },
              { name: 'Vietnam', url: '/visa-guides/country-entry-requirements/vietnam-2026' },
            ]}
          />

          <header className="mt-8 mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">🇻🇳</span>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Vietnam Entry Requirements in 2026
                </h1>
                <p className="text-xl text-gray-600 mt-2">Tourist Visa Guide</p>
              </div>
            </div>

            <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg mb-8">
              <p className="text-lg text-gray-800 leading-relaxed">
                Vietnam offers <strong>visa-free entry to citizens of over 40 countries</strong> for short stays ranging from 14 to 45 days, and operates an <strong>official eVisa system</strong> open to most other nationalities for stays of up to 90 days. The exact pathway available to you — visa-free, eVisa, or traditional embassy visa — depends entirely on your passport nationality and your intended length of stay. Use our <Link href="/visa-guides/do-i-need-a-visa" className="text-teal-600 hover:text-teal-700 font-medium underline">Do I Need a Visa</Link> checker or the <Link href="/" className="text-teal-600 hover:text-teal-700 font-medium underline">Trip Visa Finder</Link> to confirm your specific requirements before booking.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">40+</div>
                  <div className="text-sm text-gray-600">Visa-Free Nations</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Globe className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">eVisa</div>
                  <div className="text-sm text-gray-600">90-Day Option</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">14–45</div>
                  <div className="text-sm text-gray-600">Visa-Free Days</div>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Who Can Enter Vietnam Visa-Free?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Vietnam extends <Link href="/visa-guides/travel-visa-rules#visa-free" className="text-teal-600 hover:text-teal-700 font-medium underline">visa-free entry</Link> to passport holders from over 40 countries. Following a significant policy expansion in 2023, many eligible nationalities now enjoy stays of up to 45 days — tripling the previous 15-day allowance. The specific duration granted depends on your nationality and the bilateral agreement between your country and Vietnam.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card className="border-l-4 border-teal-500">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">45-Day Visa-Free Stay</h3>
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">
                      Citizens of these countries are granted 45 days per visit:
                    </p>
                    <ul className="grid grid-cols-2 gap-1 text-sm text-gray-700">
                      {['United States', 'United Kingdom', 'Germany', 'France', 'Italy', 'Spain', 'Canada', 'Australia', 'Japan', 'South Korea', 'Netherlands', 'Switzerland', 'Denmark', 'Sweden', 'Norway', 'Finland'].map((c) => (
                        <li key={c} className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-teal-600 flex-shrink-0" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-blue-500">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">14–30 Day Visa-Free Stay</h3>
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">
                      ASEAN member state passport holders are generally granted 14 to 30 days visa-free:
                    </p>
                    <ul className="grid grid-cols-2 gap-1 text-sm text-gray-700">
                      {['Thailand', 'Singapore', 'Malaysia', 'Indonesia', 'Philippines', 'Myanmar', 'Cambodia', 'Laos', 'Brunei'].map((c) => (
                        <li key={c} className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-blue-600 flex-shrink-0" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Visa-free entry permits only tourism, transit, and visiting family or friends. It does not authorize any form of employment. The stay limit resets upon re-entry, but immigration officers may scrutinize travelers who make frequent short visits.
              </p>
            </section>

            <section id="evisa" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Vietnam eVisa System Explained</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Vietnam's official <Link href="/visa-guides/travel-visa-rules#evisa" className="text-teal-600 hover:text-teal-700 font-medium underline">eVisa</Link> system is available to citizens of most countries worldwide and is the standard entry route for nationalities not covered by the visa-free program. The eVisa is applied for entirely online through the official government portal operated by Vietnam's Immigration Department.
              </p>
              <div className="grid gap-4 mb-6">
                <Card className="border-l-4 border-teal-500">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Vietnam eVisa Key Facts</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Validity:</strong> 90 days from the date of issue</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Entry type:</strong> Single-entry or multiple-entry (your choice at application)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Stay duration:</strong> Up to 90 days per entry for multiple-entry; 90 days total for single-entry</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Processing time:</strong> Typically 3 business days; expedited processing available</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Application:</strong> Online through the official Vietnam Immigration Department portal (evisa.xuatnhapcanh.gov.vn)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Fee:</strong> Approximately USD $25 (single-entry) or USD $50 (multiple-entry); fees subject to change</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span><strong>What to bring:</strong> Print the eVisa approval letter and carry it at all times during your trip</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <Info className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-800 leading-relaxed">
                    <strong>Use only the official government portal.</strong> Numerous third-party websites charge inflated fees to process Vietnam eVisa applications. Always apply directly through the official Vietnam Immigration Department website to ensure your application is submitted correctly and to avoid scams.
                  </p>
                </div>
              </div>
            </section>

            <section id="embassy-visa" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Who Needs to Apply for a Traditional Visa?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                A traditional embassy or consulate visa is required for travelers whose nationality is not covered by the eVisa program, or for those whose purpose of visit goes beyond standard tourism. Use our <Link href="/visa-guides/do-i-need-a-visa" className="text-teal-600 hover:text-teal-700 font-medium underline">Do I Need a Visa</Link> tool to confirm which pathway applies to your passport.
              </p>
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Cases Where a Traditional Visa Is Required</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Long-term stays:</strong> Tourism stays exceeding 90 days require a different visa category (e.g., DL or NG visa)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Employment:</strong> Any form of work in Vietnam requires a work permit and LD (labor) visa obtained through the employer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Journalism and media:</strong> Journalists must obtain a press visa (PV) issued by the Ministry of Foreign Affairs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Study:</strong> Students attending accredited programs must apply for a student visa (DH) through the institution</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Nationalities excluded from eVisa:</strong> A small number of nationalities cannot use the eVisa system and must apply at a Vietnamese embassy or consulate</span>
                  </li>
                </ul>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Embassy visa applications are submitted in person or by post to the nearest Vietnamese embassy or consulate. Processing times range from 5 to 10 business days for standard applications. Requirements vary by visa category but generally include a completed application form, valid passport, passport photos, a letter of invitation or purpose statement, and the applicable fee.
              </p>
            </section>

            <section id="required-documents" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Required Documents at Entry</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Vietnamese immigration officers verify documentation at all international entry points. The following are standard requirements for all visitors entering Vietnam.
              </p>

              <div className="grid gap-6">
                <Card className="border-l-4 border-teal-500">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Shield className="w-8 h-8 text-teal-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Passport Validity</h3>
                        <p className="text-gray-700 leading-relaxed">
                          Your passport must be valid for at least <strong>6 months beyond your intended departure date</strong> from Vietnam. Review our guide on <Link href="/visa-guides/travel-visa-rules#passport-validity" className="text-teal-600 hover:text-teal-700 font-medium underline">passport validity rules</Link> for international travel. Airlines will also enforce this requirement at check-in and may deny boarding if your passport does not meet the threshold.
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
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Printed eVisa Approval (if applicable)</h3>
                        <p className="text-gray-700 leading-relaxed">
                          If you are entering on a Vietnam eVisa, you must carry a <strong>printed copy</strong> of your eVisa approval letter. Immigration officers at Vietnam's airports and land border crossings will check the physical document. Digital copies on a phone or tablet are generally not accepted as a substitute, so print a clear copy before departure.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-orange-500">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Plane className="w-8 h-8 text-orange-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Return or Onward Ticket</h3>
                        <p className="text-gray-700 leading-relaxed">
                          A confirmed <Link href="/visa-guides/travel-visa-rules#onward-travel" className="text-teal-600 hover:text-teal-700 font-medium underline">onward or return ticket</Link> is required to demonstrate that you intend to depart Vietnam before your authorized stay expires. Airlines may deny boarding if you cannot show proof of departure. Immigration officers may also request it at the border.
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
                          Vietnam does not publish a specific minimum daily fund requirement, but officers may ask for evidence of <Link href="/visa-guides/travel-visa-rules#proof-of-funds" className="text-teal-600 hover:text-teal-700 font-medium underline">sufficient funds</Link> to cover your stay. Bank statements showing a healthy balance, credit cards, or a combination of cash and cards are acceptable. Having USD $50–$100 per day as a rough benchmark is reasonable, though enforcement varies by port of entry.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="stay-duration" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Length of Stay Rules</h2>
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  It is important to distinguish between <strong>visa validity</strong> and <strong>permitted stay duration</strong>. Your eVisa may be valid for 90 days from the issue date, but that validity window is the period during which you can use it to enter Vietnam — not necessarily the length of time you can remain in country.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Upon entry, the immigration officer will stamp your passport with the specific date by which you must depart Vietnam. This date — not the eVisa expiry date — governs your legal stay. For most tourist entries, the permitted stay matches the eVisa's remaining validity, but officers retain discretion to grant shorter periods.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Single-entry eVisa:</strong> Once you leave Vietnam, the eVisa is consumed and cannot be reused, even if the 90-day validity window has not yet expired. You would need to apply for a new eVisa to re-enter.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Multiple-entry eVisa:</strong> You can exit and re-enter Vietnam as many times as you wish within the 90-day validity window. Each re-entry starts a new stay period up to the eVisa expiry date. This option is significantly more practical for travelers visiting neighboring countries during their trip.
                </p>
              </div>
            </section>

            <section id="overstay" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Overstay Penalties in Vietnam</h2>
              <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-red-900 mb-3">Financial Penalties and Entry Bans</h3>
                    <div className="space-y-3 text-gray-800">
                      <p className="leading-relaxed">
                        <strong>Daily fines:</strong> Overstaying in Vietnam results in administrative fines that accumulate on a daily basis. The fine rate is determined by Vietnamese immigration authorities and is assessed at the point of departure — typically the international airport or land border crossing. You must pay fines before being permitted to leave the country.
                      </p>
                      <p className="leading-relaxed">
                        <strong>Deportation:</strong> Travelers who overstay significantly or who are found working illegally may be detained and deported at their own expense. Deportation typically involves an escort to your flight and being placed on a watchlist.
                      </p>
                      <p className="leading-relaxed">
                        <strong>Entry bans:</strong> Repeated overstays or serious violations can result in short-term or long-term entry bans from Vietnam. Ban durations vary depending on the severity of the violation and whether it was a first or repeat offence.
                      </p>
                      <p className="leading-relaxed">
                        <strong>If you realize you have overstayed:</strong> Report to the nearest Department of Foreigners Management (part of the Ministry of Public Security) in your current province as soon as possible. Voluntary declaration before departure typically results in more lenient outcomes than being caught at the border.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <FAQBlock faqs={faqs} />

            <section id="sources" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Sources and Official Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                This guide is compiled from official Vietnamese government immigration sources. Entry requirements can change without notice — always verify current policy before booking international travel.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                For details about our research process, see our <Link href="/methodology" className="text-teal-600 hover:text-teal-700 font-medium underline">methodology page</Link>.
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Last Reviewed:</strong> {new Date(LAST_UPDATED).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <strong>Official Sources:</strong>
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Vietnam Immigration Department (Cục Quản lý xuất nhập cảnh) — xuatnhapcanh.gov.vn</li>
                  <li>• Official Vietnam eVisa Portal — evisa.xuatnhapcanh.gov.vn</li>
                  <li>• Ministry of Public Security Vietnam — bocongan.gov.vn</li>
                  <li>• International Air Transport Association (IATA) Timatic Database</li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">
                  <strong>Important:</strong> Entry requirements can change without notice. Always verify current requirements with the Vietnam Immigration Department or your nearest Vietnamese embassy before booking international travel.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Visa Guides</h2>
              <div className="grid gap-4">
                <Link href="/visa-guides/do-i-need-a-visa" className="group">
                  <Card className="transition-all duration-200 hover:shadow-lg hover:border-teal-200">
                    <CardContent className="flex items-center justify-between p-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                          Do I Need a Visa?
                        </h3>
                        <p className="text-sm text-gray-600">
                          Check visa requirements for your specific passport and destination
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/visa-guides/visa-free-countries" className="group">
                  <Card className="transition-all duration-200 hover:shadow-lg hover:border-teal-200">
                    <CardContent className="flex items-center justify-between p-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                          Visa-Free Countries by Passport
                        </h3>
                        <p className="text-sm text-gray-600">
                          Explore all visa-free destinations available with your passport
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/visa-guides/travel-visa-rules" className="group">
                  <Card className="transition-all duration-200 hover:shadow-lg hover:border-teal-200">
                    <CardContent className="flex items-center justify-between p-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                          Travel Visa Rules Explained
                        </h3>
                        <p className="text-sm text-gray-600">
                          Understand visa types, entry requirements, and travel documentation
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/visa-guides/country-entry-requirements/thailand-2026" className="group">
                  <Card className="transition-all duration-200 hover:shadow-lg hover:border-teal-200">
                    <CardContent className="flex items-center justify-between p-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                          Thailand Entry Requirements 2026
                        </h3>
                        <p className="text-sm text-gray-600">
                          Visa-free access, visa on arrival, and entry conditions for Thailand
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/visa-guides/country-entry-requirements/singapore-2026" className="group">
                  <Card className="transition-all duration-200 hover:shadow-lg hover:border-teal-200">
                    <CardContent className="flex items-center justify-between p-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                          Singapore Entry Requirements 2026
                        </h3>
                        <p className="text-sm text-gray-600">
                          Visa-free access, SG Arrival Card, and entry conditions for Singapore
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/" className="group">
                  <Card className="transition-all duration-200 hover:shadow-lg hover:border-teal-200">
                    <CardContent className="flex items-center justify-between p-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                          Trip Visa Finder
                        </h3>
                        <p className="text-sm text-gray-600">
                          Plan multi-country trips and check requirements for your itinerary
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </section>
          </article>
        </div>
      </div>
    </>
  );
}
