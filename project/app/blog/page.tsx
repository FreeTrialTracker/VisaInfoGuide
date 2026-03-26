import { Metadata } from 'next';
import Link from 'next/link';
import BlogListingClient from '@/components/blog/BlogListingClient';
import BlogSeoAccordion from '@/components/blog/BlogSeoAccordion';

export const metadata: Metadata = {
  title: 'Visa & Travel Blog | Guides & Checklists | VisaInfoGuide',
  description: 'In-depth visa guides, application checklists, and travel tips from VisaInfoGuide. Covering Schengen visas, cover letters, flight reservations, eVisa applications, and transit rules.',
  alternates: {
    canonical: 'https://visainfoguide.com/blog',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Visa & Travel Blog | Guides & Checklists | VisaInfoGuide',
    description: 'In-depth visa guides, application checklists, and travel tips. Covering Schengen visas, cover letters, eVisa applications, and transit rules.',
    type: 'website',
    url: 'https://visainfoguide.com/blog',
    siteName: 'VisaInfoGuide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visa & Travel Blog | Guides & Checklists | VisaInfoGuide',
    description: 'In-depth visa guides, application checklists, and travel tips. Schengen visas, eVisa applications, and transit rules.',
  },
};

const faqs = [
  {
    question: 'What is the difference between a visa on arrival and an eVisa?',
    answer:
      'A visa on arrival is issued at the airport or border crossing when you arrive at your destination. An eVisa is applied for and approved online before you travel. Both grant entry, but eVisas reduce waiting time at immigration and give you confirmation before departure. You can compare both options in our <a href="/visa-guides" class="text-blue-600 hover:underline">visa guides section</a>.',
  },
  {
    question: 'How does the Schengen 90/180 rule work?',
    answer:
      'The Schengen rule allows most non-EU visitors to spend a maximum of 90 days within any 180-day rolling window across all Schengen countries combined. It is not a per-country limit. Use our <a href="/tools/schengen-calculator" class="text-blue-600 hover:underline">Schengen calculator</a> to count your remaining days accurately.',
  },
  {
    question: 'How much passport validity do I need to enter a country?',
    answer:
      'Most countries require your passport to be valid for at least 6 months beyond your intended stay. Some require only 3 months, while others just require validity throughout your trip. Our <a href="/tools/passport-validity-checker" class="text-blue-600 hover:underline">passport validity checker</a> gives you the exact requirement for any destination.',
  },
  {
    question: 'Can I transit through a country without a visa?',
    answer:
      'Transit visa rules depend on your passport nationality, the destination country, and whether you leave the international transit zone. Some nationalities require an airside transit visa even without leaving the airport. Check your exact scenario using our <a href="/tools/transit-visa-checker" class="text-blue-600 hover:underline">transit visa checker</a>.',
  },
  {
    question: 'Which countries can I visit without a visa on a US passport?',
    answer:
      'US passport holders enjoy visa-free or visa-on-arrival access to over 180 countries, including most of Europe, Japan, South Korea, and large parts of Latin America. See the full list on the <a href="/passport/united-states" class="text-blue-600 hover:underline">US passport page</a>.',
  },
  {
    question: 'What are visa-free countries and how are they different from visa-on-arrival countries?',
    answer:
      'Visa-free means you need no prior authorization at all to enter. Visa-on-arrival means you still receive a visa, but the process happens at the port of entry rather than at a consulate beforehand. Both are simpler than applying in advance, but the terms are not interchangeable. Browse the full breakdown in our <a href="/visa-guides" class="text-blue-600 hover:underline">travel visa guides</a>.',
  },
  {
    question: 'Do Schengen visa rules apply to all European countries?',
    answer:
      'No. The Schengen Area covers 27 countries but does not include non-Schengen EU states like Ireland, Bulgaria (partially), Cyprus, and Romania. It also includes non-EU countries like Norway, Switzerland, and Iceland. Each country outside the Schengen zone has its own entry rules.',
  },
  {
    question: 'How do I check visa requirements for a specific passport and destination?',
    answer:
      'Browse by passport on our <a href="/passport/india" class="text-blue-600 hover:underline">passport pages</a> or by destination on our <a href="/destination/japan" class="text-blue-600 hover:underline">destination pages</a>. Every page lists the visa type, maximum stay, and passport validity requirement for that combination.',
  },
  {
    question: 'What documents do I need to apply for a Schengen visa?',
    answer:
      'Standard requirements include a completed application form, valid passport, travel insurance covering 30,000 EUR, proof of accommodation, proof of financial means, and a confirmed return ticket. Individual consulates may request additional documents. Our visa guides cover country-specific requirements in detail.',
  },
  {
    question: 'Is travel insurance required for a Schengen visa application?',
    answer:
      'Yes. A Schengen visa application requires travel medical insurance with a minimum coverage of 30,000 EUR, valid across all Schengen countries for the full duration of your trip. The policy must include emergency medical evacuation and repatriation.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer.replace(/<[^>]+>/g, ''),
    },
  })),
};

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                Visa &amp; Travel Blog
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                In-depth guides, application checklists, and expert advice to help you navigate visa requirements with confidence.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <BlogListingClient />
          </div>
        </div>

        <div className="bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-3xl mx-auto">

              <section aria-labelledby="seo-heading" className="mb-16">
                <h2 id="seo-heading" className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 leading-tight">
                  Visa and Travel Guides for Smart International Travelers
                </h2>

                <div className="prose prose-gray max-w-none space-y-5 text-gray-700 leading-relaxed">
                  <p>
                    Planning international travel starts well before you book a flight. Understanding{' '}
                    <Link href="/visa-guides" className="text-blue-600 hover:underline font-medium">
                      travel visa requirements
                    </Link>{' '}
                    for your destination is one of the most important steps you can take to avoid delays, denials, and costly last-minute problems.
                  </p>

                  <p>
                    Visa rules change frequently. Entry conditions that applied six months ago may no longer be valid today. This blog and the tools on VisaInfoGuide are updated regularly to reflect the latest official requirements from embassies and immigration authorities worldwide.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Understanding Visa Types</h3>

                  <p>
                    Not all visas work the same way. The most common categories travelers encounter are:
                  </p>

                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li><strong>Visa-free entry</strong> - no pre-approval required, simply arrive with a valid passport</li>
                    <li><strong>eVisa</strong> - applied for and approved online before travel, typically within 24 to 72 hours</li>
                    <li><strong>Visa on arrival</strong> - issued at the port of entry, often requires cash payment in local currency</li>
                    <li><strong>Embassy visa</strong> - full consular application required before departure, with supporting documents</li>
                    <li><strong>Electronic Travel Authorization (ETA)</strong> - a lightweight pre-travel registration used by countries like Canada, Australia, and the UK</li>
                  </ul>

                  <p>
                    Understanding which category applies to your passport and destination is the first step. You can read a detailed comparison of{' '}
                    <Link href="/visa-guides" className="text-blue-600 hover:underline font-medium">
                      eVisa vs visa on arrival rules
                    </Link>{' '}
                    across dozens of countries in our guides section.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Schengen Visa Rules Explained</h3>

                  <p>
                    The Schengen Area is one of the most misunderstood travel zones in the world. The{' '}
                    <Link href="/tools/schengen-calculator" className="text-blue-600 hover:underline font-medium">
                      Schengen 90/180 rule
                    </Link>{' '}
                    limits most non-EU visitors to 90 days within any 180-day rolling window across all Schengen member states combined.
                  </p>

                  <p>
                    This is not a per-country limit. Spending 45 days in France and 45 days in Spain exhausts your full 90-day allowance, even though you never stayed more than 45 days in a single country. Many travelers misread this rule and inadvertently overstay.
                  </p>

                  <p>
                    Our{' '}
                    <Link href="/tools/schengen-calculator" className="text-blue-600 hover:underline font-medium">
                      Schengen calculator
                    </Link>{' '}
                    lets you enter your past and planned travel dates to calculate exactly how many days you have remaining and when your next entry window opens.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Passport Validity Requirements</h3>

                  <p>
                    One of the most overlooked travel blockers is passport validity. Many countries require your passport to remain valid for at least 6 months beyond your planned departure date. Some require only 3 months. A handful require only that your passport be valid throughout your stay.
                  </p>

                  <p>
                    Airlines and border agents enforce these rules strictly. A passport that expires two months after your return flight can result in being denied boarding, even if you are technically within the window for some destinations.
                  </p>

                  <p>
                    Use our{' '}
                    <Link href="/tools/passport-validity-checker" className="text-blue-600 hover:underline font-medium">
                      passport validity checker
                    </Link>{' '}
                    to verify the exact validity requirement for any destination before you travel.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Transit Visas and Layover Rules</h3>

                  <p>
                    If your itinerary includes a layover, you may need a transit visa even if you never leave the airport. The rules depend on your passport nationality, the country where you are transiting, and whether you will clear customs and re-enter the international zone.
                  </p>

                  <p>
                    For example, Indian passport holders transiting through the UK require an airside transit visa for most nationalities, while US and EU passport holders do not. These distinctions matter and the rules are not always intuitive.
                  </p>

                  <p>
                    Check your specific transit situation using our{' '}
                    <Link href="/tools/transit-visa-checker" className="text-blue-600 hover:underline font-medium">
                      transit visa checker
                    </Link>
                    , which covers hundreds of passport and airport combinations.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Visa-Free Countries by Passport</h3>

                  <p>
                    The strength of your passport determines how freely you can travel. Passports from the United States, Germany, Japan, and Singapore rank among the most powerful globally, granting visa-free or visa-on-arrival access to 185 or more destinations.
                  </p>

                  <p>
                    Other passports face stricter entry requirements worldwide. Knowing exactly which countries you can enter without advance authorization helps you plan more efficiently and explore more of the world.
                  </p>

                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>
                      <Link href="/passport/united-states" className="text-blue-600 hover:underline">
                        US passport visa-free countries
                      </Link>
                    </li>
                    <li>
                      <Link href="/passport/united-kingdom" className="text-blue-600 hover:underline">
                        UK passport visa-free countries
                      </Link>
                    </li>
                    <li>
                      <Link href="/passport/india" className="text-blue-600 hover:underline">
                        India passport visa requirements
                      </Link>
                    </li>
                  </ul>

                  <p>
                    You can browse every supported passport on our passport index to get a full list of visa-free countries, eVisa destinations, and countries requiring advance visas.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Planning Around Entry Requirements</h3>

                  <p>
                    Smart travelers review entry requirements at least 4 to 6 weeks before departure. Embassy processing times for visas can range from a few days to several weeks depending on your nationality and the destination. Applying early protects your trip.
                  </p>

                  <p>
                    For popular destinations like{' '}
                    <Link href="/destination/japan" className="text-blue-600 hover:underline font-medium">
                      Japan
                    </Link>
                    ,{' '}
                    <Link href="/destination/france" className="text-blue-600 hover:underline font-medium">
                      France
                    </Link>
                    , and the{' '}
                    <Link href="/destination/united-states" className="text-blue-600 hover:underline font-medium">
                      United States
                    </Link>
                    , requirements vary significantly by passport. Entry rules, maximum stay durations, and document requirements are all covered on each destination page.
                  </p>

                  <p>
                    Our blog articles go deeper than the data tables, covering real application experiences, common rejection reasons, and practical tips for strengthening your visa application.
                  </p>
                </div>
              </section>

              <section aria-labelledby="faq-heading" className="mb-16">
                <h2 id="faq-heading" className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                  Frequently Asked Questions About Travel Visas
                </h2>
                <BlogSeoAccordion faqs={faqs} />
              </section>

              <section
                aria-labelledby="closing-heading"
                className="bg-blue-50 border border-blue-100 rounded-2xl p-8"
              >
                <h2 id="closing-heading" className="text-xl font-bold text-gray-900 mb-4">
                  Your Complete Travel Visa Resource
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  VisaInfoGuide brings together official visa data, practical travel tools, and expert-written guides into one place. Whether you are planning your first international trip or managing complex multi-country itineraries, our resources are designed to give you accurate, up-to-date information without the guesswork.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Explore our full suite of free travel tools, browse curated{' '}
                  <Link href="/visa-guides" className="text-blue-600 hover:underline font-medium">
                    visa guides
                  </Link>{' '}
                  for specific passport and destination combinations, or visit our{' '}
                  <Link href="/resources" className="text-blue-600 hover:underline font-medium">
                    travel planning resources
                  </Link>{' '}
                  for checklists and templates that help you apply with confidence.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/tools"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
                  >
                    Browse All Tools
                  </Link>
                  <Link
                    href="/visa-guides"
                    className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-blue-700 border border-blue-200 text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
                  >
                    Read Visa Guides
                  </Link>
                  <Link
                    href="/resources"
                    className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
                  >
                    Travel Resources
                  </Link>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
