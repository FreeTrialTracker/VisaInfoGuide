import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Laptop, Globe, CircleCheck as CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Breadcrumbs from '@/components/Breadcrumbs';
import { canonicalUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Digital Nomad Visas by Country (2026) | VisaInfoGuide',
  description: 'Complete guide to digital nomad visas in 2026. Covers every country offering official remote work visa programs, minimum income requirements, maximum stay durations, tax benefits, and step-by-step application guidance.',
  alternates: { canonical: canonicalUrl('/digital-nomad-visas') },
  openGraph: {
    title: 'Digital Nomad Visas by Country (2026)',
    description: 'Which countries offer official digital nomad visa programs in 2026? Requirements, costs, and application guides.',
    type: 'article',
    url: canonicalUrl('/digital-nomad-visas'),
    siteName: 'VisaInfoGuide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Nomad Visas by Country (2026)',
    description: 'Which countries offer official digital nomad visa programs in 2026?',
  },
  robots: { index: true, follow: true },
};

const nomadCountries = [
  {
    name: 'Portugal',
    slug: 'portugal',
    flag: '🇵🇹',
    visaName: 'Digital Nomad Visa (D8)',
    minIncome: '€3,040/month',
    duration: '1 year (renewable)',
    highlights: ['EU/Schengen access', 'Path to residency', 'No remote work restrictions'],
  },
  {
    name: 'Spain',
    slug: 'spain',
    flag: '🇪🇸',
    visaName: 'Digital Nomad Visa',
    minIncome: '€2,160/month',
    duration: '1 year (renewable to 3)',
    highlights: ['EU/Schengen access', 'Family members included', 'Fast-track processing'],
  },
  {
    name: 'Germany',
    slug: 'germany',
    flag: '🇩🇪',
    visaName: 'Freelance Visa (Freiberufler)',
    minIncome: 'Sufficient funds',
    duration: '3 months to 3 years',
    highlights: ['EU/Schengen access', 'Strong infrastructure', 'Multiple categories'],
  },
  {
    name: 'Croatia',
    slug: 'croatia',
    flag: '🇭🇷',
    visaName: 'Digital Nomad Residence Permit',
    minIncome: '€2,538/month',
    duration: '1 year',
    highlights: ['EU member', 'Adriatic coast', 'Tax exempt on foreign income'],
  },
  {
    name: 'Greece',
    slug: 'greece',
    flag: '🇬🇷',
    visaName: 'Digital Nomad Visa',
    minIncome: '€3,500/month',
    duration: '1 year (renewable)',
    highlights: ['50% income tax reduction', 'EU/Schengen access', 'Mediterranean lifestyle'],
  },
  {
    name: 'Indonesia',
    slug: 'indonesia',
    flag: '🇮🇩',
    visaName: 'E33G Digital Nomad Visa',
    minIncome: '$2,000/month',
    duration: '6 months (renewable to 1 year)',
    highlights: ['Bali-based', 'No local tax on foreign income', 'Easy application'],
  },
  {
    name: 'Thailand',
    slug: 'thailand',
    flag: '🇹🇭',
    visaName: 'Long-Term Resident (LTR) Visa',
    minIncome: '$80,000/year',
    duration: '10 years',
    highlights: ['90-day border run eliminated', 'Work permit included', 'Tax incentives'],
  },
  {
    name: 'United Arab Emirates',
    slug: 'united-arab-emirates',
    flag: '🇦🇪',
    visaName: 'Remote Work Visa',
    minIncome: '$3,500/month',
    duration: '1 year',
    highlights: ['0% income tax', 'Dubai/Abu Dhabi base', 'Modern infrastructure'],
  },
  {
    name: 'Colombia',
    slug: 'colombia',
    flag: '🇨🇴',
    visaName: 'Digital Nomad Visa (M Visa)',
    minIncome: '3x minimum wage (~$780/month)',
    duration: '2 years',
    highlights: ['Low cost of living', 'Vibrant cities', 'Path to residency'],
  },
  {
    name: 'Brazil',
    slug: 'brazil',
    flag: '🇧🇷',
    visaName: 'Digital Nomad Visa',
    minIncome: '$1,500/month',
    duration: '1 year (renewable)',
    highlights: ['Large expat community', 'Diverse landscapes', 'Straightforward process'],
  },
  {
    name: 'Argentina',
    slug: 'argentina',
    flag: '🇦🇷',
    visaName: 'Digital Nomad Visa',
    minIncome: 'No minimum',
    duration: '6 months (renewable)',
    highlights: ['Low cost of living', 'Buenos Aires hub', 'Welcoming culture'],
  },
  {
    name: 'Norway',
    slug: 'norway',
    flag: '🇳🇴',
    visaName: 'Svalbard Remote Work',
    minIncome: 'Sufficient funds',
    duration: 'Up to 1 year',
    highlights: ['Unique Arctic location', 'No residency permit required', 'High quality of life'],
  },
];

