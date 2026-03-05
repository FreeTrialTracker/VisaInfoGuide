import { unstable_cache } from 'next/cache';
import { supabase } from '@/lib/supabase';

export interface DestinationPageData {
  destination: {
    slug: string;
    name: string;
    is_active: boolean;
    updated_at: string;
  };
  visa_rules: Array<{
    id: string;
    passport_slug: string;
    destination_slug: string;
    visa_type: string;
    max_stay_days: number | null;
    stay_rule: string | null;
    stay_window_days: number | null;
    last_verified: string;
    notes: string | null;
    passport_name: string | null;
  }>;
}

async function fetchDestinationPageDataRaw(slug: string): Promise<DestinationPageData | null> {
  const normalizedSlug = slug.trim().toLowerCase();
  const { data, error } = await supabase.rpc('get_destination_page_data', { p_slug: normalizedSlug });

  if (error) {
    throw new Error(`rpc_error:${error.code}:${error.message}`);
  }

  if (data === null || data === undefined) {
    return null;
  }

  return data as DestinationPageData;
}

export const getDestinationPageData = unstable_cache(
  fetchDestinationPageDataRaw,
  ['destination-page-data'],
  { revalidate: 86400, tags: ['destination'] }
);
