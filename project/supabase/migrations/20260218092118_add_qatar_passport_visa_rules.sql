/*
  # Add Qatar Passport Visa Rules

  1. New Data
    - Adds Qatar to the `passports` table
    - Inserts 42 visa rules for Qatar passport holders

  2. Destinations Covered
    - Schengen (visa-free): Austria, Belgium, Croatia, Czech Republic, France, Germany,
      Greece, Hungary, Italy, Netherlands, Poland, Portugal, Spain, Switzerland
    - Americas: Argentina (visa required), Brazil (visa-free), Canada (visa required),
      Chile (visa-free), Colombia (visa-free), Mexico (visa required), US (ESTA)
    - Asia-Pacific: Australia (visa required), China (visa required), India (eVisa),
      Indonesia (visa-free), Japan (visa required), Malaysia (visa-free),
      New Zealand (visa required), Philippines (visa-free), Singapore (visa required),
      South Korea (visa required), Thailand (visa-free), Vietnam (visa required)
    - Other: Egypt, Nigeria, Qatar, Russia, Saudi Arabia, South Africa, Turkey, UAE, UK
*/

INSERT INTO passports (slug, name, is_active)
VALUES ('qatar', 'Qatar', true)
ON CONFLICT (slug) DO UPDATE SET is_active = true;

INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, max_stay_days, stay_rule, passport_validity_months, transit_required, insurance_required, return_ticket_required, sufficient_funds_required, official_source_url, last_verified, notes)
VALUES
  ('qatar','argentina','visa_required',90,'Tourist visa required',6,true,true,true,true,'https://www.cancilleria.gob.ar','2026-02-18','Apply before travel.'),
  ('qatar','australia','visa_required',90,'Visitor visa required',6,true,false,true,true,'https://immi.homeaffairs.gov.au','2026-02-18','Apply before travel.'),
  ('qatar','austria','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://www.bmi.gv.at','2026-02-18','Visa-free Schengen short stay.'),
  ('qatar','belgium','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://dofi.ibz.be','2026-02-18','Visa-free Schengen short stay.'),
  ('qatar','brazil','visa_free',90,'Visa-free short stay',6,false,false,true,true,'https://www.gov.br/mre','2026-02-18','Visa-free entry.'),
  ('qatar','canada','visa_required',180,'Temporary resident visa required',6,true,false,true,true,'https://www.canada.ca','2026-02-18','Apply before travel.'),
  ('qatar','chile','visa_free',90,'Visa-free short stay',6,false,false,true,true,'https://minrel.gob.cl','2026-02-18','Visa-free entry.'),
  ('qatar','china','visa_required',30,'Tourist visa required',6,true,false,true,true,'https://www.fmprc.gov.cn','2026-02-18','Apply before travel.'),
  ('qatar','colombia','visa_free',90,'Visa-free short stay',6,false,false,true,true,'https://www.cancilleria.gov.co','2026-02-18','Visa-free entry.'),
  ('qatar','croatia','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://mvep.gov.hr','2026-02-18','Visa-free Schengen short stay.'),
  ('qatar','czech-republic','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://mzv.gov.cz','2026-02-18','Visa-free Schengen short stay.'),
  ('qatar','egypt','visa_free',90,'Regional facilitation',6,false,true,true,true,'https://www.mfa.gov.eg','2026-02-18','Visa-free short stay.'),
  ('qatar','france','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://france-visas.gouv.fr','2026-02-18','Visa-free Schengen short stay.'),
  ('qatar','germany','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://www.auswaertiges-amt.de','2026-02-18','Visa-free Schengen short stay.'),
  ('qatar','greece','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://www.mfa.gr','2026-02-18','Visa-free Schengen short stay.'),
  ('qatar','hungary','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://konzinfo.mfa.gov.hu','2026-02-18','Visa-free Schengen short stay.'),
  ('qatar','india','evisa',30,'eVisa available',6,false,false,true,true,'https://indianvisaonline.gov.in','2026-02-18','Apply online.'),
  ('qatar','indonesia','visa_free',30,'Visa-free short stay',6,false,false,true,true,'https://www.imigrasi.go.id','2026-02-18','Visa-free entry.'),
  ('qatar','italy','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://vistoperitalia.esteri.it','2026-02-18','Visa-free Schengen short stay.'),
  ('qatar','japan','visa_required',90,'Temporary visitor visa required',6,true,false,true,true,'https://www.mofa.go.jp','2026-02-18','Apply before travel.'),
  ('qatar','malaysia','visa_free',90,'Visa-free short stay',6,false,false,true,true,'https://www.imi.gov.my','2026-02-18','Visa-free entry.'),
  ('qatar','mexico','visa_required',180,'Tourist visa required',6,true,false,true,true,'https://www.gob.mx/sre','2026-02-18','Apply before travel.'),
  ('qatar','netherlands','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://www.netherlandsworldwide.nl','2026-02-18','Visa-free Schengen short stay.'),
  ('qatar','new-zealand','visa_required',90,'Visitor visa required',3,true,false,true,true,'https://www.immigration.govt.nz','2026-02-18','Apply before travel.'),
  ('qatar','nigeria','visa_required',30,'Visa required',6,true,false,true,true,'https://immigration.gov.ng','2026-02-18','Apply before travel.'),
  ('qatar','philippines','visa_free',30,'Visa-free short stay',6,false,false,true,true,'https://dfa.gov.ph','2026-02-18','Visa-free entry.'),
  ('qatar','poland','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://www.gov.pl/web/diplomacy','2026-02-18','Visa-free Schengen short stay.'),
  ('qatar','portugal','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://www.portaldascomunidades.mne.gov.pt','2026-02-18','Visa-free Schengen short stay.'),
  ('qatar','qatar','restricted',null,'Domestic travel',null,false,false,false,false,'https://portal.moi.gov.qa','2026-02-18','Passport holder traveling to own country.'),
  ('qatar','russia','visa_required',30,'Tourist visa required',6,true,true,true,true,'https://visa.kdmid.ru','2026-02-18','Apply before travel.'),
  ('qatar','saudi-arabia','visa_free',90,'GCC mobility arrangement',6,false,true,true,true,'https://visa.visitsaudi.com','2026-02-18','Regional facilitation applies.'),
  ('qatar','singapore','visa_required',30,'Visa required',6,true,false,true,true,'https://www.ica.gov.sg','2026-02-18','Apply before travel.'),
  ('qatar','south-africa','visa_required',90,'Visitor visa required',6,true,false,true,true,'https://www.dha.gov.za','2026-02-18','Apply before travel.'),
  ('qatar','south-korea','visa_required',90,'Tourist visa required',6,true,false,true,true,'https://www.visa.go.kr','2026-02-18','Apply before travel.'),
  ('qatar','spain','visa_free',90,'Schengen 90/180 rule',3,false,true,false,true,'https://www.exteriores.gob.es','2026-02-18','Visa-free Schengen short stay.'),
  ('qatar','switzerland','visa_free',90,'Schengen short stay',3,false,true,false,true,'https://www.sem.admin.ch','2026-02-18','Visa-free entry.'),
  ('qatar','thailand','visa_free',30,'Visa-free short stay',6,false,false,true,true,'https://www.mfa.go.th','2026-02-18','Visa-free entry.'),
  ('qatar','turkey','visa_free',90,'Visa-free short stay',6,false,false,true,true,'https://www.mfa.gov.tr','2026-02-18','Visa-free entry.'),
  ('qatar','united-arab-emirates','visa_free',null,'GCC mobility arrangement',6,false,false,false,false,'https://u.ae','2026-02-18','Freedom of movement within GCC.'),
  ('qatar','united-kingdom','visa_free',180,'Visa-free short stay',6,false,false,true,true,'https://www.gov.uk','2026-02-18','Visa-free entry.'),
  ('qatar','united-states','visa_free_eta',90,'Visa-free with ESTA',6,false,false,true,true,'https://esta.cbp.dhs.gov','2026-02-18','ESTA required.'),
  ('qatar','vietnam','visa_required',30,'eVisa required',6,false,false,true,true,'https://evisa.xuatnhapcanh.gov.vn','2026-02-18','Apply online.')
ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO NOTHING;
