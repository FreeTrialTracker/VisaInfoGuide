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

interface Props {
  params: { passport: string };
}

export async function generateStaticParams() {
  return PRIMARY_PASSPORTS.map(passport => ({ passport }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const passport = getPassportBySlug(params.passport);
  if (!passport) return {};

  const title = `Where Can ${passport.name} Citizens Travel Without a Visa in 2026? | VisaInfoGuide`;
  const description = `Discover all destinations where ${passport.name} passport holders can travel without a visa in 2026. Comprehensive guide to visa-free countries, visa on arrival, and eVisa options for ${passport.name} citizens.`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl(`/passport/${params.passport}/travel-without-visa`),
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl(`/passport/${params.passport}/travel-without-visa`),
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function TravelWithoutVisaPage({ params }: Props) {
  const passport = getPassportBySlug(params.passport);

  if (!passport) notFound();
  if (!PRIMARY_PASSPORTS.includes(params.passport as any)) notFound();

  const { data: visaFreeRules } = await supabase
    .from('visa_rules')
    .select('destination_slug, max_stay_days, visa_type')
    .eq('passport_slug', params.passport)
    .or('visa_type.eq.visa_free,visa_type.eq.visa_free_eta')
    .order('destination_slug');

  const { data: voaRules } = await supabase
    .from('visa_rules')
    .select('destination_slug, max_stay_days, visa_type')
    .eq('passport_slug', params.passport)
    .eq('visa_type', 'visa_on_arrival')
    .order('destination_slug');

  const { data: evisaRules } = await supabase
    .from('visa_rules')
    .select('destination_slug, max_stay_days, visa_type')
    .eq('passport_slug', params.passport)
    .eq('visa_type', 'evisa')
    .order('destination_slug');

  const visaFreeCount = (visaFreeRules || []).length;
  const voaCount = (voaRules || []).length;
  const evisaCount = (evisaRules || []).length;
  const totalEasyAccess = visaFreeCount + voaCount + evisaCount;

  const visaFreeCountries = (visaFreeRules || []).map((rule: any) => {
    const destination = getDestinationBySlug(rule.destination_slug);
    return destination ? { ...rule, name: destination.name } : null;
  }).filter(Boolean);

  const voaCountries = (voaRules || []).map((rule: any) => {
    const destination = getDestinationBySlug(rule.destination_slug);
    return destination ? { ...rule, name: destination.name } : null;
  }).filter(Boolean);

  const evisaCountries = (evisaRules || []).map((rule: any) => {
    const destination = getDestinationBySlug(rule.destination_slug);
    return destination ? { ...rule, name: destination.name } : null;
  }).filter(Boolean);

  const breadcrumbSchema = breadcrumbJsonLd([
    { name: 'Resources', url: canonicalUrl('/resources') },
    { name: passport.name, url: canonicalUrl(`/passport/${params.passport}`) },
    { name: 'Travel Without Visa', url: canonicalUrl(`/passport/${params.passport}/travel-without-visa`) },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs
            items={[
              { name: 'Resources', url: '/resources' },
              { name: passport.name, url: `/passport/${params.passport}` },
              { name: 'Travel Without Visa', url: `/passport/${params.passport}/travel-without-visa` },
            ]}
          />

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Where Can {passport.name} Citizens Travel Without a Visa in 2026?
          </h1>

          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 p-8 mb-8 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-900 mb-2">{visaFreeCount}</div>
                <div className="text-sm text-blue-700 font-medium">Visa-Free Destinations</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-900 mb-2">{voaCount}</div>
                <div className="text-sm text-blue-700 font-medium">Visa on Arrival</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-900 mb-2">{evisaCount}</div>
                <div className="text-sm text-blue-700 font-medium">eVisa Available</div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-blue-200 text-center">
              <p className="text-lg text-blue-900">
                <strong>Total Easy Access:</strong> {totalEasyAccess} destinations where {passport.name} citizens can enter without a traditional embassy visa
              </p>
            </div>
          </div>

          <section className="mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Understanding Your Travel Options
              </h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Visa-Free Travel</h3>
                  <p className="text-sm">
                    Simply present your {passport.name} passport at immigration. No advance application needed.
                    Entry is typically granted for tourism and short business visits.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Visa on Arrival</h3>
                  <p className="text-sm">
                    Obtain your visa when you land at the airport or border crossing. Usually involves paying a fee
                    and filling out a form. Faster than applying through an embassy in advance.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">eVisa</h3>
                  <p className="text-sm">
                    Apply online before travel. Usually processed within days and linked to your passport electronically.
                    More convenient than embassy applications but requires advance planning.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Visa-Free Destinations ({visaFreeCount})
                </h2>
                <Link
                  href={`/passport/${params.passport}/visa-free-countries`}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  View detailed list →
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {visaFreeCountries.map((country: any) => (
                  <Link
                    key={country.destination_slug}
                    href={`/passport/${params.passport}/destination/${country.destination_slug}`}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-blue-50 hover:border-blue-200 border border-gray-200 transition-colors"
                  >
                    <div className="font-medium text-gray-900 text-sm">{country.name}</div>
                    {country.max_stay_days && (
                      <div className="text-xs text-gray-500 mt-1">{country.max_stay_days} days</div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {voaCount > 0 && (
            <section className="mb-8">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Visa on Arrival ({voaCount})
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {voaCountries.map((country: any) => (
                    <Link
                      key={country.destination_slug}
                      href={`/passport/${params.passport}/destination/${country.destination_slug}`}
                      className="p-3 bg-gray-50 rounded-lg hover:bg-blue-50 hover:border-blue-200 border border-gray-200 transition-colors"
                    >
                      <div className="font-medium text-gray-900 text-sm">{country.name}</div>
                      {country.max_stay_days && (
                        <div className="text-xs text-gray-500 mt-1">{country.max_stay_days} days</div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {evisaCount > 0 && (
            <section className="mb-8">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  eVisa Available ({evisaCount})
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {evisaCountries.map((country: any) => (
                    <Link
                      key={country.destination_slug}
                      href={`/passport/${params.passport}/destination/${country.destination_slug}`}
                      className="p-3 bg-gray-50 rounded-lg hover:bg-blue-50 hover:border-blue-200 border border-gray-200 transition-colors"
                    >
                      <div className="font-medium text-gray-900 text-sm">{country.name}</div>
                      {country.max_stay_days && (
                        <div className="text-xs text-gray-500 mt-1">Up to {country.max_stay_days} days</div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          <section className="mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-3">Important Travel Tips</h3>
              <ul className="list-disc ml-6 text-blue-800 space-y-2 text-sm">
                <li>Always check your passport has at least 6 months validity before travel</li>
                <li>Keep proof of onward/return travel and accommodation bookings</li>
                <li>Have evidence of sufficient funds for your stay</li>
                <li>Visa-free and VOA entry is typically for tourism and short business only</li>
                <li>Entry requirements can change - verify with official sources before departure</li>
                <li>Some countries may require vaccination certificates or health insurance</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Explore More Resources
              </h2>
              <div className="space-y-3">
                <Link
                  href={`/passport/${params.passport}/visa-free-countries`}
                  className="block text-blue-600 hover:text-blue-800 font-medium"
                >
                  Complete list of visa-free countries for {passport.name} →
                </Link>
                <Link
                  href={`/passport/${params.passport}`}
                  className="block text-blue-600 hover:text-blue-800 font-medium"
                >
                  View all destinations for {passport.name} passport →
                </Link>
                <Link
                  href="/research/most-powerful-passports-2026"
                  className="block text-blue-600 hover:text-blue-800 font-medium"
                >
                  See how {passport.name} ranks globally →
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
