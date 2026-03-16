import { createClient } from "@supabase/supabase-js";
import { MetadataRoute } from "next";

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [{ data: passports }, { data: destinations }] = await Promise.all([
    supabase.from("passports").select("slug, updated_at").eq("is_active", true),
    supabase.from("destinations").select("slug, updated_at").eq("is_active", true),
  ]);

  const urls: MetadataRoute.Sitemap = [];

  (passports ?? []).forEach((p) => {
    urls.push({
      url: `https://visainfoguide.com/passport/${p.slug}`,
      lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });

  (destinations ?? []).forEach((d) => {
    urls.push({
      url: `https://visainfoguide.com/destination/${d.slug}`,
      lastModified: d.updated_at ? new Date(d.updated_at) : new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });

  return urls;
}
