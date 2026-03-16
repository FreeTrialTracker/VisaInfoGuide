import { unstable_cache } from 'next/cache';
import { supabase } from '@/lib/supabase';

export interface NewsPost {
  id: string;
  title: string;
  slug: string;
  published_at: string;
  summary: string;
  hashtags: string[];
  source_label: string;
  source_url: string;
  content: Array<{
    type: 'paragraph' | 'section' | 'list' | 'callout';
    icon?: string;
    heading?: string;
    text?: string;
    bold?: string[];
    items?: { icon?: string; text: string; bold?: string[] }[];
  }>;
  external_links: Array<{ label: string; url: string }>;
}

async function fetchNewsIndex(): Promise<NewsPost[]> {
  try {
    const { data, error } = await supabase
      .from('news_posts')
      .select('id, title, slug, published_at, summary, hashtags, source_label, source_url, external_links')
      .order('published_at', { ascending: false });
    if (error) return [];
    return (data ?? []) as NewsPost[];
  } catch {
    return [];
  }
}

async function fetchNewsPost(slug: string): Promise<NewsPost | null> {
  try {
    const { data, error } = await supabase
      .from('news_posts')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();
    if (error || !data) return null;
    return data as NewsPost;
  } catch {
    return null;
  }
}

export const getNewsIndex = unstable_cache(
  fetchNewsIndex,
  ['news-index'],
  { revalidate: 3600, tags: ['news'] }
);

export function getNewsPost(slug: string) {
  return unstable_cache(
    () => fetchNewsPost(slug),
    ['news-post', slug],
    { revalidate: 3600, tags: ['news'] }
  )();
}

export async function getNewsPostSlugs(): Promise<string[]> {
  try {
    const { data } = await supabase
      .from('news_posts')
      .select('slug')
      .order('published_at', { ascending: false })
      .limit(200);
    return (data ?? []).map((p: { slug: string }) => p.slug);
  } catch {
    return [];
  }
}
