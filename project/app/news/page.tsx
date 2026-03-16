import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, ExternalLink, Hash, Newspaper, AlertTriangle } from 'lucide-react';
import { breadcrumbJsonLd } from '@/lib/seo';
import { getNewsIndex } from '@/lib/data/news';

export const revalidate = 3600;

const BASE_URL = 'https://visainfoguide.com';
const SITE_NAME = 'VisaInfoGuide';

export const metadata: Metadata = {
  title: `Visa & Immigration News (2026) | ${SITE_NAME}`,
  description: 'Latest visa policy changes, citizenship overhauls, and immigration updates from around the world. Up-to-date news for international travelers and immigrants.',
  alternates: { canonical: `${BASE_URL}/news` },
  robots: { index: true, follow: true },
  openGraph: {
    title: `Visa & Immigration News (2026) | ${SITE_NAME}`,
    description: 'Latest visa policy changes, citizenship overhauls, and immigration updates from around the world.',
    type: 'website',
    url: `${BASE_URL}/news`,
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Visa & Immigration News (2026) | ${SITE_NAME}`,
    description: 'Latest visa policy changes, citizenship overhauls, and immigration updates from around the world.',
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function NewsIndexPage() {
  let newsPosts: Awaited<ReturnType<typeof getNewsIndex>> = [];
  try {
    newsPosts = await getNewsIndex();
  } catch {
    newsPosts = [];
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Latest Visa & Immigration News',
    description: 'Up-to-date visa policy changes and immigration updates',
    url: `${BASE_URL}/news`,
    numberOfItems: newsPosts.length,
    itemListElement: newsPosts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${BASE_URL}/news/${post.slug}`,
      name: post.title,
    })),
  };

  const breadcrumbSchema = breadcrumbJsonLd([
    { name: 'Home', url: BASE_URL },
    { name: 'Visa & Immigration News', url: `${BASE_URL}/news` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">

            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-teal-50 border border-teal-100">
                <Newspaper className="h-5 w-5 text-teal-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Visa & Immigration News</h1>
                <p className="text-sm text-gray-500 mt-0.5">Up-to-date policy changes and entry requirement updates</p>
              </div>
            </div>

            {newsPosts.length === 0 ? (
              <div className="mt-8 text-center py-12 text-gray-500">
                News articles are temporarily unavailable. Please check back soon.
              </div>
            ) : (
              <div className="mt-8 space-y-5">
                {newsPosts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className="h-4 w-4 text-teal-500 flex-shrink-0" />
                        <time dateTime={post.published_at} className="text-sm text-teal-600 font-medium">
                          {formatDate(post.published_at)}
                        </time>
                      </div>

                      <h2 className="text-lg font-bold text-gray-900 leading-snug mb-3 flex items-start gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <Link
                          href={`/news/${post.slug}`}
                          className="hover:text-teal-700 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h2>

                      <p className="text-gray-600 text-sm leading-relaxed mb-4">{post.summary}</p>

                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <div className="flex flex-wrap gap-1.5">
                          {post.hashtags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1 text-xs font-medium text-teal-700 bg-teal-50 border border-teal-100 rounded-full px-2.5 py-0.5"
                            >
                              <Hash className="h-3 w-3" />
                              {tag.replace(/^#/, '')}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-3">
                          {post.source_url && (
                            <a
                              href={post.source_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-xs text-gray-400 hover:text-teal-600 transition-colors"
                            >
                              <ExternalLink className="h-3 w-3" />
                              Source
                            </a>
                          )}
                          <Link
                            href={`/news/${post.slug}`}
                            className="text-sm text-teal-600 hover:text-teal-800 font-semibold transition-colors"
                          >
                            Read more
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            <div className="mt-12 pt-8 border-t border-gray-100 text-center">
              <Link href="/" className="text-sm text-teal-600 hover:text-teal-800 font-medium">
                Back to Visa Checker
              </Link>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
