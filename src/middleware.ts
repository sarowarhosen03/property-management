//export { auth as middleware } from "@/auth";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";
import internationalization, {
  getLangCodeInLocal,
} from "./lib/internationlization";
import {
  AGENT_ROUTES,
  LOGIN,
  matchRoutes,
  PRIVET_ROUTES,
  PUBLIC_ONLY,
} from "./lib/routes";

export default auth(async (request: NextRequest) => {
  const { nextUrl } = request;

  //if no locals exist redirect it
  const langCodeInLocal = getLangCodeInLocal(request);

  if (!langCodeInLocal) {
    return internationalization(request);
  }

  const session = request?.auth;
  const isAuthenticated = !!session;

  const isPublicOnlyRoutes = matchRoutes(request.nextUrl.pathname, PUBLIC_ONLY);

  if (isAuthenticated && isPublicOnlyRoutes) {
    return NextResponse.redirect(
      new URL(`/${langCodeInLocal}/dashboard`, nextUrl),
    );
  }

  const isPrivateRoute = matchRoutes(request.nextUrl.pathname, PRIVET_ROUTES);

  if (!isAuthenticated && isPrivateRoute) {
    return NextResponse.redirect(
      new URL(`/${langCodeInLocal}${LOGIN}/`, nextUrl),
    );
  }
  const isAgent = matchRoutes(request.nextUrl.pathname, AGENT_ROUTES);

  if (
    isAuthenticated &&
    session.user?.role?.toLowerCase() !== "admin" &&
    isAgent
  ) {
    return NextResponse.redirect(
      new URL(`/${langCodeInLocal}/dashboard`, nextUrl),
    );
  }

  return NextResponse.next();
});
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|svgs|assets|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$).*)",
    "/dashboard/:path*",
  ],
};
