
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from 'next-auth/react';

export async function middleware(request: NextRequest) {
  try {
    const requestForNextAuth = {
      headers: {
        cookie: request.headers.get('cookie'),
      },
    };
    
    // @ts-ignore
    const session = await getSession({ req: requestForNextAuth });
    console.log(session);

    if (request.nextUrl.pathname.startsWith('/dashboard')) {
      if (!session) {
        return NextResponse.redirect(new URL('/auth/sign-in', request.url));
      }

      if (session.user.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/', request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
}; 