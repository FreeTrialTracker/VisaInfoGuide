/*
  # Create research_articles table

  ## Summary
  Creates a structured content table for long-form research articles at /research/[slug].
  Each row stores a full article including metadata, rich JSX-serializable content blocks,
  FAQ items, related resources, and JSON-LD schema data.

  ## New Tables

  ### research_articles
  - `id` (uuid, PK) — row identifier
  - `slug` (text, unique, not null) — URL-safe slug matching the /research/[slug] route
  - `title` (text, not null) — full H1 page title
  - `meta_title` (text, not null) — SEO <title> tag content
  - `meta_description` (text, not null) — SEO meta description
  - `og_title` (text) — Open Graph title override
  - `og_description` (text) — Open Graph description override
  - `intro` (text, not null) — lead paragraph shown under the H1
  - `callout_type` (text) — 'info' | 'warning' | 'success' — controls callout accent color
  - `callout_title` (text) — bold heading inside the top callout box
  - `callout_bullets` (text[]) — bullet list inside the callout box
  - `author` (text, not null, default 'VisaInfoGuide.com')
  - `date_published` (date, not null)
  - `date_modified` (date, not null)
  - `word_count` (int4)
  - `faqs` (jsonb) — array of {question: string, answer: string}
  - `related_slugs` (text[]) — slugs of other research articles to show in "Related" grid
  - `is_published` (boolean, default true)
  - `created_at` (timestamptz, default now())
  - `updated_at` (timestamptz, default now())

  ## Security
  - RLS enabled — public SELECT allowed for published articles only
  - No INSERT/UPDATE/DELETE policies for anon/authenticated users (admin via service role only)

  ## Notes
  1. Content sections are stored in a separate `research_article_sections` table to avoid
     unbounded jsonb blobs and allow granular ordering.
  2. The `faqs` column stores a jsonb array for FAQ schema generation.
  3. `related_slugs` is a simple text array — the app resolves titles/descriptions at query time.
*/

CREATE TABLE IF NOT EXISTS research_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  meta_title text NOT NULL,
  meta_description text NOT NULL,
  og_title text,
  og_description text,
  intro text NOT NULL,
  callout_type text DEFAULT 'info' CHECK (callout_type IN ('info', 'warning', 'success')),
  callout_title text,
  callout_bullets text[],
  author text NOT NULL DEFAULT 'VisaInfoGuide.com',
  date_published date NOT NULL,
  date_modified date NOT NULL,
  word_count int4,
  faqs jsonb DEFAULT '[]'::jsonb,
  related_slugs text[] DEFAULT '{}'::text[],
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

/*
  Content sections for research articles — each row is one H2 block with body text,
  optional data tables, callouts, and sub-sections.
*/
CREATE TABLE IF NOT EXISTS research_article_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid NOT NULL REFERENCES research_articles(id) ON DELETE CASCADE,
  sort_order int2 NOT NULL DEFAULT 0,
  heading text NOT NULL,
  body text,
  subsections jsonb DEFAULT '[]'::jsonb,
  table_data jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS research_articles_slug_idx ON research_articles (slug);
CREATE INDEX IF NOT EXISTS research_articles_published_idx ON research_articles (is_published);
CREATE INDEX IF NOT EXISTS research_article_sections_article_id_idx ON research_article_sections (article_id, sort_order);

ALTER TABLE research_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_article_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published research articles"
  ON research_articles
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Public can read sections of published articles"
  ON research_article_sections
  FOR SELECT
  TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM research_articles ra
      WHERE ra.id = research_article_sections.article_id
        AND ra.is_published = true
    )
  );
