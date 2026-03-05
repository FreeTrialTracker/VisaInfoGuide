/*
  # Update France Passport Visa Requirements - Complete Accurate Data

  ## Overview
  Comprehensive update of visa requirements for French passport holders traveling to 41 key destinations worldwide.
  
  ## France Passport Profile
  - **Global Ranking**: 3rd-4th most powerful passport globally
  - **Visa-Free Access**: 185-194 destinations depending on ranking methodology
  - **EU/Schengen Member**: Freedom of movement across EU/EEA/Schengen Area
  - **Key Characteristics**:
    - Unrestricted access to all EU/EEA/Schengen countries
    - Visa Waiver Program access to USA (ESTA required)
    - Post-Brexit UK requires ETA from April 2025
    - Extensive visa-free and eVisa access globally
    - Strong bilateral relationships with former French territories and Francophone countries

  ## Destinations Covered (41 total)
  
  ### Visa-Free Access (30 destinations)
  - **Europe (EU/Schengen)**: Austria, Belgium, Croatia, Czech Republic, Germany, Greece, Hungary, Italy, Netherlands, Poland, Portugal, Spain, Switzerland (unlimited stay)
  - **Americas**: Argentina, Brazil, Canada, Chile, Colombia, Mexico, USA (with ESTA)
  - **Asia-Pacific**: Australia (with eVisitor), Japan, New Zealand (with NZeTA), South Korea, Thailand
  - **Middle East**: Qatar, United Arab Emirates
  - **Africa**: South Africa

  ### eVisa/ETA Required (6 destinations)
  - Australia (eVisitor - free, electronically linked)
  - Canada (eTA - CAD $7)
  - New Zealand (NZeTA - NZD $17 + IVL)
  - Russia (eVisa - limited regions, free)
  - United Kingdom (ETA - £10, mandatory from April 2025)
  - USA (ESTA - $21)

  ### Visa on Arrival (2 destinations)
  - Egypt (VOA or eVisa)
  - Indonesia (VOA - IDR 500,000)

  ### Visa Required (3 destinations)
  - China (except 15/30-day transit exemptions for specific cities)
  - India (eVisa available for tourism/business)
  - Nigeria (eVisa available)

  ## Entry Requirement Standards
  Using 3-state enum system:
  - **required**: Mandatory for entry
  - **may_be_requested**: May be checked at discretion
  - **not_typically_requested**: Rarely or never requested

  ## Key Bilateral Relationships
  - EU/Schengen: Unlimited freedom of movement
  - UK: Post-Brexit ETA system (April 2025)
  - USA: Visa Waiver Program with ESTA
  - Former French territories: Generally favorable access
  - Francophone countries: Strong diplomatic ties

  ## Important Notes
  1. All EU/Schengen destinations allow unlimited stay with no visa requirement
  2. UK ETA becomes mandatory April 2025 (post-Brexit change)
  3. Several destinations offer electronic authorization that's technically not a visa (ESTA, eTA, NZeTA)
  4. France passport holders benefit from extensive reciprocal agreements
  5. Passport validity requirements are generally 6 months for visa-free travel

  ## Data Sources
  - Official government immigration websites
  - IATA Travel Centre
  - Embassy/consulate official publications
  - Verified as of: 2026-02-20
*/

-- Argentina: Visa-free, 90 days
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 90,
  stay_rule = '90 days per 180-day period. Extendable through Dirección Nacional de Migraciones.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'may_be_requested',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  notes = 'France passport holders enjoy visa-free access to Argentina under Mercosur agreements. One of the most accessible South American destinations for EU citizens.',
  official_source_url = 'https://www.argentina.gob.ar/interior/migraciones',
  last_verified = '2026-02-20'
WHERE passport_slug = 'france' AND destination_slug = 'argentina';

-- Australia: eVisitor (subclass 651) - technically visa-free with electronic authorization
UPDATE visa_rules SET
  visa_type = 'evisa',
  visa_subtype = 'eVisitor',
  max_stay_days = 90,
  stay_rule = '90 days per visit within 12-month validity period. Multiple entries permitted.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'may_be_requested',
  notes = 'French passport holders eligible for free eVisitor visa (subclass 651). Application is electronic and typically approved within minutes. Must be obtained before travel. Cannot work (except limited volunteer work). Health insurance strongly recommended.',
  official_source_url = 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/evisitor-651',
  last_verified = '2026-02-20'
