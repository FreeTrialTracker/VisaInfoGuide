/*
  # Fix Germany inbound stay_window_days

  ## Summary
  Germany is a Schengen country. All non-EU short-stay visitors are subject to the 90/180-day
  Schengen rule. Many inbound rows had NULL for stay_window_days when it should be 180.

  ## Changes
  - Set stay_window_days = 180 for all non-EU passports entering Germany with a short-stay
    (visa_free, visa_required, visa_on_arrival) where stay_window_days was NULL
*/

UPDATE visa_rules
SET stay_window_days = 180
WHERE destination_slug = 'germany'
  AND stay_window_days IS NULL
  AND stay_rule NOT LIKE '%EU freedom%'
  AND stay_rule NOT LIKE '%EU citizen%'
  AND stay_rule NOT LIKE '%EU mobility%'
  AND passport_slug NOT IN (
    'austria','belgium','croatia','czech-republic','france','germany','greece',
    'hungary','italy','netherlands','poland','portugal','spain','bulgaria',
    'romania','cyprus','denmark','estonia','finland','ireland','latvia',
    'lithuania','luxembourg','malta','slovakia','slovenia','sweden'
  );
