/*
  # Add New Zealand Passport Visa Rules

  1. New Data
    - Adds New Zealand to the `passports` table
    - Inserts 42 visa rules for New Zealand passport holders

  2. Destinations Covered
    - Schengen: Austria, Belgium, Croatia, Czech Republic, France, Germany, Greece,
      Hungary, Italy, Netherlands, Poland, Portugal, Spain, Switzerland
    - Americas: Argentina, Brazil, Canada, Chile, Colombia, Mexico, United States
    - Asia-Pacific: Australia (special visa-free), China, India, Indonesia, Japan,
      Malaysia, New Zealand, Philippines, Singapore, South Korea, Thailand, Vietnam
    - Other: Egypt, Nigeria, Qatar, Russia, Saudi Arabia, South Africa, Turkey, UAE, UK
*/

INSERT INTO passports (slug, name, is_active)
VALUES ('new-zealand', 'New Zealand', true)
ON CONFLICT (slug) DO UPDATE SET is_active = true;

INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, max_stay_days, stay_rule, passport_validity_months, transit_required, insurance_required, return_ticket_required, sufficient_funds_required, official_source_url, last_verified, notes)
VALUES
  ('new-zealand','argentina','visa_free',90,'Visa-free short stay',6,false,true,true,true,'https://etail.cancilleria.gob.ar','2026-02-18','Tourism visa-free.'),
  ('new-zealand','australia','visa_free',null,'Special Category Visa on arrival',null,false,false,false,false,'https://immi.homeaffairs.gov.au','2026-02-18','Indefinite stay rights under Trans-Tasman Travel Arrangement.'),
  ('new-zealand','austria','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://www.bmi.gv.at','2026-02-18','Visa-free Schengen short stay.'),
  ('new-zealand','belgium','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://dofi.ibz.be','2026-02-18','Visa-free Schengen short stay.'),
  ('new-zealand','brazil','visa_free',90,'Visa-free short stay',6,false,false,true,true,'https://www.gov.br/mre','2026-02-18','Tourism visa-free.'),
  ('new-zealand','canada','visa_free_eta',180,'Visa-free with eTA',6,false,false,true,true,'https://www.canada.ca','2026-02-18','eTA required.'),
  ('new-zealand','chile','visa_free',90,'Visa-free short stay',6,false,false,true,true,'https://minrel.gob.cl','2026-02-18','Tourism visa-free.'),
  ('new-zealand','china','visa_required',30,'Tourist visa required',6,true,false,true,true,'https://www.fmprc.gov.cn','2026-02-18','Apply before travel.'),
  ('new-zealand','colombia','visa_free',90,'Visa-free short stay',6,false,false,true,true,'https://www.cancilleria.gov.co','2026-02-18','Tourism visa-free.'),
  ('new-zealand','croatia','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://mvep.gov.hr','2026-02-18','Visa-free Schengen short stay.'),
  ('new-zealand','czech-republic','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://mzv.gov.cz','2026-02-18','Visa-free Schengen short stay.'),
  ('new-zealand','egypt','visa_on_arrival',30,'Visa on arrival',6,false,false,true,true,'https://www.visa2egypt.gov.eg','2026-02-18','Visa available on arrival.'),
  ('new-zealand','france','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://france-visas.gouv.fr','2026-02-18','Visa-free Schengen short stay.'),
  ('new-zealand','germany','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://www.auswaertiges-amt.de','2026-02-18','Visa-free Schengen short stay.'),
  ('new-zealand','greece','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://www.mfa.gr','2026-02-18','Visa-free Schengen short stay.'),
  ('new-zealand','hungary','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://konzinfo.mfa.gov.hu','2026-02-18','Visa-free Schengen short stay.'),
  ('new-zealand','india','evisa',30,'e-Tourist visa required',6,false,false,true,true,'https://indianvisaonline.gov.in','2026-02-18','Apply online.'),
  ('new-zealand','indonesia','visa_free',30,'Visa-free short stay',6,false,false,true,true,'https://www.imigrasi.go.id','2026-02-18','Visa-free entry.'),
  ('new-zealand','italy','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://vistoperitalia.esteri.it','2026-02-18','Visa-free Schengen short stay.'),
  ('new-zealand','japan','visa_free',90,'Visa-free short stay',6,false,false,true,true,'https://www.mofa.go.jp','2026-02-18','Tourism visa-free.'),
  ('new-zealand','malaysia','visa_free',90,'Visa-free short stay',6,false,false,true,true,'https://www.imi.gov.my','2026-02-18','Visa-free entry.'),
  ('new-zealand','mexico','visa_free',180,'Visa-free short stay',6,false,false,true,true,'https://www.gob.mx/sre','2026-02-18','Tourism visa-free.'),
  ('new-zealand','netherlands','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://www.netherlandsworldwide.nl','2026-02-18','Visa-free Schengen short stay.'),
  ('new-zealand','new-zealand','restricted',null,'Domestic travel',null,false,false,false,false,'https://www.immigration.govt.nz','2026-02-18','Passport holder traveling to own country.'),
  ('new-zealand','nigeria','visa_required',30,'Tourist visa required',6,true,false,true,true,'https://immigration.gov.ng','2026-02-18','Apply before travel.'),
  ('new-zealand','philippines','visa_free',30,'Visa-free short stay',6,false,false,true,true,'https://dfa.gov.ph','2026-02-18','Visa-free entry.'),
  ('new-zealand','poland','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://www.gov.pl/web/diplomacy','2026-02-18','Visa-free Schengen short stay.'),
  ('new-zealand','portugal','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://www.portaldascomunidades.mne.gov.pt','2026-02-18','Visa-free Schengen short stay.'),
  ('new-zealand','qatar','visa_free',30,'Visa-free short stay',6,false,true,true,true,'https://portal.moi.gov.qa','2026-02-18','Health insurance required.'),
  ('new-zealand','russia','visa_required',30,'Tourist visa required',6,true,true,true,true,'https://visa.kdmid.ru','2026-02-18','Apply before travel.'),
  ('new-zealand','saudi-arabia','evisa',90,'Tourist eVisa required',6,false,true,true,true,'https://visa.visitsaudi.com','2026-02-18','eVisa required.'),
  ('new-zealand','singapore','visa_free',90,'Visa-free short stay',6,false,false,true,true,'https://www.ica.gov.sg','2026-02-18','Visa-free entry.'),
  ('new-zealand','south-africa','visa_free',90,'Visa-free short stay',6,false,false,true,true,'https://www.dha.gov.za','2026-02-18','Visa-free entry.'),
  ('new-zealand','south-korea','visa_free_eta',90,'Visa-free with K-ETA',0,false,false,true,true,'https://www.visa.go.kr','2026-02-18','K-ETA required.'),
  ('new-zealand','spain','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://www.exteriores.gob.es','2026-02-18','Visa-free Schengen short stay.'),
  ('new-zealand','switzerland','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://www.sem.admin.ch','2026-02-18','Schengen short stay allowed.'),
  ('new-zealand','thailand','visa_free',30,'Visa-free short stay',6,false,false,true,true,'https://www.mfa.go.th','2026-02-18','Visa-free entry.'),
  ('new-zealand','turkey','visa_free',90,'Visa-free short stay',6,false,false,true,true,'https://www.mfa.gov.tr','2026-02-18','Visa-free entry.'),
  ('new-zealand','united-arab-emirates','visa_free',90,'Visa-free short stay',6,false,true,true,true,'https://u.ae','2026-02-18','Visa-free entry.'),
  ('new-zealand','united-kingdom','visa_free',180,'Visa-free short stay',6,false,false,true,true,'https://www.gov.uk','2026-02-18','Visa-free entry.'),
  ('new-zealand','united-states','visa_free_eta',90,'Visa-free with ESTA',6,false,false,true,true,'https://esta.cbp.dhs.gov','2026-02-18','ESTA required.'),
  ('new-zealand','vietnam','visa_free',45,'Visa-free short stay',6,false,false,true,true,'https://evisa.xuatnhapcanh.gov.vn','2026-02-18','Visa-free entry.')
ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO NOTHING;
