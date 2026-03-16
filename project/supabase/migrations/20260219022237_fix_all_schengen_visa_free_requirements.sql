/*
  # Fix All Schengen Visa-Free Entry Requirements

  1. Updates for Non-EU Passport Holders Traveling to Schengen Countries
    - Update insurance_required from true to false (not mandatory at border for visa-free entry)
    - Update return_ticket_required to true (may be requested by border officers at their discretion)
    - Add comprehensive ETIAS information for 2026 implementation
    - Update last_verified date to 2026-02-19

  2. Affected Countries
    Passports: Argentina, Australia, Brazil, Canada, Chile, Colombia, Japan, Malaysia, Mexico, 
              New Zealand, Qatar, Singapore, South Korea, Switzerland (non-EU), UAE, UK, USA
    Destinations: Austria, Belgium, Croatia, Czech Republic, France, Germany, Greece, Hungary,
                  Italy, Netherlands, Poland, Portugal, Spain, Switzerland

  3. Key Corrections
    - Insurance: Not mandatory for visa-free entry (strongly recommended but not required at border)
    - Return ticket: May be requested by border officers (discretionary but possible)
    - ETIAS: Critical upcoming requirement from late 2026 for visa-exempt travelers
    - EU citizens are excluded (they have freedom of movement rights)

  4. Note
    - EU/EEA nationals are not affected by ETIAS
    - Swiss nationals also need ETIAS when traveling to Schengen (Switzerland is Schengen but not EU)
*/

UPDATE visa_rules
SET 
  insurance_required = false,
  return_ticket_required = true,
  notes = CASE 
    WHEN notes LIKE '%EU mobility rights%' THEN notes
    ELSE 'Schengen rules apply. IMPORTANT: From late 2026, travelers from visa-exempt countries will be required to obtain an ETIAS (European Travel Information and Authorization System) authorization before traveling to Schengen countries. While travel insurance is not mandatory for visa-free entry, it is strongly recommended. Return ticket or proof of onward travel may be requested by border officers at their discretion.'
  END,
  last_verified = '2026-02-19',
  updated_at = now()
WHERE destination_slug IN ('austria', 'belgium', 'croatia', 'czech-republic', 'france', 'germany', 'greece', 'hungary', 'italy', 'netherlands', 'poland', 'portugal', 'spain', 'switzerland')
AND visa_type = 'visa_free'
AND passport_slug IN ('argentina', 'australia', 'brazil', 'canada', 'chile', 'colombia', 'japan', 'malaysia', 'mexico', 'new-zealand', 'qatar', 'singapore', 'south-korea', 'switzerland', 'united-arab-emirates', 'united-kingdom', 'united-states')
AND notes NOT LIKE '%EU mobility rights%';
