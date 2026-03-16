/*
  # Deduplicate Nordic/EEA passport expansion

  ## Changes
  Remove older duplicate entries for Denmark, Finland, Sweden, Norway, Ireland, Romania
  where a newer 2026-03-15 entry exists for the same passport+destination pair.

  Special case: Ireland → UK
  - Old entry has subtype 'CTA' (Common Travel Area — Irish citizens exempt from ETA)
  - New entry has subtype 'ETA' (copied from France, incorrect for Irish citizens)
  - Irish citizens are EXEMPT from the UK ETA under the Common Travel Area
  - Keep CTA entry, delete the ETA one

  Special case: Romania → Russia
  - Old entry has NULL subtype, new has 'eVisa (limited regions)'
  - Keep newer (more descriptive) entry

  For all other duplicates: keep 2026-03-15 entry, delete older one.
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
  WHERE old.passport_slug IN ('denmark','finland','sweden','norway','ireland','romania')
  AND NOT (old.passport_slug = 'ireland' AND old.destination_slug = 'united-kingdom')
);

DELETE FROM visa_rules
WHERE passport_slug = 'ireland'
  AND destination_slug = 'united-kingdom'
  AND visa_subtype = 'ETA'
  AND last_verified = '2026-03-15';
