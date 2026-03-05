/*
  # Fix Brazil Outbound Visa Rules

  Corrections to Brazilian passport holders traveling abroad:

  1. Remove self-entry row (brazil -> brazil)
  2. Fix passport_validity_months = 0 to NULL or correct values
  3. Fix Canada: not in eTA program -> visa_required
  4. Fix China: passport_validity_months 0 -> 6
  5. Fix Chile/Colombia/Argentina: passport_validity_months 0 -> NULL (ID card/Mercosur)
  6. Fix Croatia/Czech Republic/France/Germany/Greece/Hungary/Italy/Netherlands/Poland/Portugal/Spain/Switzerland/Turkey: add stay_window_days = 180
  7. Fix India: max_stay_days 30 -> 90 (e-Tourist visa)
  8. Fix Indonesia: visa_on_arrival -> visa_free (bilateral agreement since 2015)
  9. Fix Japan: passport_validity_months 0 -> 6
  10. Fix Qatar: visa_on_arrival -> visa_free
  11. Fix Singapore: max_stay_days 30 -> 90
  12. Fix South Africa: passport_validity_months 1 -> 6
  13. Fix South Korea: visa_free_eta -> visa_free (K-ETA suspended)
  14. Fix UAE: visa_on_arrival -> visa_free
  15. Fix UK: passport_validity_months 0 -> 6
  16. Fix US: visa_free_eta -> visa_required (VWP not yet active for Brazil)
  17. Fix Mexico: passport_validity_months 0 -> 6
*/

-- 1. Remove self-entry row
DELETE FROM visa_rules WHERE passport_slug = 'brazil' AND destination_slug = 'brazil';

-- 2. Argentina: passport_validity_months 0 -> NULL (ID card accepted)
UPDATE visa_rules
SET passport_validity_months = NULL, notes = 'ID card accepted for entry. No passport validity requirement.'
WHERE passport_slug = 'brazil' AND destination_slug = 'argentina';

-- 3. Canada: visa_free_eta -> visa_required (Brazil not in eTA program)
UPDATE visa_rules
SET visa_type = 'visa_required', max_stay_days = 180, passport_validity_months = 6,
    notes = 'Visa required. Apply for Temporary Resident Visa (TRV) before travel.'
WHERE passport_slug = 'brazil' AND destination_slug = 'canada';

-- 4. Chile: passport_validity_months 0 -> NULL (Mercosur, ID card accepted)
UPDATE visa_rules
SET passport_validity_months = NULL, notes = 'ID card accepted for entry under Mercosur agreement.'
WHERE passport_slug = 'brazil' AND destination_slug = 'chile';

-- 5. China: passport_validity_months 0 -> 6
UPDATE visa_rules
SET passport_validity_months = 6, notes = 'Visa-free for short stays. Policy subject to change.'
WHERE passport_slug = 'brazil' AND destination_slug = 'china';

-- 6. Colombia: passport_validity_months 0 -> NULL (regional agreement)
UPDATE visa_rules
SET passport_validity_months = NULL, notes = 'Visa-free under regional agreement. ID card may be accepted.'
WHERE passport_slug = 'brazil' AND destination_slug = 'colombia';

-- 7. Croatia: add stay_window_days = 180 (Schengen)
UPDATE visa_rules
SET stay_window_days = 180
WHERE passport_slug = 'brazil' AND destination_slug = 'croatia';

-- 8. Czech Republic: add stay_window_days = 180
UPDATE visa_rules
SET stay_window_days = 180
WHERE passport_slug = 'brazil' AND destination_slug = 'czech-republic';

-- 9. France: add stay_window_days = 180
UPDATE visa_rules
SET stay_window_days = 180
WHERE passport_slug = 'brazil' AND destination_slug = 'france';

-- 10. Germany: add stay_window_days = 180
UPDATE visa_rules
SET stay_window_days = 180
WHERE passport_slug = 'brazil' AND destination_slug = 'germany';

-- 11. Greece: add stay_window_days = 180
UPDATE visa_rules
SET stay_window_days = 180
WHERE passport_slug = 'brazil' AND destination_slug = 'greece';

-- 12. Hungary: add stay_window_days = 180
UPDATE visa_rules
SET stay_window_days = 180
WHERE passport_slug = 'brazil' AND destination_slug = 'hungary';

