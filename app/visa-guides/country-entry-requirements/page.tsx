'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, MapPin, ArrowRight, Shield, Wallet, Plane, FileCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQBlock from '@/components/visa-guides/FAQBlock';

const topDestinations = [
  {
    name: 'Thailand',
    slug: 'thailand',
    region: 'Southeast Asia',
    flag: '🇹🇭',
  },
  {
    name: 'Japan',
    slug: 'japan',
    region: 'East Asia',
    flag: '🇯🇵',
  },
  {
    name: 'United States',
    slug: 'united-states',
    region: 'North America',
    flag: '🇺🇸',
  },
  {
    name: 'France',
    slug: 'france',
    region: 'Europe',
    flag: '🇫🇷',
  },
  {
    name: 'Australia',
    slug: 'australia',
    region: 'Oceania',
    flag: '🇦🇺',
  },
  {
    name: 'Singapore',
    slug: 'singapore',
    region: 'Southeast Asia',
    flag: '🇸🇬',
  },
  {
    name: 'United Arab Emirates',
    slug: 'united-arab-emirates',
    region: 'Middle East',
    flag: '🇦🇪',
  },
  {
    name: 'India',
    slug: 'india',
    region: 'South Asia',
    flag: '🇮🇳',
  },
  {
    name: 'China',
    slug: 'china',
    region: 'East Asia',
    flag: '🇨🇳',
  },
  {
    name: 'Vietnam',
    slug: 'vietnam',
    region: 'Southeast Asia',
    flag: '🇻🇳',
  },
  {
    name: 'Mexico',
    slug: 'mexico',
    region: 'North America',
    flag: '🇲🇽',
  },
  {
    name: 'South Korea',
    slug: 'south-korea',
    region: 'East Asia',
    flag: '🇰🇷',
  },
];

const allDestinations = [
  { name: 'Argentina', slug: 'argentina', region: 'South America', flag: '🇦🇷' },
  { name: 'Australia', slug: 'australia', region: 'Oceania', flag: '🇦🇺' },
  { name: 'Austria', slug: 'austria', region: 'Europe', flag: '🇦🇹' },
  { name: 'Belgium', slug: 'belgium', region: 'Europe', flag: '🇧🇪' },
  { name: 'Brazil', slug: 'brazil', region: 'South America', flag: '🇧🇷' },
  { name: 'Canada', slug: 'canada', region: 'North America', flag: '🇨🇦' },
  { name: 'Chile', slug: 'chile', region: 'South America', flag: '🇨🇱' },
  { name: 'China', slug: 'china', region: 'East Asia', flag: '🇨🇳' },
  { name: 'Colombia', slug: 'colombia', region: 'South America', flag: '🇨🇴' },
  { name: 'Croatia', slug: 'croatia', region: 'Europe', flag: '🇭🇷' },
  { name: 'Czech Republic', slug: 'czech-republic', region: 'Europe', flag: '🇨🇿' },
  { name: 'Denmark', slug: 'denmark', region: 'Europe', flag: '🇩🇰' },
  { name: 'Egypt', slug: 'egypt', region: 'North Africa', flag: '🇪🇬' },
  { name: 'Finland', slug: 'finland', region: 'Europe', flag: '🇫🇮' },
  { name: 'France', slug: 'france', region: 'Europe', flag: '🇫🇷' },
  { name: 'Germany', slug: 'germany', region: 'Europe', flag: '🇩🇪' },
  { name: 'Greece', slug: 'greece', region: 'Europe', flag: '🇬🇷' },
  { name: 'Hungary', slug: 'hungary', region: 'Europe', flag: '🇭🇺' },
  { name: 'India', slug: 'india', region: 'South Asia', flag: '🇮🇳' },
  { name: 'Indonesia', slug: 'indonesia', region: 'Southeast Asia', flag: '🇮🇩' },
  { name: 'Ireland', slug: 'ireland', region: 'Europe', flag: '🇮🇪' },
  { name: 'Israel', slug: 'israel', region: 'Middle East', flag: '🇮🇱' },
  { name: 'Italy', slug: 'italy', region: 'Europe', flag: '🇮🇹' },
  { name: 'Japan', slug: 'japan', region: 'East Asia', flag: '🇯🇵' },
  { name: 'Mexico', slug: 'mexico', region: 'North America', flag: '🇲🇽' },
  { name: 'Morocco', slug: 'morocco', region: 'North Africa', flag: '🇲🇦' },
  { name: 'Netherlands', slug: 'netherlands', region: 'Europe', flag: '🇳🇱' },
  { name: 'New Zealand', slug: 'new-zealand', region: 'Oceania', flag: '🇳🇿' },
  { name: 'Nigeria', slug: 'nigeria', region: 'West Africa', flag: '🇳🇬' },
  { name: 'Norway', slug: 'norway', region: 'Europe', flag: '🇳🇴' },
  { name: 'Pakistan', slug: 'pakistan', region: 'South Asia', flag: '🇵🇰' },
  { name: 'Peru', slug: 'peru', region: 'South America', flag: '🇵🇪' },
  { name: 'Philippines', slug: 'philippines', region: 'Southeast Asia', flag: '🇵🇭' },
  { name: 'Poland', slug: 'poland', region: 'Europe', flag: '🇵🇱' },
  { name: 'Portugal', slug: 'portugal', region: 'Europe', flag: '🇵🇹' },
  { name: 'Romania', slug: 'romania', region: 'Europe', flag: '🇷🇴' },
  { name: 'Russia', slug: 'russia', region: 'Europe / Asia', flag: '🇷🇺' },
  { name: 'Saudi Arabia', slug: 'saudi-arabia', region: 'Middle East', flag: '🇸🇦' },
  { name: 'Singapore', slug: 'singapore', region: 'Southeast Asia', flag: '🇸🇬' },
  { name: 'South Africa', slug: 'south-africa', region: 'Southern Africa', flag: '🇿🇦' },
  { name: 'South Korea', slug: 'south-korea', region: 'East Asia', flag: '🇰🇷' },
  { name: 'Spain', slug: 'spain', region: 'Europe', flag: '🇪🇸' },
  { name: 'Sweden', slug: 'sweden', region: 'Europe', flag: '🇸🇪' },
  { name: 'Switzerland', slug: 'switzerland', region: 'Europe', flag: '🇨🇭' },
  { name: 'Thailand', slug: 'thailand', region: 'Southeast Asia', flag: '🇹🇭' },
  { name: 'Turkey', slug: 'turkey', region: 'Middle East / Europe', flag: '🇹🇷' },
  { name: 'Ukraine', slug: 'ukraine', region: 'Europe', flag: '🇺🇦' },
  { name: 'United Arab Emirates', slug: 'united-arab-emirates', region: 'Middle East', flag: '🇦🇪' },
  { name: 'United Kingdom', slug: 'united-kingdom', region: 'Europe', flag: '🇬🇧' },
  { name: 'United States', slug: 'united-states', region: 'North America', flag: '🇺🇸' },
  { name: 'Vietnam', slug: 'vietnam', region: 'Southeast Asia', flag: '🇻🇳' },
];

