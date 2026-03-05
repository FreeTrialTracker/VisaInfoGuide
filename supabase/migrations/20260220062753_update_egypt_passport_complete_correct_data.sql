/*
  # Update Egypt Passport - Complete Accurate Visa Data

  ## Overview
  Comprehensive update of all Egypt passport visa requirements based on official sources,
  Egyptian Ministry of Foreign Affairs data, embassy confirmations, and Henley Passport
  Index data (February 2026). Egypt ranks 78th globally in passport strength.

  ## Key Characteristics

  Egyptian passport holders face significant visa requirements globally:
  - **Schengen Area**: All require Type C visas with in-person biometric collection
  - **Transit visas**: Required for Czech Republic, Poland, Spain even for airside transit
  - **Australia/NZ/Canada/UK**: Full visitor visas required (no ETA access)
  - **Conditional access**: Turkey (age/residency-based), Mexico/Colombia (with US/Schengen visa)
  - **eVisa available**: India, Indonesia, Qatar, Russia, Turkey, Vietnam, many others
  - **Visa-free**: Malaysia only (from major destinations)
  
  ## Notable Requirements

  1. **Transit complications**: Several countries require transit visas even airside
  2. **Supporting document exceptions**: Mexico, Colombia, UAE access with US/Schengen visas
  3. **Age-conditional**: Turkey eVisa based on age (under 20 or over 45)
  4. **Large diaspora**: UAE (800k-1M), Saudi Arabia (1.5-2M), significant communities in Europe
  5. **Strong bilateral ties**: UAE, Saudi Arabia, Russia, China (Belt and Road)
  
  ## Requirement Status Values
  - All requirements updated to honest 3-state enums
  - Passport validity requirements specified where confirmed
  - Return ticket, funds, insurance marked as required or may_be_requested
  
  ## Data Sources
  - Egyptian Ministry of Foreign Affairs
  - Embassy/consulate official sources
  - Henley Passport Index (January 2026)
  - Verified February 2026
*/

-- Argentina: Visa required
UPDATE visa_rules SET
  visa_type = 'visa_required',
  max_stay_days = 90,
  stay_rule = 'Typically 90 days on tourist visa.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'may_be_requested',
  notes = 'Consular visa required at Argentine Embassy Cairo. No eVisa or VOA. Apply 4-6 weeks before travel. Egyptian passport ranks 78th globally.',
  official_source_url = 'https://www.argentina.gob.ar/interior/migraciones',
  last_verified = '2026-02-20'
WHERE passport_slug = 'egypt' AND destination_slug = 'argentina';

-- Australia: Visitor Visa (subclass 600) required + transit visa
UPDATE visa_rules SET
  visa_type = 'visa_required',
  max_stay_days = 90,
  stay_rule = 'Typically 3 months on tourist Visitor Visa (subclass 600).',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'required',
  notes = 'Visitor Visa (subclass 600) via ImmiAccount. AUD 190 fee. 4-8 weeks processing. Transit visa (subclass 771) required even for airside transits. Health exam may be required.',
  official_source_url = 'https://immi.homeaffairs.gov.au',
  last_verified = '2026-02-20'
WHERE passport_slug = 'egypt' AND destination_slug = 'australia';

-- Austria: Schengen visa required
UPDATE visa_rules SET
  visa_type = 'visa_required',
  max_stay_days = 90,
  stay_window_days = 180,
  stay_rule = 'Up to 90 days within any 180-day period on Type C Schengen visa.',
  passport_validity_months = 3,
  passport_validity_requirement = '3_months_beyond_departure',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'required',
  notes = 'Schengen Type C visa. Apply at Austrian Embassy Cairo or VFS Global. EUR 30,000 travel insurance mandatory. Biometric data collected. 15-day processing. Large Egyptian community (40k-60k).',
  official_source_url = 'https://www.bmeia.gv.at',
  last_verified = '2026-02-20'
WHERE passport_slug = 'egypt' AND destination_slug = 'austria';

