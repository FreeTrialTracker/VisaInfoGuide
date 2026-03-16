'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import {
  ShieldCheck, ShieldAlert, ShieldX, ShieldQuestion,
  ChevronDown, ChevronUp, Check, Loader as Loader2, RotateCcw,
  Link as LinkIcon, Share2, Globe, CalendarDays, Ticket, Plane,
  Route, Calculator, CircleCheck as CheckCircle2, CircleAlert as AlertCircle,
  CircleX, CircleDot, Plus, Trash2, Info, MapPin, User,
} from 'lucide-react';
import Link from 'next/link';
import { COUNTRIES } from '@/lib/countries';
import type { TripEntryRiskInput, TripEntryRiskResult, ComponentRiskCard, SchengenTrip } from '@/lib/trip-entry-risk/types';
import { runTripEntryRiskCheck } from '@/lib/trip-entry-risk/engine';
import { serializeTripRiskParams, parseTripRiskParams } from '@/lib/trip-entry-risk/url-params';

const LOADING_STEPS = [
  'Checking destination visa rules\u2026',
  'Checking passport validity\u2026',
  'Checking transit requirements\u2026',
  'Checking onward ticket risk\u2026',
  'Checking Schengen stay limits\u2026',
  'Generating trip risk summary\u2026',
];

type OverallStatus = 'Likely OK' | 'Caution' | 'Likely Issue';

const OVERALL_STATUS_CONFIG: Record<OverallStatus, {
  icon: React.ComponentType<{ className?: string }>;
  bgColor: string;
  borderColor: string;
  textColor: string;
  badgeBg: string;
  label: string;
  riskLabel: string;
  shortExplanation: string;
}> = {
  'Likely OK': {
    icon: ShieldCheck,
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-300',
    textColor: 'text-emerald-700',
    badgeBg: 'bg-emerald-100',
    label: 'LIKELY OK',
    riskLabel: 'Low Risk',
    shortExplanation: 'No major visa, passport validity, transit, onward-ticket, or Schengen stay-limit risks were detected for this trip.',
  },
  'Caution': {
    icon: ShieldAlert,
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-300',
    textColor: 'text-amber-700',
    badgeBg: 'bg-amber-100',
    label: 'CAUTION',
    riskLabel: 'Medium Risk',
    shortExplanation: 'One or more parts of your trip may require additional verification before travel.',
  },
  'Likely Issue': {
    icon: ShieldX,
    bgColor: 'bg-red-50',
    borderColor: 'border-red-300',
    textColor: 'text-red-700',
    badgeBg: 'bg-red-100',
    label: 'LIKELY ISSUE',
    riskLabel: 'High Risk',
    shortExplanation: 'One or more detected rule conflicts could prevent boarding or entry.',
  },
};

const COMPONENT_STATUS_CONFIG: Record<string, {
  bgColor: string;
  borderColor: string;
  textColor: string;
  dotColor: string;
  badgeBg: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}> = {
  pass: { bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', textColor: 'text-emerald-700', dotColor: 'bg-emerald-500', badgeBg: 'bg-emerald-100', label: 'OK', icon: CheckCircle2 },
  caution: { bgColor: 'bg-amber-50', borderColor: 'border-amber-200', textColor: 'text-amber-700', dotColor: 'bg-amber-500', badgeBg: 'bg-amber-100', label: 'Caution', icon: AlertCircle },
  fail: { bgColor: 'bg-red-50', borderColor: 'border-red-200', textColor: 'text-red-700', dotColor: 'bg-red-500', badgeBg: 'bg-red-100', label: 'Issue', icon: CircleX },
  unknown: { bgColor: 'bg-gray-50', borderColor: 'border-gray-200', textColor: 'text-gray-600', dotColor: 'bg-gray-400', badgeBg: 'bg-gray-100', label: 'Unconfirmed', icon: CircleDot },
  not_applicable: { bgColor: 'bg-gray-50', borderColor: 'border-gray-100', textColor: 'text-gray-400', dotColor: 'bg-gray-300', badgeBg: 'bg-gray-50', label: 'N/A', icon: CircleDot },
};

const RISK_CONFIG = {
  Low: { bg: 'bg-emerald-100', text: 'text-emerald-800' },
  Medium: { bg: 'bg-amber-100', text: 'text-amber-800' },
  High: { bg: 'bg-red-100', text: 'text-red-800' },
};

const CONFIDENCE_CONFIG = {
  High: { bg: 'bg-blue-100', text: 'text-blue-800' },
  Medium: { bg: 'bg-sky-100', text: 'text-sky-800' },
  Limited: { bg: 'bg-gray-100', text: 'text-gray-700' },
};

const FACTOR_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  pass: CheckCircle2,
  caution: AlertCircle,
  fail: CircleX,
  unknown: CircleDot,
};

