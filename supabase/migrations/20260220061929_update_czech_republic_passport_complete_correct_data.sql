/*
  # Update Czech Republic Passport - Complete Accurate Visa Data

  ## Overview
  Comprehensive update of all Czech Republic passport visa requirements based on official sources,
  Czech Ministry of Foreign Affairs data, and embassy confirmations (February 2026).

  ## Key Updates

  1. **China** - Visa required (Czech Republic excluded from visa-free program due to diplomatic tensions)
  2. **China eVisa** - Available online for 30 days stay
  3. **China Transit** - 240-hour (10-day) visa-free transit policy available
  4. **Vietnam** - 45 days visa-free (temporary policy until 31 Dec 2026)
  5. **Australia** - eVisitor (subclass 651) - free EU-exclusive authorization
  6. **UK** - ETA required from 2 April 2025 (£16, 2-year validity)
  7. **US** - VWP/ESTA (long-standing member, USD 21, 2-year validity)
  8. **South Korea** - K-ETA exemption for EU citizens (suspended)
  9. **Canada** - eTA required (CAD $7)
  10. **New Zealand** - NZeTA + IVL levy (NZD 9-12 + NZD 100)
  11. **Russia** - Visa required (Czech MFA advises against travel, Level 4 advisory)
  12. **Thailand** - 60 days visa-free (expanded from 30 in 2024)
  
  ## Requirement Status Values
  - All requirements updated to honest 3-state enums
  - Passport validity requirements specified where confirmed
  - Return ticket, funds, insurance marked as required or may_be_requested
  
  ## Data Sources
  - Czech Ministry of Foreign Affairs (MFA)
  - Official visa portals (ESTA, eVisitor, NZeTA, etc.)
  - Verified February 2026
*/

-- Argentina: 90 days visa-free
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 90,
  stay_rule = '90 days per visit. Eligible to apply to extend for additional 90 days at DNM.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'may_be_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'Czech EU passport holders enjoy visa-free access. Biometric fingerprinting on arrival. Czech ID card not accepted outside EU.',
  official_source_url = 'https://www.argentina.gob.ar/interior/migraciones',
  last_verified = '2026-02-20'
WHERE passport_slug = 'czech-republic' AND destination_slug = 'argentina';

-- Australia: eVisitor (subclass 651) - free electronic authorization
UPDATE visa_rules SET
  visa_type = 'visa_free_eta',
  max_stay_days = 90,
  stay_rule = 'Up to 3 months per visit. Multiple entries allowed within 12-month validity.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  notes = 'Free eVisitor visa (subclass 651) exclusively for EU passport holders. Apply online via ImmiAccount. Approval within 1-3 days. Strict biosecurity.',
  official_source_url = 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/evisitor-651',
  last_verified = '2026-02-20'
WHERE passport_slug = 'czech-republic' AND destination_slug = 'australia';

-- Austria: EU Freedom of Movement
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = NULL,
  stay_rule = 'Unlimited. EU citizens may reside indefinitely with registration for stays beyond 3 months.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'EU Freedom of Movement. Czech national ID card accepted. No EES/ETIAS for EU citizens. Austria is a neighboring country with deep historical ties.',
  official_source_url = 'https://www.oesterreich.gv.at',
  last_verified = '2026-02-20'
WHERE passport_slug = 'czech-republic' AND destination_slug = 'austria';

-- Belgium: EU Freedom of Movement
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = NULL,
  stay_rule = 'Unlimited. EU citizens may reside indefinitely with registration for stays beyond 3 months.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'EU Freedom of Movement. Czech national ID card accepted. Belgium hosts EU institutions and NATO headquarters in Brussels.',
  official_source_url = 'https://www.belgium.be',
  last_verified = '2026-02-20'
WHERE passport_slug = 'czech-republic' AND destination_slug = 'belgium';

-- Brazil: 90 days visa-free
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 90,
  stay_rule = '90 days per visit, extendable once for additional 90 days at Brazilian Federal Police.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'may_be_requested',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  notes = 'Yellow fever vaccination certificate required if arriving from endemic area. Czech EU passport enjoys visa-free access.',
  official_source_url = 'https://www.gov.br/mre/en',
  last_verified = '2026-02-20'
WHERE passport_slug = 'czech-republic' AND destination_slug = 'brazil';

-- Canada: eTA required
UPDATE visa_rules SET
  visa_type = 'visa_free_eta',
  max_stay_days = 180,
  stay_rule = 'Up to 6 months per visit at discretion of border officer.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  notes = 'eTA mandatory before air travel. CAD $7, valid 5 years. Apply at canada.ca/eta. Biometric fingerprinting on first arrival. Czech ID card not accepted.',
  official_source_url = 'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta.html',
  last_verified = '2026-02-20'
