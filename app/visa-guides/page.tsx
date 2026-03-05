import { Metadata } from 'next';
import Link from 'next/link';
import { canonicalUrl, breadcrumbJsonLd } from '@/lib/seo';
import { FileText, Globe, MapPin, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Breadcrumbs from '@/components/Breadcrumbs';

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
        </div>
      </div>
    </>
  );
}
