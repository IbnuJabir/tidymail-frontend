import { NextRequest, NextResponse } from 'next/server'

// Define protected and public routes
const protectedRoutes = ['/subscriptions', '/unsubscribed', '/emails']
const publicRoutes = ['/login', '/signup']

export async function middleware(req: NextRequest) {
  // Get the pathname of the request
  const path = req.nextUrl.pathname
  
  // Check if the route is protected or public
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))
  const isPublicRoute = publicRoutes.some(route => path === route)
  
  // Get the authentication token from cookies
  const authToken = req.cookies.get('access_token')?.value || req.cookies.get('refresh_token')?.value
  
  // Check if the user is authenticated
  const isAuthenticated = !!authToken
  
  // console.log({
  //   path,
  //   isProtectedRoute,
  //   isAuthenticated,
  //   authToken: !!authToken
  // })

  // If the route is protected and the user is not authenticated, redirect to login
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }
  
  // If the route is public and the user is authenticated, redirect to subscriptions page
  if (isPublicRoute && isAuthenticated && path !== '/subscriptions') {
    return NextResponse.redirect(new URL('/subscriptions', req.nextUrl))
  }
  
  // Continue with the request
  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}