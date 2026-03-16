/*
  # Batch 1 Audit Fix: USA → Turkey and UK → UAE

  ## Changes
  1. USA → Turkey: corrected from evisa to visa_free (90 days)
     Effective January 19, 2024, Turkey eliminated the visa requirement entirely for
     U.S. citizens. Americans no longer need an eVisa. They can enter for up to 90
     days in any 180-day period.

  2. UK → UAE: corrected max_stay_days from 30 to 90 days
     British passport holders receive a free-of-charge visit visa on arrival at UAE
     airports valid for 90 days (multiple-entry within a 180-day window from issue).
     The 30-day figure was outdated.

  ## Sources
  - U.S. Embassy Turkey (tr.usembassy.gov), Turkish MFA (mfa.gov.tr)
  - Emirates Airlines UAE visa information, FCDO guidance
*/

UPDATE visa_rules
SET
  visa_type = 'visa_free',
  visa_subtype = NULL,
  notes = 'Visa-free entry effective January 19, 2024. U.S. citizens can stay up to 90 days in any 180-day period. No eVisa or prior authorization required.'
WHERE passport_slug = 'united-states'
  AND destination_slug = 'turkey';

UPDATE visa_rules
SET
  max_stay_days = 90,
  notes = 'Visa-free entry on arrival. British passport holders receive a complimentary multi-entry visit visa valid for 90 days within a 180-day period from date of issue.'
WHERE passport_slug = 'united-kingdom'
  AND destination_slug = 'united-arab-emirates';
