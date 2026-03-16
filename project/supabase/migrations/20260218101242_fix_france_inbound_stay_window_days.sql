/*
  # Fix France Inbound stay_window_days

  ## Summary
  Several non-EU/non-Schengen passports entering France had NULL stay_window_days.
  France is a Schengen member, so all short-stay visitors (visa-free or visa-required)
  are subject to the 90/180 rule — meaning stay_window_days = 180 must be set.

  ## Affected rows (passport -> France)
  - india, indonesia, malaysia, mexico, nigeria, philippines, russia,
    saudi-arabia, singapore, south-africa, south-korea, thailand, turkey,
    united-arab-emirates, united-kingdom, united-states, vietnam, new-zealand

  ## Changes
  - Set stay_window_days = 180 for all above passports where destination = 'france'
    and stay_window_days IS NULL
*/

UPDATE visa_rules
SET stay_window_days = 180
WHERE destination_slug = 'france'
  AND stay_window_days IS NULL
  AND passport_slug IN (
    'india', 'indonesia', 'malaysia', 'mexico', 'nigeria', 'philippines',
    'russia', 'saudi-arabia', 'singapore', 'south-africa', 'south-korea',
    'thailand', 'turkey', 'united-arab-emirates', 'united-kingdom',
    'united-states', 'vietnam', 'new-zealand', 'qatar', 'china', 'egypt',
    'colombia', 'chile', 'brazil', 'canada', 'australia', 'argentina',
    'switzerland'
  );
