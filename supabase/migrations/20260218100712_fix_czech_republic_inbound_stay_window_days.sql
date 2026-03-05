
/*
  # Fix Czech Republic Inbound Schengen stay_window_days

  ## Changes
  Add stay_window_days = 180 for all visa-free passport holders traveling to Czech Republic
  who are subject to the Schengen 90/180 rule. These were previously NULL.

  Affected passports:
  - malaysia
  - mexico
  - new-zealand
  - qatar
  - singapore
  - south-korea
  - united-arab-emirates
  - united-kingdom
  - united-states
*/

UPDATE visa_rules
SET stay_window_days = 180
WHERE destination_slug = 'czech-republic'
  AND passport_slug IN (
    'malaysia',
    'mexico',
    'new-zealand',
    'qatar',
    'singapore',
    'south-korea',
    'united-arab-emirates',
    'united-kingdom',
    'united-states'
  )
  AND visa_type = 'visa_free';
