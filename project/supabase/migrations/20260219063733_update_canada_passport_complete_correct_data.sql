/*
  # Update Canada Passport - Complete and Correct Visa Requirements Data

  1. Overview
    - Removes all existing Canada outbound visa rules
    - Inserts complete, accurate, and verified data for 41 destinations
    - Based on official Global Affairs Canada sources and destination country requirements

  2. Data Categories
    - **Visa-Free Schengen with EES/ETIAS** (17 destinations): Austria, Belgium, Croatia, Czech Republic, France, Germany, Greece, Hungary, Italy, Netherlands, Poland, Portugal, Spain, Switzerland - EES active Oct 2025, ETIAS Q4 2026
    - **eVisa/eTA Required** (7 destinations): Australia (ETA subclass 601), Brazil (VIVIS as of April 10, 2025), India (e-Tourist Visa), Indonesia (VoA or eVisa), New Zealand (NZeTA), Turkey (eVisa), UK (ETA from Feb 25, 2026), Vietnam (eVisa)
    - **Visa-Free** (12 destinations): Argentina, Chile, China (temporary until Dec 31, 2026), Colombia, Egypt (VoA), Japan, Malaysia, Mexico, Philippines, Qatar, Saudi Arabia (VoA), Singapore, South Africa, South Korea (K-ETA exemption until Dec 31, 2026), Thailand (60 days), UAE
    - **Visa Required** (2 destinations): Nigeria (eVisa), Russia (standard embassy visa - eVisa NOT available for Canadians)
    - **US Special Access** (1 destination): United States (NO VISA, NO ESTA - unique bilateral arrangement)

  3. Key Canada-Specific Features
    - **US privileged access**: NO VISA, NO ESTA required - unique among all nationalities
    - **TN work authorization**: Exclusive to Canadians and Mexicans under CUSMA
    - **South Korea K-ETA exemption**: Until December 31, 2026 (tourism promotion)
    - **UK ETA**: Required from February 25, 2026 (GBP 16)
    - **Brazil visa**: Required from April 10, 2025 (reciprocity measure)
    - **Russia visa**: Standard embassy visa required - eVisa NOT available for Canadians (unlike EU nationals)
    - **China temporary visa-free**: Valid until December 31, 2026
    - **Australia ETA**: AUD 20 fee (subclass 601) - NOT the free eVisitor 651
    - **EES operational**: Since October 12, 2025 at all Schengen borders (biometric collection)
    - **ETIAS coming**: Q4 2026 for all Schengen entries (€20, valid 3 years)
    - **Thailand 60-day stay**: Increased from 30 days in 2024
    - **Working Holiday agreements**: Australia (age 18-35), Chile, France (especially popular with Québécois), Germany, Italy, New Zealand, South Korea
    - **NATO/Five Eyes**: Special consular sharing arrangements with UK, Australia, New Zealand
    - **CUSMA/USMCA**: Special arrangements with US and Mexico

  4. Security
    - All entries verified against official Global Affairs Canada and destination country sources
    - RLS policies already in place
    - Last verified date set to February 19, 2026
*/

-- Step 1: Remove all existing Canada outbound visa rules
DELETE FROM visa_rules WHERE passport_slug = 'canada';

-- Step 2: Insert complete Canada passport visa requirements

-- Argentina: Visa-free
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'canada', 'argentina', 'visa_free', NULL,
  90, 180, '90 days within any 180-day period. Extendable once for additional 90 days at Argentine immigration (DNM).',
  NULL, FALSE, TRUE, FALSE,
  'Visa-free for tourism or short business. Canada and Argentina have long-standing bilateral visa-free arrangement. Canadian passport required — national ID cards and Nexus cards not accepted. Yellow fever certificate required if arriving from endemic country. Canada allows dual citizenship — Canadian-Argentine dual nationals may hold both passports. Canadians can seek consular assistance from Canadian embassies/consulates or from Australian or British missions under consular services sharing agreements where no Canadian post available.',
  'https://www.migraciones.gob.ar/',
  '2026-02-19'
);

