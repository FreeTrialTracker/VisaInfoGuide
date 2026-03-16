/*
  # Batch 1 Audit Fix: Australia/USA → Brazil - update to evisa subtype

  ## Changes
  - Australia → Brazil: update visa_subtype to reflect eVisa mechanism
    Brazil reinstated visa requirements for Australians effective April 10, 2025.
    The mechanism is an online eVisa (not a traditional consular sticker visa).
  - USA → Brazil: same update - eVisa online application required since April 10, 2025.

  ## Sources
  - Brazilian Consulate Miami (gov.br), Brazil VFS eVisa portal (brazil.vfsevisa.com)
  - Fragomen Immigration, Australian Smartraveller, U.S. Embassy Brazil
*/

UPDATE visa_rules
SET
  visa_subtype = 'eVisa',
  notes = 'Visa required since April 10, 2025 (reciprocity measure). Must apply for Brazilian eVisa online before travel via brazil.vfsevisa.com. Tourist eVisa allows up to 90 days per year.'
WHERE passport_slug = 'australia'
  AND destination_slug = 'brazil';

UPDATE visa_rules
SET
  visa_subtype = 'eVisa',
  notes = 'Visa required since April 10, 2025. Must apply for Brazilian eVisa online before travel via brazil.vfsevisa.com. Tourist eVisa allows up to 90 days per year.'
WHERE passport_slug = 'united-states'
  AND destination_slug = 'brazil';
