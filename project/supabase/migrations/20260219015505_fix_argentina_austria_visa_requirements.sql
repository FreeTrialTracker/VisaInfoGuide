/*
  # Fix Argentina to Austria Visa Requirements

  1. Updates
    - Update insurance_required from true to false (not mandatory at border for visa-free entry)
    - Update return_ticket_required from false to true (can be requested at border officer's discretion)
    - Add comprehensive notes about ETIAS requirement starting late 2026
    - Update last_verified date to 2026-02-19

  2. Corrections Made
    - Insurance required: Changed from true to false (strongly recommended but not mandatory for visa-free entry)
    - Return ticket: Changed from false to true (may be requested at border control)
    - Notes: Added critical ETIAS information for 2026 implementation
    - Maintained correct information: visa_free status, 90/180 rule, 3-month passport validity
*/

UPDATE visa_rules
SET 
  insurance_required = false,
  return_ticket_required = true,
  notes = 'Visa-free nationality under EU visa policy. IMPORTANT: From late 2026, Argentine nationals will be required to obtain an ETIAS (European Travel Information and Authorization System) authorization before traveling to Schengen countries. While travel insurance is not mandatory for visa-free entry, it is strongly recommended. Return ticket or proof of onward travel may be requested by border officers at their discretion.',
  last_verified = '2026-02-19',
  updated_at = now()
WHERE passport_slug = 'argentina' 
AND destination_slug = 'austria';
