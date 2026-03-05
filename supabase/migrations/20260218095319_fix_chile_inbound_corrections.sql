
/*
  # Fix Chile Inbound Visa Rules

  1. Changes
    - Saudi Arabia: visa_required -> visa_free (90 days, as of 2023 agreement)
    - UAE: visa_required -> visa_free (90 days)
    - Turkey: visa_required -> visa_free (90 days)
    - Malaysia: visa_required -> visa_free (90 days)
*/

-- Saudi Arabia: visa-free since 2023
UPDATE visa_rules
SET visa_type = 'visa_free',
    notes = 'Visa-free entry for tourism. Up to 90 days.'
WHERE passport_slug = 'saudi-arabia' AND destination_slug = 'chile';

-- UAE: visa-free
UPDATE visa_rules
SET visa_type = 'visa_free',
    notes = 'Visa-free entry for tourism. Up to 90 days.'
WHERE passport_slug = 'united-arab-emirates' AND destination_slug = 'chile';

-- Turkey: visa-free
UPDATE visa_rules
SET visa_type = 'visa_free',
    notes = 'Visa-free entry for tourism. Up to 90 days.'
WHERE passport_slug = 'turkey' AND destination_slug = 'chile';

-- Malaysia: visa-free
UPDATE visa_rules
SET visa_type = 'visa_free',
    notes = 'Visa-free entry for tourism. Up to 90 days.'
WHERE passport_slug = 'malaysia' AND destination_slug = 'chile';
