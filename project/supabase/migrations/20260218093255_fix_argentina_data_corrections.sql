
/*
  # Argentina Data Corrections

  1. Remove self-entry row
     - Deletes the Argentina → Argentina domestic entry row (not a valid international travel record)

  2. Fix passport_validity_months = 0 entries (→ Argentina as destination)
     - Italy, Netherlands, Poland, Mexico, South Africa: set to 6 months
     - Also align insurance_required and return_ticket_required to match Argentina's standard entry requirements

  3. Populate stay_window_days = 180 for Schengen destinations
     - All rows where Argentina passport → Schengen country (Austria, Belgium, Croatia, Czech Republic,
       France, Germany, Greece, Hungary, Italy, Netherlands, Poland, Portugal, Spain, Switzerland)

  4. Fix Argentina → Qatar: change visa_type from visa_on_arrival to visa_free
     - Argentina holds visa-free access to Qatar for 30 days

  5. Fix Argentina → South Korea: K-ETA suspended; update to visa_free without ETA requirement

  6. Add max_stay_days for Argentina → India eVisa
     - Set to 90 days (standard tourist eVisa duration for Argentina)
*/

-- 1. Remove self-entry row
DELETE FROM visa_rules
WHERE passport_slug = 'argentina' AND destination_slug = 'argentina';

-- 2. Fix passport_validity_months = 0 for inbound Argentina rows
UPDATE visa_rules
SET
  passport_validity_months = 6,
  insurance_required = true,
  return_ticket_required = true,
  sufficient_funds_required = true,
  updated_at = now()
WHERE destination_slug = 'argentina'
  AND passport_slug IN ('italy', 'netherlands', 'poland', 'mexico', 'south-africa')
  AND passport_validity_months = 0;

-- 3. Populate stay_window_days = 180 for Schengen destinations (Argentina passport outbound)
UPDATE visa_rules
SET
  stay_window_days = 180,
  updated_at = now()
WHERE passport_slug = 'argentina'
  AND destination_slug IN (
    'austria', 'belgium', 'croatia', 'czech-republic', 'france',
    'germany', 'greece', 'hungary', 'italy', 'netherlands',
    'poland', 'portugal', 'spain', 'switzerland'
  )
  AND visa_type = 'visa_free';

-- 4. Fix Argentina → Qatar: visa_on_arrival → visa_free, update notes
UPDATE visa_rules
SET
  visa_type = 'visa_free',
  stay_rule = 'Visa-free entry for tourism (30 days)',
  notes = 'Argentina is in Qatar visa-free tier; no prior visa needed.',
  updated_at = now()
WHERE passport_slug = 'argentina' AND destination_slug = 'qatar';

-- 5. Fix Argentina → South Korea: K-ETA suspended, update to plain visa_free
UPDATE visa_rules
SET
  visa_type = 'visa_free',
  stay_rule = 'Visa exemption for tourism/business (90 days)',
  notes = 'Visa-free short stay. K-ETA requirement suspended indefinitely as of 2023.',
  updated_at = now()
WHERE passport_slug = 'argentina' AND destination_slug = 'south-korea';

-- 6. Add max_stay_days for Argentina → India eVisa
UPDATE visa_rules
SET
  max_stay_days = 90,
  notes = 'eVisa for tourism (e-Tourist) allows up to 90 days per entry. Multiple-entry option available.',
  updated_at = now()
WHERE passport_slug = 'argentina' AND destination_slug = 'india';
