/*
  # Fix visa_free_eta entries: add correct subtypes and notes

  ## Changes

  These destinations use legitimate ETA (Electronic Travel Authority) systems,
  so `visa_free_eta` is the correct visa_type. Adding proper subtypes and notes.

  ### Australia ETA/eVisitor
  - EU/Schengen/UK/US/NZ/Japan/SK/Singapore passports: eVisitor (subclass 651) — free online
  - Other passports (Malaysia, Mexico, etc.): ETA (subclass 601) — paid, through agents

  ### Canada eTA
  - All listed passports require Canada eTA (Electronic Travel Authorization)
  - Exception: US passport holders are fully visa-free (no eTA needed)
  - Removing USA → Canada from visa_free_eta to visa_free (US citizens exempt from eTA)

  ### New Zealand NZeTA
  - All listed passports need NZeTA (New Zealand Electronic Travel Authority)
  - Exception: Australian passport holders are fully visa-free
  - UK → NZ: 180 days, no NZeTA needed (UK citizens have special 6-month visa-free access)

  ### UK ETA
  - UK launched its ETA scheme (Electronic Travel Authorisation) on January 8, 2025
  - EU/EEA nationals, US nationals, UAE nationals need ETA to visit UK
  - Note: EU nationals had visa-free access before — ETA is a new pre-travel requirement

  ### South Korea K-ETA
  - K-ETA was suspended for most eligible countries (2023-2025), reinstated selectively
  - Countries with K-ETA requirement: Japan, China (separate rules), many EU passports
  - Vietnam, Philippines, Indonesia, South Africa, Thailand: visa-free (K-ETA suspended for them)
  - For EU/UK/US passports: K-ETA was suspended; they are now fully visa_free for 90 days
  - Converting those EU/US/UK → South Korea from visa_free_eta to visa_free

  ## Sources
  - Australia: immi.homeaffairs.gov.au (eVisitor 651, ETA 601)
  - Canada: canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta
  - New Zealand: immigration.govt.nz (NZeTA)
  - UK: gov.uk/guidance/apply-for-an-electronic-travel-authorisation-eta
  - South Korea: K-ETA suspension notice (k-eta.go.kr), Korea Immigration Service
*/

UPDATE visa_rules
SET
  visa_subtype = 'eVisitor (subclass 651)',
  notes = 'eVisitor visa (subclass 651) required. Free online application at immi.homeaffairs.gov.au — apply before travel. Valid for multiple visits of up to 3 months each over 12 months.'
WHERE destination_slug = 'australia'
  AND visa_type = 'visa_free_eta'
  AND passport_slug IN (
    'czech-republic','germany','greece','hungary','italy','japan','netherlands',
    'new-zealand','poland','portugal','singapore','south-korea','spain',
    'switzerland','united-kingdom','united-states','ireland','denmark','finland',
    'norway','sweden','austria','belgium','croatia','france','romania',
    'israel','chile','argentina','brazil'
  );

UPDATE visa_rules
SET
  visa_subtype = 'ETA (subclass 601)',
  notes = 'Electronic Travel Authority (ETA, subclass 601) required. Apply through a registered ETA agent or the AUS ETA mobile app. Fee applies. Allows multiple visits of up to 3 months each over 12 months.'
WHERE destination_slug = 'australia'
  AND visa_type = 'visa_free_eta'
  AND passport_slug NOT IN (
    'czech-republic','germany','greece','hungary','italy','japan','netherlands',
    'new-zealand','poland','portugal','singapore','south-korea','spain',
    'switzerland','united-kingdom','united-states','ireland','denmark','finland',
    'norway','sweden','austria','belgium','croatia','france','romania',
    'israel','chile','argentina','brazil'
  );

UPDATE visa_rules
SET
  visa_subtype = 'eTA',
  notes = 'Canada eTA (Electronic Travel Authorization) required before travel. Apply online at canada.ca/eTA. Cost CAD $7. Valid for 5 years or until passport expiry. Required for all visa-exempt foreign nationals arriving by air.'
WHERE destination_slug = 'canada'
  AND visa_type = 'visa_free_eta';

UPDATE visa_rules
SET
  visa_type = 'visa_free',
  visa_subtype = NULL,
  notes = 'U.S. citizens are exempt from the Canada eTA requirement. No pre-travel authorization needed. Entry by air, land, or sea permitted for tourism for up to 6 months.'
WHERE destination_slug = 'canada'
  AND passport_slug = 'united-states'
  AND visa_type = 'visa_free_eta';

UPDATE visa_rules
SET
  visa_subtype = 'NZeTA',
  notes = 'NZeTA (New Zealand Electronic Travel Authority) required before travel. Apply via the NZeTA app or at immigration.govt.nz. NZD $17 (app) or NZD $23 (online). Valid for multiple trips of up to 90 days each for 2 years.'
WHERE destination_slug = 'new-zealand'
  AND visa_type = 'visa_free_eta';

UPDATE visa_rules
SET
  visa_type = 'visa_free',
  visa_subtype = NULL,
  max_stay_days = 180,
  notes = 'UK citizens have special 6-month visa-free access to New Zealand without requiring a NZeTA. No pre-travel authorization needed for stays up to 6 months.'
WHERE destination_slug = 'new-zealand'
  AND passport_slug = 'united-kingdom'
  AND visa_type = 'visa_free_eta';

UPDATE visa_rules
SET
  visa_subtype = 'ETA',
  notes = 'UK Electronic Travel Authorisation (ETA) required since January 8, 2025. Apply via the UK ETA app or at gov.uk. Cost £10. Valid for 2 years or until passport expiry. Required for all visa-exempt nationals arriving by air, sea, or land (except Irish citizens).'
WHERE destination_slug = 'united-kingdom'
  AND visa_type = 'visa_free_eta';

UPDATE visa_rules
SET
  visa_type = 'visa_free',
  visa_subtype = NULL,
  notes = 'South Korea suspended the K-ETA requirement for most visa-exempt countries. EU, UK, US, Japan, Singapore, New Zealand, UAE and other eligible passport holders may enter visa-free for up to 90 days without any electronic pre-authorization. Verify current K-ETA status at k-eta.go.kr before travel.'
WHERE destination_slug = 'south-korea'
  AND visa_type = 'visa_free_eta'
  AND passport_slug IN (
    'czech-republic','germany','greece','hungary','italy','japan','netherlands',
    'poland','portugal','singapore','spain','switzerland','united-kingdom',
    'united-states','ireland','denmark','finland','norway','sweden','austria',
    'belgium','croatia','france','romania','israel','new-zealand','mexico',
    'malaysia','united-arab-emirates','south-africa','thailand','turkey'
  );

UPDATE visa_rules
SET
  visa_subtype = 'K-ETA',
  notes = 'South Korea K-ETA (Korea Electronic Travel Authorization) may be required. Check current status at k-eta.go.kr as the K-ETA suspension has been applied selectively. When required, apply online at k-eta.go.kr for USD $10. Valid for multiple entries for 2 years.'
WHERE destination_slug = 'south-korea'
  AND visa_type = 'visa_free_eta';
