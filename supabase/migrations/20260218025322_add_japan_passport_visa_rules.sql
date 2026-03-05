/*
  # Add Japan Passport Visa Rules

  Upserts 31 visa rules for the Japan passport covering major destinations worldwide.

  ## Records
  - france, spain, italy, germany, austria, greece, portugal, netherlands, poland,
    hungary, czech-republic, switzerland, belgium, croatia: Schengen visa_free (90 days)
  - united-states: visa_free_eta via ESTA (90 days)
  - united-kingdom: visa_free_eta via ETA (180 days)
  - canada: visa_free_eta via eTA (180 days)
  - south-korea: visa_free_eta via K-ETA (90 days)
  - china: visa_free (30 days, unilateral)
  - turkey: visa_free (90 days)
  - mexico: visa_free (180 days)
  - thailand: visa_free (60 days)
  - malaysia: visa_free (90 days)
  - singapore: visa_free (90 days)
  - vietnam: visa_free (45 days)
  - brazil: visa_free (90 days)
  - japan: visa_free (citizen, 9999 days)
  - russia: evisa (30 days)
  - saudi-arabia: evisa (90 days)
  - india: evisa (30 days)
  - united-arab-emirates: visa_on_arrival (90 days)
  - indonesia: visa_on_arrival (30 days)

  Conflict resolution: ON CONFLICT (passport_slug, destination_slug) DO UPDATE
*/

INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, max_stay_days, stay_rule, passport_validity_months, insurance_required, return_ticket_required, sufficient_funds_required, official_source_url, last_verified, notes)
VALUES
  ('japan','france','visa_free',90,'Schengen short stay: 90 days in any 180-day period.',3,false,true,true,'https://travel-europe.europa.eu/etias_en','2026-02-18','ETIAS is expected but not yet in force everywhere; keep ETIAS status as a separate field if you track it.'),
  ('japan','spain','visa_free',90,'Schengen short stay: 90 days in any 180-day period.',3,false,true,true,'https://travel-europe.europa.eu/etias_en','2026-02-18','Schengen rules apply.'),
  ('japan','united-states','visa_free_eta',90,'Visa Waiver Program (tourism/business) with ESTA approval; up to 90 days per trip.',6,false,true,true,'https://esta.cbp.dhs.gov/','2026-02-18','ESTA required for air/sea. Work/study not allowed under VWP.'),
  ('japan','china','visa_free',30,'Unilateral visa-free entry (ordinary passport) for up to 30 days during policy validity window.',0,false,true,true,'https://www.visaforchina.cn/BER3_EN/tongzhigonggao/369746540648075264.html','2026-02-18','Policy is time-bound; re-check end date and eligibility list regularly.'),
  ('japan','italy','visa_free',90,'Schengen short stay: 90 days in any 180-day period.',3,false,true,true,'https://travel-europe.europa.eu/etias_en','2026-02-18','Schengen rules apply.'),
  ('japan','turkey','visa_free',90,'Visa exemption for tourism/transit; max 90 days within 180 days.',0,false,true,true,'https://www.mfa.gov.tr/visa-information-for-foreigners.en.mfa','2026-02-18','General 90/180 rule applies across visas/exemptions.'),
  ('japan','mexico','visa_free',180,'Tourism/business/non-paid activities: up to 180 days per entry (final length granted by immigration).',0,false,true,true,'https://embamex.sre.gob.mx/japon/index.php/en/paises-visa-en','2026-02-18','Entry is discretionary; keep proof of onward travel and funds.'),
  ('japan','thailand','visa_free',60,'Visa exemption for tourism/business/urgent work/ad-hoc work: up to 60 days; extension up to 30 days at discretion.',0,false,true,true,'https://thaiconsulatela.thaiembassy.org/en/publicservice/visa-exemption-and-visa-on-arrival-to-thailand','2026-02-18','Extension is discretionary; overstay penalties are strict.'),
  ('japan','germany','visa_free',90,'Schengen short stay: 90 days in any 180-day period.',3,false,true,true,'https://travel-europe.europa.eu/etias_en','2026-02-18','Schengen rules apply.'),
  ('japan','united-kingdom','visa_free_eta',180,'Standard Visitor: up to 6 months; ETA required for eligible visa-free nationals.',0,false,true,true,'https://www.gov.uk/guidance/check-when-you-can-get-an-electronic-travel-authorisation-eta','2026-02-18','Do not work (except permitted activities). ETA rollout dates vary by nationality; check before travel.'),
  ('japan','japan','visa_free',9999,'Citizen travel (no visa).',0,false,false,false,'https://www.mofa.go.jp/j_info/visit/visa/index.html','2026-02-18','Domestic entry rules apply to nationals; no visitor visa concept.'),
  ('japan','austria','visa_free',90,'Schengen short stay: 90 days in any 180-day period.',3,false,true,true,'https://travel-europe.europa.eu/etias_en','2026-02-18','Schengen rules apply.'),
  ('japan','greece','visa_free',90,'Schengen short stay: 90 days in any 180-day period.',3,false,true,true,'https://travel-europe.europa.eu/etias_en','2026-02-18','Schengen rules apply.'),
  ('japan','malaysia','visa_free',90,'Social visit: visa not required for stays not exceeding 90 days.',6,false,true,true,'https://www.kln.gov.my/documents/33866/10223708/1.%2BVISA%2BAPPLICATION%2B%28English%29%2B%28Updated%2Bon%2B1%2BOct.%2B2025%29.pdf/b97a0337-667f-46c5-acc7-2dbbc7bb974d','2026-02-18','Passport validity commonly enforced at 6 months.'),
  ('japan','portugal','visa_free',90,'Schengen short stay: 90 days in any 180-day period.',3,false,true,true,'https://travel-europe.europa.eu/etias_en','2026-02-18','Schengen rules apply.'),
  ('japan','russia','evisa',30,'Unified e-visa: single entry; validity 120 days; stay up to 30 days from entry (within validity).',6,true,true,true,'https://evisa.kdmid.ru/','2026-02-18','Medical insurance required for most nationalities; e-visa eligibility is limited to a government-approved list.'),
  ('japan','canada','visa_free_eta',180,'Visa-exempt; eTA required for air travel; typically up to 6 months per visit (border officer decides).',0,false,true,true,'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta.html','2026-02-18','eTA is for flying to/transiting through Canada.'),
  ('japan','netherlands','visa_free',90,'Schengen short stay: 90 days in any 180-day period.',3,false,true,true,'https://travel-europe.europa.eu/etias_en','2026-02-18','Schengen rules apply.'),
  ('japan','saudi-arabia','evisa',90,'Tourist eVisa (multiple entry) allows stays up to 90 days (per visit / per rules on portal).',6,true,true,true,'https://visa.visitsaudi.com/','2026-02-18','Insurance is typically bundled/required during eVisa purchase.'),
  ('japan','united-arab-emirates','visa_on_arrival',90,'Visa on arrival / visa-free visit stamp: commonly 90 days (terms depend on nationality and current rules).',6,false,true,true,'https://www.dubai.uae.emb-japan.go.jp/newhp/docdxb.pdf','2026-02-18','Use official UAE source if you can find a nationality list endpoint; airline sources often differ by emirate.'),
  ('japan','poland','visa_free',90,'Schengen short stay: 90 days in any 180-day period.',3,false,true,true,'https://travel-europe.europa.eu/etias_en','2026-02-18','Schengen rules apply.'),
  ('japan','hungary','visa_free',90,'Schengen short stay: 90 days in any 180-day period.',3,false,true,true,'https://travel-europe.europa.eu/etias_en','2026-02-18','Schengen rules apply.'),
  ('japan','czech-republic','visa_free',90,'Schengen short stay: 90 days in any 180-day period.',3,false,true,true,'https://travel-europe.europa.eu/etias_en','2026-02-18','Schengen rules apply.'),
  ('japan','singapore','visa_free',90,'Visa not required for Japanese nationals (short-term leisure/business).',6,false,true,true,'https://tokyo.mfa.gov.sg/visa-information/','2026-02-18','ICA can require onward ticket and proof of funds; entry is discretionary.'),
  ('japan','south-korea','visa_free_eta',90,'Visa-free short stay; K-ETA may be required depending on current exemptions/policy.',0,false,true,true,'https://www.k-eta.go.kr/portal/guide/viewetaalification.do?locale=EN','2026-02-18','Track K-ETA exemption windows separately; they change.'),
  ('japan','indonesia','visa_on_arrival',30,'Visa on Arrival / e-VOA available; single entry; 30-day stay (extendable per rules).',6,false,true,true,'https://evisa.imigrasi.go.id/front/info/evoa','2026-02-18','Use official e-VOA site; scams are common.'),
  ('japan','vietnam','visa_free',45,'Unilateral visa exemption: 45 days (policy list includes Japan).',0,false,true,true,'https://vietnam.travel/plan-your-trip/visa-requirements','2026-02-18','If staying longer, use Vietnam e-visa portal.'),
  ('japan','india','evisa',30,'India e-Visa available (stay and validity depend on eVisa category selected).',6,false,true,true,'https://indianvisaonline.gov.in/evisa/tvoa.html','2026-02-18','You should model India by eVisa subtype (eTourist 30/1yr/5yr etc.) instead of one generic row.'),
  ('japan','brazil','visa_free',90,'Reciprocal visitor visa exemption: up to 90 days.',0,false,true,true,'https://www.gov.br/mre/en/contact-us/press-area/press-releases/reciprocal-visa-exemption-between-brazil-and-japan','2026-02-18','Agreement initially set for a fixed period; re-check end/renewal status.'),
  ('japan','switzerland','visa_free',90,'Schengen short stay: 90 days in any 180-day period.',3,false,true,true,'https://travel-europe.europa.eu/etias_en','2026-02-18','Schengen rules apply.'),
  ('japan','belgium','visa_free',90,'Schengen short stay: 90 days in any 180-day period.',3,false,true,true,'https://travel-europe.europa.eu/etias_en','2026-02-18','Schengen rules apply.'),
  ('japan','croatia','visa_free',90,'Schengen short stay: 90 days in any 180-day period.',3,false,true,true,'https://travel-europe.europa.eu/etias_en','2026-02-18','Croatia is in Schengen; Schengen 90/180 applies.')
ON CONFLICT (passport_slug, destination_slug)
DO UPDATE SET
  visa_type = EXCLUDED.visa_type,
  max_stay_days = EXCLUDED.max_stay_days,
  stay_rule = EXCLUDED.stay_rule,
  passport_validity_months = EXCLUDED.passport_validity_months,
  insurance_required = EXCLUDED.insurance_required,
  return_ticket_required = EXCLUDED.return_ticket_required,
  sufficient_funds_required = EXCLUDED.sufficient_funds_required,
  official_source_url = EXCLUDED.official_source_url,
  last_verified = EXCLUDED.last_verified,
  notes = EXCLUDED.notes,
  updated_at = now();
