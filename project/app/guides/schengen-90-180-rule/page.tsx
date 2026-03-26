import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { buildTitle, buildDescription, canonicalUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: buildTitle({ type: 'guide', guideName: 'Schengen 90/180 Rule' }),
  description: buildDescription({
    type: 'guide',
    guideDescription: 'Understanding the Schengen Area 90/180-day rule for visa-free travel. Learn how to calculate your allowed stay across Schengen countries.'
  }),
  alternates: {
    canonical: canonicalUrl('/guides/schengen-90-180-rule'),
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SchengenRulePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { name: 'Resources', url: '/resources' },
            { name: 'Guides', url: '/resources' },
            { name: 'Schengen 90/180 Rule', url: '/guides/schengen-90-180-rule' },
          ]}
        />

        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Understanding the Schengen 90/180 Rule
          </h1>
          <p className="text-lg text-gray-600">
            The Schengen Area allows visa-free travelers to stay for up to 90 days within any 180-day period.
            Learn how this rolling calculation works, which countries it applies to, and how to avoid costly overstay violations.
          </p>
        </header>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">What is the Schengen 90/180 Rule?</h2>
          <p className="text-gray-700 mb-4">
            The Schengen 90/180 rule is the cornerstone regulation governing how long non-EU nationals with visa-free access can remain inside the Schengen Area. Under this rule, you are permitted to stay for a maximum of <strong>90 days within any rolling 180-day period</strong>. This applies to tourism, business travel, and short-stay visits — it is not a fixed calendar window tied to January through June or any other set dates.
          </p>
          <p className="text-gray-700 mb-4">
            The Schengen Area currently comprises <strong>29 European countries</strong> that have abolished internal border checks and operate as a single travel zone for short stays. These include major destinations such as France, Germany, Spain, Italy, the Netherlands, Portugal, Austria, Switzerland, Greece, and many others. Crucially, all days spent anywhere inside the Schengen Area count together — you cannot spend 90 days in France and then 90 days in Germany; your total across all member states is capped at 90 days.
          </p>
          <p className="text-gray-700">
            Citizens of countries with visa-free or visa-on-arrival access to the Schengen zone — including the United States, United Kingdom, Canada, Australia, Japan, and many more — are subject to this rule every time they travel to Europe for a short stay.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">How the Rolling 180-Day Calculation Works</h2>
          <p className="text-gray-700 mb-4">
            The most important thing to understand about the 90/180 rule is that the 180-day window is <strong>rolling</strong>, not fixed. To determine how many days you are still permitted to spend in the Schengen Area on any given date, you must look back exactly 180 days from today and count every day you spent inside the Schengen Area during that lookback window.
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Step 1:</strong> Identify today's date as your reference point.<br />
            <strong>Step 2:</strong> Count back 180 calendar days from today — this is the start of your rolling window.<br />
            <strong>Step 3:</strong> Total up all the days you were physically present inside any Schengen country during that 180-day window.<br />
            <strong>Step 4:</strong> Subtract that total from 90. The result is the maximum number of additional days you may still remain or enter.
          </p>
          <p className="text-gray-700 mb-4">
            Both your entry day and your exit day count as full days of presence. So if you arrived on a Monday and departed on Wednesday, that counts as 3 days, not 2.
          </p>
          <p className="text-gray-700">
            Because the window rolls forward every day, older trips gradually "fall out" of the calculation as they move beyond the 180-day lookback horizon. A trip you took 181 days ago no longer counts against your remaining allowance. This is why frequent short-stay travelers need to track their history carefully — the available days can change from one day to the next.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Practical Example</h2>
          <p className="text-gray-700 mb-4">
            Suppose you spent 45 days in Spain in March and April. You then returned home and are now planning a trip to Italy in September. To check whether you can travel, look back 180 days from your planned entry date into Italy. If your March–April stay in Spain falls within that 180-day window, those 45 days count against your 90-day allowance, leaving you with just 45 days remaining for your Italy trip.
          </p>
          <p className="text-gray-700">
            If your Spain trip falls outside the 180-day lookback window — meaning it was more than 180 days ago — those days no longer count and you have the full 90 days available again. This is the key mechanic that frequent travelers use to plan back-to-back stays in Europe without violating the rule.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Which Countries Are in the Schengen Area?</h2>
          <p className="text-gray-700 mb-4">
            The following countries are full members of the Schengen Area and all days spent in any of them count toward your 90-day allowance: Austria, Belgium, Croatia, Czech Republic, Denmark, Estonia, Finland, France, Germany, Greece, Hungary, Iceland, Italy, Latvia, Liechtenstein, Lithuania, Luxembourg, Malta, Netherlands, Norway, Poland, Portugal, Slovakia, Slovenia, Spain, Sweden, and Switzerland.
          </p>
          <p className="text-gray-700">
            Note that <strong>Ireland</strong> is an EU member but is not part of the Schengen Area. The <strong>United Kingdom</strong>, following Brexit, is also not a Schengen member. Days spent in Ireland or the UK do not count against your Schengen allowance, and each operates its own separate entry conditions.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Common Mistakes to Avoid</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="font-semibold min-w-[16px]">1.</span>
              <span><strong>Treating it as a per-country limit.</strong> The 90 days applies across all Schengen countries combined, not to each country individually.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold min-w-[16px]">2.</span>
              <span><strong>Treating the window as a calendar half-year.</strong> The 180 days rolls continuously from today backward — it is not January to June or any fixed period.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold min-w-[16px]">3.</span>
              <span><strong>Not counting entry and exit days.</strong> Border authorities count both arrival and departure days as full days of presence.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold min-w-[16px]">4.</span>
              <span><strong>Assuming a Schengen visa changes the calculation.</strong> If you hold a valid Schengen short-stay visa (type C), the same 90/180 rule still applies to your permitted stay.</span>
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Key Rules at a Glance</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• The 180-day window is rolling — it moves forward every day, not fixed to a calendar period</li>
            <li>• Both entry and exit days count as full days spent in the Schengen Area</li>
            <li>• The 90-day cap applies to all Schengen countries combined, not per country</li>
            <li>• Overstaying can result in fines, deportation, and entry bans of up to 5 years</li>
            <li>• UK, Ireland, and non-Schengen EU states do not count toward your Schengen days</li>
            <li>• A national long-stay visa (type D) for one Schengen country does not consume your short-stay allowance</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Consequences of Overstaying</h2>
          <p className="text-gray-700 mb-4">
            Exceeding the 90-day limit is taken seriously by Schengen border authorities. If you are found to have overstayed — either when exiting or attempting to re-enter — you can face fines, immediate removal from the Schengen Area, and a ban on re-entry that can last several years. An overstay record can also affect future Schengen visa applications, since consulates review your travel history when assessing visa requests.
          </p>
          <p className="text-gray-700">
            Authorities use your passport stamps, as well as electronic border systems such as the EU Entry/Exit System (EES), to verify compliance. It is your responsibility as a traveler to track your own days and ensure you remain within the legal limit.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Options for Longer Stays</h2>
          <p className="text-gray-700 mb-4">
            If you wish to remain in the Schengen Area beyond 90 days, you have several options depending on your circumstances:
          </p>
          <ul className="space-y-3 text-gray-700 mb-4">
            <li><strong>National long-stay visa (type D):</strong> Issued by an individual Schengen country for stays exceeding 90 days. A valid type D visa from one Schengen state also permits travel to other Schengen countries for up to 90 days within the visa validity period, without consuming your short-stay allowance.</li>
            <li><strong>Residence permit:</strong> If you plan to live, work, or study in a Schengen country for an extended period, you must apply for a national residence permit through that country's immigration authorities.</li>
            <li><strong>Digital nomad visa:</strong> Several Schengen countries — including Germany, Portugal, Spain, and Greece — now offer dedicated digital nomad or remote worker visas for stays beyond 90 days.</li>
          </ul>
          <p className="text-gray-700">
            Each option has its own application requirements and timelines, so it is advisable to begin researching well in advance of your planned travel dates.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tools and Resources</h2>
          <p className="text-gray-700 mb-4">
            Manually tracking a rolling 180-day window across multiple trips can become complex, particularly for frequent travelers. Use the{' '}
            <Link href="/tools/schengen-calculator" className="text-teal-600 hover:text-teal-700 font-medium underline">
              Schengen Calculator
            </Link>{' '}
            to enter your past travel dates and instantly see how many days you have remaining in your current window.
          </p>
          <p className="text-gray-700">
            For detailed visa requirements based on your specific passport, visit the{' '}
            <Link href="/visa-guides" className="text-teal-600 hover:text-teal-700 font-medium underline">
              Visa Guides
            </Link>{' '}
            section or use the{' '}
            <Link href="/destination/schengen-area" className="text-teal-600 hover:text-teal-700 font-medium underline">
              Schengen Area destination page
            </Link>{' '}
            for a full breakdown of which passports have visa-free access and under what conditions.
          </p>
        </div>

        <aside className="mb-8 bg-blue-50 border border-blue-200 rounded-xl p-6 flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mt-0.5">
            <svg className="w-5 h-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-blue-900 mb-1">Planning to Stay Longer in Europe?</p>
            <p className="text-sm text-blue-800 leading-relaxed mb-3">
              National long-stay visas, residence permits, and{' '}
              <a href="https://www.immigrationinfoguide.com" target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-2 hover:text-blue-600 transition-colors">
                work visa and family reunification pathways
              </a>
              {' '}for Schengen countries are covered in depth on ImmigrationInfoGuide — the dedicated resource for long-term immigration in Europe and beyond.
            </p>
            <a href="https://www.immigrationinfoguide.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
              Explore long-stay options
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
            </a>
          </div>
        </aside>

        <nav className="border-t border-gray-200 pt-6">
          <Link
            href="/resources"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to resources
          </Link>
        </nav>
      </div>
    </main>
  );
}
