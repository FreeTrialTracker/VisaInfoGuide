import type {
  BoardingCheckInput,
  BoardingAssessment,
  CheckResult,
  BoardingStatus,
  RiskLevel,
  ConfidenceLevel,
  CheckStatus,
} from './types';
import {
  findDestinationVisaRule,
  findPassportValidityPolicy,
  findTransitRule,
  findOnwardTicketRule,
} from './rules';

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
  holdsDestinationVisa: boolean
): CheckResult {
  if (holdsDestinationVisa) {
    return {
      status: 'pass',
      label: 'Visa Held',
      detail: 'You have indicated you hold a valid visa or entry authorization for this destination.',
    };
  }

  const rule = findDestinationVisaRule(passportSlug, destinationSlug);

  if (!rule) {
    return {
      status: 'unknown',
      label: 'Data Not Available',
      detail: 'No visa rule found for this passport-destination pair in our current dataset. Verify with official sources or the airline before travel.',
    };
  }

  switch (rule.requirement) {
    case 'visa_free':
      return {
        status: 'pass',
        label: 'Visa-Free Entry',
        detail: rule.maxStayDays
          ? `No visa required. Visa-free entry for up to ${rule.maxStayDays} days.${rule.notes ? ` ${rule.notes}` : ''}`
          : `No visa required for entry.${rule.notes ? ` ${rule.notes}` : ''}`,
      };
    case 'eta_required':
      return {
        status: 'caution',
        label: 'eTA Required Before Boarding',
        detail: `An electronic travel authorization (eTA) must be obtained online before you arrive at the airport. ${rule.notes ?? 'Apply at least 72 hours in advance — airlines verify eTA at check-in.'}`,
      };
    case 'evisa':
      return {
        status: 'caution',
        label: 'eVisa Required Before Travel',
        detail: `An eVisa must be obtained online before travel. ${rule.notes ?? 'Apply several days in advance — approval is not instant in all cases.'}`,
      };
    case 'visa_on_arrival':
      return {
        status: 'caution',
        label: 'Visa on Arrival',
        detail: `A visa is available on arrival at the destination airport. ${rule.notes ?? 'Carry supporting documents including proof of accommodation and return travel. Some airlines may ask to confirm eligibility before boarding.'}`,
      };
    case 'visa_required':
      return {
        status: 'fail',
        label: 'Visa Required — Must Be Pre-Obtained',
        detail: `A visa must be obtained from the embassy or consulate before travel.${rule.notes ? ` ${rule.notes}` : ''} Airlines are required to check visa status at check-in. You will not be permitted to board without a valid visa.`,
      };
  }
}

