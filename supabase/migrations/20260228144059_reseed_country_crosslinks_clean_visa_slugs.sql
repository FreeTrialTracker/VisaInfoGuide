/*
  # Reseed country_crosslinks with correct visa_slug values

  ## Problem
  The previous migration generated visa_slug values from country_name using regexp_replace,
  which produced corrupted slugs (e.g. "alaysia" instead of "malaysia") because the regex
  stripped characters incorrectly. This resulted in ~104 rows with bad slugs.

  ## Fix
  Delete all existing rows and re-insert the 52 correct country records with explicit,
  hand-verified visa_slug values. No slug construction at runtime.

  ## Seed data
  52 countries with correct visa_slug, visa_url, and immigration_url values.
*/

DELETE FROM country_crosslinks;

INSERT INTO country_crosslinks (visa_slug, visa_url, immigration_url, is_active) VALUES
  ('argentina',            'https://www.visainfoguide.com/destination/argentina',             'https://immigrationinfoguide.com/immigrate-to/argentina',            true),
  ('australia',            'https://www.visainfoguide.com/destination/australia',             'https://immigrationinfoguide.com/immigrate-to/australia',            true),
  ('austria',              'https://www.visainfoguide.com/destination/austria',               'https://immigrationinfoguide.com/immigrate-to/austria',              true),
  ('belgium',              'https://www.visainfoguide.com/destination/belgium',               'https://immigrationinfoguide.com/immigrate-to/belgium',              true),
  ('brazil',               'https://www.visainfoguide.com/destination/brazil',                'https://immigrationinfoguide.com/immigrate-to/brazil',               true),
  ('canada',               'https://www.visainfoguide.com/destination/canada',                'https://immigrationinfoguide.com/immigrate-to/canada',               true),
  ('chile',                'https://www.visainfoguide.com/destination/chile',                 'https://immigrationinfoguide.com/immigrate-to/chile',                true),
  ('china',                'https://www.visainfoguide.com/destination/china',                 'https://immigrationinfoguide.com/immigrate-to/china',                true),
  ('colombia',             'https://www.visainfoguide.com/destination/colombia',              'https://immigrationinfoguide.com/immigrate-to/colombia',             true),
  ('croatia',              'https://www.visainfoguide.com/destination/croatia',               'https://immigrationinfoguide.com/immigrate-to/croatia',              true),
  ('czech-republic',       'https://www.visainfoguide.com/destination/czech-republic',        'https://immigrationinfoguide.com/immigrate-to/czech-republic',       true),
  ('denmark',              'https://www.visainfoguide.com/destination/denmark',               'https://immigrationinfoguide.com/immigrate-to/denmark',              true),
  ('egypt',                'https://www.visainfoguide.com/destination/egypt',                 'https://immigrationinfoguide.com/immigrate-to/egypt',                true),
  ('finland',              'https://www.visainfoguide.com/destination/finland',               'https://immigrationinfoguide.com/immigrate-to/finland',              true),
  ('france',               'https://www.visainfoguide.com/destination/france',                'https://immigrationinfoguide.com/immigrate-to/france',               true),
  ('germany',              'https://www.visainfoguide.com/destination/germany',               'https://immigrationinfoguide.com/immigrate-to/germany',              true),
  ('greece',               'https://www.visainfoguide.com/destination/greece',                'https://immigrationinfoguide.com/immigrate-to/greece',               true),
  ('hungary',              'https://www.visainfoguide.com/destination/hungary',               'https://immigrationinfoguide.com/immigrate-to/hungary',              true),
  ('india',                'https://www.visainfoguide.com/destination/india',                 'https://immigrationinfoguide.com/immigrate-to/india',                true),
  ('indonesia',            'https://www.visainfoguide.com/destination/indonesia',             'https://immigrationinfoguide.com/immigrate-to/indonesia',            true),
  ('ireland',              'https://www.visainfoguide.com/destination/ireland',               'https://immigrationinfoguide.com/immigrate-to/ireland',              true),
  ('israel',               'https://www.visainfoguide.com/destination/israel',                'https://immigrationinfoguide.com/immigrate-to/israel',               true),
  ('italy',                'https://www.visainfoguide.com/destination/italy',                 'https://immigrationinfoguide.com/immigrate-to/italy',                true),
  ('japan',                'https://www.visainfoguide.com/destination/japan',                 'https://immigrationinfoguide.com/immigrate-to/japan',                true),
  ('malaysia',             'https://www.visainfoguide.com/destination/malaysia',              'https://immigrationinfoguide.com/immigrate-to/malaysia',             true),
  ('mexico',               'https://www.visainfoguide.com/destination/mexico',                'https://immigrationinfoguide.com/immigrate-to/mexico',               true),
  ('morocco',              'https://www.visainfoguide.com/destination/morocco',               'https://immigrationinfoguide.com/immigrate-to/morocco',              true),
  ('netherlands',          'https://www.visainfoguide.com/destination/netherlands',           'https://immigrationinfoguide.com/immigrate-to/netherlands',          true),
  ('new-zealand',          'https://www.visainfoguide.com/destination/new-zealand',           'https://immigrationinfoguide.com/immigrate-to/new-zealand',          true),
  ('nigeria',              'https://www.visainfoguide.com/destination/nigeria',               'https://immigrationinfoguide.com/immigrate-to/nigeria',              true),
  ('norway',               'https://www.visainfoguide.com/destination/norway',                'https://immigrationinfoguide.com/immigrate-to/norway',               true),
  ('peru',                 'https://www.visainfoguide.com/destination/peru',                  'https://immigrationinfoguide.com/immigrate-to/peru',                 true),
  ('philippines',          'https://www.visainfoguide.com/destination/philippines',           'https://immigrationinfoguide.com/immigrate-to/philippines',          true),
  ('poland',               'https://www.visainfoguide.com/destination/poland',                'https://immigrationinfoguide.com/immigrate-to/poland',               true),
  ('portugal',             'https://www.visainfoguide.com/destination/portugal',              'https://immigrationinfoguide.com/immigrate-to/portugal',             true),
  ('qatar',                'https://www.visainfoguide.com/destination/qatar',                 'https://immigrationinfoguide.com/immigrate-to/qatar',                true),
  ('romania',              'https://www.visainfoguide.com/destination/romania',               'https://immigrationinfoguide.com/immigrate-to/romania',              true),
  ('russia',               'https://www.visainfoguide.com/destination/russia',                'https://immigrationinfoguide.com/immigrate-to/russia',               true),
  ('saudi-arabia',         'https://www.visainfoguide.com/destination/saudi-arabia',          'https://immigrationinfoguide.com/immigrate-to/saudi-arabia',         true),
  ('singapore',            'https://www.visainfoguide.com/destination/singapore',             'https://immigrationinfoguide.com/immigrate-to/singapore',            true),
  ('south-africa',         'https://www.visainfoguide.com/destination/south-africa',          'https://immigrationinfoguide.com/immigrate-to/south-africa',         true),
  ('south-korea',          'https://www.visainfoguide.com/destination/south-korea',           'https://immigrationinfoguide.com/immigrate-to/south-korea',          true),
  ('spain',                'https://www.visainfoguide.com/destination/spain',                 'https://immigrationinfoguide.com/immigrate-to/spain',                true),
  ('sweden',               'https://www.visainfoguide.com/destination/sweden',                'https://immigrationinfoguide.com/immigrate-to/sweden',               true),
  ('switzerland',          'https://www.visainfoguide.com/destination/switzerland',           'https://immigrationinfoguide.com/immigrate-to/switzerland',          true),
  ('thailand',             'https://www.visainfoguide.com/destination/thailand',              'https://immigrationinfoguide.com/immigrate-to/thailand',             true),
  ('turkey',               'https://www.visainfoguide.com/destination/turkey',                'https://immigrationinfoguide.com/immigrate-to/turkey',               true),
  ('ukraine',              'https://www.visainfoguide.com/destination/ukraine',               'https://immigrationinfoguide.com/immigrate-to/ukraine',              true),
  ('united-arab-emirates', 'https://www.visainfoguide.com/destination/united-arab-emirates',  'https://immigrationinfoguide.com/immigrate-to/united-arab-emirates', true),
  ('united-kingdom',       'https://www.visainfoguide.com/destination/united-kingdom',        'https://immigrationinfoguide.com/immigrate-to/united-kingdom',       true),
  ('united-states',        'https://www.visainfoguide.com/destination/united-states',         'https://immigrationinfoguide.com/immigrate-to/united-states',        true),
  ('vietnam',              'https://www.visainfoguide.com/destination/vietnam',               'https://immigrationinfoguide.com/immigrate-to/vietnam',              true);
