import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const search = searchParams.get('q') || '';
  const pageSize = Math.min(parseInt(searchParams.get('pageSize') || '5', 10), 20);
  const offset = (page - 1) * pageSize;

  let query = supabase
    .from('news_posts')
    .select('id, title, slug, published_at, summary, hashtags, source_label, source_url, content, external_links', { count: 'exact' })
    .order('published_at', { ascending: false })
    .range(offset, offset + pageSize - 1);

  if (search) {
    query = query.or(`title.ilike.%${search}%,summary.ilike.%${search}%`);
  }

  const { data, error, count } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ posts: data, total: count, page, pageSize });
}
