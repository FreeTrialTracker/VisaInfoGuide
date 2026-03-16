
/*
  # Update China Visa-Free Rules for 50-Country Programme (February 17, 2026)

  ## Summary
  China expanded its unilateral visa-free entry programme to 50 countries effective
  February 17, 2026. This migration corrects all passport–China visa rules that were
  previously marked as visa_required but are now visa_free under the new policy.

  ## Countries Updated to Visa-Free (30 days, valid until December 31, 2026)
  - France (was: visa_required → visa_free, 30 days)
  - Finland (was: visa_required → visa_free, 30 days)
  - Norway (was: visa_required → visa_free, 30 days)
  - Ireland (was: visa_required → visa_free, 30 days)
  - Denmark (was: visa_required → visa_free, 30 days)
  - Sweden (was: visa_required → visa_free, 30 days)
  - Romania (was: visa_required → visa_free, 30 days)
  - Peru (was: visa_required → visa_free, 30 days)

  ## Countries Updated: Stay Extended to 30 Days
  - Greece (was: 15 days → 30 days)
  - Hungary (was: 15 days → 30 days)
  - Portugal (was: 15 days → 30 days)
  - New Zealand (was: 15 days → 30 days)
  - Switzerland (was: 15 days → 30 days)
  - Argentina (was: 15 days → 30 days)
  - Israel (was: 15 days → 30 days)

  ## Czech Republic
  - Corrected to visa_free (was listed as visa_required due to outdated data)

  ## Notes
  - Policy confirmed valid until December 31, 2026
  - All eligible nationalities get up to 30 days per visit, multiple entries, no advance declaration
  - United States remains visa_required
  - last_verified updated to 2026-02-17 for all updated rows
*/

UPDATE visa_rules
SET
  visa_type = 'visa_free',
  max_stay_days = 30,
  notes = 'TEMPORARY unilateral visa-free entry policy valid until December 31, 2026. Listed among 50 eligible countries announced February 17, 2026. 30 days per visit for tourism, business, family visits, cultural exchanges, and transit. Multiple entries permitted, no restriction on total visits. No advance declaration required. Passport valid at least 6 months beyond entry date. Carry proof of onward travel and accommodation. Digital Arrival Card required. Police registration within 24 hours (hotels handle automatically). Tibet requires separate permit. Outside this window, standard tourist (L) or business (M) visa required.',
  last_verified = '2026-02-17'
WHERE destination_slug = 'china'
  AND passport_slug IN ('france', 'finland', 'norway', 'ireland', 'denmark', 'sweden', 'romania', 'peru');

UPDATE visa_rules
SET
  visa_type = 'visa_free',
  max_stay_days = 30,
  notes = 'TEMPORARY unilateral visa-free entry policy valid until December 31, 2026. Czech Republic listed among 50 eligible countries announced February 17, 2026. 30 days per visit. Multiple entries permitted. Digital Arrival Card required on entry. Police registration within 24 hours. Tibet requires separate permit.',
  last_verified = '2026-02-17'
WHERE destination_slug = 'china'
  AND passport_slug = 'czech-republic';

UPDATE visa_rules
SET
  max_stay_days = 30,
  notes = 'Visa-free under China unilateral visa-free programme expanded to 50 countries (February 17, 2026). 30 days per visit (upgraded from 15 days). Multiple entries, no advance declaration. Digital Arrival Card required. Police registration within 24 hours. Tibet requires separate permit. Policy valid until December 31, 2026.',
  last_verified = '2026-02-17'
WHERE destination_slug = 'china'
  AND passport_slug IN ('greece', 'hungary', 'portugal', 'new-zealand', 'switzerland', 'argentina', 'israel');

UPDATE visa_rules
SET
  notes = 'TEMPORARY unilateral visa-free entry policy valid until December 31, 2026. United Kingdom among 50 eligible countries — effective February 17, 2026. 30 days per visit for tourism, business, family visits, cultural exchanges, and transit. Multiple entries permitted, no restriction on total visits. No advance declaration required. Passport valid at least 6 months beyond entry date with at least 2 blank pages. Carry proof of onward travel and accommodation. Digital Arrival Card required on entry. Police registration within 24 hours (hotels handle automatically). Tibet requires separate Tourist Permit. Global Affairs and FCDO advise caution regarding broad national security laws. Outside this window, standard tourist (L) or business (M) visa required.',
  last_verified = '2026-02-17'
WHERE destination_slug = 'china'
  AND passport_slug = 'united-kingdom';

UPDATE visa_rules
SET
  notes = 'TEMPORARY unilateral visa-free entry policy valid until December 31, 2026. Canada among 50 eligible countries — effective February 17, 2026. 30 days per visit for tourism, business, family visits, cultural exchanges, and transit. Multiple entries permitted, no restriction on total visits. No advance declaration required. Passport valid at least 6 months beyond entry date. Carry proof of onward travel and accommodation. Digital Arrival Card required on entry. Police registration within 24 hours (hotels handle automatically). Global Affairs Canada advises HIGH DEGREE OF CAUTION given risk of arbitrary enforcement of local laws and elevated detention risk for Canadian nationals given prior bilateral tensions. Tibet requires separate permit. Outside this window, standard tourist (L) or business (M) visa required.',
  last_verified = '2026-02-17'
WHERE destination_slug = 'china'
  AND passport_slug = 'canada';
