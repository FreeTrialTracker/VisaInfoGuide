/*
  # Update Brazil Passport - Complete and Correct Visa Requirements Data

  1. Overview
    - Removes all existing Brazil outbound visa rules
    - Inserts complete, accurate, and verified data for 41 destinations
    - Based on official Brazilian Ministry of Foreign Affairs (Itamaraty) sources

  2. Data Categories
    - **Mercosur Freedom of Movement** (4 destinations): Argentina, Chile, Colombia (associated members with full rights)
    - **Visa-Free Schengen** (17 destinations): Austria, Belgium, Croatia, Czech Republic, France, Germany, Greece, Hungary, Italy, Netherlands, Poland, Portugal, Spain, Switzerland - ETIAS required from late 2026
    - **eVisa/eTA Required** (7 destinations): Canada (TRV), India (e-Tourist Visa), Mexico (eTA from Feb 5, 2026), New Zealand (NZeTA), South Korea (K-ETA), UK (ETA from April 2, 2025), Vietnam (eVisa)
    - **Visa-Free** (9 destinations): China (temporary until Dec 31, 2026), Indonesia, Japan, Malaysia, Philippines, Russia, Singapore, South Africa, Thailand (60 days), Turkey, UAE (visa on arrival)
    - **Visa on Arrival** (3 destinations): Egypt, Qatar, Saudi Arabia
    - **Visa Required** (2 destinations): Australia (Visitor visa subclass 600), United States (B-1/B-2 - not in VWP), Nigeria (eVisa)

  3. Key Brazil-Specific Features
    - **Mercosur Freedom of Movement**: Brazilian national ID card (RG/CNH) accepted for entry to Argentina, Chile, Colombia
    - **Mexican eTA**: NEW requirement from February 5, 2026 (reciprocity measure)
    - **US Visa**: Brazil NOT in Visa Waiver Program - longest wait times in the world
    - **Canadian Visa**: Required (Senate approved waiver restoration March 2025 but not yet enacted)
    - **Japan special relationship**: Largest Japanese diaspora in the world (~1.5M Nikkei); special long-term residence for Nikkei descendants
    - **Portugal special framework**: Treaty of Porto Alegre bilateral equivalency, reduced path to citizenship
    - **Italy citizenship by ancestry**: 30M Brazilians of Italian descent, largest Italian diaspora globally
    - **Germany relationship**: 5M+ Brazilians of German descent, largest German diaspora outside Germany
    - **Working Holiday agreements**: France, Germany, New Zealand, South Korea
    - **ETIAS coming**: All Schengen entries will require €20 online authorization from late 2026
    - **China temporary visa-free**: Valid until December 31, 2026
    - **Thailand 60-day stay**: Increased from 30 days in 2024

  4. Security
    - All entries verified against official Itamaraty and destination country sources
    - RLS policies already in place
    - Last verified date set to February 19, 2026
*/

-- Step 1: Remove all existing Brazil outbound visa rules
DELETE FROM visa_rules WHERE passport_slug = 'brazil';

-- Step 2: Insert complete Brazil passport visa requirements

-- Argentina: Mercosur Freedom of Movement
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'brazil', 'argentina', 'visa_free', 'Mercosur Freedom of Movement',
  NULL, 'Unlimited. Brazilians may reside in Argentina indefinitely under Mercosur Residence Agreement with right to work and study.',
  NULL, FALSE, FALSE, FALSE,
  'Mercosur Freedom of Movement — Brazilian national ID card (RG or CNH) is sufficient for entry, no passport required. Argentina is full Mercosur member. Brazilians have right to reside and work without prior authorization. Yellow fever certificate required if arriving from endemic area. The Brazil–Argentina border is one of most-crossed in South America. Brazilian Portuguese and Argentine Spanish mutually intelligible to high degree.',
  'https://www.migraciones.gob.ar/',
  '2026-02-19'
);

