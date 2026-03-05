import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import {
  getPassportBySlug,
  getDestinationBySlug,
  DESTINATIONS,
  PRIMARY_PASSPORTS,
} from '@/lib/countries';
import { canonicalUrl, breadcrumbJsonLd } from '@/lib/seo';
import { supabase } from '@/lib/supabase';

export const revalidate = 86400;

interface Props {
  params: { passport: string };
}

export async function generateStaticParams() {
  return PRIMARY_PASSPORTS.map(passport => ({ passport }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const passport = getPassportBySlug(params.passport);
  if (!passport) return {};

  const title = `${passport.name} Passport Visa-Free Countries (2026) | VisaInfoGuide`;
  const description = `Complete list of visa-free destinations for ${passport.name} passport holders in 2026. Find countries where ${passport.name} citizens can travel without a visa, including maximum stay periods and entry requirements.`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl(`/passport/${params.passport}/visa-free-countries`),
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl(`/passport/${params.passport}/visa-free-countries`),
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

interface VisaFreeDestination {
  destination_slug: string;
  max_stay_days: number | null;
  stay_rule: string | null;
  notes: string | null;
}

export default async function VisaFreeCountriesPage({ params }: Props) {
  const passport = getPassportBySlug(params.passport);

  if (!passport) notFound();
  if (!PRIMARY_PASSPORTS.includes(params.passport as any)) notFound();

  const { data: visaFreeRules } = await supabase
    .from('visa_rules')
    .select('destination_slug, max_stay_days, stay_rule, notes')
    .eq('passport_slug', params.passport)
    .or('visa_type.eq.visa_free,visa_type.eq.visa_free_eta')
    .order('destination_slug');

  const visaFreeData = (visaFreeRules || []) as VisaFreeDestination[];

  const visaFreeCountries = visaFreeData
    .map(rule => {
      const destination = getDestinationBySlug(rule.destination_slug);
      if (!destination) return null;

      let region = 'Other';
      const slug = rule.destination_slug;
      if (['france', 'germany', 'italy', 'spain', 'united-kingdom', 'netherlands', 'switzerland', 'austria', 'belgium', 'croatia', 'czech-republic', 'greece', 'hungary', 'poland', 'portugal'].includes(slug)) {
        region = 'Europe';
      } else if (['japan', 'south-korea', 'singapore', 'thailand', 'china', 'india', 'indonesia', 'malaysia', 'vietnam', 'philippines'].includes(slug)) {
        region = 'Asia';
      } else if (['united-states', 'canada', 'mexico', 'brazil', 'argentina', 'chile', 'colombia'].includes(slug)) {
        region = 'Americas';
      } else if (['united-arab-emirates', 'qatar', 'saudi-arabia', 'turkey', 'egypt'].includes(slug)) {
        region = 'Middle East';
      } else if (['australia', 'new-zealand'].includes(slug)) {
        region = 'Oceania';
      } else if (['south-africa', 'nigeria'].includes(slug)) {
        region = 'Africa';
      }

      return {
        ...rule,
        name: destination.name,
        region,
      };
    })
    .filter(Boolean);

  const totalVisaFree = visaFreeCountries.length;

  const breadcrumbSchema = breadcrumbJsonLd([
    { name: 'Resources', url: canonicalUrl('/resources') },
    { name: passport.name, url: canonicalUrl(`/passport/${params.passport}`) },
    { name: 'Visa-Free Countries', url: canonicalUrl(`/passport/${params.passport}/visa-free-countries`) },
  ]);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': `${passport.name} Passport Visa-Free Countries (2026)`,
    'description': `Complete list of ${totalVisaFree} visa-free destinations for ${passport.name} passport holders in 2026.`,
    'datePublished': '2026-01-01',
    'dateModified': new Date().toISOString(),
    'author': {
      '@type': 'Organization',
      'name': 'VisaInfoGuide',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs
            items={[
              { name: 'Resources', url: '/resources' },
              { name: passport.name, url: `/passport/${params.passport}` },
              { name: 'Visa-Free Countries', url: `/passport/${params.passport}/visa-free-countries` },
            ]}
          />

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {passport.name} Passport Visa-Free Countries (2026 List)
          </h1>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <p className="text-lg text-blue-900">
              <strong>{passport.name}</strong> passport holders can travel visa-free to <strong>{totalVisaFree} destinations</strong> worldwide.
            </p>
          </div>

          <section className="mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                What does visa-free mean?
              </h2>
              <p className="text-gray-700 mb-4">
                Visa-free travel allows {passport.name} citizens to enter a destination without applying for a visa in advance.
                Simply present your valid passport at immigration control and you'll be granted entry for the specified duration.
              </p>
              <p className="text-gray-700">
                Note: Some destinations may require electronic travel authorization (eTA) or similar online approval before travel,
                even though technically no visa is required. Always check specific entry requirements before booking your trip.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Visa-Free Destinations for {passport.name} Passport
            </h2>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Destination
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Max Stay
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Region
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {visaFreeCountries.map((country: any) => (
                      <tr key={country.destination_slug} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{country.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700">
                            {country.max_stay_days ? `${country.max_stay_days} days` : 'Varies'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {country.region}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <Link
                            href={`/passport/${params.passport}/destination/${country.destination_slug}`}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            View requirements →
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="font-semibold text-yellow-900 mb-2">Important Reminders</h3>
              <ul className="list-disc ml-6 text-yellow-800 space-y-2 text-sm">
                <li>Visa-free entry typically covers tourism and short business visits only</li>
                <li>Work, study, or long-term stays usually require a visa obtained in advance</li>
                <li>Entry requirements can change - always verify with official sources before travel</li>
                <li>Meeting passport validity requirements (usually 6 months) is essential</li>
                <li>Immigration officers may request proof of onward travel and sufficient funds</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Explore More {passport.name} Passport Resources
              </h2>
              <div className="space-y-3">
                <Link
                  href={`/passport/${params.passport}`}
                  className="block text-blue-600 hover:text-blue-800 font-medium"
                >
                  View all destinations for {passport.name} passport →
                </Link>
                <Link
                  href={`/passport/${params.passport}/travel-without-visa`}
                  className="block text-blue-600 hover:text-blue-800 font-medium"
                >
                  Where can {passport.name} citizens travel without a visa? →
                </Link>
                <Link
                  href="/resources"
                  className="block text-blue-600 hover:text-blue-800 font-medium"
                >
                  Search visa requirements by country →
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
