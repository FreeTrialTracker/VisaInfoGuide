import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Clock, AlertTriangle, Shield, Wallet, Plane, Info, Globe, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQBlock from '@/components/visa-guides/FAQBlock';
import { canonicalUrl, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';
import { articleJsonLd } from '@/lib/seo-links';

const LAST_UPDATED = '2026-02-22';

export const metadata: Metadata = {
  title: 'Brazil Entry Requirements in 2026 (Tourist Visa Guide) | VisaInfoGuide',
  description: 'Complete Brazil entry requirements for 2026. Visa-free access, eVisa options, required documents, stay duration limits, and overstay penalties for all nationalities including US, UK, and Indian passport holders.',
  alternates: {
    canonical: canonicalUrl('/visa-guides/country-entry-requirements/brazil-2026'),
  },
  openGraph: {
    title: 'Brazil Entry Requirements in 2026 (Tourist Visa Guide)',
    description: 'Complete Brazil entry requirements for 2026. Visa-free access, eVisa, required documents, stay limits, and overstay penalties for all nationalities.',
    type: 'article',
    url: canonicalUrl('/visa-guides/country-entry-requirements/brazil-2026'),
    images: [{
      url: canonicalUrl('/og/legal-og'),
      width: 1200,
      height: 630,
      alt: 'Brazil Entry Requirements 2026',
    }],
    siteName: 'VisaInfoGuide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brazil Entry Requirements in 2026 (Tourist Visa Guide)',
    description: 'Brazil visa-free access, eVisa, stay limits, and overstay penalties for 2026.',
    images: [canonicalUrl('/og/legal-og')],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqs = [
  {
    question: 'Do US citizens need a visa for Brazil?',
    answer: 'US citizens do not currently need a visa for tourism in Brazil. Following a 2023 reciprocal agreement, American passport holders can visit Brazil visa-free for up to 90 days per entry. However, the total stay must not exceed 180 days in any 12-month period. US citizens should carry a valid passport (ideally with at least 6 months validity), a return or onward ticket, and evidence of sufficient funds. Requirements are subject to change — always verify the latest rules with the Brazilian consulate or embassy before travel.',
  },
  {
    question: 'Do UK citizens need a visa for Brazil?',
    answer: 'No, UK citizens do not need a visa for tourism in Brazil. British passport holders can enter Brazil visa-free and stay for up to 90 days. The 90-day limit applies per visit, and total stays must not exceed 180 days in a rolling 12-month period. A valid UK passport, a return or onward ticket, and proof of sufficient funds are required at entry. UK citizens who wish to stay longer than 90 days must apply for an extension through the Brazilian Federal Police (Polícia Federal) before their authorized period expires.',
  },
  {
    question: 'How long can I stay in Brazil as a tourist?',
    answer: 'Most tourists are permitted to stay in Brazil for up to 90 days per visit. The authorized stay begins on the date of entry as stamped in your passport by Brazilian Federal Police. Additionally, total stays in Brazil must not exceed 180 days in any 12-month period, regardless of how many individual trips you take. If you need to stay longer than 90 days, you can apply for an extension at a Federal Police office before your initial authorization expires. Extensions are granted at the discretion of immigration authorities.',
  },
  {
    question: 'Can I extend my stay in Brazil?',
    answer: 'Yes, it is possible to extend your tourist stay in Brazil beyond the initial 90 days, up to a maximum of 180 days total in a 12-month period. To request an extension, you must apply at a Brazilian Federal Police office (Delegacia de Polícia Federal) before your authorized stay expires. You will need to demonstrate a valid reason for the extension, present your passport, and pay an associated fee. The extension is not automatic and is granted at the discretion of the immigration officer. It is not recommended to simply cross the border and re-enter to reset your stay counter.',
  },
  {
    question: 'Is Brazil visa-free for Indians?',
    answer: 'Indian citizens are not on Brazil\'s visa-free list. Indian passport holders must obtain a visa before traveling to Brazil. The options include applying for an eVisa through the Brazilian government portal (gov.br), which is available to Indian nationals, or applying at a Brazilian embassy or consulate. The eVisa for tourism allows stays of up to 90 days per visit and is valid for multiple entries within a 2-year period. Processing typically takes 5 to 10 business days. Indian travelers should apply well in advance of their departure date.',
  },
  {
    question: 'What happens if I overstay in Brazil?',
    answer: 'Overstaying your authorized period in Brazil is treated as a migration irregularity. Upon departure, the Brazilian Federal Police will issue an overstay fine calculated based on the number of days you exceeded your authorized stay. Fines must typically be paid before being permitted to depart. In addition to financial penalties, overstays are recorded in Brazilian immigration systems and can negatively affect future visa applications and entry into Brazil. Significant or repeated overstays may result in formal deportation proceedings or entry bans. If you realize you cannot depart on time, contact the Federal Police proactively before your authorization expires.',
  },
];

export default function BrazilEntryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Visa Guides', url: '/visa-guides' },
            { name: 'Country Entry Requirements', url: '/visa-guides/country-entry-requirements' },
            { name: 'Brazil', url: '/visa-guides/country-entry-requirements/brazil-2026' },
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
            headline: 'Brazil Entry Requirements in 2026 (Tourist Visa Guide)',
            description: 'Complete Brazil entry requirements guide including visa-free access, eVisa options, required documents, stay duration, and overstay penalties.',
            datePublished: LAST_UPDATED,
            dateModified: LAST_UPDATED,
            url: 'https://visainfoguide.com/visa-guides/country-entry-requirements/brazil-2026',
          })),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <Breadcrumbs
            items={[
              { name: 'Visa Guides', url: '/visa-guides' },
              { name: 'Country Entry Requirements', url: '/visa-guides/country-entry-requirements' },
              { name: 'Brazil', url: '/visa-guides/country-entry-requirements/brazil-2026' },
            ]}
          />

          <header className="mt-8 mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">🇧🇷</span>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Brazil Entry Requirements in 2026
                </h1>
                <p className="text-xl text-gray-600 mt-2">Tourist Visa Guide</p>
              </div>
            </div>

            <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg mb-8">
              <p className="text-lg text-gray-800 leading-relaxed">
                Brazil allows <strong>visa-free entry for many nationalities</strong> for tourist stays of up to 90 days, while some travelers must obtain an <strong>eVisa or tourist visa</strong> before departure. Entry requirements depend on your passport nationality and purpose of visit. Use our <Link href="/visa-guides/do-i-need-a-visa" className="text-teal-600 hover:text-teal-700 font-medium underline">Do I Need a Visa</Link> checker or the <Link href="/" className="text-teal-600 hover:text-teal-700 font-medium underline">Trip Visa Finder</Link> to confirm the exact requirements for your passport before booking travel to Brazil.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">90</div>
                  <div className="text-sm text-gray-600">Visa-Free Days</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Globe className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">eVisa</div>
                  <div className="text-sm text-gray-600">Online Option</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">180</div>
                  <div className="text-sm text-gray-600">Max Days/Year</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Shield className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">6 Mo.</div>
                  <div className="text-sm text-gray-600">Recommended Validity</div>
                </CardContent>
              </Card>
            </div>
          </header>

          <article className="prose prose-lg max-w-none">

            <section id="visa-free" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Who Can Enter Brazil Visa-Free?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Brazil maintains <Link href="/visa-guides/travel-visa-rules#visa-free" className="text-teal-600 hover:text-teal-700 font-medium underline">visa-free entry</Link> agreements with a broad range of countries, including most of South America, major European nations, Japan, South Korea, and — following a 2023 reciprocity agreement — the United States, Canada, and Australia. Eligible passport holders can enter Brazil for tourism without a visa for stays of up to 90 days per visit.
              </p>
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Countries with Visa-Free Access to Brazil (Selected)</h3>
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-700">
                  {[
                    'Argentina', 'Bolivia', 'Chile', 'Colombia', 'Ecuador',
                    'Paraguay', 'Peru', 'Uruguay', 'Venezuela', 'Germany',
                    'France', 'Italy', 'Spain', 'Portugal', 'United Kingdom',
                    'Ireland', 'Netherlands', 'Belgium', 'Austria', 'Switzerland',
                    'Sweden', 'Norway', 'Denmark', 'Finland', 'Japan',
                    'South Korea', 'Mexico', 'United States', 'Canada', 'Australia',
                    'New Zealand', 'Panama',
                  ].map((c) => (
                    <li key={c} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-500 mt-4">Visa-free agreements can change. Always verify with the Brazilian Ministry of Foreign Affairs or your nearest Brazilian consulate before travel.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <Card className="border-l-4 border-teal-500">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-gray-900 mb-2">Stay Duration</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Visa-free entry permits a stay of <strong>up to 90 days per visit</strong>. Total stays across multiple visits must not exceed <strong>180 days in any 12-month period</strong>.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-orange-500">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-gray-900 mb-2">Extension Possible</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Extensions beyond 90 days may be requested at a Brazilian Federal Police office before your authorized stay expires, subject to approval.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-800 text-sm leading-relaxed">
                    <strong>180-day annual cap:</strong> Even if each individual visit is under 90 days, the total number of days spent in Brazil across all trips may not exceed 180 days in any rolling 12-month period. Brazilian immigration tracks cumulative stay duration.
                  </p>
                </div>
              </div>
            </section>

            <section id="evisa" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Brazil eVisa and Tourist Visa Requirements</h2>
              <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg mb-6">
                <div className="flex items-start gap-3">
                  <Info className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-800 leading-relaxed">
                    Nationalities not covered by Brazil's visa-free agreements can apply for a Brazilian <Link href="/visa-guides/travel-visa-rules#evisa" className="text-teal-600 hover:text-teal-700 font-medium underline">eVisa</Link> online before departure. The eVisa system covers tourism, business, and transit purposes and is available to a wide range of nationalities, including Indian passport holders.
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card className="border-l-4 border-blue-500">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Brazil eVisa Details</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span>Applied for online at the Brazilian government portal (gov.br/visanet)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span>Permits stays of up to <strong>90 days per visit</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span>Valid for <strong>multiple entries</strong> within a 2-year period</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span>Processing typically takes <strong>5 to 10 business days</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span>Covers tourism, business, and transit travel</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span>180-day per year maximum total stay applies</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-amber-500">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Embassy Visa Option</h3>
                    <p className="text-sm text-gray-700 leading-relaxed mb-3">
                      Travelers who are not eligible for the eVisa or who require a different visa category (such as a long-stay visa) can apply at a Brazilian embassy or consulate in their country of residence.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>Processing times vary by country — allow several weeks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>Required for categories not covered by eVisa (e.g., study, work, permanent residency)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>Check with your nearest Brazilian consulate for specific requirements</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="visa-required" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Who Needs a Visa Before Traveling to Brazil?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Citizens of countries that do not have a visa-free agreement with Brazil and are not covered by the eVisa program must apply for a traditional tourist visa at a Brazilian embassy or consulate. The list of nationalities requiring pre-approved visas changes over time as Brazil updates its bilateral agreements. Use the <Link href="/visa-guides/do-i-need-a-visa" className="text-teal-600 hover:text-teal-700 font-medium underline">Do I Need a Visa</Link> tool to check the current requirement for your specific passport.
              </p>
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Nationalities Typically Requiring a Visa for Brazil</h3>
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-700">
                  {[
                    'India', 'Pakistan', 'Bangladesh', 'Nigeria', 'Ghana',
                    'Senegal', 'China', 'Egypt', 'Morocco', 'Afghanistan',
                    'Iraq', 'Syria', 'Yemen', 'Somalia', 'Sudan',
                  ].map((c) => (
                    <li key={c} className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-orange-500 flex-shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-500 mt-4">This list is illustrative and subject to change. Nationals of these countries may still be eligible for the Brazil eVisa — check the official portal for current eligibility.</p>
              </div>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-800 text-sm leading-relaxed">
                    <strong>Apply early:</strong> If you require an embassy visa, apply well in advance of your travel date. Embassy processing times can range from a few weeks to several months depending on your country of residence and application volume.
                  </p>
                </div>
              </div>
            </section>

            <section id="required-documents" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Required Documents at Entry</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                All travelers entering Brazil must meet standard entry requirements at the border. Brazilian Federal Police immigration officers have the authority to deny entry if any document or condition is not satisfied.
              </p>

              <div className="grid gap-6">
                <Card className="border-l-4 border-teal-500">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Shield className="w-8 h-8 text-teal-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Passport Validity</h3>
                        <p className="text-gray-700 leading-relaxed">
                          Your passport must be valid for the <strong>entire duration of your intended stay</strong> in Brazil. Unlike many countries, Brazil does not officially require 6 months of remaining validity beyond your stay, but carrying a passport with at least 6 months of validity is strongly recommended. See our guide on <Link href="/visa-guides/travel-visa-rules#passport-validity" className="text-teal-600 hover:text-teal-700 font-medium underline">passport validity rules</Link> for details.
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
                          A confirmed <Link href="/visa-guides/travel-visa-rules#onward-travel" className="text-teal-600 hover:text-teal-700 font-medium underline">return or onward ticket</Link> is required to demonstrate you intend to depart Brazil before your authorized stay expires. Airlines typically check this at check-in, and immigration officers may request it at the border.
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
                          Brazilian immigration may request evidence of <Link href="/visa-guides/travel-visa-rules#proof-of-funds" className="text-teal-600 hover:text-teal-700 font-medium underline">sufficient funds</Link> to cover your stay. Bank statements, credit cards, or cash are acceptable. No official minimum is stated, but demonstrating at least USD 50 to USD 100 per day of your intended stay is a commonly cited benchmark.
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
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Proof of Accommodation</h3>
                        <p className="text-gray-700 leading-relaxed">
                          Brazilian immigration officers may ask for proof of where you will be staying during your visit — such as a hotel booking confirmation, an Airbnb reservation, or a letter from a host in Brazil. Having this documentation readily available avoids delays at the border.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="stay-duration" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Length of Stay Rules</h2>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Brazil's stay rules for tourists are structured around both a per-visit limit and an annual cap:
                </p>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>90-day per visit limit:</strong> Visa-free travelers and eVisa holders are permitted to stay in Brazil for a maximum of 90 days per visit. The clock starts from your date of entry as stamped in your passport.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>180-day annual cap:</strong> Regardless of how many individual trips you take, the total number of days spent in Brazil may not exceed 180 days in any 12-month period. This rule applies to both visa-free and eVisa travelers.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Extension beyond 90 days:</strong> It is possible to apply for a stay extension at a Brazilian Federal Police office before your 90-day period expires. Extensions are not guaranteed and require a valid justification. The total stay cannot exceed 180 days in a 12-month period even with an extension.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Long-stay visas:</strong> Travelers who need to remain in Brazil for longer than 180 days (for study, work, family, or other reasons) must apply for the appropriate long-stay visa category through a Brazilian embassy or consulate before departure.
                    </div>
                  </li>
                </ul>
                <div className="mt-6 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-800 text-sm leading-relaxed">
                      <strong>Border crossing does not reset your stay:</strong> Simply crossing into a neighboring country (Argentina, Uruguay, Paraguay, Bolivia) and re-entering Brazil does not reset your 90-day allowance. Brazilian immigration tracks cumulative stay duration and the 180-day annual cap applies regardless of border crossings.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="overstay" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Overstay Penalties in Brazil</h2>
              <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-red-900 mb-3">Fines, Exit Restrictions, and Future Travel Impact</h3>
                    <div className="space-y-3 text-gray-800">
                      <p className="leading-relaxed">
                        <strong>Daily fines:</strong> Overstaying your authorized period in Brazil results in fines issued by the Brazilian Federal Police (Polícia Federal) at the time of departure. Fines are calculated on a per-day basis for each day of overstay and must be paid before you are permitted to leave the country.
                      </p>
                      <p className="leading-relaxed">
                        <strong>Exit restrictions:</strong> In some cases — particularly for significant overstays — Brazilian immigration authorities may impose administrative proceedings that must be resolved before you are allowed to depart. This can involve detention at the airport pending payment or documentation.
                      </p>
                      <p className="leading-relaxed">
                        <strong>Impact on future travel:</strong> Overstay records are maintained in Brazilian immigration systems and can affect future visa applications to Brazil. The overstay may also be noted in international immigration databases and could affect applications to other countries.
                      </p>
                      <p className="leading-relaxed">
                        <strong>Repeated violations:</strong> Travelers who repeatedly overstay or who incur significant overstays may be subject to formal deportation proceedings, entry bans, or permanent bars from returning to Brazil.
                      </p>
                      <p className="leading-relaxed">
                        <strong>If you cannot depart on time:</strong> Contact the nearest Brazilian Federal Police immigration office immediately — before your authorized stay expires. Proactively reporting and paying any applicable processing fees is treated significantly more favorably than being apprehended after the fact.
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
                This guide is compiled from official Brazilian government immigration sources. Entry requirements — including visa-free agreements, eVisa eligibility, and stay duration rules — can change. Always verify current requirements before booking travel.
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
                  <li>• Brazilian Ministry of Justice and Public Security — gov.br/mj</li>
                  <li>• Brazilian Federal Police (Immigration) — gov.br/pf (Polícia Federal)</li>
                  <li>• Brazilian Ministry of Foreign Affairs (Itamaraty) — gov.br/mre</li>
                  <li>• International Air Transport Association (IATA) Timatic Database</li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">
                  <strong>Important:</strong> Visa-free access lists and eVisa eligibility are subject to change. Always verify with the Brazilian Federal Police, the Ministry of Foreign Affairs, or your nearest Brazilian consulate before booking.
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

                <Link href="/visa-guides/country-entry-requirements/mexico-2026" className="group">
                  <Card className="transition-all duration-200 hover:shadow-lg hover:border-teal-200">
                    <CardContent className="flex items-center justify-between p-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                          Mexico Entry Requirements 2026
                        </h3>
                        <p className="text-sm text-gray-600">
                          Visa-free access, entry conditions, and stay limits for Mexico
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/visa-guides/country-entry-requirements/united-states-2026" className="group">
                  <Card className="transition-all duration-200 hover:shadow-lg hover:border-teal-200">
                    <CardContent className="flex items-center justify-between p-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                          United States Entry Requirements 2026
                        </h3>
                        <p className="text-sm text-gray-600">
                          ESTA, B-1/B-2 visa, and entry conditions for the United States
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
                          Plan multi-country trips and check visa requirements for your itinerary
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
