import { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, GitCompare, ArrowRight, Plane, Route, ShieldCheck, TriangleAlert as AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Free Visa & Travel Planning Tools (2026) | VisaInfoGuide',
  description: 'Free travel planning tools for international travelers. Calculate Schengen days, check transit visa requirements, verify passport validity, and assess trip entry risks — all in one place.',
  alternates: {
    canonical: 'https://visainfoguide.com/tools',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Free Visa & Travel Planning Tools (2026) | VisaInfoGuide',
    description: 'Free travel planning tools for international travelers. Calculate Schengen days, check transit visa requirements, verify passport validity, and assess trip entry risks.',
    url: 'https://visainfoguide.com/tools',
    type: 'website',
    images: [
      {
        url: 'https://visainfoguide.com/og/tools-og',
        width: 1200,
        height: 630,
        alt: 'Visa & Travel Planning Tools - VisaInfoGuide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Visa & Travel Planning Tools (2026) | VisaInfoGuide',
    description: 'Free travel planning tools for international travelers. Calculate Schengen days, check transit visa requirements, verify passport validity, and assess trip entry risks.',
    images: ['https://visainfoguide.com/og/tools-og'],
  },
};

const tools = [
  {
    title: 'Schengen 90/180 Rule Calculator',
    description: 'Calculate your days spent in the Schengen Area and see how many days you have remaining. Understand the rolling 180-day window and plan your stays accurately.',
    href: '/tools/schengen-calculator',
    icon: Calculator,
    available: true,
  },
  {
    title: 'Compare Passports Tool',
    description: 'Interactive side-by-side comparison of visa-free access and global mobility between two passports. Analyze destination overlap, ranking differences, and travel freedom scores.',
    href: '/compare',
    icon: GitCompare,
    available: true,
  },
  {
    title: 'Airline Boarding Check',
    description: 'Assess your flight boarding readiness before you travel. Checks destination visa requirement, passport validity, transit visa rules, and onward ticket enforcement — all in one place.',
    href: '/tools/airline-boarding-check',
    icon: Plane,
    available: true,
  },
  {
    title: 'Transit Visa Checker',
    description: 'Check whether your passport requires a transit visa for an airport layover. Covers airside transit, self-transfer rules, terminal changes, and exemptions for major global hubs including the UK, Schengen, UAE, Singapore, and more.',
    href: '/tools/transit-visa-checker',
    icon: Route,
    available: true,
  },
  {
    title: 'Passport Validity Checker',
    description: 'Check if your passport is valid long enough for your destination and travel dates. Covers the 6-month rule, 3-month Schengen rule, and duration-of-stay requirements for 195+ countries.',
    href: '/tools/passport-validity-checker',
    icon: ShieldCheck,
    available: true,
  },
  {
    title: 'Trip Entry Risk Check',
    description: 'Assess the entry risk level for your trip before you travel. Checks visa requirements, passport validity, onward ticket rules, and border crossing risk factors across your destination and passport combination.',
    href: '/tools/trip-entry-risk-check',
    icon: AlertTriangle,
    available: true,
  },
];

export default function ToolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Travel Tools',
            description: 'Free travel planning tools for international travelers',
            url: 'https://visainfoguide.com/tools',
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://visainfoguide.com',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Tools',
                  item: 'https://visainfoguide.com/tools',
                },
              ],
            },
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <Breadcrumbs
            items={[
              { name: 'Tools', url: '/tools' },
            ]}
          />

          <div className="mt-6 mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Travel Tools</h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Free, accurate tools to help you plan international travel, understand visa rules, and stay compliant with entry requirements.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group block transition-all duration-200 hover:scale-[1.02]"
                >
                  <Card className="h-full border-2 border-gray-200 hover:border-teal-400 hover:shadow-lg transition-all duration-200">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 bg-teal-50 rounded-lg group-hover:bg-teal-100 transition-colors">
                            <Icon className="w-6 h-6 text-teal-600" />
                          </div>
                          <CardTitle className="text-xl">{tool.title}</CardTitle>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">
                        {tool.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">More tools in development</h2>
            <p className="text-gray-600">
              We are building additional tools to help international travelers plan with confidence. If you have a suggestion for a tool that would help you, we would like to hear it.
            </p>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to use these travel tools</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our free tools are designed for international travelers who need fast, reliable answers about visa rules and passport access. Whether you are planning a multi-country trip through Europe or comparing the mobility of two passports, these tools remove the guesswork from international travel planning.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              The{' '}
              <Link href="/tools/schengen-calculator" className="text-teal-700 underline hover:text-teal-900">
                Schengen 90/180 Day Calculator
              </Link>{' '}
              helps you track your stays across the 27 Schengen member states. The rule limits non-EU visitors to 90 days of presence within any rolling 180-day window. Overstaying can result in fines, deportation, or future entry bans, so accurate calculation matters. Enter your past travel dates and the tool shows you exactly how many days you have left.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              The{' '}
              <Link href="/compare" className="text-teal-700 underline hover:text-teal-900">
                Compare Passports Tool
              </Link>{' '}
              lets you place two passports side by side and see a full breakdown of their visa-free access, eVisa access, and visa-on-arrival coverage. It is useful for dual citizens, those considering naturalization, or researchers studying global passport mobility trends.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding the Schengen Zone</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The Schengen Area is one of the most visited destinations in the world, covering countries like{' '}
              <Link href="/destination/france" className="text-teal-700 underline hover:text-teal-900">France</Link>,{' '}
              <Link href="/destination/germany" className="text-teal-700 underline hover:text-teal-900">Germany</Link>,{' '}
              <Link href="/destination/spain" className="text-teal-700 underline hover:text-teal-900">Spain</Link>,{' '}
              <Link href="/destination/italy" className="text-teal-700 underline hover:text-teal-900">Italy</Link>, and{' '}
              <Link href="/destination/netherlands" className="text-teal-700 underline hover:text-teal-900">the Netherlands</Link>.
              Once you enter any one of them, your days count toward the same shared 90-day quota. Our calculator helps you manage those days across all Schengen countries combined.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              For a full explanation of how the rule works, read our guide on the{' '}
              <Link href="/guides/schengen-90-180-rule" className="text-teal-700 underline hover:text-teal-900">
                Schengen 90/180 rule
              </Link>
              . You can also explore{' '}
              <Link href="/research/schengen-90-180-rule-explained" className="text-teal-700 underline hover:text-teal-900">
                our in-depth research article
              </Link>{' '}
              on common mistakes travelers make when counting Schengen days.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Passport strength and visa-free travel</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Passport strength refers to how many countries a passport holder can visit without applying for a visa in advance. Our{' '}
              <Link href="/compare" className="text-teal-700 underline hover:text-teal-900">
                passport comparison tool
              </Link>{' '}
              pulls live data so you can see which destinations each passport unlocks and where a visa is still required.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              To dig deeper, browse individual passport pages like{' '}
              <Link href="/passport/united-states" className="text-teal-700 underline hover:text-teal-900">United States</Link>,{' '}
              <Link href="/passport/united-kingdom" className="text-teal-700 underline hover:text-teal-900">United Kingdom</Link>,{' '}
              <Link href="/passport/india" className="text-teal-700 underline hover:text-teal-900">India</Link>, or{' '}
              <Link href="/passport/canada" className="text-teal-700 underline hover:text-teal-900">Canada</Link>{' '}
              for a full country-by-country breakdown of visa requirements. You can also read our research on{' '}
              <Link href="/research/most-powerful-passports-2026" className="text-teal-700 underline hover:text-teal-900">
                the most powerful passports of 2026
              </Link>
              .
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Plan your trip with accurate visa data</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Beyond these tools, VisaInfoGuide provides detailed visa guides for every major travel corridor. If you are planning a trip and need to know whether you need a visa, check our{' '}
              <Link href="/visa-guides/do-i-need-a-visa" className="text-teal-700 underline hover:text-teal-900">
                Do I Need a Visa
              </Link>{' '}
              section or browse{' '}
              <Link href="/visa-guides/country-entry-requirements" className="text-teal-700 underline hover:text-teal-900">
                entry requirements by destination country
              </Link>
              .
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              For popular destinations, we have dedicated guides including{' '}
              <Link href="/visa-guides/country-entry-requirements/india-2026" className="text-teal-700 underline hover:text-teal-900">India entry requirements</Link>,{' '}
              <Link href="/visa-guides/country-entry-requirements/turkey-2026" className="text-teal-700 underline hover:text-teal-900">Turkey entry requirements</Link>,{' '}
              <Link href="/visa-guides/country-entry-requirements/vietnam-2026" className="text-teal-700 underline hover:text-teal-900">Vietnam entry requirements</Link>, and{' '}
              <Link href="/visa-guides/country-entry-requirements/united-arab-emirates-2026" className="text-teal-700 underline hover:text-teal-900">UAE entry requirements</Link>.
            </p>
            <p className="text-gray-600 leading-relaxed">
              You can also use the{' '}
              <Link href="/trip" className="text-teal-700 underline hover:text-teal-900">
                Trip Visa Finder
              </Link>{' '}
              to enter your passport and destinations all at once and get a full visa requirement summary for your entire trip itinerary.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
