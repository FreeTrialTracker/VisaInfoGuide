export interface Country {
  slug: string;
  name: string;
  country_code: string;
  official_immigration_url?: string;
}

export const COUNTRIES: Country[] = [
  { slug: 'algeria',              name: 'Algeria',              country_code: 'DZ' },
  { slug: 'angola',               name: 'Angola',               country_code: 'AO' },
  { slug: 'argentina',            name: 'Argentina',            country_code: 'AR' },
  { slug: 'armenia',              name: 'Armenia',              country_code: 'AM' },
  { slug: 'australia',            name: 'Australia',            country_code: 'AU' },
  { slug: 'austria',              name: 'Austria',              country_code: 'AT' },
  { slug: 'azerbaijan',           name: 'Azerbaijan',           country_code: 'AZ' },
  { slug: 'bahamas',              name: 'Bahamas',              country_code: 'BS' },
  { slug: 'bahrain',              name: 'Bahrain',              country_code: 'BH' },
  { slug: 'bangladesh',           name: 'Bangladesh',           country_code: 'BD' },
  { slug: 'barbados',             name: 'Barbados',             country_code: 'BB' },
  { slug: 'belgium',              name: 'Belgium',              country_code: 'BE' },
  { slug: 'bolivia',              name: 'Bolivia',              country_code: 'BO' },
  { slug: 'brazil',               name: 'Brazil',               country_code: 'BR' },
  { slug: 'bulgaria',             name: 'Bulgaria',             country_code: 'BG' },
  { slug: 'cambodia',             name: 'Cambodia',             country_code: 'KH' },
  { slug: 'canada',               name: 'Canada',               country_code: 'CA' },
  { slug: 'chile',                name: 'Chile',                country_code: 'CL' },
  { slug: 'china',                name: 'China',                country_code: 'CN' },
  { slug: 'colombia',             name: 'Colombia',             country_code: 'CO' },
  { slug: 'costa-rica',           name: 'Costa Rica',           country_code: 'CR' },
  { slug: 'croatia',              name: 'Croatia',              country_code: 'HR' },
  { slug: 'cuba',                 name: 'Cuba',                 country_code: 'CU' },
  { slug: 'cyprus',               name: 'Cyprus',               country_code: 'CY' },
  { slug: 'czech-republic',       name: 'Czech Republic',       country_code: 'CZ' },
  { slug: 'denmark',              name: 'Denmark',              country_code: 'DK' },
  { slug: 'dominican-republic',   name: 'Dominican Republic',   country_code: 'DO' },
  { slug: 'ecuador',              name: 'Ecuador',              country_code: 'EC' },
  { slug: 'egypt',                name: 'Egypt',                country_code: 'EG' },
  { slug: 'estonia',              name: 'Estonia',              country_code: 'EE' },
  { slug: 'ethiopia',             name: 'Ethiopia',             country_code: 'ET' },
  { slug: 'finland',              name: 'Finland',              country_code: 'FI' },
  { slug: 'france',               name: 'France',               country_code: 'FR' },
  { slug: 'georgia',              name: 'Georgia',              country_code: 'GE' },
  { slug: 'germany',              name: 'Germany',              country_code: 'DE' },
  { slug: 'ghana',                name: 'Ghana',                country_code: 'GH' },
  { slug: 'greece',               name: 'Greece',               country_code: 'GR' },
  { slug: 'hungary',              name: 'Hungary',              country_code: 'HU' },
  { slug: 'iceland',              name: 'Iceland',              country_code: 'IS' },
  { slug: 'india',                name: 'India',                country_code: 'IN' },
  { slug: 'indonesia',            name: 'Indonesia',            country_code: 'ID' },
  { slug: 'ireland',              name: 'Ireland',              country_code: 'IE' },
  { slug: 'israel',               name: 'Israel',               country_code: 'IL' },
  { slug: 'italy',                name: 'Italy',                country_code: 'IT' },
  { slug: 'jamaica',              name: 'Jamaica',              country_code: 'JM' },
  { slug: 'japan',                name: 'Japan',                country_code: 'JP' },
  { slug: 'jordan',               name: 'Jordan',               country_code: 'JO' },
  { slug: 'kazakhstan',           name: 'Kazakhstan',           country_code: 'KZ' },
  { slug: 'kenya',                name: 'Kenya',                country_code: 'KE' },
  { slug: 'kuwait',               name: 'Kuwait',               country_code: 'KW' },
  { slug: 'laos',                 name: 'Laos',                 country_code: 'LA' },
  { slug: 'latvia',               name: 'Latvia',               country_code: 'LV' },
  { slug: 'lithuania',            name: 'Lithuania',            country_code: 'LT' },
  { slug: 'luxembourg',           name: 'Luxembourg',           country_code: 'LU' },
  { slug: 'malaysia',             name: 'Malaysia',             country_code: 'MY' },
  { slug: 'maldives',             name: 'Maldives',             country_code: 'MV' },
  { slug: 'malta',                name: 'Malta',                country_code: 'MT' },
  { slug: 'mexico',               name: 'Mexico',               country_code: 'MX' },
  { slug: 'mongolia',             name: 'Mongolia',             country_code: 'MN' },
  { slug: 'morocco',              name: 'Morocco',              country_code: 'MA' },
  { slug: 'myanmar',              name: 'Myanmar',              country_code: 'MM' },
  { slug: 'nepal',                name: 'Nepal',                country_code: 'NP' },
  { slug: 'netherlands',          name: 'Netherlands',          country_code: 'NL' },
  { slug: 'new-zealand',          name: 'New Zealand',          country_code: 'NZ' },
  { slug: 'nigeria',              name: 'Nigeria',              country_code: 'NG' },
  { slug: 'norway',               name: 'Norway',               country_code: 'NO' },
  { slug: 'oman',                 name: 'Oman',                 country_code: 'OM' },
  { slug: 'pakistan',             name: 'Pakistan',             country_code: 'PK' },
  { slug: 'panama',               name: 'Panama',               country_code: 'PA' },
  { slug: 'paraguay',             name: 'Paraguay',             country_code: 'PY' },
  { slug: 'peru',                 name: 'Peru',                 country_code: 'PE' },
  { slug: 'philippines',          name: 'Philippines',          country_code: 'PH' },
  { slug: 'poland',               name: 'Poland',               country_code: 'PL' },
  { slug: 'portugal',             name: 'Portugal',             country_code: 'PT' },
  { slug: 'qatar',                name: 'Qatar',                country_code: 'QA' },
  { slug: 'romania',              name: 'Romania',              country_code: 'RO' },
  { slug: 'russia',               name: 'Russia',               country_code: 'RU' },
  { slug: 'saudi-arabia',         name: 'Saudi Arabia',         country_code: 'SA' },
  { slug: 'serbia',               name: 'Serbia',               country_code: 'RS' },
  { slug: 'singapore',            name: 'Singapore',            country_code: 'SG' },
  { slug: 'slovakia',             name: 'Slovakia',             country_code: 'SK' },
  { slug: 'slovenia',             name: 'Slovenia',             country_code: 'SI' },
  { slug: 'south-africa',         name: 'South Africa',         country_code: 'ZA' },
  { slug: 'south-korea',          name: 'South Korea',          country_code: 'KR' },
  { slug: 'spain',                name: 'Spain',                country_code: 'ES' },
  { slug: 'sri-lanka',            name: 'Sri Lanka',            country_code: 'LK' },
  { slug: 'sweden',               name: 'Sweden',               country_code: 'SE' },
  { slug: 'switzerland',          name: 'Switzerland',          country_code: 'CH' },
  { slug: 'tanzania',             name: 'Tanzania',             country_code: 'TZ' },
  { slug: 'thailand',             name: 'Thailand',             country_code: 'TH' },
  { slug: 'tunisia',              name: 'Tunisia',              country_code: 'TN' },
  { slug: 'turkey',               name: 'Turkey',               country_code: 'TR' },
  { slug: 'ukraine',              name: 'Ukraine',              country_code: 'UA' },
  { slug: 'united-arab-emirates', name: 'United Arab Emirates', country_code: 'AE' },
  { slug: 'united-kingdom',       name: 'United Kingdom',       country_code: 'GB' },
  { slug: 'united-states',        name: 'United States',        country_code: 'US' },
  { slug: 'uruguay',              name: 'Uruguay',              country_code: 'UY' },
  { slug: 'uzbekistan',           name: 'Uzbekistan',           country_code: 'UZ' },
  { slug: 'vietnam',              name: 'Vietnam',              country_code: 'VN' },
  { slug: 'zimbabwe',             name: 'Zimbabwe',             country_code: 'ZW' },
];