const faqs = [
  {
    question: 'What are entry requirements?',
    answer: 'Entry requirements are the conditions travelers must meet to enter a country legally. They typically include visa requirements, passport validity rules, proof of sufficient funds, health insurance, onward travel tickets, and specific documentation based on nationality and purpose of visit.',
  },
  {
    question: 'Do entry requirements vary by nationality?',
    answer: 'Yes, entry requirements vary significantly by nationality due to bilateral agreements, reciprocity arrangements, and diplomatic relations between countries. Citizens of some countries can enter visa-free, while others must obtain visas in advance. Always check requirements specific to your passport.',
  },
  {
    question: 'What is the 6-month passport validity rule?',
    answer: 'Many countries require your passport to be valid for at least 6 months beyond your intended departure date. This rule ensures travelers have adequate validity in case of unexpected delays or emergencies. Some countries require only 3 months validity, while others accept passports valid through your departure date.',
  },
  {
    question: 'What is proof of funds and why is it required?',
    answer: 'Proof of funds demonstrates you have sufficient financial resources to support yourself during your stay without working illegally or becoming a burden on the host country. Acceptable proof includes bank statements, credit cards, cash, travelers checks, or sponsorship letters.',
  },
  {
    question: 'Do I need a return ticket to enter a country?',
    answer: 'Many countries require proof of onward travel, either a return ticket to your home country or a ticket to your next destination. This requirement ensures you intend to leave before your authorized stay expires. Immigration officers may deny entry without proof of onward travel.',
  },
  {
    question: 'Can entry requirements change without notice?',
    answer: 'Yes, countries can modify entry requirements at any time based on diplomatic relations, security concerns, or policy changes. Requirements may change suddenly during health emergencies, political events, or security situations. Always verify current requirements with official sources before travel.',
  },
];

