
/*
  # Fix Colombia Schengen stay_window_days

  ## Summary
  All Schengen destinations for Colombian passport holders were missing the stay_window_days = 180
  value, which is required to correctly represent the 90/180 Schengen rule.

  ## Changes
  - Sets stay_window_days = 180 for all colombia → Schengen country pairs:
    Austria, Belgium, Croatia, Czech Republic, France, Germany, Greece, Hungary,
    Italy, Netherlands, Poland, Portugal, Spain, Switzerland
*/

UPDATE visa_rules
SET stay_window_days = 180
WHERE passport_slug = 'colombia'
  AND destination_slug IN (
    'austria', 'belgium', 'croatia', 'czech-republic', 'france', 'germany',
    'greece', 'hungary', 'italy', 'netherlands', 'poland', 'portugal',
    'spain', 'switzerland'
  )
  AND visa_type = 'visa_free';
