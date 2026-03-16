/*
  # Migrate country_crosslinks to visa_slug schema

  ## Summary
  Replaces the country_code/country_name lookup model with a visa_slug lookup model.
  All cross-domain links are now resolved by the destination slug used on visainfoguide.com,
  matching the URL segment directly (e.g. "denmark", "france", "czech-republic").

  ## Changes

  ### Dropped columns
  - `country_name` — no longer needed; not used in link rendering
  - `country_code` — replaced by `visa_slug` as the lookup key

  ### New column
  - `visa_slug` — the path segment used in visainfoguide.com/destination/{visa_slug}.
    Unique, used as the primary lookup key by the CrossDomainLink component.

  ### Kept columns
  - `id`, `visa_url`, `immigration_url`, `is_active`, `updated_at`

  ## Indexes
  - Unique index on visa_slug (primary lookup)
  - Index on is_active (filter)

  ## Security
  - RLS remains enabled
  - Anon SELECT only where is_active = true (policy recreated)
  - No write access for anon or authenticated

  ## Seed data
  52 countries re-seeded with explicit canonical URLs.
  immigration_url uses https://immigrationinfoguide.com (no www) per spec examples.
*/

ALTER TABLE country_crosslinks
  ADD COLUMN IF NOT EXISTS visa_slug text;

UPDATE country_crosslinks SET visa_slug = lower(
  regexp_replace(
    replace(country_name, ' ', '-'),
    '[^a-z0-9\-]', '', 'g'
  )
) WHERE visa_slug IS NULL;

ALTER TABLE country_crosslinks
  ALTER COLUMN visa_slug SET NOT NULL;

DROP INDEX IF EXISTS country_crosslinks_country_code_idx;

CREATE UNIQUE INDEX IF NOT EXISTS country_crosslinks_visa_slug_idx
  ON country_crosslinks (visa_slug);

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'country_crosslinks' AND column_name = 'country_name'
  ) THEN
    ALTER TABLE country_crosslinks DROP COLUMN country_name;
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'country_crosslinks' AND column_name = 'country_code'
  ) THEN
    ALTER TABLE country_crosslinks DROP COLUMN country_code;
  END IF;
END $$;

DROP POLICY IF EXISTS "Public can read active crosslinks" ON country_crosslinks;
DROP POLICY IF EXISTS "Authenticated can read active crosslinks" ON country_crosslinks;

CREATE POLICY "Anon can read active crosslinks"
  ON country_crosslinks
  FOR SELECT
  TO anon
  USING (is_active = true);

