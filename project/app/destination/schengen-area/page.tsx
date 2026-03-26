import { Metadata } from 'next';
import Link from 'next/link';
import { canonicalUrl, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';
import { SCHENGEN_COUNTRIES } from '@/lib/schengen';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AirportLayoverNotice from '@/components/AirportLayoverNotice';

const PAGE_URL = canonicalUrl('/destination/schengen-area');
const TITLE = 'Schengen Area Visa Requirements by Nationality 2026 | VisaInfoGuide';
const DESCRIPTION =
  'Schengen Area visa requirements by passport nationality. Check visa-free access, the 90/180-day rule, passport validity requirements, and entry documents needed for 29 European countries.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    url: PAGE_URL,
    siteName: 'VisaInfoGuide',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
};

const VISA_FREE_PASSPORTS = [
  { slug: 'united-states', name: 'United States', days: 90, note: '90 days / 180 days' },
  { slug: 'united-kingdom', name: 'United Kingdom', days: 90, note: '90 days / 180 days' },
  { slug: 'canada', name: 'Canada', days: 90, note: '90 days / 180 days' },
  { slug: 'australia', name: 'Australia', days: 90, note: '90 days / 180 days' },
  { slug: 'japan', name: 'Japan', days: 90, note: '90 days / 180 days' },
  { slug: 'south-korea', name: 'South Korea', days: 90, note: '90 days / 180 days' },
  { slug: 'singapore', name: 'Singapore', days: 90, note: '90 days / 180 days' },
  { slug: 'new-zealand', name: 'New Zealand', days: 90, note: '90 days / 180 days' },
  { slug: 'brazil', name: 'Brazil', days: 90, note: '90 days / 180 days' },
  { slug: 'argentina', name: 'Argentina', days: 90, note: '90 days / 180 days' },
  { slug: 'chile', name: 'Chile', days: 90, note: '90 days / 180 days' },
  { slug: 'colombia', name: 'Colombia', days: 90, note: '90 days / 180 days' },
  { slug: 'mexico', name: 'Mexico', days: 90, note: '90 days / 180 days' },
  { slug: 'malaysia', name: 'Malaysia', days: 90, note: '90 days / 180 days' },
  { slug: 'israel', name: 'Israel', days: 90, note: '90 days / 180 days' },
  { slug: 'ukraine', name: 'Ukraine', days: 90, note: '90 days / 180 days' },
];

const VISA_REQUIRED_PASSPORTS = [
  { slug: 'india', name: 'India', note: 'Schengen visa required' },
  { slug: 'china', name: 'China', note: 'Schengen visa required' },
  { slug: 'nigeria', name: 'Nigeria', note: 'Schengen visa required' },
  { slug: 'vietnam', name: 'Vietnam', note: 'Schengen visa required' },
  { slug: 'indonesia', name: 'Indonesia', note: 'Schengen visa required' },
  { slug: 'philippines', name: 'Philippines', note: 'Schengen visa required' },
  { slug: 'south-africa', name: 'South Africa', note: 'Schengen visa required' },
  { slug: 'egypt', name: 'Egypt', note: 'Schengen visa required' },
  { slug: 'turkey', name: 'Turkey', note: 'Schengen visa required' },
  { slug: 'morocco', name: 'Morocco', note: 'Schengen visa required' },
  { slug: 'thailand', name: 'Thailand', note: 'Schengen visa required' },
  { slug: 'russia', name: 'Russia', note: 'Schengen visa required (highly restricted)' },
];

