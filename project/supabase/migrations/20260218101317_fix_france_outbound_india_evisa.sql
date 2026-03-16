/*
  # Fix France Outbound: India eVisa max_stay_days

  ## Summary
  France -> India had visa_type = evisa but max_stay_days was NULL.
  The India Tourist eVisa allows 30 days per visit (double entry).
  Setting max_stay_days = 30 and updating notes/stay_rule to reflect the standard tourist eVisa.
  Business eVisa (365 days, multiple entry) is a separate use case noted in the notes.
*/

UPDATE visa_rules
SET
  max_stay_days = 30,
  stay_rule = 'Tourist eVisa: 30 days per visit, double entry',
  notes = 'Tourist eVisa allows 30 days/double entry. Business eVisa allows 365 days/multiple entry. Select correct subtype when applying.'
WHERE passport_slug = 'france'
  AND destination_slug = 'india';
