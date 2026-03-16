import { supabase } from '@/lib/supabase';

export async function GET() {
  const baseUrl = 'https://visainfoguide.com';

  let posts: Array<{ slug: string; updated_at: string; published_at: string }> = [];
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('slug, updated_at, published_at')
      .order('published_at', { ascending: false });
    if (!error && data) posts = data;
  } catch {
    posts = [];
  }

  const urls: string[] = [
    `
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`,
  ];

  posts.forEach((post) => {
    const lastmod = post.updated_at ?? post.published_at;
    urls.push(`
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(lastmod).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
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
