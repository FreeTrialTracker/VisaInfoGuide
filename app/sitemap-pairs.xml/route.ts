import { supabase } from '@/lib/supabase';
import { isPrimaryClusterPair } from '@/lib/countries';

export async function GET() {
  const baseUrl = 'https://visainfoguide.com';
  const currentDate = new Date().toISOString();

  let validPairs: Array<{ passport_slug: string; destination_slug: string; updated_at?: string }> = [];

  try {
    const { data, error } = await supabase
      .from('visa_rules')
      .select('passport_slug, destination_slug, updated_at')
      .neq('visa_type', 'restricted');

    if (!error && data && data.length > 0) {
      const seen = new Set<string>();
      for (const row of data) {
        const key = `${row.passport_slug}|${row.destination_slug}`;
        if (!seen.has(key) && row.passport_slug !== row.destination_slug) {
          seen.add(key);
          validPairs.push(row);
        }
      }
    }
  } catch {
    validPairs = [];
  }

  const urls: string[] = [];

  validPairs.forEach(pair => {
    const priority = isPrimaryClusterPair(pair.passport_slug, pair.destination_slug) ? '0.8' : '0.7';
    const lastmod = pair.updated_at ? new Date(pair.updated_at).toISOString() : currentDate;

    urls.push(`
  <url>
    <loc>${baseUrl}/passport/${pair.passport_slug}/destination/${pair.destination_slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`);
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
