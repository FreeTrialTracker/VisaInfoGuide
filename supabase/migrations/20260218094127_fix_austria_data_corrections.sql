
/*
  # Fix Austria Data Corrections

  ## Summary
  Comprehensive corrections to visa rules involving Austria, both as passport and destination.

  ## Changes

  ### Austria as Passport (outbound)

  1. Delete self-entry row (austria → austria)
  2. austria → china: visa_required → visa_free, max_stay_days 30 → 15 (2024 mutual visa-free agreement)
  3. austria → south-korea: visa_free_eta → visa_free (K-ETA suspended), passport_validity_months 0 → 6
  4. austria → thailand: max_stay_days 30 → 60 (Thailand extended visa-free for EU nationals in 2024)
  5. austria → india: max_stay_days 30 → 90 (e-Tourist visa available for 90 days)
  6. austria → switzerland: null out max_stay_days and passport_validity_months (EU/Schengen free mobility)
  7. austria → turkey: add stay_window_days = 180 (90/180 rule applies)
  8. austria → indonesia: update notes to mention 30-day stay extendable to 60 days

  ### Austria as Destination (inbound)

  9. All visa-free non-EU passports: set stay_window_days = 180 (Schengen 90/180 rule)
  10. All visa-required passports: set stay_window_days = 180 (Schengen 90/180 rule applies to visa validity window)
  11. EU passport holders already have null stay_window_days which is correct

  ### Inbound consistency fixes

  12. brazil → austria: stay_window_days = 180
  13. canada → austria: stay_window_days = 180 (was missing)
*/

-- 1. Delete self-entry row
DELETE FROM visa_rules
WHERE passport_slug = 'austria' AND destination_slug = 'austria';

-- 2. Austria → China: visa-free 15 days (2024 mutual visa-free agreement)
UPDATE visa_rules
SET visa_type = 'visa_free',
    max_stay_days = 15,
    notes = 'Visa-free entry for up to 15 days under 2024 mutual agreement.'
WHERE passport_slug = 'austria' AND destination_slug = 'china';

-- 3. Austria → South Korea: K-ETA suspended, change to visa_free, fix validity
UPDATE visa_rules
SET visa_type = 'visa_free',
    passport_validity_months = 6,
    notes = 'Visa-free entry. K-ETA requirement suspended as of 2023.'
WHERE passport_slug = 'austria' AND destination_slug = 'south-korea';

-- 4. Austria → Thailand: 30 → 60 days (extended in 2024)
UPDATE visa_rules
SET max_stay_days = 60,
    notes = 'Visa-free entry extended to 60 days as of 2024.'
WHERE passport_slug = 'austria' AND destination_slug = 'thailand';

-- 5. Austria → India: 30 → 90 days e-Tourist visa
UPDATE visa_rules
SET max_stay_days = 90,
    notes = 'e-Tourist visa available for up to 90 days.'
WHERE passport_slug = 'austria' AND destination_slug = 'india';

-- 6. Austria → Switzerland: EU/Schengen free mobility, null out limits
UPDATE visa_rules
SET max_stay_days = NULL,
    passport_validity_months = NULL,
    notes = 'EU/Schengen free mobility applies; no stay limit for EU citizens.'
WHERE passport_slug = 'austria' AND destination_slug = 'switzerland';

-- 7. Austria → Turkey: add 90/180 stay window
UPDATE visa_rules
SET stay_window_days = 180
WHERE passport_slug = 'austria' AND destination_slug = 'turkey';

-- 8. Austria → Indonesia: clarify 30-day extendable to 60
UPDATE visa_rules
SET notes = 'Visa-free entry for 30 days, extendable to 60 days on arrival.'
WHERE passport_slug = 'austria' AND destination_slug = 'indonesia';

-- 9 & 10. All inbound to Austria: set stay_window_days = 180 for non-EU passports
-- Visa-free non-EU passports
UPDATE visa_rules
SET stay_window_days = 180
WHERE destination_slug = 'austria'
  AND passport_slug IN (
    'argentina', 'australia', 'brazil', 'canada', 'chile', 'colombia',
    'japan', 'malaysia', 'mexico', 'new-zealand', 'qatar', 'singapore',
    'south-korea', 'united-arab-emirates', 'united-kingdom', 'united-states'
  );

-- Visa-required inbound passports (stay_window_days applies to Schengen visa window)
UPDATE visa_rules
SET stay_window_days = 180
WHERE destination_slug = 'austria'
  AND passport_slug IN (
    'china', 'egypt', 'india', 'indonesia', 'nigeria', 'philippines',
    'russia', 'saudi-arabia', 'south-africa', 'thailand', 'turkey', 'vietnam'
  );
