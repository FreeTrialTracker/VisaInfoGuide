import { unstable_cache } from 'next/cache';
import { supabase } from '@/lib/supabase';
import { COUNTRIES } from '@/lib/countries';

const ALLOWED_SLUGS = new Set(COUNTRIES.map(c => c.slug));

export interface PassportPageData {
  passport: {
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
    visa_subtype: string | null;
    destination_name: string | null;
  }>;
}

const ERR_NOT_FOUND = 'PASSPORT_NOT_FOUND';

function notFoundError(): Error {
  const e = new Error(ERR_NOT_FOUND);
  (e as NodeJS.ErrnoException).code = ERR_NOT_FOUND;
  return e;
}

function isNotFoundError(err: unknown): boolean {
  return (
    err instanceof Error &&
    ((err as NodeJS.ErrnoException).code === ERR_NOT_FOUND || err.message === ERR_NOT_FOUND)
  );
}

function isRpcMissingError(msg: string): boolean {
  return (
    msg.includes('does not exist') ||
    msg.includes('could not find') ||
    msg.includes('undefined function') ||
    msg.includes('PGRST202')
  );
}

async function fetchViaRpc(slug: string): Promise<PassportPageData> {
  const { data, error } = await supabase.rpc('get_passport_page_data', { p_slug: slug });

  if (error) {
    const msg = error.message ?? String(error);
    if (isRpcMissingError(msg) || error.code === 'PGRST202') {
      throw new Error(`rpc_unavailable:${msg}`);
    }
    throw new Error(`rpc_error:${error.code}:${msg}`);
  }

  if (data === null || data === undefined) {
    throw notFoundError();
  }

  const result = data as PassportPageData;
  result.visa_rules = result.visa_rules.filter(r => ALLOWED_SLUGS.has(r.destination_slug));
  return result;
}

async function fetchViaDirectQuery(slug: string): Promise<PassportPageData> {
  const { data: passport, error: passportError } = await supabase
    .from('passports')
    .select('slug, name, is_active, updated_at')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle();

  if (passportError) {
    throw new Error(`db_error:${passportError.message}`);
  }

  if (!passport) {
    throw notFoundError();
  }

  const { data: rules, error: rulesError } = await supabase
    .from('visa_rules')
    .select(`
      id,
      passport_slug,
      destination_slug,
      visa_type,
      max_stay_days,
      stay_rule,
      stay_window_days,
      last_verified,
      notes,
      visa_subtype,
      destinations!destination_slug (name)
    `)
    .eq('passport_slug', slug)
    .neq('destination_slug', slug)
    .in('destination_slug', Array.from(ALLOWED_SLUGS));

  if (rulesError) {
    throw new Error(`db_error:${rulesError.message}`);
  }

  const visa_rules = (rules ?? []).map((r: Record<string, unknown>) => {
    const dest = r.destinations as { name?: string } | null;
    return {
      id: r.id as string,
      passport_slug: r.passport_slug as string,
      destination_slug: r.destination_slug as string,
      visa_type: r.visa_type as string,
      max_stay_days: r.max_stay_days as number | null,
      stay_rule: r.stay_rule as string | null,
      stay_window_days: r.stay_window_days as number | null,
      last_verified: r.last_verified as string,
      notes: r.notes as string | null,
      visa_subtype: r.visa_subtype as string | null,
      destination_name: dest?.name ?? null,
    };
  });

  return { passport, visa_rules };
}

async function fetchPassportPageDataRaw(slug: string): Promise<PassportPageData | null> {
  const normalizedSlug = slug.trim().toLowerCase();

  try {
    return await fetchViaRpc(normalizedSlug);
  } catch (err) {
    if (isNotFoundError(err)) {
      return null;
    }

    const msg = err instanceof Error ? err.message : String(err);

    if (msg.startsWith('rpc_unavailable:')) {
      console.warn(`[passport] RPC unavailable, falling back to direct query. slug="${normalizedSlug}" err="${msg}"`);
      try {
        return await fetchViaDirectQuery(normalizedSlug);
      } catch (fallbackErr) {
        if (isNotFoundError(fallbackErr)) return null;
        throw fallbackErr;
      }
    }

    console.error(`[passport] Error loading slug="${normalizedSlug}": ${msg}`);
    throw err;
  }
}

export const getPassportPageData = unstable_cache(
  fetchPassportPageDataRaw,
  ['passport-page-data'],
  { revalidate: 86400, tags: ['passport'] }
);
