import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CircleCheck as CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Breadcrumbs from '@/components/Breadcrumbs';
import { canonicalUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Countries with Digital Nomad Visa (2026 Full List) | VisaInfoGuide',
  description: 'Complete list of countries that offer a digital nomad visa or remote work visa in 2026. Sorted by region with income requirements and stay durations.',
  alternates: { canonical: canonicalUrl('/countries-with-digital-nomad-visa') },
  openGraph: {
    title: 'Countries with Digital Nomad Visa (2026 Full List)',
    description: 'Complete list of countries that offer digital nomad or remote work visas in 2026.',
    type: 'article',
    url: canonicalUrl('/countries-with-digital-nomad-visa'),
    siteName: 'VisaInfoGuide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Countries with Digital Nomad Visa (2026 Full List)',
    description: 'Complete list of countries that offer digital nomad or remote work visas in 2026.',
  },
  robots: { index: true, follow: true },
};

const byRegion: Record<string, Array<{
  name: string;
  slug: string;
  flag: string;
  visaName: string;
  minIncome: string;
  duration: string;
  taxBenefit: boolean;
  familyAllowed: boolean;
}>> = {
  Europe: [
    { name: 'Portugal', slug: 'portugal', flag: '🇵🇹', visaName: 'D8 Digital Nomad Visa', minIncome: '€3,040/mo', duration: '1 year', taxBenefit: true, familyAllowed: true },
    { name: 'Spain', slug: 'spain', flag: '🇪🇸', visaName: 'Digital Nomad Visa', minIncome: '€2,160/mo', duration: '1–3 years', taxBenefit: true, familyAllowed: true },
    { name: 'Germany', slug: 'germany', flag: '🇩🇪', visaName: 'Freelance Visa', minIncome: 'Sufficient funds', duration: 'Up to 3 years', taxBenefit: false, familyAllowed: true },
    { name: 'Croatia', slug: 'croatia', flag: '🇭🇷', visaName: 'Digital Nomad Permit', minIncome: '€2,538/mo', duration: '1 year', taxBenefit: true, familyAllowed: false },
    { name: 'Greece', slug: 'greece', flag: '🇬🇷', visaName: 'Digital Nomad Visa', minIncome: '€3,500/mo', duration: '1 year', taxBenefit: true, familyAllowed: true },
    { name: 'Norway', slug: 'norway', flag: '🇳🇴', visaName: 'Svalbard Remote Work', minIncome: 'Sufficient funds', duration: '1 year', taxBenefit: false, familyAllowed: false },
    { name: 'Romania', slug: 'romania', flag: '🇷🇴', visaName: 'Digital Nomad Visa', minIncome: '€3,300/mo', duration: '1 year', taxBenefit: false, familyAllowed: true },
  ],
  Americas: [
    { name: 'Brazil', slug: 'brazil', flag: '🇧🇷', visaName: 'Digital Nomad Visa', minIncome: '$1,500/mo', duration: '1 year', taxBenefit: false, familyAllowed: true },
    { name: 'Colombia', slug: 'colombia', flag: '🇨🇴', visaName: 'M Visa (Digital Nomad)', minIncome: '3× min wage', duration: '2 years', taxBenefit: false, familyAllowed: true },
    { name: 'Argentina', slug: 'argentina', flag: '🇦🇷', visaName: 'Digital Nomad Visa', minIncome: 'No minimum', duration: '6 months', taxBenefit: false, familyAllowed: false },
    { name: 'Peru', slug: 'peru', flag: '🇵🇪', visaName: 'Digital Nomad Visa', minIncome: '$1,000/mo', duration: '1 year', taxBenefit: false, familyAllowed: false },
    { name: 'Chile', slug: 'chile', flag: '🇨🇱', visaName: 'Tech / Nomad Visa', minIncome: '$2,000/mo', duration: '1 year', taxBenefit: false, familyAllowed: true },
    { name: 'Mexico', slug: 'mexico', flag: '🇲🇽', visaName: 'Temporary Resident Visa', minIncome: '$2,595/mo', duration: '1–4 years', taxBenefit: false, familyAllowed: true },
  ],
  Asia: [
    { name: 'Indonesia', slug: 'indonesia', flag: '🇮🇩', visaName: 'E33G Digital Nomad Visa', minIncome: '$2,000/mo', duration: '6 mo–1 year', taxBenefit: true, familyAllowed: false },
    { name: 'Thailand', slug: 'thailand', flag: '🇹🇭', visaName: 'LTR Visa', minIncome: '$80k/year', duration: '10 years', taxBenefit: true, familyAllowed: true },
    { name: 'Japan', slug: 'japan', flag: '🇯🇵', visaName: 'Specified Skilled / Startup Visa', minIncome: 'Varies', duration: '6 months–5 years', taxBenefit: false, familyAllowed: true },
    { name: 'South Korea', slug: 'south-korea', flag: '🇰🇷', visaName: 'Digital Nomad Visa (F-1-D)', minIncome: '$84,000/year', duration: '1 year', taxBenefit: false, familyAllowed: true },
    { name: 'Vietnam', slug: 'vietnam', flag: '🇻🇳', visaName: 'E-Visa (90 days)', minIncome: 'No minimum', duration: '90 days', taxBenefit: false, familyAllowed: false },
  ],
  'Middle East': [
    { name: 'United Arab Emirates', slug: 'united-arab-emirates', flag: '🇦🇪', visaName: 'Remote Work Visa', minIncome: '$3,500/mo', duration: '1 year', taxBenefit: true, familyAllowed: true },
    { name: 'Saudi Arabia', slug: 'saudi-arabia', flag: '🇸🇦', visaName: 'Premium Residency / Work Visa', minIncome: 'Varies', duration: '1–5 years', taxBenefit: true, familyAllowed: true },
    { name: 'Qatar', slug: 'qatar', flag: '🇶🇦', visaName: 'Freelance Permit', minIncome: 'Varies', duration: '1 year', taxBenefit: true, familyAllowed: false },
  ],
  Africa: [
    { name: 'South Africa', slug: 'south-africa', flag: '🇿🇦', visaName: 'Remote Work Visa', minIncome: '$3,000/mo', duration: '3 years', taxBenefit: false, familyAllowed: true },
    { name: 'Egypt', slug: 'egypt', flag: '🇪🇬', visaName: 'Tourist / Multiple-Entry Visa', minIncome: 'No minimum', duration: '1 year (multiple)', taxBenefit: false, familyAllowed: false },
    { name: 'Morocco', slug: 'morocco', flag: '🇲🇦', visaName: 'No formal nomad visa — 90-day stay', minIncome: 'No minimum', duration: '90 days', taxBenefit: false, familyAllowed: false },
  ],
};

