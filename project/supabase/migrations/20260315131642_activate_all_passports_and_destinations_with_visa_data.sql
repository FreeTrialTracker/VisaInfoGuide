
/*
  # Activate all passports and destinations that have visa rule data

  ## Summary
  Many passports and destinations exist in their respective tables but have
  is_active = false, preventing them from appearing in dropdowns. This migration
  activates every passport and destination that has at least one row in visa_rules.
*/

UPDATE passports
SET is_active = true
WHERE slug IN (SELECT DISTINCT passport_slug FROM visa_rules)
  AND is_active = false;

UPDATE destinations
SET is_active = true
WHERE slug IN (SELECT DISTINCT destination_slug FROM visa_rules)
  AND is_active = false;
