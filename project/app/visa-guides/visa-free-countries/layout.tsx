import { Metadata } from 'next';
import { canonicalUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Visa-Free Countries by Passport (2026 Complete Directory)',
  description: 'Comprehensive directory of visa-free countries, visa on arrival, and eTA destinations for every passport in 2026. Check which countries you can visit without a visa based on your nationality.',
  alternates: {
    canonical: canonicalUrl('/visa-guides/visa-free-countries'),
  },
  openGraph: {
    title: 'Visa-Free Countries by Passport (2026 Complete Directory)',
    description: 'Comprehensive directory of visa-free countries, visa on arrival, and eTA destinations for every passport in 2026. Check which countries you can visit without a visa based on your nationality.',
    type: 'website',
    url: canonicalUrl('/visa-guides/visa-free-countries'),
    siteName: 'VisaInfoGuide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visa-Free Countries by Passport (2026 Complete Directory)',
    description: 'Comprehensive directory of visa-free countries, visa on arrival, and eTA destinations for every passport in 2026.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function VisaFreeCountriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
