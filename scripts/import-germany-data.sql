-- Import comprehensive Germany passport visa data
-- This script imports detailed travel information for German passport holders

INSERT INTO visa_pair_content (
  passport_slug, destination_slug, entry_visa_pathway, entry_visa_summary,
  entry_visa_max_stay, entry_visa_pre_auth, entry_conditions_summary,
  long_stay_summary, compliance_summary, logistics_summary
)
VALUES
  -- Chile
  ('germany', 'chile', 'Visa-free entry',
   'German citizens do not require a visa to enter Chile for tourism or short business visits. Chile has visa-exemption agreements with all EU member states and grants German nationals visa-free access for short stays. No pre-registration or electronic travel authorisation is required. Germany has notable historical ties to Chile — a large German-Chilean community exists in the Los Lagos and Araucanía regions (Valdivia, Puerto Montt, Frutillar), descended from 19th-century settlers.',
   'Up to 90 days per entry. Extensions may be requested from the Departamento de Extranjería y Migración.',
   'None. A Tourist Card (Tarjeta de Turismo) is issued on arrival free of charge and must be retained for exit stamping.',
   'Passport valid for at least 6 months beyond the date of arrival. Return or onward ticket and proof of funds may be checked. The Tourist Card issued on arrival must be kept and surrendered on departure. Chile''s PDI (Policía de Investigaciones) manages immigration at Arturo Merino Benítez International Airport (SCL). No visa stamp required — entry stamp or digital record issued on arrival.',
   'For stays exceeding 90 days or for employment/study, a temporary residency visa (Visado de Residencia Temporaria) must be obtained from the Departamento de Extranjería y Migración. Germany and Chile have a bilateral social security agreement. The German-Chilean community (approximately 500,000 people of German descent) is particularly concentrated in the southern lake district — cultural institutions and German-language media still active.',
   'Overstaying the 90-day visa-free period results in a fine (multa) payable at the PDI border post upon departure. The amount increases with the duration of overstay. Repeat offenders may face entry bans. Chile''s exit records are matched to entry records to detect overstays.',
   'No visa required. Direct Lufthansa and LATAM flights from Frankfurt (FRA) to Santiago SCL (approximately 14–15 hours with connection, or via Madrid). Chile is a popular destination for German adventure travellers (Atacama Desert, Patagonia, Lake District). Currency: Chilean Peso (CLP). Spanish is the official language; German spoken in some communities in the south. Time zone: UTC-3 to UTC-4.'),

  -- China
  ('germany', 'china', 'Visa-free entry (extended through December 31, 2026)',
   'German citizens benefit from China''s expanded visa-free policy, which has been extended through December 31, 2026. Ordinary German passport holders may enter China without a visa for stays of up to 30 days for purposes including tourism, business, family visits, exchanges, and transit. This policy was introduced in November 2023 for several European countries including Germany and has been progressively extended. Additionally, China operates a 240-hour (10-day) visa-free transit policy at designated ports for travellers with onward tickets to a third country or region.',
   'Up to 30 days per entry under the visa-free policy. The 240-hour transit exemption allows up to 10 days in designated areas.',
   'None for stays up to 30 days. Travellers must hold an ordinary German passport valid for at least 3 months beyond the intended period of stay. An onward/return ticket and proof of accommodation are typically checked at immigration. For the 240-hour transit, an onward ticket to a third country is required.',
   'Passport valid for at least 3 months beyond intended stay. Return/onward ticket and proof of accommodation required. Biometric data (fingerprints and photo) collected on arrival. All travellers must complete an electronic arrival card (introduced November 2024) before or upon arrival. Tibet Autonomous Region requires a separate Tibet Travel Permit (TTB) regardless of visa status — apply through a licensed Chinese travel agency.',
   'Stays beyond 30 days require a Chinese visa applied for at the Chinese Embassy in Berlin or consulates in Frankfurt, Hamburg, Munich, or Düsseldorf. Standard tourist visa (L-type): 30 or 60 days, single or multiple entry. Business visa (M-type), student visa (X-type), and work visa (Z-type) are available. Germany is one of China''s most important European trade partners — significant German business community in Shanghai, Beijing, and Guangzhou.',
   'Overstaying in China carries severe penalties: fines of 500 RMB per day (up to 10,000 RMB), detention, and deportation. Overstays are tracked by the Public Security Bureau (PSB). Foreign nationals are required to register their address with the PSB within 24 hours of arrival (hotels register automatically; private accommodation requires personal registration). Failure to register is a separate violation.',
   'No visa required for stays up to 30 days (policy valid through December 31, 2026 — verify before travel). For longer stays, apply at the Chinese Embassy in Berlin or consulates in Frankfurt, Hamburg, Munich, or Düsseldorf. Direct Lufthansa, Air China, and China Eastern flights from Frankfurt (FRA) and Munich (MUC) to Beijing (PEK/PKX) and Shanghai (PVG). Flying time: approximately 10–11 hours direct. Germany is China''s largest European trade partner. Currency: Chinese Yuan/Renminbi (CNY/RMB). VPN use is technically illegal but widely tolerated for foreigners.'),

  -- Colombia
  ('germany', 'colombia', 'Visa-free entry',
   'German citizens do not require a visa to enter Colombia for tourism or short business stays. Colombia grants visa-free access to citizens of EU member states including Germany. No pre-registration or electronic travel authorisation is required. Colombia has been actively promoting tourism and has simplified entry procedures for European visitors.',
   'Up to 90 days per entry. Extensions of up to 90 additional days may be requested from Migración Colombia, for a maximum of 180 days in any 365-day period.',
   'None. Valid German passport (6 months validity recommended), return/onward ticket, proof of accommodation and sufficient funds typically checked on arrival.',
   'Passport valid for at least 6 months beyond the date of entry. Return/onward ticket required. Proof of sufficient funds (approx. USD 30/day or credit card evidence) may be checked by immigration officers. Colombia''s Migración Colombia manages border controls. Entry stamp or digital record issued on arrival at Bogotá El Dorado (BOG), Medellín (MDE/EOH), Cartagena (CTG), or other international ports.',
   'For stays beyond 180 days or for work/study, a Colombian Migrant (M) visa or Resident (R) visa is required. The Digital Nomad visa (Nómada Digital) and Pensioner visa (Pensionado) are available options for long-stay German visitors. Applications are made online via cancilleria.gov.co.',
   'Overstaying beyond the authorised period (up to 180 days total) results in daily fines (multas) levied by Migración Colombia, payable at the airport upon departure. Continued overstay can lead to deportation. Colombia tracks entries and exits through the SIRE system.',
   'No visa required. Flights from Frankfurt (FRA) to Bogotá El Dorado (BOG) typically involve one connection (Madrid, Amsterdam, or Miami). Flying time approximately 12–14 hours with stop. Bogotá, Medellín, and Cartagena are growing destinations for German travellers. Currency: Colombian Peso (COP). Spanish is the official language. Time zone: UTC-5 (no daylight saving).')

ON CONFLICT (passport_slug, destination_slug) DO UPDATE SET
  entry_visa_pathway = EXCLUDED.entry_visa_pathway,
  entry_visa_summary = EXCLUDED.entry_visa_summary,
  entry_visa_max_stay = EXCLUDED.entry_visa_max_stay,
  entry_visa_pre_auth = EXCLUDED.entry_visa_pre_auth,
  entry_conditions_summary = EXCLUDED.entry_conditions_summary,
  long_stay_summary = EXCLUDED.long_stay_summary,
  compliance_summary = EXCLUDED.compliance_summary,
  logistics_summary = EXCLUDED.logistics_summary,
  updated_at = now();
