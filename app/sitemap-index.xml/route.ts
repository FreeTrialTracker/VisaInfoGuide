export async function GET() {
  const baseUrl = 'https://visainfoguide.com';
  const now = new Date().toISOString();

  const sitemaps = [
    { loc: `${baseUrl}/sitemap-hubs.xml`, lastmod: now },
    { loc: `${baseUrl}/sitemap-pairs.xml`, lastmod: now },
    { loc: `${baseUrl}/sitemap-news.xml`, lastmod: now },
    { loc: `${baseUrl}/sitemap-research.xml`, lastmod: now },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    s => `  <sitemap>
    <loc>${s.loc}</loc>
    <lastmod>${s.lastmod}</lastmod>
  </sitemap>`
  )
  .join('\n')}
</sitemapindex>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
