import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { Database } from './app/types/supabase';

// Custom response with debug headers
const createResponseWithDebug = (response: NextResponse, debugInfo: Record<string, string>) => {
  // Only add debug headers in development
  if (process.env.NODE_ENV === 'development') {
    Object.entries(debugInfo).forEach(([key, value]) => {
      response.headers.set(`x-auth-debug-${key}`, value);
    });
  }
  return response;
};

export async function middleware(req: NextRequest) {
  console.log(`[Middleware] Processing ${req.method} ${req.nextUrl.pathname} at ${new Date().toISOString()}`);
  
  const res = NextResponse.next();
  const debugInfo: Record<string, string> = {
    timestamp: new Date().toISOString(),
    path: req.nextUrl.pathname,
  };

  // Skip middleware for static assets and API routes
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.startsWith('/favicon.ico') ||
    req.nextUrl.pathname.startsWith('/api/') ||
    req.nextUrl.pathname.startsWith('/auth/callback')
  ) {
    return res;
  }

  let session = null;
  
  try {
    const supabase = createMiddlewareClient<Database>({ req, res });
    
    // Debug info collection
    console.log(`[Middleware] Checking session for ${req.nextUrl.pathname}`);
    const sessionStart = Date.now();
    const { data: { session: authSession }, error: sessionError } = await supabase.auth.getSession();
    const sessionDuration = Date.now() - sessionStart;
    
    session = authSession;
    
    debugInfo.sessionCheckDuration = `${sessionDuration}ms`;
    debugInfo.hasSession = String(!!session);
    
    if (sessionError) {
      console.error(`[Middleware] Session error for ${req.nextUrl.pathname}:`, sessionError);
      debugInfo.sessionError = sessionError.message;
    }
  } catch (error) {
    console.error(`[Middleware] Failed to connect to Supabase:`, error);
    debugInfo.supabaseError = error instanceof Error ? error.message : 'Unknown error';
    // Continue without authentication on error
    debugInfo.authFallback = 'true';
  }

  // Public routes that don't require authentication
  const publicRoutes = [
    '/sign-in',
    '/signup',
    '/sign-up',
    '/auth/callback',
    '/',
    '/comsupportersguest',
    '/businessownersguest',
    '/sbbuniversityguest',
    '/verify-email',
    '/daofeatures',
    '/blog',
    '/how-it-works',
    '/auth-debug', // Allow access to debug page
    // Add other public routes here
  ];

  const isPublicRoute = publicRoutes.some(route => 
    req.nextUrl.pathname === route || req.nextUrl.pathname.startsWith(route)
  );
  
  debugInfo.isPublicRoute = String(isPublicRoute);
  debugInfo.routeType = isPublicRoute ? 'public' : 'private';

  // If we had a Supabase error, allow the request to proceed
  if (debugInfo.supabaseError) {
    console.log(`[Middleware] Allowing request despite Supabase error`);
    return createResponseWithDebug(res, debugInfo);
  }

  // Only redirect if user is not authenticated AND trying to access a private route
  if (!session && !isPublicRoute) {
    console.log(`[Middleware] Unauthenticated request to private route ${req.nextUrl.pathname}, redirecting to /sign-in`);
    
    // Get the protocol and host from the request
    const protocol = req.nextUrl.protocol;
    const host = req.nextUrl.host;
    const baseUrl = `${protocol}//${host}`;
    
    debugInfo.action = 'redirect';
    debugInfo.redirectTo = '/sign-in';
    
    // Create the full redirect URL
    const redirectUrl = new URL('/sign-in', baseUrl);
    // Add original URL as a parameter so we can redirect back after login
    redirectUrl.searchParams.set('redirect', req.nextUrl.pathname);
    
    const redirectResponse = NextResponse.redirect(redirectUrl);
    return createResponseWithDebug(redirectResponse, debugInfo);
  }
  
  if (session && req.nextUrl.pathname.startsWith('/sign-in')) {
    console.log(`[Middleware] Authenticated user trying to access /sign-in, redirecting to /homefeed`);
    
    // Get the protocol and host from the request
    const protocol = req.nextUrl.protocol;
    const host = req.nextUrl.host;
    const baseUrl = `${protocol}//${host}`;
    
    debugInfo.action = 'redirect';
    debugInfo.redirectTo = '/homefeed';
    debugInfo.reason = 'already_authenticated';
    
    const redirectResponse = NextResponse.redirect(new URL('/homefeed', baseUrl));
    return createResponseWithDebug(redirectResponse, debugInfo);
  }
  
  debugInfo.action = 'continue';
  console.log(`[Middleware] Request allowed to proceed to ${req.nextUrl.pathname}`);
  
  return createResponseWithDebug(res, debugInfo);
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|public).*)',
};


