import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const pathname = req.nextUrl.pathname;

    // Define route types
    const isAuthPage = pathname.startsWith('/auth');
    const isAdminPage = pathname.startsWith('/admin');
    const isProfilePage = pathname.startsWith('/profile');
    const isCheckoutPage = pathname.startsWith('/checkout');

    console.log('Middleware:', { pathname, isAuth, role: token?.role });

    // Redirect authenticated users away from auth pages
    if (isAuthPage && isAuth) {
      console.log('Redirecting authenticated user away from auth page');
      return NextResponse.redirect(new URL('/', req.url));
    }

    // Admin route protection
    if (isAdminPage) {
      if (!isAuth) {
        console.log('Redirecting unauthenticated user from admin page');
        return NextResponse.redirect(new URL('/auth/signin?callbackUrl=' + encodeURIComponent(pathname), req.url));
      }
      
      if (token?.role !== 'admin') {
        console.log('Redirecting non-admin user from admin page');
        return NextResponse.redirect(new URL('/?error=access-denied', req.url));
      }
    }

    // Profile and checkout protection
    if ((isProfilePage || isCheckoutPage) && !isAuth) {
      console.log('Redirecting unauthenticated user from protected page');
      return NextResponse.redirect(new URL('/auth/signin?callbackUrl=' + encodeURIComponent(pathname), req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;
        
        // Always allow auth pages
        if (pathname.startsWith('/auth')) {
          return true;
        }
        
        // Allow public routes
        const publicRoutes = ['/', '/products', '/categories'];
        const isPublicRoute = publicRoutes.includes(pathname) || 
                             pathname.startsWith('/products/') ||
                             pathname.startsWith('/api/products') ||
                             pathname.startsWith('/api/auth');
        
        if (isPublicRoute) {
          return true;
        }
        
        // For all other routes, require authentication
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};