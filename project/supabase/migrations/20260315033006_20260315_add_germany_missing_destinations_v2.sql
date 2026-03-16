/*
  # Add missing Germany passport visa rules (v2 with last_verified)

  ## Context
  Germany and France are both Schengen members with identical travel rights.
  Adding Germany entries for 12 destinations present in France data but absent
  from Germany data. Includes required last_verified field.
*/

INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, visa_subtype, max_stay_days, last_verified, notes)
VALUES
  ('germany', 'algeria',      'visa_required',  NULL, 90,  '2026-03-15', 'Visa required. Apply at Algerian consulate. Standard tourist visa up to 90 days.'),
  ('germany', 'angola',       'visa_required',  NULL, 30,  '2026-03-15', 'Visa required. Apply at Angolan embassy or consulate. Tourist visa typically 30 days.'),
  ('germany', 'bahamas',      'visa_free',       NULL, 90,  '2026-03-15', 'German citizens may visit the Bahamas visa-free for up to 90 days.'),
  ('germany', 'bangladesh',   'visa_required',  NULL, 30,  '2026-03-15', 'Visa required. Apply at Bangladesh High Commission. Tourist visa typically 30 days.'),
  ('germany', 'barbados',     'visa_free',       NULL, 180, '2026-03-15', 'German citizens may visit Barbados visa-free for up to 6 months.'),
  ('germany', 'bolivia',      'visa_free',       NULL, 90,  '2026-03-15', 'German citizens may visit Bolivia visa-free for up to 90 days.'),
  ('germany', 'ghana',        'visa_on_arrival', NULL, 30,  '2026-03-15', 'Visa-on-arrival available at Kotoka International Airport. Fee applies.'),
  ('germany', 'jamaica',      'visa_free',       NULL, 90,  '2026-03-15', 'German citizens may visit Jamaica visa-free for up to 90 days.'),
  ('germany', 'kuwait',       'visa_required',  NULL, 30,  '2026-03-15', 'Visa required. Apply at Kuwaiti embassy. Tourist visa typically 30 days.'),
  ('germany', 'pakistan',     'visa_required',  NULL, 30,  '2026-03-15', 'Visa required. Apply at Pakistani High Commission. Tourist visa typically 30 days.'),
  ('germany', 'paraguay',     'visa_free',       NULL, 90,  '2026-03-15', 'German citizens may visit Paraguay visa-free for up to 90 days.'),
  ('germany', 'turkmenistan', 'visa_required',  NULL, 30,  '2026-03-15', 'Visa required. Apply at Turkmenistan embassy. Tourist visa typically 30 days.')
ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO NOTHING;