function evaluatePassportValidity(
  destinationSlug: string,
  departureDate: string,
  returnDate: string | undefined,
  passportExpiry: string
): CheckResult {
  const departure = new Date(departureDate);
  const expiry = new Date(passportExpiry);
  const returnOrSame = returnDate ? new Date(returnDate) : departure;

  if (isNaN(expiry.getTime()) || isNaN(departure.getTime())) {
    return {
      status: 'unknown',
      label: 'Date Error',
      detail: 'Could not read the dates entered. Please ensure departure and passport expiry dates are valid.',
    };
  }

  if (expiry <= departure) {
    return {
      status: 'fail',
      label: 'Passport Expired at Departure',
      detail: 'Your passport expires on or before your departure date. Boarding will be denied — you must renew your passport before travel.',
    };
  }

  const policy = findPassportValidityPolicy(destinationSlug);

  if (!policy) {
    const daysUntilExpiry = daysBetween(departure, expiry);
    if (daysUntilExpiry < 90) {
      return {
        status: 'caution',
        label: 'Validity May Be Insufficient',
        detail: `Your passport expires within 90 days of departure. Most countries require at least 3–6 months of validity. No specific rule is available for this destination in our dataset — verify before travel.`,
      };
    }
    return {
      status: 'unknown',
      label: 'Validity Rule Not Found',
      detail: 'No passport validity policy found for this destination. As a safe default, ensure your passport is valid for at least 6 months beyond your return date.',
    };
  }

  const { rule, minimumMonthsRequired, notes } = policy;

  if (rule.type === 'valid_for_duration') {
    if (expiry < returnOrSame) {
      return {
        status: 'fail',
        label: 'Passport Expires During Trip',
        detail: `Your passport expires before your return date. This destination requires a passport valid for the full duration of stay.${notes ? ` ${notes}` : ''}`,
      };
    }
    const daysRemaining = daysBetween(returnOrSame, expiry);
    if (daysRemaining < 30) {
      return {
        status: 'caution',
        label: 'Validity Very Close to Trip End',
        detail: `Passport expires within 30 days of your return date. While the formal rule is met, airlines may flag this. Consider renewing.${notes ? ` ${notes}` : ''}`,
      };
    }
    return {
      status: 'pass',
      label: 'Validity Sufficient',
      detail: `Passport is valid for the full duration of your trip.${notes ? ` ${notes}` : ''}`,
    };
  }

  if (
    rule.type === 'six_months_beyond_stay' ||
    rule.type === 'three_months_beyond_stay' ||
    rule.type === 'six_months_from_entry'
  ) {
    const months = minimumMonthsRequired ?? (rule.type === 'three_months_beyond_stay' ? 3 : 6);
    const requiredExpiry = addMonths(returnOrSame, months);

    if (expiry < requiredExpiry) {
      const shortfall = daysBetween(expiry, requiredExpiry);
      return {
        status: 'fail',
        label: 'Passport Validity Insufficient',
        detail: `This destination requires at least ${months} month${months > 1 ? 's' : ''} of passport validity beyond your return date. Your passport is approximately ${Math.ceil(shortfall / 30)} month(s) short of this requirement.${notes ? ` ${notes}` : ''}`,
      };
    }

    const warningThreshold = addMonths(requiredExpiry, 1);
    if (expiry < warningThreshold) {
      return {
        status: 'caution',
        label: 'Validity Close to Minimum',
        detail: `Passport meets the ${months}-month requirement but is within one month of the threshold. Some airlines may flag this. Renewing before travel is recommended.${notes ? ` ${notes}` : ''}`,
      };
    }

    return {
      status: 'pass',
      label: 'Validity Sufficient',
      detail: `Passport meets the ${months}-month beyond-return requirement for this destination.${notes ? ` ${notes}` : ''}`,
    };
  }

  return {
    status: 'unknown',
    label: 'Validity Rule Unclear',
    detail: 'Could not apply a specific validity rule for this destination. Ensure at least 6 months of validity beyond your return date as a precaution.',
  };
}

function evaluateTransit(
  passportSlug: string,
  transitStop: string | undefined,
  holdsResidencePermit: boolean,
  stopLabel: string
): CheckResult {
  if (!transitStop) {
    return {
      status: 'pass',
      label: 'No Transit Stop',
      detail: `No ${stopLabel} entered.`,
    };
  }

  if (holdsResidencePermit) {
    return {
      status: 'caution',
      label: 'Residence Permit — Verify Exemption',
      detail: `You indicated you hold a residence permit. This may exempt you from the transit visa requirement at ${stopLabel}, but exemption eligibility depends on the issuing country and your specific permit type. Confirm with the airline before travel.`,
    };
  }

  const rule = findTransitRule(passportSlug, transitStop);

  if (!rule) {
    return {
      status: 'unknown',
      label: 'Transit Data Not Available',
      detail: `No transit rule found for your passport at this connection point. This does not mean transit is permitted — it means we do not have a seeded rule for this combination. Verify with the airline or the transit country's embassy.`,
    };
  }

  switch (rule.requirement) {
    case 'visa_free':
      return {
        status: 'pass',
        label: 'Transit Permitted',
        detail: `Your passport can transit this country without a separate transit visa.${rule.notes ? ` ${rule.notes}` : ''}`,
      };
    case 'airside_transit_visa':
      return {
        status: 'fail',
        label: 'Airside Transit Visa Required',
        detail: `An Airside Transit Visa is required to connect through this country — even if you remain in the international transit zone and do not go through passport control.${rule.notes ? ` ${rule.notes}` : ''} You will not be permitted to board the originating flight without it.`,
      };
    case 'transit_visa_required':
      return {
        status: 'fail',
        label: 'Transit Visa Required',
        detail: `A transit visa is required to pass through this country.${rule.notes ? ` ${rule.notes}` : ''} Apply before travel — this is a boarding blocker.`,
      };
    case 'unknown':
      return {
        status: 'unknown',
        label: 'Transit Requirements Unconfirmed',
        detail: `Transit rules for your passport at this stop are not confirmed in our dataset. Verify with the airline or the transit country's immigration authority.${rule.notes ? ` ${rule.notes}` : ''}`,
      };
  }
}

