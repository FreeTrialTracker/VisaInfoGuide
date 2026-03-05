import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { unstable_cache } from 'next/cache';
import { getVisaTypeBadgeColor, getVisaTypeLabel } from '@/lib/supabase';
import { canonicalUrl } from '@/lib/seo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, CheckCircle, XCircle, AlertCircle, HelpCircle, Info } from 'lucide-react';
import Link from 'next/link';
import { TOP_PAIRS_300 } from '@/lib/countries';

export const revalidate = 86400;

const SCHENGEN_SLUGS = new Set([
  'austria', 'belgium', 'croatia', 'czech-republic', 'denmark', 'estonia',
  'finland', 'france', 'germany', 'greece', 'hungary', 'iceland', 'italy',
  'latvia', 'liechtenstein', 'lithuania', 'luxembourg', 'malta', 'netherlands',
  'norway', 'poland', 'portugal', 'slovakia', 'slovenia', 'spain', 'sweden',
  'switzerland',
]);

function SchengenRulesCard({ destinationName, visaRequired }: { destinationName: string; visaRequired: boolean }) {
  return (
    <Card className="mb-8 border-blue-200 bg-blue-50">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5 text-blue-600" />
          <CardTitle className="text-lg text-blue-900">Schengen Area Rules</CardTitle>
        </div>
        <p className="text-sm text-blue-700 mt-1">
          {destinationName} is a member of the Schengen Area. The following rules apply to your visit.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="bg-white rounded-lg p-4 border border-blue-100">
          <h4 className="font-semibold text-gray-900 mb-2">The 90/180-Day Rule</h4>
          <p className="text-sm text-gray-700 leading-relaxed">
            Short stays are limited to <strong>90 days within any rolling 180-day period</strong> across
            the entire Schengen Area — not just {destinationName}. Days spent in any other Schengen
            country count toward this limit. The 180-day window rolls back from your most recent entry
            date, so overstaying in one country affects your eligibility to enter all others.
          </p>
        </div>

        <div className="bg-white rounded-lg p-4 border border-blue-100">
          <h4 className="font-semibold text-gray-900 mb-2">Counting Your Days</h4>
          <p className="text-sm text-gray-700 leading-relaxed">
            Both the day of arrival and the day of departure are counted as full days. To check your
            remaining allowance, count backwards 180 days from today and add up all days spent inside
            any Schengen country during that period. The remainder (up to 90) is your current
            entitlement.
          </p>
        </div>

        {visaRequired ? (
          <div className="bg-white rounded-lg p-4 border border-blue-100">
            <h4 className="font-semibold text-gray-900 mb-2">Schengen Short-Stay Visa (Type C)</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              A Type C Schengen visa is required before travel. It can be single-entry, double-entry,
              or multiple-entry. Apply at the consulate of the country that is your <em>main
              destination</em> or, if stays are equal, the country of first entry. A valid Schengen
              visa also allows transit through other Schengen member states.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-gray-700 list-disc list-inside">
              <li>Travel medical insurance with minimum €30,000 coverage is mandatory</li>
              <li>Return or onward ticket and proof of accommodation are required</li>
              <li>Bank statements, payslips, or proof of sufficient funds may be requested</li>
              <li>Apply well in advance — processing times vary by consulate</li>
            </ul>
          </div>
        ) : (
          <div className="bg-white rounded-lg p-4 border border-blue-100">
            <h4 className="font-semibold text-gray-900 mb-2">Entry Without a Visa</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              No visa is required for short stays, but border officers may still ask you to demonstrate
              the purpose of your visit and your ability to support yourself financially. Carry
              documentation such as a return or onward ticket, hotel bookings, and proof of funds.
            </p>
          </div>
        )}

        <div className="bg-white rounded-lg p-4 border border-blue-100">
          <h4 className="font-semibold text-gray-900 mb-2">Passport Validity</h4>
          <p className="text-sm text-gray-700 leading-relaxed">
            Your passport must be valid for at least <strong>3 months beyond your planned departure
            date</strong> from the Schengen Area and must have been issued within the last 10 years.
            Airlines may deny boarding if this requirement is not met.
          </p>
        </div>

        <div className="bg-white rounded-lg p-4 border border-blue-100">
          <h4 className="font-semibold text-gray-900 mb-2">ETIAS (Upcoming Requirement)</h4>
          <p className="text-sm text-gray-700 leading-relaxed">
            The European Travel Information and Authorisation System (ETIAS) will require pre-travel
            authorisation for visa-exempt nationals before entering the Schengen Area. It is not yet
            in force. Check the latest official status before you travel, as the launch date may
            change.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm text-amber-800">
            <strong>Important:</strong> The 90-day limit is shared across all 27 Schengen countries.
            A stay in France, Germany, and Spain in the same 180-day window all count toward the
            same 90-day total. Plan multi-country trips carefully.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function parseRoute(route: string): { passport: string; destination: string } | null {
  const match = route.match(/^(.+)-to-(.+)$/);
  if (!match) return null;
  return { passport: match[1], destination: match[2] };
}

interface FAQ {
  question: string;
  answer: string;
}

function generateFAQs(
  passportName: string,
  destinationName: string,
  visaRules: any[]
): FAQ[] {
  const faqs: FAQ[] = [];

  if (visaRules.length > 0) {
    const primary = visaRules[0];
    faqs.push({
      question: `Do ${passportName} passport holders need a visa for ${destinationName}?`,
      answer: `${passportName} passport holders ${getVisaTypeLabel(primary.visa_type).toLowerCase()} for ${destinationName}. ${visaRules.length > 1 ? `Multiple ${getVisaTypeLabel(primary.visa_type)} options are available — see the comparison table above.` : primary.max_stay_days ? `The maximum stay allowed is ${primary.max_stay_days} days.` : 'Please check official sources for stay duration limits.'}`,
    });

    if (visaRules.length === 1 && primary.max_stay_days) {
      faqs.push({
        question: `How long can ${passportName} passport holders stay in ${destinationName}?`,
        answer: `${passportName} passport holders can stay up to ${primary.max_stay_days} days in ${destinationName}. ${primary.stay_rule ? primary.stay_rule : ''}`,
      });
    }

    faqs.push({
      question: `What documents are required for ${passportName} passport holders to enter ${destinationName}?`,
      answer: `${passportName} passport holders need a valid passport ${primary.passport_validity_months ? `with at least ${primary.passport_validity_months} months validity` : ''}. ${primary.return_ticket_required ? 'A return or onward ticket is required.' : ''} ${primary.insurance_required ? 'Travel insurance is required.' : ''} ${primary.sufficient_funds_required ? 'Proof of sufficient funds may be required.' : ''}`,
    });
  } else {
    faqs.push({
      question: `Do ${passportName} passport holders need a visa for ${destinationName}?`,
      answer: `Visa information is not currently available for ${passportName} passport holders traveling to ${destinationName}. Please check with the ${destinationName} embassy or official government sources.`,
    });
  }

  return faqs;
}

export function generateStaticParams() {
  return TOP_PAIRS_300.map(({ passport, destination }) => ({
    route: `${passport}-to-${destination}`,
  }));
}

function makeClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

const getRouteData = unstable_cache(
  async (passport: string, destination: string) => {
    const supabase = makeClient();
    const [passportResult, destinationResult, visaRulesResult] = await Promise.all([
      supabase.from('passports').select('*').eq('slug', passport).maybeSingle(),
      supabase.from('destinations').select('*').eq('slug', destination).maybeSingle(),
      supabase
        .from('visa_rules')
        .select('*')
        .eq('passport_slug', passport)
        .eq('destination_slug', destination)
        .order('visa_subtype', { nullsFirst: true }),
    ]);
    return {
      passportData: passportResult.data,
      destinationData: destinationResult.data,
      visaRules: visaRulesResult.data ?? [],
    };
  },
  ['route-data'],
  { revalidate: 86400, tags: ['route-data'] }
);

const getRelatedRoutes = unstable_cache(
  async (passport: string, destination: string) => {
    const supabase = makeClient();
    const [samePassport, sameDestination] = await Promise.all([
      supabase
        .from('visa_rules')
        .select('*, destinations(name)')
        .eq('passport_slug', passport)
        .neq('destination_slug', destination)
        .limit(3),
      supabase
        .from('visa_rules')
        .select('*, passports(name)')
        .eq('destination_slug', destination)
        .neq('passport_slug', passport)
        .limit(3),
    ]);
    return {
      samePassportRoutes: samePassport,
      sameDestinationRoutes: sameDestination,
    };
  },
  ['related-routes'],
  { revalidate: 86400, tags: ['related-routes'] }
);

export async function generateMetadata({
  params,
}: {
  params: { route: string };
}): Promise<Metadata> {
  const parsed = parseRoute(params.route);
  if (!parsed) return { title: 'Not Found' };

  const { passport, destination } = parsed;

  if (passport === destination) {
    return { title: 'Not Found' };
  }

  const { passportData, destinationData, visaRules } = await getRouteData(passport, destination);
  const primaryRule = visaRules[0] ?? null;

  if (!passportData || !destinationData) {
    return { title: 'Not Found' };
  }

  const title = `${passportData.name} to ${destinationData.name} Visa Requirements | VisaInfoGuide`;
  const description = primaryRule
    ? `${passportData.name} passport holders ${getVisaTypeLabel(primaryRule.visa_type).toLowerCase()} for ${destinationData.name}. ${primaryRule.max_stay_days ? `Max stay: ${primaryRule.max_stay_days} days.` : ''} Check entry requirements, documents needed, and official sources.`
    : `Check visa requirements for ${passportData.name} passport holders traveling to ${destinationData.name}.`;

  const pageUrl = canonicalUrl(`/${params.route}`);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: pageUrl,
      images: [{
        url: canonicalUrl('/og/default-og'),
        width: 1200,
        height: 630,
        alt: title,
      }],
      siteName: 'VisaInfoGuide',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [canonicalUrl('/og/default-og')],
    },
    alternates: { canonical: pageUrl },
    robots: {
      index: true,
      follow: true,
    },
  };
}

