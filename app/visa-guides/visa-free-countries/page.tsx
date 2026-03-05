'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Globe, ArrowRight, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQBlock from '@/components/visa-guides/FAQBlock';

const popularPassports = [
  {
    name: 'United States',
    slug: 'us-passport',
    visaFreeCount: 186,
    flag: '🇺🇸',
  },
  {
    name: 'United Kingdom',
    slug: 'uk-passport',
    visaFreeCount: 191,
    flag: '🇬🇧',
  },
  {
    name: 'Singapore',
    slug: 'singapore-passport',
    visaFreeCount: 195,
    flag: '🇸🇬',
  },
  {
    name: 'India',
    slug: 'indian-passport',
    visaFreeCount: 62,
    flag: '🇮🇳',
  },
  {
    name: 'Thailand',
    slug: 'thai-passport',
    visaFreeCount: 79,
    flag: '🇹🇭',
  },
  {
    name: 'Germany',
    slug: 'germany-passport',
    visaFreeCount: 194,
    flag: '🇩🇪',
  },
  {
    name: 'Australia',
    slug: 'australia-passport',
    visaFreeCount: 186,
    flag: '🇦🇺',
  },
  {
    name: 'Canada',
    slug: 'canada-passport',
    visaFreeCount: 185,
    flag: '🇨🇦',
  },
  {
    name: 'Japan',
    slug: 'japan-passport',
    visaFreeCount: 194,
    flag: '🇯🇵',
  },
];

const allPassports = [
  { name: 'Argentina', slug: 'argentina-passport', visaFreeCount: 171, flag: '🇦🇷' },
  { name: 'Australia', slug: 'australia-passport', visaFreeCount: 186, flag: '🇦🇺' },
  { name: 'Austria', slug: 'austria-passport', visaFreeCount: 194, flag: '🇦🇹' },
  { name: 'Belgium', slug: 'belgium-passport', visaFreeCount: 194, flag: '🇧🇪' },
  { name: 'Brazil', slug: 'brazil-passport', visaFreeCount: 171, flag: '🇧🇷' },
  { name: 'Canada', slug: 'canada-passport', visaFreeCount: 185, flag: '🇨🇦' },
  { name: 'Chile', slug: 'chile-passport', visaFreeCount: 174, flag: '🇨🇱' },
  { name: 'China', slug: 'china-passport', visaFreeCount: 85, flag: '🇨🇳' },
  { name: 'Colombia', slug: 'colombia-passport', visaFreeCount: 149, flag: '🇨🇴' },
  { name: 'Croatia', slug: 'croatia-passport', visaFreeCount: 186, flag: '🇭🇷' },
  { name: 'Czech Republic', slug: 'czech-passport', visaFreeCount: 192, flag: '🇨🇿' },
  { name: 'Denmark', slug: 'denmark-passport', visaFreeCount: 194, flag: '🇩🇰' },
  { name: 'Egypt', slug: 'egypt-passport', visaFreeCount: 52, flag: '🇪🇬' },
  { name: 'Finland', slug: 'finland-passport', visaFreeCount: 194, flag: '🇫🇮' },
  { name: 'France', slug: 'france-passport', visaFreeCount: 194, flag: '🇫🇷' },
  { name: 'Germany', slug: 'germany-passport', visaFreeCount: 194, flag: '🇩🇪' },
  { name: 'Greece', slug: 'greece-passport', visaFreeCount: 188, flag: '🇬🇷' },
  { name: 'Hungary', slug: 'hungary-passport', visaFreeCount: 188, flag: '🇭🇺' },
  { name: 'India', slug: 'indian-passport', visaFreeCount: 62, flag: '🇮🇳' },
  { name: 'Indonesia', slug: 'indonesia-passport', visaFreeCount: 77, flag: '🇮🇩' },
  { name: 'Ireland', slug: 'ireland-passport', visaFreeCount: 191, flag: '🇮🇪' },
  { name: 'Israel', slug: 'israel-passport', visaFreeCount: 163, flag: '🇮🇱' },
  { name: 'Italy', slug: 'italy-passport', visaFreeCount: 194, flag: '🇮🇹' },
  { name: 'Japan', slug: 'japan-passport', visaFreeCount: 194, flag: '🇯🇵' },
  { name: 'Mexico', slug: 'mexico-passport', visaFreeCount: 159, flag: '🇲🇽' },
  { name: 'Morocco', slug: 'morocco-passport', visaFreeCount: 72, flag: '🇲🇦' },
  { name: 'Netherlands', slug: 'netherlands-passport', visaFreeCount: 194, flag: '🇳🇱' },
  { name: 'New Zealand', slug: 'new-zealand-passport', visaFreeCount: 189, flag: '🇳🇿' },
  { name: 'Nigeria', slug: 'nigeria-passport', visaFreeCount: 46, flag: '🇳🇬' },
  { name: 'Norway', slug: 'norway-passport', visaFreeCount: 194, flag: '🇳🇴' },
  { name: 'Pakistan', slug: 'pakistan-passport', visaFreeCount: 33, flag: '🇵🇰' },
  { name: 'Peru', slug: 'peru-passport', visaFreeCount: 138, flag: '🇵🇪' },
  { name: 'Philippines', slug: 'philippines-passport', visaFreeCount: 67, flag: '🇵🇭' },
  { name: 'Poland', slug: 'poland-passport', visaFreeCount: 192, flag: '🇵🇱' },
  { name: 'Portugal', slug: 'portugal-passport', visaFreeCount: 194, flag: '🇵🇹' },
  { name: 'Romania', slug: 'romania-passport', visaFreeCount: 178, flag: '🇷🇴' },
  { name: 'Russia', slug: 'russia-passport', visaFreeCount: 119, flag: '🇷🇺' },
  { name: 'Saudi Arabia', slug: 'saudi-arabia-passport', visaFreeCount: 84, flag: '🇸🇦' },
  { name: 'Singapore', slug: 'singapore-passport', visaFreeCount: 195, flag: '🇸🇬' },
  { name: 'South Africa', slug: 'south-africa-passport', visaFreeCount: 106, flag: '🇿🇦' },
  { name: 'South Korea', slug: 'south-korea-passport', visaFreeCount: 192, flag: '🇰🇷' },
  { name: 'Spain', slug: 'spain-passport', visaFreeCount: 194, flag: '🇪🇸' },
  { name: 'Sweden', slug: 'sweden-passport', visaFreeCount: 194, flag: '🇸🇪' },
  { name: 'Switzerland', slug: 'switzerland-passport', visaFreeCount: 193, flag: '🇨🇭' },
  { name: 'Thailand', slug: 'thai-passport', visaFreeCount: 79, flag: '🇹🇭' },
  { name: 'Turkey', slug: 'turkey-passport', visaFreeCount: 111, flag: '🇹🇷' },
  { name: 'Ukraine', slug: 'ukraine-passport', visaFreeCount: 148, flag: '🇺🇦' },
  { name: 'United Arab Emirates', slug: 'uae-passport', visaFreeCount: 180, flag: '🇦🇪' },
  { name: 'United Kingdom', slug: 'uk-passport', visaFreeCount: 191, flag: '🇬🇧' },
  { name: 'United States', slug: 'us-passport', visaFreeCount: 186, flag: '🇺🇸' },
  { name: 'Vietnam', slug: 'vietnam-passport', visaFreeCount: 55, flag: '🇻🇳' },
];

