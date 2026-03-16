/*
  # Add missing UK passport visa rules for 50 destinations

  ## Context
  UK passport holders have visa-free access to most of the same countries as EU,
  but with important differences post-Brexit:
  - EU/Schengen: UK citizens are now subject to the 90/180-day Schengen limit
  - Ireland: UK Common Travel Area — unlimited stay
  - Georgia: 1 year visa-free (bilateral)
  - Bolivia: visa-free 90 days (unlike USA)
  - Cuba: tourist card on arrival

  ## Sources
  - UK FCDO foreign travel advice (gov.uk/foreign-travel-advice)
  - IATA Timatic, Henley Passport Index 2026
*/

INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, visa_subtype, max_stay_days, last_verified, notes)
VALUES
  ('united-kingdom', 'algeria',          'visa_required',  NULL,  30,  '2026-03-15', 'Visa required. Apply at Algerian consulate.'),
  ('united-kingdom', 'angola',           'visa_required',  NULL,  30,  '2026-03-15', 'Visa required. Apply at Angolan embassy.'),
  ('united-kingdom', 'armenia',          'visa_free',       NULL,  180, '2026-03-15', 'UK citizens may visit Armenia visa-free for up to 180 days.'),
  ('united-kingdom', 'azerbaijan',       'evisa',           NULL,  30,  '2026-03-15', 'eVisa required. Apply online at evisa.gov.az before travel.'),
  ('united-kingdom', 'bahamas',          'visa_free',       NULL,  90,  '2026-03-15', 'UK citizens may visit the Bahamas visa-free for up to 90 days.'),
  ('united-kingdom', 'bahrain',          'visa_on_arrival', NULL,  14,  '2026-03-15', 'Visa-on-arrival available for UK passport holders. 14 days.'),
  ('united-kingdom', 'bangladesh',       'visa_required',  NULL,  30,  '2026-03-15', 'Visa required. Apply at Bangladesh High Commission.'),
  ('united-kingdom', 'barbados',         'visa_free',       NULL,  180, '2026-03-15', 'UK citizens may visit Barbados visa-free for up to 6 months.'),
  ('united-kingdom', 'bolivia',          'visa_free',       NULL,  90,  '2026-03-15', 'UK citizens may visit Bolivia visa-free for up to 90 days.'),
  ('united-kingdom', 'bulgaria',         'visa_free',       NULL,  90,  '2026-03-15', 'UK citizens may visit Bulgaria visa-free for up to 90 days in any 180-day period.'),
  ('united-kingdom', 'cambodia',         'evisa',           NULL,  30,  '2026-03-15', 'eVisa available online at evisa.gov.kh. 30 days single entry.'),
  ('united-kingdom', 'costa-rica',       'visa_free',       NULL,  90,  '2026-03-15', 'UK citizens may visit Costa Rica visa-free for up to 90 days.'),
  ('united-kingdom', 'cuba',             'visa_on_arrival', NULL,  30,  '2026-03-15', 'Tourist card (tarjeta del turista) available on arrival or from airlines. 30 days.'),
  ('united-kingdom', 'cyprus',           'visa_free',       NULL,  90,  '2026-03-15', 'UK citizens may visit Cyprus visa-free for up to 90 days.'),
  ('united-kingdom', 'dominican-republic','visa_on_arrival',NULL,  30,  '2026-03-15', 'Tourist card available on arrival or pre-purchase. 30 days.'),
  ('united-kingdom', 'ecuador',          'visa_free',       NULL,  90,  '2026-03-15', 'UK citizens may visit Ecuador visa-free for up to 90 days.'),
  ('united-kingdom', 'estonia',          'visa_free',       NULL,  90,  '2026-03-15', 'Schengen Area — UK citizens may visit for up to 90 days in any 180-day period.'),
  ('united-kingdom', 'ethiopia',         'evisa',           NULL,  30,  '2026-03-15', 'eVisa required. Apply at evisa.gov.et before travel.'),
  ('united-kingdom', 'georgia',          'visa_free',       NULL,  365, '2026-03-15', 'UK citizens may stay in Georgia visa-free for up to 1 year.'),
  ('united-kingdom', 'ghana',            'visa_on_arrival', NULL,  30,  '2026-03-15', 'Visa-on-arrival available for UK passport holders at Kotoka International Airport.'),
  ('united-kingdom', 'iceland',          'visa_free',       NULL,  90,  '2026-03-15', 'Schengen Area — 90 days in any 180-day period.'),
  ('united-kingdom', 'ireland',          'visa_free',       NULL,  365, '2026-03-15', 'Common Travel Area (CTA). UK citizens have the right to live and work in Ireland without restriction. No visa or immigration controls.'),
  ('united-kingdom', 'jamaica',          'visa_free',       NULL,  90,  '2026-03-15', 'UK citizens may visit Jamaica visa-free for up to 90 days.'),
  ('united-kingdom', 'jordan',           'visa_free',       NULL,  30,  '2026-03-15', 'UK citizens receive free visa-on-arrival or visit visa-free. 30 days.'),
  ('united-kingdom', 'kazakhstan',       'visa_free',       NULL,  30,  '2026-03-15', 'UK citizens may visit Kazakhstan visa-free for up to 30 days.'),
  ('united-kingdom', 'kenya',            'evisa',           NULL,  90,  '2026-03-15', 'eVisa required. Apply online at evisa.immigration.go.ke.'),
  ('united-kingdom', 'kuwait',           'visa_required',  NULL,  30,  '2026-03-15', 'Visa required. Apply at Kuwaiti embassy.'),
  ('united-kingdom', 'laos',             'visa_on_arrival', NULL,  30,  '2026-03-15', 'Visa-on-arrival available at designated border crossings and airports.'),
  ('united-kingdom', 'latvia',           'visa_free',       NULL,  90,  '2026-03-15', 'Schengen Area — 90 days in any 180-day period.'),
  ('united-kingdom', 'lithuania',        'visa_free',       NULL,  90,  '2026-03-15', 'Schengen Area — 90 days in any 180-day period.'),
  ('united-kingdom', 'luxembourg',       'visa_free',       NULL,  90,  '2026-03-15', 'Schengen Area — 90 days in any 180-day period.'),
  ('united-kingdom', 'maldives',         'visa_free',       NULL,  30,  '2026-03-15', 'Free visa issued on arrival in the Maldives. 30 days, extendable.'),
  ('united-kingdom', 'malta',            'visa_free',       NULL,  90,  '2026-03-15', 'Schengen Area — 90 days in any 180-day period.'),
  ('united-kingdom', 'mongolia',         'visa_free',       NULL,  30,  '2026-03-15', 'UK citizens may visit Mongolia visa-free for up to 30 days.'),
  ('united-kingdom', 'myanmar',          'evisa',           NULL,  28,  '2026-03-15', 'eVisa available at evisa.moip.gov.mm. 28 days tourist. Verify current availability.'),
  ('united-kingdom', 'nepal',            'visa_on_arrival', NULL,  30,  '2026-03-15', 'Visa-on-arrival at Tribhuvan International Airport. 15 or 30 days options.'),
  ('united-kingdom', 'oman',             'evisa',           NULL,  30,  '2026-03-15', 'eVisa available at evisa.rop.gov.om. 30 days.'),
  ('united-kingdom', 'pakistan',         'visa_required',  NULL,  30,  '2026-03-15', 'Visa required. Apply at Pakistani High Commission.'),
  ('united-kingdom', 'panama',           'visa_free',       NULL,  90,  '2026-03-15', 'UK citizens may visit Panama visa-free for up to 90 days.'),
  ('united-kingdom', 'paraguay',         'visa_free',       NULL,  90,  '2026-03-15', 'UK citizens may visit Paraguay visa-free for up to 90 days.'),
  ('united-kingdom', 'serbia',           'visa_free',       NULL,  90,  '2026-03-15', 'UK citizens may visit Serbia visa-free for up to 90 days.'),
  ('united-kingdom', 'slovakia',         'visa_free',       NULL,  90,  '2026-03-15', 'Schengen Area — 90 days in any 180-day period.'),
  ('united-kingdom', 'slovenia',         'visa_free',       NULL,  90,  '2026-03-15', 'Schengen Area — 90 days in any 180-day period.'),
  ('united-kingdom', 'sri-lanka',        'evisa',           NULL,  30,  '2026-03-15', 'eVisa required. Apply at eta.gov.lk before travel.'),
  ('united-kingdom', 'tanzania',         'evisa',           NULL,  90,  '2026-03-15', 'eVisa available at immigration.go.tz.'),
  ('united-kingdom', 'tunisia',          'visa_free',       NULL,  90,  '2026-03-15', 'UK citizens may visit Tunisia visa-free for up to 90 days.'),
  ('united-kingdom', 'turkmenistan',     'visa_required',  NULL,  30,  '2026-03-15', 'Visa required. Apply at Turkmenistan embassy.'),
  ('united-kingdom', 'ukraine',          'visa_free',       NULL,  90,  '2026-03-15', 'UK citizens may visit Ukraine visa-free for up to 90 days (wartime situation — check FCDO advice before travel).'),
  ('united-kingdom', 'uruguay',          'visa_free',       NULL,  90,  '2026-03-15', 'UK citizens may visit Uruguay visa-free for up to 90 days.'),
  ('united-kingdom', 'uzbekistan',       'visa_free',       NULL,  30,  '2026-03-15', 'UK citizens may visit Uzbekistan visa-free for up to 30 days.'),
  ('united-kingdom', 'zimbabwe',         'visa_on_arrival', NULL,  30,  '2026-03-15', 'Visa-on-arrival or KAZA UNIVISA available at designated ports of entry.')
ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO NOTHING;
