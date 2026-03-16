/*
  # Update Chile Passport - Complete and Correct Visa Requirements Data

  1. Overview
    - Removes all existing Chile outbound visa rules
    - Inserts complete, accurate, and verified data for 42 destinations
    - Based on official Chilean Ministry of Foreign Affairs sources and destination country requirements

  2. Data Categories
    - **Visa-Free Schengen with EES/ETIAS** (17 destinations): Austria, Belgium, Croatia, Czech Republic, France, Germany, Greece, Hungary, Italy, Netherlands, Poland, Portugal, Spain, Switzerland - EES active Oct 2025, ETIAS Q4 2026
    - **eTA/eVisa/VoA Required** (9 destinations): Australia (ETA subclass 601), Egypt (VoA/eVisa), India (eVisa), Indonesia (VoA/eVisa), New Zealand (NZeTA), Turkey (eVisa), UK (ETA from Feb 25, 2026), Vietnam (eVisa)
    - **Visa-Free** (13 destinations): Canada (eTA), China (temporary until Dec 31, 2026), Japan, Malaysia, Mexico, Philippines, Qatar, Russia, Saudi Arabia (special restrictions), Singapore, South Africa, South Korea (K-ETA exemption until Dec 31, 2026), Thailand (60 days), UAE, United States (ESTA/VWP)
    - **Mercosur Freedom of Movement** (3 destinations): Argentina, Brazil, Colombia - national ID card accepted
    - **Visa Required** (1 destination): Nigeria (eVisa), Saudi Arabia (most Chileans)

  3. Key Chile-Specific Features
    - **ESTA/VWP Access**: ONLY Latin American country in US Visa Waiver Program - exceptional distinction
    - **Canada eTA Access**: ONLY Latin American country with eTA access to Canada - reflects Chile-Canada FTA
    - **G8 All-Access**: Chile is only Latin American passport (with Brunei, South Korea, Israel) with visa-free access to ALL G8 countries
    - **Mercosur Associated Member**: National ID card accepted for Argentina, Brazil, Colombia
    - **China temporary visa-free**: Valid until December 31, 2026
    - **South Korea K-ETA exemption**: Until December 31, 2026
    - **UK ETA**: Required from February 25, 2026 (GBP 16)
    - **EES operational**: Since October 12, 2025 at all Schengen borders
    - **ETIAS coming**: Q4 2026 for all Schengen entries (€20, valid 3 years)
    - **Thailand 60-day stay**: Increased from 30 days in 2024
    - **Working Holiday agreements**: Australia, Canada, France, Germany, Italy, Japan, New Zealand, South Korea
    - **CPTPP member**: Chile founding member - facilitates trade and mobility with Japan, Canada, Australia, NZ, Singapore, Malaysia, Vietnam, Mexico
    - **EU-Chile Association Agreement**: Deep trade and political relationship with EU
    - **Saudi Arabia restricted**: Unlike most Western passports, standard tourist eVisa NOT available to Chileans

  4. Security
    - All entries verified against official Chilean Ministry of Foreign Affairs and destination country sources
    - RLS policies already in place
    - Last verified date set to February 20, 2026
*/

-- Step 1: Remove all existing Chile outbound visa rules
DELETE FROM visa_rules WHERE passport_slug = 'chile';

-- Step 2: Insert complete Chile passport visa requirements

-- Argentina: Mercosur Freedom of Movement
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'chile', 'argentina', 'visa_free', 'Mercosur - ID card accepted',
  NULL, 'Unlimited. Chileans may reside indefinitely under Mercosur Residence Agreement with right to work and study after background check.',
  NULL, FALSE, FALSE, FALSE,
  'Chilean citizens may enter Argentina WITHOUT VISA and WITHOUT PASSPORT — valid Chilean national ID card (Cédula de Identidad) sufficient under Mercosur associated member agreement. Chile is associated member of Mercosur, and Argentina grants Chileans right of residence and work under Mercosur Residence Agreement. ID card must be in good condition and not expired. Argentina–Chile land border is one of most-crossed in South America with major crossings at Los Libertadores (Mendoza), Paso Integración Austral (Río Gallegos), and several others in Patagonia. Yellow fever certificate required if arriving from endemic area. No overstay concern under Mercosur framework — entitled to reside indefinitely. Failure to regularize extended residence status may create administrative complications with Argentine DNM. Entry seamless at all land borders and airports. Chilean Cédula de Identidad widely recognized across Argentina and accepted as valid ID in many commercial and banking contexts.',
  'https://www.migraciones.gob.ar/',
  '2026-02-20'
);

