import { unstable_cache } from 'next/cache';
import { supabase } from '@/lib/supabase';

export interface BlogContentBlock {
  type: 'intro' | 'section' | 'faq' | 'callout';
  heading?: string;
  text?: string;
  list?: string[];
  calloutType?: 'tip' | 'warn' | 'info';
  callout?: { type: 'tip' | 'warn' | 'info'; text: string };
  items?: { q: string; a: string }[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  meta_description: string;
  focus_keyword: string;
  author: string;
  read_time_minutes: number;
  published_at: string;
  updated_at: string;
  excerpt: string;
  content: BlogContentBlock[];
  tags: string[];
  related_slugs: string[];
}

const BLOG_LIST_SELECT = 'id, slug, title, excerpt, author, read_time_minutes, published_at, tags';

async function fetchBlogIndex(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(BLOG_LIST_SELECT)
      .order('published_at', { ascending: false });
    if (error) return [];
    return (data ?? []) as BlogPost[];
  } catch {
    return [];
  }
}

async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();
    if (error || !data) return null;
    return data as BlogPost;
  } catch {
    return null;
  }
}

export const getBlogIndex = unstable_cache(
  fetchBlogIndex,
  ['blog-index'],
  { revalidate: 3600, tags: ['blog'] }
);

export function getBlogPost(slug: string): Promise<BlogPost | null> {
  return unstable_cache(
    () => fetchBlogPost(slug),
    [`blog-post-${slug}`],
    { revalidate: 3600, tags: ['blog', `blog-post-${slug}`] }
  )();
}

export async function getBlogPostSlugs(): Promise<string[]> {
  try {
    const { data } = await supabase
      .from('blog_posts')
      .select('slug')
      .order('published_at', { ascending: false })
      .limit(200);
    return (data ?? []).map((p: { slug: string }) => p.slug);
  } catch {
    return [];
  }
}
