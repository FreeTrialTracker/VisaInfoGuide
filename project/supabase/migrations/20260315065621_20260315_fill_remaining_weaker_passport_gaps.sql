/*
  # Fill Remaining Gaps for Weaker Passports

  Fills the remaining missing destination entries identified from gap analysis:

  1. Ukraine: Missing Schengen EU destinations (Bulgaria, Cyprus, Estonia, Iceland, Latvia,
     Lithuania, Luxembourg, Malta, Slovakia, Slovenia) + Turkey + Tunisia
     - Ukraine has Schengen visa-free since 2017 → visa_free 90 days for EU/Schengen
     - Turkey: visa_free (bilateral)
     - Tunisia: visa_free (bilateral agreement)

  2. Saudi Arabia: Missing GCC + others
     - Bahrain, Kuwait, Oman: visa_free (GCC free movement)
     - Morocco: visa_free (bilateral)
     - Peru: visa_required

  3. Egypt: Missing Gulf countries
     - Bahrain: visa_on_arrival
     - Kuwait: visa_required
     - Oman: evisa

  4. Morocco: Missing neighbors/bilateral
     - Oman: evisa
     - Tunisia: visa_free (Maghreb/bilateral agreement)
     - Turkey: visa_free (bilateral)

  5. India: Missing
     - Maldives: visa_free (SAARC, on arrival)
     - Tunisia: visa_required

  6. Vietnam, Indonesia, Philippines, Thailand: Missing
     - Laos: visa_free (ASEAN bilateral)
     - Tunisia: visa_required
     - Thailand also missing Peru: visa_required

  7. Russia: Missing
     - Tunisia: visa_free (Russia-Tunisia bilateral agreement)

  8. Nigeria: Missing
     - Ghana: visa_free (ECOWAS free movement)
*/

-- Ukraine: Schengen visa-free since 2017, add missing EU/Schengen destinations
INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, visa_subtype, max_stay_days, stay_window_days, last_verified, notes)
VALUES
  ('ukraine', 'bulgaria', 'visa_free', NULL, 90, 180, '2026-03-15', 'Ukraine has EU visa-free access since 2017. 90 days in any 180-day period.'),
  ('ukraine', 'cyprus', 'visa_free', NULL, 90, 180, '2026-03-15', 'Ukraine has EU visa-free access since 2017. 90 days in any 180-day period.'),
  ('ukraine', 'estonia', 'visa_free', NULL, 90, 180, '2026-03-15', 'Ukraine has EU Schengen visa-free access since 2017. 90 days in any 180-day period.'),
  ('ukraine', 'iceland', 'visa_free', NULL, 90, 180, '2026-03-15', 'Ukraine has Schengen visa-free access since 2017. 90 days in any 180-day period.'),
  ('ukraine', 'latvia', 'visa_free', NULL, 90, 180, '2026-03-15', 'Ukraine has EU Schengen visa-free access since 2017. 90 days in any 180-day period.'),
  ('ukraine', 'lithuania', 'visa_free', NULL, 90, 180, '2026-03-15', 'Ukraine has EU Schengen visa-free access since 2017. 90 days in any 180-day period.'),
  ('ukraine', 'luxembourg', 'visa_free', NULL, 90, 180, '2026-03-15', 'Ukraine has EU Schengen visa-free access since 2017. 90 days in any 180-day period.'),
  ('ukraine', 'malta', 'visa_free', NULL, 90, 180, '2026-03-15', 'Ukraine has EU Schengen visa-free access since 2017. 90 days in any 180-day period.'),
  ('ukraine', 'slovakia', 'visa_free', NULL, 90, 180, '2026-03-15', 'Ukraine has EU Schengen visa-free access since 2017. 90 days in any 180-day period.'),
  ('ukraine', 'slovenia', 'visa_free', NULL, 90, 180, '2026-03-15', 'Ukraine has EU Schengen visa-free access since 2017. 90 days in any 180-day period.'),
  ('ukraine', 'turkey', 'visa_free', NULL, 30, NULL, '2026-03-15', 'Ukrainian citizens can enter Turkey visa-free for up to 30 days.'),
  ('ukraine', 'tunisia', 'visa_free', NULL, 30, NULL, '2026-03-15', 'Ukrainian citizens can enter Tunisia visa-free for up to 30 days under bilateral agreement.')
ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO UPDATE
  SET visa_type = EXCLUDED.visa_type,
      max_stay_days = EXCLUDED.max_stay_days,
      stay_window_days = EXCLUDED.stay_window_days,
      last_verified = EXCLUDED.last_verified,
      notes = EXCLUDED.notes;

