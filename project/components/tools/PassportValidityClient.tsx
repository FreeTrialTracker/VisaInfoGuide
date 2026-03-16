'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { ShieldCheck, ShieldAlert, ShieldX, ShieldQuestion, ChevronDown, ChevronUp, Loader as Loader2, RotateCcw, User, MapPin, CalendarDays, BadgeCheck, Gauge, Link as LinkIcon, Share2, Check, Clock, FileText, CircleAlert as AlertCircle, CircleCheck as CheckCircle2 } from 'lucide-react';
import { COUNTRIES } from '@/lib/countries';
import type { PassportValidityInput, PassportValidityResult, ValidityStatus } from '@/lib/passport-validity/types';
import { runValidityCheck } from '@/lib/passport-validity/engine';
import { serializeValidityParams, parseValidityParams } from '@/lib/passport-validity/url-params';

const LOADING_STEPS = [
  'Checking destination validity rule\u2026',
  'Comparing travel dates\u2026',
  'Evaluating passport expiry\u2026',
  'Generating recommendation\u2026',
];

type StatusConfig = {
  icon: React.ComponentType<{ className?: string }>;
  bgColor: string;
  borderColor: string;
  textColor: string;
  badgeBg: string;
  badgeText: string;
};

const STATUS_CONFIG: Record<ValidityStatus, StatusConfig & { label: string; shortExplanation: string }> = {
  Valid: {
    icon: ShieldCheck,
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-700',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-800',
    label: 'VALID',
    shortExplanation: 'Your passport appears valid for travel based on the destination\'s minimum validity rule.',
  },
  Caution: {
    icon: ShieldAlert,
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-700',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-800',
    label: 'CAUTION',
    shortExplanation: 'Your passport may be close to the minimum required validity threshold.',
  },
  'Likely Invalid': {
    icon: ShieldX,
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-700',
    badgeBg: 'bg-red-100',
    badgeText: 'text-red-800',
    label: 'LIKELY INVALID',
    shortExplanation: 'Your passport appears not to meet the required validity rule.',
  },
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

function CountrySelect({
  value,
  onChange,
  placeholder,
  id,
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
        onClick={() => {
          setOpen(o => !o);
          setTimeout(() => inputRef.current?.focus(), 50);
        }}
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

function formatDateDisplay(dateStr: string): string {
  if (!dateStr) return '—';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function getCountryName(slug: string): string {
  return COUNTRIES.find(c => c.slug === slug)?.name ?? slug;
}

export default function PassportValidityClient() {
  const [form, setForm] = useState<PassportValidityInput>({
    passportSlug: '',
    destinationSlug: '',
    passportExpiry: '',
    arrivalDate: '',
    departureDate: '',
    isOneWay: false,
  });
  const [result, setResult] = useState<PassportValidityResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [errors, setErrors] = useState<Partial<Record<keyof PassportValidityInput, string>>>({});
  const [copied, setCopied] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = parseValidityParams(window.location.search);
    if (Object.keys(params).length > 0) {
      setForm(prev => ({ ...prev, ...params }));
      if (params.passportSlug && params.destinationSlug && params.passportExpiry && params.arrivalDate) {
        setTimeout(() => {
          const merged: PassportValidityInput = {
            passportSlug: '',
            destinationSlug: '',
            passportExpiry: '',
            arrivalDate: '',
            departureDate: '',
            isOneWay: false,
            ...params,
          };
          const r = runValidityCheck(merged);
          setResult(r);
        }, 100);
      }
    }
  }, []);

  function validate(): boolean {
    const e: Partial<Record<keyof PassportValidityInput, string>> = {};
    if (!form.passportSlug) e.passportSlug = 'Select your passport country';
    if (!form.destinationSlug) e.destinationSlug = 'Select your destination';
    if (!form.passportExpiry) e.passportExpiry = 'Enter your passport expiry date';
    if (!form.arrivalDate) e.arrivalDate = 'Enter your intended arrival date';
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

    for (let i = 0; i < LOADING_STEPS.length; i++) {
      await new Promise(r => setTimeout(r, 400));
      setLoadingStep(i + 1);
    }

    const r = runValidityCheck(form);
    setResult(r);
    setLoading(false);

    const qs = serializeValidityParams(form);
    window.history.replaceState({}, '', `${window.location.pathname}?${qs}`);

    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  }, [form]);

  function handleReset() {
    setForm({ passportSlug: '', destinationSlug: '', passportExpiry: '', arrivalDate: '', departureDate: '', isOneWay: false });
    setResult(null);
    setErrors({});
    window.history.replaceState({}, '', window.location.pathname);
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const cfg = result ? STATUS_CONFIG[result.status] : null;

  return (
    <div className="space-y-8">
      {/* Form Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">Check Your Passport</h2>
          <p className="text-sm text-gray-500 mt-0.5">All required fields must be filled in to run the check.</p>
        </div>
        <div className="p-6 space-y-5">
          {/* Row 1: Passport Country + Passport Expiry Date */}
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="passport-select" className="block text-sm font-medium text-gray-700 mb-1.5">
                Passport Country <span className="text-red-500">*</span>
              </label>
              <CountrySelect
                id="passport-select"
                value={form.passportSlug}
                onChange={v => setForm(f => ({ ...f, passportSlug: v }))}
                placeholder="Select passport country"
              />
              {errors.passportSlug && <p className="mt-1 text-xs text-red-600">{errors.passportSlug}</p>}
            </div>
            <div>
              <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-700 mb-1.5">
                Passport Expiry Date <span className="text-red-500">*</span>
              </label>
              <input
                id="expiry-date"
                type="date"
                value={form.passportExpiry}
                onChange={e => setForm(f => ({ ...f, passportExpiry: e.target.value }))}
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 hover:border-gray-300 transition-colors text-gray-900"
              />
              {errors.passportExpiry && <p className="mt-1 text-xs text-red-600">{errors.passportExpiry}</p>}
            </div>
          </div>

          {/* Row 2: Destination + Arrival + Departure */}
          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <label htmlFor="dest-select" className="block text-sm font-medium text-gray-700 mb-1.5">
                Destination Country <span className="text-red-500">*</span>
              </label>
              <CountrySelect
                id="dest-select"
                value={form.destinationSlug}
                onChange={v => setForm(f => ({ ...f, destinationSlug: v }))}
                placeholder="Select destination"
              />
              {errors.destinationSlug && <p className="mt-1 text-xs text-red-600">{errors.destinationSlug}</p>}
            </div>
            <div>
              <label htmlFor="arrival-date" className="block text-sm font-medium text-gray-700 mb-1.5">
                Intended Arrival Date <span className="text-red-500">*</span>
              </label>
              <input
                id="arrival-date"
                type="date"
                value={form.arrivalDate}
                onChange={e => setForm(f => ({ ...f, arrivalDate: e.target.value }))}
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 hover:border-gray-300 transition-colors text-gray-900"
              />
              {errors.arrivalDate && <p className="mt-1 text-xs text-red-600">{errors.arrivalDate}</p>}
            </div>
            <div>
              <label htmlFor="departure-date" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                Intended Departure Date
                <span className="text-xs font-normal text-gray-400">(optional)</span>
              </label>
              <input
                id="departure-date"
                type="date"
                value={form.departureDate ?? ''}
                disabled={form.isOneWay}
                onChange={e => setForm(f => ({ ...f, departureDate: e.target.value }))}
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 hover:border-gray-300 transition-colors text-gray-900 disabled:bg-gray-50 disabled:text-gray-400"
              />
              {errors.departureDate && <p className="mt-1 text-xs text-red-600">{errors.departureDate}</p>}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="one-way"
              type="checkbox"
              checked={form.isOneWay ?? false}
              onChange={e => setForm(f => ({ ...f, isOneWay: e.target.checked, departureDate: e.target.checked ? '' : f.departureDate }))}
              className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
            />
            <label htmlFor="one-way" className="text-sm text-gray-600 cursor-pointer">
              One-way trip or departure date unknown
            </label>
          </div>

          {/* Advanced Options */}
          <div className="border border-gray-100 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setShowAdvanced(v => !v)}
              className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-600"
            >
              Advanced Options
              {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {showAdvanced && (
              <div className="px-4 py-4 space-y-3 bg-white">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                  <AlertCircle className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-700 mb-1">Residence Permit / Transit Note</p>
                    <p>If you hold a residence permit for the destination country or an EU/Schengen permit, your passport validity requirements may differ. This tool does not yet model residence permit exemptions — verify with the destination embassy or your airline if this applies to you.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                  <AlertCircle className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-700 mb-1">Transit Connections</p>
                    <p>This tool checks the destination validity rule only. For transit passport validity requirements, use the Airline Boarding Check or Transit Visa Checker tools linked below.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-semibold rounded-xl transition-colors text-sm shadow-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {LOADING_STEPS[loadingStep] ?? 'Checking\u2026'}
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Check Passport Validity
                </>
              )}
            </button>
            {result && (
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-3 border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-800 rounded-xl transition-colors text-sm"
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
        <div ref={resultsRef} className="space-y-5">
          {/* Section label */}
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-gray-900">Passport Validity Summary</h2>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${CONFIDENCE_CONFIG[result.confidenceLevel].bg} ${CONFIDENCE_CONFIG[result.confidenceLevel].text}`}>
              {result.confidenceLevel} Confidence
            </span>
          </div>

          {/* Summary Banner */}
          <div className={`rounded-2xl border-2 ${cfg.borderColor} ${cfg.bgColor} p-6`}>
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${cfg.badgeBg} flex-shrink-0`}>
                <cfg.icon className={`w-7 h-7 ${cfg.textColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className={`text-2xl font-extrabold tracking-wide ${cfg.textColor}`}>{cfg.label}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${RISK_CONFIG[result.riskLevel].bg} ${RISK_CONFIG[result.riskLevel].text}`}>
                    {result.riskLevel} Risk
                  </span>
                </div>
                <p className={`text-sm font-medium ${cfg.textColor} mb-2`}>{cfg.shortExplanation}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{result.mainExplanation}</p>
              </div>
            </div>

            <div className="mt-5 flex gap-2 flex-wrap">
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:border-gray-300 rounded-lg text-sm text-gray-600 hover:text-gray-800 transition-colors min-h-[40px]"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" /> : <LinkIcon className="w-4 h-4 flex-shrink-0" />}
                {copied ? 'Link copied!' : 'Copy result link'}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: 'Passport Validity Check', url: window.location.href });
                  } else {
                    handleCopyLink();
                  }
                }}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:border-gray-300 rounded-lg text-sm text-gray-600 hover:text-gray-800 transition-colors min-h-[40px]"
              >
                <Share2 className="w-4 h-4 flex-shrink-0" />
                Share check
              </button>
            </div>
          </div>

          {/* Detail Cards */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Trip Summary */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-600" />
                Trip Summary
              </h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between gap-2">
                  <dt className="text-gray-500 flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> Passport</dt>
                  <dd className="text-gray-900 font-medium text-right">{getCountryName(result.tripSummary.passportSlug)}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-gray-500 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Destination</dt>
                  <dd className="text-gray-900 font-medium text-right">{getCountryName(result.tripSummary.destinationSlug)}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-gray-500 flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5" /> Passport expiry</dt>
                  <dd className="text-gray-900 font-medium text-right">{formatDateDisplay(result.tripSummary.passportExpiry)}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-gray-500 flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5" /> Arrival date</dt>
                  <dd className="text-gray-900 font-medium text-right">{formatDateDisplay(result.tripSummary.arrivalDate)}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-gray-500 flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5" /> Departure</dt>
                  <dd className="text-gray-900 font-medium text-right">
                    {result.tripSummary.isOneWay ? 'One-way / unknown' : (result.tripSummary.departureDate ? formatDateDisplay(result.tripSummary.departureDate) : 'Not specified')}
                  </dd>
                </div>
                <div className="flex justify-between gap-2 pt-1 border-t border-gray-100">
                  <dt className="text-gray-500">Rule basis</dt>
                  <dd className="text-gray-700 text-right text-xs">{result.tripSummary.ruleBasis}</dd>
                </div>
              </dl>
            </div>

            {/* Destination Rule */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-teal-600" />
                Destination Rule
              </h3>
              {result.rule ? (
                <div className="space-y-2 text-sm">
                  <p className="font-medium text-gray-900">{result.rule.ruleLabel}</p>
                  <p className="text-gray-600 leading-relaxed">{result.rule.ruleSummary}</p>
                  {result.rule.blankPagesRequired && (
                    <p className="text-gray-500 text-xs">Blank pages required: <span className="font-medium text-gray-700">{result.rule.blankPagesRequired}</span></p>
                  )}
                  {result.requiredExpiryDate && (
                    <p className="text-gray-500 text-xs">
                      Minimum expiry needed:{' '}
                      <span className="font-semibold text-gray-700">
                        {result.requiredExpiryDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    </p>
                  )}
                  {result.rule.notes && (
                    <p className="text-amber-700 text-xs bg-amber-50 rounded px-2 py-1.5">{result.rule.notes}</p>
                  )}
                  {result.rule.source && (
                    <p className="text-gray-400 text-xs">Source: {result.rule.source}</p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No specific rule available for this destination in our current dataset. Verify with official sources.</p>
              )}
            </div>

            {/* Your Passport Timing */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-600" />
                Your Passport Timing
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Days valid from arrival</span>
                  <span className={`font-semibold ${result.daysUntilExpiry < 90 ? 'text-red-600' : result.daysUntilExpiry < 180 ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {result.daysUntilExpiry} days
                  </span>
                </div>
                {result.daysAfterDeparture !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Days valid after departure</span>
                    <span className={`font-semibold ${result.daysAfterDeparture < 90 ? 'text-red-600' : result.daysAfterDeparture < 180 ? 'text-amber-600' : 'text-emerald-600'}`}>
                      {result.daysAfterDeparture} days
                    </span>
                  </div>
                )}
                {result.requiredExpiryDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Minimum expiry needed</span>
                    <span className="font-medium text-gray-900">
                      {result.requiredExpiryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-500">Your expiry date</span>
                  <span className="font-medium text-gray-900">
                    {result.actualExpiryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Gauge className="w-4 h-4 text-teal-600" />
                Risk Assessment
              </h3>
              <div className="space-y-3">
                {result.reasons.map((reason, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <AlertCircle className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{reason}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Actions */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              Recommended Actions
            </h3>
            <ul className="space-y-2">
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
              Border officers and airlines make final boarding and entry decisions. This tool provides a best-effort assessment based on known destination rules. Always verify current requirements with official government sources, the destination embassy or consulate, or your airline before travel.
              {result.rule?.source && <> Source used: <span className="text-gray-700">{result.rule.source}</span>.</>}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
