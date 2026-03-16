/*
  # Add Philippines Passport Visa Rules (Batch 26)

  Inserts 31 visa rules for the Philippines passport covering:
  - Domestic entry (visa-free)
  - Visa required destinations (US, UK, Canada, NZ, Schengen countries, China, Japan, Mexico, Argentina)
  - eVisa destinations (Australia, Turkey, Saudi Arabia, India, Russia)
  - Visa on arrival destinations (UAE, Qatar, Egypt)
  - Visa-free destinations (Thailand, Singapore, Malaysia, Indonesia, Vietnam, Brazil)
  - Visa-free with ETA destinations (South Korea K-ETA)
*/

INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, max_stay_days, stay_rule, passport_validity_months, transit_required, insurance_required, return_ticket_required, sufficient_funds_required, official_source_url, last_verified, notes)
VALUES
  ('philippines','philippines','visa_free',NULL,'Citizen/resident (no immigration restriction)',NULL,false,NULL,NULL,NULL,'https://immigration.gov.ph/','2026-02-18','Domestic entry.'),
  ('philippines','united-states','visa_required',180,'B1/B2 visa required prior to travel',6,true,false,true,true,'https://travel.state.gov/','2026-02-18','ESTA not available.'),
  ('philippines','united-kingdom','visa_required',180,'Standard Visitor visa required',6,true,false,true,true,'https://www.gov.uk/check-uk-visa','2026-02-18','ETA not applicable.'),
  ('philippines','canada','visa_required',180,'Temporary Resident Visa required',6,true,false,true,true,'https://www.canada.ca/','2026-02-18','eTA not available.'),
  ('philippines','australia','evisa',90,'Visitor visa (subclass 600) required',6,false,false,true,true,'https://immi.homeaffairs.gov.au/','2026-02-18','Online application.'),
  ('philippines','new-zealand','visa_required',90,'Visitor visa required prior to travel',3,true,false,true,true,'https://www.immigration.govt.nz/','2026-02-18','NZeTA not applicable.'),
  ('philippines','france','visa_required',90,'Schengen visa required',3,true,true,true,true,'https://france-visas.gouv.fr/','2026-02-18','Medical insurance mandatory.'),
  ('philippines','spain','visa_required',90,'Schengen visa required',3,true,true,true,true,'https://www.exteriores.gob.es/','2026-02-18','Schengen rules apply.'),
  ('philippines','italy','visa_required',90,'Schengen visa required',3,true,true,true,true,'https://vistoperitalia.esteri.it/','2026-02-18','Schengen rules apply.'),
  ('philippines','germany','visa_required',90,'Schengen visa required',3,true,true,true,true,'https://www.germany.info/','2026-02-18','Medical insurance mandatory.'),
  ('philippines','switzerland','visa_required',90,'Schengen visa required',3,true,true,true,true,'https://www.eda.admin.ch/','2026-02-18','Schengen member.'),
  ('philippines','belgium','visa_required',90,'Schengen visa required',3,true,true,true,true,'https://diplomatie.belgium.be/','2026-02-18','Schengen rules apply.'),
  ('philippines','croatia','visa_required',90,'Schengen visa required (Croatia Schengen member)',3,true,true,true,true,'https://mvep.gov.hr/','2026-02-18','Schengen rules apply.'),
  ('philippines','turkey','evisa',30,'Turkey eVisa available',6,false,false,true,true,'https://www.evisa.gov.tr/','2026-02-18','Online application.'),
  ('philippines','united-arab-emirates','visa_on_arrival',30,'Visa on arrival (verify category)',6,false,false,true,true,'https://u.ae/','2026-02-18','Short stay common.'),
  ('philippines','saudi-arabia','evisa',90,'Tourist eVisa available',6,false,true,true,true,'https://visa.visitsaudi.com/','2026-02-18','Insurance bundled.'),
  ('philippines','qatar','visa_on_arrival',30,'Visa waiver/on arrival (verify tier)',6,false,false,true,true,'https://visitqatar.com/','2026-02-18','Eligibility category applies.'),
  ('philippines','egypt','visa_on_arrival',30,'Tourist visa on arrival; eVisa available',6,false,false,true,true,'https://www.visa2egypt.gov.eg/','2026-02-18','VOA fee payable.'),
  ('philippines','thailand','visa_free',30,'Visa exemption for tourism',6,false,false,true,true,'https://www.thaievisa.go.th/','2026-02-18','Common regional route.'),
  ('philippines','singapore','visa_free',30,'Visa exemption for ASEAN nationals',6,false,false,false,false,'https://www.ica.gov.sg/','2026-02-18','ASEAN mobility.'),
  ('philippines','malaysia','visa_free',30,'Visa exemption for ASEAN nationals',6,false,false,false,false,'https://www.imi.gov.my/','2026-02-18','ASEAN mobility.'),
  ('philippines','indonesia','visa_free',30,'Visa exemption for ASEAN nationals',6,false,false,false,false,'https://www.imigrasi.go.id/','2026-02-18','ASEAN mobility.'),
  ('philippines','vietnam','visa_free',21,'Visa exemption short stay',6,false,false,false,false,'https://xuatnhapcanh.gov.vn/','2026-02-18','Short stay ASEAN mobility.'),
  ('philippines','india','evisa',NULL,'India eVisa available',6,false,false,true,true,'https://indianvisaonline.gov.in/','2026-02-18','Duration depends on category.'),
  ('philippines','china','visa_required',30,'Tourist visa required prior to travel',6,true,false,true,true,'https://www.visaforchina.cn/','2026-02-18','No broad visa waiver.'),
  ('philippines','japan','visa_required',90,'Tourist visa required (limited exemptions may apply)',6,true,false,true,true,'https://www.mofa.go.jp/','2026-02-18','Monitor bilateral agreements.'),
  ('philippines','south-korea','visa_free_eta',30,'Short stay; K-ETA required',0,false,false,false,true,'https://www.k-eta.go.kr/','2026-02-18','Jeju exceptions may apply.'),
  ('philippines','brazil','visa_free',30,'Visa exemption for tourism',0,false,false,false,false,'https://www.gov.br/mre/','2026-02-18','Reciprocal arrangement.'),
  ('philippines','mexico','visa_required',180,'Visa required unless holding valid US/Schengen visa (conditional exemption)',6,true,false,true,true,'https://embamex.sre.gob.mx/','2026-02-18','Conditional exemptions exist.'),
  ('philippines','russia','evisa',30,'Unified eVisa available',6,false,true,true,true,'https://evisa.kdmid.ru/','2026-02-18','Medical insurance required.'),
  ('philippines','argentina','visa_required',90,'Tourist visa required prior to travel',6,true,false,true,true,'https://www.cancilleria.gob.ar/','2026-02-18','No broad visa exemption.')
ON CONFLICT DO NOTHING;
