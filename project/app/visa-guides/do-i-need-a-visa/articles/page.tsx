'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, Calendar, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Breadcrumbs from '@/components/Breadcrumbs';

interface Article {
  slug: string;
  title: string;
  description: string;
  passportCountry: string;
  destinationCountry: string;
  lastReviewed: string;
  year: number;
  summary?: string;
  keyFacts?: { label: string; value: string }[];
}

const articles: Article[] = [
  {
    slug: 'do-australians-need-visa-for-usa-2026',
    title: 'Do Australians Need a Visa for the USA in 2026?',
    description: 'Complete guide to US visa requirements for Australian passport holders including ESTA, the Visa Waiver Program, stay limits, and when a full visa is required.',
    passportCountry: 'Australia',
    destinationCountry: 'United States',
    lastReviewed: 'February 26, 2026',
    year: 2026,
    summary: 'Australian citizens do not need a traditional US visa for short tourism or business visits of up to 90 days under the Visa Waiver Program. However, ESTA (Electronic System for Travel Authorization) approval is mandatory before departure. ESTA costs USD 21 and is valid for 2 years with multiple entries.',
    keyFacts: [
      { label: 'Visa Required', value: 'No (under 90 days)' },
      { label: 'ESTA Required', value: 'Yes (USD 21)' },
      { label: 'Max Stay', value: '90 days' },
      { label: 'Passport Validity', value: 'Duration of stay' },
    ],
  },
  {
    slug: 'do-indians-need-visa-for-uk-2026',
    title: 'Do Indians Need a Visa for the UK in 2026?',
    description: 'Complete guide to UK visa requirements for Indian passport holders including the Standard Visitor Visa, application process, required documents, fees, and processing times.',
    passportCountry: 'India',
    destinationCountry: 'United Kingdom',
    lastReviewed: 'February 26, 2026',
    year: 2026,
    summary: 'Indian citizens require a UK Standard Visitor Visa to enter the United Kingdom. No visa on arrival or ETA is available for Indian passport holders. The standard visitor visa costs £115 for 6 months and takes approximately 3 weeks to process. Long-validity multiple-entry visas of up to 10 years are available.',
    keyFacts: [
      { label: 'Visa Required', value: 'Yes' },
      { label: 'Visa Fee', value: '£115 (6 months)' },
      { label: 'Max Stay', value: '6 months per visit' },
      { label: 'Processing Time', value: '~3 weeks' },
    ],
  },
  {
    slug: 'do-australians-need-visa-for-uk-2026',
    title: 'Do Australians Need a Visa for the UK in 2026?',
    description: 'United Kingdom visa requirements for Australian passport holders including the Electronic Travel Authorisation (ETA), stay duration, and work rights.',
    passportCountry: 'Australia',
    destinationCountry: 'United Kingdom',
    lastReviewed: 'February 24, 2026',
    year: 2026,
    summary: 'Australian citizens require a UK Electronic Travel Authorisation (ETA) before visiting the United Kingdom. The ETA replaced the previous visa-free arrangement and must be obtained before boarding. It permits multiple trips of up to 6 months each and is valid for 2 years.',
    keyFacts: [
      { label: 'Visa Required', value: 'No (ETA required)' },
      { label: 'UK ETA Required', value: 'Yes (£10)' },
      { label: 'Max Stay', value: '6 months per visit' },
      { label: 'Passport Validity', value: 'Duration of stay' },
    ],
  },
  {
    slug: 'do-germans-need-visa-for-usa-2026',
    title: 'Do Germans Need a Visa for the USA in 2026?',
    description: 'United States visa requirements for German passport holders including ESTA, the Visa Waiver Program, and when a visa is required.',
    passportCountry: 'Germany',
    destinationCountry: 'United States',
    lastReviewed: 'February 24, 2026',
    year: 2026,
    summary: 'German citizens qualify for the US Visa Waiver Program (VWP) and do not need a traditional visa for short tourism or business visits of up to 90 days. ESTA authorization must be obtained online before departure. For stays over 90 days, work, or study, a US visa is required.',
    keyFacts: [
      { label: 'Visa Required', value: 'No (under 90 days)' },
      { label: 'ESTA Required', value: 'Yes (USD 21)' },
      { label: 'Max Stay', value: '90 days' },
      { label: 'Passport Validity', value: 'Duration of stay' },
    ],
  },
  {
    slug: 'do-canadians-need-visa-for-japan-2026',
    title: 'Do Canadians Need a Visa for Japan in 2026?',
    description: 'Japan visa requirements for Canadian passport holders including visa-free entry, permitted activities, and stay duration in 2026.',
    passportCountry: 'Canada',
    destinationCountry: 'Japan',
    lastReviewed: 'February 24, 2026',
    year: 2026,
    summary: 'Canadian citizens can enter Japan visa-free for up to 90 days for tourism and short business visits. No advance visa application is required. For stays longer than 90 days, employment, or academic programs, a Japanese visa must be obtained from a Japanese consulate before travel.',
    keyFacts: [
      { label: 'Visa Required', value: 'No' },
      { label: 'Max Stay', value: '90 days' },
      { label: 'Visa on Arrival', value: 'Not needed' },
      { label: 'Passport Validity', value: 'At least 6 months' },
    ],
  },
  {
    slug: 'do-uk-citizens-need-visa-for-usa-2026',
    title: 'Do UK Citizens Need a Visa for the United States in 2026?',
    description: 'Complete guide to US visa requirements for British passport holders including the Visa Waiver Program, ESTA requirements, stay duration, and required documents.',
    passportCountry: 'United Kingdom',
    destinationCountry: 'United States',
    lastReviewed: 'February 22, 2026',
    year: 2026,
    summary: 'UK citizens do not need a traditional visa for short stays up to 90 days under the Visa Waiver Program (VWP). However, ESTA authorization is mandatory before boarding. For stays longer than 90 days or for work and study, a US visa is required.',
    keyFacts: [
      { label: 'Visa Required', value: 'No (under 90 days)' },
      { label: 'ESTA Required', value: 'Yes' },
      { label: 'Max Stay', value: '90 days' },
      { label: 'Passport Validity', value: 'Duration of stay' },
    ],
  },
  {
    slug: 'do-us-citizens-need-visa-for-thailand-2026',
    title: 'Do US Citizens Need a Visa for Thailand in 2026?',
    description: 'Complete guide to Thailand visa requirements for US passport holders including visa-free entry, stay duration, and required documents.',
    passportCountry: 'United States',
    destinationCountry: 'Thailand',
    lastReviewed: 'February 21, 2026',
    year: 2026,
    summary: 'US citizens can enter Thailand visa-free for up to 60 days for tourism. No advance visa is required. Extensions of up to 30 days may be granted at a local immigration office. For longer stays or work purposes, a Thai visa must be obtained in advance.',
    keyFacts: [
      { label: 'Visa Required', value: 'No' },
      { label: 'Max Stay', value: '60 days (extendable)' },
      { label: 'Visa on Arrival', value: 'Not needed' },
      { label: 'Passport Validity', value: 'At least 6 months' },
    ],
  },
  {
    slug: 'do-indians-need-visa-for-japan-2026',
    title: 'Do Indians Need a Visa for Japan?',
    description: 'Visa requirements for Indian passport holders traveling to Japan including application process and required documents.',
    passportCountry: 'India',
    destinationCountry: 'Japan',
    lastReviewed: 'February 21, 2026',
    year: 2026,
    summary: 'Indian passport holders require a visa to enter Japan. A short-stay tourist visa must be applied for at the Japanese Embassy or Consulate before departure. Processing typically takes 5–7 business days. Japan does not offer visa on arrival for Indian citizens.',
    keyFacts: [
      { label: 'Visa Required', value: 'Yes' },
      { label: 'Visa on Arrival', value: 'No' },
      { label: 'Max Stay', value: '15 or 30 days' },
      { label: 'Processing Time', value: '5–7 business days' },
    ],
  },
  {
    slug: 'do-uk-citizens-need-visa-for-usa-2026',
    title: 'Do UK Citizens Need a Visa for USA?',
    description: 'United States visa requirements for British passport holders including ESTA and visa waiver program information.',
    passportCountry: 'United Kingdom',
    destinationCountry: 'United States',
    lastReviewed: 'February 21, 2026',
    year: 2026,
    summary: 'UK citizens qualify for the US Visa Waiver Program and can visit the USA for up to 90 days for tourism or business without a visa. ESTA pre-travel authorization is required. For longer stays, employment, or study, a US visa must be obtained.',
    keyFacts: [
      { label: 'Visa Required', value: 'No (short stays)' },
      { label: 'ESTA Required', value: 'Yes' },
      { label: 'Max Stay', value: '90 days' },
      { label: 'Passport Validity', value: 'Duration of stay' },
    ],
  },
  {
    slug: 'do-chinese-citizens-need-visa-for-france-2026',
    title: 'Do Chinese Citizens Need a Visa for France?',
    description: 'France Schengen visa requirements for Chinese passport holders including application process and documentation.',
    passportCountry: 'China',
    destinationCountry: 'France',
    lastReviewed: 'February 21, 2026',
    year: 2026,
    summary: 'Chinese citizens require a Schengen visa to enter France. The short-stay Schengen (C) visa allows stays of up to 90 days within any 180-day period across the entire Schengen Area. Applications must be submitted to the French consulate well in advance of travel.',
    keyFacts: [
      { label: 'Visa Required', value: 'Yes (Schengen C)' },
      { label: 'Max Stay', value: '90 days / 180 days' },
      { label: 'Processing Time', value: 'Up to 15 days' },
      { label: 'Passport Validity', value: '3 months beyond stay' },
    ],
  },
  {
    slug: 'do-thais-need-visa-for-japan-2026',
    title: 'Do Thais Need a Visa for Japan?',
    description: 'Japan visa requirements for Thai passport holders including visa exemption and stay duration information.',
    passportCountry: 'Thailand',
    destinationCountry: 'Japan',
    lastReviewed: 'February 21, 2026',
    year: 2026,
    summary: 'Thai citizens can enter Japan visa-free for up to 30 days for tourism or short business visits. No advance visa application is required. For stays beyond 30 days, work, or study, a Japanese visa must be obtained before departure.',
    keyFacts: [
      { label: 'Visa Required', value: 'No' },
      { label: 'Max Stay', value: '30 days' },
      { label: 'Visa on Arrival', value: 'Not needed' },
      { label: 'Passport Validity', value: 'At least 6 months' },
    ],
  },
  {
    slug: 'do-canadians-need-visa-for-uk-2026',
    title: 'Do Canadians Need a Visa for the UK in 2026?',
    description: 'Complete guide to UK entry requirements for Canadian passport holders including the UK Electronic Travel Authorisation (ETA), stay duration, work rights, and when a full UK visa is required.',
    passportCountry: 'Canada',
    destinationCountry: 'United Kingdom',
    lastReviewed: 'February 27, 2026',
    year: 2026,
    summary: 'Canadian citizens do not need a traditional UK visa for short visits of up to 6 months. However, since January 8, 2025, all Canadians must obtain a UK Electronic Travel Authorisation (ETA) before travelling. The ETA costs £10 and is valid for 2 years with multiple entries.',
    keyFacts: [
      { label: 'Visa Required', value: 'No (ETA required)' },
      { label: 'UK ETA Fee', value: '£10' },
      { label: 'Max Stay', value: '6 months per visit' },
      { label: 'ETA Validity', value: '2 years' },
    ],
  },
];

