import { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';
import { getVisaTypeBadgeColor, getVisaTypeLabel } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Trip Visa Requirements | VisaInfoGuide',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://visainfoguide.com/',
  },
};

interface TripDestination {
  slug: string;
  days: number;
}

function parseTripQuery(searchParams: { ps?: string; d?: string }): {
  passport: string;
  destinations: TripDestination[];
} | null {
  const { ps, d } = searchParams;

  if (!ps || !d) return null;

  const destinations = d.split(',').map(part => {
    const [slug, daysStr] = part.split(':');
    return { slug, days: parseInt(daysStr) || 7 };
  });

  return { passport: ps, destinations };
}

export default async function TripPage({
  searchParams,
}: {
  searchParams: { ps?: string; d?: string };
}) {
  const tripData = parseTripQuery(searchParams);

  if (!tripData) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-sm border border-gray-200">
              <CardContent className="py-12 text-center">
                <p className="text-red-600">Invalid trip parameters. Please try again.</p>
                <Link href="/" className="text-ivisa-turquoise hover:text-ivisa-turquoise-hover font-medium mt-4 inline-block transition-colors">
                  Return to homepage
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const { passport, destinations } = tripData;
  const destinationSlugs = destinations.map(d => d.slug);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [passportResult, destinationsResult, visaRulesResult] = await Promise.all([
    supabase.from('passports').select('*').eq('slug', passport).maybeSingle(),
    supabase.from('destinations').select('*').in('slug', destinationSlugs),
    supabase
      .from('visa_rules')
      .select('*')
      .eq('passport_slug', passport)
      .in('destination_slug', destinationSlugs),
  ]);

  const passportData = passportResult.data;
  const destinationsData = destinationsResult.data || [];
  const visaRulesData = visaRulesResult.data || [];

  const passportError = passportResult.error;

  if (passportError) {
    console.error('[TripPage] Passport query error:', passportError, 'slug:', passport);
  }

  if (!passportData || passportError) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-sm border border-gray-200">
              <CardContent className="py-12 text-center">
                <p className="text-red-600">
                  {passportError ? `Error loading passport: ${passportError.message}` : `Passport "${passport}" not found.`}
                </p>
                <Link href="/" className="text-ivisa-turquoise hover:text-ivisa-turquoise-hover font-medium mt-4 inline-block transition-colors">
                  Return to homepage
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const destinationMap = new Map(destinationsData.map(d => [d.slug, d]));
  const visaRulesMap = new Map(visaRulesData.map(v => [v.destination_slug, v]));

  const tripResults = destinations.map((dest, index) => {
    const destinationInfo = destinationMap.get(dest.slug);
    const visaRule = visaRulesMap.get(dest.slug);

    return {
      order: index + 1,
      destination: destinationInfo,
      plannedDays: dest.days,
      visaRule,
    };
  });

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-ivisa-turquoise hover:text-ivisa-turquoise-hover font-medium transition-colors">
              ← Back to Trip Planner
            </Link>
          </div>

          <Card className="mb-8 shadow-sm border border-gray-200">
            <CardHeader className="space-y-3">
              <CardTitle className="text-3xl md:text-4xl font-extrabold text-gray-900">
                Visa Requirements for {passportData.name} Passport Holders
              </CardTitle>
              <p className="text-gray-600 text-lg font-medium">
                Your trip itinerary: {destinations.length} destination{destinations.length > 1 ? 's' : ''}
              </p>
            </CardHeader>
          </Card>

          <div className="space-y-6">
            {tripResults.map(result => {
              const { order, destination, plannedDays, visaRule } = result;

              if (!destination) {
                return (
                  <Card key={order} className="border-red-200">
                    <CardContent className="py-6">
                      <p className="text-red-600">Destination not found</p>
                    </CardContent>
                  </Card>
                );
              }

              const seoLink = `/${passport}-to-${destination.slug}`;

              return (
                <Card key={order} className="hover:shadow-md transition-all duration-200 border border-gray-200 shadow-sm">
                  <CardContent className="py-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex gap-4 items-start flex-1">
                        <div className="flex-shrink-0 w-10 h-10 bg-ivisa-turquoise text-white rounded-full flex items-center justify-center font-bold">
                          {order}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2">
                            <Link href={seoLink} className="hover:text-ivisa-turquoise transition-colors">
                              {destination.name}
                            </Link>
                          </h3>
                          <p className="text-gray-600 text-sm mb-3">
                            Planned duration: {plannedDays} day{plannedDays !== 1 ? 's' : ''}
                          </p>

                          {visaRule ? (
                            <div className="space-y-3">
                              <div className="flex items-center gap-2 flex-wrap">
                                <Badge className={getVisaTypeBadgeColor(visaRule.visa_type)}>
                                  {getVisaTypeLabel(visaRule.visa_type)}
                                </Badge>
                                {visaRule.max_stay_days && (
                                  <span className="text-sm text-gray-600">
                                    Max stay: {visaRule.max_stay_days} days
                                  </span>
                                )}
                              </div>

                              <div>
                                {visaRule.max_stay_days ? (
                                  plannedDays <= visaRule.max_stay_days ? (
                                    <div className="flex items-center gap-2 text-green-700 text-sm">
                                      <CheckCircle className="h-4 w-4" />
                                      <span>OK - Within allowed stay</span>
                                    </div>
                                  ) : (
                                    <div className="flex items-center gap-2 text-red-700 text-sm">
                                      <XCircle className="h-4 w-4" />
                                      <span>Exceeds allowed stay - Extension or visa may be required</span>
                                    </div>
                                  )
                                ) : (
                                  <div className="flex items-center gap-2 text-yellow-700 text-sm">
                                    <AlertCircle className="h-4 w-4" />
                                    <span>Check official sources for stay duration</span>
                                  </div>
                                )}
                              </div>

                              {visaRule.stay_rule && (
                                <p className="text-sm text-gray-600">
                                  <span className="font-medium">Stay rule:</span> {visaRule.stay_rule}
                                </p>
                              )}

                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                {visaRule.official_source_url && (
                                  <a
                                    href={visaRule.official_source_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-ivisa-turquoise hover:text-ivisa-turquoise-hover font-medium flex items-center gap-1 transition-colors"
                                  >
                                    Official source
                                    <ExternalLink className="h-3 w-3" />
                                  </a>
                                )}
                                <span>
                                  Last verified: {new Date(visaRule.last_verified).toLocaleDateString()}
                                </span>
                              </div>

                              <Link
                                href={seoLink}
                                className="inline-block text-sm text-ivisa-turquoise hover:text-ivisa-turquoise-hover font-medium transition-colors mt-2"
                              >
                                View detailed requirements →
                              </Link>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <Badge className="bg-gray-200 text-gray-800">No data available</Badge>
                              <p className="text-sm text-gray-600">
                                Visa information not available for this route. Please check official sources.
                              </p>
                              <Link
                                href={seoLink}
                                className="inline-block text-sm text-ivisa-turquoise hover:text-ivisa-turquoise-hover font-medium transition-colors"
                              >
                                View route page →
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="mt-8 shadow-sm border border-gray-200">
            <CardContent className="py-6">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Important:</strong> Visa requirements can change. Always verify with official sources before travel.
              </p>
              <div className="flex gap-4 mt-4">
                <Link href="/" className="text-ivisa-turquoise hover:text-ivisa-turquoise-hover font-medium text-sm transition-colors">
                  Plan another trip
                </Link>
                <Link href={`/passport/${passport}`} className="text-ivisa-turquoise hover:text-ivisa-turquoise-hover font-medium text-sm transition-colors">
                  View all {passportData.name} visa requirements
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
