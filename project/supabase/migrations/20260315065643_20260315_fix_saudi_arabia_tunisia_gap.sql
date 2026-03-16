/*
  # Fix Saudi Arabia - Tunisia Gap

  Saudi Arabia was missing Tunisia from its destination coverage.
  Saudi citizens can enter Tunisia visa-free under bilateral agreement.
*/

INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, visa_subtype, max_stay_days, stay_window_days, last_verified, notes)
VALUES
  ('saudi-arabia', 'tunisia', 'visa_free', NULL, 90, NULL, '2026-03-15', 'Saudi citizens can enter Tunisia visa-free for up to 90 days under bilateral agreement.')
ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO UPDATE
  SET visa_type = EXCLUDED.visa_type,
      max_stay_days = EXCLUDED.max_stay_days,
      stay_window_days = EXCLUDED.stay_window_days,
      last_verified = EXCLUDED.last_verified,
      notes = EXCLUDED.notes;