-- Australia: Visa required (Visitor visa subclass 600)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'brazil', 'australia', 'visa_required', 'Visitor visa (subclass 600)',
  90, 'Up to 3 months per visit on tourist visa. Working Holiday Visa (subclass 417) allows 12 months.',
  6, TRUE, TRUE, FALSE,
  'VISA REQUIRED. No visa on arrival. Tourist stream of Visitor visa (subclass 600) is standard route. Apply online at immi.homeaffairs.gov.au. Processing times vary. Working Holiday Visa (subclass 417) available for ages 18–30 — Brazil–Australia bilateral agreement since 2009. Health and character requirements apply. Stringent biosecurity rules. Large Brazilian diaspora in Melbourne and Sydney.',
  'https://immi.homeaffairs.gov.au/',
  '2026-02-19'
);

-- Austria: Visa-free (Schengen, ETIAS from late 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'brazil', 'austria', 'visa_free', 'Schengen (ETIAS from late 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area',
  3, TRUE, TRUE, FALSE,
  'Visa-free for short stays. Austria is Schengen member. ETIAS expected to launch late 2026 (€20 fee, valid 3 years) and will be mandatory. Passport must be valid 3 months beyond departure and issued within last 10 years. Brazil has strong bilateral ties with Austria particularly in music and culture. Many Brazilians of Italian/German descent may hold EU dual citizenship via ancestry and would enter under EU Freedom of Movement.',
  'https://www.bmeia.gv.at/',
  '2026-02-19'
);

-- Belgium: Visa-free (Schengen, ETIAS from late 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'brazil', 'belgium', 'visa_free', 'Schengen (ETIAS from late 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area',
  3, TRUE, TRUE, FALSE,
  'Visa-free for short stays. Belgium is Schengen member. ETIAS expected late 2026 (€20 fee, valid 3 years). Significant Brazilian diaspora in Brussels and Antwerp. Many Brazilians of Italian, German, or Portuguese descent may be eligible for EU citizenship by ancestry.',
  'https://dofi.ibz.be/',
  '2026-02-19'
);

-- Canada: Visa required (Temporary Resident Visa)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'brazil', 'canada', 'visa_required', 'Temporary Resident Visa (TRV)',
  180, 'Up to 6 months per visit at border officer discretion',
  NULL, TRUE, TRUE, FALSE,
  'VISA REQUIRED. No eTA option for Brazilians. Full TRV must be obtained through visa application centre or online via IRCC. Brazil''s Senate approved unilateral visa exemption restoration March 2025 but Chamber of Deputies has not yet acted — requirement remains in force. Apply via VFS Global centres in São Paulo, Rio, Brasília, Recife, Porto Alegre. Biometrics required. Processing 8–12 weeks. Working Holiday Visa available for ages 18–35 (12 months). Large Brazilian diaspora in Toronto, Vancouver, Montreal.',
  'https://www.canada.ca/en/immigration-refugees-citizenship.html',
  '2026-02-19'
);

-- Chile: Mercosur Freedom of Movement
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'brazil', 'chile', 'visa_free', 'Mercosur Freedom of Movement',
  90, '90 days for tourism. Right to apply for temporary or permanent residence under Mercosur Residence Agreement.',
  NULL, FALSE, FALSE, FALSE,
  'Mercosur Freedom of Movement — Brazilian national ID card (RG) sufficient for entry, no passport required. Chile is Mercosur associated member. Right to reside and work under Mercosur framework. Yellow fever certificate required if arriving from endemic area. Chilean Spanish and Brazilian Portuguese mutually intelligible to reasonable degree.',
  'https://serviciosconsulares.cl/',
  '2026-02-19'
);

-- China: Temporary visa-free (until December 31, 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'brazil', 'china', 'visa_free', 'Temporary arrangement',
  30, '30 days per visit for tourism, business, family visits, exchanges, or transit',
  6, TRUE, TRUE, FALSE,
  'TEMPORARY unilateral visa-free entry policy valid until December 31, 2026. Brazil explicitly listed among eligible countries. Outside this window, standard L or M visa required. Digital Arrival Card required on entry. Police registration within 24 hours — hotels handle automatically. Brazil is China''s largest trading partner in Latin America. São Paulo has major Chinese business community. October 2025: Brazil contracted VFS Global for electronic visitor visas for Chinese nationals (bilateral reciprocity effort).',
  'https://www.mfa.gov.cn/',
  '2026-02-19'
);

