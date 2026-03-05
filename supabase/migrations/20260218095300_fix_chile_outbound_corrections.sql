
/*
  # Fix Chile Outbound Visa Rules

  1. Changes
    - Remove self-referencing chile -> chile row
    - China: update to visa_free (15 days) based on 2024 mutual visa-free agreement
    - All Schengen destinations + Turkey: add stay_window_days = 180
    - South Korea: change from visa_free_eta to visa_free (K-ETA suspended), fix passport_validity_months to 6
    - Qatar: fix max_stay_days from 30 to 90
    - Thailand: fix max_stay_days from 30 to 60 (extended in 2024)
*/

-- Remove self-referencing row
DELETE FROM visa_rules
WHERE passport_slug = 'chile' AND destination_slug = 'chile';

-- China: visa-free since 2024 mutual agreement
UPDATE visa_rules
SET visa_type = 'visa_free',
    max_stay_days = 15,
    notes = 'Visa-free under 2024 mutual agreement. Max 15 days per stay.'
WHERE passport_slug = 'chile' AND destination_slug = 'china';

-- Schengen destinations: add stay_window_days = 180
UPDATE visa_rules
SET stay_window_days = 180
WHERE passport_slug = 'chile'
  AND destination_slug IN (
    'austria', 'belgium', 'croatia', 'czech-republic', 'france', 'germany',
    'greece', 'hungary', 'italy', 'netherlands', 'poland', 'portugal', 'spain', 'switzerland'
  )
  AND (stay_window_days IS NULL OR stay_window_days != 180);

-- Turkey: add stay_window_days = 180
UPDATE visa_rules
SET stay_window_days = 180,
    notes = 'Visa-free entry. 90 days within any 180-day period.'
WHERE passport_slug = 'chile' AND destination_slug = 'turkey';

-- South Korea: K-ETA suspended, now fully visa-free; fix passport validity
UPDATE visa_rules
SET visa_type = 'visa_free',
    passport_validity_months = 6,
    notes = 'Visa-free entry. K-ETA requirement suspended.'
WHERE passport_slug = 'chile' AND destination_slug = 'south-korea';

-- Qatar: fix max_stay_days from 30 to 90
UPDATE visa_rules
SET max_stay_days = 90,
    notes = 'Visa-free entry. Health insurance recommended.'
WHERE passport_slug = 'chile' AND destination_slug = 'qatar';

-- Thailand: extended to 60 days in 2024
UPDATE visa_rules
SET max_stay_days = 60,
    notes = 'Visa-free entry extended to 60 days (2024).'
WHERE passport_slug = 'chile' AND destination_slug = 'thailand';
