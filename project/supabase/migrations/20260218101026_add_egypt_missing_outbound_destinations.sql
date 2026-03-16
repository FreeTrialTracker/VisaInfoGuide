
/*
  # Add Missing Egypt Outbound Destinations

  Adds missing outbound visa rules for Egyptian passport holders to destinations
  that exist in the database but were not yet covered:

  1. Jordan - visa-free for Egyptians (30 days)
  2. Morocco - visa-free for Egyptians (90 days)
  3. Tunisia - visa-free for Egyptians (90 days)
  4. Kenya - eVisa available (90 days)
  5. Ethiopia - eVisa available (30 days)

  Note: Lebanon was not added as it does not exist in the destinations table.
*/

INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, visa_subtype, stay_rule, max_stay_days, stay_window_days, passport_validity_months, notes, last_verified)
VALUES
  ('egypt', 'jordan',   'visa_free', NULL, 'Visa-free entry',  30, NULL, 6, 'Visa-free for up to 30 days.',        '2026-02-18'),
  ('egypt', 'morocco',  'visa_free', NULL, 'Visa-free entry',  90, NULL, 6, 'Visa-free for up to 90 days.',        '2026-02-18'),
  ('egypt', 'tunisia',  'visa_free', NULL, 'Visa-free entry',  90, NULL, 6, 'Visa-free for up to 90 days.',        '2026-02-18'),
  ('egypt', 'kenya',    'evisa',     NULL, 'eVisa required',   90, NULL, 6, 'Apply via Kenya eVisa portal before travel.',   '2026-02-18'),
  ('egypt', 'ethiopia', 'evisa',     NULL, 'eVisa required',   30, NULL, 6, 'Apply via Ethiopia eVisa portal before travel.','2026-02-18')
ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO NOTHING;