export const DESTINATIONS_EXTRA: Country[] = [
  { slug: 'turkmenistan',         name: 'Turkmenistan',         country_code: 'TM' },
];

export const PASSPORTS = COUNTRIES;
export const DESTINATIONS = [...COUNTRIES, ...DESTINATIONS_EXTRA];

export const TOP_PAIRS_300 = [
  { passport: 'united-states', destination: 'japan' },
  { passport: 'united-states', destination: 'france' },
  { passport: 'united-states', destination: 'germany' },
  { passport: 'united-states', destination: 'italy' },
  { passport: 'united-states', destination: 'spain' },
  { passport: 'united-states', destination: 'united-kingdom' },
  { passport: 'united-states', destination: 'thailand' },
  { passport: 'united-states', destination: 'singapore' },
  { passport: 'united-states', destination: 'australia' },
  { passport: 'united-states', destination: 'netherlands' },
  { passport: 'united-states', destination: 'switzerland' },
  { passport: 'united-states', destination: 'canada' },
  { passport: 'united-states', destination: 'china' },
  { passport: 'united-states', destination: 'india' },
  { passport: 'united-states', destination: 'mexico' },
  { passport: 'united-states', destination: 'brazil' },
  { passport: 'united-states', destination: 'south-korea' },
  { passport: 'united-states', destination: 'portugal' },
  { passport: 'united-states', destination: 'greece' },
  { passport: 'united-states', destination: 'austria' },
  { passport: 'united-states', destination: 'denmark' },
  { passport: 'united-states', destination: 'belgium' },
  { passport: 'united-states', destination: 'croatia' },
  { passport: 'united-states', destination: 'czech-republic' },
  { passport: 'united-states', destination: 'poland' },
  { passport: 'united-states', destination: 'vietnam' },
  { passport: 'united-states', destination: 'indonesia' },
  { passport: 'united-states', destination: 'philippines' },
  { passport: 'united-states', destination: 'turkey' },
  { passport: 'united-states', destination: 'egypt' },
  { passport: 'united-states', destination: 'united-arab-emirates' },
  { passport: 'united-kingdom', destination: 'united-states' },
  { passport: 'united-kingdom', destination: 'france' },
  { passport: 'united-kingdom', destination: 'germany' },
  { passport: 'united-kingdom', destination: 'italy' },
  { passport: 'united-kingdom', destination: 'spain' },
  { passport: 'united-kingdom', destination: 'japan' },
  { passport: 'united-kingdom', destination: 'thailand' },
  { passport: 'united-kingdom', destination: 'singapore' },
  { passport: 'united-kingdom', destination: 'australia' },
  { passport: 'united-kingdom', destination: 'netherlands' },
  { passport: 'united-kingdom', destination: 'switzerland' },
  { passport: 'united-kingdom', destination: 'canada' },
  { passport: 'united-kingdom', destination: 'china' },
  { passport: 'united-kingdom', destination: 'india' },
  { passport: 'united-kingdom', destination: 'portugal' },
  { passport: 'united-kingdom', destination: 'greece' },
  { passport: 'united-kingdom', destination: 'austria' },
  { passport: 'united-kingdom', destination: 'belgium' },
  { passport: 'united-kingdom', destination: 'croatia' },
  { passport: 'united-kingdom', destination: 'poland' },
  { passport: 'united-kingdom', destination: 'new-zealand' },
  { passport: 'united-kingdom', destination: 'south-africa' },
  { passport: 'united-kingdom', destination: 'mexico' },
  { passport: 'united-kingdom', destination: 'brazil' },
  { passport: 'united-kingdom', destination: 'united-arab-emirates' },
  { passport: 'canada', destination: 'united-states' },
  { passport: 'canada', destination: 'united-kingdom' },
  { passport: 'canada', destination: 'france' },
  { passport: 'canada', destination: 'germany' },
  { passport: 'canada', destination: 'italy' },
  { passport: 'canada', destination: 'spain' },
  { passport: 'canada', destination: 'japan' },
  { passport: 'canada', destination: 'thailand' },
  { passport: 'canada', destination: 'singapore' },
  { passport: 'canada', destination: 'australia' },
  { passport: 'canada', destination: 'netherlands' },
  { passport: 'canada', destination: 'switzerland' },
  { passport: 'canada', destination: 'china' },
  { passport: 'canada', destination: 'india' },
  { passport: 'canada', destination: 'mexico' },
  { passport: 'canada', destination: 'brazil' },
  { passport: 'canada', destination: 'portugal' },
  { passport: 'canada', destination: 'greece' },
  { passport: 'canada', destination: 'austria' },
  { passport: 'canada', destination: 'south-korea' },
  { passport: 'australia', destination: 'united-states' },
  { passport: 'australia', destination: 'united-kingdom' },
  { passport: 'australia', destination: 'france' },
  { passport: 'australia', destination: 'germany' },
  { passport: 'australia', destination: 'italy' },
  { passport: 'australia', destination: 'spain' },
  { passport: 'australia', destination: 'japan' },
  { passport: 'australia', destination: 'thailand' },
  { passport: 'australia', destination: 'singapore' },
  { passport: 'australia', destination: 'netherlands' },
  { passport: 'australia', destination: 'switzerland' },
  { passport: 'australia', destination: 'canada' },
  { passport: 'australia', destination: 'china' },
  { passport: 'australia', destination: 'india' },
  { passport: 'australia', destination: 'new-zealand' },
  { passport: 'australia', destination: 'indonesia' },
  { passport: 'australia', destination: 'vietnam' },
  { passport: 'australia', destination: 'south-korea' },
  { passport: 'australia', destination: 'portugal' },
  { passport: 'australia', destination: 'greece' },
  { passport: 'india', destination: 'united-states' },
  { passport: 'india', destination: 'united-kingdom' },
  { passport: 'india', destination: 'canada' },
  { passport: 'india', destination: 'australia' },
  { passport: 'india', destination: 'france' },
  { passport: 'india', destination: 'germany' },
  { passport: 'india', destination: 'italy' },
  { passport: 'india', destination: 'spain' },
  { passport: 'india', destination: 'japan' },
  { passport: 'india', destination: 'thailand' },
  { passport: 'india', destination: 'singapore' },
  { passport: 'india', destination: 'netherlands' },
  { passport: 'india', destination: 'switzerland' },
  { passport: 'india', destination: 'china' },
  { passport: 'india', destination: 'united-arab-emirates' },
  { passport: 'india', destination: 'new-zealand' },
  { passport: 'india', destination: 'south-korea' },
  { passport: 'india', destination: 'malaysia' },
  { passport: 'india', destination: 'indonesia' },
  { passport: 'india', destination: 'vietnam' },
  { passport: 'china', destination: 'united-states' },
  { passport: 'china', destination: 'united-kingdom' },
  { passport: 'china', destination: 'france' },
  { passport: 'china', destination: 'germany' },
  { passport: 'china', destination: 'italy' },
  { passport: 'china', destination: 'spain' },
  { passport: 'china', destination: 'japan' },
  { passport: 'china', destination: 'thailand' },
  { passport: 'china', destination: 'singapore' },
  { passport: 'china', destination: 'australia' },
  { passport: 'china', destination: 'canada' },
  { passport: 'china', destination: 'netherlands' },
  { passport: 'china', destination: 'switzerland' },
  { passport: 'china', destination: 'south-korea' },
  { passport: 'china', destination: 'new-zealand' },
  { passport: 'china', destination: 'indonesia' },
  { passport: 'china', destination: 'malaysia' },
  { passport: 'china', destination: 'united-arab-emirates' },
  { passport: 'china', destination: 'russia' },
  { passport: 'china', destination: 'turkey' },
  { passport: 'thailand', destination: 'japan' },
  { passport: 'thailand', destination: 'singapore' },
  { passport: 'thailand', destination: 'south-korea' },
  { passport: 'thailand', destination: 'united-states' },
  { passport: 'thailand', destination: 'united-kingdom' },
  { passport: 'thailand', destination: 'france' },
  { passport: 'thailand', destination: 'germany' },
  { passport: 'thailand', destination: 'italy' },
  { passport: 'thailand', destination: 'spain' },
  { passport: 'thailand', destination: 'australia' },
  { passport: 'thailand', destination: 'netherlands' },
  { passport: 'thailand', destination: 'switzerland' },
  { passport: 'thailand', destination: 'china' },
  { passport: 'thailand', destination: 'malaysia' },
  { passport: 'thailand', destination: 'indonesia' },
  { passport: 'thailand', destination: 'vietnam' },
  { passport: 'thailand', destination: 'new-zealand' },
  { passport: 'thailand', destination: 'canada' },
  { passport: 'thailand', destination: 'india' },
  { passport: 'thailand', destination: 'united-arab-emirates' },
  { passport: 'singapore', destination: 'united-states' },
  { passport: 'singapore', destination: 'united-kingdom' },
  { passport: 'singapore', destination: 'france' },
  { passport: 'singapore', destination: 'germany' },
  { passport: 'singapore', destination: 'italy' },
  { passport: 'singapore', destination: 'spain' },
  { passport: 'singapore', destination: 'japan' },
  { passport: 'singapore', destination: 'thailand' },
  { passport: 'singapore', destination: 'australia' },
  { passport: 'singapore', destination: 'netherlands' },
  { passport: 'singapore', destination: 'switzerland' },
  { passport: 'singapore', destination: 'canada' },
  { passport: 'singapore', destination: 'china' },
  { passport: 'singapore', destination: 'south-korea' },
  { passport: 'singapore', destination: 'new-zealand' },
  { passport: 'singapore', destination: 'malaysia' },
  { passport: 'singapore', destination: 'indonesia' },
  { passport: 'singapore', destination: 'vietnam' },
  { passport: 'singapore', destination: 'india' },
  { passport: 'singapore', destination: 'united-arab-emirates' },
  { passport: 'japan', destination: 'united-states' },
  { passport: 'japan', destination: 'united-kingdom' },
  { passport: 'japan', destination: 'france' },
  { passport: 'japan', destination: 'germany' },
  { passport: 'japan', destination: 'italy' },
  { passport: 'japan', destination: 'spain' },
  { passport: 'japan', destination: 'thailand' },
  { passport: 'japan', destination: 'singapore' },
  { passport: 'japan', destination: 'australia' },
  { passport: 'japan', destination: 'netherlands' },
  { passport: 'japan', destination: 'switzerland' },
  { passport: 'japan', destination: 'canada' },
  { passport: 'japan', destination: 'china' },
  { passport: 'japan', destination: 'south-korea' },
  { passport: 'japan', destination: 'new-zealand' },
  { passport: 'japan', destination: 'indonesia' },
  { passport: 'japan', destination: 'vietnam' },
  { passport: 'japan', destination: 'india' },
  { passport: 'japan', destination: 'united-arab-emirates' },
  { passport: 'japan', destination: 'portugal' },
  { passport: 'germany', destination: 'united-states' },
  { passport: 'germany', destination: 'united-kingdom' },
  { passport: 'germany', destination: 'france' },
  { passport: 'germany', destination: 'italy' },
  { passport: 'germany', destination: 'spain' },
  { passport: 'germany', destination: 'japan' },
  { passport: 'germany', destination: 'thailand' },
  { passport: 'germany', destination: 'singapore' },
  { passport: 'germany', destination: 'australia' },
  { passport: 'germany', destination: 'netherlands' },
  { passport: 'germany', destination: 'switzerland' },
  { passport: 'germany', destination: 'canada' },
  { passport: 'germany', destination: 'china' },
  { passport: 'germany', destination: 'austria' },
  { passport: 'germany', destination: 'belgium' },
  { passport: 'germany', destination: 'poland' },
  { passport: 'germany', destination: 'czech-republic' },
  { passport: 'germany', destination: 'croatia' },
  { passport: 'germany', destination: 'portugal' },
  { passport: 'germany', destination: 'greece' },
  { passport: 'france', destination: 'united-states' },
  { passport: 'france', destination: 'united-kingdom' },
  { passport: 'france', destination: 'germany' },
  { passport: 'france', destination: 'italy' },
  { passport: 'france', destination: 'spain' },
  { passport: 'france', destination: 'japan' },
  { passport: 'france', destination: 'thailand' },
  { passport: 'france', destination: 'singapore' },
  { passport: 'france', destination: 'australia' },
  { passport: 'france', destination: 'netherlands' },
  { passport: 'france', destination: 'switzerland' },
  { passport: 'france', destination: 'canada' },
  { passport: 'france', destination: 'china' },
  { passport: 'france', destination: 'austria' },
  { passport: 'france', destination: 'belgium' },
  { passport: 'france', destination: 'portugal' },
  { passport: 'france', destination: 'greece' },
  { passport: 'france', destination: 'croatia' },
  { passport: 'france', destination: 'poland' },
  { passport: 'france', destination: 'new-zealand' },
  { passport: 'mexico', destination: 'united-states' },
  { passport: 'mexico', destination: 'canada' },
  { passport: 'mexico', destination: 'spain' },
  { passport: 'mexico', destination: 'france' },
  { passport: 'mexico', destination: 'germany' },
  { passport: 'mexico', destination: 'italy' },
  { passport: 'mexico', destination: 'united-kingdom' },
  { passport: 'mexico', destination: 'japan' },
  { passport: 'mexico', destination: 'brazil' },
  { passport: 'mexico', destination: 'argentina' },
  { passport: 'brazil', destination: 'united-states' },
  { passport: 'brazil', destination: 'portugal' },
  { passport: 'brazil', destination: 'spain' },
  { passport: 'brazil', destination: 'france' },
  { passport: 'brazil', destination: 'germany' },
  { passport: 'brazil', destination: 'italy' },
  { passport: 'brazil', destination: 'united-kingdom' },
  { passport: 'brazil', destination: 'argentina' },
  { passport: 'brazil', destination: 'chile' },
  { passport: 'brazil', destination: 'japan' },
  { passport: 'philippines', destination: 'united-states' },
  { passport: 'philippines', destination: 'japan' },
  { passport: 'philippines', destination: 'singapore' },
  { passport: 'philippines', destination: 'thailand' },
  { passport: 'philippines', destination: 'south-korea' },
  { passport: 'philippines', destination: 'canada' },
  { passport: 'philippines', destination: 'australia' },
  { passport: 'philippines', destination: 'united-kingdom' },
  { passport: 'philippines', destination: 'united-arab-emirates' },
  { passport: 'philippines', destination: 'china' },
  { passport: 'south-korea', destination: 'united-states' },
  { passport: 'south-korea', destination: 'japan' },
  { passport: 'south-korea', destination: 'france' },
  { passport: 'south-korea', destination: 'germany' },
  { passport: 'south-korea', destination: 'italy' },
  { passport: 'south-korea', destination: 'spain' },
  { passport: 'south-korea', destination: 'united-kingdom' },
  { passport: 'south-korea', destination: 'thailand' },
  { passport: 'south-korea', destination: 'singapore' },
  { passport: 'south-korea', destination: 'australia' },
  { passport: 'vietnam', destination: 'south-korea' },
  { passport: 'vietnam', destination: 'japan' },
  { passport: 'vietnam', destination: 'singapore' },
  { passport: 'vietnam', destination: 'thailand' },
  { passport: 'vietnam', destination: 'china' },
  { passport: 'vietnam', destination: 'indonesia' },
  { passport: 'vietnam', destination: 'malaysia' },
  { passport: 'vietnam', destination: 'france' },
  { passport: 'vietnam', destination: 'germany' },
  { passport: 'vietnam', destination: 'united-kingdom' },
  { passport: 'indonesia', destination: 'singapore' },
  { passport: 'indonesia', destination: 'thailand' },
  { passport: 'indonesia', destination: 'malaysia' },
  { passport: 'indonesia', destination: 'japan' },
  { passport: 'indonesia', destination: 'south-korea' },
  { passport: 'indonesia', destination: 'china' },
  { passport: 'indonesia', destination: 'australia' },
  { passport: 'indonesia', destination: 'vietnam' },
  { passport: 'indonesia', destination: 'united-arab-emirates' },
  { passport: 'indonesia', destination: 'turkey' },
  { passport: 'malaysia', destination: 'thailand' },
  { passport: 'malaysia', destination: 'singapore' },
  { passport: 'malaysia', destination: 'japan' },
  { passport: 'malaysia', destination: 'south-korea' },
  { passport: 'malaysia', destination: 'indonesia' },
  { passport: 'denmark', destination: 'united-states' },
  { passport: 'denmark', destination: 'united-kingdom' },
  { passport: 'denmark', destination: 'france' },
  { passport: 'denmark', destination: 'germany' },
  { passport: 'denmark', destination: 'italy' },
  { passport: 'denmark', destination: 'spain' },
  { passport: 'denmark', destination: 'japan' },
  { passport: 'denmark', destination: 'thailand' },
  { passport: 'denmark', destination: 'australia' },
  { passport: 'denmark', destination: 'canada' },
  { passport: 'finland', destination: 'united-states' },
  { passport: 'finland', destination: 'united-kingdom' },
  { passport: 'finland', destination: 'france' },
  { passport: 'finland', destination: 'germany' },
  { passport: 'finland', destination: 'japan' },
  { passport: 'finland', destination: 'thailand' },
  { passport: 'finland', destination: 'australia' },
  { passport: 'finland', destination: 'canada' },
  { passport: 'finland', destination: 'spain' },
  { passport: 'finland', destination: 'italy' },
  { passport: 'ireland', destination: 'united-states' },
  { passport: 'ireland', destination: 'united-kingdom' },
  { passport: 'ireland', destination: 'france' },
  { passport: 'ireland', destination: 'germany' },
  { passport: 'ireland', destination: 'italy' },
  { passport: 'ireland', destination: 'spain' },
  { passport: 'ireland', destination: 'japan' },
  { passport: 'ireland', destination: 'australia' },
  { passport: 'ireland', destination: 'canada' },
  { passport: 'ireland', destination: 'thailand' },
  { passport: 'israel', destination: 'united-states' },
  { passport: 'israel', destination: 'united-kingdom' },
  { passport: 'israel', destination: 'france' },
  { passport: 'israel', destination: 'germany' },
  { passport: 'israel', destination: 'italy' },
  { passport: 'israel', destination: 'spain' },
  { passport: 'israel', destination: 'japan' },
  { passport: 'israel', destination: 'thailand' },
  { passport: 'israel', destination: 'australia' },
  { passport: 'israel', destination: 'canada' },
  { passport: 'norway', destination: 'united-states' },
  { passport: 'norway', destination: 'united-kingdom' },
  { passport: 'norway', destination: 'france' },
  { passport: 'norway', destination: 'germany' },
  { passport: 'norway', destination: 'italy' },
  { passport: 'norway', destination: 'spain' },
  { passport: 'norway', destination: 'japan' },
  { passport: 'norway', destination: 'thailand' },
  { passport: 'norway', destination: 'australia' },
  { passport: 'norway', destination: 'canada' },
  { passport: 'sweden', destination: 'united-states' },
  { passport: 'sweden', destination: 'united-kingdom' },
  { passport: 'sweden', destination: 'france' },
  { passport: 'sweden', destination: 'germany' },
  { passport: 'sweden', destination: 'italy' },
  { passport: 'sweden', destination: 'spain' },
  { passport: 'sweden', destination: 'japan' },
  { passport: 'sweden', destination: 'thailand' },
  { passport: 'sweden', destination: 'australia' },
  { passport: 'sweden', destination: 'canada' },
  { passport: 'romania', destination: 'united-states' },
  { passport: 'romania', destination: 'united-kingdom' },
  { passport: 'romania', destination: 'france' },
  { passport: 'romania', destination: 'germany' },
  { passport: 'romania', destination: 'italy' },
  { passport: 'romania', destination: 'spain' },
  { passport: 'romania', destination: 'japan' },
  { passport: 'romania', destination: 'thailand' },
  { passport: 'romania', destination: 'turkey' },
  { passport: 'romania', destination: 'egypt' },
  { passport: 'ukraine', destination: 'united-states' },
  { passport: 'ukraine', destination: 'united-kingdom' },
  { passport: 'ukraine', destination: 'germany' },
  { passport: 'ukraine', destination: 'france' },
  { passport: 'ukraine', destination: 'italy' },
  { passport: 'ukraine', destination: 'spain' },
  { passport: 'ukraine', destination: 'turkey' },
  { passport: 'ukraine', destination: 'egypt' },
  { passport: 'ukraine', destination: 'thailand' },
  { passport: 'ukraine', destination: 'united-arab-emirates' },
  { passport: 'peru', destination: 'united-states' },
  { passport: 'peru', destination: 'spain' },
  { passport: 'peru', destination: 'france' },
  { passport: 'peru', destination: 'germany' },
  { passport: 'peru', destination: 'italy' },
  { passport: 'peru', destination: 'united-kingdom' },
  { passport: 'peru', destination: 'brazil' },
  { passport: 'peru', destination: 'chile' },
  { passport: 'peru', destination: 'argentina' },
  { passport: 'peru', destination: 'colombia' },
  { passport: 'morocco', destination: 'france' },
  { passport: 'morocco', destination: 'spain' },
  { passport: 'morocco', destination: 'united-states' },
  { passport: 'morocco', destination: 'united-kingdom' },
  { passport: 'morocco', destination: 'germany' },
  { passport: 'morocco', destination: 'italy' },
  { passport: 'morocco', destination: 'turkey' },
  { passport: 'morocco', destination: 'united-arab-emirates' },
  { passport: 'morocco', destination: 'egypt' },
  { passport: 'morocco', destination: 'saudi-arabia' },
  { passport: 'turkey', destination: 'germany' },
  { passport: 'turkey', destination: 'united-states' },
  { passport: 'turkey', destination: 'united-kingdom' },
  { passport: 'turkey', destination: 'france' },
  { passport: 'turkey', destination: 'netherlands' },
  { passport: 'turkey', destination: 'spain' },
  { passport: 'turkey', destination: 'italy' },
  { passport: 'turkey', destination: 'greece' },
  { passport: 'turkey', destination: 'saudi-arabia' },
  { passport: 'turkey', destination: 'united-arab-emirates' },
];

