/*
  # Fix final NULL max_stay_days entries

  ## Changes

  1. Israel → Malaysia: Malaysia prohibits Israeli passport holders from entry.
     This should be 'restricted' not 'visa_required'. Correcting the type and
     setting NULL stay (entry not permitted).

  2. Morocco → Switzerland: Switzerland is Schengen. Standard C-visa = 90 days.

  3. Morocco → UK: UK standard visitor visa = 6 months (180 days).

  4. Nigeria → Israel: Israel grants 90-day tourist visa to Nigerians.

  5. Peru → UK: UK standard visitor visa = 6 months (180 days).

  6. Saudi Arabia → USA: B-1/B-2 visa standard = 180 days per entry.

  7. Turkey → Israel: Turkey suspended diplomatic relations but visas are available
     through third parties. Standard tourist stay = 90 days if granted.

  ## Sources
  - Malaysia Immigration: No diplomatic relations with Israel; entry prohibited
  - UK Home Office (gov.uk/standard-visitor-visa)
  - Israel Population and Immigration Authority (piba.gov.il)
  - U.S. State Department (travel.state.gov)
*/

UPDATE visa_rules
SET
  visa_type = 'restricted',
  max_stay_days = NULL,
  notes = 'Israeli passport holders are not permitted to enter Malaysia. Malaysia does not recognize Israeli passports. Dual nationals holding another passport may apply separately.'
WHERE passport_slug = 'israel'
  AND destination_slug = 'malaysia'
  AND visa_type = 'visa_required';

UPDATE visa_rules
SET max_stay_days = 90
WHERE passport_slug = 'morocco'
  AND destination_slug = 'switzerland';

UPDATE visa_rules
SET max_stay_days = 180
WHERE passport_slug IN ('morocco', 'peru')
  AND destination_slug = 'united-kingdom'
  AND visa_type = 'visa_required';

UPDATE visa_rules
SET max_stay_days = 90
WHERE passport_slug = 'nigeria'
  AND destination_slug = 'israel';

UPDATE visa_rules
SET max_stay_days = 180
WHERE passport_slug = 'saudi-arabia'
  AND destination_slug = 'united-states';

UPDATE visa_rules
SET max_stay_days = 90
WHERE passport_slug = 'turkey'
  AND destination_slug = 'israel';
