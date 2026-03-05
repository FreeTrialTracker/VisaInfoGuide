import { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, GitCompare, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Travel Tools | VisaInfoGuide',
  description: 'Free travel planning tools to help you understand visa requirements, calculate Schengen days, and plan your international trips with confidence.',
  alternates: {
    canonical: 'https://visainfoguide.com/tools',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Travel Tools | VisaInfoGuide',
    description: 'Free travel planning tools to help you understand visa requirements, calculate Schengen days, and plan your international trips with confidence.',
    url: 'https://visainfoguide.com/tools',
    type: 'website',
    images: [
      {
        url: 'https://visainfoguide.com/og/tools-og',
        width: 1200,
        height: 630,
        alt: 'Travel Tools - VisaInfoGuide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Travel Tools | VisaInfoGuide',
    description: 'Free travel planning tools to help you understand visa requirements, calculate Schengen days, and plan your international trips with confidence.',
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
            <h2 className="text-lg font-semibold text-gray-900 mb-2">More tools coming soon</h2>
            <p className="text-gray-600">
              We're working on additional tools to help you plan your travels. Have a suggestion? We'd love to hear from you.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