export function getPassportBySlug(slug: string): Country | undefined {
  return PASSPORTS.find(p => p.slug === slug);
}

export function getDestinationBySlug(slug: string): Country | undefined {
  return DESTINATIONS.find(d => d.slug === slug);
}

export function getAllPassportSlugs(): string[] {
  return PASSPORTS.map(p => p.slug);
}

export function getAllDestinationSlugs(): string[] {
  return DESTINATIONS.map(d => d.slug);
}

export function getAllPairSlugs(): Array<{ passport: string; destination: string }> {
  const pairs: Array<{ passport: string; destination: string }> = [];
  for (const passport of PASSPORTS) {
    for (const destination of DESTINATIONS) {
      if (passport.slug !== destination.slug) {
        pairs.push({ passport: passport.slug, destination: destination.slug });
      }
    }
  }
  return pairs;
}

export function getTopPairsForPassport(passportSlug: string, limit = 12): Array<{ passport: string; destination: string }> {
  return TOP_PAIRS_300.filter(p => p.passport === passportSlug).slice(0, limit);
}

export function getTopPairsForDestination(destinationSlug: string, limit = 12): Array<{ passport: string; destination: string }> {
  return TOP_PAIRS_300.filter(p => p.destination === destinationSlug).slice(0, limit);
}