export default function CountryEntryRequirementsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDestinations = useMemo(() => {
    if (!searchQuery.trim()) return allDestinations;

    const query = searchQuery.toLowerCase();
    return allDestinations.filter(destination =>
      destination.name.toLowerCase().includes(query) ||
      destination.slug.toLowerCase().includes(query) ||
      destination.region.toLowerCase().includes(query)
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
                name: 'Country Entry Requirements',
                item: 'https://visainfoguide.com/visa-guides/country-entry-requirements',
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
              { name: 'Country Entry Requirements', url: '/visa-guides/country-entry-requirements' },
            ]}
          />

          <header className="mt-8 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Country Entry Requirements & Visa Policies (2026)
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Entry requirements vary significantly depending on your nationality, intended length of stay, and purpose of travel. Each country maintains its own visa policies, passport validity rules, and documentation requirements based on bilateral agreements and reciprocity arrangements. What may be a simple visa-free entry for one nationality could require extensive advance visa applications for another.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              This comprehensive directory provides destination-specific entry requirement guides covering visa policies, required documents, stay duration limits, and entry conditions for travelers from all nationalities. Select your destination country below to view complete entry requirements and visa information for 2026.
            </p>
          </header>

          <div className="mb-12">
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search a destination country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
          </div>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Most Searched Destinations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topDestinations.map((destination) => (
                <Link
                  key={destination.slug}
                  href={`/visa-guides/country-entry-requirements/${destination.slug}-2026`}
                  className="group"
                >
                  <Card className="h-full transition-all duration-200 hover:shadow-lg hover:border-teal-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-4xl">{destination.flag}</div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                        {destination.name}
                      </h3>
                      <p className="text-gray-600">{destination.region}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {searchQuery && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Search Results ({filteredDestinations.length})
              </h2>
              {filteredDestinations.length === 0 ? (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No destinations found matching &quot;{searchQuery}&quot;</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredDestinations.map((destination) => (
                    <Link
                      key={destination.slug}
                      href={`/visa-guides/country-entry-requirements/${destination.slug}-2026`}
                      className="group"
                    >
                      <Card className="transition-all duration-200 hover:shadow-md hover:border-teal-200">
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{destination.flag}</span>
                            <div>
                              <h3 className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors">
                                {destination.name}
                              </h3>
                              <p className="text-sm text-gray-600">{destination.region}</p>
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
              What Entry Requirements Typically Include
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                While specific entry requirements vary by destination and nationality, most countries evaluate travelers based on several standard criteria. Understanding these common requirements helps you prepare proper documentation and avoid entry complications at border control.
              </p>

              <div className="grid gap-6 mb-6">
                <Card className="border-l-4 border-teal-500">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Shield className="w-8 h-8 text-teal-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Passport Validity</h3>
                        <p className="text-gray-700 leading-relaxed">
                          Most countries require your passport to remain valid for 6 months beyond your intended departure date. Some countries accept 3 months validity, while others require validity only through your stay. Check <Link href="/visa-guides/travel-visa-rules#passport-validity" className="text-teal-600 hover:text-teal-700 font-medium underline">passport validity rules</Link> for specific requirements by destination.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <FileCheck className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Visa Requirements</h3>
                        <p className="text-gray-700 leading-relaxed">
                          Visa requirements depend entirely on your passport nationality and the destination country. Some travelers enjoy visa-free entry, others must obtain visas on arrival or apply for eVisas online, while many nationalities require traditional embassy visa applications. Each destination guide details visa policies for all nationalities.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-purple-500">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Wallet className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Proof of Funds</h3>
                        <p className="text-gray-700 leading-relaxed">
                          Countries require evidence that you can financially support yourself during your stay without working illegally. Acceptable <Link href="/visa-guides/travel-visa-rules#proof-of-funds" className="text-teal-600 hover:text-teal-700 font-medium underline">proof of funds</Link> includes bank statements, credit cards, cash, travelers checks, or sponsorship letters. Required amounts vary by destination and length of stay.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-orange-500">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Plane className="w-8 h-8 text-orange-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Onward Travel</h3>
                        <p className="text-gray-700 leading-relaxed">
                          Many countries require proof of <Link href="/visa-guides/travel-visa-rules#onward-travel" className="text-teal-600 hover:text-teal-700 font-medium underline">onward travel</Link> before granting entry, either a return ticket home or a ticket to your next destination. This demonstrates you intend to leave before your authorized stay expires. Immigration may deny entry without proof of departure plans.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <p className="text-gray-700 leading-relaxed">
                Additional requirements may include health insurance, vaccination certificates, accommodation bookings, invitation letters, criminal record checks, or specific permits depending on your purpose of visit. Each destination has unique policies that can change without notice based on diplomatic relations, security situations, or public health considerations.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse All Destinations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allDestinations.map((destination) => (
                <Link
                  key={destination.slug}
                  href={`/visa-guides/country-entry-requirements/${destination.slug}-2026`}
                  className="group"
                >
                  <Card className="transition-all duration-200 hover:shadow-md hover:border-teal-200">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{destination.flag}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors">
                            {destination.name}
                          </h3>
                          <p className="text-sm text-gray-600">{destination.region}</p>
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

              <Link href="/visa-guides/visa-free-countries" className="group">
                <Card className="transition-all duration-200 hover:shadow-lg hover:border-teal-200">
                  <CardContent className="flex items-center justify-between p-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                        Visa-Free Countries by Passport
                      </h3>
                      <p className="text-sm text-gray-600">
                        Explore visa-free destinations available with your passport
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
                        Understand visa types, passport validity, and entry requirements
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
