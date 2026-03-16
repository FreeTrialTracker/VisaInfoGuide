import { Metadata } from 'next';
import Link from 'next/link';
import { canonicalUrl, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';
import { CircleCheck as CheckCircle, ArrowRight, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQBlock from '@/components/visa-guides/FAQBlock';

export const metadata: Metadata = {
  title: 'Guide to Visa-Free Travel, eVisas, eTAs, and Visa on Arrival',
  description: 'Comprehensive guide to travel visa rules and entry classifications including visa-free, eVisa, eTA, visa on arrival, and visa required. Understand passport validity, proof of funds, and onward ticket requirements.',
  alternates: {
    canonical: canonicalUrl('/visa-guides/travel-visa-rules'),
  },
  openGraph: {
    title: 'Visa-Free, eVisa, eTA & Visa on Arrival Explained (2026) | VisaInfoGuide',
    description: 'Comprehensive guide to travel visa rules and entry classifications including visa-free, eVisa, eTA, visa on arrival, and visa required.',
    type: 'website',
    url: canonicalUrl('/visa-guides/travel-visa-rules'),
    images: [{
      url: canonicalUrl('/og/legal-og'),
      width: 1200,
      height: 630,
      alt: 'Travel Visa Rules Guide',
    }],
    siteName: 'VisaInfoGuide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visa-Free, eVisa, eTA, and Visa on Arrival Explained (2026)',
    description: 'Comprehensive guide to travel visa rules and entry classifications.',
    images: [canonicalUrl('/og/legal-og')],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqs = [
  {
    question: 'What is the difference between visa-free and visa on arrival?',
    answer: 'Visa-free means you can enter without any visa at all and your stay is authorized upon passport inspection. Visa on arrival means you must obtain a visa at the port of entry, which typically involves paying a fee and submitting documents before being allowed to enter.',
  },
  {
    question: 'Is an eVisa the same as an eTA?',
    answer: 'No, they are different. An eVisa is an electronic visa that authorizes entry and requires an application with supporting documents. An eTA (Electronic Travel Authorization) is a simpler pre-screening system linked to your passport electronically, typically for visa-exempt travelers to verify eligibility before boarding.',
  },
  {
    question: 'Can I apply for a visa on arrival online?',
    answer: 'No, visa on arrival is specifically obtained at the port of entry when you arrive. However, some countries offer eVisas that can be obtained online before travel, which is different from visa on arrival.',
  },
  {
    question: 'Do I need a visa if I am just transiting through a country?',
    answer: 'Transit visa requirements vary by country. Some countries allow airside transit without a visa, while others require a transit visa even if you do not leave the airport. Always check the specific transit requirements for your nationality and the country you are transiting through.',
  },
  {
    question: 'How far in advance should my passport be valid?',
    answer: 'Most countries require your passport to be valid for at least 6 months beyond your planned departure date. Some countries only require 3 months validity, while a few allow entry with a passport valid just for the duration of your stay. Always check the specific requirements for your destination.',
  },
];

export default function TravelVisaRulesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Visa Guides', url: '/visa-guides' },
            { name: 'Travel Visa Rules', url: '/visa-guides/travel-visa-rules' },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd(faqs)),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Breadcrumbs
            items={[
              { name: 'Visa Guides', url: '/visa-guides' },
              { name: 'Travel Visa Rules', url: '/visa-guides/travel-visa-rules' },
            ]}
          />

          <header className="mt-8 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Visa-Free, eVisa, eTA, and Visa on Arrival: What Each Means for Travelers
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              Different countries apply different entry classifications for international travelers. Understanding visa terminology and entry requirements is essential for smooth border crossings and avoiding travel disruptions. This guide explains the most common visa types and entry conditions you will encounter when planning international travel.
            </p>
          </header>

          <nav className="bg-white border border-gray-200 rounded-lg p-6 mb-12">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Navigation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <a href="#visa-free" className="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors">
                <ArrowRight className="w-4 h-4" />
                <span>Visa-Free Entry</span>
              </a>
              <a href="#visa-on-arrival" className="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors">
                <ArrowRight className="w-4 h-4" />
                <span>Visa on Arrival</span>
              </a>
              <a href="#evisa" className="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors">
                <ArrowRight className="w-4 h-4" />
                <span>eVisa</span>
              </a>
              <a href="#eta" className="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors">
                <ArrowRight className="w-4 h-4" />
                <span>eTA</span>
              </a>
              <a href="#visa-required" className="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors">
                <ArrowRight className="w-4 h-4" />
                <span>Visa Required</span>
              </a>
              <a href="#passport-validity" className="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors">
                <ArrowRight className="w-4 h-4" />
                <span>Passport Validity</span>
              </a>
              <a href="#proof-of-funds" className="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors">
                <ArrowRight className="w-4 h-4" />
                <span>Proof of Funds</span>
              </a>
              <a href="#onward-travel" className="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors">
                <ArrowRight className="w-4 h-4" />
                <span>Onward Travel</span>
              </a>
            </div>
          </nav>

          <article className="prose prose-lg max-w-none">
            <section id="visa-free" className="mb-12 scroll-mt-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What Does Visa-Free Mean?</h2>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Visa-free entry means travelers can enter a destination country without obtaining any visa beforehand or upon arrival. Immigration officials simply stamp your passport at the border, granting you permission to stay for a specified period. This is the most straightforward entry classification and requires the least documentation.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Visa-free access is typically granted through bilateral agreements between countries or regional arrangements. The permitted stay duration varies significantly, ranging from as short as 15 days to as long as 180 days depending on the countries involved. Despite being visa-free, travelers must still meet standard entry requirements such as passport validity, proof of sufficient funds, and sometimes proof of onward travel.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Many visa-free arrangements specify allowed activities, typically limiting visitors to tourism, business meetings, or family visits. Working, studying, or engaging in professional activities usually requires a separate visa regardless of visa-free status. Some countries may also limit the cumulative days you can stay visa-free within a given period.
                </p>
                <div className="bg-teal-50 border-l-4 border-teal-500 p-5 rounded-r-lg">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-teal-600" />
                    Key Points
                  </h3>
                  <ul className="space-y-2 text-gray-700 ml-7">
                    <li>No visa application or fee required before or upon arrival</li>
                    <li>Entry granted through passport inspection at border control</li>
                    <li>Permitted stay varies by country agreement (typically 14-90 days)</li>
                    <li>Usually limited to tourism and business purposes</li>
                    <li>Example: US citizens can enter most EU Schengen countries visa-free for up to 90 days within 180 days</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="visa-on-arrival" className="mb-12 scroll-mt-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What Is Visa on Arrival?</h2>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Visa on arrival is an entry classification where travelers can obtain their visa at the port of entry instead of applying at an embassy or consulate beforehand. Upon landing, passengers proceed to a visa-on-arrival counter, submit required documents, pay the visa fee, and receive their visa before passing through immigration control.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The application process at the airport is typically straightforward but can involve waiting in lines, especially during peak travel times. Required documents usually include a valid passport, passport photos, proof of accommodation, return flight tickets, and the visa fee in cash. Processing times range from 15 minutes to several hours depending on airport efficiency and passenger volume.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Visa on arrival provides flexibility for spontaneous travel but carries some risk. Immigration officers have discretion to deny entry if documentation is insufficient or if they determine the traveler does not meet entry requirements. This is more unpredictable than obtaining a visa in advance from an embassy where approval is confirmed before traveling.
                </p>
                <div className="bg-teal-50 border-l-4 border-teal-500 p-5 rounded-r-lg">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-teal-600" />
                    Key Points
                  </h3>
                  <ul className="space-y-2 text-gray-700 ml-7">
                    <li>Obtained at airport or land border upon arrival</li>
                    <li>Requires fee payment and document submission at entry point</li>
                    <li>Processing happens before immigration clearance</li>
                    <li>Can result in queues and potential denial at border</li>
                    <li>Example: Many nationalities can obtain a visa on arrival for Indonesia, Cambodia, or Jordan</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="evisa" className="mb-12 scroll-mt-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What Is an eVisa?</h2>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  An eVisa (electronic visa) is a digital visa that travelers apply for and receive entirely online without visiting an embassy or consulate. The application process involves filling out an online form, uploading required documents, and paying fees electronically. Once approved, the eVisa is sent via email as a PDF document that travelers print and present at the border.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The eVisa system streamlines visa processing by eliminating physical paperwork and in-person appointments. Processing times vary by country but typically range from 24 hours to 10 business days. Some countries offer expedited processing for an additional fee. Applicants can track their application status online and receive notifications about approval or requests for additional documentation.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  While more convenient than traditional visa applications, eVisas still require careful preparation. Applicants must ensure all uploaded documents meet specifications for file size, format, and content. Common documents include passport scans, photographs meeting specific requirements, proof of accommodation, flight itineraries, and bank statements. Incomplete or incorrect applications can result in delays or denial.
                </p>
                <div className="bg-teal-50 border-l-4 border-teal-500 p-5 rounded-r-lg">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-teal-600" />
                    Key Points
                  </h3>
                  <ul className="space-y-2 text-gray-700 ml-7">
                    <li>Applied for entirely online through official government portals</li>
                    <li>Requires document uploads and electronic fee payment</li>
                    <li>Processing takes 1-10 days depending on country</li>
                    <li>Approved eVisa sent via email for printing</li>
                    <li>Example: India, Turkey, Kenya, and Vietnam offer eVisas for many nationalities</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="eta" className="mb-12 scroll-mt-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What Is an eTA?</h2>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  An eTA (Electronic Travel Authorization) is a digital entry requirement for visa-exempt travelers before boarding flights to certain destinations. Unlike an eVisa, an eTA is not a visa but rather an automated pre-screening system that verifies eligibility for visa-free entry. The application process is simpler and faster than an eVisa, often taking just minutes to complete.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  ETAs are electronically linked to your passport number, so you do not need to present a physical document at the border. Airlines check eTA status before allowing boarding, preventing travelers without authorization from departing. Once approved, an eTA typically remains valid for multiple entries over several years or until passport expiration, whichever comes first.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  The application requires basic biographical information, passport details, and responses to security and admissibility questions. Most applications are approved instantly or within 72 hours. Fees are minimal compared to traditional visas. Despite being simpler than visa applications, travelers should apply for an eTA well before their departure date to allow time for any processing delays or issues.
                </p>
                <div className="bg-teal-50 border-l-4 border-teal-500 p-5 rounded-r-lg">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-teal-600" />
                    Key Points
                  </h3>
                  <ul className="space-y-2 text-gray-700 ml-7">
                    <li>Pre-screening authorization for visa-exempt travelers</li>
                    <li>Simple online application with instant or 72-hour processing</li>
                    <li>Electronically linked to passport (no physical document needed)</li>
                    <li>Valid for multiple entries over several years</li>
                    <li>Example: Canada eTA, US ESTA, Australia ETA, New Zealand NZeTA</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="visa-required" className="mb-12 scroll-mt-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What Does Visa Required Mean?</h2>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Visa required means travelers must obtain formal visa approval from an embassy, consulate, or visa application center before traveling. This is the most comprehensive entry requirement and involves submitting detailed applications with extensive documentation, attending in-person interviews in some cases, and waiting weeks or months for processing.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The traditional visa application process requires gathering supporting documents such as invitation letters, employment verification, bank statements, travel itineraries, accommodation bookings, and travel insurance. Many countries require biometric data collection (fingerprints and photographs) during the application process. Application fees are typically higher than eVisas or visas on arrival and are non-refundable even if the application is denied.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Processing times vary significantly based on the destination country, time of year, and visa type. Tourist visas may take 5-15 business days while work or study visas can take several months. Some countries offer expedited processing for urgent travel needs. Travelers should apply well in advance of their intended departure date and avoid making non-refundable travel arrangements before visa approval.
                </p>
                <div className="bg-teal-50 border-l-4 border-teal-500 p-5 rounded-r-lg">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-teal-600" />
                    Key Points
                  </h3>
                  <ul className="space-y-2 text-gray-700 ml-7">
                    <li>Must be obtained from embassy or consulate before travel</li>
                    <li>Requires extensive documentation and sometimes interviews</li>
                    <li>Processing takes weeks to months depending on visa type</li>
                    <li>Non-refundable fees even if denied</li>
                    <li>Example: US visitors require visas for Russia, China, and many African countries</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="passport-validity" className="mb-12 scroll-mt-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Passport Validity Requirements Explained</h2>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Passport validity requirements specify how long your passport must remain valid beyond your intended departure date from a destination country. The most common requirement is six months validity beyond departure, though some countries require only three months and a few allow entry with passports valid just for the duration of stay.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  These requirements exist to provide a buffer for unexpected travel delays, emergencies, or overstays. Airlines enforce passport validity rules strictly and will deny boarding if your passport does not meet destination requirements, even if you have a valid visa. This can result in missed flights and significant financial losses.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Passport validity is calculated from your planned departure date from the destination, not your arrival date. For multi-country trips, you must meet the validity requirements for each country you visit. Some countries also require a minimum number of blank pages for entry stamps. Check your specific destination requirements and renew your passport well in advance if needed.
                </p>
                <div className="bg-teal-50 border-l-4 border-teal-500 p-5 rounded-r-lg">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-teal-600" />
                    Key Points
                  </h3>
                  <ul className="space-y-2 text-gray-700 ml-7">
                    <li>Most countries require 6 months validity beyond departure date</li>
                    <li>Some countries accept 3 months validity</li>
                    <li>Airlines enforce these rules strictly at check-in</li>
                    <li>Calculated from departure date, not arrival date</li>
                    <li>May also require minimum blank pages for stamps</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="proof-of-funds" className="mb-12 scroll-mt-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Proof of Funds Requirements</h2>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Proof of funds demonstrates that you have sufficient financial resources to support yourself during your stay without working illegally or becoming a burden on the destination country. Immigration authorities use this to assess whether travelers can afford accommodation, food, transportation, and unexpected expenses during their visit.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Acceptable proof varies by country but typically includes recent bank statements, credit card statements, traveler's checks, or cash. Some countries specify minimum amounts required per day of stay or total amounts for the entire trip. Digital payment apps and screenshots may not be accepted as official proof. Immigration officers have discretion to request proof of funds at entry even if not explicitly stated as a requirement.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  While not always checked at borders, having adequate proof of funds available can prevent entry denial or secondary inspection. Business travelers can often provide company letters or sponsorship documentation instead of personal funds. For longer stays, some countries require more substantial proof such as employment letters, pension statements, or evidence of ongoing income.
                </p>
                <div className="bg-teal-50 border-l-4 border-teal-500 p-5 rounded-r-lg">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-teal-600" />
                    Key Points
                  </h3>
                  <ul className="space-y-2 text-gray-700 ml-7">
                    <li>Demonstrates financial ability to support yourself during stay</li>
                    <li>Common forms: bank statements, credit cards, cash, traveler's checks</li>
                    <li>Requirements vary by country (often $50-100 per day)</li>
                    <li>May be requested at immigration even if not listed requirement</li>
                    <li>Business travelers can use company sponsorship letters</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="onward-travel" className="mb-12 scroll-mt-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Onward or Return Ticket Requirements</h2>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Onward or return ticket requirements mandate that travelers show proof of departure from a country within the permitted stay period. This can be a return ticket to your home country or an onward ticket to another destination. Immigration authorities use this to ensure visitors do not overstay their authorized period or attempt to remain illegally.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Airlines often enforce this requirement more strictly than immigration because they can be fined or required to return passengers who are denied entry. Many airlines will not allow boarding without proof of onward travel, even if you have a valid visa. This particularly affects one-way ticket holders and long-term travelers with flexible itineraries.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Acceptable proof includes confirmed flight bookings, train tickets crossing borders, or bus tickets to neighboring countries. The departure must occur within your permitted stay period. Some travelers use refundable tickets or onward ticket rental services to meet this requirement when plans are uncertain. Immigration officers may also accept proof of sufficient funds for purchasing departure tickets, though this is less reliable.
                </p>
                <div className="bg-teal-50 border-l-4 border-teal-500 p-5 rounded-r-lg">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-teal-600" />
                    Key Points
                  </h3>
                  <ul className="space-y-2 text-gray-700 ml-7">
                    <li>Proof of departure within permitted stay period</li>
                    <li>Can be return or onward ticket to any destination</li>
                    <li>Airlines strictly enforce before allowing boarding</li>
                    <li>Flight, train, or bus tickets across borders accepted</li>
                    <li>Ticket date must be within authorized stay duration</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Entry Type Comparison</h2>
              <div className="overflow-x-auto">
                <table className="w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">Entry Type</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">Application Before Travel</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">Fee Required</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">Typical Stay Duration</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">Denial Risk at Airport</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Visa-Free</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Not required</td>
                      <td className="px-6 py-4 text-sm text-gray-700">None</td>
                      <td className="px-6 py-4 text-sm text-gray-700">14-90 days</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Very low</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">eTA</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Yes (online, instant-72 hrs)</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Low ($5-20)</td>
                      <td className="px-6 py-4 text-sm text-gray-700">90-180 days</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Very low</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">eVisa</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Yes (online, 1-10 days)</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Moderate ($25-100)</td>
                      <td className="px-6 py-4 text-sm text-gray-700">30-90 days</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Low</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Visa on Arrival</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Not required</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Moderate ($20-100)</td>
                      <td className="px-6 py-4 text-sm text-gray-700">15-90 days</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Moderate</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Visa Required</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Yes (embassy, weeks-months)</td>
                      <td className="px-6 py-4 text-sm text-gray-700">High ($50-300+)</td>
                      <td className="px-6 py-4 text-sm text-gray-700">30-180 days</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Very low (pre-approved)</td>
                    </tr>
                  </tbody>
                </table>
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
                          Check visa requirements by passport and destination country
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/visa-guides" className="group">
                  <Card className="transition-all duration-200 hover:shadow-lg hover:border-teal-200">
                    <CardContent className="flex items-center justify-between p-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                          All Visa Guides
                        </h3>
                        <p className="text-sm text-gray-600">
                          Browse our complete library of visa guides and travel resources
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
                          Plan your trip and check visa requirements for multiple destinations
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </section>

            <FAQBlock faqs={faqs} />
          </article>
        </div>
      </div>
    </>
  );
}
