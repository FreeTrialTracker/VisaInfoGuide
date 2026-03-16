import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { unstable_cache } from 'next/cache';
import { CircleCheck as CheckCircle, ArrowRight, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Breadcrumbs from '@/components/Breadcrumbs';
import { canonicalUrl } from '@/lib/seo';

export const revalidate = 86400;
export const dynamicParams = true;

const REGION_META: Record<string, {
  label: string;
  description: string;
  destinations: string[];
}> = {
  europe: {
    label: 'Europe',
    description: 'visa-free countries in Europe',
    destinations: [
      'albania','andorra','austria','belgium','bosnia-and-herzegovina','bulgaria','croatia',
      'cyprus','czech-republic','denmark','estonia','finland','france','germany','greece',
      'hungary','iceland','ireland','italy','latvia','liechtenstein','lithuania','luxembourg',
      'malta','moldova','monaco','montenegro','netherlands','north-macedonia','norway','poland',
      'portugal','romania','san-marino','serbia','slovakia','slovenia','spain','sweden',
      'switzerland','ukraine','united-kingdom',
    ],
  },
  asia: {
    label: 'Asia',
    description: 'visa-free countries in Asia',
    destinations: [
      'armenia','azerbaijan','bahrain','bangladesh','bhutan','brunei','cambodia','china',
      'georgia','india','indonesia','japan','jordan','kazakhstan','kuwait','kyrgyzstan',
      'laos','lebanon','malaysia','maldives','mongolia','myanmar','nepal','oman','pakistan',
      'philippines','qatar','saudi-arabia','singapore','south-korea','sri-lanka','taiwan',
      'tajikistan','thailand','timor-leste','turkmenistan','uzbekistan','vietnam','yemen',
    ],
  },
  americas: {
    label: 'Americas',
    description: 'visa-free countries in the Americas',
    destinations: [
      'antigua-and-barbuda','argentina','bahamas','barbados','belize','bolivia','brazil',
      'canada','chile','colombia','costa-rica','cuba','dominica','dominican-republic',
      'ecuador','el-salvador','grenada','guatemala','guyana','haiti','honduras','jamaica',
      'mexico','nicaragua','panama','paraguay','peru','suriname','trinidad-and-tobago',
      'united-states','uruguay','venezuela',
    ],
  },
  africa: {
    label: 'Africa',
    description: 'visa-free countries in Africa',
    destinations: [
      'algeria','angola','benin','botswana','burkina-faso','burundi','cameroon','cape-verde',
      'chad','comoros','congo','djibouti','egypt','ethiopia','gabon','gambia','ghana',
      'guinea','ivory-coast','kenya','lesotho','liberia','libya','madagascar','malawi',
      'mali','mauritania','mauritius','morocco','mozambique','namibia','niger','nigeria',
      'rwanda','senegal','seychelles','sierra-leone','somalia','south-africa','sudan',
      'tanzania','togo','tunisia','uganda','zambia','zimbabwe',
    ],
  },
  'middle-east': {
    label: 'Middle East',
    description: 'visa-free countries in the Middle East',
    destinations: [
      'bahrain','iran','iraq','israel','jordan','kuwait','lebanon','oman','qatar',
      'saudi-arabia','syria','turkey','united-arab-emirates','yemen',
    ],
  },
  oceania: {
    label: 'Oceania',
    description: 'visa-free countries in Oceania',
    destinations: [
      'australia','fiji','kiribati','marshall-islands','micronesia','nauru','new-zealand',
      'palau','papua-new-guinea','samoa','solomon-islands','tonga','tuvalu','vanuatu',
    ],
  },
};

const PASSPORT_META: Record<string, { flag: string; seoSlug: string; nationality: string }> = {
  'france': { flag: '🇫🇷', seoSlug: 'french', nationality: 'French' },
  'germany': { flag: '🇩🇪', seoSlug: 'german', nationality: 'German' },
  'united-states': { flag: '🇺🇸', seoSlug: 'us', nationality: 'US' },
  'united-kingdom': { flag: '🇬🇧', seoSlug: 'uk', nationality: 'British' },
  'canada': { flag: '🇨🇦', seoSlug: 'canadian', nationality: 'Canadian' },
  'australia': { flag: '🇦🇺', seoSlug: 'australian', nationality: 'Australian' },
  'japan': { flag: '🇯🇵', seoSlug: 'japanese', nationality: 'Japanese' },
  'india': { flag: '🇮🇳', seoSlug: 'indian', nationality: 'Indian' },
  'brazil': { flag: '🇧🇷', seoSlug: 'brazilian', nationality: 'Brazilian' },
  'china': { flag: '🇨🇳', seoSlug: 'chinese', nationality: 'Chinese' },
  'south-korea': { flag: '🇰🇷', seoSlug: 'south-korean', nationality: 'South Korean' },
  'singapore': { flag: '🇸🇬', seoSlug: 'singaporean', nationality: 'Singaporean' },
};

export function generateStaticParams() {
  return Object.keys(REGION_META).map((region) => ({ region }));
}

function makeClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

const getRegionData = unstable_cache(
  async (region: string) => {
    const meta = REGION_META[region];
    if (!meta) return null;

    const supabase = makeClient();

    const { data: destinations } = await supabase
      .from('destinations')
      .select('slug, name')
      .in('slug', meta.destinations)
      .order('name');

    const destinationSlugs = (destinations ?? []).map((d) => d.slug);

    const { data: rules } = await supabase
      .from('visa_rules')
      .select('passport_slug, destination_slug, max_stay_days')
      .eq('visa_type', 'visa_free')
      .in('destination_slug', destinationSlugs)
      .in('passport_slug', Object.keys(PASSPORT_META));

    const byPassport: Record<string, number> = {};
    for (const rule of rules ?? []) {
      byPassport[rule.passport_slug] = (byPassport[rule.passport_slug] ?? 0) + 1;
    }

    return { destinations: destinations ?? [], byPassport };
  },
  ['region-visa-free'],
  { revalidate: 86400, tags: ['region-visa-free'] }
);

interface PageProps {
  params: { region: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const meta = REGION_META[params.region];
  if (!meta) return { title: 'Not Found' };

  const title = `Visa-Free Countries in ${meta.label} (2026) | VisaInfoGuide`;
  const description = `Complete list of ${meta.description} in 2026. Find which countries in ${meta.label} you can visit without a visa, organized by passport.`;
  const url = canonicalUrl(`/visa-free-countries-in-${params.region}`);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, type: 'article', url, siteName: 'VisaInfoGuide' },
    twitter: { card: 'summary_large_image', title, description },
    robots: { index: true, follow: true },
  };
}