export function getRelatedPairs(passportSlug: string, destinationSlug: string, limit = 3): Array<{ passport: string; destination: string }> {
  const samePassport = TOP_PAIRS_300.filter(p => p.passport === passportSlug && p.destination !== destinationSlug).slice(0, 2);
  const sameDestination = TOP_PAIRS_300.filter(p => p.destination === destinationSlug && p.passport !== passportSlug).slice(0, 1);
  return [...samePassport, ...sameDestination].slice(0, limit);
}

export function isPairInTopCurated(passportSlug: string, destinationSlug: string): boolean {
  return TOP_PAIRS_300.some(p => p.passport === passportSlug && p.destination === destinationSlug);
}

// PRERENDER_PRIORITY_PAIRS is an alias for TOP_PAIRS_300.
// It represents the bounded set of pair pages prebuilt at deploy time.
// It is NOT a cap on which pairs can exist — any valid pair with database
// data will render on-demand via ISR. Add pairs here only to influence
// build-time prewarming, not to gate page access.
export const PRERENDER_PRIORITY_PAIRS = TOP_PAIRS_300;

// PRIMARY_CLUSTER_PAIRS: All destinations for 5 priority passports
// Used for sitemap priority weighting and cluster link blocks.
// Not used for generateStaticParams — on-demand ISR handles the long tail.
export const PRIMARY_PASSPORTS = [
  'united-states',
  'united-kingdom',
  'india',
  'china',
  'canada',
] as const;