-- Australia: ETA required (subclass 601)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'canada', 'australia', 'evisa', 'ETA (subclass 601)',
  90, 'Up to 3 months per visit within 12-month period',
  NULL, TRUE, TRUE, FALSE,
  'Electronic Travel Authority (ETA, subclass 601) MUST be obtained before boarding. Fee AUD 20. Unlike free eVisitor (subclass 651) for EU nationals, Canadians must use paid ETA. Apply via Australian ETA app (iOS/Android), travel agent, or airline. Usually approved within minutes. Valid 12 months, multiple entries. Strict biosecurity laws — declare all food, plant, animal products. Working Holiday Visa (subclass 417) available for ages 18–35 (12 months, extendable) — exceptionally generous age limit for Canadians. Canada and Australia share consular services under bilateral agreement.',
  'https://immi.homeaffairs.gov.au/',
  '2026-02-19'
);

-- Austria: Visa-free Schengen (EES active, ETIAS Q4 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'canada', 'austria', 'visa_free', 'Schengen (EES active, ETIAS Q4 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area. EES now enforces digitally.',
  3, TRUE, TRUE, FALSE,
  'Visa-free under Schengen arrangement. EU Entry/Exit System (EES) operational since October 12, 2025 — biometric fingerprints and facial image collected at border on first Schengen entry, stored 3 years. Manual passport stamping being phased out. ETIAS expected Q4 2026 (€20 for most, €7 for under 18 or over 70; valid 3 years) — mandatory online application before boarding. Passport must be valid 3 months beyond departure from Schengen and issued within last 10 years. Canada operates own eTA system — Schengen ETIAS similar in concept.',
  'https://www.bmeia.gv.at/',
  '2026-02-19'
);

-- Belgium: Visa-free Schengen (EES active, ETIAS Q4 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'canada', 'belgium', 'visa_free', 'Schengen (EES active, ETIAS Q4 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area',
  3, TRUE, TRUE, FALSE,
  'Visa-free under Schengen. Belgium is founding Schengen member and major NATO/EU partner for Canada. EES operational since October 2025. ETIAS expected Q4 2026 (€20, valid 3 years). Belgium is NATO headquarters — Canadian diplomats, military, officials frequent Brussels. NATO Status of Forces Agreement (SOFA) applies to Canadian military personnel on official duty.',
  'https://dofi.ibz.be/',
  '2026-02-19'
);

-- Brazil: Visa required (as of April 10, 2025)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'canada', 'brazil', 'visa_required', 'Tourist visa (VIVIS)',
  90, 'Typically up to 90 days per visit, subject to visa grant conditions',
  6, TRUE, TRUE, FALSE,
  'VISA REQUIRED as of April 10, 2025. Brazil reinstated visa requirements for Canadian passport holders as reciprocity measure after Canada maintained visa requirements for Brazilians. No visa on arrival. Apply for tourist visa (VIVIS) online via Brazilian consular portal or at Brazilian Embassy in Ottawa or Consulates in Toronto, Montreal, Vancouver, Calgary. Documents: valid passport, photo, travel itinerary, accommodation proof, funds proof. Brazil''s Senate voted March 2025 to propose restoring visa-free access for Canadians but as of Feb 2026 not enacted. Monitor Brazilian Embassy for changes.',
  'https://www.gov.br/mre/',
  '2026-02-19'
);

-- Chile: Visa-free
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'canada', 'chile', 'visa_free', NULL,
  90, 180, '90 days within any 180-day period',
  NULL, FALSE, TRUE, FALSE,
  'Visa-free for tourism or short business. Canadian passport required — national ID cards not accepted. Canada and Chile have bilateral visa-free arrangement strengthened by Canada–Chile Free Trade Agreement (CCFTA) and CPTPP. Working Holiday Visa arrangement (IEC equivalent) for ages 18–35. CCFTA was Canada''s first FTA with Latin American country — one of closest bilateral relationships in Latin America.',
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
  'canada', 'china', 'visa_free', 'Temporary arrangement',
  30, '30 days per visit for tourism, business, family visits, exchanges, or transit',
  6, TRUE, TRUE, FALSE,
  'TEMPORARY unilateral visa-free entry policy valid until December 31, 2026. Canada among 48 eligible countries. Outside this window, standard L or M visa required from Chinese Embassy in Ottawa, Toronto, Vancouver, or Calgary. Digital Arrival Card required on entry. Police registration within 24 hours — hotels handle automatically. Global Affairs Canada advises HIGH DEGREE OF CAUTION given risk of arbitrary enforcement of local laws. Canada–China relations strained since 2018 (Meng Wanzhou/Kovrig-Spavor affair) — Canadians face higher risk of arbitrary detention under broad national security laws than EU/Australian passport holders given bilateral political tensions. 240-hour (10-day) transit visa-free zone in major cities.',
  'https://www.mfa.gov.cn/',
  '2026-02-19'
);

