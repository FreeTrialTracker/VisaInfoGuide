import { revalidateTag, revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_TAGS = new Set([
  'passport',
  'destination',
  'blog',
  'news',
  'passport-rankings',
  'evisa-destinations',
  'region-visa-free',
  'visa-free-destinations',
  'route-data',
  'related-routes',
]);

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-revalidate-secret') ??
    new URL(req.url).searchParams.get('secret');

  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { tag, tags, path, paths } = body as {
    tag?: string;
    tags?: string[];
    path?: string;
    paths?: string[];
  };

  const resolvedTags: string[] = [
    ...(tag ? [tag] : []),
    ...(Array.isArray(tags) ? tags : []),
  ];

  const resolvedPaths: string[] = [
    ...(path ? [path] : []),
    ...(Array.isArray(paths) ? paths : []),
  ];

  if (resolvedTags.length === 0 && resolvedPaths.length === 0) {
    return NextResponse.json(
      { error: 'Provide at least one of: tag, tags, path, paths' },
      { status: 400 }
    );
  }

  const invalidTags = resolvedTags.filter(t => !ALLOWED_TAGS.has(t));
  if (invalidTags.length > 0) {
    return NextResponse.json(
      { error: `Unknown tags: ${invalidTags.join(', ')}`, allowed: Array.from(ALLOWED_TAGS) },
      { status: 400 }
    );
  }

  const revalidatedTags: string[] = [];
  const revalidatedPaths: string[] = [];
  const errors: string[] = [];

  for (const t of resolvedTags) {
    try {
      revalidateTag(t);
      revalidatedTags.push(t);
    } catch (err) {
      errors.push(`tag:${t}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  for (const p of resolvedPaths) {
    try {
      revalidatePath(p);
      revalidatedPaths.push(p);
    } catch (err) {
      errors.push(`path:${p}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  const status = errors.length > 0 && revalidatedTags.length === 0 && revalidatedPaths.length === 0
    ? 500
    : 200;

  return NextResponse.json(
    {
      revalidated: true,
      tags: revalidatedTags,
      paths: revalidatedPaths,
      ...(errors.length > 0 ? { errors } : {}),
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}

export async function GET(req: NextRequest) {
  const secret = new URL(req.url).searchParams.get('secret');

  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({
    endpoint: '/api/revalidate',
    method: 'POST',
    auth: 'Header: x-revalidate-secret or ?secret= query param',
    body: {
      tag: 'string — single cache tag',
      tags: 'string[] — multiple cache tags',
      path: 'string — single path to revalidate',
      paths: 'string[] — multiple paths',
    },
    allowed_tags: Array.from(ALLOWED_TAGS),
  });
}