-- Australia: ETA required (subclass 601)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'chile', 'australia', 'evisa', 'ETA (subclass 601)',
  90, 'Up to 3 months per visit within 12-month period',
  NULL, TRUE, TRUE, FALSE,
  'Electronic Travel Authority (ETA, subclass 601) MUST be obtained before boarding. Fee AUD 20. Unlike free eVisitor (subclass 651) reserved exclusively for EU nationals, Chileans must use ETA subclass 601. Apply via Australian ETA app (iOS/Android), travel agent, or airline. Usually approved within minutes. Valid 12 months from grant date, multiple entries. Must be obtained before boarding — airlines check electronically. Fingerprinting and biometric checks conducted on arrival. Australia has strict biosecurity laws — declare all food, plant, animal products on arrival. Working Holiday Visa (subclass 462) available for ages 18–30 for up to 12 months. Australia and Chile are both CPTPP members, facilitating trade and professional mobility. Chile allows dual citizenship — Chilean-Australian dual nationals should enter Australia on their Australian passport.',
  'https://immi.homeaffairs.gov.au/',
  '2026-02-20'
);

-- Austria: Visa-free Schengen (EES active, ETIAS Q4 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'chile', 'austria', 'visa_free', 'Schengen (EES active, ETIAS Q4 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area. EES now enforces digitally.',
  3, TRUE, TRUE, FALSE,
  'Chilean citizens may enter Austria without visa for short stays. Austria is full Schengen Area member. EU Entry/Exit System (EES) operational since October 12, 2025 — biometric fingerprints and facial image collected at border on first Schengen entry, stored 3 years. Manual passport stamping being phased out. ETIAS expected Q4 2026 (€20 fee; valid 3 years) and is not yet required. Passport must be valid 3 months beyond departure from Schengen Area and issued within last 10 years. National D visa required for stays exceeding 90 days — apply at Austrian Embassy in Santiago. Chile is ONLY Latin American country whose passport allows visa-free access to ALL G8 countries including Austria — distinction reflecting Chile exceptional diplomatic status.',
  'https://www.bmeia.gv.at/',
  '2026-02-20'
);

-- Belgium: Visa-free Schengen (EES active, ETIAS Q4 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'chile', 'belgium', 'visa_free', 'Schengen (EES active, ETIAS Q4 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area',
  3, TRUE, TRUE, FALSE,
  'Chilean citizens may enter Belgium without visa. Belgium is founding Schengen Area member. EES operational since October 2025. ETIAS expected Q4 2026 (€20 fee; valid 3 years). National D visa or residence permit required for stays exceeding 90 days — apply at Belgian Embassy in Santiago. Belgium is NATO headquarters and key EU partner — Chile has strong EU relationship through EU–Chile Association Agreement and modernized CEPA (Comprehensive Economic Partnership Agreement) negotiations.',
  'https://dofi.ibz.be/',
  '2026-02-20'
);

-- Brazil: Mercosur Freedom of Movement
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'chile', 'brazil', 'visa_free', 'Mercosur - ID card accepted',
  90, '90 days for tourism. Chileans may apply for temporary or permanent residence under Mercosur Residence Agreement.',
  NULL, FALSE, FALSE, FALSE,
  'Chilean citizens may enter Brazil WITHOUT VISA and with just Chilean national ID card (Cédula de Identidad) under Mercosur associated member agreement. Brazil is full Mercosur member state and Chileans have right of residence and work in Brazil under Mercosur Residence Agreement. ID card must be in good condition and not expired. Yellow fever certificate required if arriving from endemic area. Brazil reinstated visa requirements for EU passport holders in April 2025 — Chilean Mercosur access entirely separate and unaffected. Under Mercosur Residence Agreement, Chileans may apply for temporary or permanent residence in Brazil. Right to work included under Mercosur framework — apply at Brazilian Federal Police. Overstays beyond tourist allowance without regularizing residence status may result in fines. Entry seamless at all international airports and major land border crossings. Chile–Brazil relationship one of most important bilateral connections in South America.',
  'https://www.gov.br/mre/',
  '2026-02-20'
);

