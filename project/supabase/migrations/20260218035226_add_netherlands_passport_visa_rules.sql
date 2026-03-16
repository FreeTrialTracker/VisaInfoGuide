/*
  # Add Netherlands Passport Visa Rules (Batch 22)

  Inserts 31 visa rules for the Netherlands passport covering:
  - EU/Schengen destinations (visa-free freedom of movement)
  - Visa Waiver Program destinations (ESTA, eTA, NZeTA, K-ETA)
  - Visa on arrival destinations (UAE, Qatar, Egypt, Indonesia)
  - eVisa destinations (Saudi Arabia, India, Russia)
  - Visa-free destinations (Thailand, Singapore, Malaysia, Vietnam, China, Japan, Brazil, Mexico, Argentina, Turkey, Switzerland)
*/

INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, max_stay_days, stay_rule, passport_validity_months, transit_required, insurance_required, return_ticket_required, sufficient_funds_required, official_source_url, last_verified, notes)
VALUES
  ('netherlands','netherlands','visa_free',NULL,'EU citizen; full freedom of movement',NULL,false,NULL,NULL,NULL,'https://www.government.nl/','2026-02-18','Domestic / EU national.'),
  ('netherlands','united-states','visa_free_eta',90,'Visa Waiver Program (ESTA required)',6,false,false,true,true,'https://esta.cbp.dhs.gov/','2026-02-18','ESTA mandatory before boarding.'),
  ('netherlands','united-kingdom','visa_free_eta',180,'Standard Visitor up to 6 months; ETA required',0,false,false,false,true,'https://www.gov.uk/check-uk-visa','2026-02-18','ETA applies.'),
  ('netherlands','canada','visa_free_eta',180,'Visa-exempt; eTA required for air travel',0,false,false,false,true,'https://www.canada.ca/eta','2026-02-18','eTA required when flying.'),
  ('netherlands','australia','visa_free_eta',90,'eVisitor (subclass 651) required',0,false,false,true,true,'https://immi.homeaffairs.gov.au/','2026-02-18','Apply online before travel.'),
  ('netherlands','new-zealand','visa_free_eta',90,'Visa waiver; NZeTA required',0,false,false,true,true,'https://www.immigration.govt.nz/','2026-02-18','NZeTA mandatory.'),
  ('netherlands','france','visa_free',NULL,'EU freedom of movement',NULL,false,false,false,false,'https://europa.eu/youreurope/','2026-02-18','EU citizen rights apply.'),
  ('netherlands','spain','visa_free',NULL,'EU freedom of movement',NULL,false,false,false,false,'https://europa.eu/youreurope/','2026-02-18','EU citizen rights apply.'),
  ('netherlands','italy','visa_free',NULL,'EU freedom of movement',NULL,false,false,false,false,'https://europa.eu/youreurope/','2026-02-18','EU citizen rights apply.'),
  ('netherlands','germany','visa_free',NULL,'EU freedom of movement',NULL,false,false,false,false,'https://europa.eu/youreurope/','2026-02-18','EU citizen rights apply.'),
  ('netherlands','switzerland','visa_free',90,'Schengen short stay; EU-Switzerland agreement',3,false,false,false,false,'https://www.sem.admin.ch/','2026-02-18','Bilateral EU agreement.'),
  ('netherlands','belgium','visa_free',NULL,'EU freedom of movement',NULL,false,false,false,false,'https://europa.eu/youreurope/','2026-02-18','EU citizen rights apply.'),
  ('netherlands','croatia','visa_free',NULL,'EU freedom of movement (Schengen member)',NULL,false,false,false,false,'https://europa.eu/youreurope/','2026-02-18','EU citizen rights apply.'),
  ('netherlands','turkey','visa_free',90,'Visa exemption up to 90 days in 180 days',6,false,false,true,true,'https://www.mfa.gov.tr/','2026-02-18','90/180 rule applies.'),
  ('netherlands','united-arab-emirates','visa_on_arrival',90,'Visa on arrival',6,false,false,true,true,'https://u.ae/','2026-02-18','90-day framework common.'),
  ('netherlands','saudi-arabia','evisa',90,'Tourist eVisa available',6,false,true,true,true,'https://visa.visitsaudi.com/','2026-02-18','Insurance bundled.'),
  ('netherlands','qatar','visa_on_arrival',90,'Visa waiver/on arrival',6,false,false,true,true,'https://visitqatar.com/','2026-02-18','Verify nationality bucket.'),
  ('netherlands','egypt','visa_on_arrival',30,'Tourist visa on arrival; eVisa available',6,false,false,true,true,'https://www.visa2egypt.gov.eg/','2026-02-18','VOA fee payable.'),
  ('netherlands','thailand','visa_free',60,'Visa exemption up to 60 days; extendable',6,false,false,true,true,'https://www.thaievisa.go.th/','2026-02-18','Onward ticket often checked.'),
  ('netherlands','singapore','visa_free',90,'Short-term visit pass granted at entry',6,false,false,false,true,'https://www.ica.gov.sg/','2026-02-18','Entry discretionary.'),
  ('netherlands','malaysia','visa_free',90,'Visa exemption for tourism',6,false,false,false,false,'https://www.imi.gov.my/','2026-02-18','Low friction entry.'),
  ('netherlands','indonesia','visa_on_arrival',30,'VOA / e-VOA available',6,false,false,true,true,'https://evisa.imigrasi.go.id/','2026-02-18','Extendable once.'),
  ('netherlands','vietnam','visa_free',45,'Visa exemption up to 45 days',6,false,false,true,true,'https://vietnam.travel/','2026-02-18','eVisa required beyond exemption.'),
  ('netherlands','india','evisa',NULL,'India eVisa available',6,false,false,true,true,'https://indianvisaonline.gov.in/','2026-02-18','Duration depends on category.'),
  ('netherlands','china','visa_free',30,'Unilateral visa-free entry (verify policy window)',0,false,false,true,true,'https://www.visaforchina.cn/','2026-02-18','Policy subject to change.'),
  ('netherlands','japan','visa_free',90,'Visa exemption for tourism/business',0,false,false,false,true,'https://www.mofa.go.jp/','2026-02-18','Entry discretionary.'),
  ('netherlands','south-korea','visa_free_eta',90,'Visa-free short stay; K-ETA generally required',0,false,false,false,true,'https://www.k-eta.go.kr/','2026-02-18','Monitor K-ETA policy.'),
  ('netherlands','brazil','visa_free',90,'Visa exemption for tourism/business',0,false,false,false,false,'https://www.gov.br/mre/','2026-02-18','Entry discretionary.'),
  ('netherlands','mexico','visa_free',180,'Tourism/business up to 180 days (discretionary)',0,false,false,false,true,'https://embamex.sre.gob.mx/','2026-02-18','Stay length stamped at entry.'),
  ('netherlands','russia','evisa',30,'Unified eVisa available',6,false,true,true,true,'https://evisa.kdmid.ru/','2026-02-18','Medical insurance required.'),
  ('netherlands','argentina','visa_free',90,'Visa exemption for tourism',0,false,false,false,false,'https://www.migraciones.gov.ar/','2026-02-18','Low entry friction regionally.')
ON CONFLICT DO NOTHING;
