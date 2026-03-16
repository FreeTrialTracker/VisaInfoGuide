
/*
  # Add missing passports and destinations

  ## Summary
  The passports and destinations tables only contain 52 entries, while visa_rules
  has 99 passport slugs. This migration inserts all 47 missing countries into both
  the passports and destinations tables so they appear in the Trip Visa Finder dropdowns.

  ## New entries (both passports and destinations)
  Algeria, Armenia, Azerbaijan, Bahamas, Bahrain, Bangladesh, Barbados, Bolivia,
  Bulgaria, Cambodia, Costa Rica, Cuba, Cyprus, Dominican Republic, Ecuador,
  Estonia, Ethiopia, Georgia, Ghana, Iceland, Jamaica, Jordan, Kazakhstan, Kenya,
  Kuwait, Laos, Latvia, Lithuania, Luxembourg, Maldives, Malta, Mongolia, Morocco
  (already present), Myanmar, Nepal, Oman, Pakistan, Panama, Paraguay, Serbia,
  Slovakia, Slovenia, Sri Lanka, Tanzania, Tunisia, Uruguay, Uzbekistan, Zimbabwe

  Note: Morocco is already in the tables, so it is excluded from the INSERT.
*/

INSERT INTO passports (slug, name, is_active) VALUES
  ('algeria', 'Algeria', true),
  ('armenia', 'Armenia', true),
  ('azerbaijan', 'Azerbaijan', true),
  ('bahamas', 'Bahamas', true),
  ('bahrain', 'Bahrain', true),
  ('bangladesh', 'Bangladesh', true),
  ('barbados', 'Barbados', true),
  ('bolivia', 'Bolivia', true),
  ('bulgaria', 'Bulgaria', true),
  ('cambodia', 'Cambodia', true),
  ('costa-rica', 'Costa Rica', true),
  ('cuba', 'Cuba', true),
  ('cyprus', 'Cyprus', true),
  ('dominican-republic', 'Dominican Republic', true),
  ('ecuador', 'Ecuador', true),
  ('estonia', 'Estonia', true),
  ('ethiopia', 'Ethiopia', true),
  ('georgia', 'Georgia', true),
  ('ghana', 'Ghana', true),
  ('iceland', 'Iceland', true),
  ('jamaica', 'Jamaica', true),
  ('jordan', 'Jordan', true),
  ('kazakhstan', 'Kazakhstan', true),
  ('kenya', 'Kenya', true),
  ('kuwait', 'Kuwait', true),
  ('laos', 'Laos', true),
  ('latvia', 'Latvia', true),
  ('lithuania', 'Lithuania', true),
  ('luxembourg', 'Luxembourg', true),
  ('maldives', 'Maldives', true),
  ('malta', 'Malta', true),
  ('mongolia', 'Mongolia', true),
  ('myanmar', 'Myanmar', true),
  ('nepal', 'Nepal', true),
  ('oman', 'Oman', true),
  ('pakistan', 'Pakistan', true),
  ('panama', 'Panama', true),
  ('paraguay', 'Paraguay', true),
  ('serbia', 'Serbia', true),
  ('slovakia', 'Slovakia', true),
  ('slovenia', 'Slovenia', true),
  ('sri-lanka', 'Sri Lanka', true),
  ('tanzania', 'Tanzania', true),
  ('tunisia', 'Tunisia', true),
  ('uruguay', 'Uruguay', true),
  ('uzbekistan', 'Uzbekistan', true),
  ('zimbabwe', 'Zimbabwe', true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO destinations (slug, name, is_active) VALUES
  ('algeria', 'Algeria', true),
  ('armenia', 'Armenia', true),
  ('azerbaijan', 'Azerbaijan', true),
  ('bahamas', 'Bahamas', true),
  ('bahrain', 'Bahrain', true),
  ('bangladesh', 'Bangladesh', true),
  ('barbados', 'Barbados', true),
  ('bolivia', 'Bolivia', true),
  ('bulgaria', 'Bulgaria', true),
  ('cambodia', 'Cambodia', true),
  ('costa-rica', 'Costa Rica', true),
  ('cuba', 'Cuba', true),
  ('cyprus', 'Cyprus', true),
  ('dominican-republic', 'Dominican Republic', true),
  ('ecuador', 'Ecuador', true),
  ('estonia', 'Estonia', true),
  ('ethiopia', 'Ethiopia', true),
  ('georgia', 'Georgia', true),
  ('ghana', 'Ghana', true),
  ('iceland', 'Iceland', true),
  ('jamaica', 'Jamaica', true),
  ('jordan', 'Jordan', true),
  ('kazakhstan', 'Kazakhstan', true),
  ('kenya', 'Kenya', true),
  ('kuwait', 'Kuwait', true),
  ('laos', 'Laos', true),
  ('latvia', 'Latvia', true),
  ('lithuania', 'Lithuania', true),
  ('luxembourg', 'Luxembourg', true),
  ('maldives', 'Maldives', true),
  ('malta', 'Malta', true),
  ('mongolia', 'Mongolia', true),
  ('myanmar', 'Myanmar', true),
  ('nepal', 'Nepal', true),
  ('oman', 'Oman', true),
  ('pakistan', 'Pakistan', true),
  ('panama', 'Panama', true),
  ('paraguay', 'Paraguay', true),
  ('serbia', 'Serbia', true),
  ('slovakia', 'Slovakia', true),
  ('slovenia', 'Slovenia', true),
  ('sri-lanka', 'Sri Lanka', true),
  ('tanzania', 'Tanzania', true),
  ('tunisia', 'Tunisia', true),
  ('uruguay', 'Uruguay', true),
  ('uzbekistan', 'Uzbekistan', true),
  ('zimbabwe', 'Zimbabwe', true)
ON CONFLICT (slug) DO NOTHING;
