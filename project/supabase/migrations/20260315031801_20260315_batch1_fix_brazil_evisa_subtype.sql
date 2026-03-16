/*
  # Fix Brazil visa entries: correct visa_type for Australia and USA; fix Canada

  ## Changes

  1. Australia → Brazil: visa_type = 'visa_required' with visa_subtype 'eVisa' is
     contradictory. Brazil requires an online eVisa for Australians (since April 2025).
     Correct type is 'evisa', not 'visa_required'.

  2. USA → Brazil: visa_type = 'visa_free' with visa_subtype 'eVisa' is contradictory.
     The U.S. was added to Brazil's visa requirement list in April 2025.
     Correct type is 'evisa', not 'visa_free'.

  3. Canada → Brazil: Canada was NOT included in Brazil's April 2025 reciprocity measure.
     Canadian citizens retain visa-free access to Brazil. Removing the incorrect
     'Tourist visa (VIVIS)' subtype and ensuring visa_type remains visa_free.

  ## Sources
  - Brazilian MRE (gov.br) visa reciprocity announcement April 2025
  - Brazil VFS eVisa portal (brazil.vfsevisa.com)
  - Canadian government Brazil travel advisory
*/

UPDATE visa_rules
SET
  visa_type = 'evisa',
  notes = 'eVisa required since April 10, 2025 (Brazil reciprocity measure). Apply online before travel at brazil.vfsevisa.com. Tourist eVisa valid for up to 90 days per calendar year.'
WHERE passport_slug = 'australia'
  AND destination_slug = 'brazil';

UPDATE visa_rules
SET
  visa_type = 'evisa',
  notes = 'eVisa required since April 10, 2025 (Brazil reciprocity measure). Apply online before travel at brazil.vfsevisa.com. Tourist eVisa valid for up to 90 days per calendar year.'
WHERE passport_slug = 'united-states'
  AND destination_slug = 'brazil';

UPDATE visa_rules
SET
  visa_subtype = NULL,
  notes = 'Visa-free access retained. Canada was not included in Brazil''s April 2025 reciprocity visa measure. Canadian passport holders may visit for up to 90 days without a visa.'
WHERE passport_slug = 'canada'
  AND destination_slug = 'brazil';
