import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Breadcrumbs from '@/components/Breadcrumbs';
import { canonicalUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Visa-Free Countries by Passport (2026) | VisaInfoGuide',
  description: 'Discover which countries you can visit visa-free based on your passport. Browse the full list of visa-free destinations for US, UK, Indian, and 90+ other passports.',
  alternates: {
    canonical: canonicalUrl('/visa-free-countries'),
  },
  openGraph: {
    title: 'Visa-Free Countries by Passport (2026)',
    description: 'Discover which countries you can visit visa-free based on your passport.',
    type: 'website',
    url: canonicalUrl('/visa-free-countries'),
    siteName: 'VisaInfoGuide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visa-Free Countries by Passport (2026)',
    description: 'Discover which countries you can visit visa-free based on your passport.',
  },
  robots: { index: true, follow: true },
};

const featuredPassports = [
  { name: 'United States', slug: 'us-passport', flag: '🇺🇸', label: 'US passport' },
  { name: 'United Kingdom', slug: 'uk-passport', flag: '🇬🇧', label: 'UK passport' },
  { name: 'India', slug: 'indian-passport', flag: '🇮🇳', label: 'Indian passport' },
  { name: 'Germany', slug: 'germany-passport', flag: '🇩🇪', label: 'German passport' },
  { name: 'Canada', slug: 'canada-passport', flag: '🇨🇦', label: 'Canadian passport' },
  { name: 'Australia', slug: 'australia-passport', flag: '🇦🇺', label: 'Australian passport' },
  { name: 'Japan', slug: 'japan-passport', flag: '🇯🇵', label: 'Japanese passport' },
  { name: 'France', slug: 'france-passport', flag: '🇫🇷', label: 'French passport' },
  { name: 'China', slug: 'china-passport', flag: '🇨🇳', label: 'Chinese passport' },
  { name: 'Brazil', slug: 'brazil-passport', flag: '🇧🇷', label: 'Brazilian passport' },
  { name: 'South Africa', slug: 'south-africa-passport', flag: '🇿🇦', label: 'South African passport' },
  { name: 'Nigeria', slug: 'nigeria-passport', flag: '🇳🇬', label: 'Nigerian passport' },
];

