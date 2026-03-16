/*
  # Seed research article sections

  Inserts content sections for all 6 research articles.
  Each section maps to an H2 block with optional subsections.
*/

DO $$
DECLARE
  v_most_powerful uuid;
  v_schengen uuid;
  v_visa_types uuid;
  v_passport_validity uuid;
  v_onward uuid;
  v_asia uuid;
BEGIN
  SELECT id INTO v_most_powerful FROM research_articles WHERE slug = 'most-powerful-passports-2026';
  SELECT id INTO v_schengen FROM research_articles WHERE slug = 'schengen-90-180-rule-explained';
  SELECT id INTO v_visa_types FROM research_articles WHERE slug = 'visa-free-vs-visa-on-arrival-vs-evisa';
  SELECT id INTO v_passport_validity FROM research_articles WHERE slug = 'passport-validity-rules-by-country';
  SELECT id INTO v_onward FROM research_articles WHERE slug = 'onward-ticket-requirements-by-country';
  SELECT id INTO v_asia FROM research_articles WHERE slug = 'best-passports-for-visa-free-travel-in-asia-2026';

  -- most-powerful-passports-2026 sections
  INSERT INTO research_article_sections (article_id, sort_order, heading, body, subsections, table_data) VALUES
  (v_most_powerful, 1, '2026 Global Passport Power Rankings',
    'Passport power is measured by the number of destinations a passport holder can access without obtaining a visa in advance. This includes visa-free entry, visa-on-arrival, and electronic visa (eVisa) arrangements. Our 2026 rankings are based on comprehensive visa requirement data across 195+ countries and territories worldwide.',
    '[
      {"heading": "Visa-Free Entry", "body": "Passport holders can enter the destination country without any visa, typically just by presenting their passport at immigration. This is the strongest form of travel freedom and typically reflects close diplomatic ties and reciprocity agreements."},
      {"heading": "Visa on Arrival (VoA)", "body": "Travelers can obtain a visa upon landing at the destination airport or border crossing without prior application. While this counts toward mobility scores, it often involves fees and waiting time."},
      {"heading": "Electronic Visa (eVisa)", "body": "Some countries count eVisa systems in their mobility scores when the process is simple and approval is typically granted within days. Examples include India''s eVisa system and Australia''s ETA program."}
    ]'::jsonb,
    '{"headers": ["Rank", "Country", "Region", "Visa-Free Access"], "rows": [["#1", "Singapore", "Asia", "195"], ["#2", "Japan", "Asia", "193"], ["#3", "Germany", "Europe", "192"], ["#3", "Italy", "Europe", "192"], ["#3", "France", "Europe", "192"], ["#4", "Netherlands", "Europe", "191"], ["#5", "United Kingdom", "Europe", "190"], ["#6", "United States", "North America", "188"], ["#6", "Canada", "North America", "188"], ["#7", "Australia", "Oceania", "187"], ["#8", "Poland", "Europe", "186"], ["#9", "Greece", "Europe", "185"], ["#10", "Croatia", "Europe", "184"]]}'::jsonb
  ),
  (v_most_powerful, 2, 'Regional Passport Power Analysis',
    'Passport strength varies significantly by region, reflecting historical relationships, economic development, political stability, and diplomatic engagement.',
    '[
      {"heading": "Europe: Dominance Through Integration", "body": "European passports, particularly those from Schengen Area countries, consistently rank among the world''s most powerful. German, French, and Italian passports all offer access to 192+ destinations."},
      {"heading": "Asia: Rising Power and Regional Variation", "body": "Asia shows the widest variation in passport power, from Singapore''s #1 ranking to countries with limited access. Singapore and Japan lead globally, benefiting from strong economies and diplomatic influence."},
      {"heading": "Americas: North-South Divide", "body": "US and Canadian passports rank in the top 10 globally, while South American passports vary significantly. Chile leads the region, followed by Argentina and Brazil."},
      {"heading": "Middle East: Rapid Gains", "body": "The UAE has made remarkable progress, entering the top 15 through strategic diplomatic efforts and visa-waiver negotiations. Qatar has also strengthened its passport power."}
    ]'::jsonb,
    '{"headers": ["Region", "Top Passport", "Avg. Score", "Countries"], "rows": [["Europe", "Germany, France, Italy", "188", "27"], ["Asia", "Singapore", "142", "15"], ["North America", "United States, Canada", "185", "3"], ["South America", "Chile", "168", "12"], ["Oceania", "Australia, New Zealand", "187", "14"], ["Africa", "South Africa", "68", "54"], ["Middle East", "UAE", "98", "16"]]}'::jsonb
  ),
  (v_most_powerful, 3, 'Critical Travel Requirements Beyond Visa-Free Access',
    'While visa-free access is important, successful international travel requires understanding several additional requirements that can affect your ability to enter a country.',
    '[
      {"heading": "Passport Validity Requirements", "body": "Most countries require your passport to be valid for a specific period beyond your intended stay, typically 3 or 6 months. Even with visa-free access, immigration officers can deny entry if your passport does not meet validity requirements."},
      {"heading": "Onward Ticket Requirements", "body": "Many countries require proof of onward travel when entering visa-free, especially for tourist entries. Countries like Thailand, Philippines, and Indonesia frequently check for onward tickets."},
      {"heading": "Financial Proof and Accommodation", "body": "Some countries may ask for proof of sufficient funds for your stay and confirmed accommodation, even for visa-free entries. Having bank statements, credit cards, and hotel reservations can prevent entry issues."}
    ]'::jsonb, NULL
  ),
  (v_most_powerful, 4, 'How Countries Negotiate Visa Agreements',
    'Visa-waiver agreements don''t happen by chance. They''re the result of complex diplomatic negotiations based on reciprocity, economic relationships, and mutual assessment of immigration risks.',
    '[
      {"heading": "Reciprocity Principle", "body": "Most visa arrangements are based on reciprocity: Country A grants visa-free access to Country B''s citizens only if Country B does the same. This explains why some wealthy nations have limited passport power."},
      {"heading": "Immigration Risk Assessment", "body": "Countries evaluate the overstay risk, illegal immigration potential, and security concerns before granting visa-free access. Factors include economic development, unemployment rates, and historical immigration patterns."},
      {"heading": "Economic and Political Leverage", "body": "Economic powerhouses and strategically important nations can negotiate favorable visa arrangements. The UAE''s rapid rise demonstrates how targeted diplomatic efforts can dramatically improve passport power."}
    ]'::jsonb, NULL
  ),
  (v_most_powerful, 5, 'Maximizing Your Passport''s Potential',
    'Regardless of your passport''s ranking, you can maximize travel opportunities through careful planning and understanding of visa regulations.',
    '[
      {"heading": "Essential Planning Tips", "body": "Check visa requirements well in advance. Verify passport validity requirements. Ensure blank pages in your passport. Prepare proof of onward travel for visa-free entries. Keep digital and physical copies of important documents."}
    ]'::jsonb, NULL
  );

  -- schengen-90-180-rule-explained sections
  INSERT INTO research_article_sections (article_id, sort_order, heading, body, subsections, table_data) VALUES
  (v_schengen, 1, 'What is the Schengen Area?',
    'The Schengen Area is a zone comprising 27 European countries that have abolished internal border controls, allowing free movement between member states. For travelers, once you enter one Schengen country, you can move freely between all member states without passport checks at internal borders.',
    '[
      {"heading": "Important: Not All EU Countries are in Schengen", "body": "Ireland and Cyprus are EU members but NOT part of the Schengen Area. Time spent there does NOT count toward your 90/180 limit. Conversely, Norway, Iceland, Switzerland, and Liechtenstein are NOT EU members but ARE part of Schengen — time there DOES count."}
    ]'::jsonb, NULL
  ),
  (v_schengen, 2, 'Understanding the 90/180 Rule: How It Actually Works',
    'The 90/180 rule is often misunderstood. It''s NOT "90 days, then leave for 90 days, then return." It''s a rolling calculation that checks whether you''ve spent more than 90 days in the Schengen Area during any 180-day period looking backwards from your current date.',
    '[
      {"heading": "The Rolling Window Concept", "body": "Every single day you''re in the Schengen Area, immigration officials can look back 180 days and count how many days you''ve already spent there. If that count reaches 90 days, you cannot enter or must leave immediately."},
      {"heading": "Calculation Method: Step-by-Step", "body": "Take today''s date. Count back 180 days. Add up all days you spent in the Schengen Area during those 180 days. Subtract that number from 90. The result is how many days you can still spend."}
    ]'::jsonb, NULL
  ),
  (v_schengen, 3, 'Real-World Calculation Examples',
    'Understanding theory is one thing, but seeing real examples helps clarify how the 90/180 rule works in practice.',
    NULL,
    '{"headers": ["Scenario", "Description", "Calculation", "Status"], "rows": [["Simple Single Visit", "Visited Italy March 1-30 (30 days)", "30 days used in any 180-day period — 60 days remaining", "Compliant"], ["Multiple Short Visits", "15 days France (Jan), 20 days Spain (Mar), 25 days Germany (May)", "60 days total — 30 days remaining", "Compliant"], ["Maximum Stay Used", "90 consecutive days in Portugal", "90 days used — must wait 90 days before returning", "Must Exit"], ["Rolling Window Violation", "45+30+25 days in overlapping 180-day window = 100 days", "100 days exceeds 90-day limit", "Violation"]]}'::jsonb
  ),
  (v_schengen, 4, 'How to Track Your Schengen Days',
    'Accurately tracking your Schengen days is essential to avoid overstays. Relying on memory or rough estimates is dangerous.',
    '[
      {"heading": "Official EU Short-Stay Calculator (Recommended)", "body": "The European Commission provides a free online calculator at ec.europa.eu. This is the most authoritative tool and uses the exact algorithm that border officials use."},
      {"heading": "Passport Stamps: The Physical Record", "body": "Your passport stamps are the official proof of your entries and exits. Always ensure you receive entry and exit stamps."},
      {"heading": "Spreadsheet and App Tracking", "body": "Many travelers maintain a simple spreadsheet with columns for entry date, exit date, country, and cumulative days. Several mobile apps also automate this tracking."}
    ]'::jsonb,
    '{"headers": ["Method", "Description", "Accuracy", "Cost"], "rows": [["EU Short-Stay Calculator", "Official online calculator from eu.europa.eu", "High", "Free"], ["Passport Stamps", "Manual tracking via entry/exit stamps", "Medium", "Free"], ["Spreadsheet Tracking", "Self-maintained Excel/Google Sheets", "Medium-High", "Free"], ["Mobile Apps", "Third-party apps like SchengenCalculator", "High", "Free–$10"], ["Professional Service", "Immigration consultant tracking", "Very High", "$50–200/month"]]}'::jsonb
  ),
  (v_schengen, 5, 'Consequences of Overstaying',
    'Overstaying your Schengen allowance is a serious violation with immediate and long-term consequences.',
    '[
      {"heading": "Detection and Enforcement", "body": "Overstays are typically detected at exit when border officials check your entry stamp and calculate your stay. With the upcoming EES electronic system, overstays will be automatically flagged."},
      {"heading": "Entry Bans and Schengen Information System (SIS)", "body": "Serious overstays can result in an entry ban recorded in the SIS, a database shared by all member states. Bans can range from 1–10 years and sometimes longer."}
    ]'::jsonb,
    '{"headers": ["Overstay Length", "Immediate Consequence", "Future Impact"], "rows": [["Minor (1–5 days)", "Warning, possible fine €50–500", "Usually no long-term impact"], ["Moderate (6–30 days)", "Fine €500–1000+, possible ban", "1–3 year entry ban possible"], ["Serious (31–90 days)", "Heavy fines, deportation, ban", "3–5 year entry ban likely"], ["Severe (90+ days)", "Deportation, criminal record, ban", "5–10 year ban, permanent record"]]}'::jsonb
  ),
  (v_schengen, 6, 'Exceptions and Extended Stay Options',
    'While the 90/180 rule is strict, several legal options exist for extending your stay or spending more time in Europe.',
    '[
      {"heading": "National Long-Stay Visas (Type D)", "body": "Each Schengen country issues its own long-stay visas for stays exceeding 90 days, typically for work, study, family reunification, or retirement."},
      {"heading": "Residence Permits", "body": "Residence permits from any Schengen country exempt you from the 90/180 rule in that country. Popular among digital nomads and retirees."},
      {"heading": "Non-Schengen European Countries", "body": "Time spent in Ireland, United Kingdom, Cyprus, Romania, and Bulgaria does NOT count toward your Schengen limit."},
      {"heading": "Balkans and Eastern Europe", "body": "Countries like Albania, Serbia, Montenegro, North Macedonia, and Bosnia offer visa-free or visa-on-arrival access with separate day counts."}
    ]'::jsonb, NULL
  ),
  (v_schengen, 7, 'The Future: Entry/Exit System (EES)',
    'The EU is implementing the Entry/Exit System (EES), an electronic border control system that will replace passport stamps. EES will automatically record all entries and exits with biometric data.',
    '[
      {"heading": "What EES Means for Travelers", "body": "Automatic tracking eliminates manual stamp counting. Real-time compliance checks at entry. Overstay detection is immediate. Once registered, border crossings become faster. It is impossible to hide previous stays."}
    ]'::jsonb, NULL
  );

  -- visa-free-vs-visa-on-arrival-vs-evisa sections
  INSERT INTO research_article_sections (article_id, sort_order, heading, body, subsections, table_data) VALUES
  (v_visa_types, 1, 'Overview: Three Types of Simplified Entry',
    'Modern international travel offers three main categories of simplified entry that don''t require traditional embassy visa applications. Understanding the differences helps you plan effectively, budget correctly, and avoid surprises at immigration.',
    '[
      {"heading": "Visa-Free Entry", "body": "No visa required at all. Simply present your passport at immigration. No cost, no advance paperwork, no processing time. The strongest form of travel freedom."},
      {"heading": "Visa-on-Arrival (VoA)", "body": "A visa is required but can be obtained at the port of entry — airport or land border. Typically costs $20–100 and requires waiting in a queue. Available at arrival, not in advance."},
      {"heading": "Electronic Visa (eVisa)", "body": "Apply online before travel. Typically approved in 1–7 business days. Cost ranges from $10–50. Eliminates airport queues and provides documentation before departure."}
    ]'::jsonb, NULL
  ),
  (v_visa_types, 2, 'Visa-Free Entry: The Gold Standard',
    'True visa-free entry means no visa is required under any circumstances. You simply present your passport at immigration and are admitted, subject to standard entry requirements.',
    '[
      {"heading": "What Visa-Free Actually Means", "body": "While visa-free sounds like no requirements at all, you still must meet passport validity requirements, have proof of onward travel in many countries, show proof of sufficient funds if asked, and have a clean travel history."},
      {"heading": "Most Common Visa-Free Arrangements", "body": "Bilateral reciprocal agreements between countries with similar economic profiles. Regional blocs like the EU Schengen Area, ASEAN, and Mercosur. Commonwealth arrangements for certain passport pairs."}
    ]'::jsonb, NULL
  ),
  (v_visa_types, 3, 'Visa-on-Arrival: Convenience at a Cost',
    'Visa-on-arrival is technically a visa, but one that''s issued at the border rather than requiring advance embassy application. This makes it far more accessible than traditional visas while still maintaining some control.',
    '[
      {"heading": "Practical Considerations", "body": "Always carry cash in USD or local currency for VoA fees — credit cards are not always accepted. Expect queues, especially at busy airports. Processing times vary from minutes to over an hour."},
      {"heading": "Popular VoA Destinations", "body": "Thailand offers VoA for many nationalities. Maldives issues VoA to all visitors. Egypt provides VoA at major airports. Jordan offers VoA at international borders."}
    ]'::jsonb, NULL
  ),
  (v_visa_types, 4, 'eVisa: The Future of Entry Documentation',
    'Electronic visas represent the modernization of immigration systems. Most countries moving toward digital documentation are implementing eVisa systems.',
    '[
      {"heading": "Application Process", "body": "Most eVisa systems require: passport details and photo, travel itinerary details, accommodation confirmation, sometimes a criminal record declaration, and a processing fee paid online."},
      {"heading": "Countries With Strong eVisa Systems", "body": "India''s eVisa covers tourism, business, and medical categories. Kenya issues eVisas for all nationalities. Turkey''s e-Visa is simple and instant for most passports. Australia''s ETA system is highly efficient."}
    ]'::jsonb, NULL
  ),
  (v_visa_types, 5, 'Comparing All Three: When to Use Which',
    'The right type of entry depends on your passport, destination, trip timing, and risk tolerance.',
    '[
      {"heading": "Decision Guide", "body": "Use visa-free entry when available — it''s the simplest option. Prefer eVisa over VoA when available to avoid airport queues. Choose VoA only when eVisa is not available or when last-minute travel makes advance application impossible."},
      {"heading": "Cost Comparison", "body": "Visa-free: $0. eVisa: typically $10–50, applied online. Visa-on-arrival: typically $25–100, paid at the border. Traditional embassy visa: $50–200+, weeks of processing."}
    ]'::jsonb, NULL
  );

  -- passport-validity-rules-by-country sections
  INSERT INTO research_article_sections (article_id, sort_order, heading, body, subsections, table_data) VALUES
  (v_passport_validity, 1, 'Why Passport Validity Matters Beyond the Expiry Date',
    'Most international travelers know to check their passport''s expiry date, but far fewer understand that many countries require additional validity beyond that expiry. This requirement exists because countries want to ensure that if a traveler overstays or has an emergency, their passport remains valid during the process.',
    '[
      {"heading": "Who Enforces Validity Requirements", "body": "Airlines check validity requirements at check-in using systems like TIMATIC. Failing to meet requirements results in denied boarding. Immigration officers verify at arrival. Overstaying with an expiring passport creates serious legal issues."}
    ]'::jsonb, NULL
  ),
  (v_passport_validity, 2, 'The Three Main Validity Rules Explained',
    'There are three primary validity rule types used by countries worldwide.',
    '[
      {"heading": "6-Month Rule (Most Common — 64% of Countries)", "body": "Your passport must be valid for at least 6 months beyond your departure date from the country. Required by most Asian, African, and Middle Eastern countries."},
      {"heading": "3-Month Rule (Schengen & Some Others — 23% of Countries)", "body": "Your passport must be valid for at least 3 months beyond your planned departure from the country. Required by most Schengen Area countries for non-EU visitors."},
      {"heading": "Duration of Stay Rule (Less Common — 13% of Countries)", "body": "Your passport only needs to be valid for the duration of your intended stay. Used by the US, Canada, UK, and a few other countries."}
    ]'::jsonb,
    '{"headers": ["Rule Type", "Countries", "Percentage", "Description"], "rows": [["6-Month Rule", "125", "64%", "Most common requirement globally"], ["3-Month Rule", "45", "23%", "Common in Europe/Schengen"], ["Duration of Stay", "25", "13%", "US, Canada, Mexico, UK"]]}'::jsonb
  ),
  (v_passport_validity, 3, 'Countries With 6-Month Validity Requirements',
    'The following popular destinations require 6 months of passport validity beyond your planned departure date.',
    NULL,
    '{"headers": ["Country", "Validity Rule", "Blank Pages Required", "Notes"], "rows": [["Thailand", "6 months", "2", "Strictly enforced by airlines"], ["Indonesia", "6 months", "2", "Required for visa-free entry"], ["Philippines", "6 months", "2", "Consistently enforced"], ["Malaysia", "6 months", "2", "Airlines check strictly"], ["India", "6 months", "2", "Applies to eVisa holders too"], ["South Africa", "6 months", "2 consecutive", "Must be consecutive blank pages"], ["Brazil", "6 months", "1", "For tourist entry"], ["Egypt", "6 months", "2", "For VoA and pre-arranged visas"]]}'::jsonb
  ),
  (v_passport_validity, 4, 'Schengen Area: The 3-Month Exception',
    'The Schengen Area uses a different standard from most of the world. Rather than 6 months, Schengen countries require your passport to be valid for at least 3 months beyond your planned departure from the Schengen Area. This applies to non-EU/EEA nationals.',
    '[
      {"heading": "Practical Implications", "body": "If your passport expires on September 1, 2026, and you plan to leave Schengen by May 31, 2026, you meet the requirement (3 months after May 31 = August 31). But if you leave June 15, you don''t meet the requirement (June 15 + 3 months = September 15 > September 1)."}
    ]'::jsonb, NULL
  ),
  (v_passport_validity, 5, 'Blank Page Requirements',
    'Beyond validity, many countries require your passport to have a minimum number of blank pages for entry stamps and visas.',
    '[
      {"heading": "Standard Requirements", "body": "Most countries require 1–2 blank pages. The US requires at least one full blank page for entry stamps. South Africa famously requires 2 consecutive blank pages for US visitors. Many countries require 2 pages minimum."},
      {"heading": "When to Renew for Blank Pages", "body": "If you travel frequently and your passport is running low on blank pages, renew before international travel even if the expiry date is years away. Running out of pages can prevent entry or visa issuance."}
    ]'::jsonb, NULL
  );

  -- onward-ticket-requirements-by-country sections
  INSERT INTO research_article_sections (article_id, sort_order, heading, body, subsections, table_data) VALUES
  (v_onward, 1, 'Why Countries Require Onward Tickets',
    'Onward ticket requirements exist because countries want assurance that visitors will leave before their permitted stay expires. It''s a form of immigration control designed to prevent overstays and illegal immigration.',
    '[
      {"heading": "Who Checks Onward Tickets", "body": "Airlines check before boarding under the IATA TIMATIC system, as they are liable for returning inadmissible passengers. Immigration officers check at arrival. The check can happen at check-in, at the gate, or at immigration."}
    ]'::jsonb, NULL
  ),
  (v_onward, 2, 'Countries That Strictly Enforce Onward Tickets',
    'Not all countries check onward tickets with equal rigour. These destinations are known for strict enforcement.',
    NULL,
    '{"headers": ["Country", "Enforcement Level", "Alternatives Accepted", "Notes"], "rows": [["Philippines", "Very High", "Ferry to other islands accepted", "Consistently enforced"], ["New Zealand", "Very High", "Flight to Australia accepted", "Strictly enforced at check-in"], ["Thailand", "High", "Bus/train to neighboring country", "Airlines check rigorously"], ["Indonesia", "High", "Flight to Singapore/Malaysia", "Required for visa-free entry"], ["United Kingdom", "Medium", "Return ticket or onward to EU", "Immigration may ask"], ["United States", "Low-Medium", "Return ticket preferred", "Not routinely checked but possible"]]}'::jsonb
  ),
  (v_onward, 3, 'What Counts as Valid Onward Travel',
    'The definition of "onward travel" varies by country and immigration officer, but generally includes any confirmed transportation that demonstrates you will leave the country.',
    '[
      {"heading": "Accepted Forms", "body": "Confirmed flight tickets (return or onward), confirmed bus or train tickets to another country, confirmed ferry bookings to another country, cruise itinerary showing departure from the country, confirmed multi-destination travel itinerary."},
      {"heading": "Not Always Accepted", "body": "Open-jaw flights (depends on country), unconfirmed reservations or travel intentions, travel agent letters (without booking confirmations), screenshots from booking sites without confirmation numbers."}
    ]'::jsonb, NULL
  ),
  (v_onward, 4, 'Solutions for Travelers Without Onward Tickets',
    'If you''re a long-term traveler, digital nomad, or uncertain about your plans, there are legitimate ways to handle onward ticket requirements.',
    '[
      {"heading": "Refundable Bookings", "body": "Book a refundable flight and cancel after entry. While this costs nothing if cancelled in time, some airlines charge cancellation fees."},
      {"heading": "Onward Ticket Services", "body": "Services like Onward Ticket or Best Onward Ticket provide temporary flight reservations for a small fee ($10–15). These are real bookings held for 24–48 hours."},
      {"heading": "Open-Jaw Itineraries", "body": "Book flights that show you entering one city and exiting another. This demonstrates forward movement even if exact plans are flexible."}
    ]'::jsonb, NULL
  ),
  (v_onward, 5, 'Airline vs. Immigration Enforcement',
    'There are two separate checkpoints where onward tickets may be required: at the airline check-in/gate, and at immigration upon arrival.',
    '[
      {"heading": "Airline Check-in", "body": "Airlines are legally responsible for ensuring passengers meet destination entry requirements. If they board a passenger who is later denied entry, they must pay for the return flight. This makes airlines stricter than immigration in some cases."},
      {"heading": "Immigration at Arrival", "body": "Immigration officers have discretion. They may or may not ask for onward travel proof. Countries known for stricter immigration checks include Philippines, New Zealand, and the UK."}
    ]'::jsonb, NULL
  );

  -- best-passports-for-visa-free-travel-in-asia-2026 sections
  INSERT INTO research_article_sections (article_id, sort_order, heading, body, subsections, table_data) VALUES
  (v_asia, 1, 'Southeast Asia: ASEAN Region Rankings',
    'Southeast Asia is the most visited region in Asia, home to 11 countries with diverse visa policies. The ASEAN bloc has strong internal visa-free policies, but access varies significantly for external passport holders.',
    NULL,
    '{"headers": ["Passport", "Visa-Free (of 11)", "Highlights"], "rows": [["Singapore", "10/11", "Visa-free to all ASEAN plus Japan, South Korea"], ["Japan", "10/11", "Strong access across full ASEAN region"], ["South Korea", "9/11", "Visa-free to most ASEAN, requires visa for Myanmar"], ["Germany", "9/11", "Strong EU passport access across ASEAN"], ["United States", "8/11", "Limited access to Vietnam, Cambodia requires eVisa"], ["United Kingdom", "8/11", "Similar to US, strong in most ASEAN nations"], ["Australia", "7/11", "Solid regional access with ETA options"], ["China", "5/11", "Improving access with new bilateral agreements"], ["India", "4/11", "Visa-free to Maldives, Nepal, Bhutan, Thailand"]]}'::jsonb
  ),
  (v_asia, 2, 'East Asia: China, Japan, South Korea, Taiwan, Hong Kong',
    'East Asia presents unique challenges with China historically requiring visas from most nations. The 2023–2024 visa-free initiative significantly changed the landscape for European and select Asian passport holders.',
    '[
      {"heading": "China''s New Visa-Free Policy", "body": "China extended 30-day visa-free access to citizens of France, Germany, Italy, Netherlands, Spain, Switzerland, Ireland, Hungary, Austria, Belgium, Luxembourg, Malaysia, Singapore, and several others. US and most other nationalities still require visas."}
    ]'::jsonb,
    '{"headers": ["Passport", "Visa-Free (of 5)", "Highlights"], "rows": [["Singapore", "5/5", "Visa-free to Japan, South Korea, Taiwan, Hong Kong, China"], ["Germany", "5/5", "Full access including 30-day visa-free China"], ["France", "5/5", "Full East Asia access including 30-day visa-free China"], ["Japan", "5/5", "Full East Asia access including 30-day visa-free China"], ["United Kingdom", "5/5", "Full East Asia access — China visa-free from Feb 2026"], ["United States", "3/5", "Requires China and Taiwan visas"], ["India", "2/5", "Limited East Asia access overall"]]}'::jsonb
  ),
  (v_asia, 3, 'South Asia: India, Pakistan, Bangladesh, Sri Lanka, Nepal, Bhutan, Maldives, Afghanistan',
    'South Asia presents a complex visa landscape, with significant variation between countries. India is the dominant destination, and its eVisa system has improved access for many nationalities.',
    NULL,
    '{"headers": ["Passport", "Visa-Free (of 8)", "Highlights"], "rows": [["Singapore", "7/8", "Near-complete South Asia access"], ["United States", "6/8", "Strong South Asia access, requires India eVisa"], ["United Kingdom", "6/8", "Good regional access including India eVisa"], ["Japan", "5/8", "Good access but requires visas for key nations"], ["India", "4/8", "Visa-free to Nepal, Bhutan, Maldives, Mauritius"], ["China", "3/8", "Improving but still limited South Asia access"], ["Pakistan", "2/8", "Very restricted South Asia access"]]}'::jsonb
  ),
  (v_asia, 4, 'Central Asia and the Middle East',
    'Central Asian countries like Kazakhstan, Uzbekistan, and Georgia have opened up significantly in recent years, while Middle Eastern countries vary widely in their visa policies.',
    '[
      {"heading": "Central Asia Openings", "body": "Georgia offers visa-free access to most nationalities including the US, EU, UK, and many others for stays of up to 1 year. Kazakhstan and Kyrgyzstan offer visa-free access to many nationalities for 30-day stays."},
      {"heading": "Middle East Complexity", "body": "UAE and Qatar offer visa-on-arrival or visa-free to most Western passport holders. Saudi Arabia has opened for tourism with an eVisa. Israel complicates travel due to diplomatic relations — some countries stamp passports separately."}
    ]'::jsonb, NULL
  ),
  (v_asia, 5, 'How to Plan Your Asia Itinerary Around Visa Requirements',
    'Given the complexity of Asian visa requirements, strategic trip planning can save significant time and money.',
    '[
      {"heading": "Start with Your Visa-Free Countries", "body": "Prioritize destinations where your passport offers visa-free or eVisa access. Book flights to visa-required destinations first to allow processing time."},
      {"heading": "Multiple Entry Strategies", "body": "Consider base country strategies — use visa-free countries like Thailand, Malaysia, or Japan as regional hubs. Return to these countries while waiting for other visas to process."},
      {"heading": "Timing Considerations", "body": "Some visas have validity windows — don''t apply too early. China''s 30-day visa-free policy counts from the day of entry. Plan itineraries to maximize stay durations within policy limits."}
    ]'::jsonb, NULL
  );

END $$;
