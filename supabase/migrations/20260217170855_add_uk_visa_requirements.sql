/*
  # Add UK Visa Requirements Data

  1. Changes
    - Inserts 15 visa requirement records for UK passport holders traveling to various destinations
    - Covers major destinations: China, UAE, Qatar, Saudi Arabia, Egypt, Brazil, India, Indonesia, Vietnam, Philippines, New Zealand, Turkey, Malaysia, Thailand, South Korea
  
  2. Visa Types Included
    - visa_free: China, Brazil, Vietnam, Philippines, Turkey, Malaysia, Thailand
    - visa_on_arrival: UAE, Qatar, Egypt, Indonesia
    - evisa: Saudi Arabia
    - visa_required: India
    - visa_free_eta: New Zealand, South Korea
  
  3. Security
    - Uses ON CONFLICT to prevent duplicate entries
    - All records include official source URLs from GOV.UK
*/

INSERT INTO visa_rules (
  passport_slug, 
  destination_slug, 
  visa_type, 
  max_stay_days, 
  stay_rule, 
  passport_validity_months, 
  transit_required, 
  insurance_required, 
  return_ticket_required, 
  sufficient_funds_required, 
  official_source_url, 
  last_verified, 
  notes
) VALUES
  (
    'united-kingdom', 'china', 'visa_free', 30,
    'Visa-free up to 30 days (17 Feb 2026–31 Dec 2026)',
    6, false, false, false, false,
    'https://www.gov.uk/foreign-travel-advice/china',
    '2026-02-18',
    'GOV.UK travel advice states UK citizens can enter visa-free up to 30 days within the stated window.'
  ),
  (
    'united-kingdom', 'united-arab-emirates', 'visa_on_arrival', 90,
    '90 days in any 180-day period (issued free on arrival)',
    null, false, false, false, false,
    'https://www.gov.uk/foreign-travel-advice/united-arab-emirates/entry-requirements',
    '2026-02-18',
    'Visa issued free on arrival; valid up to 90 days over 180 days.'
  ),
  (
    'united-kingdom', 'qatar', 'visa_on_arrival', 30,
    'Tourist visa/waiver on arrival; extend before expiry if staying longer',
    null, false, false, false, false,
    'https://www.gov.uk/foreign-travel-advice/qatar/entry-requirements',
    '2026-02-18',
    'GOV.UK: tourist visa on arrival for full British Citizen passport; extension needed beyond 30 days.'
  ),
  (
    'united-kingdom', 'saudi-arabia', 'evisa', null,
    'Electronic visa waiver/eVisa required (apply online)',
    null, false, false, false, false,
    'https://www.gov.uk/foreign-travel-advice/saudi-arabia/entry-requirements',
    '2026-02-18',
    'GOV.UK: apply online for an electronic visa waiver (or appropriate eVisa route).'
  ),
  (
    'united-kingdom', 'egypt', 'visa_on_arrival', 30,
    'Visa required; tourist visa available online or on arrival (resort-only 15-day exemption in Sinai)',
    null, false, false, false, false,
    'https://www.gov.uk/foreign-travel-advice/egypt/entry-requirements',
    '2026-02-18',
    'GOV.UK: visa normally required; <15 days in specified Sinai resorts gets free entry stamp; otherwise get visa online or at airport.'
  ),
  (
    'united-kingdom', 'brazil', 'visa_free', 90,
    'Visa-free tourism up to 90 days',
    null, false, false, false, false,
    'https://www.gov.uk/foreign-travel-advice/brazil/entry-requirements',
    '2026-02-18',
    'GOV.UK: visa-free tourism up to 90 days.'
  ),
  (
    'united-kingdom', 'india', 'visa_required', null,
    'Visa required (select correct category)',
    6, false, false, false, false,
    'https://www.gov.uk/foreign-travel-advice/india/entry-requirements',
    '2026-02-18',
    'GOV.UK: you must have a visa unless OCI cardholder.'
  ),
  (
    'united-kingdom', 'indonesia', 'visa_on_arrival', 30,
    'Visa required; 30-day VOA available; return/onward ticket required',
    6, false, false, true, false,
    'https://www.gov.uk/foreign-travel-advice/indonesia/entry-requirements',
    '2026-02-18',
    'GOV.UK: visa required; 30-day visa on arrival available; must have return/onward ticket.'
  ),
  (
    'united-kingdom', 'vietnam', 'visa_free', 45,
    'Visa-free tourism/business up to 45 days; e-visa option for longer stays',
    6, false, false, false, false,
    'https://www.gov.uk/foreign-travel-advice/vietnam/entry-requirements',
    '2026-02-18',
    'GOV.UK: visa-free up to 45 days; e-visa available (e.g., 90-day multiple entry).'
  ),
  (
    'united-kingdom', 'philippines', 'visa_free', 30,
    'Visa-free up to 30 days; onward/return ticket required; eTravel registration required',
    6, false, false, true, false,
    'https://www.gov.uk/foreign-travel-advice/philippines/entry-requirements',
    '2026-02-18',
    'GOV.UK: visa-free up to 30 days; must have onward/return ticket; eTravel QR registration required.'
  ),
  (
    'united-kingdom', 'new-zealand', 'visa_free_eta', 180,
    'Visa-free up to 6 months; NZeTA required',
    3, false, false, true, true,
    'https://www.gov.uk/foreign-travel-advice/new-zealand/entry-requirements',
    '2026-02-18',
    'GOV.UK: visit up to 6 months visa-free but must obtain NZeTA; must show onward/return ticket and funds at border.'
  ),
  (
    'united-kingdom', 'turkey', 'visa_free', 90,
    '90 days in any 180-day period (tourism/business)',
    null, false, false, false, false,
    'https://www.gov.uk/foreign-travel-advice/turkey/entry-requirements',
    '2026-02-18',
    'GOV.UK: visa-free up to 90 days in any 180-day period for British citizens.'
  ),
  (
    'united-kingdom', 'malaysia', 'visa_free', 90,
    'Visa-free tourism (normally 90 days on arrival)',
    null, false, false, false, false,
    'https://www.gov.uk/foreign-travel-advice/malaysia/entry-requirements',
    '2026-02-18',
    'GOV.UK: visa-free for tourism; normally allowed 90 days on arrival.'
  ),
  (
    'united-kingdom', 'thailand', 'visa_free', 60,
    'Visa-free up to 60 days (tourism/business/urgent work); extendable up to 30 days',
    null, false, false, false, false,
    'https://www.gov.uk/foreign-travel-advice/thailand/entry-requirements',
    '2026-02-18',
    'GOV.UK: visa-free up to 60 days; extension possible up to 30 days.'
  ),
  (
    'united-kingdom', 'south-korea', 'visa_free_eta', 90,
    'Visa-free short stay; K-ETA usually required but UK temporarily exempt until 31 Dec 2026',
    null, false, false, false, false,
    'https://www.gov.uk/foreign-travel-advice/south-korea/entry-requirements',
    '2026-02-18',
    'GOV.UK: K-ETA system exists; UK visa-free travellers temporarily exempt until 31 Dec 2026.'
  )
ON CONFLICT (passport_slug, destination_slug) 
DO NOTHING;
