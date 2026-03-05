import { TOP_PAIRS_300 } from './countries';
import { RequirementStatus, PassportValidityRequirement } from './supabase';

/**
 * Check if a passport-destination pair is in the curated TOP_PAIRS_300 list
 * Use this to control linking and prevent crawl leakage to non-curated pages
 */
export function isCuratedPair(passportSlug: string, destinationSlug: string): boolean {
  return TOP_PAIRS_300.some(
    p => p.passport === passportSlug && p.destination === destinationSlug
  );
}

/**
 * Generate optimized meta description for pair pages
 * Starts with direct answer and includes max stay for better CTR
 */
export function generatePairDescription(
  passportName: string,
  destinationName: string,
  visaType: string,
  maxStay?: number | null,
  stayRule?: string | null
): string {
  const visaTypeLower = visaType.toLowerCase();
  let outcome = '';

  if (visaTypeLower.includes('visa_free')) {
    outcome = `${passportName} citizens can enter ${destinationName} visa-free`;
    if (maxStay) {
      outcome += ` for up to ${maxStay} days`;
    }
  } else if (visaTypeLower === 'evisa') {
    outcome = `${passportName} citizens need an eVisa for ${destinationName}`;
    if (maxStay) {
      outcome += ` (up to ${maxStay} days)`;
    }
  } else if (visaTypeLower === 'visa_on_arrival') {
    outcome = `${passportName} citizens can get visa on arrival in ${destinationName}`;
    if (maxStay) {
      outcome += ` for ${maxStay} days`;
    }
  } else if (visaTypeLower === 'visa_required') {
    outcome = `${passportName} citizens need an embassy visa for ${destinationName}`;
  } else {
    outcome = `${passportName} citizens require ${visaType} for ${destinationName}`;
  }

  return `${outcome}. See entry rules, passport validity, and key requirements (Updated 2026).`;
}

/**
 * Calculate a simple hash for FAQ questions to detect duplication
 */
export function hashFAQQuestions(questions: string[]): string {
  return questions
    .sort()
    .join('|')
    .toLowerCase()
    .replace(/[^a-z0-9|]/g, '');
}

/**
 * Convert legacy boolean requirement to 3-state enum
 */
export function booleanToRequirementStatus(value: boolean | null): RequirementStatus {
  if (value === true) return 'required';
  if (value === false) return 'may_be_requested';
  return 'unknown';
}

/**
 * Format requirement status for display
 */
export function formatRequirementStatus(status: RequirementStatus | boolean | null): string {
  // Handle legacy boolean values
  if (typeof status === 'boolean') {
    status = booleanToRequirementStatus(status);
  }

  if (status === null) {
    status = 'unknown';
  }

  switch (status) {
    case 'required':
      return 'Required';
    case 'may_be_requested':
      return 'May be requested';
    case 'not_typically_requested':
      return 'Not typically requested';
    case 'unknown':
    default:
      return 'Unknown';
  }
}

/**
 * Format passport validity requirement for display
 */
export function formatPassportValidityRequirement(
  requirement: PassportValidityRequirement | null,
  months: number | null
): string {
  if (requirement === 'valid_for_stay') {
    return 'Valid for duration of stay';
  }
  if (requirement === '3_months_beyond_departure') {
    return '3 months beyond departure';
  }
  if (requirement === '6_months_beyond_entry') {
    return '6 months beyond entry';
  }
  if (requirement === '6_months_beyond_departure') {
    return '6 months beyond departure';
  }
  if (requirement === 'other' && months) {
    return `${months} month${months !== 1 ? 's' : ''} validity`;
  }
  if (requirement === 'unknown' || !requirement) {
    if (months) {
      return `${months} month${months !== 1 ? 's' : ''} validity`;
    }
    return 'Not clearly specified (verify with authorities)';
  }
  return 'Not clearly specified (verify with authorities)';
}

/**
 * Calculate data confidence level based on available fields
 */
export function calculateDataConfidence(visaRule: {
  visa_type: string;
  max_stay_days: number | null;
  passport_validity_months: number | null;
  passport_validity_requirement: PassportValidityRequirement | null;
}): 'high' | 'medium' | 'low' {
  let score = 0;

  if (visaRule.visa_type) score++;
  if (visaRule.max_stay_days !== null) score++;
  if (visaRule.passport_validity_months !== null || visaRule.passport_validity_requirement) score++;

  if (score >= 3) return 'high';
  if (score >= 2) return 'medium';
  return 'low';
}
