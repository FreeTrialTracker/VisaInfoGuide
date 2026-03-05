/*
  # Add Belgium as a Destination

  1. Changes
    - Inserts Belgium into the `destinations` table so it appears in the Country Finder
      and destination dropdowns
*/

INSERT INTO destinations (slug, name, is_active)
VALUES ('belgium', 'Belgium', true)
ON CONFLICT (slug) DO UPDATE SET is_active = true;
