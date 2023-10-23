import { NextRequest, NextResponse } from 'next/server';


export function middleware(request: NextRequest) {
    console.log('middleware.........');
    console.log(request.url);
    console.log(request.ip);
    console.log(request.headers.get('x-real-ip'));
    console.log(request.headers.get('x-forwarded-for'));

    return NextResponse.next();
}

export const config = {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: ['/((?!_next/static|_next/image|favicon.ico|images).*)'],
}