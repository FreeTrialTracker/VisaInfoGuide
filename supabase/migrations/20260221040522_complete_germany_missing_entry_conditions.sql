/*
  # Complete Germany Passport Missing Entry Conditions

  Updates the 3 remaining incomplete records for Germany passport holders traveling to:
  - Egypt (visa_on_arrival)
  - New Zealand (visa_free_eta)
  - Qatar (visa_free)

  ## Changes Made
  
  1. Germany → Egypt (Visa on Arrival)
     - return_ticket_required: 'may_be_requested'
     - insurance_required: 'may_be_requested' 
     - sufficient_funds_required: 'may_be_requested'
     - passport_validity_requirement: '6_months_beyond_entry'
  
  2. Germany → New Zealand (NZeTA - Electronic Travel Authority)
     - return_ticket_required: 'required'
     - insurance_required: 'may_be_requested'
     - sufficient_funds_required: 'required'
     - passport_validity_requirement: '3_months_beyond_departure'
  
  3. Germany → Qatar (Visa Free)
     - return_ticket_required: 'may_be_requested'
     - insurance_required: 'not_typically_requested'
     - sufficient_funds_required: 'may_be_requested'
     - passport_validity_requirement: '6_months_beyond_entry'

  ## Data Sources
  - Egypt: Official visa on arrival requirements for German citizens
  - New Zealand: NZeTA official requirements (return ticket and funds are strictly required)
  - Qatar: GCC visa-free entry requirements for German nationals
*/

-- Update Germany → Egypt (Visa on Arrival)
UPDATE visa_rules
SET 
  return_ticket_required = 'may_be_requested',
  insurance_required = 'may_be_requested',
  sufficient_funds_required = 'may_be_requested',
  passport_validity_requirement = '6_months_beyond_entry',
  last_verified = now()
WHERE passport_slug = 'germany' 
  AND destination_slug = 'egypt';

-- Update Germany → New Zealand (NZeTA)
UPDATE visa_rules
SET 
  return_ticket_required = 'required',
  insurance_required = 'may_be_requested',
  sufficient_funds_required = 'required',
  passport_validity_requirement = '3_months_beyond_departure',
  last_verified = now()
WHERE passport_slug = 'germany' 
  AND destination_slug = 'new-zealand';

-- Update Germany → Qatar (Visa Free)
UPDATE visa_rules
SET 
  return_ticket_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'may_be_requested',
  passport_validity_requirement = '6_months_beyond_entry',
  last_verified = now()
WHERE passport_slug = 'germany' 
  AND destination_slug = 'qatar';
