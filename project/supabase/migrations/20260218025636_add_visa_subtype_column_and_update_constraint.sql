/*
  # Add visa_subtype column to visa_rules

  ## Summary
  Adds a nullable `visa_subtype` column to support modeling multiple variants
  of the same visa type for a passport/destination pair (e.g. India eTourist 30-day,
  1-year, 5-year eVisas).

  ## Changes
  - `visa_rules`: new column `visa_subtype` (text, nullable, default NULL)
  - Drop old unique constraint on (passport_slug, destination_slug)
  - Add new unique constraint on (passport_slug, destination_slug, visa_subtype)
    using NULLS NOT DISTINCT so that two rows both with NULL subtype still conflict

  ## Notes
  - All existing rows retain NULL subtype and remain unambiguous under the new constraint
  - The old generic Japan->India row will be replaced by subtype-specific rows
*/

ALTER TABLE visa_rules
  ADD COLUMN IF NOT EXISTS visa_subtype text DEFAULT NULL;

ALTER TABLE visa_rules
  DROP CONSTRAINT IF EXISTS visa_rules_passport_slug_destination_slug_key;

ALTER TABLE visa_rules
  ADD CONSTRAINT visa_rules_passport_destination_subtype_key
  UNIQUE NULLS NOT DISTINCT (passport_slug, destination_slug, visa_subtype);
