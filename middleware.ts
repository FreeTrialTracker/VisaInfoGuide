import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const pathname = url.pathname;

  if (pathname.startsWith("/destinations/")) {
    url.pathname = pathname.replace("/destinations/", "/destination/");
    return NextResponse.redirect(url, 301);
  }

  if (pathname.startsWith("/countries/")) {
    url.pathname = pathname.replace("/countries/", "/destination/");
    return NextResponse.redirect(url, 301);
  }

  const lower = pathname.toLowerCase();

  if (pathname !== lower) {
    url.pathname = lower;
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)).*)",
  ],
};