export default function CountriesWithDigitalNomadVisaPage() {
  const totalCount = Object.values(byRegion).reduce((sum, list) => sum + list.length, 0);

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
              { '@type': 'ListItem', position: 2, name: 'Digital Nomad Visas', item: 'https://visainfoguide.com/digital-nomad-visas' },
              { '@type': 'ListItem', position: 3, name: 'Countries with Digital Nomad Visa', item: 'https://visainfoguide.com/countries-with-digital-nomad-visa' },
            ],
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <Breadcrumbs
            items={[
              { name: 'Digital Nomad Visas', url: '/digital-nomad-visas' },
              { name: 'Countries List', url: '/countries-with-digital-nomad-visa' },
            ]}
          />

          <header className="mt-8 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Countries with Digital Nomad Visa (2026)
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>{totalCount} countries</strong> currently offer a formal digital nomad or remote work visa program in 2026. The list below is sorted by region, with income requirements and stay duration shown for each.
            </p>
            <div className="flex flex-wrap gap-2 text-sm">
              {Object.keys(byRegion).map((region) => (
                <a
                  key={region}
                  href={`#${region.toLowerCase().replace(' ', '-')}`}
                  className="bg-white border border-gray-200 px-3 py-1.5 rounded-full hover:border-teal-300 hover:bg-teal-50 transition-colors font-medium text-gray-700"
                >
                  {region} ({byRegion[region].length})
                </a>
              ))}
            </div>
          </header>

          {Object.entries(byRegion).map(([region, countries]) => (
            <section
              key={region}
              id={region.toLowerCase().replace(' ', '-')}
              className="mb-14"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {region}
                <span className="ml-2 text-base font-normal text-gray-500">({countries.length} countries)</span>
              </h2>
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Country</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Visa Name</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Min. Income</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Duration</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700 hidden sm:table-cell">Tax Benefit</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700 hidden sm:table-cell">Family</th>
                        <th className="py-3 px-4"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {countries.map((c) => (
                        <tr key={c.slug} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{c.flag}</span>
                              <span className="font-medium text-gray-900">{c.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{c.visaName}</td>
                          <td className="py-3 px-4 font-medium text-gray-800">{c.minIncome}</td>
                          <td className="py-3 px-4 text-gray-700">{c.duration}</td>
                          <td className="py-3 px-4 hidden sm:table-cell">
                            {c.taxBenefit
                              ? <CheckCircle className="w-4 h-4 text-teal-500" />
                              : <span className="text-gray-300">—</span>}
                          </td>
                          <td className="py-3 px-4 hidden sm:table-cell">
                            {c.familyAllowed
                              ? <CheckCircle className="w-4 h-4 text-teal-500" />
                              : <span className="text-gray-300">—</span>}
                          </td>
                          <td className="py-3 px-4">
                            <Link href={`/destination/${c.slug}`} className="text-teal-600 hover:text-teal-700 hover:underline text-xs font-medium whitespace-nowrap">
                              Entry requirements →
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          ))}

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-12">
            <p className="text-sm text-amber-800">
              <strong>Note:</strong> Digital nomad visa requirements change frequently. Income thresholds, processing times, and program availability can be updated by governments without notice. Always verify current requirements on official government immigration websites before applying.
            </p>
          </div>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related</h2>
            <div className="grid gap-3">
              {[
                { href: '/digital-nomad-visas', label: 'Digital Nomad Visa Guide', desc: 'In-depth guide with requirements and application tips' },
                { href: '/visa-free-countries', label: 'Visa-Free Countries by Passport', desc: 'Where you can travel with no visa at all' },
                { href: '/most-powerful-passports', label: 'Most Powerful Passports 2026', desc: 'Full passport strength ranking' },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="group">
                  <Card className="transition-all duration-200 hover:shadow-md hover:border-teal-200">
                    <CardContent className="flex items-center justify-between p-5">
                      <div>
                        <p className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors">{link.label}</p>
                        <p className="text-sm text-gray-500">{link.desc}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
