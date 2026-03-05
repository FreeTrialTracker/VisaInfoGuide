/*
  # Add Missing Brazil Outbound Visa Rules

  Adds rules for Brazilian passport holders traveling to destinations
  that were previously missing from the database:

  South American neighbors (all visa-free under Mercosur/bilateral agreements):
  - peru: visa_free, 90 days, ID card accepted
  - uruguay: visa_free, 90 days, ID card accepted
  - bolivia: visa_free, 90 days
  - ecuador: visa_free, 90 days
  - paraguay: visa_free, 90 days, ID card accepted

  Common travel destinations:
  - kenya: visa_on_arrival, 90 days
  - morocco: visa_free, 90 days
  - jordan: visa_on_arrival, 30 days
  - sri-lanka: evisa, 30 days
*/

INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, max_stay_days, stay_window_days, passport_validity_months, notes, last_verified)
VALUES
  ('brazil', 'peru',      'visa_free',     90,   NULL, NULL, 'ID card accepted under Andean Community/bilateral agreement.',    '2026-02-18'),
  ('brazil', 'uruguay',   'visa_free',     90,   NULL, NULL, 'ID card accepted under Mercosur agreement.',                     '2026-02-18'),
  ('brazil', 'bolivia',   'visa_free',     90,   NULL, NULL, 'Visa-free under bilateral agreement.',                           '2026-02-18'),
  ('brazil', 'ecuador',   'visa_free',     90,   NULL, NULL, 'Visa-free under bilateral agreement.',                           '2026-02-18'),
  ('brazil', 'paraguay',  'visa_free',     90,   NULL, NULL, 'ID card accepted under Mercosur agreement.',                     '2026-02-18'),
  ('brazil', 'kenya',     'visa_on_arrival', 90, NULL, 6,    'East Africa Tourist Visa available. Fee payable on arrival.',    '2026-02-18'),
  ('brazil', 'morocco',   'visa_free',     90,   NULL, 6,    'Visa-free for short stays under bilateral agreement.',           '2026-02-18'),
  ('brazil', 'jordan',    'visa_on_arrival', 30, NULL, 6,    'Visa on arrival available at major entry points. Fee payable.',  '2026-02-18'),
  ('brazil', 'sri-lanka', 'evisa',         30,   NULL, 6,    'Apply for Electronic Travel Authorization (ETA) before travel.', '2026-02-18')
ON CONFLICT DO NOTHING;
