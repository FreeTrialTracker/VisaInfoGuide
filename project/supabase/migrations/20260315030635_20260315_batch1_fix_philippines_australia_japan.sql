/*
  # Batch 1 Audit Fix: Philippines Entry for Australia and Japan

  ## Changes
  - Australia → Philippines: corrected from visa_required to visa_free (30 days)
    Australian passport holders have visa-free entry to Philippines for up to 30 days
    under Executive Order No. 408. No visa is needed for stays under 30 days.
  - Japan → Philippines: corrected from visa_required to visa_free (30 days)
    Japan is on the Philippines DFA 30-day visa-free list under E.O. 408.

  ## Sources
  - Philippine DFA (evisa.gov.ph), Philippine Embassy Canberra
  - Philippine Embassy Tokyo, DFA Bangkok post on E.O. 408
*/

UPDATE visa_rules
SET
  visa_type = 'visa_free',
  notes = 'Visa-free entry for up to 30 days under Executive Order No. 408. Passport must be valid for at least 6 months. Return/onward ticket required. Extensions available from Bureau of Immigration.'
WHERE passport_slug = 'australia'
  AND destination_slug = 'philippines';

UPDATE visa_rules
SET
  visa_type = 'visa_free',
  notes = 'Visa-free entry for up to 30 days under Philippines Executive Order No. 408. Passport must be valid for at least 6 months. Return/onward ticket required.'
WHERE passport_slug = 'japan'
  AND destination_slug = 'philippines';
