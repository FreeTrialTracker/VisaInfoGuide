import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Breadcrumbs from '@/components/Breadcrumbs';
import { canonicalUrl, datasetJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Passport Strength Ranking 2026 | VisaInfoGuide',
  description: 'Compare passport strength by visa-free access, eVisa eligibility, and global mobility. See how every passport ranks in 2026, with country-by-country breakdowns for 100+ passports.',
  alternates: { canonical: canonicalUrl('/passport-ranking') },
  openGraph: {
    title: 'Passport Strength Ranking 2026 | VisaInfoGuide',
    description: 'Compare passport strength by visa-free access, eVisa eligibility, and global mobility. See how every passport ranks in 2026.',
    type: 'article',
    url: canonicalUrl('/passport-ranking'),
    siteName: 'VisaInfoGuide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Passport Ranking 2026 — Compare Passport Strength',
    description: 'See how every passport ranks in 2026 by visa-free access and global mobility.',
  },
  robots: { index: true, follow: true },
};

const tools = [
  {
    href: '/most-powerful-passports',
    label: 'Most Powerful Passports (2026)',
    desc: 'Full ranking table of all passports by visa-free destination count, with tier classification.',
    cta: 'View full ranking',
  },
  {
    href: '/visa-free-countries',
    label: 'Visa-Free Countries by Passport',
    desc: 'See every country you can enter without a visa, filtered by your passport nationality.',
    cta: 'Browse by passport',
  },
  {
    href: '/compare',
    label: 'Compare Two Passports',
    desc: 'Pick any two passports and compare their visa-free access, evisa options, and entry requirements side by side.',
    cta: 'Compare passports',
  },
  {
    href: '/evisa-countries',
    label: 'eVisa Countries by Passport',
    desc: 'Find every country that accepts an online visa application for your passport.',
    cta: 'Browse eVisa destinations',
  },
];

const highlights = [
  { label: 'Passports ranked', value: '50+' },
  { label: 'Destinations tracked', value: '190+' },
  { label: 'Visa types covered', value: '5' },
  { label: 'Data updated', value: '2026' },
];

export default function PassportRankingPage() {
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
              { '@type': 'ListItem', position: 2, name: 'Passport Ranking', item: 'https://visainfoguide.com/passport-ranking' },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(datasetJsonLd({
            name: 'Passport Ranking 2026 — Global Passport Strength Index',
            description: 'Comprehensive passport strength rankings by visa-free access, eVisa eligibility, and global mobility for 50+ passports across 190+ destinations, updated for 2026.',
            url: 'https://visainfoguide.com/passport-ranking',
            keywords: ['passport ranking', 'passport strength', 'visa-free access', 'passport index', 'global mobility', '2026'],
          })),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <Breadcrumbs items={[{ name: 'Passport Ranking', url: '/passport-ranking' }]} />

          <header className="mt-8 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Passport Ranking 2026
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Passport strength is measured by how many countries you can visit without going through an embassy visa process. This index covers visa-free access, eVisa eligibility, and overall global mobility — updated for 2026.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {highlights.map((h) => (
                <div key={h.label} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                  <p className="text-2xl font-black text-teal-600">{h.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{h.label}</p>
                </div>
              ))}
            </div>
          </header>

          <section className="mb-14">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Passport Ranking Tools</h2>
            <div className="grid gap-4">
              {tools.map((tool) => (
                <Link key={tool.href} href={tool.href} className="group">
                  <Card className="transition-all duration-200 hover:shadow-lg hover:border-teal-200">
                    <CardContent className="p-6 flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors text-lg mb-1">
                          {tool.label}
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed">{tool.desc}</p>
                        <p className="text-sm text-teal-600 font-medium mt-2">{tool.cta} →</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-12 bg-teal-50 border border-teal-100 rounded-xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">How passport power is calculated</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our passport ranking is based on the number of destinations a passport holder can reach without obtaining a traditional embassy visa in advance. We count three access types:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="font-semibold text-teal-700 flex-shrink-0">Visa-free:</span>
                <span>No visa needed at all. Simply arrive and present your passport.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-blue-700 flex-shrink-0">eVisa:</span>
                <span>Apply online before travel. No embassy visit required.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-orange-700 flex-shrink-0">Visa on arrival:</span>
                <span>Obtain and pay at the border on arrival.</span>
              </li>
            </ul>
            <p className="text-gray-600 text-sm mt-4">
              The primary ranking on <Link href="/most-powerful-passports" className="text-teal-600 hover:underline">Most Powerful Passports</Link> counts only true visa-free access for the strictest comparison.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
