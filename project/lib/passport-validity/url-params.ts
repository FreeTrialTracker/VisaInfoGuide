import type { PassportValidityInput } from './types';

export function serializeValidityParams(form: PassportValidityInput): string {
  const params = new URLSearchParams();
  if (form.passportSlug) params.set('passport', form.passportSlug);
  if (form.destinationSlug) params.set('destination', form.destinationSlug);
  if (form.passportExpiry) params.set('expiry', form.passportExpiry);
  if (form.arrivalDate) params.set('arrival', form.arrivalDate);
  if (form.departureDate) params.set('departure', form.departureDate);
  if (form.isOneWay) params.set('oneway', '1');
  return params.toString();
}

export function parseValidityParams(search: string): Partial<PassportValidityInput> {
  try {
    const params = new URLSearchParams(search);
    const result: Partial<PassportValidityInput> = {};
    if (params.get('passport')) result.passportSlug = params.get('passport')!;
    if (params.get('destination')) result.destinationSlug = params.get('destination')!;
    if (params.get('expiry')) result.passportExpiry = params.get('expiry')!;
    if (params.get('arrival')) result.arrivalDate = params.get('arrival')!;
    if (params.get('departure')) result.departureDate = params.get('departure')!;
    if (params.get('oneway') === '1') result.isOneWay = true;
    return result;
  } catch {
    return {};
  }
}
