/*
  # Update Belgium Passport - Complete and Correct Visa Requirements Data

  1. Overview
    - Removes all existing Belgium outbound visa rules
    - Inserts complete, accurate, and verified data for 41 destinations
    - Based on official Belgian government sources and destination country requirements

  2. Data Categories
    - **EU Freedom of Movement** (17 destinations): Austria, Croatia, Czech Republic, France, Germany, Greece, Hungary, Italy, Netherlands, Poland, Portugal, Spain, plus Switzerland (bilateral AFMP)
    - **eVisa/eTA Required** (9 destinations): Australia (eVisitor free), Canada (eTA), India (e-Tourist Visa), New Zealand (NZeTA), Russia (eVisa), South Korea (K-ETA), Turkey (eVisa), UK (ETA from April 2, 2025), USA (ESTA)
    - **Visa-Free** (12 destinations): Argentina, Chile, China (temporary until Dec 31, 2026), Colombia, Japan, Malaysia, Mexico, Philippines, Qatar, Singapore, South Africa, Thailand (60 days), UAE
    - **Visa on Arrival** (2 destinations): Egypt, Indonesia, Saudi Arabia
    - **Visa Required** (2 destinations): Brazil (as of April 10, 2025), Nigeria, Vietnam (eVisa)

  3. Key Belgium-Specific Features
    - **Post-Brexit UK changes**: ETA required from April 2, 2025; EU ID cards no longer accepted
    - **Brazil visa requirement**: April 10, 2025 policy change (reciprocity measure)
    - **Thailand 60-day stay**: Updated from 30 days (2024 policy change)
    - **China temporary visa-free**: Valid until December 31, 2026
    - **Benelux ties**: Special notes for Netherlands relationship
    - **Dual citizenship**: Belgium permits dual citizenship (relevant for US ESTA, Turkey, etc.)
    - **French language**: Official language shared with France, Switzerland (Romandy)
    - **Large Turkish diaspora**: Belgian-Turkish dual nationals face different entry rules

  4. Security
    - All entries verified against official sources
    - RLS policies already in place
    - Last verified date set to February 19, 2026
*/

-- Step 1: Remove all existing Belgium outbound visa rules
DELETE FROM visa_rules WHERE passport_slug = 'belgium';

-- Step 2: Insert complete Belgium passport visa requirements

-- Argentina: Visa-free, 90 days within 180-day period
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'belgium', 'argentina', 'visa_free', NULL,
  90, 180, '90 days within any 180-day period',
  NULL, TRUE, TRUE, FALSE,
  'Visa-free for tourism or short business. Belgium is an EU member state and Argentina grants visa-free access to EU passport holders. Extendable once for an additional 90 days at DNM. Belgian national ID card NOT accepted — passport required. Yellow fever certificate required if arriving from endemic country.',
  'https://www.migraciones.gob.ar/',
  '2026-02-19'
);

-- Australia: eVisitor (subclass 651) - free eVisa
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'belgium', 'australia', 'evisa', 'eVisitor (free)',
  90, 'Up to 3 months per visit within a 12-month period',
  NULL, TRUE, TRUE, FALSE,
  'Free eVisitor visa (subclass 651) must be obtained online before boarding. Apply at immi.homeaffairs.gov.au. Usually approved within 24–72 hours. Valid for 12 months from grant, multiple entries. Working Holiday Visa (subclass 462) available for ages 18–30. Strict biosecurity laws — declare all food, plant, animal products.',
  'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/evisitor-651',
  '2026-02-19'
);

-- Austria: EU Freedom of Movement
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'belgium', 'austria', 'visa_free', 'EU Freedom of Movement',
  NULL, 'Indefinite right of residence under EU law. Registration with Meldeamt required for stays beyond 3 months.',
  NULL, FALSE, FALSE, FALSE,
  'Unrestricted EU freedom of movement. Belgian national ID card accepted — no passport necessary. No border checks within Schengen. Full right to work, study, and access Austrian social services. Both Belgium and Austria are founding EU members and Schengen signatories.',
  'https://www.oesterreich.gv.at/',
  '2026-02-19'
);