function BooleanIcon({ value }: { value: string | boolean | null }) {
  // Handle new enum strings
  if (value === 'required' || value === true) return <CheckCircle className="h-5 w-5 text-green-600" />;
  if (value === 'not_typically_requested' || value === false) return <XCircle className="h-5 w-5 text-gray-400" />;
  if (value === 'may_be_requested') return <HelpCircle className="h-5 w-5 text-amber-500" />;
  return <HelpCircle className="h-5 w-5 text-amber-500" />;
}

function BooleanLabel({ value }: { value: string | boolean | null }) {
  // Handle new enum strings
  if (value === 'required' || value === true) return <span className="text-green-700 font-medium">Required</span>;
  if (value === 'not_typically_requested' || value === false) return <span className="text-gray-500">Not typically requested</span>;
  if (value === 'may_be_requested') return <span className="text-amber-600">May be requested</span>;
  return <span className="text-gray-500">Unknown</span>;
}

export default async function RoutePage({
  params,
  searchParams,
}: {
  params: { route: string };
  searchParams: { d?: string };
}) {
  const parsed = parseRoute(params.route);
  if (!parsed) notFound();

  const { passport, destination } = parsed;

  if (passport === destination) {
    notFound();
  }

  const plannedDays = searchParams.d ? parseInt(searchParams.d) : null;

  const [{ passportData, destinationData, visaRules: visaRulesRaw }, related] = await Promise.all([
    getRouteData(passport, destination),
    getRelatedRoutes(passport, destination),
  ]);

  const visaRules: any[] = visaRulesRaw;
  const samePassportRoutes = related.samePassportRoutes;
  const sameDestinationRoutes = related.sameDestinationRoutes;

  if (!passportData || !destinationData) notFound();

  const faqs = generateFAQs(passportData.name, destinationData.name, visaRules);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const hasMultipleSubtypes = visaRules.length > 1 && visaRules.every(r => r.visa_subtype);
  const singleRule = visaRules.length === 1 ? visaRules[0] : null;
  const isSchengen = SCHENGEN_SLUGS.has(destination);
  const isVisaRequired = visaRules.length > 0 && visaRules[0].visa_type === 'visa_required';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen bg-white">
        <div className="bg-gradient-to-b from-blue-50 to-white border-b">
          <div className="container mx-auto px-4 py-8">
            <nav className="text-sm text-gray-600 mb-4">
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href={`/passport/${passport}`} className="hover:text-blue-600">
                {passportData.name}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">{destinationData.name}</span>
            </nav>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Visa requirements for {passportData.name} passport holders traveling to{' '}
              {destinationData.name}
            </h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {visaRules.length === 0 ? (
              <Card className="mb-8 border-yellow-200 bg-yellow-50">
                <CardContent className="py-8">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-6 w-6 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 mb-2">Visa information not available</p>
                      <p className="text-gray-700">
                        We don't have visa requirement information for {passportData.name} passport
                        holders traveling to {destinationData.name}. Please check with the{' '}
                        {destinationData.name} embassy or consulate, or visit official government
                        websites for the most accurate information.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : hasMultipleSubtypes ? (
              <>
                <Card className="mb-8 shadow-lg">
                  <CardHeader className="bg-gray-50">
                    <div className="flex items-center gap-3">
                      <Badge className={`${getVisaTypeBadgeColor(visaRules[0].visa_type)} text-base py-1 px-3`}>
                        {getVisaTypeLabel(visaRules[0].visa_type)}
                      </Badge>
                      <CardTitle className="text-xl">{visaRules.length} options available</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 pr-4 font-semibold text-gray-700 w-32">Option</th>
                            <th className="text-left py-3 pr-4 font-semibold text-gray-700">Max Stay</th>
                            <th className="text-left py-3 pr-4 font-semibold text-gray-700">Passport Validity</th>
                            <th className="text-left py-3 pr-4 font-semibold text-gray-700">Return Ticket</th>
                            <th className="text-left py-3 font-semibold text-gray-700">Source</th>
                          </tr>
                        </thead>
                        <tbody>
                          {visaRules.map(rule => (
                            <tr key={rule.id} className="border-b last:border-0 hover:bg-gray-50">
                              <td className="py-4 pr-4">
                                <span className="font-semibold text-gray-900">{rule.visa_subtype}</span>
                              </td>
                              <td className="py-4 pr-4 text-gray-700">
                                {rule.max_stay_days ? `${rule.max_stay_days} days` : '—'}
                              </td>
                              <td className="py-4 pr-4 text-gray-700">
                                {rule.passport_validity_months ? `${rule.passport_validity_months} months` : 'N/A'}
                              </td>
                              <td className="py-4 pr-4">
                                <BooleanIcon value={rule.return_ticket_required} />
                              </td>
                              <td className="py-4">
                                {rule.official_source_url ? (
                                  <a
                                    href={rule.official_source_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline flex items-center gap-1"
                                  >
                                    Official
                                    <ExternalLink className="h-3 w-3" />
                                  </a>
                                ) : '—'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {visaRules.map(rule => (
                  <Card key={rule.id} className="mb-6">
                    <CardHeader className="bg-gray-50">
                      <CardTitle className="text-lg">{rule.visa_subtype}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 space-y-4">
                      {rule.stay_rule && (
                        <p className="text-gray-700">{rule.stay_rule}</p>
                      )}

                      <div className="grid sm:grid-cols-2 gap-3">
                        {rule.return_ticket_required && (
                          <div className="flex items-center gap-3">
                            <BooleanIcon value={rule.return_ticket_required} />
                            <div>
                              <p className="font-medium text-sm">Return ticket</p>
                              <p className="text-xs text-gray-500"><BooleanLabel value={rule.return_ticket_required} /></p>
                            </div>
                          </div>
                        )}
                        {rule.insurance_required && (
                          <div className="flex items-center gap-3">
                            <BooleanIcon value={rule.insurance_required} />
                            <div>
                              <p className="font-medium text-sm">Travel insurance</p>
                              <p className="text-xs text-gray-500"><BooleanLabel value={rule.insurance_required} /></p>
                            </div>
                          </div>
                        )}
                        {rule.sufficient_funds_required && (
                          <div className="flex items-center gap-3">
                            <BooleanIcon value={rule.sufficient_funds_required} />
                            <div>
                              <p className="font-medium text-sm">Proof of funds</p>
                              <p className="text-xs text-gray-500"><BooleanLabel value={rule.sufficient_funds_required} /></p>
                            </div>
                          </div>
                        )}
                      </div>

                      {rule.notes && (
                        <p className="text-sm text-gray-600 border-t pt-3">{rule.notes}</p>
                      )}

                      {rule.last_verified && (
                        <p className="text-xs text-gray-400">
                          Last verified:{' '}
                          {new Date(rule.last_verified).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}

                {isSchengen && (
                  <SchengenRulesCard destinationName={destinationData.name} visaRequired={isVisaRequired} />
                )}
              </>
            ) : singleRule ? (
              <>
                <Card className="mb-8 shadow-lg">
                  <CardHeader className="bg-gray-50">
                    <CardTitle className="text-xl">Visa Status</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Visa Type</p>
                        <Badge className={`${getVisaTypeBadgeColor(singleRule.visa_type)} text-lg py-1 px-3`}>
                          {getVisaTypeLabel(singleRule.visa_type)}
                        </Badge>
                      </div>

                      {singleRule.max_stay_days && (
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Maximum Stay</p>
                          <p className="text-2xl font-semibold">{singleRule.max_stay_days} days</p>
                        </div>
                      )}

                      {singleRule.stay_rule && (
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Stay Rule</p>
                          <p className="font-medium">{singleRule.stay_rule}</p>
                        </div>
                      )}

                      <div>
                        <p className="text-sm text-gray-600 mb-2">Passport Validity Required</p>
                        <p className="font-medium">
                          {singleRule.passport_validity_months ? `${singleRule.passport_validity_months} months` : 'N/A'}
                        </p>
                      </div>

                      <div className="md:col-span-2">
                        <p className="text-sm text-gray-600 mb-2">Last Verified</p>
                        <p className="font-medium">
                          {new Date(singleRule.last_verified).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>

                      {singleRule.official_source_url && (
                        <div className="md:col-span-2">
                          <a
                            href={singleRule.official_source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center gap-2"
                          >
                            View official source
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                      )}
                    </div>

                    {plannedDays && singleRule.max_stay_days && (
                      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
                        {plannedDays <= singleRule.max_stay_days ? (
                          <div className="flex items-start gap-2 text-green-700">
                            <CheckCircle className="h-5 w-5 mt-0.5" />
                            <div>
                              <p className="font-medium">Planned stay is within allowed duration</p>
                              <p className="text-sm">
                                Your planned stay of {plannedDays} days is within the maximum allowed
                                stay of {singleRule.max_stay_days} days.
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start gap-2 text-red-700">
                            <XCircle className="h-5 w-5 mt-0.5" />
                            <div>
                              <p className="font-medium">Planned stay exceeds allowed duration</p>
                              <p className="text-sm">
                                Your planned stay of {plannedDays} days exceeds the maximum allowed
                                stay of {singleRule.max_stay_days} days.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Entry Conditions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[
                        { label: 'Return or onward ticket', value: singleRule.return_ticket_required },
                        { label: 'Travel insurance', value: singleRule.insurance_required },
                        { label: 'Proof of sufficient funds', value: singleRule.sufficient_funds_required },
                      ].filter(({ value }) => value !== null && value !== undefined).map(({ label, value }) => (
                        <li key={label} className="flex items-start gap-3">
                          <BooleanIcon value={value} />
                          <div>
                            <p className="font-medium">{label}</p>
                            <p className="text-sm text-gray-600">
                              <BooleanLabel value={value} />
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    {[singleRule.return_ticket_required, singleRule.insurance_required, singleRule.sufficient_funds_required].every(v => v === null || v === undefined) && (
                      <p className="text-gray-500 text-sm">Entry condition details not available. Check with official sources.</p>
                    )}
                  </CardContent>
                </Card>

                {singleRule.notes && (
                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle>Additional Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{singleRule.notes}</p>
                    </CardContent>
                  </Card>
                )}

                {isSchengen && (
                  <SchengenRulesCard destinationName={destinationData.name} visaRequired={isVisaRequired} />
                )}
              </>
            ) : null}

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index}>
                      <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {samePassportRoutes.data && samePassportRoutes.data.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">More {passportData.name} routes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {samePassportRoutes.data.map((route: any) => (
                        <li key={route.id}>
                          <Link
                            href={`/passport/${passport}/destination/${route.destination_slug}`}
                            className="text-blue-600 hover:underline"
                          >
                            {passportData.name} to {route.destinations?.name || route.destination_slug}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/passport/${passport}`}
                      className="text-sm text-blue-600 hover:underline mt-4 inline-block"
                    >
                      View all {passportData.name} routes →
                    </Link>
                  </CardContent>
                </Card>
              )}

              {sameDestinationRoutes.data && sameDestinationRoutes.data.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">More {destinationData.name} routes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {sameDestinationRoutes.data.map((route: any) => (
                        <li key={route.id}>
                          <Link
                            href={`/passport/${route.passport_slug}/destination/${destination}`}
                            className="text-blue-600 hover:underline"
                          >
                            {route.passports?.name || route.passport_slug} to {destinationData.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/destination/${destination}`}
                      className="text-sm text-blue-600 hover:underline mt-4 inline-block"
                    >
                      View all {destinationData.name} routes →
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>

            <Card className="bg-blue-50 border-blue-200">
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
