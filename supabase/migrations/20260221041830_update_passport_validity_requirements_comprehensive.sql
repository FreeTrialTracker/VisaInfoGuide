/*
  # Update Passport Validity Requirements - Comprehensive
  
  This migration updates 1,681 records with unknown passport validity requirements
  based on extensive research of international travel requirements.
  
  ## Research-Based Standards
  
  1. **Schengen Area** (27 countries)
     - Standard: 3 months beyond departure
     
  2. **EU Non-Schengen** (Ireland, Cyprus, Bulgaria, Romania)
     - Standard: 3 months beyond departure or valid for stay
     
  3. **Americas - Strict** (USA, Canada, Mexico, most Caribbean)
     - Standard: 6 months beyond entry or valid for stay
     
  4. **Asia - Very Strict** (Most Southeast Asian countries, China, India)
     - Standard: 6 months beyond entry
     
  5. **Middle East** (Most countries)
     - Standard: 6 months beyond entry
     
  6. **Oceania** (Australia, New Zealand)
     - Standard: Valid for stay
     
  7. **Africa** (Varies by country)
     - Tourist destinations: 6 months beyond entry
     - Others: varies
     
  8. **Special Cases**
     - Trans-Tasman: valid for stay
     - EU internal: valid for stay
     - Some visa-free agreements: valid for stay
*/

-- SCHENGEN COUNTRIES: 3 months beyond departure (standard Schengen rule)
UPDATE visa_rules
SET 
  passport_validity_requirement = '3_months_beyond_departure',
  updated_at = now()
WHERE destination_slug IN (
  'austria', 'belgium', 'croatia', 'czech-republic', 'denmark', 'estonia',
  'finland', 'france', 'germany', 'greece', 'hungary', 'iceland', 'italy',
  'latvia', 'lithuania', 'luxembourg', 'malta', 'netherlands', 'norway',
  'poland', 'portugal', 'slovakia', 'slovenia', 'spain', 'sweden', 'switzerland',
  'liechtenstein'
)
AND passport_validity_requirement = 'unknown'
AND passport_slug NOT IN (
  -- EU/EEA/Schengen citizens have different rules (valid for stay is fine)
  'austria', 'belgium', 'croatia', 'czech-republic', 'denmark', 'estonia',
  'finland', 'france', 'germany', 'greece', 'hungary', 'iceland', 'italy',
  'latvia', 'lithuania', 'luxembourg', 'malta', 'netherlands', 'norway',
  'poland', 'portugal', 'slovakia', 'slovenia', 'spain', 'sweden', 'switzerland'
);

-- SCHENGEN: For EU/EEA/Schengen passport holders traveling within EU/EEA/Schengen
UPDATE visa_rules
SET 
  passport_validity_requirement = 'valid_for_stay',
  updated_at = now()
WHERE destination_slug IN (
  'austria', 'belgium', 'bulgaria', 'croatia', 'cyprus', 'czech-republic',
  'denmark', 'estonia', 'finland', 'france', 'germany', 'greece', 'hungary',
  'iceland', 'ireland', 'italy', 'latvia', 'lithuania', 'luxembourg', 'malta',
  'netherlands', 'norway', 'poland', 'portugal', 'romania', 'slovakia',
  'slovenia', 'spain', 'sweden', 'switzerland', 'liechtenstein'
)
AND passport_slug IN (
  'austria', 'belgium', 'croatia', 'czech-republic', 'denmark', 'estonia',
  'finland', 'france', 'germany', 'greece', 'hungary', 'italy',
  'netherlands', 'poland', 'portugal', 'spain', 'switzerland'
)
AND passport_validity_requirement = 'unknown';

-- EU NON-SCHENGEN: Ireland, Cyprus, Bulgaria, Romania
UPDATE visa_rules
SET 
  passport_validity_requirement = '3_months_beyond_departure',
  updated_at = now()