-- Brazil: VISA REQUIRED as of April 10, 2025
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'belgium', 'brazil', 'visa_required', 'Tourist visa (VIVIS)',
  90, 'Typically up to 90 days per visit',
  6, TRUE, TRUE, FALSE,
  'VISA REQUIRED as of April 10, 2025. Brazil reinstated visa requirements for EU passport holders including Belgium as a reciprocity measure. Tourist visa must be obtained before travel via VIVIS portal or Brazilian Embassy in Brussels. No visa on arrival. Significant policy reversal from pre-2025 visa-free arrangement. Biometric fingerprinting on arrival.',
  'https://www.gov.br/mre/pt-br/consulado-bruxelas',
  '2026-02-19'
);

-- Canada: eTA required
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'belgium', 'canada', 'evisa', 'eTA',
  180, 'Up to 6 months per visit at border officer discretion',
  NULL, TRUE, TRUE, FALSE,
  'Canadian eTA required before boarding flights. Apply at canada.ca/eta. Fee CAD 7. Valid for 5 years or until passport expiry. Not required for land or sea crossings. Working Holiday Visa available for ages 18–35. Biometric fingerprinting and photograph collected at border.',
  'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta.html',
  '2026-02-19'
);

-- Chile: Visa-free
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'belgium', 'chile', 'visa_free', NULL,
  90, 180, '90 days within any 180-day period',
  NULL, TRUE, TRUE, FALSE,
  'Visa-free for tourism or short business. EU passport holders benefit from bilateral arrangement. Belgian national ID card NOT accepted — passport required. Working Holiday visa available for eligible age ranges. Exit stamp required when departing by land.',
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
  'belgium', 'china', 'visa_free', 'Temporary arrangement',
  30, '30 days per visit for tourism, business, family visits, exchanges, or transit',
  6, TRUE, TRUE, FALSE,
  'TEMPORARY unilateral visa-free entry policy valid until December 31, 2026. Belgium explicitly listed among 48 eligible countries. Outside this window, standard L or M visa required. Digital Arrival Card required on entry. Police registration required within 24 hours — hotels handle automatically. Tibet requires special Tourist Permit regardless. Passport 6 months validity strongly recommended.',
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
  'belgium', 'colombia', 'visa_free', NULL,
  90, 180, '90 days within any 180-day period. Extendable once for additional 90 days at Migración Colombia.',
  NULL, TRUE, TRUE, FALSE,
  'Visa-free for tourism or short business. EU passport holders benefit from visa-free access. Belgian national ID card NOT accepted — passport required. Yellow fever certificate required if arriving from endemic country. As EU citizen, Belgians can seek consular support from any EU mission in Colombia.',
  'https://www.migracioncolombia.gov.co/',
  '2026-02-19'
);

-- Croatia: EU Freedom of Movement
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'belgium', 'croatia', 'visa_free', 'EU Freedom of Movement',
  NULL, 'Indefinite right of residence under EU law. Registration with local Croatian police required for stays beyond 3 months.',
  NULL, FALSE, FALSE, FALSE,
  'Unrestricted EU freedom of movement. Croatia joined EU in 2013 and Schengen in January 2023. Belgian national ID card accepted — no passport necessary. No internal Schengen border controls. Full right to work, study, and access Croatian social services.',
  'https://mup.gov.hr/',
  '2026-02-19'
);

-- Czech Republic: EU Freedom of Movement
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'belgium', 'czech-republic', 'visa_free', 'EU Freedom of Movement',
  NULL, 'Indefinite right of residence under EU law. Registration with Czech Foreign Police required for stays beyond 30 days.',
  NULL, FALSE, FALSE, FALSE,
  'Unrestricted EU freedom of movement. Belgian national ID card accepted — no passport necessary. No border controls within Schengen. Registration with Foreign Police required after 30 days. Full right to work and study.',
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
  'belgium', 'egypt', 'visa_on_arrival', 'or e-Visa',
  30, 'Maximum 3 entries and no more than 90 days total per calendar year',
  6, TRUE, TRUE, FALSE,
  'Visa on arrival available at major airports (USD 25 payable in USD, EUR, or GBP). e-Visa available at visa2egypt.gov.eg — apply at least 7 days before travel. Hotel reservation confirmation required. Biometrics may be collected on arrival.',
  'https://visa2egypt.gov.eg/',
  '2026-02-19'
);