-- Belgium: Schengen visa required
UPDATE visa_rules SET
  visa_type = 'visa_required',
  max_stay_days = 90,
  stay_window_days = 180,
  stay_rule = 'Up to 90 days within any 180-day period on Type C Schengen visa.',
  passport_validity_months = 3,
  passport_validity_requirement = '3_months_beyond_departure',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'required',
  notes = 'Schengen Type C visa. Belgian Embassy Cairo. EUR 30,000 travel insurance. EUR 90 fee. Brussels hosts EU institutions.',
  official_source_url = 'https://www.belgium.be',
  last_verified = '2026-02-20'
WHERE passport_slug = 'egypt' AND destination_slug = 'belgium';

-- Brazil: Visa required
UPDATE visa_rules SET
  visa_type = 'visa_required',
  max_stay_days = 90,
  stay_rule = 'Typically 90 days on tourist visa.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'not_typically_requested',
  notes = 'Consular visa at Brazilian Embassy Cairo. Yellow fever certificate required if from endemic area. No eVisa or VOA. 5-10 days processing.',
  official_source_url = 'https://www.gov.br/mre',
  last_verified = '2026-02-20'
WHERE passport_slug = 'egypt' AND destination_slug = 'brazil';

-- Canada: Temporary Resident Visa (TRV) + transit visa required
UPDATE visa_rules SET
  visa_type = 'visa_required',
  max_stay_days = 180,
  stay_rule = 'Up to 6 months per visit at discretion of border officer.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'not_typically_requested',
  notes = 'Temporary Resident Visa (TRV) required. Apply via IRCC portal or VAC Cairo. CAD 100 + CAD 85 biometrics. 4-8 weeks processing. Transit visa required even airside. No eTA access.',
  official_source_url = 'https://www.canada.ca/ircc',
  last_verified = '2026-02-20'
WHERE passport_slug = 'egypt' AND destination_slug = 'canada';

-- Chile: Visa required
UPDATE visa_rules SET
  visa_type = 'visa_required',
  max_stay_days = 90,
  stay_rule = 'Typically 90 days on tourist visa.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'not_typically_requested',
  notes = 'Consular visa at Chilean Embassy Cairo. 10-15 days processing. No eVisa or VOA.',
  official_source_url = 'https://www.extranjeria.gob.cl',
  last_verified = '2026-02-20'
WHERE passport_slug = 'egypt' AND destination_slug = 'chile';

-- China: Visa required (consular or eVisa available)
UPDATE visa_rules SET
  visa_type = 'visa_required',
  visa_subtype = 'evisa_also_available',
  max_stay_days = 30,
  stay_rule = 'Typically 30 days on L tourist visa. eVisa: 30 days, valid 120 days from issue. Transit: up to 240 hours (10 days).',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_departure',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'not_typically_requested',
  notes = 'Apply at Chinese Embassy Cairo or CVASC. eVisa at evisa.mfa.gov.cn available. 240-hour transit visa-free also available. Strong Belt & Road bilateral ties.',
  official_source_url = 'https://www.mfa.gov.cn',
  last_verified = '2026-02-20'
WHERE passport_slug = 'egypt' AND destination_slug = 'china';

-- Colombia: Visa required (exception with US/Schengen/Canada/Japan/UK visa)
UPDATE visa_rules SET
  visa_type = 'visa_required',
  max_stay_days = 90,
  stay_rule = '90 days, extendable once for 90 days. Exception: entry without Colombian visa if holding valid multiple-entry US/Canada/UK/Schengen/Japan visa.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'not_typically_requested',
  notes = 'Colombian Embassy Cairo. Exception: Egyptian nationals with valid US/Canada/UK/Schengen/Japan multiple-entry visa or permanent residency may enter without Colombian visa. Verify with airline.',
  official_source_url = 'https://www.migracioncolombia.gov.co',
  last_verified = '2026-02-20'
WHERE passport_slug = 'egypt' AND destination_slug = 'colombia';

-- Croatia: Schengen visa required (joined Schengen Jan 2023)
UPDATE visa_rules SET
  visa_type = 'visa_required',
  max_stay_days = 90,
  stay_window_days = 180,
  stay_rule = 'Up to 90 days within any 180-day period on Type C Schengen visa.',
  passport_validity_months = 3,
  passport_validity_requirement = '3_months_beyond_departure',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'required',
  notes = 'Schengen Type C visa since Croatia joined Schengen 1 Jan 2023. Croatian Embassy Cairo. EUR 30,000 insurance. Popular Adriatic coast destination.',
  official_source_url = 'https://www.gov.hr',
  last_verified = '2026-02-20'
