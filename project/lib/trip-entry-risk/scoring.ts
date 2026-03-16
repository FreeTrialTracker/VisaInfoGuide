import type { ComponentRiskCard, TripRiskStatus, RiskLevel } from './types';

const STATUS_WEIGHTS: Record<string, number> = {
  pass: 0,
  not_applicable: 0,
  caution: 2,
  unknown: 2,
  fail: 3,
};

const HARD_OVERRIDE_IDS = new Set(['destination_visa', 'passport_validity', 'transit_1', 'transit_2', 'schengen']);

export function computeScore(components: ComponentRiskCard[]): number {
  return components
    .filter(c => c.id !== 'boarding_interpretation')
    .reduce((acc, c) => acc + (STATUS_WEIGHTS[c.status] ?? 0), 0);
}

export function scoreToStatus(score: number): { overallStatus: TripRiskStatus; riskLevel: RiskLevel } {
  if (score === 0) return { overallStatus: 'Likely OK', riskLevel: 'Low' };
  if (score <= 2) return { overallStatus: 'Caution', riskLevel: 'Medium' };
  return { overallStatus: 'Likely Issue', riskLevel: 'High' };
}

export function applyHardOverrides(
  components: ComponentRiskCard[],
  current: { overallStatus: TripRiskStatus; riskLevel: RiskLevel },
): { overallStatus: TripRiskStatus; riskLevel: RiskLevel } {
  const hasCriticalFail = components.some(
    c => HARD_OVERRIDE_IDS.has(c.id) && c.status === 'fail',
  );
  if (hasCriticalFail) {
    return { overallStatus: 'Likely Issue', riskLevel: 'High' };
  }
  return current;
}