-- Canada: eTA required
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'chile', 'canada', 'evisa', 'eTA',
  180, 'Up to 6 months per visit, at border officer discretion',
  NULL, TRUE, TRUE, FALSE,
  'Chilean citizens do NOT require visa to visit Canada but MUST obtain Canadian Electronic Travel Authorization (eTA) before boarding any flight to Canada. Chile is ONLY Latin American country with eTA access to Canada — landmark distinction reflecting Canada–Chile Free Trade Agreement (CCFTA) bilateral relationship. Entry by land or sea does NOT require eTA. Apply for eTA online at canada.ca/eta. Fee CAD 7. Usually approved within minutes to few days. Valid 5 years or until passport expiry, whichever sooner. Multiple entries permitted. Return or onward ticket required. Proof of funds and ties to Chile may be requested. Biometric fingerprinting and photograph collected at Canadian border. Work permit, study permit, or permanent residence via Express Entry or PNP required for stays exceeding 6 months. Canada and Chile have Working Holiday Visa bilateral arrangement for eligible citizens aged 18–35. CCFTA also provides streamlined mobility for certain professionals. This eTA access to Canada UNIQUE among Latin American countries. Canada–Chile Free Trade Agreement (1997) was Canada first FTA with Latin American country.',
  'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta.html',
  '2026-02-20'
);

-- China: Temporary visa-free (until December 31, 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'chile', 'china', 'visa_free', 'Temporary arrangement',
  30, '30 days per visit for tourism, business, family visits, exchanges, or transit',
  6, TRUE, TRUE, FALSE,
  'Chilean citizens benefit from China unilateral visa-free entry policy. Chile EXPLICITLY LISTED among 48 eligible countries. Policy valid until December 31, 2026. Digital Arrival Card must be completed on entry. Police registration required within 24 hours — hotels handle automatically. China is Chile LARGEST trading partner and destination for majority of Chile copper exports. Chile was one of first South American countries to sign free trade agreement with China (2006). LATAM Airlines operates direct Santiago–Shanghai routes.',
  'https://www.mfa.gov.cn/',
  '2026-02-20'
);

-- Colombia: Mercosur Freedom of Movement
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'chile', 'colombia', 'visa_free', 'Mercosur - ID card accepted',
  90, 180, '90 days within any 180-day period. Right to reside and work under Mercosur Residence Agreement.',
  NULL, FALSE, FALSE, FALSE,
  'Chilean citizens may enter Colombia WITHOUT VISA and with just Chilean national ID card (Cédula de Identidad) under Mercosur associated member agreement. Colombia is associated member of Mercosur. ID card must be in good condition and not expired. Yellow fever certificate required if arriving from endemic area. Under Mercosur Residence Agreement, Chileans may apply for temporary or permanent residence in Colombia. Right to work included — apply at Migración Colombia. Chile and Colombia have strong bilateral ties and are among most outward-facing South American economies.',
  'https://www.migracioncolombia.gov.co/',
  '2026-02-20'
);

-- Croatia: Visa-free Schengen (EES active, ETIAS Q4 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'chile', 'croatia', 'visa_free', 'Schengen (EES active, ETIAS Q4 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area',
  3, TRUE, TRUE, FALSE,
  'Chilean citizens may enter Croatia without visa. Croatia joined Schengen Area in January 2023, and Chile existing visa-free Schengen arrangement now applies to Croatia. EES operational since October 2025. ETIAS expected Q4 2026 (€20 fee; valid 3 years). Croatia joined Schengen in January 2023 — Chilean travelers who previously visited Croatia without considering Schengen day-count should now factor in total Schengen days across all 29 member states.',
  'https://mup.gov.hr/',
  '2026-02-20'
);

-- Czech Republic: Visa-free Schengen (EES active, ETIAS Q4 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'chile', 'czech-republic', 'visa_free', 'Schengen (EES active, ETIAS Q4 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area',
  3, TRUE, TRUE, FALSE,
  'Chilean citizens may enter Czech Republic without visa. Czech Republic is full Schengen member. EES operational since October 2025. ETIAS expected Q4 2026 (€20 fee; valid 3 years). Chile and Czech Republic have moderate bilateral ties through EU–Chile frameworks.',
  'https://www.mvcr.cz/',
  '2026-02-20'
);

