'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import {
  CircleCheck as CheckCircle2,
  TriangleAlert as AlertTriangle,
  Circle as XCircle,
  CircleHelp as HelpCircle,
  ChevronDown,
  ChevronUp,
  Loader as Loader2,
  Plane,
  Shield,
  Clock,
  Ticket,
  ClipboardList,
  RotateCcw,
  User,
  MapPin,
  CalendarDays,
  BadgeCheck,
  Gauge,
  Link as LinkIcon,
  Share2,
  Check,
} from 'lucide-react';
import { COUNTRIES } from '@/lib/countries';
import type {
  BoardingCheckInput,
  BoardingAssessment,
  CheckStatus,
  ConfidenceLevel,
} from '@/lib/boarding-check/types';
import { runBoardingCheck } from '@/lib/boarding-check/engine';
import { serializeBoardingParams, parseBoardingParams } from '@/lib/boarding-check/url-params';

const TRANSIT_COUNTRIES = [
  { slug: 'united-states', name: 'United States (USA)' },
  { slug: 'united-kingdom', name: 'United Kingdom (UK)' },
  { slug: 'france', name: 'France (CDG/ORY)' },
  { slug: 'germany', name: 'Germany (FRA/MUC)' },
  { slug: 'netherlands', name: 'Netherlands (AMS)' },
  { slug: 'singapore', name: 'Singapore (SIN)' },
  { slug: 'united-arab-emirates', name: 'UAE / Dubai (DXB)' },
  { slug: 'canada', name: 'Canada (YYZ/YVR)' },
  { slug: 'japan', name: 'Japan (NRT/HND)' },
  { slug: 'south-korea', name: 'South Korea (ICN)' },
  { slug: 'turkey', name: 'Turkey (IST)' },
  { slug: 'qatar', name: 'Qatar (DOH)' },
  { slug: 'china', name: 'China (PEK/PVG)' },
  { slug: 'thailand', name: 'Thailand (BKK)' },
  { slug: 'malaysia', name: 'Malaysia (KUL)' },
  { slug: 'australia', name: 'Australia (SYD/MEL)' },
];

const LOADING_STEPS = [
  'Checking destination visa rules\u2026',
  'Checking passport validity\u2026',
  'Checking transit requirements\u2026',
  'Checking onward ticket rules\u2026',
];

type StatusConfig = {
  icon: React.ComponentType<{ className?: string }>;
  bgColor: string;
  borderColor: string;
  textColor: string;
  badgeBg: string;
  badgeText: string;
  label: string;
};

const STATUS_CONFIG: Record<CheckStatus, StatusConfig> = {
  pass: {
    icon: CheckCircle2,
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-700',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-800',
    label: 'Pass',
  },
  caution: {
    icon: AlertTriangle,
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-700',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-800',
    label: 'Caution',
  },
  fail: {
    icon: XCircle,
    bgColor: 'bg-red-50',
    borderColor: 'border-red-300',
    textColor: 'text-red-700',
    badgeBg: 'bg-red-100',
    badgeText: 'text-red-800',
    label: 'Issue',
  },
  unknown: {
    icon: HelpCircle,
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    textColor: 'text-gray-500',
    badgeBg: 'bg-gray-100',
    badgeText: 'text-gray-600',
    label: 'Unverified',
  },
};

const BOARDING_STATUS_CONFIG = {
  'Likely OK': {
    outerBg: 'bg-emerald-600',
    text: 'text-white',
    icon: CheckCircle2,
    factorDot: 'bg-emerald-300',
  },
  'Caution': {
    outerBg: 'bg-amber-500',
    text: 'text-white',
    icon: AlertTriangle,
    factorDot: 'bg-amber-200',
  },
  'Likely Issue': {
    outerBg: 'bg-red-600',
    text: 'text-white',
    icon: XCircle,
    factorDot: 'bg-red-300',
  },
};

