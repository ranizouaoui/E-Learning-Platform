import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const protectedRoutes = ['/admin/dashboard', '/admin/courses','/admin/teachers', '/admin/exams','/teacher/courses','/teacher/settings','/teacher/dashboard','/teacher/tests','/teacher/live-meetings','/learn','/remedial-lessons','/tests','/settings','/auth/profile'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // console.log(`Request to: ${pathname}`);

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const token = req.cookies.get('accessToken')?.value;
    // console.log(`Token: ${token}`);

    if (!token) {
      // console.log('No token found, redirecting to login');
      return NextResponse.redirect(new URL('/auth/sign-in', req.url));
    } else {
      // console.log('Token is valid, allowing access');
      return NextResponse.next();
    }
  }

  return NextResponse.next();
} 

export const config = {
  matcher: ['/admin/dashboard/:path*','/admin/courses/:path*', '/admin/exams/:path*','/admin/teachers/:path*', '/teacher/courses/:path*','/teacher/settings/:path*','/teacher/courses/:path*','/teacher/tests/:path*','/teacher/live-meetings/:path*','/learn/:path*','/remedial-lessons/:path*','/tests/:path*','/settings/:path*','/auth/profile/:path*'],
};
