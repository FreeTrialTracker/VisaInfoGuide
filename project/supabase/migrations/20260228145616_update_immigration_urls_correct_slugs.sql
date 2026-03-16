/*
  # Update immigration URLs to correct immigrationinfoguide.com paths

  Updates all 52 country_crosslinks rows to use the correct
  immigrationinfoguide.com/immigrate-to/ URL format with the
  exact slugs provided (some countries use short codes like au, ca, gb, us, nz).

  Also removes any rows not in the 52-country list.
*/

UPDATE country_crosslinks SET immigration_url = CASE visa_slug
  WHEN 'argentina'           THEN 'https://immigrationinfoguide.com/immigrate-to/argentina'
  WHEN 'australia'           THEN 'https://immigrationinfoguide.com/immigrate-to/au'
  WHEN 'austria'             THEN 'https://immigrationinfoguide.com/immigrate-to/austria'
  WHEN 'belgium'             THEN 'https://immigrationinfoguide.com/immigrate-to/belgium'
  WHEN 'brazil'              THEN 'https://immigrationinfoguide.com/immigrate-to/brazil'
  WHEN 'canada'              THEN 'https://immigrationinfoguide.com/immigrate-to/ca'
  WHEN 'chile'               THEN 'https://immigrationinfoguide.com/immigrate-to/chile'
  WHEN 'china'               THEN 'https://immigrationinfoguide.com/immigrate-to/china'
  WHEN 'colombia'            THEN 'https://immigrationinfoguide.com/immigrate-to/colombia'
  WHEN 'croatia'             THEN 'https://immigrationinfoguide.com/immigrate-to/croatia'
  WHEN 'czech-republic'      THEN 'https://immigrationinfoguide.com/immigrate-to/czech-republic'
  WHEN 'denmark'             THEN 'https://immigrationinfoguide.com/immigrate-to/denmark'
  WHEN 'egypt'               THEN 'https://immigrationinfoguide.com/immigrate-to/egypt'
  WHEN 'finland'             THEN 'https://immigrationinfoguide.com/immigrate-to/finland'
  WHEN 'france'              THEN 'https://immigrationinfoguide.com/immigrate-to/france'
  WHEN 'germany'             THEN 'https://immigrationinfoguide.com/immigrate-to/germany'
  WHEN 'greece'              THEN 'https://immigrationinfoguide.com/immigrate-to/greece'
  WHEN 'hungary'             THEN 'https://immigrationinfoguide.com/immigrate-to/hungary'
  WHEN 'india'               THEN 'https://immigrationinfoguide.com/immigrate-to/india'
  WHEN 'indonesia'           THEN 'https://immigrationinfoguide.com/immigrate-to/indonesia'
  WHEN 'ireland'             THEN 'https://immigrationinfoguide.com/immigrate-to/ireland'
  WHEN 'israel'              THEN 'https://immigrationinfoguide.com/immigrate-to/israel'
  WHEN 'italy'               THEN 'https://immigrationinfoguide.com/immigrate-to/italy'
  WHEN 'japan'               THEN 'https://immigrationinfoguide.com/immigrate-to/japan'
  WHEN 'malaysia'            THEN 'https://immigrationinfoguide.com/immigrate-to/malaysia'
  WHEN 'mexico'              THEN 'https://immigrationinfoguide.com/immigrate-to/mexico'
  WHEN 'morocco'             THEN 'https://immigrationinfoguide.com/immigrate-to/morocco'
  WHEN 'netherlands'         THEN 'https://immigrationinfoguide.com/immigrate-to/netherlands'
  WHEN 'new-zealand'         THEN 'https://immigrationinfoguide.com/immigrate-to/nz'
  WHEN 'nigeria'             THEN 'https://immigrationinfoguide.com/immigrate-to/nigeria'
  WHEN 'norway'              THEN 'https://immigrationinfoguide.com/immigrate-to/norway'
  WHEN 'peru'                THEN 'https://immigrationinfoguide.com/immigrate-to/peru'
  WHEN 'philippines'         THEN 'https://immigrationinfoguide.com/immigrate-to/philippines'
  WHEN 'poland'              THEN 'https://immigrationinfoguide.com/immigrate-to/poland'
  WHEN 'portugal'            THEN 'https://immigrationinfoguide.com/immigrate-to/portugal'
  WHEN 'qatar'               THEN 'https://immigrationinfoguide.com/immigrate-to/qatar'
  WHEN 'romania'             THEN 'https://immigrationinfoguide.com/immigrate-to/romania'
  WHEN 'russia'              THEN 'https://immigrationinfoguide.com/immigrate-to/russia'
  WHEN 'saudi-arabia'        THEN 'https://immigrationinfoguide.com/immigrate-to/saudi-arabia'
  WHEN 'singapore'           THEN 'https://immigrationinfoguide.com/immigrate-to/singapore'
  WHEN 'south-africa'        THEN 'https://immigrationinfoguide.com/immigrate-to/south-africa'
  WHEN 'south-korea'         THEN 'https://immigrationinfoguide.com/immigrate-to/south-korea'
  WHEN 'spain'               THEN 'https://immigrationinfoguide.com/immigrate-to/spain'
  WHEN 'sweden'              THEN 'https://immigrationinfoguide.com/immigrate-to/sweden'
  WHEN 'switzerland'         THEN 'https://immigrationinfoguide.com/immigrate-to/switzerland'
  WHEN 'thailand'            THEN 'https://immigrationinfoguide.com/immigrate-to/thailand'
  WHEN 'turkey'              THEN 'https://immigrationinfoguide.com/immigrate-to/turkey'
  WHEN 'ukraine'             THEN 'https://immigrationinfoguide.com/immigrate-to/ukraine'
  WHEN 'united-arab-emirates' THEN 'https://immigrationinfoguide.com/immigrate-to/united-arab-emirates'
  WHEN 'united-kingdom'      THEN 'https://immigrationinfoguide.com/immigrate-to/gb'
  WHEN 'united-states'       THEN 'https://immigrationinfoguide.com/immigrate-to/us'
  WHEN 'vietnam'             THEN 'https://immigrationinfoguide.com/immigrate-to/vietnam'
  ELSE immigration_url
END
WHERE visa_slug IN (
  'argentina','australia','austria','belgium','brazil','canada','chile','china',
  'colombia','croatia','czech-republic','denmark','egypt','finland','france',
  'germany','greece','hungary','india','indonesia','ireland','israel','italy',
  'japan','malaysia','mexico','morocco','netherlands','new-zealand','nigeria',
  'norway','peru','philippines','poland','portugal','qatar','romania','russia',
  'saudi-arabia','singapore','south-africa','south-korea','spain','sweden',
  'switzerland','thailand','turkey','ukraine','united-arab-emirates',
  'united-kingdom','united-states','vietnam'
);

UPDATE country_crosslinks
SET is_active = false
WHERE visa_slug NOT IN (
  'argentina','australia','austria','belgium','brazil','canada','chile','china',
  'colombia','croatia','czech-republic','denmark','egypt','finland','france',
  'germany','greece','hungary','india','indonesia','ireland','israel','italy',
  'japan','malaysia','mexico','morocco','netherlands','new-zealand','nigeria',
  'norway','peru','philippines','poland','portugal','qatar','romania','russia',
  'saudi-arabia','singapore','south-africa','south-korea','spain','sweden',
  'switzerland','thailand','turkey','ukraine','united-arab-emirates',
  'united-kingdom','united-states','vietnam'
);
