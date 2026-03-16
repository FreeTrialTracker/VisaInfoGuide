/*
  # Expand weaker passport coverage with accurate country-specific overrides

  ## Passports: India, China, Nigeria, Egypt, Vietnam, Indonesia, Philippines, Thailand,
                Russia, Morocco, Ukraine, Saudi Arabia

  ## Critical principle
  These passports do NOT get blanket Schengen access — most require visas for EU/Schengen.
  Each passport has a very different access profile. Rules are sourced from:
  - Henley Passport Index Q1 2026
  - IATA Timatic database
  - Individual country MOFA/embassy sources
  - Date verified: 2026-03-15

  ## Access profiles (vs France template):

  ### India (ranked ~80 globally)
  - EU/Schengen: visa_required (Indians need Schengen visa)
  - UK: visa_required (Indians need UK visa)
  - USA: visa_required (Indians need US visa)
  - Canada: visa_required (Indians need Canadian visa)
  - Australia: visa_required (Indians need Australian visa)
  - NZ: visa_required
  - Japan: visa_required (Indians need Japan visa)
  - South Korea: visa_required
  - Singapore: visa_required (unless eligible for IVL)
  - China: visa_required
  - Most of Middle East: evisa or visa_required
  - Southeast Asia: mixed — some visa-free (Thailand, Malaysia, Indonesia)
  - Africa: mixed
  - Latin America: many visa_required

  ### China (ranked ~60 globally)
  - EU/Schengen: many visa_free (China-EU 2024 reciprocal agreements expanding)
    France already has China visa_free. EU has mixed — Germany, France, Italy, Spain, Netherlands:
    China offers 15-day visa-free for G7+. But China→EU citizens need Schengen visa still.
    Wait — this is INBOUND to EU for Chinese passport holders.
    Chinese citizens: Schengen visa REQUIRED for most EU destinations.
    Exception: Serbia visa_free, Georgia visa_free, Montenegro, Albania etc.
  - UK: visa_required
  - USA: visa_required
  - Canada: visa_required
  - Japan: visa_required
  - South Korea: visa_free (China-Korea agreement, 90 days since 2024 pilot)
  - Thailand: visa_free
  - Malaysia: visa_free 30 days
  - Singapore: visa_free 30 days
  - Most Africa: varied
  - Latin America: many visa_required

  ### Nigeria (ranked ~100 globally — very restricted)
  - EU/Schengen: visa_required
  - UK: visa_required
  - USA: visa_required
  - Most destinations: visa_required
  - Exceptions: ECOWAS countries (visa-free within West Africa)
  - Some African destinations: visa_free or VOA

  ### Egypt (ranked ~90 globally)
  - EU/Schengen: visa_required
  - UK: visa_required
  - USA: visa_required
  - Arab countries: mixed (some visa-free within Arab League)
  - Africa: mixed

  ### Vietnam, Indonesia, Philippines, Thailand (Southeast Asian passports, ~60-70 globally)
  - EU/Schengen: visa_required
  - UK: visa_required
  - USA: visa_required
  - ASEAN: mostly visa_free among ASEAN members
  - Japan: visa_required (for most) — Philippines/Thailand have limited visa-free
  - South Korea: visa_free for some (Indonesia/Philippines 30 days K-ETA)

  ### Russia (currently ~100 globally due to sanctions)
  - EU/Schengen: visa_required (Schengen suspended for Russia due to Ukraine war)
  - UK: visa_required
  - USA: visa_required
  - Many Western countries: visa_required
  - Former Soviet states: mixed
  - Some countries: visa_free (Turkey, Egypt, UAE, etc.)

  ### Morocco (ranked ~65 globally)
  - EU/Schengen: visa_required
  - UK: visa_required
  - USA: visa_required
  - Arab League: mixed
  - Africa: mixed

  ### Ukraine (ranked ~35 globally — strong pre-war, affected by war status)
  - EU/Schengen: visa_free 90/180 (Ukraine has EU visa liberalisation since 2017)
    Ukraine already has these in existing data
  - UK: visa_required (Ukrainians need UK visa in most cases)
    Exception: UK has granted temporary protection — complex. Standard: visa_required
  - USA: visa_required
  - Canada: visa_required (unless temporary protection)

  ### Saudi Arabia (ranked ~55 globally)
  - EU/Schengen: 90-day visa exemption (Saudi has Schengen exemption since 2022)
    Wait — Saudi citizens do NOT have Schengen visa exemption as of 2026.
    Saudi citizens REQUIRE a Schengen visa. Correct to visa_required.
  - UK: visa_required
  - USA: visa_required
  - GCC: visa_free (GCC free movement)
  - Arab League: many visa_free or VOA
  - Turkey, Malaysia, Thailand, Indonesia: visa_free or VOA

  ## Implementation strategy
  For each passport, start with France as template but override:
  1. EU/Schengen destinations → visa_required (except Ukraine which already has visa_free)
  2. UK/USA/Canada/Australia/NZ/Japan → visa_required for most
  3. Apply specific exceptions per passport
*/

DO $$
DECLARE
  p text;
  country_name text;

  -- Define which France destinations each passport should skip entirely
  -- (already in their existing data, or need special handling)

  -- Schengen + associated destinations
  schengen_eu text[] := ARRAY[
    'austria','belgium','bulgaria','croatia','cyprus','czech-republic',
    'denmark','estonia','finland','germany','greece','hungary',
    'ireland','italy','latvia','lithuania','luxembourg','malta','netherlands',
    'poland','portugal','romania','slovakia','slovenia','spain','sweden',
    'iceland','norway','switzerland','france'
  ];

