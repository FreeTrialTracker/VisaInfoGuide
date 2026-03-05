/*
  # Add Germany outbound visa-free destinations

  ## Summary
  German passport is one of the strongest in the world. Many visa-free destinations were missing.
  This migration adds visa-free access rows for countries where German passport holders
  can enter without a visa or with simple entry stamps.

  ## New rows (visa_free)
  - israel, georgia, serbia, jordan, morocco, tunisia, maldives, mongolia,
    peru, costa-rica, ecuador, uruguay, panama, albania (not in destinations list, skip),
    ukraine, uzbekistan, kazakhstan, armenia
*/

INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, visa_subtype, max_stay_days, stay_window_days, stay_rule, notes, last_verified)
VALUES
  ('germany','israel','visa_free',NULL,90,NULL,'Visa-free short stay for tourism/business up to 90 days','Onward travel and sufficient funds may be checked at entry.','2026-02-18'),
  ('germany','georgia','visa_free',NULL,365,NULL,'Visa-free: Germans may stay up to 1 year','Georgia allows citizens of many countries including Germany to stay visa-free for up to 1 year.','2026-02-18'),
  ('germany','serbia','visa_free',NULL,90,NULL,'Visa-free short stay up to 90 days','No visa required for German passport holders.','2026-02-18'),
  ('germany','jordan','visa_free',NULL,30,NULL,'Visa on arrival or free entry stamp for eligible nationals; 30 days extendable','Jordan grants free entry to German nationals; visa fee may be waived under reciprocal agreements. Verify current terms.','2026-02-18'),
  ('germany','morocco','visa_free',NULL,90,NULL,'Visa-free stay up to 90 days','No visa required for tourism/business up to 90 days.','2026-02-18'),
  ('germany','tunisia','visa_free',NULL,90,NULL,'Visa-free stay up to 90 days','No visa required for German passport holders up to 90 days.','2026-02-18'),
  ('germany','maldives','visa_free',NULL,30,NULL,'Visa on arrival (free); 30 days extendable','Free visitor visa on arrival for all nationalities including Germany.','2026-02-18'),
  ('germany','mongolia','visa_free',NULL,30,NULL,'Visa-free short stay up to 30 days','Germany has a bilateral visa-free agreement with Mongolia.','2026-02-18'),
  ('germany','peru','visa_free',NULL,183,NULL,'Visa-free entry for tourism up to 183 days','No visa required; stay granted at border (commonly 90–183 days).','2026-02-18'),
  ('germany','costa-rica','visa_free',NULL,90,NULL,'Visa-free entry for tourism up to 90 days','No visa required for German passport holders.','2026-02-18'),
  ('germany','ecuador','visa_free',NULL,90,NULL,'Visa-free entry for tourism up to 90 days','No visa required for German passport holders.','2026-02-18'),
  ('germany','uruguay','visa_free',NULL,90,NULL,'Visa-free entry for tourism up to 90 days','No visa required for German passport holders.','2026-02-18'),
  ('germany','panama','visa_free',NULL,180,NULL,'Visa-free entry for tourism up to 180 days','No visa required; stay length granted at discretion of immigration.','2026-02-18'),
  ('germany','ukraine','visa_free',NULL,90,NULL,'Visa-free short stay up to 90 days in any 180-day period','Note: travel to Ukraine is subject to ongoing travel advisories; verify current safety conditions before travel.','2026-02-18'),
  ('germany','uzbekistan','visa_free',NULL,30,NULL,'Visa-free entry for up to 30 days','Uzbekistan introduced visa-free access for German nationals.','2026-02-18'),
  ('germany','kazakhstan','visa_free',NULL,30,NULL,'Visa-free entry for up to 30 days','Kazakhstan grants visa-free short stays to German passport holders.','2026-02-18'),
  ('germany','armenia','visa_free',NULL,180,NULL,'Visa-free entry for up to 180 days','Armenia allows visa-free entry for German citizens for up to 180 days.','2026-02-18')
ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO NOTHING;
