/*
  # Add South Africa Passport Visa Rules (Batch 27)

  Inserts 31 visa rules for the South Africa passport covering:
  - Domestic entry (visa-free)
  - Visa required destinations (US, UK, Canada, NZ, Schengen countries, China, Japan, Mexico)
  - eVisa destinations (Australia, Turkey, Saudi Arabia, Vietnam, India, Russia)
  - Visa on arrival destinations (UAE, Qatar, Egypt, Indonesia)
  - Visa-free destinations (Thailand, Singapore, Malaysia, Brazil, Argentina)
  - Visa-free with ETA destinations (South Korea K-ETA)
*/

INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, max_stay_days, stay_rule, passport_validity_months, transit_required, insurance_required, return_ticket_required, sufficient_funds_required, official_source_url, last_verified, notes)
VALUES
  ('south-africa','south-africa','visa_free',NULL,'Citizen/resident (no immigration restriction)',NULL,false,NULL,NULL,NULL,'https://www.dha.gov.za/','2026-02-18','Domestic entry.'),
  ('south-africa','united-states','visa_required',180,'B1/B2 visa required prior to travel',6,true,false,true,true,'https://travel.state.gov/','2026-02-18','ESTA not available.'),
  ('south-africa','united-kingdom','visa_required',180,'Standard Visitor visa required',6,true,false,true,true,'https://www.gov.uk/check-uk-visa','2026-02-18','Visa required prior to travel.'),
  ('south-africa','canada','visa_required',180,'Temporary Resident Visa required',6,true,false,true,true,'https://www.canada.ca/','2026-02-18','eTA not applicable.'),
  ('south-africa','australia','evisa',90,'Visitor visa (subclass 600) required',6,false,false,true,true,'https://immi.homeaffairs.gov.au/','2026-02-18','Online application.'),
  ('south-africa','new-zealand','visa_required',90,'Visitor visa required prior to travel',3,true,false,true,true,'https://www.immigration.govt.nz/','2026-02-18','Visa required.'),
  ('south-africa','france','visa_required',90,'Schengen visa required',3,true,true,true,true,'https://france-visas.gouv.fr/','2026-02-18','Medical insurance mandatory.'),
  ('south-africa','spain','visa_required',90,'Schengen visa required',3,true,true,true,true,'https://www.exteriores.gob.es/','2026-02-18','Schengen rules apply.'),
  ('south-africa','italy','visa_required',90,'Schengen visa required',3,true,true,true,true,'https://vistoperitalia.esteri.it/','2026-02-18','Schengen rules apply.'),
  ('south-africa','germany','visa_required',90,'Schengen visa required',3,true,true,true,true,'https://www.germany.info/','2026-02-18','Medical insurance mandatory.'),
  ('south-africa','switzerland','visa_required',90,'Schengen visa required',3,true,true,true,true,'https://www.eda.admin.ch/','2026-02-18','Schengen member.'),
  ('south-africa','belgium','visa_required',90,'Schengen visa required',3,true,true,true,true,'https://diplomatie.belgium.be/','2026-02-18','Schengen rules apply.'),
  ('south-africa','croatia','visa_required',90,'Schengen visa required (Croatia Schengen member)',3,true,true,true,true,'https://mvep.gov.hr/','2026-02-18','Schengen rules apply.'),
  ('south-africa','turkey','evisa',30,'Turkey eVisa available',6,false,false,true,true,'https://www.evisa.gov.tr/','2026-02-18','Online application.'),
  ('south-africa','united-arab-emirates','visa_on_arrival',30,'Visa on arrival',6,false,false,true,true,'https://u.ae/','2026-02-18','Short stay common.'),
  ('south-africa','saudi-arabia','evisa',90,'Tourist eVisa available',6,false,true,true,true,'https://visa.visitsaudi.com/','2026-02-18','Insurance bundled.'),
  ('south-africa','qatar','visa_on_arrival',30,'Visa waiver/on arrival (verify category)',6,false,false,true,true,'https://visitqatar.com/','2026-02-18','Eligibility tier applies.'),
  ('south-africa','egypt','visa_on_arrival',30,'Tourist visa on arrival; eVisa available',6,false,false,true,true,'https://www.visa2egypt.gov.eg/','2026-02-18','VOA fee payable.'),
  ('south-africa','thailand','visa_free',30,'Visa exemption for tourism',6,false,false,true,true,'https://www.thaievisa.go.th/','2026-02-18','Common route.'),
  ('south-africa','singapore','visa_free',30,'Visa exemption for tourism',6,false,false,false,false,'https://www.ica.gov.sg/','2026-02-18','Low friction entry.'),
  ('south-africa','malaysia','visa_free',90,'Visa exemption for tourism',6,false,false,false,false,'https://www.imi.gov.my/','2026-02-18','90-day allowance.'),
  ('south-africa','indonesia','visa_on_arrival',30,'VOA / e-VOA available',6,false,false,true,true,'https://evisa.imigrasi.go.id/','2026-02-18','Extendable once.'),
  ('south-africa','vietnam','evisa',90,'Vietnam eVisa available',6,false,false,true,true,'https://evisa.xuatnhapcanh.gov.vn/','2026-02-18','Online approval required.'),
  ('south-africa','india','evisa',NULL,'India eVisa available',6,false,false,true,true,'https://indianvisaonline.gov.in/','2026-02-18','Duration depends on category.'),
  ('south-africa','china','visa_required',30,'Tourist visa required prior to travel',6,true,false,true,true,'https://www.visaforchina.cn/','2026-02-18','No broad waiver.'),
  ('south-africa','japan','visa_required',90,'Tourist visa required (limited exemptions possible)',6,true,false,true,true,'https://www.mofa.go.jp/','2026-02-18','Verify bilateral exemptions.'),
  ('south-africa','south-korea','visa_free_eta',30,'Short stay; K-ETA required',0,false,false,false,true,'https://www.k-eta.go.kr/','2026-02-18','Jeju exemptions possible.'),
  ('south-africa','brazil','visa_free',90,'Visa exemption for tourism',0,false,false,false,false,'https://www.gov.br/mre/','2026-02-18','Reciprocal arrangement.'),
  ('south-africa','mexico','visa_required',180,'Visa required unless holding valid US/Schengen visa (conditional exemption)',6,true,false,true,true,'https://embamex.sre.gob.mx/','2026-02-18','Conditional exemptions exist.'),
  ('south-africa','russia','evisa',30,'Unified eVisa available',6,false,true,true,true,'https://evisa.kdmid.ru/','2026-02-18','Medical insurance required.'),
  ('south-africa','argentina','visa_free',90,'Visa exemption for tourism',0,false,false,false,false,'https://www.migraciones.gov.ar/','2026-02-18','Low entry friction.')
ON CONFLICT DO NOTHING;
