import type {
  PassportValidityInput,
  PassportValidityResult,
  ValidityStatus,
  RiskLevel,
  ConfidenceLevel,
} from './types';
import { findValidityRule, SCHENGEN_SLUGS } from './rules';

const CAUTION_BUFFER_DAYS = 30;

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

function daysBetween(a: Date, b: Date): number {
  return Math.floor((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function runValidityCheck(input: PassportValidityInput): PassportValidityResult {
  const arrival = new Date(input.arrivalDate);
  const expiry = new Date(input.passportExpiry);
  const departure = input.departureDate ? new Date(input.departureDate) : null;
  const referenceDate = departure ?? arrival;

  if (isNaN(arrival.getTime()) || isNaN(expiry.getTime())) {
    return buildErrorResult(input, 'Invalid dates provided. Please check your inputs.');
  }

  const daysUntilExpiry = daysBetween(arrival, expiry);

  if (expiry <= arrival) {
    return {
      status: 'Likely Invalid',
      riskLevel: 'High',
      confidenceLevel: 'High',
      mainExplanation: 'Your passport has already expired or expires on your arrival date. You will not be permitted to travel.',
      rule: findValidityRule(input.destinationSlug) ?? null,
      daysUntilExpiry,
      actualExpiryDate: expiry,
      reasons: ['Passport expires on or before your arrival date'],
      recommendations: [
        'Renew your passport immediately before booking travel',
        'Contact your passport issuing authority for expedited renewal options',
      ],
      tripSummary: buildTripSummary(input, 'Passport expired'),
    };
  }

  if (departure && expiry < departure) {
    return {
      status: 'Likely Invalid',
      riskLevel: 'High',
      confidenceLevel: 'High',
      mainExplanation: 'Your passport expires before your planned departure date. You will not be able to complete your trip.',
      rule: findValidityRule(input.destinationSlug) ?? null,
      daysUntilExpiry,
      actualExpiryDate: expiry,
      reasons: ['Passport expires during your trip, before your planned departure'],
      recommendations: [
        'Renew your passport before travel',
        'Contact your passport issuing authority for expedited renewal options',
      ],
      tripSummary: buildTripSummary(input, 'Expires during trip'),
    };
  }

  const rule = findValidityRule(input.destinationSlug);

  if (!rule) {
    const daysUntilExpiryFromReference = daysBetween(referenceDate, expiry);
    if (daysUntilExpiryFromReference < 90) {
      return {
        status: 'Caution',
        riskLevel: 'Medium',
        confidenceLevel: 'Limited',
        mainExplanation: 'No specific validity rule found for this destination in our dataset. Your passport expires within 90 days of travel — most countries require at least 3–6 months validity.',
        rule: null,
        daysUntilExpiry,
        actualExpiryDate: expiry,
        reasons: [
          'No destination-specific rule available in our current dataset',
          'Passport expires within 90 days of travel — below the global standard',
        ],
        recommendations: [
          'Verify the exact passport validity requirement with the destination embassy or consulate',
          'Check IATA Timatic or your airline for the current requirement',
          'Consider renewing your passport before travel to be safe',
        ],
        tripSummary: buildTripSummary(input, 'Rule not in dataset'),
      };
    }
    return {
      status: 'Caution',
      riskLevel: 'Medium',
      confidenceLevel: 'Limited',
      mainExplanation: 'No specific passport validity rule is available for this destination in our current dataset. We recommend verifying the requirement directly before travel.',
      rule: null,
      daysUntilExpiry,
      actualExpiryDate: expiry,
      reasons: ['No destination-specific rule available in our current dataset'],
      recommendations: [
        'Verify the exact passport validity requirement with the destination embassy or consulate',
        'Check IATA Timatic or your airline for the current requirement',
        'As a general rule, ensure at least 6 months validity beyond your departure date',
      ],
      tripSummary: buildTripSummary(input, 'Rule not in dataset'),
    };
  }

  const { ruleType, confidence } = rule;

  const isOneWayOrUnknownDeparture = input.isOneWay || !input.departureDate;

  if (ruleType === 'valid_for_duration') {
    const tripEnd = departure ?? arrival;
    const daysAfterTrip = daysBetween(tripEnd, expiry);

    if (expiry < tripEnd) {
      return buildResult({
        status: 'Likely Invalid',
        riskLevel: 'High',
        confidenceLevel: confidence,
        mainExplanation: `${rule.destinationName} requires your passport to be valid for the full duration of stay. Your passport expires before your trip ends.`,
        rule,
        daysUntilExpiry,
        daysAfterDeparture: daysAfterTrip,
        actualExpiryDate: expiry,
        requiredExpiryDate: tripEnd,
        reasons: ['Passport expires before the end of your stay'],
        recommendations: [
          'Renew your passport before this trip',
          'Do not travel until your renewed passport is in hand',
        ],
        input,
        ruleBasis: rule.ruleLabel,
      });
    }

    if (daysAfterTrip < CAUTION_BUFFER_DAYS) {
      return buildResult({
        status: 'Caution',
        riskLevel: 'Medium',
        confidenceLevel: confidence,
        mainExplanation: `Your passport meets the minimum validity requirement for ${rule.destinationName}, but expires within ${CAUTION_BUFFER_DAYS} days of your departure. Some airlines may flag this — renewing is recommended.`,
        rule,
        daysUntilExpiry,
        daysAfterDeparture: daysAfterTrip,
        actualExpiryDate: expiry,
        requiredExpiryDate: tripEnd,
        reasons: [
          `Passport expires within ${CAUTION_BUFFER_DAYS} days of your departure`,
          'Airlines may flag passports with very limited remaining validity',
        ],
        recommendations: [
          'Consider renewing your passport before travel to avoid airline scrutiny',
          `Your passport expires on ${formatDate(expiry)}, only ${daysAfterTrip} day(s) after your trip ends`,
        ],
        input,
        ruleBasis: rule.ruleLabel,
      });
    }

    return buildResult({
      status: 'Valid',
      riskLevel: 'Low',
      confidenceLevel: confidence,
      mainExplanation: `Your passport appears to meet the validity requirement for ${rule.destinationName}. It is valid for the full duration of your stay.`,
      rule,
      daysUntilExpiry,
      daysAfterDeparture: daysAfterTrip,
      actualExpiryDate: expiry,
      requiredExpiryDate: tripEnd,
      reasons: ['Passport is valid for the full duration of stay'],
      recommendations: ['Carry your passport and travel documents throughout your trip'],
      input,
      ruleBasis: rule.ruleLabel,
    });
  }

  if (
    ruleType === 'six_months_beyond_stay' ||
    ruleType === 'three_months_beyond_stay' ||
    ruleType === 'six_months_from_entry'
  ) {
    const months = ruleType === 'three_months_beyond_stay' ? 3 : 6;
    const baseDate = ruleType === 'six_months_from_entry' ? arrival : (departure ?? arrival);
    const requiredExpiry = addMonths(baseDate, months);
    const cautionThreshold = addDays(requiredExpiry, CAUTION_BUFFER_DAYS);
    const daysAfterDeparture = departure ? daysBetween(departure, expiry) : undefined;

    if (isOneWayOrUnknownDeparture && ruleType !== 'six_months_from_entry') {
      const daysFromArrival = daysBetween(arrival, expiry);
      const requiredFromArrival = addMonths(arrival, months);
      if (expiry < requiredFromArrival) {
        const shortfallDays = daysBetween(expiry, requiredFromArrival);
        const shortfallMonths = Math.ceil(shortfallDays / 30);
        return buildResult({
          status: 'Likely Invalid',
          riskLevel: 'High',
          confidenceLevel: confidence,
          mainExplanation: `${rule.destinationName} requires ${months} months of passport validity beyond your departure date. Without a departure date, the check is based on arrival — your passport appears to fall short of this requirement.`,
          rule,
          daysUntilExpiry,
          daysAfterDeparture,
          actualExpiryDate: expiry,
          requiredExpiryDate: requiredFromArrival,
          reasons: [
            `${rule.destinationName} requires ${months} months validity beyond departure`,
            `No departure date provided — estimated shortfall: ~${shortfallMonths} month(s) (${shortfallDays} days) from arrival`,
          ],
          recommendations: [
            'Renew your passport before this trip',
            'Enter a departure date for a more precise check',
            `Passport must be valid until at least ${formatDate(requiredFromArrival)} (estimated from arrival date)`,
          ],
          input,
          ruleBasis: rule.ruleLabel,
        });
      }
      return buildResult({
        status: 'Caution',
        riskLevel: 'Medium',
        confidenceLevel: 'Limited',
        mainExplanation: `${rule.destinationName} requires ${months} months of passport validity beyond your departure date. Without a departure date, the exact requirement cannot be confirmed. Your passport appears sufficient based on your arrival date, but this cannot be verified with certainty.`,
        rule,
        daysUntilExpiry,
        daysAfterDeparture,
        actualExpiryDate: expiry,
        requiredExpiryDate: requiredFromArrival,
        reasons: [
          `No departure date provided — ${months}-month rule requires a departure date to calculate precisely`,
          `Based on arrival date only: ${daysFromArrival} days of validity remaining`,
        ],
        recommendations: [
          'Enter your planned departure date for a precise result',
          `Ensure your passport is valid for at least ${months} months beyond your actual departure date`,
          'Verify with your airline or the destination embassy if uncertain',
        ],
        input,
        ruleBasis: rule.ruleLabel,
      });
    }

    if (expiry < requiredExpiry) {
      const shortfallDays = daysBetween(expiry, requiredExpiry);
      const shortfallMonths = Math.ceil(shortfallDays / 30);
      const baseDateLabel = ruleType === 'six_months_from_entry' ? 'arrival date' : (departure ? 'departure date' : 'arrival date');
      return buildResult({
        status: 'Likely Invalid',
        riskLevel: 'High',
        confidenceLevel: confidence,
        mainExplanation: `${rule.destinationName} requires ${months} months of passport validity beyond your ${baseDateLabel}. Your passport is approximately ${shortfallMonths} month(s) short of this requirement.`,
        rule,
        daysUntilExpiry,
        daysAfterDeparture,
        actualExpiryDate: expiry,
        requiredExpiryDate: requiredExpiry,
        reasons: [
          `${rule.destinationName} requires ${months} months validity beyond your ${baseDateLabel}`,
          `Your passport expires on ${formatDate(expiry)} — required expiry is ${formatDate(requiredExpiry)}`,
          `Shortfall: approximately ${shortfallMonths} month(s) (${shortfallDays} days)`,
        ],
        recommendations: [
          'Renew your passport before this trip',
          `Your passport must be valid until at least ${formatDate(requiredExpiry)}`,
          'Airlines will check this requirement at check-in and may deny boarding',
        ],
        input,
        ruleBasis: rule.ruleLabel,
      });
    }

    if (expiry < cautionThreshold) {
      return buildResult({
        status: 'Caution',
        riskLevel: 'Medium',
        confidenceLevel: confidence,
        mainExplanation: `Your passport meets the ${months}-month requirement for ${rule.destinationName}, but only by a narrow margin. Some airlines may flag passports that barely meet the threshold.`,
        rule,
        daysUntilExpiry,
        daysAfterDeparture,
        actualExpiryDate: expiry,
        requiredExpiryDate: requiredExpiry,
        reasons: [
          `Passport meets the ${months}-month requirement but is within ${CAUTION_BUFFER_DAYS} days of the minimum`,
          'Airlines may apply stricter checks on passports close to the validity threshold',
        ],
        recommendations: [
          `Renewing your passport before travel is strongly recommended`,
          `Your passport must be valid until at least ${formatDate(requiredExpiry)} — you are very close to this date`,
          'Contact your airline to confirm they will accept your passport validity before purchasing tickets',
        ],
        input,
        ruleBasis: rule.ruleLabel,
      });
    }

    return buildResult({
      status: 'Valid',
      riskLevel: 'Low',
      confidenceLevel: confidence,
      mainExplanation: `Your passport appears to meet the ${months}-month validity requirement for ${rule.destinationName}.`,
      rule,
      daysUntilExpiry,
      daysAfterDeparture,
      actualExpiryDate: expiry,
      requiredExpiryDate: requiredExpiry,
      reasons: [`Passport meets the ${months}-month beyond-${ruleType === 'six_months_from_entry' ? 'arrival' : 'departure'} requirement`],
      recommendations: [
        'Confirm requirements with your airline or official government sources closer to departure',
        `Your passport is valid until ${formatDate(expiry)} — required minimum is ${formatDate(requiredExpiry)}`,
      ],
      input,
      ruleBasis: rule.ruleLabel,
    });
  }

  return {
    status: 'Caution',
    riskLevel: 'Medium',
    confidenceLevel: 'Limited',
    mainExplanation: `The validity rule for ${rule.destinationName} in our dataset requires manual verification. Check with the destination embassy or consulate before travel.`,
    rule,
    daysUntilExpiry,
    actualExpiryDate: expiry,
    reasons: ['Destination rule type requires manual verification'],
    recommendations: [
      'Verify passport validity requirements with the destination embassy or consulate',
      'Check IATA Timatic or your airline for current requirements',
    ],
    tripSummary: buildTripSummary(input, rule.ruleLabel),
  };
}

function buildTripSummary(input: PassportValidityInput, ruleBasis: string) {
  return {
    passportSlug: input.passportSlug,
    destinationSlug: input.destinationSlug,
    passportExpiry: input.passportExpiry,
    arrivalDate: input.arrivalDate,
    departureDate: input.departureDate,
    isOneWay: input.isOneWay ?? !input.departureDate,
    ruleBasis,
  };
}

function buildResult(params: {
  status: ValidityStatus;
  riskLevel: RiskLevel;
  confidenceLevel: ConfidenceLevel;
  mainExplanation: string;
  rule: ReturnType<typeof findValidityRule>;
  daysUntilExpiry: number;
  daysAfterDeparture?: number;
  actualExpiryDate: Date;
  requiredExpiryDate?: Date;
  reasons: string[];
  recommendations: string[];
  input: PassportValidityInput;
  ruleBasis: string;
}): PassportValidityResult {
  return {
    status: params.status,
    riskLevel: params.riskLevel,
    confidenceLevel: params.confidenceLevel,
    mainExplanation: params.mainExplanation,
    rule: params.rule ?? null,
    daysUntilExpiry: params.daysUntilExpiry,
    daysAfterDeparture: params.daysAfterDeparture,
    actualExpiryDate: params.actualExpiryDate,
    requiredExpiryDate: params.requiredExpiryDate,
    reasons: params.reasons,
    recommendations: params.recommendations,
    tripSummary: buildTripSummary(params.input, params.ruleBasis),
  };
}

function buildErrorResult(input: PassportValidityInput, message: string): PassportValidityResult {
  return {
    status: 'Caution',
    riskLevel: 'Medium',
    confidenceLevel: 'Limited',
    mainExplanation: message,
    rule: null,
    daysUntilExpiry: 0,
    actualExpiryDate: new Date(input.passportExpiry),
    reasons: [message],
    recommendations: ['Check your date inputs and try again'],
    tripSummary: buildTripSummary(input, 'Error'),
  };
}

export function isSchengenDestination(slug: string): boolean {
  return SCHENGEN_SLUGS.has(slug);
}
