/*
  # Add France Outbound: Missing EU/Schengen and other destinations

  ## Summary
  French passport holders have EU free movement rights to all EU member states
  and Schengen-area countries. Many destinations were missing from the france
  outbound rules. This migration adds them.

  ## New rows added (passport = france)
  - EU member states: denmark, finland, sweden, ireland, luxembourg, malta,
    slovakia, slovenia, estonia, latvia, lithuania, bulgaria, romania, cyprus
  - EFTA/EEA: norway, iceland
  - Visa-free non-EU: israel, georgia, serbia, jordan, morocco, tunisia,
    maldives, mongolia, peru, costa-rica, ecuador, uruguay, panama, jamaica
  - eVisa / visa-on-arrival: sri-lanka, cambodia, kenya, ethiopia,
    dominican-republic, cuba, laos, nepal
  - Visa required: pakistan, bangladesh, angola, ghana, tanzania, zimbabwe,
    algeria, myanmar, kazakhstan, uzbekistan, turkmenistan, azerbaijan, armenia
*/

INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, visa_subtype, max_stay_days, stay_window_days, stay_rule, notes, last_verified)
VALUES
  -- EU free movement
  ('france', 'denmark',        'visa_free', NULL, NULL, NULL, 'EU freedom of movement', 'EU citizen rights apply.', now()),
  ('france', 'finland',        'visa_free', NULL, NULL, NULL, 'EU freedom of movement', 'EU citizen rights apply.', now()),
  ('france', 'sweden',         'visa_free', NULL, NULL, NULL, 'EU freedom of movement', 'EU citizen rights apply.', now()),
  ('france', 'ireland',        'visa_free', NULL, NULL, NULL, 'EU freedom of movement', 'EU citizen rights apply. Ireland is not in Schengen but EU free movement applies.', now()),
  ('france', 'luxembourg',     'visa_free', NULL, NULL, NULL, 'EU freedom of movement', 'EU citizen rights apply.', now()),
  ('france', 'malta',          'visa_free', NULL, NULL, NULL, 'EU freedom of movement', 'EU citizen rights apply.', now()),
  ('france', 'slovakia',       'visa_free', NULL, NULL, NULL, 'EU freedom of movement', 'EU citizen rights apply.', now()),
  ('france', 'slovenia',       'visa_free', NULL, NULL, NULL, 'EU freedom of movement', 'EU citizen rights apply.', now()),
  ('france', 'estonia',        'visa_free', NULL, NULL, NULL, 'EU freedom of movement', 'EU citizen rights apply.', now()),
  ('france', 'latvia',         'visa_free', NULL, NULL, NULL, 'EU freedom of movement', 'EU citizen rights apply.', now()),
  ('france', 'lithuania',      'visa_free', NULL, NULL, NULL, 'EU freedom of movement', 'EU citizen rights apply.', now()),
  ('france', 'bulgaria',       'visa_free', NULL, NULL, NULL, 'EU freedom of movement', 'EU citizen rights apply.', now()),
  ('france', 'romania',        'visa_free', NULL, NULL, NULL, 'EU freedom of movement', 'EU citizen rights apply.', now()),
  ('france', 'cyprus',         'visa_free', NULL, NULL, NULL, 'EU freedom of movement', 'EU citizen rights apply. Cyprus is not in Schengen but EU free movement applies.', now()),
  -- EEA/EFTA
  ('france', 'norway',         'visa_free', NULL, NULL, NULL, 'EEA/Schengen free movement', 'EFTA/EEA member; free movement agreement with EU.', now()),
  ('france', 'iceland',        'visa_free', NULL, NULL, NULL, 'EEA/Schengen free movement', 'EFTA/EEA member; free movement agreement with EU.', now()),
  -- Visa-free non-EU
  ('france', 'israel',         'visa_free', NULL, 90,   NULL, 'Visa-free entry up to 90 days', 'No visa required for French passport holders.', now()),
  ('france', 'georgia',        'visa_free', NULL, 365,  NULL, 'Visa-free entry up to 1 year', 'French citizens may stay up to 365 days visa-free.', now()),
  ('france', 'serbia',         'visa_free', NULL, 90,   NULL, 'Visa-free entry up to 90 days', 'No visa required for EU citizens.', now()),
  ('france', 'jordan',         'visa_free', NULL, 30,   NULL, 'Visa-free entry up to 30 days', 'Visa-free on arrival for French passport holders.', now()),
  ('france', 'morocco',        'visa_free', NULL, 90,   NULL, 'Visa-free entry up to 90 days', 'No visa required for French passport holders.', now()),
  ('france', 'tunisia',        'visa_free', NULL, 90,   NULL, 'Visa-free entry up to 90 days', 'No visa required for French passport holders.', now()),
  ('france', 'maldives',       'visa_free', NULL, 30,   NULL, 'Visa-free on arrival (30 days)', 'Tourist visa issued free on arrival.', now()),
  ('france', 'mongolia',       'visa_free', NULL, 30,   NULL, 'Visa-free entry up to 30 days', 'No visa required for French passport holders.', now()),
  ('france', 'peru',           'visa_free', NULL, 183,  NULL, 'Visa-free entry up to 183 days', 'No visa required for French passport holders.', now()),
  ('france', 'costa-rica',     'visa_free', NULL, 90,   NULL, 'Visa-free entry up to 90 days', 'No visa required for French passport holders.', now()),
  ('france', 'ecuador',        'visa_free', NULL, 90,   NULL, 'Visa-free entry up to 90 days', 'No visa required for French passport holders.', now()),
  ('france', 'uruguay',        'visa_free', NULL, 90,   NULL, 'Visa-free entry up to 90 days', 'No visa required for French passport holders.', now()),
  ('france', 'panama',         'visa_free', NULL, 90,   NULL, 'Visa-free entry up to 90 days', 'No visa required for French passport holders.', now()),
  ('france', 'jamaica',        'visa_free', NULL, 90,   NULL, 'Visa-free entry up to 90 days', 'No visa required for French passport holders.', now()),
  ('france', 'barbados',       'visa_free', NULL, 180,  NULL, 'Visa-free entry up to 6 months', 'No visa required for French passport holders.', now()),
  ('france', 'bahamas',        'visa_free', NULL, 90,   NULL, 'Visa-free entry up to 90 days', 'No visa required for French passport holders.', now()),
  ('france', 'paraguay',       'visa_free', NULL, 90,   NULL, 'Visa-free entry up to 90 days', 'No visa required for French passport holders.', now()),
  ('france', 'bolivia',        'visa_free', NULL, 90,   NULL, 'Visa-free entry up to 90 days', 'No visa required for French passport holders.', now()),
  -- eVisa / visa-on-arrival
  ('france', 'sri-lanka',      'evisa',     NULL, 30,   NULL, 'ETA required before travel (30 days)', 'Electronic Travel Authorization required.', now()),
  ('france', 'cambodia',       'evisa',     NULL, 30,   NULL, 'eVisa available (30 days)', 'eVisa recommended; VOA also available.', now()),
  ('france', 'kenya',          'evisa',     NULL, 90,   NULL, 'eVisa required (up to 90 days)', 'Electronic visa required before travel.', now()),
  ('france', 'ethiopia',       'evisa',     NULL, 30,   NULL, 'eVisa required (30 days)', 'Electronic visa required before travel.', now()),
  ('france', 'dominican-republic', 'visa_on_arrival', NULL, 30, NULL, 'Tourist card on arrival (30 days)', 'Tourist card fee payable on arrival or included in airline ticket.', now()),
  ('france', 'laos',           'visa_on_arrival', NULL, 30, NULL, 'Visa on arrival available (30 days)', 'VOA available at major ports of entry.', now()),
  ('france', 'nepal',          'visa_on_arrival', NULL, 30, NULL, 'Visa on arrival available (30/60/90 days)', 'VOA available at Tribhuvan International Airport and land borders.', now()),
  ('france', 'bahrain',        'visa_on_arrival', NULL, 14, NULL, 'Visa on arrival available (14 days)', 'VOA or eVisa available for French passport holders.', now()),
  ('france', 'oman',           'evisa',     NULL, 30,   NULL, 'eVisa required (30 days)', 'Electronic visa required before travel.', now()),
  ('france', 'kuwait',         'visa_required', NULL, NULL, NULL, 'Visa required prior to travel', 'Visa required; apply at Kuwaiti embassy.', now()),
  -- Visa required
  ('france', 'pakistan',       'visa_required', NULL, NULL, NULL, 'Visa required prior to travel', 'Visa required; apply at Pakistani embassy.', now()),
  ('france', 'bangladesh',     'visa_required', NULL, NULL, NULL, 'Visa required prior to travel', 'Visa required; apply at Bangladeshi embassy.', now()),
  ('france', 'angola',         'visa_required', NULL, NULL, NULL, 'Visa required prior to travel', 'Visa required; apply at Angolan embassy.', now()),
  ('france', 'ghana',          'visa_required', NULL, NULL, NULL, 'Visa required prior to travel', 'Visa required; apply at Ghanaian embassy.', now()),
  ('france', 'tanzania',       'evisa',     NULL, 90,   NULL, 'eVisa or VOA available (up to 90 days)', 'Electronic visa recommended before travel.', now()),
  ('france', 'zimbabwe',       'visa_on_arrival', NULL, 30, NULL, 'Visa on arrival available (30 days)', 'VOA available for French passport holders.', now()),
  ('france', 'algeria',        'visa_required', NULL, NULL, NULL, 'Visa required prior to travel', 'Visa required; apply at Algerian embassy.', now()),
  ('france', 'myanmar',        'evisa',     NULL, 28,   NULL, 'eVisa required (28 days)', 'Electronic visa required before travel.', now()),
  ('france', 'kazakhstan',     'visa_free', NULL, 30,   NULL, 'Visa-free entry up to 30 days', 'Kazakhstan offers visa-free access for French passport holders.', now()),
  ('france', 'uzbekistan',     'visa_free', NULL, 30,   NULL, 'Visa-free entry up to 30 days', 'Uzbekistan offers visa-free access for French passport holders.', now()),
  ('france', 'turkmenistan',   'visa_required', NULL, NULL, NULL, 'Visa required prior to travel', 'Visa required; very restricted access.', now()),
  ('france', 'azerbaijan',     'evisa',     NULL, 30,   NULL, 'eVisa required (ASAN Visa, 30 days)', 'Electronic visa available via ASAN Visa system.', now()),
  ('france', 'armenia',        'visa_free', NULL, 180,  NULL, 'Visa-free entry up to 180 days', 'No visa required for French passport holders.', now()),
  ('france', 'cuba',           'visa_on_arrival', NULL, 30, NULL, 'Tourist card required (30 days, extendable)', 'Tourist card (tarjeta del turista) required; available at airline check-in.', now()),
  ('france', 'ukraine',        'visa_free', NULL, 90,   180, 'Visa-free entry up to 90 days in 180-day period', 'No visa required for French passport holders.', now()),
  ('france', 'cambodia',       'evisa',     NULL, 30,   NULL, 'eVisa available (30 days)', 'eVisa recommended; VOA also available.', now())
ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO NOTHING;