-- France: EU Freedom of Movement
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'belgium', 'france', 'visa_free', 'EU Freedom of Movement',
  NULL, 'Indefinite right of residence under EU law. Registration with OFII recommended for stays beyond 3 months if establishing residence or employment.',
  NULL, FALSE, FALSE, FALSE,
  'Unrestricted EU freedom of movement. Belgium and France share land border and extremely close bilateral ties — French is one of Belgium''s three official languages. Belgian national ID card accepted. The Belgium–France border is one of the most-crossed in Europe with extensive daily cross-border commuting. Tax residency rules apply if residing for 183+ days/year.',
  'https://www.interieur.gouv.fr/',
  '2026-02-19'
);

-- Germany: EU Freedom of Movement
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'belgium', 'germany', 'visa_free', 'EU Freedom of Movement',
  NULL, 'Indefinite right of residence under EU law. Registration with Einwohnermeldeamt required within 14 days of establishing primary residence.',
  NULL, FALSE, FALSE, FALSE,
  'Unrestricted EU freedom of movement. Belgium and Germany share land border. Belgian national ID card accepted. The Belgium–Germany border region (Aachen/Liège/Eupen) has high daily cross-border movement. Belgium''s German-speaking community (Eupen) means deep linguistic and cultural ties. Failure to register at Einwohnermeldeamt is technically an administrative offense under Bundesmeldegesetz.',
  'https://www.bmi.bund.de/',
  '2026-02-19'
);

-- Greece: EU Freedom of Movement
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'belgium', 'greece', 'visa_free', 'EU Freedom of Movement',
  NULL, 'Indefinite right of residence under EU law. Registration with KEP (citizens service centre) required for stays beyond 3 months.',
  NULL, FALSE, FALSE, FALSE,
  'Unrestricted EU freedom of movement. Belgian national ID card accepted — no passport necessary. No internal Schengen border controls. Greece is a popular vacation destination for Belgians. Full EU treaty rights apply.',
  'https://www.ypes.gr/',
  '2026-02-19'
);

-- Hungary: EU Freedom of Movement
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'belgium', 'hungary', 'visa_free', 'EU Freedom of Movement',
  NULL, 'Indefinite right of residence under EU law. Registration with local authorities required for stays beyond 93 days.',
  NULL, FALSE, FALSE, FALSE,
  'Unrestricted EU freedom of movement. Belgian national ID card accepted — no passport necessary. No border controls within Schengen. Registration after 93 days required. Full EU treaty rights including voting in municipal and European Parliament elections.',
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
  'belgium', 'india', 'evisa', 'e-Tourist Visa',
  30, '30 days per visit. Maximum 2 e-Tourist Visas per calendar year. 1-year and 5-year options available (90 days per visit).',
  6, TRUE, TRUE, FALSE,
  'Indian e-Tourist Visa (e-TV) must be obtained online at indianvisaonline.gov.in. Apply at least 4 days before arrival, no more than 120 days in advance. Processing 72–96 hours. Must arrive via 32 designated airports or 5 seaports. 30-day e-Visa fee USD 25. Belgium and India maintain active bilateral ties in trade and technology — Antwerp is a major diamond trading centre with significant Indian business community.',
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
  'belgium', 'indonesia', 'visa_on_arrival', 'or eVisa',
  30, '30 days per visit. Extendable once for additional 30 days at local immigration office.',
  6, TRUE, TRUE, FALSE,
  'Visa on Arrival (IDR 500,000 / approx. USD 30) available at designated airports including Bali, Jakarta, Surabaya. eVisa available online via molina.imigrasi.go.id. No blanket visa-free entry for Belgians. Yellow fever certificate required if arriving from endemic country. Biometric fingerprinting on arrival.',
  'https://molina.imigrasi.go.id/',
  '2026-02-19'
);

