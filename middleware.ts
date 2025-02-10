import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { privateRoutes } from "./routes";

const { auth } = NextAuth(authConfig)

//middleware function
export default auth(async (req) => {
    const isLoggedIn = !!req.auth;
    const { nextUrl } = req;
    const url = 'http://localhost:3000';
    const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
    const isAuthRoute = nextUrl.pathname.includes("/auth");
    const isApiRoute = nextUrl.pathname.includes("/api");

    if (isApiRoute) {
        return;
    }

    if (isLoggedIn && isAuthRoute) {
        //change "url" variable to actual production URL when the time comes
        return Response.redirect(`${url}/dashboard`);
    }

    if (isAuthRoute && !isLoggedIn) {
        return;
    }

    if (!isLoggedIn && isPrivateRoute) {
        return Response.redirect(`${url}/auth/login`);
    }
})

//will invoke middleware function on any page besides those with "_next" in their name
export const confic = {
    matcher: [// Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',],
};