/*
  # Fix Canada Outbound Data Corrections

  ## Summary
  Corrects multiple data issues for Canadian passport holders traveling abroad:

  1. Schengen destinations missing stay_window_days = 180
  2. passport_validity_months = 0 corrected to proper values
  3. Indonesia: corrected from visa_on_arrival to visa_free (bilateral agreement since 2015)
  4. Qatar: corrected from visa_on_arrival to visa_free, 90 days
  5. UAE: corrected from visa_on_arrival to visa_free
  6. South Korea: K-ETA suspended, corrected to visa_free
  7. South Africa: passport_validity_months corrected from 1 to 6
  8. India: max_stay_days set to 180 (e-Tourist visa)
  9. China: max_stay_days corrected to 15 (2024 policy), passport_validity_months set to 6
*/

-- Fix Schengen destinations: add stay_window_days = 180 where missing
UPDATE visa_rules SET stay_window_days = 180
WHERE passport_slug = 'canada' AND destination_slug IN (
  'croatia', 'czech-republic', 'france', 'germany', 'greece',
  'hungary', 'italy', 'netherlands', 'poland', 'portugal', 'spain', 'switzerland'
) AND stay_window_days IS NULL;

-- Fix Turkey: add stay_window_days = 180
UPDATE visa_rules SET stay_window_days = 180
WHERE passport_slug = 'canada' AND destination_slug = 'turkey';

-- Fix passport_validity_months = 0 for destinations that require validity
UPDATE visa_rules SET passport_validity_months = 6
WHERE passport_slug = 'canada' AND destination_slug IN (
  'chile', 'colombia', 'japan', 'mexico', 'south-korea', 'united-kingdom'
) AND passport_validity_months = 0;

-- Fix South Africa: passport_validity_months from 1 to 6
UPDATE visa_rules SET passport_validity_months = 6
WHERE passport_slug = 'canada' AND destination_slug = 'south-africa';

-- Fix China: max_stay_days to 15 (2024 visa-free policy), passport_validity_months to 6
UPDATE visa_rules
SET max_stay_days = 15, passport_validity_months = 6,
    notes = 'Visa-free entry policy as of 2024; 15-day limit. Verify policy remains active before travel.'
WHERE passport_slug = 'canada' AND destination_slug = 'china';

-- Fix India: set max_stay_days to 180 for e-Tourist visa
UPDATE visa_rules
SET max_stay_days = 180, notes = 'eVisa required. e-Tourist visa valid for up to 180 days per entry. Select correct eVisa subtype.'
WHERE passport_slug = 'canada' AND destination_slug = 'india';

-- Fix Indonesia: visa_on_arrival -> visa_free (bilateral visa-free since 2015)
UPDATE visa_rules
SET visa_type = 'visa_free', notes = 'Visa-free entry under bilateral agreement since 2015. 30-day stay.'
WHERE passport_slug = 'canada' AND destination_slug = 'indonesia';

-- Fix Qatar: visa_on_arrival -> visa_free, 90 days
UPDATE visa_rules
SET visa_type = 'visa_free', max_stay_days = 90, notes = 'Visa-free entry for Canadian passport holders.'
WHERE passport_slug = 'canada' AND destination_slug = 'qatar';

-- Fix UAE: visa_on_arrival -> visa_free
UPDATE visa_rules
SET visa_type = 'visa_free', notes = 'Visa-free entry for Canadian passport holders. 90-day stay.'
WHERE passport_slug = 'canada' AND destination_slug = 'united-arab-emirates';

-- Fix South Korea: K-ETA suspended, change to visa_free
UPDATE visa_rules
SET visa_type = 'visa_free', passport_validity_months = 6,
    notes = 'Visa-free entry. K-ETA requirement suspended; verify current status before travel.'
WHERE passport_slug = 'canada' AND destination_slug = 'south-korea';
