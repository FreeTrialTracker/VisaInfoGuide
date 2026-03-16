/*
  # Remove duplicate Canada → USA visa rule entry

  ## Issue
  There are two rows for Canada → USA:
  1. visa_subtype = 'NO ESTA required' (the original entry)
  2. visa_subtype = NULL (the new correct entry added in batch 1)

  The correct entry is the one with NULL subtype. The 'NO ESTA required' subtype is
  not a real visa category — it was a note incorrectly stored as a subtype.
  Deleting the old duplicate row.

  ## Safety
  The correct NULL-subtype row will remain. No data is lost; only the erroneous
  duplicate is removed.
*/

DELETE FROM visa_rules
WHERE passport_slug = 'canada'
  AND destination_slug = 'united-states'
  AND visa_subtype = 'NO ESTA required';
