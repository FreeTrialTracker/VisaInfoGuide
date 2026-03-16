/*
  # Fix Brazil Inbound Visa Rules

  Corrections to visitors traveling to Brazil:

  1. Remove self-entry row (brazil -> brazil) - already deleted above, skip
  2. Fix Canada: passport_validity_months 0 -> 6
  3. Fix China: clean up uncertain note
  4. Fix France: passport_validity_months 0 -> 6
  5. Fix Germany: passport_validity_months 0 -> 6
  6. Fix Indonesia: max_stay_days 30 -> 90, passport_validity_months 0 -> 6
  7. Fix Italy: passport_validity_months 0 -> 6
  8. Fix Japan: stay_window_days 180 -> NULL (Brazil doesn't use rolling window)
  9. Fix Malaysia: visa_required -> visa_free (bilateral agreement 2024)
  10. Fix Mexico: passport_validity_months 0 -> 6
  11. Fix Netherlands: passport_validity_months 0 -> 6
  12. Fix Philippines: passport_validity_months 0 -> 6
  13. Fix Poland: passport_validity_months 0 -> 6
  14. Fix Singapore: passport_validity_months 0 -> 6
  15. Fix South Africa: passport_validity_months 0 -> 6
  16. Fix South Korea: passport_validity_months 0 -> 6
  17. Fix Spain: passport_validity_months 0 -> 6
  18. Fix Switzerland: passport_validity_months 0 -> 6
  19. Fix Thailand: visa_required -> visa_free, 30 days
  20. Fix Turkey: visa_required -> visa_free
  21. Fix UAE: passport_validity_months 0 -> 6
  22. Fix UK: passport_validity_months 0 -> 6
  23. Fix USA: evisa -> visa_free (US citizens don't need a visa for Brazil)
  24. Fix Vietnam: passport_validity_months 0 -> 6
  25. Fix Argentina: passport_validity_months 0 -> NULL (Mercosur, ID card)
  26. Fix Russia: passport_validity_months 0 -> 6
*/

-- Canada: passport_validity_months 0 -> 6
UPDATE visa_rules
SET passport_validity_months = 6
WHERE passport_slug = 'canada' AND destination_slug = 'brazil';

-- China: clean up uncertain note
UPDATE visa_rules
SET notes = 'Visa-free for short stays under bilateral agreement. Max 30 days per visit.',
    passport_validity_months = 6
WHERE passport_slug = 'china' AND destination_slug = 'brazil';

-- France: passport_validity_months 0 -> 6
UPDATE visa_rules
SET passport_validity_months = 6
WHERE passport_slug = 'france' AND destination_slug = 'brazil';

-- Germany: passport_validity_months 0 -> 6
UPDATE visa_rules
SET passport_validity_months = 6, notes = 'Visa-free for short stays up to 90 days.'
WHERE passport_slug = 'germany' AND destination_slug = 'brazil';

-- Indonesia: max_stay_days 30 -> 90, passport_validity_months 0 -> 6
UPDATE visa_rules
SET max_stay_days = 90, passport_validity_months = 6, notes = 'Visa-free under reciprocal arrangement. Up to 90 days.'
WHERE passport_slug = 'indonesia' AND destination_slug = 'brazil';

-- Italy: passport_validity_months 0 -> 6
UPDATE visa_rules
SET passport_validity_months = 6
WHERE passport_slug = 'italy' AND destination_slug = 'brazil';

-- Japan: remove incorrect stay_window_days = 180, set to NULL
UPDATE visa_rules
SET stay_window_days = NULL, passport_validity_months = 6,
    notes = 'Visa-free entry. Verify current agreement renewal status.'
WHERE passport_slug = 'japan' AND destination_slug = 'brazil';

-- Malaysia: visa_required -> visa_free (2024 bilateral agreement)
UPDATE visa_rules
SET visa_type = 'visa_free', passport_validity_months = 6,
    notes = 'Visa-free under 2024 bilateral agreement. Up to 90 days.'
WHERE passport_slug = 'malaysia' AND destination_slug = 'brazil';

