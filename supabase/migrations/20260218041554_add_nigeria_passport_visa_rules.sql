/*
  # Add Nigeria Passport Visa Rules (Batch 28)

  Inserts 31 visa rules for the Nigeria passport covering:
  - Domestic entry (visa-free)
  - Visa required destinations (US, UK, Canada, NZ, Schengen countries, UAE, Qatar, Egypt, Singapore, Malaysia, China, Japan, South Korea, Brazil, Mexico, Argentina)
  - eVisa destinations (Australia, Turkey, Saudi Arabia, Vietnam, India, Russia)
  - Visa on arrival destinations (Thailand, Indonesia)
*/

INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, max_stay_days, stay_rule, passport_validity_months, transit_required, insurance_required, return_ticket_required, sufficient_funds_required, official_source_url, last_verified, notes)
VALUES
  ('nigeria','nigeria','visa_free',NULL,'Citizen/resident (no immigration restriction)',NULL,false,NULL,NULL,NULL,'https://immigration.gov.ng/','2026-02-18','Domestic entry.'),
  ('nigeria','united-states','visa_required',180,'B1/B2 visa required prior to travel',6,true,false,true,true,'https://travel.state.gov/','2026-02-18','ESTA not available.'),
  ('nigeria','united-kingdom','visa_required',180,'Standard Visitor visa required prior to travel',6,true,false,true,true,'https://www.gov.uk/check-uk-visa','2026-02-18','Visa must be obtained before travel.'),
  ('nigeria','canada','visa_required',180,'Temporary Resident Visa required',6,true,false,true,true,'https://www.canada.ca/','2026-02-18','eTA not available.'),
  ('nigeria','australia','evisa',90,'Visitor visa (subclass 600) required',6,false,false,true,true,'https://immi.homeaffairs.gov.au/','2026-02-18','Online application required.'),
  ('nigeria','new-zealand','visa_required',90,'Visitor visa required prior to travel',3,true,false,true,true,'https://www.immigration.govt.nz/','2026-02-18','Visa required.'),
  ('nigeria','france','visa_required',90,'Schengen visa required',3,true,true,true,true,'https://france-visas.gouv.fr/','2026-02-18','Medical insurance mandatory.'),
  ('nigeria','spain','visa_required',90,'Schengen visa required',3,true,true,true,true,'https://www.exteriores.gob.es/','2026-02-18','Schengen rules apply.'),
  ('nigeria','italy','visa_required',90,'Schengen visa required',3,true,true,true,true,'https://vistoperitalia.esteri.it/','2026-02-18','Schengen rules apply.'),
  ('nigeria','germany','visa_required',90,'Schengen visa required',3,true,true,true,true,'https://www.germany.info/','2026-02-18','Medical insurance mandatory.'),
  ('nigeria','switzerland','visa_required',90,'Schengen visa required',3,true,true,true,true,'https://www.eda.admin.ch/','2026-02-18','Schengen member.'),
  ('nigeria','belgium','visa_required',90,'Schengen visa required',3,true,true,true,true,'https://diplomatie.belgium.be/','2026-02-18','Schengen rules apply.'),
  ('nigeria','croatia','visa_required',90,'Schengen visa required (Croatia Schengen member)',3,true,true,true,true,'https://mvep.gov.hr/','2026-02-18','Schengen rules apply.'),
  ('nigeria','turkey','evisa',30,'Turkey eVisa available',6,false,false,true,true,'https://www.evisa.gov.tr/','2026-02-18','Online application.'),
  ('nigeria','united-arab-emirates','visa_required',30,'Visa required prior to travel',6,true,false,true,true,'https://u.ae/','2026-02-18','No standard visa-on-arrival.'),
  ('nigeria','saudi-arabia','evisa',90,'Tourist eVisa available',6,false,true,true,true,'https://visa.visitsaudi.com/','2026-02-18','Insurance bundled.'),
  ('nigeria','qatar','visa_required',30,'Visa required prior to travel (limited waiver categories apply)',6,true,false,true,true,'https://visitqatar.com/','2026-02-18','Verify category.'),
  ('nigeria','egypt','visa_required',30,'Tourist visa required prior to travel (eVisa available)',6,false,false,true,true,'https://www.visa2egypt.gov.eg/','2026-02-18','eVisa recommended.'),
  ('nigeria','thailand','visa_on_arrival',15,'Visa on arrival (verify extension eligibility)',6,false,false,true,true,'https://www.thaievisa.go.th/','2026-02-18','Limited duration.'),
  ('nigeria','singapore','visa_required',30,'Visa required prior to travel',6,true,false,true,true,'https://www.ica.gov.sg/','2026-02-18','Visa required.'),
  ('nigeria','malaysia','visa_required',30,'Visa required prior to travel',6,true,false,true,true,'https://www.imi.gov.my/','2026-02-18','Visa required.'),
  ('nigeria','indonesia','visa_on_arrival',30,'VOA / e-VOA available',6,false,false,true,true,'https://evisa.imigrasi.go.id/','2026-02-18','Extendable once.'),
  ('nigeria','vietnam','evisa',90,'Vietnam eVisa available',6,false,false,true,true,'https://evisa.xuatnhapcanh.gov.vn/','2026-02-18','Online approval required.'),
  ('nigeria','india','evisa',NULL,'India eVisa available',6,false,false,true,true,'https://indianvisaonline.gov.in/','2026-02-18','Duration depends on category.'),
  ('nigeria','china','visa_required',30,'Tourist visa required prior to travel',6,true,false,true,true,'https://www.visaforchina.cn/','2026-02-18','No broad waiver.'),
  ('nigeria','japan','visa_required',90,'Tourist visa required prior to travel',6,true,false,true,true,'https://www.mofa.go.jp/','2026-02-18','No general visa waiver.'),
  ('nigeria','south-korea','visa_required',30,'Tourist visa required (limited Jeju exceptions)',6,true,false,true,true,'https://www.immigration.go.kr/','2026-02-18','Visa required.'),
  ('nigeria','brazil','visa_required',90,'Tourist visa required (eVisa possible depending on agreement)',6,false,false,true,true,'https://www.gov.br/mre/','2026-02-18','Verify current reciprocal agreement.'),
  ('nigeria','mexico','visa_required',180,'Visa required unless holding valid US/Schengen visa (conditional exemption)',6,true,false,true,true,'https://embamex.sre.gob.mx/','2026-02-18','Conditional exemptions exist.'),
  ('nigeria','russia','evisa',30,'Unified eVisa available',6,false,true,true,true,'https://evisa.kdmid.ru/','2026-02-18','Medical insurance required.'),
  ('nigeria','argentina','visa_required',90,'Tourist visa required prior to travel',6,true,false,true,true,'https://www.cancilleria.gob.ar/','2026-02-18','No broad visa exemption.')
ON CONFLICT DO NOTHING;
