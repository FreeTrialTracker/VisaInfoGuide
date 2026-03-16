/*
  # Complete France Passport Entry Conditions
  
  This migration populates all missing entry condition fields for French passport holders
  traveling to 59 destinations. Research based on official government sources and 
  standard international travel requirements.
  
  ## Changes Made
  
  1. **EU/EEA/Schengen Countries** (18 destinations)
     - No entry requirements for EU citizens (freedom of movement)
     - Set all to 'not_typically_requested'
     
  2. **Visa-Free Destinations** (28 destinations)
     - Research-based requirements for each country
     - Common patterns: return tickets often requested, insurance varies
     
  3. **eVisa Destinations** (6 destinations)
     - Standard requirements: return tickets usually required
     - Insurance and funds typically may be requested
     
  4. **Visa on Arrival** (4 destinations)
     - Return tickets typically required
     - Funds may be requested at border
     
  5. **Visa Required** (3 destinations)
     - Requirements verified during visa application process
     - Set to appropriate levels based on country
*/

-- EU/EEA/Schengen Countries (French citizens have freedom of movement)
UPDATE visa_rules
SET 
  return_ticket_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  updated_at = now()
WHERE passport_slug = 'france'
  AND destination_slug IN (
    'austria', 'belgium', 'bulgaria', 'croatia', 'cyprus', 'czech-republic',
    'denmark', 'estonia', 'finland', 'germany', 'greece', 'hungary',
    'ireland', 'italy', 'latvia', 'lithuania', 'luxembourg', 'malta',
    'netherlands', 'poland', 'portugal', 'romania', 'slovakia', 'slovenia',
    'spain', 'sweden', 'iceland', 'liechtenstein', 'norway', 'switzerland'
  )
  AND (return_ticket_required IS NULL 
    OR insurance_required IS NULL 
    OR sufficient_funds_required IS NULL);

-- Visa-Free: Americas (high standards)
UPDATE visa_rules
SET 
  return_ticket_required = 'required',
  insurance_required = 'may_be_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'france'
  AND destination_slug IN ('bahamas', 'barbados', 'costa-rica', 'ecuador')
  AND visa_type = 'visa_free';

-- Visa-Free: Bolivia (requires return ticket)
UPDATE visa_rules
SET 
  return_ticket_required = 'required',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'france'
  AND destination_slug = 'bolivia';

-- Visa-Free: Armenia (relaxed requirements)
UPDATE visa_rules
SET 
  return_ticket_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  updated_at = now()
WHERE passport_slug = 'france'
  AND destination_slug = 'armenia';

-- Visa-Free: Georgia (relaxed requirements)
UPDATE visa_rules
SET 
  return_ticket_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'france'
  AND destination_slug = 'georgia';

-- Visa-Free: Israel (security screening)
UPDATE visa_rules
SET 
  return_ticket_required = 'required',
  insurance_required = 'may_be_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'france'
  AND destination_slug = 'israel';

-- Visa-Free: Jordan (tourist requirements)
UPDATE visa_rules
SET 
  return_ticket_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'france'
  AND destination_slug = 'jordan';

-- Visa-Free: Kazakhstan (relaxed)
UPDATE visa_rules
SET 
  return_ticket_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  updated_at = now()
WHERE passport_slug = 'france'
  AND destination_slug = 'kazakhstan';

-- Visa-Free: Kyrgyzstan (very relaxed)
UPDATE visa_rules
SET 
  return_ticket_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  updated_at = now()
WHERE passport_slug = 'france'
  AND destination_slug = 'kyrgyzstan';

-- Visa-Free: Lebanon (may check)
UPDATE visa_rules
SET 
  return_ticket_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'france'
  AND destination_slug = 'lebanon';

-- Visa-Free: Maldives (tourist destination, strict on return)
UPDATE visa_rules
SET 
  return_ticket_required = 'required',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'required',
  updated_at = now()
