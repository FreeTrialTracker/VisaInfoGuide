import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Breadcrumbs from '@/components/Breadcrumbs';
import { canonicalUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'eVisa Countries by Passport (2026) | VisaInfoGuide',
  description: 'Find every country that offers an eVisa for your passport. Browse the full list of eVisa destinations for US, UK, Indian, and 90+ other passports.',
  alternates: {
    canonical: canonicalUrl('/evisa-countries'),
  },
  openGraph: {
    title: 'eVisa Countries by Passport (2026)',
    description: 'Find every country that offers an eVisa for your passport.',
    type: 'website',
    url: canonicalUrl('/evisa-countries'),
    siteName: 'VisaInfoGuide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'eVisa Countries by Passport (2026)',
    description: 'Find every country that offers an eVisa for your passport.',
  },
  robots: { index: true, follow: true },
};

const featuredPassports = [
  { name: 'United States', slug: 'us', flag: '🇺🇸' },
  { name: 'United Kingdom', slug: 'uk', flag: '🇬🇧' },
  { name: 'India', slug: 'indian', flag: '🇮🇳' },
  { name: 'Germany', slug: 'german', flag: '🇩🇪' },
  { name: 'Canada', slug: 'canadian', flag: '🇨🇦' },
  { name: 'Australia', slug: 'australian', flag: '🇦🇺' },
  { name: 'Japan', slug: 'japanese', flag: '🇯🇵' },
  { name: 'France', slug: 'french', flag: '🇫🇷' },
  { name: 'China', slug: 'chinese', flag: '🇨🇳' },
  { name: 'Brazil', slug: 'brazilian', flag: '🇧🇷' },
  { name: 'South Africa', slug: 'south-african', flag: '🇿🇦' },
  { name: 'Nigeria', slug: 'nigerian', flag: '🇳🇬' },
];

