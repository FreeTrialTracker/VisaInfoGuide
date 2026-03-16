/*
  # Deduplicate mid-tier passport expansion

  Remove older duplicate entries where a newer 2026-03-15 entry exists
  for UAE, Qatar, Malaysia, Mexico, Argentina, Chile, Brazil, Peru,
  Colombia, South Africa, Turkey.
*/

DELETE FROM visa_rules
WHERE id IN (
  SELECT old.id
  FROM visa_rules old
  JOIN visa_rules newer ON (
    old.passport_slug = newer.passport_slug
    AND old.destination_slug = newer.destination_slug
    AND old.id != newer.id
    AND newer.last_verified = '2026-03-15'
    AND old.last_verified < '2026-03-15'
  )
  WHERE old.passport_slug IN (
    'united-arab-emirates','qatar','malaysia','mexico','argentina',
    'chile','brazil','peru','colombia','south-africa','turkey'
  )
);