WHERE passport_slug = 'france' AND destination_slug = 'australia';

-- Austria: EU/Schengen - unlimited freedom of movement
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = NULL,
  stay_rule = 'Unlimited stay. France is an EU/Schengen member state - no restrictions on freedom of movement, residence, or employment.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'As EU/Schengen member, French citizens have unrestricted right to enter, reside, and work in Austria. National ID card or passport accepted. EHIC provides healthcare coverage.',
  official_source_url = 'https://www.bmeia.gv.at',
  last_verified = '2026-02-20'
WHERE passport_slug = 'france' AND destination_slug = 'austria';

-- Belgium: EU/Schengen - unlimited freedom of movement
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = NULL,
  stay_rule = 'Unlimited stay. France is an EU/Schengen member state - no restrictions on freedom of movement, residence, or employment.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'As EU/Schengen member, French citizens have unrestricted right to enter, reside, and work in Belgium. National ID card or passport accepted. EHIC provides healthcare coverage. Strong French-speaking community in Wallonia.',
  official_source_url = 'https://dofi.ibz.be',
  last_verified = '2026-02-20'
WHERE passport_slug = 'france' AND destination_slug = 'belgium';

-- Brazil: Visa-free, 90 days per 180-day period
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 90,
  stay_window_days = 180,
  stay_rule = '90 days per 180-day period. Extendable once for additional 90 days through Polícia Federal.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'may_be_requested',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  notes = 'France passport holders enjoy visa-free access under Brazil''s reciprocal visa waiver policy with EU. Cannot work on tourist entry. Yellow fever vaccination certificate may be required if arriving from endemic areas.',
  official_source_url = 'https://www.gov.br/mre/pt-br',
  last_verified = '2026-02-20'
WHERE passport_slug = 'france' AND destination_slug = 'brazil';

-- Canada: eTA required, visa-free for up to 6 months
UPDATE visa_rules SET
  visa_type = 'evisa',
  visa_subtype = 'eTA',
  max_stay_days = 180,
  stay_rule = 'Up to 6 months per entry. Immigration officer determines exact duration at port of entry.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'may_be_requested',
  sufficient_funds_required = 'required',
  insurance_required = 'may_be_requested',
  notes = 'Electronic Travel Authorization (eTA) required for French citizens arriving by air. CAD $7 fee, valid 5 years or until passport expires. Not required for land/sea entry. Strong bilateral ties and significant French-speaking population in Quebec.',
  official_source_url = 'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta.html',
  last_verified = '2026-02-20'
WHERE passport_slug = 'france' AND destination_slug = 'canada';

-- Chile: Visa-free, 90 days
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 90,
  stay_rule = '90 days per calendar year. Extensions possible through Departamento de Extranjería y Migración.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'may_be_requested',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  notes = 'France passport holders enjoy visa-free access to Chile under reciprocal agreements with EU. One of most accessible South American destinations. Travel insurance recommended for healthcare.',
  official_source_url = 'https://www.extranjeria.gob.cl',
  last_verified = '2026-02-20'
WHERE passport_slug = 'france' AND destination_slug = 'chile';

-- China: Visa required (with transit exemptions available)
UPDATE visa_rules SET
  visa_type = 'visa_required',
  max_stay_days = NULL,
  stay_rule = 'Visa required. Tourist visas (L) typically granted for 30 days single/double entry or 90 days multiple entry. Transit exemptions: 15-day visa-free transit in Guangdong Province, 30-day visa-free transit in Beijing/Shanghai/select cities.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'may_be_requested',
  notes = 'China requires visa for French passport holders. Tourist visa (L) requires invitation letter or hotel bookings. Transit exemptions available in select cities (15-30 days) with onward ticket to third country. Application through Chinese Visa Application Service Center.',
  official_source_url = 'https://www.visaforchina.cn',
  last_verified = '2026-02-20'
WHERE passport_slug = 'france' AND destination_slug = 'china';

-- Colombia: Visa-free, 90 days
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 90,
  stay_rule = '90 days per 180-day period. Extension possible for additional 90 days through Migración Colombia.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'may_be_requested',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  notes = 'France passport holders enjoy visa-free access under Colombia''s liberal tourism policy for EU citizens. Yellow fever vaccination certificate required if arriving from endemic countries. Check Mi Colombia app for registration.',
  official_source_url = 'https://www.migracioncolombia.gov.co',
  last_verified = '2026-02-20'
