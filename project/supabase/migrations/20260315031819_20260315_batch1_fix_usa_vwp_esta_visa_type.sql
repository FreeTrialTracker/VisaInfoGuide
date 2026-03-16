/*
  # Fix VWP countries → USA: visa_free_eta → evisa/ESTA

  ## Issue
  Many countries are listed as 'visa_free_eta' for the United States. This is incorrect.
  The United States does NOT use an ETA (Electronic Travel Authority) system.
  The U.S. uses the Visa Waiver Program (VWP) with ESTA (Electronic System for Travel
  Authorization). ESTA is mandatory pre-travel authorization — it is an eVisa equivalent.

  Countries with 'visa_free_eta' → USA that should be 'evisa' with subtype 'ESTA':
  - Czech Republic, Germany, Greece, Hungary, Italy, Japan, Netherlands, New Zealand,
    Poland, Portugal, Qatar, Singapore, South Korea, Spain, Switzerland, UAE

  Note: Some countries were previously corrected with ESTA subtype (Australia, Belgium,
  France, Denmark, etc). This migration fixes the remaining ones.

  Countries that legitimately do NOT need ESTA (no change needed):
  - Canada: visa_free (explicitly exempt from VWP/ESTA by treaty)

  ## Source
  - U.S. CBP Visa Waiver Program country list (cbp.gov/travel/international-visitors/visa-waiver-program)
  - U.S. DHS ESTA system (esta.cbp.dhs.gov)
*/

UPDATE visa_rules
SET
  visa_type = 'evisa',
  visa_subtype = 'ESTA',
  notes = 'Visa Waiver Program (VWP). ESTA required before travel — apply at esta.cbp.dhs.gov. Authorization valid for 2 years or until passport expiry. Maximum 90 days per visit for tourism or business.'
WHERE destination_slug = 'united-states'
  AND visa_type = 'visa_free_eta'
  AND passport_slug IN (
    'czech-republic', 'germany', 'greece', 'hungary', 'italy', 'japan',
    'netherlands', 'new-zealand', 'poland', 'portugal', 'singapore',
    'south-korea', 'spain', 'switzerland', 'united-arab-emirates'
  );

UPDATE visa_rules
SET
  visa_type = 'evisa',
  visa_subtype = 'ESTA',
  notes = 'Visa Waiver Program (VWP). ESTA required before travel — apply at esta.cbp.dhs.gov. Authorization valid for 2 years or until passport expiry. Maximum 90 days per visit for tourism or business.'
WHERE destination_slug = 'united-states'
  AND visa_type = 'visa_free_eta'
  AND passport_slug = 'qatar';