WHERE passport_slug = 'egypt' AND destination_slug = 'croatia';

-- Czech Republic: Schengen visa + transit visa required
UPDATE visa_rules SET
  visa_type = 'visa_required',
  max_stay_days = 90,
  stay_window_days = 180,
  stay_rule = 'Up to 90 days within any 180-day period on Type C Schengen visa.',
  passport_validity_months = 3,
  passport_validity_requirement = '3_months_beyond_departure',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'required',
  notes = 'Schengen Type C visa. Czech Embassy Cairo or VFS Global. EUR 90 fee. Transit visa required even for airside transits through Prague Airport.',
  official_source_url = 'https://www.mzv.cz',
  last_verified = '2026-02-20'
WHERE passport_slug = 'egypt' AND destination_slug = 'czech-republic';

-- France: Schengen visa required
UPDATE visa_rules SET
  visa_type = 'visa_required',
  max_stay_days = 90,
  stay_window_days = 180,
  stay_rule = 'Up to 90 days within any 180-day period on Type C Schengen visa.',
  passport_validity_months = 3,
  passport_validity_requirement = '3_months_beyond_departure',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'required',
  notes = 'Schengen Type C visa. TLS Contact center Cairo. EUR 30,000 insurance. EUR 90 fee. France ranks among top Schengen visa issuers for Egyptian applicants.',
  official_source_url = 'https://france-visas.gouv.fr',
  last_verified = '2026-02-20'
WHERE passport_slug = 'egypt' AND destination_slug = 'france';

-- Germany: Schengen visa required
UPDATE visa_rules SET
  visa_type = 'visa_required',
  max_stay_days = 90,
  stay_window_days = 180,
  stay_rule = 'Up to 90 days within any 180-day period on Type C Schengen visa.',
  passport_validity_months = 3,
  passport_validity_requirement = '3_months_beyond_departure',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'required',
  notes = 'Schengen Type C visa. German Embassy Cairo or VFS Global. EUR 90 fee. Germany major employer of Egyptian professionals. Large Egyptian community (100k+).',
  official_source_url = 'https://www.auswaertiges-amt.de',
  last_verified = '2026-02-20'
WHERE passport_slug = 'egypt' AND destination_slug = 'germany';

-- Greece: Schengen visa required
UPDATE visa_rules SET
  visa_type = 'visa_required',
  max_stay_days = 90,
  stay_window_days = 180,
  stay_rule = 'Up to 90 days within any 180-day period on Type C Schengen visa.',
  passport_validity_months = 3,
  passport_validity_requirement = '3_months_beyond_departure',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'required',
  notes = 'Schengen Type C visa. Greek Embassy Cairo. Popular Mediterranean destination given proximity. Golden Visa investment program available.',
  official_source_url = 'https://www.mfa.gr',
  last_verified = '2026-02-20'
WHERE passport_slug = 'egypt' AND destination_slug = 'greece';

-- Hungary: Schengen visa required
UPDATE visa_rules SET
  visa_type = 'visa_required',
  max_stay_days = 90,
  stay_window_days = 180,
  stay_rule = 'Up to 90 days within any 180-day period on Type C Schengen visa.',
  passport_validity_months = 3,
  passport_validity_requirement = '3_months_beyond_departure',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'required',
  notes = 'Schengen Type C visa. Hungarian Embassy Cairo. EUR 90 fee.',
  official_source_url = 'https://www.kormany.hu',
  last_verified = '2026-02-20'
WHERE passport_slug = 'egypt' AND destination_slug = 'hungary';

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
  notes = 'e-Tourist Visa at indianvisaonline.gov.in. Egypt eligible. 72-hour processing. Entry at designated airports only. Longstanding bilateral relations.',
  official_source_url = 'https://indianvisaonline.gov.in',
  last_verified = '2026-02-20'
