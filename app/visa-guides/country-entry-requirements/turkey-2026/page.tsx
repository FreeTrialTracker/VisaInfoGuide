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
  title: 'Turkey Entry Requirements in 2026 (Tourist Visa Guide) | VisaInfoGuide',
  description: 'Complete Turkey entry requirements for 2026. Visa-free access, official eVisa system, embassy visa, required documents, stay duration, and overstay penalties for all nationalities.',
  alternates: {
    canonical: canonicalUrl('/visa-guides/country-entry-requirements/turkey-2026'),
  },
  openGraph: {
    title: 'Turkey Entry Requirements in 2026 (Tourist Visa Guide)',
    description: 'Complete Turkey entry requirements for 2026. Visa-free access, official eVisa system, embassy visa, required documents, and overstay penalties for all nationalities.',
    type: 'article',
    url: canonicalUrl('/visa-guides/country-entry-requirements/turkey-2026'),
    images: [{
      url: canonicalUrl('/og/legal-og'),
      width: 1200,
      height: 630,
      alt: 'Turkey Entry Requirements 2026',
    }],
    siteName: 'VisaInfoGuide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Turkey Entry Requirements in 2026 (Tourist Visa Guide)',
    description: 'Turkey visa-free access, eVisa system, stay limits, and overstay penalties for 2026.',
    images: [canonicalUrl('/og/legal-og')],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqs = [
  {
    question: 'Do US citizens need a visa for Turkey?',
    answer: 'Yes, US citizens are required to obtain a visa before traveling to Turkey. American passport holders are eligible for the Turkish eVisa, which can be obtained online through the official Turkish eVisa portal (e-visa.gov.tr) before departure. The eVisa for US citizens typically permits a stay of up to 90 days within a 180-day period and allows multiple entries. US citizens should apply for the eVisa well before their travel date and ensure their passport is valid for at least 6 months beyond their intended departure from Turkey.',
  },
  {
    question: 'Can I apply for a Turkey eVisa online?',
    answer: 'Yes, Turkey offers an official eVisa system for eligible nationalities through the government portal at e-visa.gov.tr. Eligible travelers can apply online, pay the fee, and typically receive their eVisa within minutes to 24 hours. The eVisa is linked electronically to your passport — you do not receive a physical sticker. You should carry a printed or digital copy to show at the border. Note that not all nationalities are eligible for the eVisa — some must apply at a Turkish embassy or consulate, while citizens of certain countries may require a valid US, Schengen, or UK visa to qualify.',
  },
  {
    question: 'How long can I stay in Turkey as a tourist?',
    answer: 'The permitted stay in Turkey depends on your nationality and entry method. Visa-free travelers from eligible countries are typically permitted to stay 30 to 90 days depending on their passport. Most eVisa holders are permitted to stay up to 90 days within a 180-day window. The 90-day period resets after 90 days outside Turkey within the same 180-day period. Visa holders must observe the specific conditions printed on their visa. Overstaying any of these limits carries serious penalties.',
  },
  {
    question: 'Do Indians qualify for a Turkey eVisa?',
    answer: 'Indian citizens are eligible to apply for a Turkish eVisa, but there is a specific condition: Indian passport holders must hold a valid visa (such as a US, Schengen, or UK visa) to be eligible for the Turkish eVisa. Without a qualifying third-country visa, Indian nationals must apply for a traditional sticker visa at a Turkish embassy or consulate. Indian travelers should verify the most current eligibility requirements at e-visa.gov.tr before booking, as conditions may change.',
  },
  {
    question: 'Can I extend my stay in Turkey?',
    answer: 'Extending a tourist stay in Turkey is possible in limited circumstances. Tourists on visa-free or eVisa entry can apply to extend their stay at a local immigration office (Göç İdaresi) before their authorized period expires. Extensions are not guaranteed and are typically granted only for compelling reasons such as a medical emergency or force majeure. The standard approach for many travelers who wish to remain longer is to depart Turkey and re-enter, which resets the stay counter — though immigration officers may question travelers who do this repeatedly. It is always better to apply for the appropriate long-stay visa through a Turkish consulate abroad if you need an extended visit.',
  },
  {
    question: 'What happens if I overstay in Turkey?',
    answer: 'Overstaying your authorized period in Turkey is taken seriously by Turkish immigration authorities. Consequences include a financial fine assessed per day of overstay, which must be paid before departure. Travelers who overstay may be barred from re-entering Turkey for a period ranging from 1 to 5 years depending on the length of the overstay. Significant overstays may result in detention and deportation proceedings. The overstay record remains in Turkish immigration databases and may affect future visa applications to Turkey and other countries. If you realize you cannot depart on time, contact the nearest Directorate General of Migration Management office immediately.',
  },
];

export default function TurkeyEntryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Visa Guides', url: '/visa-guides' },
            { name: 'Country Entry Requirements', url: '/visa-guides/country-entry-requirements' },
            { name: 'Turkey', url: '/visa-guides/country-entry-requirements/turkey-2026' },
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
            headline: 'Turkey Entry Requirements in 2026 (Tourist Visa Guide)',
            description: 'Complete Turkey entry requirements guide including visa-free access, eVisa system, embassy visa, required documents, stay duration, and overstay penalties.',
            datePublished: LAST_UPDATED,
            dateModified: LAST_UPDATED,
            url: 'https://visainfoguide.com/visa-guides/country-entry-requirements/turkey-2026',
          })),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <Breadcrumbs
            items={[
              { name: 'Visa Guides', url: '/visa-guides' },
              { name: 'Country Entry Requirements', url: '/visa-guides/country-entry-requirements' },
              { name: 'Turkey', url: '/visa-guides/country-entry-requirements/turkey-2026' },
            ]}
          />

          <header className="mt-8 mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">🇹🇷</span>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Turkey Entry Requirements in 2026
                </h1>
                <p className="text-xl text-gray-600 mt-2">Tourist Visa Guide</p>
              </div>
            </div>

            <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg mb-8">
              <p className="text-lg text-gray-800 leading-relaxed">
                Turkey offers <strong>visa-free entry to citizens of over 70 nationalities</strong> and operates an official <strong>eVisa system</strong> for many other passport holders. Whether you need a visa, an eVisa, or qualify for visa-free access depends on your nationality and purpose of visit. Use our <Link href="/visa-guides/do-i-need-a-visa" className="text-teal-600 hover:text-teal-700 font-medium underline">Do I Need a Visa</Link> checker or the <Link href="/" className="text-teal-600 hover:text-teal-700 font-medium underline">Trip Visa Finder</Link> to confirm the exact requirements for your passport before booking travel to Turkey.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">70+</div>
                  <div className="text-sm text-gray-600">Visa-Free Nations</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Globe className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">eVisa</div>
                  <div className="text-sm text-gray-600">Online System</div>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Who Can Enter Turkey Visa-Free?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Turkey maintains <Link href="/visa-guides/travel-visa-rules#visa-free" className="text-teal-600 hover:text-teal-700 font-medium underline">visa-free entry agreements</Link> with over 70 countries. Citizens of eligible nationalities can enter Turkey without arranging any visa in advance. The permitted stay varies by nationality:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card className="border-l-4 border-teal-500">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">90-Day Visa-Free Entry</h3>
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">
                      Citizens of these countries are typically permitted to stay up to 90 days without a visa:
                    </p>
                    <ul className="grid grid-cols-2 gap-1 text-sm text-gray-700">
                      {['Germany', 'France', 'Italy', 'Spain', 'Netherlands', 'Belgium', 'Switzerland', 'Austria', 'Sweden', 'Portugal', 'Greece', 'Japan'].map((c) => (
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
                      Some nationalities receive a shorter visa-free allowance:
                    </p>
                    <ul className="grid grid-cols-2 gap-1 text-sm text-gray-700">
                      {['South Korea', 'Malaysia', 'Singapore', 'Brazil', 'Argentina', 'Morocco', 'Tunisia', 'Jordan', 'Qatar', 'Bahrain'].map((c) => (
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
                    <strong>Note on New Zealand and Ireland:</strong> Both countries currently enjoy visa-free access to Turkey. Bilateral visa agreements can change — always verify with the Turkish Ministry of Foreign Affairs before travel, especially for lesser-traveled passport combinations.
                  </p>
                </div>
              </div>
            </section>

            <section id="evisa" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Turkey eVisa System Explained</h2>
              <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg mb-6">
                <div className="flex items-start gap-3">
                  <Info className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-800 leading-relaxed">
                    Turkey's <Link href="/visa-guides/travel-visa-rules#evisa" className="text-teal-600 hover:text-teal-700 font-medium underline">eVisa</Link> is an official online travel authorization issued by the Turkish government. It is available for eligible nationalities through the government portal at e-visa.gov.tr. An eVisa is not a sticker — it is electronically linked to your passport.
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                Turkey's eVisa system allows eligible travelers to obtain their visa online without visiting an embassy. Key details about the Turkey eVisa:
              </p>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {[
                  {
                    title: 'Application',
                    icon: <FileText className="w-6 h-6 text-teal-600" />,
                    desc: 'Applied for online at e-visa.gov.tr. The process takes around 5 minutes and approval is typically granted within minutes to 24 hours. Apply before your departure date — do not apply at the last minute.',
                  },
                  {
                    title: 'Validity',
                    icon: <Clock className="w-6 h-6 text-orange-600" />,
                    desc: 'Most Turkey eVisas are valid for 180 days from the date of issue, allowing multiple entries. The maximum stay per visit is 90 days within the 180-day validity window.',
                  },
                  {
                    title: 'Eligibility',
                    icon: <Shield className="w-6 h-6 text-blue-600" />,
                    desc: 'Eligibility depends on nationality. Some passports (e.g., India) require holding a valid US, Schengen, or UK visa to qualify. Check e-visa.gov.tr for your nationality\'s requirements.',
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
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Third-Country Visa Requirement</h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  A significant rule of the Turkish eVisa system is that certain nationalities are only eligible if they hold a <strong>valid visa from the United States, a Schengen country, or the United Kingdom</strong>. This requirement applies to several South Asian, African, and other nationalities. The qualifying third-country visa must be valid at the time of applying for the Turkish eVisa.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Travelers from these nationalities who do not hold a qualifying US, Schengen, or UK visa must apply for a traditional embassy visa at a Turkish diplomatic mission. Always check the official eVisa portal for your specific passport's requirements before booking.
                </p>
              </div>
            </section>

            <section id="embassy-visa" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Who Needs to Apply at a Turkish Embassy?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Travelers who do not qualify for visa-free entry and are not eligible for the eVisa must obtain a traditional sticker visa from a Turkish embassy or consulate before traveling. Use our <Link href="/visa-guides/do-i-need-a-visa" className="text-teal-600 hover:text-teal-700 font-medium underline">Do I Need a Visa</Link> tool to check whether the embassy route applies to your passport.
              </p>
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Embassy Visa Application Process</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Applications must be submitted in person or by mail at the <strong>nearest Turkish embassy or consulate</strong> in your country of residence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Processing time is typically <strong>5 to 15 business days</strong>, depending on the consulate and nationality</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Standard documents include a completed application form, valid passport, passport photos, travel itinerary, accommodation proof, bank statements, and travel insurance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>A <strong>visa application fee</strong> is charged and varies by nationality and visa type</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Tourist visas may be issued as <strong>single-entry or multiple-entry</strong> depending on nationality and the consulate's assessment</span>
                  </li>
                </ul>
              </div>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-800 text-sm leading-relaxed">
                    <strong>Apply early:</strong> Embassy visa processing times can be unpredictable. Apply well in advance of your travel date to avoid complications if the embassy requests additional documents.
                  </p>
                </div>
              </div>
            </section>

            <section id="required-documents" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Required Documents at Entry</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                All travelers entering Turkey — regardless of visa status — must satisfy standard entry requirements. Turkish border officials have full discretion to deny entry if conditions are not met.
              </p>

              <div className="grid gap-6">
                <Card className="border-l-4 border-teal-500">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Shield className="w-8 h-8 text-teal-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Passport Validity</h3>
                        <p className="text-gray-700 leading-relaxed">
                          Turkey requires your passport to be valid for at least <strong>6 months beyond your intended date of departure</strong> from Turkey. Review our guide on <Link href="/visa-guides/travel-visa-rules#passport-validity" className="text-teal-600 hover:text-teal-700 font-medium underline">passport validity rules</Link> for full details. Airlines will deny boarding if your passport does not meet this requirement.
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
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Approved eVisa (If Applicable)</h3>
                        <p className="text-gray-700 leading-relaxed">
                          If you require an eVisa, carry a printed or digital copy of your approval email to present at the border. The eVisa is linked electronically to your passport — ensure you travel with the same passport used during the application. Airlines will check eVisa status before boarding on routes to Turkey.
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
                          A confirmed <Link href="/visa-guides/travel-visa-rules#onward-travel" className="text-teal-600 hover:text-teal-700 font-medium underline">return or onward ticket</Link> demonstrating your intention to depart Turkey before your authorized stay expires. This is routinely checked by airlines and may be requested at border control.
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
                          Turkish border officials may request <Link href="/visa-guides/travel-visa-rules#proof-of-funds" className="text-teal-600 hover:text-teal-700 font-medium underline">proof of sufficient funds</Link> to cover your stay. Bank statements, credit cards, or cash are acceptable. Turkey does not publish a strict daily minimum, but having the equivalent of at least USD 50 per day as a general reference is reasonable.
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
                  The length of your permitted stay in Turkey depends on your nationality and entry method. Visa-free travelers are generally permitted stays of <strong>30 to 90 days per visit</strong> depending on their passport. eVisa holders are typically permitted <strong>up to 90 days within a 180-day period</strong> — meaning the 90 days do not need to be consecutive, but the total days in Turkey within any rolling 180-day window cannot exceed 90.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Visa validity vs. permitted stay:</strong> Your visa or eVisa has a validity window (the period during which you may enter Turkey) and a maximum permitted stay per visit. These are different. A 180-day eVisa does not mean you can stay for 180 days — it means you can make entries within a 180-day period, staying a maximum of 90 days in total. The exact stay authorized on each entry is determined by your entry documents and the border officer.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Single vs. multiple entry:</strong> eVisa holders typically receive multiple-entry authorization. Embassy visa holders may receive single or multiple-entry visas depending on nationality and the visa type issued.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Travelers who wish to extend their stay beyond what was authorized must contact the Directorate General of Migration Management before their authorized period expires. Extensions are not guaranteed.
                </p>
              </div>
            </section>

            <section id="overstay" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Overstay Penalties in Turkey</h2>
              <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-red-900 mb-3">Fines, Bans, and Deportation</h3>
                    <div className="space-y-3 text-gray-800">
                      <p className="leading-relaxed">
                        <strong>Fines:</strong> Overstaying your authorized period in Turkey results in a daily administrative fine. Fines are assessed by immigration authorities and must be paid before departure. The amount increases with the length of the overstay.
                      </p>
                      <p className="leading-relaxed">
                        <strong>Entry bans:</strong> All overstayers receive a ban from re-entering Turkey. The duration depends on the length of the overstay — short overstays may result in a 1-year ban, while longer violations can lead to bans of 3 to 5 years or more.
                      </p>
                      <p className="leading-relaxed">
                        <strong>Deportation:</strong> Significant overstays — or overstays combined with other immigration violations — may result in formal deportation proceedings. Deportees are typically responsible for the cost of their removal from Turkey.
                      </p>
                      <p className="leading-relaxed">
                        <strong>Impact on future travel:</strong> An overstay record in Turkey is stored in immigration databases and may be visible to other countries' border systems. This can negatively affect future Turkish visa applications and visa applications to third countries.
                      </p>
                      <p className="leading-relaxed">
                        <strong>If you cannot depart on time:</strong> Contact the nearest Directorate General of Migration Management office immediately — before your authorized stay expires. Proactive self-reporting is treated more favorably than being discovered by authorities after the fact.
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
                This guide is compiled from official Turkish government sources. Entry requirements — including eVisa eligibility and bilateral visa-free agreements — can change. Always verify current requirements before booking travel.
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
                  <li>• Republic of Türkiye Ministry of Foreign Affairs — mfa.gov.tr</li>
                  <li>• Official Turkey eVisa Portal — e-visa.gov.tr</li>
                  <li>• Directorate General of Migration Management — goc.gov.tr</li>
                  <li>• International Air Transport Association (IATA) Timatic Database</li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">
                  <strong>Important:</strong> eVisa eligibility and bilateral visa-free agreements are subject to change. Always verify with the Turkish Ministry of Foreign Affairs or the official eVisa portal before booking.
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

                <Link href="/visa-guides/country-entry-requirements/germany-2026" className="group">
                  <Card className="transition-all duration-200 hover:shadow-lg hover:border-teal-200">
                    <CardContent className="flex items-center justify-between p-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                          Germany Entry Requirements 2026
                        </h3>
                        <p className="text-sm text-gray-600">
                          Schengen visa rules, visa-free access, and entry conditions for Germany
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/visa-guides/country-entry-requirements/united-arab-emirates-2026" className="group">
                  <Card className="transition-all duration-200 hover:shadow-lg hover:border-teal-200">
                    <CardContent className="flex items-center justify-between p-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                          UAE Entry Requirements 2026
                        </h3>
                        <p className="text-sm text-gray-600">
                          Visa-free access, visa on arrival, and entry conditions for the UAE
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
