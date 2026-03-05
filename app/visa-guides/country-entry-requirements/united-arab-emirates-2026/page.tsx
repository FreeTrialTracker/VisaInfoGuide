import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, FileText, ArrowRight, Clock, AlertTriangle, Shield, Wallet, Plane, Info, RefreshCw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQBlock from '@/components/visa-guides/FAQBlock';
import { canonicalUrl, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';
import { articleJsonLd } from '@/lib/seo-links';

const LAST_UPDATED = '2026-02-21';

export const metadata: Metadata = {
  title: 'UAE Entry Requirements in 2026 (Tourist Visa Guide) | VisaInfoGuide',
  description: 'Complete UAE entry requirements for 2026. Visa-free access, visa on arrival, tourist visa rules, required documents, stay duration, and overstay penalties for Dubai and Abu Dhabi.',
  alternates: {
    canonical: canonicalUrl('/visa-guides/country-entry-requirements/united-arab-emirates-2026'),
  },
  openGraph: {
    title: 'United Arab Emirates (UAE) Entry Requirements in 2026 (Tourist Visa Guide)',
    description: 'Complete UAE entry requirements for 2026. Visa-free, visa on arrival, and pre-arranged tourist visa rules for Dubai and Abu Dhabi.',
    type: 'article',
    url: canonicalUrl('/visa-guides/country-entry-requirements/united-arab-emirates-2026'),
    images: [{
      url: canonicalUrl('/og/legal-og'),
      width: 1200,
      height: 630,
      alt: 'UAE Entry Requirements 2026',
    }],
    siteName: 'VisaInfoGuide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UAE Entry Requirements in 2026 (Tourist Visa Guide)',
    description: 'UAE visa-free access, visa on arrival, required documents, stay limits, and overstay penalties for 2026.',
    images: [canonicalUrl('/og/legal-og')],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqs = [
  {
    question: 'Do US citizens need a visa for Dubai?',
    answer: 'No, US citizens do not need a visa to visit Dubai or anywhere in the UAE. American passport holders are granted visa-free entry on arrival for up to 90 days per visit. No advance visa application is required. You will receive a stamp or electronic entry permit upon arrival at Dubai International Airport or any other UAE port of entry. The 90-day period is calculated per visit, and there is no formal limit on the number of visits per year under visa-free access.',
  },
  {
    question: 'Do Indians get visa on arrival in the UAE?',
    answer: 'No, Indian passport holders do not qualify for visa-on-arrival in the UAE. Indian nationals must obtain a tourist visa in advance before traveling. Visas can be arranged through UAE-based sponsors, including airlines such as Emirates, Etihad, and flydubai, licensed tour operators, hotels, or a UAE resident acting as sponsor. Tourist visas are typically issued for 30 or 90 days, with single or multiple entry options. Applications can be submitted online through airline portals or authorized travel agents.',
  },
  {
    question: 'How long can I stay in Dubai as a tourist?',
    answer: 'The permitted stay depends on how you enter. Visa-free nationals from countries such as the US, UK, EU member states, Australia, and Canada are typically granted 90 days per visit on arrival. Other nationalities entering on a visa-on-arrival receive 30 days, extendable once for a further 30 days at a cost. Visitors entering on a pre-arranged tourist visa are permitted 30 or 90 days depending on the visa type purchased. All stay durations are counted from the date of entry as stamped at immigration.',
  },
  {
    question: 'Can I extend my UAE tourist visa?',
    answer: 'Yes, in most cases. Visitors on a 30-day visa-on-arrival can apply for a 30-day extension through the General Directorate of Residency and Foreigners Affairs (GDRFA) or ICA before their current permit expires. Visitors on pre-arranged tourist visas may also be able to extend, depending on the visa type and conditions. Extensions are not automatic and must be applied for while your current visa is still valid. Leaving and re-entering the UAE does not reset your visa automatically if you are on a visa requiring pre-arrangement.',
  },
  {
    question: 'Is travel insurance required for the UAE?',
    answer: 'Travel or health insurance is not a mandatory legal requirement for tourist entry into the UAE. However, medical treatment in the UAE — particularly in Dubai — is expensive, and comprehensive travel insurance including medical cover is strongly recommended. Some airlines and tour operators may require proof of insurance as a condition of booking a sponsored tourist visa, but this is a commercial rather than government requirement.',
  },
  {
    question: 'What happens if I overstay in the UAE?',
    answer: 'Overstaying in the UAE carries significant financial and legal penalties. After a 10-day grace period following visa expiry, a daily fine of AED 50 is levied. An administrative fee of AED 100 per day may also be applied in certain emirates. Prolonged overstays result in deportation at the traveler\'s expense and entry bans ranging from 1 to 10 years depending on duration of overstay. In serious cases, criminal charges may be filed. Fines must be settled in full before departure or at a UAE immigration office.',
  },
];

export default function UAEEntryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Visa Guides', url: '/visa-guides' },
            { name: 'Country Entry Requirements', url: '/visa-guides/country-entry-requirements' },
            { name: 'United Arab Emirates', url: '/visa-guides/country-entry-requirements/united-arab-emirates-2026' },
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
            headline: 'United Arab Emirates (UAE) Entry Requirements in 2026 (Tourist Visa Guide)',
            description: 'Complete UAE entry requirements guide including visa-free access, visa on arrival, required documents, stay duration, and overstay penalties.',
            datePublished: LAST_UPDATED,
            dateModified: LAST_UPDATED,
            url: 'https://visainfoguide.com/visa-guides/country-entry-requirements/united-arab-emirates-2026',
          })),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <Breadcrumbs
            items={[
              { name: 'Visa Guides', url: '/visa-guides' },
              { name: 'Country Entry Requirements', url: '/visa-guides/country-entry-requirements' },
              { name: 'United Arab Emirates', url: '/visa-guides/country-entry-requirements/united-arab-emirates-2026' },
            ]}
          />

          <header className="mt-8 mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">🇦🇪</span>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  United Arab Emirates (UAE) Entry Requirements in 2026
                </h1>
                <p className="text-xl text-gray-600 mt-2">Tourist Visa Guide</p>
              </div>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-8">
              <p className="text-lg text-gray-800 leading-relaxed">
                The UAE — with <strong>Dubai as its primary international gateway</strong> — offers visa-free or visa-on-arrival entry to citizens from many countries, while others must arrange a tourist visa in advance. Entry rules depend entirely on your nationality and purpose of visit. Use the <Link href="/visa-guides/do-i-need-a-visa" className="text-amber-700 hover:text-amber-800 font-medium underline">Do I Need a Visa</Link> checker or the <Link href="/" className="text-amber-700 hover:text-amber-800 font-medium underline">Trip Visa Finder</Link> to confirm your specific requirements before booking.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">60+</div>
                  <div className="text-sm text-gray-600">Visa-Free Nations</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Plane className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">VOA</div>
                  <div className="text-sm text-gray-600">Visa on Arrival</div>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Who Can Enter the UAE Visa-Free?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Citizens of approximately 60 countries can enter the UAE without obtaining any prior visa. Upon arrival at Dubai, Abu Dhabi, Sharjah, or any other UAE port of entry, eligible travelers are stamped in automatically for <Link href="/visa-guides/travel-visa-rules#visa-free" className="text-amber-600 hover:text-amber-700 font-medium underline">visa-free entry</Link>. Most qualifying nationalities receive a 90-day stay; a smaller group receives 30 days.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card className="border-l-4 border-amber-500">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">90-Day Visa-Free Countries</h3>
                    <p className="text-sm text-gray-600 mb-3">Typically granted 90 days per visit:</p>
                    <ul className="grid grid-cols-2 gap-1 text-sm text-gray-700">
                      {[
                        'United States', 'United Kingdom', 'Germany', 'France',
                        'Italy', 'Spain', 'Canada', 'Australia',
                        'New Zealand', 'Japan', 'South Korea', 'Netherlands',
                        'Switzerland', 'Sweden', 'Norway', 'Ireland',
                      ].map((c) => (
                        <li key={c} className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-amber-600 flex-shrink-0" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-blue-400">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">30-Day Visa-Free Countries</h3>
                    <p className="text-sm text-gray-600 mb-3">Typically granted 30 days per visit:</p>
                    <ul className="grid grid-cols-2 gap-1 text-sm text-gray-700">
                      {[
                        'Singapore', 'Malaysia', 'Brunei', 'Hong Kong',
                        'Macao', 'Israel', 'Hungary', 'Czech Republic',
                        'Poland', 'Greece', 'Portugal', 'Belgium',
                        'Austria', 'Denmark', 'Finland', 'Luxembourg',
                      ].map((c) => (
                        <li key={c} className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-blue-500 flex-shrink-0" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Visa-free entry is granted strictly for tourism, transit, and family visits. It does not permit employment, study, or any form of paid activity in the UAE.
              </p>
            </section>

            <section id="visa-on-arrival" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Who Gets Visa on Arrival in the UAE?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                A number of nationalities not covered by the visa-free scheme can obtain a <Link href="/visa-guides/travel-visa-rules#visa-on-arrival" className="text-amber-600 hover:text-amber-700 font-medium underline">Visa on Arrival</Link> at UAE airports. This is issued at the immigration counter on entry, with no prior application needed. Most visa-on-arrival nationalities receive a 30-day stay.
              </p>
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Visa on Arrival Key Facts</h3>
                <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Stay duration:</strong> 30 days per visit</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Cost:</strong> Typically AED 100–150 (approx. USD 27–40)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Where issued:</strong> At the airport immigration counter on arrival</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <RefreshCw className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Extension:</strong> Extendable once for an additional 30 days through GDRFA</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <RefreshCw className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Entry type:</strong> Single entry per issuance</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Info className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Note:</strong> Eligibility varies — confirm with your airline before travel</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Extension applications must be submitted before your current stamp or permit expires. Extensions are not guaranteed and are subject to GDRFA or ICA approval.
              </p>
            </section>

            <section id="visa-required" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Who Needs to Apply for a UAE Tourist Visa?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Nationals not covered by visa-free or visa-on-arrival arrangements must obtain a tourist visa before traveling to the UAE. This includes citizens of India, Pakistan, Bangladesh, Sri Lanka, China, most African nations, and several Middle Eastern countries.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                The UAE does not operate a direct government tourist e-Visa portal. Instead, visas must be arranged through one of the following UAE-based sponsors:
              </p>
              <div className="grid gap-4 mb-6">
                <Card>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-gray-900 mb-2">Airlines</h3>
                    <p className="text-sm text-gray-700">Emirates, Etihad Airways, and flydubai each offer online tourist visa applications to eligible applicants traveling on their flights. This is the most common and convenient route for many nationalities.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-gray-900 mb-2">Hotels and Tour Operators</h3>
                    <p className="text-sm text-gray-700">Licensed UAE hotels and tourism companies can sponsor tourist visas for guests. The hotel or operator submits the application on your behalf, typically as part of a booking package.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-gray-900 mb-2">UAE Resident Sponsors</h3>
                    <p className="text-sm text-gray-700">A UAE resident (family member, friend, or employer) can apply for a tourist visa on your behalf. The sponsor takes legal responsibility for the visitor during their stay.</p>
                  </CardContent>
                </Card>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Check your passport requirements using our <Link href="/visa-guides/do-i-need-a-visa" className="text-amber-600 hover:text-amber-700 font-medium underline">Do I Need a Visa</Link> tool before making any travel arrangements.
              </p>
            </section>

            <section id="required-documents" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Required Documents at Entry</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                All travelers entering the UAE — regardless of whether they enter visa-free, on arrival, or on a pre-arranged visa — must meet these standard entry conditions. UAE immigration officers have the authority to deny entry to anyone not meeting requirements.
              </p>

              <div className="grid gap-6">
                <Card className="border-l-4 border-amber-500">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Shield className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Passport Validity</h3>
                        <p className="text-gray-700 leading-relaxed">
                          Your passport must be valid for at least <strong>6 months beyond your intended departure date</strong>. Airlines enforce this rule at check-in and will deny boarding if your passport does not meet this requirement. See our guide on <Link href="/visa-guides/travel-visa-rules#passport-validity" className="text-amber-600 hover:text-amber-700 font-medium underline">passport validity rules</Link>.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Plane className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Return or Onward Ticket</h3>
                        <p className="text-gray-700 leading-relaxed">
                          A confirmed <Link href="/visa-guides/travel-visa-rules#onward-travel" className="text-amber-600 hover:text-amber-700 font-medium underline">return or onward ticket</Link> showing you will depart the UAE before your permitted stay expires is required. UAE immigration and airlines check this routinely at entry and boarding.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-green-500">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <FileText className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Proof of Accommodation</h3>
                        <p className="text-gray-700 leading-relaxed">
                          A confirmed hotel booking or a letter of invitation from a UAE-based host is expected. Immigration officers may ask to see accommodation details, particularly for travelers without pre-arranged visas.
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
                          You must be able to show <Link href="/visa-guides/travel-visa-rules#proof-of-funds" className="text-amber-600 hover:text-amber-700 font-medium underline">sufficient funds</Link> for the duration of your stay. The UAE does not publish a fixed minimum but officers may request bank statements or credit cards. The UAE, particularly Dubai, has a high cost of living.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="stay-duration" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Length of Stay Rules</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-t-4 border-amber-500">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Visa-Free Entry</h3>
                    <div className="text-3xl font-bold text-amber-600 mb-2">90 days</div>
                    <p className="text-sm text-gray-600">US, UK, EU, AU, CA, JP and most Western nations. Single stay per entry. No limit on number of visits.</p>
                    <p className="text-xs text-gray-500 mt-2">Some nationalities receive 30 days</p>
                  </CardContent>
                </Card>
                <Card className="border-t-4 border-blue-500">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Visa on Arrival</h3>
                    <div className="text-3xl font-bold text-blue-600 mb-2">30 days</div>
                    <p className="text-sm text-gray-600">Issued at airport on arrival. Extendable once for a further 30 days. Single entry per issuance.</p>
                    <p className="text-xs text-gray-500 mt-2">Extension fee applies</p>
                  </CardContent>
                </Card>
                <Card className="border-t-4 border-green-500">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Tourist Visa</h3>
                    <div className="text-3xl font-bold text-green-600 mb-2">30 or 90 days</div>
                    <p className="text-sm text-gray-600">Pre-arranged through sponsor. Available as single or multiple entry depending on visa type purchased.</p>
                    <p className="text-xs text-gray-500 mt-2">Multiple entry options available</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="overstay" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Overstay Penalties in the UAE</h2>
              <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-red-900 mb-4">Financial Penalties, Bans &amp; Legal Risk</h3>
                    <div className="space-y-3 text-gray-800">
                      <div>
                        <p className="font-semibold mb-1">Daily Fines</p>
                        <p className="leading-relaxed text-sm">After a 10-day grace period following visa expiry, a fine of <strong>AED 50 per day</strong> is levied. Some emirates add an administrative fee of AED 100 per day. All fines must be paid in full before you can depart the country.</p>
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Entry Bans</p>
                        <p className="leading-relaxed text-sm">Overstays result in deportation and automatic entry bans ranging from <strong>1 to 10 years</strong> depending on the severity and duration of the overstay. This ban applies to re-entry to the entire UAE, not just one emirate.</p>
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Legal Consequences</p>
                        <p className="leading-relaxed text-sm">Prolonged or repeated overstays can result in <strong>criminal charges</strong> under UAE immigration law. The legal and financial consequences are severe. If your circumstances change, contact GDRFA or ICA immediately before your visa expires to explore extension options.</p>
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
                This guide is compiled from official UAE Government immigration sources. Entry requirements change regularly — always verify current policy before booking.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                For details about our research process, see our <Link href="/methodology" className="text-amber-600 hover:text-amber-700 font-medium underline">methodology page</Link>.
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Last Reviewed:</strong> {new Date(LAST_UPDATED).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <strong>Official Sources:</strong>
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• UAE Government Portal — u.ae</li>
                  <li>• General Directorate of Residency and Foreigners Affairs (GDRFA) — gdrfad.gov.ae</li>
                  <li>• Federal Authority for Identity, Citizenship, Customs and Port Security (ICA) — ica.gov.ae</li>
                  <li>• Emirates Airline Visa &amp; Passport Information — emirates.com</li>
                  <li>• International Air Transport Association (IATA) Timatic Database</li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">
                  <strong>Important:</strong> Entry requirements can change without notice. Always verify current requirements with the official UAE Government portal or your nearest UAE embassy before booking international travel.
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
                    href: '/visa-guides/country-entry-requirements/singapore-2026',
                    title: 'Singapore Entry Requirements 2026',
                    desc: 'SG Arrival Card, visa-free access rules, and entry conditions for Singapore',
                  },
                  {
                    href: '/visa-guides/country-entry-requirements/united-kingdom-2026',
                    title: 'United Kingdom Entry Requirements 2026',
                    desc: 'ETA, Standard Visitor Visa, and entry conditions for the UK',
                  },
                  {
                    href: '/trip',
                    title: 'Trip Visa Finder',
                    desc: 'Plan multi-country trips and check requirements for your full itinerary',
                  },
                ].map(({ href, title, desc }) => (
                  <Link key={href} href={href} className="group">
                    <Card className="transition-all duration-200 hover:shadow-lg hover:border-amber-200">
                      <CardContent className="flex items-center justify-between p-6">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-amber-700 transition-colors">
                            {title}
                          </h3>
                          <p className="text-sm text-gray-600">{desc}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all flex-shrink-0 ml-4" />
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