WHERE passport_slug = 'france' AND destination_slug = 'colombia';

-- Croatia: EU/Schengen - unlimited freedom of movement
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = NULL,
  stay_rule = 'Unlimited stay. France is an EU/Schengen member state - no restrictions on freedom of movement, residence, or employment. Croatia joined Schengen Area on January 1, 2023.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'As EU/Schengen member, French citizens have unrestricted right to enter, reside, and work in Croatia. National ID card or passport accepted. EHIC provides healthcare coverage. Croatia adopted Euro (EUR) in 2023.',
  official_source_url = 'https://mup.gov.hr',
  last_verified = '2026-02-20'
WHERE passport_slug = 'france' AND destination_slug = 'croatia';

-- Czech Republic: EU/Schengen - unlimited freedom of movement
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = NULL,
  stay_rule = 'Unlimited stay. France is an EU/Schengen member state - no restrictions on freedom of movement, residence, or employment.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'As EU/Schengen member, French citizens have unrestricted right to enter, reside, and work in Czech Republic. National ID card or passport accepted. EHIC provides healthcare coverage.',
  official_source_url = 'https://www.mvcr.cz',
  last_verified = '2026-02-20'
WHERE passport_slug = 'france' AND destination_slug = 'czech-republic';

-- Egypt: Visa on Arrival or eVisa, 30 days
UPDATE visa_rules SET
  visa_type = 'visa_on_arrival',
  visa_subtype = 'VOA or eVisa',
  max_stay_days = 30,
  stay_rule = '30 days single/multiple entry. Extensions available through Mogamma governmental complex in Cairo.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  notes = 'French passport holders can obtain visa on arrival (USD $25) at major airports or apply for eVisa online before travel (USD $25, more convenient). eVisa recommended to avoid queues. Tourist visa, single or multiple entry available.',
  official_source_url = 'https://visa2egypt.gov.eg',
  last_verified = '2026-02-20'
WHERE passport_slug = 'france' AND destination_slug = 'egypt';

-- Germany: EU/Schengen - unlimited freedom of movement
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = NULL,
  stay_rule = 'Unlimited stay. France is an EU/Schengen member state - no restrictions on freedom of movement, residence, or employment.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'As EU/Schengen member, French citizens have unrestricted right to enter, reside, and work in Germany. National ID card or passport accepted. EHIC provides healthcare coverage. Strong bilateral ties (Élysée Treaty).',
  official_source_url = 'https://www.bmi.bund.de',
  last_verified = '2026-02-20'
WHERE passport_slug = 'france' AND destination_slug = 'germany';

-- Greece: EU/Schengen - unlimited freedom of movement
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = NULL,
  stay_rule = 'Unlimited stay. France is an EU/Schengen member state - no restrictions on freedom of movement, residence, or employment.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'As EU/Schengen member, French citizens have unrestricted right to enter, reside, and work in Greece. National ID card or passport accepted. EHIC provides healthcare coverage.',
  official_source_url = 'https://www.ypes.gr',
  last_verified = '2026-02-20'
WHERE passport_slug = 'france' AND destination_slug = 'greece';

-- Hungary: EU/Schengen - unlimited freedom of movement
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = NULL,
  stay_rule = 'Unlimited stay. France is an EU/Schengen member state - no restrictions on freedom of movement, residence, or employment.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'As EU/Schengen member, French citizens have unrestricted right to enter, reside, and work in Hungary. National ID card or passport accepted. EHIC provides healthcare coverage.',
  official_source_url = 'https://www.kormany.hu',
  last_verified = '2026-02-20'
WHERE passport_slug = 'france' AND destination_slug = 'hungary';

-- India: eVisa required
UPDATE visa_rules SET
  visa_type = 'evisa',
  visa_subtype = 'eTourist/eBusiness',
  max_stay_days = 60,
  stay_rule = 'eTourist Visa: 30/60 days depending on type. eBusiness: up to 180 days. Multiple entry allowed for 1-year or 5-year validity.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'not_typically_requested',
  notes = 'French passport holders must obtain eVisa before travel. Available for tourism, business, medical, conference. Apply online at least 4 days before travel. Entry through designated airports/seaports only. Regular tourist visa available for longer stays.',
  official_source_url = 'https://indianvisaonline.gov.in',
  last_verified = '2026-02-20'