export default async function VisaFreeInRegionPage({ params }: PageProps) {
  const meta = REGION_META[params.region];
  if (!meta) notFound();

  const data = await getRegionData(params.region);
  if (!data) notFound();

  const { destinations, byPassport } = data;

  const passportComparison = Object.entries(PASSPORT_META)
    .map(([slug, pmeta]) => ({ slug, ...pmeta, count: byPassport[slug] ?? 0 }))
    .filter((p) => p.count > 0)
    .sort((a, b) => b.count - a.count);

  const otherRegions = Object.entries(REGION_META)
    .filter(([slug]) => slug !== params.region)
    .map(([slug, r]) => ({ slug, label: r.label }));

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
              { '@type': 'ListItem', position: 2, name: 'Visa-Free Countries', item: 'https://visainfoguide.com/visa-free-countries' },
              { '@type': 'ListItem', position: 3, name: `${meta.label}`, item: `https://visainfoguide.com/visa-free-countries-in-${params.region}` },
            ],
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <Breadcrumbs
            items={[
              { name: 'Visa-Free Countries', url: '/visa-free-countries' },
              { name: meta.label, url: `/visa-free-countries-in-${params.region}` },
            ]}
          />

          <header className="mt-8 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Visa-Free Countries in {meta.label} (2026)
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              There are <strong>{destinations.length} countries in {meta.label}</strong> that are visa-free for at least one passport in our database. The table below shows how many are accessible visa-free by popular passports.
            </p>
          </header>

          {passportComparison.length > 0 && (
            <section className="mb-14">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Visa-Free Access to {meta.label} by Passport
              </h2>
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Passport</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Visa-Free in {meta.label}</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">of {destinations.length} countries</th>
                        <th className="py-3 px-4"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {passportComparison.map((p) => (
                        <tr key={p.slug} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{p.flag}</span>
                              <span className="font-medium text-gray-900">{p.nationality}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-bold text-teal-700 text-base">{p.count}</span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-gray-100 rounded-full max-w-24">
                                <div
                                  className="h-2 bg-teal-400 rounded-full"
                                  style={{ width: `${Math.round((p.count / destinations.length) * 100)}%` }}
                                />
                              </div>
                              <span className="text-xs text-gray-500">{Math.round((p.count / destinations.length) * 100)}%</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Link href={`/visa-free-countries-for-${p.seoSlug}-passport`} className="text-teal-600 hover:text-teal-700 hover:underline text-xs font-medium whitespace-nowrap">
                              Full list →
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          <section className="mb-14">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              All Countries in {meta.label} ({destinations.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {destinations.map((d) => (
                <Link key={d.slug} href={`/destination/${d.slug}`} className="group">
                  <Card className="transition-all duration-150 hover:shadow-md hover:border-teal-200">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0" />
                        <span className="font-medium text-gray-900 group-hover:text-teal-700 transition-colors text-sm">
                          {d.name}
                        </span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-teal-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Other Regions</h2>
            <div className="flex flex-wrap gap-3">
              {otherRegions.map((r) => (
                <Link
                  key={r.slug}
                  href={`/visa-free-countries-in-${r.slug}`}
                  className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700 transition-colors"
                >
                  {r.label}
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related</h2>
            <div className="grid gap-3">
              {[
                { href: '/visa-free-countries', label: 'Visa-Free Countries by Passport', desc: 'Browse visa-free access sorted by your passport' },
                { href: '/most-powerful-passports', label: 'Most Powerful Passports 2026', desc: 'See which passports have the most global access' },
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