export const PRIMARY_CLUSTER_PAIRS = PRIMARY_PASSPORTS.flatMap(passport =>
  DESTINATIONS
    .filter(dest => dest.slug !== passport)
    .map(dest => ({ passport, destination: dest.slug }))
);

// Returns true if a pair belongs to the primary cluster (used for sitemap priority).
export function isPrimaryClusterPair(passportSlug: string, destinationSlug: string): boolean {
  return (PRIMARY_PASSPORTS as readonly string[]).includes(passportSlug);
}

// Returns the bounded set of pair params to prerender at build time.
// All other valid pairs resolve on-demand via ISR (dynamicParams = true).
export function getPriorityPairStaticParams(): Array<{ passport: string; destination: string }> {
  const uniquePairs = new Map<string, { passport: string; destination: string }>();
  for (const pair of PRERENDER_PRIORITY_PAIRS) {
    if (pair.passport !== pair.destination) {
      uniquePairs.set(`${pair.passport}:${pair.destination}`, pair);
    }
  }
  return Array.from(uniquePairs.values());
}

// Kept for backwards compatibility — delegates to getPriorityPairStaticParams.
export function getAllStaticPairs(): Array<{ passport: string; destination: string }> {
  return getPriorityPairStaticParams();
}

// Get other destinations within the same passport cluster (for cluster authority blocks)
export function getClusterDestinations(
  passportSlug: string,
  currentDestinationSlug: string,
  limit = 12
): Array<{ destination: string; name: string }> {
  if (!PRIMARY_PASSPORTS.includes(passportSlug as any)) {
    return [];
  }

  return DESTINATIONS
    .filter(dest => dest.slug !== passportSlug && dest.slug !== currentDestinationSlug)
    .slice(0, limit)
    .map(dest => ({ destination: dest.slug, name: dest.name }));
}

