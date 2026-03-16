/*
  # Fix Switzerland -> Germany inbound rule

  ## Summary
  Swiss nationals have bilateral free movement rights with the EU under the Agreement on the
  Free Movement of Persons. Swiss passport holders do not fall under the Schengen 90/180 rule
  as visitors - they have a status equivalent to EU free movement. The row incorrectly showed
  max_stay_days = 90 and stay_window_days = NULL instead of NULL/NULL with EU free movement.

  ## Changes
  - passport: switzerland, destination: germany
  - set max_stay_days = NULL (no short-stay cap)
  - set stay_window_days = NULL
  - update stay_rule and notes to reflect EU/EFTA free movement
*/

UPDATE visa_rules
SET
  max_stay_days = NULL,
  stay_window_days = NULL,
  stay_rule = 'EU/EFTA free movement (Agreement on Free Movement of Persons)',
  notes = 'Swiss nationals enjoy free movement rights in Germany equivalent to EU citizens under the CH-EU bilateral agreement.'
WHERE passport_slug = 'switzerland'
  AND destination_slug = 'germany';