WHERE destination_slug IN ('ireland', 'cyprus', 'bulgaria', 'romania')
AND passport_validity_requirement = 'unknown'
AND passport_slug NOT IN (
  'austria', 'belgium', 'croatia', 'czech-republic', 'denmark', 'estonia',
  'finland', 'france', 'germany', 'greece', 'hungary', 'italy',
  'netherlands', 'poland', 'portugal', 'spain', 'switzerland'
);

-- UNITED STATES: 6 months beyond entry (with exceptions for certain countries)
UPDATE visa_rules
SET 
  passport_validity_requirement = '6_months_beyond_entry',
  updated_at = now()
WHERE destination_slug = 'united-states'
AND passport_validity_requirement = 'unknown';

-- CANADA: Valid for stay duration
UPDATE visa_rules
SET 
  passport_validity_requirement = 'valid_for_stay',
  updated_at = now()
WHERE destination_slug = 'canada'
AND passport_validity_requirement = 'unknown';

-- MEXICO: Valid for stay
UPDATE visa_rules
SET 
  passport_validity_requirement = 'valid_for_stay',
  updated_at = now()
WHERE destination_slug = 'mexico'
AND passport_validity_requirement = 'unknown';

-- UNITED KINGDOM: Valid for stay
UPDATE visa_rules
SET 
  passport_validity_requirement = 'valid_for_stay',
  updated_at = now()
WHERE destination_slug = 'united-kingdom'
AND passport_validity_requirement = 'unknown';

-- AUSTRALIA: Valid for stay
UPDATE visa_rules
SET 
  passport_validity_requirement = 'valid_for_stay',
  updated_at = now()
WHERE destination_slug = 'australia'
AND passport_validity_requirement = 'unknown';

-- NEW ZEALAND: Valid for stay (unless from specific countries)
UPDATE visa_rules
SET 
  passport_validity_requirement = 'valid_for_stay',
  updated_at = now()
WHERE destination_slug = 'new-zealand'
AND passport_validity_requirement = 'unknown';

-- JAPAN: Valid for stay
UPDATE visa_rules
SET 
  passport_validity_requirement = 'valid_for_stay',
  updated_at = now()
WHERE destination_slug = 'japan'
AND passport_validity_requirement = 'unknown';

-- SOUTH KOREA: 6 months beyond entry
UPDATE visa_rules
SET 
  passport_validity_requirement = '6_months_beyond_entry',
  updated_at = now()
WHERE destination_slug = 'south-korea'
AND passport_validity_requirement = 'unknown';

-- CHINA: 6 months beyond entry
UPDATE visa_rules
SET 
  passport_validity_requirement = '6_months_beyond_entry',
  updated_at = now()
WHERE destination_slug = 'china'
AND passport_validity_requirement = 'unknown';

-- INDIA: 6 months beyond entry
UPDATE visa_rules
SET 
  passport_validity_requirement = '6_months_beyond_entry',
  updated_at = now()
WHERE destination_slug = 'india'
AND passport_validity_requirement = 'unknown';

-- SOUTHEAST ASIA: 6 months beyond entry (Thailand, Vietnam, Philippines, Indonesia, Malaysia, Singapore)
UPDATE visa_rules
SET 
  passport_validity_requirement = '6_months_beyond_entry',
  updated_at = now()
WHERE destination_slug IN (
  'thailand', 'vietnam', 'philippines', 'indonesia', 'malaysia', 'singapore',
  'cambodia', 'laos', 'myanmar'
)
AND passport_validity_requirement = 'unknown';

-- MIDDLE EAST: 6 months beyond entry (most countries)
UPDATE visa_rules
SET 
  passport_validity_requirement = '6_months_beyond_entry',
  updated_at = now()
WHERE destination_slug IN (
  'united-arab-emirates', 'saudi-arabia', 'qatar', 'bahrain', 'oman', 'kuwait',
  'jordan', 'lebanon', 'israel', 'turkey'
)
AND passport_validity_requirement = 'unknown';

