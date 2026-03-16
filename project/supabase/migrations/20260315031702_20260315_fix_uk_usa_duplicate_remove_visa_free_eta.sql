/*
  # Fix UK → USA: Remove incorrect visa_free_eta duplicate row

  ## Issue
  There are two rows for UK → USA:
  1. visa_type = 'visa_free_eta', visa_subtype = NULL (INCORRECT — UK is on VWP, not ETA)
  2. visa_type = 'evisa', visa_subtype = 'ESTA' (CORRECT — VWP ESTA)

  The `visa_free_eta` entry is wrong. UK nationals are on the U.S. Visa Waiver Program
  and require an ESTA before travel. There is no ETA system in the U.S.
  Removing the incorrect row.

  ## Sources
  - U.S. CBP Visa Waiver Program (cbp.gov/travel/international-visitors/visa-waiver-program)
  - UK FCDO Foreign Travel Advice: USA
*/

DELETE FROM visa_rules
WHERE passport_slug = 'united-kingdom'
  AND destination_slug = 'united-states'
  AND visa_type = 'visa_free_eta'
  AND visa_subtype IS NULL;
