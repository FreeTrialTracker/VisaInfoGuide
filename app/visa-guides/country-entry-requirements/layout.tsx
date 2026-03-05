import { Metadata } from 'next';
import { canonicalUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Country Entry Requirements & Visa Policies (2026 Complete Guide)',
  description: 'Complete directory of entry requirements and visa policies for every destination country in 2026. Check passport validity rules, visa requirements, required documents, and stay duration limits by destination.',
  alternates: {
    canonical: canonicalUrl('/visa-guides/country-entry-requirements'),
  },
  openGraph: {
    title: 'Country Entry Requirements & Visa Policies (2026 Complete Guide)',
    description: 'Complete directory of entry requirements and visa policies for every destination country in 2026. Check passport validity rules, visa requirements, required documents, and stay duration limits by destination.',
    type: 'website',
    url: canonicalUrl('/visa-guides/country-entry-requirements'),
    siteName: 'VisaInfoGuide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Country Entry Requirements & Visa Policies (2026 Complete Guide)',
    description: 'Complete directory of entry requirements and visa policies for every destination country in 2026.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CountryEntryRequirementsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
