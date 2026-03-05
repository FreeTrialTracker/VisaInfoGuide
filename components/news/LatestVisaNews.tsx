'use client';

import { useState, useEffect, useCallback } from 'react';
import { Newspaper, Search, Calendar, ExternalLink, ChevronLeft, ChevronRight, Globe, Hash, AlertTriangle, GraduationCap, Briefcase, TrendingDown, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ContentBlock {
  type: 'paragraph' | 'section' | 'list';
  icon?: string;
  heading?: string;
  text?: string;
  items?: { icon?: string; text: string; bold?: string[] }[];
}

interface ExternalLink {
  label: string;
  url: string;
}

interface NewsPost {
  id: string;
  title: string;
  slug: string;
  published_at: string;
  summary: string;
  hashtags: string[];
  source_label: string;
  source_url: string;
  content: ContentBlock[];
  external_links: ExternalLink[];
}

const SECTION_ICONS: Record<string, React.ReactNode> = {
  '🚫': <span className="text-red-500 text-lg">🚫</span>,
  '🎓': <GraduationCap className="h-5 w-5 text-blue-600" />,
  '💼': <Briefcase className="h-5 w-5 text-amber-600" />,
  '🏘️': <Globe className="h-5 w-5 text-teal-600" />,
  '⚠️': <AlertCircle className="h-5 w-5 text-orange-500" />,
};

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

function NewsCard({ post }: { post: NewsPost }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="h-4 w-4 text-teal-500 flex-shrink-0" />
          <time className="text-sm text-teal-600 font-medium">{formatDate(post.published_at)}</time>
        </div>

        <h2 className="text-lg font-bold text-gray-900 leading-snug mb-3 flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <Link href={`/news/${post.slug}`} className="hover:text-teal-700 transition-colors">
            {post.title}
          </Link>
        </h2>

        <p className="text-gray-600 text-sm leading-relaxed mb-4">{post.summary}</p>

        {expanded && post.content && post.content.length > 0 && (
          <div className="mt-4 space-y-5 border-t border-gray-100 pt-4">
            {post.content.map((block, i) => {
              if (block.type === 'paragraph') {
                return (
                  <p key={i} className="text-gray-700 text-sm leading-relaxed">
                    {block.text}
                  </p>
                );
              }
              if (block.type === 'section') {
                const icon = block.icon ? SECTION_ICONS[block.icon] || <span>{block.icon}</span> : null;
                return (
                  <div key={i}>
                    {block.heading && (
                      <div className="flex items-center gap-2 mb-2">
                        {icon}
                        <h3 className="font-bold text-gray-800 text-sm">{block.heading}</h3>
                      </div>
                    )}
                    {block.items && (
                      <ul className="space-y-1.5 pl-2">
                        {block.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
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
                  <ul key={i} className="space-y-1.5 pl-2">
                    {block.items?.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                        {item.icon && <span className="flex-shrink-0 mt-0.5">{item.icon}</span>}
                        <span>{applyBold(item.text, item.bold)}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              return null;
            })}

            {post.external_links && post.external_links.length > 0 && (
              <div className="pt-2 space-y-2">
                {post.external_links.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-teal-600 hover:text-teal-800 font-medium group"
                  >
                    <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    {link.label}
                  </a>
                ))}
              </div>
            )}

            {post.source_label && (
              <div className="flex items-start gap-1.5 pt-1">
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
          </div>
        )}

        <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex flex-wrap gap-1.5">
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
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-teal-600 hover:text-teal-800 font-semibold transition-colors flex-shrink-0"
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function LatestVisaNews() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async (p: number, q: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(p), q });
      const res = await fetch(`/api/news?${params}`);
      const data = await res.json();
      setPosts(data.posts || []);
      setTotal(data.total || 0);
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts(page, search);
  }, [page, search, fetchPosts]);

  const totalPages = Math.ceil(total / 5);

  const handleSearch = () => {
    setSearch(searchInput);
    setPage(1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <section className="mt-16">
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-teal-50 border border-teal-100">
            <Newspaper className="h-5 w-5 text-teal-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Latest Visa & Immigration News</h2>
            <p className="text-sm text-gray-500 mt-0.5">Up-to-date policy changes and entry requirement updates</p>
          </div>
        </div>
        <Link href="/news" className="text-sm text-teal-600 hover:text-teal-800 font-medium flex-shrink-0">
          View all
        </Link>
      </div>

      <div className="mt-5 mb-6 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <Input
            placeholder="Search news (e.g. Australia, student visa, Schengen...)"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-9 bg-white border-gray-200 focus:border-teal-400 focus:ring-teal-300"
          />
        </div>
        <Button onClick={handleSearch} className="bg-teal-600 hover:bg-teal-700 text-white px-5">
          Search
        </Button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-xl h-32 animate-pulse" />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <Newspaper className="h-10 w-10 mx-auto mb-3 text-gray-300" />
          <p className="font-medium">No news found{search ? ` for "${search}"` : ''}.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <NewsCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <span className="text-sm text-gray-600 font-medium">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex items-center gap-1"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </section>
  );
}
