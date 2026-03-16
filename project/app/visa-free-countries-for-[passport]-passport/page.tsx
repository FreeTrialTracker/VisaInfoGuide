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

const SEO_SLUG_TO_DB: Record<string, { dbSlug: string; name: string; nationality: string; flag: string }> = {
  'us': { dbSlug: 'united-states', name: 'United States', nationality: 'US', flag: '🇺🇸' },
  'uk': { dbSlug: 'united-kingdom', name: 'United Kingdom', nationality: 'British', flag: '🇬🇧' },
  'indian': { dbSlug: 'india', name: 'India', nationality: 'Indian', flag: '🇮🇳' },
  'german': { dbSlug: 'germany', name: 'Germany', nationality: 'German', flag: '🇩🇪' },
  'canadian': { dbSlug: 'canada', name: 'Canada', nationality: 'Canadian', flag: '🇨🇦' },
  'australian': { dbSlug: 'australia', name: 'Australia', nationality: 'Australian', flag: '🇦🇺' },
  'japanese': { dbSlug: 'japan', name: 'Japan', nationality: 'Japanese', flag: '🇯🇵' },
  'french': { dbSlug: 'france', name: 'France', nationality: 'French', flag: '🇫🇷' },
  'chinese': { dbSlug: 'china', name: 'China', nationality: 'Chinese', flag: '🇨🇳' },
  'brazilian': { dbSlug: 'brazil', name: 'Brazil', nationality: 'Brazilian', flag: '🇧🇷' },
  'south-african': { dbSlug: 'south-africa', name: 'South Africa', nationality: 'South African', flag: '🇿🇦' },
  'nigerian': { dbSlug: 'nigeria', name: 'Nigeria', nationality: 'Nigerian', flag: '🇳🇬' },
  'argentinian': { dbSlug: 'argentina', name: 'Argentina', nationality: 'Argentinian', flag: '🇦🇷' },
  'austrian': { dbSlug: 'austria', name: 'Austria', nationality: 'Austrian', flag: '🇦🇹' },
  'belgian': { dbSlug: 'belgium', name: 'Belgium', nationality: 'Belgian', flag: '🇧🇪' },
  'chilean': { dbSlug: 'chile', name: 'Chile', nationality: 'Chilean', flag: '🇨🇱' },
  'colombian': { dbSlug: 'colombia', name: 'Colombia', nationality: 'Colombian', flag: '🇨🇴' },
  'croatian': { dbSlug: 'croatia', name: 'Croatia', nationality: 'Croatian', flag: '🇭🇷' },
  'czech': { dbSlug: 'czech-republic', name: 'Czech Republic', nationality: 'Czech', flag: '🇨🇿' },
  'danish': { dbSlug: 'denmark', name: 'Denmark', nationality: 'Danish', flag: '🇩🇰' },
  'egyptian': { dbSlug: 'egypt', name: 'Egypt', nationality: 'Egyptian', flag: '🇪🇬' },
  'finnish': { dbSlug: 'finland', name: 'Finland', nationality: 'Finnish', flag: '🇫🇮' },
  'greek': { dbSlug: 'greece', name: 'Greece', nationality: 'Greek', flag: '🇬🇷' },
  'hungarian': { dbSlug: 'hungary', name: 'Hungary', nationality: 'Hungarian', flag: '🇭🇺' },
  'indonesian': { dbSlug: 'indonesia', name: 'Indonesia', nationality: 'Indonesian', flag: '🇮🇩' },
  'irish': { dbSlug: 'ireland', name: 'Ireland', nationality: 'Irish', flag: '🇮🇪' },
  'israeli': { dbSlug: 'israel', name: 'Israel', nationality: 'Israeli', flag: '🇮🇱' },
  'italian': { dbSlug: 'italy', name: 'Italy', nationality: 'Italian', flag: '🇮🇹' },
  'mexican': { dbSlug: 'mexico', name: 'Mexico', nationality: 'Mexican', flag: '🇲🇽' },
  'moroccan': { dbSlug: 'morocco', name: 'Morocco', nationality: 'Moroccan', flag: '🇲🇦' },
  'dutch': { dbSlug: 'netherlands', name: 'Netherlands', nationality: 'Dutch', flag: '🇳🇱' },
  'new-zealand': { dbSlug: 'new-zealand', name: 'New Zealand', nationality: 'New Zealand', flag: '🇳🇿' },
  'norwegian': { dbSlug: 'norway', name: 'Norway', nationality: 'Norwegian', flag: '🇳🇴' },
  'pakistani': { dbSlug: 'pakistan', name: 'Pakistan', nationality: 'Pakistani', flag: '🇵🇰' },
  'peruvian': { dbSlug: 'peru', name: 'Peru', nationality: 'Peruvian', flag: '🇵🇪' },
  'filipino': { dbSlug: 'philippines', name: 'Philippines', nationality: 'Filipino', flag: '🇵🇭' },
  'polish': { dbSlug: 'poland', name: 'Poland', nationality: 'Polish', flag: '🇵🇱' },
  'portuguese': { dbSlug: 'portugal', name: 'Portugal', nationality: 'Portuguese', flag: '🇵🇹' },
  'romanian': { dbSlug: 'romania', name: 'Romania', nationality: 'Romanian', flag: '🇷🇴' },
  'russian': { dbSlug: 'russia', name: 'Russia', nationality: 'Russian', flag: '🇷🇺' },
  'saudi': { dbSlug: 'saudi-arabia', name: 'Saudi Arabia', nationality: 'Saudi', flag: '🇸🇦' },
  'singaporean': { dbSlug: 'singapore', name: 'Singapore', nationality: 'Singaporean', flag: '🇸🇬' },
  'south-korean': { dbSlug: 'south-korea', name: 'South Korea', nationality: 'South Korean', flag: '🇰🇷' },
  'spanish': { dbSlug: 'spain', name: 'Spain', nationality: 'Spanish', flag: '🇪🇸' },
  'swedish': { dbSlug: 'sweden', name: 'Sweden', nationality: 'Swedish', flag: '🇸🇪' },
  'swiss': { dbSlug: 'switzerland', name: 'Switzerland', nationality: 'Swiss', flag: '🇨🇭' },
  'thai': { dbSlug: 'thailand', name: 'Thailand', nationality: 'Thai', flag: '🇹🇭' },
  'turkish': { dbSlug: 'turkey', name: 'Turkey', nationality: 'Turkish', flag: '🇹🇷' },
  'ukrainian': { dbSlug: 'ukraine', name: 'Ukraine', nationality: 'Ukrainian', flag: '🇺🇦' },
  'emirati': { dbSlug: 'united-arab-emirates', name: 'United Arab Emirates', nationality: 'Emirati', flag: '🇦🇪' },
  'vietnamese': { dbSlug: 'vietnam', name: 'Vietnam', nationality: 'Vietnamese', flag: '🇻🇳' },
  'united-states': { dbSlug: 'united-states', name: 'United States', nationality: 'US', flag: '🇺🇸' },
  'united-kingdom': { dbSlug: 'united-kingdom', name: 'United Kingdom', nationality: 'British', flag: '🇬🇧' },
  'india': { dbSlug: 'india', name: 'India', nationality: 'Indian', flag: '🇮🇳' },
  'germany': { dbSlug: 'germany', name: 'Germany', nationality: 'German', flag: '🇩🇪' },
  'canada': { dbSlug: 'canada', name: 'Canada', nationality: 'Canadian', flag: '🇨🇦' },
  'australia': { dbSlug: 'australia', name: 'Australia', nationality: 'Australian', flag: '🇦🇺' },
  'japan': { dbSlug: 'japan', name: 'Japan', nationality: 'Japanese', flag: '🇯🇵' },
  'france': { dbSlug: 'france', name: 'France', nationality: 'French', flag: '🇫🇷' },
  'china': { dbSlug: 'china', name: 'China', nationality: 'Chinese', flag: '🇨🇳' },
  'brazil': { dbSlug: 'brazil', name: 'Brazil', nationality: 'Brazilian', flag: '🇧🇷' },
  'south-africa': { dbSlug: 'south-africa', name: 'South Africa', nationality: 'South African', flag: '🇿🇦' },
  'nigeria': { dbSlug: 'nigeria', name: 'Nigeria', nationality: 'Nigerian', flag: '🇳🇬' },
  'argentina': { dbSlug: 'argentina', name: 'Argentina', nationality: 'Argentinian', flag: '🇦🇷' },
  'austria': { dbSlug: 'austria', name: 'Austria', nationality: 'Austrian', flag: '🇦🇹' },
  'belgium': { dbSlug: 'belgium', name: 'Belgium', nationality: 'Belgian', flag: '🇧🇪' },
  'chile': { dbSlug: 'chile', name: 'Chile', nationality: 'Chilean', flag: '🇨🇱' },
  'colombia': { dbSlug: 'colombia', name: 'Colombia', nationality: 'Colombian', flag: '🇨🇴' },
  'croatia': { dbSlug: 'croatia', name: 'Croatia', nationality: 'Croatian', flag: '🇭🇷' },
  'czech-republic': { dbSlug: 'czech-republic', name: 'Czech Republic', nationality: 'Czech', flag: '🇨🇿' },
  'denmark': { dbSlug: 'denmark', name: 'Denmark', nationality: 'Danish', flag: '🇩🇰' },
  'egypt': { dbSlug: 'egypt', name: 'Egypt', nationality: 'Egyptian', flag: '🇪🇬' },
  'finland': { dbSlug: 'finland', name: 'Finland', nationality: 'Finnish', flag: '🇫🇮' },
  'greece': { dbSlug: 'greece', name: 'Greece', nationality: 'Greek', flag: '🇬🇷' },
  'hungary': { dbSlug: 'hungary', name: 'Hungary', nationality: 'Hungarian', flag: '🇭🇺' },
  'indonesia': { dbSlug: 'indonesia', name: 'Indonesia', nationality: 'Indonesian', flag: '🇮🇩' },
  'ireland': { dbSlug: 'ireland', name: 'Ireland', nationality: 'Irish', flag: '🇮🇪' },
  'israel': { dbSlug: 'israel', name: 'Israel', nationality: 'Israeli', flag: '🇮🇱' },
  'italy': { dbSlug: 'italy', name: 'Italy', nationality: 'Italian', flag: '🇮🇹' },
  'mexico': { dbSlug: 'mexico', name: 'Mexico', nationality: 'Mexican', flag: '🇲🇽' },
  'morocco': { dbSlug: 'morocco', name: 'Morocco', nationality: 'Moroccan', flag: '🇲🇦' },
  'netherlands': { dbSlug: 'netherlands', name: 'Netherlands', nationality: 'Dutch', flag: '🇳🇱' },
  'norway': { dbSlug: 'norway', name: 'Norway', nationality: 'Norwegian', flag: '🇳🇴' },
  'pakistan': { dbSlug: 'pakistan', name: 'Pakistan', nationality: 'Pakistani', flag: '🇵🇰' },
  'peru': { dbSlug: 'peru', name: 'Peru', nationality: 'Peruvian', flag: '🇵🇪' },
  'philippines': { dbSlug: 'philippines', name: 'Philippines', nationality: 'Filipino', flag: '🇵🇭' },
  'poland': { dbSlug: 'poland', name: 'Poland', nationality: 'Polish', flag: '🇵🇱' },
  'portugal': { dbSlug: 'portugal', name: 'Portugal', nationality: 'Portuguese', flag: '🇵🇹' },
  'romania': { dbSlug: 'romania', name: 'Romania', nationality: 'Romanian', flag: '🇷🇴' },
  'russia': { dbSlug: 'russia', name: 'Russia', nationality: 'Russian', flag: '🇷🇺' },
  'saudi-arabia': { dbSlug: 'saudi-arabia', name: 'Saudi Arabia', nationality: 'Saudi', flag: '🇸🇦' },
  'singapore': { dbSlug: 'singapore', name: 'Singapore', nationality: 'Singaporean', flag: '🇸🇬' },
  'south-korea': { dbSlug: 'south-korea', name: 'South Korea', nationality: 'South Korean', flag: '🇰🇷' },
  'spain': { dbSlug: 'spain', name: 'Spain', nationality: 'Spanish', flag: '🇪🇸' },
  'sweden': { dbSlug: 'sweden', name: 'Sweden', nationality: 'Swedish', flag: '🇸🇪' },
  'switzerland': { dbSlug: 'switzerland', name: 'Switzerland', nationality: 'Swiss', flag: '🇨🇭' },
  'thailand': { dbSlug: 'thailand', name: 'Thailand', nationality: 'Thai', flag: '🇹🇭' },
  'turkey': { dbSlug: 'turkey', name: 'Turkey', nationality: 'Turkish', flag: '🇹🇷' },
  'ukraine': { dbSlug: 'ukraine', name: 'Ukraine', nationality: 'Ukrainian', flag: '🇺🇦' },
  'united-arab-emirates': { dbSlug: 'united-arab-emirates', name: 'United Arab Emirates', nationality: 'Emirati', flag: '🇦🇪' },
  'vietnam': { dbSlug: 'vietnam', name: 'Vietnam', nationality: 'Vietnamese', flag: '🇻🇳' },
};

