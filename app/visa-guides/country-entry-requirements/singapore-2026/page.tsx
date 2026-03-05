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
  title: 'Singapore Entry Requirements in 2026 (Tourist Visa Guide) | VisaInfoGuide',
  description: 'Complete Singapore entry requirements for 2026. Visa-free access rules, SG Arrival Card requirements, required documents, stay duration limits, and overstay penalties for all nationalities.',
  alternates: {
    canonical: canonicalUrl('/visa-guides/country-entry-requirements/singapore-2026'),
  },
  openGraph: {
    title: 'Singapore Entry Requirements in 2026 (Tourist Visa Guide)',
    description: 'Complete Singapore entry requirements for 2026. Visa-free access rules, SG Arrival Card requirements, required documents, stay duration limits, and overstay penalties.',
    type: 'article',
    url: canonicalUrl('/visa-guides/country-entry-requirements/singapore-2026'),
    images: [{
      url: canonicalUrl('/og/legal-og'),
      width: 1200,
      height: 630,
      alt: 'Singapore Entry Requirements 2026',
    }],
    siteName: 'VisaInfoGuide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Singapore Entry Requirements in 2026 (Tourist Visa Guide)',
    description: 'Singapore visa-free access, SG Arrival Card, required documents, stay limits, and overstay penalties for 2026.',
    images: [canonicalUrl('/og/legal-og')],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqs = [
  {
    question: 'Do US citizens need a visa for Singapore?',
    answer: 'No, US citizens do not need a visa to visit Singapore. American passport holders are granted visa-free entry for up to 90 days per stay. However, all travelers including US citizens must complete the mandatory SG Arrival Card online before departure. The SG Arrival Card is not a visa — it is a health and travel declaration that must be submitted within 3 days before arrival.',
  },
  {
    question: 'Do Indian citizens need a visa for Singapore?',
    answer: 'Indian passport holders are generally granted visa-free access to Singapore for short stays. Most Indian nationals can enter Singapore without a visa for up to 30 days, provided they hold a valid long-term pass, visa, or entry permit issued by Australia, Canada, Germany, Japan, New Zealand, Switzerland, the United Kingdom, or the United States. Indian nationals without one of these qualifying documents must apply for a Singapore tourist visa in advance through an authorized visa agent or Singapore High Commission.',
  },
  {
    question: 'Is the SG Arrival Card a visa?',
    answer: 'No, the SG Arrival Card is not a visa. It is a mandatory electronic travel health and declaration form that all travelers — including visa-free nationals — must complete online before arriving in Singapore. It replaces the older paper disembarkation and embarkation (DE) card. Submitting the SG Arrival Card does not grant entry rights; your visa status and passport nationality determine whether you can enter and for how long.',
  },
  {
    question: 'How long can I stay in Singapore as a tourist?',
    answer: 'The duration granted depends on your nationality and is at the discretion of the Immigration & Checkpoints Authority (ICA) officer at the point of entry. Most visitors from Western countries including the US, UK, EU member states, Australia, Canada, and Japan are typically granted 90 days. Most other visa-free nationalities are granted 30 days. Extensions beyond the initial grant are possible but not guaranteed and must be applied for before your authorized stay expires.',
  },
  {
    question: 'Can I work remotely in Singapore on a tourist entry?',
    answer: 'No. Visa-free entry and tourist visas in Singapore are strictly for tourism, transit, and visiting family or friends — not for any form of work, including remote work for an overseas employer. Working in Singapore without the appropriate pass or permit (such as an Employment Pass or Work Pass) is a violation of Singapore\'s Employment of Foreign Manpower Act and can result in fines, imprisonment, and permanent entry bans.',
  },
  {
    question: 'What happens if I overstay in Singapore?',
    answer: 'Overstaying in Singapore carries some of the strictest penalties in Southeast Asia. Overstays are treated as a criminal offence under the Immigration Act. Penalties include fines of SGD $1,000 to $6,000, imprisonment of up to 6 months for first-time offenders, and caning for repeat or serious offenders. Deportation follows, with permanent or long-term entry bans applied. Singapore immigration does not exercise leniency for overstays of any duration.',
  },
];

export default function SingaporeEntryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Visa Guides', url: '/visa-guides' },
            { name: 'Country Entry Requirements', url: '/visa-guides/country-entry-requirements' },
            { name: 'Singapore', url: '/visa-guides/country-entry-requirements/singapore-2026' },
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
            headline: 'Singapore Entry Requirements in 2026 (Tourist Visa Guide)',
            description: 'Complete Singapore entry requirements guide including visa-free access, SG Arrival Card, required documents, stay duration, and overstay penalties.',
            datePublished: LAST_UPDATED,
            dateModified: LAST_UPDATED,
            url: 'https://visainfoguide.com/visa-guides/country-entry-requirements/singapore-2026',
          })),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <Breadcrumbs
            items={[
              { name: 'Visa Guides', url: '/visa-guides' },
              { name: 'Country Entry Requirements', url: '/visa-guides/country-entry-requirements' },
              { name: 'Singapore', url: '/visa-guides/country-entry-requirements/singapore-2026' },
            ]}
          />

          <header className="mt-8 mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">🇸🇬</span>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Singapore Entry Requirements in 2026
                </h1>
                <p className="text-xl text-gray-600 mt-2">Tourist Visa Guide</p>
              </div>
            </div>

            <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg mb-8">
              <p className="text-lg text-gray-800 leading-relaxed">
                Singapore offers <strong>visa-free entry to citizens from over 160 countries</strong> for short tourist stays, though stay duration — typically 30 or 90 days — depends on your nationality and the purpose of your visit. Travelers from a smaller group of countries must apply for a visa in advance. Regardless of visa status, <strong>all visitors must complete the SG Arrival Card</strong> before arrival. Use our <Link href="/visa-guides/do-i-need-a-visa" className="text-teal-600 hover:text-teal-700 font-medium underline">Do I Need a Visa</Link> checker or <Link href="/" className="text-teal-600 hover:text-teal-700 font-medium underline">Trip Visa Finder</Link> to confirm your specific requirements.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">160+</div>
                  <div className="text-sm text-gray-600">Visa-Free Nations</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">Card</div>
                  <div className="text-sm text-gray-600">SG Arrival Card</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">30–90</div>
                  <div className="text-sm text-gray-600">Days Stay</div>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Who Can Enter Singapore Visa-Free?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Singapore extends <Link href="/visa-guides/travel-visa-rules#visa-free" className="text-teal-600 hover:text-teal-700 font-medium underline">visa-free entry</Link> to citizens from over 160 countries. Eligible travelers are admitted directly at the port of entry without needing to apply for a visa in advance. The length of the visa-free stay varies by nationality:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card className="border-l-4 border-teal-500">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">90-Day Visa-Free Stay</h3>
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">
                      Citizens of these countries are typically granted 90 days per visit:
                    </p>
                    <ul className="grid grid-cols-2 gap-1 text-sm text-gray-700">
                      {['United States', 'United Kingdom', 'Germany', 'France', 'Italy', 'Spain', 'Canada', 'Australia', 'New Zealand', 'Japan', 'South Korea', 'Netherlands', 'Switzerland'].map((c) => (
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">30-Day Visa-Free Stay</h3>
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">
                      Most other visa-free nationalities receive 30 days per visit, including:
                    </p>
                    <ul className="grid grid-cols-2 gap-1 text-sm text-gray-700">
                      {['Thailand', 'Philippines', 'Vietnam', 'Indonesia', 'Malaysia', 'India', 'Sri Lanka', 'Bangladesh', 'Turkey', 'Egypt', 'South Africa', 'Russia', 'Brazil'].map((c) => (
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
                Visa-free entry does not permit employment of any kind. The exact duration granted is always at the discretion of the Immigration & Checkpoints Authority (ICA) officer at the point of entry.
              </p>
            </section>

            <section id="visa-required" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Who Needs a Visa for Singapore?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                A relatively small number of nationalities are required to obtain a Singapore tourist visa before travel. Nationals from countries including Afghanistan, Iran, Iraq, Syria, Yemen, Somalia, Libya, Sudan, North Korea, Cuba, and Eritrea must apply in advance.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Singapore does not offer a direct online visa portal for tourist visas. Applications must be submitted through an <strong>authorized local contact or visa agent in Singapore</strong>, or via a <strong>Singapore embassy or high commission</strong> in your home country. The local contact or agent sponsors the application on behalf of the applicant.
              </p>
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Visa Application Process</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2"><FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" /><span>Apply through an authorized Singapore visa agent or the Singapore embassy in your country</span></li>
                  <li className="flex items-start gap-2"><FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" /><span>Processing time is typically 3–5 business days</span></li>
                  <li className="flex items-start gap-2"><FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" /><span>Single-entry tourist visas are typically granted for a 30-day stay</span></li>
                  <li className="flex items-start gap-2"><FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" /><span>Application fee from SGD $30, varying by nationality and agent</span></li>
                </ul>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Use our <Link href="/visa-guides/do-i-need-a-visa" className="text-teal-600 hover:text-teal-700 font-medium underline">Do I Need a Visa</Link> tool to confirm whether your passport requires a Singapore visa in advance.
              </p>
            </section>

            <section id="sg-arrival-card" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">SG Arrival Card &amp; Electronic Entry Requirements</h2>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-6">
                <div className="flex items-start gap-3">
                  <Info className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-800 leading-relaxed">
                    <strong>The SG Arrival Card is not a visa.</strong> It is a mandatory electronic declaration that all travelers must submit before arriving in Singapore, regardless of nationality or visa status. Completing the SG Arrival Card does not grant entry rights.
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                Singapore's SG Arrival Card (SGAC) replaced the paper disembarkation/embarkation (DE) card. It collects health, travel history, and personal information that was previously completed on paper upon arrival. Submission is free and takes approximately 5 minutes.
              </p>
              <div className="grid gap-4 mb-6">
                <Card className="border-l-4 border-teal-500">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">SG Arrival Card Key Facts</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" /><span><strong>Who must complete it:</strong> All travelers entering Singapore, including Singapore permanent residents and long-term pass holders</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" /><span><strong>When to submit:</strong> Within 3 days before your arrival in Singapore</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" /><span><strong>Where to submit:</strong> Via the ICA SG Arrival Card e-Service website or the MyICA mobile app</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" /><span><strong>Cost:</strong> Free</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" /><span><strong>What it collects:</strong> Personal information, passport details, travel history, and health declarations</span></li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              <p className="text-gray-700 leading-relaxed">
                For comparison with actual electronic visa systems used by other countries, see our guide on <Link href="/visa-guides/travel-visa-rules#evisa" className="text-teal-600 hover:text-teal-700 font-medium underline">eVisa vs electronic travel authorizations</Link>.
              </p>
            </section>

            <section id="required-documents" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Required Documents at Entry</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                All travelers entering Singapore must meet standard entry requirements. ICA officers have authority to deny entry to anyone who does not meet these conditions, even visa-free travelers.
              </p>

              <div className="grid gap-6">
                <Card className="border-l-4 border-teal-500">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Shield className="w-8 h-8 text-teal-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Passport Validity</h3>
                        <p className="text-gray-700 leading-relaxed">
                          Your passport must be valid for at least <strong>6 months beyond your intended departure date</strong> from Singapore. See our guide on <Link href="/visa-guides/travel-visa-rules#passport-validity" className="text-teal-600 hover:text-teal-700 font-medium underline">passport validity rules</Link> for more information. Airlines enforce this before boarding.
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
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Completed SG Arrival Card</h3>
                        <p className="text-gray-700 leading-relaxed">
                          All travelers must submit the SG Arrival Card electronically within 3 days before arrival. Carry the acknowledgement reference number when traveling, though ICA verifies submissions automatically at immigration.
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
                          A confirmed <Link href="/visa-guides/travel-visa-rules#onward-travel" className="text-teal-600 hover:text-teal-700 font-medium underline">onward or return ticket</Link> is required, showing you will depart Singapore before your authorized stay expires. ICA and airlines both check this at entry and boarding.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-purple-500">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Wallet className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Proof of Sufficient Funds</h3>
                        <p className="text-gray-700 leading-relaxed">
                          You must be able to demonstrate <Link href="/visa-guides/travel-visa-rules#proof-of-funds" className="text-teal-600 hover:text-teal-700 font-medium underline">sufficient funds</Link> to support yourself during your stay. Singapore is an expensive city-state; officers may ask for bank statements or credit cards. No fixed minimum is published but SGD $500–$1,000 per week is a commonly cited informal guideline.
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
                  Visa-free visitors are typically granted either <strong>30 days or 90 days</strong> depending on their nationality, as determined by the ICA officer at the point of entry. The officer can grant less than the standard duration based on the specific circumstances of each traveler.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The duration of stay is marked on the visit pass issued at entry. This is the date you must depart by — not the date your visa was issued or when you arrived. Always check the date stamped in your passport at immigration.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Short-term visit pass extensions can be applied for at ICA headquarters, but are granted only in exceptional circumstances such as medical emergencies. Routine extension requests for tourism are generally not approved. If you need a longer stay, the appropriate work or long-term pass must be applied for before travel.
                </p>
              </div>
            </section>

            <section id="overstay" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Overstay Penalties in Singapore</h2>
              <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-red-900 mb-3">Criminal Offence — Zero Tolerance</h3>
                    <div className="space-y-3 text-gray-800">
                      <p className="leading-relaxed">
                        <strong>Fines:</strong> Overstaying in Singapore is a criminal offence under the Immigration Act. First-time offenders face fines of SGD $1,000 to $6,000 plus court costs.
                      </p>
                      <p className="leading-relaxed">
                        <strong>Imprisonment:</strong> First-time overstayers may be sentenced to up to 6 months imprisonment. Repeat offenders and those who overstay significantly face longer terms.
                      </p>
                      <p className="leading-relaxed">
                        <strong>Caning:</strong> Under Singapore law, male overstayers who stay illegally for more than 90 days are subject to mandatory caning in addition to imprisonment, regardless of nationality.
                      </p>
                      <p className="leading-relaxed">
                        <strong>Entry bans:</strong> Deportation is mandatory after any overstay conviction. Entry bans are typically permanent or for a period of 5 or more years.
                      </p>
                      <p className="leading-relaxed">
                        <strong>Never overstay.</strong> Singapore's immigration enforcement is rigorous and penalties are applied without exception. If your circumstances change, contact ICA immediately to seek advice before your authorized stay expires.
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
                This guide is compiled from official Singapore Government immigration sources. Entry requirements can change — always verify current policy before booking travel.
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
                  <li>• Immigration &amp; Checkpoints Authority (ICA) Singapore — ica.gov.sg</li>
                  <li>• Ministry of Foreign Affairs Singapore — mfa.gov.sg</li>
                  <li>• SG Arrival Card e-Service — eservices.ica.gov.sg/sgarrivalcard</li>
                  <li>• International Air Transport Association (IATA) Timatic Database</li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">
                  <strong>Important:</strong> Entry requirements can change without notice. Always verify current requirements with the ICA or your nearest Singapore embassy before booking international travel.
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

                <Link href="/visa-guides/country-entry-requirements/australia-2026" className="group">
                  <Card className="transition-all duration-200 hover:shadow-lg hover:border-teal-200">
                    <CardContent className="flex items-center justify-between p-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                          Australia Entry Requirements 2026
                        </h3>
                        <p className="text-sm text-gray-600">
                          ETA, eVisitor, and Visitor Visa rules for Australia
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
