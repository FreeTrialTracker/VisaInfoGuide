import { ImageResponse } from 'next/server';

export const runtime = 'edge';

const MAX_TITLE_LENGTH = 80;

function truncateTitle(raw: string): string {
  const trimmed = raw.trim();
  if (trimmed.length <= MAX_TITLE_LENGTH) return trimmed;
  const cut = trimmed.slice(0, MAX_TITLE_LENGTH);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 40 ? cut.slice(0, lastSpace) : cut) + '…';
}

function titleFontSize(len: number): number {
  if (len > 65) return 44;
  if (len > 45) return 52;
  return 60;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const rawTitle = searchParams.get('title') || 'Visa Update';
    const subtitle = searchParams.get('subtitle') || '';
    const label = searchParams.get('label') || '';
    const year = searchParams.get('year') || '';

    const title = truncateTitle(rawTitle);
    const fontSize = titleFontSize(title.length);

    const imageResponse = new ImageResponse(
      (
        <div
          style={{
            width: '1200px',
            height: '630px',
            background: '#071e3d',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '56px 72px',
            fontFamily: 'sans-serif',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: '#0ea5e9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: 800,
                color: '#fff',
              }}
            >
              V
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#e2e8f0' }}>
              VisaInfoGuide
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {label ? (
              <div style={{ display: 'flex' }}>
                <div
                  style={{
                    background: '#0ea5e9',
                    borderRadius: '6px',
                    padding: '5px 14px',
                    fontSize: '14px',
                    fontWeight: 800,
                    color: '#fff',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}
                >
                  {label}
                </div>
              </div>
            ) : null}

            <div
              style={{
                fontSize: `${fontSize}px`,
                fontWeight: 800,
                lineHeight: 1.15,
                color: '#ffffff',
                maxWidth: '1000px',
              }}
            >
              {title}
            </div>

            {subtitle ? (
              <div
                style={{
                  fontSize: '28px',
                  lineHeight: 1.4,
                  color: '#94a3b8',
                  fontWeight: 400,
                  maxWidth: '900px',
                }}
              >
                {subtitle}
              </div>
            ) : null}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#14b8a6',
                }}
              />
              <div style={{ fontSize: '20px', color: '#64748b', fontWeight: 600 }}>
                visainfoguide.com
              </div>
            </div>

            {year ? (
              <div
                style={{
                  border: '1px solid rgba(14,165,233,0.4)',
                  borderRadius: '6px',
                  padding: '4px 12px',
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#7dd3fc',
                }}
              >
                {year} UPDATE
              </div>
            ) : null}
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    );

    imageResponse.headers.set('Content-Type', 'image/png');
    imageResponse.headers.set('Cache-Control', 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800');
    return imageResponse;
  } catch {
    const fallback = new ImageResponse(
      (
        <div
          style={{
            width: '1200px',
            height: '630px',
            background: '#071e3d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'sans-serif',
            color: '#ffffff',
            fontSize: '48px',
            fontWeight: 700,
          }}
        >
          VisaInfoGuide
        </div>
      ),
      { width: 1200, height: 630 }
    );

    fallback.headers.set('Content-Type', 'image/png');
    fallback.headers.set('Cache-Control', 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800');
    return fallback;
  }
}
