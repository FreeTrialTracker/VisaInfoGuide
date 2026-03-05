'use client';

import { useState, useEffect, useRef } from 'react';
import { Plus, X, Calendar, CircleAlert as AlertCircle, CircleCheck as CheckCircle, Download, Upload, Trash2, ChevronDown, Globe, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import {
  TripSegment,
  SCHENGEN_COUNTRIES,
  validateTrips,
  calculateSchengenDays,
  findEarliestEntryDate,
  SchengenResult,
} from '@/lib/schengen';

const STORAGE_KEY = 'schengen_trips_v2';
const OTHER_COUNTRY = '__other__';

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

function getTodayString(): string {
  return formatDate(new Date());
}

function CountrySelect({
  index,
  trip,
  onCountryChange,
  onCustomCountryChange,
}: {
  index: number;
  trip: TripSegment;
  onCountryChange: (index: number, value: string) => void;
  onCustomCountryChange: (index: number, value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedSchengen = SCHENGEN_COUNTRIES.find(c => c === trip.country);
  const isOther = trip.isSchengen === false;
  const displayValue = isOther
    ? (trip.country && trip.country !== OTHER_COUNTRY ? trip.country : 'Other country')
    : (selectedSchengen || 'Select country');

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="space-y-2">
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md border transition-colors text-left ${
            trip.isSchengen === false
              ? 'border-gray-300 bg-white text-gray-700'
              : selectedSchengen
              ? 'border-blue-300 bg-blue-50 text-blue-900'
              : 'border-gray-300 bg-white text-gray-400'
          }`}
        >
          <span className="flex items-center gap-2 truncate">
            {trip.isSchengen === false ? (
              <Globe className="h-3.5 w-3.5 text-gray-400 shrink-0" />
            ) : (
              <MapPin className="h-3.5 w-3.5 text-blue-400 shrink-0" />
            )}
            <span className="truncate">{displayValue}</span>
          </span>
          <ChevronDown className={`h-4 w-4 shrink-0 transition-transform text-gray-400 ${open ? 'rotate-180' : ''}`} />
        </button>

        {open && (
          <div className="absolute z-50 top-full mt-1 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
            <div className="max-h-60 overflow-y-auto">
              <div className="px-2 pt-2 pb-1">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-1 pb-1">Schengen Area</p>
                {SCHENGEN_COUNTRIES.map((country) => (
                  <button
                    key={country}
                    type="button"
                    onClick={() => {
                      onCountryChange(index, country);
                      setOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-sm rounded-md flex items-center gap-2 transition-colors ${
                      trip.country === country && trip.isSchengen !== false
                        ? 'bg-blue-50 text-blue-900 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <MapPin className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                    {country}
                  </button>
                ))}
              </div>
              <div className="px-2 pb-2 border-t border-gray-100 mt-1 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    onCountryChange(index, OTHER_COUNTRY);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-sm rounded-md flex items-center gap-2 transition-colors ${
                    trip.isSchengen === false
                      ? 'bg-gray-100 text-gray-900 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Globe className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                  Other (non-Schengen)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {trip.isSchengen === false && (
        <Input
          type="text"
          placeholder="Country name (e.g. UK, Thailand…)"
          value={trip.country === OTHER_COUNTRY ? '' : (trip.country || '')}
          onChange={(e) => onCustomCountryChange(index, e.target.value)}
          className="text-sm"
        />
      )}
    </div>
  );
}

export default function SchengenCalculator() {
  const [trips, setTrips] = useState<TripSegment[]>([
    { entryDate: '', exitDate: '', country: '', isSchengen: true },
  ]);
  const [evaluationDate, setEvaluationDate] = useState<string>(getTodayString());
  const [result, setResult] = useState<SchengenResult | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [plannedDays, setPlannedDays] = useState<string>('');
  const [plannedStartDate, setPlannedStartDate] = useState<string>(getTodayString());
  const [earliestEntry, setEarliestEntry] = useState<string>('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTrips(parsed);
        }
      }
    } catch {
    }
  }, []);

  useEffect(() => {
    if (trips.some(t => t.entryDate && t.exitDate)) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
      } catch {
      }
    }
  }, [trips]);

  const addTrip = () => {
    setTrips([...trips, { entryDate: '', exitDate: '', country: '', isSchengen: true }]);
  };

  const removeTrip = (index: number) => {
    if (trips.length > 1) {
      setTrips(trips.filter((_, i) => i !== index));
    }
  };

  const updateTrip = (index: number, field: 'entryDate' | 'exitDate', value: string) => {
    const updated = [...trips];
    updated[index] = { ...updated[index], [field]: value };
    setTrips(updated);
  };

  const updateCountry = (index: number, value: string) => {
    const updated = [...trips];
    if (value === OTHER_COUNTRY) {
      updated[index] = { ...updated[index], country: OTHER_COUNTRY, isSchengen: false };
    } else {
      updated[index] = { ...updated[index], country: value, isSchengen: true };
    }
    setTrips(updated);
  };

  const updateCustomCountry = (index: number, value: string) => {
    const updated = [...trips];
    updated[index] = { ...updated[index], country: value, isSchengen: false };
    setTrips(updated);
  };

  const calculate = () => {
    setErrors([]);
    setResult(null);
    setEarliestEntry('');

    const validTrips = trips.filter(t => t.entryDate && t.exitDate);

    if (validTrips.length === 0) {
      setErrors(['Please add at least one trip with entry and exit dates']);
      return;
    }

    const validationErrors = validateTrips(validTrips);
    if (validationErrors.length > 0) {
      setErrors(validationErrors.map(e => `Trip ${e.index + 1}: ${e.message}`));
      return;
    }

    try {
      const calculationResult = calculateSchengenDays(validTrips, evaluationDate);
      setResult(calculationResult);
    } catch (error) {
      setErrors(['Calculation error: ' + (error instanceof Error ? error.message : 'Unknown error')]);
    }
  };

  const findEarliest = () => {
    setEarliestEntry('');

    const validTrips = trips.filter(t => t.entryDate && t.exitDate);
    const days = parseInt(plannedDays, 10);

    if (!days || days < 1) {
      setEarliestEntry('Please enter a valid trip length');
      return;
    }

    if (days > 90) {
      setEarliestEntry('Cannot stay more than 90 days in Schengen');
      return;
    }

    try {
      const result = findEarliestEntryDate(validTrips, days, plannedStartDate);
      setEarliestEntry(result.message);
    } catch (error) {
      setEarliestEntry('Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const clearAll = () => {
    setTrips([{ entryDate: '', exitDate: '', country: '', isSchengen: true }]);
    setResult(null);
    setErrors([]);
    setEarliestEntry('');
    localStorage.removeItem(STORAGE_KEY);
  };

  const exportData = () => {
    const data = {
      trips: trips.filter(t => t.entryDate && t.exitDate),
      exportDate: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `schengen-trips-${formatDate(new Date())}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.trips && Array.isArray(data.trips)) {
          setTrips(data.trips);
          setErrors([]);
          setResult(null);
        } else {
          setErrors(['Invalid import file format']);
        }
      } catch (error) {
        setErrors(['Failed to import data: ' + (error instanceof Error ? error.message : 'Unknown error')]);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Trips</CardTitle>
          <CardDescription>
            Add all your trips — select a Schengen country or "Other" for countries outside the Schengen Area. Only Schengen trips count toward the 90-day limit.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {trips.map((trip, index) => (
            <div key={index} className={`rounded-xl border p-4 space-y-3 transition-colors ${trip.isSchengen === false ? 'border-gray-200 bg-gray-50' : 'border-blue-100 bg-blue-50/30'}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Trip {index + 1}
                </span>
                <div className="flex items-center gap-2">
                  {trip.isSchengen === false ? (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-200 rounded-full px-2 py-0.5">
                      <Globe className="h-3 w-3" />
                      Non-Schengen
                    </span>
                  ) : trip.country ? (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full px-2 py-0.5">
                      <MapPin className="h-3 w-3" />
                      Schengen
                    </span>
                  ) : null}
                  {trips.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTrip(index)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remove trip"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <Label htmlFor={`country-${index}`} className="text-xs font-medium text-gray-600 mb-1.5 block">
                    Country
                  </Label>
                  <CountrySelect
                    index={index}
                    trip={trip}
                    onCountryChange={updateCountry}
                    onCustomCountryChange={updateCustomCountry}
                  />
                </div>
                <div>
                  <Label htmlFor={`entry-${index}`} className="text-xs font-medium text-gray-600 mb-1.5 block">
                    Entry Date
                  </Label>
                  <Input
                    id={`entry-${index}`}
                    type="date"
                    value={trip.entryDate}
                    onChange={(e) => updateTrip(index, 'entryDate', e.target.value)}
                    className="w-full bg-white"
                  />
                </div>
                <div>
                  <Label htmlFor={`exit-${index}`} className="text-xs font-medium text-gray-600 mb-1.5 block">
                    Exit Date
                  </Label>
                  <Input
                    id={`exit-${index}`}
                    type="date"
                    value={trip.exitDate}
                    onChange={(e) => updateTrip(index, 'exitDate', e.target.value)}
                    className="w-full bg-white"
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="flex flex-wrap gap-2 pt-1">
            <Button onClick={addTrip} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-1" />
              Add Trip
            </Button>
            <Button onClick={exportData} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
            <label>
              <Button variant="outline" size="sm" asChild>
                <span>
                  <Upload className="w-4 h-4 mr-1" />
                  Import
                </span>
              </Button>
              <input
                type="file"
                accept=".json"
                onChange={importData}
                className="hidden"
              />
            </label>
            <Button onClick={clearAll} variant="outline" size="sm" className="text-red-600 hover:text-red-700">
              <Trash2 className="w-4 h-4 mr-1" />
              Clear All
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Evaluation Date</CardTitle>
          <CardDescription>Calculate days used as of this date (default: today)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 items-end">
            <div className="flex-1 max-w-xs">
              <Label htmlFor="eval-date" className="text-sm mb-1.5 block">
                Date
              </Label>
              <Input
                id="eval-date"
                type="date"
                value={evaluationDate}
                onChange={(e) => setEvaluationDate(e.target.value)}
              />
            </div>
            <Button onClick={calculate} size="lg">
              <Calendar className="w-4 h-4 mr-2" />
              Calculate
            </Button>
          </div>
        </CardContent>
      </Card>

      {errors.length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <ul className="list-disc list-inside space-y-1">
              {errors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {result && (
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Schengen Days Used</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{result.daysUsed}</div>
              <p className="text-xs text-gray-500 mt-1">in last 180 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Days Remaining</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-teal-600">{result.daysRemaining}</div>
              <p className="text-xs text-gray-500 mt-1">until 90-day limit</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {result.isWithinLimit ? (
                  <>
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <span className="font-semibold text-green-700">Within Limit</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-6 h-6 text-red-600" />
                    <span className="font-semibold text-red-700">Over Limit</span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {result && result.segmentsInWindow.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Trip Details</CardTitle>
            <CardDescription>
              Rolling window: {result.windowStart} to {result.windowEnd}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {result.segmentsInWindow.map((segment, i) => (
                <div
                  key={i}
                  className={`flex justify-between items-center p-3 rounded-lg ${
                    segment.isSchengen === false ? 'bg-gray-50 border border-gray-200' : 'bg-blue-50 border border-blue-100'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`flex items-center gap-1 shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${
                      segment.isSchengen === false
                        ? 'bg-gray-200 text-gray-600'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {segment.isSchengen === false ? (
                        <Globe className="h-3 w-3" />
                      ) : (
                        <MapPin className="h-3 w-3" />
                      )}
                      {segment.country || (segment.isSchengen === false ? 'Non-Schengen' : 'Schengen')}
                    </div>
                    <div className="text-sm text-gray-700">
                      <span className="font-medium">{segment.entryDate}</span>
                      <span className="text-gray-400 mx-1.5">→</span>
                      <span className="font-medium">{segment.exitDate}</span>
                    </div>
                  </div>
                  <div className="text-sm font-semibold shrink-0 ml-2">
                    {segment.isSchengen === false ? (
                      <span className="text-gray-400 text-xs">not counted</span>
                    ) : (
                      <span className="text-blue-700">{segment.daysInWindow} {segment.daysInWindow === 1 ? 'day' : 'days'}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-sm">
              <span className="text-gray-500">Total Schengen days in window</span>
              <span className="font-bold text-gray-900">{result.daysUsed} / 90</span>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Plan Your Next Trip</CardTitle>
          <CardDescription>Find the earliest date you can enter for a specific Schengen trip length</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <Label htmlFor="planned-start" className="text-sm mb-1.5 block">
                Desired Start Date
              </Label>
              <Input
                id="planned-start"
                type="date"
                value={plannedStartDate}
                onChange={(e) => setPlannedStartDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="planned-days" className="text-sm mb-1.5 block">
                Trip Length (days)
              </Label>
              <Input
                id="planned-days"
                type="number"
                min="1"
                max="90"
                value={plannedDays}
                onChange={(e) => setPlannedDays(e.target.value)}
                placeholder="e.g., 30"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={findEarliest} className="w-full">
                Find Earliest Date
              </Button>
            </div>
          </div>

          {earliestEntry && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{earliestEntry}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