WHERE passport_slug = 'czech-republic' AND destination_slug = 'canada';

-- Chile: 90 days visa-free
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 90,
  stay_rule = '90 days per visit.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'may_be_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'Chile maintains liberal visa-free policies for EU passport holders. Historical reciprocity fee no longer in force.',
  official_source_url = 'https://www.extranjeria.gob.cl',
  last_verified = '2026-02-20'
WHERE passport_slug = 'czech-republic' AND destination_slug = 'chile';

-- China: Visa required (Czech Republic excluded from visa-free program)
UPDATE visa_rules SET
  visa_type = 'visa_required',
  max_stay_days = 30,
  stay_rule = 'Typically 30 days on tourist (L) visa. eVisa available online for 30 days, valid 120 days from issue.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_departure',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'not_typically_requested',
  notes = 'Czech Republic excluded from China visa-free program due to diplomatic tensions. eVisa at evisa.mfa.gov.cn. 240-hour transit and Hainan visa-free exceptions available.',
  official_source_url = 'https://www.mfa.gov.cn',
  last_verified = '2026-02-20'
WHERE passport_slug = 'czech-republic' AND destination_slug = 'china';

-- Colombia: 90 days visa-free
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 90,
  stay_rule = '90 days per visit, extendable once for additional 90 days at Migración Colombia.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  notes = 'Colombia maintains visa-free access for EU nationals. Overstays result in USD $150/day fines.',
  official_source_url = 'https://www.migracioncolombia.gov.co',
  last_verified = '2026-02-20'
WHERE passport_slug = 'czech-republic' AND destination_slug = 'colombia';

-- Croatia: EU Freedom of Movement
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = NULL,
  stay_rule = 'Unlimited. EU citizens may reside indefinitely with registration for stays beyond 3 months.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'EU Freedom of Movement. Czech national ID card accepted. Croatia joined Schengen in January 2023. Popular Adriatic coast destination.',
  official_source_url = 'https://www.gov.hr',
  last_verified = '2026-02-20'
WHERE passport_slug = 'czech-republic' AND destination_slug = 'croatia';

-- Egypt: Visa on arrival or eVisa
UPDATE visa_rules SET
  visa_type = 'evisa',
  visa_subtype = 'visa_on_arrival_also_available',
  max_stay_days = 30,
  stay_rule = '30 days per visit. Single or multiple entry available.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'may_be_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'Apply online at visa2egypt.gov.eg. USD $25 single entry, USD $60 multiple entry. Processing 24-72 hours. Visa on arrival also available at airports.',
  official_source_url = 'https://visa2egypt.gov.eg',
  last_verified = '2026-02-20'
WHERE passport_slug = 'czech-republic' AND destination_slug = 'egypt';

-- France: EU Freedom of Movement
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = NULL,
  stay_rule = 'Unlimited. EU citizens may reside indefinitely with registration for stays beyond 3 months.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'EU Freedom of Movement. Czech national ID card accepted. France is a top tourist destination for Czech travelers.',
  official_source_url = 'https://www.france.fr',
  last_verified = '2026-02-20'
WHERE passport_slug = 'czech-republic' AND destination_slug = 'france';

-- Germany: EU Freedom of Movement
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = NULL,
  stay_rule = 'Unlimited. EU citizens may reside indefinitely with registration for stays beyond 3 months.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'EU Freedom of Movement. Neighboring country. Czech national ID card accepted. Largest destination for Czech workers. Registration required within 2 weeks.',
  official_source_url = 'https://www.germany.travel',
  last_verified = '2026-02-20'
WHERE passport_slug = 'czech-republic' AND destination_slug = 'germany';

-- Greece: EU Freedom of Movement
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = NULL,
  stay_rule = 'Unlimited. EU citizens may reside indefinitely with registration for stays beyond 3 months.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'EU Freedom of Movement. Czech national ID card accepted. Extremely popular tourist destination with direct charter flights in summer.',
  official_source_url = 'https://www.visitgreece.gr',
  last_verified = '2026-02-20'
WHERE passport_slug = 'czech-republic' AND destination_slug = 'greece';

-- Hungary: EU Freedom of Movement
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = NULL,
  stay_rule = 'Unlimited. EU citizens may reside indefinitely with registration for stays beyond 3 months.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'EU Freedom of Movement. Neighboring country. Czech national ID card accepted. Visegrád Group (V4) member with deep bilateral ties.',
  official_source_url = 'https://www.hungary.com',
  last_verified = '2026-02-20'
