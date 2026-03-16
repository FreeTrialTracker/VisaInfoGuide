import type { ComponentRiskCard, TripRiskStatus } from './types';

export function buildRecommendations(
  overallStatus: TripRiskStatus,
  components: ComponentRiskCard[],
): string[] {
  const items: string[] = [];

  const visa = components.find(c => c.id === 'destination_visa');
  const validity = components.find(c => c.id === 'passport_validity');
  const transit1 = components.find(c => c.id === 'transit_1');
  const transit2 = components.find(c => c.id === 'transit_2');
  const onward = components.find(c => c.id === 'onward_ticket');
  const schengen = components.find(c => c.id === 'schengen');

  if (visa?.status === 'fail') {
    items.push('Apply for the required destination visa before departure — you cannot board without it');
  } else if (visa?.status === 'caution') {
    items.push('Apply for the required eVisa or eTA now — it must be confirmed before arriving at the airport');
  } else if (visa?.status === 'unknown') {
    items.push('Verify the destination visa requirement with the embassy, consulate, or official government website');
  }

  if (validity?.status === 'fail') {
    items.push('Renew your passport before travel — current validity does not meet destination requirements');
  } else if (validity?.status === 'caution') {
    items.push('Consider renewing your passport — validity is close to the minimum threshold and airlines may flag it');
  } else if (validity?.status === 'unknown') {
    items.push('Verify the passport validity requirement for this destination with official sources or your airline');
  }

  if (transit1?.status === 'fail') {
    items.push('Apply for the required transit visa at your first connection before purchasing any tickets');
  } else if (transit1?.status === 'unknown' || transit1?.status === 'caution') {
    items.push('Confirm transit requirements at your first connection with the airline or transit country embassy');
  }

  if (transit2?.status === 'fail') {
    items.push('Apply for the required transit visa at your second connection before purchasing any tickets');
  } else if (transit2?.status === 'unknown' || transit2?.status === 'caution') {
    items.push('Confirm transit requirements at your second connection with the airline or transit country embassy');
  }

  if (onward?.status === 'fail') {
    items.push('Book a return or onward flight before check-in — this destination enforces the onward ticket requirement');
  } else if (onward?.status === 'caution') {
    items.push('Consider booking a refundable onward ticket as a precaution — you may be questioned at check-in');
  }

  if (schengen?.status === 'fail') {
    items.push('Do not proceed with this trip — the Schengen stay limit appears to be exceeded. Recalculate your travel dates');
  } else if (schengen?.status === 'caution') {
    items.push('Monitor your Schengen day count carefully — you are approaching the 90-day limit in the current 180-day window');
  }

  if (overallStatus === 'Likely OK') {
    if (items.length === 0) {
      items.push('All major checks appear clear — carry your passport and all travel documents');
    }
    items.push('Keep your onward or return travel confirmation easily accessible during check-in');
    items.push('Recheck official entry requirements within 72 hours of departure — rules can change without notice');
  } else {
    items.push('Carry printed or digital copies of all bookings, authorizations, and supporting documents');
    items.push('Recheck official entry requirements within 72 hours of departure — rules can change without notice');
  }

  return items;
}
