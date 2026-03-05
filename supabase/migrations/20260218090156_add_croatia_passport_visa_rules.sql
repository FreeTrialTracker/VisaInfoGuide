/*
  # Add Croatia Passport Visa Rules

  1. New Data
    - Adds Croatia to the `passports` table
    - Adds Croatia to the `destinations` table
    - Inserts 42 visa rules for Croatian passport holders

  2. Destinations Covered
    - EU/Schengen: Austria, Belgium, Croatia, Czech Republic, France, Germany, Greece, Hungary,
      Italy, Netherlands, Poland, Portugal, Spain, Switzerland
    - Americas: Argentina, Brazil, Canada, Chile, Colombia, Mexico, United States
    - Asia-Pacific: Australia, China, India, Indonesia, Japan, Malaysia, New Zealand,
      Philippines, Singapore, South Korea, Thailand, Vietnam
    - Other: Egypt, Nigeria, Qatar, Russia, Saudi Arabia, South Africa, Turkey, UAE, UK
*/

INSERT INTO passports (slug, name, is_active)
VALUES ('croatia', 'Croatia', true)
ON CONFLICT (slug) DO UPDATE SET is_active = true;

INSERT INTO destinations (slug, name, is_active)
VALUES ('croatia', 'Croatia', true)
ON CONFLICT (slug) DO UPDATE SET is_active = true;

INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, max_stay_days, stay_rule, passport_validity_months, transit_required, insurance_required, return_ticket_required, sufficient_funds_required, official_source_url, last_verified, notes)
VALUES
  ('croatia','argentina','visa_free',90,'Visa-free short stay',6,false,true,true,true,'https://etail.cancilleria.gob.ar','2026-02-18','Tourism visa-free.'),
  ('croatia','australia','visa_free_eta',90,'eVisitor required',6,false,false,true,true,'https://immi.homeaffairs.gov.au','2026-02-18','eVisitor required before travel.'),
  ('croatia','austria','visa_free',null,'EU freedom of movement',null,false,false,false,false,'https://europa.eu/youreurope','2026-02-18','EU mobility rights apply.'),
  ('croatia','belgium','visa_free',null,'EU freedom of movement',null,false,false,false,false,'https://europa.eu/youreurope','2026-02-18','EU mobility rights apply.'),
  ('croatia','brazil','visa_free',90,'Visa-free short stay',6,false,false,true,true,'https://www.gov.br/mre','2026-02-18','Tourism visa-free.'),
  ('croatia','canada','visa_free_eta',180,'Visa-free with eTA',6,false,false,true,true,'https://www.canada.ca','2026-02-18','eTA required before travel.'),
  ('croatia','chile','visa_free',90,'Visa-free short stay',6,false,false,true,true,'https://minrel.gob.cl','2026-02-18','Tourism visa-free.'),
  ('croatia','china','visa_required',30,'Tourist visa required',6,true,false,true,true,'https://www.fmprc.gov.cn','2026-02-18','Apply before travel.'),
  ('croatia','colombia','visa_free',90,'Visa-free short stay',6,false,false,true,true,'https://www.cancilleria.gov.co','2026-02-18','Tourism visa-free.'),
  ('croatia','croatia','restricted',null,'Domestic travel',null,false,false,false,false,'https://mvep.gov.hr','2026-02-18','Passport holder traveling to own country.'),
  ('croatia','czech-republic','visa_free',null,'EU freedom of movement',null,false,false,false,false,'https://europa.eu/youreurope','2026-02-18','EU mobility rights apply.'),
  ('croatia','egypt','visa_on_arrival',30,'Visa on arrival',6,false,false,true,true,'https://www.visa2egypt.gov.eg','2026-02-18','Visa available on arrival.'),
  ('croatia','france','visa_free',null,'EU freedom of movement',null,false,false,false,false,'https://europa.eu/youreurope','2026-02-18','EU mobility rights apply.'),
  ('croatia','germany','visa_free',null,'EU freedom of movement',null,false,false,false,false,'https://europa.eu/youreurope','2026-02-18','EU mobility rights apply.'),
  ('croatia','greece','visa_free',null,'EU freedom of movement',null,false,false,false,false,'https://europa.eu/youreurope','2026-02-18','EU mobility rights apply.'),
  ('croatia','hungary','visa_free',null,'EU freedom of movement',null,false,false,false,false,'https://europa.eu/youreurope','2026-02-18','EU mobility rights apply.'),
  ('croatia','india','evisa',30,'e-Tourist visa required',6,false,false,true,true,'https://indianvisaonline.gov.in','2026-02-18','Apply online.'),
  ('croatia','indonesia','visa_free',30,'Visa-free short stay',6,false,false,true,true,'https://www.imigrasi.go.id','2026-02-18','Visa-free entry.'),
  ('croatia','italy','visa_free',null,'EU freedom of movement',null,false,false,false,false,'https://europa.eu/youreurope','2026-02-18','EU mobility rights apply.'),
  ('croatia','japan','visa_free',90,'Visa-free short stay',6,false,false,true,true,'https://www.mofa.go.jp','2026-02-18','Tourism visa-free.'),
  ('croatia','malaysia','visa_free',90,'Visa-free short stay',6,false,false,true,true,'https://www.imi.gov.my','2026-02-18','Visa-free entry.'),
  ('croatia','mexico','visa_free',180,'Visa-free short stay',6,false,false,true,true,'https://www.gob.mx/sre','2026-02-18','Tourism visa-free.'),
  ('croatia','netherlands','visa_free',null,'EU freedom of movement',null,false,false,false,false,'https://europa.eu/youreurope','2026-02-18','EU mobility rights apply.'),
  ('croatia','new-zealand','visa_free_eta',90,'Visa-free with NZeTA',3,false,false,true,true,'https://www.immigration.govt.nz','2026-02-18','NZeTA required.'),
  ('croatia','nigeria','visa_required',30,'Tourist visa required',6,true,false,true,true,'https://immigration.gov.ng','2026-02-18','Apply before travel.'),
  ('croatia','philippines','visa_free',30,'Visa-free short stay',6,false,false,true,true,'https://dfa.gov.ph','2026-02-18','Visa-free entry.'),
  ('croatia','poland','visa_free',null,'EU freedom of movement',null,false,false,false,false,'https://europa.eu/youreurope','2026-02-18','EU mobility rights apply.'),
  ('croatia','portugal','visa_free',null,'EU freedom of movement',null,false,false,false,false,'https://europa.eu/youreurope','2026-02-18','EU mobility rights apply.'),
  ('croatia','qatar','visa_free',30,'Visa-free short stay',6,false,true,true,true,'https://portal.moi.gov.qa','2026-02-18','Health insurance required.'),
  ('croatia','russia','visa_required',30,'Tourist visa required',6,true,true,true,true,'https://visa.kdmid.ru','2026-02-18','Apply before travel.'),
  ('croatia','saudi-arabia','evisa',90,'Tourist eVisa required',6,false,true,true,true,'https://visa.visitsaudi.com','2026-02-18','eVisa required.'),
  ('croatia','singapore','visa_free',90,'Visa-free short stay',6,false,false,true,true,'https://www.ica.gov.sg','2026-02-18','Visa-free entry.'),
  ('croatia','south-africa','visa_free',90,'Visa-free short stay',6,false,false,true,true,'https://www.dha.gov.za','2026-02-18','Visa-free entry.'),
  ('croatia','south-korea','visa_free_eta',90,'Visa-free with K-ETA',0,false,false,true,true,'https://www.visa.go.kr','2026-02-18','K-ETA required.'),
  ('croatia','spain','visa_free',null,'EU freedom of movement',null,false,false,false,false,'https://europa.eu/youreurope','2026-02-18','EU mobility rights apply.'),
  ('croatia','switzerland','visa_free',90,'Schengen short stay 90/180',3,false,true,false,true,'https://www.sem.admin.ch','2026-02-18','Schengen short stay allowed.'),
  ('croatia','thailand','visa_free',30,'Visa-free short stay',6,false,false,true,true,'https://www.mfa.go.th','2026-02-18','Visa-free entry.'),
  ('croatia','turkey','visa_free',90,'Visa-free short stay',6,false,false,true,true,'https://www.mfa.gov.tr','2026-02-18','Visa-free entry.'),
  ('croatia','united-arab-emirates','visa_free',90,'Visa-free short stay',6,false,true,true,true,'https://u.ae','2026-02-18','Visa-free entry.'),
  ('croatia','united-kingdom','visa_free',180,'Visa-free short stay',6,false,false,true,true,'https://www.gov.uk','2026-02-18','Visa-free entry.'),
  ('croatia','united-states','visa_free_eta',90,'Visa-free with ESTA',6,false,false,true,true,'https://esta.cbp.dhs.gov','2026-02-18','ESTA required.'),
  ('croatia','vietnam','visa_free',45,'Visa-free short stay',6,false,false,true,true,'https://evisa.xuatnhapcanh.gov.vn','2026-02-18','Visa-free entry.')
ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO NOTHING;
