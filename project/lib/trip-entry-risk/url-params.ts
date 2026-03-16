import type { TripEntryRiskInput, SchengenTrip } from './types';

export function serializeTripRiskParams(input: TripEntryRiskInput): string {
  const params = new URLSearchParams();

  if (input.passportSlug) params.set('passport', input.passportSlug);
  if (input.destinationSlug) params.set('dest', input.destinationSlug);
  if (input.arrivalDate) params.set('arrival', input.arrivalDate);
  if (input.stayLengthDays) params.set('stay', String(input.stayLengthDays));
  if (input.departureDate) params.set('departure', input.departureDate);
  if (input.isOneWay) params.set('oneway', '1');
  if (input.passportExpiry) params.set('expiry', input.passportExpiry);
  if (input.onwardTicketConfirmed !== undefined) params.set('onward', input.onwardTicketConfirmed ? '1' : '0');
  if (input.transitStop1) params.set('t1', input.transitStop1);
  if (input.transitStop2) params.set('t2', input.transitStop2);
  if (input.selfTransfer) params.set('self', '1');
  if (input.changingTerminals) params.set('terminal', '1');
  if (input.leavingAirport) params.set('leave', '1');
  if (input.holdsDestinationVisa) params.set('visa', '1');
  if (input.holdsResidencePermit) params.set('permit', '1');
  if (input.includesSchengen) params.set('schengen', '1');

  if (input.schengenHistory && input.schengenHistory.length > 0) {
    params.set('sh', JSON.stringify(input.schengenHistory));
  }

  return params.toString();
}

export function parseTripRiskParams(search: string): Partial<TripEntryRiskInput> {
  try {
    const params = new URLSearchParams(search);
    const result: Partial<TripEntryRiskInput> = {};

    const passport = params.get('passport');
    if (passport) result.passportSlug = passport;

    const dest = params.get('dest');
    if (dest) result.destinationSlug = dest;

    const arrival = params.get('arrival');
    if (arrival) result.arrivalDate = arrival;

    const stay = params.get('stay');
    if (stay) {
      const n = parseInt(stay, 10);
      if (!isNaN(n) && n > 0) result.stayLengthDays = n;
    }

    const departure = params.get('departure');
    if (departure) result.departureDate = departure;

    if (params.get('oneway') === '1') result.isOneWay = true;

    const expiry = params.get('expiry');
    if (expiry) result.passportExpiry = expiry;

    const onward = params.get('onward');
    if (onward === '1') result.onwardTicketConfirmed = true;
    if (onward === '0') result.onwardTicketConfirmed = false;

    const t1 = params.get('t1');
    if (t1) result.transitStop1 = t1;

    const t2 = params.get('t2');
    if (t2) result.transitStop2 = t2;

    if (params.get('self') === '1') result.selfTransfer = true;
    if (params.get('terminal') === '1') result.changingTerminals = true;
    if (params.get('leave') === '1') result.leavingAirport = true;
    if (params.get('visa') === '1') result.holdsDestinationVisa = true;
    if (params.get('permit') === '1') result.holdsResidencePermit = true;
    if (params.get('schengen') === '1') result.includesSchengen = true;

    const sh = params.get('sh');
    if (sh) {
      const parsed = JSON.parse(sh);
      if (Array.isArray(parsed)) {
        result.schengenHistory = parsed as SchengenTrip[];
      }
    }

    return result;
  } catch {
    return {};
  }
}