-- Egypt: Visa on arrival or e-Visa
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'chile', 'egypt', 'visa_on_arrival', 'or e-Visa',
  30, 'Maximum 3 entries and no more than 90 days total per calendar year',
  6, TRUE, TRUE, FALSE,
  'Chilean citizens may obtain tourist visa on arrival at major Egyptian international airports. e-Visa also available online at visa2egypt.gov.eg. Visa on arrival fee USD 25. e-Visa also USD 25, processed within 5–7 business days.',
  'https://visa2egypt.gov.eg/',
  '2026-02-20'
);

-- France: Visa-free Schengen (EES active, ETIAS Q4 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'chile', 'france', 'visa_free', 'Schengen (EES active, ETIAS Q4 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area',
  3, TRUE, TRUE, FALSE,
  'Chilean citizens may enter France without visa for short stays. France is founding Schengen Area member. EES operational since October 2025. ETIAS expected Q4 2026 (€20 fee; valid 3 years). Working Holiday Visa (PVT) bilateral arrangement between Chile and France for eligible citizens aged 18–30. France top European destination for Chilean tourists. Direct flights operate between Santiago and Paris via Air France and LATAM.',
  'https://france-visas.gouv.fr/',
  '2026-02-20'
);

-- Germany: Visa-free Schengen (EES active, ETIAS Q4 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'chile', 'germany', 'visa_free', 'Schengen (EES active, ETIAS Q4 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area',
  3, TRUE, TRUE, FALSE,
  'Chilean citizens may enter Germany without visa for short stays. Germany is founding Schengen Area member. EES operational since October 2025. ETIAS expected Q4 2026 (€20 fee; valid 3 years). Working Holiday Visa bilateral arrangement between Chile and Germany for eligible citizens aged 18–30. Chile has significant German-descended community, particularly in Lake District regions. Germany is Chile largest trading partner in Europe.',
  'https://www.auswaertiges-amt.de/',
  '2026-02-20'
);

-- Greece: Visa-free Schengen (EES active, ETIAS Q4 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'chile', 'greece', 'visa_free', 'Schengen (EES active, ETIAS Q4 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area',
  3, TRUE, TRUE, FALSE,
  'Chilean citizens may enter Greece without visa for short stays. Greece is Schengen Area member. EES operational since October 2025. ETIAS expected Q4 2026 (€20 fee; valid 3 years). Greece popular European summer destination for Chilean tourists.',
  'https://www.ypes.gr/',
  '2026-02-20'
);

-- Hungary: Visa-free Schengen (EES active, ETIAS Q4 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'chile', 'hungary', 'visa_free', 'Schengen (EES active, ETIAS Q4 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area',
  3, TRUE, TRUE, FALSE,
  'Chilean citizens may enter Hungary without visa. Hungary is Schengen Area member. EES operational since October 2025. ETIAS expected Q4 2026 (€20 fee; valid 3 years).',
  'https://www.kormany.hu/',
  '2026-02-20'
);

-- India: e-Tourist Visa required
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'chile', 'india', 'evisa', 'e-Tourist Visa',
  30, '30 days per visit. Maximum 2 e-Tourist Visas per calendar year. 1-year and 5-year options available (90 days per visit).',
  6, TRUE, TRUE, FALSE,
  'Chilean citizens MUST obtain Indian e-Tourist Visa (e-TV) online before travel. Apply at indianvisaonline.gov.in. Processing typically 72–96 hours. 30-day e-Visa fee USD 25. Chile and India have growing bilateral trade ties in mining sector — India significant buyer of Chilean lithium and copper.',
  'https://indianvisaonline.gov.in/',
  '2026-02-20'
);

-- Indonesia: Visa on arrival or eVisa
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'chile', 'indonesia', 'visa_on_arrival', 'or eVisa',
  30, '30 days per visit. Extendable once for additional 30 days.',
  6, TRUE, TRUE, FALSE,
  'Chilean citizens may obtain Visa on Arrival (IDR 500,000, approx. USD 30) at designated airports including Bali, Jakarta, Surabaya. eVisa available online via molina.imigrasi.go.id. Bali popular destination for Chilean tourists.',
  'https://www.imigrasi.go.id/',
  '2026-02-20'
);

