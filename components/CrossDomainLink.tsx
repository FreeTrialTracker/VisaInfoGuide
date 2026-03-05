import { ArrowRight } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

interface CrossDomainLinkProps {
  visaSlug: string;
  siteType: 'visa' | 'immigration';
}

const VISA_ANCHORS = [
  'Immigration options for this country',
  'Residency pathways and long-term visas',
  'Work visa requirements and pathways',
  'Permanent residence guide',
];

const IMMIGRATION_ANCHORS = [
  'Tourist visa requirements and entry rules',
  'Entry visa regulations for visitors',
  'Short-stay visa information',
];

function pickAnchor(anchors: string[], slug: string): string {
  const index = slug.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % anchors.length;
  return anchors[index];
}

function isAbsoluteHttps(url: string): boolean {
  return url.startsWith('https://');
}

export default async function CrossDomainLink({ visaSlug, siteType }: CrossDomainLinkProps) {
  let row: { visa_url: string; immigration_url: string } | null = null;

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data } = await supabase
      .from('country_crosslinks')
      .select('visa_url, immigration_url')
      .eq('visa_slug', visaSlug)
      .eq('is_active', true)
      .maybeSingle();

    row = data;
  } catch {
    return null;
  }

  if (!row) return null;

  if (siteType === 'visa') {
    const href = row.immigration_url;
    if (!isAbsoluteHttps(href)) return null;
    const anchor = pickAnchor(VISA_ANCHORS, visaSlug);

    return (
      <aside className="my-10 rounded-xl border border-sky-200 bg-sky-50 px-6 py-5">
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-sky-600">
          Planning Long-Term?
        </p>
        <p className="mb-3 text-sm text-gray-700">
          If you are considering work, residency, or permanent relocation, explore detailed
          immigration pathways below.
        </p>
        <a
          href={href}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-sky-700 hover:text-sky-900 hover:underline transition-colors"
        >
          {anchor}
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </aside>
    );
  }

  const href = row.visa_url;
  if (!isAbsoluteHttps(href)) return null;
  const anchor = pickAnchor(IMMIGRATION_ANCHORS, visaSlug);

  return (
    <aside className="my-10 rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-5">
      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-emerald-600">
        Visiting First?
      </p>
      <p className="mb-3 text-sm text-gray-700">
        Before applying for residency, review short-stay visa requirements and entry regulations.
      </p>
      <a
        href={href}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 hover:text-emerald-900 hover:underline transition-colors"
      >
        {anchor}
        <ArrowRight className="h-3.5 w-3.5" />
      </a>
    </aside>
  );
}