WHERE passport_slug = 'czech-republic' AND destination_slug = 'hungary';

-- India: eVisa required
UPDATE visa_rules SET
  visa_type = 'evisa',
  max_stay_days = 90,
  stay_rule = '30 days on 30-day visa; 90 days per visit on 1-year and 5-year visas (max 180 days/year on 1-year).',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  notes = 'e-Tourist Visa at indianvisaonline.gov.in. 72-hour processing. Biometric data collected on arrival. Valid at designated airports only.',
  official_source_url = 'https://indianvisaonline.gov.in',
  last_verified = '2026-02-20'
WHERE passport_slug = 'czech-republic' AND destination_slug = 'india';

-- Indonesia: 30 days visa-free
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 30,
  stay_rule = '30 days per visit. Not extendable.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  notes = 'Visa requirement lifted for Czech citizens in June 2015. Popular destination for Bali tourism. Overstays fined IDR 1,000,000/day.',
  official_source_url = 'https://www.imigrasi.go.id',
  last_verified = '2026-02-20'
WHERE passport_slug = 'czech-republic' AND destination_slug = 'indonesia';

-- Italy: EU Freedom of Movement
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = NULL,
  stay_rule = 'Unlimited. EU citizens may reside indefinitely with registration for stays beyond 3 months.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'EU Freedom of Movement. Czech national ID card accepted. Top 5 tourist destination for Czech travelers with direct flights to major cities.',
  official_source_url = 'https://www.italia.it',
  last_verified = '2026-02-20'
WHERE passport_slug = 'czech-republic' AND destination_slug = 'italy';

-- Japan: 90 days visa-free
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 90,
  stay_rule = '90 days per visit as temporary visitor (Tanki Taizai).',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'may_be_requested',
  notes = 'Long-standing visa-free arrangement. Biometric fingerprinting on arrival. Monitor Visit Japan Web for pre-arrival registration requirements.',
  official_source_url = 'https://www.mofa.go.jp',
  last_verified = '2026-02-20'
WHERE passport_slug = 'czech-republic' AND destination_slug = 'japan';

-- Malaysia: 90 days visa-free
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 90,
  stay_rule = '90 days per visit.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  notes = 'Malaysia provides visa-free access as part of broad international openness. Biometric fingerprinting on arrival and departure.',
  official_source_url = 'https://www.imi.gov.my',
  last_verified = '2026-02-20'
WHERE passport_slug = 'czech-republic' AND destination_slug = 'malaysia';

-- Mexico: Up to 180 days visa-free
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 180,
  stay_rule = 'Up to 180 days per visit as determined by immigration officer on arrival.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  notes = 'Forma Migratoria Múltiple (FMM) tourist card completed on arrival or online. Mexico maintains visa-free access for EU nationals.',
  official_source_url = 'https://www.inm.gob.mx',
  last_verified = '2026-02-20'
WHERE passport_slug = 'czech-republic' AND destination_slug = 'mexico';

-- Netherlands: EU Freedom of Movement
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = NULL,
  stay_rule = 'Unlimited. EU citizens may reside indefinitely with registration for stays beyond 4 months.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'EU Freedom of Movement. Czech national ID card accepted. Amsterdam Schiphol is major transit hub for Czech long-haul travelers.',
  official_source_url = 'https://www.government.nl',
  last_verified = '2026-02-20'
WHERE passport_slug = 'czech-republic' AND destination_slug = 'netherlands';

-- New Zealand: NZeTA required
UPDATE visa_rules SET
  visa_type = 'visa_free_eta',
  max_stay_days = 90,
  stay_rule = 'Up to 90 days per visit.',
  passport_validity_months = 3,
  passport_validity_requirement = '3_months_beyond_departure',
  return_ticket_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  notes = 'NZeTA mandatory. NZD 9-12 plus NZD 100 IVL levy. Valid 2 years. Apply via app or immigration.govt.nz. Strict biosecurity.',
  official_source_url = 'https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/nzeta',
  last_verified = '2026-02-20'
WHERE passport_slug = 'czech-republic' AND destination_slug = 'new-zealand';

-- Nigeria: eVisa required
UPDATE visa_rules SET
  visa_type = 'evisa',
  max_stay_days = 30,
  stay_rule = '30 days per visit (short-term/tourist eVisa).',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'not_typically_requested',
  notes = 'eVisa system launched 1 May 2025. Apply at evisa.immigration.gov.ng. Yellow fever certificate mandatory. Processing ~48 hours.',
  official_source_url = 'https://evisa.immigration.gov.ng',
  last_verified = '2026-02-20'
WHERE passport_slug = 'czech-republic' AND destination_slug = 'nigeria';

