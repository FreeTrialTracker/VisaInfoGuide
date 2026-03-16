import type {
  TripEntryRiskInput,
  TripEntryRiskResult,
  ComponentRiskCard,
  ComponentStatus,
  RiskLevel,
  ConfidenceLevel,
  TripRiskStatus,
} from './types';
import {
  findDestinationVisaRule,
  findPassportValidityPolicy,
  findTransitRule,
  findOnwardTicketRule,
} from '@/lib/boarding-check/rules';
import { SCHENGEN_SLUGS } from '@/lib/passport-validity/rules';
import { calculateSchengenDays } from '@/lib/schengen';
import { computeScore, scoreToStatus } from './scoring';
import { buildRecommendations } from './recommendations';

function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

function daysBetween(a: Date, b: Date): number {
  return Math.floor((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

function evaluateDestinationVisa(
  passportSlug: string,
  destinationSlug: string,
  holdsVisa: boolean,
): ComponentRiskCard {
  if (holdsVisa) {
    return {
      id: 'destination_visa',
      title: 'Destination Visa',
      status: 'pass',
      riskLevel: 'Low',
      confidence: 'High',
      summary: 'Visa Held',
      detail: 'You have indicated you hold a valid visa or entry authorization for this destination.',
      ruleBasis: 'User confirmed',
    };
  }

  const rule = findDestinationVisaRule(passportSlug, destinationSlug);

  if (!rule) {
    return {
      id: 'destination_visa',
      title: 'Destination Visa',
      status: 'unknown',
      riskLevel: 'Medium',
      confidence: 'Limited',
      summary: 'Rule Not Found',
      detail: 'No visa rule found for this passport-destination pair in our current dataset. Verify with the destination embassy, consulate, or official government source before travel.',
      ruleBasis: 'Not in dataset',
    };
  }

  switch (rule.requirement) {
    case 'visa_free':
      return {
        id: 'destination_visa',
        title: 'Destination Visa',
        status: 'pass',
        riskLevel: 'Low',
        confidence: 'High',
        summary: 'Visa-Free Entry',
        detail: rule.maxStayDays
          ? `No visa required. Visa-free entry permitted for up to ${rule.maxStayDays} days.${rule.notes ? ` ${rule.notes}` : ''}`
          : `No visa required for entry.${rule.notes ? ` ${rule.notes}` : ''}`,
        ruleBasis: 'Visa-free bilateral agreement',
        source: rule.notes ?? undefined,
      };
    case 'eta_required':
      return {
        id: 'destination_visa',
        title: 'Destination Visa',
        status: 'caution',
        riskLevel: 'Medium',
        confidence: 'High',
        summary: 'eTA Required Before Boarding',
        detail: `An electronic travel authorization (eTA) must be obtained online before you arrive at the airport. ${rule.notes ?? 'Apply at least 72 hours in advance — airlines verify eTA at check-in.'}`,
        ruleBasis: 'eTA requirement',
      };
    case 'evisa':
      return {
        id: 'destination_visa',
        title: 'Destination Visa',
        status: 'caution',
        riskLevel: 'Medium',
        confidence: 'High',
        summary: 'eVisa Required Before Travel',
        detail: `An eVisa must be obtained online before travel. ${rule.notes ?? 'Apply several days in advance — approval is not instant in all cases.'}`,
        ruleBasis: 'eVisa requirement',
      };
    case 'visa_on_arrival':
      return {
        id: 'destination_visa',
        title: 'Destination Visa',
        status: 'caution',
        riskLevel: 'Low',
        confidence: 'High',
        summary: 'Visa on Arrival',
        detail: `A visa is available on arrival at the destination airport. ${rule.notes ?? 'Carry supporting documents including proof of accommodation and return travel.'}`,
        ruleBasis: 'Visa on arrival scheme',
      };
    case 'visa_required':
      return {
        id: 'destination_visa',
        title: 'Destination Visa',
        status: 'fail',
        riskLevel: 'High',
        confidence: 'High',
        summary: 'Visa Required — Must Be Pre-Obtained',
        detail: `A visa must be obtained from the embassy or consulate before travel.${rule.notes ? ` ${rule.notes}` : ''} Airlines check visa status at check-in. You will not be permitted to board without a valid visa.`,
        ruleBasis: 'Visa required (pre-obtained)',
      };
    default:
      return {
        id: 'destination_visa',
        title: 'Destination Visa',
        status: 'unknown',
        riskLevel: 'Medium',
        confidence: 'Limited',
        summary: 'Requirement Unclear',
        detail: 'Visa requirement for this destination is not confirmed. Verify with official sources.',
        ruleBasis: 'Unknown',
      };
  }
}

function evaluatePassportValidity(
  destinationSlug: string,
  arrivalDate: string,
  departureDate: string | undefined,
  passportExpiry: string | undefined,
  isOneWay: boolean,
): ComponentRiskCard {
  if (!passportExpiry) {
    return {
      id: 'passport_validity',
      title: 'Passport Validity',
      status: 'unknown',
      riskLevel: 'Medium',
      confidence: 'Limited',
      summary: 'Expiry Not Provided',
      detail: 'No passport expiry date was provided. Enter your passport expiry date for a validity check.',
      ruleBasis: 'Not checked',
    };
  }

  const arrival = new Date(arrivalDate);
  const expiry = new Date(passportExpiry);
  const returnDate = departureDate ? new Date(departureDate) : null;
  const tripEnd = returnDate ?? arrival;

  if (isNaN(expiry.getTime())) {
    return {
      id: 'passport_validity',
      title: 'Passport Validity',
      status: 'unknown',
      riskLevel: 'Medium',
      confidence: 'Limited',
      summary: 'Invalid Expiry Date',
      detail: 'Could not parse the passport expiry date. Please check the date entered.',
      ruleBasis: 'Error',
    };
  }

  if (expiry <= arrival) {
    return {
      id: 'passport_validity',
      title: 'Passport Validity',
      status: 'fail',
      riskLevel: 'High',
      confidence: 'High',
      summary: 'Passport Expired at Arrival',
      detail: 'Your passport expires on or before your arrival date. You will not be permitted to board or enter.',
      ruleBasis: 'Passport expired',
    };
  }

  if (returnDate && expiry < returnDate) {
    return {
      id: 'passport_validity',
      title: 'Passport Validity',
      status: 'fail',
      riskLevel: 'High',
      confidence: 'High',
      summary: 'Passport Expires During Trip',
      detail: 'Your passport expires before your planned departure from the destination. You will not be able to complete your trip with this passport.',
      ruleBasis: 'Expires during stay',
    };
  }

  const policy = findPassportValidityPolicy(destinationSlug);

  if (!policy) {
    const daysUntilExpiry = daysBetween(arrival, expiry);
    if (daysUntilExpiry < 90) {
      return {
        id: 'passport_validity',
        title: 'Passport Validity',
        status: 'caution',
        riskLevel: 'Medium',
        confidence: 'Limited',
        summary: 'Validity May Be Insufficient',
        detail: `Your passport expires within 90 days of your arrival. Most countries require at least 3–6 months. No specific rule is in our dataset for this destination — verify before travel.`,
        ruleBasis: 'Default 90-day warning',
      };
    }
    return {
      id: 'passport_validity',
      title: 'Passport Validity',
      status: 'unknown',
      riskLevel: 'Medium',
      confidence: 'Limited',
      summary: 'Rule Not Found',
      detail: 'No passport validity rule found for this destination. Ensure at least 6 months validity beyond your return date as a precaution.',
      ruleBasis: 'Not in dataset',
    };
  }

  const { rule, minimumMonthsRequired, notes } = policy;

  if (rule.type === 'valid_for_duration') {
    const daysRemaining = daysBetween(tripEnd, expiry);
    if (daysRemaining < 30) {
      return {
        id: 'passport_validity',
        title: 'Passport Validity',
        status: 'caution',
        riskLevel: 'Medium',
        confidence: 'High',
        summary: 'Validity Very Close to Trip End',
        detail: `Passport expires within 30 days of your trip end. While the formal rule is met, airlines may flag this. Consider renewing.${notes ? ` ${notes}` : ''}`,
        ruleBasis: 'Valid for duration (close buffer)',
      };
    }
    return {
      id: 'passport_validity',
      title: 'Passport Validity',
      status: 'pass',
      riskLevel: 'Low',
      confidence: 'High',
      summary: 'Validity Sufficient',
      detail: `Passport is valid for the full duration of your trip.${notes ? ` ${notes}` : ''}`,
      ruleBasis: 'Valid for duration',
    };
  }

  if (
    rule.type === 'six_months_beyond_stay' ||
    rule.type === 'three_months_beyond_stay' ||
    rule.type === 'six_months_from_entry'
  ) {
    const months = minimumMonthsRequired ?? (rule.type === 'three_months_beyond_stay' ? 3 : 6);
    const baseDate = rule.type === 'six_months_from_entry' ? arrival : (isOneWay ? arrival : tripEnd);
    const requiredExpiry = addMonths(baseDate, months);
    const cautionThreshold = addMonths(requiredExpiry, 1);

    if (expiry < requiredExpiry) {
      const shortfall = daysBetween(expiry, requiredExpiry);
      return {
        id: 'passport_validity',
        title: 'Passport Validity',
        status: 'fail',
        riskLevel: 'High',
        confidence: 'High',
        summary: 'Validity Insufficient',
        detail: `This destination requires ${months} month${months > 1 ? 's' : ''} of passport validity beyond your ${isOneWay ? 'arrival' : 'departure'} date. Your passport is approximately ${Math.ceil(shortfall / 30)} month(s) short.${notes ? ` ${notes}` : ''}`,
        ruleBasis: `${months}-month beyond-${rule.type === 'six_months_from_entry' ? 'arrival' : 'stay'} rule`,
      };
    }

    if (expiry < cautionThreshold) {
      return {
        id: 'passport_validity',
        title: 'Passport Validity',
        status: 'caution',
        riskLevel: 'Medium',
        confidence: 'High',
        summary: 'Validity Close to Minimum',
        detail: `Passport meets the ${months}-month requirement but is within one month of the threshold. Airlines may flag this. Renewing is recommended.${notes ? ` ${notes}` : ''}`,
        ruleBasis: `${months}-month rule (close buffer)`,
      };
    }

    return {
      id: 'passport_validity',
      title: 'Passport Validity',
      status: 'pass',
      riskLevel: 'Low',
      confidence: 'High',
      summary: 'Validity Sufficient',
      detail: `Passport meets the ${months}-month validity requirement for this destination.${notes ? ` ${notes}` : ''}`,
      ruleBasis: `${months}-month beyond-stay rule`,
    };
  }

  return {
    id: 'passport_validity',
    title: 'Passport Validity',
    status: 'unknown',
    riskLevel: 'Medium',
    confidence: 'Limited',
    summary: 'Rule Unclear',
    detail: 'Could not apply a specific validity rule. Ensure at least 6 months of validity beyond your return date.',
    ruleBasis: 'Manual verification needed',
  };
}

function evaluateTransitStop(
  passportSlug: string,
  transitSlug: string | undefined,
  holdsResidencePermit: boolean,
  stopLabel: string,
  selfTransfer: boolean,
  changingTerminals: boolean,
  leavingAirport: boolean,
): ComponentRiskCard {
  if (!transitSlug) {
    return {
      id: stopLabel === 'Transit Stop 1' ? 'transit_1' : 'transit_2',
      title: stopLabel,
      status: 'not_applicable',
      riskLevel: 'Low',
      confidence: 'High',
      summary: 'No Transit Stop',
      detail: `No ${stopLabel.toLowerCase()} entered.`,
    };
  }

  if (holdsResidencePermit) {
    return {
      id: stopLabel === 'Transit Stop 1' ? 'transit_1' : 'transit_2',
      title: stopLabel,
      status: 'caution',
      riskLevel: 'Medium',
      confidence: 'Medium',
      summary: 'Residence Permit — Verify Exemption',
      detail: `You hold a residence permit. This may exempt you from transit visa requirements at ${stopLabel}, but eligibility depends on the permit type and issuing country. Confirm with your airline.`,
      ruleBasis: 'Residence permit exemption',
    };
  }

  const rule = findTransitRule(passportSlug, transitSlug);

  const selfTransferNote = selfTransfer || changingTerminals || leavingAirport
    ? ` Note: self-transfer, terminal change, or leaving the airport may trigger additional immigration requirements.`
    : '';

  if (!rule) {
    return {
      id: stopLabel === 'Transit Stop 1' ? 'transit_1' : 'transit_2',
      title: stopLabel,
      status: 'unknown',
      riskLevel: 'Medium',
      confidence: 'Limited',
      summary: 'Transit Data Not Available',
      detail: `No transit rule found for this passport at ${transitSlug}. Verify with the airline or the transit country's immigration authority.${selfTransferNote}`,
      ruleBasis: 'Not in dataset',
    };
  }

  switch (rule.requirement) {
    case 'visa_free':
      return {
        id: stopLabel === 'Transit Stop 1' ? 'transit_1' : 'transit_2',
        title: stopLabel,
        status: selfTransfer || changingTerminals || leavingAirport ? 'caution' : 'pass',
        riskLevel: selfTransfer || changingTerminals || leavingAirport ? 'Medium' : 'Low',
        confidence: 'High',
        summary: selfTransfer || changingTerminals || leavingAirport ? 'Transit Permitted — Verify Connection Type' : 'Transit Permitted',
        detail: `Your passport can transit ${transitSlug} without a separate transit visa.${rule.notes ? ` ${rule.notes}` : ''}${selfTransferNote}`,
        ruleBasis: 'Transit permitted',
      };
    case 'airside_transit_visa':
      return {
        id: stopLabel === 'Transit Stop 1' ? 'transit_1' : 'transit_2',
        title: stopLabel,
        status: 'fail',
        riskLevel: 'High',
        confidence: 'High',
        summary: 'Airside Transit Visa Required',
        detail: `An Airside Transit Visa (DATV) is required to connect through this country — even remaining in the international zone. You cannot board your originating flight without it.${rule.notes ? ` ${rule.notes}` : ''}`,
        ruleBasis: 'DATV / Airside Transit Visa',
      };
    case 'transit_visa_required':
      return {
        id: stopLabel === 'Transit Stop 1' ? 'transit_1' : 'transit_2',
        title: stopLabel,
        status: 'fail',
        riskLevel: 'High',
        confidence: 'High',
        summary: 'Transit Visa Required',
        detail: `A transit visa is required for this connection.${rule.notes ? ` ${rule.notes}` : ''} Apply before travel — this is a boarding blocker.`,
        ruleBasis: 'Transit visa required',
      };
    default:
      return {
        id: stopLabel === 'Transit Stop 1' ? 'transit_1' : 'transit_2',
        title: stopLabel,
        status: 'unknown',
        riskLevel: 'Medium',
        confidence: 'Limited',
        summary: 'Transit Requirements Unconfirmed',
        detail: `Transit rules for this passport at ${transitSlug} are not confirmed. Verify with the airline.${selfTransferNote}`,
        ruleBasis: 'Unconfirmed',
      };
  }
}

function evaluateOnwardTicket(
  destinationSlug: string,
  isOneWay: boolean,
  onwardConfirmed: boolean | undefined,
): ComponentRiskCard {
  const hasOnward = onwardConfirmed === true || !isOneWay;
  const rule = findOnwardTicketRule(destinationSlug);

  if (!rule) {
    if (!hasOnward) {
      return {
        id: 'onward_ticket',
        title: 'Onward / Return Ticket',
        status: 'caution',
        riskLevel: 'Medium',
        confidence: 'Limited',
        summary: 'One-Way — Verify Requirement',
        detail: 'No specific enforcement data for this destination. One-way travelers may be questioned at check-in. Carrying proof of onward plans is recommended.',
        ruleBasis: 'No rule in dataset',
      };
    }
    return {
      id: 'onward_ticket',
      title: 'Onward / Return Ticket',
      status: 'pass',
      riskLevel: 'Low',
      confidence: 'Medium',
      summary: 'Onward Travel Confirmed',
      detail: 'You have a return or onward plan. This satisfies most onward ticket checks.',
      ruleBasis: 'No rule in dataset',
    };
  }

  switch (rule.policy) {
    case 'strongly_enforced':
      if (!hasOnward) {
        return {
          id: 'onward_ticket',
          title: 'Onward / Return Ticket',
          status: 'fail',
          riskLevel: 'High',
          confidence: 'High',
          summary: 'Onward Ticket Required',
          detail: `${rule.notes ?? 'This destination strongly enforces the onward/return ticket requirement.'} Without a confirmed departure booking, airlines are likely to deny boarding.`,
          ruleBasis: 'Strongly enforced policy',
        };
      }
      return {
        id: 'onward_ticket',
        title: 'Onward / Return Ticket',
        status: 'pass',
        riskLevel: 'Low',
        confidence: 'High',
        summary: 'Onward Ticket Confirmed',
        detail: `Onward ticket requirement satisfied.${rule.notes ? ` Note: ${rule.notes}` : ''}`,
        ruleBasis: 'Strongly enforced policy',
      };
    case 'commonly_required':
      if (!hasOnward) {
        return {
          id: 'onward_ticket',
          title: 'Onward / Return Ticket',
          status: 'caution',
          riskLevel: 'Medium',
          confidence: 'High',
          summary: 'Onward Ticket Likely Requested',
          detail: `Proof of onward or return travel is commonly requested at this destination.${rule.notes ? ` ${rule.notes}` : ''} As a one-way traveler you are likely to be questioned.`,
          ruleBasis: 'Commonly required policy',
        };
      }
      return {
        id: 'onward_ticket',
        title: 'Onward / Return Ticket',
        status: 'pass',
        riskLevel: 'Low',
        confidence: 'High',
        summary: 'Onward Ticket Confirmed',
        detail: 'Return or onward travel confirmed.',
        ruleBasis: 'Commonly required policy',
      };
    case 'rarely_checked':
      if (!hasOnward) {
        return {
          id: 'onward_ticket',
          title: 'Onward / Return Ticket',
          status: 'caution',
          riskLevel: 'Low',
          confidence: 'High',
          summary: 'One-Way — Low Risk',
          detail: `Onward ticket enforcement at this destination is relatively low.${rule.notes ? ` ${rule.notes}` : ''} One-way travel is unlikely to be blocked but is technically subject to the requirement.`,
          ruleBasis: 'Rarely enforced policy',
        };
      }
      return {
        id: 'onward_ticket',
        title: 'Onward / Return Ticket',
        status: 'pass',
        riskLevel: 'Low',
        confidence: 'High',
        summary: 'Onward Travel Confirmed',
        detail: 'Return or onward travel confirmed.',
        ruleBasis: 'Rarely enforced policy',
      };
    case 'not_required':
      return {
        id: 'onward_ticket',
        title: 'Onward / Return Ticket',
        status: 'pass',
        riskLevel: 'Low',
        confidence: 'High',
        summary: 'Not Required',
        detail: 'No onward ticket requirement for this destination.',
        ruleBasis: 'Not required',
      };
    default:
      return {
        id: 'onward_ticket',
        title: 'Onward / Return Ticket',
        status: 'unknown',
        riskLevel: 'Medium',
        confidence: 'Limited',
        summary: 'Policy Unconfirmed',
        detail: 'Onward ticket enforcement data is not available for this destination. Verify before travel.',
        ruleBasis: 'Not in dataset',
      };
  }
}

function evaluateSchengen(
  destinationSlug: string,
  arrivalDate: string,
  stayLengthDays: number,
  schengenHistory: { entryDate: string; exitDate: string }[],
  includesSchengen: boolean,
): ComponentRiskCard | null {
  const isSchengenDest = SCHENGEN_SLUGS.has(destinationSlug);

  if (!isSchengenDest && !includesSchengen) {
    return null;
  }

  if (!includesSchengen && isSchengenDest) {
    return {
      id: 'schengen',
      title: 'Schengen Stay Limit',
      status: 'unknown',
      riskLevel: 'Medium',
      confidence: 'Limited',
      summary: 'Schengen History Not Provided',
      detail: 'This destination is in the Schengen Area. To check the 90/180-day limit accurately, enable the Schengen history option and enter your prior trips.',
      ruleBasis: '90/180-day rolling window rule',
    };
  }

  const segments = [
    ...schengenHistory.map(t => ({ entryDate: t.entryDate, exitDate: t.exitDate })),
  ];

  const arrival = new Date(arrivalDate);
  const plannedExit = new Date(arrivalDate);
  plannedExit.setDate(plannedExit.getDate() + stayLengthDays - 1);

  const plannedExitStr = plannedExit.toISOString().slice(0, 10);

  const withPlanned = [
    ...segments,
    { entryDate: arrivalDate, exitDate: plannedExitStr },
  ];

  try {
    const result = calculateSchengenDays(withPlanned, arrivalDate);
    const { daysUsed, daysRemaining, isWithinLimit } = result;

    if (!isWithinLimit) {
      return {
        id: 'schengen',
        title: 'Schengen Stay Limit',
        status: 'fail',
        riskLevel: 'High',
        confidence: 'High',
        summary: 'Schengen Limit Exceeded',
        detail: `Including this trip, you would use ${daysUsed} days in the current 180-day window — exceeding the 90-day maximum. You may be denied entry.`,
        ruleBasis: '90/180-day rolling window',
        source: 'EU Entry/Exit System (EES), Schengen Convention',
      };
    }

    if (daysRemaining <= 10) {
      return {
        id: 'schengen',
        title: 'Schengen Stay Limit',
        status: 'caution',
        riskLevel: 'Medium',
        confidence: 'High',
        summary: 'Schengen Days Nearly Exhausted',
        detail: `You would have only ${daysRemaining} Schengen day(s) remaining after this trip. You are very close to the 90-day limit.`,
        ruleBasis: '90/180-day rolling window',
        source: 'EU Entry/Exit System (EES), Schengen Convention',
      };
    }

    if (daysUsed > 75) {
      return {
        id: 'schengen',
        title: 'Schengen Stay Limit',
        status: 'caution',
        riskLevel: 'Medium',
        confidence: 'High',
        summary: 'Schengen Stay Close to Limit',
        detail: `This trip would use ${daysUsed} of 90 allowed days. ${daysRemaining} day(s) would remain after departure. Monitor your Schengen stay carefully.`,
        ruleBasis: '90/180-day rolling window',
        source: 'EU Entry/Exit System (EES), Schengen Convention',
      };
    }

    return {
      id: 'schengen',
      title: 'Schengen Stay Limit',
      status: 'pass',
      riskLevel: 'Low',
      confidence: 'High',
      summary: 'Within Schengen Limit',
      detail: `This trip would use ${daysUsed} of 90 allowed Schengen days. ${daysRemaining} day(s) would remain after departure.`,
      ruleBasis: '90/180-day rolling window',
      source: 'EU Entry/Exit System (EES), Schengen Convention',
    };
  } catch {
    return {
      id: 'schengen',
      title: 'Schengen Stay Limit',
      status: 'unknown',
      riskLevel: 'Medium',
      confidence: 'Limited',
      summary: 'Calculation Error',
      detail: 'Could not calculate Schengen days. Check that all history dates are valid and non-overlapping.',
      ruleBasis: '90/180-day rolling window',
    };
  }
}

function evaluateBoardingInterpretation(components: ComponentRiskCard[]): ComponentRiskCard {
  const hasFail = components.some(c => c.status === 'fail');
  const hasCaution = components.some(c => c.status === 'caution');
  const hasUnknown = components.some(c => c.status === 'unknown');

  if (hasFail) {
    const failCard = components.find(c => c.status === 'fail');
    return {
      id: 'boarding_interpretation',
      title: 'Final Boarding / Entry Interpretation',
      status: 'fail',
      riskLevel: 'High',
      confidence: 'High',
      summary: 'Likely Boarding or Entry Issue',
      detail: `At least one hard blocker was detected — most critically: ${failCard?.summary ?? 'a required document or authorization is missing'}. This issue must be resolved before you can board.`,
      ruleBasis: 'Combined assessment',
    };
  }

  if (hasCaution || hasUnknown) {
    return {
      id: 'boarding_interpretation',
      title: 'Final Boarding / Entry Interpretation',
      status: 'caution',
      riskLevel: 'Medium',
      confidence: hasUnknown ? 'Limited' : 'Medium',
      summary: 'Proceed With Verification',
      detail: 'No hard blockers detected, but one or more checks require manual verification or involve borderline conditions. Verify uncertain items before purchasing tickets.',
      ruleBasis: 'Combined assessment',
    };
  }

  return {
    id: 'boarding_interpretation',
    title: 'Final Boarding / Entry Interpretation',
    status: 'pass',
    riskLevel: 'Low',
    confidence: 'High',
    summary: 'No Major Issues Detected',
    detail: 'All major checks appear clear. Carry your passport, bookings, and any required authorizations. Recheck official requirements within 72 hours of departure.',
    ruleBasis: 'Combined assessment',
  };
}

function buildPrimaryFactors(components: ComponentRiskCard[]): string[] {
  return components
    .filter(c => c.status !== 'not_applicable')
    .map(c => {
      switch (c.status) {
        case 'pass': return `${c.title}: ${c.summary}`;
        case 'caution': return `${c.title}: ${c.summary} — verify before travel`;
        case 'fail': return `${c.title}: ${c.summary} — boarding blocker`;
        case 'unknown': return `${c.title}: ${c.summary} — manual verification required`;
        default: return `${c.title}: ${c.summary}`;
      }
    });
}

function computeOverallConfidence(components: ComponentRiskCard[]): ConfidenceLevel {
  const relevant = components.filter(c => c.status !== 'not_applicable');
  const unknownCount = relevant.filter(c => c.status === 'unknown').length;
  const limitedConfidenceCount = relevant.filter(c => c.confidence === 'Limited').length;

  const visa = components.find(c => c.id === 'destination_visa');
  const validity = components.find(c => c.id === 'passport_validity');
  const criticalUnknown = visa?.status === 'unknown' || validity?.status === 'unknown';

  if (criticalUnknown || unknownCount >= 2 || limitedConfidenceCount >= 2) return 'Limited';
  if (unknownCount === 1 || limitedConfidenceCount === 1) return 'Medium';
  return 'High';
}

function buildMainExplanation(status: TripRiskStatus, riskLevel: RiskLevel, components: ComponentRiskCard[]): string {
  if (status === 'Likely OK') {
    return 'No major visa, passport validity, transit, onward-ticket, or Schengen limit issues were detected based on the current trip details.';
  }
  if (status === 'Likely Issue') {
    const failCards = components.filter(c => c.status === 'fail');
    const issues = failCards.map(c => c.summary.toLowerCase()).join('; ');
    return `Your trip may face boarding or entry problems. Detected issue(s): ${issues}. Resolve these before purchasing tickets or attempting to board.`;
  }
  const cautionCards = components.filter(c => c.status === 'caution' || c.status === 'unknown');
  const areas = cautionCards.map(c => c.title).join(', ');
  return `One or more parts of your trip may require extra verification before travel: ${areas}. Review the checks below carefully.`;
}

export function runTripEntryRiskCheck(input: TripEntryRiskInput): TripEntryRiskResult {
  const isOneWay = input.isOneWay ?? !input.departureDate;
  const selfTransfer = input.selfTransfer ?? false;
  const changingTerminals = input.changingTerminals ?? false;
  const leavingAirport = input.leavingAirport ?? false;
  const holdsVisa = input.holdsDestinationVisa ?? false;
  const holdsPermit = input.holdsResidencePermit ?? false;
  const includesSchengen = input.includesSchengen ?? false;
  const schengenHistory = input.schengenHistory ?? [];

  const visaCard = evaluateDestinationVisa(input.passportSlug, input.destinationSlug, holdsVisa);
  const validityCard = evaluatePassportValidity(
    input.destinationSlug,
    input.arrivalDate,
    input.departureDate,
    input.passportExpiry,
    isOneWay,
  );
  const transit1Card = evaluateTransitStop(
    input.passportSlug,
    input.transitStop1,
    holdsPermit,
    'Transit Stop 1',
    selfTransfer,
    changingTerminals,
    leavingAirport,
  );
  const transit2Card = evaluateTransitStop(
    input.passportSlug,
    input.transitStop2,
    holdsPermit,
    'Transit Stop 2',
    selfTransfer,
    changingTerminals,
    leavingAirport,
  );
  const onwardCard = evaluateOnwardTicket(input.destinationSlug, isOneWay, input.onwardTicketConfirmed);
  const schengenCard = evaluateSchengen(
    input.destinationSlug,
    input.arrivalDate,
    input.stayLengthDays,
    schengenHistory,
    includesSchengen,
  );

  const coreComponents: ComponentRiskCard[] = [visaCard, validityCard, transit1Card, transit2Card, onwardCard];
  if (schengenCard) coreComponents.push(schengenCard);

  const boardingCard = evaluateBoardingInterpretation(coreComponents);
  const allComponents = [...coreComponents, boardingCard];

  const { overallStatus, riskLevel } = scoreToStatus(computeScore(coreComponents));
  const confidenceLevel = computeOverallConfidence(allComponents);
  const primaryFactors = buildPrimaryFactors(coreComponents.filter(c => c.status !== 'not_applicable'));
  const mainExplanation = buildMainExplanation(overallStatus, riskLevel, allComponents);
  const recommendations = buildRecommendations(overallStatus, coreComponents);

  const schengenRelevant = SCHENGEN_SLUGS.has(input.destinationSlug) || includesSchengen;

  return {
    overallStatus,
    riskLevel,
    confidenceLevel,
    mainExplanation,
    primaryFactors,
    components: allComponents,
    recommendations,
    verificationNote: 'Border officers and airlines make all final boarding and entry decisions. This tool provides a structured best-effort assessment based on known rules. Always verify current requirements with official government sources, the destination embassy, or your airline — especially within 72 hours of departure. Rules can change without notice.',
    schengenRelevant,
    tripSummary: {
      passportSlug: input.passportSlug,
      destinationSlug: input.destinationSlug,
      arrivalDate: input.arrivalDate,
      stayLengthDays: input.stayLengthDays,
      departureDate: input.departureDate,
      isOneWay,
      passportExpiry: input.passportExpiry,
      onwardTicketConfirmed: input.onwardTicketConfirmed,
      transitStop1: input.transitStop1,
      transitStop2: input.transitStop2,
      selfTransfer,
      changingTerminals,
      leavingAirport,
      schengenHistoryIncluded: includesSchengen && schengenHistory.length > 0,
    },
  };
}
