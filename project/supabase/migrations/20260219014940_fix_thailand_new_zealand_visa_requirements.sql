/*
  # Fix Thailand to New Zealand Visa Requirements

  1. Updates
    - Correct maximum stay from 90 days to 270 days (9 months)
    - Add passport validity requirement of 3 months beyond departure date
    - Update transit visa requirement from false to true (transit visa IS required)
    - Update stay rule to reflect accurate 9-month maximum stay within 18-month period
    - Update notes with accurate information
    - Maintain last_verified date as 2026-02-19

  2. Corrections Made
    - Maximum stay: Changed from 90 to 270 days (9 months is the standard visitor visa duration)
    - Passport validity: Changed from NULL to 3 months
    - Transit required: Changed from false to true
    - Stay rule: Updated to reflect 9 months within 18-month period
    - Notes: Updated with comprehensive and accurate information
*/

UPDATE visa_rules
SET 
  max_stay_days = 270,
  passport_validity_months = 3,
  transit_required = true,
  stay_rule = 'Visitor Visa allows up to 9 months stay within an 18-month period',
  notes = 'Thai citizens require a full Visitor Visa (not NZeTA). The standard visitor visa allows stays up to 9 months within an 18-month period. Transit visa is also required even if not leaving the airport. Passport must be valid for at least 3 months beyond departure date.',
  last_verified = '2026-02-19',
  updated_at = now()
WHERE passport_slug = 'thailand' 
AND destination_slug = 'new-zealand';
