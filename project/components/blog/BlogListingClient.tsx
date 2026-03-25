'use client';

import { useState, useEffect, useCallback } from 'react';
import { BookOpen, Search, Calendar, Clock, ArrowRight, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { blogTagPill } from '@/lib/styles';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  read_time_minutes: number;
  published_at: string;
  tags: string[];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-blue-500" />
            <time>{formatDate(post.published_at)}</time>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-blue-500" />
            {post.read_time_minutes} min read
          </span>
          <span className="text-gray-400">By {post.author}</span>
        </div>

        <h2 className="text-xl font-bold text-gray-900 leading-snug mb-3 group-hover:text-blue-700 transition-colors">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h2>

        <p className="text-gray-600 text-sm leading-relaxed mb-5">{post.excerpt}</p>

        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className={blogTagPill}
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors flex items-center gap-1 flex-shrink-0 group/link"
          >
            Read article
            <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}

const PAGE_SIZE = 3;
const MAX_PAGE_BUTTONS = 5;

function getPaginationRange(current: number, total: number): (number | '...')[] {
  if (total <= MAX_PAGE_BUTTONS) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages: (number | '...')[] = [];
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);

  pages.push(1);
  if (left > 2) pages.push('...');
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push('...');
  pages.push(total);

  return pages;
}

export default function BlogListingClient() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async (p: number, q: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(p), q, pageSize: String(PAGE_SIZE) });
      const res = await fetch(`/api/blog?${params}`);
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

  const totalPages = Math.ceil(total / PAGE_SIZE);
  const paginationRange = getPaginationRange(page, totalPages);

  const handleSearch = () => {
    setSearch(searchInput);
    setPage(1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div>
      <div className="flex gap-2 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <Input
            placeholder="Search guides (e.g. Schengen, cover letter, flight reservation...)"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-9 bg-white border-gray-200 focus:border-blue-400 focus:ring-blue-300"
          />
        </div>
        <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 text-white px-5">
          Search
        </Button>
      </div>

      {search && (
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm text-gray-600">
            {total} result{total !== 1 ? 's' : ''} for <strong>&quot;{search}&quot;</strong>
          </span>
          <button
            onClick={() => { setSearch(''); setSearchInput(''); setPage(1); }}
            className="text-sm text-blue-600 hover:underline"
          >
            Clear
          </button>
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 h-40 animate-pulse" />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p className="font-semibold text-gray-700 mb-1">No articles found</p>
          {search && <p className="text-sm">Try a different search term.</p>}
        </div>
      ) : (
        <div className="space-y-5">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <nav aria-label="Blog pagination" className="mt-10 flex items-center justify-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center gap-1 px-3"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Previous</span>
          </Button>

          {paginationRange.map((item, idx) =>
            item === '...' ? (
              <span key={`ellipsis-${idx}`} className="px-2 text-gray-400 text-sm select-none">
                ...
              </span>
            ) : (
              <Button
                key={item}
                variant={page === item ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPage(item)}
                className={
                  page === item
                    ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600 min-w-[36px]'
                    : 'min-w-[36px] text-gray-700'
                }
                aria-label={`Page ${item}`}
                aria-current={page === item ? 'page' : undefined}
              >
                {item}
              </Button>
            )
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex items-center gap-1 px-3"
            aria-label="Next page"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </nav>
      )}
    </div>
  );
}
