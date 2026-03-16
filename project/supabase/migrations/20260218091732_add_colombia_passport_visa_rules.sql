/*
  # Add Colombia Passport Visa Rules

  1. New Data
    - Adds Colombia to the `passports` table
    - Inserts 42 visa rules for Colombia passport holders

  2. Destinations Covered
    - Schengen: Austria, Belgium, Croatia, Czech Republic, France, Germany, Greece,
      Hungary, Italy, Netherlands, Poland, Portugal, Spain, Switzerland
    - Americas: Argentina, Brazil, Canada, Chile, Colombia, Mexico, United States
    - Asia-Pacific: Australia, China, India, Indonesia, Japan, Malaysia,
      New Zealand, Philippines, Singapore, South Korea, Thailand, Vietnam
    - Other: Egypt, Nigeria, Qatar, Russia, Saudi Arabia, South Africa, Turkey, UAE, UK
*/

INSERT INTO passports (slug, name, is_active)
VALUES ('colombia', 'Colombia', true)
ON CONFLICT (slug) DO UPDATE SET is_active = true;

INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, max_stay_days, stay_rule, passport_validity_months, transit_required, insurance_required, return_ticket_required, sufficient_funds_required, official_source_url, last_verified, notes)
VALUES
  ('colombia','argentina','visa_free',90,'Mercosur associate mobility',6,false,false,false,false,'https://www.cancilleria.gob.ar','2026-02-18','Regional mobility agreement.'),
  ('colombia','australia','visa_required',90,'Visitor visa required',6,true,false,true,true,'https://immi.homeaffairs.gov.au','2026-02-18','Apply before travel.'),
  ('colombia','austria','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://www.bmi.gv.at','2026-02-18','Visa-free Schengen short stay.'),
  ('colombia','belgium','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://dofi.ibz.be','2026-02-18','Visa-free Schengen short stay.'),
  ('colombia','brazil','visa_free',90,'Mercosur associate mobility',6,false,false,false,false,'https://www.gov.br/mre','2026-02-18','Regional mobility agreement.'),
  ('colombia','canada','visa_required',180,'Temporary resident visa required',6,true,false,true,true,'https://www.canada.ca','2026-02-18','Apply before travel.'),
  ('colombia','chile','visa_free',90,'Andean Community mobility',6,false,false,false,false,'https://minrel.gob.cl','2026-02-18','Regional mobility agreement.'),
  ('colombia','china','visa_required',30,'Tourist visa required',6,true,false,true,true,'https://www.fmprc.gov.cn','2026-02-18','Apply before travel.'),
  ('colombia','colombia','restricted',null,'Domestic travel',null,false,false,false,false,'https://www.cancilleria.gov.co','2026-02-18','Passport holder traveling to own country.'),
  ('colombia','croatia','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://mvep.gov.hr','2026-02-18','Visa-free Schengen short stay.'),
  ('colombia','czech-republic','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://mzv.gov.cz','2026-02-18','Visa-free Schengen short stay.'),
  ('colombia','egypt','visa_on_arrival',30,'Visa on arrival',6,false,false,true,true,'https://www.visa2egypt.gov.eg','2026-02-18','Visa available on arrival.'),
  ('colombia','france','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://france-visas.gouv.fr','2026-02-18','Visa-free Schengen short stay.'),
  ('colombia','germany','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://www.auswaertiges-amt.de','2026-02-18','Visa-free Schengen short stay.'),
  ('colombia','greece','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://www.mfa.gr','2026-02-18','Visa-free Schengen short stay.'),
  ('colombia','hungary','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://konzinfo.mfa.gov.hu','2026-02-18','Visa-free Schengen short stay.'),
  ('colombia','india','evisa',30,'e-Tourist visa required',6,false,false,true,true,'https://indianvisaonline.gov.in','2026-02-18','Apply online.'),
  ('colombia','indonesia','visa_free',30,'Visa-free short stay',6,false,false,true,true,'https://www.imigrasi.go.id','2026-02-18','Visa-free entry.'),
  ('colombia','italy','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://vistoperitalia.esteri.it','2026-02-18','Visa-free Schengen short stay.'),
  ('colombia','japan','visa_required',90,'Temporary visitor visa required',6,true,false,true,true,'https://www.mofa.go.jp','2026-02-18','Apply before travel.'),
  ('colombia','malaysia','visa_free',30,'Visa-free short stay',6,false,false,true,true,'https://www.imi.gov.my','2026-02-18','Visa-free entry.'),
  ('colombia','mexico','visa_free',180,'Visa-free short stay',6,false,false,true,true,'https://www.gob.mx/sre','2026-02-18','Tourism visa-free.'),
  ('colombia','netherlands','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://www.netherlandsworldwide.nl','2026-02-18','Visa-free Schengen short stay.'),
  ('colombia','new-zealand','visa_required',90,'Visitor visa required',3,true,false,true,true,'https://www.immigration.govt.nz','2026-02-18','Apply before travel.'),
  ('colombia','nigeria','visa_required',30,'Tourist visa required',6,true,false,true,true,'https://immigration.gov.ng','2026-02-18','Apply before travel.'),
  ('colombia','philippines','visa_free',30,'Visa-free short stay',6,false,false,true,true,'https://dfa.gov.ph','2026-02-18','Visa-free entry.'),
  ('colombia','poland','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://www.gov.pl/web/diplomacy','2026-02-18','Visa-free Schengen short stay.'),
  ('colombia','portugal','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://www.portaldascomunidades.mne.gov.pt','2026-02-18','Visa-free Schengen short stay.'),
  ('colombia','qatar','visa_free',30,'Visa-free short stay',6,false,true,true,true,'https://portal.moi.gov.qa','2026-02-18','Health insurance required.'),
  ('colombia','russia','visa_required',30,'Tourist visa required',6,true,true,true,true,'https://visa.kdmid.ru','2026-02-18','Apply before travel.'),
  ('colombia','saudi-arabia','evisa',90,'Tourist eVisa required',6,false,true,true,true,'https://visa.visitsaudi.com','2026-02-18','eVisa required.'),
  ('colombia','singapore','visa_free',30,'Visa-free short stay',6,false,false,true,true,'https://www.ica.gov.sg','2026-02-18','Visa-free entry.'),
  ('colombia','south-africa','visa_required',90,'Visitor visa required',6,true,false,true,true,'https://www.dha.gov.za','2026-02-18','Apply before travel.'),
  ('colombia','south-korea','visa_required',90,'Tourist visa required',6,true,false,true,true,'https://www.visa.go.kr','2026-02-18','Apply before travel.'),
  ('colombia','spain','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://www.exteriores.gob.es','2026-02-18','Visa-free Schengen short stay.'),
  ('colombia','switzerland','visa_free',90,'Schengen short stay',3,false,true,false,true,'https://www.sem.admin.ch','2026-02-18','Visa-free entry.'),
  ('colombia','thailand','visa_free',30,'Visa-free short stay',6,false,false,true,true,'https://www.mfa.go.th','2026-02-18','Visa-free entry.'),
  ('colombia','turkey','evisa',90,'eVisa required',6,false,false,true,true,'https://www.evisa.gov.tr','2026-02-18','Apply online.'),
  ('colombia','united-arab-emirates','visa_required',90,'Tourist visa required',6,true,true,true,true,'https://u.ae','2026-02-18','Apply before travel.'),
  ('colombia','united-kingdom','visa_free',180,'Visa-free short stay',6,false,false,true,true,'https://www.gov.uk','2026-02-18','Visa-free entry.'),
  ('colombia','united-states','visa_required',90,'B1/B2 visa required',6,true,false,true,true,'https://travel.state.gov','2026-02-18','Apply before travel.'),
  ('colombia','vietnam','visa_required',30,'eVisa required',6,false,false,true,true,'https://evisa.xuatnhapcanh.gov.vn','2026-02-18','Apply online.')
ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO NOTHING;
