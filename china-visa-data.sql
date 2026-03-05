-- China passport visa requirements (42 destinations)
-- Visa-free destinations
INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, max_stay_days, stay_window_days, passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required, notes, last_verified) VALUES
('china', 'argentina', 'visa_free', 30, NULL, 6, true, true, false, 'Bilateral visa-free agreement since 2004. China is Argentina 2nd largest trading partner. Yellow fever certificate if from endemic area.', '2026-02-20'),
('china', 'brazil', 'visa_free', 90, 365, 6, true, true, false, 'Bilateral agreement 2023. China is Brazil largest trading partner. Biometric fingerprinting on arrival.', '2026-02-20'),
('china', 'chile', 'visa_free', 30, NULL, 6, true, true, false, 'Bilateral agreement. China is Chile largest export market (copper/lithium). China-Chile FTA 2006.', '2026-02-20'),
('china', 'colombia', 'visa_free', 90, 180, NULL, true, true, false, 'Bilateral exemption 2016. China is Colombia 2nd largest trading partner.', '2026-02-20'),
('china', 'egypt', 'visa_on_arrival', 30, NULL, 6, true, true, false, 'Visa on arrival at major airports. eVisa also available. Fee USD 25. Yellow fever certificate mandatory.', '2026-02-20'),
('china', 'indonesia', 'visa_free', 30, NULL, 6, true, true, false, 'Bilateral exemption 2024. China is Indonesia largest tourism source. Extendable once for 30 days.', '2026-02-20'),
('china', 'malaysia', 'visa_free', 30, NULL, 6, true, true, false, 'Bilateral exemption Dec 2023. Biometric fingerprinting on arrival. Overstay punishable by caning.', '2026-02-20'),
('china', 'mexico', 'visa_free', 180, NULL, NULL, true, true, false, 'Bilateral agreement 2016. China is Mexico 2nd largest trading partner. Up to 180 days tourism.', '2026-02-20'),
('china', 'philippines', 'visa_free', 30, NULL, 6, true, true, false, 'Bilateral exemption. Extendable to 59 days. South China Sea tensions may affect access.', '2026-02-20'),
('china', 'qatar', 'visa_free', 30, NULL, 6, true, true, false, 'Bilateral 2023. China is Qatar largest LNG buyer. Biometric iris scanning on arrival.', '2026-02-20'),
('china', 'russia', 'visa_free', 90, 180, NULL, true, false, false, 'Individual visa-free since Jan 2024. Registration within 7 days. Chinese now Russia largest tourism source.', '2026-02-20'),
('china', 'saudi-arabia', 'evisa', 90, 365, 6, true, true, true, 'eVisa at visa.visitsaudi.com or visa on arrival. USD 80 including insurance. Valid 1 year multiple entry.', '2026-02-20'),
('china', 'singapore', 'visa_free', 30, NULL, 6, true, true, false, 'Bilateral Feb 2024. Biometric on arrival. Overstay over 90 days punishable by caning.', '2026-02-20'),
('china', 'south-africa', 'visa_free', 30, NULL, 1, true, true, false, 'Bilateral 2024 during BRICS summit. China is South Africa largest trading partner. BRICS partners.', '2026-02-20'),
('china', 'thailand', 'visa_free', 60, NULL, 6, true, true, false, 'Bilateral March 2024. Extendable once 30 days. Chinese visitors 25-30% of all foreign tourists.', '2026-02-20'),
('china', 'united-arab-emirates', 'visa_free', 30, NULL, 6, true, true, false, 'Bilateral July 2023. UAE first Gulf state with visa-free for Chinese. Extendable 30 days. Biometric on arrival.', '2026-02-20'),
('china', 'vietnam', 'visa_free', 15, NULL, 6, true, true, false, '15 days only. Bilateral Aug 2023. For longer stays use eVisa USD 25 for 90 days. Share 1281km border.', '2026-02-20');

