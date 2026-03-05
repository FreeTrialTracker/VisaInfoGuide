import { unstable_cache } from 'next/cache';
import { supabase } from '@/lib/supabase';
import { VisaRule } from '@/lib/supabase';

export interface PairPageData {
  passport: {
    slug: string;
    name: string;
    is_active: boolean;
    updated_at: string;
  };
  destination: {
    slug: string;
    name: string;
    is_active: boolean;
    updated_at: string;
  };
  visa_rules: Array<VisaRule & { priority_order?: number }>;
}

async function fetchPairPageDataRaw(
  passportSlug: string,
  destinationSlug: string
): Promise<PairPageData | null> {
  const { data, error } = await supabase.rpc('get_pair_page_data', {
    p_passport: passportSlug.trim().toLowerCase(),
    p_destination: destinationSlug.trim().toLowerCase(),
  });

  if (error) {
    throw new Error(`rpc_error:${error.code}:${error.message}`);
  }

  if (data === null || data === undefined) {
    return null;
  }

  return data as PairPageData;
}

export const getPairPageData = unstable_cache(
  fetchPairPageDataRaw,
  ['pair-page-data'],
  { revalidate: 86400, tags: ['pair'] }
);