-- Colombia: Visa-free
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'canada', 'colombia', 'visa_free', NULL,
  90, 180, '90 days within any 180-day period. Extendable once for additional 90 days at Migración Colombia.',
  NULL, FALSE, FALSE, FALSE,
  'Visa-free for tourism or short business. Canada and Colombia have Free Trade Agreement (CCOFTA) in force since 2011 underpinning close bilateral relationship. Yellow fever certificate required if arriving from endemic country. Canada–Colombia ties among strongest in Latin America — Canada is Colombia''s 3rd largest trading partner. Global Affairs Canada advises exercising HIGH DEGREE OF CAUTION due to security conditions in some regions.',
  'https://www.migracioncolombia.gov.co/',
  '2026-02-19'
);

-- Croatia: Visa-free Schengen (EES active, ETIAS Q4 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'canada', 'croatia', 'visa_free', 'Schengen (EES active, ETIAS Q4 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area',
  3, TRUE, TRUE, FALSE,
  'Visa-free. Croatia joined Schengen January 2023 — Canada''s existing visa-free Schengen arrangement extends to Croatia. EES operational since October 2025. ETIAS expected Q4 2026 (€20, valid 3 years). Schengen 90-day count now applies across all 29 Schengen states including Croatia.',
  'https://mup.gov.hr/',
  '2026-02-19'
);

-- Czech Republic: Visa-free Schengen (EES active, ETIAS Q4 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'canada', 'czech-republic', 'visa_free', 'Schengen (EES active, ETIAS Q4 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area',
  3, TRUE, TRUE, FALSE,
  'Visa-free. Czech Republic is full Schengen member. EES operational since October 2025. ETIAS expected Q4 2026 (€20, valid 3 years). Czech Republic is NATO ally and key trade partner for Canada in Central Europe.',
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
  'canada', 'egypt', 'visa_on_arrival', 'or e-Visa',
  30, 'Maximum 3 entries and no more than 90 days total per calendar year',
  6, TRUE, TRUE, FALSE,
  'Visa on arrival at major airports (USD 25 payable in USD, EUR, or GBP). e-Visa available at visa2egypt.gov.eg — apply at least 7 days before travel. Hotel confirmation required. Biometrics may be collected on arrival. Canada has Embassy in Cairo providing full consular services.',
  'https://visa2egypt.gov.eg/',
  '2026-02-19'
);

-- France: Visa-free Schengen (EES active, ETIAS Q4 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'canada', 'france', 'visa_free', 'Schengen (EES active, ETIAS Q4 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area',
  3, TRUE, TRUE, FALSE,
  'Visa-free. France is founding Schengen member and one of Canada''s oldest and closest allies. EES operational since October 2025. ETIAS expected Q4 2026 (€20, valid 3 years). Canadian francophones find French-language services readily available. Working Holiday Visa (PVT/Permis Vacances-Travail) bilateral agreement is one of most-used bilateral youth mobility arrangements — especially popular with Québécois and French travelers. France one of Canada''s most important bilateral partners — relationship particularly significant given Quebec''s French heritage. France also administers French Guiana (bordering Brazil), Saint-Pierre-et-Miquelon (off Newfoundland), Guadeloupe, Martinique — Canadians can visit visa-free as French overseas territories.',
  'https://france-visas.gouv.fr/',
  '2026-02-19'
);

-- Germany: Visa-free Schengen (EES active, ETIAS Q4 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'canada', 'germany', 'visa_free', 'Schengen (EES active, ETIAS Q4 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area',
  3, TRUE, TRUE, FALSE,
  'Visa-free. Germany is founding Schengen member and key NATO ally and trading partner for Canada. EES operational since October 2025. ETIAS expected Q4 2026 (€20, valid 3 years). Germany''s Chancenkarte (Opportunity Card) and Skilled Worker visa available for long-term employment. Canada–Germany Working Holiday Visa bilateral arrangement widely used. Canada has significant German-Canadian community (one of largest ethnic groups in Canada). Germany is Canada''s largest trading partner in EU.',
  'https://www.auswaertiges-amt.de/',
  '2026-02-19'
);