INSERT INTO country_crosslinks (visa_slug, visa_url, immigration_url, is_active) VALUES
  ('argentina',            'https://www.visainfoguide.com/destination/argentina',             'https://immigrationinfoguide.com/country/argentina',            true),
  ('australia',            'https://www.visainfoguide.com/destination/australia',             'https://immigrationinfoguide.com/country/australia',            true),
  ('austria',              'https://www.visainfoguide.com/destination/austria',               'https://immigrationinfoguide.com/country/austria',              true),
  ('belgium',              'https://www.visainfoguide.com/destination/belgium',               'https://immigrationinfoguide.com/country/belgium',              true),
  ('brazil',               'https://www.visainfoguide.com/destination/brazil',                'https://immigrationinfoguide.com/country/brazil',               true),
  ('canada',               'https://www.visainfoguide.com/destination/canada',                'https://immigrationinfoguide.com/country/canada',               true),
  ('chile',                'https://www.visainfoguide.com/destination/chile',                 'https://immigrationinfoguide.com/country/chile',                true),
  ('china',                'https://www.visainfoguide.com/destination/china',                 'https://immigrationinfoguide.com/country/china',                true),
  ('colombia',             'https://www.visainfoguide.com/destination/colombia',              'https://immigrationinfoguide.com/country/colombia',             true),
  ('croatia',              'https://www.visainfoguide.com/destination/croatia',               'https://immigrationinfoguide.com/country/croatia',              true),
  ('czech-republic',       'https://www.visainfoguide.com/destination/czech-republic',        'https://immigrationinfoguide.com/country/czech-republic',       true),
  ('denmark',              'https://www.visainfoguide.com/destination/denmark',               'https://immigrationinfoguide.com/country/denmark',              true),
  ('egypt',                'https://www.visainfoguide.com/destination/egypt',                 'https://immigrationinfoguide.com/country/egypt',                true),
  ('finland',              'https://www.visainfoguide.com/destination/finland',               'https://immigrationinfoguide.com/country/finland',              true),
  ('france',               'https://www.visainfoguide.com/destination/france',                'https://immigrationinfoguide.com/country/france',               true),
  ('germany',              'https://www.visainfoguide.com/destination/germany',               'https://immigrationinfoguide.com/country/germany',              true),
  ('greece',               'https://www.visainfoguide.com/destination/greece',                'https://immigrationinfoguide.com/country/greece',               true),
  ('hungary',              'https://www.visainfoguide.com/destination/hungary',               'https://immigrationinfoguide.com/country/hungary',              true),
  ('india',                'https://www.visainfoguide.com/destination/india',                 'https://immigrationinfoguide.com/country/india',                true),
  ('indonesia',            'https://www.visainfoguide.com/destination/indonesia',             'https://immigrationinfoguide.com/country/indonesia',            true),
  ('ireland',              'https://www.visainfoguide.com/destination/ireland',               'https://immigrationinfoguide.com/country/ireland',              true),
  ('israel',               'https://www.visainfoguide.com/destination/israel',               'https://immigrationinfoguide.com/country/israel',               true),
  ('italy',                'https://www.visainfoguide.com/destination/italy',                 'https://immigrationinfoguide.com/country/italy',                true),
  ('japan',                'https://www.visainfoguide.com/destination/japan',                 'https://immigrationinfoguide.com/country/japan',                true),
  ('malaysia',             'https://www.visainfoguide.com/destination/malaysia',              'https://immigrationinfoguide.com/country/malaysia',             true),
  ('mexico',               'https://www.visainfoguide.com/destination/mexico',                'https://immigrationinfoguide.com/country/mexico',               true),
  ('morocco',              'https://www.visainfoguide.com/destination/morocco',               'https://immigrationinfoguide.com/country/morocco',              true),
  ('netherlands',          'https://www.visainfoguide.com/destination/netherlands',           'https://immigrationinfoguide.com/country/netherlands',          true),
  ('new-zealand',          'https://www.visainfoguide.com/destination/new-zealand',           'https://immigrationinfoguide.com/country/new-zealand',          true),
  ('nigeria',              'https://www.visainfoguide.com/destination/nigeria',               'https://immigrationinfoguide.com/country/nigeria',              true),
  ('norway',               'https://www.visainfoguide.com/destination/norway',                'https://immigrationinfoguide.com/country/norway',               true),
  ('peru',                 'https://www.visainfoguide.com/destination/peru',                  'https://immigrationinfoguide.com/country/peru',                 true),
  ('philippines',          'https://www.visainfoguide.com/destination/philippines',           'https://immigrationinfoguide.com/country/philippines',          true),
  ('poland',               'https://www.visainfoguide.com/destination/poland',                'https://immigrationinfoguide.com/country/poland',               true),
  ('portugal',             'https://www.visainfoguide.com/destination/portugal',              'https://immigrationinfoguide.com/country/portugal',             true),
  ('qatar',                'https://www.visainfoguide.com/destination/qatar',                 'https://immigrationinfoguide.com/country/qatar',                true),
  ('romania',              'https://www.visainfoguide.com/destination/romania',               'https://immigrationinfoguide.com/country/romania',              true),
  ('russia',               'https://www.visainfoguide.com/destination/russia',                'https://immigrationinfoguide.com/country/russia',               true),
  ('saudi-arabia',         'https://www.visainfoguide.com/destination/saudi-arabia',          'https://immigrationinfoguide.com/country/saudi-arabia',         true),
  ('singapore',            'https://www.visainfoguide.com/destination/singapore',             'https://immigrationinfoguide.com/country/singapore',            true),
  ('south-africa',         'https://www.visainfoguide.com/destination/south-africa',          'https://immigrationinfoguide.com/country/south-africa',         true),
  ('south-korea',          'https://www.visainfoguide.com/destination/south-korea',           'https://immigrationinfoguide.com/country/south-korea',          true),
  ('spain',                'https://www.visainfoguide.com/destination/spain',                 'https://immigrationinfoguide.com/country/spain',                true),
  ('sweden',               'https://www.visainfoguide.com/destination/sweden',               'https://immigrationinfoguide.com/country/sweden',               true),
  ('switzerland',          'https://www.visainfoguide.com/destination/switzerland',           'https://immigrationinfoguide.com/country/switzerland',          true),
  ('thailand',             'https://www.visainfoguide.com/destination/thailand',              'https://immigrationinfoguide.com/country/thailand',             true),
  ('turkey',               'https://www.visainfoguide.com/destination/turkey',                'https://immigrationinfoguide.com/country/turkey',               true),
  ('ukraine',              'https://www.visainfoguide.com/destination/ukraine',               'https://immigrationinfoguide.com/country/ukraine',              true),
  ('united-arab-emirates', 'https://www.visainfoguide.com/destination/united-arab-emirates',  'https://immigrationinfoguide.com/country/united-arab-emirates', true),
  ('united-kingdom',       'https://www.visainfoguide.com/destination/united-kingdom',        'https://immigrationinfoguide.com/country/united-kingdom',       true),
  ('united-states',        'https://www.visainfoguide.com/destination/united-states',         'https://immigrationinfoguide.com/country/united-states',        true),
  ('vietnam',              'https://www.visainfoguide.com/destination/vietnam',               'https://immigrationinfoguide.com/country/vietnam',              true)
ON CONFLICT (visa_slug) DO UPDATE SET
  visa_url        = EXCLUDED.visa_url,
  immigration_url = EXCLUDED.immigration_url,
  is_active       = EXCLUDED.is_active,
  updated_at      = now();
