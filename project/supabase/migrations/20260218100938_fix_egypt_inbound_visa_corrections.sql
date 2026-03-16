
/*
  # Fix Egypt Inbound Visa Rules

  Corrects errors in rules for foreign passport holders entering Egypt:

  1. Germany: evisa -> visa_on_arrival (consistent with other EU nationals)
  2. Japan: remove incorrect stay_window_days = 180 (Egypt has no 90/180 rule)
  3. Malaysia: evisa -> visa_on_arrival (VOA available at Egyptian airports)
  4. Nigeria: visa_required -> evisa (Nigeria is on Egypt's eVisa eligible list)
  5. Thailand: evisa -> visa_on_arrival (VOA available)
  6. India: evisa -> visa_on_arrival (VOA available at major Egyptian airports)
  7. Qatar: max_stay_days corrected from 90 to 30 days
*/

-- Germany: visa_on_arrival
UPDATE visa_rules
SET visa_type = 'visa_on_arrival',
    stay_rule = 'Visa on arrival',
    notes = 'Visa available on arrival; eVisa also available.'
WHERE passport_slug = 'germany' AND destination_slug = 'egypt';

-- Japan: remove incorrect stay_window_days
UPDATE visa_rules
SET stay_window_days = NULL,
    notes = 'Egypt eVisa portal lists Japan among eligible nationalities.'
WHERE passport_slug = 'japan' AND destination_slug = 'egypt';

-- Malaysia: visa_on_arrival
UPDATE visa_rules
SET visa_type = 'visa_on_arrival',
    stay_rule = 'Visa on arrival',
    notes = 'Visa on arrival available at Egyptian international airports.'
WHERE passport_slug = 'malaysia' AND destination_slug = 'egypt';

-- Nigeria: evisa
UPDATE visa_rules
SET visa_type = 'evisa',
    stay_rule = 'eVisa available',
    notes = 'Apply via Egypt eVisa official portal before travel.'
WHERE passport_slug = 'nigeria' AND destination_slug = 'egypt';

-- Thailand: visa_on_arrival
UPDATE visa_rules
SET visa_type = 'visa_on_arrival',
    stay_rule = 'Visa on arrival',
    notes = 'Visa on arrival available at Egyptian international airports.'
WHERE passport_slug = 'thailand' AND destination_slug = 'egypt';

-- India: visa_on_arrival
UPDATE visa_rules
SET visa_type = 'visa_on_arrival',
    stay_rule = 'Visa on arrival',
    notes = 'Visa on arrival available at major Egyptian airports; eVisa also available.'
WHERE passport_slug = 'india' AND destination_slug = 'egypt';

-- Qatar: correct max_stay_days from 90 to 30
UPDATE visa_rules
SET max_stay_days = 30,
    stay_rule = 'Visa-free short stay',
    notes = 'Visa-free for up to 30 days.'
WHERE passport_slug = 'qatar' AND destination_slug = 'egypt';
