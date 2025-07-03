//app\middleware.js
import { NextResponse } from 'next/server';
import { isAuthenticated } from './utils/auth';

export function middleware(request) {
  const protectedRoutes = ['/profile', '/auctions', '/bids'];
  const authRoutes = ['/login', '/register'];

  if (protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route)) && !isAuthenticated()) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (authRoutes.some(route => request.nextUrl.pathname.startsWith(route)) && isAuthenticated()) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}