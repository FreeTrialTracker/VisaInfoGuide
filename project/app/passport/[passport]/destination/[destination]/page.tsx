import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import {
  getPassportBySlug,
  getDestinationBySlug,
  getRelatedPairs,
  getPriorityPairStaticParams,
  isPrimaryClusterPair,
  getClusterDestinations,
} from '@/lib/countries';
import { buildTitle, buildDescription, canonicalUrl, webpageJsonLd, faqJsonLd, breadcrumbJsonLd, formatDate, currentDate } from '@/lib/seo';
import {
  generatePairDescription,
  formatRequirementStatus,
  formatPassportValidityRequirement,
  calculateDataConfidence,
} from '@/lib/seo-helpers';
import { getVisaRule, getAllVisaRules, formatVisaType, formatStayDuration, formatPassportValidity, getVisaTypeDescription } from '@/lib/visa-data';
import { generateContextualFAQs } from '@/lib/faq-generator';
import CrossDomainLink from '@/components/CrossDomainLink';
import TemporaryUnavailable from '@/components/TemporaryUnavailable';
import { isTransientError } from '@/lib/errors';
import RelatedDestinations from '@/components/RelatedDestinations';
import { getContextualPairLinks } from '@/lib/data/crosslinks';

interface Props {
  params: { passport: string; destination: string };
}

export const revalidate = 86400;

// Allow on-demand ISR for any valid pair not in the prebuilt set.
// Pages not prerendered at build time will generate on first request
// and then be cached + revalidated like any other ISR page.
export const dynamicParams = true;

export async function generateStaticParams() {
  return getPriorityPairStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
  const passport = getPassportBySlug(params.passport);
  const destination = getDestinationBySlug(params.destination);
  if (!passport || !destination) return {};

  // Get visa data for optimized description and title
  const visaRule = await getVisaRule(params.passport, params.destination);
  const description = visaRule
    ? generatePairDescription(
        passport.name,
        destination.name,
        visaRule.visa_type,
        visaRule.max_stay_days,
        visaRule.stay_rule
      )
    : buildDescription({ type: 'pair', passport: passport.name, destination: destination.name });

  let title: string = buildTitle({ type: 'pair', passport: passport.name, destination: destination.name });

  const isUsChinaPair = params.passport === 'united-states' && params.destination === 'china';
  if (isUsChinaPair) {
    title = 'Do US Citizens Need a Visa for China? (Updated March 2026)';
  }

  const finalDescription = isUsChinaPair
    ? 'US citizens can enter China visa-free for up to 30 days under a temporary policy valid through December 2026. See entry rules, passport requirements, and what to verify before you travel.'
    : description;

  const confidence = visaRule ? calculateDataConfidence(visaRule) : 'low';

  return {
    title,
    description: finalDescription,
    alternates: {
      canonical: canonicalUrl(`/passport/${params.passport}/destination/${params.destination}`),
    },
    openGraph: {
      title,
      description: finalDescription,
      url: canonicalUrl(`/passport/${params.passport}/destination/${params.destination}`),
      type: 'website',
    },
    robots: {
      index: confidence !== 'low',
      follow: true,
    },
  };
  } catch {
    return {};
  }
}

