/*
  # Add Switzerland Passport Visa Rules (Batch 30)

  Inserts 29 visa rules for the Switzerland passport covering:
  - Domestic entry (visa-free)
  - Visa Waiver/ETA destinations (US ESTA, UK ETA, Canada eTA, NZ NZeTA, South Korea K-ETA)
  - eVisa destinations (Australia, Saudi Arabia, Vietnam, India, Russia)
  - Schengen/freedom of movement destinations (France, Spain, Italy, Germany, Belgium, Croatia)
  - Visa-free destinations (Turkey, Thailand, Singapore, Malaysia, Japan, Brazil, Mexico)
  - Visa on arrival destinations (UAE, Qatar, Egypt, Indonesia)
  - Visa required destinations (China)
*/

INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, max_stay_days, stay_rule, passport_validity_months, transit_required, insurance_required, return_ticket_required, sufficient_funds_required, official_source_url, last_verified, notes)
VALUES
  ('switzerland','switzerland','visa_free',NULL,'Citizen/resident (no immigration restriction)',NULL,false,NULL,NULL,NULL,'https://www.sem.admin.ch/','2026-02-18','Domestic entry.'),
  ('switzerland','united-states','visa_free_eta',90,'Visa Waiver Program (ESTA required)',6,false,false,false,true,'https://travel.state.gov/','2026-02-18','ESTA required before travel.'),
  ('switzerland','united-kingdom','visa_free_eta',180,'Visa-free; ETA required',0,false,false,false,true,'https://www.gov.uk/check-uk-visa','2026-02-18','UK ETA required.'),
  ('switzerland','canada','visa_free_eta',180,'Visa-free; eTA required for air travel',0,false,false,false,true,'https://www.canada.ca/','2026-02-18','eTA required for air arrival.'),
  ('switzerland','australia','evisa',90,'eVisitor (subclass 651) required',0,false,false,false,true,'https://immi.homeaffairs.gov.au/','2026-02-18','Free eVisitor visa.'),
  ('switzerland','new-zealand','visa_free_eta',90,'Visa waiver; NZeTA required',3,false,false,false,true,'https://www.immigration.govt.nz/','2026-02-18','NZeTA required.'),
  ('switzerland','france','visa_free',90,'Freedom of movement (Schengen/EU agreement)',0,false,false,false,false,'https://www.sem.admin.ch/','2026-02-18','Schengen member mobility.'),
  ('switzerland','spain','visa_free',90,'Freedom of movement (Schengen)',0,false,false,false,false,'https://www.sem.admin.ch/','2026-02-18','Schengen mobility.'),
  ('switzerland','italy','visa_free',90,'Freedom of movement (Schengen)',0,false,false,false,false,'https://www.sem.admin.ch/','2026-02-18','Schengen mobility.'),
  ('switzerland','germany','visa_free',90,'Freedom of movement (Schengen)',0,false,false,false,false,'https://www.sem.admin.ch/','2026-02-18','Schengen mobility.'),
  ('switzerland','belgium','visa_free',90,'Freedom of movement (Schengen)',0,false,false,false,false,'https://www.sem.admin.ch/','2026-02-18','Schengen mobility.'),
  ('switzerland','croatia','visa_free',90,'Freedom of movement (Schengen)',0,false,false,false,false,'https://www.sem.admin.ch/','2026-02-18','Schengen mobility.'),
  ('switzerland','turkey','visa_free',90,'Visa-free up to 90 days in 180',6,false,false,true,true,'https://www.mfa.gov.tr/','2026-02-18','90/180 rule applies.'),
  ('switzerland','united-arab-emirates','visa_on_arrival',90,'Visa on arrival',6,false,false,true,true,'https://u.ae/','2026-02-18','90-day stay.'),
  ('switzerland','saudi-arabia','evisa',90,'Tourist eVisa available',6,false,true,true,true,'https://visa.visitsaudi.com/','2026-02-18','Insurance bundled.'),
  ('switzerland','qatar','visa_on_arrival',90,'Visa waiver/on arrival',6,false,false,true,true,'https://visitqatar.com/','2026-02-18','Short stay common.'),
  ('switzerland','egypt','visa_on_arrival',30,'Tourist visa on arrival; eVisa available',6,false,false,true,true,'https://www.visa2egypt.gov.eg/','2026-02-18','VOA fee payable.'),
  ('switzerland','thailand','visa_free',30,'Visa exemption for tourism',6,false,false,true,true,'https://www.thaievisa.go.th/','2026-02-18','30-day stay.'),
  ('switzerland','singapore','visa_free',90,'Visa exemption for tourism/business',6,false,false,false,true,'https://www.ica.gov.sg/','2026-02-18','Entry discretionary.'),
  ('switzerland','malaysia','visa_free',90,'Visa exemption for tourism',6,false,false,false,false,'https://www.imi.gov.my/','2026-02-18','90-day stay.'),
  ('switzerland','indonesia','visa_on_arrival',30,'VOA / e-VOA available',6,false,false,true,true,'https://evisa.imigrasi.go.id/','2026-02-18','Extendable once.'),
  ('switzerland','vietnam','evisa',90,'Vietnam eVisa available',6,false,false,true,true,'https://evisa.xuatnhapcanh.gov.vn/','2026-02-18','Online approval required.'),
  ('switzerland','india','evisa',NULL,'India eVisa available',6,false,false,true,true,'https://indianvisaonline.gov.in/','2026-02-18','Duration depends on category.'),
  ('switzerland','china','visa_required',30,'Tourist visa required prior to travel (limited transit exemptions apply)',6,true,false,true,true,'https://www.visaforchina.cn/','2026-02-18','No broad waiver.'),
  ('switzerland','japan','visa_free',90,'Visa exemption for tourism/business',0,false,false,false,true,'https://www.mofa.go.jp/','2026-02-18','Visa-free short stay.'),
  ('switzerland','south-korea','visa_free_eta',90,'Visa-free; K-ETA required',0,false,false,false,true,'https://www.k-eta.go.kr/','2026-02-18','K-ETA required.'),
  ('switzerland','brazil','visa_free',90,'Visa exemption for tourism/business',0,false,false,false,false,'https://www.gov.br/mre/','2026-02-18','Reciprocal agreement.'),
  ('switzerland','mexico','visa_free',180,'Tourism/business up to 180 days (discretionary)',0,false,false,false,true,'https://embamex.sre.gob.mx/','2026-02-18','Length stamped at entry.'),
  ('switzerland','russia','evisa',30,'Unified eVisa available',6,false,true,true,true,'https://evisa.kdmid.ru/','2026-02-18','Medical insurance required.')
ON CONFLICT DO NOTHING;
