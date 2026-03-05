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
  const tag = searchParams.get('tag') || '';
  const pageSize = 5;
  const offset = (page - 1) * pageSize;

  let query = supabase
    .from('blog_posts')
    .select('id, slug, title, excerpt, author, read_time_minutes, published_at, tags', { count: 'exact' })
    .order('published_at', { ascending: false })
    .range(offset, offset + pageSize - 1);

  if (search) {
    query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
  }

  if (tag) {
    query = query.contains('tags', [tag]);
  }

  const { data, error, count } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ posts: data, total: count, page, pageSize });
}