WHERE passport_slug = 'egypt' AND destination_slug = 'india';

-- Indonesia: Visa on arrival or eVOA
UPDATE visa_rules SET
  visa_type = 'visa_on_arrival',
  visa_subtype = 'evoa_also_available',
  max_stay_days = 30,
  stay_rule = '30 days, extendable once for 30 days at Immigration Office.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  notes = 'VOA at Indonesian airports USD 35. Online e-VOA at molina.imigrasi.go.id also available. Popular Bali destination. Egypt eligible under liberal tourism policy.',
  official_source_url = 'https://www.imigrasi.go.id',
  last_verified = '2026-02-20'
WHERE passport_slug = 'egypt' AND destination_slug = 'indonesia';

-- Italy: Schengen visa required
UPDATE visa_rules SET
  visa_type = 'visa_required',
  max_stay_days = 90,
  stay_window_days = 180,
  stay_rule = 'Up to 90 days within any 180-day period on Type C Schengen visa.',
  passport_validity_months = 3,
  passport_validity_requirement = '3_months_beyond_departure',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'required',
  notes = 'Schengen Type C visa. Italian Embassy Cairo or VFS Global. One of Europes largest Egyptian communities (120k-150k), concentrated in Prato, Rome, Milan.',
  official_source_url = 'https://vistoperitalia.esteri.it',
  last_verified = '2026-02-20'
WHERE passport_slug = 'egypt' AND destination_slug = 'italy';

-- Japan: Visa required
UPDATE visa_rules SET
  visa_type = 'visa_required',
  max_stay_days = 90,
  stay_rule = 'Up to 90 days on Temporary Visitor visa.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'not_typically_requested',
  notes = 'Consular visa at Japanese Embassy Cairo. No visa fee for tourist visas (agencies may charge). 5 business days processing. No eVisa. Extensive documentation required.',
  official_source_url = 'https://www.mofa.go.jp',
  last_verified = '2026-02-20'
WHERE passport_slug = 'egypt' AND destination_slug = 'japan';

-- Malaysia: Visa-free
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 30,
  stay_rule = '30 days per visit. Extendable at Immigration Department.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  notes = 'Malaysia provides visa-free access to Egyptian nationals under liberal tourism policy. One of few major visa-free destinations for Egyptian passport.',
  official_source_url = 'https://www.imi.gov.my',
  last_verified = '2026-02-20'
WHERE passport_slug = 'egypt' AND destination_slug = 'malaysia';

-- Mexico: Visa required (exception with US/Schengen/Canada/Japan/UK visa)
UPDATE visa_rules SET
  visa_type = 'visa_required',
  max_stay_days = 180,
  stay_rule = 'Up to 180 days at immigration officer discretion. Exception: entry without Mexican visa if holding valid US/Canada/UK/Japan/Schengen multiple-entry visa.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  notes = 'Exception: valid multiple-entry US/Canada/UK/Japan/Schengen visa allows entry without Mexican visa. Otherwise apply at Embassy of Mexico Cairo. FMM card required.',
  official_source_url = 'https://www.inm.gob.mx',
  last_verified = '2026-02-20'
WHERE passport_slug = 'egypt' AND destination_slug = 'mexico';

-- Netherlands: Schengen visa required
UPDATE visa_rules SET
  visa_type = 'visa_required',
  max_stay_days = 90,
  stay_window_days = 180,
  stay_rule = 'Up to 90 days within any 180-day period on Type C Schengen visa.',
  passport_validity_months = 3,
  passport_validity_requirement = '3_months_beyond_departure',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'required',
  notes = 'Schengen Type C visa. Dutch Embassy Cairo or VFS Global. Amsterdam Schiphol major transit hub.',
  official_source_url = 'https://www.government.nl',
  last_verified = '2026-02-20'
WHERE passport_slug = 'egypt' AND destination_slug = 'netherlands';

