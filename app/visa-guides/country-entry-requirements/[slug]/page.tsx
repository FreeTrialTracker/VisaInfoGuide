import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getDestinationEntryData, getAllDestinationSlugs } from '@/lib/destination-entry-data';
import { canonicalUrl, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';
import { articleJsonLd, getPassportLinks } from '@/lib/seo-links';
import { Globe, CheckCircle, XCircle, FileText, ArrowRight, Clock, AlertTriangle, Shield, Wallet, Plane } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQBlock from '@/components/visa-guides/FAQBlock';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllDestinationSlugs();
  return slugs.map((slug) => ({
    slug: `${slug}-2026`,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const destinationSlug = params.slug.replace('-2026', '');
  const data = getDestinationEntryData(destinationSlug);

  if (!data) {
    return {
      title: 'Destination Not Found',
    };
  }

  const title = `${data.name} Entry Requirements in 2026 (Tourist Visa Guide)`;
  const description = `Complete ${data.name} entry requirements guide for 2026. Visa policies, passport validity rules, required documents, stay duration limits, and overstay penalties for all nationalities.`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl(`/visa-guides/country-entry-requirements/${params.slug}`),
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: canonicalUrl(`/visa-guides/country-entry-requirements/${params.slug}`),
      images: [{
        url: canonicalUrl('/og/legal-og'),
        width: 1200,
        height: 630,
        alt: `${data.name} Entry Requirements`,
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

export default function DestinationEntryPage({ params }: PageProps) {
  const destinationSlug = params.slug.replace('-2026', '');
  const data = getDestinationEntryData(destinationSlug);

  if (!data) {
    notFound();
  }

  const faqs = [
    {
      question: `Do I need a visa to visit ${data.name}?`,
      answer: `Visa requirements for ${data.name} depend entirely on your passport nationality. Citizens from ${data.visaFreeNationalities.length} countries can enter visa-free, while ${data.visaRequiredNationalities.length}+ nationalities require visas in advance. Use our visa requirement checker to determine your specific requirements based on your passport.`,
    },
    {
      question: `How long can I stay in ${data.name} without a visa?`,
      answer: `${data.typicalStayDuration} ${['France', 'Germany', 'Spain', 'Italy'].includes(data.name) ? 'This 90/180 rule applies across all Schengen countries combined, not per country.' : 'Stay duration varies by nationality and entry method.'} Extensions may be possible but should be applied for before your authorized stay expires.`,
    },
    {
      question: `What passport validity does ${data.name} require?`,
      answer: `${data.name} requires passports to be ${data.passportValidityRequired}. This is strictly enforced at immigration and airlines may deny boarding if this requirement is not met. Always verify your passport expiration date well before travel.`,
    },
    {
      question: `Does ${data.name} offer e-Visa applications?`,
      answer: data.eVisaAvailable
        ? `Yes, ${data.name} offers e-Visa options for qualifying nationalities. ${data.eVisaDetails}`
        : `No, ${data.name} does not currently offer e-Visa for tourist visits. ${data.eVisaDetails}`,
    },
    {
      question: `What happens if I overstay in ${data.name}?`,
      answer: `${data.overstayPolicySummary} Never overstay your authorized period as it creates serious complications for future travel and can result in arrest, detention, or permanent entry bans.`,
    },
    {
      question: `What documents do I need to enter ${data.name}?`,
      answer: `Entry to ${data.name} requires a valid passport ${data.passportValidityRequired.toLowerCase()}${data.proofOfFundsRequired ? ', proof of sufficient funds' : ''}${data.onwardTicketRequired ? ', proof of onward travel' : ''}${data.healthInsuranceRequired ? ', and valid health insurance' : ''}. Additional documents may include accommodation bookings, invitation letters, or return flight tickets. Immigration officers have discretion to request any documentation proving your travel intentions and ability to support yourself.`,
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
            { name: 'Country Entry Requirements', url: '/visa-guides/country-entry-requirements' },
            { name: data.name, url: `/visa-guides/country-entry-requirements/${params.slug}` },
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
            headline: `${data.name} Entry Requirements in 2026`,
            description: `Complete entry requirements guide for ${data.name} including visa policies, documents, and stay durations.`,
            datePublished: data.lastUpdated,
            dateModified: data.lastUpdated,
            url: `https://visainfoguide.com/visa-guides/country-entry-requirements/${params.slug}`,
          })),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <Breadcrumbs
            items={[
              { name: 'Visa Guides', url: '/visa-guides' },
              { name: 'Country Entry Requirements', url: '/visa-guides/country-entry-requirements' },
              { name: data.name, url: `/visa-guides/country-entry-requirements/${params.slug}` },
            ]}
          />

          <header className="mt-8 mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">{data.flag}</span>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  {data.name} Entry Requirements in 2026
                </h1>
                <p className="text-xl text-gray-600 mt-2">Tourist Visa Guide</p>
              </div>
            </div>

            <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg mb-8">
              <p className="text-lg text-gray-800 leading-relaxed">
                <strong>{data.summary}</strong> Entry requirements vary significantly by passport nationality, and immigration policies can change without notice. Use our <Link href="/visa-guides/do-i-need-a-visa" className="text-teal-600 hover:text-teal-700 font-medium underline">Do I Need a Visa</Link> tool or <Link href="/" className="text-teal-600 hover:text-teal-700 font-medium underline">Trip Visa Finder</Link> to check specific requirements for your passport and travel dates.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{data.visaFreeNationalities.length}</div>
                  <div className="text-sm text-gray-600">Visa-Free Access</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{data.eVisaAvailable ? 'Yes' : 'No'}</div>
                  <div className="text-sm text-gray-600">e-Visa Available</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{data.typicalStayDuration.split(' ')[0]}</div>
                  <div className="text-sm text-gray-600">Typical Stay</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Shield className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{data.passportValidityRequired.split(' ')[0]}</div>
                  <div className="text-sm text-gray-600">Passport Validity</div>
                </CardContent>
              </Card>
            </div>
          </header>

          <article className="prose prose-lg max-w-none">
            <section id="visa-free" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Who Can Enter Visa-Free?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Citizens from the following {data.visaFreeNationalities.length} countries can enter {data.name} without obtaining a visa in advance. {data.typicalStayDuration} These travelers receive entry stamps at immigration and must meet all other entry requirements including passport validity, proof of funds, and onward travel documentation.
              </p>
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {data.visaFreeNationalities.map((country) => (
                    <li key={country} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
                      <span>{country}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-gray-700 leading-relaxed">
                For detailed lists of visa-free destinations by passport, see our <Link href="/visa-guides/visa-free-countries" className="text-teal-600 hover:text-teal-700 font-medium underline">visa-free countries directory</Link>.
              </p>
            </section>

            <section id="visa-required" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Who Needs a Visa?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Citizens from the following nationalities must obtain a visa before traveling to {data.name}. Visa applications should be submitted at {data.name} embassies, consulates, or authorized visa application centers in your home country. Processing times vary but typically range from 5 to 15 business days.
              </p>
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {data.visaRequiredNationalities.map((country) => (
                    <li key={country} className="flex items-center gap-2 text-gray-700">
                      <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                      <span>{country}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To check visa requirements for your specific passport and destination combination, use our <Link href="/visa-guides/do-i-need-a-visa" className="text-teal-600 hover:text-teal-700 font-medium underline">visa requirement directory</Link>.
              </p>
            </section>

            <section id="evisa" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">eVisa and Online Application Options</h2>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                {data.eVisaAvailable ? (
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-8 h-8 text-teal-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">e-Visa Available</h3>
                      <p className="text-gray-700 leading-relaxed">
                        {data.eVisaDetails}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-4">
                    <XCircle className="w-8 h-8 text-gray-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">e-Visa Not Available</h3>
                      <p className="text-gray-700 leading-relaxed">
                        {data.eVisaDetails}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            <section id="required-documents" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Required Documents at Entry</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                All travelers entering {data.name} must meet standard entry requirements regardless of visa status. Immigration officers have authority to deny entry if these requirements are not met, even to visa-free travelers.
              </p>

              <div className="grid gap-6">
                <Card className="border-l-4 border-teal-500">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Shield className="w-8 h-8 text-teal-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Passport Validity</h3>
                        <p className="text-gray-700 leading-relaxed">
                          Your passport must be valid for <strong>{data.passportValidityRequired}</strong>. Airlines and immigration strictly enforce this requirement. Learn more about <Link href="/visa-guides/travel-visa-rules#passport-validity" className="text-teal-600 hover:text-teal-700 font-medium underline">passport validity rules</Link>.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {data.proofOfFundsRequired && (
                  <Card className="border-l-4 border-purple-500">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Wallet className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">Proof of Funds</h3>
                          <p className="text-gray-700 leading-relaxed">
                            You must demonstrate sufficient financial resources to support your stay. Acceptable <Link href="/visa-guides/travel-visa-rules#proof-of-funds" className="text-teal-600 hover:text-teal-700 font-medium underline">proof of funds</Link> includes bank statements, credit cards, cash, travelers checks, or sponsorship letters.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {data.onwardTicketRequired && (
                  <Card className="border-l-4 border-orange-500">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Plane className="w-8 h-8 text-orange-600 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">Onward Travel</h3>
                          <p className="text-gray-700 leading-relaxed">
                            Proof of <Link href="/visa-guides/travel-visa-rules#onward-travel" className="text-teal-600 hover:text-teal-700 font-medium underline">onward travel</Link> is required, either a return ticket or a ticket to your next destination. This proves you intend to leave before your authorized stay expires.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {data.healthInsuranceRequired && (
                  <Card className="border-l-4 border-blue-500">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <FileText className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">Health Insurance</h3>
                          <p className="text-gray-700 leading-relaxed">
                            Valid health insurance coverage is mandatory for entry to {data.name}. Insurance must cover medical expenses and repatriation for the duration of your stay with minimum coverage amounts as specified by immigration authorities.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </section>

            <section id="stay-duration" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Length of Stay Rules</h2>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  {data.typicalStayDuration}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Extensions beyond initial authorized stays may be possible but are not guaranteed. Extension applications must be submitted well before your current stay expires and typically require justification, additional documentation, and fees. Overstaying your authorized period results in serious penalties and complications for future travel.
                </p>
              </div>
            </section>

            <section id="overstay" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Overstay Penalties</h2>
              <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-red-900 mb-3">Serious Consequences</h3>
                    <p className="text-gray-800 leading-relaxed mb-4">
                      {data.overstayPolicySummary}
                    </p>
                    <p className="text-gray-800 leading-relaxed">
                      <strong>Never overstay your authorized period.</strong> Even brief overstays create permanent records that affect all future international travel. If you need to extend your stay, apply for an extension before your current authorization expires. Leaving after an overstay does not erase the violation from immigration databases.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <FAQBlock faqs={faqs} />

            <section id="passport-requirements" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Check Visa Requirements by Passport</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Entry requirements for {data.name} vary significantly by nationality. Some passport holders enjoy visa-free access while others require visas in advance. Check specific requirements for your passport to see if you need a visa and what documents are required.
              </p>
              <div className="grid gap-4 mb-6">
                {getPassportLinks().map((link) => (
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Sources and Official Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                This entry requirements guide is compiled from official government immigration websites, embassy announcements, and verified traveler reports. We continuously monitor policy changes to maintain accurate information.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                For complete details about our research process, see our <Link href="/methodology" className="text-teal-600 hover:text-teal-700 font-medium underline">methodology page</Link>.
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Last Updated:</strong> {new Date(data.lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <strong>Official Sources:</strong>
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• {data.name} Ministry of Foreign Affairs</li>
                  <li>• {data.name} Immigration Bureau</li>
                  <li>• {data.name} Embassy and Consulate Announcements</li>
                  <li>• International Air Transport Association (IATA) Timatic Database</li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">
                  <strong>Important:</strong> Entry requirements can change without notice. Always verify current requirements with official {data.name} government sources or your nearest {data.name} embassy before booking international travel.
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
                          Check visa requirements for your specific passport and destination
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
                          Explore all visa-free destinations available with your passport
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
                          Understand visa types, entry requirements, and travel documentation
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
                          Plan multi-country trips and check requirements for your itinerary
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