const FACTOR_COLOR_MAP: Record<string, string> = {
  pass: 'text-emerald-600',
  caution: 'text-amber-600',
  fail: 'text-red-600',
  unknown: 'text-gray-400',
};

function CountrySelect({
  value, onChange, placeholder, id,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  id: string;
}) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.length === 0
    ? COUNTRIES
    : COUNTRIES.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));

  const selected = COUNTRIES.find(c => c.slug === value);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        id={id}
        type="button"
        onClick={() => { setOpen(o => !o); setTimeout(() => inputRef.current?.focus(), 50); }}
        className="w-full flex items-center justify-between px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 hover:border-gray-300 transition-colors"
      >
        <span className={selected ? 'text-gray-900' : 'text-gray-400'}>
          {selected ? selected.name : placeholder}
        </span>
        <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
      </button>
      {open && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <div className="p-2 border-b border-gray-100">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full px-2 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>
          <div className="max-h-52 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500">No results</div>
            ) : (
              filtered.map(c => (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => { onChange(c.slug); setOpen(false); setQuery(''); }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-teal-50 hover:text-teal-700 transition-colors flex items-center justify-between ${value === c.slug ? 'bg-teal-50 text-teal-700 font-medium' : 'text-gray-700'}`}
                >
                  {c.name}
                  {value === c.slug && <Check className="w-3.5 h-3.5" />}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function getCountryName(slug: string): string {
  return COUNTRIES.find(c => c.slug === slug)?.name ?? slug;
}

function formatDateDisplay(dateStr: string): string {
  if (!dateStr) return '—';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

const BLANK_FORM: TripEntryRiskInput = {
  passportSlug: '',
  destinationSlug: '',
  arrivalDate: '',
  stayLengthDays: 7,
  departureDate: '',
  isOneWay: false,
  passportExpiry: '',
  onwardTicketConfirmed: undefined,
  transitStop1: '',
  transitStop2: '',
  selfTransfer: false,
  changingTerminals: false,
  leavingAirport: false,
  holdsDestinationVisa: false,
  holdsResidencePermit: false,
  includesSchengen: false,
  schengenHistory: [],
};

export default function TripEntryRiskClient() {
  const [form, setForm] = useState<TripEntryRiskInput>({ ...BLANK_FORM });
  const [result, setResult] = useState<TripEntryRiskResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [copied, setCopied] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showTransit, setShowTransit] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parsed = parseTripRiskParams(window.location.search);
    if (Object.keys(parsed).length > 0) {
      const merged = { ...BLANK_FORM, ...parsed };
      setForm(merged);
      if (parsed.transitStop1 || parsed.transitStop2) setShowTransit(true);
      if (parsed.holdsDestinationVisa || parsed.holdsResidencePermit || parsed.includesSchengen) setShowAdvanced(true);
      if (parsed.passportSlug && parsed.destinationSlug && parsed.arrivalDate && parsed.stayLengthDays) {
        setTimeout(() => {
          const r = runTripEntryRiskCheck(merged);
          setResult(r);
        }, 100);
      }
    }
  }, []);

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.passportSlug) e.passportSlug = 'Select your passport country';
    if (!form.destinationSlug) e.destinationSlug = 'Select your destination';
    if (!form.arrivalDate) e.arrivalDate = 'Enter your intended arrival date';
    if (!form.stayLengthDays || form.stayLengthDays < 1) e.stayLengthDays = 'Enter your intended stay length';
    if (!form.isOneWay && form.departureDate && form.arrivalDate && form.departureDate < form.arrivalDate) {
      e.departureDate = 'Departure date must be after arrival date';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  const handleSubmit = useCallback(async () => {
    if (!validate()) return;
    setLoading(true);
    setLoadingStep(0);
    setResult(null);

    const totalSteps = LOADING_STEPS.length;
    const minDuration = 700;
    const stepDelay = Math.max(minDuration / totalSteps, 100);

    for (let i = 0; i < totalSteps; i++) {
      await new Promise(r => setTimeout(r, stepDelay));
      setLoadingStep(i + 1);
    }

    const r = runTripEntryRiskCheck(form);
    setResult(r);
    setLoading(false);

    const qs = serializeTripRiskParams(form);
    window.history.replaceState({}, '', `${window.location.pathname}?${qs}`);

    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  }, [form]);

  function handleReset() {
    setForm({ ...BLANK_FORM });
    setResult(null);
    setErrors({});
    setShowAdvanced(false);
    setShowTransit(false);
    window.history.replaceState({}, '', window.location.pathname);
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function addSchengenTrip() {
    setForm(f => ({ ...f, schengenHistory: [...(f.schengenHistory ?? []), { entryDate: '', exitDate: '' }] }));
  }

  function removeSchengenTrip(i: number) {
    setForm(f => ({ ...f, schengenHistory: (f.schengenHistory ?? []).filter((_, idx) => idx !== i) }));
  }

  function updateSchengenTrip(i: number, field: keyof SchengenTrip, value: string) {
    setForm(f => {
      const history = [...(f.schengenHistory ?? [])];
      history[i] = { ...history[i], [field]: value };
      return { ...f, schengenHistory: history };
    });
  }

  const cfg = result ? OVERALL_STATUS_CONFIG[result.overallStatus] : null;

  return (
    <div className="space-y-8">
      {/* Form Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">Trip Details</h2>
          <p className="text-sm text-gray-500 mt-0.5">Fill in your trip to run a combined entry risk check.</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Row 1: Passport + Destination */}
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="passport-select" className="block text-sm font-medium text-gray-700 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-gray-400" />
                  Passport Country <span className="text-red-500">*</span>
                </span>
              </label>
              <CountrySelect id="passport-select" value={form.passportSlug} onChange={v => setForm(f => ({ ...f, passportSlug: v }))} placeholder="Select passport country" />
              {errors.passportSlug && <p className="mt-1 text-xs text-red-600">{errors.passportSlug}</p>}
            </div>
            <div>
              <label htmlFor="dest-select" className="block text-sm font-medium text-gray-700 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  Destination Country <span className="text-red-500">*</span>
                </span>
              </label>
              <CountrySelect id="dest-select" value={form.destinationSlug} onChange={v => setForm(f => ({ ...f, destinationSlug: v }))} placeholder="Select destination" />
              {errors.destinationSlug && <p className="mt-1 text-xs text-red-600">{errors.destinationSlug}</p>}
            </div>
          </div>

          {/* Row 2: Arrival + Stay + Passport Expiry */}
          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <label htmlFor="arrival-date" className="block text-sm font-medium text-gray-700 mb-1.5">
                Intended Arrival Date <span className="text-red-500">*</span>
              </label>
              <input
                id="arrival-date" type="date" value={form.arrivalDate}
                onChange={e => setForm(f => ({ ...f, arrivalDate: e.target.value }))}
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 hover:border-gray-300 transition-colors text-gray-900"
              />
              {errors.arrivalDate && <p className="mt-1 text-xs text-red-600">{errors.arrivalDate}</p>}
            </div>
            <div>
              <label htmlFor="stay-length" className="block text-sm font-medium text-gray-700 mb-1.5">
                Intended Stay Length (days) <span className="text-red-500">*</span>
              </label>
              <input
                id="stay-length" type="number" min="1" max="365"
                value={form.stayLengthDays || ''}
                onChange={e => setForm(f => ({ ...f, stayLengthDays: parseInt(e.target.value) || 0 }))}
                placeholder="e.g. 14"
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 hover:border-gray-300 transition-colors text-gray-900"
              />
              {errors.stayLengthDays && <p className="mt-1 text-xs text-red-600">{errors.stayLengthDays}</p>}
            </div>
            <div>
              <label htmlFor="expiry-date" className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                Passport Expiry Date
                <span className="text-xs font-normal text-gray-400">(recommended)</span>
              </label>
              <input
                id="expiry-date" type="date" value={form.passportExpiry ?? ''}
                onChange={e => setForm(f => ({ ...f, passportExpiry: e.target.value }))}
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 hover:border-gray-300 transition-colors text-gray-900"
              />
            </div>
          </div>

          {/* Row 3: Departure + Onward Ticket */}
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="departure-date" className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                Intended Departure Date
                <span className="text-xs font-normal text-gray-400">(optional)</span>
              </label>
              <input
                id="departure-date" type="date"
                value={form.departureDate ?? ''}
                disabled={form.isOneWay}
                onChange={e => setForm(f => ({ ...f, departureDate: e.target.value }))}
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 hover:border-gray-300 transition-colors text-gray-900 disabled:bg-gray-50 disabled:text-gray-400"
              />
              <p className="mt-1 text-xs text-gray-400">Helps determine passport validity rules.</p>
              {errors.departureDate && <p className="mt-1 text-xs text-red-600">{errors.departureDate}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Onward / Return Ticket Confirmed?
              </label>
              <div className="flex gap-2">
                {(['Yes', 'No', 'Not sure'] as const).map(opt => {
                  const val = opt === 'Yes' ? true : opt === 'No' ? false : undefined;
                  const isSelected = form.onwardTicketConfirmed === val;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, onwardTicketConfirmed: val }))}
                      className={`flex-1 py-2.5 px-3 rounded-lg border text-sm font-medium transition-colors min-h-[44px] ${isSelected ? 'bg-teal-600 border-teal-600 text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-teal-400 hover:text-teal-700'}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* One-way toggle */}
          <div className="flex items-center gap-2">
            <input
              id="one-way" type="checkbox"
              checked={form.isOneWay ?? false}
              onChange={e => setForm(f => ({ ...f, isOneWay: e.target.checked, departureDate: e.target.checked ? '' : f.departureDate }))}
              className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
            />
            <label htmlFor="one-way" className="text-sm text-gray-600 cursor-pointer">
              One-way trip or departure date unknown
            </label>
          </div>

          {/* Transit Section */}
          <div className="border border-gray-100 rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => setShowTransit(v => !v)}
              className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700"
            >
              <div className="flex items-center gap-2">
                <Route className="w-4 h-4 text-gray-500" />
                Transit Stops
                <span className="text-xs font-normal text-gray-400">(optional)</span>
                {(form.transitStop1 || form.transitStop2) && (
                  <span className="px-1.5 py-0.5 bg-teal-100 text-teal-700 text-xs rounded-full font-semibold">Added</span>
                )}
              </div>
              {showTransit ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {showTransit && (
              <div className="p-4 space-y-4 bg-white">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="transit1" className="block text-sm font-medium text-gray-700 mb-1.5">Transit Stop 1</label>
                    <CountrySelect id="transit1" value={form.transitStop1 ?? ''} onChange={v => setForm(f => ({ ...f, transitStop1: v }))} placeholder="Select country" />
                  </div>
                  <div>
                    <label htmlFor="transit2" className="block text-sm font-medium text-gray-700 mb-1.5">Transit Stop 2</label>
                    <CountrySelect id="transit2" value={form.transitStop2 ?? ''} onChange={v => setForm(f => ({ ...f, transitStop2: v }))} placeholder="Select country (optional)" />
                  </div>
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  {[
                    { id: 'selfTransfer', label: 'Self-transfer (separate tickets)', field: 'selfTransfer' as const },
                    { id: 'changingTerminals', label: 'Changing terminals', field: 'changingTerminals' as const },
                    { id: 'leavingAirport', label: 'Leaving the airport', field: 'leavingAirport' as const },
                  ].map(item => (
                    <div key={item.id} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <input
                        id={item.id} type="checkbox"
                        checked={!!form[item.field]}
                        onChange={e => setForm(f => ({ ...f, [item.field]: e.target.checked }))}
                        className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                      <label htmlFor={item.id} className="text-sm text-gray-600 cursor-pointer">{item.label}</label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Advanced Options */}
          <div className="border border-gray-100 rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => setShowAdvanced(v => !v)}
              className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700"
            >
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-gray-500" />
                Advanced Options
                {(form.holdsDestinationVisa || form.holdsResidencePermit || form.includesSchengen) && (
                  <span className="px-1.5 py-0.5 bg-teal-100 text-teal-700 text-xs rounded-full font-semibold">Active</span>
                )}
              </div>
              {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {showAdvanced && (
              <div className="p-4 space-y-4 bg-white">
                <div className="space-y-3">
                  <div className="flex items-start gap-2.5 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <input
                      id="holdsVisa" type="checkbox"
                      checked={!!form.holdsDestinationVisa}
                      onChange={e => setForm(f => ({ ...f, holdsDestinationVisa: e.target.checked }))}
                      className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 mt-0.5"
                    />
                    <label htmlFor="holdsVisa" className="text-sm text-gray-700 cursor-pointer leading-relaxed">
                      I already hold a valid visa for the destination
                    </label>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <input
                      id="holdsPermit" type="checkbox"
                      checked={!!form.holdsResidencePermit}
                      onChange={e => setForm(f => ({ ...f, holdsResidencePermit: e.target.checked }))}
                      className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 mt-0.5"
                    />
                    <label htmlFor="holdsPermit" className="text-sm text-gray-700 cursor-pointer leading-relaxed">
                      I hold a residence permit or qualifying visa
                    </label>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <input
                      id="schengen" type="checkbox"
                      checked={!!form.includesSchengen}
                      onChange={e => setForm(f => ({ ...f, includesSchengen: e.target.checked }))}
                      className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 mt-0.5"
                    />
                    <label htmlFor="schengen" className="text-sm text-gray-700 cursor-pointer leading-relaxed">
                      This trip includes travel in the Schengen Area
                    </label>
                  </div>
                </div>

                {/* Schengen History */}
                {form.includesSchengen && (
                  <div className="border border-blue-100 rounded-xl p-4 bg-blue-50 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-blue-900">Prior Schengen Trips (last 180 days)</h4>
                      <button
                        type="button"
                        onClick={addSchengenTrip}
                        className="flex items-center gap-1.5 text-xs text-teal-700 font-medium hover:text-teal-900 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add trip
                      </button>
                    </div>
                    <p className="text-xs text-blue-700">Add any Schengen Area trips from the last 180 days to calculate your remaining allowance.</p>
                    {(form.schengenHistory ?? []).length === 0 && (
                      <p className="text-xs text-blue-600 italic">No prior trips added. Click "Add trip" to include Schengen history.</p>
                    )}
                    {(form.schengenHistory ?? []).map((trip, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="flex-1 grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-xs text-blue-800 mb-1">Entry date</label>
                            <input
                              type="date"
                              value={trip.entryDate}
                              onChange={e => updateSchengenTrip(i, 'entryDate', e.target.value)}
                              className="w-full px-2.5 py-2 bg-white border border-blue-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-blue-800 mb-1">Exit date</label>
                            <input
                              type="date"
                              value={trip.exitDate}
                              onChange={e => updateSchengenTrip(i, 'exitDate', e.target.value)}
                              className="w-full px-2.5 py-2 bg-white border border-blue-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeSchengenTrip(i)}
                          className="p-1.5 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 mt-4"
                          aria-label="Remove trip"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-semibold rounded-xl transition-colors text-sm shadow-sm min-h-[48px]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
                  <span className="truncate">{LOADING_STEPS[Math.min(loadingStep, LOADING_STEPS.length - 1)] ?? 'Running check\u2026'}</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Check Trip Entry Risk
                </>
              )}
            </button>
            {result && (
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-3.5 border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-800 rounded-xl transition-colors text-sm min-h-[48px]"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      {result && cfg && (
        <div ref={resultsRef} className="space-y-6">
          {/* Section header */}
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-bold text-gray-900">Trip Entry Risk Summary</h2>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${CONFIDENCE_CONFIG[result.confidenceLevel].bg} ${CONFIDENCE_CONFIG[result.confidenceLevel].text}`}>
              {result.confidenceLevel} Confidence
            </span>
          </div>

          {/* Overall Status Banner */}
          <div className={`rounded-2xl border-2 ${cfg.borderColor} ${cfg.bgColor} p-5 sm:p-6`}>
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${cfg.badgeBg} flex-shrink-0`}>
                <cfg.icon className={`w-7 h-7 sm:w-8 sm:h-8 ${cfg.textColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className={`text-xl sm:text-2xl font-extrabold tracking-wide ${cfg.textColor}`}>{cfg.label}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${RISK_CONFIG[result.riskLevel].bg} ${RISK_CONFIG[result.riskLevel].text}`}>
                    {cfg.riskLabel}
                  </span>
                </div>
                <p className={`text-sm font-semibold ${cfg.textColor} mb-2`}>{cfg.shortExplanation}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{result.mainExplanation}</p>

                {result.primaryFactors.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2.5">Primary Factors</p>
                    <ul className="space-y-1.5">
                      {result.components
                        .filter(c => c.status !== 'not_applicable')
                        .map((c) => {
                          const FactorIcon = FACTOR_ICON_MAP[c.status] ?? CircleDot;
                          const iconColor = FACTOR_COLOR_MAP[c.status] ?? 'text-gray-400';
                          const factorText = result.primaryFactors.find(f =>
                            f.startsWith(c.title)
                          ) ?? `${c.title}: ${c.summary}`;
                          return (
                            <li key={c.id} className="flex items-start gap-2 text-sm text-gray-700">
                              <FactorIcon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${iconColor}`} />
                              <span>{factorText}</span>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-5 flex gap-2 flex-wrap">
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:border-gray-300 rounded-lg text-sm text-gray-600 hover:text-gray-800 transition-colors min-h-[44px]"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" /> : <LinkIcon className="w-4 h-4 flex-shrink-0" />}
                {copied ? 'Link copied!' : 'Copy Result Link'}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: 'Trip Entry Risk Check', url: window.location.href });
                  } else {
                    handleCopyLink();
                  }
                }}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:border-gray-300 rounded-lg text-sm text-gray-600 hover:text-gray-800 transition-colors min-h-[44px]"
              >
                <Share2 className="w-4 h-4 flex-shrink-0" />
                Share Trip Check
              </button>
            </div>
          </div>

          {/* Trip Summary */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4 text-teal-600" />
              Trip Summary
            </h3>
            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              {[
                { label: 'Passport', value: getCountryName(result.tripSummary.passportSlug) },
                { label: 'Destination', value: getCountryName(result.tripSummary.destinationSlug) },
                { label: 'Arrival Date', value: formatDateDisplay(result.tripSummary.arrivalDate) },
                { label: 'Stay Length', value: `${result.tripSummary.stayLengthDays} day${result.tripSummary.stayLengthDays !== 1 ? 's' : ''}` },
                { label: 'Departure Date', value: result.tripSummary.isOneWay ? 'One-way' : (result.tripSummary.departureDate ? formatDateDisplay(result.tripSummary.departureDate) : 'Not specified') },
                { label: 'Passport Expiry', value: result.tripSummary.passportExpiry ? formatDateDisplay(result.tripSummary.passportExpiry) : 'Not provided' },
                { label: 'Onward Ticket', value: result.tripSummary.onwardTicketConfirmed === true ? 'Confirmed' : result.tripSummary.onwardTicketConfirmed === false ? 'Not confirmed' : 'Not answered' },
                { label: 'Transit Stop 1', value: result.tripSummary.transitStop1 ? getCountryName(result.tripSummary.transitStop1) : 'None' },
                { label: 'Transit Stop 2', value: result.tripSummary.transitStop2 ? getCountryName(result.tripSummary.transitStop2) : 'None' },
                { label: 'Self-Transfer', value: result.tripSummary.selfTransfer ? 'Yes' : 'No' },
                { label: 'Terminal Change', value: result.tripSummary.changingTerminals ? 'Yes' : 'No' },
                { label: 'Schengen History', value: result.tripSummary.schengenHistoryIncluded ? 'Included' : 'Not included' },
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-50 rounded-lg px-3 py-2.5">
                  <dt className="text-xs text-gray-500 mb-0.5">{label}</dt>
                  <dd className="font-medium text-gray-900 text-sm">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Component Risk Cards */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-4">Component Risk Checks</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {result.components
                .filter(c => c.status !== 'not_applicable')
                .map(card => (
                  <ComponentCard key={card.id} card={card} />
                ))}
            </div>
          </div>

          {/* Recommended Actions */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              Recommended Actions
            </h3>
            <ul className="space-y-2.5">
              {result.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-50 text-teal-700 text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>

          {/* Verification Note */}
          <div className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600">
            <ShieldQuestion className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
            <p>
              <span className="font-medium text-gray-700">Verification note: </span>
              {result.verificationNote}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function ComponentCard({ card }: { card: ComponentRiskCard }) {
  const [expanded, setExpanded] = useState(false);
  const s = COMPONENT_STATUS_CONFIG[card.status] ?? COMPONENT_STATUS_CONFIG.unknown;
  const risk = RISK_CONFIG[card.riskLevel];
  const conf = CONFIDENCE_CONFIG[card.confidence];
  const StatusIcon = s.icon;

  return (
    <div className={`border ${s.borderColor} ${s.bgColor} rounded-xl overflow-hidden`}>
      <button
        type="button"
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-start gap-3 p-4 text-left hover:opacity-90 transition-opacity"
      >
        <StatusIcon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${s.textColor}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{card.title}</span>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.badgeBg ?? s.bgColor} ${s.textColor} border ${s.borderColor}`}>
                {s.label}
              </span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${risk.bg} ${risk.text}`}>
                {card.riskLevel} Risk
              </span>
            </div>
          </div>
          <p className={`text-sm font-semibold mt-1 ${s.textColor}`}>{card.summary}</p>
        </div>
        {expanded ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" /> : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />}
      </button>
      {expanded && (
        <div className="px-4 pb-4 pt-0 space-y-2">
          <p className="text-sm text-gray-700 leading-relaxed">{card.detail}</p>
          <div className="flex flex-wrap gap-2 pt-1">
            {card.ruleBasis && (
              <span className="text-xs text-gray-500 bg-white border border-gray-200 px-2 py-0.5 rounded">
                Rule: {card.ruleBasis}
              </span>
            )}
            <span className={`text-xs font-medium px-2 py-0.5 rounded ${conf.bg} ${conf.text}`}>
              {card.confidence} Confidence
            </span>
          </div>
          {card.source && (
            <p className="text-xs text-gray-400">Source: {card.source}</p>
          )}
        </div>
      )}
    </div>
  );
}
