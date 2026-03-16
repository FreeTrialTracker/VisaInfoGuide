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
import { getAllDestinationSlugs, getDestinationRegion, getRegionBySlug } from '@/lib/countries';
import TemporaryUnavailable from '@/components/TemporaryUnavailable';
import RelatedDestinations from '@/components/RelatedDestinations';
import { getContextualDestinationLinks } from '@/lib/data/crosslinks';

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

  const regionalLinks = await getContextualDestinationLinks(params.destination, { limit: 6 });

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

  const regionSlug = getDestinationRegion(params.destination);
  const regionMeta = regionSlug ? getRegionBySlug(regionSlug) : null;

  const breadcrumbItems = regionMeta
    ? [
        { name: 'Home', url: 'https://visainfoguide.com' },
        { name: 'Destinations', url: 'https://visainfoguide.com/destinations' },
        { name: regionMeta.name, url: `https://visainfoguide.com/destinations/${regionMeta.slug}` },
        { name: destination.name, url: canonicalUrl(`/destination/${params.destination}`) },
      ]
    : [
        { name: 'Home', url: 'https://visainfoguide.com' },
        { name: 'Destinations', url: 'https://visainfoguide.com/resources' },
        { name: destination.name, url: canonicalUrl(`/destination/${params.destination}`) },
      ];

  const breadcrumbSchema = breadcrumbJsonLd(breadcrumbItems);

  const visaFreeNames = groupedRules.visa_free.slice(0, 5).map(r => r.passport_name || r.passport_slug).join(', ');
  const visaOnArrivalCount = groupedRules.visa_on_arrival.length;
  const evisaCount = groupedRules.evisa.length;
  const visaFreeCount = groupedRules.visa_free.length + groupedRules.visa_free_eta.length;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Do I need a visa to visit ${destination.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `It depends on your passport. Currently ${visaFreeCount} nationalities can enter ${destination.name} visa-free, ${evisaCount} can apply for an eVisa, and ${visaOnArrivalCount} are eligible for visa on arrival. Some nationalities require a visa in advance.`,
        },
      },
      {
        '@type': 'Question',
        name: `Which passports can enter ${destination.name} visa-free?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: visaFreeCount > 0
            ? `${visaFreeCount} passport holders can enter ${destination.name} without a visa${visaFreeNames ? `, including ${visaFreeNames}` : ''}. Check the full list above for all eligible nationalities.`
            : `Currently no passports have visa-free access to ${destination.name}. Please check the requirements for your specific passport above.`,
        },
      },
      {
        '@type': 'Question',
        name: `Can I get a visa on arrival for ${destination.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: visaOnArrivalCount > 0
            ? `Yes, ${visaOnArrivalCount} nationalities are eligible for visa on arrival when traveling to ${destination.name}. Check the Visa on Arrival section above to see if your passport qualifies.`
            : `${destination.name} does not currently offer visa on arrival. You may need to apply for a visa in advance or check eVisa options.`,
        },
      },
      {
        '@type': 'Question',
        name: `Is there an eVisa available for ${destination.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: evisaCount > 0
            ? `Yes, ${destination.name} offers an eVisa for ${evisaCount} nationalities. An eVisa can typically be applied for online before your trip. Check the eVisa section above for eligible passports.`
            : `${destination.name} does not currently offer an eVisa option. Please check other visa categories above for your passport.`,
        },
      },
    ],
  };

  const touristDestinationSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: destination.name,
    url: canonicalUrl(`/destination/${params.destination}`),
    description: `Visa requirements and entry rules for travelers to ${destination.name} from different countries. ${visaFreeCount} nationalities can enter visa-free.`,
    touristType: ['International travelers', 'Business travelers', 'Tourists'],
    includesAttraction: [],
    containedInPlace: regionMeta ? {
      '@type': 'AdministrativeArea',
      name: regionMeta.name,
    } : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(touristDestinationSchema) }}
      />
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-b from-blue-50 to-white border-b">
        <div className="container mx-auto px-4 py-8">
          <nav className="text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/destinations" className="hover:text-blue-600">Destinations</Link>
            {regionMeta && (
              <>
                <span className="mx-2">/</span>
                <Link href={`/destinations/${regionMeta.slug}`} className="hover:text-blue-600">{regionMeta.name}</Link>
              </>
            )}
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

          {regionalLinks.length > 0 && (
            <div className="mt-8">
              <RelatedDestinations
                links={regionalLinks}
                heading={`Other Destinations in the Same Region`}
                subtext={`Compare entry requirements for destinations near ${destination.name}.`}
              />
            </div>
          )}

          <div className="mt-10 space-y-6 prose prose-gray max-w-none">
            <h2 className="text-2xl font-bold text-gray-900">
              About {destination.name} Visa Requirements
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {destination.name} welcomes visitors from countries around the world, but the entry requirements differ significantly depending on which passport you hold. Some nationalities can arrive without any prior arrangements, while others must obtain an eVisa, a visa on arrival, or a full embassy visa before departure. This page organizes {destination.name} visa requirements by passport, so you can quickly see the access level for your nationality and follow the link through to the specific requirements that apply to your trip.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Visa-free access means travelers holding eligible passports can enter {destination.name} for short stays without submitting any application in advance. Visa on arrival (VoA) is available at designated ports of entry for qualifying nationalities, typically for a fee paid at the border. An eVisa can be obtained online before travel, which streamlines the process compared to a traditional consular application. Nationalities listed under "visa required" must apply through the {destination.name} embassy or an authorized consulate in their home country before departing.
            </p>
            <h3 className="text-xl font-semibold text-gray-900 mt-6">
              Entry Requirements for {destination.name}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Beyond the visa category, most travelers to {destination.name} must also meet standard entry conditions. These typically include a passport valid for a minimum period beyond your intended stay, often six months, though this varies. You may also need to show proof of sufficient funds for the duration of your visit, a confirmed onward or return ticket, and valid travel insurance. Border officers have the discretion to request any of these documents at the point of entry, so carrying them even when they are technically optional is strongly recommended.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Specific requirements such as maximum stay durations, passport validity rules, and any conditions around work or study during a short-stay visit are listed on the individual pair pages. Click through from any passport card above to read the exact conditions that apply to holders of that passport when traveling to {destination.name}.
            </p>
            <h3 className="text-xl font-semibold text-gray-900 mt-6">
              Planning Your Trip to {destination.name}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Visa policy for {destination.name} is reviewed and updated regularly, but changes can occur at short notice due to bilateral agreements, diplomatic developments, or new government policy. A visa category that applied during a previous trip may no longer be accurate. Before making any bookings, always verify the current requirements directly with the {destination.name} embassy, consulate, or official government immigration portal that covers your nationality.
            </p>
            <p className="text-gray-700 leading-relaxed">
              For travelers who hold multiple passports, it is worth checking requirements for each passport you carry, as the conditions can differ considerably between nationalities. In some cases, one passport may grant visa-free access while another requires a full embassy visa. Choosing the correct passport to travel on can save significant time and cost. The data on this page is organized by passport to make those comparisons straightforward.
            </p>
            <h3 className="text-xl font-semibold text-gray-900 mt-6">
              How to Read the Visa Data
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Each passport listed on this page shows the visa category and, where available, the maximum permitted stay in days. Some entries also show a stay rule such as "90 days in any 180-day period," which indicates a rolling limit rather than a flat per-visit cap. The last verified date shown at the top of the page reflects the most recent date the data was reviewed for accuracy. Entries that have not been recently updated should be treated with extra caution and confirmed independently before travel.
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
