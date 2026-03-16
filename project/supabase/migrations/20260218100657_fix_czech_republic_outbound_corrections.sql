
/*
  # Fix Czech Republic Outbound Visa Rules

  ## Changes
  1. thailand: max_stay_days 30 → 60 (Thailand extended visa-free to 60 days for EU nationals in 2024)
  2. vietnam: max_stay_days 45 → 90 (Vietnam extended to 90 days for EU nationals in 2023)
  3. qatar: max_stay_days 30 → 90 (Qatar extended visa-free to 90 days for EU nationals)
  4. south-korea: passport_validity_months 0 → NULL (K-ETA has no minimum passport validity requirement)
  5. switzerland: stay_window_days NULL → 180 (Schengen 90/180 rule applies)
  6. indonesia: visa_type visa_free → visa_on_arrival (Indonesia charges an arrival fee, not truly visa-free)
*/

UPDATE visa_rules
SET max_stay_days = 60,
    notes = 'Visa-free entry. Extended to 60 days for EU nationals (2024).'
WHERE passport_slug = 'czech-republic'
  AND destination_slug = 'thailand';

UPDATE visa_rules
SET max_stay_days = 90,
    notes = 'Visa-free entry. Extended to 90 days for EU nationals (2023).'
WHERE passport_slug = 'czech-republic'
  AND destination_slug = 'vietnam';

UPDATE visa_rules
SET max_stay_days = 90,
    notes = 'Visa-free entry. Up to 90 days for EU nationals.'
WHERE passport_slug = 'czech-republic'
  AND destination_slug = 'qatar';

UPDATE visa_rules
SET passport_validity_months = NULL
WHERE passport_slug = 'czech-republic'
  AND destination_slug = 'south-korea';

UPDATE visa_rules
SET stay_window_days = 180
WHERE passport_slug = 'czech-republic'
  AND destination_slug = 'switzerland';

UPDATE visa_rules
SET visa_type = 'visa_on_arrival',
    stay_rule = 'Visa on arrival (fee applies)',
    notes = 'Visa on arrival available. Fee applies at entry.'
WHERE passport_slug = 'czech-republic'
  AND destination_slug = 'indonesia';
