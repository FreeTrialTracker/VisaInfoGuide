import { Metadata } from 'next';
import Link from 'next/link';
import { canonicalUrl, breadcrumbJsonLd } from '@/lib/seo';
import { FileText, Globe, MapPin, BookOpen, Flag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Breadcrumbs from '@/components/Breadcrumbs';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Visa Guides & Entry Requirements | VisaInfoGuide',
  description: 'Comprehensive visa guides and entry requirements for international travelers. Find visa-free travel information, country entry rules, and up-to-date visa requirements by destination.',
  alternates: {
    canonical: canonicalUrl('/visa-guides'),
  },
  openGraph: {
    title: 'Visa Guides & Entry Requirements | VisaInfoGuide',
    description: 'Comprehensive visa guides and entry requirements for international travelers. Find visa-free travel information, country entry rules, and up-to-date visa requirements by destination.',
    type: 'website',
    url: canonicalUrl('/visa-guides'),
    images: [{
      url: canonicalUrl('/og/legal-og'),
      width: 1200,
      height: 630,
      alt: 'Visa Guides & Entry Requirements',
    }],
    siteName: 'VisaInfoGuide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visa Guides & Entry Requirements | VisaInfoGuide',
    description: 'Comprehensive visa guides and entry requirements for international travelers.',
    images: [canonicalUrl('/og/legal-og')],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const categories = [
  {
    title: 'Do I Need a Visa?',
    description: 'Find out if you need a visa for your destination country. Check visa requirements based on your passport and travel plans.',
    href: '/visa-guides/do-i-need-a-visa',
    icon: FileText,
  },
  {
    title: 'Visa-Free Countries',
    description: 'Discover countries you can visit without a visa. Explore visa-free travel options and entry conditions for different passport holders.',
    href: '/visa-guides/visa-free-countries',
    icon: Globe,
  },
  {
    title: 'Country Entry Requirements',
    description: 'Learn about specific entry requirements for countries worldwide, including passport validity, documentation, and health requirements.',
    href: '/visa-guides/country-entry-requirements',
    icon: MapPin,
  },
  {
    title: 'Travel Visa Rules',
    description: 'Understand visa rules and regulations for international travel, including visa types, application processes, and common requirements.',
    href: '/visa-guides/travel-visa-rules',
    icon: BookOpen,
  },
];

export default function VisaGuidesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Visa Guides', url: '/visa-guides' },
          ])),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <Breadcrumbs
            items={[
              { name: 'Visa Guides', url: '/visa-guides' },
            ]}
          />

          <div className="mt-8 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Visa Guides & Entry Requirements
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
              This section provides up-to-date visa requirements, visa-free travel information, and entry rules for international travelers. Whether you need to know if a visa is required, want to explore visa-free destinations, or understand specific country entry requirements, our comprehensive guides help you plan your travel with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link key={category.href} href={category.href} className="group">
                  <Card className="h-full transition-all duration-200 hover:shadow-lg hover:border-teal-200">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-teal-50 rounded-lg group-hover:bg-teal-100 transition-colors">
                          <Icon className="w-6 h-6 text-teal-600" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl text-gray-900 group-hover:text-teal-700 transition-colors">
                            {category.title}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed">
                        {category.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Passport Power & Rankings</h2>
            <p className="text-gray-600 mb-6">See which passports unlock the most destinations and compare global mobility.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { href: '/most-powerful-passports', title: 'Most Powerful Passports (2026)', desc: 'Full ranking by visa-free destination count, with tier classification for every passport.' },
                { href: '/passport-ranking', title: 'Passport Ranking Index', desc: 'Compare passport strength by visa-free access, eVisa eligibility, and global mobility.' },
              ].map((item) => (
                <Link key={item.href} href={item.href} className="group">
                  <Card className="h-full transition-all duration-200 hover:shadow-lg hover:border-teal-200">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-teal-50 rounded-lg group-hover:bg-teal-100 transition-colors">
                          <Globe className="w-6 h-6 text-teal-600" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl text-gray-900 group-hover:text-teal-700 transition-colors">
                            {item.title}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Digital Nomad Visas</h2>
            <p className="text-gray-600 mb-6">Remote work visa programs for every region — requirements, costs, and stay durations.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { href: '/digital-nomad-visas', title: 'Digital Nomad Visas (2026)', desc: 'Guide to every country with an active digital nomad visa program, including income requirements and tax benefits.' },
                { href: '/countries-with-digital-nomad-visa', title: 'Countries with Digital Nomad Visa', desc: 'Full directory of nomad-friendly countries sorted by region with stay duration and family allowance details.' },
              ].map((item) => (
                <Link key={item.href} href={item.href} className="group">
                  <Card className="h-full transition-all duration-200 hover:shadow-lg hover:border-teal-200">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-teal-50 rounded-lg group-hover:bg-teal-100 transition-colors">
                          <MapPin className="w-6 h-6 text-teal-600" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl text-gray-900 group-hover:text-teal-700 transition-colors">
                            {item.title}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Schengen Area</h2>
            <p className="text-gray-600 mb-6">Visa requirements, the 90/180 rule, and entry conditions for Europe's borderless travel zone.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { href: '/destination/schengen-area', title: 'Schengen Area Entry Requirements', desc: 'Full breakdown of visa requirements for every nationality entering the Schengen Zone, including stay limits and passport validity rules.' },
                { href: '/tools/schengen-calculator', title: 'Schengen 90/180 Day Calculator', desc: 'Calculate how many days you have remaining in the Schengen Area and whether you are at risk of overstaying.' },
              ].map((item) => (
                <Link key={item.href} href={item.href} className="group">
                  <Card className="h-full transition-all duration-200 hover:shadow-lg hover:border-teal-200">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-teal-50 rounded-lg group-hover:bg-teal-100 transition-colors">
                          <Flag className="w-6 h-6 text-teal-600" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl text-gray-900 group-hover:text-teal-700 transition-colors">
                            {item.title}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-16 border-t border-gray-100 pt-14">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Visa Requirements for International Travel</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Navigating international visa requirements can be complex. Whether you are a first-time traveler or a seasoned globetrotter, understanding the difference between visa-free access, visa on arrival, eVisa, and traditional visa applications is essential for smooth border crossings. Requirements change frequently — countries regularly update their policies based on bilateral agreements, security assessments, and diplomatic relations.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Visa-Free Travel vs. Visa on Arrival vs. eVisa</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong>Visa-free access</strong> means you can enter a country simply by presenting your passport — no prior application required. This is the most convenient form of travel authorization and is determined entirely by the diplomatic relationship between your home country and the destination.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong>Visa on arrival (VOA)</strong> allows travelers to obtain entry permission upon arrival at the border or airport, usually by paying a fee and completing a short form. It is more flexible than a traditional visa but still requires documentation and a small amount of processing time.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                <strong>eVisas</strong> are electronic visas applied for online before travel, often processed within 24–72 hours. Countries like India, Turkey, Sri Lanka, and Kenya offer eVisa systems that have significantly reduced the friction of international travel for millions of passport holders.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Passport Validity and Entry Requirements</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Most countries require your passport to be valid for at least 6 months beyond your intended stay. Some, particularly in Europe and Southeast Asia, accept as little as 3 months of remaining validity. Always check the specific passport validity rule for your destination before booking, as airlines may deny boarding if your passport does not meet requirements.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Additional entry requirements can include proof of onward travel, sufficient funds, travel insurance, yellow fever vaccination certificates (for entry to or from certain African and South American countries), and completed arrival declaration forms.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">The Schengen Area and the 90/180 Rule</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                The Schengen Area is a zone of 27 European countries that have abolished internal border controls. Non-EU nationals with visa-free access can stay for up to 90 days in any 180-day rolling period across the entire Schengen zone — not just one country. Overstaying this limit can result in fines, deportation, and future entry bans.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Long-stay visas (type D visas) are available for those who wish to remain in a Schengen country beyond 90 days, such as for study, work, or <a href="https://www.immigrationinfoguide.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline underline-offset-2 font-medium">family reunification and immigration purposes</a>.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">How Passport Strength is Measured</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Passport strength is typically measured by the number of destinations accessible without a prior visa — combining fully visa-free destinations and those offering visa on arrival or eVisa upon arrival. Passports from Japan, Singapore, France, Germany, and the United Kingdom consistently rank among the most powerful, offering access to 180+ destinations without advance visa arrangements.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Conversely, passport holders from countries with fewer diplomatic ties may face mandatory visa applications for most destinations, which can involve lengthy wait times, documentation requirements, interview appointments, and associated fees.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Planning Your Trip: Key Visa Checklist</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                <li>Check the visa requirement for your specific passport and destination at least 8 weeks before travel</li>
                <li>Verify your passport has sufficient validity (typically 6 months beyond your return date)</li>
                <li>Confirm whether a Schengen, UK, or US visa opens any third-country access</li>
                <li>Apply for eVisas or traditional visas well in advance during peak seasons</li>
                <li>Carry proof of onward travel and accommodation bookings to present at immigration</li>
                <li>Check if your destination requires travel insurance or specific health documentation</li>
              </ul>

              <p className="text-gray-600 leading-relaxed">
                Visa policies are subject to change without notice. Always verify requirements directly with the official embassy or consulate of your destination country, or consult their official government immigration portal, before finalizing your travel plans.
              </p>
            </div>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 gap-5">
            <aside className="bg-blue-50 border border-blue-200 rounded-xl p-6 flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mt-0.5">
                <svg className="w-5 h-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-blue-900 mb-1">Staying Longer or Moving Abroad?</p>
                <p className="text-sm text-blue-800 leading-relaxed mb-3">For work visas, permanent residency, family reunification, and long-term immigration guides, visit ImmigrationInfoGuide — our dedicated resource for settling abroad in 100+ countries.</p>
                <a href="https://www.immigrationinfoguide.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                  Explore immigration guides
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                </a>
              </div>
            </aside>
            <aside className="bg-teal-50 border border-teal-200 rounded-xl p-6 flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mt-0.5">
                <svg className="w-5 h-5 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-teal-900 mb-1">Connecting Flight or Long Layover?</p>
                <p className="text-sm text-teal-800 leading-relaxed mb-3">Find airport transit hotels, airside rest areas, and layover accommodation guides for 200+ international airports at RestInAirport — so you can rest without leaving the terminal.</p>
                <a href="https://www.restinairport.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                  Find airport hotels
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                </a>
              </div>
            </aside>
          </div>

        </div>
      </div>
    </>
  );
}
