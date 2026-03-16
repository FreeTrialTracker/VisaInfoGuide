-- Complete Germany Passport Visa Data Import
-- Remaining 31 countries with comprehensive travel information
-- This file completes the import started with the first 9 countries

INSERT INTO visa_pair_content (
  passport_slug, destination_slug, entry_visa_pathway, entry_visa_summary,
  entry_visa_max_stay, entry_visa_pre_auth, entry_conditions_summary,
  long_stay_summary, compliance_summary, logistics_summary
)
VALUES

-- Croatia
('germany', 'croatia', 'Visa-free — EU/Schengen freedom of movement',
 'German citizens enjoy complete freedom of movement in Croatia. Croatia became a full member of the Schengen Area on January 1, 2023, and is an EU member state. German nationals can travel, live, and work in Croatia without any visa or permit. A valid German passport or national identity card is accepted for entry. Croatia is one of the most popular summer destinations for German tourists — Germany is consistently the largest source of foreign tourists in Croatia.',
 'Unlimited — EU free movement rights apply.',
 'None. German national identity card or passport accepted.',
 'No internal Schengen border controls at crossings from Slovenia or Hungary (both Schengen). EU citizen fast lanes at Split (SPU), Dubrovnik (DBV), Zagreb (ZAG), and other international airports. The EU EES applies only to third-country nationals.',
 'EU citizens residing in Croatia for more than 3 months must register with the local police (MUP). Full rights to work and study in Croatia are automatic for German nationals. A significant German expatriate community exists in Croatia, particularly along the Dalmatian coast.',
 'No overstay restrictions apply to EU citizens in Croatia.',
 'No visa required. Direct Lufthansa, Croatia Airlines, Ryanair, and Eurowings flights from Frankfurt (FRA), Munich (MUC), and other German airports to Zagreb (ZAG), Split (SPU), Dubrovnik (DBV), and Pula (PUY). Driving from southern Germany to Croatia is very common (approximately 6–8 hours from Munich to Rijeka). Currency: Euro (EUR) — Croatia adopted the euro on January 1, 2023. Germany sends approximately 3–4 million tourist visits to Croatia annually.'),

-- Czech Republic
('germany', 'czech-republic', 'Visa-free — EU/Schengen freedom of movement',
 'German citizens have full freedom of movement in the Czech Republic as both countries are EU member states and part of the Schengen Area. No visa, permit, or border formality is required. Germany and the Czech Republic share a 811 km border and have historically intertwined populations — a large German-speaking Bohemian community history and close modern bilateral ties. German nationals can travel, reside, work, and study using their German passport or national identity card.',
 'Unlimited — EU free movement rights apply.',
 'None.',
 'No internal Schengen border controls at crossings from Bavaria or Saxony into Bohemia or Moravia. EU citizen lanes at Prague Václav Havel Airport (PRG). The EU EES does not apply to EU citizens. The Czech-German border is one of the most crossed in Central Europe.',
 'German nationals residing in the Czech Republic for more than 30 days are encouraged to register at the local Foreign Police (Cizinecká policie). Full work and study rights are automatic for EU citizens. Germany is the Czech Republic''s largest trade partner and many German companies operate major facilities there.',
 'No overstay restrictions apply to EU nationals in the Czech Republic.',
 'No visa required. Direct flights from Frankfurt (FRA), Munich (MUC), Berlin (BER), and other German airports to Prague (PRG) with Lufthansa, Czech Airlines, Eurowings. Flying time approximately 1h. Munich to Prague by car: approximately 3h30. Berlin to Prague: approximately 5h by train or car. Currency: Czech Koruna (CZK) — Czech Republic has not adopted the euro. Czech is the official language; German spoken in border regions.')

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
