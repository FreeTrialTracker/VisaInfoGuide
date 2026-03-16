export type TransitStatus =
  | 'No transit visa needed'
  | 'Transit visa may be needed'
  | 'Transit visa likely required';

export type RiskLevel = 'Low' | 'Medium' | 'High';
export type ConfidenceLevel = 'High' | 'Medium' | 'Limited';
export type CheckStatus = 'pass' | 'caution' | 'fail' | 'unknown';

export interface TransitCheckerInput {
  passportSlug: string;
  transitCountrySlug: string;
  transitAirportCode: string;
  finalDestinationSlug: string;
  layoverHours?: number;
  samTicket: boolean;
  selfTransfer: boolean;
  changingTerminals: boolean;
  leavingAirport: boolean;
  holdsQualifyingVisa: boolean;
  holdsResidencePermit: boolean;
}

export interface TransitCheckResult {
  status: CheckStatus;
  label: string;
  detail: string;
}

export interface TransitAssessment {
  transit_status: TransitStatus;
  risk_level: RiskLevel;
  confidence_level: ConfidenceLevel;
  primary_reasons: string[];
  recommended_next_action: string;
  airside_result: TransitCheckResult;
  landside_result: TransitCheckResult;
  transit_visa_result: TransitCheckResult;
  exemption_result: TransitCheckResult;
  action_checklist: string[];
  sources_used: string[];
}

export type NationalityGroup =
  | 'eu_eea'
  | 'five_eyes'
  | 'gulf_gcc'
  | 'schengen_non_eu'
  | 'any';

export interface TransitRule {
  transit_country_slug: string;
  airport_codes: string[];
  passport_slugs?: string[];
  nationality_groups?: NationalityGroup[];
  airside_transit_visa_required: boolean;
  landside_entry_requires_visa: boolean;
  terminal_change_triggers_immigration: boolean;
  self_transfer_triggers_immigration: boolean;
  leaving_airport_requires_visa: boolean;
  transit_visa_required: boolean;
  exemptions_apply: boolean;
  exemption_qualifying_visas: string[];
  exemption_qualifying_permits: string[];
  notes: string;
  source: string;
  last_verified: string;
  confidence: ConfidenceLevel;
}