const faqs = [
  {
    q: 'What is a digital nomad visa?',
    a: 'A digital nomad visa is a special residence permit that allows remote workers and freelancers to live legally in a country while working for employers or clients based elsewhere. Unlike a standard tourist visa, it is specifically designed for people who work online.',
  },
  {
    q: 'How much do digital nomad visas cost?',
    a: 'Costs vary significantly. Application fees typically range from $100 to $500. Some countries like Portugal and Spain require proof of minimum monthly income, while others require a one-time fee or health insurance. Budget for the visa fee plus any required health insurance and notarized documents.',
  },
  {
    q: 'Can I pay taxes in my home country instead?',
    a: 'Tax obligations depend on your home country\'s tax laws, the host country\'s rules, and any tax treaties between them. Many digital nomad visa holders benefit from tax exemptions on foreign-sourced income. Always consult a tax professional familiar with cross-border taxation.',
  },
  {
    q: 'Do digital nomad visas allow me to bring family?',
    a: 'Many programs allow family members (spouse and dependent children) to apply as secondary applicants. Portugal, Spain, and several Latin American countries explicitly include family provisions in their digital nomad visa programs.',
  },
];

export default function DigitalNomadVisasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://visainfoguide.com/' },
              { '@type': 'ListItem', position: 2, name: 'Digital Nomad Visas', item: 'https://visainfoguide.com/digital-nomad-visas' },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <Breadcrumbs items={[{ name: 'Digital Nomad Visas', url: '/digital-nomad-visas' }]} />

          <header className="mt-8 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Digital Nomad Visas (2026)
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              More countries than ever offer official visa programs for remote workers and freelancers. This guide covers every country with an active digital nomad visa program in 2026 — income requirements, stay duration, and key benefits.
            </p>
            <Link href="/countries-with-digital-nomad-visa" className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium">
              See the full country list
              <ArrowRight className="w-4 h-4" />
            </Link>
          </header>

          <section className="mb-14">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Laptop className="w-6 h-6 text-gray-600" />
              Countries with Digital Nomad Visa Programs
            </h2>
            <div className="grid gap-5">
              {nomadCountries.map((c) => (
                <Card key={c.slug} className="transition-all duration-200 hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <span className="text-4xl flex-shrink-0">{c.flag}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <Link href={`/destination/${c.slug}`} className="text-xl font-bold text-gray-900 hover:text-teal-700 transition-colors">
                            {c.name}
                          </Link>
                          <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                            {c.visaName}
                          </span>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-2 mb-3 text-sm">
                          <div>
                            <span className="text-gray-500">Min. income: </span>
                            <span className="font-medium text-gray-800">{c.minIncome}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Duration: </span>
                            <span className="font-medium text-gray-800">{c.duration}</span>
                          </div>
                        </div>
                        <ul className="flex flex-wrap gap-2">
                          {c.highlights.map((h) => (
                            <li key={h} className="flex items-center gap-1 text-xs text-gray-600 bg-teal-50 px-2 py-1 rounded-full">
                              <CheckCircle className="w-3 h-3 text-teal-500 flex-shrink-0" />
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-14">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.q} className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          <aside className="mb-10 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mt-0.5">
                <svg className="w-5 h-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-blue-900 mb-1">Planning a Longer Stay or Permanent Move?</p>
                <p className="text-sm text-blue-800 leading-relaxed mb-3">
                  Digital nomad visas are just the start. If you are considering{' '}
                  <a href="https://www.immigrationinfoguide.com" target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-2 hover:text-blue-600 transition-colors">
                    long-term residency, work visas, or permanent residence
                  </a>
                  , ImmigrationInfoGuide covers immigration pathways for 100+ countries — including family reunification, skilled worker visas, and citizenship routes.
                </p>
                <a
                  href="https://www.immigrationinfoguide.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  Explore immigration pathways
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                </a>
              </div>
            </div>
          </aside>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related</h2>
            <div className="grid gap-3">
              {[
                { href: '/countries-with-digital-nomad-visa', label: 'Countries with Digital Nomad Visa', desc: 'Full directory of nomad-friendly countries' },
                { href: '/visa-free-countries', label: 'Visa-Free Countries by Passport', desc: 'Where you can travel without any visa' },
                { href: '/evisa-countries', label: 'eVisa Countries', desc: 'Countries with online visa applications' },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="group">
                  <Card className="transition-all duration-200 hover:shadow-md hover:border-teal-200">
                    <CardContent className="flex items-center justify-between p-5">
                      <div>
                        <p className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors">{link.label}</p>
                        <p className="text-sm text-gray-500">{link.desc}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