function evaluateOnwardTicket(
  destinationSlug: string,
  isOneWay: boolean,
  returnDate: string | undefined
): CheckResult {
  const hasOnwardPlan = !isOneWay || !!returnDate;
  const rule = findOnwardTicketRule(destinationSlug);

  if (!rule) {
    if (!hasOnwardPlan) {
      return {
        status: 'caution',
        label: 'One-Way — Verify Requirement',
        detail: 'No specific enforcement data for this destination. One-way travelers may be questioned at check-in. Consider carrying proof of onward plans.',
      };
    }
    return {
      status: 'pass',
      label: 'Onward Travel Confirmed',
      detail: 'You have a return or onward date on file. This satisfies most onward ticket checks.',
    };
  }

  switch (rule.policy) {
    case 'strongly_enforced':
      if (!hasOnwardPlan) {
        return {
          status: 'fail',
          label: 'Onward Ticket Required',
          detail: `${rule.notes ?? 'This destination strongly enforces the onward/return ticket requirement.'} Without a confirmed departure booking, airlines are likely to deny boarding. Book a return or onward flight before check-in.`,
        };
      }
      return {
        status: 'pass',
        label: 'Onward Travel Confirmed',
        detail: `Onward ticket requirement satisfied.${rule.notes ? ` Note: ${rule.notes}` : ''}`,
      };
    case 'commonly_required':
      if (!hasOnwardPlan) {
        return {
          status: 'caution',
          label: 'Onward Ticket Likely Requested',
          detail: `Proof of onward or return travel is commonly requested at this destination.${rule.notes ? ` ${rule.notes}` : ''} As a one-way traveler, you are likely to be questioned. Consider booking a refundable onward ticket.`,
        };
      }
      return {
        status: 'pass',
        label: 'Onward Travel Confirmed',
        detail: 'Return or onward travel confirmed — requirement satisfied.',
      };
    case 'rarely_checked':
      if (!hasOnwardPlan) {
        return {
          status: 'caution',
          label: 'One-Way Trip — Low Risk',
          detail: `Onward ticket enforcement at this destination is relatively low.${rule.notes ? ` ${rule.notes}` : ''} One-way travel is unlikely to be blocked but is technically subject to the requirement.`,
        };
      }
      return {
        status: 'pass',
        label: 'Onward Travel Confirmed',
        detail: 'Return or onward travel confirmed.',
      };
    case 'not_required':
      return {
        status: 'pass',
        label: 'Not Required',
        detail: 'No onward ticket requirement for this destination.',
      };
    default:
      return {
        status: 'unknown',
        label: 'Enforcement Policy Unconfirmed',
        detail: 'Onward ticket enforcement data is not available for this destination in our dataset. Verify before travel.',
      };
  }
}

function computeAggregate(results: CheckResult[]): { status: BoardingStatus; risk: RiskLevel } {
  const hasFail = results.some(r => r.status === 'fail');
  const hasCaution = results.some(r => r.status === 'caution');
  const hasUnknown = results.some(r => r.status === 'unknown');

  if (hasFail) return { status: 'Likely Issue', risk: 'High' };
  if (hasCaution) return { status: 'Caution', risk: 'Medium' };
  if (hasUnknown) return { status: 'Caution', risk: 'Medium' };
  return { status: 'Likely OK', risk: 'Low' };
}

function computeConfidence(
  visaResult: CheckResult,
  validityResult: CheckResult,
  transit1Result: CheckResult,
  transit2Result: CheckResult,
  onwardResult: CheckResult
): ConfidenceLevel {
  const unknownCount = [visaResult, validityResult, transit1Result, transit2Result, onwardResult].filter(
    r => r.status === 'unknown'
  ).length;

  const isCriticalUnknown =
    visaResult.status === 'unknown' || validityResult.status === 'unknown';

  if (isCriticalUnknown || unknownCount >= 2) return 'Limited';
  if (unknownCount === 1) return 'Medium';

  const hasTransitGap =
    transit1Result.status === 'unknown' || transit2Result.status === 'unknown';
  if (hasTransitGap) return 'Medium';

  return 'High';
}