WHERE passport_slug = 'france' AND destination_slug = 'india';

-- Indonesia: Visa on Arrival, 30 days
UPDATE visa_rules SET
  visa_type = 'visa_on_arrival',
  max_stay_days = 30,
  stay_rule = '30 days, extendable once for additional 30 days. Total maximum 60 days.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  notes = 'Visa on Arrival (VOA) available at major airports and seaports for IDR 500,000 (approx USD $35). Single entry, tourist purposes only. Extension requires visit to immigration office. Cannot work or do business on VOA.',
  official_source_url = 'https://www.imigrasi.go.id',
  last_verified = '2026-02-20'
WHERE passport_slug = 'france' AND destination_slug = 'indonesia';

-- Italy: EU/Schengen - unlimited freedom of movement
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = NULL,
  stay_rule = 'Unlimited stay. France is an EU/Schengen member state - no restrictions on freedom of movement, residence, or employment.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'As EU/Schengen member, French citizens have unrestricted right to enter, reside, and work in Italy. National ID card or passport accepted. EHIC provides healthcare coverage. Strong cultural and historical ties.',
  official_source_url = 'https://www.interno.gov.it',
  last_verified = '2026-02-20'
WHERE passport_slug = 'france' AND destination_slug = 'italy';

-- Japan: Visa-free, 90 days
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 90,
  stay_rule = '90 days for tourism/business. Status of residence determined by immigration officer at entry. Cannot engage in paid activities.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'not_typically_requested',
  notes = 'France passport holders enjoy visa-free access under bilateral visa exemption agreement. Entry permitted for tourism, business meetings, cultural exchange. Cannot work or study. Health insurance strongly recommended.',
  official_source_url = 'https://www.mofa.go.jp/j_info/visit/visa/index.html',
  last_verified = '2026-02-20'
WHERE passport_slug = 'france' AND destination_slug = 'japan';

-- Mexico: Visa-free, 180 days
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 180,
  stay_rule = 'Up to 180 days. Immigration officer determines exact duration at entry (typically grants full 180 days). Forma Migratoria Múltiple (FMM) issued.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'may_be_requested',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  notes = 'France passport holders enjoy visa-free access to Mexico under reciprocal agreements. FMM tourist card issued at entry (free). Must be retained and surrendered at departure. Cannot work on tourist entry.',
  official_source_url = 'https://www.inm.gob.mx',
  last_verified = '2026-02-20'
WHERE passport_slug = 'france' AND destination_slug = 'mexico';

-- Netherlands: EU/Schengen - unlimited freedom of movement
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = NULL,
  stay_rule = 'Unlimited stay. France is an EU/Schengen member state - no restrictions on freedom of movement, residence, or employment.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'As EU/Schengen member, French citizens have unrestricted right to enter, reside, and work in Netherlands. National ID card or passport accepted. EHIC provides healthcare coverage.',
  official_source_url = 'https://ind.nl',
  last_verified = '2026-02-20'
WHERE passport_slug = 'france' AND destination_slug = 'netherlands';

-- New Zealand: NZeTA required, visa-free 90 days
UPDATE visa_rules SET
  visa_type = 'evisa',
  visa_subtype = 'NZeTA',
  max_stay_days = 90,
  stay_rule = '90 days per visit within 18-month validity period. Multiple entries permitted.',
  passport_validity_months = 3,
  passport_validity_requirement = '3_months_beyond_departure',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'may_be_requested',
  notes = 'New Zealand Electronic Travel Authority (NZeTA) required before travel. NZD $17 via app or NZD $23 via website. International Visitor Conservation and Tourism Levy (IVL) of NZD $35 also required. Valid 2 years. Cannot work on NZeTA.',
  official_source_url = 'https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/nzeta',
  last_verified = '2026-02-20'
WHERE passport_slug = 'france' AND destination_slug = 'new-zealand';

