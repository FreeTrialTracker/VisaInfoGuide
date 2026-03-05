
/*
  # Fix Belgium Inbound Visa Rules

  ## Changes Made

  1. Add missing stay_window_days = 180 for all non-EU visa_free and visa_required entries
     (Schengen 90/180 rolling window rule applies to all these passports)
  2. Switzerland -> Belgium: Fix passport_validity_months from 0 to NULL (free movement applies)
  3. Malaysia -> Belgium: Changed from visa_required to visa_free (Malaysia became visa-free for Schengen in 2023)

  ## Affected Passports for stay_window_days fix
  brazil, canada, chile, colombia, egypt, india, indonesia, japan, mexico, new-zealand,
  nigeria, philippines, qatar, russia, saudi-arabia, singapore, south-africa, south-korea,
  thailand, turkey, united-arab-emirates, united-kingdom, united-states, vietnam, china, argentina
*/

-- Add stay_window_days = 180 for all applicable passport holders visiting Belgium
-- These are non-EU passports subject to Schengen 90/180 rule
UPDATE visa_rules
SET stay_window_days = 180
WHERE destination_slug = 'belgium'
  AND stay_window_days IS NULL
  AND passport_slug NOT IN (
    'austria','belgium','croatia','czech-republic','france','germany',
    'greece','hungary','italy','netherlands','poland','portugal','spain'
  );

-- Fix Switzerland -> Belgium: free movement, no validity requirement
UPDATE visa_rules
SET passport_validity_months = NULL,
    notes = 'EU-Switzerland free movement agreement applies.'
WHERE passport_slug = 'switzerland' AND destination_slug = 'belgium';

-- Malaysia -> Belgium: visa_free since 2023 (Malaysia added to EU visa-free list)
UPDATE visa_rules
SET visa_type = 'visa_free',
    notes = 'Visa-free short stay. Malaysia added to EU visa-free list in 2023.'
WHERE passport_slug = 'malaysia' AND destination_slug = 'belgium';