const allPassports = [
  { name: 'Argentina', slug: 'argentina-passport', flag: '🇦🇷' },
  { name: 'Australia', slug: 'australia-passport', flag: '🇦🇺' },
  { name: 'Austria', slug: 'austria-passport', flag: '🇦🇹' },
  { name: 'Belgium', slug: 'belgium-passport', flag: '🇧🇪' },
  { name: 'Brazil', slug: 'brazil-passport', flag: '🇧🇷' },
  { name: 'Canada', slug: 'canada-passport', flag: '🇨🇦' },
  { name: 'Chile', slug: 'chile-passport', flag: '🇨🇱' },
  { name: 'China', slug: 'china-passport', flag: '🇨🇳' },
  { name: 'Colombia', slug: 'colombia-passport', flag: '🇨🇴' },
  { name: 'Croatia', slug: 'croatia-passport', flag: '🇭��' },
  { name: 'Czech Republic', slug: 'czech-passport', flag: '🇨🇿' },
  { name: 'Denmark', slug: 'denmark-passport', flag: '🇩🇰' },
  { name: 'Egypt', slug: 'egypt-passport', flag: '🇪🇬' },
  { name: 'Finland', slug: 'finland-passport', flag: '🇫🇮' },
  { name: 'France', slug: 'france-passport', flag: '🇫🇷' },
  { name: 'Germany', slug: 'germany-passport', flag: '🇩🇪' },
  { name: 'Greece', slug: 'greece-passport', flag: '🇬🇷' },
  { name: 'Hungary', slug: 'hungary-passport', flag: '🇭🇺' },
  { name: 'India', slug: 'indian-passport', flag: '🇮🇳' },
  { name: 'Indonesia', slug: 'indonesia-passport', flag: '🇮🇩' },
  { name: 'Ireland', slug: 'ireland-passport', flag: '🇮🇪' },
  { name: 'Israel', slug: 'israel-passport', flag: '🇮🇱' },
  { name: 'Italy', slug: 'italy-passport', flag: '🇮🇹' },
  { name: 'Japan', slug: 'japan-passport', flag: '🇯🇵' },
  { name: 'Mexico', slug: 'mexico-passport', flag: '🇲🇽' },
  { name: 'Morocco', slug: 'morocco-passport', flag: '🇲🇦' },
  { name: 'Netherlands', slug: 'netherlands-passport', flag: '🇳🇱' },
  { name: 'New Zealand', slug: 'new-zealand-passport', flag: '🇳🇿' },
  { name: 'Nigeria', slug: 'nigeria-passport', flag: '🇳🇬' },
  { name: 'Norway', slug: 'norway-passport', flag: '🇳🇴' },
  { name: 'Pakistan', slug: 'pakistan-passport', flag: '🇵🇰' },
  { name: 'Peru', slug: 'peru-passport', flag: '🇵🇪' },
  { name: 'Philippines', slug: 'philippines-passport', flag: '🇵🇭' },
  { name: 'Poland', slug: 'poland-passport', flag: '🇵🇱' },
  { name: 'Portugal', slug: 'portugal-passport', flag: '🇵🇹' },
  { name: 'Romania', slug: 'romania-passport', flag: '🇷🇴' },
  { name: 'Russia', slug: 'russia-passport', flag: '🇷🇺' },
  { name: 'Saudi Arabia', slug: 'saudi-arabia-passport', flag: '🇸🇦' },
  { name: 'Singapore', slug: 'singapore-passport', flag: '🇸🇬' },
  { name: 'South Africa', slug: 'south-africa-passport', flag: '🇿🇦' },
  { name: 'South Korea', slug: 'south-korea-passport', flag: '🇰🇷' },
  { name: 'Spain', slug: 'spain-passport', flag: '🇪🇸' },
  { name: 'Sweden', slug: 'sweden-passport', flag: '🇸🇪' },
  { name: 'Switzerland', slug: 'switzerland-passport', flag: '🇨🇭' },
  { name: 'Thailand', slug: 'thai-passport', flag: '🇹🇭' },
  { name: 'Turkey', slug: 'turkey-passport', flag: '🇹🇷' },
  { name: 'Ukraine', slug: 'ukraine-passport', flag: '🇺🇦' },
  { name: 'United Arab Emirates', slug: 'uae-passport', flag: '🇦🇪' },
  { name: 'United Kingdom', slug: 'uk-passport', flag: '🇬🇧' },
  { name: 'United States', slug: 'us-passport', flag: '🇺🇸' },
  { name: 'Vietnam', slug: 'vietnam-passport', flag: '🇻🇳' },
];

export default function VisaFreeCountriesHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://visainfoguide.com/' },
              { '@type': 'ListItem', position: 2, name: 'Visa-Free Countries', item: 'https://visainfoguide.com/visa-free-countries' },
            ],
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <Breadcrumbs
            items={[
              { name: 'Visa-Free Countries', url: '/visa-free-countries' },
            ]}
          />

          <header className="mt-8 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Visa-Free Countries by Passport (2026)
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Find every country your passport can enter without a visa. Select your passport below to see a full grid of visa-free destinations, filtered directly from live entry data.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Only destinations with <strong>visa_type = visa_free</strong> are shown — no visa on arrival, no eTA, no eVisa. Pure visa-free access only.
            </p>
          </header>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Passports</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredPassports.map((p) => (
                <Link
                  key={p.slug}
                  href={`/visa-guides/visa-free-countries/${p.slug}-2026`}
                  className="group"
                >
                  <Card className="h-full transition-all duration-200 hover:shadow-lg hover:border-teal-200">
                    <CardContent className="p-5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{p.flag}</span>
                        <div>
                          <p className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors">
                            {p.name}
                          </p>
                          <p className="text-sm text-gray-500">visa-free countries</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse All Passports</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {allPassports.map((p) => (
                <Link
                  key={p.slug}
                  href={`/visa-guides/visa-free-countries/${p.slug}-2026`}
                  className="group"
                >
                  <Card className="transition-all duration-200 hover:shadow-md hover:border-teal-200">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{p.flag}</span>
                        <span className="font-medium text-gray-900 group-hover:text-teal-700 transition-colors text-sm">
                          {p.name}
                        </span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <section className="bg-teal-50 border border-teal-100 rounded-xl p-8 mb-12">
            <div className="flex items-start gap-4">
              <Globe className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">What counts as visa-free?</h2>
                <p className="text-gray-700 leading-relaxed">
                  These pages show only destinations where your passport holder can arrive and enter with no visa at all — no application, no fee, no electronic pre-authorization required. Visa on arrival, eTA, and eVisa destinations are excluded. Stay durations vary by country and are shown on each destination page.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