const faqs = [
  {
    question: 'What does visa-free access mean?',
    answer: 'Visa-free access means you can enter a country without obtaining a visa beforehand or upon arrival. Immigration officials simply stamp your passport at the border, granting you permission to stay for a specified period. The duration varies by country and can range from 14 days to 180 days.',
  },
  {
    question: 'Is visa on arrival the same as visa-free?',
    answer: 'No, visa on arrival is different from visa-free. With visa-free entry, no visa is required at all. Visa on arrival means you must obtain and pay for a visa when you arrive at the port of entry, which involves additional processing time and fees.',
  },
  {
    question: 'Why do some passports have more visa-free access than others?',
    answer: 'Visa-free access is determined by bilateral agreements between countries, diplomatic relations, security considerations, economic factors, and reciprocity arrangements. Countries with strong economies, stable governments, and low immigration risks typically negotiate more visa-free agreements.',
  },
  {
    question: 'Can visa-free access change over time?',
    answer: 'Yes, visa policies can change frequently based on diplomatic relations, security situations, or reciprocity agreements. Countries may add or remove visa requirements, change permitted stay durations, or modify entry conditions. Always verify current requirements before traveling.',
  },
  {
    question: 'Do I still need to meet entry requirements for visa-free countries?',
    answer: 'Yes, visa-free does not mean entry is guaranteed. You must still meet standard entry requirements including passport validity (usually 6 months), proof of onward travel, sufficient funds, and legitimate travel purpose. Immigration officers can deny entry if requirements are not met.',
  },
  {
    question: 'How is the visa-free count calculated?',
    answer: 'The visa-free count typically includes countries offering visa-free entry, visa on arrival, and electronic travel authorizations (eTA). Some rankings include only true visa-free destinations, while others count any destination that does not require a traditional embassy visa application.',
  },
];

