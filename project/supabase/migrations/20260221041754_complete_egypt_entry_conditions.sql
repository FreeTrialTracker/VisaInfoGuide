/*
  # Complete Egypt Passport Entry Conditions
  
  This migration populates the 5 missing entry condition fields for Egyptian passport holders.
  
  ## Changes Made
  
  1. **eVisa Destinations** (2 destinations)
     - Ethiopia, Kenya - standard eVisa requirements
     
  2. **Visa-Free Destinations** (3 destinations)
     - Jordan, Morocco, Tunisia - Arab League visa-free travel
*/

-- eVisa: Ethiopia, Kenya (standard eVisa requirements)
UPDATE visa_rules
SET 
  return_ticket_required = 'required',
  insurance_required = 'may_be_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'egypt'
  AND destination_slug IN ('ethiopia', 'kenya')
  AND visa_type = 'evisa';

-- Visa-Free: Jordan (Arab League, relaxed)
UPDATE visa_rules
SET 
  return_ticket_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'egypt'
  AND destination_slug = 'jordan';

-- Visa-Free: Morocco (Arab League, may check)
UPDATE visa_rules
SET 
  return_ticket_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'egypt'
  AND destination_slug = 'morocco';

-- Visa-Free: Tunisia (Arab League, relaxed)
UPDATE visa_rules
SET 
  return_ticket_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'egypt'
  AND destination_slug = 'tunisia';
