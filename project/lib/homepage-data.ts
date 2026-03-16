import 'server-only';
import { createServerClient } from '@supabase/ssr';
import type { Passport, Destination } from '@/lib/supabase';

export async function getFinderData(): Promise<{ passports: Passport[]; destinations: Destination[] }> {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get() {
          return undefined;
        },
        set() {},
        remove() {},
      },
    }
  );

  const [passportsResult, destinationsResult] = await Promise.all([
    supabase
      .from('passports')
      .select('slug, name, is_active, created_at, updated_at')
      .eq('is_active', true)
      .order('name'),
    supabase
      .from('destinations')
      .select('slug, name, is_active, created_at, updated_at')
      .eq('is_active', true)
      .order('name'),
  ]);

  return {
    passports: (passportsResult.data as Passport[]) || [],
    destinations: (destinationsResult.data as Destination[]) || [],
  };
}