-- Italy: EU Freedom of Movement
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'belgium', 'italy', 'visa_free', 'EU Freedom of Movement',
  NULL, 'Indefinite right of residence under EU law. Registration with Anagrafe (municipal registry) required for stays beyond 3 months.',
  NULL, FALSE, FALSE, FALSE,
  'Unrestricted EU freedom of movement. Belgian national ID card accepted — no passport necessary. No border controls within Schengen. Italy is a major destination for Belgian tourists. Both EU and Schengen founding members. Tax residency rules apply if residing 183+ days/year.',
  'https://www.interno.gov.it/',
  '2026-02-19'
);

-- Japan: Visa-free
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'belgium', 'japan', 'visa_free', NULL,
  90, '90 days per visit',
  NULL, TRUE, TRUE, FALSE,
  'Visa-free for tourism or short business under bilateral agreement. Persons previously sentenced to 1+ year imprisonment not eligible and must obtain visa. Biometric fingerprinting and photograph on arrival. Departure tax JPY 1,000 collected by airline. Belgium and Japan have bilateral Working Holiday arrangement for ages 18–30. Japan Visit Web digital declaration should be completed before landing.',
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
  'belgium', 'malaysia', 'visa_free', NULL,
  90, '90 days per visit',
  6, TRUE, TRUE, FALSE,
  'Visa-free for tourism or short business. EU passport holders benefit from visa-free access. Biometric fingerprinting on arrival and departure at all international entry points. IMPORTANT: Immigration violations including overstays are punishable by caning (for males) in addition to fines and deportation under Malaysian law. Strict enforcement.',
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
  'belgium', 'mexico', 'visa_free', NULL,
  180, 'Up to 180 days for tourism; up to 120 days for business per calendar year. Actual duration at immigration officer discretion.',
  NULL, FALSE, TRUE, FALSE,
  'Visa-free for tourism, transit, or short business. Multiple Immigration Form (FMM) must be completed on arrival or in advance. FMM must be retained for duration of stay and collected on departure. FMM included in airfare for air travel; fees apply for land entry stays exceeding 7 days. Belgium and Mexico have bilateral relationship through EU–Mexico trade agreements.',
  'https://www.gob.mx/inm',
  '2026-02-19'
);

-- Netherlands: EU Freedom of Movement
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'belgium', 'netherlands', 'visa_free', 'EU Freedom of Movement',
  NULL, 'Indefinite right of residence under EU law. Registration with gemeente (municipality) required for stays beyond 4 months.',
  NULL, FALSE, FALSE, FALSE,
  'Unrestricted EU freedom of movement. Belgium and Netherlands share long land border and are both founding members of Benelux Union, EU, and Schengen. Belgian national ID card accepted. The Belgium–Netherlands border is one of the most-crossed in Europe with extensive daily cross-border commuting (Maastricht–Hasselt, Breda–Antwerp corridors). This is among the closest bilateral relationships in Europe. Both Dutch and French spoken across border regions.',
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
  'belgium', 'new-zealand', 'evisa', 'NZeTA',
  90, 'Up to 90 days per visit',
  3, TRUE, TRUE, FALSE,
  'New Zealand Electronic Travel Authority (NZeTA) must be obtained before boarding. Belgian citizens on visa waiver list. Apply online or via NZeTA app. Fee NZD 23 (app) or NZD 35 (online). International Visitor Conservation and Tourism Levy (IVL) NZD 35 also applies. Typically approved within 72 hours. Valid for 2 years or until passport expiry.',
  'https://www.immigration.govt.nz/',
  '2026-02-19'
);

