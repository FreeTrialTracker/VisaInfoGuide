
/*
  # Add Turkmenistan visa rule for 13 passports

  Each of the following passports was at 99 rules, missing only Turkmenistan.
  This migration adds the missing entry to bring all 13 to exactly 100 rules.

  Passports added: armenia, azerbaijan, bangladesh, cambodia, kazakhstan,
  laos, maldives, mongolia, myanmar, nepal, pakistan, sri-lanka, uzbekistan

  - visa_type: visa_required (Turkmenistan requires a visa for all these nationalities)
  - max_stay_days: 30
  - All other fields consistent with existing Turkmenistan entries
*/

INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, max_stay_days, last_verified, notes, return_ticket_required, sufficient_funds_required, insurance_required, passport_validity_requirement)
VALUES
  ('armenia',    'turkmenistan', 'visa_required', 30, '2026-03-15', 'Visa required. Apply at Turkmenistan embassy.', 'unknown', 'unknown', 'unknown', 'unknown'),
  ('azerbaijan', 'turkmenistan', 'visa_required', 30, '2026-03-15', 'Visa required. Apply at Turkmenistan embassy.', 'unknown', 'unknown', 'unknown', 'unknown'),
  ('bangladesh', 'turkmenistan', 'visa_required', 30, '2026-03-15', 'Visa required. Apply at Turkmenistan embassy.', 'unknown', 'unknown', 'unknown', 'unknown'),
  ('cambodia',   'turkmenistan', 'visa_required', 30, '2026-03-15', 'Visa required. Apply at Turkmenistan embassy.', 'unknown', 'unknown', 'unknown', 'unknown'),
  ('kazakhstan', 'turkmenistan', 'visa_required', 30, '2026-03-15', 'Visa required. Apply at Turkmenistan embassy.', 'unknown', 'unknown', 'unknown', 'unknown'),
  ('laos',       'turkmenistan', 'visa_required', 30, '2026-03-15', 'Visa required. Apply at Turkmenistan embassy.', 'unknown', 'unknown', 'unknown', 'unknown'),
  ('maldives',   'turkmenistan', 'visa_required', 30, '2026-03-15', 'Visa required. Apply at Turkmenistan embassy.', 'unknown', 'unknown', 'unknown', 'unknown'),
  ('mongolia',   'turkmenistan', 'visa_required', 30, '2026-03-15', 'Visa required. Apply at Turkmenistan embassy.', 'unknown', 'unknown', 'unknown', 'unknown'),
  ('myanmar',    'turkmenistan', 'visa_required', 30, '2026-03-15', 'Visa required. Apply at Turkmenistan embassy.', 'unknown', 'unknown', 'unknown', 'unknown'),
  ('nepal',      'turkmenistan', 'visa_required', 30, '2026-03-15', 'Visa required. Apply at Turkmenistan embassy.', 'unknown', 'unknown', 'unknown', 'unknown'),
  ('pakistan',   'turkmenistan', 'visa_required', 30, '2026-03-15', 'Visa required. Apply at Turkmenistan embassy.', 'unknown', 'unknown', 'unknown', 'unknown'),
  ('sri-lanka',  'turkmenistan', 'visa_required', 30, '2026-03-15', 'Visa required. Apply at Turkmenistan embassy.', 'unknown', 'unknown', 'unknown', 'unknown'),
  ('uzbekistan', 'turkmenistan', 'visa_required', 30, '2026-03-15', 'Visa required. Apply at Turkmenistan embassy.', 'unknown', 'unknown', 'unknown', 'unknown');
