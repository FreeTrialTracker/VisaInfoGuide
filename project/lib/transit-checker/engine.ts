import type {
  TransitCheckerInput,
  TransitAssessment,
  TransitStatus,
  RiskLevel,
  ConfidenceLevel,
  CheckStatus,
  TransitCheckResult,
} from './types';
import { findTransitRules, getAirportsForCountry } from './rules';
import type { TransitRule } from './types';

function ruleHasExemption(rule: TransitRule, input: TransitCheckerInput): boolean {
  if (!rule.exemptions_apply) return false;
  if (input.holdsQualifyingVisa && rule.exemption_qualifying_visas.length > 0) return true;
  if (input.holdsResidencePermit && rule.exemption_qualifying_permits.length > 0) return true;
  return false;
}

function evaluateAirside(
  rules: TransitRule[],
  input: TransitCheckerInput,
): TransitCheckResult {
  if (rules.length === 0) {
    return {
      status: 'unknown',
      label: 'Unverified',
      detail: 'No specific airside transit rule found for this passport and transit country combination. Manual verification is required.',
    };
  }

  const rule = rules[0];
  const exempted = ruleHasExemption(rule, input);

  if (rule.airside_transit_visa_required && !exempted) {
    return {
      status: 'fail',
      label: 'Transit visa required',
      detail: `Your passport nationality requires an Airside Transit Visa (ATV/DATV) to connect through ${input.transitAirportCode}. You must hold this visa before boarding your first flight. ${rule.exemption_qualifying_visas.length > 0 ? `Possible exemptions: ${rule.exemption_qualifying_visas.join('; ')}.` : ''}`,
    };
  }

  if (rule.airside_transit_visa_required && exempted) {
    return {
      status: 'caution',
      label: 'Likely exempt',
      detail: `An airside transit visa is normally required for your passport, but you indicated holding a qualifying visa or residence permit. Verify that your specific document qualifies as an exemption at this airport before travel.`,
    };
  }

  return {
    status: 'pass',
    label: 'No airside transit visa needed',
    detail: `Your passport nationality does not require an Airside Transit Visa (ATV/DATV) for connections at ${input.transitAirportCode}.`,
  };
}

function evaluateLandside(
  rules: TransitRule[],
  input: TransitCheckerInput,
): TransitCheckResult {
  if (rules.length === 0) {
    return {
      status: 'unknown',
      label: 'Unverified',
      detail: 'Landside entry rules could not be determined for this passport and transit country. Verify with the airline or immigration authority.',
    };
  }

  const rule = rules[0];

  const needsImmigration =
    (input.selfTransfer && rule.self_transfer_triggers_immigration) ||
    (input.changingTerminals && rule.terminal_change_triggers_immigration) ||
    (input.leavingAirport && rule.leaving_airport_requires_visa);

  if (!needsImmigration) {
    return {
      status: 'pass',
      label: 'No immigration required',
      detail: 'Based on your trip details, you do not need to clear immigration at the transit airport. You remain in the sterile international zone.',
    };
  }

  if (rule.landside_entry_requires_visa) {
    const exempted = ruleHasExemption(rule, input);
    if (exempted) {
      return {
        status: 'caution',
        label: 'Immigration required — check exemption',
        detail: `Your trip requires clearing immigration at ${input.transitAirportCode} (${
          input.selfTransfer ? 'self-transfer' : input.changingTerminals ? 'terminal change' : 'leaving airport'
        }). A transit or entry visa is normally required, but you may be exempt based on the qualifying document you hold. Confirm with the transit country embassy or airline.`,
      };
    }
    return {
      status: 'fail',
      label: 'Immigration required — visa needed',
      detail: `Your trip requires clearing immigration at ${input.transitAirportCode} (${
        input.selfTransfer ? 'self-transfer' : input.changingTerminals ? 'terminal change' : 'leaving airport'
      }). Entering the transit country requires a visa or entry authorization for your passport nationality.`,
    };
  }

  return {
    status: 'caution',
    label: 'Immigration required',
    detail: `Your trip details (${
      input.selfTransfer ? 'self-transfer' : input.changingTerminals ? 'terminal change' : 'leaving airport'
    }) mean you will need to pass through immigration at ${input.transitAirportCode}. Check whether your passport requires an entry visa for this country.`,
  };
}

function evaluateTransitVisa(
  rules: TransitRule[],
  input: TransitCheckerInput,
): TransitCheckResult {
  if (rules.length === 0) {
    return {
      status: 'unknown',
      label: 'Unverified',
      detail: 'Transit visa rule not found in our dataset. Verify with the airline, transit country embassy, or official immigration portal.',
    };
  }

  const rule = rules[0];
  const exempted = ruleHasExemption(rule, input);

  if (!rule.transit_visa_required && !rule.airside_transit_visa_required) {
    return {
      status: 'pass',
      label: 'No transit visa required',
      detail: `No transit visa is required for your passport nationality at ${input.transitAirportCode} for standard airside connections.`,
    };
  }

  if ((rule.transit_visa_required || rule.airside_transit_visa_required) && exempted) {
    return {
      status: 'caution',
      label: 'Transit visa required but exemption may apply',
      detail: `A transit visa is typically required for your passport, but you indicated holding a potentially qualifying document. Verify the exemption applies to your specific document type and that it is still valid.`,
    };
  }

  if (rule.transit_visa_required || rule.airside_transit_visa_required) {
    return {
      status: 'fail',
      label: 'Transit visa required',
      detail: `Your passport requires a transit visa for connections at ${input.transitAirportCode}. This must be obtained in advance from the transit country's embassy or consulate. ${rule.notes}`,
    };
  }

  return {
    status: 'pass',
    label: 'No transit visa required',
    detail: 'No transit visa appears to be required based on the rules in our dataset.',
  };
}

