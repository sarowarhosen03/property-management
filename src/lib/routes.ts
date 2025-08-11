import { pathToRegexp } from "path-to-regexp";
const LOGIN = "/login";

const ROOT = "/";
export const AGENT_ROUTES = [
  pathToRegexp("/:local/dashboard/contacts"),
  pathToRegexp("/:local/dashboard/branches/{*path}"),
  pathToRegexp("/:local/dashboard/branches"),
  pathToRegexp("/:local/dashboard/contacts/{*path}"),
  pathToRegexp("/:local/dashboard/users"),
  pathToRegexp("/:local/dashboard/users/{*path}"),
];
const PRIVET_ROUTES = [
  pathToRegexp("/:local/dashboard"),
  pathToRegexp("/:local/dashboard/{*path}"),
  pathToRegexp("/api/upload"),
  pathToRegexp("/api/upload/{*path}"),
  ...AGENT_ROUTES,
];

const PUBLIC_ONLY = [transToRegxp(LOGIN), transToRegxp("/forget")];

function transToRegxp(path: string) {
  return pathToRegexp(`/:local${path}`);
}

function matchRoutes(pathname: string, routes: RegExp[]) {
  for (let route of routes) {
    if (route?.regexp?.test(pathname)) {
      return true;
    }
  }
  return false;
}

export { LOGIN, matchRoutes, PRIVET_ROUTES, PUBLIC_ONLY, ROOT };
