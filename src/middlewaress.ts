import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import { logger } from './configs/winston';

export function middleware(request: NextApiRequest) {
    logger.info(request.url);
    return NextResponse.next();
}

export const config = {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}