
/*
  # Fix Croatia Data Corrections

  ## Summary
  Applies multiple accuracy fixes to Croatia-related visa rules.

  ## Changes

  ### 1. Inbound Schengen stay_window_days
  - All visa-free inbound entries to Croatia governed by the Schengen 90/180 rule were missing stay_window_days=180.
  - Affected passports: japan, singapore, united-kingdom, united-states, australia, brazil, mexico,
    south-korea, united-arab-emirates, qatar, canada, new-zealand

  ### 2. Outbound Croatian passport corrections
  - croatia -> thailand: max_stay_days 30 -> 60 (Thailand extended visa-free to 60 days in 2024)
  - croatia -> vietnam: max_stay_days 45 -> 90 (Vietnam extended to 90 days for EU nationals 2023)
  - croatia -> switzerland: stay_window_days NULL -> 180 (Schengen 90/180 rule applies)

  ### 3. passport_validity_months=0 fixes
  - croatia -> south-korea: passport_validity_months 0 -> NULL (K-ETA has no minimum validity requirement beyond trip duration)
  - switzerland -> croatia: passport_validity_months 0 -> NULL (Swiss nationals enjoy Schengen/EU free movement)
*/

-- Fix inbound Schengen entries missing stay_window_days
UPDATE visa_rules
SET stay_window_days = 180
WHERE destination_slug = 'croatia'
  AND visa_type IN ('visa_free', 'visa_free_eta')
  AND stay_rule LIKE '%Schengen%'
  AND stay_window_days IS NULL
  AND passport_slug NOT IN (
    'austria','belgium','czech-republic','france','germany','greece','hungary',
    'italy','netherlands','poland','portugal','spain','switzerland','croatia'
  );

-- Fix croatia -> thailand: 30 -> 60 days
UPDATE visa_rules
SET max_stay_days = 60,
    stay_rule = 'Visa-free short stay',
    notes = 'Visa-free entry extended to 60 days (2024 policy).'
WHERE passport_slug = 'croatia'
  AND destination_slug = 'thailand';

-- Fix croatia -> vietnam: 45 -> 90 days
UPDATE visa_rules
SET max_stay_days = 90,
    notes = 'Visa-free entry extended to 90 days for EU nationals (2023).'
WHERE passport_slug = 'croatia'
  AND destination_slug = 'vietnam';

-- Fix croatia -> switzerland: stay_window_days NULL -> 180
UPDATE visa_rules
SET stay_window_days = 180
WHERE passport_slug = 'croatia'
  AND destination_slug = 'switzerland';

-- Fix croatia -> south-korea: passport_validity_months 0 -> NULL
UPDATE visa_rules
SET passport_validity_months = NULL
WHERE passport_slug = 'croatia'
  AND destination_slug = 'south-korea';

-- Fix switzerland -> croatia: passport_validity_months 0 -> NULL
UPDATE visa_rules
SET passport_validity_months = NULL
WHERE passport_slug = 'switzerland'
  AND destination_slug = 'croatia';