-- Mexico: passport_validity_months 0 -> 6
UPDATE visa_rules
SET passport_validity_months = 6
WHERE passport_slug = 'mexico' AND destination_slug = 'brazil';

-- Netherlands: passport_validity_months 0 -> 6
UPDATE visa_rules
SET passport_validity_months = 6
WHERE passport_slug = 'netherlands' AND destination_slug = 'brazil';

-- Philippines: passport_validity_months 0 -> 6
UPDATE visa_rules
SET passport_validity_months = 6
WHERE passport_slug = 'philippines' AND destination_slug = 'brazil';

-- Poland: passport_validity_months 0 -> 6
UPDATE visa_rules
SET passport_validity_months = 6
WHERE passport_slug = 'poland' AND destination_slug = 'brazil';

-- Singapore: passport_validity_months 0 -> 6
UPDATE visa_rules
SET passport_validity_months = 6
WHERE passport_slug = 'singapore' AND destination_slug = 'brazil';

-- South Africa: passport_validity_months 0 -> 6
UPDATE visa_rules
SET passport_validity_months = 6
WHERE passport_slug = 'south-africa' AND destination_slug = 'brazil';

-- South Korea: passport_validity_months 0 -> 6
UPDATE visa_rules
SET passport_validity_months = 6
WHERE passport_slug = 'south-korea' AND destination_slug = 'brazil';

-- Spain: passport_validity_months 0 -> 6
UPDATE visa_rules
SET passport_validity_months = 6, notes = 'Visa-free for short stays up to 90 days.'
WHERE passport_slug = 'spain' AND destination_slug = 'brazil';

-- Switzerland: passport_validity_months 0 -> 6
UPDATE visa_rules
SET passport_validity_months = 6
WHERE passport_slug = 'switzerland' AND destination_slug = 'brazil';

-- Thailand: visa_required -> visa_free, 30 days
UPDATE visa_rules
SET visa_type = 'visa_free', max_stay_days = 30, passport_validity_months = 6,
    notes = 'Visa-free entry for tourism up to 30 days.'
WHERE passport_slug = 'thailand' AND destination_slug = 'brazil';

-- Turkey: visa_required -> visa_free
UPDATE visa_rules
SET visa_type = 'visa_free', passport_validity_months = 6,
    notes = 'Visa-free entry under reciprocal agreement. Up to 90 days.'
WHERE passport_slug = 'turkey' AND destination_slug = 'brazil';

-- UAE: passport_validity_months 0 -> 6
UPDATE visa_rules
SET passport_validity_months = 6
WHERE passport_slug = 'united-arab-emirates' AND destination_slug = 'brazil';

-- UK: passport_validity_months 0 -> 6
UPDATE visa_rules
SET passport_validity_months = 6, notes = 'Visa-free for short stays up to 90 days.'
WHERE passport_slug = 'united-kingdom' AND destination_slug = 'brazil';

-- USA: evisa -> visa_free (US citizens do not need a visa for Brazil)
UPDATE visa_rules
SET visa_type = 'visa_free', passport_validity_months = 6,
    notes = 'Visa-free entry for US citizens. Up to 90 days per visit.'
WHERE passport_slug = 'united-states' AND destination_slug = 'brazil';

-- Vietnam: passport_validity_months 0 -> 6
UPDATE visa_rules
SET passport_validity_months = 6
WHERE passport_slug = 'vietnam' AND destination_slug = 'brazil';

-- Argentina: passport_validity_months 0 -> NULL (Mercosur, ID card accepted)
UPDATE visa_rules
SET passport_validity_months = NULL, notes = 'ID card accepted under Mercosur agreement.'
WHERE passport_slug = 'argentina' AND destination_slug = 'brazil';

-- Russia: passport_validity_months 0 -> 6
UPDATE visa_rules
SET passport_validity_months = 6
WHERE passport_slug = 'russia' AND destination_slug = 'brazil';

-- Japan: passport_validity_months 0 -> 6 (set after clearing stay_window_days above)
UPDATE visa_rules
SET passport_validity_months = 6
WHERE passport_slug = 'japan' AND destination_slug = 'brazil';
