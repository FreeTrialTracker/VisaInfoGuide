import { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { unstable_cache } from 'next/cache';
import { ArrowRight, Trophy, Globe, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Breadcrumbs from '@/components/Breadcrumbs';
import { canonicalUrl, datasetJsonLd } from '@/lib/seo';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Most Powerful Passports in the World (2026 Ranking) | VisaInfoGuide',
  description: 'Which passport gives you the most visa-free access in 2026? Full passport power ranking by number of visa-free destinations, with country-by-country breakdown.',
  alternates: { canonical: canonicalUrl('/most-powerful-passports') },
  openGraph: {
    title: 'Most Powerful Passports in the World (2026 Ranking)',
    description: 'Full passport power ranking by number of visa-free destinations in 2026.',
    type: 'article',
    url: canonicalUrl('/most-powerful-passports'),
    siteName: 'VisaInfoGuide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Most Powerful Passports in the World (2026 Ranking)',
    description: 'Full passport power ranking by number of visa-free destinations in 2026.',
  },
  robots: { index: true, follow: true },
};

const PASSPORT_META: Record<string, { flag: string; nationality: string }> = {
  'france': { flag: '🇫🇷', nationality: 'French' },
  'germany': { flag: '🇩🇪', nationality: 'German' },
  'canada': { flag: '🇨🇦', nationality: 'Canadian' },
  'israel': { flag: '🇮🇱', nationality: 'Israeli' },
  'romania': { flag: '🇷🇴', nationality: 'Romanian' },
  'ireland': { flag: '🇮🇪', nationality: 'Irish' },
  'ukraine': { flag: '🇺🇦', nationality: 'Ukrainian' },
  'denmark': { flag: '🇩🇰', nationality: 'Danish' },
  'new-zealand': { flag: '🇳🇿', nationality: 'New Zealand' },
  'finland': { flag: '🇫🇮', nationality: 'Finnish' },
  'australia': { flag: '🇦🇺', nationality: 'Australian' },
  'sweden': { flag: '🇸🇪', nationality: 'Swedish' },
  'japan': { flag: '🇯🇵', nationality: 'Japanese' },
  'brazil': { flag: '🇧🇷', nationality: 'Brazilian' },
  'norway': { flag: '🇳🇴', nationality: 'Norwegian' },
  'united-states': { flag: '🇺🇸', nationality: 'US' },
  'south-korea': { flag: '🇰🇷', nationality: 'South Korean' },
  'peru': { flag: '🇵🇪', nationality: 'Peruvian' },
  'united-arab-emirates': { flag: '🇦🇪', nationality: 'Emirati' },
  'colombia': { flag: '🇨🇴', nationality: 'Colombian' },
  'qatar': { flag: '🇶🇦', nationality: 'Qatari' },
  'united-kingdom': { flag: '🇬🇧', nationality: 'British' },
  'argentina': { flag: '🇦🇷', nationality: 'Argentinian' },
  'singapore': { flag: '🇸🇬', nationality: 'Singaporean' },
  'greece': { flag: '🇬🇷', nationality: 'Greek' },
  'chile': { flag: '🇨🇱', nationality: 'Chilean' },
  'hungary': { flag: '🇭🇺', nationality: 'Hungarian' },
  'portugal': { flag: '🇵🇹', nationality: 'Portuguese' },
  'czech-republic': { flag: '🇨🇿', nationality: 'Czech' },
  'croatia': { flag: '🇭🇷', nationality: 'Croatian' },
  'malaysia': { flag: '🇲🇾', nationality: 'Malaysian' },
  'mexico': { flag: '🇲🇽', nationality: 'Mexican' },
  'netherlands': { flag: '🇳🇱', nationality: 'Dutch' },
  'italy': { flag: '🇮🇹', nationality: 'Italian' },
  'poland': { flag: '🇵🇱', nationality: 'Polish' },
  'spain': { flag: '🇪🇸', nationality: 'Spanish' },
  'belgium': { flag: '🇧🇪', nationality: 'Belgian' },
  'austria': { flag: '🇦🇹', nationality: 'Austrian' },
  'switzerland': { flag: '🇨🇭', nationality: 'Swiss' },
  'china': { flag: '🇨🇳', nationality: 'Chinese' },
  'morocco': { flag: '🇲🇦', nationality: 'Moroccan' },
  'russia': { flag: '🇷🇺', nationality: 'Russian' },
  'thailand': { flag: '🇹🇭', nationality: 'Thai' },
  'south-africa': { flag: '🇿🇦', nationality: 'South African' },
  'turkey': { flag: '🇹🇷', nationality: 'Turkish' },
  'saudi-arabia': { flag: '🇸🇦', nationality: 'Saudi' },
  'indonesia': { flag: '🇮🇩', nationality: 'Indonesian' },
  'philippines': { flag: '🇵🇭', nationality: 'Filipino' },
  'vietnam': { flag: '🇻🇳', nationality: 'Vietnamese' },
  'egypt': { flag: '🇪🇬', nationality: 'Egyptian' },
  'india': { flag: '🇮🇳', nationality: 'Indian' },
};

const SEO_SLUG: Record<string, string> = {
  'france': 'french', 'germany': 'german', 'canada': 'canadian', 'israel': 'israeli',
  'romania': 'romanian', 'ireland': 'irish', 'ukraine': 'ukrainian', 'denmark': 'danish',
  'new-zealand': 'new-zealand', 'finland': 'finnish', 'australia': 'australian',
  'sweden': 'swedish', 'japan': 'japanese', 'brazil': 'brazilian', 'norway': 'norwegian',
  'united-states': 'us', 'south-korea': 'south-korean', 'peru': 'peruvian',
  'united-arab-emirates': 'emirati', 'colombia': 'colombian', 'qatar': 'qatari',
  'united-kingdom': 'uk', 'argentina': 'argentinian', 'singapore': 'singaporean',
  'greece': 'greek', 'chile': 'chilean', 'hungary': 'hungarian', 'portugal': 'portuguese',
  'czech-republic': 'czech', 'croatia': 'croatian', 'malaysia': 'malaysian',
  'mexico': 'mexican', 'netherlands': 'dutch', 'italy': 'italian', 'poland': 'polish',
  'spain': 'spanish', 'belgium': 'belgian', 'austria': 'austrian', 'switzerland': 'swiss',
  'china': 'chinese', 'morocco': 'moroccan', 'russia': 'russian', 'thailand': 'thai',
  'south-africa': 'south-african', 'turkey': 'turkish', 'saudi-arabia': 'saudi',
  'indonesia': 'indonesian', 'philippines': 'filipino', 'vietnam': 'vietnamese',
  'egypt': 'egyptian', 'india': 'indian',
};

function makeClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

const getRankings = unstable_cache(
  async () => {
    const supabase = makeClient();
    const { data } = await supabase
      .from('visa_rules')
      .select('passport_slug, passports(name, slug)')
      .eq('visa_type', 'visa_free');

    if (!data) return [];

    const counts: Record<string, { name: string; count: number }> = {};
    for (const row of data) {
      const slug = row.passport_slug;
      const name = (row.passports as any)?.name ?? slug;
      if (!counts[slug]) counts[slug] = { name, count: 0 };
      counts[slug].count++;
    }

    return Object.entries(counts)
      .map(([slug, { name, count }]) => ({ slug, name, count }))
      .sort((a, b) => b.count - a.count);
  },
  ['passport-rankings'],
  { revalidate: 86400, tags: ['passport-rankings'] }
);

function getMedalColor(rank: number) {
  if (rank === 1) return 'text-yellow-500';
  if (rank === 2) return 'text-gray-400';
  if (rank === 3) return 'text-amber-600';
  return 'text-gray-300';
}

function getTierLabel(count: number) {
  if (count >= 60) return { label: 'Elite', color: 'bg-yellow-100 text-yellow-800' };
  if (count >= 35) return { label: 'Strong', color: 'bg-green-100 text-green-800' };
  if (count >= 20) return { label: 'Moderate', color: 'bg-blue-100 text-blue-800' };
  return { label: 'Limited', color: 'bg-gray-100 text-gray-700' };
}

export default async function MostPowerfulPassportsPage() {
  const rankings = await getRankings();

  const top10 = rankings.slice(0, 10);

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
              { '@type': 'ListItem', position: 2, name: 'Most Powerful Passports', item: 'https://visainfoguide.com/most-powerful-passports' },
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
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Which is the most powerful passport in the world in 2026?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: top10[0]
                    ? `The ${top10[0].name} passport ranks #1 in 2026 with visa-free access to ${top10[0].count} countries.`
                    : 'See our full ranking table for the most current data.',
                },
              },
              {
                '@type': 'Question',
                name: 'How is passport power measured?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Passport power is measured by the number of countries a passport holder can enter without obtaining a visa in advance — i.e., destinations where entry is truly visa-free, requiring no application, fee, or pre-authorization.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does a higher-ranked passport mean easier travel everywhere?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A higher rank means more destinations accessible without a visa, but it does not guarantee entry to every country. Entry can still be denied, and some destinations may require additional documentation even for visa-free travelers.',
                },
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(datasetJsonLd({
            name: 'Most Powerful Passports in the World (2026)',
            description: 'Live passport power ranking built from visa database data — counting visa-free destinations for 50+ passports across 190+ countries, updated for 2026.',
            url: 'https://visainfoguide.com/most-powerful-passports',
            keywords: ['most powerful passport', 'passport ranking 2026', 'visa-free countries', 'passport index', 'strongest passport', 'passport power'],
          })),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <Breadcrumbs items={[{ name: 'Most Powerful Passports', url: '/most-powerful-passports' }]} />

          <header className="mt-8 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Most Powerful Passports in the World (2026)
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Which passport gives you the most freedom to travel without a visa? This ranking is built directly from our live visa database — counting only destinations where entry is truly visa-free, with no application, fee, or pre-authorization required.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Rankings are updated as visa policies change. Last data refresh: 2026.
            </p>
          </header>

          <section className="mb-14">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              Top 10 Most Powerful Passports
            </h2>
            <div className="space-y-3">
              {top10.map((p, i) => {
                const rank = i + 1;
                const meta = PASSPORT_META[p.slug];
                const seoSlug = SEO_SLUG[p.slug];
                const tier = getTierLabel(p.count);
                return (
                  <Link key={p.slug} href={`/passport/${p.slug}`} className="group block">
                    <Card className="transition-all duration-200 hover:shadow-lg hover:border-gray-300">
                      <CardContent className="p-5 flex items-center gap-4">
                        <div className="w-10 text-center">
                          <span className={`text-2xl font-black ${getMedalColor(rank)}`}>#{rank}</span>
                        </div>
                        <span className="text-3xl">{meta?.flag ?? '🌐'}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors">
                            {p.name}
                          </p>
                          <p className="text-sm text-gray-500">{p.count} visa-free destinations</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${tier.color}`}>
                            {tier.label}
                          </span>
                          <div className="hidden sm:flex items-center gap-1">
                            <div className="h-2 rounded-full bg-teal-500" style={{ width: `${Math.round((p.count / (top10[0]?.count || 1)) * 80) + 20}px` }} />
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="mb-14">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Globe className="w-6 h-6 text-gray-600" />
              Full Passport Power Ranking (2026)
            </h2>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 w-16">Rank</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Passport</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Visa-Free</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 hidden sm:table-cell">Tier</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {rankings.map((p, i) => {
                      const rank = i + 1;
                      const meta = PASSPORT_META[p.slug];
                      const seoSlug = SEO_SLUG[p.slug];
                      const tier = getTierLabel(p.count);
                      return (
                        <tr key={p.slug} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4">
                            <span className={`font-bold text-sm ${getMedalColor(rank)}`}>#{rank}</span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{meta?.flag ?? '🌐'}</span>
                              <span className="font-medium text-gray-900">{p.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-semibold text-teal-700">{p.count}</span>
                          </td>
                          <td className="py-3 px-4 hidden sm:table-cell">
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${tier.color}`}>
                              {tier.label}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Link href={`/passport/${p.slug}`} className="text-teal-600 hover:text-teal-700 hover:underline text-xs font-medium">
                                Full guide
                              </Link>
                              {seoSlug && (
                                <Link href={`/visa-free-countries-for-${seoSlug}-passport`} className="text-gray-500 hover:text-gray-700 hover:underline text-xs">
                                  Visa-free list
                                </Link>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-gray-600" />
              Passport Power Tiers
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Elite (60+)', desc: 'Unrestricted global mobility. Visa-free to most major destinations.', color: 'border-yellow-300 bg-yellow-50', badge: 'bg-yellow-100 text-yellow-800' },
                { label: 'Strong (35–59)', desc: 'Excellent travel freedom. Visa-free to most of Europe, Americas and Asia.', color: 'border-green-300 bg-green-50', badge: 'bg-green-100 text-green-800' },
                { label: 'Moderate (20–34)', desc: 'Solid access to key regions. Some destinations require visas in advance.', color: 'border-blue-300 bg-blue-50', badge: 'bg-blue-100 text-blue-800' },
                { label: 'Limited (0–19)', desc: 'Most destinations require advance visa applications.', color: 'border-gray-300 bg-gray-50', badge: 'bg-gray-100 text-gray-700' },
              ].map((tier) => (
                <Card key={tier.label} className={`border ${tier.color}`}>
                  <CardContent className="p-5">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${tier.badge} mb-3 inline-block`}>
                      {tier.label}
                    </span>
                    <p className="text-sm text-gray-700 leading-relaxed">{tier.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related</h2>
            <div className="grid gap-3">
              {[
                { href: '/passport-ranking', label: 'Passport Ranking Index', desc: 'Compare passports side by side' },
                { href: '/visa-free-countries', label: 'Visa-Free Countries by Passport', desc: 'Browse full visa-free lists by nationality' },
                { href: '/compare', label: 'Compare Two Passports', desc: 'See how any two passports compare' },
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