const SCHENGEN_MEMBER_LINKS: Array<{ slug: string; name: string }> = [
  { slug: 'austria', name: 'Austria' },
  { slug: 'belgium', name: 'Belgium' },
  { slug: 'croatia', name: 'Croatia' },
  { slug: 'czech-republic', name: 'Czech Republic' },
  { slug: 'denmark', name: 'Denmark' },
  { slug: 'finland', name: 'Finland' },
  { slug: 'france', name: 'France' },
  { slug: 'germany', name: 'Germany' },
  { slug: 'greece', name: 'Greece' },
  { slug: 'hungary', name: 'Hungary' },
  { slug: 'italy', name: 'Italy' },
  { slug: 'netherlands', name: 'Netherlands' },
  { slug: 'norway', name: 'Norway' },
  { slug: 'poland', name: 'Poland' },
  { slug: 'portugal', name: 'Portugal' },
  { slug: 'sweden', name: 'Sweden' },
  { slug: 'switzerland', name: 'Switzerland' },
];

const FAQS = [
  {
    question: 'What is the Schengen Area?',
    answer:
      'The Schengen Area is a zone of 29 European countries that have abolished passport controls at their mutual borders. A single Schengen visa allows travel across all member states without additional checks.',
  },
  {
    question: 'How does the 90/180-day rule work?',
    answer:
      'Visa-free visitors may stay up to 90 days within any rolling 180-day period across the entire Schengen Area. The window is calculated backward from each day you are present, not as fixed calendar blocks. Both entry and exit days count toward the 90-day limit.',
  },
  {
    question: 'Do I need a separate visa for each Schengen country?',
    answer:
      'No. A Schengen visa or visa-free access applies across all 29 member states. However, if your visit requires a national visa (e.g., a long-stay visa for France), that covers only the issuing country.',
  },
  {
    question: 'What is ETIAS and when does it start?',
    answer:
      'ETIAS (European Travel Information and Authorisation System) is an entry pre-screening requirement for visa-exempt nationals. It was expected to launch in 2025 but has been delayed. Once active, travelers from currently visa-free countries (e.g., US, UK, Australia) will need to apply online before each trip.',
  },
  {
    question: 'What documents do I need to enter the Schengen Area?',
    answer:
      'You generally need a valid passport (valid at least 3 months beyond your planned departure from Schengen), proof of sufficient funds, return or onward travel tickets, travel health insurance covering at least €30,000, and proof of accommodation. Visa holders must also carry their Schengen visa.',
  },
  {
    question: 'Which countries are in the Schengen Area?',
    answer:
      'The 29 Schengen members are: Austria, Belgium, Croatia, Czech Republic, Denmark, Estonia, Finland, France, Germany, Greece, Hungary, Iceland, Italy, Latvia, Liechtenstein, Lithuania, Luxembourg, Malta, Netherlands, Norway, Poland, Portugal, Romania, Slovakia, Slovenia, Spain, Sweden, and Switzerland.',
  },
];

