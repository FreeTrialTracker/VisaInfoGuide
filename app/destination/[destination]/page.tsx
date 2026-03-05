import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDestinationPageData } from '@/lib/data/destination';
import { safeLoad } from '@/lib/errors';
import { getVisaTypeBadgeColor, getVisaTypeLabel, VisaType } from '@/lib/supabase';
import { canonicalUrl, breadcrumbJsonLd } from '@/lib/seo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import CrossDomainLink from '@/components/CrossDomainLink';
import { getAllDestinationSlugs } from '@/lib/countries';
import TemporaryUnavailable from '@/components/TemporaryUnavailable';

export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllDestinationSlugs().map(slug => ({ destination: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { destination: string };
}): Promise<Metadata> {
  try {
    const pageData = await getDestinationPageData(params.destination);
    if (!pageData) return { title: 'Not Found' };

    const { destination } = pageData;
    const pageUrl = canonicalUrl(`/destination/${params.destination}`);
    const title = `${destination.name} Visa Requirements by Passport | VisaInfoGuide`;
    const description = `Check ${destination.name} visa requirements for different passport holders. See which passports can enter visa-free, require eVisa, visa on arrival, or visa in advance.`;

    return {
      title,
      description,
      alternates: { canonical: pageUrl },
      openGraph: {
        title,
        description,
        type: 'website',
        url: pageUrl,
        images: [{ url: canonicalUrl('/og/destination-og'), width: 1200, height: 630, alt: `${destination.name} Visa Requirements` }],
        siteName: 'VisaInfoGuide',
      },
      twitter: { card: 'summary_large_image', title, description, images: [canonicalUrl('/og/destination-og')] },
      robots: { index: true, follow: true },
    };
  } catch {
    return { title: 'Not Found' };
  }
}

export default async function DestinationPage({
  params,
}: {
  params: { destination: string };
}) {
  const result = await safeLoad(() => getDestinationPageData(params.destination));

  if (!result.ok) {
    if (result.transient) return <TemporaryUnavailable />;
    notFound();
  }

  const { destination, visa_rules: visaRules } = result.data;

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
    { name: 'Destinations', url: 'https://visainfoguide.com/resources' },
    { name: destination.name, url: canonicalUrl(`/destination/${params.destination}`) },
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
            <span className="text-gray-900">{destination.name}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {destination.name} Visa Requirements by Passport
          </h1>
          <p className="text-lg text-gray-600">
            Comprehensive visa requirements for travelers to {destination.name} from different countries
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
                        <span className="text-gray-600">({rules.length} passports)</span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {rules.map(rule => (
                          <Link
                            key={rule.id}
                            href={`/passport/${rule.passport_slug}/destination/${params.destination}`}
                            className="block p-4 border rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
                          >
                            <h3 className="font-semibold text-gray-900 mb-2">
                              {rule.passport_name || rule.passport_slug}
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
                  No visa information available for {destination.name} yet.
                </p>
              </CardContent>
            </Card>
          )}

          <CrossDomainLink visaSlug={params.destination} siteType="visa" />

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Most Searched Nationalities for {destination.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Check entry requirements for the most common passport holders traveling to {destination.name}.
              </p>
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3">
                {['united-states', 'united-kingdom', 'india', 'china', 'germany', 'france', 'canada', 'australia', 'japan', 'singapore', 'brazil', 'mexico'].map(passportSlug => (
                  <Link
                    key={passportSlug}
                    href={`/passport/${passportSlug}/destination/${params.destination}`}
                    className="block p-3 border rounded-lg hover:border-blue-500 hover:shadow-md transition-all bg-white"
                  >
                    <div className="text-sm font-medium text-gray-900">
                      {passportSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Check requirements →</div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Compare Traveler Access</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Compare how different passport holders can access {destination.name} and other destinations.
              </p>
              <div className="mb-4">
                <Link
                  href="/compare"
                  className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Compare passport strengths
                </Link>
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
