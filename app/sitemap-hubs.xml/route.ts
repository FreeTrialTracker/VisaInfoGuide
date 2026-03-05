import { supabase } from '@/lib/supabase';
import { getAllPassportSlugs, getAllDestinationSlugs } from '@/lib/countries';
import { getAllPassportSlugs as getVisaFreePassportSlugs } from '@/lib/passport-visa-data';
import { getAllDestinationSlugs as getEntryDestinationSlugs } from '@/lib/destination-entry-data';

const STATIC_PASSPORT_SLUGS = new Set(getAllPassportSlugs());
const STATIC_DESTINATION_SLUGS = new Set(getAllDestinationSlugs());

export async function GET() {
  const baseUrl = 'https://visainfoguide.com';
  const currentDate = new Date().toISOString();

  const { data: passportsRaw } = await supabase
    .from('passports')
    .select('slug, updated_at')
    .eq('is_active', true);

  const { data: destinationsRaw } = await supabase
    .from('destinations')
    .select('slug, updated_at')
    .eq('is_active', true);

  const passports = passportsRaw?.filter(p => STATIC_PASSPORT_SLUGS.has(p.slug)) ?? null;
  const destinations = destinationsRaw?.filter(d => STATIC_DESTINATION_SLUGS.has(d.slug)) ?? null;

  const urls: string[] = [];

  urls.push(`
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`);

  urls.push(`
  <url>
    <loc>${baseUrl}/resources</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`);

  urls.push(`
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`);

  urls.push(`
  <url>
    <loc>${baseUrl}/methodology</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`);

  urls.push(`
  <url>
    <loc>${baseUrl}/data-sources</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`);

  urls.push(`
  <url>
    <loc>${baseUrl}/privacy</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>`);

  urls.push(`
  <url>
    <loc>${baseUrl}/terms</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>`);

  urls.push(`
  <url>
    <loc>${baseUrl}/tools</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`);

  urls.push(`
  <url>
    <loc>${baseUrl}/tools/schengen-calculator</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`);

  urls.push(`
  <url>
    <loc>${baseUrl}/compare</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`);

  urls.push(`
  <url>
    <loc>${baseUrl}/visa-guides</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`);

  urls.push(`
  <url>
    <loc>${baseUrl}/visa-guides/do-i-need-a-visa</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`);

  urls.push(`
  <url>
    <loc>${baseUrl}/visa-guides/do-i-need-a-visa/articles</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`);

  urls.push(`
  <url>
    <loc>${baseUrl}/visa-guides/visa-free-countries</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`);

  urls.push(`
  <url>
    <loc>${baseUrl}/visa-guides/country-entry-requirements</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`);

  urls.push(`
  <url>
    <loc>${baseUrl}/visa-guides/travel-visa-rules</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`);

  getVisaFreePassportSlugs().forEach(slug => {
    urls.push(`
  <url>
    <loc>${baseUrl}/visa-guides/visa-free-countries/${slug}-passport-2026</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`);
  });

  getEntryDestinationSlugs().forEach(slug => {
    urls.push(`
  <url>
    <loc>${baseUrl}/visa-guides/country-entry-requirements/${slug}-2026</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`);
  });

  if (passports && passports.length > 0) {
    passports.forEach(passport => {
      urls.push(`
  <url>
    <loc>${baseUrl}/passport/${passport.slug}</loc>
    <lastmod>${new Date(passport.updated_at).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`);
    });
  } else {
    getAllPassportSlugs().forEach(slug => {
      urls.push(`
  <url>
    <loc>${baseUrl}/passport/${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`);
    });
  }

  if (destinations && destinations.length > 0) {
    destinations.forEach(destination => {
      urls.push(`
  <url>
    <loc>${baseUrl}/destination/${destination.slug}</loc>
    <lastmod>${new Date(destination.updated_at).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`);
    });
  } else {
    getAllDestinationSlugs().forEach(slug => {
      urls.push(`
  <url>
    <loc>${baseUrl}/destination/${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`);
    });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
    },
  });
}
