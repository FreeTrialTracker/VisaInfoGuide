export type BoardingStatus = 'Likely OK' | 'Caution' | 'Likely Issue';
export type RiskLevel = 'Low' | 'Medium' | 'High';
export type ConfidenceLevel = 'High' | 'Medium' | 'Limited';
export type CheckStatus = 'pass' | 'caution' | 'fail' | 'unknown';

export interface BoardingCheckInput {
  passportSlug: string;
  destinationSlug: string;
  departureDate: string;
  returnDate?: string;
  isOneWay: boolean;
  passportExpiry: string;
  transitStop1?: string;
  transitStop2?: string;
  holdsDestinationVisa: boolean;
  holdsResidencePermit: boolean;
}

export interface CheckResult {
  status: CheckStatus;
  label: string;
  detail: string;
  rule_source?: string;
}

export interface BoardingAssessment {
  boarding_status: BoardingStatus;
  overall_risk: RiskLevel;
  confidence_level: ConfidenceLevel;
  primary_factors: string[];
  recommended_next_action: string;
  destination_visa_result: CheckResult;
  passport_validity_result: CheckResult;
  transit_result: CheckResult;
  transit2_result: CheckResult;
  onward_ticket_result: CheckResult;
  action_checklist: string[];
  notes: string;
  sources_used: string[];
}

export type VisaRequirement =
  | 'visa_free'
  | 'evisa'
  | 'visa_on_arrival'
  | 'visa_required'
  | 'eta_required';

export interface DestinationVisaRule {
  passportSlug: string;
  destinationSlug: string;
  requirement: VisaRequirement;
  maxStayDays?: number;
  notes?: string;
}

export type PassportValidityRule =
  | { type: 'six_months_beyond_stay' }
  | { type: 'three_months_beyond_stay' }
  | { type: 'valid_for_duration' }
  | { type: 'six_months_from_entry' }
  | { type: 'unknown' };

export interface PassportValidityPolicy {
  destinationSlug: string;
  rule: PassportValidityRule;
  minimumMonthsRequired?: number;
  notes?: string;
}

export type TransitRequirement = 'visa_free' | 'transit_visa_required' | 'airside_transit_visa' | 'unknown';

export interface TransitRule {
  passportSlug: string;
  transitCountrySlug: string;
  requirement: TransitRequirement;
  exemptions?: string[];
  notes?: string;
}

export type OnwardTicketPolicy = 'strongly_enforced' | 'commonly_required' | 'rarely_checked' | 'not_required' | 'unknown';

export interface OnwardTicketRule {
  destinationSlug: string;
  policy: OnwardTicketPolicy;
  notes?: string;
}
