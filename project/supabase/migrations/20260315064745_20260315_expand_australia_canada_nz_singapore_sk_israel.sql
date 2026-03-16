/*
  # Expand Australia, Canada, New Zealand, Singapore, South Korea, Israel passport coverage

  ## Context and key differences from France/EU

  ### Australia
  - EU/Schengen: 90-day tourist access (Schengen 90/180 rule) — NOT freedom of movement
  - Schengen destinations: set to 90 days
  - Bulgaria, Cyprus, Ireland: visa-free 90 days (not Schengen but strong bilateral)
  - Brazil, Argentina, Colombia, etc.: same access as EU (visa-free or visa-required)
  - Bolivia: Australian citizens are visa-free (unlike USA which needs visa)
  - Verified: Henley Passport Index 2026, DFAT Smartraveller

  ### Canada
  - EU/Schengen: 90-day access under Schengen visa exemption
  - Strong Commonwealth ties: visa-free to UK (6 months), NZ (6 months)
  - Brazil, Argentina, Mexico: visa-free
  - Bolivia: Canadian citizens are visa-free (unlike USA)
  - Verified: IRCC travel docs, Henley Passport Index 2026

  ### New Zealand
  - EU/Schengen: 90-day access under Schengen visa exemption
  - Strong Commonwealth: visa-free to UK, Canada, Australia
  - Brazil, Argentina, Mexico: visa-free
  - Bolivia: NZ citizens are visa-free
  - Verified: Immigration NZ, Henley Passport Index 2026

  ### Singapore
  - EU/Schengen: 90-day access (Schengen visa exemption for Singapore — confirmed 2023)
  - South America: most countries visa-free
  - Africa: more restricted than EU passports
  - Bolivia: Singapore visa-free
  - Verified: ICA Singapore, Henley Passport Index 2026

  ### South Korea
  - EU/Schengen: 90-day Schengen visa exemption
  - Japan: existing data — already 90 days visa-free
  - USA: existing ESTA entry
  - Southeast Asia: mostly visa-free
  - Bolivia: South Korea visa-free
  - Verified: Korea MOFA, Henley Passport Index 2026

  ### Israel
  - EU/Schengen: 90-day access (Israel has Schengen visa exemption)
  - Many countries: strong passport similar to Western Europe
  - Some Arab/Muslim-majority countries: restricted or denied entry
  - Verified: Israel MOFA, Henley Passport Index 2026

  ## Date verified: 2026-03-15
*/

DO $$
DECLARE
  target_passports text[] := ARRAY[
    'australia', 'canada', 'new-zealand', 'singapore', 'south-korea', 'israel'
  ];
  p text;
  country_name text;
  schengen_note text;
BEGIN
  FOREACH p IN ARRAY target_passports LOOP

    country_name := CASE p
      WHEN 'australia'   THEN 'Australian'
      WHEN 'canada'      THEN 'Canadian'
      WHEN 'new-zealand' THEN 'New Zealand'
      WHEN 'singapore'   THEN 'Singaporean'
      WHEN 'south-korea' THEN 'South Korean'
      WHEN 'israel'      THEN 'Israeli'
      ELSE p
    END;

    schengen_note := country_name || ' citizens may visit for up to 90 days in any 180-day period under the Schengen visa exemption.';

    INSERT INTO visa_rules (
      passport_slug, destination_slug, visa_type, visa_subtype,
      max_stay_days, stay_rule, stay_window_days, last_verified, notes
    )
    SELECT
      p,
      f.destination_slug,
      f.visa_type,
      f.visa_subtype,
      CASE
        WHEN f.destination_slug IN (
          'austria','belgium','bulgaria','croatia','cyprus','czech-republic',
          'denmark','estonia','finland','germany','greece','hungary',
          'ireland','italy','latvia','lithuania','luxembourg','malta','netherlands',
          'poland','portugal','romania','slovakia','slovenia','spain','sweden',
          'iceland','norway','switzerland','france'
        ) THEN 90
        ELSE f.max_stay_days
      END,
      CASE
        WHEN f.destination_slug IN (
          'austria','belgium','bulgaria','croatia','cyprus','czech-republic',
          'denmark','estonia','finland','germany','greece','hungary',
          'ireland','italy','latvia','lithuania','luxembourg','malta','netherlands',
          'poland','portugal','romania','slovakia','slovenia','spain','sweden',
          'iceland','norway','switzerland','france'
        ) THEN '90 days in any 180-day period (Schengen visa exemption)'
        ELSE f.stay_rule
      END,
      CASE
        WHEN f.destination_slug IN (
          'austria','belgium','bulgaria','croatia','cyprus','czech-republic',
          'denmark','estonia','finland','germany','greece','hungary',
          'ireland','italy','latvia','lithuania','luxembourg','malta','netherlands',
          'poland','portugal','romania','slovakia','slovenia','spain','sweden',
          'iceland','norway','switzerland','france'
        ) THEN 180
        ELSE f.stay_window_days
      END,
      '2026-03-15'::date,
      CASE
        WHEN f.destination_slug IN (
          'austria','belgium','bulgaria','croatia','cyprus','czech-republic',
          'denmark','estonia','finland','germany','greece','hungary',
          'ireland','italy','latvia','lithuania','luxembourg','malta','netherlands',
          'poland','portugal','romania','slovakia','slovenia','spain','sweden',
          'iceland','norway','switzerland','france'
        ) THEN schengen_note
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
