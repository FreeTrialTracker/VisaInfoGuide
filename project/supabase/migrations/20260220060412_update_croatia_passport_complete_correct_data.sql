/*
  # Update Croatia Passport - Complete Accurate Visa Data

  ## Overview
  Comprehensive update of all Croatia passport visa requirements based on official sources,
  Croatian Ministry of Foreign Affairs data, and embassy confirmations (February 2026).

  ## Key Updates

  1. **China** - 30 days visa-free (was 15) - valid until 31 Dec 2026
  2. **Vietnam** - 45 days visa-free (temporary policy until 31 Dec 2026)
  3. **Australia** - eVisitor (subclass 651) - free EU-exclusive authorization
  4. **UK** - ETA required from 2 April 2025 (£16, 2-year validity)
  5. **US** - VWP/ESTA since 1 Dec 2021 (major milestone)
  6. **South Korea** - K-ETA exemption for EU citizens
  7. **Canada** - eTA required (CAD $7)
  8. **New Zealand** - NZeTA + IVL levy (NZD 9-12 + NZD 100)
  9. **Egypt** - Visa on arrival or eVisa (USD 25)
  10. **Saudi Arabia** - Visa on arrival or eVisa (90 days)
  11. **Qatar** - Visa on arrival (30 days)
  12. **Nigeria** - eVisa required
  13. **Russia** - Visa required (travel advisory, suspended flights)
  
  ## Requirement Status Values
  - All requirements updated to honest 3-state enums
  - Passport validity requirements specified where confirmed
  - Return ticket, funds, insurance marked as required or may_be_requested
  
  ## Data Sources
  - Croatian Ministry of Foreign and European Affairs (MVEP)
  - Embassy of Japan in Zagreb, US Embassy in Zagreb, etc.
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
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'may_be_requested',
  notes = 'Croatian EU passport holders enjoy visa-free access. Biometric fingerprinting on arrival. Croatian ID card not accepted outside EU.',
  official_source_url = 'https://www.argentina.gob.ar/interior/migraciones',
  last_verified = '2026-02-20'
WHERE passport_slug = 'croatia' AND destination_slug = 'argentina';

-- Australia: eVisitor (subclass 651) - free EU-exclusive authorization
UPDATE visa_rules SET
  visa_type = 'evisa',
  visa_subtype = 'eVisitor (subclass 651)',
  max_stay_days = 90,
  stay_rule = 'Up to 3 months per visit. Multiple entries within 12-month validity.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'may_be_requested',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'may_be_requested',
  notes = 'FREE eVisitor (subclass 651) - EU-exclusive. Apply online via ImmiAccount. Usually approved 1-3 days. Biometric collection on arrival. Strict biosecurity.',
  official_source_url = 'https://immi.homeaffairs.gov.au',
  last_verified = '2026-02-20'
WHERE passport_slug = 'croatia' AND destination_slug = 'australia';

-- Austria: EU Freedom of Movement
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = NULL,
  stay_rule = 'Unlimited. EU freedom of movement. Croatian ID card accepted.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'EU citizen rights. No visa, no EES, no ETIAS. 150,000-200,000 Croatian diaspora in Austria (Vienna, Burgenland). Registration required for stays >3 months.',
  official_source_url = 'https://www.oesterreich.gv.at',
  last_verified = '2026-02-20'
WHERE passport_slug = 'croatia' AND destination_slug = 'austria';

-- Belgium: EU Freedom of Movement
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = NULL,
  stay_rule = 'Unlimited. EU freedom of movement. Croatian ID card accepted.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'EU citizen rights. Brussels hosts EU institutions and NATO HQ. Croatian diplomatic/institutional presence.',
  official_source_url = 'https://www.ibz.be',
  last_verified = '2026-02-20'
WHERE passport_slug = 'croatia' AND destination_slug = 'belgium';

-- Brazil: 90 days visa-free
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 90,
  stay_rule = '90 days per visit. Extendable once for additional 90 days at Federal Police.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'may_be_requested',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'may_be_requested',
  notes = 'Yellow fever vaccination certificate required if arriving from endemic area. EU passport holders benefit from favorable access.',
  official_source_url = 'https://www.gov.br/pf',
  last_verified = '2026-02-20'
WHERE passport_slug = 'croatia' AND destination_slug = 'brazil';

-- Canada: eTA required
UPDATE visa_rules SET
  visa_type = 'evisa',
  visa_subtype = 'eTA',
  max_stay_days = 180,
  stay_rule = 'Up to 6 months per visit at CBSA officer discretion.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'may_be_requested',
  notes = 'eTA mandatory for air travel (not land/sea). CAD $7, valid 5 years. Croatia is visa-exempt. Processing usually minutes. Biometric collection on arrival.',
  official_source_url = 'https://ircc.canada.ca',
  last_verified = '2026-02-20'
WHERE passport_slug = 'croatia' AND destination_slug = 'canada';

-- Chile: 90 days visa-free
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 90,
  stay_rule = '90 days per visit.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'may_be_requested',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'may_be_requested',
  notes = 'Yellow fever certificate required if arriving from endemic area. EU passport holders enjoy visa-free access.',
  official_source_url = 'https://www.sermig.cl',
  last_verified = '2026-02-20'
WHERE passport_slug = 'croatia' AND destination_slug = 'chile';

-- China: 30 days visa-free (unilateral exemption until 31 Dec 2026)
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 30,
  stay_rule = '30 days per visit. Unilateral exemption valid until 31 Dec 2026 (subject to renewal).',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'may_be_requested',
  notes = 'Croatia among ~48 countries in China unilateral visa-free list (expanded 2024-2025). Tourism, business, transit, family visits. Biometric on arrival. Police registration within 24h. Tibet requires separate permit.',
  official_source_url = 'https://www.fmprc.gov.cn',
  last_verified = '2026-02-20'
WHERE passport_slug = 'croatia' AND destination_slug = 'china';

-- Colombia: 90 days visa-free (180 days per year)
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 90,
  stay_window_days = 180,
  stay_rule = '90 days per visit (180 days per calendar year for tourism).',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'may_be_requested',
  notes = 'Check-Mig form required 1-72 hours before arrival. Yellow fever certificate for certain parks/endemic regions. One blank passport page required.',
  official_source_url = 'https://www.migracioncolombia.gov.co',
  last_verified = '2026-02-20'
WHERE passport_slug = 'croatia' AND destination_slug = 'colombia';

-- Czech Republic: EU Freedom of Movement
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = NULL,
  stay_rule = 'Unlimited. EU freedom of movement. Croatian ID card accepted.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'EU citizen rights. Direct flights Zagreb-Prague. Popular Central European destination.',
  official_source_url = 'https://www.mvcr.cz',
  last_verified = '2026-02-20'
WHERE passport_slug = 'croatia' AND destination_slug = 'czech-republic';

-- Egypt: Visa on arrival or eVisa
UPDATE visa_rules SET
  visa_type = 'visa_on_arrival',
  visa_subtype = 'or eVisa',
  max_stay_days = 30,
  stay_rule = '30 days per entry.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'may_be_requested',
  notes = 'VoA USD 25 (payable USD/EUR/GBP) at major airports. eVisa at visa2egypt.gov.eg - apply 7+ days before. Hotel reservation required. Yellow fever certificate if from endemic area. Popular destination - direct charters from Croatian coast.',
  official_source_url = 'https://visa2egypt.gov.eg',
  last_verified = '2026-02-20'
WHERE passport_slug = 'croatia' AND destination_slug = 'egypt';

-- France: EU Freedom of Movement
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = NULL,
  stay_rule = 'Unlimited. EU freedom of movement. Croatian ID card accepted.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'EU citizen rights. Direct flights Zagreb-Paris. Major European destination. Includes Caribbean overseas territories under EU free movement.',
  official_source_url = 'https://www.interieur.gouv.fr',
  last_verified = '2026-02-20'
WHERE passport_slug = 'croatia' AND destination_slug = 'france';

-- Germany: EU Freedom of Movement
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = NULL,
  stay_rule = 'Unlimited. EU freedom of movement. Croatian ID card accepted.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'EU citizen rights. 400,000+ Croatian diaspora in Germany - largest outside Croatia. Multiple daily direct flights. Germany is Croatia''s most important economic partner.',
  official_source_url = 'https://www.germany.info',
  last_verified = '2026-02-20'
WHERE passport_slug = 'croatia' AND destination_slug = 'germany';

-- Greece: EU Freedom of Movement
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = NULL,
  stay_rule = 'Unlimited. EU freedom of movement. Croatian ID card accepted.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'EU citizen rights. Direct flights and summer charters. Shared Adriatic/Mediterranean tourism economies.',
  official_source_url = 'https://www.migration.gov.gr',
  last_verified = '2026-02-20'
WHERE passport_slug = 'croatia' AND destination_slug = 'greece';

-- Hungary: EU Freedom of Movement
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = NULL,
  stay_rule = 'Unlimited. EU freedom of movement. Croatian ID card accepted.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'EU citizen rights. Shared land border. Deep historical ties through medieval Hungarian-Croatian union.',
  official_source_url = 'https://www.bmbah.hu',
  last_verified = '2026-02-20'
WHERE passport_slug = 'croatia' AND destination_slug = 'hungary';

-- India: eVisa required
UPDATE visa_rules SET
  visa_type = 'evisa',
  visa_subtype = 'e-Tourist Visa',
  max_stay_days = 90,
  stay_rule = '30-90 days per visit depending on e-TV type. 1-year e-TV permits max 180 days per calendar year.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'may_be_requested',
  notes = 'eVisa mandatory - apply at indianvisaonline.gov.in at least 4 days before. USD 25+. Arrive via 32 designated airports/5 seaports. 2 blank passport pages required. Yellow fever certificate if from endemic country.',
  official_source_url = 'https://indianvisaonline.gov.in',
  last_verified = '2026-02-20'
WHERE passport_slug = 'croatia' AND destination_slug = 'india';

-- Indonesia: 30 days visa-free
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 30,
  stay_rule = '30 days per visit. Extendable once for additional 30 days via VoA process (IDR 500,000).',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'may_be_requested',
  notes = 'EU passport holders enjoy visa-free access. Yellow fever certificate if from endemic country. Biometric on arrival. Bali popular destination.',
  official_source_url = 'https://www.imigrasi.go.id',
  last_verified = '2026-02-20'
WHERE passport_slug = 'croatia' AND destination_slug = 'indonesia';

-- Italy: EU Freedom of Movement
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = NULL,
  stay_rule = 'Unlimited. EU freedom of movement. Croatian ID card accepted.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'EU citizen rights. Shared Adriatic coastline, centuries of history. Ferry services connect Croatian and Italian ports. Italian minority in Croatia (Istria). Osimo Treaty (1975) resolved territorial issues.',
  official_source_url = 'https://www.interno.gov.it',
  last_verified = '2026-02-20'
WHERE passport_slug = 'croatia' AND destination_slug = 'italy';

-- Japan: 90 days visa-free
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 90,
  stay_rule = 'Up to 90 days per visit.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'may_be_requested',
  notes = 'Bilateral visa exemption confirmed by Embassy of Japan in Zagreb. No pre-travel authorization required. Biometric fingerprinting and photo on arrival. JPY 1,000 departure tax. Overstaying is criminal offense.',
  official_source_url = 'https://www.mofa.go.jp',
  last_verified = '2026-02-20'
WHERE passport_slug = 'croatia' AND destination_slug = 'japan';

-- Malaysia: 90 days visa-free
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 90,
  stay_rule = '90 days per visit.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'may_be_requested',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'may_be_requested',
  notes = 'EU passport holders enjoy visa-free access. Biometric fingerprinting on arrival/departure. Overstays punishable by caning (males) plus fines/deportation - respect dates strictly. Kuala Lumpur common transit hub.',
  official_source_url = 'https://www.imi.gov.my',
  last_verified = '2026-02-20'
WHERE passport_slug = 'croatia' AND destination_slug = 'malaysia';

-- Mexico: up to 180 days visa-free
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 180,
  stay_rule = 'Up to 180 days for tourism; up to 120 days for business per calendar year. Duration at officer discretion.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'may_be_requested',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'may_be_requested',
  notes = 'FMM (Multiple Immigration Form) must be completed and retained for duration; collected on departure. EU passport holders enjoy broad access.',
  official_source_url = 'https://www.inm.gob.mx',
  last_verified = '2026-02-20'
WHERE passport_slug = 'croatia' AND destination_slug = 'mexico';

-- Netherlands: EU Freedom of Movement
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = NULL,
  stay_rule = 'Unlimited. EU freedom of movement. Croatian ID card accepted.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'EU citizen rights. Amsterdam Schiphol (AMS) is major transit hub for Croatian long-haul travel. KLM, Transavia, Ryanair operate Croatia-Amsterdam routes.',
  official_source_url = 'https://ind.nl',
  last_verified = '2026-02-20'
WHERE passport_slug = 'croatia' AND destination_slug = 'netherlands';

-- New Zealand: NZeTA required + IVL levy
UPDATE visa_rules SET
  visa_type = 'evisa',
  visa_subtype = 'NZeTA',
  max_stay_days = 90,
  stay_rule = 'Up to 90 days per visit on NZeTA (may be granted up to 6 months at border officer discretion).',
  passport_validity_months = 3,
  passport_validity_requirement = '3_months_beyond_departure',
  return_ticket_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'may_be_requested',
  notes = 'NZeTA (EU-favorable pathway) + IVL levy (NZD 100). Apply via NZeTA app (NZD 9) or web (NZD 12). Processing 72h. Croatia EU membership grants NZeTA eligibility.',
  official_source_url = 'https://www.immigration.govt.nz',
  last_verified = '2026-02-20'
WHERE passport_slug = 'croatia' AND destination_slug = 'new-zealand';

-- Nigeria: eVisa required
UPDATE visa_rules SET
  visa_type = 'evisa',
  max_stay_days = 30,
  stay_rule = '30 days (tourist visa). Extendable at Nigeria Immigration Service.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'may_be_requested',
  notes = 'eVisa at portal.immigration.gov.ng. Processing 2-3 business days. 2 blank passport pages required. Yellow fever vaccination certificate MANDATORY. Apply 2+ weeks before travel.',
  official_source_url = 'https://portal.immigration.gov.ng',
  last_verified = '2026-02-20'
WHERE passport_slug = 'croatia' AND destination_slug = 'nigeria';

-- Philippines: 30 days visa-free
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 30,
  stay_rule = '30 days on arrival. Extendable at Bureau of Immigration up to 59 days, then monthly.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_departure',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'may_be_requested',
  notes = 'EU passport holders enjoy visa-free access. Proof of accommodation required. Yellow fever certificate if from endemic country.',
  official_source_url = 'https://immigration.gov.ph',
  last_verified = '2026-02-20'
WHERE passport_slug = 'croatia' AND destination_slug = 'philippines';

-- Poland: EU Freedom of Movement
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = NULL,
  stay_rule = 'Unlimited. EU freedom of movement. Croatian ID card accepted.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'EU citizen rights. Direct flights Zagreb-Warsaw/Krakow. Strong bilateral ties within EU frameworks.',
  official_source_url = 'https://www.gov.pl',
  last_verified = '2026-02-20'
WHERE passport_slug = 'croatia' AND destination_slug = 'poland';

-- Portugal: EU Freedom of Movement
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = NULL,
  stay_rule = 'Unlimited. EU freedom of movement. Croatian ID card accepted.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'EU citizen rights. Direct flights Zagreb-Lisbon/Porto. Growing destination for Croatian tourists and digital nomads.',
  official_source_url = 'https://www.sef.pt',
  last_verified = '2026-02-20'
WHERE passport_slug = 'croatia' AND destination_slug = 'portugal';

-- Qatar: Visa on arrival
UPDATE visa_rules SET
  visa_type = 'visa_on_arrival',
  visa_subtype = 'or eVisa',
  max_stay_days = 30,
  stay_rule = '30 days per visit. Extendable at General Directorate of Passports.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'may_be_requested',
  notes = 'VoA at Hamad International Airport. Pre-travel eVisa also available via Qatar Visa Portal. Hotel booking required. Biometric iris/fingerprint on arrival. Doha major transit hub for Croatian travel to Asia/Africa/Australia.',
  official_source_url = 'https://portal.moi.gov.qa',
  last_verified = '2026-02-20'
WHERE passport_slug = 'croatia' AND destination_slug = 'qatar';

-- Russia: Visa required (travel advisory)
UPDATE visa_rules SET
  visa_type = 'visa_required',
  max_stay_days = 30,
  stay_rule = 'Visa conditions vary. Standard tourist visa: up to 30 days.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'may_be_requested',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'may_be_requested',
  notes = 'Croatian MVEP advises against non-essential travel. Bilateral visa-free arrangement suspended. Direct flights suspended. Apply at Russian Embassy Zagreb. Registration within 7 business days mandatory. Limited consular assistance.',
  official_source_url = 'https://www.mid.ru',
  last_verified = '2026-02-20'
WHERE passport_slug = 'croatia' AND destination_slug = 'russia';

-- Saudi Arabia: Visa on arrival or eVisa (90 days)
UPDATE visa_rules SET
  visa_type = 'visa_on_arrival',
  visa_subtype = 'or eVisa',
  max_stay_days = 90,
  stay_rule = 'Up to 90 days per visit for tourism.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'required',
  notes = 'Croatian MFA confirms VoA or eVisa at visa.visitsaudi.com (recommended - includes mandatory health insurance). Hotel booking required. Biometric iris/fingerprint on arrival. Non-Muslims prohibited from Mecca/Medina.',
  official_source_url = 'https://visa.visitsaudi.com',
  last_verified = '2026-02-20'
WHERE passport_slug = 'croatia' AND destination_slug = 'saudi-arabia';

-- Singapore: 30 days visa-free
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 30,
  stay_rule = '30 days per visit. Extendable at ICA.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'may_be_requested',
  notes = 'SG Arrival Card required before landing. Biometric on arrival/departure. Overstays >90 days punishable by caning (males) plus imprisonment/fines. Major transit hub for Croatian travel to Southeast Asia/Australia.',
  official_source_url = 'https://www.ica.gov.sg',
  last_verified = '2026-02-20'
WHERE passport_slug = 'croatia' AND destination_slug = 'singapore';

-- South Africa: 90 days visa-free
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 90,
  stay_rule = 'Up to 90 days per visit. Eligible to apply for additional 90-day extension upon arrival.',
  passport_validity_months = 1,
  passport_validity_requirement = 'other',
  return_ticket_required = 'may_be_requested',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'may_be_requested',
  notes = 'Croatian MFA confirms visa-free access. Passport valid 30 days beyond intended stay (not 6 months). 2 blank passport pages required. Yellow fever certificate if from endemic area. Growing Croatian tourist destination.',
  official_source_url = 'https://www.dha.gov.za',
  last_verified = '2026-02-20'
WHERE passport_slug = 'croatia' AND destination_slug = 'south-africa';

-- South Korea: Visa-free (K-ETA exemption)
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 90,
  stay_window_days = 365,
  stay_rule = 'Up to 90 days within any 12-month period.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'may_be_requested',
  notes = 'Croatian EU citizens exempt from K-ETA - no pre-authorization required. Biometric fingerprinting/photo on arrival. Overstays result in fines, deportation, multi-year ban. EU-South Korea FTA facilitates business travel.',
  official_source_url = 'https://www.immigration.go.kr',
  last_verified = '2026-02-20'
WHERE passport_slug = 'croatia' AND destination_slug = 'south-korea';

-- Spain: EU Freedom of Movement
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = NULL,
  stay_rule = 'Unlimited. EU freedom of movement. Croatian ID card accepted.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'EU citizen rights. One of most popular destinations for Croatian tourists. Multiple direct flights to Madrid, Barcelona. Mediterranean climate/culture similarities.',
  official_source_url = 'https://www.inclusion.gob.es',
  last_verified = '2026-02-20'
WHERE passport_slug = 'croatia' AND destination_slug = 'spain';

-- Switzerland: EU Freedom of Movement (bilateral)
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = NULL,
  stay_rule = 'Unlimited for employment/residency. Tourist stays: no formal limit up to 3 months without registration.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'Agreement on Free Movement of Persons (AFMP) between Switzerland-EU includes Croatia. Croatian ID card accepted. Direct flights Zagreb-Zurich/Geneva. Geneva hosts multilateral institutions important for Croatian diplomacy.',
  official_source_url = 'https://www.sem.admin.ch',
  last_verified = '2026-02-20'
WHERE passport_slug = 'croatia' AND destination_slug = 'switzerland';

-- Thailand: 60 days visa-free (expanded 2024)
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 60,
  stay_rule = '60 days per visit (expanded from 30 in 2024). Extendable once for additional 30 days (THB 1,900).',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'may_be_requested',
  notes = 'Thailand Digital Arrival Card (TDAC) may be required. Proof of funds THB 20,000 per person may be requested. Biometric on arrival. Overstays THB 500/day (max THB 20,000). Popular long-haul destination.',
  official_source_url = 'https://www.immigration.go.th',
  last_verified = '2026-02-20'
WHERE passport_slug = 'croatia' AND destination_slug = 'thailand';

-- Turkey: 90 days visa-free (90/180 rule)
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 90,
  stay_window_days = 180,
  stay_rule = '90 days within any 180-day period.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'may_be_requested',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'may_be_requested',
  notes = 'EU passport holders enjoy visa-free access. Biometric data collected on arrival. Direct flights Zagreb/Split-Istanbul. Istanbul major transit hub for Croatian travel to Asia/Middle East/Africa.',
  official_source_url = 'https://www.goc.gov.tr',
  last_verified = '2026-02-20'
WHERE passport_slug = 'croatia' AND destination_slug = 'turkey';

-- UAE: 30 days visa-free
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 30,
  stay_rule = '30 days per visit. Extendable for additional 30 days through GDRFA.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'may_be_requested',
  notes = 'EU passport holders enjoy visa-free access. Hotel booking required. Biometric iris/fingerprint on arrival. Dubai (DXB) and Abu Dhabi (AUH) major transit hubs. Overstays AED 100/day after 10-day grace.',
  official_source_url = 'https://u.ae',
  last_verified = '2026-02-20'
WHERE passport_slug = 'croatia' AND destination_slug = 'united-arab-emirates';

-- UK: ETA required from 2 April 2025
UPDATE visa_rules SET
  visa_type = 'evisa',
  visa_subtype = 'UK ETA',
  max_stay_days = 180,
  stay_rule = 'Up to 6 months per visit for tourism, visiting friends/family, short courses, permitted business.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'may_be_requested',
  notes = 'UK ETA MANDATORY from 2 April 2025 (applications open 5 March 2025). £16, valid 2 years. Apply via UK ETA app or gov.uk/apply-uk-eta. Processing 72h. Major change - Croatians previously entered UK without authorization. eGates available.',
  official_source_url = 'https://www.gov.uk/apply-uk-eta',
  last_verified = '2026-02-20'
WHERE passport_slug = 'croatia' AND destination_slug = 'united-kingdom';

-- US: ESTA required (VWP member since 1 Dec 2021)
UPDATE visa_rules SET
  visa_type = 'evisa',
  visa_subtype = 'ESTA (VWP)',
  max_stay_days = 90,
  stay_rule = 'Up to 90 days per visit. Cannot extend or change status.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'may_be_requested',
  notes = 'Croatia joined VWP as 40th member on 28 Sep 2021 (ESTA from 1 Dec 2021) - MAJOR milestone. ESTA at esta.cbp.dhs.gov, USD 21, valid 2 years. Biometric e-passport required. Biometric fingerprint/photo on arrival. Ineligible if visited Cuba/Iran/Iraq/Libya/NK/Somalia/Sudan/Syria/Yemen.',
  official_source_url = 'https://esta.cbp.dhs.gov',
  last_verified = '2026-02-20'
WHERE passport_slug = 'croatia' AND destination_slug = 'united-states';

-- Vietnam: 45 days visa-free (temporary until 31 Dec 2026)
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 45,
  stay_rule = '45 days per visit under unilateral visa-free exemption (valid until 31 Dec 2026).',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'may_be_requested',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'may_be_requested',
  notes = 'Vietnam expanded visa-free list for EU nationals including Croatia. 2 blank passport pages required. eVisa also available at evisa.xuatnhapcanh.gov.vn. Temporary policy - verify before travel. Overstays VND 500k-1m/day.',
  official_source_url = 'https://evisa.xuatnhapcanh.gov.vn',
  last_verified = '2026-02-20'
WHERE passport_slug = 'croatia' AND destination_slug = 'vietnam';