export type DestinationRegion = 'europe' | 'asia' | 'americas' | 'africa' | 'middle-east' | 'oceania';

export interface RegionMeta {
  slug: DestinationRegion;
  name: string;
  description: string;
  intro: string;
}

export const REGIONS: RegionMeta[] = [
  {
    slug: 'europe',
    name: 'Europe',
    description: 'Visa requirements and entry rules for European destinations including Schengen Area countries and non-Schengen EU members.',
    intro: 'Europe includes 27 Schengen Area countries plus several non-Schengen destinations. Visa requirements vary significantly by passport nationality. Many passports enjoy visa-free access across the continent, while others require a Schengen visa or individual national visas.',
  },
  {
    slug: 'asia',
    name: 'Asia',
    description: 'Visa requirements and entry rules for Asian destinations including Southeast Asia, East Asia, and South Asia.',
    intro: 'Asia is one of the world\'s most visited regions, with dramatically different visa policies by country. Southeast Asian nations like Thailand, Singapore, and Vietnam attract millions of visitors annually. East Asian destinations including Japan, South Korea, and China have distinct entry requirements by passport.',
  },
  {
    slug: 'americas',
    name: 'Americas',
    description: 'Visa requirements and entry rules for North American, Central American, South American, and Caribbean destinations.',
    intro: 'The Americas span from Canada and the United States in the north to Argentina and Chile in the south. Visa requirements vary widely — US and Canada have strict entry requirements for many passport holders, while most Latin American countries offer generous visa-free policies.',
  },
  {
    slug: 'africa',
    name: 'Africa',
    description: 'Visa requirements and entry rules for African destinations across North Africa, East Africa, West Africa, and Southern Africa.',
    intro: 'Africa\'s 54 countries offer diverse travel experiences with a wide range of visa policies. Some destinations like Morocco, Kenya, and South Africa are popular tourism hubs with relatively accessible entry. Many African countries now offer e-Visa systems, making access easier than ever.',
  },
  {
    slug: 'middle-east',
    name: 'Middle East',
    description: 'Visa requirements and entry rules for Middle Eastern destinations including the Gulf states, Turkey, Egypt, and Israel.',
    intro: 'The Middle East includes some of the world\'s most dynamic travel destinations. UAE and Qatar offer visa-on-arrival or visa-free access to most Western passport holders. Turkey bridges Europe and Asia with generous visa-free policies. Saudi Arabia has opened for tourism with a new e-Visa system.',
  },
  {
    slug: 'oceania',
    name: 'Oceania',
    description: 'Visa requirements and entry rules for Oceanic destinations including Australia, New Zealand, and Pacific Island nations.',
    intro: 'Oceania is dominated by Australia and New Zealand, both with well-defined electronic travel authorization systems. Australia\'s eVisitor and ETA programs and New Zealand\'s NZeTA cover most passport holders from eligible countries. Pacific Island nations offer some of the most generous visa-free policies worldwide.',
  },
];

