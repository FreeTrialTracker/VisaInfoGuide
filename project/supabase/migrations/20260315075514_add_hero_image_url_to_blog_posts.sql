/*
  # Add hero_image_url to blog_posts

  1. Changes
    - Adds `hero_image_url` (text, nullable) column to `blog_posts` table
    - Used to display a hero/banner image at the top of each blog post
    - Defaults to NULL (no image shown when absent)
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blog_posts' AND column_name = 'hero_image_url'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN hero_image_url text;
  END IF;
END $$;

-- Set hero image for the "Check Visa Requirements" pillar post
UPDATE blog_posts
SET hero_image_url = 'https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
WHERE slug = 'check-visa-requirements-by-passport-and-destination';

-- Set hero images for existing posts
UPDATE blog_posts
SET hero_image_url = 'https://images.pexels.com/photos/5638734/pexels-photo-5638734.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
WHERE slug = 'japan-evisa';

UPDATE blog_posts
SET hero_image_url = 'https://images.pexels.com/photos/4388164/pexels-photo-4388164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
WHERE slug = 'uk-eta-for-us-citizens';

UPDATE blog_posts
SET hero_image_url = 'https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
WHERE slug NOT IN ('japan-evisa', 'uk-eta-for-us-citizens', 'check-visa-requirements-by-passport-and-destination')
  AND hero_image_url IS NULL;