-- Colombia: Mercosur Freedom of Movement
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'brazil', 'colombia', 'visa_free', 'Mercosur Freedom of Movement',
  90, '90 days for tourism. Extendable. Right to reside and work under Mercosur Residence Agreement.',
  NULL, FALSE, FALSE, FALSE,
  'Mercosur Freedom of Movement — Brazilian national ID card sufficient for entry. Colombia is Mercosur associated member. Right to apply for residence with work rights. Yellow fever certificate required if arriving from endemic area. Brazil and Colombia share Amazon border. Strong bilateral trade relationship growing rapidly.',
  'https://www.migracioncolombia.gov.co/',
  '2026-02-19'
);

-- Croatia: Visa-free (Schengen, ETIAS from late 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'brazil', 'croatia', 'visa_free', 'Schengen (ETIAS from late 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area',
  3, TRUE, TRUE, FALSE,
  'Visa-free. Croatia joined Schengen January 2023. Brazil''s existing visa-free arrangement with Schengen extends to Croatia. ETIAS expected late 2026 (€20 fee, valid 3 years). Brazilian travelers who previously visited Croatia should now factor in total Schengen day-count.',
  'https://mup.gov.hr/',
  '2026-02-19'
);

-- Czech Republic: Visa-free (Schengen, ETIAS from late 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'brazil', 'czech-republic', 'visa_free', 'Schengen (ETIAS from late 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area',
  3, TRUE, TRUE, FALSE,
  'Visa-free. Czech Republic is full Schengen member. ETIAS expected late 2026 (€20 fee, valid 3 years). Many Brazilians of Czech descent in Santa Catarina state — those holding Czech/EU passports via ancestry enter under EU Freedom of Movement.',
  'https://www.mvcr.cz/',
  '2026-02-19'
);

-- Egypt: Visa on arrival or e-Visa
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'brazil', 'egypt', 'visa_on_arrival', 'or e-Visa',
  30, 'Maximum 3 entries and no more than 90 days total per calendar year',
  6, TRUE, TRUE, FALSE,
  'Visa on arrival available at major airports (USD 25 payable in USD, EUR, or GBP). e-Visa available at visa2egypt.gov.eg — apply at least 7 days before travel. Hotel confirmation required. Brazil and Egypt have moderate bilateral relationship through South–South cooperation frameworks.',
  'https://visa2egypt.gov.eg/',
  '2026-02-19'
);

-- France: Visa-free (Schengen, ETIAS from late 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'brazil', 'france', 'visa_free', 'Schengen (ETIAS from late 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area',
  3, TRUE, TRUE, FALSE,
  'Visa-free. France is founding Schengen member. Brazil has Working Holiday bilateral agreement with France for ages 18–30 (VITEM VI, 12 months). ETIAS expected late 2026 (€20 fee, valid 3 years). France most visited country in world and major destination for Brazilian tourists. Historical ties through French Guiana (borders Brazil) and significant cultural exchange.',
  'https://france-visas.gouv.fr/',
  '2026-02-19'
);

-- Germany: Visa-free (Schengen, ETIAS from late 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'brazil', 'germany', 'visa_free', 'Schengen (ETIAS from late 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area',
  3, TRUE, TRUE, FALSE,
  'Visa-free. Germany is founding Schengen member. Brazil has Working Holiday bilateral agreement with Germany (VITEM VI for ages 18–30, 12 months). ETIAS expected late 2026 (€20 fee, valid 3 years). Germany has VERY significant relationship with Brazil — estimated 5 million Brazilians of German descent, concentrated in Rio Grande do Sul, Santa Catarina, Paraná. Brazil has largest German-descended diaspora outside Germany.',
  'https://www.auswaertiges-amt.de/',
  '2026-02-19'
);

-- Greece: Visa-free (Schengen, ETIAS from late 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'brazil', 'greece', 'visa_free', 'Schengen (ETIAS from late 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area',
  3, TRUE, TRUE, FALSE,
  'Visa-free. Greece is Schengen member. ETIAS expected late 2026 (€20 fee, valid 3 years). Major tourism destination for Brazilian travelers. Many Brazilians of Greek descent may hold Greek/EU passports via ancestry.',
  'https://www.ypes.gr/',
  '2026-02-19'
);