const REGION_MAP: Record<string, DestinationRegion> = {
  'algeria': 'africa', 'angola': 'africa', 'ethiopia': 'africa', 'ghana': 'africa',
  'kenya': 'africa', 'morocco': 'africa', 'nigeria': 'africa', 'south-africa': 'africa',
  'tanzania': 'africa', 'tunisia': 'africa', 'zimbabwe': 'africa',

  'armenia': 'asia', 'azerbaijan': 'asia', 'bangladesh': 'asia', 'cambodia': 'asia',
  'china': 'asia', 'india': 'asia', 'indonesia': 'asia', 'japan': 'asia',
  'kazakhstan': 'asia', 'laos': 'asia', 'malaysia': 'asia', 'maldives': 'asia',
  'mongolia': 'asia', 'myanmar': 'asia', 'nepal': 'asia', 'pakistan': 'asia',
  'philippines': 'asia', 'singapore': 'asia', 'south-korea': 'asia', 'sri-lanka': 'asia',
  'thailand': 'asia', 'uzbekistan': 'asia', 'vietnam': 'asia',

  'argentina': 'americas', 'bahamas': 'americas', 'barbados': 'americas', 'bolivia': 'americas',
  'brazil': 'americas', 'canada': 'americas', 'chile': 'americas', 'colombia': 'americas',
  'costa-rica': 'americas', 'cuba': 'americas', 'dominican-republic': 'americas',
  'ecuador': 'americas', 'jamaica': 'americas', 'mexico': 'americas', 'panama': 'americas',
  'paraguay': 'americas', 'peru': 'americas', 'united-states': 'americas', 'uruguay': 'americas',

  'austria': 'europe', 'belgium': 'europe', 'bulgaria': 'europe', 'croatia': 'europe',
  'cyprus': 'europe', 'czech-republic': 'europe', 'denmark': 'europe', 'estonia': 'europe',
  'finland': 'europe', 'france': 'europe', 'georgia': 'europe', 'germany': 'europe',
  'greece': 'europe', 'hungary': 'europe', 'iceland': 'europe', 'ireland': 'europe',
  'israel': 'europe', 'italy': 'europe', 'latvia': 'europe', 'lithuania': 'europe',
  'luxembourg': 'europe', 'malta': 'europe', 'netherlands': 'europe', 'norway': 'europe',
  'poland': 'europe', 'portugal': 'europe', 'romania': 'europe', 'russia': 'europe',
  'serbia': 'europe', 'slovakia': 'europe', 'slovenia': 'europe', 'spain': 'europe',
  'sweden': 'europe', 'switzerland': 'europe', 'ukraine': 'europe', 'united-kingdom': 'europe',
  'turkmenistan': 'asia',

  'bahrain': 'middle-east', 'egypt': 'middle-east', 'jordan': 'middle-east',
  'kuwait': 'middle-east', 'oman': 'middle-east', 'qatar': 'middle-east',
  'saudi-arabia': 'middle-east', 'turkey': 'middle-east', 'united-arab-emirates': 'middle-east',

  'australia': 'oceania', 'new-zealand': 'oceania',
};

export function getDestinationRegion(slug: string): DestinationRegion | null {
  return REGION_MAP[slug] ?? null;
}

export function getDestinationsForRegion(region: DestinationRegion): Country[] {
  return DESTINATIONS.filter(d => REGION_MAP[d.slug] === region);
}

export function getRegionBySlug(slug: string): RegionMeta | undefined {
  return REGIONS.find(r => r.slug === slug);
}

export function getAllRegionSlugs(): DestinationRegion[] {
  return REGIONS.map(r => r.slug);
}