-- Schengen visa required (17 destinations)
INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, visa_subtype, max_stay_days, stay_window_days, passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required, notes, last_verified) VALUES
('china', 'austria', 'visa_required', 'Schengen Type C', 90, 180, 3, true, true, true, 'Apply at Austrian Embassy Beijing or VFS Global. Processing 10-15 days. Fee 80 EUR. EES active Oct 2025.', '2026-02-20'),
('china', 'belgium', 'visa_required', 'Schengen Type C', 90, 180, 3, true, true, true, 'Apply at Belgian Embassy Beijing or VFS Global. Brussels common for government/business delegations.', '2026-02-20'),
('china', 'croatia', 'visa_required', 'Schengen Type C', 90, 180, 3, true, true, true, 'Joined Schengen Jan 2023. Valid Schengen visa from another state works. Dubrovnik/Dalmatian coast popular.', '2026-02-20'),
('china', 'czech-republic', 'visa_required', 'Schengen Type C', 90, 180, 3, true, true, true, 'Apply at Czech Embassy Beijing or VFS Global. Prague popular. Active investment ties with China.', '2026-02-20'),
('china', 'france', 'visa_required', 'Schengen Type C', 90, 180, 3, true, true, true, 'Highest volume of Chinese Schengen applications. Apply 3+ months advance peak season. Multiple daily direct flights.', '2026-02-20'),
('china', 'germany', 'visa_required', 'Schengen Type C', 90, 180, 3, true, true, true, 'China largest European trading partner. Very high application volume. Frankfurt most common entry point.', '2026-02-20'),
('china', 'greece', 'visa_required', 'Schengen Type C', 90, 180, 3, true, true, true, 'Piraeus port majority-owned by COSCO under Belt and Road Initiative. Athens/Santorini/Mykonos popular.', '2026-02-20'),
('china', 'hungary', 'visa_required', 'Schengen Type C', 90, 180, 3, true, true, true, 'China closest EU diplomatic partner. BYD/CATL/Huawei major operations. Despite closeness, no visa-free.', '2026-02-20'),
('china', 'italy', 'visa_required', 'Schengen Type C', 90, 180, 3, true, true, true, 'Largest Chinese diaspora in continental Europe. Was first G7 in BRI 2019, withdrew 2023. Rome/Venice/Florence popular.', '2026-02-20'),
('china', 'netherlands', 'visa_required', 'Schengen Type C', 90, 180, 3, true, true, true, 'Amsterdam Schiphol major transit hub. KLM longest-running Europe-China route. ASML dispute not affecting visas.', '2026-02-20'),
('china', 'poland', 'visa_required', 'Schengen Type C', 90, 180, 3, true, true, true, 'Growing Chinese logistics investment. Huawei/Alibaba European operations. NATO member cautious on Chinese tech.', '2026-02-20'),
('china', 'portugal', 'visa_required', 'Schengen Type C', 90, 180, 3, true, true, true, 'Chinese historically largest Golden Visa nationality. Property route closed 2023. Cultural ties via Macau SAR.', '2026-02-20'),
('china', 'spain', 'visa_required', 'Schengen Type C', 90, 180, 3, true, true, true, 'One of most popular Chinese destinations. Barcelona/Madrid/Balearic Islands. Mandarin signage in tourist zones.', '2026-02-20'),
('china', 'switzerland', 'visa_required', 'Schengen Type C', 90, 180, 3, true, true, true, 'China-Switzerland FTA 2014 first with continental Europe. WEF Davos attended by senior Chinese leaders annually.', '2026-02-20');

-- Full visa required
INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, visa_subtype, max_stay_days, passport_validity_months, return_ticket_required, sufficient_funds_required, insurance_required, notes, last_verified) VALUES
('china', 'australia', 'visa_required', 'Visitor visa subclass 600', 90, 6, true, true, false, 'NO ETA/eVisitor for Chinese. Full application via ImmiAccount or VFS Global. Processing 4-8 weeks. 3rd largest Chinese diaspora 1.3M.', '2026-02-20'),
('china', 'canada', 'visa_required', 'Temporary Resident Visa TRV', 180, NULL, true, true, false, 'NO eTA for Chinese. Apply via IRCC or VFS Global. Biometric required. Processing 4-12 weeks. 2nd largest diaspora 1.7M.', '2026-02-20'),
('china', 'india', 'evisa', 'e-Tourist Visa complications', 30, 6, true, true, false, 'Processing complicated by 2020 Galwan border clash. Additional scrutiny. Verify current status before booking. LAC dispute unresolved.', '2026-02-20'),
('china', 'japan', 'visa_required', 'eVisa or consular', 30, NULL, true, true, false, 'eVisa available at evisa.mofa.go.jp. Processing 3-5 days. China was Japan largest tourism source pre-COVID. Senkaku/Diaoyu tensions.', '2026-02-20'),
('china', 'new-zealand', 'visa_required', 'Visitor visa', 270, 3, true, true, false, 'NO NZeTA for Chinese. Full application immigration.govt.nz. Processing 3-5 weeks. NZ-China FTA 2008 first with developed country.', '2026-02-20'),
('china', 'nigeria', 'visa_required', 'eVisa', 30, 6, true, true, false, 'eVisa at portal.immigration.gov.ng. Processing 2-5 days. Yellow fever mandatory. Nigeria largest Chinese investment in Africa.', '2026-02-20'),
('china', 'south-korea', 'visa_required', 'C-3 visitor visa', 90, NULL, true, true, false, 'Limited group tour exemption Sept 2025-June 2026 NOT for individuals. Individual travelers need C-3 visa. Pre-COVID largest source.', '2026-02-20'),
('china', 'turkey', 'evisa', 'eVisa', 30, 6, true, true, false, 'eVisa at evisa.gov.tr. Apply 48 hours before. Fee USD 60. Valid 180 days single entry. Istanbul major transit hub.', '2026-02-20'),
('china', 'united-kingdom', 'visa_required', 'Standard Visitor Visa', 180, NULL, true, true, false, 'NO eTA for Chinese. Full application via TLScontact. Processing 3-4 weeks. 150k+ Chinese students largest nationality. Priority service available.', '2026-02-20'),
('china', 'united-states', 'visa_required', 'B-1/B-2 nonimmigrant', 180, 6, true, true, false, 'NOT in VWP. DS-160 then in-person interview. Fee USD 185. 10-year multiple-entry standard. 250-300k Chinese students. Increased scrutiny since 2018.', '2026-02-20');
