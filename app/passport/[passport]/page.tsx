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

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Top Visa-Free Destinations for {passport.name} Citizens</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Explore the most popular visa-free destinations where {passport.name} passport holders can travel without advance visa arrangements.
              </p>
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3">
                {['united-states', 'united-kingdom', 'france', 'germany', 'japan', 'thailand', 'australia', 'canada', 'singapore', 'italy', 'spain', 'netherlands'].map(destSlug => (
                  <Link
                    key={destSlug}
                    href={`/passport/${params.passport}/destination/${destSlug}`}
                    className="block p-3 border rounded-lg hover:border-blue-500 hover:shadow-md transition-all bg-white"
                  >
                    <div className="text-sm font-medium text-gray-900">
                      {destSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Check requirements →</div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

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
