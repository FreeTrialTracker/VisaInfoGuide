'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';

interface SearchResult {
  slug: string;
  name: string;
  type: 'passport' | 'destination';
}

export default function CountrySearch({ onSelect }: { onSelect?: () => void } = {}) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [allData, setAllData] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/search-data');
        if (!res.ok) return;
        const data = await res.json();
        const passports: SearchResult[] = (data.passports || [])
          .map((p: { slug: string; name: string }) => ({ ...p, type: 'passport' as const }));
        const destinations: SearchResult[] = (data.destinations || [])
          .map((d: { slug: string; name: string }) => ({ ...d, type: 'destination' as const }));
        setAllData([...passports, ...destinations]);
      } catch {
        // silently fail - search will just be empty
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }
    const q = query.toLowerCase();
    const filtered = allData.filter(item => item.name.toLowerCase().includes(q)).slice(0, 8);
    setResults(filtered);
    setOpen(filtered.length > 0);
  }, [query, allData]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSelect(item: SearchResult) {
    setQuery('');
    setOpen(false);
    onSelect?.();
    if (item.type === 'passport') {
      router.push(`/passport/${item.slug}`);
    } else {
      router.push(`/destination/${item.slug}`);
    }
  }

  function handleClear() {
    setQuery('');
    setOpen(false);
    inputRef.current?.focus();
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-sm">
      <div className="relative flex items-center">
        <Search className="absolute left-3 h-4 w-4 text-gray-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search country or passport..."
          className="w-full pl-9 pr-8 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all placeholder:text-gray-400"
        />
        {query && (
          <button onClick={handleClear} className="absolute right-2.5 text-gray-400 hover:text-gray-600 transition-colors">
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
          {results.map((item, i) => (
            <button
              key={`${item.type}-${item.slug}`}
              onClick={() => handleSelect(item)}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
            >
              <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${item.type === 'passport' ? 'bg-blue-100 text-blue-700' : 'bg-teal-100 text-teal-700'}`}>
                {item.type === 'passport' ? 'Passport' : 'Country'}
              </span>
              <span className="text-sm text-gray-800">{item.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
