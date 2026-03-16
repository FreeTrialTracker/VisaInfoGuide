/*
  # Fix NULL max_stay_days for key evisa/visa_required entries

  ## Changes

  1. UK → India (evisa): British citizens can apply for an Indian e-Tourist Visa (e-TV)
     which allows a stay of up to 90 days per visit (double entry for 1-year validity,
     triple entry for 5-year validity). Most travelers use the 30-day single-entry
     e-Tourist visa (shorter trips). Setting 90 days as the standard e-TV maximum.

  2. France → Algeria: Visa required; standard tourist stay is up to 90 days.
     (Algeria grants 90-day visas to French nationals.)

  3. France → Angola: Visa required; standard tourist stay up to 30 days.

  4. France → Bangladesh: Visa required; tourist visa typically 30 days.

  5. France → Ghana: Visa required; tourist/visitor visa typically 60 days on arrival
     (Ghana grants visa-on-arrival to many nationalities). Actually updating to visa_on_arrival.

  6. France → Kuwait: Visa required; tourist visas typically issued for 30 days.

  7. France → Pakistan: Visa required; tourist visa typically 30 days.

  8. France → Turkmenistan: Visa required; standard tourist visa up to 30 days.

  ## Sources
  - India e-Visa portal (indianvisaonline.gov.in), UK FCDO India travel advice
  - Algeria consular services, Angola Ministry of Interior
  - Bangladesh e-Visa portal, Kuwait e-Visa, Pakistan e-Visa
*/

UPDATE visa_rules
SET
  max_stay_days = 90,
  visa_subtype = 'e-Tourist Visa',
  notes = 'e-Tourist Visa (e-TV) required. Apply online at indianvisaonline.gov.in before travel. e-TV for UK nationals available for 30-day (single entry), 1-year (double entry), or 5-year (triple entry) validity. Maximum single stay 90 days.'
WHERE passport_slug = 'united-kingdom'
  AND destination_slug = 'india';

UPDATE visa_rules SET max_stay_days = 90
WHERE passport_slug = 'france' AND destination_slug = 'algeria';

UPDATE visa_rules SET max_stay_days = 30
WHERE passport_slug = 'france' AND destination_slug = 'angola';

UPDATE visa_rules SET max_stay_days = 30
WHERE passport_slug = 'france' AND destination_slug = 'bangladesh';

UPDATE visa_rules SET max_stay_days = 30
WHERE passport_slug = 'france' AND destination_slug = 'kuwait';

UPDATE visa_rules SET max_stay_days = 30
WHERE passport_slug = 'france' AND destination_slug = 'pakistan';

UPDATE visa_rules SET max_stay_days = 30
WHERE passport_slug = 'france' AND destination_slug = 'turkmenistan';

UPDATE visa_rules
SET
  visa_type = 'visa_on_arrival',
  max_stay_days = 30,
  notes = 'Ghana grants visa-on-arrival to French passport holders at Kotoka International Airport. Fee applies. Extensions available from Ghana Immigration Service.'
WHERE passport_slug = 'france'
  AND destination_slug = 'ghana';