export default function SchengenAreaPage() {
  const breadcrumbSchema = breadcrumbJsonLd([
    { name: 'Home', url: 'https://visainfoguide.com' },
    { name: 'Destinations', url: 'https://visainfoguide.com/resources' },
    { name: 'Schengen Area', url: PAGE_URL },
  ]);

  const faqSchema = faqJsonLd(FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-white">
        <div className="bg-gradient-to-b from-blue-50 to-white border-b">
          <div className="container mx-auto px-4 py-10">
            <nav className="text-sm text-gray-500 mb-5">
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/resources" className="hover:text-blue-600 transition-colors">Destinations</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-medium">Schengen Area</span>
            </nav>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Schengen Area Visa Requirements
              </h1>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-sm px-3 py-1">
                29 Countries
              </Badge>
            </div>

            <p className="text-lg text-gray-600 max-w-3xl">
              The Schengen Area covers 29 European countries with a shared border-free travel zone.
              One visa — or visa-free status — gives you access to all member states under the 90/180-day rule.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <Link
                href="/tools/schengen-calculator"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Calculate Your Schengen Days
              </Link>
              <Link
                href="/guides/schengen-90-180-rule"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors text-sm"
              >
                How the 90/180 Rule Works
              </Link>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-10">
          <div className="max-w-6xl mx-auto space-y-10">

            <div className="grid md:grid-cols-3 gap-5">
              <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                <div className="text-2xl font-bold text-green-700 mb-1">90 days</div>
                <div className="text-sm text-green-800 font-medium">Max visa-free stay</div>
                <div className="text-xs text-gray-600 mt-1">per any 180-day rolling period</div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <div className="text-2xl font-bold text-blue-700 mb-1">29 countries</div>
                <div className="text-sm text-blue-800 font-medium">Schengen members</div>
                <div className="text-xs text-gray-600 mt-1">one entry covers all</div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <div className="text-2xl font-bold text-amber-700 mb-1">ETIAS</div>
                <div className="text-sm text-amber-800 font-medium">Coming soon</div>
                <div className="text-xs text-gray-600 mt-1">pre-travel authorisation for visa-exempt nationals</div>
              </div>
            </div>

            <Card>
              <CardHeader className="bg-green-50 border-b border-green-100">
                <div className="flex items-center gap-3">
                  <Badge className="bg-green-600 text-white text-sm px-3 py-1">Visa-Free</Badge>
                  <span className="text-gray-600 text-sm">({VISA_FREE_PASSPORTS.length}+ passports shown)</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  These nationalities can enter the Schengen Area without a visa for up to 90 days in any 180-day period.
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {VISA_FREE_PASSPORTS.map(p => (
                    <Link
                      key={p.slug}
                      href={`/passport/${p.slug}`}
                      className="flex items-center justify-between p-3.5 border rounded-lg hover:border-green-500 hover:shadow-sm transition-all bg-white group"
                    >
                      <div>
                        <div className="font-medium text-gray-900 text-sm group-hover:text-green-700 transition-colors">{p.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{p.note}</div>
                      </div>
                      <span className="text-green-600 text-xs font-medium shrink-0 ml-2">Visa-free →</span>
                    </Link>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  Many additional nationalities qualify for visa-free entry. Check your passport page for details.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-red-50 border-b border-red-100">
                <div className="flex items-center gap-3">
                  <Badge className="bg-red-600 text-white text-sm px-3 py-1">Visa Required</Badge>
                  <span className="text-gray-600 text-sm">({VISA_REQUIRED_PASSPORTS.length} passports shown)</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  These nationalities must obtain a Schengen visa before traveling. Apply at the embassy of your main destination country.
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {VISA_REQUIRED_PASSPORTS.map(p => (
                    <Link
                      key={p.slug}
                      href={`/passport/${p.slug}`}
                      className="flex items-center justify-between p-3.5 border rounded-lg hover:border-red-400 hover:shadow-sm transition-all bg-white group"
                    >
                      <div>
                        <div className="font-medium text-gray-900 text-sm group-hover:text-red-700 transition-colors">{p.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{p.note}</div>
                      </div>
                      <span className="text-red-500 text-xs font-medium shrink-0 ml-2">Details →</span>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>The 90/180-Day Rule Explained</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  The Schengen 90/180 rule allows visa-free travelers to spend a maximum of <strong>90 days</strong> within
                  the Schengen Area during any <strong>rolling 180-day period</strong>. This is not a fixed bi-annual
                  calendar — it rolls backward from every single day you are present.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-2">
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="font-semibold text-gray-900">Key rules</div>
                    <ul className="space-y-1.5 text-gray-600">
                      <li className="flex gap-2"><span className="text-green-600 font-bold">✓</span> Both entry and exit days count</li>
                      <li className="flex gap-2"><span className="text-green-600 font-bold">✓</span> Days accumulate across all 29 countries</li>
                      <li className="flex gap-2"><span className="text-green-600 font-bold">✓</span> Window resets rolling, not on a fixed date</li>
                      <li className="flex gap-2"><span className="text-red-500 font-bold">✗</span> Cannot be reset by leaving and re-entering</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="font-semibold text-gray-900">Overstay penalties</div>
                    <ul className="space-y-1.5 text-gray-600">
                      <li className="flex gap-2"><span className="text-red-500">•</span> Fines and immediate deportation</li>
                      <li className="flex gap-2"><span className="text-red-500">•</span> Entry ban for 1–5 years</li>
                      <li className="flex gap-2"><span className="text-red-500">•</span> Future visa applications affected</li>
                      <li className="flex gap-2"><span className="text-red-500">•</span> Flagged in Schengen Information System</li>
                    </ul>
                  </div>
                </div>
                <div className="pt-2">
                  <Link
                    href="/tools/schengen-calculator"
                    className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
                  >
                    Use the free Schengen Day Calculator →
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Required Entry Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  {[
                    {
                      title: 'Valid Passport',
                      detail: 'Must be valid for at least 3 months beyond your planned departure from the Schengen Area. Must have been issued within the last 10 years.',
                    },
                    {
                      title: 'Travel Health Insurance',
                      detail: 'Minimum coverage of €30,000 for medical emergencies and repatriation. Must be valid in all Schengen countries for the entire trip duration.',
                    },
                    {
                      title: 'Proof of Sufficient Funds',
                      detail: 'Bank statements, credit cards, or cash showing you can support yourself. Requirements vary by country but typically €50–100 per day.',
                    },
                    {
                      title: 'Return / Onward Ticket',
                      detail: 'Proof you intend to leave before the 90-day limit. Airline reservation showing a departure from the Schengen Area is usually sufficient.',
                    },
                    {
                      title: 'Accommodation Proof',
                      detail: 'Hotel bookings, Airbnb confirmations, or a letter of invitation from a host with their address and contact details.',
                    },
                    {
                      title: 'Schengen Visa (if required)',
                      detail: 'Apply at the embassy or consulate of your main destination country. Processing typically takes 10–15 business days; apply at least 3–4 weeks before travel.',
                    },
                  ].map(item => (
                    <div key={item.title} className="bg-gray-50 rounded-lg p-4">
                      <div className="font-semibold text-gray-900 mb-1">{item.title}</div>
                      <div className="text-gray-600 leading-relaxed">{item.detail}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Schengen Member Countries</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Your Schengen visa or visa-free allowance covers all {SCHENGEN_COUNTRIES.length} member states.
                  Click any country to see its individual entry requirements.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {SCHENGEN_COUNTRIES.map(country => {
                    const linked = SCHENGEN_MEMBER_LINKS.find(
                      l => l.name.toLowerCase() === country.toLowerCase()
                    );
                    return linked ? (
                      <Link
                        key={country}
                        href={`/destination/${linked.slug}`}
                        className="px-3 py-2 border rounded-lg text-sm text-gray-700 hover:border-blue-500 hover:text-blue-700 hover:bg-blue-50 transition-all text-center"
                      >
                        {country}
                      </Link>
                    ) : (
                      <div
                        key={country}
                        className="px-3 py-2 border rounded-lg text-sm text-gray-500 text-center bg-gray-50"
                      >
                        {country}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Check Requirements by Passport</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  Select your passport to see a full breakdown of Schengen entry requirements, visa-free countries, and travel conditions.
                </p>
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {[
                    'united-states', 'united-kingdom', 'india', 'china',
                    'germany', 'france', 'canada', 'australia',
                    'japan', 'singapore', 'brazil', 'mexico',
                  ].map(slug => (
                    <Link
                      key={slug}
                      href={`/passport/${slug}`}
                      className="block p-3 border rounded-lg hover:border-blue-500 hover:shadow-sm transition-all bg-white"
                    >
                      <div className="text-sm font-medium text-gray-900">
                        {slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">View passport →</div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {FAQS.map(faq => (
                  <div key={faq.question} className="border-b last:border-0 pb-5 last:pb-0">
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm">{faq.question}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <AirportLayoverNotice variant="hotels inside airports" />

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="py-5">
                <p className="text-sm text-gray-700">
                  <strong>Disclaimer:</strong> Visa requirements and travel regulations change frequently.
                  Always verify current entry rules with official government sources or the relevant embassy
                  before making travel arrangements. This page is for informational purposes only.
                </p>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </>
  );
}