-- Philippines: 30 days visa-free
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 30,
  stay_rule = '30 days on initial entry. Extendable at Bureau of Immigration up to cumulative 36 months.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  notes = 'Philippines provides visa-free access for EU nationals. Return ticket strictly enforced at airports.',
  official_source_url = 'https://immigration.gov.ph',
  last_verified = '2026-02-20'
WHERE passport_slug = 'czech-republic' AND destination_slug = 'philippines';

-- Poland: EU Freedom of Movement
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = NULL,
  stay_rule = 'Unlimited. EU citizens may reside indefinitely with registration for stays beyond 3 months.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'EU Freedom of Movement. Neighboring country. Czech national ID card accepted. Visegrád Group (V4) member with strong bilateral relations.',
  official_source_url = 'https://www.gov.pl',
  last_verified = '2026-02-20'
WHERE passport_slug = 'czech-republic' AND destination_slug = 'poland';

-- Portugal: EU Freedom of Movement
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = NULL,
  stay_rule = 'Unlimited. EU citizens may reside indefinitely with registration for stays beyond 3 months.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'EU Freedom of Movement. Czech national ID card accepted. Popular destination for Czech digital nomads and long-term residents.',
  official_source_url = 'https://www.visitportugal.com',
  last_verified = '2026-02-20'
WHERE passport_slug = 'czech-republic' AND destination_slug = 'portugal';

-- Qatar: Visa on arrival
UPDATE visa_rules SET
  visa_type = 'visa_on_arrival',
  max_stay_days = 30,
  stay_rule = '30 days per visit, extendable once for additional 30 days via Metrash2 app.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  notes = 'Free visa on arrival for EU passport holders at Hamad International Airport. Qatar Airways hub. Popular transit point.',
  official_source_url = 'https://portal.moi.gov.qa',
  last_verified = '2026-02-20'
WHERE passport_slug = 'czech-republic' AND destination_slug = 'qatar';

-- Russia: Visa required (eVisa available)
UPDATE visa_rules SET
  visa_type = 'evisa',
  visa_subtype = 'consular_visa_also_available',
  max_stay_days = 30,
  stay_rule = 'Up to 30 days on eVisa (single entry, within 120-day validity). Longer stays require consular visa.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_departure',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'required',
  notes = 'Czech MFA Level 4 advisory (Do Not Travel). eVisa at evisa.kdmid.ru. Severely strained relations due to 2014 Vrbětice and Ukraine invasion. Direct flights suspended.',
  official_source_url = 'https://evisa.kdmid.ru',
  last_verified = '2026-02-20'
WHERE passport_slug = 'czech-republic' AND destination_slug = 'russia';

-- Saudi Arabia: Visa on arrival or eVisa
UPDATE visa_rules SET
  visa_type = 'evisa',
  visa_subtype = 'visa_on_arrival_also_available',
  max_stay_days = 90,
  stay_rule = '90 days per visit (cumulative max 180 days/year on tourist visa).',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'required',
  notes = 'Tourist visa available since Sept 2019 (Vision 2030). Apply at visa.visitsaudi.com. SAR 300 + SAR 140 insurance. Valid 1 year, multiple entry.',
  official_source_url = 'https://visa.visitsaudi.com',
  last_verified = '2026-02-20'
WHERE passport_slug = 'czech-republic' AND destination_slug = 'saudi-arabia';

-- Singapore: 30 days visa-free
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 30,
  stay_rule = '30 days per visit. Extendable at ICA for up to 89 days total.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  notes = 'Singapore Arrival Card (SGAC) required online at ace.ica.gov.sg within 3 days before arrival. Biometric data collected. Drug trafficking carries death penalty.',
  official_source_url = 'https://www.ica.gov.sg',
  last_verified = '2026-02-20'
WHERE passport_slug = 'czech-republic' AND destination_slug = 'singapore';

-- South Africa: 90 days visa-free
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 90,
  stay_rule = '90 days per visit.',
  passport_validity_months = 1,
  passport_validity_requirement = 'other',
  return_ticket_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  notes = 'Passport must be valid 30 days beyond departure and have at least 2 blank pages (strictly enforced). Yellow fever certificate required if from endemic area.',
  official_source_url = 'http://www.dha.gov.za',
  last_verified = '2026-02-20'
WHERE passport_slug = 'czech-republic' AND destination_slug = 'south-africa';

-- South Korea: 90 days visa-free (K-ETA exemption for EU)
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 90,
  stay_rule = '90 days per visit.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  notes = 'K-ETA exemption for EU nationals including Czech citizens (extended through 2025). Biometric data collected on arrival. Verify K-ETA status at k-eta.go.kr.',
  official_source_url = 'https://www.immigration.go.kr',
  last_verified = '2026-02-20'
