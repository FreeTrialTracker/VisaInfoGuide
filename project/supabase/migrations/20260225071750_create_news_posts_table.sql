/*
  # Create News Posts Table

  1. New Tables
    - `news_posts`
      - `id` (uuid, primary key)
      - `title` (text) - headline of the post
      - `slug` (text, unique) - URL-friendly identifier
      - `published_at` (timestamptz) - publication date
      - `summary` (text) - short teaser/description
      - `content` (jsonb) - structured content blocks (sections, paragraphs, lists)
      - `hashtags` (text[]) - array of hashtag strings
      - `source_label` (text) - source attribution label
      - `source_url` (text) - external source URL
      - `external_links` (jsonb) - array of {label, url} objects
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Public can read published posts
    - No unauthenticated writes allowed

  3. Indexes
    - Index on published_at DESC for fast latest-first queries
    - Index on slug for lookups
*/

CREATE TABLE IF NOT EXISTS news_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  published_at timestamptz NOT NULL DEFAULT now(),
  summary text NOT NULL DEFAULT '',
  content jsonb NOT NULL DEFAULT '[]',
  hashtags text[] NOT NULL DEFAULT '{}',
  source_label text NOT NULL DEFAULT '',
  source_url text NOT NULL DEFAULT '',
  external_links jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE news_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read news posts"
  ON news_posts FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS news_posts_published_at_idx ON news_posts (published_at DESC);
CREATE INDEX IF NOT EXISTS news_posts_slug_idx ON news_posts (slug);
