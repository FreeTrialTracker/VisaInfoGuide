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
  Route,
  Building2,
  ArrowRightLeft,
  BadgeCheck,
  Gauge,
  ClipboardList,
  RotateCcw,
  User,
  MapPin,
  Link as LinkIcon,
  Share2,
  Check,
} from 'lucide-react';
import { COUNTRIES } from '@/lib/countries';
import type {
  TransitCheckerInput,
  TransitAssessment,
  CheckStatus,
  ConfidenceLevel,
  TransitStatus,
  RiskLevel,
} from '@/lib/transit-checker/types';
import { runTransitCheck } from '@/lib/transit-checker/engine';
import { serializeTransitParams, parseTransitParams } from '@/lib/transit-checker/url-params';
import { TRANSIT_AIRPORTS, getAirportsForCountry } from '@/lib/transit-checker/rules';

const TRANSIT_COUNTRIES = [
  { slug: 'united-kingdom', name: 'United Kingdom' },
  { slug: 'germany', name: 'Germany' },
  { slug: 'france', name: 'France' },
  { slug: 'netherlands', name: 'Netherlands' },
  { slug: 'united-arab-emirates', name: 'United Arab Emirates' },
  { slug: 'singapore', name: 'Singapore' },
  { slug: 'japan', name: 'Japan' },
  { slug: 'south-korea', name: 'South Korea' },
  { slug: 'qatar', name: 'Qatar' },
  { slug: 'turkey', name: 'Turkey' },
  { slug: 'saudi-arabia', name: 'Saudi Arabia' },
  { slug: 'china', name: 'China' },
  { slug: 'canada', name: 'Canada' },
];

const LOADING_STEPS = [
  'Checking airside transit rules\u2026',
  'Checking terminal transfer requirements\u2026',
  'Checking visa exemptions\u2026',
  'Evaluating transit risk\u2026',
];

const LAYOVER_PRESETS = [
  { label: 'Under 3 hours', value: 2 },
  { label: '3\u20136 hours', value: 4 },
  { label: '6\u201312 hours', value: 9 },
  { label: '12\u201324 hours', value: 18 },
  { label: 'Overnight', value: 14 },
  { label: '24+ hours', value: 25 },
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

const TRANSIT_STATUS_CONFIG: Record<
  TransitStatus,
  { outerBg: string; text: string; icon: React.ComponentType<{ className?: string }> }
> = {
  'No transit visa needed': {
    outerBg: 'bg-emerald-600',
    text: 'text-white',
    icon: CheckCircle2,
  },
  'Transit visa may be needed': {
    outerBg: 'bg-amber-500',
    text: 'text-white',
    icon: AlertTriangle,
  },
  'Transit visa likely required': {
    outerBg: 'bg-red-600',
    text: 'text-white',
    icon: XCircle,
  },
};

const CONFIDENCE_CONFIG: Record<ConfidenceLevel, { label: string; color: string; bg: string }> = {
  High: { label: 'High', color: 'text-emerald-700', bg: 'bg-emerald-100' },
  Medium: { label: 'Medium', color: 'text-amber-700', bg: 'bg-amber-100' },
  Limited: { label: 'Limited', color: 'text-gray-600', bg: 'bg-gray-100' },
};

const RISK_CONFIG: Record<RiskLevel, { label: string; color: string }> = {
  Low: { label: 'Low Risk', color: 'text-emerald-200' },
  Medium: { label: 'Medium Risk', color: 'text-amber-200' },
  High: { label: 'High Risk', color: 'text-red-200' },
};

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
    function handle(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    }
    if (open) document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
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
                onClick={() => { onChange(''); setOpen(false); setQuery(''); }}
              >
                — Clear selection
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
                  onClick={() => { onChange(o.slug); setOpen(false); setQuery(''); }}
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

function AirportSelect({
  label,
  value,
  onChange,
  countrySlug,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  countrySlug: string;
  required?: boolean;
}) {
  const airports = countrySlug
    ? getAirportsForCountry(countrySlug)
    : TRANSIT_AIRPORTS;

  const options = airports.map(a => ({
    slug: a.code,
    name: `${a.code} \u2013 ${a.name}`,
  }));

  return (
    <SearchSelect
      label={label}
      value={value}
      onChange={onChange}
      options={options}
      placeholder={countrySlug ? 'Search by name or code (e.g. LHR)...' : 'Select transit country first...'}
      required={required}
    />
  );
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start gap-3">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative mt-0.5 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
          checked ? 'bg-blue-600' : 'bg-gray-200'
        }`}
        role="switch"
        aria-checked={checked}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
      <div>
        <span className="text-sm font-medium text-gray-700">{label}</span>
        {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
      </div>
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
            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.badgeBg} ${cfg.badgeText}`}>
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

