export async function GET() {
  const baseUrl = 'https://visainfoguide.com';
  const currentDate = new Date().toISOString();

  const pages = [
    { loc: `${baseUrl}`, changefreq: 'weekly', priority: '1.0' },
    { loc: `${baseUrl}/visa-guides`, changefreq: 'weekly', priority: '0.9' },
    { loc: `${baseUrl}/visa-guides/do-i-need-a-visa`, changefreq: 'monthly', priority: '0.9' },
    { loc: `${baseUrl}/visa-guides/do-i-need-a-visa/articles`, changefreq: 'monthly', priority: '0.8' },
    { loc: `${baseUrl}/visa-guides/visa-free-countries`, changefreq: 'monthly', priority: '0.9' },
    { loc: `${baseUrl}/visa-guides/country-entry-requirements`, changefreq: 'monthly', priority: '0.9' },
    { loc: `${baseUrl}/visa-guides/travel-visa-rules`, changefreq: 'monthly', priority: '0.8' },
    { loc: `${baseUrl}/tools`, changefreq: 'monthly', priority: '0.8' },
    { loc: `${baseUrl}/tools/schengen-calculator`, changefreq: 'monthly', priority: '0.8' },
    { loc: `${baseUrl}/compare`, changefreq: 'monthly', priority: '0.8' },
    { loc: `${baseUrl}/resources`, changefreq: 'weekly', priority: '0.9' },
    { loc: `${baseUrl}/about`, changefreq: 'monthly', priority: '0.7' },
    { loc: `${baseUrl}/methodology`, changefreq: 'monthly', priority: '0.7' },
    { loc: `${baseUrl}/data-sources`, changefreq: 'monthly', priority: '0.7' },
    { loc: `${baseUrl}/privacy`, changefreq: 'yearly', priority: '0.5' },
    { loc: `${baseUrl}/terms`, changefreq: 'yearly', priority: '0.5' },
  ];

  const urls = pages.map(p => `
  <url>
    <loc>${p.loc}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
    },
  });
}