function buildPrimaryFactors(
  visaResult: CheckResult,
  validityResult: CheckResult,
  transit1Result: CheckResult,
  transit2Result: CheckResult,
  onwardResult: CheckResult,
  hasTransit1: boolean,
  hasTransit2: boolean
): string[] {
  const factors: string[] = [];

  if (visaResult.status === 'pass') {
    factors.push('Destination visa requirement satisfied');
  } else if (visaResult.status === 'caution') {
    factors.push('Entry authorization (eVisa or eTA) required before boarding');
  } else if (visaResult.status === 'fail') {
    factors.push('Visa required — must be obtained before travel');
  } else {
    factors.push('Destination visa requirement could not be verified');
  }

  if (validityResult.status === 'pass') {
    factors.push('Passport validity is sufficient');
  } else if (validityResult.status === 'caution') {
    factors.push('Passport validity is close to the minimum threshold');
  } else if (validityResult.status === 'fail') {
    factors.push('Passport validity does not meet destination requirements');
  } else {
    factors.push('Passport validity rule could not be confirmed for this destination');
  }

  if (hasTransit1) {
    if (transit1Result.status === 'pass') {
      factors.push('Transit at first stop does not require a separate visa');
    } else if (transit1Result.status === 'fail') {
      factors.push('Transit visa required at first connection — boarding blocker');
    } else if (transit1Result.status === 'unknown') {
      factors.push('Transit requirements at first stop are unconfirmed');
    } else {
      factors.push('Transit at first stop requires verification of exemption');
    }
  }

  if (hasTransit2) {
    if (transit2Result.status === 'pass') {
      factors.push('Transit at second stop does not require a separate visa');
    } else if (transit2Result.status === 'fail') {
      factors.push('Transit visa required at second connection — boarding blocker');
    } else if (transit2Result.status === 'unknown') {
      factors.push('Transit requirements at second stop are unconfirmed');
    } else {
      factors.push('Transit at second stop requires verification');
    }
  }

  if (onwardResult.status === 'pass') {
    factors.push('Onward or return travel is confirmed');
  } else if (onwardResult.status === 'caution') {
    factors.push('Onward ticket may be requested — one-way trip noted');
  } else if (onwardResult.status === 'fail') {
    factors.push('Onward ticket required — no return booking on record');
  }

  return factors;
}

function buildRecommendedAction(
  status: BoardingStatus,
  visaResult: CheckResult,
  validityResult: CheckResult,
  transit1Result: CheckResult,
  transit2Result: CheckResult,
  onwardResult: CheckResult
): string {
  if (visaResult.status === 'fail') {
    return 'Apply for the required visa immediately — you cannot board without it.';
  }
  if (validityResult.status === 'fail') {
    return 'Renew your passport before travel — current validity will not be accepted.';
  }
  if (transit1Result.status === 'fail' || transit2Result.status === 'fail') {
    return 'Obtain the required transit visa for your connection point before purchasing tickets.';
  }
  if (visaResult.status === 'caution') {
    return 'Apply for the required eVisa or eTA now — this must be done before you arrive at the airport.';
  }
  if (onwardResult.status === 'fail') {
    return 'Book a return or onward flight — airlines at this destination enforce the onward ticket requirement.';
  }
  if (transit1Result.status === 'unknown' || transit2Result.status === 'unknown') {
    return 'Confirm transit visa requirements with the airline or relevant embassy before booking.';
  }
  if (onwardResult.status === 'caution') {
    return 'Consider booking a refundable onward ticket as a precaution for your one-way trip.';
  }
  if (status === 'Likely OK') {
    return 'Carry all travel documents and recheck official entry requirements closer to departure.';
  }
  return 'Review the checks below carefully and verify any uncertain items before travel.';
}