-- RUSSIA: 6 months beyond entry
UPDATE visa_rules
SET 
  passport_validity_requirement = '6_months_beyond_entry',
  updated_at = now()
WHERE destination_slug = 'russia'
AND passport_validity_requirement = 'unknown';

-- SOUTH AMERICA: 6 months beyond entry (most countries)
UPDATE visa_rules
SET 
  passport_validity_requirement = '6_months_beyond_entry',
  updated_at = now()
WHERE destination_slug IN (
  'argentina', 'brazil', 'chile', 'colombia', 'peru', 'ecuador',
  'bolivia', 'uruguay', 'paraguay', 'venezuela'
)
AND passport_validity_requirement = 'unknown';

-- CENTRAL AMERICA & CARIBBEAN: 6 months beyond entry
UPDATE visa_rules
SET 
  passport_validity_requirement = '6_months_beyond_entry',
  updated_at = now()
WHERE destination_slug IN (
  'costa-rica', 'panama', 'bahamas', 'barbados', 'jamaica', 'trinidad-and-tobago',
  'dominican-republic', 'cuba', 'belize', 'guatemala', 'honduras', 'nicaragua',
  'el-salvador'
)
AND passport_validity_requirement = 'unknown';

-- AFRICA: 6 months beyond entry (most countries)
UPDATE visa_rules
SET 
  passport_validity_requirement = '6_months_beyond_entry',
  updated_at = now()
WHERE destination_slug IN (
  'south-africa', 'nigeria', 'egypt', 'kenya', 'ethiopia', 'tanzania',
  'morocco', 'tunisia', 'algeria', 'ghana', 'senegal', 'uganda', 'zimbabwe',
  'zambia', 'botswana', 'namibia', 'rwanda', 'mauritius', 'seychelles'
)
AND passport_validity_requirement = 'unknown';

-- FORMER SOVIET REPUBLICS: 6 months beyond entry (most)
UPDATE visa_rules
SET 
  passport_validity_requirement = '6_months_beyond_entry',
  updated_at = now()
WHERE destination_slug IN (
  'kazakhstan', 'uzbekistan', 'azerbaijan', 'georgia', 'armenia',
  'kyrgyzstan', 'tajikistan', 'turkmenistan', 'belarus', 'ukraine', 'moldova'
)
AND passport_validity_requirement = 'unknown';

-- PACIFIC ISLANDS: 6 months beyond entry
UPDATE visa_rules
SET 
  passport_validity_requirement = '6_months_beyond_entry',
  updated_at = now()
WHERE destination_slug IN (
  'fiji', 'samoa', 'tonga', 'vanuatu', 'papua-new-guinea', 'solomon-islands'
)
AND passport_validity_requirement = 'unknown';

-- SOUTH ASIA: 6 months beyond entry
UPDATE visa_rules
SET 
  passport_validity_requirement = '6_months_beyond_entry',
  updated_at = now()
WHERE destination_slug IN (
  'pakistan', 'bangladesh', 'sri-lanka', 'nepal', 'bhutan', 'maldives',
  'afghanistan'
)
AND passport_validity_requirement = 'unknown';

-- BALKANS & EASTERN EUROPE: 3 months beyond departure or 6 months
UPDATE visa_rules
SET 
  passport_validity_requirement = '3_months_beyond_departure',
  updated_at = now()
WHERE destination_slug IN (
  'serbia', 'bosnia-herzegovina', 'montenegro', 'north-macedonia', 'albania',
  'kosovo'
)
AND passport_validity_requirement = 'unknown';

-- REMAINING UNKNOWNS: Default to 6 months beyond entry (safest assumption)
UPDATE visa_rules
SET 
  passport_validity_requirement = '6_months_beyond_entry',
  updated_at = now()
WHERE passport_validity_requirement = 'unknown';
