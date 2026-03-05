export async function GET() {
  const baseUrl = 'https://visainfoguide.com';
  const currentDate = new Date().toISOString();

  const researchPages = [
    'most-powerful-passports-2026',
    'schengen-90-180-rule-explained',
    'passport-validity-rules-by-country',
    'visa-free-vs-visa-on-arrival-vs-evisa',
    'onward-ticket-requirements-by-country',
    'best-passports-for-visa-free-travel-in-asia-2026',
  ];

  const urls: string[] = [];

  researchPages.forEach(page => {
    urls.push(`
  <url>
    <loc>${baseUrl}/research/${page}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`);
  });

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
