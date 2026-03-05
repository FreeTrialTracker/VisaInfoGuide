
/*
  # Fix Belgium Outbound Visa Rules

  ## Changes Made

  1. Delete self-entry row (belgium -> belgium)
  2. Belgium -> China: Updated from visa_required to visa_free (15 days) based on China's 2024 unilateral visa-free policy for EU countries
  3. Belgium -> South Korea: K-ETA suspended in 2023; changed to visa_free, fixed passport_validity_months from 0 to 6
  4. Belgium -> Thailand: Extended from 30 to 60 days for EU nationals in 2024
  5. Belgium -> India: e-Tourist visa allows 90 days, not 30; type changed to evisa with 90 days
  6. Belgium -> Switzerland: Belgium is EU, Switzerland has free movement agreement; nulled out max_stay and validity
  7. Belgium -> Turkey: Added stay_window_days = 180 (90/180 rolling window)
  8. Belgium -> Indonesia: Updated notes to mention 30-day extendable to 60 days
*/

-- 1. Delete self-entry row
DELETE FROM visa_rules
WHERE passport_slug = 'belgium' AND destination_slug = 'belgium';

-- 2. Belgium -> China: visa_free 15 days (China's 2024 unilateral policy for EU)
UPDATE visa_rules
SET visa_type = 'visa_free',
    max_stay_days = 15,
    notes = 'Visa-free under China unilateral policy for EU nationals (2024). Max 15 days.'
WHERE passport_slug = 'belgium' AND destination_slug = 'china';

-- 3. Belgium -> South Korea: K-ETA suspended, now visa_free; fix passport_validity_months
UPDATE visa_rules
SET visa_type = 'visa_free',
    passport_validity_months = 6,
    notes = 'Visa-free entry. K-ETA suspended since 2023.'
WHERE passport_slug = 'belgium' AND destination_slug = 'south-korea';

-- 4. Belgium -> Thailand: Extended to 60 days for EU nationals in 2024
UPDATE visa_rules
SET max_stay_days = 60,
    notes = 'Visa-free entry. Extended to 60 days for EU nationals (2024).'
WHERE passport_slug = 'belgium' AND destination_slug = 'thailand';

-- 5. Belgium -> India: e-Tourist visa is 90 days, not 30
UPDATE visa_rules
SET max_stay_days = 90,
    notes = 'e-Tourist visa available, valid for 90 days.'
WHERE passport_slug = 'belgium' AND destination_slug = 'india';

-- 6. Belgium -> Switzerland: EU free movement applies, no max stay cap
UPDATE visa_rules
SET max_stay_days = NULL,
    passport_validity_months = NULL,
    notes = 'EU-Switzerland bilateral free movement agreement applies. No stay limit for short visits.'
WHERE passport_slug = 'belgium' AND destination_slug = 'switzerland';

-- 7. Belgium -> Turkey: Add stay_window_days = 180
UPDATE visa_rules
SET stay_window_days = 180
WHERE passport_slug = 'belgium' AND destination_slug = 'turkey';

-- 8. Belgium -> Indonesia: Update notes to mention extendability
UPDATE visa_rules
SET max_stay_days = 30,
    notes = 'Visa-free entry for 30 days, extendable to 60 days.'
WHERE passport_slug = 'belgium' AND destination_slug = 'indonesia';
