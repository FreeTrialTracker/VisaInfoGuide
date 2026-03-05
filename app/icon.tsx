import { ImageResponse } from 'next/server';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0d3b30',
          borderRadius: 4,
        }}
      >
        <div
          style={{
            width: 18,
            height: 18,
            background: '#2dd4bf',
            clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 40% 100%)',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
