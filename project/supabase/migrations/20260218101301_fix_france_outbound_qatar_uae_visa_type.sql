/*
  # Fix France Outbound: Qatar and UAE visa_type corrections

  ## Summary
  Two outbound destinations had incorrect visa_type for French passport holders:

  1. Qatar: French passport holders receive visa-free entry (not visa_on_arrival).
     Qatar has a visa waiver program for EU/Western passport holders.
     - Change: visa_on_arrival -> visa_free
     - max_stay_days: 30 -> 90 (Qatar allows up to 90 days visa-free for French citizens)
     - Add stay_window_days = 180, stay_rule updated

  2. UAE: French passport holders receive a free visit stamp on arrival —
     this is a visa-free entry, not a paid visa-on-arrival.
     - Change: visa_on_arrival -> visa_free
     - max_stay_days: 90 (correct, keep)
     - stay_rule updated to clarify
*/

UPDATE visa_rules
SET
  visa_type = 'visa_free',
  max_stay_days = 90,
  stay_window_days = 180,
  stay_rule = 'Visa-free entry; up to 90 days per visit',
  notes = 'No visa required. Entry stamp issued on arrival. 90-day stay allowed.'
WHERE passport_slug = 'france'
  AND destination_slug = 'qatar';

UPDATE visa_rules
SET
  visa_type = 'visa_free',
  stay_rule = 'Visa-free visit stamp on arrival; up to 90 days',
  notes = 'Free entry stamp granted on arrival. No visa fee required.'
WHERE passport_slug = 'france'
  AND destination_slug = 'united-arab-emirates';