const CONFIDENCE_CONFIG: Record<ConfidenceLevel, { label: string; color: string; bg: string }> = {
  High: { label: 'High', color: 'text-emerald-700', bg: 'bg-emerald-100' },
  Medium: { label: 'Medium', color: 'text-amber-700', bg: 'bg-amber-100' },
  Limited: { label: 'Limited', color: 'text-gray-600', bg: 'bg-gray-100' },
};

function formatDate(iso: string): string {
  if (!iso) return '\u2014';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function SearchSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { slug: string; name: string }[];
  placeholder: string;
  required?: boolean;
}) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const filtered =
    query.length > 0
      ? options.filter(o => o.name.toLowerCase().includes(query.toLowerCase()))
      : options;

  const selected = options.find(o => o.slug === value);

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div
        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 bg-white cursor-pointer flex items-center justify-between text-sm hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-200"
        onClick={() => setOpen(o => !o)}
      >
        <span className={selected ? 'text-gray-900' : 'text-gray-400'}>
          {selected?.name ?? placeholder}
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
        )}
      </div>
      {open && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-hidden">
          <div className="p-2 border-b border-gray-100">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Type to search..."
              className="w-full text-sm px-2 py-1.5 border border-gray-200 rounded-md outline-none focus:border-blue-400"
              onClick={e => e.stopPropagation()}
              autoFocus
            />
          </div>
          <div className="overflow-y-auto max-h-48">
            {value && (
              <button
                type="button"
                className="w-full text-left px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 border-b border-gray-100"
                onClick={() => {
                  onChange('');
                  setOpen(false);
                  setQuery('');
                }}
              >
                \u2014 Clear selection
              </button>
            )}
            {filtered.length === 0 ? (
              <div className="px-3 py-4 text-sm text-gray-400 text-center">No results found</div>
            ) : (
              filtered.map(o => (
                <button
                  key={o.slug}
                  type="button"
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-blue-50 transition-colors ${
                    o.slug === value ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-800'
                  }`}
                  onClick={() => {
                    onChange(o.slug);
                    setOpen(false);
                    setQuery('');
                  }}
                >
                  {o.name}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function CheckCard({
  icon: Icon,
  title,
  result,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  result: { status: CheckStatus; label: string; detail: string };
}) {
  const cfg = STATUS_CONFIG[result.status];
  const StatusIcon = cfg.icon;

  return (
    <div className={`rounded-xl border p-4 ${cfg.bgColor} ${cfg.borderColor}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <Icon className={`w-5 h-5 ${cfg.textColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <span className="text-sm font-semibold text-gray-800">{title}</span>
            <span
              className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.badgeBg} ${cfg.badgeText}`}
            >
              <StatusIcon className="w-3 h-3" />
              {result.label}
            </span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{result.detail}</p>
        </div>
      </div>
    </div>
  );
}

function BoardingRiskSummary({ result }: { result: BoardingAssessment }) {
  const cfg = BOARDING_STATUS_CONFIG[result.boarding_status];
  const StatusIcon = cfg.icon;
  const confidenceCfg = CONFIDENCE_CONFIG[result.confidence_level];

  return (
    <div className="rounded-2xl overflow-hidden shadow-sm ring-1 ring-black/5">
      <div className={`${cfg.outerBg} px-5 py-5 sm:px-6`}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <StatusIcon className={`w-8 h-8 sm:w-9 sm:h-9 ${cfg.text} flex-shrink-0`} />
            <div>
              <div className={`text-xl sm:text-2xl font-bold ${cfg.text} leading-tight`}>
                {result.boarding_status}
              </div>
              <div className={`text-sm font-medium opacity-85 ${cfg.text} mt-0.5`}>
                Risk Level: {result.overall_risk}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Gauge className={`w-4 h-4 opacity-75 ${cfg.text}`} />
            <span className={`text-sm opacity-80 ${cfg.text}`}>Confidence:</span>
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full ${confidenceCfg.bg} ${confidenceCfg.color}`}
            >
              {result.confidence_level}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white border-x border-b border-gray-200 rounded-b-2xl px-5 py-5 sm:px-6 space-y-4">
        <div>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2.5">
            Primary Factors
          </div>
          <ul className="space-y-1.5">
            {result.primary_factors.map((factor, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${
                  factor.includes('required') || factor.includes('blocker') || factor.includes('does not meet')
                    ? 'bg-red-400'
                    : factor.includes('close') || factor.includes('may be') || factor.includes('may be requested') || factor.includes('unconfirmed') || factor.includes('could not')
                    ? 'bg-amber-400'
                    : 'bg-emerald-400'
                }`} />
                {factor}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
            Recommended Next Action
          </div>
          <p className="text-sm text-gray-800 font-medium leading-relaxed">
            {result.recommended_next_action}
          </p>
        </div>

        {result.confidence_level === 'Limited' && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-xs text-gray-600 leading-relaxed">
            <strong className="text-gray-700">Limited confidence:</strong> One or more key checks could not be verified from our dataset. This result requires independent verification before travel.
          </div>
        )}
      </div>
    </div>
  );
}

function TripSummaryCard({
  input,
  passportName,
  destinationName,
  transit1Name,
  transit2Name,
}: {
  input: BoardingCheckInput;
  passportName: string;
  destinationName: string;
  transit1Name: string;
  transit2Name: string;
}) {
  const rows: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }[] = [
    { icon: User, label: 'Passport', value: passportName || input.passportSlug },
    { icon: MapPin, label: 'Destination', value: destinationName || input.destinationSlug },
    ...(transit1Name ? [{ icon: Plane, label: 'Transit Stop 1', value: transit1Name }] : []),
    ...(transit2Name ? [{ icon: Plane, label: 'Transit Stop 2', value: transit2Name }] : []),
    { icon: CalendarDays, label: 'Departure', value: formatDate(input.departureDate) },
    {
      icon: CalendarDays,
      label: 'Return / Onward',
      value: input.isOneWay ? 'One-way trip' : input.returnDate ? formatDate(input.returnDate) : 'Not entered',
    },
    { icon: Clock, label: 'Passport Expiry', value: formatDate(input.passportExpiry) },
    { icon: BadgeCheck, label: 'Destination visa held', value: input.holdsDestinationVisa ? 'Yes' : 'No' },
    { icon: BadgeCheck, label: 'Residence permit indicated', value: input.holdsResidencePermit ? 'Yes' : 'No' },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
        <MapPin className="w-4 h-4 text-gray-600" />
        <h3 className="font-semibold text-gray-800 text-sm">Trip Summary</h3>
        <span className="ml-auto text-xs text-gray-400">Confirm the details are correct</span>
      </div>
      <div className="divide-y divide-gray-50">
        {rows.map(({ icon: Icon, label, value }) => (
          <div key={label} className="px-5 py-2.5 flex items-center gap-3">
            <Icon className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="text-xs font-medium text-gray-500 w-36 sm:w-40 flex-shrink-0">{label}</span>
            <span className="text-sm text-gray-800 min-w-0 truncate">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResultShareBar({ form }: { form: BoardingCheckInput }) {
  const [copied, setCopied] = useState(false);

  function buildShareUrl() {
    if (typeof window === 'undefined') return '';
    const qs = serializeBoardingParams(form);
    return `${window.location.origin}${window.location.pathname}?${qs}`;
  }

  function handleCopyLink() {
    const url = buildShareUrl();
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleNativeShare() {
    const url = buildShareUrl();
    if (navigator.share) {
      navigator.share({
        title: 'Airline Boarding Check',
        text: 'Check boarding eligibility for this trip',
        url,
      });
    } else {
      handleCopyLink();
    }
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs font-medium text-gray-500">Share this check:</span>
      <button
        type="button"
        onClick={handleCopyLink}
        className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 text-gray-700 transition-colors"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            Copied
          </>
        ) : (
          <>
            <LinkIcon className="w-3.5 h-3.5" />
            Copy Link
          </>
        )}
      </button>
      <button
        type="button"
        onClick={handleNativeShare}
        className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 text-gray-700 transition-colors"
      >
        <Share2 className="w-3.5 h-3.5" />
        Share Trip Check
      </button>
    </div>
  );
}

function LoadingStepDisplay({ step }: { step: number }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Loader2 className="w-5 h-5 text-blue-600 animate-spin flex-shrink-0" />
        <span className="text-sm font-medium text-gray-700">Running boarding check\u2026</span>
      </div>
      <div className="space-y-2.5">
        {LOADING_STEPS.map((label, i) => (
          <div key={i} className="flex items-center gap-2.5">
            {i < step ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            ) : i === step ? (
              <Loader2 className="w-4 h-4 text-blue-500 animate-spin flex-shrink-0" />
            ) : (
              <span className="w-4 h-4 flex-shrink-0 rounded-full border border-gray-200 bg-gray-50 inline-block" />
            )}
            <span className={`text-sm ${i <= step ? 'text-gray-800' : 'text-gray-400'}`}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdvancedOptions({
  form,
  set,
}: {
  form: BoardingCheckInput;
  set: <K extends keyof BoardingCheckInput>(key: K, value: BoardingCheckInput[K]) => void;
}) {
  const [open, setOpen] = useState(false);
  const hasAny = form.holdsDestinationVisa || form.holdsResidencePermit;

  return (
    <div className="border-t border-gray-100 pt-5">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors group"
      >
        {open ? (
          <ChevronUp className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
        )}
        Advanced Options
        {hasAny && !open && (
          <span className="ml-1 text-xs font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full">
            {[form.holdsDestinationVisa, form.holdsResidencePermit].filter(Boolean).length} selected
          </span>
        )}
      </button>

      {open && (
        <div className="mt-3 space-y-3">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={form.holdsDestinationVisa}
              onChange={e => set('holdsDestinationVisa', e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                I already hold a valid visa for the destination
              </span>
              <p className="text-xs text-gray-500 mt-0.5">
                Check this if you hold a valid entry visa, resident permit, or pre-approved authorization
              </p>
            </div>
          </label>
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={form.holdsResidencePermit}
              onChange={e => set('holdsResidencePermit', e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                I hold a valid residence permit (may exempt transit visas)
              </span>
              <p className="text-xs text-gray-500 mt-0.5">
                e.g. US Green Card, EU residence permit, UK BRP \u2014 may waive transit visa requirements in some countries
              </p>
            </div>
          </label>
        </div>
      )}
    </div>
  );
}

const defaultForm: BoardingCheckInput = {
  passportSlug: '',
  destinationSlug: '',
  departureDate: '',
  returnDate: '',
  isOneWay: false,
  passportExpiry: '',
  transitStop1: '',
  transitStop2: '',
  holdsDestinationVisa: false,
  holdsResidencePermit: false,
};

export default function BoardingCheckClient() {
  const [form, setForm] = useState<BoardingCheckInput>(defaultForm);
  const [result, setResult] = useState<BoardingAssessment | null>(null);
  const [submittedForm, setSubmittedForm] = useState<BoardingCheckInput | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [errors, setErrors] = useState<Partial<Record<keyof BoardingCheckInput, string>>>({});
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const parsed = parseBoardingParams(window.location.search);
    if (Object.keys(parsed).length > 0) {
      setForm(f => ({ ...f, ...parsed }));
    }
  }, []);

  const set = useCallback(
    <K extends keyof BoardingCheckInput>(key: K, value: BoardingCheckInput[K]) => {
      setForm(f => ({ ...f, [key]: value }));
      setErrors(e => ({ ...e, [key]: undefined }));
    },
    []
  );

  function validate(): boolean {
    const e: Partial<Record<keyof BoardingCheckInput, string>> = {};
    if (!form.passportSlug) e.passportSlug = 'Select your passport country';
    if (!form.destinationSlug) e.destinationSlug = 'Select a destination';
    if (!form.departureDate) e.departureDate = 'Enter departure date';
    if (!form.passportExpiry) e.passportExpiry = 'Enter passport expiry date';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setLoadingStep(0);
    setResult(null);

    const snapshot = { ...form };

    const stepInterval = setInterval(() => {
      setLoadingStep(s => {
        if (s >= LOADING_STEPS.length - 1) {
          clearInterval(stepInterval);
          return s;
        }
        return s + 1;
      });
    }, 160);

    setTimeout(() => {
      clearInterval(stepInterval);
      const assessment = runBoardingCheck(snapshot);
      setResult(assessment);
      setSubmittedForm(snapshot);
      setLoading(false);

      const qs = serializeBoardingParams(snapshot);
      const newUrl = `${window.location.pathname}?${qs}`;
      window.history.replaceState(null, '', newUrl);

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
    }, 720);
  }

  function handleReset() {
    setForm(defaultForm);
    setResult(null);
    setSubmittedForm(null);
    setErrors({});
    window.history.replaceState(null, '', window.location.pathname);
  }

  const passportOptions = COUNTRIES.map(c => ({ slug: c.slug, name: c.name }));
  const destinationOptions = COUNTRIES.map(c => ({ slug: c.slug, name: c.name }));

  const passportName = COUNTRIES.find(c => c.slug === (submittedForm?.passportSlug ?? ''))?.name ?? '';
  const destinationName = COUNTRIES.find(c => c.slug === (submittedForm?.destinationSlug ?? ''))?.name ?? '';
  const transit1Name = TRANSIT_COUNTRIES.find(c => c.slug === (submittedForm?.transitStop1 ?? ''))?.name ?? '';
  const transit2Name = TRANSIT_COUNTRIES.find(c => c.slug === (submittedForm?.transitStop2 ?? ''))?.name ?? '';

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} noValidate>
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-gray-800 px-5 py-4 sm:px-6">
            <h2 className="text-white font-semibold text-lg">Your Trip Details</h2>
            <p className="text-gray-300 text-sm mt-0.5">
              Fill in your travel information to run the boarding check
            </p>
          </div>

          <div className="p-5 sm:p-6 space-y-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <SearchSelect
                  label="Passport Country"
                  value={form.passportSlug}
                  onChange={v => set('passportSlug', v)}
                  options={passportOptions}
                  placeholder="Select your passport..."
                  required
                />
                {errors.passportSlug && (
                  <p className="mt-1 text-xs text-red-600">{errors.passportSlug}</p>
                )}
              </div>
              <div>
                <SearchSelect
                  label="Destination Country"
                  value={form.destinationSlug}
                  onChange={v => set('destinationSlug', v)}
                  options={destinationOptions}
                  placeholder="Where are you flying to?"
                  required
                />
                {errors.destinationSlug && (
                  <p className="mt-1 text-xs text-red-600">{errors.destinationSlug}</p>
                )}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Departure Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={form.departureDate}
                  onChange={e => set('departureDate', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none"
                />
                {errors.departureDate && (
                  <p className="mt-1 text-xs text-red-600">{errors.departureDate}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Return / Onward Date
                  <span className="ml-1.5 text-xs font-normal text-gray-400">(optional)</span>
                </label>
                <input
                  type="date"
                  value={form.returnDate ?? ''}
                  onChange={e => set('returnDate', e.target.value)}
                  disabled={form.isOneWay}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none disabled:bg-gray-50 disabled:text-gray-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => set('isOneWay', !form.isOneWay)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                  form.isOneWay ? 'bg-blue-600' : 'bg-gray-200'
                }`}
                role="switch"
                aria-checked={form.isOneWay}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ${
                    form.isOneWay ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className="text-sm text-gray-700">One-way trip (no return flight booked)</span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Passport Expiry Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={form.passportExpiry}
                onChange={e => set('passportExpiry', e.target.value)}
                className="w-full sm:w-1/2 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none"
              />
              {errors.passportExpiry && (
                <p className="mt-1 text-xs text-red-600">{errors.passportExpiry}</p>
              )}
            </div>

            <div className="border-t border-gray-100 pt-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Transit Stops (optional)</h3>
              <div className="grid gap-5 sm:grid-cols-2">
                <SearchSelect
                  label="Transit Stop 1"
                  value={form.transitStop1 ?? ''}
                  onChange={v => set('transitStop1', v || undefined)}
                  options={TRANSIT_COUNTRIES}
                  placeholder="e.g. Dubai, Heathrow..."
                />
                <SearchSelect
                  label="Transit Stop 2"
                  value={form.transitStop2 ?? ''}
                  onChange={v => set('transitStop2', v || undefined)}
                  options={TRANSIT_COUNTRIES}
                  placeholder="Second connection (if any)"
                />
              </div>
            </div>

            <AdvancedOptions form={form} set={set} />
          </div>

          <div className="px-5 py-4 sm:px-6 bg-gray-50 border-t border-gray-100 flex items-center gap-3 flex-wrap">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Checking\u2026
                </>
              ) : (
                <>
                  <Plane className="w-4 h-4" />
                  Check Boarding Status
                </>
              )}
            </button>
            {result && (
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 text-sm font-medium px-4 py-2.5 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors bg-white"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            )}
          </div>
        </div>
      </form>

      {loading && (
        <div ref={resultRef}>
          <LoadingStepDisplay step={loadingStep} />
        </div>
      )}

      {result && submittedForm && !loading && (
        <div ref={resultRef} id="boarding-result" className="space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <span className="text-xs text-gray-500">Results based on submitted trip details</span>
            <ResultShareBar form={submittedForm} />
          </div>

          <BoardingRiskSummary result={result} />

          <TripSummaryCard
            input={submittedForm}
            passportName={passportName}
            destinationName={destinationName}
            transit1Name={transit1Name}
            transit2Name={transit2Name}
          />

          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-1">
              Detailed Check Results
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <CheckCard icon={Plane} title="Destination Visa" result={result.destination_visa_result} />
              <CheckCard icon={Clock} title="Passport Validity" result={result.passport_validity_result} />
              <CheckCard icon={Shield} title="Transit Check" result={result.transit_result} />
              {submittedForm.transitStop2 && (
                <CheckCard icon={Shield} title="Transit Check (Stop 2)" result={result.transit2_result} />
              )}
              <CheckCard icon={Ticket} title="Onward / Return Ticket" result={result.onward_ticket_result} />
            </div>
          </div>

          {result.action_checklist.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-gray-700" />
                <h3 className="font-semibold text-gray-800">Recommended Actions</h3>
              </div>
              <ul className="divide-y divide-gray-50">
                {result.action_checklist.map((item, i) => (
                  <li
                    key={i}
                    className="px-5 py-3 flex items-start gap-3 text-sm text-gray-700 leading-relaxed"
                  >
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 text-gray-600 text-xs font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50 flex items-start gap-3">
            <HelpCircle className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-600 leading-relaxed">
              This is a structured travel-rule assessment, not a boarding guarantee. Airlines make final decisions using live systems like IATA Timatic. Verify requirements with the airline, destination embassy, or an official government immigration portal before you travel.
            </p>
          </div>

          <details className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <summary className="px-4 py-3 text-sm font-medium text-gray-600 cursor-pointer hover:text-gray-800 list-none flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              Data sources referenced for this check
            </summary>
            <ul className="px-4 pb-4 pt-1 space-y-1.5">
              {result.sources_used.map((s, i) => (
                <li key={i} className="text-xs text-gray-500 flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </details>
        </div>
      )}
    </div>
  );
}
