/*
  # Add Austria passport visa rules

  Inserts visa rules for the Austria passport across 42 destinations.
  Covers visa_free, visa_free_eta, evisa, visa_on_arrival, visa_required, and restricted types.
*/

INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, max_stay_days, stay_rule, passport_validity_months, transit_required, insurance_required, return_ticket_required, sufficient_funds_required, official_source_url, last_verified, notes)
VALUES
  ('austria','argentina','visa_free',90,'Visa-free short stay',6,false,true,true,true,'https://etail.cancilleria.gob.ar','2026-02-18','Tourism visa-free.'),
  ('austria','australia','visa_free_eta',90,'eVisitor required',6,false,false,true,true,'https://immi.homeaffairs.gov.au','2026-02-18','eVisitor required before travel.'),
  ('austria','austria','restricted',null,'Domestic travel',null,false,false,false,false,'https://www.bmeia.gv.at','2026-02-18','Passport holder traveling to own country.'),
  ('austria','belgium','visa_free',null,'EU freedom of movement',null,false,false,false,false,'https://europa.eu/youreurope','2026-02-18','EU mobility rights apply.'),
  ('austria','brazil','visa_free',90,'Visa-free short stay',6,false,false,true,true,'https://www.gov.br/mre','2026-02-18','Tourism visa-free.'),
  ('austria','canada','visa_free_eta',180,'Visa-free with eTA',6,false,false,true,true,'https://www.canada.ca','2026-02-18','eTA required before travel.'),
  ('austria','chile','visa_free',90,'Visa-free short stay',6,false,false,true,true,'https://minrel.gob.cl','2026-02-18','Tourism visa-free.'),
  ('austria','china','visa_required',30,'Tourist visa required',6,true,false,true,true,'https://www.fmprc.gov.cn','2026-02-18','Apply for tourist visa before travel.'),
  ('austria','colombia','visa_free',90,'Visa-free short stay',6,false,false,true,true,'https://www.cancilleria.gov.co','2026-02-18','Tourism visa-free.'),
  ('austria','croatia','visa_free',null,'EU freedom of movement',null,false,false,false,false,'https://europa.eu/youreurope','2026-02-18','EU mobility rights apply.'),
  ('austria','czech-republic','visa_free',null,'EU freedom of movement',null,false,false,false,false,'https://europa.eu/youreurope','2026-02-18','EU mobility rights apply.'),
  ('austria','egypt','visa_on_arrival',30,'Visa on arrival',6,false,false,true,true,'https://www.visa2egypt.gov.eg','2026-02-18','Visa available on arrival.'),
  ('austria','france','visa_free',null,'EU freedom of movement',null,false,false,false,false,'https://europa.eu/youreurope','2026-02-18','EU mobility rights apply.'),
  ('austria','germany','visa_free',null,'EU freedom of movement',null,false,false,false,false,'https://europa.eu/youreurope','2026-02-18','EU mobility rights apply.'),
  ('austria','greece','visa_free',null,'EU freedom of movement',null,false,false,false,false,'https://europa.eu/youreurope','2026-02-18','EU mobility rights apply.'),
  ('austria','hungary','visa_free',null,'EU freedom of movement',null,false,false,false,false,'https://europa.eu/youreurope','2026-02-18','EU mobility rights apply.'),
  ('austria','india','evisa',30,'e-Tourist visa required',6,false,false,true,true,'https://indianvisaonline.gov.in','2026-02-18','Apply for e-Tourist visa.'),
  ('austria','indonesia','visa_free',30,'Visa-free short stay',6,false,false,true,true,'https://www.imigrasi.go.id','2026-02-18','Visa-free entry.'),
  ('austria','italy','visa_free',null,'EU freedom of movement',null,false,false,false,false,'https://europa.eu/youreurope','2026-02-18','EU mobility rights apply.'),
  ('austria','japan','visa_free',90,'Visa-free short stay',6,false,false,true,true,'https://www.mofa.go.jp','2026-02-18','Tourism visa-free.'),
  ('austria','malaysia','visa_free',90,'Visa-free short stay',6,false,false,true,true,'https://www.imi.gov.my','2026-02-18','Visa-free entry.'),
  ('austria','mexico','visa_free',180,'Visa-free short stay',6,false,false,true,true,'https://www.gob.mx/sre','2026-02-18','Tourism visa-free.'),
  ('austria','netherlands','visa_free',null,'EU freedom of movement',null,false,false,false,false,'https://europa.eu/youreurope','2026-02-18','EU mobility rights apply.'),
  ('austria','new-zealand','visa_free_eta',90,'Visa-free with NZeTA',3,false,false,true,true,'https://www.immigration.govt.nz','2026-02-18','NZeTA required.'),
  ('austria','nigeria','visa_required',30,'Tourist visa required',6,true,false,true,true,'https://immigration.gov.ng','2026-02-18','Apply before travel.'),
  ('austria','philippines','visa_free',30,'Visa-free short stay',6,false,false,true,true,'https://dfa.gov.ph','2026-02-18','Visa-free entry.'),
  ('austria','poland','visa_free',null,'EU freedom of movement',null,false,false,false,false,'https://europa.eu/youreurope','2026-02-18','EU mobility rights apply.'),
  ('austria','portugal','visa_free',null,'EU freedom of movement',null,false,false,false,false,'https://europa.eu/youreurope','2026-02-18','EU mobility rights apply.'),
  ('austria','qatar','visa_free',30,'Visa-free short stay',6,false,true,true,true,'https://portal.moi.gov.qa','2026-02-18','Mandatory health insurance required.'),
  ('austria','russia','visa_required',30,'Tourist visa required',6,true,true,true,true,'https://visa.kdmid.ru','2026-02-18','Apply before travel.'),
  ('austria','saudi-arabia','evisa',90,'Tourist eVisa required',6,false,true,true,true,'https://visa.visitsaudi.com','2026-02-18','eVisa required prior to travel.'),
  ('austria','singapore','visa_free',90,'Visa-free short stay',6,false,false,true,true,'https://www.ica.gov.sg','2026-02-18','Visa-free entry.'),
  ('austria','south-africa','visa_free',90,'Visa-free short stay',6,false,false,true,true,'https://www.dha.gov.za','2026-02-18','Visa-free entry.'),
  ('austria','south-korea','visa_free_eta',90,'Visa-free with K-ETA',0,false,false,true,true,'https://www.visa.go.kr','2026-02-18','K-ETA required.'),
  ('austria','spain','visa_free',null,'EU freedom of movement',null,false,false,false,false,'https://europa.eu/youreurope','2026-02-18','EU mobility rights apply.'),
  ('austria','switzerland','visa_free',90,'Schengen short stay 90/180',3,false,true,false,true,'https://www.sem.admin.ch','2026-02-18','Schengen short stay allowed.'),
  ('austria','thailand','visa_free',30,'Visa-free short stay',6,false,false,true,true,'https://www.mfa.go.th','2026-02-18','Visa-free entry.'),
  ('austria','turkey','visa_free',90,'Visa-free short stay',6,false,false,true,true,'https://www.mfa.gov.tr','2026-02-18','Visa-free entry.'),
  ('austria','united-arab-emirates','visa_free',90,'Visa-free short stay',6,false,true,true,true,'https://u.ae','2026-02-18','Visa-free entry.'),
  ('austria','united-kingdom','visa_free',180,'Visa-free short stay',6,false,false,true,true,'https://www.gov.uk','2026-02-18','Visa-free entry.'),
  ('austria','united-states','visa_free_eta',90,'Visa-free with ESTA',6,false,false,true,true,'https://esta.cbp.dhs.gov','2026-02-18','ESTA required prior to travel.'),
  ('austria','vietnam','visa_free',45,'Visa-free short stay',6,false,false,true,true,'https://evisa.xuatnhapcanh.gov.vn','2026-02-18','Visa-free entry.')
ON CONFLICT DO NOTHING;
