import { Metadata } from 'next';
import Link from 'next/link';
import { Plane, FileCheck, Globe, Database, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Visa-Free vs Visa-on-Arrival vs eVisa: Complete 2026 Comparison Guide',
  description: 'Comprehensive guide comparing visa-free entry, visa-on-arrival, and eVisa systems. Learn requirements, costs, processing times, and which option is best for your travel.',
};

export default function VisaTypesComparison() {
  const lastUpdated = '2026-02-19';

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <article className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-8">
          <div className="flex items-center gap-4 text-sm mb-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Last updated: {new Date(lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2 text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
              <Database className="w-4 h-4" />
              <span className="font-medium">Reviewed and updated monthly</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Visa-Free vs Visa-on-Arrival vs eVisa: Complete Comparison Guide
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Understanding the three main types of visa-free travel arrangements: true visa-free entry, visa-on-arrival, and electronic visas. Learn requirements, costs, processing times, and strategic considerations for international travel planning.
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Overview: Three Types of Simplified Entry</h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            Modern international travel offers three main categories of simplified entry that don't require traditional embassy visa applications. Understanding the differences helps you plan effectively, budget correctly, and avoid surprises at immigration.
          </p>

          <div className="grid md:grid-cols-3 gap-6 my-8">
            <div className="bg-white border-2 border-teal-200 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Plane className="w-6 h-6 text-teal-600" />
                <h3 className="text-xl font-bold text-gray-900 m-0">Visa-Free</h3>
              </div>
              <p className="text-gray-700 text-sm mb-4">No visa required at all. Simply present passport at immigration.</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-600">Cost:</span><span className="font-semibold text-gray-900">$0</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Processing:</span><span className="font-semibold text-gray-900">Instant</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Advance Work:</span><span className="font-semibold text-gray-900">None</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Convenience:</span><span className="font-semibold text-green-600">Highest</span></div>
              </div>
            </div>

            <div className="bg-white border-2 border-blue-200 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileCheck className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900 m-0">Visa-on-Arrival</h3>
              </div>
              <p className="text-gray-700 text-sm mb-4">Obtain visa at airport/border upon arrival. No advance application.</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-600">Cost:</span><span className="font-semibold text-gray-900">$15-100</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Processing:</span><span className="font-semibold text-gray-900">15-60 min</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Advance Work:</span><span className="font-semibold text-gray-900">Minimal</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Convenience:</span><span className="font-semibold text-blue-600">Medium</span></div>
              </div>
            </div>

            <div className="bg-white border-2 border-purple-200 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-6 h-6 text-purple-600" />
                <h3 className="text-xl font-bold text-gray-900 m-0">eVisa</h3>
              </div>
              <p className="text-gray-700 text-sm mb-4">Apply online before travel. Electronically linked to passport.</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-600">Cost:</span><span className="font-semibold text-gray-900">$20-200</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Processing:</span><span className="font-semibold text-gray-900">1-7 days</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Advance Work:</span><span className="font-semibold text-gray-900">Required</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Convenience:</span><span className="font-semibold text-purple-600">Medium-High</span></div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Visa-Free Entry: The Gold Standard</h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            True visa-free entry is the simplest form of international travel. You present your passport at immigration, receive an entry stamp, and proceed. No fees, no forms, no waiting beyond normal immigration queues. This arrangement typically reflects strong diplomatic relationships and low perceived immigration risks.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Examples include <Link href="/passport/united-states/destination/united-kingdom" className="text-teal-600 hover:underline">US to UK</Link>, <Link href="/passport/germany/destination/france" className="text-teal-600 hover:underline">Germany to France</Link>, <Link href="/passport/japan/destination/singapore" className="text-teal-600 hover:underline">Japan to Singapore</Link>, and <Link href="/passport/australia/destination/new-zealand" className="text-teal-600 hover:underline">Australia to New Zealand</Link>. The <Link href="/research/schengen-90-180-rule-explained" className="text-teal-600 hover:underline">Schengen Area</Link> provides visa-free travel for dozens of nationalities across 27 countries.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Visa-on-Arrival: Simplified but Not Free</h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            Visa-on-arrival allows you to obtain a visa at the airport or border crossing upon entry, without advance application at an embassy. While convenient, it involves fees, forms, and waiting time. Popular VoA destinations include <Link href="/passport/united-states/destination/thailand" className="text-teal-600 hover:underline">Thailand</Link>, Cambodia, Laos, and many African countries.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            VoA typically costs $15-100 depending on the country and nationality. You'll need to fill out forms, provide a photo, show proof of onward travel, and sometimes demonstrate sufficient funds. Processing takes 15-60 minutes, though long queues can extend wait times significantly. Always carry exact cash in USD or local currency, as credit cards often aren't accepted. Learn more about <Link href="/research/onward-ticket-requirements-by-country" className="text-teal-600 hover:underline">onward ticket requirements</Link>.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Electronic Visas (eVisa): Digital Revolution</h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            Electronic visas represent a modern middle ground between traditional embassy visas and visa-on-arrival. You apply online before travel, submit documents digitally, pay online, and receive approval electronically. The visa is linked to your passport number in the immigration system, though many countries still provide a PDF approval letter to print and carry.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Popular eVisa systems include <Link href="/passport/united-states/destination/india" className="text-teal-600 hover:underline">India's e-Visa</Link>, <Link href="/passport/canada/destination/australia" className="text-teal-600 hover:underline">Australia's ETA</Link>, Sri Lanka, Kenya, and Turkey. Processing typically takes 1-7 days, though some systems (like Australia's ETA) approve instantly. Costs range from $20-200 depending on visa type and nationality.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
            <Database className="w-8 h-8 text-teal-600" />
            Data Methodology
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            Visa policy information compiled from official government sources, embassy websites, and the IATA Travel Centre database. Requirements change frequently—always verify with official sources before travel. Last updated {new Date(lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.
          </p>

          <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 my-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Check Your Specific Requirements</h3>
            <p className="text-gray-700 mb-4">Verify exact visa requirements for your passport and destination:</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors">
                Trip Visa Finder
              </Link>
              <Link href="/compare" className="inline-flex items-center gap-2 px-4 py-2 bg-white text-teal-600 font-medium rounded-lg border-2 border-teal-600 hover:bg-teal-50 transition-colors">
                Compare Passports
              </Link>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Related Research</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/research/most-powerful-passports-2026" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h4 className="font-semibold text-gray-900 mb-1">Most Powerful Passports 2026</h4>
                <p className="text-sm text-gray-600">Global passport rankings and visa-free access</p>
              </Link>
              <Link href="/research/passport-validity-rules-by-country" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h4 className="font-semibold text-gray-900 mb-1">Passport Validity Rules</h4>
                <p className="text-sm text-gray-600">Essential validity requirements worldwide</p>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
