import { LanguageConfig } from "@/constants";
import { NextRequest, NextResponse } from "next/server";
export let defaultLocale = LanguageConfig.DEFAULT_LANG;
export let locales = [
  {
    label: "Armenian",
    code: "hy",
    language: "ARM",
  },
  {
    label: "English",
    code: "en",
    language: "ENG",
  },
  {
    label: "Russian",

    code: "rus",
    language: "RUS",
  },
];

function getLocale(request: NextRequest) {
  const preferredLanguage = request.cookies.get("lang")?.value;
  if (
    locales.some((local) => local.code === preferredLanguage) &&
    preferredLanguage
  ) {
    return preferredLanguage;
  }

  // const acceptedLanguage = request.headers.get("accept-language") ?? undefined;
  // const headers = { "accept-language": acceptedLanguage };
  // const languages = new Negotiator({ headers })?.languages();
  // try {
  //   return match(
  //     languages,
  //     locales.map((loc) => loc.code),
  //     defaultLocale,
  //   );
  // } catch (error) {
  return defaultLocale;
  // }
}

export function getLangCodeInLocal(request: NextRequest) {
  // get the pathname from request url
  const pathname = request.nextUrl.pathname;
  const langcode = pathname.split("/").splice(1)?.[0];
  return langcode
    ? locales.find((locale) => locale.code === langcode)?.code
    : undefined;
}

export default function internationalization(request: NextRequest) {
  // detect user's preference & redirect with a locale with a path eg: /en/about
  const locale = getLocale(request);
  // Create a URL object
  const url = new URL(request.url);
  const pathname = url.pathname;
  const search = url.search;
  const newPathname = `/${locale}${pathname}`;
  // Construct the new URL
  const newUrl = `${newPathname}${search}`;

  return NextResponse.redirect(new URL(newUrl, request.url));
}