export default async function PairPage({ params }: Props) {
  const passport = getPassportBySlug(params.passport);
  const destination = getDestinationBySlug(params.destination);

  if (!passport || !destination) notFound();
  if (params.passport === params.destination) notFound();

  let visaRule: Awaited<ReturnType<typeof getVisaRule>> = null;
  let allVisaRules: Awaited<ReturnType<typeof getAllVisaRules>> = [];

  try {
    [visaRule, allVisaRules] = await Promise.all([
      getVisaRule(params.passport, params.destination),
      getAllVisaRules(params.passport, params.destination),
    ]);
  } catch (err) {
    if (isTransientError(err)) return <TemporaryUnavailable />;
    notFound();
  }

  if (!visaRule) notFound();

  const primaryRule = visaRule!;
  const alternativeRules = allVisaRules.filter(rule => rule.id !== primaryRule.id);

  const relatedPairs = getRelatedPairs(params.passport, params.destination);
  const clusterDestinations = getClusterDestinations(params.passport, params.destination, 12);
  const isInPrimaryCluster = isPrimaryClusterPair(params.passport, params.destination);

  const contextualPairLinks = await getContextualPairLinks(
    params.passport,
    params.destination,
    6
  );

  const stayDuration = formatStayDuration(visaRule.max_stay_days, visaRule.stay_rule, visaRule.stay_window_days);
  const visaTypeFormatted = formatVisaType(visaRule.visa_type);
  const passportValidityFormatted = formatPassportValidityRequirement(
    visaRule.passport_validity_requirement || null,
    visaRule.passport_validity_months
  );
  const dataConfidence = calculateDataConfidence(visaRule);

  const directAnswer = (() => {
    const visaTypeLower = visaRule.visa_type.toLowerCase();
    if (visaTypeLower.includes('visa_free')) {
      return `${passport.name} citizens can enter ${destination.name} ${visaTypeFormatted}${visaRule.max_stay_days ? ` for up to ${stayDuration}` : ''}.`;
    } else if (visaTypeLower === 'evisa') {
      return `${passport.name} citizens need to obtain an eVisa before traveling to ${destination.name}.${visaRule.max_stay_days ? ` Maximum stay: ${stayDuration}.` : ''}`;
    } else if (visaTypeLower === 'visa_on_arrival') {
      return `${passport.name} citizens can obtain a visa on arrival when entering ${destination.name}.${visaRule.max_stay_days ? ` Maximum stay: ${stayDuration}.` : ''}`;
    } else if (visaTypeLower === 'visa_required') {
      return `${passport.name} citizens must obtain a visa from a ${destination.name} embassy or consulate before travel.`;
    } else if (visaTypeLower === 'restricted') {
      return `Entry to ${destination.name} is currently restricted for ${passport.name} passport holders.`;
    }
    return `${passport.name} citizens traveling to ${destination.name} require ${visaTypeFormatted}.`;
  })();

  const faqs = generateContextualFAQs(
    visaRule,
    passport.name,
    destination.name,
    params.passport,
    params.destination
  );

  const webpageSchema = webpageJsonLd({
    name: `${destination.name} visa requirements for ${passport.name} citizens`,
    description: buildDescription({ type: 'pair', passport: passport.name, destination: destination.name }),
    url: canonicalUrl(`/passport/${params.passport}/destination/${params.destination}`),
  });

  const faqSchema = faqJsonLd(faqs);

  const isUsChinaPage = params.passport === 'united-states' && params.destination === 'china';

  const breadcrumbSchema = isUsChinaPage
    ? breadcrumbJsonLd([
        { name: 'Home', url: 'https://visainfoguide.com' },
        { name: 'United States Passport', url: 'https://visainfoguide.com/passport/united-states' },
        { name: 'China', url: 'https://visainfoguide.com/passport/united-states/destination/china' },
      ])
    : breadcrumbJsonLd([
        { name: 'Home', url: 'https://visainfoguide.com' },
        { name: `${passport.name} Passport`, url: canonicalUrl(`/passport/${params.passport}`) },
        { name: destination.name, url: canonicalUrl(`/passport/${params.passport}/destination/${params.destination}`) },
      ]);

  const usChinaArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Do US Citizens Need a Visa for China?',
    description: 'US citizens can enter China visa-free for up to 30 days under a temporary unilateral policy. Entry conditions, passport validity rules, and what to check before travel.',
    datePublished: '2024-01-01',
    dateModified: '2026-03-27',
    author: {
      '@type': 'Organization',
      name: 'VisaInfoGuide',
      url: 'https://visainfoguide.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'VisaInfoGuide',
      url: 'https://visainfoguide.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://visainfoguide.com/passport/united-states/destination/china',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {isUsChinaPage && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(usChinaArticleSchema) }}
        />
      )}
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs
            items={isUsChinaPage
              ? [
                  { name: 'United States', url: '/passport/united-states' },
                  { name: 'China', url: '/passport/united-states/destination/china' },
                ]
              : [
                  { name: 'Resources', url: '/resources' },
                  { name: passport.name, url: `/passport/${params.passport}` },
                  { name: destination.name, url: `/passport/${params.passport}/destination/${params.destination}` },
                ]
            }
          />

          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Do {passport.name === 'United States' ? 'US' : passport.name} citizens need a visa for {destination.name === 'United Kingdom' ? 'the UK' : destination.name}?
          </h1>

          <section className="direct-answer bg-white rounded-lg border-2 border-blue-200 p-6 mb-6">
            <p className="text-gray-900 mb-4">
              {directAnswer}
            </p>
            <ul className="space-y-2 text-gray-700">
              {visaRule.max_stay_days && (
                <li className="flex items-start">
                  <span className="font-semibold mr-2 min-w-[140px]">Maximum stay:</span>
                  <span>{stayDuration}</span>
                </li>
              )}
              <li className="flex items-start">
                <span className="font-semibold mr-2 min-w-[140px]">Visa type:</span>
                <span>{visaTypeFormatted}</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2 min-w-[140px]">Passport validity:</span>
                <span>{passportValidityFormatted}</span>
              </li>
              {visaRule.return_ticket_required !== null && (
                <li className="flex items-start">
                  <span className="font-semibold mr-2 min-w-[140px]">Return ticket:</span>
                  <span>{formatRequirementStatus(visaRule.return_ticket_required)}</span>
                </li>
              )}
              {visaRule.sufficient_funds_required !== null && (
                <li className="flex items-start">
                  <span className="font-semibold mr-2 min-w-[140px]">Proof of funds:</span>
                  <span>{formatRequirementStatus(visaRule.sufficient_funds_required)}</span>
                </li>
              )}
              {visaRule.insurance_required !== null && (
                <li className="flex items-start">
                  <span className="font-semibold mr-2 min-w-[140px]">Insurance:</span>
                  <span>{formatRequirementStatus(visaRule.insurance_required)}</span>
                </li>
              )}
            </ul>
            {visaRule.notes && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-700">{visaRule.notes}</p>
              </div>
            )}
          </section>

          <div className="flex items-center justify-between mb-4">
            <p className="text-xs text-gray-500">
              Data reviewed {formatDate(currentDate)}. Entry rules may change.
            </p>
            <span className={`text-xs px-2 py-1 rounded ${
              dataConfidence === 'high' ? 'bg-green-100 text-green-800' :
              dataConfidence === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {dataConfidence === 'high' ? '✓ High confidence' :
               dataConfidence === 'medium' ? 'Medium confidence' :
               'Limited data'}
            </span>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-sm">
            <p className="text-blue-900 font-medium mb-2">Verify with official sources:</p>
            <div className="space-y-1">
              <div>
                <a
                  href="https://www.iatatravelcentre.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  IATA Travel Centre
                </a>
                <span className="text-blue-700"> - International travel document requirements</span>
              </div>
              {destination.official_immigration_url && (
                <div>
                  <a
                    href={destination.official_immigration_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    {destination.name} official immigration
                  </a>
                  <span className="text-blue-700"> - Current entry requirements</span>
                </div>
              )}
            </div>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {visaRule.visa_type.includes('visa_free') ? 'Visa-Free Entry' :
               visaRule.visa_type === 'evisa' ? 'eVisa Requirements' :
               visaRule.visa_type === 'visa_on_arrival' ? 'Visa on Arrival Process' :
               visaRule.visa_type === 'visa_required' ? 'Embassy Visa Required' :
               'Entry Requirements'} for {passport.name} Citizens
            </h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="text-gray-700 mb-4">
                {getVisaTypeDescription(visaRule.visa_type)}
              </p>

              {visaRule.visa_type.includes('visa_free') && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">What visa-free means</h3>
                    <p className="text-gray-600 text-sm">
                      {passport.name} passport holders can enter {destination.name} without applying for a visa in advance.
                      Simply present your valid passport at immigration control{visaRule.max_stay_days ? ` and you'll typically be granted entry for up to ${stayDuration}` : ''}.
                    </p>
                  </div>
                  {visaRule.visa_type === 'visa_free_eta' && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Electronic authorization required</h3>
                      <p className="text-gray-600 text-sm">
                        While no visa is required, you must obtain an electronic travel authorization (eTA) or similar online approval before your trip.
                        This is typically a quick online process completed within minutes to a few days.
                      </p>
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Purpose of visit</h3>
                    <p className="text-gray-600 text-sm">
                      Visa-free entry typically covers tourism, business meetings, and short visits.
                      Work, study, or long-term stays usually require a different visa type obtained in advance.
                    </p>
                  </div>
                </div>
              )}

              {visaRule.visa_type === 'evisa' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">How to apply</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Apply online through {destination.name}&apos;s official eVisa portal before your trip.
                      The process typically involves:
                    </p>
                    <ul className="list-disc ml-6 text-gray-600 text-sm space-y-1">
                      <li>Complete online application form</li>
                      <li>Upload passport photo and supporting documents</li>
                      <li>Pay visa fee (amount varies)</li>
                      <li>Receive approval via email (processing time varies)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Processing time</h3>
                    <p className="text-gray-600 text-sm">
                      Apply at least 7-14 days before your intended travel date. Some eVisas are approved within 24-72 hours,
                      while others may take longer. Check the official website for current processing times.
                    </p>
                  </div>
                </div>
              )}

              {visaRule.visa_type === 'visa_on_arrival' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">What to expect</h3>
                    <p className="text-gray-600 text-sm">
                      When you arrive at {destination.name}, proceed to the visa on arrival counter before immigration.
                      Bring required documents and payment in the accepted currency (usually USD or local currency).
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Documents typically required</h3>
                    <ul className="list-disc ml-6 text-gray-600 text-sm space-y-1">
                      <li>Valid passport ({passportValidityFormatted})</li>
                      <li>Passport-sized photos (usually 2)</li>
                      <li>Return or onward ticket</li>
                      <li>Proof of accommodation</li>
                      <li>Sufficient funds for your stay</li>
                      <li>Visa fee in cash</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Processing time</h3>
                    <p className="text-gray-600 text-sm">
                      Expect to spend 30 minutes to 2 hours at the visa on arrival counter, depending on queue length and peak travel times.
                    </p>
                  </div>
                </div>
              )}

              {visaRule.visa_type === 'visa_required' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Application process</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Apply at a {destination.name} embassy or consulate before your trip. The process typically includes:
                    </p>
                    <ul className="list-disc ml-6 text-gray-600 text-sm space-y-1">
                      <li>Complete visa application form</li>
                      <li>Schedule and attend visa interview (if required)</li>
                      <li>Submit passport and supporting documents</li>
                      <li>Pay visa application fee</li>
                      <li>Wait for processing (varies by location)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Timeline</h3>
                    <p className="text-gray-600 text-sm">
                      Apply at least 4-8 weeks before your intended travel date. Processing times vary significantly by embassy and time of year.
                      During peak seasons, allow extra time.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Required documents</h3>
                    <p className="text-gray-600 text-sm">
                      Requirements vary, but commonly include passport with adequate validity, passport photos, travel itinerary,
                      accommodation proof, financial statements, travel insurance, and visa fee payment.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {alternativeRules.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Other visa options for {passport.name} citizens
              </h2>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <p className="text-gray-700 mb-4">
                  The primary entry method shown above is the most common option. Additional visa types may be available for specific purposes:
                </p>
                <div className="space-y-4">
                  {alternativeRules.map((rule, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">{formatVisaType(rule.visa_type)}</h3>
                      <ul className="space-y-1 text-sm text-gray-700">
                        {rule.max_stay_days && (
                          <li>Maximum stay: {formatStayDuration(rule.max_stay_days, rule.stay_rule, rule.stay_window_days)}</li>
                        )}
                        {rule.visa_subtype && (
                          <li>Purpose: {rule.visa_subtype}</li>
                        )}
                        {rule.notes && (
                          <li className="text-gray-600">{rule.notes}</li>
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Contact the {destination.name} embassy or consulate to determine which visa type best suits your travel purpose.
                </p>
              </div>
            </section>
          )}

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-12">
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> Entry rules can change. Always verify current requirements with official
              sources before booking travel.
            </p>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Entry requirements for {destination.name}
            </h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Passport validity</h3>
              <p className="text-gray-700 mb-4">
                {destination.name} requires {passport.name} passports to be valid for at least {passportValidityFormatted}.
                Insufficient passport validity is a common reason for entry denial. Check your passport expiry date and renew if needed.
              </p>

              {(visaRule.return_ticket_required !== null && visaRule.return_ticket_required !== false) && (
                <>
                  <h3 className="font-semibold text-gray-900 mb-3">Proof of onward travel</h3>
                  <p className="text-gray-700 mb-4">
                    {visaRule.return_ticket_required
                      ? `${destination.name} requires proof of return or onward travel. Have your flight booking confirmation ready to present at immigration.`
                      : 'Immigration officers may request proof of return or onward travel, such as a flight booking.'}
                  </p>
                </>
              )}

              {(visaRule.sufficient_funds_required !== null && visaRule.sufficient_funds_required !== false) && (
                <>
                  <h3 className="font-semibold text-gray-900 mb-3">Financial requirements</h3>
                  <p className="text-gray-700 mb-4">
                    {visaRule.sufficient_funds_required
                      ? `You must demonstrate sufficient funds for your stay in ${destination.name}. Bring bank statements, credit cards, or cash as proof.`
                      : `You may need to demonstrate sufficient funds for your stay through bank statements, credit cards, or cash.`}
                  </p>
                </>
              )}

              {visaRule.insurance_required && (
                <>
                  <h3 className="font-semibold text-gray-900 mb-3">Travel insurance</h3>
                  <p className="text-gray-700 mb-4">
                    Travel insurance is required for entry to {destination.name}. Obtain comprehensive coverage before your trip and carry proof of insurance.
                  </p>
                </>
              )}

              <h3 className="font-semibold text-gray-900 mb-3">Accommodation</h3>
              <p className="text-gray-700">
                Have proof of accommodation ready to show at immigration. This can be hotel reservations, Airbnb bookings, or an invitation letter from a host in {destination.name}.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Common reasons travelers get denied entry</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-3">×</span>
                  <span>Insufficient passport validity remaining</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-3">×</span>
                  <span>Missing required visa or authorization</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-3">×</span>
                  <span>No proof of return travel</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-3">×</span>
                  <span>Insufficient funds for the planned stay</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-3">×</span>
                  <span>No accommodation arrangements</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-3">×</span>
                  <span>Previous immigration violations</span>
                </li>
              </ul>
            </div>
          </section>

          <CrossDomainLink
            visaSlug={params.destination}
            siteType="visa"
          />

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frequently asked questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {isInPrimaryCluster && clusterDestinations.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Explore More Destinations for {passport.name} Passport Holders
              </h2>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <p className="text-gray-600 mb-4">
                  Find visa requirements for other popular destinations for {passport.name} citizens:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {clusterDestinations.map(dest => (
                    <Link
                      key={dest.destination}
                      href={`/passport/${params.passport}/destination/${dest.destination}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline text-sm"
                    >
                      {dest.name} visa requirements for {passport.name} citizens
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Related visa requirements</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedPairs.map(pair => {
                const relPassport = getPassportBySlug(pair.passport);
                const relDestination = getDestinationBySlug(pair.destination);
                if (!relPassport || !relDestination) return null;

                return (
                  <Link
                    key={`${pair.passport}-${pair.destination}`}
                    href={`/passport/${pair.passport}/destination/${pair.destination}`}
                    className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all duration-200 bg-white"
                  >
                    <div className="font-medium text-gray-900 mb-1">
                      {relPassport.name} → {relDestination.name}
                    </div>
                    <div className="text-sm text-gray-500">View requirements →</div>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Related Research & Travel Rules</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="space-y-4">
                <div>
                  <Link
                    href="/research/most-powerful-passports-2026"
                    className="text-blue-600 hover:text-blue-800 font-medium text-lg"
                  >
                    See how {passport.name} ranks in global mobility
                  </Link>
                  <p className="text-gray-600 text-sm mt-1">
                    Compare {passport.name} passport strength with other countries and understand visa-free access worldwide.
                  </p>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <Link
                    href="/research/passport-validity-rules-by-country"
                    className="text-blue-600 hover:text-blue-800 font-medium text-lg"
                  >
                    Understand passport validity rules before traveling
                  </Link>
                  <p className="text-gray-600 text-sm mt-1">
                    Learn about the 3-month and 6-month passport validity requirements that affect entry to {destination.name}.
                  </p>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  {['austria', 'belgium', 'croatia', 'czech-republic', 'france', 'germany', 'greece', 'hungary', 'italy', 'netherlands', 'poland', 'portugal', 'spain', 'switzerland'].includes(params.destination) ? (
                    <>
                      <Link
                        href="/research/schengen-90-180-rule-explained"
                        className="text-blue-600 hover:text-blue-800 font-medium text-lg"
                      >
                        Understand the Schengen 90/180 rule for {destination.name}
                      </Link>
                      <p className="text-gray-600 text-sm mt-1">
                        Essential guide to calculating your allowed stay in the Schengen Area, including {destination.name}.
                      </p>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/research/visa-free-vs-visa-on-arrival-vs-evisa"
                        className="text-blue-600 hover:text-blue-800 font-medium text-lg"
                      >
                        Compare visa-free entry, visa on arrival, and eVisa options
                      </Link>
                      <p className="text-gray-600 text-sm mt-1">
                        Understand the different entry methods available for {passport.name} citizens traveling abroad.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Compare {passport.name} Passport</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="text-gray-700 mb-4">
                See how {passport.name} passport compares with other countries in terms of global mobility and visa-free access.
              </p>
              <div className="mb-4">
                <Link
                  href={`/compare?passport1=${params.passport}`}
                  className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Compare {passport.name} with another passport
                </Link>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-900 mb-3">Compare with these powerful passports:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {['singapore', 'japan', 'germany', 'united-states', 'united-kingdom', 'france'].map(slug => {
                    if (slug === params.passport) return null;
                    const comparePassport = getPassportBySlug(slug);
                    if (!comparePassport) return null;
                    return (
                      <Link
                        key={slug}
                        href={`/passport/${slug}`}
                        className="text-blue-600 hover:text-blue-800 text-sm py-2 px-3 border border-blue-200 rounded hover:border-blue-400 transition-colors"
                      >
                        {comparePassport.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {contextualPairLinks.length > 0 ? (
            <RelatedDestinations
              links={contextualPairLinks}
              heading={`Other ${destination.name.split(' ')[0]}-Region Visa Requirements for ${passport.name} Citizens`}
              subtext={`Check visa requirements for destinations near ${destination.name}.`}
            />
          ) : (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Popular Destinations for {passport.name} Citizens</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {['united-states', 'united-kingdom', 'france', 'germany', 'japan', 'thailand', 'australia', 'canada'].map(destSlug => {
                  if (destSlug === params.destination) return null;
                  const popDestination = getDestinationBySlug(destSlug);
                  if (!popDestination) return null;
                  return (
                    <Link
                      key={destSlug}
                      href={`/destination/${destSlug}`}
                      className="block p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all duration-200 bg-white"
                    >
                      <div className="font-medium text-gray-900 text-sm">{popDestination.name}</div>
                      <div className="text-xs text-gray-500 mt-1">View requirements →</div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          <section className="bg-blue-50 rounded-lg p-6 border border-blue-100 mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Verify with official sources</h2>
            <p className="text-gray-700 mb-4">
              Always confirm current entry requirements before travel:
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.iatatravelcentre.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  IATA Travel Centre
                </a>
                {' '}- International travel document requirements
              </li>
              <li className="text-gray-700">
                {destination.name} official immigration or foreign affairs website
              </li>
              <li className="text-gray-700">
                {destination.name} embassy or consulate in your country
              </li>
            </ul>
          </section>

          <nav className="border-t border-gray-200 pt-6 flex justify-between">
            <Link
              href={`/passport/${params.passport}`}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to {passport.name} passport
            </Link>
            <Link
              href={`/destination/${params.destination}`}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {destination.name} for all passports →
            </Link>
          </nav>
        </div>
      </main>
    </>
  );
}
