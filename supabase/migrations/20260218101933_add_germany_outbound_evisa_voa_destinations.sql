/*
  # Add Germany outbound eVisa and VOA destinations

  ## Summary
  Several countries offer German passport holders eVisa or Visa on Arrival access.
  These were missing from Germany's outbound rules.

  ## New eVisa rows
  - kenya, ethiopia, tanzania, oman, azerbaijan, myanmar, sri-lanka, cambodia

  ## New Visa on Arrival rows
  - dominican-republic, laos, nepal, bahrain, zimbabwe, cuba

  ## Notes
  - All data reflects standard access as of early 2026; official sources should be verified
*/

INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, visa_subtype, max_stay_days, stay_window_days, stay_rule, notes, last_verified)
VALUES
  ('germany','kenya','evisa',NULL,90,NULL,'Kenya eVisa required; single or multiple entry; up to 90 days','Apply via official Kenya eCitizen portal before travel.','2026-02-18'),
  ('germany','ethiopia','evisa',NULL,30,NULL,'Ethiopia eVisa required; up to 30 days','Apply via official Ethiopia e-Visa portal before travel.','2026-02-18'),
  ('germany','tanzania','evisa',NULL,90,NULL,'Tanzania eVisa required; up to 90 days','Apply via Tanzania immigration online portal before travel.','2026-02-18'),
  ('germany','oman','evisa',NULL,30,NULL,'Oman eVisa available; up to 30 days (extendable)','Apply via Royal Oman Police eVisa portal before travel.','2026-02-18'),
  ('germany','azerbaijan','evisa',NULL,30,NULL,'Azerbaijan ASAN Visa (eVisa) required; up to 30 days','Apply via ASAN Visa portal; typically processed quickly.','2026-02-18'),
  ('germany','myanmar','evisa',NULL,28,NULL,'Myanmar eVisa available; tourist stay up to 28 days','Note: travel advisories apply for Myanmar; verify safety conditions before travel.','2026-02-18'),
  ('germany','sri-lanka','evisa',NULL,30,NULL,'Sri Lanka ETA (Electronic Travel Authorization) required; 30 days extendable','Apply via official Sri Lanka ETA portal before travel.','2026-02-18'),
  ('germany','cambodia','evisa',NULL,30,NULL,'Cambodia eVisa available; 30 days; extendable at immigration','Apply via official Cambodia eVisa portal or obtain visa on arrival.','2026-02-18'),
  ('germany','dominican-republic','visa_on_arrival',NULL,30,NULL,'Tourist card (tarjeta de turista) included in airfare or purchased on arrival; 30 days extendable','Tourist card typically included in airline ticket price or costs ~$10 on arrival.','2026-02-18'),
  ('germany','laos','visa_on_arrival',NULL,30,NULL,'Visa on arrival available at major entry points; 30 days','eVisa also available online before travel.','2026-02-18'),
  ('germany','nepal','visa_on_arrival',NULL,15,NULL,'Visa on arrival available; 15, 30, or 90 day options','Multiple-entry options available; apply at Tribhuvan International Airport or land borders.','2026-02-18'),
  ('germany','bahrain','visa_on_arrival',NULL,14,NULL,'Visa on arrival for eligible nationalities; up to 14 days (extendable)','eVisa also available; check Bahrain eVisa portal for latest requirements.','2026-02-18'),
  ('germany','zimbabwe','visa_on_arrival',NULL,90,NULL,'Visa on arrival for eligible nationalities; up to 90 days','KAZA UNIVISA also available if visiting Zambia/Zimbabwe together.','2026-02-18'),
  ('germany','cuba','visa_on_arrival',NULL,30,NULL,'Tourist card (tarjeta del turista) required; available on arrival or before travel; 30 days','Tourist card typically sold by airlines; extendable once in Cuba for additional 30 days.','2026-02-18')
ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO NOTHING;
