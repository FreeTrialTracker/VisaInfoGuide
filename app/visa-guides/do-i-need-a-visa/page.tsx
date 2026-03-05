import { Metadata } from 'next';
import Link from 'next/link';
import { canonicalUrl, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';
import { CheckCircle, ArrowRight, Search, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQBlock from '@/components/visa-guides/FAQBlock';

export const metadata: Metadata = {
  title: 'Do I Need a Visa? Check Visa Requirements by Passport and Destination (2026)',
  description: 'Check if you need a visa based on your passport and destination. Get instant visa requirement answers for 2026 including visa-free, visa on arrival, eVisa, and visa required outcomes.',
  alternates: {
    canonical: canonicalUrl('/visa-guides/do-i-need-a-visa'),
  },
  openGraph: {
    title: 'Do I Need a Visa? Check Visa Requirements by Passport and Destination (2026)',
    description: 'Check if you need a visa based on your passport and destination. Get instant visa requirement answers for 2026 including visa-free, visa on arrival, eVisa, and visa required outcomes.',
    type: 'website',
    url: canonicalUrl('/visa-guides/do-i-need-a-visa'),
    images: [{
      url: canonicalUrl('/og/legal-og'),
      width: 1200,
      height: 630,
      alt: 'Do I Need a Visa? Visa Requirements Guide',
    }],
    siteName: 'VisaInfoGuide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Do I Need a Visa? Check Visa Requirements by Passport and Destination (2026)',
    description: 'Check if you need a visa based on your passport and destination. Get instant visa requirement answers for 2026.',
    images: [canonicalUrl('/og/legal-og')],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const popularChecks = [
  {
    title: 'Do US citizens need a visa for Thailand?',
    slug: 'do-us-citizens-need-visa-for-thailand-2026',
  },
  {
    title: 'Do Indians need a visa for Japan?',
    slug: 'do-indians-need-visa-for-japan-2026',
  },
  {
    title: 'Do UK citizens need a visa for USA?',
    slug: 'do-uk-citizens-need-visa-for-usa-2026',
  },
  {
    title: 'Do Chinese citizens need a visa for France?',
    slug: 'do-chinese-citizens-need-visa-for-france-2026',
  },
  {
    title: 'Do Thais need a visa for Japan?',
    slug: 'do-thais-need-visa-for-japan-2026',
  },
  {
    title: 'Do Australians need a visa for the UK?',
    slug: 'do-australians-need-visa-for-uk-2026',
  },
  {
    title: 'Do Germans need a visa for the USA?',
    slug: 'do-germans-need-visa-for-usa-2026',
  },
  {
    title: 'Do Canadians need a visa for Japan?',
    slug: 'do-canadians-need-visa-for-japan-2026',
  },
];

const mostSearchedQuestions = [
  { title: 'Do US citizens need a visa for Europe?', slug: 'do-us-citizens-need-visa-for-europe-2026' },
  { title: 'Do Indians need a visa for Dubai?', slug: 'do-indians-need-visa-for-dubai-2026' },
  { title: 'Do UK citizens need a visa for Australia?', slug: 'do-uk-citizens-need-visa-for-australia-2026' },
  { title: 'Do Canadians need a visa for Thailand?', slug: 'do-canadians-need-visa-for-thailand-2026' },
  { title: 'Do Chinese citizens need a visa for Singapore?', slug: 'do-chinese-citizens-need-visa-for-singapore-2026' },
  { title: 'Do Germans need a visa for USA?', slug: 'do-germans-need-visa-for-usa-2026' },
  { title: 'Do Australians need a visa for Japan?', slug: 'do-australians-need-visa-for-japan-2026' },
  { title: 'Do Filipinos need a visa for South Korea?', slug: 'do-filipinos-need-visa-for-south-korea-2026' },
  { title: 'Do Brazilians need a visa for USA?', slug: 'do-brazilians-need-visa-for-usa-2026' },
  { title: 'Do South Africans need a visa for UK?', slug: 'do-south-africans-need-visa-for-uk-2026' },
  { title: 'Do Mexicans need a visa for Canada?', slug: 'do-mexicans-need-visa-for-canada-2026' },
  { title: 'Do Vietnamese need a visa for Thailand?', slug: 'do-vietnamese-need-visa-for-thailand-2026' },
];

const visaOutcomes = [
  {
    title: 'Visa-Free',
    description: 'No visa required for entry, stay permitted for a specific period',
    anchor: 'visa-free',
  },
  {
    title: 'Visa on Arrival',
    description: 'Visa issued at the port of entry upon arrival',
    anchor: 'visa-on-arrival',
  },
  {
    title: 'eVisa',
    description: 'Electronic visa obtained online before travel',
    anchor: 'evisa',
  },
  {
    title: 'eTA',
    description: 'Electronic Travel Authorization required before travel',
    anchor: 'eta',
  },
  {
    title: 'Visa Required',
    description: 'Must apply for visa at embassy or consulate before travel',
    anchor: 'visa-required',
  },
];

const faqs = [
  {
    question: 'How do I know if I need a visa for my destination?',
    answer: 'Visa requirements depend on your passport country, destination country, length of stay, and purpose of visit. Use our Trip Visa Finder tool to check specific requirements for your itinerary.',
  },
  {
    question: 'Can visa requirements change?',
    answer: 'Yes, visa requirements can change frequently due to diplomatic agreements, policy updates, or special circumstances. Always verify requirements with official government sources close to your departure date.',
  },
  {
    question: 'What\'s the difference between visa-free and visa on arrival?',
    answer: 'Visa-free means no visa is required at all for entry. Visa on arrival means you can obtain a visa when you arrive at the port of entry, usually by paying a fee and providing required documents.',
  },
  {
    question: 'Do I need a visa for a layover or transit?',
    answer: 'Transit visa requirements vary by country and depend on whether you leave the airport transit area. Some countries allow airside transit without a visa, while others require a transit visa even for short layovers.',
  },
  {
    question: 'How long does it take to get a visa?',
    answer: 'Processing times vary significantly by country and visa type. Tourist visas typically take 3-15 business days, but some can take several weeks or months. eVisas are usually faster, often processed within 1-7 days.',
  },
  {
    question: 'Can I enter a country without a visa if I have a residence permit elsewhere?',
    answer: 'Generally, no. Visa requirements are based on your passport nationality, not your residence status. However, some countries offer visa exemptions for residents of specific countries or regions. Check requirements for your specific passport.',
  },
];

export default function DoINeedVisaHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Visa Guides', url: '/visa-guides' },
            { name: 'Do I Need a Visa?', url: '/visa-guides/do-i-need-a-visa' },
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
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <Breadcrumbs
            items={[
              { name: 'Visa Guides', url: '/visa-guides' },
              { name: 'Do I Need a Visa?', url: '/visa-guides/do-i-need-a-visa' },
            ]}
          />

          <header className="mt-8 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Do I Need a Visa? Check Visa Requirements by Passport and Destination (2026)
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
              Confirm whether you need a visa based on your passport and destination country. Visa requirements vary by nationality, length of stay, and purpose of travel. Use our tools and guides to get accurate, up-to-date visa information.
            </p>
          </header>

          <div className="bg-teal-50 border-l-4 border-teal-500 rounded-lg p-6 mb-12">
            <div className="flex items-start gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Quick Answer</h2>
                <p className="text-gray-800 leading-relaxed mb-4">
                  Whether you need a visa depends on four key factors: your passport nationality, destination country, length of stay, and purpose of visit. Most visa requirements can be checked instantly.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
                >
                  <Search className="w-4 h-4" />
                  Check Your Visa Requirements Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Visa Checks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {popularChecks.map((check) => (
                <Link key={check.slug} href={`/visa-guides/${check.slug}`} className="group">
                  <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-teal-200">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900 font-medium group-hover:text-teal-700 transition-colors">
                          {check.title}
                        </span>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/visa-guides/do-i-need-a-visa/articles"
                className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium"
              >
                <FileText className="w-4 h-4" />
                Browse All Visa Requirement Articles
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Check if You Need a Visa</h2>
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
              <ol className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-8 h-8 bg-teal-100 text-teal-700 font-bold rounded-full flex-shrink-0">
                    1
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Identify Your Passport Country</h3>
                    <p className="text-gray-700">Visa requirements are based on your passport nationality, not where you currently live or were born.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-8 h-8 bg-teal-100 text-teal-700 font-bold rounded-full flex-shrink-0">
                    2
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Confirm Your Destination and Purpose</h3>
                    <p className="text-gray-700">Different rules apply for tourism, business, work, or study. Transit passengers may have different requirements.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-8 h-8 bg-teal-100 text-teal-700 font-bold rounded-full flex-shrink-0">
                    3
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Use Our Trip Visa Finder Tool</h3>
                    <p className="text-gray-700 mb-3">Get instant visa requirements for your entire trip itinerary, including multiple destinations.</p>
                    <Link
                      href="/"
                      className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium text-sm"
                    >
                      Open Trip Visa Finder
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </li>
              </ol>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Common Visa Requirement Outcomes</h2>
            <div className="space-y-3">
              {visaOutcomes.map((outcome) => (
                <Link
                  key={outcome.anchor}
                  href={`/visa-guides/travel-visa-rules#${outcome.anchor}`}
                  className="block group"
                >
                  <div className="bg-white border border-gray-200 rounded-lg p-5 transition-all duration-200 hover:shadow-md hover:border-teal-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-teal-700 transition-colors">
                          {outcome.title}
                        </h3>
                        <p className="text-sm text-gray-600">{outcome.description}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0 ml-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Most Searched Visa Questions (2026)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mostSearchedQuestions.map((question) => (
                <Link
                  key={question.slug}
                  href={`/visa-guides/${question.slug}`}
                  className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-teal-200 hover:shadow-md transition-all group"
                >
                  <span className="text-gray-900 text-sm group-hover:text-teal-700 transition-colors">
                    {question.title}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0 ml-auto" />
                </Link>
              ))}
            </div>
          </section>

          <FAQBlock faqs={faqs} />

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Sources and Data Policy</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                Our visa requirement information is compiled from official government sources, embassy websites, and verified international travel databases. We update our data regularly to ensure accuracy.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/methodology"
                  className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium"
                >
                  View Our Methodology
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/data-sources"
                  className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium"
                >
                  Data Sources
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
