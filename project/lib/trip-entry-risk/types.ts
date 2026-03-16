export type TripRiskStatus = 'Likely OK' | 'Caution' | 'Likely Issue';
export type RiskLevel = 'Low' | 'Medium' | 'High';
export type ConfidenceLevel = 'High' | 'Medium' | 'Limited';
export type ComponentStatus = 'pass' | 'caution' | 'fail' | 'unknown' | 'not_applicable';

export interface SchengenTrip {
  entryDate: string;
  exitDate: string;
}

export interface TripEntryRiskInput {
  passportSlug: string;
  destinationSlug: string;
  arrivalDate: string;
  stayLengthDays: number;
  departureDate?: string;
  isOneWay?: boolean;
  passportExpiry?: string;
  onwardTicketConfirmed?: boolean;
  transitStop1?: string;
  transitStop2?: string;
  selfTransfer?: boolean;
  changingTerminals?: boolean;
  leavingAirport?: boolean;
  holdsDestinationVisa?: boolean;
  holdsResidencePermit?: boolean;
  includesSchengen?: boolean;
  schengenHistory?: SchengenTrip[];
}

export interface ComponentRiskCard {
  id: string;
  title: string;
  status: ComponentStatus;
  riskLevel: RiskLevel;
  confidence: ConfidenceLevel;
  summary: string;
  detail: string;
  ruleBasis?: string;
  source?: string;
}

export interface TripSummaryData {
  passportSlug: string;
  destinationSlug: string;
  arrivalDate: string;
  stayLengthDays: number;
  departureDate?: string;
  isOneWay: boolean;
  passportExpiry?: string;
  onwardTicketConfirmed?: boolean;
  transitStop1?: string;
  transitStop2?: string;
  selfTransfer?: boolean;
  changingTerminals?: boolean;
  leavingAirport?: boolean;
  schengenHistoryIncluded: boolean;
}

export interface TripEntryRiskResult {
  overallStatus: TripRiskStatus;
  riskLevel: RiskLevel;
  confidenceLevel: ConfidenceLevel;
  mainExplanation: string;
  primaryFactors: string[];
  tripSummary: TripSummaryData;
  components: ComponentRiskCard[];
  recommendations: string[];
  verificationNote: string;
  schengenRelevant: boolean;
}
