export type ValidityStatus = 'Valid' | 'Caution' | 'Likely Invalid';
export type RiskLevel = 'Low' | 'Medium' | 'High';
export type ConfidenceLevel = 'High' | 'Medium' | 'Limited';

export type ValidityRuleType =
  | 'six_months_beyond_stay'
  | 'three_months_beyond_stay'
  | 'valid_for_duration'
  | 'six_months_from_entry'
  | 'other';

export interface PassportValidityRule {
  destinationSlug: string;
  destinationName: string;
  ruleType: ValidityRuleType;
  minimumValidityDays?: number;
  blankPagesRequired?: number;
  ruleLabel: string;
  ruleSummary: string;
  notes?: string;
  source?: string;
  lastVerified?: string;
  confidence: ConfidenceLevel;
}

export interface PassportValidityInput {
  passportSlug: string;
  destinationSlug: string;
  passportExpiry: string;
  arrivalDate: string;
  departureDate?: string;
  isOneWay?: boolean;
}

export interface PassportValidityResult {
  status: ValidityStatus;
  riskLevel: RiskLevel;
  confidenceLevel: ConfidenceLevel;
  mainExplanation: string;
  rule: PassportValidityRule | null;
  daysUntilExpiry: number;
  daysAfterDeparture?: number;
  requiredExpiryDate?: Date;
  actualExpiryDate: Date;
  reasons: string[];
  recommendations: string[];
  tripSummary: {
    passportSlug: string;
    destinationSlug: string;
    passportExpiry: string;
    arrivalDate: string;
    departureDate?: string;
    isOneWay: boolean;
    ruleBasis: string;
  };
}