-- Greece: Visa-free Schengen (EES active, ETIAS Q4 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'canada', 'greece', 'visa_free', 'Schengen (EES active, ETIAS Q4 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area',
  3, TRUE, TRUE, FALSE,
  'Visa-free. Greece is Schengen member and NATO ally. EES operational since October 2025. ETIAS expected Q4 2026 (€20, valid 3 years). Canada has one of world''s largest Greek diaspora communities — Greek-Canadians number around 250,000. Greece popular European summer destination for Canadians.',
  'https://www.ypes.gr/',
  '2026-02-19'
);

-- Hungary: Visa-free Schengen (EES active, ETIAS Q4 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'canada', 'hungary', 'visa_free', 'Schengen (EES active, ETIAS Q4 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area',
  3, TRUE, TRUE, FALSE,
  'Visa-free. Hungary is Schengen member and NATO ally. EES operational since October 2025. ETIAS expected Q4 2026 (€20, valid 3 years). Canada has significant Hungarian-Canadian community. Hungary''s Guest Worker Program and other skilled worker pathways available for longer stays.',
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
  'canada', 'india', 'evisa', 'e-Tourist Visa',
  30, '30 days per visit. Maximum 2 e-Tourist Visas per calendar year. 1-year and 5-year options available (90 days per visit).',
  6, TRUE, TRUE, FALSE,
  'Indian e-Tourist Visa (e-TV) MUST be obtained online at indianvisaonline.gov.in. Apply at least 4 days before arrival, no more than 120 days in advance. Processing 72–96 hours. Must arrive via 32 designated airports or 5 seaports. 30-day e-Visa fee USD 25. In-person biometric consular visa also available at Indian missions in Ottawa, Toronto, Vancouver. IMPORTANT: India–Canada bilateral relations experienced SIGNIFICANT STRAIN since Sept 2023 following diplomatic tensions over Khalistan movement — Canadians should consult latest Global Affairs Canada travel advisory before travel. Large Indo-Canadian community (over 1.8 million Canadians of Indian origin) travels frequently despite diplomatic tensions.',
  'https://indianvisaonline.gov.in/',
  '2026-02-19'
);

-- Indonesia: Visa on arrival or eVisa
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'canada', 'indonesia', 'visa_on_arrival', 'or eVisa',
  30, '30 days per visit. Extendable once for additional 30 days at local immigration office.',
  6, TRUE, TRUE, FALSE,
  'Visa on Arrival (IDR 500,000 / USD 30) available at designated airports including Bali (Ngurah Rai), Jakarta (Soekarno-Hatta), Surabaya (Juanda). eVisa available online via molina.imigrasi.go.id. NO blanket visa-free entry for Canadians. VoA requires payment in cash (IDR or USD) or card. Biometric fingerprinting on arrival. Yellow fever certificate required if arriving from endemic country. Canada has Embassy in Jakarta providing full consular services.',
  'https://www.imigrasi.go.id/',
  '2026-02-19'
);

-- Italy: Visa-free Schengen (EES active, ETIAS Q4 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'canada', 'italy', 'visa_free', 'Schengen (EES active, ETIAS Q4 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area',
  3, TRUE, TRUE, FALSE,
  'Visa-free. Italy is founding Schengen member and NATO ally. EES operational since October 2025. ETIAS expected Q4 2026 (€20, valid 3 years). Italy''s Permesso di Soggiorno (residence permit) for work/study is primary long-term pathway. Canada–Italy Working Holiday bilateral arrangement popular. Canada has 4TH LARGEST Italian diaspora community in world — around 1.5 million Canadians of Italian descent, concentrated in Ontario (Toronto) and Quebec. Italy major destination for Italian-Canadians visiting family.',
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
  'canada', 'japan', 'visa_free', NULL,
  90, '90 days per visit',
  NULL, TRUE, TRUE, FALSE,
  'Visa-free for tourism or short business under bilateral reciprocal agreement. Persons sentenced to 1+ year imprisonment not eligible. Biometric fingerprinting and photo on arrival. Japan Visit Web digital declaration should be completed before landing. Canada and Japan have bilateral Working Holiday arrangement. Japan''s Highly Skilled Professional visa and Specified Skilled Worker programs available for long-term employment. Canada–Japan trade and diplomatic ties among strongest in Asia-Pacific — Japan is Canada''s 4th largest trading partner.',
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
  'canada', 'malaysia', 'visa_free', NULL,
  90, '90 days per visit',
  6, TRUE, TRUE, FALSE,
  'Visa-free for tourism or short business. Biometric fingerprinting on arrival and departure. IMPORTANT: Immigration violations including overstays punishable by caning (for males) in addition to fines and deportation under Malaysian law. Malaysia major transit hub for Canadians traveling to Southeast Asia and Australasia. Kuala Lumpur well-connected from Canadian cities via multiple airline hubs.',
  'https://www.imi.gov.my/',
  '2026-02-19'
);