-- Saudi Arabia: GCC free movement + others
INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, visa_subtype, max_stay_days, stay_window_days, last_verified, notes)
VALUES
  ('saudi-arabia', 'bahrain', 'visa_free', NULL, 30, NULL, '2026-03-15', 'Saudi citizens can enter Bahrain visa-free under GCC free movement agreement.'),
  ('saudi-arabia', 'kuwait', 'visa_free', NULL, 90, NULL, '2026-03-15', 'Saudi citizens can enter Kuwait visa-free under GCC free movement agreement.'),
  ('saudi-arabia', 'oman', 'visa_free', NULL, 30, NULL, '2026-03-15', 'Saudi citizens can enter Oman visa-free under GCC free movement agreement.'),
  ('saudi-arabia', 'morocco', 'visa_free', NULL, 90, NULL, '2026-03-15', 'Saudi citizens can enter Morocco visa-free for up to 90 days under bilateral agreement.'),
  ('saudi-arabia', 'peru', 'visa_required', NULL, 90, NULL, '2026-03-15', 'Saudi citizens require a visa to enter Peru. Apply at Peruvian embassy.')
ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO UPDATE
  SET visa_type = EXCLUDED.visa_type,
      max_stay_days = EXCLUDED.max_stay_days,
      stay_window_days = EXCLUDED.stay_window_days,
      last_verified = EXCLUDED.last_verified,
      notes = EXCLUDED.notes;

-- Egypt: Missing Gulf destinations
INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, visa_subtype, max_stay_days, stay_window_days, last_verified, notes)
VALUES
  ('egypt', 'bahrain', 'visa_on_arrival', NULL, 14, NULL, '2026-03-15', 'Egyptian citizens can obtain a visa on arrival at Bahrain airports for up to 14 days.'),
  ('egypt', 'kuwait', 'visa_required', NULL, 90, NULL, '2026-03-15', 'Egyptian citizens require a visa to enter Kuwait. Kuwait has a large Egyptian expat community; apply at Kuwaiti embassy.'),
  ('egypt', 'oman', 'evisa', NULL, 30, NULL, '2026-03-15', 'Egyptian citizens can apply for an eVisa to enter Oman. Apply online before travel.')
ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO UPDATE
  SET visa_type = EXCLUDED.visa_type,
      max_stay_days = EXCLUDED.max_stay_days,
      stay_window_days = EXCLUDED.stay_window_days,
      last_verified = EXCLUDED.last_verified,
      notes = EXCLUDED.notes;

-- Morocco: Missing destinations
INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, visa_subtype, max_stay_days, stay_window_days, last_verified, notes)
VALUES
  ('morocco', 'oman', 'evisa', NULL, 30, NULL, '2026-03-15', 'Moroccan citizens can apply for an eVisa to enter Oman. Apply online before travel.'),
  ('morocco', 'tunisia', 'visa_free', NULL, 90, NULL, '2026-03-15', 'Moroccan citizens can enter Tunisia visa-free under the Arab Maghreb Union bilateral agreement.'),
  ('morocco', 'turkey', 'visa_free', NULL, 90, NULL, '2026-03-15', 'Moroccan citizens can enter Turkey visa-free for up to 90 days under bilateral agreement.')
ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO UPDATE
  SET visa_type = EXCLUDED.visa_type,
      max_stay_days = EXCLUDED.max_stay_days,
      stay_window_days = EXCLUDED.stay_window_days,
      last_verified = EXCLUDED.last_verified,
      notes = EXCLUDED.notes;

