/*
  # Fix NULL max_stay_days for visa_free entries

  ## Context
  323 visa_free rows have NULL max_stay_days. These fall into distinct categories:

  1. EU/EEA intra-bloc travel: EU citizens have EU freedom of movement rights —
     unlimited stay within EU/EEA. Setting max_stay_days = 365 to represent
     "no fixed limit" in a way the UI can display. The notes field clarifies.

  2. Switzerland ↔ EU/EEA: Covered by bilateral agreements (Schengen + FMoP).
     Same as EU intra-bloc.

  3. Argentina → South American neighbors (Brazil, Chile): visa-free, 90 days.

  4. New Zealand → Australia: NZ citizens have special right to live and work in
     Australia indefinitely. Setting 365.

  5. UAE ↔ destinations: UAE has extensive visa-free network.

  ## EU/Schengen intra-bloc stays
  For travel between EU member states and Schengen/EEA members, EU citizens have
  the right of free movement. While there's no formal "stay limit" for short trips,
  longer stays require registration. Setting 90 as the standard tourist short-stay
  equivalent for Schengen countries, and 365 for EU member state to EU member state
  (where freedom of movement applies unconditionally).
  
  ## Practical approach
  - EU passport → EU destination: 365 (freedom of movement, no limit for residency)
  - EU passport → Schengen non-EU (Norway, Iceland, Switzerland): 90 (Schengen 90/180)
  - Non-EU passport → EU/Schengen destinations: 90 (standard Schengen limit)
  - New Zealand → Australia: 365 (special right to live and work)
  - Argentina → neighbors: 90
*/

UPDATE visa_rules
SET
  max_stay_days = 90,
  notes = COALESCE(notes, 'Schengen Area — EU/EEA citizens may travel freely within the Schengen zone. The 90/180-day Schengen rule applies to non-EU nationals; EU/EEA passport holders have freedom of movement rights.')
WHERE visa_type = 'visa_free'
  AND max_stay_days IS NULL
  AND destination_slug IN (
    'austria','belgium','croatia','czech-republic','denmark','estonia','finland',
    'france','germany','greece','hungary','ireland','italy','latvia','lithuania',
    'luxembourg','malta','netherlands','poland','portugal','romania','slovakia',
    'slovenia','spain','sweden','bulgaria','cyprus','iceland','norway','switzerland'
  )
  AND passport_slug NOT IN (
    'austria','belgium','croatia','czech-republic','denmark','estonia','finland',
    'france','germany','greece','hungary','ireland','italy','latvia','lithuania',
    'luxembourg','malta','netherlands','poland','portugal','romania','slovakia',
    'slovenia','spain','sweden','bulgaria','cyprus','iceland','norway','switzerland'
  );

UPDATE visa_rules
SET
  max_stay_days = 365,
  notes = COALESCE(notes, 'EU/EEA freedom of movement applies. EU and EEA citizens may live, work, and travel freely within EU/EEA member states without a stay limit for tourism. Longer stays may require registration with local authorities.')
WHERE visa_type = 'visa_free'
  AND max_stay_days IS NULL
  AND destination_slug IN (
    'austria','belgium','croatia','czech-republic','denmark','estonia','finland',
    'france','germany','greece','hungary','ireland','italy','latvia','lithuania',
    'luxembourg','malta','netherlands','poland','portugal','romania','slovakia',
    'slovenia','spain','sweden','bulgaria','cyprus','iceland','norway','switzerland'
  )
  AND passport_slug IN (
    'austria','belgium','croatia','czech-republic','denmark','estonia','finland',
    'france','germany','greece','hungary','ireland','italy','latvia','lithuania',
    'luxembourg','malta','netherlands','poland','portugal','romania','slovakia',
    'slovenia','spain','sweden','bulgaria','cyprus','iceland','norway','switzerland'
  );

UPDATE visa_rules
SET
  max_stay_days = 365,
  notes = COALESCE(notes, 'New Zealand citizens have special right to live and work in Australia indefinitely under the Trans-Tasman Travel Arrangement. No visa required.')
WHERE visa_type = 'visa_free'
  AND max_stay_days IS NULL
  AND passport_slug = 'new-zealand'
  AND destination_slug = 'australia';

UPDATE visa_rules
SET max_stay_days = 90
WHERE visa_type = 'visa_free'
  AND max_stay_days IS NULL
  AND destination_slug = 'argentina';

UPDATE visa_rules
SET
  max_stay_days = 90,
  notes = COALESCE(notes, 'Visa-free entry to the UAE. Standard tourist stay up to 90 days.')
WHERE visa_type = 'visa_free'
  AND max_stay_days IS NULL
  AND destination_slug = 'united-arab-emirates';

UPDATE visa_rules
SET
  max_stay_days = 180,
  notes = COALESCE(notes, 'EU/EEA and Commonwealth citizens may visit the UK visa-free for up to 6 months.')
WHERE visa_type = 'visa_free'
  AND max_stay_days IS NULL
  AND destination_slug = 'united-kingdom';
