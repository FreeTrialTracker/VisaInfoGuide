import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, ExternalLink, ArrowLeft, Hash, AlertTriangle } from 'lucide-react';
import { breadcrumbJsonLd } from '@/lib/seo';
import { getNewsPost, getNewsPostSlugs } from '@/lib/data/news';
import { safeLoad } from '@/lib/errors';
import TemporaryUnavailable from '@/components/TemporaryUnavailable';

export const revalidate = 3600;

const BASE_URL = 'https://visainfoguide.com';
const SITE_NAME = 'VisaInfoGuide';

export async function generateStaticParams() {
  const slugs = await getNewsPostSlugs();
  return slugs.map((slug: string) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const post = await getNewsPost(params.slug);
    if (!post) return { title: 'Not Found' };

    const url = `${BASE_URL}/news/${post.slug}`;
    return {
      title: `${post.title} | ${SITE_NAME}`,
      description: post.summary,
      alternates: { canonical: url },
      robots: { index: true, follow: true },
      openGraph: {
        title: post.title,
        description: post.summary,
        type: 'article',
        url,
        siteName: SITE_NAME,
        publishedTime: post.published_at,
        tags: post.hashtags,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.summary,
      },
    };
  } catch {
    return { title: 'Not Found' };
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function applyBold(text: string, bolds?: string[]) {
  if (!bolds || bolds.length === 0) return <span>{text}</span>;
  const parts: React.ReactNode[] = [];
  let remaining = text;
  bolds.forEach((bold) => {
    const idx = remaining.indexOf(bold);
    if (idx === -1) return;
    if (idx > 0) parts.push(remaining.slice(0, idx));
    parts.push(<strong key={bold} className="font-semibold text-gray-900">{bold}</strong>);
    remaining = remaining.slice(idx + bold.length);
  });
  if (remaining) parts.push(remaining);
  return <span>{parts}</span>;
}

type ContentBlock = {
  type: 'paragraph' | 'section' | 'list' | 'callout';
  icon?: string;
  heading?: string;
  text?: string;
  bold?: string[];
  items?: { icon?: string; text: string; bold?: string[] }[];
};

function renderContent(block: ContentBlock, index: number) {
  if (block.type === 'paragraph') {
    return (
      <p key={index} className="text-gray-700 leading-relaxed">
        {block.bold ? applyBold(block.text || '', block.bold) : block.text}
      </p>
    );
  }
  if (block.type === 'callout') {
    return (
      <div key={index} className="bg-amber-50 border border-amber-200 rounded-lg px-5 py-4">
        <p className="text-amber-900 leading-relaxed font-medium">
          {block.bold ? applyBold(block.text || '', block.bold) : block.text}
        </p>
      </div>
    );
  }
  if (block.type === 'section') {
    return (
      <div key={index} className="space-y-3">
        {block.heading && (
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            {block.icon && <span>{block.icon}</span>}
            {block.heading}
          </h2>
        )}
        {block.items && (
          <ul className="space-y-2 pl-1">
            {block.items.map((item, j) => (
              <li key={j} className="flex items-start gap-2 text-gray-700">
                {item.icon && <span className="flex-shrink-0 mt-0.5">{item.icon}</span>}
                <span>{applyBold(item.text, item.bold)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  if (block.type === 'list') {
    return (
      <ul key={index} className="space-y-2 pl-1">
        {block.items?.map((item, j) => (
          <li key={j} className="flex items-start gap-2 text-gray-700">
            {item.icon && <span className="flex-shrink-0 mt-0.5">{item.icon}</span>}
            <span>{applyBold(item.text, item.bold)}</span>
          </li>
        ))}
      </ul>
    );
  }
  return null;
}

export default async function NewsPostPage({ params }: { params: { slug: string } }) {
  const result = await safeLoad(() => getNewsPost(params.slug));

  if (!result.ok) {
    if (result.transient) return <TemporaryUnavailable />;
    notFound();
  }

  const post = result.data;

  const url = `${BASE_URL}/news/${post.slug}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description: post.summary,
    url,
    datePublished: post.published_at,
    dateModified: post.published_at,
    author: { '@type': 'Organization', name: SITE_NAME, url: BASE_URL },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: BASE_URL,
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/android-chrome-192x192.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    keywords: post.hashtags.join(', '),
    articleSection: 'Visa & Immigration News',
    ...(post.source_url ? { citation: post.source_url } : {}),
  };

  const breadcrumbSchema = breadcrumbJsonLd([
    { name: 'Home', url: BASE_URL },
    { name: 'Visa & Immigration News', url: `${BASE_URL}/news` },
    { name: post.title, url },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">

            <Link
              href="/news"
              className="inline-flex items-center gap-1.5 text-sm text-teal-600 hover:text-teal-800 font-medium mb-8 group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
              All news
            </Link>

            <article>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-4 w-4 text-teal-500" />
                <time dateTime={post.published_at} className="text-sm text-teal-600 font-medium">
                  {formatDate(post.published_at)}
                </time>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-5 flex items-start gap-3">
                <AlertTriangle className="h-7 w-7 text-red-500 flex-shrink-0 mt-1" />
                <span>{post.title}</span>
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed mb-8 border-l-4 border-teal-400 pl-4">
                {post.summary}
              </p>

              {post.content && post.content.length > 0 && (
                <div className="space-y-6 mb-8">
                  {post.content.map((block, i) => renderContent(block as ContentBlock, i))}
                </div>
              )}

              {post.external_links && post.external_links.length > 0 && (
                <div className="border-t border-gray-100 pt-6 space-y-3">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Sources & Further Reading</h3>
                  {post.external_links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-teal-600 hover:text-teal-800 font-medium group"
                    >
                      <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                      {link.label}
                    </a>
                  ))}
                </div>
              )}

              {post.source_label && (
                <div className="mt-4 flex items-start gap-1.5">
                  <span className="text-xs text-gray-400 font-medium">Source:</span>
                  {post.source_url ? (
                    <a
                      href={post.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-500 hover:text-teal-600 underline underline-offset-2"
                    >
                      {post.source_label}
                    </a>
                  ) : (
                    <span className="text-xs text-gray-500">{post.source_label}</span>
                  )}
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-1.5">
                {post.hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-xs font-medium text-teal-700 bg-teal-50 border border-teal-100 rounded-full px-2.5 py-0.5"
                  >
                    <Hash className="h-3 w-3" />
                    {tag.replace(/^#/, '')}
                  </span>
                ))}
              </div>
            </article>

            <div className="mt-12 pt-8 border-t border-gray-100">
              <Link
                href="/news"
                className="inline-flex items-center gap-1.5 text-sm text-teal-600 hover:text-teal-800 font-medium group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                Back to all news
              </Link>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