function TransitRiskSummary({ result }: { result: TransitAssessment }) {
  const cfg = TRANSIT_STATUS_CONFIG[result.transit_status];
  const StatusIcon = cfg.icon;
  const confidenceCfg = CONFIDENCE_CONFIG[result.confidence_level];
  const riskCfg = RISK_CONFIG[result.risk_level];

  const statusUpperMap: Record<TransitStatus, string> = {
    'No transit visa needed': 'NO TRANSIT VISA NEEDED',
    'Transit visa may be needed': 'TRANSIT VISA MAY BE REQUIRED',
    'Transit visa likely required': 'TRANSIT VISA LIKELY REQUIRED',
  };

  return (
    <div className="rounded-2xl overflow-hidden shadow-sm ring-1 ring-black/5">
      <div className={`${cfg.outerBg} px-5 py-5 sm:px-6`}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <StatusIcon className={`w-8 h-8 sm:w-9 sm:h-9 ${cfg.text} flex-shrink-0`} />
            <div>
              <div className={`text-lg sm:text-xl font-bold tracking-wide ${cfg.text} leading-tight`}>
                {statusUpperMap[result.transit_status]}
              </div>
              <div className={`text-sm font-medium mt-0.5 ${riskCfg.color}`}>
                {riskCfg.label}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Gauge className={`w-4 h-4 opacity-75 ${cfg.text}`} />
            <span className={`text-sm opacity-80 ${cfg.text}`}>Confidence:</span>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${confidenceCfg.bg} ${confidenceCfg.color}`}>
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
            {result.primary_reasons.map((reason, i) => {
              const isIssue = reason.toLowerCase().includes('required') || reason.toLowerCase().includes('needed');
              const isCaution = reason.toLowerCase().includes('verify') || reason.toLowerCase().includes('confirm') || reason.toLowerCase().includes('may');
              return (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${
                    isIssue ? 'bg-red-400' : isCaution ? 'bg-amber-400' : 'bg-emerald-400'
                  }`} />
                  {reason}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
            Recommended Action
          </div>
          <p className="text-sm text-gray-800 font-medium leading-relaxed">
            {result.recommended_next_action}
          </p>
        </div>

        {result.confidence_level === 'Limited' && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-xs text-gray-600 leading-relaxed">
            <strong className="text-gray-700">Limited confidence:</strong> Our dataset does not fully cover this transit combination. This result requires independent verification before you book or travel.
          </div>
        )}
      </div>
    </div>
  );
}

