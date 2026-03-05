/*
  # Fix Australia Data Corrections

  ## Summary
  Comprehensive data quality fixes for Australia as both passport and destination.

  ## Changes

  ### 1. Remove self-entry row
  - Removes the australia -> australia row (domestic entry, not a valid visa rule)

  ### 2. Fix inbound visa types
  - switzerland -> australia: corrected from evisa to visa_free_eta (eVisitor subclass 651 eligible)
  - turkey -> australia: corrected from evisa to visa_required (Turkey is NOT eVisitor eligible)

  ### 3. Fix inbound passport_validity_months (0 -> 6)
  - canada, france, germany, italy, netherlands, poland, singapore, south-korea, spain, switzerland, united-kingdom, united-states

  ### 4. Fix outbound passport_validity_months (0 -> 6)
  - brazil, canada, chile, china, colombia, japan, mexico, south-korea

  ### 5. Fix outbound visa types
  - australia -> south-korea: visa_free_eta -> visa_free (K-ETA suspended)
  - australia -> qatar: visa_on_arrival -> visa_free (visa-free entry for Australian passport)
  - australia -> uae: visa_on_arrival -> visa_free (no fee/pre-registration required)

  ### 6. Add stay_window_days for Schengen and Turkey
  - All Schengen destinations: stay_window_days = 180 (90/180 rule)
  - australia -> turkey: stay_window_days = 180

  ### 7. Fix australia -> india max_stay_days
  - Set max_stay_days = 90 (standard e-Tourist visa / Visitor category)
*/

-- 1. Remove self-entry row
DELETE FROM visa_rules
WHERE passport_slug = 'australia' AND destination_slug = 'australia';

-- 2. Fix switzerland -> australia: evisa -> visa_free_eta
UPDATE visa_rules
SET visa_type = 'visa_free_eta',
    passport_validity_months = 6,
    notes = 'eVisitor (subclass 651) required before travel. Free online application.',
    stay_rule = 'eVisitor (subclass 651) required before travel'
WHERE passport_slug = 'switzerland' AND destination_slug = 'australia';

-- 3. Fix turkey -> australia: evisa -> visa_required
UPDATE visa_rules
SET visa_type = 'visa_required',
    notes = 'Turkish citizens are not eligible for eVisitor or ETA. Visitor visa (subclass 600) required prior to travel.',
    stay_rule = 'Visitor visa (subclass 600) required prior to travel'
WHERE passport_slug = 'turkey' AND destination_slug = 'australia';

-- 4. Fix inbound passport_validity_months = 0 -> 6 for eVisitor/ETA eligible passports
UPDATE visa_rules
SET passport_validity_months = 6
WHERE destination_slug = 'australia'
  AND passport_validity_months = 0
  AND passport_slug IN (
    'canada', 'france', 'germany', 'italy', 'netherlands',
    'poland', 'singapore', 'south-korea', 'spain',
    'united-kingdom', 'united-states'
  );

-- 5. Fix outbound passport_validity_months = 0 -> 6 for Australia passport
UPDATE visa_rules
SET passport_validity_months = 6
WHERE passport_slug = 'australia'
  AND passport_validity_months = 0
  AND destination_slug IN (
    'brazil', 'canada', 'chile', 'china', 'colombia',
    'japan', 'mexico', 'south-korea'
  );

-- 6a. Fix australia -> south-korea: visa_free_eta -> visa_free (K-ETA suspended)
UPDATE visa_rules
SET visa_type = 'visa_free',
    notes = 'K-ETA requirement suspended; visa-free entry for tourism/business.',
    stay_rule = 'Visa-free entry; K-ETA suspended (verify current status)'
WHERE passport_slug = 'australia' AND destination_slug = 'south-korea';

-- 6b. Fix australia -> qatar: visa_on_arrival -> visa_free
UPDATE visa_rules
SET visa_type = 'visa_free',
    notes = 'Australian passport holders receive visa-free entry.',
    stay_rule = 'Visa-free entry for eligible nationalities'
WHERE passport_slug = 'australia' AND destination_slug = 'qatar';

-- 6c. Fix australia -> uae: visa_on_arrival -> visa_free
UPDATE visa_rules
SET visa_type = 'visa_free',
    notes = 'Australian citizens receive a free visa-on-arrival stamp; no pre-registration or fee required.',
    stay_rule = 'Visa-free entry; 90-day stamp granted on arrival'
WHERE passport_slug = 'australia' AND destination_slug = 'united-arab-emirates';

-- 7. Add stay_window_days = 180 for all Schengen destinations (australia passport)
UPDATE visa_rules
SET stay_window_days = 180
WHERE passport_slug = 'australia'
  AND destination_slug IN (
    'austria', 'belgium', 'croatia', 'czech-republic', 'france',
    'germany', 'greece', 'hungary', 'italy', 'netherlands',
    'poland', 'portugal', 'spain', 'switzerland'
  );

-- 8. Add stay_window_days = 180 for australia -> turkey
UPDATE visa_rules
SET stay_window_days = 180
WHERE passport_slug = 'australia' AND destination_slug = 'turkey';

-- 9. Fix australia -> india max_stay_days (null -> 90)
UPDATE visa_rules
SET max_stay_days = 90,
    notes = 'eVisa available online; duration depends on category (e-Tourist: 30 or 90 days).',
    stay_rule = 'India eVisa required; e-Tourist visa valid for 30 or 90 days depending on subtype'
WHERE passport_slug = 'australia' AND destination_slug = 'india';
