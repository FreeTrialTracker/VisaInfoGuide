
/*
  # Standardize passport_validity_months for Inbound Colombia

  ## Summary
  Several inbound rules for Colombia had passport_validity_months = 0,
  which is inconsistent. Colombia generally only requires the passport to be
  valid for the duration of stay, so these are corrected to NULL (no minimum requirement).

  ## Changes
  - Sets passport_validity_months = NULL for all inbound Colombia rules where it was 0
    (applies to: argentina, france, germany, italy, japan, mexico, netherlands,
     poland, singapore, south-korea, spain, switzerland, uk, us)
*/

UPDATE visa_rules
SET passport_validity_months = NULL
WHERE destination_slug = 'colombia'
  AND passport_validity_months = 0;