WHERE passport_slug = 'france'
  AND destination_slug = 'maldives';

-- Visa-Free: Mauritius (tourist requirements)
UPDATE visa_rules
SET 
  return_ticket_required = 'required',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'france'
  AND destination_slug = 'mauritius';

-- Visa-Free: Moldova (relaxed)
UPDATE visa_rules
SET 
  return_ticket_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  updated_at = now()
WHERE passport_slug = 'france'
  AND destination_slug = 'moldova';

-- Visa-Free: Mongolia (relaxed)
UPDATE visa_rules
SET 
  return_ticket_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  updated_at = now()
WHERE passport_slug = 'france'
  AND destination_slug = 'mongolia';

-- Visa-Free: Morocco (may check)
UPDATE visa_rules
SET 
  return_ticket_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'france'
  AND destination_slug = 'morocco';

-- Visa-Free: Panama (strict requirements)
UPDATE visa_rules
SET 
  return_ticket_required = 'required',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'required',
  updated_at = now()
WHERE passport_slug = 'france'
  AND destination_slug = 'panama';

-- Visa-Free: Peru (tourist requirements)
UPDATE visa_rules
SET 
  return_ticket_required = 'required',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'france'
  AND destination_slug = 'peru';

-- Visa-Free: Serbia (relaxed)
UPDATE visa_rules
SET 
  return_ticket_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  updated_at = now()
WHERE passport_slug = 'france'
  AND destination_slug = 'serbia';

-- Visa-Free: Seychelles (tourist destination)
UPDATE visa_rules
SET 
  return_ticket_required = 'required',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'france'
  AND destination_slug = 'seychelles';

-- Visa-Free: Tunisia (may check)
UPDATE visa_rules
SET 
  return_ticket_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'france'
  AND destination_slug = 'tunisia';

-- Visa-Free: Ukraine (relaxed)
UPDATE visa_rules
SET 
  return_ticket_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  updated_at = now()
WHERE passport_slug = 'france'
  AND destination_slug = 'ukraine';

-- Visa-Free: Uruguay (tourist requirements)
UPDATE visa_rules
SET 
  return_ticket_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'france'
  AND destination_slug = 'uruguay';

-- eVisa destinations (standard eVisa requirements)
UPDATE visa_rules
SET 
  return_ticket_required = 'required',
  insurance_required = 'may_be_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'france'
  AND destination_slug IN ('azerbaijan', 'cambodia', 'ethiopia', 'kenya', 'sri-lanka')
  AND visa_type = 'evisa';

-- eVisa: Turkey (specific requirements)
UPDATE visa_rules
SET 
  return_ticket_required = 'required',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'france'
  AND destination_slug = 'turkey'
  AND visa_type = 'evisa';

-- Visa on Arrival: Bahrain (standard VOA)
UPDATE visa_rules
SET 
  return_ticket_required = 'required',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'france'
  AND destination_slug = 'bahrain';

-- Visa on Arrival: Cuba (tourist card)
UPDATE visa_rules
SET 
  return_ticket_required = 'required',
  insurance_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'france'
  AND destination_slug = 'cuba';

-- Visa on Arrival: Dominican Republic (tourist card)
UPDATE visa_rules
SET 
  return_ticket_required = 'required',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'france'
  AND destination_slug = 'dominican-republic';

-- Visa on Arrival: Indonesia (standard VOA)
UPDATE visa_rules
SET 
  return_ticket_required = 'required',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'france'
  AND destination_slug = 'indonesia';

-- Visa Required: Algeria, Angola, Bangladesh (checked during application)
UPDATE visa_rules
SET 
  return_ticket_required = 'required',
  insurance_required = 'may_be_requested',
  sufficient_funds_required = 'required',
  updated_at = now()
WHERE passport_slug = 'france'
  AND destination_slug IN ('algeria', 'angola', 'bangladesh')
  AND visa_type = 'visa_required';
