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
  title: 'Indonesia Entry Requirements in 2026 (Tourist Visa Guide) | VisaInfoGuide',
  description: 'Complete Indonesia entry requirements for 2026. Visa on Arrival, visa-free access, eVisa options, required documents, stay duration, and overstay penalties for all nationalities including Bali visitors.',
  alternates: {
    canonical: canonicalUrl('/visa-guides/country-entry-requirements/indonesia-2026'),
  },
  openGraph: {
    title: 'Indonesia Entry Requirements in 2026 (Tourist Visa Guide)',
    description: 'Complete Indonesia entry requirements for 2026. Visa on Arrival in Bali, eVisa options, required documents, stay limits, and overstay penalties for all nationalities.',
    type: 'article',
    url: canonicalUrl('/visa-guides/country-entry-requirements/indonesia-2026'),
    images: [{
      url: canonicalUrl('/og/legal-og'),
      width: 1200,
      height: 630,
      alt: 'Indonesia Entry Requirements 2026',
    }],
    siteName: 'VisaInfoGuide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Indonesia Entry Requirements in 2026 (Tourist Visa Guide)',
    description: 'Indonesia Visa on Arrival, eVisa, stay limits, and overstay penalties for 2026.',
    images: [canonicalUrl('/og/legal-og')],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqs = [
  {
    question: 'Do US citizens need a visa for Indonesia?',
    answer: 'US citizens are not on Indonesia\'s visa-free list but are eligible for Visa on Arrival (VOA). American passport holders can obtain a VOA at major Indonesian international airports including Bali\'s Ngurah Rai International Airport and Jakarta\'s Soekarno-Hatta International Airport. The VOA permits a stay of 30 days and can be extended once for an additional 30 days at an Indonesian immigration office. Alternatively, US citizens can apply for a B211A eVisa before departure through the official Indonesian immigration portal, which allows a 60-day initial stay with further extensions possible.',
  },
  {
    question: 'Can I get a Visa on Arrival in Bali?',
    answer: 'Yes, Visa on Arrival is available at Bali\'s Ngurah Rai International Airport for eligible nationalities. Citizens of over 90 countries can purchase a VOA upon arrival at the designated VOA counter before reaching immigration. The fee is USD 35 (payable in USD or Indonesian Rupiah) and the VOA permits a 30-day stay. You can extend the VOA once for another 30 days at a local immigration office in Bali. Make sure you have a return or onward ticket, proof of sufficient funds, and a passport valid for at least 6 months before attempting to obtain a VOA.',
  },
  {
    question: 'How long can I stay in Indonesia as a tourist?',
    answer: 'The permitted stay depends on your entry method. Visa-free travelers (from eligible countries like Malaysia, Singapore, Thailand, and others) are permitted to stay up to 30 days with no extension option. Visa on Arrival (VOA) holders are permitted 30 days, extendable once for a further 30 days — giving a maximum stay of 60 days. Travelers who obtain a B211A eVisa before arrival can stay up to 60 days initially, with multiple extension options available. If you plan a longer stay or multiple-entry visits, consult the Indonesian immigration authority about the most appropriate visa category.',
  },
  {
    question: 'Can I extend my Indonesian VOA?',
    answer: 'Yes, the Visa on Arrival (VOA) can be extended once for an additional 30 days, giving you a total stay of up to 60 days. The extension must be applied for at an Indonesian Immigration Office (Kantor Imigrasi) before your initial 30-day VOA expires. You cannot extend the VOA after it has already expired. The extension fee is approximately IDR 500,000. For the extension you will need your passport, your VOA stamp, proof of onward travel, and proof of accommodation. Note that only one extension is permitted — after 60 days, you must depart Indonesia.',
  },
  {
    question: 'Is Indonesia visa-free for Indians?',
    answer: 'Indian citizens are not on Indonesia\'s visa-free list but are eligible for Visa on Arrival (VOA). Indian passport holders can obtain a VOA at major international airports in Indonesia, including Bali and Jakarta, for a fee of USD 35. Alternatively, Indian nationals can apply online for the B211A eVisa through the official Indonesian immigration portal before departure. The eVisa allows a 60-day stay and can be extended. Indian travelers should ensure their passport is valid for at least 6 months from the date of entry and carry a return or onward ticket and proof of sufficient funds.',
  },
  {
    question: 'What happens if I overstay in Indonesia?',
    answer: 'Overstaying in Indonesia carries serious financial and legal consequences. The standard overstay fine is IDR 1,000,000 (approximately USD 65) per day, which must be paid in full at the immigration office before you are permitted to depart. Travelers who overstay beyond 60 days face detention pending deportation proceedings, in addition to fines. The Indonesian government may also impose entry bans on serious overstayers, restricting future access to the country. Overstay records are stored in Indonesian immigration databases and can affect future visa applications to Indonesia and, in some cases, other countries. If you realize you cannot depart on time, contact the nearest Indonesian Immigration Office immediately.',
  },
];

export default function IndonesiaEntryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Visa Guides', url: '/visa-guides' },
            { name: 'Country Entry Requirements', url: '/visa-guides/country-entry-requirements' },
            { name: 'Indonesia', url: '/visa-guides/country-entry-requirements/indonesia-2026' },
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
            headline: 'Indonesia Entry Requirements in 2026 (Tourist Visa Guide)',
            description: 'Complete Indonesia entry requirements guide including Visa on Arrival, eVisa options, required documents, stay duration, and overstay penalties.',
            datePublished: LAST_UPDATED,
            dateModified: LAST_UPDATED,
            url: 'https://visainfoguide.com/visa-guides/country-entry-requirements/indonesia-2026',
          })),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <Breadcrumbs
            items={[
              { name: 'Visa Guides', url: '/visa-guides' },
              { name: 'Country Entry Requirements', url: '/visa-guides/country-entry-requirements' },
              { name: 'Indonesia', url: '/visa-guides/country-entry-requirements/indonesia-2026' },
            ]}
          />

          <header className="mt-8 mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">🇮🇩</span>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Indonesia Entry Requirements in 2026
                </h1>
                <p className="text-xl text-gray-600 mt-2">Tourist Visa Guide</p>
              </div>
            </div>

            <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg mb-8">
              <p className="text-lg text-gray-800 leading-relaxed">
                Indonesia offers <strong>visa-free entry to a select number of nationalities</strong> and a widely available <strong>Visa on Arrival (VOA)</strong> for citizens of over 90 countries — including at major entry points like Bali. Whether you qualify for visa-free access, the VOA, or need an eVisa depends on your passport. Use our <Link href="/visa-guides/do-i-need-a-visa" className="text-teal-600 hover:text-teal-700 font-medium underline">Do I Need a Visa</Link> checker or the <Link href="/" className="text-teal-600 hover:text-teal-700 font-medium underline">Trip Visa Finder</Link> to confirm the exact requirements for your nationality before booking.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">90+</div>
                  <div className="text-sm text-gray-600">VOA Nations</div>
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
                  <div className="text-2xl font-bold text-gray-900">30–60</div>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Who Can Enter Indonesia Visa-Free?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Indonesia maintains <Link href="/visa-guides/travel-visa-rules#visa-free" className="text-teal-600 hover:text-teal-700 font-medium underline">visa-free entry</Link> for citizens of a limited number of countries — primarily neighboring ASEAN nations and select bilateral partners. Visa-free travelers do not pay an entry fee and are typically permitted to stay for up to 30 days. Unlike the VOA, the visa-free allowance cannot be extended.
              </p>
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Countries with Visa-Free Access to Indonesia</h3>
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-700">
                  {[
                    'Brunei', 'Chile', 'Ecuador', 'Honduras', 'Hong Kong', 'Macao',
                    'Malaysia', 'Morocco', 'Myanmar', 'Peru', 'Philippines', 'Singapore',
                    'Thailand', 'Vietnam',
                  ].map((c) => (
                    <li key={c} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-500 mt-4">Visa-free agreements are subject to change. Verify with the Directorate General of Immigration before travel.</p>
              </div>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-800 text-sm leading-relaxed">
                    <strong>No extension on visa-free entry:</strong> Travelers entering visa-free cannot extend their stay within Indonesia. If you need more than 30 days, consider applying for a B211A eVisa before departure instead.
                  </p>
                </div>
              </div>
            </section>

            <section id="voa" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Indonesia Visa on Arrival (VOA)</h2>
              <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg mb-6">
                <div className="flex items-start gap-3">
                  <Info className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-800 leading-relaxed">
                    Indonesia's <Link href="/visa-guides/travel-visa-rules#visa-on-arrival" className="text-teal-600 hover:text-teal-700 font-medium underline">Visa on Arrival</Link> is available at major international airports and select sea ports. Citizens of over 90 countries can purchase a VOA upon arrival without prior arrangement. This is the most common entry method for tourists visiting Bali, Jakarta, Lombok, and other popular destinations.
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                Key details about the Indonesia Visa on Arrival:
              </p>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {[
                  {
                    title: 'Cost',
                    icon: <Wallet className="w-6 h-6 text-teal-600" />,
                    desc: 'The VOA fee is USD 35, payable in USD or Indonesian Rupiah (IDR) at the VOA payment counter before reaching the immigration desk. Credit cards may be accepted at some airports.',
                  },
                  {
                    title: 'Duration',
                    icon: <Clock className="w-6 h-6 text-orange-600" />,
                    desc: 'The VOA grants an initial stay of 30 days. It can be extended once for a further 30 days at an Indonesian Immigration Office, giving a maximum stay of 60 days.',
                  },
                  {
                    title: 'Extension',
                    icon: <FileText className="w-6 h-6 text-blue-600" />,
                    desc: 'Extension must be applied for before the initial 30 days expires at a local immigration office (Kantor Imigrasi). The extension fee is approximately IDR 500,000. Only one extension is permitted.',
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
                <h3 className="text-lg font-semibold text-gray-900 mb-3">VOA-Eligible Entry Points</h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  The VOA is available at all designated international airports and several seaports in Indonesia. Major entry points include:
                </p>
                <ul className="grid md:grid-cols-2 gap-2 text-sm text-gray-700">
                  {[
                    'Bali — Ngurah Rai International Airport (DPS)',
                    'Jakarta — Soekarno-Hatta International Airport (CGK)',
                    'Surabaya — Juanda International Airport (SUB)',
                    'Medan — Kualanamu International Airport (KNO)',
                    'Lombok — International Airport (LOP)',
                    'Yogyakarta — YIA International Airport (YIA)',
                    'Makassar — Sultan Hasanuddin Airport (UPG)',
                    'Batam — Hang Nadim Airport (BTH)',
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section id="evisa" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Indonesia eVisa System</h2>
              <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg mb-6">
                <div className="flex items-start gap-3">
                  <Info className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-800 leading-relaxed">
                    Indonesia offers an online <Link href="/visa-guides/travel-visa-rules#evisa" className="text-teal-600 hover:text-teal-700 font-medium underline">eVisa</Link> — the B211A Social/Tourist Visa — for eligible nationalities. Applying in advance is a good option for travelers who want a longer initial stay (60 days) or prefer to have their visa confirmed before arriving.
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card className="border-l-4 border-blue-500">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">B211A eVisa Details</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span>Applied for online at the official Indonesian immigration portal (molina.imigrasi.go.id)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span>Grants an initial stay of <strong>60 days</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span>Can be extended multiple times at Indonesian immigration offices</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span>Processing typically takes 3 to 7 business days</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span>Available as single-entry; multiple-entry variants exist for specific purposes</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-amber-500">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">VOA vs. eVisa: Which to Choose?</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>Choose <strong>VOA</strong> for short trips of up to 30 days or if you need the flexibility of deciding at the airport</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>Choose <strong>eVisa (B211A)</strong> for stays over 30 days, advance confirmation, or if you want to avoid queues at the VOA counter</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>Both require the same standard entry documents at the border</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="required-documents" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Required Documents at Entry</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                All travelers entering Indonesia — regardless of visa type — must meet standard entry requirements. Indonesian immigration officers have full authority to deny entry if any condition is not satisfied.
              </p>

              <div className="grid gap-6">
                <Card className="border-l-4 border-teal-500">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Shield className="w-8 h-8 text-teal-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Passport Validity</h3>
                        <p className="text-gray-700 leading-relaxed">
                          Your passport must be valid for at least <strong>6 months from your date of entry</strong> into Indonesia. Airlines enforce this requirement at check-in and Indonesian immigration will refuse entry to travelers with passports that do not meet this standard. See our guide on <Link href="/visa-guides/travel-visa-rules#passport-validity" className="text-teal-600 hover:text-teal-700 font-medium underline">passport validity rules</Link> for more details.
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
                          A confirmed <Link href="/visa-guides/travel-visa-rules#onward-travel" className="text-teal-600 hover:text-teal-700 font-medium underline">return or onward ticket</Link> showing you will depart Indonesia before your authorized stay expires. Airlines typically check this at check-in, and immigration officers may also request it at the border.
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
                          Indonesian immigration may request evidence of <Link href="/visa-guides/travel-visa-rules#proof-of-funds" className="text-teal-600 hover:text-teal-700 font-medium underline">sufficient funds</Link> to cover your stay. Bank statements, credit cards, or cash are acceptable. A general benchmark of USD 1,000 or equivalent is often cited for a typical tourist stay, though no fixed minimum is officially published.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Wallet className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">VOA Fee (If Applicable)</h3>
                        <p className="text-gray-700 leading-relaxed">
                          Travelers obtaining a VOA on arrival must pay the <strong>USD 35 fee</strong> at the designated VOA payment counter before reaching the immigration desk. Have the fee ready in USD or IDR. Some airports accept card payment, but carrying cash is recommended to avoid delays.
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
                  The permitted stay in Indonesia depends on your entry method:
                </p>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Visa-free entry:</strong> 30 days. No extension is available. Travelers must depart Indonesia within 30 days of arrival.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Visa on Arrival (VOA):</strong> 30 days initial stay. One extension of 30 days is available, for a maximum total of 60 days. The extension must be applied for before the initial 30 days expires.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>B211A eVisa:</strong> 60 days initial stay. Multiple extensions are possible at Indonesian immigration offices, up to a total of 180 days in some cases. Extension eligibility varies by immigration office.
                    </div>
                  </li>
                </ul>
                <div className="mt-6 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-800 text-sm leading-relaxed">
                      <strong>The authorized stay begins on your date of entry</strong>, not the date your visa was issued. Always count carefully from your actual arrival date, not the date printed on your VOA or eVisa, to avoid unintentional overstays.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="overstay" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Overstay Penalties in Indonesia</h2>
              <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-red-900 mb-3">Daily Fines, Detention, and Entry Bans</h3>
                    <div className="space-y-3 text-gray-800">
                      <p className="leading-relaxed">
                        <strong>Daily fines:</strong> Overstaying in Indonesia incurs a fine of <strong>IDR 1,000,000 (approximately USD 65) per day</strong>. These fines accumulate for each day of overstay and must be paid in full at the immigration office before you are permitted to depart the country.
                      </p>
                      <p className="leading-relaxed">
                        <strong>Detention:</strong> Travelers who overstay by more than 60 days are subject to detention by Indonesian immigration authorities. Detained overstayers may be held at an immigration detention center pending deportation, and are typically responsible for associated costs.
                      </p>
                      <p className="leading-relaxed">
                        <strong>Entry bans:</strong> Indonesia may impose entry bans on overstayers, particularly for significant or repeat violations. Ban lengths vary based on the severity of the overstay.
                      </p>
                      <p className="leading-relaxed">
                        <strong>Deportation:</strong> Significant overstays result in formal deportation proceedings. Deportees are typically barred from re-entering Indonesia for a specified period.
                      </p>
                      <p className="leading-relaxed">
                        <strong>If you cannot depart on time:</strong> Contact the nearest Indonesian Immigration Office (Kantor Imigrasi) immediately — before your authorized stay expires. Proactively reporting your situation and paying any applicable fees is treated more favorably than being apprehended by authorities.
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
                This guide is compiled from official Indonesian government immigration sources. Entry requirements — including VOA eligibility, eVisa options, and visa-free agreements — can change. Always verify current requirements before booking travel.
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
                  <li>• Directorate General of Immigration Indonesia — imigrasi.go.id</li>
                  <li>• Official Indonesian eVisa Portal — molina.imigrasi.go.id</li>
                  <li>• Ministry of Law and Human Rights Indonesia — kemenkumham.go.id</li>
                  <li>• International Air Transport Association (IATA) Timatic Database</li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">
                  <strong>Important:</strong> VOA eligibility lists and eVisa requirements are subject to change without notice. Always verify with the Directorate General of Immigration or the official eVisa portal before booking.
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