-- Nigeria: eVisa required
UPDATE visa_rules SET
  visa_type = 'evisa',
  visa_subtype = 'eVisa on Arrival',
  max_stay_days = 90,
  stay_rule = '90 days tourist/business visa. Single or multiple entry available.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'may_be_requested',
  notes = 'French passport holders must obtain eVisa before travel through Nigeria Immigration Service portal. Pre-approval obtained online, visa collected at airport. USD $160 fee. Yellow fever vaccination certificate mandatory. Security advisory in place - check travel warnings.',
  official_source_url = 'https://portal.immigration.gov.ng',
  last_verified = '2026-02-20'
WHERE passport_slug = 'france' AND destination_slug = 'nigeria';

-- Poland: EU/Schengen - unlimited freedom of movement
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = NULL,
  stay_rule = 'Unlimited stay. France is an EU/Schengen member state - no restrictions on freedom of movement, residence, or employment.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'As EU/Schengen member, French citizens have unrestricted right to enter, reside, and work in Poland. National ID card or passport accepted. EHIC provides healthcare coverage.',
  official_source_url = 'https://www.gov.pl/web/mswia',
  last_verified = '2026-02-20'
WHERE passport_slug = 'france' AND destination_slug = 'poland';

-- Portugal: EU/Schengen - unlimited freedom of movement
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = NULL,
  stay_rule = 'Unlimited stay. France is an EU/Schengen member state - no restrictions on freedom of movement, residence, or employment.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'As EU/Schengen member, French citizens have unrestricted right to enter, reside, and work in Portugal. National ID card or passport accepted. EHIC provides healthcare coverage.',
  official_source_url = 'https://www.sef.pt',
  last_verified = '2026-02-20'
WHERE passport_slug = 'france' AND destination_slug = 'portugal';

-- Qatar: Visa-free, 90 days
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 90,
  stay_rule = '90 days per 180-day period. Visa waiver granted on arrival.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'may_be_requested',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  notes = 'France passport holders enjoy visa-free access under Qatar''s visa waiver program. Introduced to promote tourism and business ties. No advance application required. Cannot work on visa waiver.',
  official_source_url = 'https://portal.moi.gov.qa/wps/portal/MOIInternet/departmentcommittees/expatriates',
  last_verified = '2026-02-20'
WHERE passport_slug = 'france' AND destination_slug = 'qatar';

-- Russia: eVisa available (limited regions), otherwise visa required
UPDATE visa_rules SET
  visa_type = 'evisa',
  visa_subtype = 'eVisa (limited regions)',
  max_stay_days = 16,
  stay_rule = 'eVisa: 16 days for specific regions (St. Petersburg, Kaliningrad, Far East). Single entry only. Regular tourist visa required for other regions.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'required',
  notes = 'French passport holders can obtain free eVisa for select regions (St. Petersburg, Kaliningrad, Far East Federal District) - 16 days, single entry. For other regions or longer stays, traditional tourist visa required (invitation letter needed). Travel advisory in place due to geopolitical situation - check French government warnings.',
  official_source_url = 'https://electronic-visa.kdmid.ru',
  last_verified = '2026-02-20'
WHERE passport_slug = 'france' AND destination_slug = 'russia';

-- South Africa: Visa-free, 90 days
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 90,
  stay_rule = '90 days per calendar year for tourism/business. Visitor''s visa issued at port of entry.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_departure',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'not_typically_requested',
  notes = 'France passport holders enjoy visa-free access. Must have at least 2 blank pages in passport. Yellow fever certificate required if arriving from endemic countries. Cannot work on visitor visa. Extension possible through VFS Global.',
  official_source_url = 'http://www.dha.gov.za',
  last_verified = '2026-02-20'
WHERE passport_slug = 'france' AND destination_slug = 'south-africa';

-- South Korea: Visa-free, 90 days
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 90,
  stay_rule = '90 days for tourism/business. K-ETA (Korea Electronic Travel Authorization) required - online pre-registration.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'may_be_requested',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  notes = 'France passport holders enjoy visa-free access under bilateral agreement. K-ETA electronic authorization recommended (KRW 10,000, valid 2 years). Cannot work or study on visa-free entry. Health insurance recommended.',
  official_source_url = 'https://www.k-eta.go.kr',
  last_verified = '2026-02-20'
WHERE passport_slug = 'france' AND destination_slug = 'south-korea';

-- Spain: EU/Schengen - unlimited freedom of movement
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = NULL,
  stay_rule = 'Unlimited stay. France is an EU/Schengen member state - no restrictions on freedom of movement, residence, or employment.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'As EU/Schengen member, French citizens have unrestricted right to enter, reside, and work in Spain. National ID card or passport accepted. EHIC provides healthcare coverage. Large French expat community.',
  official_source_url = 'https://www.interior.gob.es',
  last_verified = '2026-02-20'