-- India: Missing destinations
INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, visa_subtype, max_stay_days, stay_window_days, last_verified, notes)
VALUES
  ('india', 'maldives', 'visa_free', NULL, 30, NULL, '2026-03-15', 'Indian citizens can enter the Maldives visa-free for up to 30 days (SAARC tourism arrangement). Extensions available on arrival.'),
  ('india', 'tunisia', 'visa_required', NULL, 90, NULL, '2026-03-15', 'Indian citizens require a visa to enter Tunisia. Apply at Tunisian embassy before travel.')
ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO UPDATE
  SET visa_type = EXCLUDED.visa_type,
      max_stay_days = EXCLUDED.max_stay_days,
      stay_window_days = EXCLUDED.stay_window_days,
      last_verified = EXCLUDED.last_verified,
      notes = EXCLUDED.notes;

-- Vietnam, Indonesia, Philippines, Thailand: Laos (ASEAN visa-free) + Tunisia + Thailand→Peru
INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, visa_subtype, max_stay_days, stay_window_days, last_verified, notes)
VALUES
  ('vietnam', 'laos', 'visa_free', NULL, 30, NULL, '2026-03-15', 'Vietnamese citizens can enter Laos visa-free for up to 30 days under ASEAN bilateral agreement.'),
  ('vietnam', 'tunisia', 'visa_required', NULL, 90, NULL, '2026-03-15', 'Vietnamese citizens require a visa to enter Tunisia. Apply at Tunisian embassy before travel.'),
  ('indonesia', 'laos', 'visa_free', NULL, 30, NULL, '2026-03-15', 'Indonesian citizens can enter Laos visa-free for up to 30 days under ASEAN bilateral agreement.'),
  ('indonesia', 'tunisia', 'visa_required', NULL, 90, NULL, '2026-03-15', 'Indonesian citizens require a visa to enter Tunisia. Apply at Tunisian embassy before travel.'),
  ('philippines', 'laos', 'visa_free', NULL, 30, NULL, '2026-03-15', 'Filipino citizens can enter Laos visa-free for up to 30 days under ASEAN bilateral agreement.'),
  ('philippines', 'tunisia', 'visa_required', NULL, 90, NULL, '2026-03-15', 'Filipino citizens require a visa to enter Tunisia. Apply at Tunisian embassy before travel.'),
  ('thailand', 'laos', 'visa_free', NULL, 30, NULL, '2026-03-15', 'Thai citizens can enter Laos visa-free for up to 30 days under ASEAN bilateral agreement.'),
  ('thailand', 'tunisia', 'visa_required', NULL, 90, NULL, '2026-03-15', 'Thai citizens require a visa to enter Tunisia. Apply at Tunisian embassy before travel.'),
  ('thailand', 'peru', 'visa_required', NULL, 90, NULL, '2026-03-15', 'Thai citizens require a visa to enter Peru. Apply at Peruvian embassy before travel.')
ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO UPDATE
  SET visa_type = EXCLUDED.visa_type,
      max_stay_days = EXCLUDED.max_stay_days,
      stay_window_days = EXCLUDED.stay_window_days,
      last_verified = EXCLUDED.last_verified,
      notes = EXCLUDED.notes;

-- Russia: Tunisia
INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, visa_subtype, max_stay_days, stay_window_days, last_verified, notes)
VALUES
  ('russia', 'tunisia', 'visa_free', NULL, 30, NULL, '2026-03-15', 'Russian citizens can enter Tunisia visa-free for up to 30 days under Russia-Tunisia bilateral agreement.')
ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO UPDATE
  SET visa_type = EXCLUDED.visa_type,
      max_stay_days = EXCLUDED.max_stay_days,
      stay_window_days = EXCLUDED.stay_window_days,
      last_verified = EXCLUDED.last_verified,
      notes = EXCLUDED.notes;

-- Nigeria: Ghana (ECOWAS free movement)
INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, visa_subtype, max_stay_days, stay_window_days, last_verified, notes)
VALUES
  ('nigeria', 'ghana', 'visa_free', NULL, 90, NULL, '2026-03-15', 'Nigerian citizens can enter Ghana visa-free under ECOWAS free movement protocol. Up to 90 days.')
ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO UPDATE
  SET visa_type = EXCLUDED.visa_type,
      max_stay_days = EXCLUDED.max_stay_days,
      stay_window_days = EXCLUDED.stay_window_days,
      last_verified = EXCLUDED.last_verified,
      notes = EXCLUDED.notes;