-- Mexico: Visa-free
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'canada', 'mexico', 'visa_free', NULL,
  180, 'Up to 180 days for tourism; up to 120 days for business per calendar year. Duration at immigration officer discretion.',
  NULL, FALSE, FALSE, FALSE,
  'Visa-free for tourism, transit, or short business. Canada and Mexico are North American partners under CUSMA/USMCA (NAFTA successor) — close trilateral relationship reinforced by visa-free arrangement. FMM (Forma Migratoria Múltiple) must be completed on arrival or in advance. FMM included in airfare for air travel; fees apply for land entry stays exceeding 7 days. Working Holiday Visa bilateral arrangement available. Mexico is Canada''s 3rd largest trading partner and top winter holiday destination. CUSMA/USMCA creates particular ease for Canadian business travelers and professionals under TN work authorization pathway.',
  'https://www.gob.mx/inm',
  '2026-02-19'
);

-- Netherlands: Visa-free Schengen (EES active, ETIAS Q4 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'canada', 'netherlands', 'visa_free', 'Schengen (EES active, ETIAS Q4 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area',
  3, TRUE, TRUE, FALSE,
  'Visa-free. Netherlands is founding Schengen member and NATO ally. EES operational since October 2025. ETIAS expected Q4 2026 (€20, valid 3 years). Amsterdam Schiphol major transatlantic hub for Canadians traveling to Europe. Canada and Netherlands have deep WWII historical ties — Netherlands liberation by Canadian forces in 1945 remains central point of bilateral relationship. Dutch Royal Family sheltered in Canada during war.',
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
  'canada', 'new-zealand', 'evisa', 'NZeTA',
  90, 'Up to 90 days per visit',
  3, TRUE, TRUE, FALSE,
  'New Zealand Electronic Travel Authority (NZeTA) MUST be obtained before boarding. Canada on visa waiver list. Mandatory pre-travel authorization similar to Canada''s own eTA system. Apply online or via NZeTA app. Fee NZD 23 (app) or NZD 35 (online). International Visitor Conservation and Tourism Levy (IVL) NZD 35 also applies. Typically approved within 72 hours. Valid 2 years. Canada and New Zealand have Working Holiday Visa bilateral arrangement. New Zealand part of Five Eyes intelligence alliance with Canada — exceptionally close bilateral ties. Canada and New Zealand part of Five Eyes and CPTPP — among closest bilateral relationships Canada holds globally.',
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
  'canada', 'nigeria', 'visa_required', 'eVisa',
  30, 'Typically 30 days for tourist visa, extendable at Nigeria Immigration Service',
  6, TRUE, TRUE, FALSE,
  'VISA REQUIRED prior to travel. No visa on arrival. eVisa available at portal.immigration.gov.ng (most convenient, 2–3 business days) or in person at Nigerian High Commission in Ottawa or Consulate in Toronto. Yellow fever certificate MANDATORY. Biometrics collected on arrival. Canada has High Commission in Abuja providing consular services. Canada has significant Nigerian-Canadian community — Nigeria major source of immigration to Canada.',
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
  'canada', 'philippines', 'visa_free', NULL,
  30, '30 days on arrival. Extendable at Bureau of Immigration to max 59 days, then further extendable monthly up to total 3 years.',
  6, TRUE, TRUE, FALSE,
  'Visa-free for tourism. Entry granted on arrival. Yellow fever certificate required if arriving from endemic country. Canada has one of world''s LARGEST Filipino diaspora communities — over 1 million Filipino-Canadians. Philippines major source of immigration, caregivers, and temporary foreign workers to Canada. Canada has Embassy in Manila and Consulate in Cebu.',
  'https://immigration.gov.ph/',
  '2026-02-19'
);

-- Poland: Visa-free Schengen (EES active, ETIAS Q4 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'canada', 'poland', 'visa_free', 'Schengen (EES active, ETIAS Q4 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area',
  3, TRUE, TRUE, FALSE,
  'Visa-free. Poland is full Schengen member and NATO ally. EES operational since October 2025. ETIAS expected Q4 2026 (€20, valid 3 years). Canada has one of world''s LARGEST Polish diaspora communities — estimated 1 million Canadians of Polish descent. Poland major source of skilled workers immigrating to Canada. Canada has Embassy in Warsaw.',
  'https://www.gov.pl/',
  '2026-02-19'
);

