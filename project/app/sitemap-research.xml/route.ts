import { getAllPublishedResearchArticles } from '@/lib/data/research';

export async function GET() {
  const baseUrl = 'https://visainfoguide.com';
  const articles = await getAllPublishedResearchArticles();

  const urls = articles.map((article) => `
  <url>
    <loc>${baseUrl}/research/${article.slug}</loc>
    <lastmod>${new Date(article.date_modified).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`);

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
