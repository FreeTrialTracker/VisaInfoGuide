import { unstable_cache } from 'next/cache';
import { supabase } from '@/lib/supabase';

export interface ResearchFAQ {
  question: string;
  answer: string;
}

export interface ResearchSubsection {
  heading: string;
  body: string;
}

export interface ResearchSection {
  heading: string;
  body?: string;
  subsections?: ResearchSubsection[];
  table_data?: {
    headers: string[];
    rows: (string | number)[][];
  };
}

export interface ResearchArticle {
  id: string;
  slug: string;
  title: string;
  meta_title: string;
  meta_description: string;
  og_title: string | null;
  og_description: string | null;
  intro: string;
  callout_type: 'info' | 'warning' | 'success';
  callout_title: string | null;
  callout_bullets: string[] | null;
  author: string;
  date_published: string;
  date_modified: string;
  word_count: number | null;
  faqs: ResearchFAQ[];
  related_slugs: string[];
  sections: ResearchSection[];
}

export const getResearchArticleBySlug = unstable_cache(
  async (slug: string): Promise<ResearchArticle | null> => {
    const { data: article, error } = await supabase
      .from('research_articles')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .maybeSingle();

    if (error || !article) return null;

    const { data: sections, error: secError } = await supabase
      .from('research_article_sections')
      .select('*')
      .eq('article_id', article.id)
      .order('sort_order', { ascending: true });

    if (secError) return null;

    return {
      ...article,
      faqs: Array.isArray(article.faqs) ? article.faqs : [],
      related_slugs: Array.isArray(article.related_slugs) ? article.related_slugs : [],
      sections: (sections ?? []).map((s) => ({
        heading: s.heading,
        body: s.body ?? undefined,
        subsections: Array.isArray(s.subsections) ? s.subsections : undefined,
        table_data: s.table_data ?? undefined,
      })),
    };
  },
  ['research-article'],
  { revalidate: 3600, tags: ['research'] }
);

export const getAllPublishedResearchSlugs = unstable_cache(
  async (): Promise<string[]> => {
    const { data, error } = await supabase
      .from('research_articles')
      .select('slug')
      .eq('is_published', true)
      .order('date_published', { ascending: false });

    if (error || !data) return [];
    return data.map((r) => r.slug);
  },
  ['research-slugs'],
  { revalidate: 3600, tags: ['research'] }
);

export const getAllPublishedResearchArticles = unstable_cache(
  async (): Promise<Pick<ResearchArticle, 'slug' | 'title' | 'meta_description' | 'date_published' | 'date_modified'>[]> => {
    const { data, error } = await supabase
      .from('research_articles')
      .select('slug, title, meta_description, date_published, date_modified')
      .eq('is_published', true)
      .order('date_published', { ascending: false });

    if (error || !data) return [];
    return data;
  },
  ['research-articles-list'],
  { revalidate: 3600, tags: ['research'] }
);