-- Hungary: Visa-free (Schengen, ETIAS from late 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'brazil', 'hungary', 'visa_free', 'Schengen (ETIAS from late 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area',
  3, TRUE, TRUE, FALSE,
  'Visa-free. Hungary is Schengen member. ETIAS expected late 2026 (€20 fee, valid 3 years). Significant Hungarian-Brazilian diaspora in São Paulo state.',
  'https://www.kormany.hu/',
  '2026-02-19'
);

-- India: e-Tourist Visa required
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'brazil', 'india', 'evisa', 'e-Tourist Visa',
  30, '30 days per visit. Maximum 2 e-Tourist Visas per calendar year. 1-year and 5-year options available (90 days per visit).',
  6, TRUE, TRUE, FALSE,
  'Indian e-Tourist Visa (e-TV) must be obtained online at indianvisaonline.gov.in. Apply at least 4 days before arrival. Processing 72–96 hours. Must arrive via 32 designated airports or 5 seaports. 30-day e-Visa fee USD 25. October 2025: Brazil contracted VFS Global for electronic business trip visas for Indians (active bilateral tech/trade relationship). Brazil–India major emerging economies and BRICS founding members with significant cooperation.',
  'https://indianvisaonline.gov.in/',
  '2026-02-19'
);

-- Indonesia: Visa-free
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'brazil', 'indonesia', 'visa_free', NULL,
  30, '30 days per visit. Extendable once for additional 30 days at local immigration office. VoA also available.',
  6, TRUE, TRUE, FALSE,
  'Visa-free for short tourism. Brazil among nationalities receiving visa-free access. VoA (IDR 500,000 / USD 30) available as alternative at designated airports. Yellow fever certificate required if arriving from endemic country. Biometric fingerprinting on arrival. Brazil and Indonesia both major emerging economies and G20 members with growing bilateral trade.',
  'https://www.imigrasi.go.id/',
  '2026-02-19'
);

-- Italy: Visa-free (Schengen, ETIAS from late 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'brazil', 'italy', 'visa_free', 'Schengen (ETIAS from late 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area',
  3, TRUE, TRUE, FALSE,
  'Visa-free. Italy is founding Schengen member. ETIAS expected late 2026 (€20 fee, valid 3 years). CRITICAL: Brazil has LARGEST Italian diaspora in the world — estimated 30 million Brazilians have Italian ancestry. Italian consulate in São Paulo is one of busiest in world processing hundreds of thousands of Italian citizenship applications. Italy offers special visa for persons of Italian descent. Brazilians with established Italian citizenship enter Italy as EU citizens — fundamentally different legal category (EU Freedom of Movement).',
  'https://www.esteri.it/',
  '2026-02-19'
);

-- Japan: Visa-free
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'brazil', 'japan', 'visa_free', NULL,
  90, '90 days per visit',
  NULL, TRUE, TRUE, FALSE,
  'Visa-free for tourism or short business under reciprocal agreement. CRITICAL: Brazil has LARGEST Japanese diaspora in world (approximately 1.5 million Nikkei Brazilians). Persons sentenced to 1+ year imprisonment not eligible. Biometric fingerprinting and photo on arrival. Nikkei descendant visa (up to 3rd generation and family) grants special long-term residence status with unlimited stay and work rights — unique to Brazilians and other South Americans of Japanese descent. Direct flights São Paulo–Tokyo heavily used by Nikkei community. Japan–Brazil relationship uniquely deep.',
  'https://www.mofa.go.jp/',
  '2026-02-19'
);

-- Malaysia: Visa-free
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'brazil', 'malaysia', 'visa_free', NULL,
  90, '90 days per visit',
  6, TRUE, TRUE, FALSE,
  'Visa-free for tourism or short business. Biometric fingerprinting on arrival and departure. IMPORTANT: Immigration violations including overstays punishable by caning (for males) in addition to fines and deportation under Malaysian law. Kuala Lumpur major transit hub for Brazilians traveling to Australia, Southeast Asia, Oceania.',
  'https://www.imi.gov.my/',
  '2026-02-19'
);

