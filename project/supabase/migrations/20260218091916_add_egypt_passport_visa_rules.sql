/*
  # Add Egypt Passport Visa Rules

  1. New Data
    - Adds Egypt to the `passports` table
    - Inserts 42 visa rules for Egypt passport holders

  2. Destinations Covered
    - Schengen: Austria, Belgium, Croatia, Czech Republic, France, Germany, Greece,
      Hungary, Italy, Netherlands, Poland, Portugal, Spain, Switzerland
    - Americas: Argentina, Brazil, Canada, Chile, Colombia, Mexico, United States
    - Asia-Pacific: Australia, China, India, Indonesia, Japan, Malaysia,
      New Zealand, Philippines, Singapore, South Korea, Thailand, Vietnam
    - Other: Egypt, Nigeria, Qatar, Russia, Saudi Arabia, South Africa, Turkey, UAE, UK
*/

INSERT INTO passports (slug, name, is_active)
VALUES ('egypt', 'Egypt', true)
ON CONFLICT (slug) DO UPDATE SET is_active = true;

INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, max_stay_days, stay_rule, passport_validity_months, transit_required, insurance_required, return_ticket_required, sufficient_funds_required, official_source_url, last_verified, notes)
VALUES
  ('egypt','argentina','visa_required',90,'Tourist visa required',6,true,true,true,true,'https://www.cancilleria.gob.ar','2026-02-18','Apply before travel.'),
  ('egypt','australia','visa_required',90,'Visitor visa required',6,true,false,true,true,'https://immi.homeaffairs.gov.au','2026-02-18','Apply before travel.'),
  ('egypt','austria','visa_required',90,'Schengen visa required',3,true,true,true,true,'https://www.bmi.gv.at','2026-02-18','Schengen visa required.'),
  ('egypt','belgium','visa_required',90,'Schengen visa required',3,true,true,true,true,'https://dofi.ibz.be','2026-02-18','Schengen visa required.'),
  ('egypt','brazil','visa_required',90,'Tourist visa required',6,true,false,true,true,'https://www.gov.br/mre','2026-02-18','Apply before travel.'),
  ('egypt','canada','visa_required',180,'Temporary resident visa required',6,true,false,true,true,'https://www.canada.ca','2026-02-18','Apply before travel.'),
  ('egypt','chile','visa_required',90,'Tourist visa required',6,true,false,true,true,'https://minrel.gob.cl','2026-02-18','Apply before travel.'),
  ('egypt','china','visa_required',30,'Tourist visa required',6,true,false,true,true,'https://www.fmprc.gov.cn','2026-02-18','Apply before travel.'),
  ('egypt','colombia','visa_required',90,'Tourist visa required',6,true,false,true,true,'https://www.cancilleria.gov.co','2026-02-18','Apply before travel.'),
  ('egypt','croatia','visa_required',90,'Schengen visa required',3,true,true,true,true,'https://mvep.gov.hr','2026-02-18','Schengen visa required.'),
  ('egypt','czech-republic','visa_required',90,'Schengen visa required',3,true,true,true,true,'https://mzv.gov.cz','2026-02-18','Schengen visa required.'),
  ('egypt','egypt','restricted',null,'Domestic travel',null,false,false,false,false,'https://www.mfa.gov.eg','2026-02-18','Passport holder traveling to own country.'),
  ('egypt','france','visa_required',90,'Schengen visa required',3,true,true,true,true,'https://france-visas.gouv.fr','2026-02-18','Schengen visa required.'),
  ('egypt','germany','visa_required',90,'Schengen visa required',3,true,true,true,true,'https://www.auswaertiges-amt.de','2026-02-18','Schengen visa required.'),
  ('egypt','greece','visa_required',90,'Schengen visa required',3,true,true,true,true,'https://www.mfa.gr','2026-02-18','Schengen visa required.'),
  ('egypt','hungary','visa_required',90,'Schengen visa required',3,true,true,true,true,'https://konzinfo.mfa.gov.hu','2026-02-18','Schengen visa required.'),
  ('egypt','india','evisa',30,'e-Tourist visa available',6,false,false,true,true,'https://indianvisaonline.gov.in','2026-02-18','Apply online.'),
  ('egypt','indonesia','visa_required',30,'Visa required',6,true,false,true,true,'https://www.imigrasi.go.id','2026-02-18','Apply before travel.'),
  ('egypt','italy','visa_required',90,'Schengen visa required',3,true,true,true,true,'https://vistoperitalia.esteri.it','2026-02-18','Schengen visa required.'),
  ('egypt','japan','visa_required',90,'Tourist visa required',6,true,false,true,true,'https://www.mofa.go.jp','2026-02-18','Apply before travel.'),
  ('egypt','malaysia','visa_free',30,'Visa-free short stay',6,false,false,true,true,'https://www.imi.gov.my','2026-02-18','Visa-free entry.'),
  ('egypt','mexico','visa_required',180,'Tourist visa required',6,true,false,true,true,'https://www.gob.mx/sre','2026-02-18','Apply before travel.'),
  ('egypt','netherlands','visa_required',90,'Schengen visa required',3,true,true,true,true,'https://www.netherlandsworldwide.nl','2026-02-18','Schengen visa required.'),
  ('egypt','new-zealand','visa_required',90,'Visitor visa required',3,true,false,true,true,'https://www.immigration.govt.nz','2026-02-18','Apply before travel.'),
  ('egypt','nigeria','visa_required',30,'Visa required',6,true,false,true,true,'https://immigration.gov.ng','2026-02-18','Apply before travel.'),
  ('egypt','philippines','visa_required',30,'Visa required',6,true,false,true,true,'https://dfa.gov.ph','2026-02-18','Apply before travel.'),
  ('egypt','poland','visa_required',90,'Schengen visa required',3,true,true,true,true,'https://www.gov.pl/web/diplomacy','2026-02-18','Schengen visa required.'),
  ('egypt','portugal','visa_required',90,'Schengen visa required',3,true,true,true,true,'https://www.portaldascomunidades.mne.gov.pt','2026-02-18','Schengen visa required.'),
  ('egypt','qatar','visa_free',30,'Visa-free short stay',6,false,true,true,true,'https://portal.moi.gov.qa','2026-02-18','Health insurance required.'),
  ('egypt','russia','visa_required',30,'Tourist visa required',6,true,true,true,true,'https://visa.kdmid.ru','2026-02-18','Apply before travel.'),
  ('egypt','saudi-arabia','visa_free',90,'Regional agreement short stay',6,false,true,true,true,'https://visa.visitsaudi.com','2026-02-18','Regional facilitation applies.'),
  ('egypt','singapore','visa_required',30,'Visa required',6,true,false,true,true,'https://www.ica.gov.sg','2026-02-18','Apply before travel.'),
  ('egypt','south-africa','visa_required',90,'Visitor visa required',6,true,false,true,true,'https://www.dha.gov.za','2026-02-18','Apply before travel.'),
  ('egypt','south-korea','visa_required',90,'Tourist visa required',6,true,false,true,true,'https://www.visa.go.kr','2026-02-18','Apply before travel.'),
  ('egypt','spain','visa_required',90,'Schengen visa required',3,true,true,true,true,'https://www.exteriores.gob.es','2026-02-18','Schengen visa required.'),
  ('egypt','switzerland','visa_required',90,'Schengen visa required',3,true,true,true,true,'https://www.sem.admin.ch','2026-02-18','Schengen visa required.'),
  ('egypt','thailand','visa_on_arrival',15,'Visa on arrival',6,false,false,true,true,'https://www.mfa.go.th','2026-02-18','VOA available.'),
  ('egypt','turkey','evisa',30,'eVisa available',6,false,false,true,true,'https://www.evisa.gov.tr','2026-02-18','Apply online.'),
  ('egypt','united-arab-emirates','visa_free',90,'Regional agreement short stay',6,false,true,true,true,'https://u.ae','2026-02-18','Regional facilitation applies.'),
  ('egypt','united-kingdom','visa_required',180,'Standard visitor visa required',6,true,false,true,true,'https://www.gov.uk','2026-02-18','Apply before travel.'),
  ('egypt','united-states','visa_required',90,'B1/B2 visa required',6,true,false,true,true,'https://travel.state.gov','2026-02-18','Apply before travel.'),
  ('egypt','vietnam','visa_required',30,'eVisa required',6,false,false,true,true,'https://evisa.xuatnhapcanh.gov.vn','2026-02-18','Apply online.')
ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO NOTHING;
