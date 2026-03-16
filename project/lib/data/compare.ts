import { unstable_cache } from 'next/cache';
import { supabase } from '@/lib/supabase';

export interface PassportCompareData {
  slug: string;
  name: string;
  total: number;
  visaFree: number;
  visaOnArrival: number;
  evisa: number;
  visaRequired: number;
}

export interface CompareResult {
  passport1: PassportCompareData;
  passport2?: PassportCompareData;
}

const PASSPORT_NAMES: Record<string, string> = {
  argentina: 'Argentina',
  australia: 'Australia',
  austria: 'Austria',
  belgium: 'Belgium',
  brazil: 'Brazil',
  canada: 'Canada',
  chile: 'Chile',
  china: 'China',
  colombia: 'Colombia',
  croatia: 'Croatia',
  'czech-republic': 'Czech Republic',
  denmark: 'Denmark',
  egypt: 'Egypt',
  finland: 'Finland',
  france: 'France',
  germany: 'Germany',
  greece: 'Greece',
  hungary: 'Hungary',
  india: 'India',
  indonesia: 'Indonesia',
  ireland: 'Ireland',
  israel: 'Israel',
  italy: 'Italy',
  japan: 'Japan',
  mexico: 'Mexico',
  morocco: 'Morocco',
  netherlands: 'Netherlands',
  'new-zealand': 'New Zealand',
  nigeria: 'Nigeria',
  norway: 'Norway',
  peru: 'Peru',
  philippines: 'Philippines',
  poland: 'Poland',
  portugal: 'Portugal',
  qatar: 'Qatar',
  romania: 'Romania',
  singapore: 'Singapore',
  'south-africa': 'South Africa',
  spain: 'Spain',
  sweden: 'Sweden',
  switzerland: 'Switzerland',
  thailand: 'Thailand',
  ukraine: 'Ukraine',
  'united-arab-emirates': 'United Arab Emirates',
  'united-kingdom': 'United Kingdom',
  'united-states': 'United States',
  vietnam: 'Vietnam',
};

async function fetchPassportStats(slug: string): Promise<PassportCompareData | null> {
  try {
    const { data, error } = await supabase
      .from('visa_rules')
      .select('visa_type')
      .eq('passport_slug', slug);

    if (error || !data || data.length === 0) return null;

    const counts = { visaFree: 0, visaOnArrival: 0, evisa: 0, visaRequired: 0 };
    for (const row of data) {
      const t = (row.visa_type || '').toLowerCase();
      if (t === 'visa_free' || t === 'visa-free' || t === 'visa free') counts.visaFree++;
      else if (t === 'visa_on_arrival' || t === 'voa' || t === 'visa on arrival') counts.visaOnArrival++;
      else if (t === 'evisa' || t === 'e-visa' || t === 'electronic') counts.evisa++;
      else counts.visaRequired++;
    }

    return {
      slug,
      name: PASSPORT_NAMES[slug] || slug,
      total: counts.visaFree + counts.visaOnArrival + counts.evisa,
      visaFree: counts.visaFree,
      visaOnArrival: counts.visaOnArrival,
      evisa: counts.evisa,
      visaRequired: counts.visaRequired,
    };
  } catch {
    return null;
  }
}

const getCachedPassportStats = unstable_cache(
  fetchPassportStats,
  ['compare-passport-stats'],
  { revalidate: 86400, tags: ['compare'] }
);

export async function getCompareData(
  passport1Slug: string,
  passport2Slug?: string
): Promise<CompareResult | null> {
  const p1 = await getCachedPassportStats(passport1Slug);
  if (!p1) return null;

  const result: CompareResult = { passport1: p1 };

  if (passport2Slug) {
    const p2 = await getCachedPassportStats(passport2Slug);
    if (p2) result.passport2 = p2;
  }

  return result;
}

export function isKnownPassport(slug: string): boolean {
  return slug in PASSPORT_NAMES;
}
