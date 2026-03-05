/*
  # Add Chile Passport Visa Rules

  1. New Data
    - Adds Chile to the `passports` table
    - Inserts 42 visa rules for Chile passport holders

  2. Destinations Covered
    - Schengen: Austria, Belgium, Croatia, Czech Republic, France, Germany, Greece,
      Hungary, Italy, Netherlands, Poland, Portugal, Spain, Switzerland
    - Americas: Argentina, Brazil, Canada, Chile, Colombia, Mexico, United States
    - Asia-Pacific: Australia, China, India, Indonesia, Japan, Malaysia,
      New Zealand, Philippines, Singapore, South Korea, Thailand, Vietnam
    - Other: Egypt, Nigeria, Qatar, Russia, Saudi Arabia, South Africa, Turkey, UAE, UK
*/

INSERT INTO passports (slug, name, is_active)
VALUES ('chile', 'Chile', true)
ON CONFLICT (slug) DO UPDATE SET is_active = true;

INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, max_stay_days, stay_rule, passport_validity_months, transit_required, insurance_required, return_ticket_required, sufficient_funds_required, official_source_url, last_verified, notes)
VALUES
  ('chile','argentina','visa_free',90,'Visa-free under Mercosur agreement',6,false,false,false,false,'https://www.cancilleria.gob.ar','2026-02-18','Mercosur mobility arrangement.'),
  ('chile','australia','visa_free_eta',90,'eVisitor required',6,false,false,true,true,'https://immi.homeaffairs.gov.au','2026-02-18','eVisitor required before travel.'),
  ('chile','austria','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://www.bmi.gv.at','2026-02-18','Visa-free Schengen short stay.'),
  ('chile','belgium','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://dofi.ibz.be','2026-02-18','Visa-free Schengen short stay.'),
  ('chile','brazil','visa_free',90,'Visa-free under Mercosur',6,false,false,false,false,'https://www.gov.br/mre','2026-02-18','Mercosur mobility arrangement.'),
  ('chile','canada','visa_free_eta',180,'Visa-free with eTA',6,false,false,true,true,'https://www.canada.ca','2026-02-18','eTA required.'),
  ('chile','chile','restricted',null,'Domestic travel',null,false,false,false,false,'https://www.gob.cl','2026-02-18','Passport holder traveling to own country.'),
  ('chile','china','visa_required',30,'Tourist visa required',6,true,false,true,true,'https://www.fmprc.gov.cn','2026-02-18','Apply before travel.'),
  ('chile','colombia','visa_free',90,'Andean Community agreement',6,false,false,false,false,'https://www.cancilleria.gov.co','2026-02-18','Regional mobility agreement.'),
  ('chile','croatia','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://mvep.gov.hr','2026-02-18','Visa-free Schengen short stay.'),
  ('chile','czech-republic','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://mzv.gov.cz','2026-02-18','Visa-free Schengen short stay.'),
  ('chile','egypt','visa_on_arrival',30,'Visa on arrival',6,false,false,true,true,'https://www.visa2egypt.gov.eg','2026-02-18','Visa available on arrival.'),
  ('chile','france','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://france-visas.gouv.fr','2026-02-18','Visa-free Schengen short stay.'),
  ('chile','germany','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://www.auswaertiges-amt.de','2026-02-18','Visa-free Schengen short stay.'),
  ('chile','greece','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://www.mfa.gr','2026-02-18','Visa-free Schengen short stay.'),
  ('chile','hungary','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://konzinfo.mfa.gov.hu','2026-02-18','Visa-free Schengen short stay.'),
  ('chile','india','evisa',30,'e-Tourist visa required',6,false,false,true,true,'https://indianvisaonline.gov.in','2026-02-18','Apply online.'),
  ('chile','indonesia','visa_free',30,'Visa-free short stay',6,false,false,true,true,'https://www.imigrasi.go.id','2026-02-18','Visa-free entry.'),
  ('chile','italy','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://vistoperitalia.esteri.it','2026-02-18','Visa-free Schengen short stay.'),
  ('chile','japan','visa_free',90,'Visa-free short stay',6,false,false,true,true,'https://www.mofa.go.jp','2026-02-18','Tourism visa-free.'),
  ('chile','malaysia','visa_free',90,'Visa-free short stay',6,false,false,true,true,'https://www.imi.gov.my','2026-02-18','Visa-free entry.'),
  ('chile','mexico','visa_free',180,'Visa-free short stay',6,false,false,true,true,'https://www.gob.mx/sre','2026-02-18','Tourism visa-free.'),
  ('chile','netherlands','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://www.netherlandsworldwide.nl','2026-02-18','Visa-free Schengen short stay.'),
  ('chile','new-zealand','visa_free',90,'Visa-free short stay',3,false,false,true,true,'https://www.immigration.govt.nz','2026-02-18','Visa-free entry.'),
  ('chile','nigeria','visa_required',30,'Tourist visa required',6,true,false,true,true,'https://immigration.gov.ng','2026-02-18','Apply before travel.'),
  ('chile','philippines','visa_free',30,'Visa-free short stay',6,false,false,true,true,'https://dfa.gov.ph','2026-02-18','Visa-free entry.'),
  ('chile','poland','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://www.gov.pl/web/diplomacy','2026-02-18','Visa-free Schengen short stay.'),
  ('chile','portugal','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://www.portaldascomunidades.mne.gov.pt','2026-02-18','Visa-free Schengen short stay.'),
  ('chile','qatar','visa_free',30,'Visa-free short stay',6,false,true,true,true,'https://portal.moi.gov.qa','2026-02-18','Health insurance required.'),
  ('chile','russia','visa_required',30,'Tourist visa required',6,true,true,true,true,'https://visa.kdmid.ru','2026-02-18','Apply before travel.'),
  ('chile','saudi-arabia','evisa',90,'Tourist eVisa required',6,false,true,true,true,'https://visa.visitsaudi.com','2026-02-18','eVisa required.'),
  ('chile','singapore','visa_free',90,'Visa-free short stay',6,false,false,true,true,'https://www.ica.gov.sg','2026-02-18','Visa-free entry.'),
  ('chile','south-africa','visa_free',90,'Visa-free short stay',6,false,false,true,true,'https://www.dha.gov.za','2026-02-18','Visa-free entry.'),
  ('chile','south-korea','visa_free_eta',90,'Visa-free with K-ETA',0,false,false,true,true,'https://www.visa.go.kr','2026-02-18','K-ETA required.'),
  ('chile','spain','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://www.exteriores.gob.es','2026-02-18','Visa-free Schengen short stay.'),
  ('chile','switzerland','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://www.sem.admin.ch','2026-02-18','Schengen short stay allowed.'),
  ('chile','thailand','visa_free',30,'Visa-free short stay',6,false,false,true,true,'https://www.mfa.go.th','2026-02-18','Visa-free entry.'),
  ('chile','turkey','visa_free',90,'Visa-free short stay',6,false,false,true,true,'https://www.mfa.gov.tr','2026-02-18','Visa-free entry.'),
  ('chile','united-arab-emirates','visa_free',90,'Visa-free short stay',6,false,true,true,true,'https://u.ae','2026-02-18','Visa-free entry.'),
  ('chile','united-kingdom','visa_free',180,'Visa-free short stay',6,false,false,true,true,'https://www.gov.uk','2026-02-18','Visa-free entry.'),
  ('chile','united-states','visa_free_eta',90,'Visa-free with ESTA',6,false,false,true,true,'https://esta.cbp.dhs.gov','2026-02-18','ESTA required.'),
  ('chile','vietnam','visa_free',45,'Visa-free short stay',6,false,false,true,true,'https://evisa.xuatnhapcanh.gov.vn','2026-02-18','Visa-free entry.')
ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO NOTHING;
