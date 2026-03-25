import { Metadata } from 'next';
import Link from 'next/link';
import { Newspaper } from 'lucide-react';
import { breadcrumbJsonLd } from '@/lib/seo';
import LatestVisaNews from '@/components/news/LatestVisaNews';
import NewsSeoAccordion from '@/components/news/NewsSeoAccordion';

export const revalidate = 3600;

const BASE_URL = 'https://visainfoguide.com';
const SITE_NAME = 'VisaInfoGuide';

export const metadata: Metadata = {
  title: `Visa & Immigration News (2026) | ${SITE_NAME}`,
  description: 'Latest visa policy changes, citizenship overhauls, and immigration updates from around the world. Up-to-date news for international travelers and immigrants.',
  alternates: { canonical: `${BASE_URL}/news` },
  robots: { index: true, follow: true },
  openGraph: {
    title: `Visa & Immigration News (2026) | ${SITE_NAME}`,
    description: 'Latest visa policy changes, citizenship overhauls, and immigration updates from around the world.',
    type: 'website',
    url: `${BASE_URL}/news`,
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Visa & Immigration News (2026) | ${SITE_NAME}`,
    description: 'Latest visa policy changes, citizenship overhauls, and immigration updates from around the world.',
  },
};

const faqs = [
  {
    question: 'How often do visa and immigration rules change?',
    answer:
      'Visa rules can change with very little notice. Governments announce new bilateral agreements, revoke visa-free access, or update entry conditions in response to diplomatic shifts, public health events, or security concerns. Some changes take effect within days of announcement. This is why checking official sources close to your travel date is essential.',
  },
  {
    question: 'Where can I find reliable and up-to-date visa news?',
    answer:
      'Reliable sources include the official embassy websites of your destination country, your own government\'s travel advisory portal, and trusted platforms like VisaInfoGuide that aggregate and verify immigration updates. Always cross-reference with official government sources before making travel decisions. Our <a href="/visa-guides" class="text-teal-600 hover:underline">visa guides</a> are updated regularly to reflect current entry requirements.',
  },
  {
    question: 'Can airlines deny boarding if entry requirements have changed?',
    answer:
      'Yes. Airlines use the TIMATIC database to verify whether a passenger meets the entry requirements of their destination. If the rules have changed since you booked your ticket and you no longer qualify for visa-free entry or have an invalid travel authorization, you can be denied boarding. Use our <a href="/tools/airline-boarding-check" class="text-teal-600 hover:underline">airline boarding check tool</a> to verify your eligibility before you travel.',
  },
  {
    question: 'What happens if entry requirements change after I book my trip?',
    answer:
      'If entry rules change after you book, you are still responsible for complying with the new requirements. Travel insurance rarely covers losses caused by visa denials. Your best protection is to check entry conditions again within 72 hours of departure and use tools like the <a href="/tools/trip-entry-risk-check" class="text-teal-600 hover:underline">trip entry risk checker</a> to assess your current eligibility.',
  },
  {
    question: 'Are visa-free travel agreements permanent?',
    answer:
      'No. Visa-free agreements between countries are diplomatic arrangements that can be suspended or terminated. Countries regularly review and renegotiate these agreements based on reciprocity, security assessments, and overstay rates. A country that was visa-free last year may require a visa this year. Always verify current status before travelling.',
  },
  {
    question: 'Do transit visa rules change as often as regular entry visa rules?',
    answer:
      'Transit visa rules change frequently and often receive less media coverage than full entry requirements. Countries tighten airside transit visa requirements in response to migration pressures or security concerns, sometimes affecting dozens of nationalities at once. Our <a href="/tools/transit-visa-checker" class="text-teal-600 hover:underline">transit visa checker</a> keeps these rules current for hundreds of passport and airport combinations.',
  },
  {
    question: 'How do I verify passport validity rules for my destination?',
    answer:
      'Each country sets its own passport validity requirements, typically expressed as months of validity required beyond your date of entry or departure. These requirements can change with little notice. Our <a href="/tools/passport-validity-checker" class="text-teal-600 hover:underline">passport validity checker</a> shows the current requirement for any destination based on your passport nationality.',
  },
  {
    question: 'Should I trust visa news headlines alone when planning travel?',
    answer:
      'News headlines often summarize complex policy changes and may omit important details such as which passport holders are affected, when changes take effect, or what exceptions apply. Always read the full announcement and verify against official government or embassy sources. Use our destination and passport pages to see how a news update applies to your specific situation.',
  },
  {
    question: 'What is the safest way to check entry rules before flying?',
    answer:
      'The safest approach is to check three sources within 48 to 72 hours of your flight: your destination country\'s official immigration website, your government\'s travel advisory, and a current aggregator like VisaInfoGuide. Also run your itinerary through the <a href="/tools/trip-entry-risk-check" class="text-teal-600 hover:underline">trip entry risk checker</a> to catch any overlooked requirements across all countries on your route.',
  },
  {
    question: 'Can immigration policies change without public notice?',
    answer:
      'In some cases, yes. While most major policy changes are announced in advance, emergency border restrictions, health-related entry bans, and certain security measures can be implemented with very short notice or after the fact. Monitoring immigration news regularly and setting up alerts for your key destinations is the best way to stay ahead of sudden changes.',
  },
];

const faqJsonLd = {
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

const breadcrumbSchema = breadcrumbJsonLd([
  { name: 'Home', url: BASE_URL },
  { name: 'Visa & Immigration News', url: `${BASE_URL}/news` },
]);

export default function NewsIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-teal-50 border border-teal-100">
                  <Newspaper className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                    Visa &amp; Immigration News
                  </h1>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Up-to-date policy changes and entry requirement updates
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <LatestVisaNews isStandalone={true} />
          </div>
        </div>

        <div className="bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto">

              <section aria-labelledby="seo-heading" className="mb-16">
                <h2 id="seo-heading" className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 leading-tight">
                  Latest Visa and Immigration News Worldwide
                </h2>

                <div className="space-y-5 text-gray-700 leading-relaxed">
                  <p>
                    Visa and immigration rules are among the most frequently changing sets of regulations in international travel. Governments adjust{' '}
                    <Link href="/visa-guides" className="text-teal-600 hover:underline font-medium">
                      entry requirement changes
                    </Link>{' '}
                    in response to diplomatic negotiations, security assessments, reciprocity reviews, and public health conditions. Staying informed about these changes is not optional for frequent travelers. It is a critical part of trip planning.
                  </p>

                  <p>
                    A visa-free agreement that was in place when you booked your flight six months ago may have been suspended by the time you travel. A transit visa exemption that applied to your passport last year may now require advance authorization. These are not rare edge cases. They happen regularly across dozens of country pairs every year.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Why Visa Updates Matter for Every Traveler</h3>

                  <p>
                    Most travelers only think about entry requirements once, when they first book a trip. But immigration policy is dynamic. The window between booking and departure is exactly when rules are most likely to have shifted, especially for popular routes and high-traffic corridors.
                  </p>

                  <p>
                    The consequences of missing a rule change are significant:
                  </p>

                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Airlines can deny boarding at the gate based on current TIMATIC data, not the data from when you booked</li>
                    <li>Border agents may refuse entry even with a valid passport if a new visa requirement has taken effect</li>
                    <li>Travelers caught by surprise may face rebooking costs, missed connections, and hotel losses</li>
                    <li>In some cases, travelers may be detained at the port of entry while their situation is reviewed</li>
                  </ul>

                  <p>
                    Use our{' '}
                    <Link href="/tools/airline-boarding-check" className="text-teal-600 hover:underline font-medium">
                      airline boarding check tool
                    </Link>{' '}
                    to verify whether your current documents meet the airline and destination requirements before you travel.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Types of Immigration News to Watch</h3>

                  <p>
                    Not all immigration news affects every traveler. The most important categories to monitor include:
                  </p>

                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li><strong>Visa-free updates</strong> - new bilateral agreements or suspensions affecting specific passport holders</li>
                    <li><strong>Border policy changes</strong> - land border openings, closures, or new checkpoint requirements</li>
                    <li><strong>Transit visa rules</strong> - changes to airside or landside transit visa requirements at major hubs</li>
                    <li><strong>Travel restrictions</strong> - health declarations, entry bans, or quarantine requirements</li>
                    <li><strong>Passport validity updates</strong> - revised minimum validity requirements at specific destinations</li>
                    <li><strong>eVisa launches</strong> - new electronic visa systems replacing embassy or on-arrival processes</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">How Quickly Can Entry Rules Change?</h3>

                  <p>
                    Some changes are announced months in advance, giving travelers time to adjust. Others take effect with less than 48 hours notice. Emergency measures related to security incidents or public health situations can be implemented overnight.
                  </p>

                  <p>
                    The practical recommendation for any international trip is to verify your entry requirements again within 72 hours of departure, even if you checked when you booked. This is especially important for routes involving countries with active diplomatic tensions or recent policy announcements.
                  </p>

                  <p>
                    Our{' '}
                    <Link href="/tools/trip-entry-risk-check" className="text-teal-600 hover:underline font-medium">
                      trip entry risk checker
                    </Link>{' '}
                    gives you a consolidated view of every requirement across all countries on your route, including transit stops, so nothing is overlooked.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Transit Visa Rule Changes</h3>

                  <p>
                    Transit visa requirements are one of the most frequently updated and least publicized areas of travel law. Many travelers do not realize they need a transit visa until they are denied boarding or stopped at the airport.
                  </p>

                  <p>
                    Countries like the United Kingdom, Germany, and the United States periodically update their lists of nationalities that require airside transit visas. These updates often affect travelers from South Asia, Sub-Saharan Africa, and parts of the Middle East most significantly.
                  </p>

                  <p>
                    Our{' '}
                    <Link href="/tools/transit-visa-checker" className="text-teal-600 hover:underline font-medium">
                      transit visa checker
                    </Link>{' '}
                    is updated to reflect current requirements for hundreds of passport and layover airport combinations. Check your specific route before flying.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Checking Passport Validity Before Traveling</h3>

                  <p>
                    Beyond visa requirements, passport validity rules are another area where travelers are frequently caught off guard. Most countries require your passport to be valid for at least 6 months beyond your date of entry, but requirements vary.
                  </p>

                  <p>
                    Some destinations have quietly reduced their required validity window. Others have increased it. Airlines enforce whatever the current requirement is at the time of boarding, not at the time of booking.
                  </p>

                  <p>
                    Verify the current requirement for your destination using our{' '}
                    <Link href="/tools/passport-validity-checker" className="text-teal-600 hover:underline font-medium">
                      passport validity checker
                    </Link>
                    . It covers requirements for all major passport and destination combinations.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">How to Stay Ahead of Visa and Immigration News</h3>

                  <p>
                    The most effective approach combines passive monitoring with active verification before each trip. Key habits include:
                  </p>

                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Bookmarking your destination country's official immigration page</li>
                    <li>Subscribing to travel advisories from your own government</li>
                    <li>Checking VisaInfoGuide news before finalizing any international booking</li>
                    <li>Re-verifying entry requirements 72 hours before departure</li>
                    <li>Checking your specific passport and destination combination on our <Link href="/passport/united-states" className="text-teal-600 hover:underline">passport pages</Link> or <Link href="/destination/japan" className="text-teal-600 hover:underline">destination pages</Link></li>
                  </ul>

                  <p>
                    Our news section is updated as new developments emerge. Pair it with our tools and{' '}
                    <Link href="/resources" className="text-teal-600 hover:underline font-medium">
                      travel planning resources
                    </Link>{' '}
                    for a complete pre-departure checklist approach.
                  </p>
                </div>
              </section>

              <section aria-labelledby="faq-heading" className="mb-16">
                <h2 id="faq-heading" className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                  Frequently Asked Questions About Visa News and Travel Rules
                </h2>
                <NewsSeoAccordion faqs={faqs} />
              </section>

              <section
                aria-labelledby="closing-heading"
                className="bg-teal-50 border border-teal-100 rounded-2xl p-8"
              >
                <h2 id="closing-heading" className="text-xl font-bold text-gray-900 mb-4">
                  Your Source for Accurate Visa and Immigration Information
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  VisaInfoGuide monitors visa policy updates, entry requirement changes, and immigration news across dozens of countries so you do not have to. Our tools, guides, and news articles are designed to give you verified, actionable information at every stage of your trip planning.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Browse our full library of{' '}
                  <Link href="/visa-guides" className="text-teal-600 hover:underline font-medium">
                    visa guides
                  </Link>
                  , run your trip through our suite of free{' '}
                  <Link href="/tools" className="text-teal-600 hover:underline font-medium">
                    travel tools
                  </Link>
                  , or visit our{' '}
                  <Link href="/resources" className="text-teal-600 hover:underline font-medium">
                    travel resources
                  </Link>{' '}
                  page for checklists, templates, and step-by-step application guides.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/tools"
                    className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
                  >
                    Browse All Tools
                  </Link>
                  <Link
                    href="/visa-guides"
                    className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-teal-700 border border-teal-200 text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
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