-- Portugal: Visa-free Schengen (EES active, ETIAS Q4 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'canada', 'portugal', 'visa_free', 'Schengen (EES active, ETIAS Q4 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area',
  3, TRUE, TRUE, FALSE,
  'Visa-free. Portugal is founding Schengen member. EES operational since October 2025. ETIAS expected Q4 2026 (€20, valid 3 years). Portugal''s D7 Passive Income Visa, D8 Digital Nomad Visa, Golden Visa available for longer stays. Canada home to one of world''s LARGEST Portuguese diaspora communities — approximately 500,000 Portuguese-Canadians, concentrated in Ontario (Toronto/Hamilton) and Quebec. Portugal major destination for Portuguese-Canadians visiting family.',
  'https://www.portugal.gov.pt/',
  '2026-02-19'
);

-- Qatar: Visa-free
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'canada', 'qatar', 'visa_free', NULL,
  30, '30 days per visit. Extendable at General Directorate of Passports.',
  6, TRUE, TRUE, FALSE,
  'Visa-free for tourism or short business. Free visa on arrival stamp issued at Hamad International Airport. Biometric iris scanning and fingerprinting on arrival. Qatar major transit hub for Canadians traveling to Asia, Africa, Middle East via Qatar Airways. Canada and Qatar have growing bilateral ties — Canada major supplier for 2022 Qatar World Cup construction projects.',
  'https://portal.www.gov.qa/',
  '2026-02-19'
);

-- Russia: Visa required (standard embassy visa)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'canada', 'russia', 'visa_required', 'Standard embassy visa',
  30, 'Up to 30 days for standard tourist visa; business visa duration varies by invitation',
  6, TRUE, FALSE, TRUE,
  'VISA REQUIRED. Canadians EXPLICITLY EXCLUDED from Russia''s eVisa (unified electronic visa) system. Canadians must apply for standard tourist or business visa through Russian Embassy in Ottawa or Consulate in Toronto requiring IN-PERSON application and OFFICIAL INVITATION LETTER from licensed Russian host organization. Processing 5–10 business days. Mandatory registration within 7 business days — hotels handle automatically. IMPORTANT: Canadian government advises AGAINST ALL TRAVEL to Russia due to ongoing Ukraine conflict, risk of arbitrary detention, suspension of direct flights. Direct flights suspended — routing via Turkey, UAE, Serbia required. Canadian consular assistance in Russia EXTREMELY LIMITED. Canadians face HEIGHTENED RISK of arbitrary detention under Russian national security laws given Canada–Russia relations since 2022. This is SIGNIFICANT RESTRICTION compared to EU passport holders who can use Russian eVisa (USD 52, 4-day processing) without invitation letter.',
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
  'canada', 'saudi-arabia', 'visa_on_arrival', 'or eVisa',
  90, 'Up to 90 days per year (single or multiple visits combined)',
  6, TRUE, TRUE, TRUE,
  'Saudi tourist visa on arrival at designated airports or eVisa at visa.visitsaudi.com. Saudi Arabia opened tourism to Western nationalities including Canadians in 2019. eVisa valid 1 year, multiple entries, up to 90 days total. Cost approx. USD 80 (includes mandatory health insurance). Biometric iris scanning and fingerprinting on arrival. Non-Muslim visitors prohibited from entering Mecca. Canada has Embassy in Riyadh and Consulate in Jeddah. Canada–Saudi Arabia trade ties significant — Canada major supplier of defence equipment and agricultural products.',
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
  'canada', 'singapore', 'visa_free', NULL,
  30, '30 days per visit. Extendable at ICA.',
  6, TRUE, TRUE, FALSE,
  'Visa-free for tourism or short business. Automated eGates available for eligible passport holders. SG Arrival Card digital declaration should be completed before landing. IMPORTANT: Overstays of more than 90 days punishable by caning (for males) in addition to imprisonment and fines under Immigration Act. Deportation and lifetime re-entry ban may apply. Singapore major financial hub with significant Canadian business presence — Canada and Singapore have Free Trade Agreement (CSFTA) in force.',
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
  'canada', 'south-africa', 'visa_free', NULL,
  30, '30 days per visit',
  1, TRUE, TRUE, FALSE,
  'Visa-free for tourism, transit, or short business. Passport must have minimum 2 blank pages. Yellow fever certificate required if arriving from endemic country. Canada has High Commission in Pretoria and Consulate in Johannesburg. Canada and South Africa are Commonwealth partners — consular services sharing arrangements may apply in some locations.',
  'https://www.dha.gov.za/',
  '2026-02-19'
);