-- New Zealand: Visitor Visa + transit visa required
UPDATE visa_rules SET
  visa_type = 'visa_required',
  max_stay_days = 270,
  stay_rule = 'Up to 9 months on Visitor Visa (typical tourist visits 3-6 months).',
  passport_validity_months = 3,
  passport_validity_requirement = '3_months_beyond_departure',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'not_typically_requested',
  notes = 'Visitor Visa via immigration.govt.nz. NZD 246 online. No NZeTA access. Transit visa required even for airside transits. Strict biosecurity.',
  official_source_url = 'https://www.immigration.govt.nz',
  last_verified = '2026-02-20'
WHERE passport_slug = 'egypt' AND destination_slug = 'new-zealand';

-- Nigeria: eVisa required (launched May 2025)
UPDATE visa_rules SET
  visa_type = 'evisa',
  max_stay_days = 30,
  stay_rule = '30 days on short-term/tourist eVisa.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'not_typically_requested',
  notes = 'eVisa system launched 1 May 2025 at evisa.immigration.gov.ng. Yellow fever certificate mandatory. Processing ~48 hours.',
  official_source_url = 'https://evisa.immigration.gov.ng',
  last_verified = '2026-02-20'
WHERE passport_slug = 'egypt' AND destination_slug = 'nigeria';

-- Philippines: Visa required
UPDATE visa_rules SET
  visa_type = 'visa_required',
  max_stay_days = 30,
  stay_rule = 'Typically 30-59 days on tourist visa, extendable at Bureau of Immigration.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'not_typically_requested',
  notes = 'Consular visa at Philippine Embassy Cairo. 5-7 days processing. No eVisa for Egyptian nationals.',
  official_source_url = 'https://immigration.gov.ph',
  last_verified = '2026-02-20'
WHERE passport_slug = 'egypt' AND destination_slug = 'philippines';

-- Poland: Schengen visa + transit visa required
UPDATE visa_rules SET
  visa_type = 'visa_required',
  max_stay_days = 90,
  stay_window_days = 180,
  stay_rule = 'Up to 90 days within any 180-day period on Type C Schengen visa.',
  passport_validity_months = 3,
  passport_validity_requirement = '3_months_beyond_departure',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'required',
  notes = 'Schengen Type C visa. Polish Embassy Cairo. Transit visa required even for airside transits through Polish airports. Growing Egyptian student population.',
  official_source_url = 'https://www.gov.pl',
  last_verified = '2026-02-20'
WHERE passport_slug = 'egypt' AND destination_slug = 'poland';

-- Portugal: Schengen visa required
UPDATE visa_rules SET
  visa_type = 'visa_required',
  max_stay_days = 90,
  stay_window_days = 180,
  stay_rule = 'Up to 90 days within any 180-day period on Type C Schengen visa.',
  passport_validity_months = 3,
  passport_validity_requirement = '3_months_beyond_departure',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'required',
  notes = 'Schengen Type C visa. Portuguese Embassy Cairo or VFS Global. Golden Visa investment program available. Digital Nomad Visa accessible.',
  official_source_url = 'https://www.vistos.mne.pt',
  last_verified = '2026-02-20'
WHERE passport_slug = 'egypt' AND destination_slug = 'portugal';

-- Qatar: eVisa required (Hayya platform or hotel/airline sponsorship)
UPDATE visa_rules SET
  visa_type = 'evisa',
  max_stay_days = 30,
  stay_rule = '30 days, extendable once for 30 days at General Directorate of Passports.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  notes = 'Apply via hayya.qatar.gov.qa or Qatar Airways/hotel sponsorship. VOA available with valid US/UK/EU/Canada/Australia visa. Hundreds of thousands of Egyptians work in Qatar.',
  official_source_url = 'https://portal.moi.gov.qa',
  last_verified = '2026-02-20'
WHERE passport_slug = 'egypt' AND destination_slug = 'qatar';

-- Russia: eVisa or consular visa
UPDATE visa_rules SET
  visa_type = 'evisa',
  visa_subtype = 'consular_visa_also_available',
  max_stay_days = 30,
  stay_rule = 'Up to 30 days on eVisa (single entry, 120-day validity). Longer stays require consular visa.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_departure',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'required',
  notes = 'Egyptian citizens eligible for eVisa since Aug 2023 at evisa.kdmid.ru. No invitation letter needed. Strong bilateral relations. Direct Cairo-Moscow flights.',
  official_source_url = 'https://evisa.kdmid.ru',
  last_verified = '2026-02-20'
