/*
  # Add RPC functions for single-query page data + performance indexes

  ## Overview
  Creates three RPC (stored procedure) functions that fetch everything a page
  needs in ONE database round-trip instead of multiple sequential queries.
  Also adds indexes to ensure fast slug lookups.

  ## New Functions

  ### get_passport_page_data(p_slug text)
  Returns a JSON payload with:
  - passport record (id, slug, name, is_active, updated_at)
  - visa_rules array with destination names joined in
  Returns NULL json if passport not found.

  ### get_destination_page_data(p_slug text)
  Returns a JSON payload with:
  - destination record
  - visa_rules array with passport names joined in
  Returns NULL json if destination not found.

  ### get_pair_page_data(p_passport text, p_destination text)
  Returns a JSON payload with:
  - passport record
  - destination record
  - visa_rules array for this pair (sorted by type priority)
  Returns NULL json if passport or destination not found.

  ## New Indexes

  ### passports_slug_idx
  Unique index on passports.slug for O(1) lookups.

  ### destinations_slug_idx
  Unique index on destinations.slug for O(1) lookups.

  ### visa_rules_passport_slug_idx
  Index on visa_rules.passport_slug for fast outbound queries.

  ### visa_rules_destination_slug_idx
  Index on visa_rules.destination_slug for fast inbound queries.

  ### visa_rules_pair_idx
  Composite index on (passport_slug, destination_slug) for O(1) pair lookup.

  ### news_posts_slug_idx
  Unique index on news_posts.slug for fast news slug lookups.

  ### news_posts_published_at_idx
  Index on news_posts.published_at DESC for fast ordered listing.

  ## Security
  Functions use SECURITY DEFINER with search_path = public so they execute
  with the permissions of the function owner (not the calling role), allowing
  the anon key to read data while RLS still controls direct table access.
*/

-- =====================
-- INDEXES
-- =====================

CREATE UNIQUE INDEX IF NOT EXISTS passports_slug_idx
  ON passports (slug);

CREATE UNIQUE INDEX IF NOT EXISTS destinations_slug_idx
  ON destinations (slug);

CREATE INDEX IF NOT EXISTS visa_rules_passport_slug_idx
  ON visa_rules (passport_slug);

CREATE INDEX IF NOT EXISTS visa_rules_destination_slug_idx
  ON visa_rules (destination_slug);

CREATE INDEX IF NOT EXISTS visa_rules_pair_idx
  ON visa_rules (passport_slug, destination_slug);

CREATE UNIQUE INDEX IF NOT EXISTS news_posts_slug_idx
  ON news_posts (slug);

CREATE INDEX IF NOT EXISTS news_posts_published_at_idx
  ON news_posts (published_at DESC);

-- =====================
-- RPC: get_passport_page_data
-- =====================

CREATE OR REPLACE FUNCTION get_passport_page_data(p_slug text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_passport RECORD;
  v_rules json;
BEGIN
  SELECT id, slug, name, is_active, updated_at
    INTO v_passport
    FROM passports
   WHERE slug = p_slug
     AND is_active = true
   LIMIT 1;

  IF NOT FOUND THEN
    RETURN NULL;
  END IF;

  SELECT json_agg(r ORDER BY r.destination_slug)
    INTO v_rules
    FROM (
      SELECT
        vr.id,
        vr.passport_slug,
        vr.destination_slug,
        vr.visa_type,
        vr.max_stay_days,
        vr.stay_rule,
        vr.stay_window_days,
        vr.last_verified,
        vr.notes,
        vr.visa_subtype,
        d.name AS destination_name
      FROM visa_rules vr
      LEFT JOIN destinations d ON d.slug = vr.destination_slug
      WHERE vr.passport_slug = p_slug
        AND vr.destination_slug <> p_slug
    ) r;

  RETURN json_build_object(
    'passport', row_to_json(v_passport),
    'visa_rules', COALESCE(v_rules, '[]'::json)
  );
END;
$$;

-- =====================
-- RPC: get_destination_page_data
-- =====================

CREATE OR REPLACE FUNCTION get_destination_page_data(p_slug text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_destination RECORD;
  v_rules json;
BEGIN
  SELECT id, slug, name, is_active, updated_at
    INTO v_destination
    FROM destinations
   WHERE slug = p_slug
     AND is_active = true
   LIMIT 1;

  IF NOT FOUND THEN
    RETURN NULL;
  END IF;

  SELECT json_agg(r ORDER BY r.passport_slug)
    INTO v_rules
    FROM (
      SELECT
        vr.id,
        vr.passport_slug,
        vr.destination_slug,
        vr.visa_type,
        vr.max_stay_days,
        vr.stay_rule,
        vr.stay_window_days,
        vr.last_verified,
        vr.notes,
        p.name AS passport_name
      FROM visa_rules vr
      LEFT JOIN passports p ON p.slug = vr.passport_slug
      WHERE vr.destination_slug = p_slug
        AND vr.passport_slug <> p_slug
    ) r;

  RETURN json_build_object(
    'destination', row_to_json(v_destination),
    'visa_rules', COALESCE(v_rules, '[]'::json)
  );
END;
$$;

-- =====================
-- RPC: get_pair_page_data
-- =====================

CREATE OR REPLACE FUNCTION get_pair_page_data(p_passport text, p_destination text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_passport RECORD;
  v_destination RECORD;
  v_rules json;
BEGIN
  SELECT id, slug, name, is_active, updated_at
    INTO v_passport
    FROM passports
   WHERE slug = p_passport
   LIMIT 1;

  IF NOT FOUND THEN
    RETURN NULL;
  END IF;

  SELECT id, slug, name, is_active, updated_at
    INTO v_destination
    FROM destinations
   WHERE slug = p_destination
   LIMIT 1;

  IF NOT FOUND THEN
    RETURN NULL;
  END IF;

  SELECT json_agg(r ORDER BY r.priority_order)
    INTO v_rules
    FROM (
      SELECT
        vr.*,
        CASE vr.visa_type
          WHEN 'visa_free'     THEN 1
          WHEN 'visa_free_eta' THEN 2
          WHEN 'visa_on_arrival' THEN 3
          WHEN 'evisa'         THEN 4
          WHEN 'visa_required' THEN 5
          WHEN 'restricted'    THEN 6
          ELSE 9
        END AS priority_order
      FROM visa_rules vr
      WHERE vr.passport_slug = p_passport
        AND vr.destination_slug = p_destination
    ) r;

  RETURN json_build_object(
    'passport', row_to_json(v_passport),
    'destination', row_to_json(v_destination),
    'visa_rules', COALESCE(v_rules, '[]'::json)
  );
END;
$$;

-- Grant execute to anon and authenticated roles
GRANT EXECUTE ON FUNCTION get_passport_page_data(text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_destination_page_data(text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_pair_page_data(text, text) TO anon, authenticated;
