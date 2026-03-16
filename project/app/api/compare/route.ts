import { NextRequest, NextResponse } from 'next/server';
import { getCompareData, isKnownPassport } from '@/lib/data/compare';

const CACHE_HEADERS = {
  'Cache-Control': 'public, max-age=300, stale-while-revalidate=86400',
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const passport1 = searchParams.get('passport1') || '';
  const passport2 = searchParams.get('passport2') || '';

  if (!passport1) {
    return NextResponse.json(
      { ok: false, error: 'passport1 is required' },
      { status: 400, headers: CACHE_HEADERS }
    );
  }

  if (!isKnownPassport(passport1)) {
    return NextResponse.json(
      { ok: false, error: 'Unknown passport slug' },
      { status: 404, headers: CACHE_HEADERS }
    );
  }

  try {
    const timeoutPromise = new Promise<null>((resolve) =>
      setTimeout(() => resolve(null), 2500)
    );

    const dataPromise = getCompareData(
      passport1,
      passport2 && isKnownPassport(passport2) ? passport2 : undefined
    );

    const result = await Promise.race([dataPromise, timeoutPromise]);

    if (!result) {
      return NextResponse.json(
        { ok: false, error: 'Data temporarily unavailable' },
        { status: 200, headers: CACHE_HEADERS }
      );
    }

    return NextResponse.json(
      { ok: true, data: result },
      { status: 200, headers: CACHE_HEADERS }
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Internal error' },
      { status: 200, headers: CACHE_HEADERS }
    );
  }
}
