import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  const checks: Record<string, { ok: boolean; error: string | null; detail?: string }> = {};

  try {
    const { data, error } = await supabase
      .rpc('get_passport_page_data', { p_slug: 'united-states' });

    if (error) {
      checks.rpc_get_passport_page_data = {
        ok: false,
        error: error.message,
        detail: `code=${error.code}`,
      };
    } else {
      checks.rpc_get_passport_page_data = {
        ok: true,
        error: null,
        detail: data ? 'returned data' : 'returned null (slug not in db)',
      };
    }
  } catch (err) {
    checks.rpc_get_passport_page_data = {
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }

  try {
    const { error } = await supabase
      .from('passports')
      .select('slug')
      .limit(1);

    checks.table_passports_read = {
      ok: !error,
      error: error ? error.message : null,
    };
  } catch (err) {
    checks.table_passports_read = {
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }

  try {
    const { error } = await supabase
      .rpc('get_destination_page_data', { p_slug: 'france' });

    checks.rpc_get_destination_page_data = {
      ok: !error,
      error: error ? error.message : null,
    };
  } catch (err) {
    checks.rpc_get_destination_page_data = {
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }

  const allOk = Object.values(checks).every(c => c.ok);

  return NextResponse.json(
    { ok: allOk, checks },
    { status: allOk ? 200 : 503 }
  );
}
