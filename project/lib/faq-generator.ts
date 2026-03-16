import { VisaRule } from './supabase';
import { formatStayDuration, formatPassportValidity, getVisaTypeDescription } from './visa-data';

interface FAQ {
  question: string;
  answer: string;
}

const SCHENGEN_COUNTRIES = [
  'austria', 'belgium', 'croatia', 'czech-republic', 'denmark', 'estonia',
  'finland', 'france', 'germany', 'greece', 'hungary', 'iceland', 'italy',
  'latvia', 'liechtenstein', 'lithuania', 'luxembourg', 'malta', 'netherlands',
  'norway', 'poland', 'portugal', 'slovakia', 'slovenia', 'spain', 'sweden', 'switzerland'
];

const EU_COUNTRIES = [
  'austria', 'belgium', 'bulgaria', 'croatia', 'cyprus', 'czech-republic',
  'denmark', 'estonia', 'finland', 'france', 'germany', 'greece', 'hungary',
  'ireland', 'italy', 'latvia', 'lithuania', 'luxembourg', 'malta', 'netherlands',
  'poland', 'portugal', 'romania', 'slovakia', 'slovenia', 'spain', 'sweden'
];

export function generateContextualFAQs(
  visaRule: VisaRule,
  passportName: string,
  destinationName: string,
  passportSlug: string,
  destinationSlug: string
): FAQ[] {
  const faqs: FAQ[] = [];
  const stayDuration = formatStayDuration(visaRule.max_stay_days, visaRule.stay_rule, visaRule.stay_window_days);
  const passportValidityFormatted = formatPassportValidity(visaRule.passport_validity_months);
  const visaTypeLower = visaRule.visa_type.toLowerCase();

  const isSchengen = SCHENGEN_COUNTRIES.includes(destinationSlug);
  const isEU = EU_COUNTRIES.includes(destinationSlug);

  const directAnswer = (() => {
    if (visaTypeLower.includes('visa_free')) {
      return `${passportName} citizens can enter ${destinationName} visa-free${visaRule.max_stay_days ? ` for up to ${stayDuration}` : ''}.`;
    } else if (visaTypeLower === 'evisa') {
      return `${passportName} citizens need to obtain an eVisa before traveling to ${destinationName}.${visaRule.max_stay_days ? ` Maximum stay: ${stayDuration}.` : ''}`;
    } else if (visaTypeLower === 'visa_on_arrival') {
      return `${passportName} citizens can obtain a visa on arrival when entering ${destinationName}.${visaRule.max_stay_days ? ` Maximum stay: ${stayDuration}.` : ''}`;
    } else if (visaTypeLower === 'visa_required') {
      return `${passportName} citizens must obtain a visa from a ${destinationName} embassy or consulate before travel.`;
    } else if (visaTypeLower === 'restricted') {
      return `Entry to ${destinationName} is currently restricted for ${passportName} passport holders.`;
    }
    return `${passportName} citizens require authorization to enter ${destinationName}.`;
  })();

  faqs.push({
    question: `Do ${passportName} citizens need a visa for ${destinationName}?`,
    answer: directAnswer + ` ${getVisaTypeDescription(visaRule.visa_type)}`,
  });

  faqs.push({
    question: `How long can ${passportName} passport holders stay in ${destinationName}?`,
    answer: visaRule.max_stay_days
      ? `${passportName} citizens can stay in ${destinationName} for up to ${stayDuration}. This applies to ${visaRule.visa_type.includes('visa_free') ? 'visa-free' : visaTypeLower === 'evisa' ? 'eVisa' : visaTypeLower === 'visa_on_arrival' ? 'visa on arrival' : 'standard visa'} entry. Different visa types may allow longer stays for work, study, or other purposes.`
      : `The permitted length of stay for ${passportName} citizens in ${destinationName} depends on the visa type obtained. Contact ${destinationName} immigration authorities or the nearest embassy for specific duration limits.`,
  });

  if (isSchengen && visaTypeLower.includes('visa_free') && visaRule.max_stay_days === 90) {
    faqs.push({
      question: `How does the Schengen 90/180 rule apply to ${passportName} citizens visiting ${destinationName}?`,
      answer: `${destinationName} is part of the Schengen Area. ${passportName} passport holders can stay up to 90 days within any 180-day period across all Schengen countries combined, not just ${destinationName}. This is a rolling window, so track all Schengen visits carefully. Overstaying can result in fines and future entry bans.`,
    });
  } else if (visaRule.stay_window_days && visaRule.max_stay_days) {
    faqs.push({
      question: `What does "${visaRule.max_stay_days} days per ${visaRule.stay_window_days} days" mean for ${passportName} visitors to ${destinationName}?`,
      answer: `This means ${passportName} citizens can stay a maximum of ${visaRule.max_stay_days} days within every ${visaRule.stay_window_days}-day period. The ${visaRule.stay_window_days}-day period is a rolling window, not a calendar period. For example, if you arrive today, you count back ${visaRule.stay_window_days} days to see how many days you've already spent in ${destinationName} during that time frame.`,
    });
  }

  faqs.push({
    question: `What passport validity is required for ${passportName} citizens entering ${destinationName}?`,
    answer: `${destinationName} requires ${passportName} passports to be valid for at least ${passportValidityFormatted}. Insufficient passport validity is a common reason for entry denial. Check your passport expiry date before booking travel and renew if needed.`,
  });

  if (visaRule.return_ticket_required) {
    faqs.push({
      question: `Do ${passportName} citizens need proof of onward travel for ${destinationName}?`,
      answer: `Yes, ${destinationName} requires ${passportName} passport holders to show proof of onward or return travel at immigration. Airlines often check this requirement before boarding. Book a return ticket or demonstrate onward travel to another country before your trip.`,
    });
  } else if (visaRule.return_ticket_required === false) {
    faqs.push({
      question: `Is proof of onward travel required for ${passportName} citizens visiting ${destinationName}?`,
      answer: `While ${destinationName} may not strictly require proof of onward or return travel from ${passportName} passport holders, immigration officers can request it at their discretion. Having a return ticket can facilitate smoother entry and avoid potential delays or denial.`,
    });
  }

  if (visaTypeLower === 'evisa') {
    faqs.push({
      question: `How long does it take to get an eVisa for ${destinationName} as a ${passportName} citizen?`,
      answer: `Processing times for ${destinationName} eVisas vary but typically range from 24 hours to 7-14 days. Apply well in advance of your travel date, ideally 2-3 weeks before departure. Check the official ${destinationName} eVisa portal for current processing times and requirements.`,
    });
  } else if (visaTypeLower === 'visa_on_arrival') {
    faqs.push({
      question: `What documents do ${passportName} citizens need for visa on arrival in ${destinationName}?`,
      answer: `For visa on arrival in ${destinationName}, ${passportName} citizens typically need: a valid passport (${passportValidityFormatted}), passport-sized photos, return/onward ticket, proof of accommodation, sufficient funds, and visa fee in cash (USD or local currency). Requirements vary, so verify current details before travel.`,
    });
  } else if (visaTypeLower === 'visa_required') {
    faqs.push({
      question: `How far in advance should ${passportName} citizens apply for a ${destinationName} visa?`,
      answer: `${passportName} citizens should apply for a ${destinationName} visa at least 4-8 weeks before intended travel. Processing times vary by embassy location and season. During peak travel periods, allow even more time. Contact the ${destinationName} embassy or consulate in your country for specific timelines.`,
    });
  }

  if (visaRule.insurance_required) {
    faqs.push({
      question: `Is travel insurance mandatory for ${passportName} citizens visiting ${destinationName}?`,
      answer: `Yes, travel insurance is required for ${passportName} citizens entering ${destinationName}. You must provide proof of comprehensive coverage at immigration. ${isSchengen ? 'Schengen' : 'The'} insurance policy should cover medical emergencies, repatriation, and typically have minimum coverage of €30,000 for Schengen countries. Purchase insurance before your trip.`,
    });
  }

  return faqs.slice(0, 6);
}
