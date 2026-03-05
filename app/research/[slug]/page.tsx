import { notFound, redirect } from 'next/navigation';
import { Metadata } from 'next';

const KNOWN_RESEARCH_SLUGS: Record<string, string> = {
  'most-powerful-passports-2026': '/research/most-powerful-passports-2026',
  'best-passports-for-visa-free-travel-in-asia-2026': '/research/best-passports-for-visa-free-travel-in-asia-2026',
  'onward-ticket-requirements-by-country': '/research/onward-ticket-requirements-by-country',
  'passport-validity-rules-by-country': '/research/passport-validity-rules-by-country',
  'schengen-90-180-rule-explained': '/research/schengen-90-180-rule-explained',
  'visa-free-vs-visa-on-arrival-vs-evisa': '/research/visa-free-vs-visa-on-arrival-vs-evisa',
};

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  if (!KNOWN_RESEARCH_SLUGS[slug]) {
    return {
      title: 'Research Not Found | VisaInfoGuide',
      robots: { index: false, follow: false },
    };
  }
  return {
    title: 'Redirecting... | VisaInfoGuide',
  };
}

export default function ResearchSlugPage({ params }: Props) {
  const { slug } = params;

  if (KNOWN_RESEARCH_SLUGS[slug]) {
    redirect(KNOWN_RESEARCH_SLUGS[slug]);
  }

  notFound();
}