export default function VisaFreeCountriesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPassports = useMemo(() => {
    if (!searchQuery.trim()) return allPassports;

    const query = searchQuery.toLowerCase();
    return allPassports.filter(passport =>
      passport.name.toLowerCase().includes(query) ||
      passport.slug.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://visainfoguide.com/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Visa Guides',
                item: 'https://visainfoguide.com/visa-guides',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Visa-Free Countries',
                item: 'https://visainfoguide.com/visa-guides/visa-free-countries',
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <Breadcrumbs
            items={[
              { name: 'Visa Guides', url: '/visa-guides' },
              { name: 'Visa-Free Countries', url: '/visa-guides/visa-free-countries' },
            ]}
          />

          <header className="mt-8 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Visa-Free Countries by Passport (2026 Global List)
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Visa-free access varies significantly depending on your passport nationality. Some passports grant access to nearly 200 destinations without requiring advance visa applications, while others provide access to fewer than 50 countries. This comprehensive directory helps you discover which countries you can visit visa-free, which offer visa on arrival, and which require electronic travel authorizations based on your passport.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Select your passport below to view a complete list of destinations you can visit without obtaining a traditional embassy visa, along with regional breakdowns and entry requirement details for 2026.
            </p>
          </header>

          <div className="mb-12">
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search your passport..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
          </div>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Passports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularPassports.map((passport) => (
                <Link
                  key={passport.slug}
                  href={`/visa-guides/visa-free-countries/${passport.slug}-2026`}
                  className="group"
                >
                  <Card className="h-full transition-all duration-200 hover:shadow-lg hover:border-teal-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-4xl">{passport.flag}</div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                        {passport.name}
                      </h3>
                      <p className="text-gray-600">
                        <span className="font-semibold text-teal-600">{passport.visaFreeCount}</span> destinations with visa-free or simplified entry
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {searchQuery && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Search Results ({filteredPassports.length})
              </h2>
              {filteredPassports.length === 0 ? (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                  <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No passports found matching &quot;{searchQuery}&quot;</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredPassports.map((passport) => (
                    <Link
                      key={passport.slug}
                      href={`/visa-guides/visa-free-countries/${passport.slug}-2026`}
                      className="group"
                    >
                      <Card className="transition-all duration-200 hover:shadow-md hover:border-teal-200">
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{passport.flag}</span>
                            <div>
                              <h3 className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors">
                                {passport.name}
                              </h3>
                              <p className="text-sm text-gray-600">{passport.visaFreeCount} destinations</p>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          )}

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              How Visa-Free Access Is Determined
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Visa-free access between countries is established through formal bilateral or multilateral agreements negotiated between governments. These agreements specify which nationalities can enter without advance visa applications, the permitted duration of stay, and any conditions or restrictions that apply. Regional organizations like the European Union and ASEAN also create visa-free zones among member states, allowing citizens to travel freely across borders.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Several factors influence whether countries grant visa-free access to specific nationalities. Economic considerations play a major role, as countries with strong economies and high GDP per capita are viewed as lower immigration risks. Diplomatic relations, security cooperation, and political stability also heavily influence visa policy decisions. The principle of reciprocity is particularly important—countries often mirror the visa policies that other nations apply to their citizens.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                The strength of a passport is measured by the number of destinations its holders can access without obtaining a traditional embassy visa. This includes truly <Link href="/visa-guides/travel-visa-rules#visa-free" className="text-teal-600 hover:text-teal-700 font-medium underline">visa-free</Link> entry, visa on arrival options, and electronic travel authorizations. Rankings like the Henley Passport Index and Passport Index track these metrics annually, with countries like Singapore, Japan, and several European nations consistently ranking among the most powerful passports globally.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Visa policies can change rapidly based on geopolitical events, security threats, immigration patterns, or shifts in diplomatic relations. Countries regularly review and update their visa policies, adding or removing visa requirements for specific nationalities. Our <Link href="/methodology" className="text-teal-600 hover:text-teal-700 font-medium underline">methodology</Link> explains how we verify and maintain accurate visa information across all passport nationalities and destinations.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse All Passports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allPassports.map((passport) => (
                <Link
                  key={passport.slug}
                  href={`/visa-guides/visa-free-countries/${passport.slug}-2026`}
                  className="group"
                >
                  <Card className="transition-all duration-200 hover:shadow-md hover:border-teal-200">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{passport.flag}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors">
                            {passport.name}
                          </h3>
                          <p className="text-sm text-gray-600">{passport.visaFreeCount} destinations</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <FAQBlock faqs={faqs} />

          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Resources</h2>
            <div className="grid gap-4">
              <Link href="/visa-guides/do-i-need-a-visa" className="group">
                <Card className="transition-all duration-200 hover:shadow-lg hover:border-teal-200">
                  <CardContent className="flex items-center justify-between p-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                        Do I Need a Visa?
                      </h3>
                      <p className="text-sm text-gray-600">
                        Check specific visa requirements for your passport and destination
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </CardContent>
                </Card>
              </Link>

              <Link href="/visa-guides/travel-visa-rules" className="group">
                <Card className="transition-all duration-200 hover:shadow-lg hover:border-teal-200">
                  <CardContent className="flex items-center justify-between p-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                        Travel Visa Rules Explained
                      </h3>
                      <p className="text-sm text-gray-600">
                        Understand visa-free, eVisa, eTA, and visa on arrival classifications
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </CardContent>
                </Card>
              </Link>

              <Link href="/" className="group">
                <Card className="transition-all duration-200 hover:shadow-lg hover:border-teal-200">
                  <CardContent className="flex items-center justify-between p-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                        Trip Visa Finder
                      </h3>
                      <p className="text-sm text-gray-600">
                        Plan multi-country trips and check visa requirements for your itinerary
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </CardContent>
                </Card>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
