import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPassportData, getAllPassportSlugs } from '@/lib/passport-visa-data';
import { canonicalUrl, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';
import { articleJsonLd, getDestinationLinks } from '@/lib/seo-links';
import { Globe, CheckCircle, Clock, FileText, ArrowRight, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQBlock from '@/components/visa-guides/FAQBlock';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllPassportSlugs();
  return slugs.map((slug) => ({
    slug: `${slug}-2026`,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const passportSlug = params.slug.replace('-2026', '');
  const data = getPassportData(passportSlug);

  if (!data) {
    return {
      title: 'Passport Not Found',
    };
  }

  const title = `Visa-Free Countries for ${data.name} Passport in 2026 (${data.totalVisaFreeAccess} Destinations)`;
  const description = `Complete list of ${data.totalVisaFreeAccess} visa-free, visa on arrival, and eTA destinations for ${data.nationality} passport holders in 2026. Regional breakdown and entry requirements included.`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl(`/visa-guides/visa-free-countries/${params.slug}`),
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: canonicalUrl(`/visa-guides/visa-free-countries/${params.slug}`),
      images: [{
        url: canonicalUrl('/og/legal-og'),
        width: 1200,
        height: 630,
        alt: `${data.name} Passport Visa-Free Countries`,
      }],
      siteName: 'VisaInfoGuide',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [canonicalUrl('/og/legal-og')],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function PassportVisaFreePage({ params }: PageProps) {
  const passportSlug = params.slug.replace('-2026', '');
  const data = getPassportData(passportSlug);

  if (!data) {
    notFound();
  }

  const faqs = [
    {
      question: `How many countries can ${data.nationality} passport holders visit without a visa?`,
      answer: `${data.nationality} passport holders can access ${data.totalVisaFreeAccess} destinations without requiring a traditional embassy visa. This includes ${data.visaFreeCountries.length} truly visa-free countries, ${data.visaOnArrivalCountries.length} visa on arrival destinations, and ${data.etaCountries.length} countries requiring electronic travel authorizations.`,
    },
    {
      question: `Do ${data.nationality} passport holders need a visa for Europe?`,
      answer: data.regionalBreakdown.europe > 40
        ? `${data.nationality} passport holders can visit most European countries visa-free for tourism stays up to 90 days within 180 days under the Schengen Agreement. This includes ${data.regionalBreakdown.europe} European destinations accessible without advance visa applications.`
        : `${data.nationality} passport holders have limited visa-free access to Europe. Only ${data.regionalBreakdown.europe} European countries allow visa-free entry. Most European Schengen countries require ${data.nationality} citizens to obtain Schengen visas in advance from embassies or consulates.`,
    },
    {
      question: `What is the difference between visa-free and visa on arrival?`,
      answer: 'Visa-free means you can enter without any visa at all—immigration simply stamps your passport. Visa on arrival means you must obtain and pay for a visa when you arrive at the airport or border, which involves additional processing time and fees before entry is granted.',
    },
    {
      question: `Can ${data.nationality} passport holders travel to the United States without a visa?`,
      answer: data.visaFreeCountries.includes('United States')
        ? `Yes, ${data.nationality} passport holders can travel to the United States under the Visa Waiver Program for stays up to 90 days. However, travelers must obtain ESTA (Electronic System for Travel Authorization) approval online before departure.`
        : data.etaCountries.includes('United States')
        ? `${data.nationality} passport holders must obtain ESTA (Electronic System for Travel Authorization) before traveling to the United States. ESTA is applied for online and costs $21. Once approved, it allows stays up to 90 days for tourism or business.`
        : `${data.nationality} passport holders require a traditional B1/B2 tourist visa to visit the United States. The visa must be obtained from a US embassy or consulate before travel and requires an in-person interview appointment.`,
    },
    {
      question: `How often do visa-free countries change?`,
      answer: 'Visa policies can change frequently based on diplomatic relations, security considerations, or reciprocity agreements. Countries regularly review and update their visa requirements. Always verify current entry requirements with official government sources before booking travel, even for traditionally visa-free destinations.',
    },
    {
      question: `What documents do ${data.nationality} passport holders need for visa-free travel?`,
      answer: 'Even for visa-free destinations, you must meet standard entry requirements including a passport valid for at least 6 months beyond your departure date, proof of onward or return travel, sufficient funds for your stay, and accommodation details. Immigration officers can deny entry if these requirements are not met.',
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Visa Guides', url: '/visa-guides' },
            { name: 'Visa-Free Countries', url: '/visa-guides/visa-free-countries' },
            { name: `${data.name} Passport`, url: `/visa-guides/visa-free-countries/${params.slug}` },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd(faqs)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd({
            headline: `Visa-Free Countries for ${data.name} Passport in 2026`,
            description: `Complete list of visa-free, visa on arrival, and eTA destinations for ${data.nationality} passport holders.`,
            datePublished: data.lastUpdated,
            dateModified: data.lastUpdated,
            url: `https://visainfoguide.com/visa-guides/visa-free-countries/${params.slug}`,
          })),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <Breadcrumbs
            items={[
              { name: 'Visa Guides', url: '/visa-guides' },
              { name: 'Visa-Free Countries', url: '/visa-guides/visa-free-countries' },
              { name: `${data.name} Passport`, url: `/visa-guides/visa-free-countries/${params.slug}` },
            ]}
          />

          <header className="mt-8 mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">{data.flag}</span>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Visa-Free Countries for {data.name} Passport in 2026
                </h1>
              </div>
            </div>

            <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg mb-8">
              <p className="text-lg text-gray-800 leading-relaxed">
                <strong>{data.nationality} passport holders can access {data.totalVisaFreeAccess} destinations worldwide without obtaining a traditional embassy visa.</strong> This includes {data.visaFreeCountries.length} countries with complete visa-free entry, {data.visaOnArrivalCountries.length} destinations offering visa on arrival, and {data.etaCountries.length} countries requiring electronic travel authorizations. {data.name} passport provides {data.regionalBreakdown.europe > 40 ? 'extensive' : 'moderate'} global mobility, with strongest access to {data.regionalBreakdown.europe > data.regionalBreakdown.asia ? 'European' : 'Asian'} destinations and growing opportunities in {data.regionalBreakdown.americas > 20 ? 'the Americas' : 'other regions'}.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{data.visaFreeCountries.length}</div>
                  <div className="text-sm text-gray-600">Visa-Free</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{data.visaOnArrivalCountries.length}</div>
                  <div className="text-sm text-gray-600">Visa on Arrival</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <FileText className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{data.etaCountries.length}</div>
                  <div className="text-sm text-gray-600">eTA Required</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Globe className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{data.totalVisaFreeAccess}</div>
                  <div className="text-sm text-gray-600">Total Access</div>
                </CardContent>
              </Card>
            </div>
          </header>

          <article className="prose prose-lg max-w-none">
            <section id="visa-free-list" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Visa-Free Countries</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {data.nationality} passport holders can enter the following {data.visaFreeCountries.length} countries without obtaining any visa. Entry is granted through simple passport inspection at border control, with permitted stay durations ranging from 14 to 180 days depending on the destination.
              </p>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {data.visaFreeCountries.map((country) => (
                    <li key={country} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
                      <span>{country}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section id="visa-on-arrival-list" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Visa on Arrival Countries</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {data.nationality} passport holders can obtain a <Link href="/visa-guides/travel-visa-rules#visa-on-arrival" className="text-teal-600 hover:text-teal-700 font-medium underline">visa on arrival</Link> at the following {data.visaOnArrivalCountries.length} destinations. This requires payment of a visa fee and submission of documents at the port of entry before immigration clearance.
              </p>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {data.visaOnArrivalCountries.map((country) => (
                    <li key={country} className="flex items-center gap-2 text-gray-700">
                      <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span>{country}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section id="eta-list" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">eTA Required Countries</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                The following {data.etaCountries.length} destinations require {data.nationality} passport holders to obtain an <Link href="/visa-guides/travel-visa-rules#eta" className="text-teal-600 hover:text-teal-700 font-medium underline">electronic travel authorization (eTA)</Link> before travel. ETAs are applied for online and typically approved within 72 hours.
              </p>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {data.etaCountries.map((country) => (
                    <li key={country} className="flex items-center gap-2 text-gray-700">
                      <FileText className="w-4 h-4 text-purple-600 flex-shrink-0" />
                      <span>{country}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section id="visa-required" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Countries Requiring a Visa in Advance</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {data.visaRequiredSummary}
              </p>
              <p className="text-gray-700 leading-relaxed">
                For detailed visa requirements for specific destinations, use our <Link href="/" className="text-teal-600 hover:text-teal-700 font-medium underline">Trip Visa Finder</Link> to check entry requirements for your complete travel itinerary.
              </p>
            </section>

            <section id="regional-breakdown" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Regional Breakdown</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {data.nationality} passport holders have varying levels of access across different world regions. Here's how the {data.totalVisaFreeAccess} visa-free destinations break down geographically:
              </p>

              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-teal-600" />
                      Europe
                    </h3>
                    <span className="text-2xl font-bold text-teal-600">{data.regionalBreakdown.europe}</span>
                  </div>
                  <p className="text-gray-600">
                    {data.regionalBreakdown.europe > 40
                      ? 'Excellent access to most European countries including the Schengen Area and EU member states.'
                      : 'Limited access to European destinations. Most Schengen countries require advance visa applications.'}
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      Asia
                    </h3>
                    <span className="text-2xl font-bold text-blue-600">{data.regionalBreakdown.asia}</span>
                  </div>
                  <p className="text-gray-600">
                    {data.regionalBreakdown.asia > 35
                      ? 'Strong access throughout Asia including major tourist destinations and business hubs.'
                      : 'Moderate access to Asian countries with many destinations offering visa on arrival or eVisa options.'}
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-purple-600" />
                      Americas
                    </h3>
                    <span className="text-2xl font-bold text-purple-600">{data.regionalBreakdown.americas}</span>
                  </div>
                  <p className="text-gray-600">
                    {data.regionalBreakdown.americas > 25
                      ? 'Good access to North, Central, and South American destinations including major economies.'
                      : 'Limited access to the Americas with several countries requiring advance visa applications.'}
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-orange-600" />
                      Africa
                    </h3>
                    <span className="text-2xl font-bold text-orange-600">{data.regionalBreakdown.africa}</span>
                  </div>
                  <p className="text-gray-600">
                    {data.regionalBreakdown.africa > 25
                      ? 'Solid access to African destinations with many countries offering visa on arrival options.'
                      : 'Moderate access to Africa with visa on arrival common for tourist destinations.'}
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-red-600" />
                      Middle East
                    </h3>
                    <span className="text-2xl font-bold text-red-600">{data.regionalBreakdown.middleEast}</span>
                  </div>
                  <p className="text-gray-600">
                    {data.regionalBreakdown.middleEast > 10
                      ? 'Good access to Gulf states and other Middle Eastern countries.'
                      : 'Limited access to Middle Eastern destinations with many requiring advance visas.'}
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-green-600" />
                      Oceania
                    </h3>
                    <span className="text-2xl font-bold text-green-600">{data.regionalBreakdown.oceania}</span>
                  </div>
                  <p className="text-gray-600">
                    Access to Pacific island nations with Australia and New Zealand typically requiring eTA or eVisitor arrangements.
                  </p>
                </div>
              </div>
            </section>

            <FAQBlock faqs={faqs} />

            <section id="destination-requirements" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Check Entry Requirements by Destination</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                While this page lists visa-free access for {data.nationality} passport holders, each destination has additional entry requirements beyond visa status. Check destination-specific entry requirements including passport validity, proof of funds, onward tickets, and health insurance.
              </p>
              <div className="grid gap-4 mb-6">
                {getDestinationLinks().map((link) => (
                  <Link key={link.url} href={link.url} className="group">
                    <Card className="transition-all duration-200 hover:shadow-lg hover:border-teal-200">
                      <CardContent className="flex items-center justify-between p-6">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                            {link.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {link.description}
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
              <Link href="/visa-guides/do-i-need-a-visa/articles" className="group inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium">
                <span>Browse all visa requirement articles</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
              </Link>
            </section>

            <section id="sources" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Sources and Methodology</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                This visa information is compiled from official government immigration websites, embassy announcements, and verified traveler reports. We continuously monitor changes to visa policies and update our data to reflect current entry requirements.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Learn more about our <Link href="/methodology" className="text-teal-600 hover:text-teal-700 font-medium underline">research methodology</Link> and data verification process.
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Last Updated:</strong> {new Date(data.lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Note:</strong> Visa policies can change without notice. Always verify current entry requirements with official government sources or embassies before booking international travel.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Visa Guides</h2>
              <div className="grid gap-4">
                <Link href="/visa-guides/do-i-need-a-visa" className="group">
                  <Card className="transition-all duration-200 hover:shadow-lg hover:border-teal-200">
                    <CardContent className="flex items-center justify-between p-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                          Do I Need a Visa?
                        </h3>
                        <p className="text-sm text-gray-600">
                          Check specific visa requirements for your destination
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
                          Understand visa-free, eVisa, eTA, and visa on arrival
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
                          Plan your trip and check requirements for multiple destinations
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/destination/thailand" className="group">
                  <Card className="transition-all duration-200 hover:shadow-lg hover:border-teal-200">
                    <CardContent className="flex items-center justify-between p-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                          Thailand Entry Requirements
                        </h3>
                        <p className="text-sm text-gray-600">
                          Complete visa requirements for Thailand by passport
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/destination/japan" className="group">
                  <Card className="transition-all duration-200 hover:shadow-lg hover:border-teal-200">
                    <CardContent className="flex items-center justify-between p-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                          Japan Entry Requirements
                        </h3>
                        <p className="text-sm text-gray-600">
                          Complete visa requirements for Japan by passport
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/destination/united-kingdom" className="group">
                  <Card className="transition-all duration-200 hover:shadow-lg hover:border-teal-200">
                    <CardContent className="flex items-center justify-between p-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                          United Kingdom Entry Requirements
                        </h3>
                        <p className="text-sm text-gray-600">
                          Complete visa requirements for UK by passport
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </section>
          </article>
        </div>
      </div>
    </>
  );
}
