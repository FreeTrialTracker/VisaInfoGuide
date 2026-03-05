import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import {
  getPassportBySlug,
  getDestinationBySlug,
  getAllPassportSlugs,
  getTopPairsForPassport,
} from '@/lib/countries';
import { buildTitle, buildDescription, canonicalUrl, webpageJsonLd, faqJsonLd, formatDate, currentDate } from '@/lib/seo';

interface Props {
  params: { passport: string };
}

export async function generateStaticParams() {
  const slugs = getAllPassportSlugs();
  return slugs.map(slug => ({ passport: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const passport = getPassportBySlug(params.passport);
  if (!passport) return {};

  return {
    title: buildTitle({ type: 'passport', passport: passport.name }),
    description: buildDescription({ type: 'passport', passport: passport.name }),
    alternates: {
      canonical: canonicalUrl(`/passport/${params.passport}`),
    },
    openGraph: {
      title: buildTitle({ type: 'passport', passport: passport.name }),
      description: buildDescription({ type: 'passport', passport: passport.name }),
      url: canonicalUrl(`/passport/${params.passport}`),
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function PassportPageSEO({ params }: Props) {
  const passport = getPassportBySlug(params.passport);
  if (!passport) notFound();

  const topDestinations = getTopPairsForPassport(params.passport, 12);

  const faqs = [
    {
      question: `How many countries can ${passport.name} passport holders visit visa-free?`,
      answer: `${passport.name} passport holders can travel to numerous countries without requiring a visa in advance. The exact number varies and includes visa-free entry, visa on arrival, and eVisa options. Check individual destination pages for current requirements.`,
    },
    {
      question: `Do I need travel insurance as a ${passport.name} passport holder?`,
      answer: 'While not always mandatory, comprehensive travel insurance is highly recommended for all international trips. Some countries explicitly require proof of travel insurance for entry.',
    },
    {
      question: `How long must my ${passport.name} passport be valid for international travel?`,
      answer: 'Most countries require your passport to be valid for at least 6 months beyond your intended departure date. Some countries only require 3 months validity. Always check specific requirements for your destination.',
    },
    {
      question: 'What if visa requirements change while I am traveling?',
      answer: 'If you entered a country legally under the visa rules in effect at the time of entry, changes during your stay typically do not affect your current visit. However, they may impact future travel plans.',
    },
  ];

  const webpageSchema = webpageJsonLd({
    name: `Where ${passport.name} passport holders can travel`,
    description: buildDescription({ type: 'passport', passport: passport.name }),
    url: canonicalUrl(`/passport/${params.passport}`),
  });

  const faqSchema = faqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs
            items={[
              { name: 'Resources', url: '/resources' },
              { name: passport.name, url: `/passport/${params.passport}` },
            ]}
          />

          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Where {passport.name} passport holders can travel
            </h1>
            <p className="text-lg text-gray-600">
              Complete travel guide for {passport.name} citizens. Find visa requirements, visa-free destinations,
              and entry conditions for countries worldwide.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {formatDate(currentDate)}
            </p>
          </header>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> Entry rules can change. Always verify current requirements with official
              sources before booking travel.
            </p>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Browse destinations</h2>
            <p className="text-gray-600 mb-6">
              Select a destination to see detailed visa requirements for {passport.name} passport holders.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {topDestinations.map(pair => {
                const destination = getDestinationBySlug(pair.destination);
                if (!destination) return null;

                return (
                  <Link
                    key={pair.destination}
                    href={`/passport/${params.passport}/destination/${pair.destination}`}
                    className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all duration-200 bg-white"
                  >
                    <h3 className="font-medium text-gray-900 mb-1">{destination.name}</h3>
                    <p className="text-sm text-gray-500">View requirements →</p>
                  </Link>
                );
              })}
            </div>
            <div className="mt-6">
              <Link
                href="/resources"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                View all destinations →
              </Link>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Visa types explained</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Visa-free</h3>
                <p className="text-gray-600 text-sm">
                  Enter without obtaining a visa in advance. Typically for tourism or short business stays.
                  Duration varies by country.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Visa on arrival</h3>
                <p className="text-gray-600 text-sm">
                  Obtain your visa at the port of entry. Usually requires payment and may have specific documentation requirements.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">eVisa</h3>
                <p className="text-gray-600 text-sm">
                  Apply online before travel. Electronic approval is linked to your passport. Processing times vary by country.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Visa required</h3>
                <p className="text-gray-600 text-sm">
                  Must apply at an embassy or consulate before travel. Requires in-person application and supporting documents.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Common entry requirements</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  <span><strong>Passport validity:</strong> Most countries require 6 months validity beyond departure date</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  <span><strong>Return ticket:</strong> Proof of onward or return travel may be required</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  <span><strong>Proof of funds:</strong> Evidence of sufficient financial means for your stay</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  <span><strong>Accommodation:</strong> Hotel reservation or invitation letter may be requested</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  <span><strong>Blank pages:</strong> At least one or two blank pages for entry/exit stamps</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frequently asked questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <nav className="border-t border-gray-200 pt-6">
            <Link
              href="/resources"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to all passports and destinations
            </Link>
          </nav>
        </div>
      </main>
    </>
  );
}
