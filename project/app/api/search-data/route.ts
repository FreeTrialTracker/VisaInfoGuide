import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  try {
    const [passportsResult, destinationsResult] = await Promise.all([
      supabase.from('passports').select('slug, name').eq('is_active', true).order('name'),
      supabase.from('destinations').select('slug, name').eq('is_active', true).order('name'),
    ]);

    if (passportsResult.error) throw passportsResult.error;
    if (destinationsResult.error) throw destinationsResult.error;

    return NextResponse.json({
      passports: passportsResult.data || [],
      destinations: destinationsResult.data || [],
    });
  } catch (error) {
    console.error('Error fetching search data:', error);
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
  }
}
