
/*
  # Fix China Outbound Visa Rules

  ## Summary
  Corrects multiple errors in visa rules for Chinese passport holders traveling abroad.

  ## Changes

  1. Brazil - add stay_window_days = 180 (90/180 cumulative rule)
  2. Malaysia - add stay_window_days = 180 (90/180 rule)
  3. Qatar - change visa_required → visa_free (30 days; bilateral since 2023)
  4. UAE - change visa_on_arrival → visa_free (UAE extended full visa-free in 2019)
  5. Vietnam - change to visa_free 30 days (Vietnam granted 30-day visa-free to China in 2023)
  6. Philippines - change visa_required → visa_free 30 days (granted 2023)
  7. South Africa - fix passport_validity_months from 1 → 6
  8. Japan - fix passport_validity_months from 0 → 6
  9. New Zealand - fix passport_validity_months from 3 → 6
  10. South Korea - fix passport_validity_months from 0 → 6
  11. Schengen countries (Croatia, Czech Republic, Greece, Hungary, Netherlands, Poland, Portugal, Austria, Belgium, France, Germany, Italy, Spain, Switzerland) - add stay_window_days = 180
*/

-- Brazil: add stay_window_days
UPDATE visa_rules
SET stay_window_days = 180,
    updated_at = now()
WHERE passport_slug = 'china' AND destination_slug = 'brazil';

-- Malaysia: add stay_window_days
UPDATE visa_rules
SET stay_window_days = 180,
    updated_at = now()
WHERE passport_slug = 'china' AND destination_slug = 'malaysia';

-- Qatar: visa_free 30 days
UPDATE visa_rules
SET visa_type = 'visa_free',
    max_stay_days = 30,
    stay_rule = 'Visa-free for Chinese ordinary passport holders: up to 30 days per stay under bilateral agreement (since 2023)',
    passport_validity_months = 6,
    transit_required = false,
    insurance_required = false,
    return_ticket_required = true,
    sufficient_funds_required = true,
    notes = 'Bilateral visa-free agreement. Entry still subject to officer discretion.',
    updated_at = now()
WHERE passport_slug = 'china' AND destination_slug = 'qatar';

-- UAE: visa_free (not just visa_on_arrival)
UPDATE visa_rules
SET visa_type = 'visa_free',
    stay_rule = 'Visa-free entry for Chinese ordinary passport holders: up to 30 days per stay (UAE extended full visa-free access)',
    notes = 'UAE granted full visa-free (not just VOA) to Chinese passport holders. Extension rules per UAE regulations.',
    updated_at = now()
WHERE passport_slug = 'china' AND destination_slug = 'united-arab-emirates';

-- Vietnam: visa_free 30 days (Vietnam granted 30-day visa-free to Chinese nationals in 2023)
UPDATE visa_rules
SET visa_type = 'visa_free',
    max_stay_days = 30,
    stay_rule = 'Visa-free for Chinese ordinary passport holders: up to 30 days per stay (bilateral visa-free since 2023)',
    passport_validity_months = 6,
    transit_required = false,
    insurance_required = false,
    return_ticket_required = true,
    sufficient_funds_required = true,
    notes = 'Vietnam granted 30-day visa-free entry to Chinese nationals under bilateral agreement. eVisa remains an option for longer stays.',
    updated_at = now()
WHERE passport_slug = 'china' AND destination_slug = 'vietnam';

-- Philippines: visa_free 30 days (granted to Chinese tourists in 2023)
UPDATE visa_rules
SET visa_type = 'visa_free',
    max_stay_days = 30,
    stay_rule = 'Visa-free entry for Chinese ordinary passport holders: up to 30 days per stay',
    passport_validity_months = 6,
    transit_required = false,
    insurance_required = false,
    return_ticket_required = true,
    sufficient_funds_required = true,
    notes = 'Philippines granted visa-free access to Chinese tourists in 2023. Entry subject to immigration officer discretion.',
    updated_at = now()
WHERE passport_slug = 'china' AND destination_slug = 'philippines';

-- South Africa: fix passport_validity_months 1 → 6
UPDATE visa_rules
SET passport_validity_months = 6,
    updated_at = now()
WHERE passport_slug = 'china' AND destination_slug = 'south-africa';

-- Japan: fix passport_validity_months 0 → 6
UPDATE visa_rules
SET passport_validity_months = 6,
    updated_at = now()
WHERE passport_slug = 'china' AND destination_slug = 'japan';

-- New Zealand: fix passport_validity_months 3 → 6
UPDATE visa_rules
SET passport_validity_months = 6,
    updated_at = now()
WHERE passport_slug = 'china' AND destination_slug = 'new-zealand';

-- South Korea: fix passport_validity_months 0 → 6
UPDATE visa_rules
SET passport_validity_months = 6,
    updated_at = now()
WHERE passport_slug = 'china' AND destination_slug = 'south-korea';

-- Schengen countries: add stay_window_days = 180 where missing
UPDATE visa_rules
SET stay_window_days = 180,
    updated_at = now()
WHERE passport_slug = 'china'
  AND destination_slug IN ('croatia', 'czech-republic', 'greece', 'hungary', 'netherlands', 'poland', 'portugal', 'france', 'germany', 'italy', 'spain', 'switzerland')
  AND stay_window_days IS NULL;
