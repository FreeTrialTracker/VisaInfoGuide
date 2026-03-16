
/*
  # Make entry condition boolean columns nullable

  ## Summary
  The columns `return_ticket_required`, `insurance_required`, `sufficient_funds_required`,
  and `transit_required` were defined as NOT NULL DEFAULT false. This caused any `null`
  value (meaning "unknown / not specified") to be silently stored as `false`, which
  then displayed as "Not required" in the UI — misleading users.

  ## Changes
  - `visa_rules.return_ticket_required` — changed to nullable (no default)
  - `visa_rules.insurance_required` — changed to nullable (no default)
  - `visa_rules.sufficient_funds_required` — changed to nullable (no default)
  - `visa_rules.transit_required` — changed to nullable (no default)

  ## Three states
  After this migration each column carries three honest states:
  - TRUE  → definitively required
  - FALSE → definitively not required
  - NULL  → unknown / not officially confirmed; UI should say "Check requirements"
*/

ALTER TABLE visa_rules
  ALTER COLUMN return_ticket_required DROP NOT NULL,
  ALTER COLUMN return_ticket_required DROP DEFAULT,
  ALTER COLUMN insurance_required DROP NOT NULL,
  ALTER COLUMN insurance_required DROP DEFAULT,
  ALTER COLUMN sufficient_funds_required DROP NOT NULL,
  ALTER COLUMN sufficient_funds_required DROP DEFAULT,
  ALTER COLUMN transit_required DROP NOT NULL,
  ALTER COLUMN transit_required DROP DEFAULT;
