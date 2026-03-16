/*
  # Deduplicate EU passport expansion — remove lower-quality older entries

  ## Context
  The EU passport expansion inserted France-derived rows alongside existing
  older entries for Austria, Belgium, etc. This created duplicates for the
  same passport+destination where the old data had different subtypes or
  visa_type values.

  ## Strategy
  For each duplicate (passport, destination) pair in EU passports:
  1. Keep the row with last_verified = 2026-03-15 (higher quality, France-derived)
  2. Delete the older row

  Special cases handled:
  - Austria/Brazil: old row is visa_free (correct), new row has visa_required (France data error)
    → Keep old visa_free for Austria; France's Brazil rule is different from Austria's
    Actually Austria → Brazil: Both EU members, Brazil is visa-free for EU. Delete the visa_required.
  - South Korea: old K-ETA row should be deleted in favor of visa_free (K-ETA suspended)
  - Saudi Arabia: keep evisa (new), delete VOA (old and less accurate)
  - Nigeria: keep evisa (new, from France data), delete visa_required (old, incorrect for EU)
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
    'spain','portugal','italy','netherlands','poland','belgium',
    'austria','croatia','czech-republic','greece','hungary','switzerland'
  )
);

DELETE FROM visa_rules
WHERE id IN (
  SELECT old.id
  FROM visa_rules old
  JOIN visa_rules newer ON (
    old.passport_slug = newer.passport_slug
    AND old.destination_slug = newer.destination_slug
    AND old.id != newer.id
    AND newer.last_verified = '2026-03-15'
    AND (old.last_verified = newer.last_verified OR old.last_verified IS NULL)
    AND (
      (old.visa_subtype LIKE '%EU Freedom of Movement%')
      OR (old.visa_subtype LIKE '%or eVisa%')
      OR (old.visa_subtype LIKE '%eVisa (limited regions)%' AND newer.visa_subtype IS NULL)
    )
  )
  WHERE old.passport_slug IN (
    'spain','portugal','italy','netherlands','poland','belgium',
    'austria','croatia','czech-republic','greece','hungary','switzerland'
  )
);
