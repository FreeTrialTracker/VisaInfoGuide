import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowLeft, Tag, User, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle, Info, ChevronRight, BookOpen } from 'lucide-react';
import { getBlogPost, getBlogPostSlugs, BlogContentBlock } from '@/lib/data/blog';
import BackButton from '@/components/blog/BackButton';
import { blogTagPill } from '@/lib/styles';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getBlogPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

function buildOgImageUrl(post: { title: string; tags: string[] }): string {
  const isVisaNews =
    post.tags.some((t) =>
      /visa|immigration|passport|travel|entry|permit/i.test(t)
    ) ||
    /visa|immigration|passport|entry permit|travel update/i.test(post.title);

  const label = isVisaNews ? 'VISA UPDATE' : 'GUIDE';

  const yearMatch = post.title.match(/\b(202\d)\b/);
  const year = yearMatch ? yearMatch[1] : '';

  let url = `https://visainfoguide.com/api/og?title=${encodeURIComponent(post.title)}&label=${encodeURIComponent(label)}`;
  if (year) {
    url += `&year=${encodeURIComponent(year)}`;
  }

  return url;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  if (!post) return { title: 'Article Not Found | VisaInfoGuide' };

  const isJapanEvisa = post.slug === 'japan-evisa';
  const ogImageUrl = isJapanEvisa
    ? 'https://visainfoguide.com/visa.png'
    : buildOgImageUrl(post);

  return {
    title: `${post.title} | VisaInfoGuide`,
    description: post.meta_description || post.excerpt,
    alternates: {
      canonical: `https://visainfoguide.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.meta_description || post.excerpt,
      type: 'article',
      url: `https://visainfoguide.com/blog/${post.slug}`,
      siteName: 'VisaInfoGuide',
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      authors: [post.author],
      images: isJapanEvisa
        ? ['https://visainfoguide.com/visa.png']
        : [
            {
              url: ogImageUrl,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.meta_description || post.excerpt,
      images: [ogImageUrl],
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function CalloutBox({ type, text }: { type: string; text: string }) {
  if (type === 'tip') {
    return (
      <div className="flex gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4 my-6">
        <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-emerald-900 leading-relaxed">{text}</p>
      </div>
    );
  }
  if (type === 'warn') {
    return (
      <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-lg p-4 my-6">
        <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-900 leading-relaxed">{text}</p>
      </div>
    );
  }
  return (
    <div className="flex gap-3 bg-blue-50 border border-blue-200 rounded-lg p-4 my-6">
      <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
      <p className="text-sm text-blue-900 leading-relaxed">{text}</p>
    </div>
  );
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function ContentBlock({ block }: { block: BlogContentBlock }) {
  if (block.type === 'intro') {
    const paragraphs = (block.text || '').split('\n\n').filter(Boolean);
    return (
      <div className="space-y-4 mb-8">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-gray-700 leading-relaxed text-base">{p}</p>
        ))}
      </div>
    );
  }

  if (block.type === 'callout') {
    return <CalloutBox type={block.calloutType || 'info'} text={block.text || ''} />;
  }

  if (block.type === 'section') {
    const paragraphs = (block.text || '').split('\n\n').filter(Boolean);
    const headingId = block.heading ? slugifyHeading(block.heading) : undefined;
    return (
      <div className="mb-8">
        {block.heading && (
          <h2
            id={headingId}
            className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 scroll-mt-20"
          >
            {block.heading}
          </h2>
        )}
        {paragraphs.map((p, i) => (
          <p key={i} className="text-gray-700 leading-relaxed text-base mb-4">{p}</p>
        ))}
        {block.list && block.list.length > 0 && (
          <ul className="space-y-2.5 mt-4">
            {block.list.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-gray-700 text-sm leading-relaxed">
                <ChevronRight className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
        {block.callout && (
          <CalloutBox type={block.callout.type} text={block.callout.text} />
        )}
      </div>
    );
  }

  if (block.type === 'faq') {
    return (
      <div className="mb-8" id="faq">
        <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100 scroll-mt-20">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {(block.items || []).map((item, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2 text-base">{item.q}</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

function TableOfContents({ content }: { content: BlogContentBlock[] }) {
  const headings = content
    .filter((b) => (b.type === 'section' || b.type === 'faq') && b.heading)
    .map((b) => ({
      text: b.type === 'faq' ? 'Frequently Asked Questions' : (b.heading as string),
      id: b.type === 'faq' ? 'faq' : slugifyHeading(b.heading as string),
    }));

  if (headings.length < 2) return null;

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="h-4 w-4 text-blue-600" />
        <span className="text-sm font-semibold text-gray-900">Table of Contents</span>
      </div>
      <ol className="space-y-1.5 list-none">
        {headings.map((h, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-xs text-gray-400 font-medium mt-0.5 tabular-nums w-4 flex-shrink-0">{i + 1}.</span>
            <a
              href={`#${h.id}`}
              className="text-sm text-blue-700 hover:text-blue-900 hover:underline leading-snug"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}

const BLOG_RESOURCES: Record<string, { label: string; href: string }[]> = {
  'japan-evisa': [
    { label: 'Japan entry requirements 2026', href: '/visa-guides/country-entry-requirements/japan-2026' },
    { label: 'US passport → Japan visa requirements', href: '/passport/united-states/destination/japan' },
    { label: 'UK passport → Japan visa requirements', href: '/passport/united-kingdom/destination/japan' },
    { label: 'Australian passport → Japan visa requirements', href: '/passport/australia/destination/japan' },
    { label: 'Visa-free vs eVisa vs visa on arrival', href: '/research/visa-free-vs-visa-on-arrival-vs-evisa' },
  ],
  'japan-visa-types': [
    { label: 'Japan entry requirements 2026', href: '/visa-guides/country-entry-requirements/japan-2026' },
    { label: 'Indian passport → Japan visa requirements', href: '/passport/india/destination/japan' },
    { label: 'US passport → Japan visa requirements', href: '/passport/united-states/destination/japan' },
    { label: 'Most powerful passports 2026', href: '/research/most-powerful-passports-2026' },
    { label: 'Visa-free vs eVisa vs visa on arrival', href: '/research/visa-free-vs-visa-on-arrival-vs-evisa' },
  ],
  'do-i-need-a-visa-for-japan': [
    { label: 'Japan entry requirements 2026', href: '/visa-guides/country-entry-requirements/japan-2026' },
    { label: 'US passport → Japan visa requirements', href: '/passport/united-states/destination/japan' },
    { label: 'Canadian passport → Japan visa requirements', href: '/passport/canada/destination/japan' },
    { label: 'Indian passport → Japan visa requirements', href: '/passport/india/destination/japan' },
    { label: 'Best passports for visa-free travel in Asia 2026', href: '/research/best-passports-for-visa-free-travel-in-asia-2026' },
  ],
  'japan-tourist-visa': [
    { label: 'Japan entry requirements 2026', href: '/visa-guides/country-entry-requirements/japan-2026' },
    { label: 'Indian passport → Japan visa requirements', href: '/passport/india/destination/japan' },
    { label: 'Philippine passport → Japan visa requirements', href: '/passport/philippines/destination/japan' },
    { label: 'Passport validity rules by country', href: '/research/passport-validity-rules-by-country' },
  ],
  'japan-visa-requirements': [
    { label: 'Japan entry requirements 2026', href: '/visa-guides/country-entry-requirements/japan-2026' },
    { label: 'US passport → Japan visa requirements', href: '/passport/united-states/destination/japan' },
    { label: 'UK passport → Japan visa requirements', href: '/passport/united-kingdom/destination/japan' },
    { label: 'Australian passport → Japan visa requirements', href: '/passport/australia/destination/japan' },
    { label: 'Passport validity rules by country', href: '/research/passport-validity-rules-by-country' },
  ],
  'proof-of-accommodation-for-visa': [
    { label: 'US passport → Germany visa requirements', href: '/passport/united-states/destination/germany' },
    { label: 'Indian passport → Germany visa requirements', href: '/passport/india/destination/germany' },
    { label: 'Schengen visa requirements 2026', href: '/visa-guides/country-entry-requirements/germany-2026' },
    { label: 'Passport validity rules by country', href: '/research/passport-validity-rules-by-country' },
    { label: 'Onward ticket requirements by country', href: '/research/onward-ticket-requirements-by-country' },
  ],
  'cover-letter-for-visa-application': [
    { label: 'Indian passport → France visa requirements', href: '/passport/india/destination/france' },
    { label: 'US passport → France visa requirements', href: '/passport/united-states/destination/france' },
    { label: 'Schengen 90/180 rule explained', href: '/research/schengen-90-180-rule-explained' },
    { label: 'Schengen calculator', href: '/tools/schengen-calculator' },
    { label: 'Onward ticket requirements by country', href: '/research/onward-ticket-requirements-by-country' },
  ],
  'uk-visa-for-us-citizens': [
    { label: 'US passport → UK visa requirements', href: '/passport/united-states/destination/united-kingdom' },
    { label: 'Do Americans need a visa for the UK?', href: '/visa-guides/do-i-need-a-visa/do-indians-need-visa-for-uk-2026' },
    { label: 'UK entry requirements', href: '/visa-guides/country-entry-requirements/united-kingdom-2026' },
    { label: 'Most powerful passports 2026', href: '/research/most-powerful-passports-2026' },
  ],
  'uk-eta-for-us-citizens': [
    { label: 'US passport → UK visa requirements', href: '/passport/united-states/destination/united-kingdom' },
    { label: 'Australian passport → UK visa requirements', href: '/passport/australia/destination/united-kingdom' },
    { label: 'Canadian passport → UK visa requirements', href: '/passport/canada/destination/united-kingdom' },
    { label: 'UK entry requirements', href: '/visa-guides/country-entry-requirements/united-kingdom-2026' },
    { label: 'Visa-free vs eVisa vs visa on arrival', href: '/research/visa-free-vs-visa-on-arrival-vs-evisa' },
  ],
  'uk-standard-visitor-visa-us-citizens': [
    { label: 'US passport → UK visa requirements', href: '/passport/united-states/destination/united-kingdom' },
    { label: 'Indian passport → UK visa requirements', href: '/passport/india/destination/united-kingdom' },
    { label: 'UK entry requirements', href: '/visa-guides/country-entry-requirements/united-kingdom-2026' },
    { label: 'Passport validity rules by country', href: '/research/passport-validity-rules-by-country' },
    { label: 'Onward ticket requirements by country', href: '/research/onward-ticket-requirements-by-country' },
  ],
  'uk-work-visa-for-americans': [
    { label: 'US passport → UK visa requirements', href: '/passport/united-states/destination/united-kingdom' },
    { label: 'UK entry requirements', href: '/visa-guides/country-entry-requirements/united-kingdom-2026' },
    { label: 'Most powerful passports 2026', href: '/research/most-powerful-passports-2026' },
    { label: 'Do Americans need a visa for the UK?', href: '/visa-guides/do-i-need-a-visa/do-indians-need-visa-for-uk-2026' },
  ],
  'moving-to-uk-from-usa': [
    { label: 'US passport → UK visa requirements', href: '/passport/united-states/destination/united-kingdom' },
    { label: 'UK entry requirements', href: '/visa-guides/country-entry-requirements/united-kingdom-2026' },
    { label: 'Passport validity rules by country', href: '/research/passport-validity-rules-by-country' },
    { label: 'Most powerful passports 2026', href: '/research/most-powerful-passports-2026' },
  ],
  'check-visa-requirements-by-passport-and-destination': [
    { label: 'Browse visa requirements by passport', href: '/passport-ranking' },
    { label: 'Browse visa requirements by destination', href: '/visa-free-countries' },
    { label: 'Schengen 90/180 rule calculator', href: '/tools/schengen-calculator' },
    { label: 'Passport validity rules by country', href: '/research/passport-validity-rules-by-country' },
    { label: 'Onward ticket requirements by country', href: '/research/onward-ticket-requirements-by-country' },
    { label: 'Visa-free vs eVisa vs visa on arrival', href: '/research/visa-free-vs-visa-on-arrival-vs-evisa' },
  ],
  'schengen-visa-requirements': [
    { label: 'Indian passport → Germany visa requirements', href: '/passport/india/destination/germany' },
    { label: 'US passport → France visa requirements', href: '/passport/united-states/destination/france' },
    { label: 'Nigerian passport → Germany visa requirements', href: '/passport/nigeria/destination/germany' },
    { label: 'Schengen 90/180 rule explained', href: '/research/schengen-90-180-rule-explained' },
    { label: 'Schengen calculator', href: '/tools/schengen-calculator' },
    { label: 'Passport validity rules by country', href: '/research/passport-validity-rules-by-country' },
  ],
  'travel-itinerary-for-visa-application': [
    { label: 'Indian passport → France visa requirements', href: '/passport/india/destination/france' },
    { label: 'US passport → Germany visa requirements', href: '/passport/united-states/destination/germany' },
    { label: 'Schengen 90/180 rule explained', href: '/research/schengen-90-180-rule-explained' },
    { label: 'Schengen calculator', href: '/tools/schengen-calculator' },
    { label: 'Onward ticket requirements by country', href: '/research/onward-ticket-requirements-by-country' },
  ],
  'flight-reservation-for-visa': [
    { label: 'Indian passport → UK visa requirements', href: '/passport/india/destination/united-kingdom' },
    { label: 'Nigerian passport → UK visa requirements', href: '/passport/nigeria/destination/united-kingdom' },
    { label: 'Onward ticket requirements by country', href: '/research/onward-ticket-requirements-by-country' },
    { label: 'Schengen calculator', href: '/tools/schengen-calculator' },
    { label: 'Visa-free vs eVisa vs visa on arrival', href: '/research/visa-free-vs-visa-on-arrival-vs-evisa' },
  ],
};

const BASE_URL = 'https://visainfoguide.com';
const SITE_NAME = 'VisaInfoGuide';

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getBlogPost(params.slug);
  if (!post) notFound();

  const relatedSlugs = post.related_slugs || [];

  const relatedPosts = await Promise.all(
    relatedSlugs.slice(0, 4).map((s) => getBlogPost(s))
  ).then((results) => results.filter(Boolean));

  const postUrl = `${BASE_URL}/blog/${post.slug}`;

  function extractArticleBody(content: BlogContentBlock[]): string {
    return content
      .map((block) => {
        const parts: string[] = [];
        if (block.heading) parts.push(block.heading);
        if (block.text) parts.push(block.text);
        if (block.list && block.list.length > 0) parts.push(block.list.join(' '));
        if (block.callout?.text) parts.push(block.callout.text);
        if (block.items && block.items.length > 0) {
          block.items.forEach((item) => parts.push(`${item.q} ${item.a}`));
        }
        return parts.join(' ');
      })
      .filter(Boolean)
      .join(' ');
  }

  const articleBody = extractArticleBody(post.content || []);

  const isJapanEvisaPage = post.slug === 'japan-evisa';
  const ogImageUrl = isJapanEvisaPage
    ? `${BASE_URL}/visa.png`
    : buildOgImageUrl(post);

  const wordCount = articleBody.split(/\s+/).filter(Boolean).length;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.meta_description || post.excerpt,
    articleBody,
    wordCount,
    url: postUrl,
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    image: {
      '@type': 'ImageObject',
      url: post.hero_image_url || ogImageUrl,
      width: 1200,
      height: 630,
    },
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/android-chrome-192x192.png`,
        width: 192,
        height: 192,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    keywords: post.tags.join(', '),
    articleSection: 'Visa & Travel Guides',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
    ],
  };

  const faqBlock = (post.content || []).find((b) => b.type === 'faq');
  const faqSchema =
    faqBlock && faqBlock.items && faqBlock.items.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqBlock.items.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.a,
            },
          })),
        }
      : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-3xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-gray-500">
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-gray-700 font-medium truncate max-w-xs">{post.title}</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <BackButton />

          <article className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            {post.hero_image_url && (
              <div className="relative w-full h-56 sm:h-72 md:h-80 overflow-hidden">
                <Image
                  src={post.hero_image_url}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            )}

            <div className="p-8 md:p-12">
              <div className="flex flex-wrap gap-1.5 mb-5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className={blogTagPill}
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 pb-6 mb-8 border-b border-gray-100 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4 text-blue-500" />
                  <strong className="text-gray-700">{post.author}</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <time>Updated {formatDate(post.published_at)}</time>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-blue-500" />
                  {post.read_time_minutes} min read
                </span>
              </div>

              <TableOfContents content={post.content || []} />

              <div className="prose-content">
                {(post.content || []).map((block, i) => (
                  <ContentBlock key={i} block={block} />
                ))}
              </div>

              {BLOG_RESOURCES[post.slug] && BLOG_RESOURCES[post.slug].length > 0 && (
                <div className="mt-10 pt-8 border-t border-gray-100">
                  <h2 className="text-base font-semibold text-gray-900 mb-3">Related resources</h2>
                  <ul className="space-y-2">
                    {BLOG_RESOURCES[post.slug].map((resource) => (
                      <li key={resource.href}>
                        <Link
                          href={resource.href}
                          className="inline-flex items-center gap-1.5 text-sm text-blue-700 hover:text-blue-900 hover:underline"
                        >
                          <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" />
                          {resource.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-10 pt-8 border-t border-gray-100">
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{post.author}</p>
                      <p className="text-xs text-gray-500">Visa & Travel Writer</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Matthew is a seasoned travel writer and visa consultant with over a decade of first-hand experience navigating international travel documentation. He writes to help everyday travelers cut through the confusion and travel with confidence.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {relatedPosts.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Related Articles</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {relatedPosts.map((related) => related && (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="bg-white rounded-xl border border-gray-200 p-5 hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
                  >
                    <p className="text-xs text-gray-500 mb-2 flex items-center gap-1.5">
                      <Clock className="h-3 w-3" />
                      {related.read_time_minutes} min read
                    </p>
                    <p className="font-semibold text-gray-900 text-sm leading-snug group-hover:text-blue-700 transition-colors">
                      {related.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
