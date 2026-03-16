/*
  # Batch 1 Audit Fix: China visa-free duration for all G7 passports - standardize to 30 days

  ## Changes
  All G7 passport holders now receive 30 days visa-free entry to China under the
  expanded unilateral visa-free policy (extended through December 31, 2026).

  Previous incorrect values:
  - USA: 90 days → 30 days
  - Australia: 90 days → 30 days
  - France: 15 days → 30 days
  - Germany: 15 days → 30 days
  - United Kingdom: 15 days → 30 days (UK added February 17, 2026)
  - Canada: 15 days → 30 days (Canada added February 17, 2026)
  - Japan: 15 days → 30 days

  ## Sources
  - China Ministry of Foreign Affairs, China Briefing, VisaHQ China news Feb 2026
  - TravelChinaGuide, PassportIndex, Chinese Embassy Los Angeles
*/

UPDATE visa_rules
SET
  max_stay_days = 30,
  notes = 'Unilateral visa-free entry under expanded policy, valid through December 31, 2026. Maximum 30 days per visit. Policy is time-limited — verify current status before travel.'
WHERE destination_slug = 'china'
  AND passport_slug IN ('united-states', 'australia', 'france', 'germany', 'united-kingdom', 'canada', 'japan');
