/*
  # Remove Canada Self-Entry Row

  ## Summary
  Removes the canada -> canada self-referencing row, which represents
  domestic entry and is not meaningful visa data.
*/

DELETE FROM visa_rules
WHERE passport_slug = 'canada' AND destination_slug = 'canada';
