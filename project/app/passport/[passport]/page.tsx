import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPassportPageData } from '@/lib/data/passport';
import { safeLoad } from '@/lib/errors';
import { getVisaTypeBadgeColor, getVisaTypeLabel, VisaType } from '@/lib/supabase';
import { canonicalUrl, breadcrumbJsonLd } from '@/lib/seo';
import { getAllPassportSlugs } from '@/lib/countries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import TemporaryUnavailable from '@/components/TemporaryUnavailable';

export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllPassportSlugs().map(slug => ({ passport: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { passport: string };
}): Promise<Metadata> {
  try {
    const pageData = await getPassportPageData(params.passport);
    if (!pageData) return { title: 'Not Found' };

    const { passport } = pageData;
    const pageUrl = canonicalUrl(`/passport/${params.passport}`);
    const title = `${passport.name} Passport Visa Requirements | VisaInfoGuide`;
    const description = `Complete visa requirements for ${passport.name} passport holders. Check which countries require visas, which offer visa-free entry, eVisa, and visa on arrival options.`;

    return {
      title,
      description,
      alternates: { canonical: pageUrl },
      openGraph: {
        title,
        description,
        type: 'website',
        url: pageUrl,
        images: [{ url: canonicalUrl('/og/passport-og'), width: 1200, height: 630, alt: `${passport.name} Passport` }],
        siteName: 'VisaInfoGuide',
      },
      twitter: { card: 'summary_large_image', title, description, images: [canonicalUrl('/og/passport-og')] },
      robots: { index: true, follow: true },
    };
  } catch {
    return { title: 'Not Found' };
  }
}

export default async function PassportPage({
  params,
}: {
  params: { passport: string };
}) {
  const slug = params.passport.trim().toLowerCase();
  const result = await safeLoad(() => getPassportPageData(slug));

  if (!result.ok) {
    if (result.transient) {
      return (
        <TemporaryUnavailable
          title="Passport Data Temporarily Unavailable"
          message="We're having trouble loading visa data right now. Please try again in a few moments."
        />
      );
    }
    notFound();
  }

  const pageData = result.data;

  const { passport, visa_rules: visaRules } = pageData;

  const groupedRules: Record<VisaType, typeof visaRules> = {
    visa_free: [],
    visa_free_eta: [],
    evisa: [],
    visa_on_arrival: [],
    visa_required: [],
    restricted: [],
  };

  visaRules.forEach(rule => {
    if (rule.visa_type in groupedRules) {
      groupedRules[rule.visa_type as VisaType].push(rule);
    }
  });

  const lastVerified = visaRules.length
    ? new Date(
        Math.max(...visaRules.map(r => new Date(r.last_verified).getTime()))
      ).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  const visaTypeOrder: VisaType[] = [
    'visa_free', 'visa_free_eta', 'evisa', 'visa_on_arrival', 'visa_required', 'restricted',
  ];

  const breadcrumbSchema = breadcrumbJsonLd([
    { name: 'Home', url: 'https://visainfoguide.com' },
    { name: 'Passports', url: 'https://visainfoguide.com/resources' },
    { name: `${passport.name} Passport`, url: canonicalUrl(`/passport/${params.passport}`) },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-b from-blue-50 to-white border-b">
        <div className="container mx-auto px-4 py-8">
          <nav className="text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{passport.name} Passport</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {passport.name} Passport Visa Requirements
          </h1>
          <p className="text-lg text-gray-600">
            Comprehensive visa requirements for {passport.name} passport holders traveling worldwide
          </p>
          {lastVerified && (
            <p className="text-sm text-gray-500 mt-2">Last updated: {lastVerified}</p>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {visaRules.length > 0 ? (
            <div className="space-y-8">
              {visaTypeOrder.map(visaType => {
                const rules = groupedRules[visaType];
                if (rules.length === 0) return null;
                return (
                  <Card key={visaType}>
                    <CardHeader className="bg-gray-50">
                      <div className="flex items-center gap-3">
                        <Badge className={`${getVisaTypeBadgeColor(visaType)} text-base py-1 px-3`}>
                          {getVisaTypeLabel(visaType)}
                        </Badge>
                        <span className="text-gray-600">({rules.length} destinations)</span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {rules.map(rule => (
                          <Link
                            key={rule.id}
                            href={`/passport/${params.passport}/destination/${rule.destination_slug}`}
                            className="block p-4 border rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
                          >
                            <h3 className="font-semibold text-gray-900 mb-2">
                              {rule.destination_name || rule.destination_slug}
                            </h3>
                            {rule.max_stay_days && (
                              <p className="text-sm text-gray-600">Max stay: {rule.max_stay_days} days</p>
                            )}
                            {rule.stay_rule && (
                              <p className="text-sm text-gray-600">{rule.stay_rule}</p>
                            )}
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-gray-600">
                  No visa information available for {passport.name} passport holders yet.
                </p>
              </CardContent>
            </Card>
          )}

          {groupedRules.visa_free.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Top Visa-Free Destinations for {passport.name} Citizens</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Explore the most popular visa-free destinations where {passport.name} passport holders can travel without advance visa arrangements.
              </p>
              <div className="grid md:grid-cols-3 gap-3">
                {[...groupedRules.visa_free]
                  .sort((a, b) => (b.max_stay_days ?? 0) - (a.max_stay_days ?? 0))
                  .slice(0, 3)
                  .map(rule => (
                  <Link
                    key={rule.destination_slug}
                    href={`/passport/${params.passport}/destination/${rule.destination_slug}`}
                    className="block p-3 border rounded-lg hover:border-blue-500 hover:shadow-md transition-all bg-white"
                  >
                    <div className="text-sm font-medium text-gray-900">
                      {rule.destination_name || rule.destination_slug.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Check requirements →</div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
          )}

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Compare with Other Passports</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                See how {passport.name} passport compares with other countries in terms of global mobility.
              </p>
              <div className="mb-4">
                <Link
                  href={`/compare?passport1=${params.passport}`}
                  className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Compare {passport.name} passport
                </Link>
              </div>
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-2">
                {['singapore', 'japan', 'germany', 'united-states', 'united-kingdom', 'france', 'australia', 'canada'].map(slug => {
                  if (slug === params.passport) return null;
                  return (
                    <Link
                      key={slug}
                      href={`/passport/${slug}`}
                      className="text-blue-600 hover:text-blue-800 text-sm py-2 px-3 border border-blue-200 rounded hover:border-blue-400 transition-colors text-center"
                    >
                      {slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="mt-10 space-y-6 prose prose-gray max-w-none">
            <h2 className="text-2xl font-bold text-gray-900">
              About {passport.name} Passport Visa Requirements
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The {passport.name} passport grants its holders access to a wide range of international destinations, each with its own entry requirements. Understanding visa requirements before you travel is essential: arriving at a border without the correct documentation can result in denied boarding, refusal of entry, or significant delays. This page compiles up-to-date visa information for {passport.name} citizens across every destination in our database, organized by entry type so you can quickly identify what you need for each trip.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Visa requirements fall into several categories. Visa-free access means {passport.name} passport holders can enter without any prior application. An Electronic Travel Authorization (ETA) is a lightweight online pre-clearance required by some countries before boarding a flight. An eVisa is a visa issued electronically, typically applied for online days or weeks before travel. Visa on arrival (VoA) allows travelers to obtain a visa stamp or sticker at the port of entry upon arrival. Visa required means a formal application must be submitted to the destination country's embassy or consulate before travel. Restricted or refused entry indicates that travel to that destination is not permitted for {passport.name} citizens under current conditions.
            </p>
            <h3 className="text-xl font-semibold text-gray-900 mt-6">
              How to Use This Page
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Browse by visa category above to find destinations that match your travel plans. Each destination card links through to a detailed pair page where you can view the exact maximum stay duration, any specific conditions such as passport validity requirements, proof of onward travel, or minimum funds, and the source date for the information. If you are planning a multi-destination trip, check each country individually since requirements do not carry over between destinations.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Keep in mind that visa policy can change at any time due to diplomatic agreements, reciprocal arrangements, or emergency travel advisories. A country that was visa-free six months ago may now require an eVisa or full visa. The data on this page is reviewed regularly, but always cross-check with the official embassy or consulate of your destination country before booking flights or accommodation.
            </p>
            <h3 className="text-xl font-semibold text-gray-900 mt-6">
              Passport Validity and Entry Conditions
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Even when no visa is required, most countries have minimum passport validity rules. The most common requirement is that your {passport.name} passport must be valid for at least six months beyond your intended departure date from the destination. Some countries require only three months of remaining validity beyond your stay, while others accept any validity as long as the passport does not expire during your visit. Checking the specific pair page for each destination will show you the exact passport validity rule that applies to {passport.name} citizens.
            </p>
            <p className="text-gray-700 leading-relaxed">
              In addition to passport validity, several destinations require proof of sufficient funds for the duration of your stay, a confirmed return or onward ticket, travel insurance, or accommodation bookings. These entry conditions are enforced at the border regardless of whether a visa was required in advance. Being prepared with the right documents at check-in and at immigration significantly reduces the risk of any issues during travel.
            </p>
            <h3 className="text-xl font-semibold text-gray-900 mt-6">
              Schengen Area Travel for {passport.name} Citizens
            </h3>
            <p className="text-gray-700 leading-relaxed">
              If your {passport.name} passport has visa-free access to the Schengen Area, you can travel freely across all 29 Schengen member states with a single entry. However, the 90/180 rule applies: you may not spend more than 90 days in the Schengen zone within any rolling 180-day period, regardless of how many individual countries you visit. Days spent in France, Germany, Spain, Italy, or any other Schengen country all count toward the same 90-day total. Use the Schengen Calculator tool to track your available days before each trip.
            </p>
          </div>

          <Card className="mt-8 bg-blue-50 border-blue-200">
            <CardContent className="py-6">
              <p className="text-sm text-gray-700">
                <strong>Disclaimer:</strong> Visa requirements can change without notice. Always verify
                current requirements with official government sources or the embassy/consulate before
                making travel arrangements.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </>
  );
}
