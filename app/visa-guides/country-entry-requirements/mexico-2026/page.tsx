import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, XCircle, FileText, ArrowRight, Clock, AlertTriangle, Shield, Wallet, Plane, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQBlock from '@/components/visa-guides/FAQBlock';
import { canonicalUrl, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';
import { articleJsonLd } from '@/lib/seo-links';

const LAST_UPDATED = '2026-02-21';

export const metadata: Metadata = {
  title: 'Mexico Entry Requirements in 2026 (Tourist Visa Guide) | VisaInfoGuide',
  description: 'Complete Mexico entry requirements for 2026. Visa-free access, entry with a US or Schengen visa, FMM form, required documents, stay duration limits, and overstay penalties for all nationalities.',
  alternates: {
    canonical: canonicalUrl('/visa-guides/country-entry-requirements/mexico-2026'),
  },
  openGraph: {
    title: 'Mexico Entry Requirements in 2026 (Tourist Visa Guide)',
    description: 'Complete Mexico entry requirements for 2026. Visa-free access, entry with a US or Schengen visa, required documents, stay limits, and overstay penalties for all nationalities.',
    type: 'article',
    url: canonicalUrl('/visa-guides/country-entry-requirements/mexico-2026'),
    images: [{
      url: canonicalUrl('/og/legal-og'),
      width: 1200,
      height: 630,
      alt: 'Mexico Entry Requirements 2026',
    }],
    siteName: 'VisaInfoGuide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mexico Entry Requirements in 2026 (Tourist Visa Guide)',
    description: 'Mexico visa-free access, FMM form, entry with US or Schengen visa, stay limits, and overstay penalties for 2026.',
    images: [canonicalUrl('/og/legal-og')],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqs = [
  {
    question: 'Do US citizens need a visa for Mexico?',
    answer: 'No, US citizens do not need a visa to enter Mexico for tourism, transit, or short business visits. American passport holders can enter visa-free and are typically granted up to 180 days by the immigration officer at the port of entry. US citizens should carry their US passport (not just a passport card, which is valid only at land borders) and be prepared to show proof of onward travel and sufficient funds if requested.',
  },
  {
    question: 'How long can I stay in Mexico as a tourist?',
    answer: 'Mexico allows tourist stays of up to 180 days for most visa-free nationalities. However, the exact number of days is determined by the immigration officer (Agente de Migración) at the port of entry and is written on your entry permit or stamped in your passport. You are not automatically entitled to 180 days — the officer may grant a shorter stay based on your itinerary, travel history, or other factors. Always check the number granted and ensure you depart before that date.',
  },
  {
    question: 'Can Indians enter Mexico with a US visa?',
    answer: 'Yes. Indian passport holders who hold a valid, unexpired US visa (B1/B2 or other categories) can enter Mexico without obtaining a separate Mexican tourist visa. The same benefit applies to holders of valid Schengen visas, UK visas, Canadian visas, and Japanese visas. The third-country visa must be valid (not expired) and the traveler must meet all other entry conditions. Indian nationals without one of these qualifying visas must apply for a Mexican tourist visa (visa de turista) at a Mexican consulate before travel.',
  },
  {
    question: 'Do I need an FMM form to enter Mexico?',
    answer: 'The Forma Migratoria Múltiple (FMM) was Mexico\'s traditional paper entry permit. As of 2021, the FMM has been largely digitized and integrated into Mexico\'s electronic immigration system. For air arrivals at major international airports, the FMM is now processed electronically and you may no longer need to complete a paper form. However, travelers entering by land or sea, or arriving at smaller airports, may still encounter the paper FMM. Check with your airline or the Mexican immigration authority (INM) for the latest requirements applicable to your entry point.',
  },
  {
    question: 'Can I extend my stay in Mexico?',
    answer: 'Yes, it is possible to extend a tourist stay in Mexico beyond the initial days granted, up to the maximum of 180 days total. Extensions must be requested in person at a local office of Mexico\'s National Migration Institute (Instituto Nacional de Migración, INM) before your current authorized stay expires. You will need to provide a reason for the extension, show proof of sufficient funds, and pay a fee. Extensions are not guaranteed and are granted at the discretion of INM officers.',
  },
  {
    question: 'What happens if I overstay in Mexico?',
    answer: 'Overstaying your authorized period in Mexico results in administrative fines assessed by immigration authorities. The fine amount depends on the number of days overstayed. Fines are typically payable at the airport or border crossing when you depart. Significant or repeated overstays can result in being flagged in Mexico\'s immigration database, leading to difficulties re-entering Mexico in the future and potential temporary entry bans. Unlike some countries, Mexico does not typically arrest tourists for overstaying, but the fine must be paid before you are permitted to leave.',
  },
];

export default function MexicoEntryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Visa Guides', url: '/visa-guides' },
            { name: 'Country Entry Requirements', url: '/visa-guides/country-entry-requirements' },
            { name: 'Mexico', url: '/visa-guides/country-entry-requirements/mexico-2026' },
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
            headline: 'Mexico Entry Requirements in 2026 (Tourist Visa Guide)',
            description: 'Complete Mexico entry requirements guide including visa-free access, entry with a US or Schengen visa, FMM form, required documents, stay duration, and overstay penalties.',
            datePublished: LAST_UPDATED,
            dateModified: LAST_UPDATED,
            url: 'https://visainfoguide.com/visa-guides/country-entry-requirements/mexico-2026',
          })),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <Breadcrumbs
            items={[
              { name: 'Visa Guides', url: '/visa-guides' },
              { name: 'Country Entry Requirements', url: '/visa-guides/country-entry-requirements' },
              { name: 'Mexico', url: '/visa-guides/country-entry-requirements/mexico-2026' },
            ]}
          />

          <header className="mt-8 mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">🇲🇽</span>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Mexico Entry Requirements in 2026
                </h1>
                <p className="text-xl text-gray-600 mt-2">Tourist Visa Guide</p>
              </div>
            </div>

            <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg mb-8">
              <p className="text-lg text-gray-800 leading-relaxed">
                Mexico allows <strong>visa-free entry to citizens of over 60 countries</strong> for tourism and short business visits, and also grants entry to travelers from many other nationalities who hold a valid US, UK, Canadian, Japanese, or Schengen visa — even without a separate Mexican visa. The pathway available to you depends entirely on your passport nationality and travel purpose. Use our <Link href="/visa-guides/do-i-need-a-visa" className="text-teal-600 hover:text-teal-700 font-medium underline">Do I Need a Visa</Link> checker or the <Link href="/" className="text-teal-600 hover:text-teal-700 font-medium underline">Trip Visa Finder</Link> to confirm your specific requirements before booking.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">60+</div>
                  <div className="text-sm text-gray-600">Visa-Free Nations</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">FMM</div>
                  <div className="text-sm text-gray-600">Entry Permit</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">180</div>
                  <div className="text-sm text-gray-600">Max Stay Days</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Shield className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">Duration</div>
                  <div className="text-sm text-gray-600">Passport Validity</div>
                </CardContent>
              </Card>
            </div>
          </header>

          <article className="prose prose-lg max-w-none">

            <section id="visa-free" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Who Can Enter Mexico Visa-Free?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Mexico extends <Link href="/visa-guides/travel-visa-rules#visa-free" className="text-teal-600 hover:text-teal-700 font-medium underline">visa-free entry</Link> to passport holders from over 60 countries. Eligible travelers are admitted at the port of entry without needing to arrange a visa in advance, and are typically permitted to stay for tourism or short business visits for up to 180 days. The precise duration granted on any single entry is determined by the immigration officer and is recorded on your entry permit.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card className="border-l-4 border-teal-500">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Americas &amp; Oceania</h3>
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">
                      Citizens of these countries enter visa-free for up to 180 days:
                    </p>
                    <ul className="grid grid-cols-2 gap-1 text-sm text-gray-700">
                      {['United States', 'Canada', 'Brazil', 'Argentina', 'Chile', 'Colombia', 'Peru', 'Australia', 'New Zealand'].map((c) => (
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Europe &amp; Asia-Pacific</h3>
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">
                      EU/EEA member states, plus additional visa-free countries:
                    </p>
                    <ul className="grid grid-cols-2 gap-1 text-sm text-gray-700">
                      {['United Kingdom', 'Germany', 'France', 'Italy', 'Spain', 'Netherlands', 'Japan', 'South Korea', 'Singapore', 'Switzerland', 'Norway', 'Sweden'].map((c) => (
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
                Visa-free entry permits tourism, transit, and short business visits. It does not authorize any form of employment. The stay limit is 180 days per entry, not per year — there is no formal restriction on how frequently you may re-enter, though officers may question travelers who make very frequent visits.
              </p>
            </section>

            <section id="us-schengen-visa" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Entry with a Valid US, UK, Canadian, Japanese, or Schengen Visa</h2>
              <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg mb-6">
                <div className="flex items-start gap-3">
                  <Info className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-800 leading-relaxed">
                    <strong>Mexico's third-country visa rule</strong> allows nationals from many countries that would otherwise require a Mexican visa to enter Mexico without one — provided they hold a valid, unexpired visa from a qualifying country.
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                If your nationality is not on the visa-free list, you may still be able to enter Mexico without a Mexican visa if you hold a valid visa or permanent resident card issued by one of the following:
              </p>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {[
                  { country: 'United States', desc: 'Valid US visa (any category, including B1/B2 tourist visa) or US permanent resident card (Green Card)' },
                  { country: 'Canada', desc: 'Valid Canadian visa or Canadian permanent resident card' },
                  { country: 'United Kingdom', desc: 'Valid UK Standard Visitor visa or other valid UK visa' },
                  { country: 'Japan', desc: 'Valid Japanese visa' },
                  { country: 'Schengen Area', desc: 'Valid Schengen visa issued by any of the 27 Schengen member states' },
                ].map(({ country, desc }) => (
                  <Card key={country} className="border-l-4 border-teal-500">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{country}</h3>
                      <p className="text-sm text-gray-700 leading-relaxed">{desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-gray-800 text-sm leading-relaxed space-y-2">
                    <p><strong>Key conditions that must be met:</strong></p>
                    <ul className="space-y-1 ml-2">
                      <li>• The qualifying visa must be <strong>valid (not expired)</strong> at the time of entry into Mexico</li>
                      <li>• A visa that has been used only once but is still within its validity window qualifies</li>
                      <li>• Expired visas — even if the trip to Mexico follows directly from a visit to the issuing country — do not qualify</li>
                      <li>• The traveler must still meet all other Mexican entry requirements (onward ticket, sufficient funds, etc.)</li>
                      <li>• This rule does not apply to all nationalities — verify with INM or the Mexican consulate for your specific passport</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section id="tourist-visa" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Who Needs a Mexican Tourist Visa?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Travelers whose nationality is not covered by the visa-free program and who do not hold a qualifying US, UK, Canadian, Japanese, or Schengen visa must obtain a Mexican tourist visa (visa de turista) before traveling. Use our <Link href="/visa-guides/do-i-need-a-visa" className="text-teal-600 hover:text-teal-700 font-medium underline">Do I Need a Visa</Link> tool to determine which pathway applies to your passport.
              </p>
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Mexican Tourist Visa Application Process</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Applications are submitted in person at the nearest <strong>Mexican consulate or embassy</strong> in your country of residence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Standard processing time is typically <strong>5 to 10 business days</strong>, though this varies by consulate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Required documents typically include a completed application form, valid passport, passport-size photos, proof of travel itinerary, proof of accommodation, and evidence of sufficient funds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Mexico does not offer an online eVisa portal for tourist visas — all applications must go through a consulate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>A visa fee applies; the amount varies by nationality and consulate</span>
                  </li>
                </ul>
              </div>
              <p className="text-gray-700 leading-relaxed">
                A Mexican tourist visa is typically granted as a single-entry or multiple-entry visa valid for stays of up to 180 days. The visa category for standard tourism is the <strong>Visa de No Inmigrante (Turista)</strong>.
              </p>
            </section>

            <section id="required-documents" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Required Documents at Entry</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                All travelers entering Mexico — including visa-free nationals — must meet standard entry requirements. Mexican immigration officers (Agentes de Migración) have authority to deny entry to anyone who does not satisfy these conditions.
              </p>

              <div className="grid gap-6">
                <Card className="border-l-4 border-teal-500">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Shield className="w-8 h-8 text-teal-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Passport Validity</h3>
                        <p className="text-gray-700 leading-relaxed">
                          Mexico requires your passport to be valid for the <strong>full duration of your intended stay</strong>. Unlike many countries, Mexico does not enforce a 6-month beyond-departure-date rule for most nationalities — but your passport must not expire during your trip. Airlines may apply stricter rules, so review our guide on <Link href="/visa-guides/travel-visa-rules#passport-validity" className="text-teal-600 hover:text-teal-700 font-medium underline">passport validity rules</Link> before traveling.
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
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Forma Migratoria Múltiple (FMM)</h3>
                        <p className="text-gray-700 leading-relaxed">
                          The FMM is Mexico's entry permit document. For air arrivals at major airports, the FMM is now largely processed electronically through the immigration system and airlines may distribute digital forms during check-in. Land border crossers and those arriving at smaller airports may still need to complete a paper FMM. The FMM records the number of days authorized — <strong>keep it safe and return it when you depart</strong>, as you may be asked to surrender it at the exit point.
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
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Proof of Onward Travel</h3>
                        <p className="text-gray-700 leading-relaxed">
                          A confirmed <Link href="/visa-guides/travel-visa-rules#onward-travel" className="text-teal-600 hover:text-teal-700 font-medium underline">onward or return ticket</Link> demonstrating you will depart Mexico before your authorized stay expires. Airlines typically check this at boarding; immigration officers may also ask for it at the port of entry.
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
                          Mexico requires travelers to demonstrate they have <Link href="/visa-guides/travel-visa-rules#proof-of-funds" className="text-teal-600 hover:text-teal-700 font-medium underline">sufficient funds</Link> to cover their stay without working illegally. While no fixed minimum is officially mandated, having access to a credit card, debit card, or bank statement showing a reasonable balance is advisable. Officers may ask at any port of entry.
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
                          Immigration officers may ask where you will be staying in Mexico. A hotel reservation confirmation, Airbnb booking, or an invitation letter from a host in Mexico can satisfy this requirement. Having this information readily available avoids delays at immigration.
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
                  Mexico is unusually generous compared to many countries: visa-free visitors may be authorized to stay for <strong>up to 180 days per entry</strong>. However, this is the maximum — not the default. The actual duration granted is at the discretion of the immigration officer and is written on your FMM or stamped in your passport.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If the officer writes fewer days than you need, you can request a correction at the time of entry by politely explaining your travel plans. Once you have left the immigration desk, changing the authorized duration requires visiting an INM office.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Extensions of stay beyond the days originally granted are possible but must be requested <strong>before the current authorization expires</strong> at a local INM office. The total stay including any extension cannot exceed 180 days.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  There is no formal limit on how many times per year you can enter Mexico as a tourist, but immigration officers may deny entry or grant reduced stays to travelers who appear to be living in Mexico on repeated tourist entries rather than visiting temporarily.
                </p>
              </div>
            </section>

            <section id="overstay" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Overstay Penalties in Mexico</h2>
              <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-red-900 mb-3">Administrative Fines and Entry Restrictions</h3>
                    <div className="space-y-3 text-gray-800">
                      <p className="leading-relaxed">
                        <strong>Fines:</strong> Overstaying your authorized period in Mexico results in an administrative fine calculated based on the number of days overstayed. The fine is assessed by INM officers at the airport or border crossing when you attempt to depart. Payment must be made before you are permitted to leave Mexico.
                      </p>
                      <p className="leading-relaxed">
                        <strong>Immigration record:</strong> Overstays are recorded in Mexico's immigration database. Even minor overstays create a record that immigration officers can see on future visits and may use to justify denying entry or granting shorter stay durations on subsequent trips.
                      </p>
                      <p className="leading-relaxed">
                        <strong>Possible entry restrictions:</strong> Significant or repeated overstays can result in temporary entry bans from Mexico. The duration and severity of the restriction depends on the circumstances of the overstay.
                      </p>
                      <p className="leading-relaxed">
                        <strong>If you realize you have overstayed:</strong> Contact a local INM office before attempting to depart. Proactively regularizing your situation may reduce the fine and mitigate longer-term consequences. Do not ignore an overstay and simply attempt to leave — this will be flagged at the border.
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
                This guide is compiled from official Mexican government immigration sources. Entry requirements can change — always verify current policy before booking travel.
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
                  <li>• Mexican National Migration Institute (Instituto Nacional de Migración, INM) — gob.mx/inm</li>
                  <li>• Government of Mexico Official Portal — gob.mx</li>
                  <li>• Mexican Ministry of Foreign Affairs (Secretaría de Relaciones Exteriores) — gob.mx/sre</li>
                  <li>• International Air Transport Association (IATA) Timatic Database</li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">
                  <strong>Important:</strong> Entry requirements can change without notice. Always verify current requirements with INM or your nearest Mexican embassy or consulate before booking international travel.
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

                <Link href="/visa-guides/country-entry-requirements/united-states-2026" className="group">
                  <Card className="transition-all duration-200 hover:shadow-lg hover:border-teal-200">
                    <CardContent className="flex items-center justify-between p-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                          United States Entry Requirements 2026
                        </h3>
                        <p className="text-sm text-gray-600">
                          ESTA, B1/B2 visa, and entry conditions for the United States
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/visa-guides/country-entry-requirements/canada-2026" className="group">
                  <Card className="transition-all duration-200 hover:shadow-lg hover:border-teal-200">
                    <CardContent className="flex items-center justify-between p-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                          Canada Entry Requirements 2026
                        </h3>
                        <p className="text-sm text-gray-600">
                          eTA, visitor visa, and entry conditions for Canada
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