WHERE passport_slug = 'egypt' AND destination_slug = 'russia';

-- Saudi Arabia: Visa required (employer sponsor or Umrah/tourist via embassy)
UPDATE visa_rules SET
  visa_type = 'visa_required',
  max_stay_days = 90,
  stay_rule = 'Varies by visa type: 30-90 days on tourist/family visit; 1-2 years on employment visas.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'required',
  notes = 'No broad tourist eVisa access for Egyptian ordinary passports. Apply via Saudi Embassy Cairo, employer sponsor (Kafala), or Umrah agencies. UAE residents may apply via eVisa. Largest Egyptian expat community (1.5-2M workers).',
  official_source_url = 'https://visa.visitsaudi.com',
  last_verified = '2026-02-20'
WHERE passport_slug = 'egypt' AND destination_slug = 'saudi-arabia';

-- Singapore: eVisa required (e-IVAS or sponsored)
UPDATE visa_rules SET
  visa_type = 'evisa',
  max_stay_days = 30,
  stay_rule = '30 days per visit. Extendable at ICA up to 89 days total in exceptional circumstances.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'not_typically_requested',
  notes = 'eVisa (e-IVAS) via Singapore hotel/travel agent sponsor. 1-3 days processing. SGAC online arrival card required. Drug trafficking carries death penalty.',
  official_source_url = 'https://www.ica.gov.sg',
  last_verified = '2026-02-20'
WHERE passport_slug = 'egypt' AND destination_slug = 'singapore';

-- South Africa: eVisa available
UPDATE visa_rules SET
  visa_type = 'evisa',
  max_stay_days = 90,
  stay_rule = 'Typically 90 days on visitor eVisa.',
  passport_validity_months = 1,
  passport_validity_requirement = 'other',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'not_typically_requested',
  notes = 'eVisa at evisa.dha.gov.za. 30 days validity beyond stay, at least 2 blank pages strictly enforced. Yellow fever certificate if from endemic area. 5-10 days processing.',
  official_source_url = 'https://evisa.dha.gov.za',
  last_verified = '2026-02-20'
WHERE passport_slug = 'egypt' AND destination_slug = 'south-africa';

-- South Korea: Visa required
UPDATE visa_rules SET
  visa_type = 'visa_required',
  max_stay_days = 90,
  stay_rule = 'Up to 90 days on C-3 Short-Term Tourist visa.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'not_typically_requested',
  notes = 'Consular visa at Korean Embassy Cairo. No visa fee for C-3 tourist visa. 3-5 days processing. K-ETA not applicable. Growing interest in Korean culture.',
  official_source_url = 'https://www.immigration.go.kr',
  last_verified = '2026-02-20'
WHERE passport_slug = 'egypt' AND destination_slug = 'south-korea';

-- Spain: Schengen visa + transit visa required
UPDATE visa_rules SET
  visa_type = 'visa_required',
  max_stay_days = 90,
  stay_window_days = 180,
  stay_rule = 'Up to 90 days within any 180-day period on Type C Schengen visa.',
  passport_validity_months = 3,
  passport_validity_requirement = '3_months_beyond_departure',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'required',
  notes = 'Schengen Type C visa. Spanish Embassy Cairo or visa center. Transit visa required even for airside transits through Spanish airports. Golden Visa program available.',
  official_source_url = 'https://www.exteriores.gob.es',
  last_verified = '2026-02-20'
WHERE passport_slug = 'egypt' AND destination_slug = 'spain';

-- Switzerland: Schengen visa required
UPDATE visa_rules SET
  visa_type = 'visa_required',
  max_stay_days = 90,
  stay_window_days = 180,
  stay_rule = 'Up to 90 days within any 180-day period on Type C Schengen visa.',
  passport_validity_months = 3,
  passport_validity_requirement = '3_months_beyond_departure',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'required',
  notes = 'Schengen Type C visa. Swiss Embassy Cairo or TLS Contact/VFS Global. Popular for medical tourism (Geneva hospitals) and business travel.',
  official_source_url = 'https://www.eda.admin.ch',
  last_verified = '2026-02-20'
