/*
  # Fix Canada Inbound Data Corrections

  ## Summary
  Corrects multiple data issues for visitors traveling to Canada:

  1. passport_validity_months = 0 corrected to 6 for most nationalities
  2. Japan -> Canada: stay_window_days = 365 removed (Canada has no rolling window rule)
  3. UAE -> Canada: corrected from visa_required to visa_free_eta (UAE passport holders qualify for eTA)
  4. Malaysia -> Canada: cleaned up confusing note
*/

-- Fix passport_validity_months = 0 for inbound visitors to Canada
UPDATE visa_rules SET passport_validity_months = 6
WHERE destination_slug = 'canada' AND passport_slug IN (
  'china', 'france', 'germany', 'italy', 'mexico', 'netherlands',
  'poland', 'singapore', 'south-korea', 'spain', 'switzerland',
  'thailand', 'united-kingdom'
) AND passport_validity_months = 0;

-- Fix Japan -> Canada: remove incorrect stay_window_days = 365
UPDATE visa_rules
SET stay_window_days = NULL
WHERE passport_slug = 'japan' AND destination_slug = 'canada';

-- Fix UAE -> Canada: visa_required -> visa_free_eta
UPDATE visa_rules
SET visa_type = 'visa_free_eta', passport_validity_months = 6,
    notes = 'eTA required for air travel. UAE passport holders qualify for Canadian eTA.'
WHERE passport_slug = 'united-arab-emirates' AND destination_slug = 'canada';

-- Fix Malaysia -> Canada: clean up note
UPDATE visa_rules
SET notes = 'Visa required (TRV). Apply before travel. Note: some Malaysian-born applicants may qualify for eTA under specific conditions.'
WHERE passport_slug = 'malaysia' AND destination_slug = 'canada';