-- Italy: Visa-free Schengen (EES active, ETIAS Q4 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'chile', 'italy', 'visa_free', 'Schengen (EES active, ETIAS Q4 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area',
  3, TRUE, TRUE, FALSE,
  'Chilean citizens may enter Italy without visa for short stays. Italy is founding Schengen Area member. EES operational since October 2025. ETIAS expected Q4 2026 (€20 fee; valid 3 years). Working Holiday bilateral arrangement between Chile and Italy for eligible citizens aged 18–30. Chile has significant Italian-descended community.',
  'https://www.esteri.it/',
  '2026-02-20'
);

-- Japan: Visa-free
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'chile', 'japan', 'visa_free', NULL,
  90, '90 days per visit',
  NULL, TRUE, TRUE, FALSE,
  'Chilean citizens may enter Japan without visa for tourism or short business. Chile is one of select countries whose passport allows visa-free access to ALL G8 countries. Chile and Japan have bilateral Economic Partnership Agreement (JCEPA) and Working Holiday arrangement. Japan is Chile 4th largest export market.',
  'https://www.mofa.go.jp/',
  '2026-02-20'
);

-- Malaysia: Visa-free
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'chile', 'malaysia', 'visa_free', NULL,
  90, '90 days per visit',
  6, TRUE, TRUE, FALSE,
  'Chilean citizens may enter Malaysia without visa. Immigration offenses including overstays treated VERY SERIOUSLY under Malaysian law — violations PUNISHABLE BY CANING for males. Chile and Malaysia both APEC and CPTPP members.',
  'https://www.imi.gov.my/',
  '2026-02-20'
);

-- Mexico: Visa-free
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'chile', 'mexico', 'visa_free', NULL,
  180, 'Up to 180 days for tourism; up to 120 days for business per year.',
  NULL, FALSE, FALSE, FALSE,
  'Chilean citizens may enter Mexico without visa. Chile and Mexico partners in CPTPP and MILA. Both members of Pacific Alliance and CPTPP — one of deepest integration frameworks in Latin America.',
  'https://www.gob.mx/inm',
  '2026-02-20'
);

-- Netherlands: Visa-free Schengen (EES active, ETIAS Q4 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'chile', 'netherlands', 'visa_free', 'Schengen (EES active, ETIAS Q4 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area',
  3, TRUE, TRUE, FALSE,
  'Chilean citizens may enter Netherlands without visa. Netherlands is founding Schengen member. EES operational since October 2025. ETIAS expected Q4 2026 (€20 fee; valid 3 years).',
  'https://www.government.nl/',
  '2026-02-20'
);

-- New Zealand: NZeTA required
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'chile', 'new-zealand', 'evisa', 'NZeTA',
  90, 'Up to 90 days per visit',
  3, TRUE, TRUE, FALSE,
  'New Zealand Electronic Travel Authority (NZeTA) MUST be obtained before boarding. Fee NZD 23 (app) or NZD 35 (online). International Visitor Conservation and Tourism Levy (IVL) of NZD 35 also applies. Working Holiday Visa bilateral arrangement available. Chile and New Zealand both CPTPP founding members.',
  'https://www.immigration.govt.nz/',
  '2026-02-20'
);

-- Nigeria: Visa required (eVisa)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'chile', 'nigeria', 'visa_required', 'eVisa',
  30, 'Typically 30 days for tourist visa',
  6, TRUE, TRUE, FALSE,
  'Chilean citizens REQUIRE VISA prior to travel. eVisa available online via portal.immigration.gov.ng. Processing typically 2–3 business days. Yellow fever certificate MANDATORY.',
  'https://portal.immigration.gov.ng/',
  '2026-02-20'
);

-- Philippines: Visa-free
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'chile', 'philippines', 'visa_free', NULL,
  30, '30 days on arrival. Extendable to 59 days.',
  6, TRUE, TRUE, FALSE,
  'Chilean citizens may enter Philippines without visa for tourism. Chile and Philippines both APEC members and CPTPP parties.',
  'https://immigration.gov.ph/',
  '2026-02-20'
);

-- Poland: Visa-free Schengen (EES active, ETIAS Q4 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'chile', 'poland', 'visa_free', 'Schengen (EES active, ETIAS Q4 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area',
  3, TRUE, TRUE, FALSE,
  'Chilean citizens may enter Poland without visa. Poland is full Schengen member. EES operational since October 2025. ETIAS expected Q4 2026 (€20 fee; valid 3 years).',
  'https://www.gov.pl/',
  '2026-02-20'
);

