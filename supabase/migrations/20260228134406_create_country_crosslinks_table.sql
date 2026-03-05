/*
  # Create country_crosslinks table

  ## Purpose
  Deterministic URL mapping between visainfoguide.com and immigrationinfoguide.com.
  Every cross-domain link rendered on either site is resolved from this table —
  never constructed from slugs at runtime. This prevents dead links caused by
  path-structure differences between the two domains.

  ## New Table: country_crosslinks

  ### Columns
  - `id` — UUID primary key
  - `country_name` — Human-readable country name (e.g. "United States")
  - `country_code` — ISO 3166-1 alpha-2 code (e.g. "US"). Unique. Used as the lookup key.
  - `visa_url` — Full canonical URL on visainfoguide.com (e.g. https://www.visainfoguide.com/destination/united-states)
  - `immigration_url` — Full canonical URL on immigrationinfoguide.com (e.g. https://www.immigrationinfoguide.com/countries/united-states)
  - `is_active` — Controls rendering. Set false to suppress the cross-link without deleting the row.
  - `updated_at` — Last modification timestamp.

  ## Security
  - RLS enabled.
  - Anon role: SELECT only where is_active = true.
  - No INSERT / UPDATE / DELETE for anon or authenticated — all writes are service-role only.

  ## Indexes
  - Unique index on country_code (primary lookup path).
  - Index on is_active (filter in query).

  ## Seed Data
  52 countries seeded with exact canonical URLs matching the live route structure:
  - visainfoguide.com uses /destination/{slug}
  - immigrationinfoguide.com uses /countries/{slug}
*/

CREATE TABLE IF NOT EXISTS country_crosslinks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country_name text NOT NULL,
  country_code text NOT NULL,
  visa_url text NOT NULL,
  immigration_url text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS country_crosslinks_country_code_idx
  ON country_crosslinks (country_code);

CREATE INDEX IF NOT EXISTS country_crosslinks_is_active_idx
  ON country_crosslinks (is_active);

ALTER TABLE country_crosslinks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active crosslinks"
  ON country_crosslinks
  FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Authenticated can read active crosslinks"
  ON country_crosslinks
  FOR SELECT
  TO authenticated
  USING (is_active = true);