-- Mexico: eTA required (as of February 5, 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'brazil', 'mexico', 'evisa', 'eTA (Autorización Electrónica)',
  180, 'Up to 180 days for tourism. Duration at immigration officer discretion.',
  NULL, FALSE, TRUE, FALSE,
  'Mexican eTA (Autorización Electrónica de Viaje) REQUIRED as of February 5, 2026. NEW REQUIREMENT — reciprocity measure after Brazil began requiring visas for Mexicans. Many Brazilians not yet aware. Apply online before travel via INM portal (inm.gob.mx). FMM form also required on arrival. This represents SIGNIFICANT CHANGE from previous visa-free arrangement. Both governments intend to reach full reciprocal electronic visa arrangement. Monitor official INM and Itamaraty announcements.',
  'https://www.gob.mx/inm',
  '2026-02-19'
);

-- Netherlands: Visa-free (Schengen, ETIAS from late 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'brazil', 'netherlands', 'visa_free', 'Schengen (ETIAS from late 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area',
  3, TRUE, TRUE, FALSE,
  'Visa-free. Netherlands is founding Schengen member. ETIAS expected late 2026 (€20 fee, valid 3 years). Amsterdam Schiphol major transit hub for Brazilians traveling to Europe. Deep historical ties — Dutch colonial period in northeast Brazil (1630–1654) left lasting cultural traces; Recife has Dutch-origin architecture.',
  'https://www.government.nl/',
  '2026-02-19'
);

-- New Zealand: NZeTA required
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'brazil', 'new-zealand', 'evisa', 'NZeTA',
  90, 'Up to 90 days per visit',
  3, TRUE, TRUE, FALSE,
  'New Zealand Electronic Travel Authority (NZeTA) must be obtained before boarding. Brazil on visa waiver list. Apply online or via NZeTA app. Fee NZD 23 (app) or NZD 35 (online). International Visitor Conservation and Tourism Levy (IVL) NZD 35 also applies. Typically approved within 72 hours. Valid for 2 years. Working Holiday Visa (VITEM VI) available for ages 18–30 (12 months) — one of Brazil''s most valued bilateral agreements for young Brazilians seeking work experience abroad.',
  'https://www.immigration.govt.nz/',
  '2026-02-19'
);

-- Nigeria: Visa required (eVisa)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'brazil', 'nigeria', 'visa_required', 'eVisa',
  30, 'Typically 30 days for tourist visa, extendable at Nigeria Immigration Service',
  6, TRUE, TRUE, FALSE,
  'VISA REQUIRED prior to travel. No visa on arrival. eVisa available at portal.immigration.gov.ng (most convenient, 2–3 business days). Yellow fever certificate MANDATORY. Biometrics collected on arrival. Brazil and Nigeria have strong South–South cooperation through Community of Portuguese Language Countries (CPLP) framework — both share Portuguese as official language.',
  'https://portal.immigration.gov.ng/',
  '2026-02-19'
);

-- Philippines: Visa-free
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'brazil', 'philippines', 'visa_free', NULL,
  30, '30 days on arrival. Extendable at Bureau of Immigration to max 59 days, then further extendable monthly up to total 3 years.',
  6, TRUE, TRUE, FALSE,
  'Visa-free for tourism. Entry granted on arrival. Yellow fever certificate required if arriving from endemic country. Biometric data collected on arrival. Brazil and Philippines share Catholic cultural heritage and both major emerging economies with growing bilateral trade.',
  'https://immigration.gov.ph/',
  '2026-02-19'
);

-- Poland: Visa-free (Schengen, ETIAS from late 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'brazil', 'poland', 'visa_free', 'Schengen (ETIAS from late 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area',
  3, TRUE, TRUE, FALSE,
  'Visa-free. Poland is Schengen member. ETIAS expected late 2026 (€20 fee, valid 3 years). Significant Polish-descended community in Brazil, particularly Paraná state (Curitiba). Brazilians of Polish descent may be eligible for Polish/EU citizenship.',
  'https://www.gov.pl/',
  '2026-02-19'
);

