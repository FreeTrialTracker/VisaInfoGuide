import type { TransitCheckerInput } from './types';

export function serializeTransitParams(form: TransitCheckerInput): string {
  const p = new URLSearchParams();
  if (form.passportSlug) p.set('p', form.passportSlug);
  if (form.transitCountrySlug) p.set('tc', form.transitCountrySlug);
  if (form.transitAirportCode) p.set('ta', form.transitAirportCode);
  if (form.finalDestinationSlug) p.set('fd', form.finalDestinationSlug);
  if (form.layoverHours) p.set('lh', String(form.layoverHours));
  if (form.samTicket) p.set('st', '1');
  if (form.selfTransfer) p.set('sf', '1');
  if (form.changingTerminals) p.set('ct', '1');
  if (form.leavingAirport) p.set('la', '1');
  if (form.holdsQualifyingVisa) p.set('qv', '1');
  if (form.holdsResidencePermit) p.set('rp', '1');
  return p.toString();
}

export function parseTransitParams(search: string): Partial<TransitCheckerInput> {
  try {
    const p = new URLSearchParams(search);
    const result: Partial<TransitCheckerInput> = {};
    if (p.get('p')) result.passportSlug = p.get('p')!;
    if (p.get('tc')) result.transitCountrySlug = p.get('tc')!;
    if (p.get('ta')) result.transitAirportCode = p.get('ta')!;
    if (p.get('fd')) result.finalDestinationSlug = p.get('fd')!;
    if (p.get('lh')) result.layoverHours = Number(p.get('lh'));
    if (p.get('st') === '1') result.samTicket = true;
    if (p.get('sf') === '1') result.selfTransfer = true;
    if (p.get('ct') === '1') result.changingTerminals = true;
    if (p.get('la') === '1') result.leavingAirport = true;
    if (p.get('qv') === '1') result.holdsQualifyingVisa = true;
    if (p.get('rp') === '1') result.holdsResidencePermit = true;
    return result;
  } catch {
    return {};
  }
}