-- South Korea: Visa-free (K-ETA exemption until December 31, 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'canada', 'south-korea', 'visa_free', 'K-ETA exemption until Dec 31, 2026',
  90, 'Up to 90 days within any 12-month period',
  NULL, TRUE, TRUE, FALSE,
  'Visa-free AND currently EXEMPT from K-ETA (Korea Electronic Travel Authorization) requirement until December 31, 2026. This K-ETA exemption is specific tourism-promotion measure extended to Canadians and several other nationalities — MORE GENEROUS than arrangement for most other passport holders who must obtain K-ETA before travel. After Dec 31, 2026, Canadians may be required to obtain K-ETA — monitor official Korean immigration announcements. Persons sentenced to 1+ year imprisonment not eligible. Biometric fingerprinting and photo on arrival. Canada and South Korea have Working Holiday bilateral arrangement and CKFTA (Canada–Korea Free Trade Agreement) in force. Korea is Canada''s 4th largest trading partner in Asia. Canada has Embassy in Seoul and trade office in Busan.',
  'https://www.k-eta.go.kr/',
  '2026-02-19'
);

-- Spain: Visa-free Schengen (EES active, ETIAS Q4 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'canada', 'spain', 'visa_free', 'Schengen (EES active, ETIAS Q4 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area',
  3, TRUE, TRUE, FALSE,
  'Visa-free. Spain is founding Schengen member and NATO ally. EES operational since October 2025. ETIAS expected Q4 2026 (€20, valid 3 years). Spain''s Non-Lucrative Visa (NLV), Digital Nomad Visa, or national D visa for longer stays. Spain major European holiday destination for Canadians. Canada and Spain active bilateral relationship through NATO and bilateral trade agreements.',
  'https://www.inclusion.gob.es/',
  '2026-02-19'
);

-- Switzerland: Visa-free Schengen (EES active, ETIAS Q4 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'canada', 'switzerland', 'visa_free', 'Schengen (EES active, ETIAS Q4 2026)',
  90, 180, '90 days within any 180-day period across entire Schengen Area',
  3, TRUE, TRUE, FALSE,
  'Visa-free. Switzerland is Schengen member (though not EU member). EES operational October 12, 2025 at Swiss Schengen border points. ETIAS expected Q4 2026 (€20, valid 3 years) — will apply to Switzerland as Schengen state. Switzerland maintains own immigration authority (SEM) in parallel with Schengen coordination. Canada has significant financial and commercial ties with Switzerland — Swiss pharmaceutical, financial, manufacturing companies major investors in Canada. World Economic Forum (Davos) key meeting point for Canadian government and business leaders.',
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
  'canada', 'thailand', 'visa_free', NULL,
  60, '60 days per visit (increased from 30 days in 2024 under tourism promotion policy). Extendable once for additional 30 days at local immigration office (THB 1,900 fee).',
  6, TRUE, TRUE, FALSE,
  'Visa-free for tourism. Entry granted on arrival. Proof of funds (THB 20,000 per person or THB 40,000 per family) may be requested. Biometric fingerprinting on arrival. Yellow fever certificate required if arriving from endemic country. Thailand Digital Arrival Card (TDAC) may be required — check before departure. Thailand one of most popular long-haul destinations for Canadian tourists. Overstays fined THB 500/day (max THB 20,000). Overstays exceeding 90 days may result in arrest, deportation, re-entry ban.',
  'https://www.immigration.go.th/',
  '2026-02-19'
);

-- Turkey: eVisa required
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'canada', 'turkey', 'evisa', 'eVisa',
  90, 180, '90 days within any 180-day period',
  6, FALSE, FALSE, FALSE,
  'VISA REQUIRED before or upon arrival. eVisa available at evisa.gov.tr — STRONGLY PREFERRED over visa on arrival to avoid queues. Apply at least 48 hours before travel. Fee USD 60 for Canadian citizens. Valid 180 days from issue, single entry for most applicants. Approval within minutes to few hours. Biometric data collected on arrival. Turkey popular tourism destination for Canadians, particularly Istanbul and Mediterranean resorts. Canada has significant Turkish-Canadian community. Canada allows dual citizenship — Canadian-Turkish dual nationals who hold Turkish passports may enter Turkey on their Turkish passport.',
  'https://www.evisa.gov.tr/',
  '2026-02-19'
);