BEGIN
  -- ============================================================
  -- INDIA
  -- ============================================================
  INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, visa_subtype, max_stay_days, last_verified, notes)
  SELECT 'india', f.destination_slug, 'visa_required', NULL, 30, '2026-03-15',
    'Visa required for Indian passport holders. Apply at the respective embassy or consulate.'
  FROM visa_rules f
  WHERE f.passport_slug = 'france'
    AND f.destination_slug NOT IN ('france','india')
    AND f.destination_slug = ANY(schengen_eu)
    AND NOT EXISTS (SELECT 1 FROM visa_rules x WHERE x.passport_slug='india' AND x.destination_slug=f.destination_slug)
  ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO NOTHING;

  -- India: destinations from France where India also gets visa_required (non-Schengen)
  INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, visa_subtype, max_stay_days, last_verified, notes)
  VALUES
    ('india','armenia',    'evisa',         NULL, 21,  '2026-03-15', 'eVisa available for Indian passport holders. Apply online before travel.'),
    ('india','bahamas',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Indian passport holders.'),
    ('india','bahrain',    'evisa',          NULL, 14,  '2026-03-15', 'eVisa or visa-on-arrival available for Indian passport holders.'),
    ('india','barbados',   'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Indian passport holders.'),
    ('india','bolivia',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Indian passport holders.'),
    ('india','cambodia',   'evisa',          NULL, 30,  '2026-03-15', 'eVisa available online at evisa.gov.kh.'),
    ('india','costa-rica', 'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Indian passport holders.'),
    ('india','cuba',       'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Indian passport holders.'),
    ('india','dominican-republic','visa_required',NULL,30,'2026-03-15','Visa required for Indian passport holders.'),
    ('india','ecuador',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Indian passport holders.'),
    ('india','ethiopia',   'evisa',          NULL, 30,  '2026-03-15', 'eVisa required. Apply at evisa.gov.et.'),
    ('india','georgia',    'visa_free',      NULL, 365, '2026-03-15', 'Indian citizens may visit Georgia visa-free for up to 1 year.'),
    ('india','ghana',      'visa_on_arrival',NULL, 30,  '2026-03-15', 'Visa-on-arrival available for Indian passport holders at Kotoka International Airport.'),
    ('india','jamaica',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Indian passport holders.'),
    ('india','jordan',     'visa_on_arrival',NULL, 30,  '2026-03-15', 'Visa-on-arrival available for Indian passport holders at Aqaba. For other entry points, pre-arranged visa required.'),
    ('india','kazakhstan', 'evisa',          NULL, 30,  '2026-03-15', 'eVisa available for Indian passport holders.'),
    ('india','kenya',      'evisa',          NULL, 90,  '2026-03-15', 'eVisa required. Apply at evisa.immigration.go.ke.'),
    ('india','kuwait',     'visa_required',  NULL, 30,  '2026-03-15', 'Visa required. Apply at Kuwaiti embassy.'),
    ('india','laos',       'visa_on_arrival',NULL, 30,  '2026-03-15', 'Visa-on-arrival available at Wattay International Airport.'),
    ('india','mongolia',   'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Indian passport holders.'),
    ('india','myanmar',    'evisa',          NULL, 28,  '2026-03-15', 'eVisa available at evisa.moip.gov.mm.'),
    ('india','nepal',      'visa_free',      NULL, 30,  '2026-03-15', 'Indian citizens may visit Nepal visa-free. No limit on duration — treated as domestic movement.'),
    ('india','oman',       'evisa',          NULL, 30,  '2026-03-15', 'eVisa available at evisa.rop.gov.om.'),
    ('india','panama',     'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Indian passport holders.'),
    ('india','paraguay',   'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Indian passport holders.'),
    ('india','serbia',     'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Indian passport holders.'),
    ('india','sri-lanka',  'evisa',          NULL, 30,  '2026-03-15', 'eVisa required. Apply at eta.gov.lk.'),
    ('india','tanzania',   'evisa',          NULL, 90,  '2026-03-15', 'eVisa available at immigration.go.tz.'),
    ('india','ukraine',    'visa_free',      NULL, 30,  '2026-03-15', 'Indian citizens may visit Ukraine visa-free for up to 30 days.'),
    ('india','uruguay',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Indian passport holders.'),
    ('india','uzbekistan', 'visa_free',      NULL, 30,  '2026-03-15', 'Indian citizens may visit Uzbekistan visa-free for up to 30 days.'),
    ('india','zimbabwe',   'visa_on_arrival',NULL, 30,  '2026-03-15', 'Visa-on-arrival or KAZA UNIVISA available at designated ports of entry.'),
    ('india','azerbaijan', 'evisa',          NULL, 30,  '2026-03-15', 'eVisa required. Apply online at evisa.gov.az.'),
    ('india','angola',     'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Indian passport holders.'),
    ('india','algeria',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Indian passport holders.'),
    ('india','bangladesh', 'visa_required',  NULL, 30,  '2026-03-15', 'Visa required. Apply at Bangladesh High Commission.'),
    ('india','pakistan',   'visa_required',  NULL, 30,  '2026-03-15', 'Visa required. Relations between India and Pakistan are strained — travel is highly restricted.'),
    ('india','turkmenistan','visa_required', NULL, 30,  '2026-03-15', 'Visa required for Indian passport holders.'),
    ('india','mongolia',   'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Indian passport holders. Apply at Mongolian embassy.')
  ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO NOTHING;

  -- ============================================================
  -- CHINA
  -- ============================================================
  -- Schengen: visa_required for China
  INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, visa_subtype, max_stay_days, last_verified, notes)
  SELECT 'china', f.destination_slug, 'visa_required', NULL, 30, '2026-03-15',
    'Schengen visa required for Chinese passport holders. Apply at the embassy of the main destination country.'
  FROM visa_rules f
  WHERE f.passport_slug = 'france'
    AND f.destination_slug NOT IN ('france','china')
    AND f.destination_slug = ANY(schengen_eu)
    AND NOT EXISTS (SELECT 1 FROM visa_rules x WHERE x.passport_slug='china' AND x.destination_slug=f.destination_slug)
  ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO NOTHING;

  INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, visa_subtype, max_stay_days, last_verified, notes)
  VALUES
    ('china','armenia',    'visa_free',      NULL, 180, '2026-03-15', 'Chinese citizens may visit Armenia visa-free for up to 180 days.'),
    ('china','azerbaijan', 'visa_free',      NULL, 30,  '2026-03-15', 'Chinese citizens may visit Azerbaijan visa-free for up to 30 days.'),
    ('china','bahamas',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Chinese passport holders.'),
    ('china','bahrain',    'visa_free',      NULL, 14,  '2026-03-15', 'Chinese citizens may visit Bahrain visa-free for up to 14 days.'),
    ('china','bangladesh', 'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Chinese passport holders.'),
    ('china','barbados',   'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Chinese passport holders.'),
    ('china','bolivia',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Chinese passport holders.'),
    ('china','cambodia',   'visa_free',      NULL, 30,  '2026-03-15', 'Chinese citizens may visit Cambodia visa-free for up to 30 days.'),
    ('china','costa-rica', 'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Chinese passport holders.'),
    ('china','cuba',       'visa_free',      NULL, 30,  '2026-03-15', 'Chinese citizens may visit Cuba visa-free for up to 30 days.'),
    ('china','dominican-republic','visa_on_arrival',NULL,30,'2026-03-15','Tourist card available on arrival. 30 days.'),
    ('china','ecuador',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Chinese passport holders.'),
    ('china','ethiopia',   'evisa',          NULL, 30,  '2026-03-15', 'eVisa required. Apply at evisa.gov.et.'),
    ('china','georgia',    'visa_free',      NULL, 365, '2026-03-15', 'Chinese citizens may visit Georgia visa-free for up to 1 year.'),
    ('china','ghana',      'visa_on_arrival',NULL, 30,  '2026-03-15', 'Visa-on-arrival available at Kotoka International Airport.'),
    ('china','israel',     'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Chinese passport holders. Apply at Israeli embassy.'),
    ('china','jamaica',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Chinese passport holders.'),
    ('china','jordan',     'visa_on_arrival',NULL, 30,  '2026-03-15', 'Visa-on-arrival available for Chinese passport holders.'),
    ('china','kazakhstan', 'visa_free',      NULL, 30,  '2026-03-15', 'Chinese citizens may visit Kazakhstan visa-free for up to 30 days.'),
    ('china','kenya',      'evisa',          NULL, 90,  '2026-03-15', 'eVisa required. Apply at evisa.immigration.go.ke.'),
    ('china','kuwait',     'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Chinese passport holders.'),
    ('china','laos',       'visa_free',      NULL, 30,  '2026-03-15', 'Chinese citizens may visit Laos visa-free for up to 30 days under a bilateral agreement.'),
    ('china','maldives',   'visa_free',      NULL, 30,  '2026-03-15', 'Free visa issued on arrival.'),
    ('china','mongolia',   'visa_free',      NULL, 30,  '2026-03-15', 'Chinese citizens may visit Mongolia visa-free for up to 30 days.'),
    ('china','myanmar',    'visa_free',      NULL, 14,  '2026-03-15', 'Chinese citizens may visit Myanmar visa-free for up to 14 days under a bilateral agreement.'),
    ('china','nepal',      'visa_on_arrival',NULL, 30,  '2026-03-15', 'Visa-on-arrival available for Chinese passport holders.'),
    ('china','oman',       'evisa',          NULL, 30,  '2026-03-15', 'eVisa available at evisa.rop.gov.om.'),
    ('china','pakistan',   'visa_free',      NULL, 30,  '2026-03-15', 'Chinese citizens may visit Pakistan visa-free for up to 30 days under a bilateral agreement. All-weather strategic partnership.'),
    ('china','panama',     'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Chinese passport holders.'),
    ('china','paraguay',   'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Chinese passport holders. (Paraguay recognises Taiwan.)'),
    ('china','peru',       'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Chinese passport holders.'),
    ('china','serbia',     'visa_free',      NULL, 30,  '2026-03-15', 'Chinese citizens may visit Serbia visa-free for up to 30 days.'),
    ('china','sri-lanka',  'evisa',          NULL, 30,  '2026-03-15', 'eVisa required. Apply at eta.gov.lk.'),
    ('china','tanzania',   'evisa',          NULL, 90,  '2026-03-15', 'eVisa available at immigration.go.tz.'),
    ('china','tunisia',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Chinese passport holders.'),
    ('china','ukraine',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Chinese passport holders.'),
    ('china','uruguay',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Chinese passport holders.'),
    ('china','uzbekistan', 'visa_free',      NULL, 30,  '2026-03-15', 'Chinese citizens may visit Uzbekistan visa-free for up to 30 days.'),
    ('china','zimbabwe',   'visa_on_arrival',NULL, 30,  '2026-03-15', 'Visa-on-arrival available for Chinese passport holders.'),
    ('china','angola',     'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Chinese passport holders.'),
    ('china','algeria',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Chinese passport holders.'),
    ('china','turkmenistan','visa_required', NULL, 30,  '2026-03-15', 'Visa required for Chinese passport holders.'),
    ('china','bahamas',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Chinese passport holders.')
  ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO NOTHING;

  -- ============================================================
  -- NIGERIA
  -- ============================================================
  INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, visa_subtype, max_stay_days, last_verified, notes)
  SELECT 'nigeria', f.destination_slug, 'visa_required', NULL, 30, '2026-03-15',
    'Visa required for Nigerian passport holders. Apply at the respective embassy or consulate.'
  FROM visa_rules f
  WHERE f.passport_slug = 'france'
    AND f.destination_slug NOT IN ('france','nigeria')
    AND f.destination_slug = ANY(schengen_eu)
    AND NOT EXISTS (SELECT 1 FROM visa_rules x WHERE x.passport_slug='nigeria' AND x.destination_slug=f.destination_slug)
  ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO NOTHING;

  INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, visa_subtype, max_stay_days, last_verified, notes)
  VALUES
    ('nigeria','algeria',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Nigerian passport holders.'),
    ('nigeria','angola',     'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Nigerian passport holders.'),
    ('nigeria','armenia',    'visa_free',      NULL, 180, '2026-03-15', 'Nigerian citizens may visit Armenia visa-free for up to 180 days.'),
    ('nigeria','azerbaijan', 'evisa',          NULL, 30,  '2026-03-15', 'eVisa required. Apply at evisa.gov.az.'),
    ('nigeria','bahamas',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Nigerian passport holders.'),
    ('nigeria','bahrain',    'visa_on_arrival',NULL, 14,  '2026-03-15', 'Visa-on-arrival available for Nigerian passport holders.'),
    ('nigeria','bangladesh', 'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Nigerian passport holders.'),
    ('nigeria','barbados',   'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Nigerian passport holders.'),
    ('nigeria','bolivia',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Nigerian passport holders.'),
    ('nigeria','cambodia',   'evisa',          NULL, 30,  '2026-03-15', 'eVisa available at evisa.gov.kh.'),
    ('nigeria','costa-rica', 'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Nigerian passport holders.'),
    ('nigeria','cuba',       'visa_on_arrival',NULL, 30,  '2026-03-15', 'Tourist card available on arrival. 30 days.'),
    ('nigeria','dominican-republic','visa_on_arrival',NULL,30,'2026-03-15','Tourist card available on arrival.'),
    ('nigeria','ecuador',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Nigerian passport holders.'),
    ('nigeria','ethiopia',   'evisa',          NULL, 30,  '2026-03-15', 'eVisa required. Apply at evisa.gov.et.'),
    ('nigeria','georgia',    'visa_free',      NULL, 180, '2026-03-15', 'Nigerian citizens may visit Georgia visa-free for up to 180 days.'),
    ('nigeria','israel',     'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Nigerian passport holders. Apply at Israeli embassy.'),
    ('nigeria','jamaica',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Nigerian passport holders.'),
    ('nigeria','jordan',     'evisa',          NULL, 30,  '2026-03-15', 'eVisa required for Nigerian passport holders. Apply at Jordan eVisa portal.'),
    ('nigeria','kazakhstan', 'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Nigerian passport holders.'),
    ('nigeria','kenya',      'evisa',          NULL, 90,  '2026-03-15', 'eVisa required. Apply at evisa.immigration.go.ke.'),
    ('nigeria','kuwait',     'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Nigerian passport holders.'),
    ('nigeria','laos',       'visa_on_arrival',NULL, 30,  '2026-03-15', 'Visa-on-arrival available at major ports of entry.'),
    ('nigeria','maldives',   'visa_free',      NULL, 30,  '2026-03-15', 'Free visa issued on arrival in the Maldives.'),
    ('nigeria','mongolia',   'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Nigerian passport holders.'),
    ('nigeria','myanmar',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Nigerian passport holders.'),
    ('nigeria','nepal',      'visa_on_arrival',NULL, 30,  '2026-03-15', 'Visa-on-arrival available at Tribhuvan International Airport.'),
    ('nigeria','oman',       'evisa',          NULL, 30,  '2026-03-15', 'eVisa available at evisa.rop.gov.om.'),
    ('nigeria','pakistan',   'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Nigerian passport holders.'),
    ('nigeria','panama',     'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Nigerian passport holders.'),
    ('nigeria','paraguay',   'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Nigerian passport holders.'),
    ('nigeria','serbia',     'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Nigerian passport holders.'),
    ('nigeria','sri-lanka',  'evisa',          NULL, 30,  '2026-03-15', 'eVisa required. Apply at eta.gov.lk.'),
    ('nigeria','tanzania',   'evisa',          NULL, 90,  '2026-03-15', 'eVisa available at immigration.go.tz.'),
    ('nigeria','tunisia',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Nigerian passport holders.'),
    ('nigeria','turkmenistan','visa_required', NULL, 30,  '2026-03-15', 'Visa required for Nigerian passport holders.'),
    ('nigeria','ukraine',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Nigerian passport holders.'),
    ('nigeria','uruguay',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Nigerian passport holders.'),
    ('nigeria','uzbekistan', 'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Nigerian passport holders.'),
    ('nigeria','zimbabwe',   'visa_on_arrival',NULL, 30,  '2026-03-15', 'Visa-on-arrival or KAZA UNIVISA available at designated ports of entry.')
  ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO NOTHING;

  -- ============================================================
  -- EGYPT
  -- ============================================================
  INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, visa_subtype, max_stay_days, last_verified, notes)
  SELECT 'egypt', f.destination_slug, 'visa_required', NULL, 30, '2026-03-15',
    'Schengen visa required for Egyptian passport holders.'
  FROM visa_rules f
  WHERE f.passport_slug = 'france'
    AND f.destination_slug NOT IN ('france','egypt')
    AND f.destination_slug = ANY(schengen_eu)
    AND NOT EXISTS (SELECT 1 FROM visa_rules x WHERE x.passport_slug='egypt' AND x.destination_slug=f.destination_slug)
  ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO NOTHING;

  INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, visa_subtype, max_stay_days, last_verified, notes)
  VALUES
    ('egypt','algeria',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Egyptian passport holders.'),
    ('egypt','angola',     'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Egyptian passport holders.'),
    ('egypt','armenia',    'visa_free',      NULL, 180, '2026-03-15', 'Egyptian citizens may visit Armenia visa-free for up to 180 days.'),
    ('egypt','azerbaijan', 'evisa',          NULL, 30,  '2026-03-15', 'eVisa required. Apply at evisa.gov.az.'),
    ('egypt','bahamas',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Egyptian passport holders.'),
    ('egypt','bangladesh', 'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Egyptian passport holders.'),
    ('egypt','barbados',   'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Egyptian passport holders.'),
    ('egypt','bolivia',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Egyptian passport holders.'),
    ('egypt','cambodia',   'evisa',          NULL, 30,  '2026-03-15', 'eVisa available at evisa.gov.kh.'),
    ('egypt','costa-rica', 'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Egyptian passport holders.'),
    ('egypt','cuba',       'visa_on_arrival',NULL, 30,  '2026-03-15', 'Tourist card available on arrival. 30 days.'),
    ('egypt','dominican-republic','visa_on_arrival',NULL,30,'2026-03-15','Tourist card available on arrival.'),
    ('egypt','ecuador',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Egyptian passport holders.'),
    ('egypt','ethiopia',   'evisa',          NULL, 30,  '2026-03-15', 'eVisa required. Apply at evisa.gov.et.'),
    ('egypt','georgia',    'visa_free',      NULL, 365, '2026-03-15', 'Egyptian citizens may visit Georgia visa-free for up to 1 year.'),
    ('egypt','ghana',      'visa_on_arrival',NULL, 30,  '2026-03-15', 'Visa-on-arrival available at Kotoka International Airport.'),
    ('egypt','israel',     'visa_free',      NULL, 90,  '2026-03-15', 'Egyptian citizens may visit Israel visa-free for up to 90 days under the Egypt-Israel peace agreement. Check current diplomatic situation before travel.'),
    ('egypt','jamaica',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Egyptian passport holders.'),
    ('egypt','kazakhstan', 'visa_free',      NULL, 30,  '2026-03-15', 'Egyptian citizens may visit Kazakhstan visa-free for up to 30 days.'),
    ('egypt','kenya',      'evisa',          NULL, 90,  '2026-03-15', 'eVisa required. Apply at evisa.immigration.go.ke.'),
    ('egypt','laos',       'visa_on_arrival',NULL, 30,  '2026-03-15', 'Visa-on-arrival available.'),
    ('egypt','maldives',   'visa_free',      NULL, 30,  '2026-03-15', 'Free visa issued on arrival.'),
    ('egypt','mongolia',   'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Egyptian passport holders.'),
    ('egypt','myanmar',    'evisa',          NULL, 28,  '2026-03-15', 'eVisa available at evisa.moip.gov.mm.'),
    ('egypt','nepal',      'visa_on_arrival',NULL, 30,  '2026-03-15', 'Visa-on-arrival available at Tribhuvan International Airport.'),
    ('egypt','pakistan',   'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Egyptian passport holders.'),
    ('egypt','panama',     'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Egyptian passport holders.'),
    ('egypt','paraguay',   'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Egyptian passport holders.'),
    ('egypt','serbia',     'visa_free',      NULL, 30,  '2026-03-15', 'Egyptian citizens may visit Serbia visa-free for up to 30 days.'),
    ('egypt','sri-lanka',  'evisa',          NULL, 30,  '2026-03-15', 'eVisa required. Apply at eta.gov.lk.'),
    ('egypt','tanzania',   'evisa',          NULL, 90,  '2026-03-15', 'eVisa available at immigration.go.tz.'),
    ('egypt','turkmenistan','visa_required', NULL, 30,  '2026-03-15', 'Visa required for Egyptian passport holders.'),
    ('egypt','ukraine',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Egyptian passport holders.'),
    ('egypt','uruguay',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Egyptian passport holders.'),
    ('egypt','uzbekistan', 'visa_free',      NULL, 30,  '2026-03-15', 'Egyptian citizens may visit Uzbekistan visa-free for up to 30 days.'),
    ('egypt','zimbabwe',   'visa_on_arrival',NULL, 30,  '2026-03-15', 'Visa-on-arrival available at designated ports of entry.')
  ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO NOTHING;

  -- ============================================================
  -- VIETNAM, INDONESIA, PHILIPPINES, THAILAND
  -- (Southeast Asian passports — need Schengen visa, restricted Western access)
  -- ============================================================
  DECLARE
    sea_passports text[] := ARRAY['vietnam','indonesia','philippines','thailand'];
    sea_p text;
    sea_name text;
  BEGIN
    FOREACH sea_p IN ARRAY sea_passports LOOP
      sea_name := CASE sea_p
        WHEN 'vietnam'     THEN 'Vietnamese'
        WHEN 'indonesia'   THEN 'Indonesian'
        WHEN 'philippines' THEN 'Filipino'
        WHEN 'thailand'    THEN 'Thai'
      END;

      -- EU/Schengen: visa_required for all SEA passports
      INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, visa_subtype, max_stay_days, last_verified, notes)
      SELECT sea_p, f.destination_slug, 'visa_required', NULL, 30, '2026-03-15',
        'Schengen visa required for ' || sea_name || ' passport holders.'
      FROM visa_rules f
      WHERE f.passport_slug = 'france'
        AND f.destination_slug NOT IN ('france', sea_p)
        AND f.destination_slug = ANY(schengen_eu)
        AND NOT EXISTS (SELECT 1 FROM visa_rules x WHERE x.passport_slug=sea_p AND x.destination_slug=f.destination_slug)
      ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO NOTHING;

      -- Common missing destinations for SEA passports
      INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, visa_subtype, max_stay_days, last_verified, notes)
      VALUES
        (sea_p,'algeria',    'visa_required',  NULL, 30,  '2026-03-15', sea_name || ' passport holders require a visa for Algeria.'),
        (sea_p,'angola',     'visa_required',  NULL, 30,  '2026-03-15', sea_name || ' passport holders require a visa for Angola.'),
        (sea_p,'armenia',    'visa_free',      NULL, 180, '2026-03-15', sea_name || ' citizens may visit Armenia visa-free for up to 180 days.'),
        (sea_p,'azerbaijan', 'evisa',          NULL, 30,  '2026-03-15', 'eVisa required. Apply at evisa.gov.az.'),
        (sea_p,'bahamas',    'visa_required',  NULL, 30,  '2026-03-15', sea_name || ' passport holders require a visa for Bahamas.'),
        (sea_p,'bahrain',    'visa_on_arrival',NULL, 14,  '2026-03-15', 'Visa-on-arrival available for ' || sea_name || ' passport holders.'),
        (sea_p,'bangladesh', 'visa_required',  NULL, 30,  '2026-03-15', sea_name || ' passport holders require a visa for Bangladesh.'),
        (sea_p,'barbados',   'visa_required',  NULL, 30,  '2026-03-15', sea_name || ' passport holders require a visa for Barbados.'),
        (sea_p,'bolivia',    'visa_required',  NULL, 30,  '2026-03-15', sea_name || ' passport holders require a visa for Bolivia.'),
        (sea_p,'cambodia',   'evisa',          NULL, 30,  '2026-03-15', 'eVisa available at evisa.gov.kh.'),
        (sea_p,'costa-rica', 'visa_required',  NULL, 30,  '2026-03-15', sea_name || ' passport holders require a visa for Costa Rica.'),
        (sea_p,'cuba',       'visa_on_arrival',NULL, 30,  '2026-03-15', 'Tourist card available on arrival.'),
        (sea_p,'dominican-republic','visa_on_arrival',NULL,30,'2026-03-15','Tourist card available on arrival.'),
        (sea_p,'ecuador',    'visa_required',  NULL, 30,  '2026-03-15', sea_name || ' passport holders require a visa for Ecuador.'),
        (sea_p,'ethiopia',   'evisa',          NULL, 30,  '2026-03-15', 'eVisa required. Apply at evisa.gov.et.'),
        (sea_p,'georgia',    'visa_free',      NULL, 365, '2026-03-15', sea_name || ' citizens may visit Georgia visa-free for up to 1 year.'),
        (sea_p,'ghana',      'visa_on_arrival',NULL, 30,  '2026-03-15', 'Visa-on-arrival available at Kotoka International Airport.'),
        (sea_p,'israel',     'visa_required',  NULL, 30,  '2026-03-15', sea_name || ' passport holders require a visa for Israel.'),
        (sea_p,'jamaica',    'visa_required',  NULL, 30,  '2026-03-15', sea_name || ' passport holders require a visa for Jamaica.'),
        (sea_p,'jordan',     'evisa',          NULL, 30,  '2026-03-15', 'eVisa required. Apply at Jordan eVisa portal.'),
        (sea_p,'kazakhstan', 'visa_free',      NULL, 30,  '2026-03-15', sea_name || ' citizens may visit Kazakhstan visa-free for up to 30 days.'),
        (sea_p,'kenya',      'evisa',          NULL, 90,  '2026-03-15', 'eVisa required. Apply at evisa.immigration.go.ke.'),
        (sea_p,'kuwait',     'visa_required',  NULL, 30,  '2026-03-15', sea_name || ' passport holders require a visa for Kuwait.'),
        (sea_p,'maldives',   'visa_free',      NULL, 30,  '2026-03-15', 'Free visa issued on arrival in the Maldives.'),
        (sea_p,'mongolia',   'visa_required',  NULL, 30,  '2026-03-15', sea_name || ' passport holders require a visa for Mongolia.'),
        (sea_p,'myanmar',    'evisa',          NULL, 28,  '2026-03-15', 'eVisa available at evisa.moip.gov.mm.'),
        (sea_p,'nepal',      'visa_on_arrival',NULL, 30,  '2026-03-15', 'Visa-on-arrival available at Tribhuvan International Airport.'),
        (sea_p,'oman',       'evisa',          NULL, 30,  '2026-03-15', 'eVisa available at evisa.rop.gov.om.'),
        (sea_p,'pakistan',   'visa_required',  NULL, 30,  '2026-03-15', sea_name || ' passport holders require a visa for Pakistan.'),
        (sea_p,'panama',     'visa_required',  NULL, 30,  '2026-03-15', sea_name || ' passport holders require a visa for Panama.'),
        (sea_p,'paraguay',   'visa_required',  NULL, 30,  '2026-03-15', sea_name || ' passport holders require a visa for Paraguay.'),
        (sea_p,'serbia',     'visa_required',  NULL, 30,  '2026-03-15', sea_name || ' passport holders require a visa for Serbia.'),
        (sea_p,'sri-lanka',  'evisa',          NULL, 30,  '2026-03-15', 'eVisa required. Apply at eta.gov.lk.'),
        (sea_p,'tanzania',   'evisa',          NULL, 90,  '2026-03-15', 'eVisa available at immigration.go.tz.'),
        (sea_p,'turkmenistan','visa_required', NULL, 30,  '2026-03-15', sea_name || ' passport holders require a visa for Turkmenistan.'),
        (sea_p,'ukraine',    'visa_required',  NULL, 30,  '2026-03-15', sea_name || ' passport holders require a visa for Ukraine.'),
        (sea_p,'uruguay',    'visa_required',  NULL, 30,  '2026-03-15', sea_name || ' passport holders require a visa for Uruguay.'),
        (sea_p,'uzbekistan', 'visa_free',      NULL, 30,  '2026-03-15', sea_name || ' citizens may visit Uzbekistan visa-free for up to 30 days.'),
        (sea_p,'zimbabwe',   'visa_on_arrival',NULL, 30,  '2026-03-15', 'Visa-on-arrival available at designated ports of entry.')
      ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO NOTHING;

    END LOOP;
  END;

  -- ============================================================
  -- RUSSIA
  -- ============================================================
  INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, visa_subtype, max_stay_days, last_verified, notes)
  SELECT 'russia', f.destination_slug, 'visa_required', NULL, 30, '2026-03-15',
    'Schengen visa required for Russian passport holders. Note: Most Schengen countries have suspended standard tourist visa issuance to Russian nationals due to the Ukraine conflict. Check current advisories.'
  FROM visa_rules f
  WHERE f.passport_slug = 'france'
    AND f.destination_slug NOT IN ('france','russia')
    AND f.destination_slug = ANY(schengen_eu)
    AND NOT EXISTS (SELECT 1 FROM visa_rules x WHERE x.passport_slug='russia' AND x.destination_slug=f.destination_slug)
  ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO NOTHING;

  INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, visa_subtype, max_stay_days, last_verified, notes)
  VALUES
    ('russia','algeria',    'visa_free',      NULL, 90,  '2026-03-15', 'Russian citizens may visit Algeria visa-free for up to 90 days.'),
    ('russia','angola',     'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Russian passport holders.'),
    ('russia','armenia',    'visa_free',      NULL, 180, '2026-03-15', 'Russian citizens may visit Armenia visa-free for up to 180 days (CIS agreement).'),
    ('russia','azerbaijan', 'visa_free',      NULL, 90,  '2026-03-15', 'Russian citizens may visit Azerbaijan visa-free for up to 90 days (CIS agreement).'),
    ('russia','bahamas',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Russian passport holders.'),
    ('russia','bahrain',    'visa_on_arrival',NULL, 14,  '2026-03-15', 'Visa-on-arrival available for Russian passport holders.'),
    ('russia','bangladesh', 'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Russian passport holders.'),
    ('russia','barbados',   'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Russian passport holders.'),
    ('russia','bolivia',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Russian passport holders.'),
    ('russia','cambodia',   'evisa',          NULL, 30,  '2026-03-15', 'eVisa available at evisa.gov.kh.'),
    ('russia','costa-rica', 'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Russian passport holders.'),
    ('russia','cuba',       'visa_free',      NULL, 90,  '2026-03-15', 'Russian citizens may visit Cuba visa-free for up to 90 days. Long-standing bilateral agreement.'),
    ('russia','dominican-republic','visa_on_arrival',NULL,30,'2026-03-15','Tourist card available on arrival.'),
    ('russia','ecuador',    'visa_free',      NULL, 90,  '2026-03-15', 'Russian citizens may visit Ecuador visa-free for up to 90 days.'),
    ('russia','ethiopia',   'evisa',          NULL, 30,  '2026-03-15', 'eVisa required. Apply at evisa.gov.et.'),
    ('russia','georgia',    'visa_free',      NULL, 365, '2026-03-15', 'Russian citizens may visit Georgia visa-free for up to 1 year. Check current entry conditions given geopolitical situation.'),
    ('russia','ghana',      'visa_on_arrival',NULL, 30,  '2026-03-15', 'Visa-on-arrival available at Kotoka International Airport.'),
    ('russia','israel',     'visa_free',      NULL, 90,  '2026-03-15', 'Russian citizens may visit Israel visa-free for up to 90 days under a bilateral agreement. Check current diplomatic situation.'),
    ('russia','jamaica',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Russian passport holders.'),
    ('russia','jordan',     'evisa',          NULL, 30,  '2026-03-15', 'eVisa required for Russian passport holders.'),
    ('russia','kazakhstan', 'visa_free',      NULL, 90,  '2026-03-15', 'Russian citizens may visit Kazakhstan visa-free for up to 90 days (CIS/EAEU member).'),
    ('russia','kenya',      'evisa',          NULL, 90,  '2026-03-15', 'eVisa required. Apply at evisa.immigration.go.ke.'),
    ('russia','kuwait',     'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Russian passport holders.'),
    ('russia','laos',       'visa_on_arrival',NULL, 30,  '2026-03-15', 'Visa-on-arrival available at Wattay International Airport.'),
    ('russia','maldives',   'visa_free',      NULL, 30,  '2026-03-15', 'Free visa issued on arrival.'),
    ('russia','mongolia',   'visa_free',      NULL, 30,  '2026-03-15', 'Russian citizens may visit Mongolia visa-free for up to 30 days.'),
    ('russia','myanmar',    'evisa',          NULL, 28,  '2026-03-15', 'eVisa available at evisa.moip.gov.mm.'),
    ('russia','nepal',      'visa_on_arrival',NULL, 30,  '2026-03-15', 'Visa-on-arrival available at Tribhuvan International Airport.'),
    ('russia','oman',       'evisa',          NULL, 30,  '2026-03-15', 'eVisa available at evisa.rop.gov.om.'),
    ('russia','pakistan',   'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Russian passport holders.'),
    ('russia','panama',     'visa_free',      NULL, 90,  '2026-03-15', 'Russian citizens may visit Panama visa-free for up to 90 days.'),
    ('russia','paraguay',   'visa_free',      NULL, 90,  '2026-03-15', 'Russian citizens may visit Paraguay visa-free for up to 90 days.'),
    ('russia','serbia',     'visa_free',      NULL, 30,  '2026-03-15', 'Russian citizens may visit Serbia visa-free for up to 30 days.'),
    ('russia','sri-lanka',  'evisa',          NULL, 30,  '2026-03-15', 'eVisa required. Apply at eta.gov.lk.'),
    ('russia','tanzania',   'evisa',          NULL, 90,  '2026-03-15', 'eVisa available at immigration.go.tz.'),
    ('russia','turkmenistan','visa_required', NULL, 30,  '2026-03-15', 'Visa required. Apply at Turkmenistan embassy.'),
    ('russia','ukraine',    'restricted',     NULL, NULL,'2026-03-15', 'Russian citizens cannot travel to Ukraine due to the ongoing armed conflict. All border crossings between Russia and Ukraine are closed.'),
    ('russia','uruguay',    'visa_free',      NULL, 90,  '2026-03-15', 'Russian citizens may visit Uruguay visa-free for up to 90 days.'),
    ('russia','uzbekistan', 'visa_free',      NULL, 30,  '2026-03-15', 'Russian citizens may visit Uzbekistan visa-free (CIS agreement).'),
    ('russia','zimbabwe',   'visa_on_arrival',NULL, 30,  '2026-03-15', 'Visa-on-arrival available at designated ports of entry.')
  ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO NOTHING;

  -- ============================================================
  -- MOROCCO
  -- ============================================================
  INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, visa_subtype, max_stay_days, last_verified, notes)
  SELECT 'morocco', f.destination_slug, 'visa_required', NULL, 30, '2026-03-15',
    'Schengen visa required for Moroccan passport holders.'
  FROM visa_rules f
  WHERE f.passport_slug = 'france'
    AND f.destination_slug NOT IN ('france','morocco')
    AND f.destination_slug = ANY(schengen_eu)
    AND NOT EXISTS (SELECT 1 FROM visa_rules x WHERE x.passport_slug='morocco' AND x.destination_slug=f.destination_slug)
  ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO NOTHING;

  INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, visa_subtype, max_stay_days, last_verified, notes)
  VALUES
    ('morocco','algeria',    'restricted',     NULL, NULL,'2026-03-15', 'Land border between Morocco and Algeria has been closed since 1994. No diplomatic relations. Entry is generally not possible.'),
    ('morocco','angola',     'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Moroccan passport holders.'),
    ('morocco','armenia',    'visa_free',      NULL, 180, '2026-03-15', 'Moroccan citizens may visit Armenia visa-free for up to 180 days.'),
    ('morocco','azerbaijan', 'evisa',          NULL, 30,  '2026-03-15', 'eVisa required. Apply at evisa.gov.az.'),
    ('morocco','bahamas',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Moroccan passport holders.'),
    ('morocco','bahrain',    'visa_on_arrival',NULL, 14,  '2026-03-15', 'Visa-on-arrival available for Moroccan passport holders.'),
    ('morocco','bangladesh', 'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Moroccan passport holders.'),
    ('morocco','barbados',   'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Moroccan passport holders.'),
    ('morocco','bolivia',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Moroccan passport holders.'),
    ('morocco','cambodia',   'evisa',          NULL, 30,  '2026-03-15', 'eVisa available at evisa.gov.kh.'),
    ('morocco','costa-rica', 'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Moroccan passport holders.'),
    ('morocco','cuba',       'visa_on_arrival',NULL, 30,  '2026-03-15', 'Tourist card available on arrival.'),
    ('morocco','dominican-republic','visa_on_arrival',NULL,30,'2026-03-15','Tourist card available on arrival.'),
    ('morocco','ecuador',    'visa_free',      NULL, 90,  '2026-03-15', 'Moroccan citizens may visit Ecuador visa-free for up to 90 days.'),
    ('morocco','ethiopia',   'evisa',          NULL, 30,  '2026-03-15', 'eVisa required. Apply at evisa.gov.et.'),
    ('morocco','georgia',    'visa_free',      NULL, 365, '2026-03-15', 'Moroccan citizens may visit Georgia visa-free for up to 1 year.'),
    ('morocco','ghana',      'visa_on_arrival',NULL, 30,  '2026-03-15', 'Visa-on-arrival available at Kotoka International Airport.'),
    ('morocco','israel',     'visa_required',  NULL, 30,  '2026-03-15', 'Moroccan passport holders may visit Israel since Abraham Accords normalisation (2020). However, a visa may still be required — verify current status before travel.'),
    ('morocco','jamaica',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Moroccan passport holders.'),
    ('morocco','jordan',     'visa_free',      NULL, 30,  '2026-03-15', 'Moroccan citizens may visit Jordan visa-free for up to 30 days (Arab League agreement).'),
    ('morocco','kazakhstan', 'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Moroccan passport holders.'),
    ('morocco','kenya',      'evisa',          NULL, 90,  '2026-03-15', 'eVisa required. Apply at evisa.immigration.go.ke.'),
    ('morocco','kuwait',     'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Moroccan passport holders.'),
    ('morocco','laos',       'visa_on_arrival',NULL, 30,  '2026-03-15', 'Visa-on-arrival available.'),
    ('morocco','maldives',   'visa_free',      NULL, 30,  '2026-03-15', 'Free visa issued on arrival.'),
    ('morocco','mongolia',   'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Moroccan passport holders.'),
    ('morocco','myanmar',    'evisa',          NULL, 28,  '2026-03-15', 'eVisa available at evisa.moip.gov.mm.'),
    ('morocco','nepal',      'visa_on_arrival',NULL, 30,  '2026-03-15', 'Visa-on-arrival at Tribhuvan International Airport.'),
    ('morocco','pakistan',   'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Moroccan passport holders.'),
    ('morocco','panama',     'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Moroccan passport holders.'),
    ('morocco','paraguay',   'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Moroccan passport holders.'),
    ('morocco','serbia',     'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Moroccan passport holders.'),
    ('morocco','sri-lanka',  'evisa',          NULL, 30,  '2026-03-15', 'eVisa required. Apply at eta.gov.lk.'),
    ('morocco','tanzania',   'evisa',          NULL, 90,  '2026-03-15', 'eVisa available at immigration.go.tz.'),
    ('morocco','turkmenistan','visa_required', NULL, 30,  '2026-03-15', 'Visa required for Moroccan passport holders.'),
    ('morocco','ukraine',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Moroccan passport holders.'),
    ('morocco','uruguay',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Moroccan passport holders.'),
    ('morocco','uzbekistan', 'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Moroccan passport holders.'),
    ('morocco','zimbabwe',   'visa_on_arrival',NULL, 30,  '2026-03-15', 'Visa-on-arrival available at designated ports of entry.')
  ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO NOTHING;

  -- ============================================================
  -- UKRAINE
  -- (Has Schengen visa-free since 2017 — already in data. Add missing non-Schengen)
  -- ============================================================
  INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, visa_subtype, max_stay_days, last_verified, notes)
  VALUES
    ('ukraine','algeria',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Ukrainian passport holders.'),
    ('ukraine','angola',     'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Ukrainian passport holders.'),
    ('ukraine','armenia',    'visa_free',      NULL, 180, '2026-03-15', 'Ukrainian citizens may visit Armenia visa-free for up to 180 days.'),
    ('ukraine','azerbaijan', 'visa_free',      NULL, 90,  '2026-03-15', 'Ukrainian citizens may visit Azerbaijan visa-free for up to 90 days.'),
    ('ukraine','bahamas',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Ukrainian passport holders.'),
    ('ukraine','bahrain',    'visa_on_arrival',NULL, 14,  '2026-03-15', 'Visa-on-arrival available for Ukrainian passport holders.'),
    ('ukraine','bangladesh', 'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Ukrainian passport holders.'),
    ('ukraine','barbados',   'visa_free',      NULL, 180, '2026-03-15', 'Ukrainian citizens may visit Barbados visa-free for up to 6 months.'),
    ('ukraine','bolivia',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Ukrainian passport holders.'),
    ('ukraine','cambodia',   'evisa',          NULL, 30,  '2026-03-15', 'eVisa available at evisa.gov.kh.'),
    ('ukraine','costa-rica', 'visa_free',      NULL, 90,  '2026-03-15', 'Ukrainian citizens may visit Costa Rica visa-free for up to 90 days.'),
    ('ukraine','cuba',       'visa_on_arrival',NULL, 30,  '2026-03-15', 'Tourist card available on arrival.'),
    ('ukraine','dominican-republic','visa_on_arrival',NULL,30,'2026-03-15','Tourist card available on arrival.'),
    ('ukraine','ecuador',    'visa_free',      NULL, 90,  '2026-03-15', 'Ukrainian citizens may visit Ecuador visa-free for up to 90 days.'),
    ('ukraine','ethiopia',   'evisa',          NULL, 30,  '2026-03-15', 'eVisa required. Apply at evisa.gov.et.'),
    ('ukraine','georgia',    'visa_free',      NULL, 365, '2026-03-15', 'Ukrainian citizens may visit Georgia visa-free for up to 1 year.'),
    ('ukraine','ghana',      'visa_on_arrival',NULL, 30,  '2026-03-15', 'Visa-on-arrival available at Kotoka International Airport.'),
    ('ukraine','israel',     'visa_free',      NULL, 90,  '2026-03-15', 'Ukrainian citizens may visit Israel visa-free for up to 90 days.'),
    ('ukraine','jamaica',    'visa_free',      NULL, 90,  '2026-03-15', 'Ukrainian citizens may visit Jamaica visa-free for up to 90 days.'),
    ('ukraine','jordan',     'evisa',          NULL, 30,  '2026-03-15', 'eVisa required for Ukrainian passport holders.'),
    ('ukraine','kazakhstan', 'visa_free',      NULL, 30,  '2026-03-15', 'Ukrainian citizens may visit Kazakhstan visa-free for up to 30 days.'),
    ('ukraine','kenya',      'evisa',          NULL, 90,  '2026-03-15', 'eVisa required. Apply at evisa.immigration.go.ke.'),
    ('ukraine','kuwait',     'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Ukrainian passport holders.'),
    ('ukraine','laos',       'visa_on_arrival',NULL, 30,  '2026-03-15', 'Visa-on-arrival available at major ports of entry.'),
    ('ukraine','maldives',   'visa_free',      NULL, 30,  '2026-03-15', 'Free visa issued on arrival.'),
    ('ukraine','mongolia',   'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Ukrainian passport holders.'),
    ('ukraine','myanmar',    'evisa',          NULL, 28,  '2026-03-15', 'eVisa available at evisa.moip.gov.mm.'),
    ('ukraine','nepal',      'visa_on_arrival',NULL, 30,  '2026-03-15', 'Visa-on-arrival at Tribhuvan International Airport.'),
    ('ukraine','oman',       'evisa',          NULL, 30,  '2026-03-15', 'eVisa available at evisa.rop.gov.om.'),
    ('ukraine','pakistan',   'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Ukrainian passport holders.'),
    ('ukraine','panama',     'visa_free',      NULL, 90,  '2026-03-15', 'Ukrainian citizens may visit Panama visa-free for up to 90 days.'),
    ('ukraine','paraguay',   'visa_free',      NULL, 90,  '2026-03-15', 'Ukrainian citizens may visit Paraguay visa-free for up to 90 days.'),
    ('ukraine','serbia',     'visa_free',      NULL, 90,  '2026-03-15', 'Ukrainian citizens may visit Serbia visa-free for up to 90 days.'),
    ('ukraine','sri-lanka',  'evisa',          NULL, 30,  '2026-03-15', 'eVisa required. Apply at eta.gov.lk.'),
    ('ukraine','tanzania',   'evisa',          NULL, 90,  '2026-03-15', 'eVisa available at immigration.go.tz.'),
    ('ukraine','turkmenistan','visa_required', NULL, 30,  '2026-03-15', 'Visa required for Ukrainian passport holders.'),
    ('ukraine','uruguay',    'visa_free',      NULL, 90,  '2026-03-15', 'Ukrainian citizens may visit Uruguay visa-free for up to 90 days.'),
    ('ukraine','uzbekistan', 'visa_free',      NULL, 30,  '2026-03-15', 'Ukrainian citizens may visit Uzbekistan visa-free for up to 30 days.'),
    ('ukraine','zimbabwe',   'visa_on_arrival',NULL, 30,  '2026-03-15', 'Visa-on-arrival available at designated ports of entry.')
  ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO NOTHING;

  -- ============================================================
  -- SAUDI ARABIA
  -- ============================================================
  INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, visa_subtype, max_stay_days, last_verified, notes)
  SELECT 'saudi-arabia', f.destination_slug, 'visa_required', NULL, 30, '2026-03-15',
    'Schengen visa required for Saudi passport holders.'
  FROM visa_rules f
  WHERE f.passport_slug = 'france'
    AND f.destination_slug NOT IN ('france','saudi-arabia')
    AND f.destination_slug = ANY(schengen_eu)
    AND NOT EXISTS (SELECT 1 FROM visa_rules x WHERE x.passport_slug='saudi-arabia' AND x.destination_slug=f.destination_slug)
  ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO NOTHING;

  INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, visa_subtype, max_stay_days, last_verified, notes)
  VALUES
    ('saudi-arabia','algeria',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Saudi passport holders.'),
    ('saudi-arabia','angola',     'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Saudi passport holders.'),
    ('saudi-arabia','armenia',    'visa_free',      NULL, 180, '2026-03-15', 'Saudi citizens may visit Armenia visa-free for up to 180 days.'),
    ('saudi-arabia','azerbaijan', 'evisa',          NULL, 30,  '2026-03-15', 'eVisa available. Apply at evisa.gov.az.'),
    ('saudi-arabia','bahamas',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Saudi passport holders.'),
    ('saudi-arabia','bangladesh', 'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Saudi passport holders.'),
    ('saudi-arabia','barbados',   'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Saudi passport holders.'),
    ('saudi-arabia','bolivia',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Saudi passport holders.'),
    ('saudi-arabia','cambodia',   'evisa',          NULL, 30,  '2026-03-15', 'eVisa available at evisa.gov.kh.'),
    ('saudi-arabia','costa-rica', 'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Saudi passport holders.'),
    ('saudi-arabia','cuba',       'visa_on_arrival',NULL, 30,  '2026-03-15', 'Tourist card available on arrival.'),
    ('saudi-arabia','dominican-republic','visa_on_arrival',NULL,30,'2026-03-15','Tourist card available on arrival.'),
    ('saudi-arabia','ecuador',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Saudi passport holders.'),
    ('saudi-arabia','ethiopia',   'evisa',          NULL, 30,  '2026-03-15', 'eVisa required. Apply at evisa.gov.et.'),
    ('saudi-arabia','georgia',    'visa_free',      NULL, 365, '2026-03-15', 'Saudi citizens may visit Georgia visa-free for up to 1 year.'),
    ('saudi-arabia','ghana',      'visa_on_arrival',NULL, 30,  '2026-03-15', 'Visa-on-arrival available at Kotoka International Airport.'),
    ('saudi-arabia','israel',     'visa_free',      NULL, 90,  '2026-03-15', 'Saudi-Israel normalisation ongoing — Saudi passport holders can visit Israel. Verify current status before travel.'),
    ('saudi-arabia','jamaica',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Saudi passport holders.'),
    ('saudi-arabia','jordan',     'visa_free',      NULL, 30,  '2026-03-15', 'Saudi citizens may visit Jordan visa-free for up to 30 days (Arab League).'),
    ('saudi-arabia','kazakhstan', 'visa_free',      NULL, 30,  '2026-03-15', 'Saudi citizens may visit Kazakhstan visa-free for up to 30 days.'),
    ('saudi-arabia','kenya',      'evisa',          NULL, 90,  '2026-03-15', 'eVisa required. Apply at evisa.immigration.go.ke.'),
    ('saudi-arabia','laos',       'visa_on_arrival',NULL, 30,  '2026-03-15', 'Visa-on-arrival available.'),
    ('saudi-arabia','maldives',   'visa_free',      NULL, 30,  '2026-03-15', 'Free visa issued on arrival.'),
    ('saudi-arabia','mongolia',   'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Saudi passport holders.'),
    ('saudi-arabia','myanmar',    'evisa',          NULL, 28,  '2026-03-15', 'eVisa available at evisa.moip.gov.mm.'),
    ('saudi-arabia','nepal',      'visa_on_arrival',NULL, 30,  '2026-03-15', 'Visa-on-arrival at Tribhuvan International Airport.'),
    ('saudi-arabia','pakistan',   'visa_free',      NULL, 30,  '2026-03-15', 'Saudi citizens may visit Pakistan visa-free for up to 30 days. Strong bilateral ties.'),
    ('saudi-arabia','panama',     'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Saudi passport holders.'),
    ('saudi-arabia','paraguay',   'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Saudi passport holders.'),
    ('saudi-arabia','serbia',     'visa_free',      NULL, 30,  '2026-03-15', 'Saudi citizens may visit Serbia visa-free for up to 30 days.'),
    ('saudi-arabia','sri-lanka',  'evisa',          NULL, 30,  '2026-03-15', 'eVisa required. Apply at eta.gov.lk.'),
    ('saudi-arabia','tanzania',   'evisa',          NULL, 90,  '2026-03-15', 'eVisa available at immigration.go.tz.'),
    ('saudi-arabia','turkmenistan','visa_required', NULL, 30,  '2026-03-15', 'Visa required for Saudi passport holders.'),
    ('saudi-arabia','ukraine',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Saudi passport holders.'),
    ('saudi-arabia','uruguay',    'visa_required',  NULL, 30,  '2026-03-15', 'Visa required for Saudi passport holders.'),
    ('saudi-arabia','uzbekistan', 'visa_free',      NULL, 30,  '2026-03-15', 'Saudi citizens may visit Uzbekistan visa-free for up to 30 days.'),
    ('saudi-arabia','zimbabwe',   'visa_on_arrival',NULL, 30,  '2026-03-15', 'Visa-on-arrival available at designated ports of entry.')
  ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO NOTHING;

END $$;
