
/*
  # Fix Inbound to Colombia Errors

  ## Summary
  Corrects visa types for foreign passport holders entering Colombia.
  Several countries were incorrectly marked as visa_required when they are in fact visa-free.

  ## Changes
  1. china → colombia: visa_required → visa_free (Colombia allows Chinese tourists visa-free)
  2. saudi-arabia → colombia: visa_required → visa_free (90 days)
  3. united-arab-emirates → colombia: visa_required → visa_free (90 days)
  4. turkey → colombia: visa_required → visa_free (90 days)
*/

-- china → colombia: Colombia does not require a visa from Chinese tourists
UPDATE visa_rules
SET
  visa_type = 'visa_free',
  max_stay_days = 90,
  stay_rule = 'Visa-free short stay',
  notes = 'Visa-free entry for Chinese nationals into Colombia.',
  transit_required = false,
  return_ticket_required = true,
  sufficient_funds_required = true
WHERE passport_slug = 'china' AND destination_slug = 'colombia';

-- saudi-arabia → colombia: visa_required → visa_free
UPDATE visa_rules
SET
  visa_type = 'visa_free',
  max_stay_days = 90,
  stay_rule = 'Visa-free short stay',
  notes = 'Visa-free entry for Saudi nationals into Colombia.',
  transit_required = false,
  return_ticket_required = true,
  sufficient_funds_required = true
WHERE passport_slug = 'saudi-arabia' AND destination_slug = 'colombia';

-- united-arab-emirates → colombia: visa_required → visa_free
UPDATE visa_rules
SET
  visa_type = 'visa_free',
  max_stay_days = 90,
  stay_rule = 'Visa-free short stay',
  notes = 'Visa-free entry for UAE nationals into Colombia.',
  transit_required = false,
  return_ticket_required = true,
  sufficient_funds_required = true
WHERE passport_slug = 'united-arab-emirates' AND destination_slug = 'colombia';

-- turkey → colombia: visa_required → visa_free
UPDATE visa_rules
SET
  visa_type = 'visa_free',
  max_stay_days = 90,
  stay_rule = 'Visa-free short stay',
  notes = 'Visa-free entry for Turkish nationals into Colombia.',
  transit_required = false,
  return_ticket_required = true,
  sufficient_funds_required = true
WHERE passport_slug = 'turkey' AND destination_slug = 'colombia';
