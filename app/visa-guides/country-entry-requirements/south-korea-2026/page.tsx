import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, FileText, ArrowRight, Clock, AlertTriangle, Shield, Wallet, Plane, Info, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQBlock from '@/components/visa-guides/FAQBlock';
import { canonicalUrl, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';
import { articleJsonLd } from '@/lib/seo-links';

const LAST_UPDATED = '2026-02-22';

export const metadata: Metadata = {
  title: 'South Korea Entry Requirements in 2026 (Tourist Visa Guide) | VisaInfoGuide',
  description: 'Complete South Korea entry requirements for 2026. Visa-free access, K-ETA electronic travel authorization, C-3 tourist visa, required documents, stay duration, and overstay penalties for all nationalities.',
  alternates: {
    canonical: canonicalUrl('/visa-guides/country-entry-requirements/south-korea-2026'),
  },
  openGraph: {
    title: 'South Korea Entry Requirements in 2026 (Tourist Visa Guide)',
    description: 'Complete South Korea entry requirements for 2026. Visa-free access, K-ETA authorization, C-3 tourist visa, required documents, and overstay penalties for all nationalities.',
    type: 'article',
    url: canonicalUrl('/visa-guides/country-entry-requirements/south-korea-2026'),
    images: [{
      url: canonicalUrl('/og/legal-og'),
      width: 1200,
      height: 630,
      alt: 'South Korea Entry Requirements 2026',
    }],
    siteName: 'VisaInfoGuide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'South Korea Entry Requirements in 2026 (Tourist Visa Guide)',
    description: 'South Korea visa-free access, K-ETA authorization, C-3 tourist visa, stay limits, and overstay penalties for 2026.',
    images: [canonicalUrl('/og/legal-og')],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqs = [
  {
    question: 'Do US citizens need a visa for South Korea?',
    answer: 'No, US citizens do not need a visa to enter South Korea for tourism or short-term visits. American passport holders are visa-exempt and are typically permitted to stay for up to 90 days per visit. However, US citizens were previously required to obtain a K-ETA (Korea Electronic Travel Authorization) before arrival. South Korea has periodically adjusted K-ETA requirements for certain nationalities, so US citizens should verify whether the K-ETA requirement is currently in force before booking travel. Always check the latest guidance from the Korea Immigration Service or the nearest Korean embassy.',
  },
  {
    question: 'Do I need a K-ETA for South Korea?',
    answer: 'The K-ETA (Korea Electronic Travel Authorization) is required for many visa-exempt travelers before arriving in South Korea by air. It is applied for online in advance through the official K-ETA website (k-eta.go.kr) and is typically approved within 72 hours, though processing can take longer. A K-ETA is valid for multiple entries over 2 years (or until your passport expires, whichever is earlier) and allows stays of up to 90 days per visit. K-ETA requirements change periodically, and certain nationalities have been temporarily exempted from the requirement. Confirm current requirements before your trip.',
  },
  {
    question: 'How long can I stay in South Korea as a tourist?',
    answer: 'The permitted stay duration depends on your nationality. Most visa-exempt travelers from Western nations (US, EU, UK, Australia, Canada, Japan, etc.) are permitted to stay for up to 90 days per visit. Some nationalities are permitted only 30 days. The exact duration authorized is determined at the port of entry by the immigration officer and is stamped in your passport. You are not entitled to the full permitted maximum on every visit — officers can grant shorter stays based on your purpose of visit, travel history, or other factors.',
  },
  {
    question: 'Can I work remotely in South Korea on a tourist entry?',
    answer: 'South Korea does not currently have a specific digital nomad or remote work visa. Tourist entries (visa-free or on a C-3 short-term visitor visa) do not authorize any form of work, including remote work for foreign employers. Performing any paid activity while on a tourist entry is technically prohibited under Korean immigration law. Travelers who plan to work remotely for extended periods should consult a Korean immigration attorney about appropriate visa categories, such as the D-10 job seeker visa or other long-term options.',
  },
  {
    question: 'Is K-ETA required for transit through South Korea?',
    answer: 'Transit passengers who remain in the international transit area of a South Korean airport and do not clear immigration do not require a K-ETA or a visa. However, if you plan to exit the transit zone and enter South Korea during a layover — even briefly — you will need to meet regular entry requirements, including a valid K-ETA (if applicable for your nationality) or a South Korean visa. Check whether your airline itinerary involves clearing immigration or staying airside, and verify current requirements with Korea Immigration Service.',
  },
  {
    question: 'What happens if I overstay in South Korea?',
    answer: 'Overstaying your authorized period in South Korea carries serious consequences. You will be subject to a financial fine, and immigration authorities have the power to detain overstayers pending deportation proceedings. You will also receive an entry ban that prevents you from returning to South Korea for a period determined by the length and circumstances of the overstay — bans can range from 1 year to a permanent ban for severe cases. Overstays are recorded in immigration databases and will negatively affect future visa applications to South Korea and may affect visa applications to other countries that share immigration intelligence. If you realize you cannot depart on time, contact the Korea Immigration Service immediately to discuss your options before your authorized stay expires.',
  },
];

export default function SouthKoreaEntryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Visa Guides', url: '/visa-guides' },
            { name: 'Country Entry Requirements', url: '/visa-guides/country-entry-requirements' },
            { name: 'South Korea', url: '/visa-guides/country-entry-requirements/south-korea-2026' },
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
            headline: 'South Korea Entry Requirements in 2026 (Tourist Visa Guide)',
            description: 'Complete South Korea entry requirements guide including visa-free access, K-ETA authorization, C-3 tourist visa, required documents, stay duration, and overstay penalties.',
            datePublished: LAST_UPDATED,
            dateModified: LAST_UPDATED,
            url: 'https://visainfoguide.com/visa-guides/country-entry-requirements/south-korea-2026',
          })),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <Breadcrumbs
            items={[
              { name: 'Visa Guides', url: '/visa-guides' },
              { name: 'Country Entry Requirements', url: '/visa-guides/country-entry-requirements' },
              { name: 'South Korea', url: '/visa-guides/country-entry-requirements/south-korea-2026' },
            ]}
          />

          <header className="mt-8 mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">🇰🇷</span>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  South Korea Entry Requirements in 2026
                </h1>
                <p className="text-xl text-gray-600 mt-2">Tourist Visa Guide</p>
              </div>
            </div>

            <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg mb-8">
              <p className="text-lg text-gray-800 leading-relaxed">
                South Korea allows <strong>visa-free entry for eligible passport holders</strong> for stays typically ranging from 30 to 90 days, depending on nationality. Many visa-exempt travelers must also obtain a <strong>K-ETA (Korea Electronic Travel Authorization)</strong> before arrival — an electronic pre-clearance that is not a visa but is mandatory for most nationalities traveling by air. The exact entry pathway — visa-free, K-ETA, or full tourist visa — depends on your nationality and purpose of visit. Use our <Link href="/visa-guides/do-i-need-a-visa" className="text-teal-600 hover:text-teal-700 font-medium underline">Do I Need a Visa</Link> checker or the <Link href="/" className="text-teal-600 hover:text-teal-700 font-medium underline">Trip Visa Finder</Link> to confirm your requirements before booking.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">100+</div>
                  <div className="text-sm text-gray-600">Visa-Free Nations</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Globe className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">K-ETA</div>
                  <div className="text-sm text-gray-600">Pre-Authorization</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">30–90</div>
                  <div className="text-sm text-gray-600">Max Stay Days</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Shield className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">6 Mo.</div>
                  <div className="text-sm text-gray-600">Passport Validity</div>
                </CardContent>
              </Card>
            </div>
          </header>

          <article className="prose prose-lg max-w-none">

            <section id="visa-free" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Who Can Enter South Korea Visa-Free?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                South Korea maintains <Link href="/visa-guides/travel-visa-rules#visa-free" className="text-teal-600 hover:text-teal-700 font-medium underline">visa-free entry agreements</Link> with over 100 countries. Citizens of eligible nations can enter without arranging a visa in advance, though many are still required to obtain a K-ETA before departure. The permitted stay duration varies by nationality:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card className="border-l-4 border-teal-500">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">90-Day Visa-Free Entry</h3>
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">
                      Citizens of these countries are typically permitted to stay up to 90 days:
                    </p>
                    <ul className="grid grid-cols-2 gap-1 text-sm text-gray-700">
                      {['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Australia', 'New Zealand', 'Japan', 'Singapore', 'Switzerland', 'Netherlands', 'Sweden'].map((c) => (
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">30-Day Visa-Free Entry</h3>
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">
                      Some nationalities receive a shorter visa-free allowance of 30 days:
                    </p>
                    <ul className="grid grid-cols-2 gap-1 text-sm text-gray-700">
                      {['Thailand', 'Malaysia', 'Philippines', 'Indonesia', 'Hong Kong', 'Macau', 'Turkey', 'Brazil', 'Mexico', 'Chile'].map((c) => (
                        <li key={c} className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-blue-600 flex-shrink-0" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-gray-500 mt-3">Stay allowances are subject to bilateral agreement changes. Verify before traveling.</p>
                  </CardContent>
                </Card>
              </div>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-800 text-sm leading-relaxed">
                    <strong>K-ETA requirement:</strong> Being visa-exempt does not automatically mean you can board without pre-authorization. Many visa-free nationalities must obtain a K-ETA before traveling to South Korea by air. See the K-ETA section below. Some nationalities have been granted temporary K-ETA exemptions — confirm the current status for your passport before booking.
                  </p>
                </div>
              </div>
            </section>

            <section id="k-eta" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What Is the Korea Electronic Travel Authorization (K-ETA)?</h2>
              <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg mb-6">
                <div className="flex items-start gap-3">
                  <Info className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-800 leading-relaxed">
                    <strong>K-ETA is not a visa.</strong> It is an electronic pre-screening and travel authorization required for visa-exempt travelers arriving by air at South Korean airports. Obtaining a K-ETA does not guarantee entry — final admission is determined by the immigration officer at the port of entry.
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                The Korea Electronic Travel Authorization (K-ETA) is South Korea's equivalent of systems like the US ESTA or Canada's eTA. It is a mandatory online pre-authorization for most <Link href="/visa-guides/travel-visa-rules#eta" className="text-teal-600 hover:text-teal-700 font-medium underline">eTA-class</Link> travelers before boarding a flight or ferry to South Korea. Key details:
              </p>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {[
                  {
                    title: 'Application',
                    icon: <FileText className="w-6 h-6 text-teal-600" />,
                    desc: 'Applied for online at the official K-ETA portal (k-eta.go.kr). The fee is approximately USD 10. Apply at least 72 hours before departure, though earlier is recommended.',
                  },
                  {
                    title: 'Validity',
                    icon: <Clock className="w-6 h-6 text-orange-600" />,
                    desc: 'A K-ETA is valid for 2 years from the date of issue, or until your passport expires — whichever comes first. During this period you may make multiple visits to South Korea.',
                  },
                  {
                    title: 'Stay per visit',
                    icon: <Shield className="w-6 h-6 text-blue-600" />,
                    desc: 'Each visit under K-ETA allows a stay of up to 90 days. The K-ETA does not guarantee a 90-day stay — the officer grants the authorized duration at entry.',
                  },
                ].map(({ title, icon, desc }) => (
                  <Card key={title} className="border-l-4 border-teal-500">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        {icon}
                        <h3 className="font-semibold text-gray-900">{title}</h3>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Who Needs K-ETA and Who Is Exempt?</h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  K-ETA is required for most visa-exempt nationalities traveling to South Korea by air. However, South Korea has periodically issued temporary K-ETA exemptions for travelers from specific countries (including some EU/EEA nations, the US, Canada, Australia, Japan, and others) during high-traffic periods or as policy adjustments.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  Travelers who are already visa holders (holding a South Korean C-3, D, E, F, or other visa) do not need K-ETA — their visa serves as the pre-authorization. Transit passengers who do not clear immigration are also exempt.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Because K-ETA exemptions change frequently, always verify the current requirement for your specific nationality directly with the Korea Immigration Service or the official K-ETA portal before your trip.
                </p>
              </div>
            </section>

            <section id="tourist-visa" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Who Needs a South Korean Tourist Visa?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Travelers from countries that do not have a visa-free agreement with South Korea must obtain a tourist visa (C-3 short-term visitor visa) before traveling. Use our <Link href="/visa-guides/do-i-need-a-visa" className="text-teal-600 hover:text-teal-700 font-medium underline">Do I Need a Visa</Link> tool to confirm which requirement applies to your passport.
              </p>
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">C-3 Short-Term Visitor Visa Application Process</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Applications are submitted at the nearest <strong>South Korean embassy or consulate</strong> in your country of residence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>The C-3 visa covers tourism, family visits, and short business activities for stays of <strong>up to 90 days</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Standard processing time is typically <strong>5 to 10 business days</strong>, though this varies by consulate and nationality</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Required documents typically include a completed application form, valid passport, passport-size photo, proof of travel itinerary, proof of accommodation, bank statements, and employment or enrollment documentation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>South Korea offers an <strong>online visa application system (Visa Portal)</strong> for certain nationalities and missions — check the South Korean embassy website for your country</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>A visa application fee applies and varies by nationality and consulate</span>
                  </li>
                </ul>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Travelers holding a C-3 visa do not additionally require a K-ETA — the visa itself serves as the entry authorization. The C-3 visa may be issued as a single-entry or multiple-entry visa depending on your nationality and the consulate's assessment.
              </p>
            </section>

            <section id="required-documents" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Required Documents at Entry</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                All travelers entering South Korea — regardless of visa status — must satisfy standard entry requirements. Korean immigration officers have full discretion to deny entry if any condition is not met.
              </p>

              <div className="grid gap-6">
                <Card className="border-l-4 border-teal-500">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Shield className="w-8 h-8 text-teal-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Passport Validity</h3>
                        <p className="text-gray-700 leading-relaxed">
                          South Korea recommends — and most airlines require — that your passport be valid for at least <strong>6 months beyond your intended date of departure</strong> from South Korea. Review our guide on <Link href="/visa-guides/travel-visa-rules#passport-validity" className="text-teal-600 hover:text-teal-700 font-medium underline">passport validity rules</Link> for full details. A passport that expires during your trip will result in denial of boarding and entry.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Globe className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Approved K-ETA (If Applicable)</h3>
                        <p className="text-gray-700 leading-relaxed">
                          Visa-exempt travelers subject to the K-ETA requirement must present proof of an approved K-ETA when checking in for their flight. Airlines are required to verify K-ETA status before boarding. Travelers who arrive without a required K-ETA may be denied boarding or entry. The K-ETA approval is linked to your passport number — carry the same passport you used when applying.
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
                          A confirmed <Link href="/visa-guides/travel-visa-rules#onward-travel" className="text-teal-600 hover:text-teal-700 font-medium underline">return or onward ticket</Link> showing you will depart South Korea before your authorized stay expires. Airlines typically check this at check-in; immigration officers may also ask at Incheon or other ports of entry.
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
                          Immigration officers may request evidence of <Link href="/visa-guides/travel-visa-rules#proof-of-funds" className="text-teal-600 hover:text-teal-700 font-medium underline">sufficient funds</Link> to cover your stay. Bank statements, credit cards, or a combination are acceptable. South Korea does not publish a fixed per-day minimum, but having access to the equivalent of at least USD 50–100 per day is a common benchmark. The requirement is enforced more strictly for travelers with limited travel history to South Korea.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-gray-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <FileText className="w-8 h-8 text-gray-500 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Proof of Accommodation</h3>
                        <p className="text-gray-700 leading-relaxed">
                          Hotel reservation confirmations, Airbnb bookings, or an invitation letter from a host in South Korea help satisfy the immigration officer's requirement to know where you will be staying. Having your accommodation details readily available at immigration — including address and contact information — avoids unnecessary delays.
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
                  The permitted tourist stay in South Korea depends on your nationality. Most travelers from major Western nations, Japan, and several Southeast Asian countries are permitted stays of <strong>up to 90 days</strong>. Some nationalities are limited to <strong>30 days</strong> per visit. The exact duration authorized on any specific entry is stamped in your passport by the immigration officer and may be less than the maximum if there are concerns about the purpose of your visit or your travel history.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  South Korea does not permit extensions of tourist (visa-exempt) stays within the country. If you need to stay longer than your authorized period, you must depart South Korea and re-enter — or apply for an appropriate long-term visa at a Korean consulate abroad before your trip.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  There is no official limit on how many times you can enter South Korea on visa-free status per year. However, immigration officers monitor travelers who make frequent short trips and may deny entry or ask detailed questions if they suspect you are effectively residing in South Korea on successive tourist entries.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  If you have a valid South Korean visa (C-3 or other category), the stay duration is governed by the visa conditions — typically up to 90 days per visit within the visa's validity period.
                </p>
              </div>
            </section>

            <section id="overstay" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Overstay Penalties in South Korea</h2>
              <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-red-900 mb-3">Fines, Detention, and Entry Bans</h3>
                    <div className="space-y-3 text-gray-800">
                      <p className="leading-relaxed">
                        <strong>Fines:</strong> Overstaying your authorized stay in South Korea results in an administrative fine. The fine increases with the length of the overstay and is assessed by the Korea Immigration Service at the time of departure.
                      </p>
                      <p className="leading-relaxed">
                        <strong>Detention:</strong> South Korean immigration authorities have the power to detain overstayers pending deportation proceedings. Extended overstays or overstays combined with other immigration violations increase the likelihood of detention rather than voluntary departure with a fine.
                      </p>
                      <p className="leading-relaxed">
                        <strong>Entry bans:</strong> All overstayers receive an entry ban from South Korea. The duration depends on the severity of the overstay: short overstays may result in a 1-year ban, while longer overstays or repeat violations can lead to bans of 5 years or more. Serious cases may result in a permanent ban.
                      </p>
                      <p className="leading-relaxed">
                        <strong>Impact on future visa applications:</strong> An overstay record in South Korea is visible to immigration officers in South Korea and may be shared with partner immigration systems. This can negatively affect applications for South Korean visas, as well as visa applications for Japan, the US, and other countries.
                      </p>
                      <p className="leading-relaxed">
                        <strong>If you cannot depart on time:</strong> Contact the nearest Korea Immigration Service office immediately — before your authorized stay expires if at all possible. Proactively reporting your situation is treated more favorably than being discovered after the fact.
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
                This guide is compiled from official South Korean government immigration sources. Entry requirements — including K-ETA requirements — change frequently. Always verify current policy before booking travel.
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
                  <li>• Korea Immigration Service (출입국·외국인정책본부) — immigration.go.kr</li>
                  <li>• Official K-ETA Portal — k-eta.go.kr</li>
                  <li>• Ministry of Foreign Affairs Republic of Korea — mofa.go.kr</li>
                  <li>• International Air Transport Association (IATA) Timatic Database</li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">
                  <strong>Important:</strong> K-ETA requirements in particular are subject to change. Always verify the current K-ETA status for your nationality with the Korea Immigration Service or the official K-ETA portal before booking.
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

                <Link href="/visa-guides/country-entry-requirements/japan-2026" className="group">
                  <Card className="transition-all duration-200 hover:shadow-lg hover:border-teal-200">
                    <CardContent className="flex items-center justify-between p-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                          Japan Entry Requirements 2026
                        </h3>
                        <p className="text-sm text-gray-600">
                          Visit Japan Web, tourist visa, and entry conditions for Japan
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
                          SG Arrival Card, visa exemptions, and entry conditions for Singapore
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
