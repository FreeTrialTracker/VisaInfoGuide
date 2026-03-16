import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Globe } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { canonicalUrl } from '@/lib/seo';
import { COUNTRIES } from '@/lib/countries';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Immigration Guides by Country 2026 | VisaInfoGuide',
  description:
    'Explore long-term immigration pathways, residency options, and work visa requirements for every country. Paired guides linking short-stay visa info with immigration route details.',
  alternates: {
    canonical: canonicalUrl('/immigration-guides'),
  },
  robots: {
    index: true,
    follow: true,
  },
};

async function getCrosslinks() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data } = await supabase
    .from('country_crosslinks')
    .select('visa_slug, visa_url, immigration_url')
    .eq('is_active', true)
    .order('visa_slug');
  return data ?? [];
}

const VISA_ANCHORS = [
  'Immigration options for this country',
  'Residency pathways and long-term visas',
  'Work visa requirements and pathways',
  'Permanent residence guide',
];

function pickAnchor(slug: string): string {
  const index = slug.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % VISA_ANCHORS.length;
  return VISA_ANCHORS[index];
}

export default async function ImmigrationGuidesPage() {
  const crosslinks = await getCrosslinks();
  const crosslinkSlugs = new Set(crosslinks.map(r => r.visa_slug));
  const crosslinkBySlug = Object.fromEntries(crosslinks.map(r => [r.visa_slug, r]));

  const pairedCountries = COUNTRIES.filter(c => crosslinkSlugs.has(c.slug));
  const visaOnlyCountries = COUNTRIES.filter(c => !crosslinkSlugs.has(c.slug));

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-b from-sky-50 to-white border-b">
        <div className="container mx-auto px-4 py-12 max-w-5xl">
          <nav className="text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Immigration Guides</span>
          </nav>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-sky-100 rounded-xl mt-1">
              <Globe className="h-7 w-7 text-sky-600" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Immigration Guides by Country
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Planning to stay longer than a short visit? These guides connect short-stay visa
                information on VisaInfoGuide with full immigration pathways — residency, work
                visas, and permanent residence — on ImmigrationInfoGuide.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-8 p-5 rounded-xl bg-sky-50 border border-sky-200 text-sm text-sky-900">
          <strong>How this works:</strong> Each paired entry below links to both the short-stay
          visa page on this site and the full immigration guide on{' '}
          <span className="font-semibold">immigrationinfoguide.com</span>. Countries without
          a paired immigration guide show only the visa entry below.
        </div>

        {pairedCountries.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Paired Visa + Immigration Guides ({pairedCountries.length})
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pairedCountries.map(country => {
                const row = crosslinkBySlug[country.slug];
                if (!row) return null;
                const anchor = pickAnchor(country.slug);

                return (
                  <div
                    key={country.slug}
                    className="rounded-xl border border-sky-200 bg-white p-5 hover:border-sky-400 hover:shadow-sm transition-all"
                  >
                    <h3 className="text-base font-semibold text-gray-900 mb-3">
                      {country.name}
                    </h3>
                    <div className="space-y-2">
                      <Link
                        href={`/destination/${country.slug}`}
                        className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                      >
                        Short-stay visa info
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                      <a
                        href={row.immigration_url}
                        className="flex items-center gap-1.5 text-sm text-sky-700 hover:text-sky-900 hover:underline transition-colors"
                      >
                        {anchor}
                        <ArrowRight className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {pairedCountries.length === 0 && (
          <div className="mb-10 p-6 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-900">
            <strong>Immigration guides coming soon.</strong> Paired country guides will appear here
            once the corresponding pages on immigrationinfoguide.com go live. In the meantime,
            you can browse short-stay visa information below.
          </div>
        )}

        {visaOnlyCountries.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Short-Stay Visa Guides ({visaOnlyCountries.length})
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {visaOnlyCountries.map(country => (
                <Link
                  key={country.slug}
                  href={`/destination/${country.slug}`}
                  className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-blue-600 hover:border-blue-300 hover:text-blue-800 hover:shadow-sm transition-all"
                >
                  <span>{country.name}</span>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-12 p-6 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-600">
          <p>
            <strong>Note:</strong> Visa and immigration rules change frequently. Always verify
            requirements with official government sources before making travel or relocation
            plans.
          </p>
        </div>
      </div>
    </div>
  );
}
