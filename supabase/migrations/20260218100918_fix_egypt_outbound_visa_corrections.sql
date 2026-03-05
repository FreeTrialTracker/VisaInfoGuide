
/*
  # Fix Egypt Outbound Visa Rules

  Corrects multiple errors in Egyptian passport holder outbound travel rules:

  1. Visa type corrections:
     - Argentina: visa_required -> visa_free (90 days)
     - Brazil: visa_required -> visa_free (90 days)
     - Chile: visa_required -> visa_free (90 days)
     - Colombia: visa_required -> visa_free (90 days)
     - Indonesia: visa_required -> visa_on_arrival (30 days)
     - Mexico: visa_required -> visa_free (180 days)
     - Nigeria: visa_required -> visa_on_arrival (30 days)
     - Philippines: visa_required -> visa_free (30 days)
     - Singapore: visa_required -> visa_free (30 days)
     - South Korea: visa_required -> visa_free (90 days, 2024 policy)
     - Vietnam: evisa stay corrected to 90 days (was 30)

  2. Schengen stay_window_days fix:
     - Croatia, Czech Republic, France, Germany, Greece, Hungary, Italy,
       Netherlands, Poland, Portugal, Spain all set to 180 days window
     - (Austria and Belgium already had 180)
*/

-- Argentina: visa-free
UPDATE visa_rules
SET visa_type = 'visa_free',
    stay_rule = 'Visa-free entry',
    max_stay_days = 90,
    notes = 'Visa-free for up to 90 days.'
WHERE passport_slug = 'egypt' AND destination_slug = 'argentina';

-- Brazil: visa-free
UPDATE visa_rules
SET visa_type = 'visa_free',
    stay_rule = 'Visa-free entry',
    max_stay_days = 90,
    notes = 'Visa-free for up to 90 days.'
WHERE passport_slug = 'egypt' AND destination_slug = 'brazil';

-- Chile: visa-free
UPDATE visa_rules
SET visa_type = 'visa_free',
    stay_rule = 'Visa-free entry',
    max_stay_days = 90,
    notes = 'Visa-free for up to 90 days.'
WHERE passport_slug = 'egypt' AND destination_slug = 'chile';

-- Colombia: visa-free
UPDATE visa_rules
SET visa_type = 'visa_free',
    stay_rule = 'Visa-free entry',
    max_stay_days = 90,
    notes = 'Visa-free for up to 90 days.'
WHERE passport_slug = 'egypt' AND destination_slug = 'colombia';

-- Indonesia: visa on arrival
UPDATE visa_rules
SET visa_type = 'visa_on_arrival',
    stay_rule = 'Visa on arrival',
    max_stay_days = 30,
    notes = 'Visa on arrival available at major international airports.'
WHERE passport_slug = 'egypt' AND destination_slug = 'indonesia';

-- Mexico: visa-free
UPDATE visa_rules
SET visa_type = 'visa_free',
    stay_rule = 'Visa-free entry',
    max_stay_days = 180,
    notes = 'Visa-free for up to 180 days.'
WHERE passport_slug = 'egypt' AND destination_slug = 'mexico';

-- Nigeria: visa on arrival
UPDATE visa_rules
SET visa_type = 'visa_on_arrival',
    stay_rule = 'Visa on arrival',
    max_stay_days = 30,
    notes = 'Visa on arrival available.'
WHERE passport_slug = 'egypt' AND destination_slug = 'nigeria';

-- Philippines: visa-free
UPDATE visa_rules
SET visa_type = 'visa_free',
    stay_rule = 'Visa-free entry',
    max_stay_days = 30,
    notes = 'Visa-free for up to 30 days.'
WHERE passport_slug = 'egypt' AND destination_slug = 'philippines';

-- Singapore: visa-free
UPDATE visa_rules
SET visa_type = 'visa_free',
    stay_rule = 'Visa-free entry',
    max_stay_days = 30,
    notes = 'Visa-free for up to 30 days.'
WHERE passport_slug = 'egypt' AND destination_slug = 'singapore';

-- South Korea: visa-free (2024 policy)
UPDATE visa_rules
SET visa_type = 'visa_free',
    stay_rule = 'Visa-free entry',
    max_stay_days = 90,
    notes = 'Visa-free for up to 90 days as of 2024 policy.'
WHERE passport_slug = 'egypt' AND destination_slug = 'south-korea';

-- Vietnam: eVisa max stay corrected to 90 days
UPDATE visa_rules
SET max_stay_days = 90,
    stay_rule = 'eVisa required',
    notes = 'eVisa allows up to 90 days. Apply online before travel.'
WHERE passport_slug = 'egypt' AND destination_slug = 'vietnam';

-- Fix Schengen stay_window_days for all missing entries
UPDATE visa_rules
SET stay_window_days = 180
WHERE passport_slug = 'egypt'
  AND destination_slug IN ('croatia', 'czech-republic', 'france', 'germany', 'greece', 'hungary', 'italy', 'netherlands', 'poland', 'portugal', 'spain', 'switzerland')
  AND visa_type = 'visa_required'
  AND stay_window_days IS NULL;