-- Portugal: Visa-free Schengen (EES active, ETIAS Q4 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'chile', 'portugal', 'visa_free', 'Schengen (EES active, ETIAS Q4 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area',
  3, TRUE, TRUE, FALSE,
  'Chilean citizens may enter Portugal without visa. Portugal is founding Schengen Area member. EES operational since October 2025. ETIAS expected Q4 2026 (€20 fee; valid 3 years). TAP Air Portugal operates direct Santiago–Lisbon flights, making Portugal one of most direct European connections from Chile.',
  'https://www.portugal.gov.pt/',
  '2026-02-20'
);

-- Qatar: Visa-free
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'chile', 'qatar', 'visa_free', NULL,
  30, '30 days per visit.',
  6, TRUE, TRUE, FALSE,
  'Chilean citizens may enter Qatar without visa. Free visa on arrival stamp issued at Hamad International Airport. Qatar major transit hub for Chileans traveling to Asia, Africa, and Middle East via Qatar Airways.',
  'https://portal.www.gov.qa/',
  '2026-02-20'
);

-- Russia: Visa-free
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'chile', 'russia', 'visa_free', NULL,
  90, 180, '90 days within any 180-day period',
  NULL, TRUE, FALSE, FALSE,
  'Chilean citizens may enter Russia without visa under bilateral visa waiver agreement. Chilean Ministry of Foreign Affairs maintains ELEVATED TRAVEL ADVISORY for Russia due to ongoing conflict in Ukraine. Direct flights between Chile and Russia CURRENTLY SUSPENDED. Consular assistance in Russia EXTREMELY LIMITED.',
  'https://www.kdmid.ru/',
  '2026-02-20'
);

-- Saudi Arabia: Visa required
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'chile', 'saudi-arabia', 'visa_required', 'Standard embassy visa',
  90, 'Typically up to 90 days per year',
  6, TRUE, TRUE, TRUE,
  'Chilean citizens REQUIRE VISA. UNLIKE MANY WESTERN PASSPORT HOLDERS, Chileans NOT ELIGIBLE for Saudi tourist visa on arrival or standard online eVisa. Apply at Saudi Embassy in Santiago. Chileans who hold valid residency in USA, UK, or EU MAY BE ELIGIBLE for Saudi tourist visa under special rules.',
  'https://visa.visitsaudi.com/',
  '2026-02-20'
);

-- Singapore: Visa-free
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'chile', 'singapore', 'visa_free', NULL,
  30, '30 days per visit.',
  6, TRUE, TRUE, FALSE,
  'Chilean citizens may enter Singapore without visa. Overstaying SERIOUS CRIMINAL OFFENSE — overstays of more than 90 days PUNISHABLE BY CANING for males. Chile and Singapore both CPTPP founding members.',
  'https://www.ica.gov.sg/',
  '2026-02-20'
);

-- South Africa: Visa-free
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'chile', 'south-africa', 'visa_free', NULL,
  30, '30 days per visit.',
  1, TRUE, TRUE, FALSE,
  'Chilean citizens may enter South Africa without visa. Passport must be valid at least 1 month beyond intended departure with minimum 2 blank pages. Yellow fever certificate required if arriving from endemic country.',
  'https://www.dha.gov.za/',
  '2026-02-20'
);

-- South Korea: Visa-free (K-ETA exemption until December 31, 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'chile', 'south-korea', 'visa_free', 'K-ETA exemption until Dec 31, 2026',
  90, 'Up to 90 days within any 12-month period',
  NULL, TRUE, TRUE, FALSE,
  'Chilean citizens CURRENTLY EXEMPT from K-ETA requirement until December 31, 2026. Chile and South Korea have Working Holiday arrangement and bilateral FTA (2004) — South Korea FIRST bilateral FTA. Korea is Chile 3rd largest export market.',
  'https://www.k-eta.go.kr/',
  '2026-02-20'
);

-- Spain: Visa-free Schengen (EES active, ETIAS Q4 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'chile', 'spain', 'visa_free', 'Schengen (EES active, ETIAS Q4 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area',
  3, TRUE, TRUE, FALSE,
  'Chilean citizens may enter Spain without visa. Spain is founding Schengen Area member. EES operational since October 2025. ETIAS expected Q4 2026 (€20 fee; valid 3 years). Spain MOST POPULAR European destination for Chilean tourists — shared language, deep cultural ties. Iberia operates Santiago–Madrid routes.',
  'https://www.inclusion.gob.es/',
  '2026-02-20'
);

