/*
  # Complete Remaining France Entry Conditions
  
  This migration completes the final 13 France passport destination records
  that were missed in the previous migration.
  
  ## Changes Made
  
  Completing entry conditions for:
  - Ghana (visa_required)
  - Jamaica (visa_free)
  - Kuwait (visa_required)
  - Laos (visa_on_arrival)
  - Myanmar (evisa)
  - Nepal (visa_on_arrival)
  - Oman (evisa)
  - Pakistan (visa_required)
  - Paraguay (visa_free)
  - Tanzania (evisa)
  - Turkmenistan (visa_required)
  - Uzbekistan (visa_free)
  - Zimbabwe (visa_on_arrival)
*/

-- Visa-Free: Jamaica (tourist requirements)
UPDATE visa_rules
SET 
  return_ticket_required = 'required',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'france'
  AND destination_slug = 'jamaica';

-- Visa-Free: Paraguay (relaxed)
UPDATE visa_rules
SET 
  return_ticket_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'france'
  AND destination_slug = 'paraguay';

-- Visa-Free: Uzbekistan (relaxed)
UPDATE visa_rules
SET 
  return_ticket_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  updated_at = now()
WHERE passport_slug = 'france'
  AND destination_slug = 'uzbekistan';

-- eVisa: Myanmar, Oman, Tanzania (standard eVisa requirements)
UPDATE visa_rules
SET 
  return_ticket_required = 'required',
  insurance_required = 'may_be_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'france'
  AND destination_slug IN ('myanmar', 'oman', 'tanzania')
  AND visa_type = 'evisa';

-- Visa on Arrival: Laos (relaxed VOA)
UPDATE visa_rules
SET 
  return_ticket_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'france'
  AND destination_slug = 'laos';

-- Visa on Arrival: Nepal (relaxed VOA)
UPDATE visa_rules
SET 
  return_ticket_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'france'
  AND destination_slug = 'nepal';

-- Visa on Arrival: Zimbabwe (may check)
UPDATE visa_rules
SET 
  return_ticket_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  sufficient_funds_required = 'may_be_requested',
  updated_at = now()
WHERE passport_slug = 'france'
  AND destination_slug = 'zimbabwe';

-- Visa Required: Ghana, Kuwait, Pakistan, Turkmenistan (checked during visa application)
UPDATE visa_rules
SET 
  return_ticket_required = 'required',
  insurance_required = 'may_be_requested',
  sufficient_funds_required = 'required',
  updated_at = now()
WHERE passport_slug = 'france'
  AND destination_slug IN ('ghana', 'kuwait', 'pakistan', 'turkmenistan')
  AND visa_type = 'visa_required';
