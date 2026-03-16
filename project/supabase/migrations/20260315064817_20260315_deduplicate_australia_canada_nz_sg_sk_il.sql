/*
  # Deduplicate Australia, Canada, NZ, Singapore, South Korea, Israel passport expansions

  ## Strategy
  For each duplicate pair:
  1. Keep the newer (2026-03-15) entry when it has a more specific visa_subtype
  2. Keep the older entry when it has a special/contextual subtype not covered by France's data
  3. Special case: Canada→USA ESTA vs NULL — keep ESTA, delete NULL

  All old entries with "Bilateral agreement", "K-ETA exemption...", 
  "Schengen (EES active...)", "or eVisa", "eVisa" subtypes will be deleted
  in favor of cleaner 2026-03-15 entries.
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
    'australia','canada','new-zealand','singapore','south-korea','israel'
  )
);

DELETE FROM visa_rules
WHERE passport_slug = 'canada'
  AND destination_slug = 'united-states'
  AND visa_subtype IS NULL
  AND last_verified = '2026-03-15'
  AND EXISTS (
    SELECT 1 FROM visa_rules x
    WHERE x.passport_slug = 'canada'
      AND x.destination_slug = 'united-states'
      AND x.visa_subtype = 'ESTA'
  );
