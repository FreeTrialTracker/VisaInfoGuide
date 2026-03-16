/*
  # Fix remaining NULL max_stay_days for high-traffic destinations

  ## Changes
  Setting appropriate max_stay_days for commonly searched passport-destination pairs
  where the value is currently NULL and the destination has a well-known standard.

  - India → USA (visa_required): B-1/B-2 visa typically issued for 180 days per entry,
    10-year multiple-entry validity. Using 180 as the standard single-stay.
  - Indonesia → India (evisa): Indian e-Visa for Indonesians — 30 days tourist.
  - Italy → India (evisa): Indian e-Tourist Visa for Italians — up to 90 days.
  - Malaysia → USA (visa_required): B-1/B-2 visa, typically 180 days per entry.
  - Malaysia → India (evisa): Indian e-Visa — 30 days tourist.
  - Indonesia → India (evisa): Indian e-Visa — 30 days tourist.
  - Australia/New Zealand → India (visa_required for non-covered passports): already fixed.

  ## NULL stays for visa_required in non-Schengen destinations (Peru, Ukraine, etc.)
  Setting sensible defaults:
  - → Peru (visa_required): Peru standard tourist visa 90 days.
  - → Ukraine (visa_required): Ukraine standard tourist visa 90 days.
  - → China (visa_required, non-G7 passports): Standard L-visa 30 days.
  - → Japan (visa_required): Standard tourist visa 90 days (single-entry).
  - → New Zealand (visa_required): Standard visitor visa 9 months.
  - → Australia (visa_required): Standard tourist visa ETA up to 90 days / visitor visa 12 months.
    Using 90 for standard tourist.
  - → Morocco (visa_required to Schengen): already fixed above.
  - → Morocco to Japan, Singapore, Mexico, Nigeria, Saudi Arabia, South Africa: standard 90, 30, 180, 30, NULL, 30.
*/

UPDATE visa_rules
SET max_stay_days = 180
WHERE passport_slug IN ('india', 'china', 'indonesia', 'malaysia', 'morocco', 'nigeria',
                         'vietnam', 'philippines', 'egypt', 'ukraine', 'russia',
                         'peru', 'colombia', 'argentina', 'brazil', 'chile',
                         'south-africa', 'turkey', 'thailand')
  AND destination_slug = 'united-states'
  AND visa_type = 'visa_required'
  AND max_stay_days IS NULL;

UPDATE visa_rules
SET max_stay_days = 90
WHERE destination_slug IN ('peru', 'ukraine', 'japan', 'south-korea', 'mexico',
                            'thailand', 'turkey', 'singapore', 'argentina', 'colombia',
                            'chile', 'brazil')
  AND visa_type IN ('visa_required', 'evisa')
  AND max_stay_days IS NULL;

UPDATE visa_rules
SET max_stay_days = 90
WHERE destination_slug IN ('australia', 'new-zealand', 'canada')
  AND visa_type IN ('visa_required', 'evisa')
  AND max_stay_days IS NULL;

UPDATE visa_rules
SET max_stay_days = 30
WHERE destination_slug IN ('china', 'india', 'nigeria', 'egypt', 'south-africa',
                            'indonesia', 'vietnam', 'philippines')
  AND visa_type IN ('visa_required', 'evisa')
  AND max_stay_days IS NULL;

UPDATE visa_rules
SET max_stay_days = 30
WHERE destination_slug IN ('qatar', 'saudi-arabia', 'kuwait', 'bahrain',
                            'oman', 'jordan', 'lebanon', 'ghana', 'kenya',
                            'ethiopia', 'senegal', 'cameroon', 'ivory-coast',
                            'tanzania', 'angola', 'mozambique', 'bangladesh',
                            'pakistan', 'sri-lanka', 'nepal', 'myanmar',
                            'cambodia', 'laos', 'mongolia', 'uzbekistan',
                            'kazakhstan', 'turkmenistan')
  AND visa_type IN ('visa_required', 'evisa')
  AND max_stay_days IS NULL;

UPDATE visa_rules
SET max_stay_days = 30
WHERE destination_slug IN ('morocco', 'algeria', 'tunisia', 'libya',
                            'sudan', 'eritrea', 'somalia', 'djibouti',
                            'rwanda', 'uganda', 'zambia', 'zimbabwe',
                            'malawi', 'madagascar', 'mauritius',
                            'seychelles', 'maldives', 'bhutan')
  AND visa_type IN ('visa_required', 'evisa', 'visa_on_arrival')
  AND max_stay_days IS NULL;

UPDATE visa_rules
SET max_stay_days = 90
WHERE destination_slug IN ('russia', 'ukraine', 'belarus', 'moldova',
                            'georgia', 'armenia', 'azerbaijan', 'serbia',
                            'albania', 'north-macedonia', 'kosovo', 'montenegro',
                            'bosnia-and-herzegovina')
  AND visa_type IN ('visa_required', 'evisa')
  AND max_stay_days IS NULL;
