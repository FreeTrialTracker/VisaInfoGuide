/*
  # Batch 1 Audit Fix: Singapore stay duration for G7 passports - 30 → 90 days

  ## Changes
  Singapore's Immigration & Checkpoints Authority (ICA) grants 90-day visa-free stays
  to nationals of G7/Western countries. The database incorrectly showed 30 days for
  all passports. Correcting the 7 Batch 1 passports to 90 days.

  Passports updated: USA, UK, Australia, Canada, France, Germany, Japan

  ## Sources
  - Singapore Embassy Canberra (canberra.mfa.gov.sg)
  - Australian Smartraveller, myvisitvisa.com Singapore Entry Requirements 2025
  - VisaHQ Singapore
*/

UPDATE visa_rules
SET
  max_stay_days = 90,
  notes = 'Visa-free entry. G7 and Western passport holders receive 90 days by default. Stay duration is at the discretion of immigration officers.'
WHERE destination_slug = 'singapore'
  AND passport_slug IN ('united-states', 'united-kingdom', 'australia', 'canada', 'france', 'germany', 'japan');