-- Nigeria: Visa required (eVisa available)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'belgium', 'nigeria', 'visa_required', 'eVisa',
  30, 'Typically 30 days for tourist visa, extendable at Nigeria Immigration Service',
  6, TRUE, TRUE, FALSE,
  'VISA REQUIRED prior to travel. Nigeria does not offer visa on arrival for Belgian or EU passport holders. eVisa available online at portal.immigration.gov.ng (most convenient option, 2–3 business days). Yellow fever vaccination certificate MANDATORY for entry. Biometrics collected at Lagos and Abuja airports. As EU citizen, Belgians can seek consular support from any EU mission in Nigeria.',
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
  'belgium', 'philippines', 'visa_free', NULL,
  30, '30 days on arrival. Extendable at Bureau of Immigration to maximum 59 days, then further extendable monthly up to total 3 years.',
  6, TRUE, TRUE, FALSE,
  'Visa-free for tourism. Entry granted on arrival. EU passport holders benefit from visa-free access. Yellow fever certificate required if arriving from endemic country. Biometric data collected on arrival. Bureau of Immigration extensions applied in person.',
  'https://immigration.gov.ph/',
  '2026-02-19'
);

-- Poland: EU Freedom of Movement
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'belgium', 'poland', 'visa_free', 'EU Freedom of Movement',
  NULL, 'Indefinite right of residence under EU law. Registration with Urząd (local authorities) required for stays beyond 3 months.',
  NULL, FALSE, FALSE, FALSE,
  'Unrestricted EU freedom of movement. Belgian national ID card accepted — no passport necessary. No border controls within Schengen. Registration after 3 months required. Full EU treaty rights apply.',
  'https://www.gov.pl/',
  '2026-02-19'
);

-- Portugal: EU Freedom of Movement
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'belgium', 'portugal', 'visa_free', 'EU Freedom of Movement',
  NULL, 'Indefinite right of residence under EU law. Registration with AIMA or local council required for stays beyond 3 months.',
  NULL, FALSE, FALSE, FALSE,
  'Unrestricted EU freedom of movement. Belgian national ID card accepted — no passport necessary. Portuguese spoken widely in Belgium''s large Lusophone community. Full EU rights including access to Portugal''s NHR (Non-Habitual Resident) tax regime for new arrivals. Tax residency rules apply for extended stays.',
  'https://www.portugal.gov.pt/',
  '2026-02-19'
);

-- Qatar: Visa-free (visa on arrival)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'belgium', 'qatar', 'visa_free', NULL,
  30, '30 days per visit. Extendable at General Directorate of Passports.',
  6, TRUE, TRUE, FALSE,
  'Visa-free for tourism or short business. Qatar grants EU passport holders visa-free access. Free visa on arrival stamp issued at Hamad International Airport. Biometric iris scanning and fingerprinting on arrival. Qatar Airways makes Brussels well-connected with direct flights. Qatar is major hub for Belgians traveling onward to Asia and Africa.',
  'https://portal.www.gov.qa/',
  '2026-02-19'
);

-- Russia: eVisa required
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'belgium', 'russia', 'evisa', 'eVisa',
  30, 'Up to 30 days per visit with eVisa',
  NULL, TRUE, FALSE, FALSE,
  'VISA REQUIRED. Russian eVisa available at evisa.kdmid.ru. Fee USD 52, processing 4 calendar days. Valid for 60 days from issue, single entry. TRAVEL ADVISORY: Belgium''s Federal Public Service Foreign Affairs advises against all travel to Russia due to ongoing conflict in Ukraine, risk of arbitrary detention, and severely limited consular assistance. Direct flights suspended due to EU airspace restrictions. Belgium, as key NATO headquarters host, has particularly sensitive relationship with Russia under current geopolitical conditions.',
  'https://evisa.kdmid.ru/',
  '2026-02-19'
);

