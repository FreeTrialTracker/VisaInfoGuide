'use client';

import { useState, useEffect } from 'react';
import { supabase, Passport, Destination } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X, Plane } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface TripDestination {
  id: string;
  destination: string;
  days: number;
}

export default function TripVisaFinder() {
  const router = useRouter();
  const [passports, setPassports] = useState<Passport[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [selectedPassport, setSelectedPassport] = useState<string>('');
  const [tripDestinations, setTripDestinations] = useState<TripDestination[]>([
    { id: '1', destination: '', days: 7 }
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/trip-data');
        if (!response.ok) throw new Error('Failed to fetch data');

        const data = await response.json();
        setPassports(data.passports || []);
        setDestinations(data.destinations || []);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const addDestination = () => {
    if (tripDestinations.length < 5) {
      setTripDestinations([
        ...tripDestinations,
        { id: Date.now().toString(), destination: '', days: 7 }
      ]);
    }
  };

  const removeDestination = (id: string) => {
    if (tripDestinations.length > 1) {
      setTripDestinations(tripDestinations.filter(d => d.id !== id));
    }
  };

  const updateDestination = (id: string, field: 'destination' | 'days', value: string | number) => {
    setTripDestinations(tripDestinations.map(d =>
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

  if (loading) {
    return (
      <Card className="shadow-sm border border-gray-200">
        <CardContent className="py-12">
          <p className="text-center text-gray-600">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm border border-gray-200">
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
          <Label htmlFor="passport" className="font-semibold">Your Passport</Label>
          <Select
            value={selectedPassport}
            onValueChange={(value) => {
              setSelectedPassport(value);
              setTripDestinations(tripDestinations.map(d =>
                d.destination === value ? { ...d, destination: '' } : d
              ));
            }}
          >
            <SelectTrigger id="passport">
              <SelectValue placeholder="Select your passport" />
            </SelectTrigger>
            <SelectContent>
              {passports.map(passport => (
                <SelectItem key={passport.slug} value={passport.slug}>
                  {passport.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label className="font-semibold">Trip Itinerary (in order)</Label>
          {tripDestinations.map((trip, index) => (
            <div key={trip.id} className="flex gap-3 items-end">
              <div className="flex-1">
                <Select
                  value={trip.destination}
                  onValueChange={(value) => updateDestination(trip.id, 'destination', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {destinations
                      .filter(dest => dest.slug !== selectedPassport)
                      .map(dest => (
                        <SelectItem key={dest.slug} value={dest.slug}>
                          {dest.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
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
              className="w-full"
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
