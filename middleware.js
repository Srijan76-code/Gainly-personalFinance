import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/account(.*)",
  "/transaction(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  try {
    const { userId, redirectToSignIn } = await auth();

    if (isProtectedRoute(req) && !userId) {
      return redirectToSignIn();
    }
  } catch (err) {
    console.error("Clerk middleware error:", err);
    return Response.redirect("/sign-in", 302);
  }
});

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
    '/(api|trpc)(.*)',
  ],
};