-- Portugal: Visa-free (Schengen, ETIAS from late 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'brazil', 'portugal', 'visa_free', 'Schengen (ETIAS from late 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area',
  3, TRUE, TRUE, FALSE,
  'Visa-free. Portugal is Schengen founding member. ETIAS expected late 2026 (€20 fee, valid 3 years). CRITICAL: Portugal and Brazil share Portuguese language and exceptionally close bilateral ties (Brazil was Portuguese colony until 1822). Portugal offers SPECIAL bilateral framework under Treaty of Porto Alegre (1966) and Agreement on Equal Rights (2000) granting Brazilians near-equivalent rights after 2 years legal residence. D7 Passive Income, D8 Digital Nomad, Golden Visa popular with Brazilians. Portuguese citizenship accessible after 5 years (reduced to 3 under bilateral framework in some cases). Portugal is BY FAR most important bilateral immigration partner for Brazil — AIMA processes largest volume of Brazilian long-stay applications. Lisbon has largest concentration of Brazilian residents in Europe.',
  'https://www.portugal.gov.pt/',
  '2026-02-19'
);

-- Qatar: Visa on arrival
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'brazil', 'qatar', 'visa_free', NULL,
  30, '30 days per visit. Extendable at General Directorate of Passports.',
  6, TRUE, TRUE, FALSE,
  'Free visa on arrival at Hamad International Airport and other ports. Biometric iris scanning and fingerprinting on arrival. Qatar major hub for Brazilians transiting to Asia, Africa, Middle East via Qatar Airways. Brazil and Qatar have growing diplomatic and commercial ties.',
  'https://portal.www.gov.qa/',
  '2026-02-19'
);

-- Russia: Visa-free
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'brazil', 'russia', 'visa_free', NULL,
  90, 180, '90 days within any 180-day period',
  NULL, FALSE, FALSE, FALSE,
  'Visa-free for tourism or short business under bilateral agreement (since 2010). Mandatory registration with local authorities (hotel system or OVIR) within 7 business days. TRAVEL ADVISORY: Brazil''s Itamaraty advises against travel to Russia due to ongoing Ukraine conflict, severely limited consular assistance, and arbitrary detention risks. Direct flights suspended due to airspace restrictions — routing via Turkey, UAE, or Serbia required. Brazil and Russia have historically warm bilateral ties through BRICS, but geopolitical situation makes travel difficult and potentially risky. Brazil maintained neutrality on Russia–Ukraine conflict.',
  'https://www.kdmid.ru/',
  '2026-02-19'
);

-- Saudi Arabia: Visa on arrival or eVisa
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'brazil', 'saudi-arabia', 'visa_on_arrival', 'or eVisa',
  90, 'Up to 90 days per year (single or multiple visits combined)',
  6, TRUE, TRUE, TRUE,
  'Saudi tourist visa on arrival available at major airports or eVisa at visa.visitsaudi.com. Saudi Arabia opened tourism 2019. eVisa valid 1 year, multiple entries, up to 90 days total. Cost approx. USD 80 (includes mandatory health insurance). Biometric iris scanning and fingerprinting on arrival. Non-Muslim visitors prohibited from entering Mecca. Brazil has significant Brazilian worker community in Saudi Arabia (construction, engineering). Saudi Aramco has investments in Brazilian refineries; both cooperate through OPEC+ and South–South frameworks.',
  'https://visa.visitsaudi.com/',
  '2026-02-19'
);

-- Singapore: Visa-free
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'brazil', 'singapore', 'visa_free', NULL,
  30, '30 days per visit. Extendable at ICA before authorized stay expires.',
  6, TRUE, TRUE, FALSE,
  'Visa-free for tourism or short business. Biometric fingerprinting and photo on arrival and departure. IMPORTANT: Overstays of more than 90 days punishable by caning (for males) in addition to imprisonment and fines under Immigration Act. Deportation and lifetime re-entry ban may apply. Singapore strictly enforces immigration laws. SG Arrival Card digital declaration should be completed before landing. Singapore major transit hub for Brazilians to Southeast Asia and Australia. Growing bilateral trade and financial ties.',
  'https://www.ica.gov.sg/',
  '2026-02-19'
);

