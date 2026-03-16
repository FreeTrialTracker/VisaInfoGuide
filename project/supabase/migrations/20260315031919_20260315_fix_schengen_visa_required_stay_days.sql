/*
  # Fix NULL max_stay_days for Schengen visa_required entries

  ## Issue
  Multiple passports have visa_required entries to Schengen Area destinations
  (Denmark, Finland, Norway, Sweden, Ireland) with NULL max_stay_days. The standard
  Schengen C-type tourist/visitor visa permits stays of up to 90 days in any 180-day
  period. Ireland (not Schengen) issues short-stay C visas valid for 90 days.

  ## Changes
  Setting max_stay_days = 90 for all visa_required entries to these destinations
  where the current value is NULL. This applies to passports:
  China, Egypt, India, Indonesia, Morocco, Nigeria, Peru, Philippines, Vietnam,
  Ukraine, Russia, and others.

  ## Note
  Ireland is NOT in the Schengen Area but its standard short-stay visa also allows
  90 days.

  ## Sources
  - European Commission Schengen visa information (ec.europa.eu)
  - Irish Naturalisation and Immigration Service (inis.gov.ie)
*/

UPDATE visa_rules
SET max_stay_days = 90
WHERE destination_slug IN ('denmark', 'finland', 'norway', 'sweden', 'ireland',
                            'romania', 'croatia', 'austria', 'belgium', 'czech-republic',
                            'greece', 'hungary', 'netherlands', 'poland', 'portugal',
                            'italy', 'france', 'germany', 'spain')
  AND visa_type IN ('visa_required', 'evisa')
  AND max_stay_days IS NULL;
