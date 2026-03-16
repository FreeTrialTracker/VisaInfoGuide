import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.redirect(new URL('/sitemap-index.xml', 'https://visainfoguide.com'), { status: 301 });
}