WHERE passport_slug = 'egypt' AND destination_slug = 'switzerland';

-- Thailand: eVisa required
UPDATE visa_rules SET
  visa_type = 'evisa',
  max_stay_days = 60,
  stay_rule = 'Up to 60 days on TR tourist visa, extendable once for 30 days (max 90 days total).',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  notes = 'eVisa at thaievisa.go.th. USD 35. 1-7 days processing. Egypt not included in 60-day visa-free expansion.',
  official_source_url = 'https://thaievisa.go.th',
  last_verified = '2026-02-20'
WHERE passport_slug = 'egypt' AND destination_slug = 'thailand';

-- Turkey: eVisa (conditional on age/supporting visa) or consular visa
UPDATE visa_rules SET
  visa_type = 'evisa',
  visa_subtype = 'conditional_eligibility',
  max_stay_days = 30,
  stay_rule = 'Up to 30 days on eVisa (single entry). Up to 90 in 180 days on consular visa.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  notes = 'eVisa conditional: under 20 OR over 45 years old, OR holding valid Schengen/US/UK/Ireland visa. USD 20 at evisa.gov.tr. Otherwise consular visa at Turkish Embassy Cairo. Millions of Egyptians visit Turkey annually.',
  official_source_url = 'https://www.evisa.gov.tr',
  last_verified = '2026-02-20'
WHERE passport_slug = 'egypt' AND destination_slug = 'turkey';

-- United Arab Emirates: eVisa required
UPDATE visa_rules SET
  visa_type = 'evisa',
  max_stay_days = 30,
  stay_rule = '30 days on Visit Visa, extendable once for 30 days. 90 days on 3-month Visit Visa.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  notes = 'Apply via icp.gov.ae or through UAE hotel/travel agency/resident sponsor. Emirates/Etihad facilitate visas. Most popular destination for Egyptian tourists and workers. 800k-1M Egyptians in UAE.',
  official_source_url = 'https://icp.gov.ae',
  last_verified = '2026-02-20'
WHERE passport_slug = 'egypt' AND destination_slug = 'united-arab-emirates';

-- United Kingdom: Standard Visitor Visa + Direct Airside Transit Visa required
UPDATE visa_rules SET
  visa_type = 'visa_required',
  max_stay_days = 180,
  stay_rule = 'Up to 6 months on Standard Visitor Visa. Extensions generally not permitted.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'not_typically_requested',
  notes = 'Standard Visitor Visa via VFS Global Cairo. GBP 115 fee. 3 weeks processing. Direct Airside Transit Visa (DATV) required even for airside transits. No UK ETA access.',
  official_source_url = 'https://www.gov.uk/standard-visitor-visa',
  last_verified = '2026-02-20'
WHERE passport_slug = 'egypt' AND destination_slug = 'united-kingdom';

-- United States: B1/B2 visa + transit visa required
UPDATE visa_rules SET
  visa_type = 'visa_required',
  max_stay_days = 180,
  stay_rule = 'Typically up to 6 months on B1/B2 visa (marked on I-94 by CBP).',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'not_typically_requested',
  notes = 'B-1/B-2 visa at US Embassy Cairo. USD 185 MRV fee. In-person interview required. Transit visa required even airside. No VWP/ESTA access. Strong ties to Egypt required.',
  official_source_url = 'https://travel.state.gov',
  last_verified = '2026-02-20'
WHERE passport_slug = 'egypt' AND destination_slug = 'united-states';

-- Vietnam: eVisa required
UPDATE visa_rules SET
  visa_type = 'evisa',
  max_stay_days = 90,
  stay_rule = '90 days on eVisa (single or multiple entry).',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'may_be_requested',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  notes = 'eVisa at evisa.xuatnhapcanh.gov.vn. USD 25 single entry, USD 50 multiple entry. 3 business days processing. Egypt not included in 45-day visa-free policy.',
  official_source_url = 'https://evisa.xuatnhapcanh.gov.vn',
  last_verified = '2026-02-20'
WHERE passport_slug = 'egypt' AND destination_slug = 'vietnam';