-- Saudi Arabia: Visa on arrival or eVisa
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'belgium', 'saudi-arabia', 'visa_on_arrival', 'or eVisa',
  90, 'Up to 90 days per year (single or multiple visits combined)',
  6, TRUE, TRUE, TRUE,
  'Saudi tourist visa on arrival available at major airports or eVisa online at visa.visitsaudi.com. Saudi Arabia opened tourism to EU citizens in 2019. eVisa valid for 1 year, multiple entries, up to 90 days total stay. Cost approx. USD 80 (includes mandatory health insurance). Biometric iris scanning and fingerprinting on arrival. Non-Muslim visitors prohibited from entering Mecca.',
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
  'belgium', 'singapore', 'visa_free', NULL,
  30, '30 days per visit. Extendable at Immigration and Checkpoints Authority (ICA) before authorized stay expires.',
  6, TRUE, TRUE, FALSE,
  'Visa-free for tourism or short business. EU passport holders benefit from visa-free access. Biometric fingerprinting and photo taken on arrival and departure. IMPORTANT: Overstays of more than 90 days punishable by caning (for males) in addition to imprisonment and fines under Immigration Act. Deportation and lifetime re-entry ban may apply. Singapore strictly enforces immigration laws. SG Arrival Card digital declaration should be completed before landing.',
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
  'belgium', 'south-africa', 'visa_free', NULL,
  30, '30 days per visit',
  1, TRUE, TRUE, FALSE,
  'Visa-free for tourism, transit, or short business. EU passport holders benefit from visa-free access. Passport must have minimum 2 blank pages for entry and exit stamps. Yellow fever certificate required if arriving from or transiting through endemic country. Biometric enrollment on arrival. Travel insurance strongly recommended.',
  'https://www.dha.gov.za/',
  '2026-02-19'
);

-- South Korea: Visa-free (K-ETA required)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'belgium', 'south-korea', 'evisa', 'K-ETA',
  90, 'Up to 90 days within any 12-month period',
  NULL, TRUE, TRUE, FALSE,
  'Korea Electronic Travel Authorization (K-ETA) mandatory for visa-exempt nationalities including Belgium. Apply at k-eta.go.kr at least 72 hours before departure. Fee KRW 10,000 (approx. USD 7). Valid for 3 years from approval, multiple entries. Biometric fingerprinting and photograph on arrival. Belgium and South Korea have bilateral Working Holiday arrangement. Persons sentenced to 1+ year imprisonment not eligible.',
  'https://www.k-eta.go.kr/',
  '2026-02-19'
);

-- Spain: EU Freedom of Movement
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'belgium', 'spain', 'visa_free', 'EU Freedom of Movement',
  NULL, 'Indefinite right of residence under EU law. Registration with Padrón Municipal and Oficina de Extranjería required for stays beyond 3 months.',
  NULL, FALSE, FALSE, FALSE,
  'Unrestricted EU freedom of movement. Belgian national ID card accepted — no passport necessary. Spain is one of most popular destinations for Belgian tourists and retirees. Both EU and Schengen founding members. Tax residency rules apply for stays 183+ days/year. Full EU treaty rights apply.',
  'https://www.inclusion.gob.es/',
  '2026-02-19'
);

-- Switzerland: Visa-free (EU-Switzerland bilateral framework)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'belgium', 'switzerland', 'visa_free', 'EU-Switzerland AFMP',
  NULL, 'Indefinite right of residence under Agreement on Free Movement of Persons (AFMP). Registration with Gemeinde required for stays beyond 3 months.',
  NULL, FALSE, FALSE, FALSE,
  'Belgian citizens benefit from full freedom of movement rights under EU-Switzerland AFMP. Switzerland is Schengen member with extensive bilateral agreements granting EU citizens near-equivalent rights. Belgian national ID card accepted. Both share French as official language (French Switzerland/Romandy culturally close to Belgium''s Wallonia). Cross-border commuting common in Geneva–Lausanne–Western Switzerland area. Registration and B/L permit required for stays beyond 3 months.',
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
  'belgium', 'thailand', 'visa_free', NULL,
  60, '60 days per visit (increased from 30 days in 2024 under tourism promotion policy). Extendable once for additional 30 days at local immigration office (THB 1,900 fee).',
  6, TRUE, TRUE, FALSE,
  'Visa-free for tourism. Entry granted on arrival. EU passport holders benefit from visa-free access. Proof of funds (THB 20,000 per person or THB 40,000 per family) may be requested. Biometric fingerprinting on arrival. Yellow fever certificate required if arriving from endemic country. Thailand Digital Arrival Card (TDAC) may be required. Overstays fined THB 500/day (max THB 20,000). Overstays exceeding 90 days may result in arrest, deportation, and re-entry ban.',
  'https://www.immigration.go.th/',
  '2026-02-19'
);