const allPassports = [
  { name: 'Argentina', slug: 'argentinian', flag: '🇦🇷' },
  { name: 'Australia', slug: 'australian', flag: '🇦🇺' },
  { name: 'Austria', slug: 'austrian', flag: '🇦🇹' },
  { name: 'Belgium', slug: 'belgian', flag: '🇧🇪' },
  { name: 'Brazil', slug: 'brazilian', flag: '🇧🇷' },
  { name: 'Canada', slug: 'canadian', flag: '🇨🇦' },
  { name: 'Chile', slug: 'chilean', flag: '🇨🇱' },
  { name: 'China', slug: 'chinese', flag: '🇨🇳' },
  { name: 'Colombia', slug: 'colombian', flag: '🇨🇴' },
  { name: 'Croatia', slug: 'croatian', flag: '🇭🇷' },
  { name: 'Czech Republic', slug: 'czech', flag: '🇨🇿' },
  { name: 'Denmark', slug: 'danish', flag: '🇩🇰' },
  { name: 'Egypt', slug: 'egyptian', flag: '🇪🇬' },
  { name: 'Finland', slug: 'finnish', flag: '🇫🇮' },
  { name: 'France', slug: 'french', flag: '🇫🇷' },
  { name: 'Germany', slug: 'german', flag: '🇩🇪' },
  { name: 'Greece', slug: 'greek', flag: '🇬🇷' },
  { name: 'Hungary', slug: 'hungarian', flag: '🇭🇺' },
  { name: 'India', slug: 'indian', flag: '🇮🇳' },
  { name: 'Indonesia', slug: 'indonesian', flag: '🇮🇩' },
  { name: 'Ireland', slug: 'irish', flag: '🇮🇪' },
  { name: 'Israel', slug: 'israeli', flag: '🇮🇱' },
  { name: 'Italy', slug: 'italian', flag: '🇮🇹' },
  { name: 'Japan', slug: 'japanese', flag: '🇯🇵' },
  { name: 'Mexico', slug: 'mexican', flag: '🇲🇽' },
  { name: 'Morocco', slug: 'moroccan', flag: '🇲🇦' },
  { name: 'Netherlands', slug: 'dutch', flag: '🇳🇱' },
  { name: 'New Zealand', slug: 'new-zealand', flag: '🇳🇿' },
  { name: 'Nigeria', slug: 'nigerian', flag: '🇳🇬' },
  { name: 'Norway', slug: 'norwegian', flag: '🇳🇴' },
  { name: 'Pakistan', slug: 'pakistani', flag: '🇵🇰' },
  { name: 'Peru', slug: 'peruvian', flag: '🇵🇪' },
  { name: 'Philippines', slug: 'filipino', flag: '🇵🇭' },
  { name: 'Poland', slug: 'polish', flag: '🇵🇱' },
  { name: 'Portugal', slug: 'portuguese', flag: '🇵🇹' },
  { name: 'Romania', slug: 'romanian', flag: '🇷🇴' },
  { name: 'Russia', slug: 'russian', flag: '🇷🇺' },
  { name: 'Saudi Arabia', slug: 'saudi', flag: '🇸🇦' },
  { name: 'Singapore', slug: 'singaporean', flag: '🇸🇬' },
  { name: 'South Africa', slug: 'south-african', flag: '🇿🇦' },
  { name: 'South Korea', slug: 'south-korean', flag: '🇰🇷' },
  { name: 'Spain', slug: 'spanish', flag: '🇪🇸' },
  { name: 'Sweden', slug: 'swedish', flag: '🇸🇪' },
  { name: 'Switzerland', slug: 'swiss', flag: '🇨🇭' },
  { name: 'Thailand', slug: 'thai', flag: '🇹🇭' },
  { name: 'Turkey', slug: 'turkish', flag: '🇹🇷' },
  { name: 'Ukraine', slug: 'ukrainian', flag: '🇺🇦' },
  { name: 'United Arab Emirates', slug: 'emirati', flag: '🇦🇪' },
  { name: 'United Kingdom', slug: 'uk', flag: '🇬🇧' },
  { name: 'United States', slug: 'us', flag: '🇺🇸' },
  { name: 'Vietnam', slug: 'vietnamese', flag: '🇻🇳' },
];

export default function EvisaCountriesHubPage() {
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
              { '@type': 'ListItem', position: 2, name: 'eVisa Countries', item: 'https://visainfoguide.com/evisa-countries' },
            ],
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <Breadcrumbs
            items={[
              { name: 'eVisa Countries', url: '/evisa-countries' },
            ]}
          />

          <header className="mt-8 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              eVisa Countries by Passport (2026)
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Find every country that accepts an electronic visa (eVisa) for your passport. Select your passport below to see all destinations where you can apply online before you travel.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Only destinations with <strong>visa_type = evisa</strong> are shown — countries where you apply online and receive your visa electronically before departure.
            </p>
          </header>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Passports</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredPassports.map((p) => (
                <Link
                  key={p.slug}
                  href={`/evisa-for-${p.slug}-passport`}
                  className="group"
                >
                  <Card className="h-full transition-all duration-200 hover:shadow-lg hover:border-blue-200">
                    <CardContent className="p-5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{p.flag}</span>
                        <div>
                          <p className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                            {p.name}
                          </p>
                          <p className="text-sm text-gray-500">evisa countries</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
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
                  href={`/evisa-for-${p.slug}-passport`}
                  className="group"
                >
                  <Card className="transition-all duration-200 hover:shadow-md hover:border-blue-200">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{p.flag}</span>
                        <span className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors text-sm">
                          {p.name}
                        </span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <section className="bg-blue-50 border border-blue-100 rounded-xl p-8 mb-12">
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">What is an eVisa?</h2>
                <p className="text-gray-700 leading-relaxed">
                  An eVisa (electronic visa) is applied for online before travel — no embassy visit required. You submit your application, pay a fee, and receive approval by email. Processing times vary from a few hours to several days. Unlike visa on arrival, an eVisa must be obtained before you board your flight.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
