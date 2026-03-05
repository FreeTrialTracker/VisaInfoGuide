/*
  # Fix Germany outbound UAE visa_type and India max_stay_days

  ## Summary
  Two corrections for German passport holders traveling outbound:

  1. Germany -> UAE: The UAE grants Germans a free entry stamp on arrival; this is visa-free
     not visa_on_arrival (no fee, no separate visa document required). Changed to visa_free.

  2. Germany -> India: eVisa max_stay_days was NULL. The standard India Tourist eVisa grants
     30 days per entry (double entry allowed). Set max_stay_days = 30 and add clarifying notes.

  ## Changes
  - germany -> united-arab-emirates: visa_type = visa_free, stay_rule and notes updated
  - germany -> india: max_stay_days = 30, notes updated with subtype guidance
*/

UPDATE visa_rules
SET
  visa_type = 'visa_free',
  stay_rule = 'Visa-free entry; visit stamp granted on arrival; commonly up to 90 days within 180 days',
  notes = 'UAE grants German passport holders a free entry stamp on arrival with no visa fee. Onward ticket and hotel booking commonly checked.'
WHERE passport_slug = 'germany'
  AND destination_slug = 'united-arab-emirates';

UPDATE visa_rules
SET
  max_stay_days = 30,
  stay_rule = 'India eVisa (Tourist): 30 days per entry (double entry); 1-year and 5-year tourist eVisas also available with multiple entries',
  notes = 'Tourist eVisa 30-day is most common for short stays. 1-year/5-year options allow multiple entries with each stay up to 90 days. Apply via official India eVisa portal.'
WHERE passport_slug = 'germany'
  AND destination_slug = 'india';