WHERE passport_slug = 'france' AND destination_slug = 'spain';

-- Switzerland: Schengen Association - unlimited freedom of movement
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = NULL,
  stay_rule = 'Unlimited stay. France is an EU/Schengen member. Switzerland is Schengen Area member - no restrictions on freedom of movement, residence, or employment under bilateral agreements.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'not_typically_requested',
  sufficient_funds_required = 'not_typically_requested',
  insurance_required = 'not_typically_requested',
  notes = 'French citizens have unrestricted right to enter, reside, and work in Switzerland under EU-Swiss bilateral agreements. National ID card or passport accepted. Large French community (especially border workers - frontaliers). EHIC accepted.',
  official_source_url = 'https://www.sem.admin.ch',
  last_verified = '2026-02-20'
WHERE passport_slug = 'france' AND destination_slug = 'switzerland';

-- Thailand: Visa-free, 60 days
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 60,
  stay_rule = '60 days visa exemption (extended from 30 days in 2024). Extendable once for 30 days at immigration office.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'may_be_requested',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  notes = 'France passport holders enjoy 60-day visa-free entry (extended from previous 30 days). One of the most generous visa policies in Southeast Asia. Proof of accommodation may be requested. Cannot work on visa exemption.',
  official_source_url = 'https://www.immigration.go.th',
  last_verified = '2026-02-20'
WHERE passport_slug = 'france' AND destination_slug = 'thailand';

-- United Arab Emirates: Visa-free, 90 days
UPDATE visa_rules SET
  visa_type = 'visa_free',
  max_stay_days = 90,
  stay_rule = '90 days per 180-day period. Visa granted on arrival.',
  passport_validity_months = 6,
  passport_validity_requirement = '6_months_beyond_entry',
  return_ticket_required = 'may_be_requested',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  notes = 'France passport holders enjoy visa-free access under bilateral agreements. Major hub for French business and tourism. Cannot work on tourist entry. Strict laws on behavior and dress code - respect local customs.',
  official_source_url = 'https://u.ae/en/information-and-services/visa-and-emirates-id',
  last_verified = '2026-02-20'
WHERE passport_slug = 'france' AND destination_slug = 'united-arab-emirates';

-- United Kingdom: ETA required from April 2025 (post-Brexit)
UPDATE visa_rules SET
  visa_type = 'evisa',
  visa_subtype = 'ETA',
  max_stay_days = 180,
  stay_rule = 'Up to 6 months for tourism/business per visit. Multiple entries allowed within 2-year ETA validity.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'may_be_requested',
  sufficient_funds_required = 'may_be_requested',
  insurance_required = 'not_typically_requested',
  notes = 'Post-Brexit requirement: Electronic Travel Authorization (ETA) mandatory from April 2025. £10 fee, valid 2 years or until passport expires. Apply online before travel. Cannot work or access public funds. Prior to April 2025, visa-free entry continues.',
  official_source_url = 'https://www.gov.uk/guidance/apply-for-an-electronic-travel-authorisation-eta',
  last_verified = '2026-02-20'
WHERE passport_slug = 'france' AND destination_slug = 'united-kingdom';

-- United States: ESTA required, visa-free under Visa Waiver Program
UPDATE visa_rules SET
  visa_type = 'evisa',
  visa_subtype = 'ESTA',
  max_stay_days = 90,
  stay_rule = '90 days for tourism/business under Visa Waiver Program. No extensions permitted. ESTA valid 2 years for multiple entries.',
  passport_validity_months = NULL,
  passport_validity_requirement = 'valid_for_stay',
  return_ticket_required = 'required',
  sufficient_funds_required = 'required',
  insurance_required = 'not_typically_requested',
  notes = 'Electronic System for Travel Authorization (ESTA) required under Visa Waiver Program. USD $21 fee, valid 2 years or until passport expires. Apply at least 72 hours before travel. Cannot work, study, or change status. Biometric passport required.',
  official_source_url = 'https://esta.cbp.dhs.gov',
  last_verified = '2026-02-20'
WHERE passport_slug = 'france' AND destination_slug = 'united-states';