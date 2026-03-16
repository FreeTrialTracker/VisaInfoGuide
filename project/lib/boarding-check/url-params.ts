import type { BoardingCheckInput } from './types';

export function serializeBoardingParams(form: BoardingCheckInput): string {
  const params = new URLSearchParams();
  if (form.passportSlug) params.set('p', form.passportSlug);
  if (form.destinationSlug) params.set('d', form.destinationSlug);
  if (form.departureDate) params.set('dep', form.departureDate);
  if (!form.isOneWay && form.returnDate) params.set('ret', form.returnDate);
  if (form.isOneWay) params.set('ow', '1');
  if (form.passportExpiry) params.set('exp', form.passportExpiry);
  if (form.transitStop1) params.set('t1', form.transitStop1);
  if (form.transitStop2) params.set('t2', form.transitStop2);
  if (form.holdsDestinationVisa) params.set('dv', '1');
  if (form.holdsResidencePermit) params.set('rp', '1');
  return params.toString();
}

export function parseBoardingParams(search: string): Partial<BoardingCheckInput> {
  try {
    const params = new URLSearchParams(search);
    const result: Partial<BoardingCheckInput> = {};
    if (params.get('p')) result.passportSlug = params.get('p')!;
    if (params.get('d')) result.destinationSlug = params.get('d')!;
    if (params.get('dep')) result.departureDate = params.get('dep')!;
    if (params.get('ret')) result.returnDate = params.get('ret')!;
    if (params.get('ow') === '1') result.isOneWay = true;
    if (params.get('exp')) result.passportExpiry = params.get('exp')!;
    if (params.get('t1')) result.transitStop1 = params.get('t1')!;
    if (params.get('t2')) result.transitStop2 = params.get('t2')!;
    if (params.get('dv') === '1') result.holdsDestinationVisa = true;
    if (params.get('rp') === '1') result.holdsResidencePermit = true;
    return result;
  } catch {
    return {};
  }
}
