'use client';

import { useState, useEffect, useCallback } from 'react';
import { BookOpen, Calendar, Clock, ArrowRight, Tag, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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
    month: 'long',
    year: 'numeric',
  });
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-3">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-blue-500 flex-shrink-0" />
            <time className="text-sm text-blue-600 font-medium">{formatDate(post.published_at)}</time>
          </span>
          <span className="flex items-center gap-1.5 text-sm text-gray-400">
            <Clock className="h-3.5 w-3.5" />
            {post.read_time_minutes} min read
          </span>
        </div>

        <h2 className="text-lg font-bold text-gray-900 leading-snug mb-2 hover:text-blue-700 transition-colors">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h2>

        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>

        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
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
            className="text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors flex items-center gap-1 flex-shrink-0 group"
          >
            Read article
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function LatestBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async (p: number, q: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(p), q });
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
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 border border-blue-100">
            <BookOpen className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Latest from the Blog</h2>
            <p className="text-sm text-gray-500 mt-0.5">In-depth visa guides and expert travel advice</p>
          </div>
        </div>
        <Link href="/blog" className="text-sm text-blue-600 hover:text-blue-800 font-medium flex-shrink-0">
          View all
        </Link>
      </div>

      <div className="mt-5 mb-6 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <Input
            placeholder="Search articles (e.g. Japan, Schengen, visa on arrival...)"
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

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-xl h-32 animate-pulse" />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <BookOpen className="h-10 w-10 mx-auto mb-3 text-gray-300" />
          <p className="font-medium">No articles found{search ? ` for "${search}"` : ''}.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
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
