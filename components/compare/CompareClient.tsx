'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeftRight, Shield, Globe, TrendingUp } from 'lucide-react';
import { COUNTRIES } from '@/lib/countries';

const passportScores = {
  singapore: 195,
  japan: 193,
  germany: 192,
  france: 192,
  italy: 192,
  'united-kingdom': 190,
  'united-states': 188,
  canada: 188,
  australia: 187,
  'new-zealand': 187,
  china: 85,
  india: 62,
  brazil: 171,
  argentina: 171,
  chile: 174,
  mexico: 159,
  thailand: 79,
  philippines: 68,
  vietnam: 56,
  indonesia: 72,
  'south-africa': 106,
  nigeria: 46,
  egypt: 53,
  'united-arab-emirates': 180,
  qatar: 107,
  poland: 186,
  portugal: 186,
  greece: 185,
  hungary: 185,
  croatia: 184,
  'czech-republic': 184,
  switzerland: 189,
  austria: 191,
  belgium: 191,
  netherlands: 191,
  colombia: 98,
};

export default function CompareClient() {
  const [passport1, setPassport1] = useState('');
  const [passport2, setPassport2] = useState('');

  const score1 = passport1 ? passportScores[passport1 as keyof typeof passportScores] || 0 : 0;
  const score2 = passport2 ? passportScores[passport2 as keyof typeof passportScores] || 0 : 0;
  const difference = Math.abs(score1 - score2);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Compare Passports
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Compare visa-free access and global mobility between two passports. See side-by-side rankings, destination access, and travel freedom metrics.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <label htmlFor="passport1" className="block text-sm font-semibold text-gray-700 mb-3">
                First Passport
              </label>
              <select
                id="passport1"
                value={passport1}
                onChange={(e) => setPassport1(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-900 bg-white"
              >
                <option value="">Select a passport...</option>
                {COUNTRIES.map((country) => (
                  <option key={country.slug} value={country.slug}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="passport2" className="block text-sm font-semibold text-gray-700 mb-3">
                Second Passport
              </label>
              <select
                id="passport2"
                value={passport2}
                onChange={(e) => setPassport2(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-900 bg-white"
              >
                <option value="">Select a passport...</option>
                {COUNTRIES.map((country) => (
                  <option key={country.slug} value={country.slug}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {passport1 && passport2 && (
            <div className="space-y-8">
              <div className="flex items-center justify-center">
                <ArrowLeftRight className="w-8 h-8 text-teal-600" />
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-6 border-2 border-teal-200">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-6 h-6 text-teal-700" />
                    <h3 className="text-lg font-bold text-gray-900">
                      {COUNTRIES.find(c => c.slug === passport1)?.name}
                    </h3>
                  </div>
                  <div className="mb-4">
                    <div className="text-4xl font-bold text-teal-700 mb-1">{score1}</div>
                    <div className="text-sm text-gray-700">Visa-Free Destinations</div>
                  </div>
                  <Link
                    href={`/passport/${passport1}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors text-sm"
                  >
                    View Full Requirements →
                  </Link>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border-2 border-blue-200">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-6 h-6 text-blue-700" />
                    <h3 className="text-lg font-bold text-gray-900">
                      {COUNTRIES.find(c => c.slug === passport2)?.name}
                    </h3>
                  </div>
                  <div className="mb-4">
                    <div className="text-4xl font-bold text-blue-700 mb-1">{score2}</div>
                    <div className="text-sm text-gray-700">Visa-Free Destinations</div>
                  </div>
                  <Link
                    href={`/passport/${passport2}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    View Full Requirements →
                  </Link>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-gray-700" />
                  <h3 className="text-lg font-bold text-gray-900">Comparison Summary</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Difference</div>
                    <div className="text-2xl font-bold text-gray-900">{difference} destinations</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Stronger Passport</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {score1 > score2 ? COUNTRIES.find(c => c.slug === passport1)?.name :
                       score2 > score1 ? COUNTRIES.find(c => c.slug === passport2)?.name :
                       'Equal'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Relative Strength</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {score1 === score2 ? '0%' : `${((difference / Math.max(score1, score2)) * 100).toFixed(1)}%`}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Important Note</h4>
                <p className="text-sm text-gray-700">
                  Visa-free scores show the number of destinations accessible without advance visa applications.
                  Requirements may include <Link href="/research/passport-validity-rules-by-country" className="text-teal-600 hover:underline">passport validity rules</Link>,
                  <Link href="/research/onward-ticket-requirements-by-country" className="text-teal-600 hover:underline"> onward tickets</Link>,
                  and other entry conditions. Always verify specific requirements before travel.
                </p>
              </div>
            </div>
          )}

          {(!passport1 || !passport2) && (
            <div className="text-center py-12">
              <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Select two passports to compare their global mobility</p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Passport Strength</h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              Passport strength is measured by the number of destinations a passport holder can access without obtaining a visa in advance.
              This includes visa-free entry, visa-on-arrival, and electronic visa (eVisa) arrangements.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Our comparison tool uses real visa requirement data to show you exactly how passports stack up against each other.
              For detailed analysis of global passport rankings, see our <Link href="/research/most-powerful-passports-2026" className="text-teal-600 hover:underline">Most Powerful Passports 2026</Link> research.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Beyond the Numbers</h3>

            <p className="text-gray-700 leading-relaxed mb-6">
              While visa-free scores provide a useful comparison, they don't tell the whole story. Consider these factors:
            </p>

            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li><strong>Regional Access:</strong> Some passports offer better access to specific regions you care about</li>
              <li><strong>Stay Duration:</strong> Visa-free doesn't mean unlimited stay - most allow 30-90 days</li>
              <li><strong>Passport Validity:</strong> Many countries require 6 months validity beyond departure. Read our <Link href="/research/passport-validity-rules-by-country" className="text-teal-600 hover:underline">complete validity guide</Link></li>
              <li><strong>Entry Conditions:</strong> Visa-free access may still require onward tickets, proof of funds, or specific documentation</li>
              <li><strong>Special Rules:</strong> The <Link href="/research/schengen-90-180-rule-explained" className="text-teal-600 hover:underline">Schengen 90/180 rule</Link> limits total time across 27 countries</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Check Specific Requirements</h3>

            <p className="text-gray-700 leading-relaxed mb-6">
              Use our <Link href="/" className="text-teal-600 hover:underline">Trip Visa Finder</Link> to get exact requirements for your specific passport and destinations.
              Requirements vary by nationality, and what counts for one passport may not count for another.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Plan Your Next Trip</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors">
              Trip Visa Finder
            </Link>
            <Link href="/resources" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-teal-600 font-medium rounded-lg border-2 border-teal-600 hover:bg-teal-50 transition-colors">
              Browse Research
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
