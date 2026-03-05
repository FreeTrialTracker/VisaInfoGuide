import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Tag, User, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle, Info, ChevronRight } from 'lucide-react';
import { getBlogPost, getBlogPostSlugs, BlogContentBlock } from '@/lib/data/blog';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getBlogPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  if (!post) return { title: 'Article Not Found | VisaInfoGuide' };

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
    return (
      <div className="mb-8">
        {block.heading && (
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
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
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">
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

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getBlogPost(params.slug);
  if (!post) notFound();

  const relatedSlugs = post.related_slugs || [];

  const relatedPosts = await Promise.all(
    relatedSlugs.slice(0, 4).map((s) => getBlogPost(s))
  ).then((results) => results.filter(Boolean));

  return (
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
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to blog
          </Link>

          <article className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="flex flex-wrap gap-1.5 mb-5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-100 rounded-full px-2.5 py-0.5"
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

              <div className="prose-content">
                {(post.content || []).map((block, i) => (
                  <ContentBlock key={i} block={block} />
                ))}
              </div>

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
  );
}