INSERT INTO country_crosslinks (country_name, country_code, visa_url, immigration_url) VALUES
  ('Argentina',            'AR', 'https://www.visainfoguide.com/destination/argentina',            'https://www.immigrationinfoguide.com/countries/argentina'),
  ('Australia',            'AU', 'https://www.visainfoguide.com/destination/australia',            'https://www.immigrationinfoguide.com/countries/australia'),
  ('Austria',              'AT', 'https://www.visainfoguide.com/destination/austria',              'https://www.immigrationinfoguide.com/countries/austria'),
  ('Belgium',              'BE', 'https://www.visainfoguide.com/destination/belgium',              'https://www.immigrationinfoguide.com/countries/belgium'),
  ('Brazil',               'BR', 'https://www.visainfoguide.com/destination/brazil',               'https://www.immigrationinfoguide.com/countries/brazil'),
  ('Canada',               'CA', 'https://www.visainfoguide.com/destination/canada',               'https://www.immigrationinfoguide.com/countries/canada'),
  ('Chile',                'CL', 'https://www.visainfoguide.com/destination/chile',                'https://www.immigrationinfoguide.com/countries/chile'),
  ('China',                'CN', 'https://www.visainfoguide.com/destination/china',                'https://www.immigrationinfoguide.com/countries/china'),
  ('Colombia',             'CO', 'https://www.visainfoguide.com/destination/colombia',             'https://www.immigrationinfoguide.com/countries/colombia'),
  ('Croatia',              'HR', 'https://www.visainfoguide.com/destination/croatia',              'https://www.immigrationinfoguide.com/countries/croatia'),
  ('Czech Republic',       'CZ', 'https://www.visainfoguide.com/destination/czech-republic',      'https://www.immigrationinfoguide.com/countries/czech-republic'),
  ('Denmark',              'DK', 'https://www.visainfoguide.com/destination/denmark',              'https://www.immigrationinfoguide.com/countries/denmark'),
  ('Egypt',                'EG', 'https://www.visainfoguide.com/destination/egypt',                'https://www.immigrationinfoguide.com/countries/egypt'),
  ('Finland',              'FI', 'https://www.visainfoguide.com/destination/finland',              'https://www.immigrationinfoguide.com/countries/finland'),
  ('France',               'FR', 'https://www.visainfoguide.com/destination/france',               'https://www.immigrationinfoguide.com/countries/france'),
  ('Germany',              'DE', 'https://www.visainfoguide.com/destination/germany',              'https://www.immigrationinfoguide.com/countries/germany'),
  ('Greece',               'GR', 'https://www.visainfoguide.com/destination/greece',               'https://www.immigrationinfoguide.com/countries/greece'),
  ('Hungary',              'HU', 'https://www.visainfoguide.com/destination/hungary',              'https://www.immigrationinfoguide.com/countries/hungary'),
  ('India',                'IN', 'https://www.visainfoguide.com/destination/india',                'https://www.immigrationinfoguide.com/countries/india'),
  ('Indonesia',            'ID', 'https://www.visainfoguide.com/destination/indonesia',            'https://www.immigrationinfoguide.com/countries/indonesia'),
  ('Ireland',              'IE', 'https://www.visainfoguide.com/destination/ireland',              'https://www.immigrationinfoguide.com/countries/ireland'),
  ('Israel',               'IL', 'https://www.visainfoguide.com/destination/israel',               'https://www.immigrationinfoguide.com/countries/israel'),
  ('Italy',                'IT', 'https://www.visainfoguide.com/destination/italy',                'https://www.immigrationinfoguide.com/countries/italy'),
  ('Japan',                'JP', 'https://www.visainfoguide.com/destination/japan',                'https://www.immigrationinfoguide.com/countries/japan'),
  ('Malaysia',             'MY', 'https://www.visainfoguide.com/destination/malaysia',             'https://www.immigrationinfoguide.com/countries/malaysia'),
  ('Mexico',               'MX', 'https://www.visainfoguide.com/destination/mexico',               'https://www.immigrationinfoguide.com/countries/mexico'),
  ('Morocco',              'MA', 'https://www.visainfoguide.com/destination/morocco',              'https://www.immigrationinfoguide.com/countries/morocco'),
  ('Netherlands',          'NL', 'https://www.visainfoguide.com/destination/netherlands',         'https://www.immigrationinfoguide.com/countries/netherlands'),
  ('New Zealand',          'NZ', 'https://www.visainfoguide.com/destination/new-zealand',         'https://www.immigrationinfoguide.com/countries/new-zealand'),
  ('Nigeria',              'NG', 'https://www.visainfoguide.com/destination/nigeria',              'https://www.immigrationinfoguide.com/countries/nigeria'),
  ('Norway',               'NO', 'https://www.visainfoguide.com/destination/norway',              'https://www.immigrationinfoguide.com/countries/norway'),
  ('Peru',                 'PE', 'https://www.visainfoguide.com/destination/peru',                 'https://www.immigrationinfoguide.com/countries/peru'),
  ('Philippines',          'PH', 'https://www.visainfoguide.com/destination/philippines',         'https://www.immigrationinfoguide.com/countries/philippines'),
  ('Poland',               'PL', 'https://www.visainfoguide.com/destination/poland',              'https://www.immigrationinfoguide.com/countries/poland'),
  ('Portugal',             'PT', 'https://www.visainfoguide.com/destination/portugal',            'https://www.immigrationinfoguide.com/countries/portugal'),
  ('Qatar',                'QA', 'https://www.visainfoguide.com/destination/qatar',               'https://www.immigrationinfoguide.com/countries/qatar'),
  ('Romania',              'RO', 'https://www.visainfoguide.com/destination/romania',             'https://www.immigrationinfoguide.com/countries/romania'),
  ('Russia',               'RU', 'https://www.visainfoguide.com/destination/russia',              'https://www.immigrationinfoguide.com/countries/russia'),
  ('Saudi Arabia',         'SA', 'https://www.visainfoguide.com/destination/saudi-arabia',        'https://www.immigrationinfoguide.com/countries/saudi-arabia'),
  ('Singapore',            'SG', 'https://www.visainfoguide.com/destination/singapore',           'https://www.immigrationinfoguide.com/countries/singapore'),
  ('South Africa',         'ZA', 'https://www.visainfoguide.com/destination/south-africa',        'https://www.immigrationinfoguide.com/countries/south-africa'),
  ('South Korea',          'KR', 'https://www.visainfoguide.com/destination/south-korea',         'https://www.immigrationinfoguide.com/countries/south-korea'),
  ('Spain',                'ES', 'https://www.visainfoguide.com/destination/spain',               'https://www.immigrationinfoguide.com/countries/spain'),
  ('Sweden',               'SE', 'https://www.visainfoguide.com/destination/sweden',              'https://www.immigrationinfoguide.com/countries/sweden'),
  ('Switzerland',          'CH', 'https://www.visainfoguide.com/destination/switzerland',         'https://www.immigrationinfoguide.com/countries/switzerland'),
  ('Thailand',             'TH', 'https://www.visainfoguide.com/destination/thailand',            'https://www.immigrationinfoguide.com/countries/thailand'),
  ('Turkey',               'TR', 'https://www.visainfoguide.com/destination/turkey',              'https://www.immigrationinfoguide.com/countries/turkey'),
  ('Ukraine',              'UA', 'https://www.visainfoguide.com/destination/ukraine',             'https://www.immigrationinfoguide.com/countries/ukraine'),
  ('United Arab Emirates', 'AE', 'https://www.visainfoguide.com/destination/united-arab-emirates','https://www.immigrationinfoguide.com/countries/united-arab-emirates'),
  ('United Kingdom',       'GB', 'https://www.visainfoguide.com/destination/united-kingdom',      'https://www.immigrationinfoguide.com/countries/united-kingdom'),
  ('United States',        'US', 'https://www.visainfoguide.com/destination/united-states',       'https://www.immigrationinfoguide.com/countries/united-states'),
  ('Vietnam',              'VN', 'https://www.visainfoguide.com/destination/vietnam',             'https://www.immigrationinfoguide.com/countries/vietnam')
ON CONFLICT (country_code) DO UPDATE SET
  country_name    = EXCLUDED.country_name,
  visa_url        = EXCLUDED.visa_url,
  immigration_url = EXCLUDED.immigration_url,
  updated_at      = now();
