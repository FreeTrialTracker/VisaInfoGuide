import { supabase } from '@/lib/supabase';

export async function GET() {
  const baseUrl = 'https://visainfoguide.com';

  let posts: Array<{ slug: string; published_at: string }> = [];
  try {
    const { data, error } = await supabase
      .from('news_posts')
      .select('slug, published_at')
      .order('published_at', { ascending: false });
    if (!error && data) posts = data;
  } catch {
    posts = [];
  }

  const urls: string[] = [
    `
  <url>
    <loc>${baseUrl}/news</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`,
  ];

  posts.forEach((post: { slug: string; published_at: string }) => {
    urls.push(`
  <url>
    <loc>${baseUrl}/news/${post.slug}</loc>
    <lastmod>${new Date(post.published_at).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">${urls.join('')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
    },
  });
}
