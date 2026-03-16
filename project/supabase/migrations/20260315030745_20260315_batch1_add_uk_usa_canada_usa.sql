/*
  # Batch 1 Audit Fix: Add UK → USA and Canada → USA (missing entries)

  ## New Entries
  1. UK → USA: British citizens are on the Visa Waiver Program (VWP) and must
     obtain an approved ESTA before travel. Stays up to 90 days for tourism/business.

  2. Canada → USA: Canadian citizens are explicitly exempt from the VWP and do NOT
     need an ESTA or any nonimmigrant visa. Visa-free entry, typically up to 6 months.

  ## Sources
  - UK FCDO gov.uk/foreign-travel-advice/usa, U.S. CBP (cbp.gov)
  - U.S. State Department travel.state.gov/citizens-of-canada, CBP.gov FAQ
*/

INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, visa_subtype, max_stay_days, stay_window_days, notes, last_verified)
VALUES (
  'united-kingdom',
  'united-states',
  'evisa',
  'ESTA',
  90,
  NULL,
  'Visa Waiver Program (VWP); ESTA required before travel. Apply at esta.cbp.dhs.gov. ESTA valid 2 years or until passport expiry. Note: UK nationals who visited Cuba on or after January 12, 2021 are ineligible for ESTA and must obtain a B-1/B-2 visa.',
  '2026-03-15'
)
ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO UPDATE
  SET visa_type = EXCLUDED.visa_type,
      max_stay_days = EXCLUDED.max_stay_days,
      stay_window_days = EXCLUDED.stay_window_days,
      notes = EXCLUDED.notes,
      last_verified = EXCLUDED.last_verified;

INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, visa_subtype, max_stay_days, stay_window_days, notes, last_verified)
VALUES (
  'canada',
  'united-states',
  'visa_free',
  NULL,
  180,
  NULL,
  'Canadian citizens are exempt from the U.S. Visa Waiver Program and do NOT need an ESTA or nonimmigrant visa. Visa-free entry; stay is at border officer discretion (typically up to 6 months). Valid Canadian passport required.',
  '2026-03-15'
)
ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO UPDATE
  SET visa_type = EXCLUDED.visa_type,
      max_stay_days = EXCLUDED.max_stay_days,
      stay_window_days = EXCLUDED.stay_window_days,
      notes = EXCLUDED.notes,
      last_verified = EXCLUDED.last_verified;