WHERE passport_slug = 'czech-republic' AND destination_slug = 'south-korea';

-- Spain: EU Freedom of Movement
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = NULL,
  stay_rule = 'Unlimited. EU citizens may reside indefinitely with registration for stays beyond 3 months.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'EU Freedom of Movement. Czech national ID card accepted. Most popular tourist destination for Czech travelers. Direct flights to major cities.',
  official_source_url = 'https://www.spain.info',
  last_verified = '2026-02-20'
WHERE passport_slug = 'czech-republic' AND destination_slug = 'spain';

-- Switzerland: EU Freedom of Movement (AFMP)
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = NULL,
  stay_rule = 'Unlimited. Czech citizens may reside indefinitely under AFMP with registration for stays beyond 3 months.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'Agreement on Free Movement of Persons (AFMP). Czech national ID card accepted. Switzerland is full Schengen member. Popular for tourism and cross-border work.',
  official_source_url = 'https://www.ch.ch',
  last_verified = '2026-02-20'
WHERE passport_slug = 'czech-republic' AND destination_slug = 'switzerland';

-- Thailand: 60 days visa-free (expanded 2024)
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 60,
  stay_rule = '60 days per visit. Extendable once for additional 30 days at Thai Immigration (max 90 days total).',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  notes = 'Expanded from 30 to 60 days in 2024. Return ticket strictly enforced. Proof of THB 20,000/person or THB 40,000/family may be requested. Overstay fine THB 500/day.',
  official_source_url = 'https://www.immigration.go.th',
  last_verified = '2026-02-20'
WHERE passport_slug = 'czech-republic' AND destination_slug = 'thailand';

-- Turkey: 90 days visa-free
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 90,
  stay_window_days = 180,
  stay_rule = '90 days within any 180-day period.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'may_be_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'Bilateral visa-free arrangement. Turkey maintains strong ties with Czech Republic. Popular Mediterranean coast destination.',
  official_source_url = 'https://www.mfa.gov.tr',
  last_verified = '2026-02-20'
WHERE passport_slug = 'czech-republic' AND destination_slug = 'turkey';

-- United Arab Emirates: 30 days visa-free
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 30,
  stay_rule = '30 days per visit, extendable once for additional 30 days via ICP app.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  notes = 'Visa requirement lifted May 2015. Biometric data collected on arrival. Dubai and Abu Dhabi major hubs for Czech long-haul travel. Verify medication restrictions.',
  official_source_url = 'https://u.ae',
  last_verified = '2026-02-20'
WHERE passport_slug = 'czech-republic' AND destination_slug = 'united-arab-emirates';

-- United Kingdom: UK ETA required (from 2 April 2025)
UPDATE visa_rules SET
  visa_type = 'visa_free_eta',
  max_stay_days = 180,
  stay_rule = 'Up to 6 months per visit for tourism, visiting friends/family, short-course study, permitted business.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  notes = 'UK ETA mandatory from 2 April 2025. £16, valid 2 years. Apply via app or gov.uk/apply-uk-eta. Processing ~72 hours. Post-Brexit third-country status.',
  official_source_url = 'https://www.gov.uk/guidance/apply-for-an-electronic-travel-authorisation-eta',
  last_verified = '2026-02-20'
WHERE passport_slug = 'czech-republic' AND destination_slug = 'united-kingdom';

-- United States: Visa Waiver Program (ESTA)
UPDATE visa_rules SET
  visa_type = 'visa_free_eta',
  max_stay_days = 90,
  stay_rule = 'Up to 90 days per visit on ESTA. VWP entry cannot be extended.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  notes = 'Long-standing VWP member. ESTA at esta.cbp.dhs.gov. USD $21, valid 2 years. Biometric e-passport required. Czech diaspora in Chicago, Cleveland, NYC.',
  official_source_url = 'https://esta.cbp.dhs.gov',
  last_verified = '2026-02-20'
WHERE passport_slug = 'czech-republic' AND destination_slug = 'united-states';

-- Vietnam: 45 days visa-free (temporary until 31 Dec 2026)
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 45,
  stay_rule = '45 days per visit under unilateral visa-free exemption.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'may_be_requested',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  notes = 'Temporary policy valid until 31 Dec 2026. eVisa also available at evisa.xuatnhapcanh.gov.vn. Verify policy before travel.',
  official_source_url = 'https://evisa.xuatnhapcanh.gov.vn',
  last_verified = '2026-02-20'
WHERE passport_slug = 'czech-republic' AND destination_slug = 'vietnam';