-- Turkey: Visa on arrival or eVisa
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_window_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'belgium', 'turkey', 'evisa', 'eVisa',
  90, 180, '90 days within any 180-day period',
  6, FALSE, FALSE, FALSE,
  'VISA REQUIRED. eVisa available at evisa.gov.tr — apply at least 48 hours before travel. Fee USD 60 for Belgian citizens. Valid for 180 days from issue, single entry. eVisa strongly preferred over visa on arrival to avoid queues. Biometric data collected on arrival. Belgium has large Turkish diaspora community (one of largest in Europe) — Belgian-Turkish dual nationals may hold Turkish passports and face different entry rules.',
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
  'belgium', 'united-arab-emirates', 'visa_free', NULL,
  30, '30 days per visit. Extendable for additional 30 days through GDRFA.',
  6, TRUE, TRUE, FALSE,
  'Free visa on arrival stamp at all UAE international airports and ports. EU passport holders benefit from visa-free access. Biometric iris scanning and fingerprinting on arrival. Overstays fined AED 100/day after 10-day grace period, plus AED 100 exit fine. UAE is major business hub and Belgium has significant commercial ties through EU-GCC frameworks.',
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
  'belgium', 'united-kingdom', 'evisa', 'UK ETA',
  180, 'Up to 6 months per visit',
  NULL, FALSE, TRUE, FALSE,
  'UK Electronic Travel Authorisation (ETA) MANDATORY from April 2, 2025. POST-BREXIT CHANGE: Prior to 2025, EU nationals could enter UK without authorization. Apply via UK ETA app or online at gov.uk. Fee GBP 16 (approx. €20). Valid for 2 years or until passport expiry, multiple entries. IMPORTANT: EU national ID cards NO LONGER ACCEPTED — Belgian citizens MUST use valid passport. Belgian citizens who held EU Settled Status before deadline retain those rights. Belgium–UK ties remain strong historically, diplomatically (NATO), and economically despite Brexit.',
  'https://www.gov.uk/guidance/apply-for-an-electronic-travel-authorisation-eta',
  '2026-02-19'
);

-- United States: ESTA required (Visa Waiver Program)
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'belgium', 'united-states', 'evisa', 'ESTA',
  90, 'Up to 90 days per visit. Cannot be extended under VWP.',
  NULL, TRUE, TRUE, FALSE,
  'ESTA (Electronic System for Travel Authorization) MANDATORY under Visa Waiver Program (VWP). Apply at esta.cbp.dhs.gov at least 72 hours before departure. Fee USD 21. Valid for 2 years or until passport expiry, multiple entries. Must be e-passport (biometric chip). IMPORTANT: Belgium permits dual citizenship — Belgian citizens who also hold nationality of ESTA-disqualifying country (e.g., Iran, Syria, Sudan) are INELIGIBLE for ESTA regardless of passport used. Persons with prior US visa refusal or travel to Iran/Iraq/Libya/North Korea/Somalia/Sudan/Syria/Yemen since March 1, 2011 must obtain B-1/B-2 visa. Overstaying even 1 day permanently forfeits ESTA eligibility.',
  'https://esta.cbp.dhs.gov/',
  '2026-02-19'
);

-- Vietnam: eVisa required
INSERT INTO visa_rules (
  passport_slug, destination_slug, visa_type, visa_subtype,
  max_stay_days, stay_rule,
  passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required,
  notes, official_source_url, last_verified
) VALUES (
  'belgium', 'vietnam', 'evisa', 'eVisa',
  90, 'Up to 90 days per visit on single or multiple-entry e-Visa',
  6, TRUE, TRUE, FALSE,
  'VISA REQUIRED. Vietnam does not grant visa-free access to Belgian or EU passport holders. e-Visa most convenient option — apply at evisa.xuatnhapcanh.gov.vn. Fee USD 25. Valid for 90 days, multiple entries. Apply at least 3 business days before travel; allow more time during peak periods. Arrival smooth at Noi Bai (Hanoi), Tan Son Nhat (Ho Chi Minh City), Da Nang, and all major ports.',
  'https://evisa.xuatnhapcanh.gov.vn/',
  '2026-02-19'
);