function evaluateExemptions(
  rules: TransitRule[],
  input: TransitCheckerInput,
): TransitCheckResult {
  if (rules.length === 0) {
    return {
      status: 'unknown',
      label: 'Unverified',
      detail: 'Exemption information not available for this combination in our dataset.',
    };
  }

  const rule = rules[0];

  if (!rule.exemptions_apply) {
    return {
      status: 'pass',
      label: 'No exemption needed',
      detail: 'No special exemption is required for this transit scenario.',
    };
  }

  const hasVisa = input.holdsQualifyingVisa;
  const hasPermit = input.holdsResidencePermit;
  const allExemptions = [
    ...rule.exemption_qualifying_visas,
    ...rule.exemption_qualifying_permits,
  ];

  if (!hasVisa && !hasPermit) {
    return {
      status: 'caution',
      label: 'Exemptions exist — check if you qualify',
      detail: `Exemptions that may waive the transit visa requirement for this route: ${allExemptions.join('; ')}. If you hold any of these, toggle the Advanced Options and indicate it.`,
    };
  }

  return {
    status: 'caution',
    label: 'Exemption indicated — verify before travel',
    detail: `You indicated holding a qualifying visa or permit. Possible exemptions for this transit: ${allExemptions.join('; ')}. Confirm your specific document is on the exemption list before travel.`,
  };
}

function aggregateStatus(
  airsideResult: TransitCheckResult,
  landsideResult: TransitCheckResult,
  transitVisaResult: TransitCheckResult,
  rules: TransitRule[],
  input: TransitCheckerInput,
): { status: TransitStatus; risk: RiskLevel } {
  const statuses = [airsideResult.status, landsideResult.status, transitVisaResult.status];

  const failCount = statuses.filter(s => s === 'fail').length;
  const cautionCount = statuses.filter(s => s === 'caution').length;
  const unknownCount = statuses.filter(s => s === 'unknown').length;

  if (failCount > 0) {
    return { status: 'Transit visa likely required', risk: 'High' };
  }

  if (input.leavingAirport) {
    const exempted = rules.length > 0 && ruleHasExemption(rules[0], input);
    if (!exempted) {
      return { status: 'Transit visa likely required', risk: 'High' };
    }
  }

  if (input.selfTransfer) {
    if (cautionCount > 0 || unknownCount > 0) {
      return { status: 'Transit visa may be needed', risk: 'Medium' };
    }
    return { status: 'Transit visa may be needed', risk: 'Medium' };
  }

  if (input.changingTerminals) {
    if (cautionCount > 0 || unknownCount > 0) {
      return { status: 'Transit visa may be needed', risk: 'Medium' };
    }
    if (statuses.every(s => s === 'pass')) {
      return { status: 'Transit visa may be needed', risk: 'Medium' };
    }
  }

  if (cautionCount > 0 || unknownCount > 0) {
    return { status: 'Transit visa may be needed', risk: 'Medium' };
  }

  return { status: 'No transit visa needed', risk: 'Low' };
}

function computeConfidence(
  rules: TransitRule[],
  statuses: CheckStatus[],
): ConfidenceLevel {
  if (rules.length === 0) return 'Limited';
  const ruleConfidence = rules[0].confidence;
  const unknownCount = statuses.filter(s => s === 'unknown').length;
  if (unknownCount >= 2) return 'Limited';
  if (ruleConfidence === 'Limited') return 'Limited';
  if (unknownCount === 1 || ruleConfidence === 'Medium') return 'Medium';
  return ruleConfidence;
}

function buildReasons(
  airsideResult: TransitCheckResult,
  landsideResult: TransitCheckResult,
  transitVisaResult: TransitCheckResult,
  input: TransitCheckerInput,
  rules: TransitRule[],
): string[] {
  const reasons: string[] = [];

  if (airsideResult.status === 'fail') {
    reasons.push(`Airside Transit Visa (ATV/DATV) required at ${input.transitAirportCode}`);
  } else if (airsideResult.status === 'pass') {
    reasons.push(`Airside transit at ${input.transitAirportCode} does not require a transit visa`);
  }

  if (input.selfTransfer && rules.length > 0 && rules[0].self_transfer_triggers_immigration) {
    reasons.push('Self-transfer requires clearing immigration at the transit airport');
  }

  if (input.changingTerminals && rules.length > 0 && rules[0].terminal_change_triggers_immigration) {
    reasons.push('Terminal change requires passing through immigration');
  }

  if (input.leavingAirport && rules.length > 0 && rules[0].leaving_airport_requires_visa) {
    reasons.push('Leaving the airport during layover requires entry authorization for this transit country');
  }

  if (landsideResult.status === 'fail') {
    reasons.push('Entry visa required for landside transit or airport exit');
  }

  if (rules.length === 0) {
    reasons.push('No specific rule found for this passport and transit country — manual verification needed');
  }

  return reasons.slice(0, 4);
}

