/*
  # Fix USA → China: visa_type was not updated by previous migration

  ## Issue
  The previous migration (fix_china_g7_30days) updated max_stay_days and notes for all
  G7 passports to China, but the WHERE clause matched on passport_slug only — the
  original USA record had visa_type = 'visa_required' and was not changed to 'visa_free'
  because the UPDATE only touched max_stay_days and notes.

  Additionally, Australia and Canada have a visa_subtype = 'Temporary arrangement' which
  is not a real visa classification — removing those subtypes.

  ## Changes
  - USA → China: visa_type visa_required → visa_free (China's unilateral visa-free policy
    was extended to U.S. nationals effective November 2024 through December 31, 2026)
  - Australia + Canada → China: remove 'Temporary arrangement' visa_subtype (not a real
    classification; the notes field already explains the temporary nature)

  ## Source
  - China MFA statement November 2024, ChinaBriefing.com, VisaHQ China news feed
*/

UPDATE visa_rules
SET
  visa_type = 'visa_free',
  notes = 'Unilateral visa-free entry under expanded policy, valid through December 31, 2026. Maximum 30 days per visit. Policy is time-limited — verify current status before travel.'
WHERE passport_slug = 'united-states'
  AND destination_slug = 'china';

UPDATE visa_rules
SET visa_subtype = NULL
WHERE destination_slug = 'china'
  AND visa_subtype = 'Temporary arrangement';
