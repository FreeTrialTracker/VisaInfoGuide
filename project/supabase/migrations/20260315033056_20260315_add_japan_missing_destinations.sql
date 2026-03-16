/*
  # Add missing Japan passport visa rules for 48 destinations

  ## Context
  Japan consistently ranks #1 or #2 globally for passport strength.
  This migration adds Japan-specific rules for destinations currently missing
  from the dataset. Rules are based on Japan's actual bilateral agreements,
  not copied from EU/France data.

  ## Key differences from EU passports
  - Japan has mutual visa-free with most countries France also has
  - Japan has visa-free access to all EU/Schengen member states
  - Japan has visa-free to many Latin American, Caribbean, and Pacific nations
  - Japan requires visa for Algeria, Angola, Pakistan, Bangladesh, Kuwait, Turkmenistan
    (same as EU)
  - Bahrain: Japan has visa-on-arrival (14 days)
  - Mongolia: Japan is visa-free (30 days) — special bilateral

  ## Sources
  - Japan MOFA (mofa.go.jp) visa-free country list
  - IATA Timatic, Henley Passport Index 2026
*/

INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, visa_subtype, max_stay_days, last_verified, notes)
VALUES
  ('japan', 'algeria',          'visa_required',  NULL,  30,  '2026-03-15', 'Visa required for Japanese passport holders. Apply at Algerian consulate.'),
  ('japan', 'angola',           'visa_required',  NULL,  30,  '2026-03-15', 'Visa required. Apply at Angolan embassy before travel.'),
  ('japan', 'armenia',          'visa_free',       NULL,  180, '2026-03-15', 'Japanese citizens may visit Armenia visa-free for up to 180 days.'),
  ('japan', 'azerbaijan',       'evisa',           NULL,  30,  '2026-03-15', 'eVisa required. Apply online at evisa.gov.az before travel.'),
  ('japan', 'bahamas',          'visa_free',       NULL,  90,  '2026-03-15', 'Japanese citizens may visit the Bahamas visa-free for up to 90 days.'),
  ('japan', 'bahrain',          'visa_on_arrival', NULL,  14,  '2026-03-15', 'Visa-on-arrival available for Japanese passport holders. Fee applies. 14 days extendable.'),
  ('japan', 'bangladesh',       'visa_required',  NULL,  30,  '2026-03-15', 'Visa required. Apply at Bangladesh High Commission.'),
  ('japan', 'barbados',         'visa_free',       NULL,  180, '2026-03-15', 'Japanese citizens may visit Barbados visa-free for up to 6 months.'),
  ('japan', 'bolivia',          'visa_free',       NULL,  90,  '2026-03-15', 'Japanese citizens may visit Bolivia visa-free for up to 90 days.'),
  ('japan', 'bulgaria',         'visa_free',       NULL,  90,  '2026-03-15', 'Bulgarian visa-free. Schengen 90/180 rule does not apply — Bulgaria is not yet fully Schengen.'),
  ('japan', 'cambodia',         'evisa',           NULL,  30,  '2026-03-15', 'eVisa available online at evisa.gov.kh. 30 days single entry.'),
  ('japan', 'costa-rica',       'visa_free',       NULL,  90,  '2026-03-15', 'Japanese citizens may visit Costa Rica visa-free for up to 90 days.'),
  ('japan', 'cuba',             'visa_on_arrival', NULL,  30,  '2026-03-15', 'Tourist card (tarjeta del turista) available on arrival or from airlines. 30 days.'),
  ('japan', 'cyprus',           'visa_free',       NULL,  90,  '2026-03-15', 'Visa-free access to Cyprus for Japanese passport holders. 90 days in 180.'),
  ('japan', 'dominican-republic','visa_on_arrival',NULL,  30,  '2026-03-15', 'Tourist card (tarjeta turística) available on arrival or pre-purchase. 30 days.'),
  ('japan', 'ecuador',          'visa_free',       NULL,  90,  '2026-03-15', 'Japanese citizens may visit Ecuador visa-free for up to 90 days.'),
  ('japan', 'estonia',          'visa_free',       NULL,  90,  '2026-03-15', 'Schengen Area — 90 days in any 180-day period.'),
  ('japan', 'ethiopia',         'evisa',           NULL,  30,  '2026-03-15', 'eVisa required. Apply at Ethiopia e-Visa portal (evisa.gov.et).'),
  ('japan', 'georgia',          'visa_free',       NULL,  365, '2026-03-15', 'Japanese citizens may stay in Georgia visa-free for up to 1 year.'),
  ('japan', 'ghana',            'visa_on_arrival', NULL,  30,  '2026-03-15', 'Visa-on-arrival available for Japanese passport holders at Kotoka International Airport.'),
  ('japan', 'iceland',          'visa_free',       NULL,  90,  '2026-03-15', 'Schengen Area — 90 days in any 180-day period.'),
  ('japan', 'jamaica',          'visa_free',       NULL,  90,  '2026-03-15', 'Japanese citizens may visit Jamaica visa-free for up to 90 days.'),
  ('japan', 'jordan',           'visa_free',       NULL,  30,  '2026-03-15', 'Japanese citizens can obtain free visa-on-arrival or visit visa-free at Aqaba (ASEZA). 30 days.'),
  ('japan', 'kazakhstan',       'visa_free',       NULL,  30,  '2026-03-15', 'Japanese citizens may visit Kazakhstan visa-free for up to 30 days.'),
  ('japan', 'kenya',            'evisa',           NULL,  90,  '2026-03-15', 'eVisa required. Apply online at evisa.immigration.go.ke. 90 days.'),
  ('japan', 'kuwait',           'visa_required',  NULL,  30,  '2026-03-15', 'Visa required. Apply at Kuwaiti embassy.'),
  ('japan', 'laos',             'visa_on_arrival', NULL,  30,  '2026-03-15', 'Visa-on-arrival available at designated border crossings and airports. 30 days.'),
  ('japan', 'latvia',           'visa_free',       NULL,  90,  '2026-03-15', 'Schengen Area — 90 days in any 180-day period.'),
  ('japan', 'lithuania',        'visa_free',       NULL,  90,  '2026-03-15', 'Schengen Area — 90 days in any 180-day period.'),
  ('japan', 'luxembourg',       'visa_free',       NULL,  90,  '2026-03-15', 'Schengen Area — 90 days in any 180-day period.'),
  ('japan', 'maldives',         'visa_free',       NULL,  30,  '2026-03-15', 'Visa issued free on arrival in the Maldives. 30 days, extendable.'),
  ('japan', 'malta',            'visa_free',       NULL,  90,  '2026-03-15', 'Schengen Area — 90 days in any 180-day period.'),
  ('japan', 'mongolia',         'visa_free',       NULL,  30,  '2026-03-15', 'Japanese citizens may visit Mongolia visa-free for up to 30 days.'),
  ('japan', 'myanmar',          'evisa',           NULL,  28,  '2026-03-15', 'eVisa available at evisa.moip.gov.mm. 28 days, tourist.'),
  ('japan', 'nepal',            'visa_on_arrival', NULL,  30,  '2026-03-15', 'Visa-on-arrival available at Tribhuvan International Airport and land borders. 15 or 30 days options.'),
  ('japan', 'oman',             'evisa',           NULL,  30,  '2026-03-15', 'eVisa available at evisa.rop.gov.om. 30 days.'),
  ('japan', 'pakistan',         'visa_required',  NULL,  30,  '2026-03-15', 'Visa required. Apply at Pakistani High Commission.'),
  ('japan', 'panama',           'visa_free',       NULL,  90,  '2026-03-15', 'Japanese citizens may visit Panama visa-free for up to 90 days.'),
  ('japan', 'paraguay',         'visa_free',       NULL,  90,  '2026-03-15', 'Japanese citizens may visit Paraguay visa-free for up to 90 days.'),
  ('japan', 'serbia',           'visa_free',       NULL,  90,  '2026-03-15', 'Japanese citizens may visit Serbia visa-free for up to 90 days.'),
  ('japan', 'slovakia',         'visa_free',       NULL,  90,  '2026-03-15', 'Schengen Area — 90 days in any 180-day period.'),
  ('japan', 'slovenia',         'visa_free',       NULL,  90,  '2026-03-15', 'Schengen Area — 90 days in any 180-day period.'),
  ('japan', 'sri-lanka',        'evisa',           NULL,  30,  '2026-03-15', 'eVisa required. Apply at eta.gov.lk before travel. 30 days single/double entry.'),
  ('japan', 'tanzania',         'evisa',           NULL,  90,  '2026-03-15', 'eVisa available at immigration.go.tz. 90 days.'),
  ('japan', 'tunisia',          'visa_free',       NULL,  90,  '2026-03-15', 'Japanese citizens may visit Tunisia visa-free for up to 90 days.'),
  ('japan', 'turkmenistan',     'visa_required',  NULL,  30,  '2026-03-15', 'Visa required. Apply at Turkmenistan embassy.'),
  ('japan', 'uruguay',          'visa_free',       NULL,  90,  '2026-03-15', 'Japanese citizens may visit Uruguay visa-free for up to 90 days.'),
  ('japan', 'uzbekistan',       'visa_free',       NULL,  30,  '2026-03-15', 'Japanese citizens may visit Uzbekistan visa-free for up to 30 days.'),
  ('japan', 'zimbabwe',         'visa_on_arrival', NULL,  30,  '2026-03-15', 'Visa-on-arrival or KAZA UNIVISA available at designated ports of entry. 30 days.')
ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO NOTHING;
