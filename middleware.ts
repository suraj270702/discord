import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { publicRoutes,authRoutes } from "./routes"

const {auth} = NextAuth(authConfig)
export default auth((req) => {
  // req.auth
  const {nextUrl} = req
  const isLoggedIn = !!req.auth
  const isApiAuthRoutes = nextUrl.pathname.startsWith("/api/auth")
  const isPublic = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if(isApiAuthRoutes){
    return null
  }

  if(isAuthRoute){
    if(isLoggedIn){
        return Response.redirect(new URL("/settings",nextUrl))
    }
    return null
  }

  if(!isLoggedIn && !isPublic){
    return Response.redirect(new URL("/login",nextUrl))
  }

  return null

})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}