
/*
  # Fix China Inbound Visa Rules

  ## Summary
  Corrects multiple errors in visa rules for foreign passport holders traveling to China.

  ## Changes

  1. Austria, Belgium, Chile - fix transit_required = true → false and fix incorrect stay_rule text
  2. Switzerland, Croatia, Czech Republic, Greece, Hungary, Portugal, New Zealand, Colombia - 
     change visa_required → visa_free 15 days (China's unilateral visa-free policy for these countries)
  3. Saudi Arabia - change visa_required → visa_free 30 days (China granted in 2024)
  4. Qatar - change visa_required → visa_free 30 days (China granted visa-free)
  5. Japan - remove stay_window_days (30-day cap is per-stay, not a rolling 180-day window)
*/

-- Austria → China: fix transit_required and stay_rule
UPDATE visa_rules
SET transit_required = false,
    stay_rule = 'Visa-free entry for Austrian ordinary passport holders: up to 15 days per stay under China unilateral policy (2024)',
    notes = 'Visa-free under China unilateral policy for EU nationals (2024). Max 15 days.',
    updated_at = now()
WHERE passport_slug = 'austria' AND destination_slug = 'china';

-- Belgium → China: fix transit_required and stay_rule
UPDATE visa_rules
SET transit_required = false,
    stay_rule = 'Visa-free entry for Belgian ordinary passport holders: up to 15 days per stay under China unilateral policy (2024)',
    notes = 'Visa-free under China unilateral policy for EU nationals (2024). Max 15 days.',
    updated_at = now()
WHERE passport_slug = 'belgium' AND destination_slug = 'china';

-- Chile → China: fix transit_required and stay_rule
UPDATE visa_rules
SET transit_required = false,
    stay_rule = 'Visa-free entry for Chilean ordinary passport holders: up to 15 days per stay under China unilateral policy (2024)',
    notes = 'Visa-free under 2024 mutual agreement. Max 15 days per stay.',
    updated_at = now()
WHERE passport_slug = 'chile' AND destination_slug = 'china';

-- Switzerland → China: visa_free 15 days
UPDATE visa_rules
SET visa_type = 'visa_free',
    max_stay_days = 15,
    stay_rule = 'Visa-free entry for Swiss ordinary passport holders: up to 15 days per stay under China unilateral policy (2024)',
    passport_validity_months = 6,
    transit_required = false,
    insurance_required = false,
    return_ticket_required = true,
    sufficient_funds_required = true,
    notes = 'Visa-free under China unilateral visa-free policy. Max 15 days.',
    updated_at = now()
WHERE passport_slug = 'switzerland' AND destination_slug = 'china';

-- Croatia → China: visa_free 15 days
UPDATE visa_rules
SET visa_type = 'visa_free',
    max_stay_days = 15,
    stay_rule = 'Visa-free entry for Croatian ordinary passport holders: up to 15 days per stay under China unilateral policy (2024)',
    passport_validity_months = 6,
    transit_required = false,
    insurance_required = false,
    return_ticket_required = true,
    sufficient_funds_required = true,
    notes = 'Visa-free under China unilateral policy for EU nationals (2024). Max 15 days.',
    updated_at = now()
WHERE passport_slug = 'croatia' AND destination_slug = 'china';

-- Czech Republic → China: visa_free 15 days
UPDATE visa_rules
SET visa_type = 'visa_free',
    max_stay_days = 15,
    stay_rule = 'Visa-free entry for Czech ordinary passport holders: up to 15 days per stay under China unilateral policy (2024)',
    passport_validity_months = 6,
    transit_required = false,
    insurance_required = false,
    return_ticket_required = true,
    sufficient_funds_required = true,
    notes = 'Visa-free under China unilateral policy for EU nationals (2024). Max 15 days.',
    updated_at = now()
WHERE passport_slug = 'czech-republic' AND destination_slug = 'china';

-- Greece → China: visa_free 15 days
UPDATE visa_rules
SET visa_type = 'visa_free',
    max_stay_days = 15,
    stay_rule = 'Visa-free entry for Greek ordinary passport holders: up to 15 days per stay under China unilateral policy (2024)',
    passport_validity_months = 6,
    transit_required = false,
    insurance_required = false,
    return_ticket_required = true,
    sufficient_funds_required = true,
    notes = 'Visa-free under China unilateral policy for EU nationals (2024). Max 15 days.',
    updated_at = now()