function buildChecklist(
  visaResult: CheckResult,
  validityResult: CheckResult,
  transit1Result: CheckResult,
  transit2Result: CheckResult,
  onwardResult: CheckResult
): string[] {
  const items: string[] = [];

  if (visaResult.status === 'fail') {
    items.push('Apply for the required destination visa before departure — boarding will be denied without it');
  } else if (visaResult.status === 'caution') {
    items.push('Obtain the required eVisa or eTA before arriving at the airport — airlines verify this at check-in');
  }

  if (validityResult.status === 'fail') {
    items.push('Renew your passport before travel — it does not meet the validity requirement for this destination');
  } else if (validityResult.status === 'caution') {
    items.push('Consider renewing your passport — validity is close to the minimum threshold and airlines may flag it');
  }

  if (transit1Result.status === 'fail') {
    items.push('Apply for the required transit visa or airside transit visa for your first connection before booking');
  } else if (transit1Result.status === 'unknown') {
    items.push('Confirm transit visa requirements at your first connection with the airline or relevant embassy');
  } else if (transit1Result.status === 'caution') {
    items.push('Verify that your residence permit qualifies as a transit exemption at your first stop');
  }

  if (transit2Result.status === 'fail') {
    items.push('Apply for the required transit visa for your second connection before booking');
  } else if (transit2Result.status === 'unknown') {
    items.push('Confirm transit requirements at your second connection with the airline or relevant embassy');
  }

  if (onwardResult.status === 'fail') {
    items.push('Book a return or onward flight before check-in — this destination enforces the onward ticket requirement');
  } else if (onwardResult.status === 'caution') {
    items.push('Consider booking a refundable onward ticket as a precaution for your one-way trip');
  }

  items.push('Carry printed or digital copies of all bookings, authorizations, and supporting documents');
  items.push('Recheck official entry requirements within 72 hours of departure — rules can change without notice');

  if (
    visaResult.status === 'pass' &&
    validityResult.status === 'pass' &&
    transit1Result.status === 'pass' &&
    transit2Result.status === 'pass' &&
    onwardResult.status === 'pass'
  ) {
    items.unshift('All major checks appear clear — carry your passport and itinerary confirmation');
    items.push('Keep onward or return travel confirmation easily accessible during check-in');
  }

  return items;
}

function buildSources(destinationSlug: string): string[] {
  return [
    'IATA Timatic — airline industry entry requirement system (iatatravelcentre.com)',
    'VisaInfoGuide.com — seeded visa and transit rule dataset (current MVP coverage)',
    `Official immigration authority for ${destinationSlug} — verify country-specific requirements`,
    `Embassy or consulate of ${destinationSlug} in your home country`,
    'Your airline — confirm boarding requirements at check-in',
  ];
}

export function runBoardingCheck(input: BoardingCheckInput): BoardingAssessment {
  const visaResult = evaluateDestinationVisa(
    input.passportSlug,
    input.destinationSlug,
    input.holdsDestinationVisa
  );

  const validityResult = evaluatePassportValidity(
    input.destinationSlug,
    input.departureDate,
    input.returnDate,
    input.passportExpiry
  );

  const transit1Result = evaluateTransit(
    input.passportSlug,
    input.transitStop1,
    input.holdsResidencePermit,
    'first transit stop'
  );

  const transit2Result = evaluateTransit(
    input.passportSlug,
    input.transitStop2,
    input.holdsResidencePermit,
    'second transit stop'
  );

  const onwardResult = evaluateOnwardTicket(
    input.destinationSlug,
    input.isOneWay,
    input.returnDate
  );

  const allResults = [visaResult, validityResult, transit1Result, transit2Result, onwardResult];

  const { status, risk } = computeAggregate(allResults);

  const confidence = computeConfidence(
    visaResult,
    validityResult,
    transit1Result,
    transit2Result,
    onwardResult
  );

  const primaryFactors = buildPrimaryFactors(
    visaResult,
    validityResult,
    transit1Result,
    transit2Result,
    onwardResult,
    !!input.transitStop1,
    !!input.transitStop2
  );

  const recommendedAction = buildRecommendedAction(
    status,
    visaResult,
    validityResult,
    transit1Result,
    transit2Result,
    onwardResult
  );

  const checklist = buildChecklist(
    visaResult,
    validityResult,
    transit1Result,
    transit2Result,
    onwardResult
  );

  const sources = buildSources(input.destinationSlug);

  return {
    boarding_status: status,
    overall_risk: risk,
    confidence_level: confidence,
    primary_factors: primaryFactors,
    recommended_next_action: recommendedAction,
    destination_visa_result: visaResult,
    passport_validity_result: validityResult,
    transit_result: transit1Result,
    transit2_result: transit2Result,
    onward_ticket_result: onwardResult,
    action_checklist: checklist,
    notes: 'This is a travel rule assessment tool, not legal advice. Airlines make final boarding decisions. Verify with official government, embassy, airline, or IATA Timatic sources before travel.',
    sources_used: sources,
  };
}
