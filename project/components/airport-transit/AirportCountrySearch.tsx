'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, MapPin } from 'lucide-react';
import { airportTransitHotels, AirportTransitHotel } from '@/lib/data/airportTransitHotels';

function normalize(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9\s]/g, '');
}

function score(airport: AirportTransitHotel, query: string): number {
  const q = normalize(query);
  const country = normalize(airport.country);
  const city = normalize(airport.city);
  const name = normalize(airport.airportName);
  const iata = airport.iataCode.toLowerCase();
  const hotel = normalize(airport.hotelName);

  if (iata === q) return 100;
  if (country.startsWith(q)) return 90;
  if (city.startsWith(q)) return 80;
  if (name.startsWith(q)) return 70;
  if (country.includes(q)) return 60;
  if (city.includes(q)) return 50;
  if (name.includes(q)) return 40;
  if (hotel.includes(q)) return 30;
  return 0;
}

interface Props {
  placeholder?: string;
  className?: string;
}

export default function AirportCountrySearch({ placeholder = 'Search by country, city, or airport…', className = '' }: Props) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const results = query.trim().length > 0
    ? airportTransitHotels
        .map((a) => ({ airport: a, s: score(a, query.trim()) }))
        .filter((x) => x.s > 0)
        .sort((a, b) => b.s - a.s)
        .slice(0, 8)
        .map((x) => x.airport)
    : [];

  useEffect(() => {
    setHighlighted(0);
  }, [query]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || results.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = results[highlighted];
      if (selected) navigate(selected);
    } else if (e.key === 'Escape') {
      setOpen(false);
      inputRef.current?.blur();
    }
  }

  function navigate(airport: AirportTransitHotel) {
    setQuery('');
    setOpen(false);
    router.push(`/airport-transit-hotels/${airport.slug}`);
  }

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => { if (query.trim()) setOpen(true); }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck={false}
          className="w-full pl-9 pr-9 py-2.5 text-sm bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all"
        />
        {query && (
          <button
            type="button"
            onClick={() => { setQuery(''); setOpen(false); inputRef.current?.focus(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {open && results.length > 0 && (
        <ul
          ref={listRef}
          role="listbox"
          className="absolute z-50 mt-1.5 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
        >
          {results.map((airport, i) => (
            <li
              key={airport.slug}
              role="option"
              aria-selected={i === highlighted}
              onMouseEnter={() => setHighlighted(i)}
              onMouseDown={(e) => { e.preventDefault(); navigate(airport); }}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                i === highlighted ? 'bg-teal-50' : 'hover:bg-gray-50'
              } ${i > 0 ? 'border-t border-gray-100' : ''}`}
            >
              <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{airport.airportName}</p>
                <p className="text-xs text-gray-500 truncate">{airport.city}, {airport.country}</p>
              </div>
              <span className="text-xs font-bold text-gray-400 tracking-widest flex-shrink-0">{airport.iataCode}</span>
            </li>
          ))}
        </ul>
      )}

      {open && query.trim().length > 0 && results.length === 0 && (
        <div className="absolute z-50 mt-1.5 w-full bg-white border border-gray-200 rounded-xl shadow-lg px-4 py-3">
          <p className="text-sm text-gray-500">No airports found for &ldquo;{query}&rdquo;</p>
        </div>
      )}
    </div>
  );
}