const passportCountries = ['All Passports', 'United Kingdom', 'United States', 'India', 'China', 'Thailand', 'Canada', 'Australia', 'Germany', 'France', 'Japan'];
const destinationCountries = ['All Destinations', 'United States', 'United Kingdom', 'Japan', 'Thailand', 'France', 'Germany', 'Canada', 'Australia', 'Singapore', 'Dubai'];
const years = ['All Years', '2026', '2025', '2024'];

const PAGE_SIZE = 5;

export default function DoINeedVisaArticlesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPassport, setSelectedPassport] = useState('All Passports');
  const [selectedDestination, setSelectedDestination] = useState('All Destinations');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch =
        searchQuery === '' ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.passportCountry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.destinationCountry.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPassport =
        selectedPassport === 'All Passports' ||
        article.passportCountry === selectedPassport;

      const matchesDestination =
        selectedDestination === 'All Destinations' ||
        article.destinationCountry === selectedDestination;

      const matchesYear =
        selectedYear === 'All Years' ||
        article.year.toString() === selectedYear;

      return matchesSearch && matchesPassport && matchesDestination && matchesYear;
    }).sort((a, b) => new Date(b.lastReviewed).getTime() - new Date(a.lastReviewed).getTime());
  }, [searchQuery, selectedPassport, selectedDestination, selectedYear]);

  useEffect(() => {
    setCurrentPage(1);
    setExpandedSlug(null);
  }, [searchQuery, selectedPassport, selectedDestination, selectedYear]);

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / PAGE_SIZE));
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Breadcrumbs
          items={[
            { name: 'Visa Guides', url: '/visa-guides' },
            { name: 'Do I Need a Visa?', url: '/visa-guides/do-i-need-a-visa' },
            { name: 'Articles', url: '/visa-guides/do-i-need-a-visa/articles' },
          ]}
        />

        <header className="mt-8 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Do I Need a Visa Articles
          </h1>
          <p className="text-lg text-gray-600">
            Browse our comprehensive collection of visa requirement guides organized by passport and destination country.
          </p>
        </header>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by passport, destination, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Passport Country
                </label>
                <Select value={selectedPassport} onValueChange={setSelectedPassport}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {passportCountries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination Country
                </label>
                <Select value={selectedDestination} onValueChange={setSelectedDestination}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {destinationCountries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year
                </label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredArticles.length}</span> {filteredArticles.length === 1 ? 'article' : 'articles'}
          </p>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedPassport('All Passports');
                setSelectedDestination('All Destinations');
                setSelectedYear('2026');
              }}
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4">
              {paginatedArticles.map((article) => {
                const isExpanded = expandedSlug === article.slug;
                return (
                  <Card key={article.slug} className={`transition-all duration-200 hover:shadow-md ${isExpanded ? 'border-teal-300 shadow-md' : 'hover:border-teal-200'}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-4">
                        <Link href={`/visa-guides/do-i-need-a-visa/${article.slug}`} className="group flex-1">
                          <CardTitle className="text-lg text-gray-900 group-hover:text-teal-700 transition-colors leading-snug">
                            {article.title}
                          </CardTitle>
                        </Link>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Link
                            href={`/visa-guides/do-i-need-a-visa/${article.slug}`}
                            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-teal-600 hover:text-teal-700 font-medium border border-teal-200 hover:border-teal-400 rounded-md px-3 py-1.5 transition-all"
                          >
                            Full Guide
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                          {(article.summary || article.keyFacts) && (
                            <button
                              onClick={() => setExpandedSlug(isExpanded ? null : article.slug)}
                              className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 hover:border-gray-300 rounded-md px-3 py-1.5 transition-all"
                              aria-expanded={isExpanded}
                            >
                              {isExpanded ? (
                                <>Hide<ChevronUp className="w-4 h-4" /></>
                              ) : (
                                <>Quick View<ChevronDown className="w-4 h-4" /></>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-gray-600 mb-3 leading-relaxed text-sm">
                        {article.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <span className="font-medium text-gray-700">From:</span>
                          <span className="text-teal-600">{article.passportCountry}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-medium text-gray-700">To:</span>
                          <span className="text-teal-600">{article.destinationCountry}</span>
                        </div>
                        <div className="flex items-center gap-1.5 ml-auto">
                          <Calendar className="w-4 h-4" />
                          <span>{article.lastReviewed}</span>
                        </div>
                      </div>

                      {isExpanded && (article.summary || article.keyFacts) && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          {article.summary && (
                            <p className="text-gray-700 text-sm leading-relaxed mb-4">
                              {article.summary}
                            </p>
                          )}
                          {article.keyFacts && article.keyFacts.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                              {article.keyFacts.map((fact) => (
                                <div key={fact.label} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                  <div className="text-xs font-medium text-gray-500 mb-1">{fact.label}</div>
                                  <div className="text-sm font-semibold text-gray-900">{fact.value}</div>
                                </div>
                              ))}
                            </div>
                          )}
                          <Link
                            href={`/visa-guides/do-i-need-a-visa/${article.slug}`}
                            className="inline-flex items-center gap-2 text-sm text-teal-600 hover:text-teal-700 font-medium"
                          >
                            Read the full guide
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-8">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                <span className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