export function generateStaticParams() {
  return Object.keys(SEO_SLUG_TO_DB).map((passport) => ({ passport }));
}

function makeClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

const getVisaFreeDestinations = unstable_cache(
  async (dbSlug: string) => {
    const supabase = makeClient();
    const { data } = await supabase
      .from('visa_rules')
      .select('destination_slug, max_stay_days, destinations(name, slug)')
      .eq('passport_slug', dbSlug)
      .eq('visa_type', 'visa_free')
      .order('destination_slug');
    return data ?? [];
  },
  ['visa-free-destinations'],
  { revalidate: 86400, tags: ['visa-free-destinations'] }
);

interface PageProps {
  params: { passport: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const meta = SEO_SLUG_TO_DB[params.passport];
  if (!meta) return { title: 'Not Found' };

  const title = `Visa-Free Countries for ${meta.nationality} Passport (2026) | VisaInfoGuide`;
  const description = `Complete list of countries ${meta.nationality} passport holders can visit without a visa in 2026. No application, no fee — just arrive and go.`;
  const url = canonicalUrl(`/visa-free-countries-for-${params.passport}-passport`);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      siteName: 'VisaInfoGuide',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function VisaFreeForPassportPage({ params }: PageProps) {
  const meta = SEO_SLUG_TO_DB[params.passport];
  if (!meta) notFound();

  const destinations = await getVisaFreeDestinations(meta.dbSlug);

  const byRegion: Record<string, typeof destinations> = {
    Europe: [],
    Asia: [],
    Americas: [],
    Africa: [],
    'Middle East': [],
    Oceania: [],
    Other: [],
  };

  const europeCountries = new Set([
    'albania','andorra','austria','belgium','bosnia-and-herzegovina','bulgaria','croatia',
    'cyprus','czech-republic','denmark','estonia','finland','france','germany','greece',
    'hungary','iceland','ireland','italy','kosovo','latvia','liechtenstein','lithuania',
    'luxembourg','malta','moldova','monaco','montenegro','netherlands','north-macedonia',
    'norway','poland','portugal','romania','san-marino','serbia','slovakia','slovenia',
    'spain','sweden','switzerland','ukraine','united-kingdom','vatican-city',
  ]);
  const asiaCountries = new Set([
    'armenia','azerbaijan','bahrain','bangladesh','bhutan','brunei','cambodia','china',
    'georgia','hong-kong','india','indonesia','japan','jordan','kazakhstan','kuwait',
    'kyrgyzstan','laos','lebanon','macao','malaysia','maldives','mongolia','myanmar',
    'nepal','north-korea','oman','pakistan','philippines','qatar','saudi-arabia',
    'singapore','south-korea','sri-lanka','taiwan','tajikistan','thailand','timor-leste',
    'turkmenistan','uzbekistan','vietnam','yemen',
  ]);
  const americasCountries = new Set([
    'antigua-and-barbuda','argentina','bahamas','barbados','belize','bolivia','brazil',
    'canada','chile','colombia','costa-rica','cuba','dominica','dominican-republic',
    'ecuador','el-salvador','grenada','guatemala','guyana','haiti','honduras','jamaica',
    'mexico','nicaragua','panama','paraguay','peru','st-kitts-and-nevis','st-lucia',
    'st-vincent-and-the-grenadines','suriname','trinidad-and-tobago','united-states',
    'uruguay','venezuela',
  ]);
  const africaCountries = new Set([
    'algeria','angola','benin','botswana','burkina-faso','burundi','cameroon','cape-verde',
    'central-african-republic','chad','comoros','congo','djibouti','egypt','equatorial-guinea',
    'eritrea','ethiopia','gabon','gambia','ghana','guinea','guinea-bissau','ivory-coast',
    'kenya','lesotho','liberia','libya','madagascar','malawi','mali','mauritania','mauritius',
    'morocco','mozambique','namibia','niger','nigeria','rwanda','sao-tome-and-principe',
    'senegal','seychelles','sierra-leone','somalia','south-africa','south-sudan','sudan',
    'swaziland','tanzania','togo','tunisia','uganda','zambia','zimbabwe',
  ]);
  const middleEastCountries = new Set([
    'iran','iraq','israel','jordan','kuwait','lebanon','oman','qatar','saudi-arabia',
    'syria','turkey','united-arab-emirates','yemen',
  ]);
  const oceaniaCountries = new Set([
    'australia','fiji','kiribati','marshall-islands','micronesia','nauru','new-zealand',
    'palau','papua-new-guinea','samoa','solomon-islands','tonga','tuvalu','vanuatu',
  ]);

  for (const d of destinations) {
    const slug = d.destination_slug;
    if (middleEastCountries.has(slug)) byRegion['Middle East'].push(d);
    else if (europeCountries.has(slug)) byRegion['Europe'].push(d);
    else if (asiaCountries.has(slug)) byRegion['Asia'].push(d);
    else if (americasCountries.has(slug)) byRegion['Americas'].push(d);
    else if (africaCountries.has(slug)) byRegion['Africa'].push(d);
    else if (oceaniaCountries.has(slug)) byRegion['Oceania'].push(d);
    else byRegion['Other'].push(d);
  }

  const activeRegions = Object.entries(byRegion).filter(([, list]) => list.length > 0);

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
              { '@type': 'ListItem', position: 3, name: `${meta.nationality} Passport`, item: `https://visainfoguide.com/visa-free-countries-for-${params.passport}-passport` },
            ],
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <Breadcrumbs
            items={[
              { name: 'Visa-Free Countries', url: '/visa-free-countries' },
              { name: `${meta.nationality} Passport`, url: `/visa-free-countries-for-${params.passport}-passport` },
            ]}
          />

          <header className="mt-8 mb-10">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-5xl">{meta.flag}</span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Visa-Free Countries for {meta.nationality} Passport (2026)
              </h1>
            </div>

            <div className="bg-teal-50 border-l-4 border-teal-500 p-5 rounded-r-lg">
              <p className="text-gray-800 leading-relaxed">
                <strong>{meta.nationality} passport holders can enter {destinations.length} countries without any visa.</strong>{' '}
                No application, no fee, no pre-authorization required. Simply arrive and present your passport at the border.
              </p>
            </div>
          </header>

          {destinations.length === 0 ? (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
              <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No visa-free destinations found for this passport.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-4 text-center text-sm">
                {activeRegions.map(([region, list]) => (
                  <a
                    key={region}
                    href={`#${region.toLowerCase().replace(' ', '-')}`}
                    className="bg-white border border-gray-200 rounded-lg px-2 py-2 hover:border-teal-300 hover:bg-teal-50 transition-colors"
                  >
                    <span className="font-medium text-gray-700 text-xs">{region}</span>
                    <p className="text-teal-600 font-bold">{list.length}</p>
                  </a>
                ))}
              </div>

              {activeRegions.map(([region, list]) => (
                <section
                  key={region}
                  id={region.toLowerCase().replace(' ', '-')}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                    {region}
                    <span className="text-base font-normal text-gray-500">({list.length})</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {list.map((d) => {
                      const name = (d.destinations as any)?.name ?? d.destination_slug;
                      return (
                        <Link
                          key={d.destination_slug}
                          href={`/destination/${d.destination_slug}`}
                          className="group"
                        >
                          <Card className="transition-all duration-150 hover:shadow-md hover:border-teal-200">
                            <CardContent className="p-4 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0" />
                                <div>
                                  <p className="font-medium text-gray-900 group-hover:text-teal-700 transition-colors text-sm">
                                    {name}
                                  </p>
                                  {d.max_stay_days && (
                                    <p className="text-xs text-gray-500">up to {d.max_stay_days} days</p>
                                  )}
                                </div>
                              </div>
                              <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-teal-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
                            </CardContent>
                          </Card>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              ))}
            </>
          )}

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-12">
            <p className="text-sm text-amber-800">
              <strong>Note:</strong> Visa-free access does not guarantee entry. You must still meet standard requirements including passport validity, proof of onward travel, and sufficient funds. Always verify with official sources before travel.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related</h2>
            <div className="grid gap-3">
              <Link href="/visa-free-countries" className="group">
                <Card className="transition-all duration-200 hover:shadow-md hover:border-teal-200">
                  <CardContent className="flex items-center justify-between p-5">
                    <div>
                      <p className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors">
                        Visa-Free Countries — All Passports
                      </p>
                      <p className="text-sm text-gray-500">Browse by passport nationality</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </CardContent>
                </Card>
              </Link>
              <Link href={`/passport/${meta.dbSlug}`} className="group">
                <Card className="transition-all duration-200 hover:shadow-md hover:border-teal-200">
                  <CardContent className="flex items-center justify-between p-5">
                    <div>
                      <p className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors">
                        Full {meta.nationality} Passport Guide
                      </p>
                      <p className="text-sm text-gray-500">All visa types including visa on arrival and eVisa</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </CardContent>
                </Card>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
