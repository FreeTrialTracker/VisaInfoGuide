import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Database, TriangleAlert, CircleCheck, Info } from 'lucide-react';
import { canonicalUrl } from '@/lib/seo';
import {
  getResearchArticleBySlug,
  getAllPublishedResearchSlugs,
  getAllPublishedResearchArticles,
  ResearchArticle,
  ResearchSection,
} from '@/lib/data/research';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getAllPublishedResearchSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getResearchArticleBySlug(params.slug);
  if (!article) {
    return {
      title: 'Research Not Found | VisaInfoGuide',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: article.meta_title,
    description: article.meta_description,
    alternates: {
      canonical: canonicalUrl(`/research/${article.slug}`),
    },
    openGraph: {
      title: article.og_title ?? article.meta_title,
      description: article.og_description ?? article.meta_description,
      url: canonicalUrl(`/research/${article.slug}`),
      type: 'article',
      publishedTime: article.date_published,
      modifiedTime: article.date_modified,
      authors: [article.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.og_title ?? article.meta_title,
      description: article.og_description ?? article.meta_description,
    },
  };
}

function CalloutBox({ article }: { article: ResearchArticle }) {
  if (!article.callout_title && (!article.callout_bullets || article.callout_bullets.length === 0)) {
    return null;
  }

  const colorMap = {
    info: { bg: 'bg-teal-50', border: 'border-teal-500', icon: 'text-teal-600', heading: 'text-gray-900' },
    warning: { bg: 'bg-amber-50', border: 'border-amber-500', icon: 'text-amber-600', heading: 'text-gray-900' },
    success: { bg: 'bg-green-50', border: 'border-green-500', icon: 'text-green-600', heading: 'text-gray-900' },
  };
  const colors = colorMap[article.callout_type] ?? colorMap.info;

  const IconComponent = article.callout_type === 'warning'
    ? TriangleAlert
    : article.callout_type === 'success'
    ? CircleCheck
    : Info;

  return (
    <div className={`${colors.bg} border-l-4 ${colors.border} p-6 mb-8 rounded-r-lg`}>
      <div className="flex items-start gap-3">
        <IconComponent className={`w-6 h-6 ${colors.icon} mt-1 flex-shrink-0`} />
        <div>
          {article.callout_title && (
            <h3 className={`text-lg font-semibold ${colors.heading} mt-0 mb-2`}>{article.callout_title}</h3>
          )}
          {article.callout_bullets && article.callout_bullets.length > 0 && (
            <ul className="mb-0 space-y-1">
              {article.callout_bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionTable({ tableData }: { tableData: ResearchSection['table_data'] }) {
  if (!tableData) return null;
  const { headers, rows } = tableData;
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm my-8">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {headers.map((h) => (
                <th key={h} className="px-6 py-4 text-left text-sm font-semibold text-gray-900">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row, ri) => (
              <tr key={ri} className="hover:bg-gray-50 transition-colors">
                {row.map((cell, ci) => (
                  <td key={ci} className="px-6 py-4 text-sm text-gray-700">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ArticleSection({ section }: { section: ResearchSection }) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">{section.heading}</h2>
      {section.body && (
        <p className="text-gray-700 leading-relaxed mb-6">{section.body}</p>
      )}
      {section.table_data && <SectionTable tableData={section.table_data} />}
      {section.subsections && section.subsections.map((sub, i) => (
        <div key={i}>
          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{sub.heading}</h3>
          <p className="text-gray-700 leading-relaxed mb-6">{sub.body}</p>
        </div>
      ))}
    </section>
  );
}

function FAQSection({ faqs }: { article: ResearchArticle; faqs: ResearchArticle['faqs'] }) {
  if (!faqs || faqs.length === 0) return null;
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

async function RelatedArticlesSection({ slugs }: { slugs: string[] }) {
  if (!slugs || slugs.length === 0) return null;
  const allArticles = await getAllPublishedResearchArticles();
  const related = allArticles.filter((a) => slugs.includes(a.slug)).slice(0, 4);
  if (related.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Related Research &amp; Guides</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {related.map((article) => (
          <Link
            key={article.slug}
            href={`/research/${article.slug}`}
            className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <h4 className="font-semibold text-gray-900 mb-1">{article.title}</h4>
            <p className="text-sm text-gray-600">{article.meta_description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default async function ResearchArticlePage({ params }: Props) {
  const article = await getResearchArticleBySlug(params.slug);
  if (!article) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.meta_description,
    datePublished: article.date_published,
    dateModified: article.date_modified,
    wordCount: article.word_count ?? undefined,
    author: {
      '@type': 'Organization',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'VisaInfoGuide.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://visainfoguide.com/visa.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl(`/research/${article.slug}`),
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://visainfoguide.com' },
      { '@type': 'ListItem', position: 2, name: 'Research', item: 'https://visainfoguide.com/research' },
      { '@type': 'ListItem', position: 3, name: article.title, item: canonicalUrl(`/research/${article.slug}`) },
    ],
  };

  const faqSchema = article.faqs && article.faqs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: article.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }
    : null;

  const formattedDate = new Date(article.date_modified).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <article className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-8">
          <nav className="text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-teal-600 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/visa-guides" className="hover:text-teal-600 transition-colors">Guides</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{article.title}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Last updated: {formattedDate}</span>
            </div>
            <div className="flex items-center gap-2 text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
              <Database className="w-4 h-4" />
              <span className="font-medium">Reviewed and updated monthly</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">{article.intro}</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <CalloutBox article={article} />

          {article.sections.map((section, i) => (
            <ArticleSection key={i} section={section} />
          ))}

          <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 my-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Check Your Specific Travel Requirements</h3>
            <p className="text-gray-700 mb-4">
              Ready to plan your next trip? Use our tools to get exact visa requirements for your passport and destinations:
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
              >
                Trip Visa Finder
              </Link>
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-teal-600 font-medium rounded-lg border-2 border-teal-600 hover:bg-teal-50 transition-colors"
              >
                Compare Passports
              </Link>
            </div>
          </div>

          <FAQSection article={article} faqs={article.faqs} />

          <RelatedArticlesSection slugs={article.related_slugs} />
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </div>
  );
}
