import { supabase } from '@/lib/supabase';

export interface CrosslinkEntry {
  visa_slug: string;
  visa_url: string;
}

let cachedCrosslinks: CrosslinkEntry[] | null = null;

async function fetchAllCrosslinks(): Promise<CrosslinkEntry[]> {
  if (cachedCrosslinks) return cachedCrosslinks;

  const { data, error } = await supabase
    .from('country_crosslinks')
    .select('visa_slug, visa_url')
    .eq('is_active', true)
    .order('visa_slug');

  if (error || !data) return [];

  cachedCrosslinks = data as CrosslinkEntry[];
  return cachedCrosslinks;
}

export async function getCrosslinkBySlug(slug: string): Promise<CrosslinkEntry | null> {
  const all = await fetchAllCrosslinks();
  return all.find(r => r.visa_slug === slug) ?? null;
}

export async function getCrosslinksForSlugs(slugs: string[]): Promise<CrosslinkEntry[]> {
  const all = await fetchAllCrosslinks();
  const slugSet = new Set(slugs);
  return all.filter(r => slugSet.has(r.visa_slug));
}

// Regional destination groups — used to derive contextual sibling destinations.
// Each group lists slugs of countries in the same geographic/political region.
const REGIONAL_GROUPS: Record<string, string[]> = {
  schengen: [
    'austria', 'belgium', 'croatia', 'czech-republic', 'denmark', 'finland',
    'france', 'germany', 'greece', 'hungary', 'italy', 'netherlands',
    'norway', 'poland', 'portugal', 'spain', 'sweden', 'switzerland',
  ],
  southeast_asia: [
    'cambodia', 'indonesia', 'laos', 'malaysia', 'myanmar', 'philippines',
    'singapore', 'thailand', 'vietnam',
  ],
  east_asia: [
    'china', 'japan', 'mongolia', 'south-korea',
  ],
  south_asia: [
    'bangladesh', 'india', 'maldives', 'nepal', 'pakistan', 'sri-lanka',
  ],
  middle_east: [
    'bahrain', 'egypt', 'jordan', 'kuwait', 'oman', 'qatar', 'saudi-arabia',
    'turkey', 'united-arab-emirates',
  ],
  north_america: [
    'canada', 'mexico', 'united-states',
  ],
  south_america: [
    'argentina', 'bolivia', 'brazil', 'chile', 'colombia', 'ecuador',
    'paraguay', 'peru', 'uruguay',
  ],
  caribbean_central_america: [
    'bahamas', 'barbados', 'costa-rica', 'cuba', 'dominican-republic',
    'jamaica', 'panama',
  ],
  eastern_europe_caucasus: [
    'armenia', 'azerbaijan', 'bulgaria', 'georgia', 'romania', 'russia',
    'serbia', 'ukraine',
  ],
  central_asia: [
    'kazakhstan', 'uzbekistan',
  ],
  oceania: [
    'australia', 'new-zealand',
  ],
  africa: [
    'algeria', 'ethiopia', 'ghana', 'kenya', 'morocco', 'nigeria',
    'south-africa', 'tanzania', 'tunisia', 'zimbabwe',
  ],
  british_isles: [
    'ireland', 'united-kingdom',
  ],
  nordic: [
    'denmark', 'finland', 'iceland', 'norway', 'sweden',
  ],
};

function getRegionForSlug(slug: string): string | null {
  for (const [region, slugs] of Object.entries(REGIONAL_GROUPS)) {
    if (slugs.includes(slug)) return region;
  }
  return null;
}

export interface ContextualDestinationLink {
  slug: string;
  name: string;
  href: string;
}

/**
 * Returns up to `limit` contextual destination links for a given destination slug.
 * Picks sibling countries from the same regional group, resolving canonical hrefs
 * from the country_crosslinks table. Falls back to constructed /destination/ paths
 * for countries not in crosslinks.
 *
 * Excludes `excludeSlug` (the current page's destination) and `excludePassportSlug`
 * (to avoid self-referential pair links).
 */
export async function getContextualDestinationLinks(
  destinationSlug: string,
  options: {
    excludePassportSlug?: string;
    limit?: number;
  } = {}
): Promise<ContextualDestinationLink[]> {
  const { excludePassportSlug, limit = 6 } = options;

  const region = getRegionForSlug(destinationSlug);
  if (!region) return [];

  const siblings = REGIONAL_GROUPS[region].filter(
    slug => slug !== destinationSlug && slug !== excludePassportSlug
  );

  if (siblings.length === 0) return [];

  const crosslinks = await getCrosslinksForSlugs(siblings);
  const crosslinkMap = new Map(crosslinks.map(c => [c.visa_slug, c.visa_url]));

  const results: ContextualDestinationLink[] = siblings
    .slice(0, limit)
    .map(slug => {
      const rawUrl = crosslinkMap.get(slug);
      const href = rawUrl
        ? new URL(rawUrl).pathname
        : `/destination/${slug}`;
      const name = slug
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      return { slug, name, href };
    });

  return results;
}

/**
 * Returns up to `limit` contextual pair links for a passport on a pair page.
 * Finds sibling destinations in the same region as `destinationSlug` and
 * constructs pair page hrefs for `passportSlug` → sibling.
 */
export async function getContextualPairLinks(
  passportSlug: string,
  destinationSlug: string,
  limit = 5
): Promise<ContextualDestinationLink[]> {
  const region = getRegionForSlug(destinationSlug);
  if (!region) return [];

  const siblings = REGIONAL_GROUPS[region].filter(
    slug => slug !== destinationSlug && slug !== passportSlug
  );

  if (siblings.length === 0) return [];

  return siblings.slice(0, limit).map(slug => {
    const name = slug
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    return {
      slug,
      name,
      href: `/passport/${passportSlug}/destination/${slug}`,
    };
  });
}
