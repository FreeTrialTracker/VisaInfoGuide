/*
  # Replace generic Japan->India eVisa row with subtype-specific rows

  ## Summary
  Removes the single generic India evisa row for Japan passport holders and
  replaces it with three rows modelling each eTourist eVisa subtype offered
  by India's online visa portal.

  ## Removed
  - visa_rules WHERE passport_slug='japan' AND destination_slug='india' AND visa_subtype IS NULL

  ## Inserted
  1. eTourist-30  — single entry, stay up to 30 days, validity 30 days from arrival
  2. eTourist-1yr — double entry, stay up to 90 days per visit, validity 1 year from issue
  3. eTourist-5yr — multiple entry, stay up to 90 days per visit, validity 5 years from issue

  ## Notes
  - All three require passport validity ≥ 6 months
  - Official source: https://indianvisaonline.gov.in/evisa/tvoa.html
*/

DELETE FROM visa_rules
WHERE passport_slug = 'japan'
  AND destination_slug = 'india'
  AND visa_subtype IS NULL;

INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, visa_subtype, max_stay_days, stay_rule, passport_validity_months, insurance_required, return_ticket_required, sufficient_funds_required, official_source_url, last_verified, notes)
VALUES
  (
    'japan', 'india', 'evisa', 'eTourist-30',
    30,
    'eTourist eVisa (30-day): single entry; stay up to 30 days; visa validity 30 days from date of arrival.',
    6, false, true, true,
    'https://indianvisaonline.gov.in/evisa/tvoa.html',
    '2026-02-18',
    'Cheapest option for short trips. Cannot be extended or converted. Apply at least 4 days before travel.'
  ),
  (
    'japan', 'india', 'evisa', 'eTourist-1yr',
    90,
    'eTourist eVisa (1-year): double entry; stay up to 90 days per visit; visa validity 1 year from date of issue.',
    6, false, true, true,
    'https://indianvisaonline.gov.in/evisa/tvoa.html',
    '2026-02-18',
    'Good for repeat visitors within a year. Each stay capped at 90 days. Cannot be extended.'
  ),
  (
    'japan', 'india', 'evisa', 'eTourist-5yr',
    90,
    'eTourist eVisa (5-year): multiple entry; stay up to 90 days per visit; visa validity 5 years from date of issue.',
    6, false, true, true,
    'https://indianvisaonline.gov.in/evisa/tvoa.html',
    '2026-02-18',
    'Best value for frequent travellers. Each stay capped at 90 days. Total stay must not exceed 180 days in a calendar year.'
  );