-- 13. India: max_stay_days 30 -> 90, update note
UPDATE visa_rules
SET max_stay_days = 90, notes = 'Apply for e-Tourist visa prior to arrival. Valid for up to 90 days.'
WHERE passport_slug = 'brazil' AND destination_slug = 'india';

-- 14. Indonesia: visa_on_arrival -> visa_free (bilateral agreement since 2015)
UPDATE visa_rules
SET visa_type = 'visa_free', notes = 'Visa-free entry under bilateral agreement since 2015. Extendable.'
WHERE passport_slug = 'brazil' AND destination_slug = 'indonesia';

-- 15. Italy: add stay_window_days = 180
UPDATE visa_rules
SET stay_window_days = 180
WHERE passport_slug = 'brazil' AND destination_slug = 'italy';

-- 16. Japan: passport_validity_months 0 -> 6
UPDATE visa_rules
SET passport_validity_months = 6, notes = 'Visa-free entry. Passport must be valid for duration of stay.'
WHERE passport_slug = 'brazil' AND destination_slug = 'japan';

-- 17. Mexico: passport_validity_months 0 -> 6
UPDATE visa_rules
SET passport_validity_months = 6, notes = 'Entry duration stamped at arrival. Up to 180 days.'
WHERE passport_slug = 'brazil' AND destination_slug = 'mexico';

-- 18. Netherlands: add stay_window_days = 180
UPDATE visa_rules
SET stay_window_days = 180
WHERE passport_slug = 'brazil' AND destination_slug = 'netherlands';

-- 19. Poland: add stay_window_days = 180
UPDATE visa_rules
SET stay_window_days = 180
WHERE passport_slug = 'brazil' AND destination_slug = 'poland';

-- 20. Portugal: add stay_window_days = 180
UPDATE visa_rules
SET stay_window_days = 180
WHERE passport_slug = 'brazil' AND destination_slug = 'portugal';

-- 21. Qatar: visa_on_arrival -> visa_free
UPDATE visa_rules
SET visa_type = 'visa_free', notes = 'Visa-free entry for Brazilian passport holders.'
WHERE passport_slug = 'brazil' AND destination_slug = 'qatar';

-- 22. Singapore: max_stay_days 30 -> 90
UPDATE visa_rules
SET max_stay_days = 90, notes = 'Visa-free entry up to 90 days. Entry discretionary.'
WHERE passport_slug = 'brazil' AND destination_slug = 'singapore';

-- 23. South Africa: passport_validity_months 1 -> 6
UPDATE visa_rules
SET passport_validity_months = 6
WHERE passport_slug = 'brazil' AND destination_slug = 'south-africa';

-- 24. South Korea: visa_free_eta -> visa_free (K-ETA suspended for most nationalities)
UPDATE visa_rules
SET visa_type = 'visa_free', notes = 'Visa-free entry. K-ETA requirement suspended.'
WHERE passport_slug = 'brazil' AND destination_slug = 'south-korea';

-- 25. Spain: add stay_window_days = 180
UPDATE visa_rules
SET stay_window_days = 180
WHERE passport_slug = 'brazil' AND destination_slug = 'spain';

-- 26. Switzerland: add stay_window_days = 180
UPDATE visa_rules
SET stay_window_days = 180
WHERE passport_slug = 'brazil' AND destination_slug = 'switzerland';

-- 27. Turkey: add stay_window_days = 180
UPDATE visa_rules
SET stay_window_days = 180
WHERE passport_slug = 'brazil' AND destination_slug = 'turkey';

-- 28. UAE: visa_on_arrival -> visa_free
UPDATE visa_rules
SET visa_type = 'visa_free', notes = 'Visa-free entry for Brazilian passport holders. Up to 90 days.'
WHERE passport_slug = 'brazil' AND destination_slug = 'united-arab-emirates';

-- 29. UK: passport_validity_months 0 -> 6
UPDATE visa_rules
SET passport_validity_months = 6, notes = 'ETA required before travel for visa-free nationals.'
WHERE passport_slug = 'brazil' AND destination_slug = 'united-kingdom';

-- 30. USA: visa_free_eta -> visa_required (VWP not confirmed active for Brazil)
UPDATE visa_rules
SET visa_type = 'visa_required', passport_validity_months = 6,
    notes = 'B1/B2 visa required. VWP inclusion announced but not yet in effect; verify before travel.'
WHERE passport_slug = 'brazil' AND destination_slug = 'united-states';