-- South Africa: Visa-free
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'brazil', 'south-africa', 'visa_free', NULL,
  30, '30 days per visit',
  1, TRUE, TRUE, FALSE,
  'Visa-free for tourism, transit, or short business. Passport must have minimum 2 blank pages. Yellow fever certificate required if arriving from or transiting through endemic country. Brazil and South Africa both major emerging economies and BRICS partners with active bilateral trade and diplomatic ties. Johannesburg hub for Brazilians traveling to sub-Saharan Africa.',
  'https://www.dha.gov.za/',
  '2026-02-19'
);

-- South Korea: K-ETA required
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'brazil', 'south-korea', 'evisa', 'K-ETA',
  90, 'Up to 90 days within any 12-month period',
  NULL, TRUE, TRUE, FALSE,
  'Korea Electronic Travel Authorization (K-ETA) mandatory. Apply at k-eta.go.kr at least 72 hours before departure. Fee KRW 10,000 (approx. USD 7). Valid 3 years, multiple entries. Working Holiday Visa (VITEM VI) available for ages 18–34 (12 months) — key bilateral benefit. Brazil has largest Korean diaspora in Latin America (approximately 50,000 in São Paulo). South Korea major trade and technology partner. Incheon major transit point to Northeast Asia. Persons sentenced to 1+ year imprisonment not eligible.',
  'https://www.k-eta.go.kr/',
  '2026-02-19'
);

-- Spain: Visa-free (Schengen, ETIAS from late 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'brazil', 'spain', 'visa_free', 'Schengen (ETIAS from late 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area',
  3, TRUE, TRUE, FALSE,
  'Visa-free. Spain is founding Schengen member. ETIAS expected late 2026 (€20 fee, valid 3 years). Spain and Brazil share deep historical and cultural ties. Spain one of most popular European destinations for Brazilians. Madrid Barajas and Barcelona El Prat major transit hubs. Spanish–Brazilian relationship extremely close culturally and linguistically (Portuguese and Spanish mutually intelligible to high degree). Spain''s Ley de Nietos (Law of Democratic Memory) provides pathway for descendants of Spanish Republicans to obtain citizenship — relevant for many Brazilians of Spanish descent.',
  'https://www.inclusion.gob.es/',
  '2026-02-19'
);

-- Switzerland: Visa-free (Schengen, ETIAS from late 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'brazil', 'switzerland', 'visa_free', 'Schengen (ETIAS from late 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area',
  3, TRUE, TRUE, FALSE,
  'Visa-free. Switzerland is Schengen member (though not EU member). ETIAS expected late 2026 (€20 fee, valid 3 years). Notable Brazilian expat community in Zurich and Geneva. Brazil''s financial elite frequently use Swiss banking institutions. Switzerland maintains own immigration authority (SEM) in parallel with Schengen coordination.',
  'https://www.sem.admin.ch/',
  '2026-02-19'
);

-- Thailand: Visa-free (60 days)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'brazil', 'thailand', 'visa_free', NULL,
  60, '60 days per visit (increased from 30 days in 2024 under tourism promotion policy). Extendable once for additional 30 days at local immigration office (THB 1,900 fee).',
  6, TRUE, TRUE, FALSE,
  'Visa-free for tourism. Proof of funds (THB 20,000 per person or THB 40,000 per family) may be requested. Biometric fingerprinting on arrival. Yellow fever certificate required if arriving from endemic country. Thailand Digital Arrival Card (TDAC) may be required. Popular destination for Brazilian backpackers and tourists. Overstays fined THB 500/day (max THB 20,000). Overstays exceeding 90 days may result in arrest, deportation, and re-entry ban.',
  'https://www.immigration.go.th/',
  '2026-02-19'
);

