/*
  # Batch 1 Audit Fix: Australia → New Zealand - remove incorrect NZeTA requirement

  ## Change
  Australian citizens traveling on an Australian passport are explicitly exempt from
  BOTH the visa AND the NZeTA (New Zealand Electronic Travel Authority) requirement.
  They are covered under the Trans-Tasman Travel Arrangement and may visit, live, work,
  and study in New Zealand indefinitely.

  The database incorrectly listed visa_subtype as 'NZeTA' implying that Australians
  need to obtain an NZeTA. This has been corrected by removing the subtype and
  updating the notes.

  ## Source
  - Immigration New Zealand (immigration.govt.nz/visas/nzeta)
  - NZ Government (govt.nz): "Australian citizens travelling on an Australian passport
    do not need an NZeTA"
*/

UPDATE visa_rules
SET
  visa_subtype = NULL,
  notes = 'Australian citizens are exempt from both visa and NZeTA requirements under the Trans-Tasman Travel Arrangement. No prior authorization needed. May visit, live, work, and study indefinitely.'
WHERE passport_slug = 'australia'
  AND destination_slug = 'new-zealand';