function TripSummaryCard({
  input,
  passportName,
  transitCountryName,
  airportName,
  destName,
}: {
  input: TransitCheckerInput;
  passportName: string;
  transitCountryName: string;
  airportName: string;
  destName: string;
}) {
  const rows: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }[] = [
    { icon: User, label: 'Passport', value: passportName || input.passportSlug },
    { icon: Route, label: 'Transit Country', value: transitCountryName || input.transitCountrySlug },
    { icon: Building2, label: 'Transit Airport', value: airportName || input.transitAirportCode },
    { icon: MapPin, label: 'Final Destination', value: destName || input.finalDestinationSlug },
    { icon: Plane, label: 'Layover Duration', value: input.layoverHours ? (LAYOVER_PRESETS.find(p => p.value === input.layoverHours)?.label ?? `${input.layoverHours}h`) : 'Not specified' },
    { icon: BadgeCheck, label: 'Same ticket / Protected', value: input.samTicket ? 'Yes' : 'No' },
    { icon: ArrowRightLeft, label: 'Self-transfer', value: input.selfTransfer ? 'Yes' : 'No' },
    { icon: Building2, label: 'Changing terminals', value: input.changingTerminals ? 'Yes' : 'No' },
    { icon: MapPin, label: 'Leaving airport', value: input.leavingAirport ? 'Yes' : 'No' },
    { icon: BadgeCheck, label: 'Qualifying visa held', value: input.holdsQualifyingVisa ? 'Yes' : 'No' },
    { icon: BadgeCheck, label: 'Residence permit held', value: input.holdsResidencePermit ? 'Yes' : 'No' },
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
            <span className="text-xs font-medium text-gray-500 w-40 flex-shrink-0">{label}</span>
            <span className="text-sm text-gray-800 min-w-0 truncate">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResultShareBar({ form }: { form: TransitCheckerInput }) {
  const [copied, setCopied] = useState(false);

  function buildUrl() {
    if (typeof window === 'undefined') return '';
    return `${window.location.origin}${window.location.pathname}?${serializeTransitParams(form)}`;
  }

  function handleCopy() {
    navigator.clipboard.writeText(buildUrl()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleShare() {
    const url = buildUrl();
    if (navigator.share) {
      navigator.share({ title: 'Transit Visa Check', text: 'Check transit visa requirements for this trip', url });
    } else {
      handleCopy();
    }
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 text-gray-700 transition-colors min-h-[36px]"
      >
        {copied ? (
          <><Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />Copied</>
        ) : (
          <><LinkIcon className="w-3.5 h-3.5 flex-shrink-0" />Copy Result Link</>
        )}
      </button>
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 text-gray-700 transition-colors min-h-[36px]"
      >
        <Share2 className="w-3.5 h-3.5 flex-shrink-0" />
        Share Check
      </button>
    </div>
  );
}

function LoadingStepDisplay({ step }: { step: number }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Loader2 className="w-5 h-5 text-blue-600 animate-spin flex-shrink-0" />
        <span className="text-sm font-medium text-gray-700">Running transit check…</span>
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
            <span className={`text-sm ${i <= step ? 'text-gray-800' : 'text-gray-400'}`}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdvancedTransitOptions({
  form,
  set,
}: {
  form: TransitCheckerInput;
  set: <K extends keyof TransitCheckerInput>(key: K, value: TransitCheckerInput[K]) => void;
}) {
  const [open, setOpen] = useState(false);
  const hasAny = form.holdsQualifyingVisa || form.holdsResidencePermit;

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
            {[form.holdsQualifyingVisa, form.holdsResidencePermit].filter(Boolean).length} selected
          </span>
        )}
      </button>

      {open && (
        <div className="mt-3 space-y-3">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={form.holdsQualifyingVisa}
              onChange={e => set('holdsQualifyingVisa', e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                I hold a valid visa for a qualifying country
              </span>
              <p className="text-xs text-gray-500 mt-0.5">
                e.g. valid US B-1/B-2 visa, valid UK visa, valid Schengen visa, valid Japanese visa — these may exempt you from transit visa requirements at some airports
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
                I hold a valid residence permit for a qualifying country
              </span>
              <p className="text-xs text-gray-500 mt-0.5">
                e.g. US Green Card, UK BRP, EU/EEA residence permit — may waive transit visa requirements in some countries
              </p>
            </div>
          </label>
        </div>
      )}
    </div>
  );
}

const defaultForm: TransitCheckerInput = {
  passportSlug: '',
  transitCountrySlug: '',
  transitAirportCode: '',
  finalDestinationSlug: '',
  layoverHours: undefined,
  samTicket: true,
  selfTransfer: false,
  changingTerminals: false,
  leavingAirport: false,
  holdsQualifyingVisa: false,
  holdsResidencePermit: false,
};

export default function TransitCheckerClient() {
  const [form, setForm] = useState<TransitCheckerInput>(defaultForm);
  const [result, setResult] = useState<TransitAssessment | null>(null);
  const [submittedForm, setSubmittedForm] = useState<TransitCheckerInput | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [errors, setErrors] = useState<Partial<Record<keyof TransitCheckerInput, string>>>({});
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const parsed = parseTransitParams(window.location.search);
    if (Object.keys(parsed).length > 0) {
      setForm(f => ({ ...f, ...parsed }));
    }
  }, []);

  const set = useCallback(
    <K extends keyof TransitCheckerInput>(key: K, value: TransitCheckerInput[K]) => {
      setForm(f => {
        const next = { ...f, [key]: value };
        if (key === 'transitCountrySlug') {
          next.transitAirportCode = '';
        }
        return next;
      });
      setErrors(e => ({ ...e, [key]: undefined }));
    },
    []
  );

  function validate(): boolean {
    const e: Partial<Record<keyof TransitCheckerInput, string>> = {};
    if (!form.passportSlug) e.passportSlug = 'Select your passport country';
    if (!form.transitCountrySlug) e.transitCountrySlug = 'Select a transit country';
    if (!form.transitAirportCode) e.transitAirportCode = 'Select a transit airport';
    if (!form.finalDestinationSlug) e.finalDestinationSlug = 'Select your final destination';
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
        if (s >= LOADING_STEPS.length - 1) { clearInterval(stepInterval); return s; }
        return s + 1;
      });
    }, 160);

    setTimeout(() => {
      clearInterval(stepInterval);
      const assessment = runTransitCheck(snapshot);
      setResult(assessment);
      setSubmittedForm(snapshot);
      setLoading(false);

      const qs = serializeTransitParams(snapshot);
      window.history.replaceState(null, '', `${window.location.pathname}?${qs}`);

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
  const destOptions = COUNTRIES.map(c => ({ slug: c.slug, name: c.name }));

  const passportName = COUNTRIES.find(c => c.slug === (submittedForm?.passportSlug ?? ''))?.name ?? '';
  const destName = COUNTRIES.find(c => c.slug === (submittedForm?.finalDestinationSlug ?? ''))?.name ?? '';
  const transitCountryName = TRANSIT_COUNTRIES.find(c => c.slug === (submittedForm?.transitCountrySlug ?? ''))?.name ?? '';
  const airportName = TRANSIT_AIRPORTS.find(a => a.code === (submittedForm?.transitAirportCode ?? ''))?.name ?? '';

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} noValidate>
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-gray-800 px-5 py-4 sm:px-6">
            <h2 className="text-white font-semibold text-lg">Your Transit Details</h2>
            <p className="text-gray-300 text-sm mt-0.5">
              Enter your passport, transit stop, and trip details to check transit visa requirements
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
                  label="Transit Country"
                  value={form.transitCountrySlug}
                  onChange={v => set('transitCountrySlug', v)}
                  options={TRANSIT_COUNTRIES}
                  placeholder="Country you are connecting through..."
                  required
                />
                {errors.transitCountrySlug && (
                  <p className="mt-1 text-xs text-red-600">{errors.transitCountrySlug}</p>
                )}
              </div>
              <div>
                <AirportSelect
                  label="Transit Airport"
                  value={form.transitAirportCode}
                  onChange={v => set('transitAirportCode', v)}
                  countrySlug={form.transitCountrySlug}
                  required
                />
                {errors.transitAirportCode && (
                  <p className="mt-1 text-xs text-red-600">{errors.transitAirportCode}</p>
                )}
              </div>
              <div>
                <SearchSelect
                  label="Final Destination"
                  value={form.finalDestinationSlug}
                  onChange={v => set('finalDestinationSlug', v)}
                  options={destOptions}
                  placeholder="Where are you ultimately flying to?"
                  required
                />
                {errors.finalDestinationSlug && (
                  <p className="mt-1 text-xs text-red-600">{errors.finalDestinationSlug}</p>
                )}
              </div>
            </div>

            <div className="border-t border-gray-100 pt-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">
                Trip Details
                <span className="ml-2 text-xs font-normal text-gray-400">(optional but improves accuracy)</span>
              </h3>
              <div className="space-y-5">
                <div className="w-full sm:w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Layover Duration
                  </label>
                  <select
                    value={form.layoverHours ?? ''}
                    onChange={e => set('layoverHours', e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none appearance-none cursor-pointer"
                  >
                    <option value="">Select duration...</option>
                    {LAYOVER_PRESETS.map(preset => (
                      <option key={preset.value} value={preset.value}>
                        {preset.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Toggle
                    label="Same ticket / Protected connection"
                    description="All flights on one booking — airline handles bag transfer"
                    checked={form.samTicket}
                    onChange={v => set('samTicket', v)}
                  />
                  <Toggle
                    label="Self-transfer (separate tickets)"
                    description="You re-check bags and re-enter security yourself"
                    checked={form.selfTransfer}
                    onChange={v => set('selfTransfer', v)}
                  />
                  <Toggle
                    label="Changing terminals"
                    description="Connection requires moving between separate terminal buildings"
                    checked={form.changingTerminals}
                    onChange={v => set('changingTerminals', v)}
                  />
                  <Toggle
                    label="Leaving the airport during layover"
                    description="Exiting the airport sterile zone (e.g. overnight hotel)"
                    checked={form.leavingAirport}
                    onChange={v => set('leavingAirport', v)}
                  />
                </div>
              </div>
            </div>

            <AdvancedTransitOptions form={form} set={set} />
          </div>

          <div className="px-5 py-4 sm:px-6 bg-gray-50 border-t border-gray-100 flex items-center gap-3 flex-wrap">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" />Checking…</>
              ) : (
                <><Route className="w-4 h-4" />Check Transit Requirements</>
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
        <div ref={resultRef} id="transit-result" className="space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="text-base font-bold text-gray-800">Transit Risk Summary</h2>
            <ResultShareBar form={submittedForm} />
          </div>

          <TransitRiskSummary result={result} />

          <TripSummaryCard
            input={submittedForm}
            passportName={passportName}
            transitCountryName={transitCountryName}
            airportName={airportName}
            destName={destName}
          />

          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-1">
              Detailed Check Results
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <CheckCard icon={Shield} title="Airside Transit" result={result.airside_result} />
              <CheckCard icon={Building2} title="Landside / Immigration" result={result.landside_result} />
              <CheckCard icon={Route} title="Transit Visa Requirement" result={result.transit_visa_result} />
              <CheckCard icon={BadgeCheck} title="Exemptions / Special Cases" result={result.exemption_result} />
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
                  <li key={i} className="px-5 py-3 flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
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
              This is a structured transit rule assessment, not a travel guarantee. Airlines use real-time systems like IATA Timatic to verify transit requirements at check-in. Rules can change. Verify with the operating airline, transit country embassy, or official airport transit information before travel.
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