WHERE passport_slug = 'greece' AND destination_slug = 'china';

-- Hungary → China: visa_free 15 days
UPDATE visa_rules
SET visa_type = 'visa_free',
    max_stay_days = 15,
    stay_rule = 'Visa-free entry for Hungarian ordinary passport holders: up to 15 days per stay under China unilateral policy (2024)',
    passport_validity_months = 6,
    transit_required = false,
    insurance_required = false,
    return_ticket_required = true,
    sufficient_funds_required = true,
    notes = 'Visa-free under China unilateral policy for EU nationals (2024). Max 15 days.',
    updated_at = now()
WHERE passport_slug = 'hungary' AND destination_slug = 'china';

-- Portugal → China: visa_free 15 days
UPDATE visa_rules
SET visa_type = 'visa_free',
    max_stay_days = 15,
    stay_rule = 'Visa-free entry for Portuguese ordinary passport holders: up to 15 days per stay under China unilateral policy (2024)',
    passport_validity_months = 6,
    transit_required = false,
    insurance_required = false,
    return_ticket_required = true,
    sufficient_funds_required = true,
    notes = 'Visa-free under China unilateral policy for EU nationals (2024). Max 15 days.',
    updated_at = now()
WHERE passport_slug = 'portugal' AND destination_slug = 'china';

-- New Zealand → China: visa_free 15 days
UPDATE visa_rules
SET visa_type = 'visa_free',
    max_stay_days = 15,
    stay_rule = 'Visa-free entry for New Zealand ordinary passport holders: up to 15 days per stay under China unilateral policy (2024)',
    passport_validity_months = 6,
    transit_required = false,
    insurance_required = false,
    return_ticket_required = true,
    sufficient_funds_required = true,
    notes = 'Visa-free under China unilateral visa-free policy (2024). Max 15 days.',
    updated_at = now()
WHERE passport_slug = 'new-zealand' AND destination_slug = 'china';

-- Colombia → China: visa_free 15 days (2024 unilateral policy)
UPDATE visa_rules
SET visa_type = 'visa_free',
    max_stay_days = 15,
    stay_rule = 'Visa-free entry for Colombian ordinary passport holders: up to 15 days per stay under China unilateral policy (2024)',
    passport_validity_months = 6,
    transit_required = false,
    insurance_required = false,
    return_ticket_required = true,
    sufficient_funds_required = true,
    notes = 'Visa-free under China unilateral policy (2024). Max 15 days.',
    updated_at = now()
WHERE passport_slug = 'colombia' AND destination_slug = 'china';

-- Saudi Arabia → China: visa_free 30 days (2024)
UPDATE visa_rules
SET visa_type = 'visa_free',
    max_stay_days = 30,
    stay_rule = 'Visa-free entry for Saudi ordinary passport holders: up to 30 days per stay under China unilateral policy (2024)',
    passport_validity_months = 6,
    transit_required = false,
    insurance_required = false,
    return_ticket_required = true,
    sufficient_funds_required = true,
    notes = 'Visa-free under China unilateral visa-free policy (2024). Max 30 days.',
    updated_at = now()
WHERE passport_slug = 'saudi-arabia' AND destination_slug = 'china';

-- Qatar → China: visa_free 30 days
UPDATE visa_rules
SET visa_type = 'visa_free',
    max_stay_days = 30,
    stay_rule = 'Visa-free entry for Qatari ordinary passport holders: up to 30 days per stay under China unilateral policy',
    passport_validity_months = 6,
    transit_required = false,
    insurance_required = false,
    return_ticket_required = true,
    sufficient_funds_required = true,
    notes = 'Visa-free under China unilateral visa-free policy. Max 30 days.',
    updated_at = now()
WHERE passport_slug = 'qatar' AND destination_slug = 'china';

-- Japan → China: remove incorrect stay_window_days (per-stay cap, not rolling window)
UPDATE visa_rules
SET stay_window_days = NULL,
    updated_at = now()
WHERE passport_slug = 'japan' AND destination_slug = 'china';