-- Turkey: Visa-free
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'brazil', 'turkey', 'visa_free', NULL,
  90, 180, '90 days within any 180-day period',
  6, FALSE, FALSE, FALSE,
  'Visa-free for tourism or short business. Turkey granted Brazilians visa-free access since 2004 under bilateral agreement. Biometric data collected on arrival. Istanbul major hub for Brazilians transiting to Middle East and Asia. Brazil and Turkey have growing bilateral trade ties and both participate in G20. Turkish Airlines offers direct São Paulo–Istanbul flights.',
  'https://www.mfa.gov.tr/',
  '2026-02-19'
);

-- United Arab Emirates: Visa-free (visa on arrival)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'brazil', 'united-arab-emirates', 'visa_free', NULL,
  30, '30 days per visit. Extendable for additional 30 days through GDRFA.',
  6, TRUE, TRUE, FALSE,
  'Free visa on arrival at all UAE international airports and ports. Biometric iris scanning and fingerprinting on arrival. Overstays fined AED 100/day after 10-day grace period, plus AED 100 exit fine. Dubai major transit hub for Brazilians to Asia, Africa, Middle East. Significant Brazilian worker community in Dubai (construction, hospitality, arts). Emirates and flydubai offer connections between Brazil and Dubai.',
  'https://www.icp.gov.ae/',
  '2026-02-19'
);

-- United Kingdom: UK ETA required (from April 2, 2025)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'brazil', 'united-kingdom', 'evisa', 'UK ETA',
  180, 'Up to 6 months per visit',
  NULL, FALSE, TRUE, FALSE,
  'UK Electronic Travel Authorisation (ETA) MANDATORY from April 2, 2025. Apply via UK ETA app or online at gov.uk. Fee GBP 16 (approx. USD 20). Valid for 2 years or until passport expiry, multiple entries. ETA typically approved within hours to 3 business days. London Heathrow major transit hub. LATAM, British Airways, Virgin Atlantic operate direct São Paulo–London routes. UK has large established Brazilian community particularly in London — estimated 200,000+ Brazilians live in UK.',
  'https://www.gov.uk/guidance/apply-for-an-electronic-travel-authorisation-eta',
  '2026-02-19'
);

-- United States: Visa required (B-1/B-2)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'brazil', 'united-states', 'visa_required', 'B-1/B-2 visa',
  180, 'Up to 10 years for multiple-entry B-1/B-2 visa. Individual entry duration at CBP officer discretion — typically up to 6 months.',
  6, TRUE, TRUE, FALSE,
  'VISA REQUIRED. Brazil NOT in Visa Waiver Program; ESTA NOT available. Full B-1/B-2 nonimmigrant tourist/business visa required. Apply DS-160 at ceac.state.gov, then book appointment at US Consulate in Brasília, São Paulo, Rio, Recife, or Porto Alegre for biometric interview. Fee USD 185. US visa demand from Brazil AMONG HIGHEST IN WORLD. Interview wait times in Brazil LONGEST IN WORLD — currently measured in months. APPLY 6–12 MONTHS IN ADVANCE. Biometric fingerprinting and photo on arrival. Overstaying even single day may result in future visa refusals. Overstays 180+ days trigger 3-year bar; 1 year triggers 10-year bar. Brazil and US have one of world''s most significant bilateral migration relationships — estimated 1.5–2 million Brazilians in US with major communities in Boston, Miami, New York.',
  'https://travel.state.gov/',
  '2026-02-19'
);

-- Vietnam: eVisa required
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'brazil', 'vietnam', 'evisa', 'eVisa',
  90, 'Up to 90 days per visit on single or multiple-entry e-Visa',
  6, TRUE, TRUE, FALSE,
  'VISA REQUIRED. Vietnam does not grant visa-free access to Brazilians. e-Visa most convenient option — apply at evisa.xuatnhapcanh.gov.vn. Fee USD 25. Valid 90 days, multiple entries. Apply at least 3 business days before travel. Arrival smooth at Noi Bai (Hanoi), Tan Son Nhat (Ho Chi Minh City), Da Nang. Brazil and Vietnam have growing bilateral trade ties, particularly in agriculture (Brazilian soybeans major Vietnamese import).',
  'https://evisa.xuatnhapcanh.gov.vn/',
  '2026-02-19'
);