function buildRecommendedAction(
  status: TransitStatus,
  rules: TransitRule[],
  input: TransitCheckerInput,
): string {
  if (status === 'No transit visa needed') {
    if (input.selfTransfer || input.changingTerminals) {
      return 'No airside transit visa is needed, but your self-transfer or terminal change requires careful verification. Confirm bag re-check procedures and whether you need immigration clearance with your airline.';
    }
    return 'No transit visa appears to be required for your connection. Confirm with the airline before ticketing if there is any doubt.';
  }

  if (status === 'Transit visa may be needed') {
    if (rules.length === 0) {
      return 'Our dataset does not cover this transit combination. Contact the airline or the transit country\'s embassy to confirm transit visa requirements before ticketing.';
    }
    return 'Some conditions in your trip may require a transit visa or immigration clearance. Review the detailed results and verify with the transit country\'s immigration authority or the operating airline.';
  }

  if (rules.length > 0 && (rules[0].transit_visa_required || rules[0].airside_transit_visa_required)) {
    const exemptionStr = rules[0].exemption_qualifying_visas.length > 0
      ? ` If you hold a valid ${rules[0].exemption_qualifying_visas[0]}, you may be exempt.`
      : '';
    return `A transit visa is required for your passport to connect through ${input.transitAirportCode}. Apply for a transit visa at the transit country\'s embassy or consulate before travel.${exemptionStr}`;
  }

  return 'Based on your trip details, a transit visa or entry authorization is likely required. Do not travel without confirming requirements with the airline and transit country\'s immigration authority.';
}

function buildChecklist(
  status: TransitStatus,
  rules: TransitRule[],
  input: TransitCheckerInput,
): string[] {
  const items: string[] = [];

  if (status === 'Transit visa likely required') {
    items.push(`Apply for a transit visa at the ${input.transitAirportCode.slice(0, 2) || 'transit'} country embassy or consulate before travel`);
    if (rules.length > 0 && rules[0].exemptions_apply) {
      items.push(`Check if you qualify for an exemption: ${rules[0].exemption_qualifying_visas.slice(0, 2).join(', ')}`);
    }
  }

  if (status === 'Transit visa may be needed') {
    items.push('Verify transit visa requirements with the operating airline before booking');
    items.push(`Check the official immigration portal for ${input.transitAirportCode} for the latest rules`);
  }

  if (input.selfTransfer) {
    items.push('Self-transfer: confirm bag re-check and whether immigration clearance is needed at the transit airport');
  }

  if (input.changingTerminals) {
    items.push('Terminal change: confirm with the airline whether this requires passing through immigration');
  }

  if (input.leavingAirport) {
    items.push('Leaving the airport: verify if your passport requires an entry visa for the transit country');
  }

  items.push('Always verify current rules with the operating airline using IATA Timatic or contact the transit country embassy');

  return items.slice(0, 5);
}

function buildSources(rules: TransitRule[]): string[] {
  const base = [
    'IATA Timatic – Airline passenger documentation requirements',
    'Official transit country immigration authority portals',
  ];
  if (rules.length > 0) {
    base.unshift(rules[0].source);
  }
  return base;
}

export function runTransitCheck(input: TransitCheckerInput): TransitAssessment {
  const rules = findTransitRules(
    input.passportSlug,
    input.transitCountrySlug,
    input.transitAirportCode,
  );

  const airsideResult = evaluateAirside(rules, input);
  const landsideResult = evaluateLandside(rules, input);
  const transitVisaResult = evaluateTransitVisa(rules, input);
  const exemptionResult = evaluateExemptions(rules, input);

  const { status, risk } = aggregateStatus(airsideResult, landsideResult, transitVisaResult, rules, input);

  const allStatuses: CheckStatus[] = [
    airsideResult.status,
    landsideResult.status,
    transitVisaResult.status,
    exemptionResult.status,
  ];

  const confidence = computeConfidence(rules, allStatuses);
  const reasons = buildReasons(airsideResult, landsideResult, transitVisaResult, input, rules);
  const recommendation = buildRecommendedAction(status, rules, input);
  const checklist = buildChecklist(status, rules, input);
  const sources = buildSources(rules);

  return {
    transit_status: status,
    risk_level: risk,
    confidence_level: confidence,
    primary_reasons: reasons,
    recommended_next_action: recommendation,
    airside_result: airsideResult,
    landside_result: landsideResult,
    transit_visa_result: transitVisaResult,
    exemption_result: exemptionResult,
    action_checklist: checklist,
    sources_used: sources,
  };
}
