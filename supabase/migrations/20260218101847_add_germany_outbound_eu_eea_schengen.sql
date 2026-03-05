/*
  # Add Germany outbound EU/EEA/Schengen missing destinations

  ## Summary
  German passport holders have EU free movement rights to all EU member states and EEA/EFTA
  countries. Many EU/EEA destinations were missing from Germany's outbound rules.

  ## New rows added (EU free movement)
  - denmark, finland, sweden, ireland, luxembourg, malta, slovakia, slovenia,
    estonia, latvia, lithuania, bulgaria, romania, cyprus, norway, iceland
*/

INSERT INTO visa_rules (passport_slug, destination_slug, visa_type, visa_subtype, max_stay_days, stay_window_days, stay_rule, notes, last_verified)
VALUES
  ('germany','denmark','visa_free',NULL,NULL,NULL,'EU freedom of movement','EU citizen rights apply.','2026-02-18'),
  ('germany','finland','visa_free',NULL,NULL,NULL,'EU freedom of movement','EU citizen rights apply.','2026-02-18'),
  ('germany','sweden','visa_free',NULL,NULL,NULL,'EU freedom of movement','EU citizen rights apply.','2026-02-18'),
  ('germany','ireland','visa_free',NULL,NULL,NULL,'EU freedom of movement','EU citizen rights apply.','2026-02-18'),
  ('germany','luxembourg','visa_free',NULL,NULL,NULL,'EU freedom of movement','EU citizen rights apply.','2026-02-18'),
  ('germany','malta','visa_free',NULL,NULL,NULL,'EU freedom of movement','EU citizen rights apply.','2026-02-18'),
  ('germany','slovakia','visa_free',NULL,NULL,NULL,'EU freedom of movement','EU citizen rights apply.','2026-02-18'),
  ('germany','slovenia','visa_free',NULL,NULL,NULL,'EU freedom of movement','EU citizen rights apply.','2026-02-18'),
  ('germany','estonia','visa_free',NULL,NULL,NULL,'EU freedom of movement','EU citizen rights apply.','2026-02-18'),
  ('germany','latvia','visa_free',NULL,NULL,NULL,'EU freedom of movement','EU citizen rights apply.','2026-02-18'),
  ('germany','lithuania','visa_free',NULL,NULL,NULL,'EU freedom of movement','EU citizen rights apply.','2026-02-18'),
  ('germany','bulgaria','visa_free',NULL,NULL,NULL,'EU freedom of movement','EU citizen rights apply.','2026-02-18'),
  ('germany','romania','visa_free',NULL,NULL,NULL,'EU freedom of movement','EU citizen rights apply.','2026-02-18'),
  ('germany','cyprus','visa_free',NULL,NULL,NULL,'EU freedom of movement','EU citizen rights apply.','2026-02-18'),
  ('germany','norway','visa_free',NULL,NULL,NULL,'EEA/Schengen free movement','EU/EEA free movement applies; German citizens may live and work in Norway.','2026-02-18'),
  ('germany','iceland','visa_free',NULL,NULL,NULL,'EEA/Schengen free movement','EU/EEA free movement applies; German citizens may live and work in Iceland.','2026-02-18')
ON CONFLICT (passport_slug, destination_slug, visa_subtype) DO NOTHING;
