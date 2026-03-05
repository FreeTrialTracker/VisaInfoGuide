/*
  # Add Argentina Passport Visa Rules (Batch 29)

  Inserts 31 visa rules for the Argentina passport covering:
  - Domestic entry (visa-free)
  - Visa-free destinations (UK, Schengen zone, Turkey, Thailand, Singapore, Malaysia, Japan, Brazil, Mexico, Russia)
  - Visa required destinations (US, Canada, New Zealand, China)
  - eVisa destinations (Australia, Saudi Arabia, Vietnam, India)
  - Visa on arrival destinations (UAE, Qatar, Egypt, Indonesia)
  - ETA destinations (South Korea K-ETA)
*/

INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, max_stay_days, stay_rule, passport_validity_months, transit_required, insurance_required, return_ticket_required, sufficient_funds_required, official_source_url, last_verified, notes)
VALUES
  ('argentina','argentina','visa_free',NULL,'Citizen/resident (no immigration restriction)',NULL,false,NULL,NULL,NULL,'https://www.argentina.gob.ar/interior/migraciones','2026-02-18','Domestic entry.'),
  ('argentina','united-states','visa_required',180,'B1/B2 visa required prior to travel',6,true,false,true,true,'https://travel.state.gov/','2026-02-18','ESTA not available.'),
  ('argentina','united-kingdom','visa_free',180,'Visa-free short stay up to 6 months',0,false,false,false,true,'https://www.gov.uk/check-uk-visa','2026-02-18','Entry discretionary.'),
  ('argentina','canada','visa_required',180,'Temporary Resident Visa required (eTA not available)',6,true,false,true,true,'https://www.canada.ca/','2026-02-18','Visa required.'),
  ('argentina','australia','evisa',90,'Visitor visa (subclass 600) online application',6,false,false,true,true,'https://immi.homeaffairs.gov.au/','2026-02-18','Online application required.'),
  ('argentina','new-zealand','visa_required',90,'Visitor visa required prior to travel',3,true,false,true,true,'https://www.immigration.govt.nz/','2026-02-18','Visa required.'),
  ('argentina','france','visa_free',90,'Schengen short stay 90/180',3,false,true,false,true,'https://france-visas.gouv.fr/','2026-02-18','Insurance required for Schengen.'),
  ('argentina','spain','visa_free',90,'Schengen short stay 90/180',3,false,true,false,true,'https://www.exteriores.gob.es/','2026-02-18','Schengen rules apply.'),
  ('argentina','italy','visa_free',90,'Schengen short stay 90/180',3,false,true,false,true,'https://vistoperitalia.esteri.it/','2026-02-18','Schengen rules apply.'),
  ('argentina','germany','visa_free',90,'Schengen short stay 90/180',3,false,true,false,true,'https://www.germany.info/','2026-02-18','Schengen rules apply.'),
  ('argentina','switzerland','visa_free',90,'Schengen short stay 90/180',3,false,true,false,true,'https://www.sem.admin.ch/','2026-02-18','Schengen member.'),
  ('argentina','belgium','visa_free',90,'Schengen short stay 90/180',3,false,true,false,true,'https://diplomatie.belgium.be/','2026-02-18','Schengen rules apply.'),
  ('argentina','croatia','visa_free',90,'Schengen short stay 90/180 (Croatia Schengen member)',3,false,true,false,true,'https://mvep.gov.hr/','2026-02-18','Schengen rules apply.'),
  ('argentina','turkey','visa_free',90,'Visa exemption up to 90 days in 180',6,false,false,true,true,'https://www.mfa.gov.tr/','2026-02-18','90/180 rule.'),
  ('argentina','united-arab-emirates','visa_on_arrival',30,'Visa on arrival',6,false,false,true,true,'https://u.ae/','2026-02-18','Short stay common.'),
  ('argentina','saudi-arabia','evisa',90,'Tourist eVisa available',6,false,true,true,true,'https://visa.visitsaudi.com/','2026-02-18','Insurance bundled.'),
  ('argentina','qatar','visa_on_arrival',30,'Visa waiver/on arrival (verify tier)',6,false,false,true,true,'https://visitqatar.com/','2026-02-18','Eligibility category applies.'),
  ('argentina','egypt','visa_on_arrival',30,'Tourist visa on arrival; eVisa available',6,false,false,true,true,'https://www.visa2egypt.gov.eg/','2026-02-18','VOA fee payable.'),
  ('argentina','thailand','visa_free',90,'Visa exemption for tourism',6,false,false,true,true,'https://www.thaievisa.go.th/','2026-02-18','90-day stay.'),
  ('argentina','singapore','visa_free',30,'Visa exemption for tourism',6,false,false,false,true,'https://www.ica.gov.sg/','2026-02-18','Entry discretionary.'),
  ('argentina','malaysia','visa_free',90,'Visa exemption for tourism',6,false,false,false,false,'https://www.imi.gov.my/','2026-02-18','90-day stay.'),
  ('argentina','indonesia','visa_on_arrival',30,'VOA / e-VOA available',6,false,false,true,true,'https://evisa.imigrasi.go.id/','2026-02-18','Extendable once.'),
  ('argentina','vietnam','evisa',90,'Vietnam eVisa available',6,false,false,true,true,'https://evisa.xuatnhapcanh.gov.vn/','2026-02-18','Online approval required.'),
  ('argentina','india','evisa',NULL,'India eVisa available',6,false,false,true,true,'https://indianvisaonline.gov.in/','2026-02-18','Duration depends on category.'),
  ('argentina','china','visa_required',30,'Tourist visa required prior to travel',6,true,false,true,true,'https://www.visaforchina.cn/','2026-02-18','No broad waiver.'),
  ('argentina','japan','visa_free',90,'Visa exemption for tourism/business',0,false,false,false,true,'https://www.mofa.go.jp/','2026-02-18','Visa-free short stay.'),
  ('argentina','south-korea','visa_free_eta',90,'Short stay; K-ETA required',0,false,false,false,true,'https://www.k-eta.go.kr/','2026-02-18','K-ETA required.'),
  ('argentina','brazil','visa_free',90,'Mercosur mobility; visa-free',0,false,false,false,false,'https://www.gov.br/mre/','2026-02-18','Mercosur agreement.'),
  ('argentina','mexico','visa_free',180,'Tourism/business up to 180 days (discretionary)',0,false,false,false,true,'https://embamex.sre.gob.mx/','2026-02-18','Length stamped at entry.'),
  ('argentina','russia','visa_free',90,'Visa exemption short stay',6,false,true,true,true,'https://evisa.kdmid.ru/','2026-02-18','Verify bilateral terms.')
ON CONFLICT DO NOTHING;
