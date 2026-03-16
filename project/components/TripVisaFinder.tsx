'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import type { Passport, Destination } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X, Plane, ChevronDown, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface TripDestination {
  id: string;
  destination: string;
  days: number;
}

interface Props {
  passports: Passport[];
  destinations: Destination[];
}

interface ComboboxOption {
  slug: string;
  name: string;
}

interface ComboboxProps {
  options: ComboboxOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  id?: string;
}

function Combobox({ options, value, onChange, placeholder, id }: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = options.find(o => o.slug === value);

  const filtered = query.trim()
    ? options.filter(o => o.name.toLowerCase().includes(query.toLowerCase()))
    : options;

  const handleOpen = () => {
    setOpen(true);
    setQuery('');
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleSelect = (slug: string) => {
    onChange(slug);
    setOpen(false);
    setQuery('');
  };

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setOpen(false);
      setQuery('');
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        id={id}
        type="button"
        onClick={handleOpen}
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className={selected ? 'text-foreground' : 'text-muted-foreground'}>
          {selected ? selected.name : placeholder}
        </span>
        <ChevronDown className="h-4 w-4 opacity-50 shrink-0" />
      </button>

      {open && (
        <div className="absolute z-30 top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
          <div className="p-2 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Type to search..."
                className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-teal-400"
              />
            </div>
          </div>
          <div className="max-h-56 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500">No results found</div>
            ) : (
              filtered.map(option => (
                <button
                  key={option.slug}
                  type="button"
                  onClick={() => handleSelect(option.slug)}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-teal-50 hover:text-teal-700 transition-colors ${option.slug === value ? 'bg-teal-50 text-teal-700 font-medium' : 'text-gray-700'}`}
                >
                  {option.name}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function TripVisaFinder({ passports, destinations }: Props) {
  const router = useRouter();
  const [selectedPassport, setSelectedPassport] = useState<string>('');
  const [tripDestinations, setTripDestinations] = useState<TripDestination[]>([
    { id: '1', destination: '', days: 7 }
  ]);
  const [error, setError] = useState<string>('');

  const handlePassportChange = (value: string) => {
    setSelectedPassport(value);
    setTripDestinations(prev => prev.map(d =>
      d.destination === value ? { ...d, destination: '' } : d
    ));
    setError('');
  };

  const addDestination = () => {
    if (tripDestinations.length < 5) {
      setTripDestinations(prev => [
        ...prev,
        { id: Date.now().toString(), destination: '', days: 7 }
      ]);
    }
  };

  const removeDestination = (id: string) => {
    if (tripDestinations.length > 1) {
      setTripDestinations(prev => prev.filter(d => d.id !== id));
    }
  };

  const updateDestination = (id: string, field: 'destination' | 'days', value: string | number) => {
    setError('');
    setTripDestinations(prev => prev.map(d =>
      d.id === id ? { ...d, [field]: value } : d
    ));
  };

  const handleSearch = () => {
    if (!selectedPassport) {
      setError('Please select your passport');
      return;
    }

    const validDestinations = tripDestinations.filter(d => d.destination);
    if (validDestinations.length === 0) {
      setError('Please select at least one destination');
      return;
    }

    const destinationSlugs = new Set(validDestinations.map(d => d.destination));
    if (destinationSlugs.size !== validDestinations.length) {
      setError('Please select unique destinations');
      return;
    }

    if (validDestinations.some(d => d.destination === selectedPassport)) {
      setError('Cannot select your passport country as a destination');
      return;
    }

    const queryParts = validDestinations.map(d => `${d.destination}:${d.days}`).join(',');
    router.push(`/trip?ps=${selectedPassport}&d=${queryParts}`);
  };

  const destOptions = destinations.filter(d => d.slug !== selectedPassport);

  return (
    <Card className="shadow-sm border border-gray-200 relative" style={{ isolation: 'isolate' }}>
      <CardHeader className="space-y-3">
        <CardTitle className="flex items-center gap-2 text-2xl font-bold">
          <Plane className="h-7 w-7 text-teal-600" />
          Trip Visa Finder
        </CardTitle>
        <CardDescription className="text-base">
          Select your passport and up to 5 destinations to check visa requirements
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="passport-select" className="font-semibold">Your Passport</Label>
          <Combobox
            id="passport-select"
            options={passports}
            value={selectedPassport}
            onChange={handlePassportChange}
            placeholder="Select your passport"
          />
        </div>

        <div className="space-y-4">
          <Label className="font-semibold">Trip Itinerary (in order)</Label>
          {tripDestinations.map((trip, index) => (
            <div key={trip.id} className="flex gap-3 items-end">
              <div className="flex-1">
                <Combobox
                  options={destOptions}
                  value={trip.destination}
                  onChange={(value) => updateDestination(trip.id, 'destination', value)}
                  placeholder={`Destination ${index + 1}`}
                />
              </div>
              <div className="w-32">
                <Input
                  type="number"
                  min="1"
                  max="365"
                  value={trip.days}
                  onChange={(e) => updateDestination(trip.id, 'days', parseInt(e.target.value) || 1)}
                  placeholder="Days"
                />
              </div>
              {tripDestinations.length > 1 && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeDestination(trip.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}

          {tripDestinations.length < 5 && (
            <Button
              variant="outline"
              className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-400 transition-colors"
              onClick={addDestination}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Destination
            </Button>
          )}
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            {error}
          </div>
        )}

        <Button
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold shadow-sm hover:shadow-md transition-all duration-200 text-lg"
          size="lg"
          onClick={handleSearch}
        >
          Check Visa Requirements
        </Button>
      </CardContent>
    </Card>
  );
}
