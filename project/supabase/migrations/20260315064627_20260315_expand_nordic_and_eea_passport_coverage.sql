/*
  # Expand Nordic, EEA, and similar EU passport coverage

  ## Passports covered
  Denmark, Finland, Norway, Sweden, Ireland, Romania, Ukraine

  ## Context
  - Denmark, Finland, Sweden: EU Schengen members — identical rights to France
  - Norway: EEA/Schengen (EFTA) — nearly identical to EU passports for 3rd-country travel
  - Ireland: EU member but NOT Schengen — same 3rd-country access as EU, but separate
    immigration arrangement with UK (Common Travel Area)
  - Romania: EU member but NOT fully Schengen (joined air/sea Schengen March 2024) —
    same 3rd-country access as EU
  - Ukraine: Non-EU — has visa-free to EU/Schengen (90/180 days) but NOT freedom of movement.
    3rd country travel rights differ significantly from EU passports.

  ## Ukraine specifics (NOT copying France's EU intra-bloc rights)
  Ukraine passport holders have visa-free to EU Schengen (90/180) but:
  - Cannot stay in EU destinations as long as EU citizens
  - Will use existing Ukraine data for EU destinations (already entered)
  - Only adding missing 3rd-country destinations where Ukraine has same access as EU

  ## Date verified: 2026-03-15
  Sources: Henley Passport Index Q1 2026, IATA Timatic, respective MOFA websites
*/

DO $$
DECLARE
  similar_eu_passports text[] := ARRAY[
    'denmark', 'finland', 'sweden', 'ireland', 'romania', 'norway'
  ];
  p text;
  country_name text;
  eu_intra_note text;
BEGIN
  FOREACH p IN ARRAY similar_eu_passports LOOP

    country_name := CASE p
      WHEN 'denmark'   THEN 'Danish'
      WHEN 'finland'   THEN 'Finnish'
      WHEN 'sweden'    THEN 'Swedish'
      WHEN 'ireland'   THEN 'Irish'
      WHEN 'romania'   THEN 'Romanian'
      WHEN 'norway'    THEN 'Norwegian'
      ELSE p
    END;

    eu_intra_note := CASE p
      WHEN 'norway' THEN 'Norwegian citizens have EEA/Schengen free movement rights. Unlimited stay within EU/EEA/Schengen area.'
      WHEN 'ireland' THEN 'Irish citizens have EU freedom of movement rights — unlimited stay, work, and residence within EU/EEA.'
      WHEN 'romania' THEN 'Romanian citizens have EU freedom of movement rights — unlimited stay, work, and residence within EU/EEA.'
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