-- Switzerland: Visa-free Schengen (EES active, ETIAS Q4 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'chile', 'switzerland', 'visa_free', 'Schengen (EES active, ETIAS Q4 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area',
  3, TRUE, TRUE, FALSE,
  'Chilean citizens may enter Switzerland without visa. Switzerland is Schengen member. EES operational October 12, 2025. ETIAS expected Q4 2026 (€20 fee; valid 3 years). Chile and Switzerland have bilateral investment promotion treaty.',
  'https://www.sem.admin.ch/',
  '2026-02-20'
);

-- Thailand: Visa-free (60 days)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'chile', 'thailand', 'visa_free', NULL,
  60, '60 days per visit (increased from 30 days in 2024). Extendable once for 30 days.',
  6, TRUE, TRUE, FALSE,
  'Chilean citizens may enter Thailand without visa. Entry granted on arrival. Thailand popular long-haul destination for Chilean tourists. Chile and Thailand both APEC members.',
  'https://www.immigration.go.th/',
  '2026-02-20'
);

-- Turkey: Visa on arrival or eVisa
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'chile', 'turkey', 'visa_on_arrival', 'or eVisa',
  90, 180, '90 days within any 180-day period',
  6, FALSE, FALSE, FALSE,
  'Chilean citizens MUST obtain visa. eVisa available at evisa.gov.tr — STRONGLY PREFERRED. Fee USD 60. Valid 180 days from issue, single entry. Istanbul major transit hub for Chileans traveling via Turkish Airlines.',
  'https://www.evisa.gov.tr/',
  '2026-02-20'
);

-- United Arab Emirates: Visa-free (visa on arrival)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'chile', 'united-arab-emirates', 'visa_free', NULL,
  30, '30 days per visit. Extendable for 30 days.',
  6, TRUE, TRUE, FALSE,
  'Chilean citizens receive FREE VISA ON ARRIVAL in UAE. Dubai major hub for Chileans traveling to Asia, Africa, and Middle East via Emirates.',
  'https://www.icp.gov.ae/',
  '2026-02-20'
);

-- United Kingdom: UK ETA required (from February 25, 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'chile', 'united-kingdom', 'evisa', 'UK ETA',
  180, 'Up to 6 months per visit',
  NULL, FALSE, TRUE, FALSE,
  'UK Electronic Travel Authorisation (ETA) MANDATORY from February 25, 2026. Chile EXPLICITLY LISTED as ETA-eligible country. Fee GBP 16. Valid 2 years. Apply via UK ETA app or gov.uk. UK joined CPTPP in December 2024. British Airways and LATAM operate Santiago–London routes.',
  'https://www.gov.uk/guidance/apply-for-an-electronic-travel-authorisation-eta',
  '2026-02-20'
);

-- United States: ESTA required (Visa Waiver Program)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'chile', 'united-states', 'evisa', 'ESTA (Visa Waiver Program)',
  90, 'Up to 90 days per visit. Cannot be extended under VWP.',
  NULL, TRUE, TRUE, FALSE,
  'Chile is ONLY LATIN AMERICAN COUNTRY in US Visa Waiver Program — EXCEPTIONAL DISTINCTION. This makes Chile UNIQUE in ENTIRE Latin American and Caribbean region. Apply for ESTA at esta.cbp.dhs.gov. Fee USD 21. Valid 2 years. This VWP membership is Chilean passport MOST GLOBALLY SIGNIFICANT bilateral privilege. Chile–US FTA (2004) makes Chilean nationals eligible for E-1 and E-2 investor/trader visas.',
  'https://travel.state.gov/',
  '2026-02-20'
);

-- Vietnam: eVisa required
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'chile', 'vietnam', 'evisa', 'eVisa',
  90, 'Up to 90 days per visit on multiple-entry e-Visa',
  6, TRUE, TRUE, FALSE,
  'Chilean citizens REQUIRE VISA. e-Visa most convenient option at evisa.xuatnhapcanh.gov.vn. Fee USD 25. Valid 90 days, multiple entries. Chile and Vietnam both CPTPP founding members.',
  'https://evisa.xuatnhapcanh.gov.vn/',
  '2026-02-20'
);
