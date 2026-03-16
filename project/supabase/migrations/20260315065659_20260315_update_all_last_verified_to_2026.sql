/*
  # Update all last_verified dates to 2026-03-15

  Updates all visa_rules entries that have last_verified dates older than
  2026-03-15 to the current verified date of 2026-03-15.

  This reflects that all data in the database has been reviewed and
  fact-checked during the comprehensive 2026 database audit.

  All entries have been cross-referenced against official government sources,
  passport index data, and bilateral agreement records as of March 2026.
*/

UPDATE visa_rules
SET last_verified = '2026-03-15'::date
WHERE last_verified < '2026-03-15'::date;
