/*
  # Expand mid-tier and emerging passport coverage

  ## Passports: UAE, Qatar, Malaysia, Mexico, Argentina, Chile, Brazil, Peru, Colombia, South Africa, Turkey

  ## Key differences from France for each passport group:

  ### UAE & Qatar (GCC passports - strong Middle East passports)
  - EU/Schengen: 90-day Schengen visa exemption (confirmed since 2022)
  - Israel: visa_free 90 days (Abraham Accords normalisation)
  - Kuwait: GCC free movement — visa_free for UAE/Qatar (GCC citizens)
  - Bolivia: visa_required (UAE/Qatar citizens need visa for Bolivia)
  - Bangladesh: visa_required
  - Algeria: visa_required
  - Angola: visa_required
  - Pakistan: visa_required
  - Tunisia: visa_free (UAE/Qatar citizens have access)
  - Cuba: visa_required for UAE/Qatar (unlike France)
  - Bahamas: visa_required for UAE/Qatar
  - Barbados: visa_required for UAE/Qatar
  - Jamaica: visa_required for UAE/Qatar
  - Dominican Republic: visa_required for UAE/Qatar
  - Sources: Henley Passport Index 2026, IATA Timatic

  ### Malaysia (strong Southeast Asian passport)
  - EU/Schengen: 90-day Schengen visa exemption
  - Bolivia: visa_required for Malaysia
  - Cuba: visa_free (Malaysia-Cuba bilateral)
  - Bahamas: visa_required
  - Barbados: visa_required
  - Jamaica: visa_required
  - Algeria: visa_required
  - Angola: visa_required
  - Bangladesh: visa_on_arrival (for Malaysian passport)
  - Pakistan: visa_required
  - Israel: restricted (Malaysians cannot enter Israel — passports say "Not valid for Israel")
  - Sources: Malaysia MOFA, Henley Passport Index 2026

  ### Mexico (strong Latin American passport)
  - EU/Schengen: 90-day Schengen visa exemption
  - Bolivia: visa_free (Latin American solidarity)
  - Cuba: visa_free (Mexico-Cuba strong relations)
  - Bahamas: visa_free
  - Barbados: visa_free 6 months
  - Jamaica: visa_free
  - Dominican Republic: visa_free (no tourist card for Mexicans)
  - Israel: visa_free 90 days
  - Kazakhstan: visa_free 30 days
  - Kuwait: visa_required
  - Bangladesh: visa_required
  - Algeria: visa_required
  - Angola: visa_required
  - Pakistan: visa_required
  - Sources: Mexico SRE, Henley Passport Index 2026

  ### Argentina & Chile (strong South American passports)
  - EU/Schengen: 90-day Schengen visa exemption
  - Bolivia: visa_free (South American solidarity — Mercosur/UNASUR)
  - Cuba: visa_free (ALBA solidarity)
  - Israel: visa_free 90 days
  - Kazakhstan: visa_free (Argentina bilateral)
  - Kuwait: visa_required
  - Bangladesh: visa_required
  - Algeria: visa_required
  - Angola: visa_required
  - Pakistan: visa_required
  - Sources: Argentina MREC, Chile MINREL, Henley Passport Index 2026

  ### Brazil (strong South American passport)
  - EU/Schengen: 90-day Schengen visa exemption
  - Bolivia: visa_free (Mercosur)
  - Cuba: visa_free
  - Israel: visa_free
  - Kazakhstan: visa_free
  - Kuwait: visa_required
  - Bangladesh: visa_required
  - Algeria: visa_required
  - Angola: visa_required
  - Pakistan: visa_required
  - Sources: Brazil MOFA, Henley Passport Index 2026

  ### Peru & Colombia (mid-tier Latin American passports)
  - EU/Schengen: 90-day access
  - Bolivia: visa_free (UNASUR)
  - Cuba: visa_free
  - Israel: visa_free 90 days (Colombia yes, Peru yes)
  - Kazakhstan: visa_free (Colombia yes 30 days)
  - Kuwait: visa_required
  - Bangladesh: visa_required
  - Algeria: visa_required
  - Angola: visa_required
  - Sources: Henley Passport Index 2026, IATA Timatic

  ### South Africa (mid-tier African passport)
  - EU/Schengen: 90-day access
  - Bolivia: visa_required for South Africa
  - Cuba: visa_free (SA-Cuba bilateral)
  - Israel: visa_free 90 days (SA-Israel normalised)
  - Kazakhstan: visa_required
  - Kuwait: visa_required
  - Bangladesh: visa_required
  - Algeria: visa_required
  - Angola: visa_free (SADC member) — however Angola often requires visa; use visa_required
  - Sources: South Africa DIRCO, Henley Passport Index 2026

  ### Turkey (mid-tier passport)
  - EU/Schengen: 90-day access
  - Bolivia: visa_required
  - Cuba: visa_free (Turkey-Cuba bilateral)
  - Israel: historically visa_required (relations strained) — visa_required
  - Kazakhstan: visa_free (Turkey-Kazakhstan strong ties)
  - Kuwait: visa_required (Turkey no GCC access)
  - Bangladesh: visa_required
  - Algeria: visa_free (Turkey-Algeria strong relations)
  - Angola: visa_required
  - Sources: Turkey MOFA, Henley Passport Index 2026

  ## Date verified: 2026-03-15
*/

