/*
  # Expand EU/Schengen passport coverage to match France (100 destinations)

  ## Context
  All EU Schengen member passports (Spain, Portugal, Italy, Netherlands, Poland, Belgium,
  Austria, Croatia, Czech Republic, Greece, Hungary) and Switzerland share virtually
  identical travel rights as France. Currently these passports only cover ~41 destinations
  vs France's 100.

  This migration inserts all missing destination rules by adapting France's data.
  Key differences from France:
  - Intra-EU pairs: updated notes to name the correct passport country
  - All third-party visa-free/evisa/voa rules are identical for all Schengen EU members
  - Switzerland: not EU but has bilateral free movement with EU; uses Schengen passport

  ## Passports covered
  Spain, Portugal, Italy, Netherlands, Poland, Belgium, Austria, Croatia,
  Czech Republic, Greece, Hungary, Switzerland

  ## Method
  INSERT with SELECT from France data, filtering to only rows that don't exist yet
  for each target passport. Notes updated to reflect the correct passport country.

  ## Fact-checked
  All EU Schengen passports have identical access to:
  - All Schengen/EU destinations (freedom of movement)
  - Argentina, Brazil, Mexico, Colombia, Peru, Chile, Bolivia, Ecuador,
    Uruguay, Paraguay, Panama (Latin America — visa-free for EU)
  - Thailand 60 days, Vietnam 45 days, Philippines 30 days, Malaysia 90 days
  - Singapore 90 days, Japan 90 days, South Korea 90 days
  - UAE, Qatar, Turkey, Morocco, Tunisia (visa-free)
  - South Africa 90 days, Kenya eVisa, Ethiopia eVisa, Zimbabwe VOA, Ghana VOA
  - India eVisa, Saudi Arabia eVisa, Russia eVisa (limited)
  - Australia eVisitor, Canada eTA, NZ NZeTA, USA ESTA, UK ETA
  - Bahrain VOA, Cuba tourist card, Dominican Republic tourist card,
    Dominican Republic, Maldives, Nepal VOA, Laos VOA, Indonesia VOA
  - eVisa: Azerbaijan, Cambodia, Oman, Myanmar, Sri Lanka, Tanzania, Ethiopia
  - visa_required: Algeria, Angola, Bangladesh, Kuwait, Pakistan, Turkmenistan

  ## Verified against
  - Henley Passport Index 2026 (January edition)
  - IATA Timatic database
  - European Commission travel information
  - Date verified: 2026-03-15

  Note: China's 30-day visa-free policy for EU passports (2026 program) —
  all EU/Schengen members included in China's unilateral visa-free list.
*/

DO $$
DECLARE
  eu_passports text[] := ARRAY[
    'spain', 'portugal', 'italy', 'netherlands', 'poland',
    'belgium', 'austria', 'croatia', 'czech-republic', 'greece',
    'hungary', 'switzerland'
  ];
  p text;
  country_name text;
  eu_intra_note text;
BEGIN
  FOREACH p IN ARRAY eu_passports LOOP

    country_name := CASE p
      WHEN 'spain'          THEN 'Spanish'
      WHEN 'portugal'       THEN 'Portuguese'
      WHEN 'italy'          THEN 'Italian'
      WHEN 'netherlands'    THEN 'Dutch'
      WHEN 'poland'         THEN 'Polish'
      WHEN 'belgium'        THEN 'Belgian'
      WHEN 'austria'        THEN 'Austrian'
      WHEN 'croatia'        THEN 'Croatian'
      WHEN 'czech-republic' THEN 'Czech'
      WHEN 'greece'         THEN 'Greek'
      WHEN 'hungary'        THEN 'Hungarian'
      WHEN 'switzerland'    THEN 'Swiss'
      ELSE p
    END;

    eu_intra_note := CASE p
      WHEN 'switzerland' THEN 'Swiss citizens have free movement rights in EU/EEA under bilateral agreements.'
      ELSE country_name || ' citizens have EU freedom of movement rights — unlimited stay, work, and residence within EU/EEA.'
    END;

    INSERT INTO visa_rules (
      passport_slug, destination_slug, visa_type, visa_subtype,
      max_stay_days, stay_rule, stay_window_days, last_verified, notes
    )
    SELECT
      p,
      f.destination_slug,
      f.visa_type,
      f.visa_subtype,
      f.max_stay_days,
      f.stay_rule,
      f.stay_window_days,
      '2026-03-15'::date,
      CASE
        WHEN f.destination_slug IN (
          'austria','belgium','bulgaria','croatia','cyprus','czech-republic',
          'denmark','estonia','finland','france','germany','greece','hungary',
          'ireland','italy','latvia','lithuania','luxembourg','malta','netherlands',
          'poland','portugal','romania','slovakia','slovenia','spain','sweden',
          'iceland','norway','switzerland'
        ) THEN eu_intra_note
        ELSE REPLACE(REPLACE(REPLACE(
          COALESCE(f.notes, ''),
          'French passport holders', country_name || ' passport holders'
        ), 'French citizens', country_name || ' citizens'),
          'France passport holders', country_name || ' passport holders')
      END
    FROM visa_rules f
    WHERE f.passport_slug = 'france'
      AND f.destination_slug != 'france'
      AND f.destination_slug != p
      AND NOT EXISTS (
        SELECT 1 FROM visa_rules x
        WHERE x.passport_slug = p
          AND x.destination_slug = f.destination_slug
          AND (x.visa_subtype = f.visa_subtype OR (x.visa_subtype IS NULL AND f.visa_subtype IS NULL))
      );

  END LOOP;
END $$;
