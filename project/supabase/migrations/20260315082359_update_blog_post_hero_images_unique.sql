/*
  # Update blog post hero images with unique, topic-relevant photos

  ## Changes
  - Each blog post now has a distinct Pexels image that matches the article topic
  - Japan posts: Tokyo/Japan imagery
  - UK posts: London/UK imagery
  - Schengen/Europe posts: European travel imagery
  - General visa posts: passport/travel document imagery

  ## Posts updated
  - check-visa-requirements-by-passport-and-destination → passport/documents
  - japan-visa-types → Tokyo skyline
  - do-i-need-a-visa-for-japan → Japan landmark
  - japan-tourist-visa → Japanese temple
  - japan-visa-requirements → Japan travel
  - proof-of-accommodation-for-visa → hotel/accommodation
  - cover-letter-for-visa-application → writing/documents
  - uk-visa-for-us-citizens → London landmark
  - uk-standard-visitor-visa-us-citizens → Big Ben / UK
  - uk-work-visa-for-americans → London cityscape
  - moving-to-uk-from-usa → UK street scene
  - schengen-visa-requirements → Europe travel
  - travel-itinerary-for-visa-application → travel planning map
  - flight-reservation-for-visa → airport/plane
*/

UPDATE blog_posts SET hero_image_url = 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
WHERE slug = 'check-visa-requirements-by-passport-and-destination';

UPDATE blog_posts SET hero_image_url = 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
WHERE slug = 'japan-visa-types';

UPDATE blog_posts SET hero_image_url = 'https://images.pexels.com/photos/590478/pexels-photo-590478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
WHERE slug = 'do-i-need-a-visa-for-japan';

UPDATE blog_posts SET hero_image_url = 'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
WHERE slug = 'japan-tourist-visa';

UPDATE blog_posts SET hero_image_url = 'https://images.pexels.com/photos/3408354/pexels-photo-3408354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
WHERE slug = 'japan-visa-requirements';

UPDATE blog_posts SET hero_image_url = 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
WHERE slug = 'proof-of-accommodation-for-visa';

UPDATE blog_posts SET hero_image_url = 'https://images.pexels.com/photos/357514/pexels-photo-357514.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
WHERE slug = 'cover-letter-for-visa-application';

UPDATE blog_posts SET hero_image_url = 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
WHERE slug = 'uk-visa-for-us-citizens';

UPDATE blog_posts SET hero_image_url = 'https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
WHERE slug = 'uk-eta-for-us-citizens';

UPDATE blog_posts SET hero_image_url = 'https://images.pexels.com/photos/726484/pexels-photo-726484.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
WHERE slug = 'uk-standard-visitor-visa-us-citizens';

UPDATE blog_posts SET hero_image_url = 'https://images.pexels.com/photos/1796715/pexels-photo-1796715.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
WHERE slug = 'uk-work-visa-for-americans';

UPDATE blog_posts SET hero_image_url = 'https://images.pexels.com/photos/220769/pexels-photo-220769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
WHERE slug = 'moving-to-uk-from-usa';

UPDATE blog_posts SET hero_image_url = 'https://images.pexels.com/photos/161901/paris-sunset-france-monument-161901.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
WHERE slug = 'schengen-visa-requirements';

UPDATE blog_posts SET hero_image_url = 'https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
WHERE slug = 'travel-itinerary-for-visa-application';

UPDATE blog_posts SET hero_image_url = 'https://images.pexels.com/photos/62623/wing-plane-flying-airplane-62623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
WHERE slug = 'flight-reservation-for-visa';