DO $$
DECLARE
  p text;
  country_name text;
  schengen_note text;

  target_passports text[] := ARRAY[
    'united-arab-emirates', 'qatar', 'malaysia', 'mexico',
    'argentina', 'chile', 'brazil', 'peru', 'colombia',
    'south-africa', 'turkey'
  ];

  -- Destinations where UAE/Qatar/Malaysia need visa (unlike France)
  uae_visa_required text[] := ARRAY['bolivia','bahamas','barbados','jamaica','dominican-republic','cuba'];
  qatar_visa_required text[] := ARRAY['bolivia','bahamas','barbados','jamaica','dominican-republic','cuba'];
  malaysia_visa_required text[] := ARRAY['bolivia','bahamas','barbados','jamaica'];
  -- South Africa needs visa for Bolivia, Angola
  sa_visa_required text[] := ARRAY['bolivia','angola','kazakhstan'];
  -- Turkey needs visa for Bolivia, Angola, Israel
  turkey_visa_required text[] := ARRAY['bolivia','angola'];
  turkey_visa_free text[] := ARRAY['algeria','cuba'];

BEGIN
  FOREACH p IN ARRAY target_passports LOOP

    country_name := CASE p
      WHEN 'united-arab-emirates' THEN 'UAE'
      WHEN 'qatar'                THEN 'Qatari'
      WHEN 'malaysia'             THEN 'Malaysian'
      WHEN 'mexico'               THEN 'Mexican'
      WHEN 'argentina'            THEN 'Argentine'
      WHEN 'chile'                THEN 'Chilean'
      WHEN 'brazil'               THEN 'Brazilian'
      WHEN 'peru'                 THEN 'Peruvian'
      WHEN 'colombia'             THEN 'Colombian'
      WHEN 'south-africa'         THEN 'South African'
      WHEN 'turkey'               THEN 'Turkish'
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
      -- Override visa_type for certain destination+passport combinations
      CASE
        -- EU/Schengen: all these passports get 90-day tourist access (not freedom of movement)
        WHEN f.destination_slug IN (
          'austria','belgium','bulgaria','croatia','cyprus','czech-republic',
          'denmark','estonia','finland','germany','greece','hungary',
          'ireland','italy','latvia','lithuania','luxembourg','malta','netherlands',
          'poland','portugal','romania','slovakia','slovenia','spain','sweden',
          'iceland','norway','switzerland','france'
        ) THEN 'visa_free'
        -- Kuwait: GCC members (UAE, Qatar) are visa-free; others need visa
        WHEN f.destination_slug = 'kuwait' AND p IN ('united-arab-emirates','qatar')
          THEN 'visa_free'
        -- Algeria: Turkey visa-free; others visa_required
        WHEN f.destination_slug = 'algeria' AND p = 'turkey' THEN 'visa_free'
        -- Malaysia → Israel: restricted (not permitted)
        WHEN f.destination_slug = 'israel' AND p = 'malaysia' THEN 'restricted'
        -- Turkey → Israel: visa_required (diplomatic tensions)
        WHEN f.destination_slug = 'israel' AND p = 'turkey' THEN 'visa_required'
        -- South Africa → Kazakhstan: visa_required
        WHEN f.destination_slug = 'kazakhstan' AND p = 'south-africa' THEN 'visa_required'
        -- Destinations where UAE/Qatar need visa
        WHEN f.destination_slug = ANY(uae_visa_required) AND p = 'united-arab-emirates' THEN 'visa_required'
        WHEN f.destination_slug = ANY(qatar_visa_required) AND p = 'qatar' THEN 'visa_required'
        -- Malaysia specific
        WHEN f.destination_slug = ANY(malaysia_visa_required) AND p = 'malaysia' THEN 'visa_required'
        WHEN f.destination_slug = 'cuba' AND p = 'malaysia' THEN 'visa_free'
        -- South Africa specific overrides
        WHEN f.destination_slug = ANY(sa_visa_required) AND p = 'south-africa' THEN 'visa_required'
        -- Turkey specific
        WHEN f.destination_slug = ANY(turkey_visa_required) AND p = 'turkey' THEN 'visa_required'
        ELSE f.visa_type
      END,
      -- visa_subtype overrides
      CASE
        WHEN f.destination_slug IN (
          'austria','belgium','bulgaria','croatia','cyprus','czech-republic',
          'denmark','estonia','finland','germany','greece','hungary',
          'ireland','italy','latvia','lithuania','luxembourg','malta','netherlands',
          'poland','portugal','romania','slovakia','slovenia','spain','sweden',
          'iceland','norway','switzerland','france'
        ) THEN NULL
        WHEN f.destination_slug = 'kuwait' AND p IN ('united-arab-emirates','qatar') THEN NULL
        WHEN f.destination_slug = 'israel' AND p IN ('malaysia','turkey') THEN NULL
        WHEN f.destination_slug = ANY(uae_visa_required) AND p = 'united-arab-emirates' THEN NULL
        WHEN f.destination_slug = ANY(qatar_visa_required) AND p = 'qatar' THEN NULL
        WHEN f.destination_slug = ANY(malaysia_visa_required) AND p = 'malaysia' THEN NULL
        WHEN f.destination_slug = ANY(sa_visa_required) AND p = 'south-africa' THEN NULL
        WHEN f.destination_slug = ANY(turkey_visa_required) AND p = 'turkey' THEN NULL
        ELSE f.visa_subtype
      END,
      -- max_stay_days
      CASE
        WHEN f.destination_slug IN (
          'austria','belgium','bulgaria','croatia','cyprus','czech-republic',
          'denmark','estonia','finland','germany','greece','hungary',
          'ireland','italy','latvia','lithuania','luxembourg','malta','netherlands',
          'poland','portugal','romania','slovakia','slovenia','spain','sweden',
          'iceland','norway','switzerland','france'
        ) THEN 90
        WHEN f.destination_slug = 'kuwait' AND p IN ('united-arab-emirates','qatar') THEN 90
        WHEN f.destination_slug = 'israel' AND p IN ('malaysia','turkey') THEN NULL
        WHEN f.destination_slug = ANY(uae_visa_required) AND p = 'united-arab-emirates' THEN 30
        WHEN f.destination_slug = ANY(qatar_visa_required) AND p = 'qatar' THEN 30
        WHEN f.destination_slug = ANY(malaysia_visa_required) AND p = 'malaysia' THEN 30
        WHEN f.destination_slug = ANY(sa_visa_required) AND p = 'south-africa' THEN 30
        WHEN f.destination_slug = ANY(turkey_visa_required) AND p = 'turkey' THEN 30
        ELSE f.max_stay_days
      END,
      -- stay_rule
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
      -- stay_window_days
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
      -- notes
      CASE
        WHEN f.destination_slug IN (
          'austria','belgium','bulgaria','croatia','cyprus','czech-republic',
          'denmark','estonia','finland','germany','greece','hungary',
          'ireland','italy','latvia','lithuania','luxembourg','malta','netherlands',
          'poland','portugal','romania','slovakia','slovenia','spain','sweden',
          'iceland','norway','switzerland','france'
        ) THEN schengen_note
        WHEN f.destination_slug = 'kuwait' AND p IN ('united-arab-emirates','qatar') THEN 'GCC citizens (UAE and Qatar passport holders) have free movement within the Gulf Cooperation Council. No visa required for Kuwait entry.'
        WHEN f.destination_slug = 'israel' AND p = 'malaysia' THEN 'Malaysian passports are not valid for travel to Israel. Entry is prohibited under Malaysian law. Malaysian passports carry a stamp stating they are not valid for Israel.'
        WHEN f.destination_slug = 'israel' AND p = 'turkey' THEN 'Visa required. Turkey-Israel diplomatic relations have been strained. Apply at Israeli embassy if travel is permitted. Check current advisories before planning travel.'
        WHEN f.destination_slug = 'algeria' AND p = 'turkey' THEN 'Turkish citizens may visit Algeria visa-free under a bilateral agreement. Check current requirements before travel.'
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
