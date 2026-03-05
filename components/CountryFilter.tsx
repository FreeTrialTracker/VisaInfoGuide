'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Country } from '@/lib/countries';

interface CountryFilterProps {
  countries: Country[];
  type: 'passport' | 'destination';
}

export default function CountryFilter({ countries, type }: CountryFilterProps) {
  const [search, setSearch] = useState('');

  const filtered = countries.filter(country =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  const linkPrefix = type === 'passport' ? '/passport' : '/destination';

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder={`Search ${type === 'passport' ? 'passports' : 'destinations'}...`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        aria-label={`Filter ${type === 'passport' ? 'passports' : 'destinations'}`}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map(country => (
          <Link
            key={country.slug}
            href={`${linkPrefix}/${country.slug}`}
            className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all duration-200 bg-white"
          >
            <h3 className="font-medium text-gray-900">{country.name}</h3>
          </Link>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-gray-500 py-8">
          No {type === 'passport' ? 'passports' : 'destinations'} found matching &quot;{search}&quot;
        </p>
      )}
    </div>
  );
}
