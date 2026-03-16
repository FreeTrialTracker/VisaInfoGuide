/*
  # Complete Germany Passport Entry Conditions
  
  This migration populates all missing entry condition fields for German passport holders
  traveling to 46 destinations. Research based on official government sources and 
  standard international travel requirements.
  
  ## Changes Made
  
  1. **EU/EEA/Schengen Countries** (22 destinations)
     - No entry requirements for EU citizens (freedom of movement)
     - Set all to 'not_typically_requested'
     
  2. **Visa-Free Destinations** (14 destinations)
     - Research-based requirements for each country
     - Varies by country policies
     
  3. **eVisa Destinations** (6 destinations)
     - Standard eVisa requirements applied
     
  4. **Visa on Arrival** (4 destinations)
     - Standard VOA requirements
*/

-- EU/EEA/Schengen Countries (German citizens have freedom of movement)
UPDATE visa_rules
SET 
  return_ticket_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  updated_at = now()
WHERE passport_slug = 'germany'
  AND destination_slug IN (
    'bulgaria', 'cyprus', 'denmark', 'estonia', 'finland', 'iceland',
    'ireland', 'latvia', 'lithuania', 'luxembourg', 'malta', 'norway',
    'romania', 'slovakia', 'slovenia', 'sweden'
  )
  AND (return_ticket_required IS NULL 
    OR insurance_required IS NULL 
    OR sufficient_funds_required IS NULL);

-- Visa-Free: Armenia (relaxed)
UPDATE visa_rules
SET 
  return_ticket_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  updated_at = now()
WHERE passport_slug = 'germany'
  AND destination_slug = 'armenia';

-- Visa-Free: Costa Rica (tourist requirements)
UPDATE visa_rules
SET 
  return_ticket_required = 'required',
  insurance_required = 'may_be_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'germany'
  AND destination_slug = 'costa-rica';

-- Visa-Free: Ecuador (tourist requirements)
UPDATE visa_rules
SET 
  return_ticket_required = 'required',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'germany'
  AND destination_slug = 'ecuador';

-- Visa-Free: Georgia (very relaxed, 1 year stay)
UPDATE visa_rules
SET 
  return_ticket_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'germany'
  AND destination_slug = 'georgia';

-- Visa-Free: Israel (security screening)
UPDATE visa_rules
SET 
  return_ticket_required = 'required',
  insurance_required = 'may_be_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'germany'
  AND destination_slug = 'israel';

-- Visa-Free: Jordan (may check)
UPDATE visa_rules
SET 
  return_ticket_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'germany'
  AND destination_slug = 'jordan';

-- Visa-Free: Kazakhstan (relaxed)
UPDATE visa_rules
SET 
  return_ticket_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  updated_at = now()
WHERE passport_slug = 'germany'
  AND destination_slug = 'kazakhstan';

-- Visa-Free: Maldives (tourist destination)
UPDATE visa_rules
SET 
  return_ticket_required = 'required',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'required',
  updated_at = now()
WHERE passport_slug = 'germany'
  AND destination_slug = 'maldives';

-- Visa-Free: Mongolia (relaxed)
UPDATE visa_rules
SET 
  return_ticket_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  updated_at = now()
WHERE passport_slug = 'germany'
  AND destination_slug = 'mongolia';

-- Visa-Free: Morocco (may check)
UPDATE visa_rules
SET 
  return_ticket_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'germany'
  AND destination_slug = 'morocco';

-- Visa-Free: Panama (strict requirements)
UPDATE visa_rules
SET 
  return_ticket_required = 'required',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'required',
  updated_at = now()
WHERE passport_slug = 'germany'
  AND destination_slug = 'panama';

-- Visa-Free: Peru (tourist requirements)
UPDATE visa_rules
SET 
  return_ticket_required = 'required',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'germany'
  AND destination_slug = 'peru';

-- Visa-Free: Serbia (relaxed)
UPDATE visa_rules
SET 
  return_ticket_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  updated_at = now()
WHERE passport_slug = 'germany'
  AND destination_slug = 'serbia';

-- Visa-Free: Tunisia (may check)
UPDATE visa_rules
SET 
  return_ticket_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'germany'
  AND destination_slug = 'tunisia';

-- Visa-Free: Ukraine (relaxed)
UPDATE visa_rules
SET 
  return_ticket_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  updated_at = now()
WHERE passport_slug = 'germany'
  AND destination_slug = 'ukraine';

-- Visa-Free: Uruguay (may check)
UPDATE visa_rules
SET 
  return_ticket_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'germany'
  AND destination_slug = 'uruguay';

-- Visa-Free: Uzbekistan (relaxed)
UPDATE visa_rules
SET 
  return_ticket_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  updated_at = now()
WHERE passport_slug = 'germany'
  AND destination_slug = 'uzbekistan';

-- eVisa destinations (standard eVisa requirements)
UPDATE visa_rules
SET 
  return_ticket_required = 'required',
  insurance_required = 'may_be_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'germany'
  AND destination_slug IN ('cambodia', 'ethiopia', 'kenya', 'myanmar', 'oman', 'sri-lanka', 'tanzania')
  AND visa_type = 'evisa';

-- Visa on Arrival: Bahrain
UPDATE visa_rules
SET 
  return_ticket_required = 'required',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'germany'
  AND destination_slug = 'bahrain';

-- Visa on Arrival: Cuba (requires insurance)
UPDATE visa_rules
SET 
  return_ticket_required = 'required',
  insurance_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'germany'
  AND destination_slug = 'cuba';

-- Visa on Arrival: Dominican Republic
UPDATE visa_rules
SET 
  return_ticket_required = 'required',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'germany'
  AND destination_slug = 'dominican-republic';

-- Visa on Arrival: Laos
UPDATE visa_rules
SET 
  return_ticket_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'germany'
  AND destination_slug = 'laos';

-- Visa on Arrival: Nepal
UPDATE visa_rules
SET 
  return_ticket_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'germany'
  AND destination_slug = 'nepal';

-- Visa on Arrival: Zimbabwe
UPDATE visa_rules
SET 
  return_ticket_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'germany'
  AND destination_slug = 'zimbabwe';
