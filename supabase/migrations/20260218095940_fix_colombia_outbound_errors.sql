
/*
  # Fix Colombia Outbound Passport Errors

  ## Summary
  Corrects several incorrect visa type and stay rules for Colombian passport holders traveling outbound.

  ## Changes
  1. colombia → japan: visa_required → visa_free (90 days, bilateral agreement since 2016)
  2. colombia → south-korea: visa_required → visa_free (90 days, bilateral agreement)
  3. colombia → vietnam: visa_required → visa_free (30 days, Vietnam unilateral 2023)
  4. colombia → united-arab-emirates: visa_required → visa_free (30 days)
  5. colombia → turkey: stays evisa but corrects max_stay_days from 90 → 30
  6. colombia → new-zealand: visa_required → evisa (NZeTA, 90 days)
*/

-- colombia → japan: was visa_required, should be visa_free
UPDATE visa_rules
SET
  visa_type = 'visa_free',
  max_stay_days = 90,
  stay_rule = 'Visa-free short stay',
  notes = 'Visa-free entry for Colombian passport holders under bilateral agreement.',
  transit_required = false,
  return_ticket_required = true,
  sufficient_funds_required = true
WHERE passport_slug = 'colombia' AND destination_slug = 'japan';

-- colombia → south-korea: was visa_required, should be visa_free
UPDATE visa_rules
SET
  visa_type = 'visa_free',
  max_stay_days = 90,
  stay_rule = 'Visa-free short stay',
  notes = 'Visa-free entry for Colombian passport holders under bilateral agreement.',
  transit_required = false,
  return_ticket_required = true,
  sufficient_funds_required = true
WHERE passport_slug = 'colombia' AND destination_slug = 'south-korea';

-- colombia → vietnam: was visa_required/evisa, should be visa_free 30 days
UPDATE visa_rules
SET
  visa_type = 'visa_free',
  max_stay_days = 30,
  stay_rule = 'Visa-free short stay',
  notes = 'Visa-free entry granted by Vietnam unilateral policy (2023).',
  transit_required = false,
  return_ticket_required = true,
  sufficient_funds_required = true
WHERE passport_slug = 'colombia' AND destination_slug = 'vietnam';

-- colombia → united-arab-emirates: was visa_required, should be visa_free 30 days
UPDATE visa_rules
SET
  visa_type = 'visa_free',
  max_stay_days = 30,
  stay_rule = 'Visa-free short stay',
  notes = 'Visa-free entry for Colombian passport holders.',
  transit_required = false,
  insurance_required = false,
  return_ticket_required = true,
  sufficient_funds_required = true
WHERE passport_slug = 'colombia' AND destination_slug = 'united-arab-emirates';

-- colombia → turkey: correct max_stay_days from 90 to 30
UPDATE visa_rules
SET
  max_stay_days = 30,
  stay_rule = 'eVisa required, 30 days per stay',
  notes = 'eVisa required. Apply online. Max 30 days per stay.'
WHERE passport_slug = 'colombia' AND destination_slug = 'turkey';

-- colombia → new-zealand: was visa_required, should be evisa (NZeTA)
UPDATE visa_rules
SET
  visa_type = 'evisa',
  max_stay_days = 90,
  stay_rule = 'NZeTA required',
  notes = 'New Zealand Electronic Travel Authority (NZeTA) required. Apply online.',
  transit_required = false,
  return_ticket_required = true,
  sufficient_funds_required = true
WHERE passport_slug = 'colombia' AND destination_slug = 'new-zealand';
