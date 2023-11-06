import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { logger } from './configs/winston';

export function middleware(req: NextRequest) {
    console.log('middleware..................');
    console.log(req.nextUrl);
    console.log(`/${req.nextUrl.locale}${req.nextUrl.pathname}${req.nextUrl.search}`);
    // return NextResponse.redirect(
    //     new URL(`/${req.nextUrl.locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url),
    //   )
}

export const config = {
    matcher: "/data/:path*",
  };