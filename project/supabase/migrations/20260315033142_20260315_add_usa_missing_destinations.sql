/*
  # Add missing USA passport visa rules for 48 destinations

  ## Context
  USA passport is missing many destinations that France/EU covers. This migration
  adds USA-specific rules. Key differences from EU/Japan:
  - Cuba: US citizens restricted (OFAC — must use authorized categories, not general tourism)
  - Bolivia: visa_required (Bolivia imposes reciprocity visa for US citizens)
  - Algeria: visa_required (no bilateral visa-free with USA)
  - Angola: visa_required
  - Bangladesh, Pakistan, Kuwait, Turkmenistan: visa_required

  ## Sources
  - U.S. State Department (travel.state.gov) country info pages
  - IATA Timatic, Henley Passport Index 2026
*/

INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, visa_subtype, max_stay_days, last_verified, notes)
VALUES
  ('united-states', 'algeria',          'visa_required',  NULL,  30,  '2026-03-15', 'Visa required. Apply at Algerian consulate. Tourist visa typically 30 days.'),
  ('united-states', 'angola',           'visa_required',  NULL,  30,  '2026-03-15', 'Visa required. Apply at Angolan embassy.'),
  ('united-states', 'armenia',          'visa_free',       NULL,  180, '2026-03-15', 'U.S. citizens may visit Armenia visa-free for up to 180 days.'),
  ('united-states', 'azerbaijan',       'evisa',           NULL,  30,  '2026-03-15', 'eVisa required. Apply online at evisa.gov.az before travel.'),
  ('united-states', 'bahamas',          'visa_free',       NULL,  90,  '2026-03-15', 'U.S. citizens may visit the Bahamas visa-free. No set limit but 90 days standard.'),
  ('united-states', 'bahrain',          'visa_on_arrival', NULL,  14,  '2026-03-15', 'Visa-on-arrival available for U.S. passport holders. 14 days.'),
  ('united-states', 'bangladesh',       'visa_required',  NULL,  30,  '2026-03-15', 'Visa required. Apply at Bangladesh High Commission.'),
  ('united-states', 'barbados',         'visa_free',       NULL,  180, '2026-03-15', 'U.S. citizens may visit Barbados visa-free for up to 6 months.'),
  ('united-states', 'bolivia',          'visa_required',  NULL,  90,  '2026-03-15', 'Visa required (reciprocity measure). U.S. citizens must obtain a Bolivian visa. Apply at consulate. 90 days tourist.'),
  ('united-states', 'bulgaria',         'visa_free',       NULL,  90,  '2026-03-15', 'U.S. citizens may visit Bulgaria visa-free for up to 90 days in any 180-day period.'),
  ('united-states', 'cambodia',         'evisa',           NULL,  30,  '2026-03-15', 'eVisa available online at evisa.gov.kh. 30 days single entry.'),
  ('united-states', 'costa-rica',       'visa_free',       NULL,  90,  '2026-03-15', 'U.S. citizens may visit Costa Rica visa-free for up to 90 days.'),
  ('united-states', 'cuba',             'restricted',      NULL,  NULL,'2026-03-15', 'U.S. citizens may not visit Cuba as general tourists. Travel is permitted only under 12 OFAC-authorized categories (e.g., family visits, educational activities, journalism). Tourist travel is prohibited.'),
  ('united-states', 'cyprus',           'visa_free',       NULL,  90,  '2026-03-15', 'U.S. citizens may visit Cyprus visa-free for up to 90 days.'),
  ('united-states', 'dominican-republic','visa_on_arrival', NULL, 30,  '2026-03-15', 'Tourist card (tarjeta turística) included in most flight tickets or available on arrival. 30 days.'),
  ('united-states', 'ecuador',          'visa_free',       NULL,  90,  '2026-03-15', 'U.S. citizens may visit Ecuador visa-free for up to 90 days.'),
  ('united-states', 'estonia',          'visa_free',       NULL,  90,  '2026-03-15', 'Schengen Area — 90 days in any 180-day period. ETIAS required from 2025.'),
  ('united-states', 'ethiopia',         'evisa',           NULL,  30,  '2026-03-15', 'eVisa required. Apply at evisa.gov.et before travel.'),
  ('united-states', 'georgia',          'visa_free',       NULL,  365, '2026-03-15', 'U.S. citizens may stay in Georgia visa-free for up to 1 year.'),
  ('united-states', 'ghana',            'visa_on_arrival', NULL,  30,  '2026-03-15', 'Visa-on-arrival available at Kotoka International Airport. Fee applies.'),
  ('united-states', 'iceland',          'visa_free',       NULL,  90,  '2026-03-15', 'Schengen Area — 90 days in any 180-day period.'),
  ('united-states', 'jamaica',          'visa_free',       NULL,  90,  '2026-03-15', 'U.S. citizens may visit Jamaica visa-free for up to 90 days.'),
  ('united-states', 'jordan',           'visa_free',       NULL,  30,  '2026-03-15', 'U.S. citizens receive free visa-on-arrival at most ports of entry. 30 days.'),
  ('united-states', 'kazakhstan',       'visa_free',       NULL,  30,  '2026-03-15', 'U.S. citizens may visit Kazakhstan visa-free for up to 30 days.'),
  ('united-states', 'kenya',            'evisa',           NULL,  90,  '2026-03-15', 'eVisa required. Apply online at evisa.immigration.go.ke.'),
  ('united-states', 'kuwait',           'visa_required',  NULL,  30,  '2026-03-15', 'Visa required. Apply at Kuwaiti embassy.'),
  ('united-states', 'laos',             'visa_on_arrival', NULL,  30,  '2026-03-15', 'Visa-on-arrival available at Wattay International Airport and major land crossings.'),
  ('united-states', 'latvia',           'visa_free',       NULL,  90,  '2026-03-15', 'Schengen Area — 90 days in any 180-day period.'),
  ('united-states', 'lithuania',        'visa_free',       NULL,  90,  '2026-03-15', 'Schengen Area — 90 days in any 180-day period.'),
  ('united-states', 'luxembourg',       'visa_free',       NULL,  90,  '2026-03-15', 'Schengen Area — 90 days in any 180-day period.'),
  ('united-states', 'maldives',         'visa_free',       NULL,  30,  '2026-03-15', 'Free visa issued on arrival in the Maldives. 30 days, extendable to 90.'),
  ('united-states', 'malta',            'visa_free',       NULL,  90,  '2026-03-15', 'Schengen Area — 90 days in any 180-day period.'),
  ('united-states', 'mongolia',         'visa_free',       NULL,  30,  '2026-03-15', 'U.S. citizens may visit Mongolia visa-free for up to 30 days.'),
  ('united-states', 'myanmar',          'evisa',           NULL,  28,  '2026-03-15', 'eVisa available at evisa.moip.gov.mm. 28 days tourist. Verify current availability.'),
  ('united-states', 'nepal',            'visa_on_arrival', NULL,  30,  '2026-03-15', 'Visa-on-arrival at Tribhuvan International Airport. 15 or 30 days options.'),
  ('united-states', 'oman',             'evisa',           NULL,  30,  '2026-03-15', 'eVisa available at evisa.rop.gov.om. 30 days.'),
  ('united-states', 'pakistan',         'visa_required',  NULL,  30,  '2026-03-15', 'Visa required. Apply at Pakistani High Commission.'),
  ('united-states', 'panama',           'visa_free',       NULL,  90,  '2026-03-15', 'U.S. citizens may visit Panama visa-free for up to 90 days.'),
  ('united-states', 'paraguay',         'visa_free',       NULL,  90,  '2026-03-15', 'U.S. citizens may visit Paraguay visa-free for up to 90 days.'),
  ('united-states', 'serbia',           'visa_free',       NULL,  90,  '2026-03-15', 'U.S. citizens may visit Serbia visa-free for up to 90 days.'),
  ('united-states', 'slovakia',         'visa_free',       NULL,  90,  '2026-03-15', 'Schengen Area — 90 days in any 180-day period.'),
  ('united-states', 'slovenia',         'visa_free',       NULL,  90,  '2026-03-15', 'Schengen Area — 90 days in any 180-day period.'),
  ('united-states', 'sri-lanka',        'evisa',           NULL,  30,  '2026-03-15', 'eVisa required. Apply at eta.gov.lk before travel.'),
  ('united-states', 'tanzania',         'evisa',           NULL,  90,  '2026-03-15', 'eVisa available at immigration.go.tz.'),
  ('united-states', 'tunisia',          'visa_free',       NULL,  90,  '2026-03-15', 'U.S. citizens may visit Tunisia visa-free for up to 90 days.'),
  ('united-states', 'turkmenistan',     'visa_required',  NULL,  30,  '2026-03-15', 'Visa required. Apply at Turkmenistan embassy.'),
  ('united-states', 'uruguay',          'visa_free',       NULL,  90,  '2026-03-15', 'U.S. citizens may visit Uruguay visa-free for up to 90 days.'),
  ('united-states', 'uzbekistan',       'visa_free',       NULL,  30,  '2026-03-15', 'U.S. citizens may visit Uzbekistan visa-free for up to 30 days.'),
  ('united-states', 'zimbabwe',         'visa_on_arrival', NULL,  30,  '2026-03-15', 'Visa-on-arrival or KAZA UNIVISA available at designated ports of entry.')
ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO NOTHING;
