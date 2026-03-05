export async function GET() {
  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0f766e;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#0d9488;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#grad)" />
      <text x="600" y="260" font-family="Arial, sans-serif" font-size="80" font-weight="bold" fill="white" text-anchor="middle">VisaInfoGuide</text>
      <text x="600" y="330" font-family="Arial, sans-serif" font-size="40" fill="rgba(255,255,255,0.95)" text-anchor="middle">Privacy &amp; Terms</text>
      <text x="600" y="420" font-family="Arial, sans-serif" font-size="28" fill="rgba(255,255,255,0.8)" text-anchor="middle">Transparent visa requirements data platform</text>
    </svg>
  `;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
