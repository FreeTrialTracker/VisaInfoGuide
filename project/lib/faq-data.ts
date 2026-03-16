export const homeFaqs = [
  {
    q: 'What is a visa and do I need one to travel internationally?',
    a: 'A visa is an official document or endorsement that permits you to enter, stay in, or transit through a foreign country for a specified period. Whether you need one depends entirely on your passport nationality and destination. Many passports enjoy visa-free or visa-on-arrival access to dozens of countries, while others require advance applications. Use the checker above to see exactly what is required for your specific passport and destination combination.',
  },
  {
    q: 'What is the difference between visa-free, visa on arrival, and eVisa?',
    a: "Visa-free means you can enter a country without applying for or purchasing any visa — you simply present your passport at the border. Visa on arrival means you obtain the visa stamp or sticker upon arriving at the destination's port of entry, usually by paying a fee. An eVisa (electronic visa) must be applied for and approved online before you travel — you receive a digital authorization linked to your passport, which you present when boarding and at immigration.",
  },
  {
    q: 'What is the Schengen Area and how does the 90/180-day rule work?',
    a: 'The Schengen Area is a group of 27 European countries that have abolished internal border controls and function as a single travel zone. The 90/180-day rule means that most non-EU visitors can stay in the Schengen Area for a maximum of 90 days within any rolling 180-day period. Days spent in any Schengen member state (France, Germany, Spain, Italy, Greece, etc.) all count toward this limit. Use the Schengen Calculator on this site to track your remaining days accurately.',
  },
  {
    q: 'How do I check visa requirements for multiple destinations on one trip?',
    a: 'Use the Trip Planner tool on this site. Enter your passport nationality, then add each destination in your itinerary. The planner will display the visa requirement for every country on your trip simultaneously, so you can identify which destinations require advance visa applications before you finalize your travel plans.',
  },
  {
    q: 'How often is the visa requirement data updated?',
    a: 'Visa rules are reviewed and updated regularly on this site. However, immigration policies can change at short notice due to diplomatic shifts, public health situations, or policy reforms. Always cross-check any requirement shown here with the official immigration or consular authority of your destination country before booking flights or accommodation.',
  },
  {
    q: 'What does passport validity requirement mean?',
    a: 'Most countries require your passport to remain valid for a minimum period beyond your planned departure date — commonly 3 or 6 months. If your passport expires before that required validity window, you may be denied boarding or entry even if you technically hold visa-free access. Each visa requirement page on this site shows the specific passport validity rule for that country.',
  },
  {
    q: 'Which passports have the most visa-free access in 2026?',
    a: 'In 2026, the most powerful passports for visa-free travel are generally those from Japan, Singapore, France, Germany, Italy, Spain, and other EU/Schengen nations, each offering access to 190+ destinations without a prior visa. The US and UK passports also rank highly. See the Passport Ranking page for the full current index.',
  },
  {
    q: 'Can I compare two passports side by side?',
    a: 'Yes. The Passport Comparison tool on this site lets you select any two passports and view their visa-free access counts, entry conditions, and stay limits side by side. This is useful for dual nationals deciding which passport to travel on, or for travelers assessing the relative strength of their passport versus another.',
  },
  {
    q: 'What is an eTA and is it the same as a visa?',
    a: 'An Electronic Travel Authorization (eTA) is a pre-entry authorization required by some countries — such as Canada, Australia (ETA), and New Zealand — for travelers who would otherwise qualify for visa-free entry. It is not a visa in the traditional sense: it does not require a consular appointment and is typically approved within minutes online for a small fee. It is linked electronically to your passport and checked automatically when you board.',
  },
  {
    q: 'What should I do if my visa application is denied?',
    a: "If your visa application is refused, you should first review the refusal notice carefully — it typically states the reason. Common grounds include insufficient funds, incomplete documentation, or a previous overstay. You may be able to reapply with stronger supporting documents, appeal the decision through the consulate's formal process, or seek advice from a licensed immigration attorney in your country. This site provides reference information only and cannot assist with individual application cases.",
  },
];

export const homeFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: homeFaqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: a,
    },
  })),
};
