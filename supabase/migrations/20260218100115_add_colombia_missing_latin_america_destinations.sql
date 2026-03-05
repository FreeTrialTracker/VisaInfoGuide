
/*
  # Add Missing Latin American & Regional Destinations for Colombian Passport

  ## Summary
  Adds visa rules for Colombian passport holders traveling to nearby countries
  that were previously missing from the database.

  ## New Rules Added (colombia as passport)
  - colombia → peru: visa-free 183 days (Andean Community)
  - colombia → ecuador: visa-free 90 days (Andean Community, ID card accepted)
  - colombia → bolivia: visa-free 90 days (Andean Community)
  - colombia → panama: visa-free 90 days
  - colombia → costa-rica: visa-free 90 days
  - colombia → cuba: visa-free 30 days
  - colombia → dominican-republic: tourist card on arrival
  - colombia → kenya: eVisa required
*/

INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, max_stay_days, stay_window_days, stay_rule, notes, passport_validity_months, transit_required, insurance_required, return_ticket_required, sufficient_funds_required, last_verified)
SELECT * FROM (VALUES
  ('colombia', 'peru', 'visa_free', 183, NULL::int, 'Andean Community visa-free', 'Visa-free under Andean Community agreement. National ID card may be accepted.', 6, false, false, false, false, CURRENT_DATE),
  ('colombia', 'ecuador', 'visa_free', 90, NULL::int, 'Andean Community visa-free', 'Visa-free under Andean Community agreement. National ID card accepted.', 6, false, false, false, false, CURRENT_DATE),
  ('colombia', 'bolivia', 'visa_free', 90, NULL::int, 'Andean Community visa-free', 'Visa-free under Andean Community agreement.', 6, false, false, false, false, CURRENT_DATE),
  ('colombia', 'panama', 'visa_free', 90, NULL::int, 'Visa-free short stay', 'Visa-free entry for Colombian passport holders. Onward ticket required.', 6, false, false, true, true, CURRENT_DATE),
  ('colombia', 'costa-rica', 'visa_free', 90, NULL::int, 'Visa-free short stay', 'Visa-free entry for Colombian passport holders.', 6, false, false, true, true, CURRENT_DATE),
  ('colombia', 'cuba', 'visa_free', 30, NULL::int, 'Visa-free short stay', 'Visa-free entry for Colombian passport holders. Tourist card issued on arrival.', 6, false, false, true, true, CURRENT_DATE),
  ('colombia', 'dominican-republic', 'visa_free', 30, NULL::int, 'Tourist card on arrival', 'Tourist card (tarjeta de turismo) required, issued on arrival or available online.', 6, false, false, true, true, CURRENT_DATE),
  ('colombia', 'kenya', 'evisa', 90, NULL::int, 'eVisa required', 'eVisa required. Apply online before travel.', 6, false, false, true, true, CURRENT_DATE)
) AS t(passport_slug, destination_slug, visa_type, max_stay_days, stay_window_days, stay_rule, notes, passport_validity_months, transit_required, insurance_required, return_ticket_required, sufficient_funds_required, last_verified)
WHERE NOT EXISTS (
  SELECT 1 FROM visa_rules vr
  WHERE vr.passport_slug = t.passport_slug
    AND vr.destination_slug = t.destination_slug
    AND vr.visa_subtype IS NULL
);