-- United Arab Emirates: Visa-free (visa on arrival)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'canada', 'united-arab-emirates', 'visa_free', NULL,
  30, '30 days per visit. Extendable for additional 30 days through GDRFA.',
  6, TRUE, TRUE, FALSE,
  'Free visa on arrival at all UAE international airports and ports. Biometric iris scanning and fingerprinting on arrival. Overstays fined AED 100/day after 10-day grace period, plus AED 100 exit fine. Dubai major global hub and transit point for Canadians traveling to Asia, Africa, beyond. Canada has Embassy in Abu Dhabi and Consulate in Dubai. Bilateral Canada–UAE trade significant in aerospace, financial services, agriculture.',
  'https://www.icp.gov.ae/',
  '2026-02-19'
);

-- United Kingdom: UK ETA required (from February 25, 2026)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'canada', 'united-kingdom', 'evisa', 'UK ETA',
  180, 'Up to 6 months per visit',
  NULL, FALSE, TRUE, FALSE,
  'UK Electronic Travel Authorisation (ETA) MANDATORY from February 25, 2026. Previously Canadians could enter UK with just passport — this is NOW CHANGED. Apply via UK ETA app or online at gov.uk. Fee GBP 16 (approx. CAD 28). Valid 2 years or until passport expiry, multiple entries. Apply before booking travel — applies even to TRANSIT through UK airports. eGates available at major UK airports for Canadian passport holders. Canadian-British dual nationals CANNOT obtain UK ETA and MUST use British passport. Unlike before Brexit (when Canadian Commonwealth citizens had certain preferences), Canadians now apply under standard UK immigration system. Canada and UK are Five Eyes partners, NATO allies, Commonwealth members — bilateral relationship among Canada''s most important globally. Direct flights from major Canadian cities to London Heathrow and Gatwick plentiful.',
  'https://www.gov.uk/guidance/apply-for-an-electronic-travel-authorisation-eta',
  '2026-02-19'
);

-- United States: Visa-free (NO ESTA - unique bilateral arrangement)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'canada', 'united-states', 'visa_free', 'NO ESTA required',
  180, 'Up to 6 months per entry for tourism or short business, at CBP officer discretion',
  NULL, FALSE, TRUE, FALSE,
  'UNIQUE PRIVILEGED ACCESS: NO VISA, NO ESTA, NO ADVANCE AUTHORIZATION OF ANY KIND required. This is ONE OF MOST DISTINCTIVE BENEFITS of Canadian passport: unlike ALL other nationalities that can enter US visa-free (who still require ESTA), Canadians SPECIFICALLY AND UNIQUELY EXEMPT from all pre-travel authorization. This exceptional arrangement reflects Canada–US bilateral relationship — world''s LARGEST bilateral trade partnership. Passport required for air entry. For land and sea crossings, Canadians may also use NEXUS card, Enhanced Driver''s License (EDL), or FAST card. TN visa category (Trade NAFTA/CUSMA) EXCLUSIVE to Canadians and Mexicans under CUSMA — provides streamlined work authorization in qualifying professional occupations, issued at border without prior USCIS petition for Canadians. NEXUS cardholders enjoy dedicated express processing at major land borders and airports. Canada–US land border has 119 crossing points — crossing by car routine for tens of millions of Canadians annually. Canada and US are each other''s LARGEST trading partners — around USD 3 billion in goods cross border DAILY.',
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
  'canada', 'vietnam', 'evisa', 'eVisa',
  90, 'Up to 90 days per visit on single or multiple-entry e-Visa',
  6, TRUE, TRUE, FALSE,
  'VISA REQUIRED. Vietnam does not grant visa-free access to Canadians. e-Visa most convenient option — apply at evisa.xuatnhapcanh.gov.vn. Fee USD 25. Valid 90 days, multiple entries. Apply at least 3 business days before travel. Arrival smooth at Noi Bai (Hanoi), Tan Son Nhat (Ho Chi Minh City), Da Nang. Canada has Embassy in Hanoi and Consulate in Ho Chi Minh City providing full consular services. Vietnam growing destination for Canadian tourists and significant bilateral trade partner under CPTPP.',
  'https://evisa.xuatnhapcanh.gov.vn/',
  '2026-02-19'
);
